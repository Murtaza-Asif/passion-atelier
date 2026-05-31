import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "./product-grid";

export function ServicesSection({ services }: { services: any[] }) {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-luxe">
        <SectionHeader
          eyebrow="The Atelier"
          title={
            <>
              Four signatures, <span className="text-gradient-brand">one philosophy.</span>
            </>
          }
          description="Each collection is a study in restraint — refined materials, considered finishing, and the kind of detail you only notice when it's missing elsewhere."
        />

        <div className="mt-14">
          <ProductGrid services={services} limit={4} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/services"
            className="btn-luxe border border-border bg-background text-foreground hover:bg-secondary"
          >
            View All Collections
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="eyebrow"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-base text-muted-foreground md:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
