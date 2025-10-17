import Image from "next/image";

type ServiceCardProps = {
  title: string;
  desc?: string;
  price?: number | string;
  image?: string;
  phone?: string; // opcional: para CTA WhatsApp por servicio
};

function formatPrice(price?: number | string) {
  if (price === undefined || price === null || `${price}`.trim() === "") return "";
  if (typeof price === "number") {
    // Formato CLP sin decimales
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(price);
  }
  const str = `${price}`.trim();
  // Si ya trae moneda, respétalo
  if (/\$|CLP/i.test(str)) return str;
  return `$${str}`;
}

export default function ServiceCard({ title, desc, price, image, phone }: ServiceCardProps) {
  const priceLabel = formatPrice(price);

  return (
    <article className="rounded-2xl bg-ivory/90 shadow-md p-4 hover:shadow-lg transition-shadow">
      {image && (
        <div className="relative aspect-square mb-3 rounded-xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
            priority={false}
          />
        </div>
      )}

      <h3 className="text-lg font-semibold">{title}</h3>

      {desc && <p className="mt-1 opacity-80">{desc}</p>}

      {priceLabel && (
        <div className="mt-2 font-medium text-espresso">
          {priceLabel}
        </div>
      )}

      {phone && (
        <a
          href={`https://wa.me/${phone}?text=${encodeURIComponent(`Hola María, quiero reservar: ${title}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold mt-3 inline-block"
        >
          Reservar este servicio
        </a>
      )}
    </article>
  );
}
