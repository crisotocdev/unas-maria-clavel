// src/components/ServiceCard.tsx
import Image from "next/image";

type ServiceCardProps = {
  title: string;
  desc: string;
  price: number | string;
  image: string;                   // p. ej. "/services/unasSemitransparentes.webp"
  aspect?: "square" | "16/9" | "4/3";
};

export default function ServiceCard({
  title,
  desc,
  price,
  image,
  aspect = "square",
}: ServiceCardProps) {
  const aspectClass =
    aspect === "16/9" ? "aspect-[16/9]" :
    aspect === "4/3"  ? "aspect-[4/3]"  :
                        "aspect-square";

  return (
    <article className="rounded-2xl bg-white border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,.08)] overflow-hidden">
      {/* wrapper de imagen con fondo tenue por si el asset tiene transparencias */}
      <div className={`relative ${aspectClass} bg-beige/40`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width:1280px) 400px, (min-width:640px) 50vw, 100vw"
          priority={false}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm opacity-80">{desc}</p>
        <div className="mt-3 font-medium text-gold">${price}</div>
      </div>
    </article>
  );
}
