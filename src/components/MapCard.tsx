'use client';

type Props = {
  address: string;
  zoom?: number;            // default 16
  className?: string;
  height?: number;          // alto en px (default 260)
  linkLabel?: string;       // texto del botón (default "Cómo llegar")
};

export default function MapCard({
  address,
  zoom = 16,
  className = "",
  height = 260,
  linkLabel = "Cómo llegar",
}: Props) {
  const enc = encodeURIComponent(address);
  const embedSrc = `https://www.google.com/maps?q=${enc}&z=${zoom}&output=embed`;
  const linkHref = `https://www.google.com/maps?q=${enc}`;

  return (
    <div className={`rounded-2xl overflow-hidden border border-[#B8860B]/30 bg-[#B8860B]/5 ${className}`}>
      <div className="relative w-full" style={{ height }}>
        <iframe
          title={`Mapa: ${address}`}
          src={embedSrc}
          className="absolute inset-0 w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="p-3 flex items-center justify-between gap-3">
        <p className="text-sm opacity-80 truncate">{address}</p>
        <a
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold whitespace-nowrap"
        >
          {linkLabel}
        </a>
      </div>
    </div>
  );
}
