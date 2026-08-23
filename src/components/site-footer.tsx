import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="band-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-semibold">Studiekeuze</p>
            <p className="mt-3 text-sm text-ink-foreground/70">
              Een geleide verkenning voor havo- en vwo-leerlingen. Gemaakt om het gesprek met de
              decaan voor te bereiden, niet om het te vervangen.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-foreground/70">
            <Link to="/voor-leerlingen" className="transition-colors hover:text-mint">
              Voor leerlingen
            </Link>
            <Link to="/voor-scholen" className="transition-colors hover:text-mint">
              Voor scholen
            </Link>
            <Link to="/onderbouwing" className="transition-colors hover:text-mint">
              Onderbouwing
            </Link>
            <Link to="/prijzen" className="transition-colors hover:text-mint">
              Prijzen
            </Link>
            <Link to="/contact" className="transition-colors hover:text-mint">
              Contact
            </Link>
          </nav>
        </div>
        <p className="mt-12 border-t border-ink-foreground/15 pt-6 text-xs text-ink-foreground/50">
          © {new Date().getFullYear()} Studiekeuze · Geen account, geen opslag van gesprekken.
        </p>
      </div>
    </footer>
  );
}
