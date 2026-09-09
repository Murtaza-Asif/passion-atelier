import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE } from "@/Lib/site";

export function FinalCta() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-violet/15 dark:border-violet/20 bg-gradient-to-br from-violet/[0.04] via-background to-violet/[0.02] dark:from-[oklch(0.12_0.015_280)] dark:via-[oklch(0.14_0.04_290)] dark:to-[oklch(0.10_0.018_280)] px-6 py-14 sm:px-10 sm:py-18 md:px-20 md:py-24"
        >
          {/* soft radial glow */}
          <div className="pointer-events-none absolute -top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-25 dark:opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, oklch(0.55 0.25 285 / 0.4), transparent 70%)" }}
          />
          {/* subtle noise texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(45deg, currentColor 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          {/* top accent line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/30 dark:via-violet/50 to-transparent" />

          <div className="relative mx-auto max-w-2xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow text-violet/80 dark:text-violet/90"
            >
              Begin your bespoke journey
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 font-display text-[clamp(1.6rem,4.5vw,3.2rem)] font-semibold leading-[1.08] tracking-tight text-foreground"
            >
              The next thing you wear<br />
              <span className="text-gradient-brand">should be unforgettable.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              Speak to a master fabric advisor. Get a personalised recommendation,
              swatches sent direct, and reserved access to our limited weaves.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4"
            >
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="btn-luxe bg-violet text-violet-foreground hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                Book Consultation
              </a>
              <Link
                href="/collections"
                className="btn-luxe border border-foreground/15 text-foreground hover:bg-foreground/5 dark:border-white/25 dark:text-white dark:hover:bg-white/[0.08]"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
