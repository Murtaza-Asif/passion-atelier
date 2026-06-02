import { motion } from "framer-motion";

const TIMELINE = [
  { y: "01", title: "Brand Foundation", body: "PASSION is founded in Lahore with a single ambition: to make unstitched fabric the most considered purchase a man makes." },
  { y: "02", title: "Collection Expansion", body: "Cotton, Wash & Wear and Latha series are introduced — each with proprietary finishing standards." },
  { y: "03", title: "International Tailoring Partnerships", body: "Direct supply relationships with master tailors across the GCC, UK and South-East Asia." },
  { y: "04", title: "Global Luxury Positioning", body: "Silicon Valley flagship opens; PASSION enters the conversation with the world's most respected fabric houses." },
];

export function FounderSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="eyebrow">Letter from the founder</p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
            &ldquo;Redefining men&rsquo;s elegance through<br />
            <span className="text-gradient-brand">precision fabric craftsmanship.</span>&rdquo;
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            I founded PASSION on a quiet conviction: that the way a man dresses
            should begin long before the first stitch. The fabric is the
            first decision and the most lasting one. Everything we do — every
            weave, every finish, every advisor we train — exists to honour
            that decision.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-3xl">
          {TIMELINE.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex gap-5 border-t border-border/60 py-5 transition-colors hover:bg-secondary/40"
            >
              <span className="font-display text-lg font-semibold text-violet">{t.y}</span>
              <div className="flex-1">
                <p className="font-display text-base font-semibold">{t.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
