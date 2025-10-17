import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import StickyCTA from "@/components/StickyCTA";
import AvatarRotator from "@/components/AvatarRotator";
import MapCard from "@/components/MapCard";

import { getSite, getServices, getGallery } from "@/lib/content";

export const revalidate = 60;

export default async function Home() {
  const [site, services, gallery] = await Promise.all([
    getSite(),
    getServices(),
    getGallery(),
  ]);

  return (
    <main className="min-h-screen">
      {/* 1) Banner principal arriba */}
      <Hero />

      {/* 2) Nav justo debajo del banner (sin marca para no duplicar el título) */}
      <NavBar showBrand={false} />

      {/* 3) Tarjeta con avatar (rotador) inmediatamente debajo del Nav */}
      {site.pro && (
        <section className="max-w-5xl mx-auto px-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 rounded-2xl border border-[#B8860B]/30 bg-[#B8860B]/5 p-4">
            <AvatarRotator
              images={site.pro.avatars ?? (site.pro.avatar ? [site.pro.avatar] : [])}
              alt={`${site.pro.name} – ${site.pro.role ?? "Manicurista"}`}
              sizePx={150}
              intervalMs={4000}
              transitionMs={1000}
              goldRing
              glow
              spin
              spinSpeedMs={2200}
            />

            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Nombre con más contraste */}
                <span
                  className="font-black text-lg md:text-xl leading-none text-[#6E4F00]"
                  style={{ textShadow: "0 1px 0 rgba(0,0,0,0.18)" }}
                >
                  {site.pro.name}
                </span>

                {site.pro.role && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full
                                   bg-[#B8860B]/15 text-[#7A5B00] border border-[#B8860B]/35
                                   text-xs md:text-sm font-semibold">
                    {site.pro.role}
                  </span>
                )}
              </div>

              <p className="text-sm opacity-80 mt-1">{site.pro.bio}</p>
            </div>

            <a
              href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola María, me gustaría agendar una cita ✨")}`}
              className="btn-gold shrink-0"
            >
              Reservar por WhatsApp
            </a>
          </div>
        </section>
      )}

      {/* Servicios */}
      <section id="servicios" className="max-w-6xl mx-auto px-6 py-12 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 h-gold">Servicios</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.length === 0 ? (
            <p className="opacity-70">Pronto agregaremos nuestros servicios ✨</p>
          ) : (
            services.map((s) => (
              <ServiceCard
                key={s.id ?? s.image ?? s.title}
                title={s.title}
                desc={s.desc ?? ""}
                price={s.price ?? ""}
                image={s.image}
                phone={site.whatsapp}
              />
            ))
          )}
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="max-w-6xl mx-auto px-6 py-12 scroll-mt-24">
        <Gallery items={gallery} />
      </section>

      {/* Contacto + Mapa */}
      <section id="contacto" className="max-w-5xl mx-auto px-6 py-12 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 h-gold">Contacto</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <p className="opacity-80">
              {site.address} · {site.hours}
            </p>
            <div className="mt-4 flex gap-3">
              <a href={`https://wa.me/${site.whatsapp}`} className="btn-gold">WhatsApp</a>
              {site.instagram && (
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline opacity-80 hover:opacity-100"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            {site.address && (
              <MapCard
                address={site.address}
                zoom={16}
                height={280}
                linkLabel="Cómo llegar"
              />
            )}
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA phone={site.whatsapp} />
    </main>
  );
}
