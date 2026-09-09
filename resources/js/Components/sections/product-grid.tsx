import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Lock } from "lucide-react";
import type { FrontendProduct, FrontendVariation, FrontendColor } from "@/Lib/site";
import { SORT_OPTIONS } from "@/Lib/site";
import cotton from "@/assets/fabric-cotton.jpg";
import washwear from "@/assets/fabric-washwear.jpg";
import latha from "@/assets/fabric-latha.jpg";
import custom from "@/assets/fabric-custom.jpg";
import { cn } from "@/Lib/utils";
import { useState } from "react";

const imageMap: Record<string, string> = { cotton, washwear, latha, custom };

function formatPrice(p: number) {
  return `PKR ${p.toLocaleString()}`;
}

function getPriceRange(service: FrontendProduct): string {
  const prices = service.variations.map((v) => v.price);
  if (prices.length === 0) return "—";
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return formatPrice(min);
  if (min === 0) return `From ${formatPrice(prices.find((p) => p > 0) ?? max)}`;
  return `${formatPrice(min)} – ${formatPrice(max)}`;
}

function hasDiscount(service: FrontendProduct): boolean {
  return service.variations.some((v) => v.original_price != null);
}

function getDiscount(service: FrontendProduct): number {
  const maxOrig = Math.max(...service.variations.map((v) => v.original_price ?? 0));
  const maxCurr = Math.max(...service.variations.map((v) => v.price));
  if (maxOrig <= maxCurr) return 0;
  return Math.round(((maxOrig - maxCurr) / maxOrig) * 100);
}

export function ProductGrid({ services, limit }: { services: FrontendProduct[]; limit?: number }) {
  const [sort, setSort] = useState<string>("default");
  const data = limit ? services.slice(0, limit) : services;

  const sorted = [...data].sort((a, b) => {
    if (sort === "price-asc") {
      const aMin = Math.min(...a.variations.map((v) => v.price));
      const bMin = Math.min(...b.variations.map((v) => v.price));
      return aMin - bMin;
    }
    if (sort === "price-desc") {
      const aMax = Math.max(...a.variations.map((v) => v.price));
      const bMax = Math.max(...b.variations.map((v) => v.price));
      return bMax - aMax;
    }
    if (sort === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div>
      {!limit && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{services.length}</span> collections
          </p>
          <div className="flex items-center gap-2">
            <label className="text-xs text-muted-foreground">Sort by</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-border/60 bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:border-violet"
            >
              {SORT_OPTIONS.map((o: any) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((service, i) => {
          const img = service.featured_image_url ?? imageMap[service.image_key ?? 'cotton'] ?? cotton;

          return (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={img}
                    alt={service.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {service.in_stock === false && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30 bg-white/10">
                        <Lock className="h-7 w-7 text-white" />
                      </div>
                      <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-white">Out of Stock</p>
                      <p className="mt-1 text-[11px] text-white/70">Coming back soon, Inshallah</p>
                    </div>
                  )}

                  {hasDiscount(service) && (
                    <span className="absolute left-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">
                      -{getDiscount(service)}%
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
                      {service.colors.slice(0, 4).map((c) => (
                        <span
                          key={c.id}
                          className="h-4 w-4 rounded-full border border-border/60"
                          style={{ backgroundColor: c.hex_code }}
                          title={c.name}
                        />
                      ))}
                      {service.colors.length > 4 && (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-border/60 bg-secondary text-[8px] font-medium text-muted-foreground">
                          +{service.colors.length - 4}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{service.colors.length} colors</span>
                  </div>

                  <h3 className="mt-3 font-display text-base font-semibold leading-tight">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {service.short_description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <span className={cn(
                      "font-display text-sm font-semibold",
                      hasDiscount(service) && "text-destructive"
                    )}>
                      {getPriceRange(service)}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-violet">
                      {service.variations.length} vars
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
