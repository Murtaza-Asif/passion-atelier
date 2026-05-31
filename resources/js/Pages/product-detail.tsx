import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Minus, Plus, ShoppingBag, ArrowRight, Check, Shield, Truck, RotateCcw, Heart, MessageCircle, Award, Scissors, Thermometer, Sparkles } from "lucide-react";
import type { FrontendProduct } from "@/Lib/site";
import { SITE } from "@/Lib/site";
import { useCart } from "@/Lib/cart-context";
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
  const [selectedVar, setSelectedVar] = useState<any | null>(null);
  const [selectedColor, setSelectedColor] = useState<any | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (service) {
      setSelectedVar(service.variations?.[0] ?? null);
      setSelectedColor(service.colors?.[0] ?? null);
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

  const img = service.featured_image_url ?? imageMap[service.image_key ?? 'cotton'] ?? cotton;
  const hasDiscount = selectedVar?.original_price != null && Number(selectedVar.original_price) > Number(selectedVar.price);
  const relatedServices = [];

  const handleAddToCart = () => {
    if (!selectedVar || !selectedColor) return;
    addItem(service, selectedVar, selectedColor, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = SITE.whatsappLink;
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-20">
          <Head title={`${service.name} — PASSION`}>
            <meta name="description" content={service.long_description ?? ""} />
            <meta property="og:title" content={`${service.name} — PASSION`} />
            <meta property="og:description" content={service.long_description ?? ""} />
          </Head>

          <section className="border-b border-border/60 bg-secondary/30">
            <div className="container-luxe flex items-center gap-2 py-3 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-foreground">Shop</Link>
              <span>/</span>
              <span className="text-foreground">{service.name}</span>
            </div>
          </section>

          <section className="py-10 md:py-16">
            <div className="container-luxe">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-6">
                  <div className="relative overflow-hidden rounded-2xl border border-border/70 shadow-card">
                    <div className="aspect-[4/5]">
                      <img src={img} alt={service.name} className="h-full w-full object-cover transition-all duration-700" />
                    </div>
                    {hasDiscount && (
                      <span className="absolute left-4 top-4 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground">
                        -{Math.round(((Number(selectedVar!.original_price) - Number(selectedVar!.price)) / Number(selectedVar!.original_price)) * 100)}%
                      </span>
                    )}
                    <button aria-label="Add to wishlist" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground/60 backdrop-blur transition-colors hover:bg-background hover:text-foreground">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 flex gap-3">
                    {[0, 1, 2, 3].map((i) => (
                      <button key={i} onClick={() => setActiveImg(i)} className={cn("aspect-[4/5] w-20 overflow-hidden rounded-xl border-2 transition-all", activeImg === i ? "border-violet" : "border-border/60 opacity-60 hover:opacity-100")}>
                        <img src={img} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <p className="eyebrow">{service.season}</p>
                  <h1 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight tracking-tight">{service.name}</h1>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{service.long_description}</p>

                  <div className="mt-6 flex items-baseline gap-3">
                    {selectedVar && (
                      <>
                        <span className="font-display text-3xl font-semibold text-foreground">{formatPrice(Number(selectedVar.price))}</span>
                        {hasDiscount && <span className="font-display text-lg text-muted-foreground line-through">{formatPrice(Number(selectedVar.original_price))}</span>}
                      </>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes. Fabric per metre.</p>

                  <div className="mt-8">
                    <p className="text-sm font-medium text-foreground">Grade</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {service.variations?.map((v: any) => (
                        <button key={v.id} onClick={() => { setSelectedVar(v); setAdded(false); }} className={cn("rounded-xl border px-4 py-3 text-left transition-all", selectedVar?.id === v.id ? "border-violet bg-violet/5 ring-1 ring-violet/30" : "border-border/70 bg-card hover:border-foreground/30")}>
                          <p className="text-sm font-semibold">{v.name}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{v.description}</p>
                          <p className="mt-1 text-sm font-semibold text-violet">{formatPrice(Number(v.price))}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">Color</p>
                      {selectedColor && <span className="text-xs text-muted-foreground">{selectedColor.name}</span>}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2.5">
                      {service.colors?.map((c: any) => (
                        <button key={c.name} onClick={() => { setSelectedColor(c); setAdded(false); }} title={c.name} className={cn("h-9 w-9 rounded-full border-2 transition-all", selectedColor?.name === c.name ? "border-violet scale-110 shadow-md" : "border-border/60 hover:border-foreground/40")} style={{ backgroundColor: c.hex_code ?? "#ccc" }} />
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex items-center rounded-xl border border-border/70">
                      <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-11 w-11 items-center justify-center text-foreground/60 transition-colors hover:text-foreground"><Minus className="h-4 w-4" /></button>
                      <span className="flex h-11 w-14 items-center justify-center text-sm font-semibold tabular-nums">{qty}</span>
                      <button onClick={() => setQty((q) => Math.min(99, q + 1))} className="flex h-11 w-11 items-center justify-center text-foreground/60 transition-colors hover:text-foreground"><Plus className="h-4 w-4" /></button>
                    </div>
                    <div className="flex flex-1 gap-2">
                      <button onClick={handleAddToCart} className={cn("btn-luxe flex-1 transition-all", added ? "bg-emerald-600 text-white" : "bg-foreground text-background")}>
                        {added ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingBag className="h-4 w-4" /> Add to Cart</>}
                      </button>
                      <button onClick={handleBuyNow} className="btn-luxe border border-violet bg-violet text-white hover:opacity-90">Buy Now</button>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3 rounded-2xl border border-border/60 bg-secondary/30 p-4 md:grid-cols-4">
                    {FEATURES.map((f) => (
                      <div key={f.label} className="text-center">
                        <f.icon className="mx-auto h-4 w-4 text-violet" />
                        <p className="mt-1 text-xs font-medium text-foreground">{f.label}</p>
                        <p className="text-[10px] text-muted-foreground">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-border/60 bg-gradient-soft py-16 md:py-24">
            <div className="container-luxe">
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <p className="eyebrow">Why choose this</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold md:text-3xl">Engineered around <span className="text-gradient-brand">how it actually wears.</span></h2>
                  <div className="mt-8 space-y-6">
                    {BENEFITS.map((b) => (
                      <div key={b.title} className="flex gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white"><b.icon className="h-4 w-4" /></span>
                        <div>
                          <p className="font-display text-sm font-semibold">{b.title}</p>
                          <p className="mt-0.5 text-sm text-muted-foreground">{b.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="eyebrow">Specifications</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold md:text-3xl">What's in the <span className="text-gradient-brand">weave.</span></h2>
                  <div className="mt-8 space-y-4">
                    {[
                      { k: "Collection", v: selectedVar?.name ?? service.name },
                      { k: "Seasonality", v: service.season },
                      { k: "Texture", v: "Refined, balanced handle with subtle natural grain" },
                      { k: "Finish", v: "Pre-washed Sanforized Non-iron ready" },
                      { k: "Width", v: "58/60 inches (standard)" },
                      { k: "Weight", v: "180-220 GSM depending on grade" },
                      { k: "Certification", v: "OEKO-TEX Standard 100" },
                    ].map((d) => (
                      <div key={d.k} className="flex justify-between border-b border-border/40 pb-3">
                        <span className="text-sm text-muted-foreground">{d.k}</span>
                        <span className="text-sm font-medium text-foreground">{d.v}</span>
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
