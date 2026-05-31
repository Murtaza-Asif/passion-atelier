import { motion } from "framer-motion";

const LOGOS = [
  "MAISON HUDSON", "ATELIER 47", "ROCHE & SONS", "GRAND BOULEVARD",
  "LE CABINET", "NORTH SAVILE", "CASA MILANO", "VERTEX SUITINGS",
];

export function LogoMarquee() {
  const row = [...LOGOS, ...LOGOS];
  return (
    <section className="border-y border-border/60 bg-secondary/40 py-10">
      <div className="container-luxe mb-6">
        <p className="eyebrow text-center">Trusted by tailoring houses across 14 countries</p>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        >
          {row.map((name, i) => (
            <span
              key={i}
              className="font-display text-xl font-semibold tracking-[0.25em] text-foreground/40 transition-colors hover:text-foreground"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
