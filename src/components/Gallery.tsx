'use client';

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import type { GalleryItem } from "@/lib/types";

type Props = { items?: GalleryItem[] };

export default function Gallery({ items = [] }: Props) {
  const itemsResolved = items;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev  = useCallback(() => setActiveIndex(i => (i === null ? null : (i + itemsResolved.length - 1) % itemsResolved.length)), [itemsResolved.length]);
  const next  = useCallback(() => setActiveIndex(i => (i === null ? null : (i + 1) % itemsResolved.length)), [itemsResolved.length]);

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

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-2xl font-bold text-emerald-400 mb-4">Galería</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {itemsResolved.map((item) => (
          <button
            key={item.src}
            onClick={() => setActiveIndex(itemsResolved.findIndex(x => x.src === item.src))}
            className="group relative rounded-xl overflow-hidden border border-emerald-700/40 bg-emerald-900/20"
            aria-label={`Abrir imagen: ${item.alt ?? ""}`}
          >
            <Image src={item.src} alt={item.alt ?? ""} width={600} height={600}
                   className="w-full h-auto aspect-square object-cover" sizes="(max-width: 1024px) 33vw, 16vw" />
          </button>
        ))}
      </div>

      {activeIndex !== null && itemsResolved[activeIndex] && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={close}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <Image src={itemsResolved[activeIndex].src} alt={itemsResolved[activeIndex].alt ?? ""} width={1600} height={1200} className="w-full h-auto rounded-xl" />
          </div>
        </div>
      )}
    </section>
  );
}
