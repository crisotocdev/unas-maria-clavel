'use client';

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  images: string[];
  alt: string;
  sizePx?: number;          // tamaño del área de la foto (sin contar el aro)
  intervalMs?: number;      // cada cuánto cambia la foto
  transitionMs?: number;    // duración del crossfade
  pauseOnHover?: boolean;   // pausa en hover
  className?: string;

  // Aro dorado y efectos
  goldRing?: boolean;       // muestra aro dorado
  ringThickness?: number;   // grosor del aro en px
  spin?: boolean;           // el aro gira
  spinSpeedMs?: number;     // velocidad del giro (ms), ej: 2200
  glow?: boolean;           // brillo/pulso suave
};

export default function AvatarRotator({
  images,
  alt,
  sizePx = 96,
  intervalMs = 3000,
  transitionMs = 600,
  pauseOnHover = true,
  className = "",
  goldRing = true,
  ringThickness = 3,
  spin = true,
  spinSpeedMs = 2200,
  glow = true,
}: Props) {
  const imgs = useMemo(() => (images ?? []).filter(Boolean), [images]);

  const [curr, setCurr] = useState(0);
  const [next, setNext] = useState(imgs.length > 1 ? 1 : 0);
  const [xfade, setXfade] = useState(false);
  const [playing, setPlaying] = useState(true);

  const intervalRef = useRef<number | null>(null);
  const timeoutRef  = useRef<number | null>(null);

  // Rotación de fotos (crossfade)
  useEffect(() => {
    if (!playing || imgs.length <= 1) return;

    intervalRef.current = window.setInterval(() => {
      setXfade(true);
      timeoutRef.current = window.setTimeout(() => {
        setCurr((i) => (i + 1) % imgs.length);
        setNext((i) => (i + 1) % imgs.length);
        setXfade(false);
      }, transitionMs);
    }, intervalMs);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (timeoutRef.current)  window.clearTimeout(timeoutRef.current);
    };
  }, [imgs.length, intervalMs, transitionMs, playing]);

  if (imgs.length === 0) {
    return (
      <div
        style={{ width: sizePx, height: sizePx }}
        className={`rounded-full bg-neutral-200 ${className}`}
        aria-label={alt}
      />
    );
  }

  // Tamaño total (foto + aro)
  const outer = goldRing ? sizePx + ringThickness * 2 : sizePx;

  return (
    <div
      style={{ width: outer, height: outer }}
      className={`relative ${className}`}
      onMouseEnter={() => pauseOnHover && setPlaying(false)}
      onMouseLeave={() => pauseOnHover && setPlaying(true)}
      aria-label={alt}
      role="img"
    >
      {/* Aro dorado (capa inferior) */}
      {goldRing && (
        <>
          {/* Disco dorado que gira con un “destello” visible */}
          <div
            className={`absolute inset-0 rounded-full ${spin ? "animate-spin" : ""}`}
            style={{
              // degradado con “cuña” clara para que se note el giro
              background:
                "conic-gradient(#8B6A00 0deg, #8B6A00 40deg, #F8EFB5 70deg, #8B6A00 110deg, #8B6A00 360deg)",
              animationDuration: spin ? `${spinSpeedMs}ms` : undefined,
              animationTimingFunction: "linear",
              // pausa el giro si estamos en hover (playing=false) o si spin=false
              animationPlayState: spin && playing ? "running" : "paused",
              filter: glow ? "drop-shadow(0 0 10px rgba(248, 239, 181, 0.45))" : undefined,
              willChange: "transform",
            }}
            aria-hidden
          />

          {/* Recorte interior para que solo quede el aro */}
          <div
            className="absolute rounded-full inset-0 bg-transparent"
            style={{ padding: ringThickness }}
            aria-hidden
          >
            {/* Fondo del “hueco” (usa el color de tu layout para integrarlo) */}
            <div className="w-full h-full rounded-full bg-[#efe6d4] ring-1 ring-[#8B6A00]/30" />
          </div>
        </>
      )}

      {/* Contenedor de imagen (capa superior), con recorte si hay aro */}
      <div
        className="absolute overflow-hidden rounded-full"
        style={{ inset: goldRing ? ringThickness : 0 }}
      >
        {/* Imagen actual */}
        <Image
          key={`curr-${imgs[curr]}`}
          src={imgs[curr]}
          alt={alt}
          fill
          sizes={`${sizePx}px`}
          priority
          className="absolute inset-0 object-cover"
          style={{
            opacity: xfade ? 0 : 1,
            transition: `opacity ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        />
        {/* Imagen siguiente (para el crossfade) */}
        {imgs.length > 1 && (
          <Image
            key={`next-${imgs[next]}`}
            src={imgs[next]}
            alt=""
            fill
            sizes={`${sizePx}px`}
            className="absolute inset-0 object-cover"
            style={{
              opacity: xfade ? 1 : 0,
              transition: `opacity ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
