import { Link } from "@inertiajs/react";
import { Send, Globe, Mail, MapPin } from "lucide-react";
import { SITE } from "@/Lib/site";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border/60 bg-gradient-soft sm:mt-32">
      <div className="container-luxe px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-xs font-bold text-white">
                P
              </span>
              <span className="font-display text-xl font-semibold tracking-tight">
                {SITE.brand}
              </span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              A premium men's unstitched fabric house — engineered for elegance,
              precision, and the quiet confidence of a well-tailored life.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href="#" aria-label="Social" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 transition-colors hover:bg-secondary">
                <Send className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Website" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 transition-colors hover:bg-secondary">
                <Globe className="h-4 w-4" />
              </a>
              <a href={`mailto:${SITE.email}`} aria-label="Email" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 transition-colors hover:bg-secondary">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-3">
            <div>
              <p className="eyebrow mb-4">Atelier</p>
              <ul className="space-y-3 text-sm">
                {SITE.nav.slice(0, 4).map((n) => (
                  <li key={n.to}>
                    <Link href={n.to} className="text-foreground/70 transition-colors hover:text-foreground">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4">House</p>
              <ul className="space-y-3 text-sm">
                {SITE.nav.slice(4).map((n) => (
                  <li key={n.to}>
                    <Link href={n.to} className="text-foreground/70 transition-colors hover:text-foreground">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4">Outlets</p>
              <ul className="space-y-4 text-sm">
                {SITE.locations.map((l) => (
                  <li key={l.city} className="flex gap-2 text-foreground/70">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
                    <span>
                      <span className="block font-medium text-foreground">{l.city}</span>
                      <span className="text-xs text-muted-foreground">{l.address}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="hairline my-8 sm:my-10" />

        <div className="flex flex-col items-start justify-between gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {SITE.brand}. Crafted in Karachi. Worn worldwide.</p>
          <p>Founded by {SITE.founder}</p>
        </div>
      </div>
    </footer>
  );
}
