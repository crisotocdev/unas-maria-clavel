// src/app/page.tsx
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";

export const revalidate = 60; // ISR opcional

type Service = {
  id: string;
  title: string;
  desc: string;
  price: number | string;
  image: string;
  aspect?: "square" | "16/9" | "4/3";
};

export default async function Home() {
  // Datos de ejemplo (puedes moverlos a /lib/content si quieres)
  const site = {
    brand: "María Clavel | Uñas",
    tagline: "Diseños finos en tonos beige y dorado",
    whatsapp: "56900000000", // <-- pon el número real sin + ni espacios
    instagram: "https://instagram.com/",
    address: "Villa Alemana, CL",
    hours: "Lun–Sáb 10:00–19:00",
  };

  const services: Service[] = [
    {
      id: "semi",
      title: "Uñas semipermanentes",
      desc: "Color liso, acabado espejo.",
      price: 18,
      image: "/services/unasSemitransparentes.webp",
      aspect: "square",
    },
    {
      id: "nailart",
      title: "Nail Art",
      desc: "Diseños minimal pop (dorado, beige, blanco).",
      price: 22,
      image: "/services/nailArt.webp",
      aspect: "square",
    },
    {
      id: "acrilicas",
      title: "Acrílicas",
      desc: "Extensión + forma personalizada.",
      price: 28,
      image: "/services/acrilicas.webp",
      aspect: "square",
    },
  ];

  return (
    <main className="min-h-screen">
      <NavBar />

      {/* Hero con el banner */}
      <Hero />

      {/* Intro / CTA */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold h-gold">{site.brand}</h1>
        <p className="mt-2 text-lg opacity-80">{site.tagline}</p>
        <a
          href={`https://wa.me/${site.whatsapp}`}
          className="btn-gold mt-6 inline-flex"
        >
          Reservar por WhatsApp
        </a>
      </section>

      {/* Servicios */}
      <section id="servicios" className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-4 h-gold">Servicios</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              title={s.title}
              desc={s.desc}
              price={s.price}
              image={s.image}
              aspect={s.aspect ?? "square"}
            />
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-2 h-gold">Contacto</h2>
        <p className="opacity-80">
          {site.address} · {site.hours}
        </p>
        <div className="mt-4 flex gap-3">
          <a
            href={`https://wa.me/${site.whatsapp}`}
            className="btn-gold inline-flex"
          >
            WhatsApp
          </a>
          {site.instagram && (
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="underline opacity-85 hover:opacity-100"
            >
              Instagram
            </a>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
