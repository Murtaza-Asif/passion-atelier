import { motion } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";
import { SITE } from "@/Lib/site";
import { SectionHeader } from "./services-section";

export function LocationsSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-luxe">
        <SectionHeader
          eyebrow="Boutiques"
          title={<>From Lahore to <span className="text-gradient-brand">Silicon Valley.</span></>}
          description="Two ateliers, one standard. Visit by appointment for a private fabric session, or chat with our advisor on WhatsApp from anywhere."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SITE.locations.map((loc, i) => (
            <motion.div
              key={loc.city}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card"
            >
              <div className="aspect-[16/10] w-full overflow-hidden border-b border-border/60">
                <iframe
                  src={loc.mapsEmbed}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${loc.city} map`}
                  className="h-full w-full grayscale transition-all duration-700 group-hover:grayscale-0"
                />
              </div>
              <div className="flex items-center justify-between p-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {loc.country}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold">{loc.city}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground/70">
                    <MapPin className="h-3.5 w-3.5 text-violet" />
                    {loc.address}
                  </p>
                </div>
                <a
                  href={loc.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                  aria-label="Open in Google Maps"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
