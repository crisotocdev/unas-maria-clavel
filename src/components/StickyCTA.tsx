'use client';

type Props = {
  phone: string;                // ej: "56912345678"
  message?: string;
  label?: string;
};

export default function StickyCTA({
  phone,
  message = "Hola, me gustaría agendar una cita ✨",
  label = "WhatsApp"
}: Props) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-900/30"
      aria-label="Abrir WhatsApp"
    >
      💬 {label}
    </a>
  );
}
