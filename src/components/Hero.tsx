'use client';
import Image from "next/image";

type Props = {
  src?: string;
  alt?: string;
  /** "contain" = muestra todo sin recorte | "cover" = llena ancho (puede recortar) */
  mode?: "contain" | "cover";
  /** Alto máx. del hero en px (cuando sea muy grande el viewport) */
  maxHeightPx?: number;
  /** Color de fondo para las franjas cuando se usa contain */
  bg?: string;
};

export default function Hero({
  src = "/bannerArreglado.png",
  alt = "María Clavel | Uñas",
  mode = "contain",
  maxHeightPx = 320,
  bg = "#f3d7df", // rosado suave, ajusta si quieres
}: Props) {
  // Altura ~33vw (3:1) con tope en desktop y piso en móviles
  const heightStyle = { height: `clamp(180px, 33vw, ${maxHeightPx}px)` };

  return (
    <section className="w-full">
      <div className="relative w-full" style={heightStyle}>
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          quality={80}
          className={mode === "contain" ? "object-contain" : "object-cover"}
          style={{ backgroundColor: mode === "contain" ? bg : undefined }}
        />

        {/* Overlay sutil opcional */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/10" />
      </div>
    </section>
  );
}
