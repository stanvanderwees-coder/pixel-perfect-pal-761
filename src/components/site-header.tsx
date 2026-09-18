import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoMark from "@/assets/logo-mark.png";

const links = [
  { to: "/tool", label: "De tool" },
  { to: "/voor-leerlingen", label: "Voor leerlingen" },
  { to: "/voor-scholen", label: "Voor scholen" },
  { to: "/onderbouwing", label: "Onderbouwing" },
  { to: "/prijzen", label: "Prijzen" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logoMark} alt="" className="h-10 w-auto" />
          <span className="font-display text-lg font-semibold tracking-tight">
            <span className="text-navy">Study</span>
            <span className="text-coral">Fit</span>
            <span className="text-teal">.AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/tool"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-transform hover:scale-105 active:scale-95 md:inline-flex"
          >
            Start de tool
          </Link>
          <button
            type="button"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu-enter border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm text-muted-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/tool"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Start de tool
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
