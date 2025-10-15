export default function NavBar() {
  return (
    <header className="w-full">
      <nav className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <span className="text-xl font-semibold h-gold">María Clavel</span>
        <div className="flex gap-5 text-sm">
          <a href="#servicios" className="opacity-80 hover:opacity-100">Servicios</a>
          <a href="#contacto" className="opacity-80 hover:opacity-100">Contacto</a>
        </div>
      </nav>
    </header>
  );
}
