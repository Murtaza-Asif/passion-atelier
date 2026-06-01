import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
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
const imageMap = { cotton, washwear, latha, custom };
function formatPrice(p) {
    return `PKR ${p.toLocaleString()}`;
}
function getPriceRange(service) {
    const prices = service.variations.map((v) => v.price);
    if (prices.length === 0)
        return "\u2014";
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    if (min === max)
        return formatPrice(min);
    if (min === 0)
        return `From ${formatPrice(prices.find((p) => p > 0) ?? max)}`;
    return `${formatPrice(min)} \u2013 ${formatPrice(max)}`;
}
function hasDiscount(service) {
    return service.variations.some((v) => v.original_price != null);
}
function getDiscount(service) {
    const maxOrig = Math.max(...service.variations.map((v) => v.original_price ?? 0));
    const maxCurr = Math.max(...service.variations.map((v) => v.price));
    if (maxOrig <= maxCurr)
        return 0;
    return Math.round(((maxOrig - maxCurr) / maxOrig) * 100);
}
function BannerCarousel({ images, name }) {
    const [index, setIndex] = useState(0);
    const timerRef = useRef(null);
    const startTimer = useCallback(() => {
        if (timerRef.current)
            clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, 5000);
    }, [images.length]);
    useEffect(() => {
        startTimer();
        return () => { if (timerRef.current)
            clearInterval(timerRef.current); };
    }, [startTimer]);
    const goTo = (i) => {
        setIndex(i);
        startTimer();
    };
    const prev = () => goTo((index - 1 + images.length) % images.length);
    const next = () => goTo((index + 1) % images.length);
    if (images.length === 0) {
        return (_jsx("section", { className: "relative h-[50vh] min-h-[320px] w-full overflow-hidden bg-gradient-to-br from-violet/20 to-primary/10 md:h-[65vh]", children: _jsx("div", { className: "flex h-full items-center justify-center", children: _jsx("h2", { className: "font-display text-4xl font-bold text-muted-foreground/30", children: name }) }) }));
    }
    return (_jsxs("section", { className: "relative h-[50vh] min-h-[320px] w-full overflow-hidden md:h-[65vh]", children: [_jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.img, { src: images[index], alt: `${name} banner ${index + 1}`, initial: { opacity: 0, scale: 1.05 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.98 }, transition: { duration: 0.8, ease: "easeInOut" }, className: "absolute inset-0 h-full w-full object-cover" }, index) }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" }), _jsx("div", { className: "absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2", children: images.map((_, i) => (_jsx("button", { onClick: () => goTo(i), className: cn("h-1.5 rounded-full transition-all duration-500", i === index ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"), "aria-label": `Go to slide ${i + 1}` }, i))) }), _jsx("button", { onClick: prev, className: "absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur transition-all hover:bg-black/40", "aria-label": "Previous slide", children: _jsx(ChevronLeft, { className: "h-5 w-5" }) }), _jsx("button", { onClick: next, className: "absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur transition-all hover:bg-black/40", "aria-label": "Next slide", children: _jsx(ChevronRight, { className: "h-5 w-5" }) })] }));
}
export default function CollectionDetail({ collection, products }) {
    const [sort, setSort] = useState("default");
    const bannerImages = collection.banner_images.length > 0
        ? collection.banner_images
        : collection.banner_url
            ? [collection.banner_url]
            : [];
    const sorted = [...products].sort((a, b) => {
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
        if (sort === "name")
            return a.name.localeCompare(b.name);
        return 0;
    });
    return (_jsx(ThemeProvider, { children: _jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [_jsx(Navbar, {}), _jsxs("main", { children: [_jsxs(Head, { children: [_jsxs("title", { children: [collection.name, " \\u2014 PASSION"] }), _jsx("meta", { name: "description", content: collection.description }), _jsx("meta", { property: "og:title", content: `${collection.name} \u2014 PASSION` }), _jsx("meta", { property: "og:description", content: collection.description })] }), _jsx(BannerCarousel, { images: bannerImages, name: collection.name }), _jsx("section", { className: "relative z-10 -mt-16 rounded-t-3xl bg-background px-4 pt-8 md:-mt-20 md:pt-12", children: _jsx("div", { className: "container-luxe", children: _jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [_jsx("p", { className: "eyebrow", children: "The Collection" }), _jsx("h1", { className: "mt-3 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight", children: collection.name }), collection.description && (_jsx("p", { className: "mt-4 text-base text-muted-foreground md:text-lg", children: collection.description }))] }) }) }), _jsx("section", { className: "pb-20 pt-8 md:pb-28 md:pt-12", children: _jsxs("div", { className: "container-luxe", children: [_jsxs("div", { className: "mb-8 flex flex-wrap items-center justify-between gap-4", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: [_jsx("span", { className: "font-medium text-foreground", children: products.length }), " products"] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("label", { className: "text-xs text-muted-foreground", children: "Sort by" }), _jsx("select", { value: sort, onChange: (e) => setSort(e.target.value), className: "rounded-full border border-border/60 bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:border-violet", children: SORT_OPTIONS.map((o) => (_jsx("option", { value: o.value, children: o.label }, o.value))) })] })] }), _jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: sorted.map((service, i) => {
                                            const img = service.featured_image_url ?? imageMap[service.image_key ?? 'cotton'] ?? cotton;
                                            return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-40px" }, transition: { duration: 0.5, delay: i * 0.06 }, children: _jsxs(Link, { href: `/services/${service.slug}`, className: "group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe", children: [_jsxs("div", { className: "relative aspect-[4/5] overflow-hidden", children: [_jsx("img", { src: img, alt: service.name, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" }), hasDiscount(service) && (_jsxs("span", { className: "absolute left-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground", children: ["-", getDiscount(service), "%"] })), _jsx("div", { className: "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100", children: _jsx(Eye, { className: "h-4 w-4" }) }), _jsxs("div", { className: "absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white backdrop-blur opacity-0 transition-all duration-500 group-hover:opacity-100", children: [_jsx("span", { className: "text-[10px] uppercase tracking-widest text-white/70", children: "Quick view" }), _jsx(ArrowRight, { className: "h-3.5 w-3.5" })] })] }), _jsxs("div", { className: "flex flex-1 flex-col p-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "flex -space-x-1.5", children: [service.colors.slice(0, 4).map((c) => (_jsx("span", { className: "h-4 w-4 rounded-full border border-border/60", style: { backgroundColor: c.hex_code }, title: c.name }, c.id))), service.colors.length > 4 && (_jsxs("span", { className: "flex h-4 w-4 items-center justify-center rounded-full border border-border/60 bg-secondary text-[8px] font-medium text-muted-foreground", children: ["+", service.colors.length - 4] }))] }), _jsxs("span", { className: "text-[10px] text-muted-foreground", children: [service.colors.length, " colors"] })] }), _jsx("h3", { className: "mt-3 font-display text-base font-semibold leading-tight", children: service.name }), _jsx("p", { className: "mt-1 text-xs text-muted-foreground line-clamp-2", children: service.short_description }), _jsxs("div", { className: "mt-auto flex items-center justify-between pt-3", children: [_jsx("span", { className: cn("font-display text-sm font-semibold", hasDiscount(service) && "text-destructive"), children: getPriceRange(service) }), _jsxs("span", { className: "text-[10px] uppercase tracking-widest text-violet", children: [service.variations.length, " vars"] })] })] })] }) }, service.slug));
                                        }) }), products.length === 0 && (_jsxs("div", { className: "py-20 text-center", children: [_jsx("p", { className: "text-lg text-muted-foreground", children: "No products in this collection yet." }), _jsx(Link, { href: "/collections", className: "mt-4 inline-block text-sm text-violet underline underline-offset-4 hover:text-violet/80", children: "Browse all collections" })] }))] }) })] }), _jsx(Footer, {}), _jsx(StickyWhatsApp, {})] }) }));
}
