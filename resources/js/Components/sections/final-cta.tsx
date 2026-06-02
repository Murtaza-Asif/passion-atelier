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
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-foreground px-8 py-16 text-background md:px-16 md:py-24"
        >
          {/* glow */}
          <div className="pointer-events-none absolute -top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-glow opacity-60 blur-2xl" />
          {/* hatch */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(45deg, currentColor 1px, transparent 1px)",
              backgroundSize: "12px 12px",
            }}
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <p className="eyebrow text-background/60">Begin your bespoke journey</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.05] tracking-tight">
              The next thing you wear<br />
              <span className="text-gradient-brand">should be unforgettable.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-background/70 md:text-lg">
              Speak to a master fabric advisor. Get a personalised recommendation,
              swatches sent direct, and reserved access to our limited weaves.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="btn-luxe bg-background text-foreground hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4 text-violet" />
                Book Consultation
              </a>
              <Link
                href="/collections"
                className="btn-luxe border border-background/30 text-background hover:bg-background/10"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
