import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import cotton from "@/assets/fabric-cotton.jpg";
import washwear from "@/assets/fabric-washwear.jpg";
import latha from "@/assets/fabric-latha.jpg";
import custom from "@/assets/fabric-custom.jpg";

const collectionImageMap: Record<string, string> = {
  "premium-cotton-collection": cotton,
  "luxury-wash-wear": washwear,
  "formal-latha-series": latha,
  "custom-fabric-selection": custom,
};

interface FrontendCollection {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string | null;
  banner_url: string | null;
  banner_images: string[];
}

export function ServicesSection({ collections }: { collections: FrontendCollection[] }) {
  const safeCollections = Array.isArray(collections) ? collections : [];

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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {safeCollections.map((c, i) => {
            const img = c.image_url ?? collectionImageMap[c.slug];
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/collections/${c.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {img ? (
                      <img
                        src={img}
                        alt={c.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet/10 to-primary/10">
                        <span className="font-display text-4xl font-bold text-muted-foreground/30">
                          {c.name?.charAt(0) || "?"}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white backdrop-blur opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <span className="text-[10px] uppercase tracking-widest text-white/70">Explore</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-display text-base font-semibold leading-tight">{c.name || "Collection"}</h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{c.description || ""}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/collections"
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
