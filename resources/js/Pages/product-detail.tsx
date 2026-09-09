import { Head, Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Minus, Plus, ShoppingBag, ArrowRight, Check, Shield, Truck, RotateCcw, Heart, MessageCircle, Award, Scissors, Thermometer, Sparkles, Lock } from "lucide-react";
import type { FrontendProduct } from "@/Lib/site";
import { SITE } from "@/Lib/site";
import { useCart } from "@/Lib/cart-context";
import { useAuth } from "@/Lib/auth-context";
import { cn } from "@/Lib/utils";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";
import cotton from "@/assets/fabric-cotton.jpg";
import washwear from "@/assets/fabric-washwear.jpg";
import latha from "@/assets/fabric-latha.jpg";
import custom from "@/assets/fabric-custom.jpg";

const imageMap: Record<string, string> = { cotton, washwear, latha, custom };

function formatPrice(p: number) {
  return `PKR ${p.toLocaleString()}`;
}

interface ServicePageProps {
  slug: string;
  service: FrontendProduct | null;
}

const FEATURES = [
  { icon: Shield, label: "Premium Quality", desc: "Heritage-sourced & certified" },
  { icon: Truck, label: "Express Delivery", desc: "3-5 business days" },
  { icon: RotateCcw, label: "Easy Returns", desc: "7-day exchange policy" },
  { icon: MessageCircle, label: "24/7 Support", desc: "WhatsApp concierge" },
];

const BENEFITS = [
  { icon: Award, title: "Heritage sourcing", body: "Yarns selected from mills with decades of provenance." },
  { icon: Scissors, title: "Tailor-friendly handle", body: "Cuts cleanly, finishes crisply — favoured by master tailors." },
  { icon: Thermometer, title: "Climate engineered", body: "Weight and weave matched to your environment." },
  { icon: Shield, title: "Lifetime support", body: "Care guidance and re-sourcing on every length we sell." },
];

export default function ServiceDetail({ slug, service }: ServicePageProps) {
  const { addItem } = useCart();
  const { requireAuth } = useAuth();
  const { auth } = usePage().props as { auth: { user: any } };
  const [selectedVar, setSelectedVar] = useState<any | null>(null);
  const [selectedColor, setSelectedColor] = useState<any | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (service) {
      const firstVar = service.variations?.[0] ?? null;
      setSelectedVar(firstVar);
      setSelectedColor(firstVar?.color ?? null);
      setQty(1);
      setAdded(false);
      setActiveImg(0);
    }
  }, [service]);

  if (!service) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl font-semibold">Product not found</h1>
            <Link href="/services" className="mt-4 inline-block text-violet hover:underline">← Back to shop</Link>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  const fallbackImg = service.featured_image_url ?? imageMap[service.image_key ?? 'cotton'] ?? cotton;
  const img = selectedVar?.image_url ?? fallbackImg;
  const hasDiscount = selectedVar?.original_price != null && Number(selectedVar.original_price) > Number(selectedVar.price);

  const thumbnails = service.variations?.filter((v: any) => v.image_url) ?? [];
  const uniqueThumbnails = thumbnails.length > 0 ? thumbnails : service.variations?.map((v: any) => ({ ...v, image_url: fallbackImg })) ?? [];
  const relatedServices = [];

  const handleAddToCart = () => {
    if (!selectedVar || !selectedColor) return;
    if (auth.user) {
      addItem(service, selectedVar, selectedColor, qty);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } else {
      requireAuth(service, selectedVar, selectedColor, qty);
    }
  };

  const handleBuyNow = () => {
    if (!selectedVar || !selectedColor) return;
    if (auth.user) {
      addItem(service, selectedVar, selectedColor, qty);
      const link = document.createElement("a");
      link.href = "/checkout";
      link.click();
    } else {
      requireAuth(service, selectedVar, selectedColor, qty);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main className="pt-14 sm:pt-16">
          <Head title={`PASSION — ${service.name}`}>
            <meta name="description" content={service.long_description ?? ""} />
            <meta property="og:title" content={`PASSION — ${service.name}`} />
            <meta property="og:description" content={service.long_description ?? ""} />
          </Head>

          {/* Breadcrumb */}
          <section className="border-b border-border/60 bg-secondary/30">
            <div className="container-luxe flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2.5 sm:py-3 text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-foreground">Shop</Link>
              <span>/</span>
              <span className="text-foreground truncate">{service.name}</span>
            </div>
          </section>

          {/* Product Section */}
          <section className="py-6 sm:py-8 md:py-12 lg:py-16">
            <div className="container-luxe">
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-10 xl:gap-16">

                {/* LEFT — Images */}
                <div className="lg:col-span-6">
                  {/* Main Image */}
                  <div className="relative overflow-hidden rounded-xl border border-border/70 shadow-card">
                    <div className="aspect-[4/5]">
                      <img src={img} alt={service.name} className="h-full w-full object-cover transition-all duration-700" />
                    </div>
                    {service.in_stock === false && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30 bg-white/10">
                          <Lock className="h-7 w-7 text-white" />
                        </div>
                        <p className="mt-3 text-base font-semibold uppercase tracking-widest text-white">Out of Stock</p>
                        <p className="mt-1 text-xs text-white/70">Coming back soon, Inshallah</p>
                      </div>
                    )}
                    {hasDiscount && (
                      <span className="absolute left-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-[10px] sm:text-xs font-bold text-destructive-foreground">
                        -{Math.round(((Number(selectedVar!.original_price) - Number(selectedVar!.price)) / Number(selectedVar!.original_price)) * 100)}%
                      </span>
                    )}
                    <button aria-label="Add to wishlist" className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground/60 backdrop-blur transition-colors hover:bg-background hover:text-foreground">
                      <Heart className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Thumbnails */}
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {uniqueThumbnails.map((v: any, i: number) => (
                      <button key={v.id} onClick={() => { setSelectedVar(v); if (v.color) setSelectedColor(v.color); setAdded(false); setActiveImg(i); }} className={cn("aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:w-20", selectedVar?.id === v.id ? "border-violet" : "border-border/60 opacity-60 hover:opacity-100")}>
                        <img src={v.image_url ?? fallbackImg} alt={v.name ?? ''} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* RIGHT — Details */}
                <div className="lg:col-span-6 lg:pt-0">
                  <p className="eyebrow">{service.season}</p>
                  <h1 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-[clamp(1.5rem,3vw,2.75rem)]">{service.name}</h1>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{service.long_description}</p>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline gap-3 md:mt-6">
                    {selectedVar && (
                      <>
                        <span className="font-display text-2xl font-semibold text-foreground md:text-3xl">{formatPrice(Number(selectedVar.price))}</span>
                        {hasDiscount && <span className="font-display text-sm text-muted-foreground line-through md:text-lg">{formatPrice(Number(selectedVar.original_price))}</span>}
                      </>
                    )}
                  </div>
                  <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">Inclusive of all taxes. Fabric per metre.</p>

                  {/* Grade */}
                  <div className="mt-5 sm:mt-6 md:mt-8">
                    <p className="text-xs font-medium text-foreground sm:text-sm">Grade</p>
                    <div className="mt-2.5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2 sm:overflow-visible">
                      {service.variations?.map((v: any) => (
                        <button key={v.id} onClick={() => { setSelectedVar(v); if (v.color) setSelectedColor(v.color); setAdded(false); }} className={cn("rounded-xl border px-3 py-3 text-left transition-all sm:min-w-0 sm:shrink sm:flex-1 sm:max-w-[180px]", selectedVar?.id === v.id ? "border-violet bg-violet/5 ring-1 ring-violet/30" : "border-border/70 bg-card hover:border-foreground/30")}>
                          <p className="text-xs font-semibold sm:text-sm">{v.name}</p>
                          <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-xs">{v.description}</p>
                          <p className="mt-1 text-xs font-semibold text-violet sm:text-sm">{formatPrice(Number(v.price))}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color */}
                  <div className="mt-5 sm:mt-6 md:mt-8">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-foreground sm:text-sm">Color</p>
                      {selectedColor && <span className="text-[10px] text-muted-foreground sm:text-xs">{selectedColor.name}</span>}
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-2.5">
                      {service.colors?.map((c: any) => (
                        <button key={c.name} onClick={() => { setSelectedColor(c); const matchingVar = service.variations?.find((v: any) => v.color?.id === c.id); if (matchingVar) setSelectedVar(matchingVar); setAdded(false); }} title={c.name} className={cn("h-9 w-9 rounded-full border-2 transition-all sm:h-10 sm:w-10", selectedColor?.name === c.name ? "border-violet scale-110 shadow-md" : "border-border/60 hover:border-foreground/40")} style={{ backgroundColor: c.hex_code ?? "#ccc" }} />
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 sm:mt-6 md:mt-8">
                    {service.in_stock === false ? (
                      <div className="flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-secondary/50 py-3.5">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">This product is currently out of stock</span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <div className="hidden sm:flex items-center gap-3">
                          <div className="flex items-center rounded-xl border border-border/70">
                            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-11 w-11 items-center justify-center text-foreground/60 transition-colors hover:text-foreground"><Minus className="h-4 w-4" /></button>
                            <span className="flex h-11 w-12 items-center justify-center text-sm font-semibold tabular-nums">{qty}</span>
                            <button onClick={() => setQty((q) => Math.min(99, q + 1))} className="flex h-11 w-11 items-center justify-center text-foreground/60 transition-colors hover:text-foreground"><Plus className="h-4 w-4" /></button>
                          </div>
                          <button onClick={handleAddToCart} className={cn("btn-luxe flex-1 transition-all", added ? "bg-emerald-600 text-white" : "bg-foreground text-background")}>
                            {added ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingBag className="h-4 w-4" /> Add to Cart</>}
                          </button>
                          <button onClick={handleBuyNow} className="btn-luxe border border-violet bg-violet text-white hover:opacity-90">Buy Now</button>
                        </div>
                        <div className="flex sm:hidden items-center rounded-xl border border-border/70 self-stretch">
                          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-11 w-11 items-center justify-center text-foreground/60 transition-colors hover:text-foreground"><Minus className="h-4 w-4" /></button>
                          <span className="flex h-11 flex-1 items-center justify-center text-sm font-semibold tabular-nums">{qty}</span>
                          <button onClick={() => setQty((q) => Math.min(99, q + 1))} className="flex h-11 w-11 items-center justify-center text-foreground/60 transition-colors hover:text-foreground"><Plus className="h-4 w-4" /></button>
                        </div>
                        <button onClick={handleAddToCart} className={cn("btn-luxe sm:hidden transition-all w-full", added ? "bg-emerald-600 text-white" : "bg-foreground text-background")}>
                          {added ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingBag className="h-4 w-4" /> Add to Cart</>}
                        </button>
                        <button onClick={handleBuyNow} className="btn-luxe sm:hidden border border-violet bg-violet text-white hover:opacity-90 w-full">Buy Now</button>
                      </div>
                    )}
                  </div>

                  {/* Features grid */}
                  <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl border border-border/60 bg-secondary/30 p-3 sm:mt-6 sm:gap-3 sm:rounded-2xl sm:p-4 md:mt-8 md:grid-cols-4">
                    {FEATURES.map((f) => (
                      <div key={f.label} className="text-center">
                        <f.icon className="mx-auto h-4 w-4 text-violet" />
                        <p className="mt-1 text-[10px] font-medium text-foreground sm:text-xs">{f.label}</p>
                        <p className="text-[9px] text-muted-foreground sm:text-[10px]">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits + Specs */}
          <section className="border-t border-border/60 bg-gradient-soft py-8 sm:py-12 md:py-20 lg:py-24">
            <div className="container-luxe">
              <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
                <div>
                  <p className="eyebrow">Why choose this</p>
                  <h2 className="mt-2 font-display text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl">Engineered around <span className="text-gradient-brand">how it actually wears.</span></h2>
                  <div className="mt-6 space-y-4 sm:space-y-6 md:mt-8">
                    {BENEFITS.map((b) => (
                      <div key={b.title} className="flex gap-3 sm:gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-brand text-white sm:h-10 sm:w-10 sm:rounded-xl"><b.icon className="h-4 w-4" /></span>
                        <div>
                          <p className="font-display text-xs font-semibold sm:text-sm">{b.title}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{b.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="eyebrow">Specifications</p>
                  <h2 className="mt-2 font-display text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl">What's in the <span className="text-gradient-brand">weave.</span></h2>
                  <div className="mt-6 space-y-3 sm:space-y-4 md:mt-8">
                    {[
                      { k: "Collection", v: selectedVar?.name ?? service.name },
                      { k: "Seasonality", v: service.season },
                      { k: "Texture", v: "Refined, balanced handle with subtle natural grain" },
                      { k: "Finish", v: "Pre-washed Sanforized Non-iron ready" },
                      { k: "Width", v: "58/60 inches (standard)" },
                      { k: "Weight", v: "180-220 GSM depending on grade" },
                      { k: "Certification", v: "OEKO-TEX Standard 100" },
                    ].map((d) => (
                      <div key={d.k} className="flex justify-between border-b border-border/40 pb-2.5 sm:pb-3 gap-2">
                        <span className="text-xs text-muted-foreground shrink-0 sm:text-sm">{d.k}</span>
                        <span className="text-xs font-medium text-foreground text-right sm:text-sm">{d.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </ThemeProvider>
  );
}
