import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";
import { SORT_OPTIONS } from "@/Lib/site";
import cotton from "@/assets/fabric-cotton.jpg";
import washwear from "@/assets/fabric-washwear.jpg";
import latha from "@/assets/fabric-latha.jpg";
import custom from "@/assets/fabric-custom.jpg";
import { cn } from "@/Lib/utils";

const imageMap: Record<string, string> = { cotton, washwear, latha, custom };

const collectionImageMap: Record<string, string> = Object.fromEntries([
  ...["classic-cotton", "premium-egyptian-cotton", "daily-comfort", "summer-breeze",
      "office-essential", "weekend-casual", "eco-weave"].map(s => [s, cotton]),
  ...["modern-wash-wear", "business-formal", "travel-ready"].map(s => [s, washwear]),
  ...["executive-latha", "royal-latha", "heritage-weave", "power-suiting",
      "traditional-classic"].map(s => [s, latha]),
  ...["winter-warmth", "ceremonial-luxe", "signature-collection", "urban-edge",
      "bespoke-edition"].map(s => [s, custom]),
]);

function formatPrice(p: number) {
  return `PKR ${p.toLocaleString()}`;
}

function getPriceRange(product: any): string {
  const prices = (product.variations || []).map((v: any) => v.price);
  if (prices.length === 0) return "\u2014";
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return formatPrice(min);
  if (min === 0) return `From ${formatPrice(prices.find((p: number) => p > 0) ?? max)}`;
  return `${formatPrice(min)} \u2013 ${formatPrice(max)}`;
}

function hasDiscount(product: any): boolean {
  return (product.variations || []).some((v: any) => v.original_price != null);
}

function getDiscount(product: any): number {
  const maxOrig = Math.max(...(product.variations || []).map((v: any) => v.original_price ?? 0));
  const maxCurr = Math.max(...(product.variations || []).map((v: any) => v.price));
  if (maxOrig <= maxCurr) return 0;
  return Math.round(((maxOrig - maxCurr) / maxOrig) * 100);
}

function BannerSection({ collection }: { collection: any }) {
  const images = (Array.isArray(collection.banner_images) && collection.banner_images.length > 0)
    ? collection.banner_images
    : collection.banner_url
      ? [collection.banner_url]
      : [];

  const [idx, setIdx] = useState(0);

  if (images.length === 0) {
    const fallback = collectionImageMap[collection.slug];
    return (
      <section className="relative h-[40vh] min-h-[260px] w-full overflow-hidden sm:h-[50vh] sm:min-h-[320px] md:h-[65vh]">
        {fallback ? (
          <img src={fallback} alt={collection.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet/20 to-primary/10">
            <h2 className="font-display text-4xl font-bold text-muted-foreground/30">{collection.name || "Collection"}</h2>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </section>
    );
  }

  return (
    <section className="relative h-[50vh] min-h-[320px] w-full overflow-hidden md:h-[65vh]">
      <img
        src={images[idx]}
        alt={`${collection.name} banner ${idx + 1}`}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      {images.length > 1 && (
        <>
          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            {images.map((_: string, i: number) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={cn("h-1.5 rounded-full transition-all duration-500", i === idx ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60")}
              />
            ))}
          </div>
          <button onClick={() => setIdx((idx - 1 + images.length) % images.length)} className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur transition-all hover:bg-black/40" aria-label="Previous"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={() => setIdx((idx + 1) % images.length)} className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur transition-all hover:bg-black/40" aria-label="Next"><ChevronRight className="h-5 w-5" /></button>
        </>
      )}
    </section>
  );
}

export default function CollectionDetail({ collection, products }: any) {
  const safeProducts = Array.isArray(products) ? products : [];
  const coll = collection || {};
  const [sort, setSort] = useState("default");

  const sorted = [...safeProducts].sort((a: any, b: any) => {
    if (sort === "price-asc") {
      const aMin = Math.min(...(a.variations || []).map((v: any) => v.price));
      const bMin = Math.min(...(b.variations || []).map((v: any) => v.price));
      return aMin - bMin;
    }
    if (sort === "price-desc") {
      const aMax = Math.max(...(a.variations || []).map((v: any) => v.price));
      const bMax = Math.max(...(b.variations || []).map((v: any) => v.price));
      return bMax - aMax;
    }
    if (sort === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Head>
            <title>{`PASSION — ${coll.name || "Collection"}`}</title>
            <meta name="description" content={coll.description || ""} />
          </Head>

          <BannerSection collection={coll} />

          <section className="relative z-10 -mt-12 rounded-t-3xl bg-background px-4 pt-6 sm:-mt-16 sm:px-6 sm:pt-8 md:-mt-20 md:pt-12">
            <div className="container-luxe">
              <div className="mx-auto max-w-2xl text-center">
                <p className="eyebrow">The Collection</p>
                <h1 className="mt-3 font-display text-[clamp(1.6rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
                  {coll.name || "Collection"}
                </h1>
                {coll.description && (
                  <p className="mt-4 text-base text-muted-foreground md:text-lg">{coll.description}</p>
                )}
              </div>
            </div>
          </section>

          <section className="pb-20 pt-8 md:pb-28 md:pt-12">
            <div className="container-luxe">
              {safeProducts.length > 0 && (
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{safeProducts.length}</span> products
                  </p>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground">Sort by</label>
                    <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-border/60 bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:border-violet">
                      {SORT_OPTIONS.map((o: any) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sorted.map((product: any, i: number) => {
                  const img = product.featured_image_url || imageMap[product.image_key || "cotton"] || cotton;
                  return (
                    <motion.div
                      key={product.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                    >
                      <Link
                        href={`/services/${product.slug}`}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <img src={img} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          {hasDiscount(product) && (
                            <span className="absolute left-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">
                              -{getDiscount(product)}%
                            </span>
                          )}
                          <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100">
                            <Eye className="h-4 w-4" />
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white backdrop-blur opacity-0 transition-all duration-500 group-hover:opacity-100">
                            <span className="text-[10px] uppercase tracking-widest text-white/70">Quick view</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-1.5">
                              {(product.colors || []).slice(0, 4).map((c: any) => (
                                <span key={c.id} className="h-4 w-4 rounded-full border border-border/60" style={{ backgroundColor: c.hex_code }} title={c.name} />
                              ))}
                              {(product.colors || []).length > 4 && (
                                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-border/60 bg-secondary text-[8px] font-medium text-muted-foreground">
                                  +{product.colors.length - 4}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-muted-foreground">{(product.colors || []).length} colors</span>
                          </div>
                          <h3 className="mt-3 font-display text-base font-semibold leading-tight">{product.name}</h3>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{product.short_description}</p>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <span className={cn("font-display text-sm font-semibold", hasDiscount(product) && "text-destructive")}>
                              {getPriceRange(product)}
                            </span>
                            <span className="text-[10px] uppercase tracking-widest text-violet">{(product.variations || []).length} vars</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {safeProducts.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-lg text-muted-foreground">No products in this collection yet.</p>
                  <Link href="/collections" className="mt-4 inline-block text-sm text-violet underline underline-offset-4 hover:text-violet/80">Browse all collections</Link>
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
