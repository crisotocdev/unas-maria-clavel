'use client';

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import type { GalleryItem } from "@/lib/types";

type Props = {
  items?: GalleryItem[];
  /** Título opcional. Si es null/undefined, no se renderiza */
  title?: string | null;
  /** Clases extra para el contenedor externo */
  className?: string;
  /** Estilo del marco/hover de las tarjetas */
  accent?: "gold" | "neutral";
};

export default function Gallery({
  items = [],
  title = null,          // ← oculto por defecto
  className = "",
  accent = "gold",       // ← dorado por defecto
}: Props) {
  const itemsResolved = items;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev  = useCallback(
    () => setActiveIndex(i => (i === null ? null : (i + itemsResolved.length - 1) % itemsResolved.length)),
    [itemsResolved.length]
  );
  const next  = useCallback(
    () => setActiveIndex(i => (i === null ? null : (i + 1) % itemsResolved.length)),
    [itemsResolved.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, prev, next]);

  // Estilos de marco/hover para las cards
  const frameBase = "group relative rounded-xl overflow-hidden border transition-all";
  const frame =
    accent === "gold"
      ? "border-[#D4AF37]/50 bg-[#D4AF37]/[0.06] hover:ring-2 hover:ring-[#D4AF37]/60"
      : "border-stone-300/60 bg-stone-100/10 hover:ring-2 hover:ring-stone-400/40";

  return (
    <div className={`mx-auto max-w-6xl px-6 py-12 ${className}`}>
      {title && (
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 h-gold">{title}</h2>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {itemsResolved.map((item) => (
          <button
            key={item.src}
            onClick={() =>
              setActiveIndex(itemsResolved.findIndex((x) => x.src === item.src))
            }
            className={`${frameBase} ${frame} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70`}
            aria-label={`Abrir imagen: ${item.alt ?? ""}`}
          >
            <Image
              src={item.src}
              alt={item.alt ?? ""}
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
              className="w-full h-auto aspect-square object-cover group-hover:opacity-95"
              sizes="(max-width: 1024px) 33vw, 16vw"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && itemsResolved[activeIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de cierre visible (además de Esc) */}
            <button
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-3 top-3 z-[60] rounded-full bg-black/60 px-3 py-1 text-white text-sm hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              ✕
            </button>

            <Image
              src={itemsResolved[activeIndex].src}
              alt={itemsResolved[activeIndex].alt ?? ""}
              width={1600}
              height={1200}
              className="w-full h-auto rounded-xl"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
