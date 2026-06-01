import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Head, Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Minus, Plus, ShoppingBag, Check, Shield, Truck, RotateCcw, Heart, MessageCircle, Award, Scissors, Thermometer } from "lucide-react";
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
const imageMap = { cotton, washwear, latha, custom };
function formatPrice(p) {
    return `PKR ${p.toLocaleString()}`;
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
export default function ServiceDetail({ slug, service }) {
    const { addItem } = useCart();
    const { requireAuth } = useAuth();
    const { auth } = usePage().props;
    const [selectedVar, setSelectedVar] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
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
        return (_jsx(ThemeProvider, { children: _jsx("div", { className: "min-h-screen bg-background text-foreground flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "font-display text-4xl font-semibold", children: "Product not found" }), _jsx(Link, { href: "/services", className: "mt-4 inline-block text-violet hover:underline", children: "\u2190 Back to shop" })] }) }) }));
    }
    const img = service.featured_image_url ?? imageMap[service.image_key ?? 'cotton'] ?? cotton;
    const hasDiscount = selectedVar?.original_price != null && Number(selectedVar.original_price) > Number(selectedVar.price);
    const relatedServices = [];
    const handleAddToCart = () => {
        if (!selectedVar || !selectedColor)
            return;
        if (auth.user) {
            addItem(service, selectedVar, selectedColor, qty);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        }
        else {
            requireAuth(service, selectedVar, selectedColor, qty);
        }
    };
    const handleBuyNow = () => {
        if (!selectedVar || !selectedColor)
            return;
        if (auth.user) {
            addItem(service, selectedVar, selectedColor, qty);
            const link = document.createElement("a");
            link.href = "/checkout";
            link.click();
        }
        else {
            requireAuth(service, selectedVar, selectedColor, qty);
        }
    };
    return (_jsx(ThemeProvider, { children: _jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [_jsx(Navbar, {}), _jsxs("main", { className: "pt-20", children: [_jsxs(Head, { title: `${service.name} — PASSION`, children: [_jsx("meta", { name: "description", content: service.long_description ?? "" }), _jsx("meta", { property: "og:title", content: `${service.name} — PASSION` }), _jsx("meta", { property: "og:description", content: service.long_description ?? "" })] }), _jsx("section", { className: "border-b border-border/60 bg-secondary/30", children: _jsxs("div", { className: "container-luxe flex items-center gap-2 py-3 text-xs text-muted-foreground", children: [_jsx(Link, { href: "/", className: "hover:text-foreground", children: "Home" }), _jsx("span", { children: "/" }), _jsx(Link, { href: "/services", className: "hover:text-foreground", children: "Shop" }), _jsx("span", { children: "/" }), _jsx("span", { className: "text-foreground", children: service.name })] }) }), _jsx("section", { className: "py-10 md:py-16", children: _jsx("div", { className: "container-luxe", children: _jsxs("div", { className: "grid gap-10 lg:grid-cols-12 lg:gap-16", children: [_jsxs("div", { className: "lg:col-span-6", children: [_jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-border/70 shadow-card", children: [_jsx("div", { className: "aspect-[4/5]", children: _jsx("img", { src: img, alt: service.name, className: "h-full w-full object-cover transition-all duration-700" }) }), hasDiscount && (_jsxs("span", { className: "absolute left-4 top-4 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground", children: ["-", Math.round(((Number(selectedVar.original_price) - Number(selectedVar.price)) / Number(selectedVar.original_price)) * 100), "%"] })), _jsx("button", { "aria-label": "Add to wishlist", className: "absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground/60 backdrop-blur transition-colors hover:bg-background hover:text-foreground", children: _jsx(Heart, { className: "h-4 w-4" }) })] }), _jsx("div", { className: "mt-4 flex gap-3", children: [0, 1, 2, 3].map((i) => (_jsx("button", { onClick: () => setActiveImg(i), className: cn("aspect-[4/5] w-20 overflow-hidden rounded-xl border-2 transition-all", activeImg === i ? "border-violet" : "border-border/60 opacity-60 hover:opacity-100"), children: _jsx("img", { src: img, alt: "", className: "h-full w-full object-cover" }) }, i))) })] }), _jsxs("div", { className: "lg:col-span-6", children: [_jsx("p", { className: "eyebrow", children: service.season }), _jsx("h1", { className: "mt-3 font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight tracking-tight", children: service.name }), _jsx("p", { className: "mt-3 text-base leading-relaxed text-muted-foreground", children: service.long_description }), _jsx("div", { className: "mt-6 flex items-baseline gap-3", children: selectedVar && (_jsxs(_Fragment, { children: [_jsx("span", { className: "font-display text-3xl font-semibold text-foreground", children: formatPrice(Number(selectedVar.price)) }), hasDiscount && _jsx("span", { className: "font-display text-lg text-muted-foreground line-through", children: formatPrice(Number(selectedVar.original_price)) })] })) }), _jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Inclusive of all taxes. Fabric per metre." }), _jsxs("div", { className: "mt-8", children: [_jsx("p", { className: "text-sm font-medium text-foreground", children: "Grade" }), _jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: service.variations?.map((v) => (_jsxs("button", { onClick: () => { setSelectedVar(v); setAdded(false); }, className: cn("rounded-xl border px-4 py-3 text-left transition-all", selectedVar?.id === v.id ? "border-violet bg-violet/5 ring-1 ring-violet/30" : "border-border/70 bg-card hover:border-foreground/30"), children: [_jsx("p", { className: "text-sm font-semibold", children: v.name }), _jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: v.description }), _jsx("p", { className: "mt-1 text-sm font-semibold text-violet", children: formatPrice(Number(v.price)) })] }, v.id))) })] }), _jsxs("div", { className: "mt-8", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "text-sm font-medium text-foreground", children: "Color" }), selectedColor && _jsx("span", { className: "text-xs text-muted-foreground", children: selectedColor.name })] }), _jsx("div", { className: "mt-2 flex flex-wrap gap-2.5", children: service.colors?.map((c) => (_jsx("button", { onClick: () => { setSelectedColor(c); setAdded(false); }, title: c.name, className: cn("h-9 w-9 rounded-full border-2 transition-all", selectedColor?.name === c.name ? "border-violet scale-110 shadow-md" : "border-border/60 hover:border-foreground/40"), style: { backgroundColor: c.hex_code ?? "#ccc" } }, c.name))) })] }), _jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row sm:items-center", children: [_jsxs("div", { className: "flex items-center rounded-xl border border-border/70", children: [_jsx("button", { onClick: () => setQty((q) => Math.max(1, q - 1)), className: "flex h-11 w-11 items-center justify-center text-foreground/60 transition-colors hover:text-foreground", children: _jsx(Minus, { className: "h-4 w-4" }) }), _jsx("span", { className: "flex h-11 w-14 items-center justify-center text-sm font-semibold tabular-nums", children: qty }), _jsx("button", { onClick: () => setQty((q) => Math.min(99, q + 1)), className: "flex h-11 w-11 items-center justify-center text-foreground/60 transition-colors hover:text-foreground", children: _jsx(Plus, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "flex flex-1 gap-2", children: [_jsx("button", { onClick: handleAddToCart, className: cn("btn-luxe flex-1 transition-all", added ? "bg-emerald-600 text-white" : "bg-foreground text-background"), children: added ? _jsxs(_Fragment, { children: [_jsx(Check, { className: "h-4 w-4" }), " Added"] }) : _jsxs(_Fragment, { children: [_jsx(ShoppingBag, { className: "h-4 w-4" }), " Add to Cart"] }) }), _jsx("button", { onClick: handleBuyNow, className: "btn-luxe border border-violet bg-violet text-white hover:opacity-90", children: "Buy Now" })] })] }), _jsx("div", { className: "mt-8 grid grid-cols-2 gap-3 rounded-2xl border border-border/60 bg-secondary/30 p-4 md:grid-cols-4", children: FEATURES.map((f) => (_jsxs("div", { className: "text-center", children: [_jsx(f.icon, { className: "mx-auto h-4 w-4 text-violet" }), _jsx("p", { className: "mt-1 text-xs font-medium text-foreground", children: f.label }), _jsx("p", { className: "text-[10px] text-muted-foreground", children: f.desc })] }, f.label))) })] })] }) }) }), _jsx("section", { className: "border-t border-border/60 bg-gradient-soft py-16 md:py-24", children: _jsx("div", { className: "container-luxe", children: _jsxs("div", { className: "grid gap-12 lg:grid-cols-2", children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow", children: "Why choose this" }), _jsxs("h2", { className: "mt-3 font-display text-2xl font-semibold md:text-3xl", children: ["Engineered around ", _jsx("span", { className: "text-gradient-brand", children: "how it actually wears." })] }), _jsx("div", { className: "mt-8 space-y-6", children: BENEFITS.map((b) => (_jsxs("div", { className: "flex gap-4", children: [_jsx("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white", children: _jsx(b.icon, { className: "h-4 w-4" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-display text-sm font-semibold", children: b.title }), _jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: b.body })] })] }, b.title))) })] }), _jsxs("div", { children: [_jsx("p", { className: "eyebrow", children: "Specifications" }), _jsxs("h2", { className: "mt-3 font-display text-2xl font-semibold md:text-3xl", children: ["What's in the ", _jsx("span", { className: "text-gradient-brand", children: "weave." })] }), _jsx("div", { className: "mt-8 space-y-4", children: [
                                                        { k: "Collection", v: selectedVar?.name ?? service.name },
                                                        { k: "Seasonality", v: service.season },
                                                        { k: "Texture", v: "Refined, balanced handle with subtle natural grain" },
                                                        { k: "Finish", v: "Pre-washed Sanforized Non-iron ready" },
                                                        { k: "Width", v: "58/60 inches (standard)" },
                                                        { k: "Weight", v: "180-220 GSM depending on grade" },
                                                        { k: "Certification", v: "OEKO-TEX Standard 100" },
                                                    ].map((d) => (_jsxs("div", { className: "flex justify-between border-b border-border/40 pb-3", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: d.k }), _jsx("span", { className: "text-sm font-medium text-foreground", children: d.v })] }, d.k))) })] })] }) }) })] }), _jsx(Footer, {}), _jsx(StickyWhatsApp, {})] }) }));
}
