'use client';

import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import Link from "next/link";


type Props = {
  showBrand?: boolean;
  phone?: string;
};

type LinkItem = { id: 'servicios' | 'galeria' | 'contacto'; label: string };

const LINKS: LinkItem[] = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'galeria',    label: 'Galería'   },
  { id: 'contacto',   label: 'Contacto'  },
];

export default function NavBar({ showBrand = true, phone }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<LinkItem['id']>('servicios');
  const [scrolled, setScrolled] = useState(false);

  // sombra/opacidad al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // scroll-spy (resaltar link según la sección visible)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as LinkItem['id']);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 }
    );

    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const goTo = (id: LinkItem['id']) => (ev: MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const OFFSET = 78; // altura aprox. del nav
    const y = el.getBoundingClientRect().top + window.scrollY - OFFSET;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <div className="sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={`mt-2 rounded-2xl border backdrop-blur-md transition
            ${scrolled ? 'bg-ivory/90' : 'bg-ivory/70'}
            border-[#B8860B]/20 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.35)]`}
        >
          <div className="h-14 flex items-center justify-between px-3">
            {/* Izquierda: hamburguesa + marca */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen((v) => !v)}
                className="md:hidden p-2 rounded-lg hover:bg-black/5"
                aria-label="Abrir menú"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {showBrand && (
                <Link
                  href="/"
                  className="font-semibold tracking-wide text-[#B8860B] hover:opacity-90"
                >
                  María Clavel | Uñas
                </Link>
              )}
            </div>

            {/* Centro: links (desktop) */}
            <nav className="hidden md:flex items-center gap-2">
              {LINKS.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={goTo(l.id)}
                  className={`relative px-3 py-2 rounded-full text-sm transition
                    ${active === l.id ? 'text-[#B8860B]' : 'opacity-80 hover:opacity-100'}`}
                >
                  {l.label}
                  {/* subrayado dorado animado */}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full transition-all
                      ${active === l.id ? 'bg-[#B8860B] scale-100' : 'scale-0 bg-transparent'}`}
                  />
                </a>
              ))}
            </nav>

            {/* Derecha: CTA opcional */}
            {phone ? (
              <a
                href={`https://wa.me/${phone}`}
                className="hidden md:inline-flex btn-gold"
              >
                WhatsApp
              </a>
            ) : (
              <div className="hidden md:block w-4" />
            )}
          </div>

          {/* Menú móvil */}
          {open && (
            <div className="md:hidden border-t border-[#B8860B]/15 px-3 pb-3">
              {LINKS.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={goTo(l.id)}
                  className={`block px-3 py-2 rounded-lg mt-2
                    ${active === l.id
                      ? 'text-[#B8860B] bg-[#B8860B]/10'
                      : 'opacity-90 hover:bg-black/5'}`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
