import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";
import cotton from "@/assets/fabric-cotton.jpg";
import washwear from "@/assets/fabric-washwear.jpg";
import latha from "@/assets/fabric-latha.jpg";
import custom from "@/assets/fabric-custom.jpg";

const collectionImageMap: Record<string, string> = Object.fromEntries([
  ...["classic-cotton", "premium-egyptian-cotton", "daily-comfort", "summer-breeze",
      "office-essential", "weekend-casual", "eco-weave"].map(s => [s, cotton]),
  ...["modern-wash-wear", "business-formal", "travel-ready"].map(s => [s, washwear]),
  ...["executive-latha", "royal-latha", "heritage-weave", "power-suiting",
      "traditional-classic"].map(s => [s, latha]),
  ...["winter-warmth", "ceremonial-luxe", "signature-collection", "urban-edge",
      "bespoke-edition"].map(s => [s, custom]),
]);

interface FrontendCollection {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string | null;
  banner_url: string | null;
  banner_images: string[];
}

interface CollectionsPageProps {
  collections: FrontendCollection[];
}

export default function Collections({ collections }: CollectionsPageProps) {
  const safeCollections = Array.isArray(collections) ? collections : [];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-20">
          <Head>
            <title>All Collections — PASSION</title>
            <meta name="description" content="Browse PASSION's complete collection of premium men's unstitched fabrics." />
            <meta property="og:title" content="Collections — PASSION" />
            <meta property="og:description" content="Premium men's unstitched fabric collections." />
          </Head>

          <section className="bg-gradient-soft pt-32 pb-8 md:pt-40">
            <div className="container-luxe max-w-3xl">
              <p className="eyebrow">The Collections</p>
              <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
                Every length, <span className="text-gradient-brand">considered.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
                Four signature collections, each refined to a single purpose. Tap any tile to discover its story.
              </p>
            </div>
          </section>

          <section className="py-12 md:py-20">
            <div className="container-luxe">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {safeCollections.map((c, i) => {
                  const img = c.image_url ?? collectionImageMap[c.slug];
                  return (
                    <motion.div
                      key={c.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
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
                              <span className="font-display text-5xl font-bold text-muted-foreground/30">
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

              {safeCollections.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-lg text-muted-foreground">No collections available yet.</p>
                  <Link href="/" className="mt-4 inline-block text-sm text-violet underline underline-offset-4 hover:text-violet/80">
                    Back to home
                  </Link>
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </ThemeProvider>
  );
}
