import Image from "next/image";

export default function Hero() {
  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-6xl">
        {/* Contenedor con altura controlada */}
        <div className="relative overflow-hidden rounded-3xl shadow-soft
                        h-40 sm:h-52 md:h-64 lg:h-72 xl:h-80">

          {/* La imagen se “pega” al contenedor y cubre sin crecer de más */}
          <Image
            src="/bannerArreglado.png"
            alt="Uñas María Clavel"
            fill
            priority
            className="object-cover object-center"
            sizes="(min-width: 1280px) 1100px, (min-width: 1024px) 900px, (min-width: 640px) 600px, 100vw"
            // si quieres mover el punto focal:
            // className="object-cover [object-position:50%_35%]"
          />
        </div>
      </div>
    </section>
  );
}
