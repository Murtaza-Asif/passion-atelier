import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import { SORT_OPTIONS } from "@/Lib/site";
import cotton from "@/assets/fabric-cotton.jpg";
import washwear from "@/assets/fabric-washwear.jpg";
import latha from "@/assets/fabric-latha.jpg";
import custom from "@/assets/fabric-custom.jpg";
import { cn } from "@/Lib/utils";
import { useState } from "react";
const imageMap = { cotton, washwear, latha, custom };
function formatPrice(p) {
    return `PKR ${p.toLocaleString()}`;
}
function getPriceRange(service) {
    const prices = service.variations.map((v) => v.price);
    if (prices.length === 0)
        return "—";
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    if (min === max)
        return formatPrice(min);
    if (min === 0)
        return `From ${formatPrice(prices.find((p) => p > 0) ?? max)}`;
    return `${formatPrice(min)} – ${formatPrice(max)}`;
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
export function ProductGrid({ services, limit }) {
    const [sort, setSort] = useState("default");
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
        if (sort === "name")
            return a.name.localeCompare(b.name);
        return 0;
    });
    return (_jsxs("div", { children: [!limit && (_jsxs("div", { className: "mb-8 flex flex-wrap items-center justify-between gap-4", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: [_jsx("span", { className: "font-medium text-foreground", children: services.length }), " collections"] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("label", { className: "text-xs text-muted-foreground", children: "Sort by" }), _jsx("select", { value: sort, onChange: (e) => setSort(e.target.value), className: "rounded-full border border-border/60 bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:border-violet", children: SORT_OPTIONS.map((o) => (_jsx("option", { value: o.value, children: o.label }, o.value))) })] })] })), _jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: sorted.map((service, i) => {
                    const img = service.featured_image_url ?? imageMap[service.image_key ?? 'cotton'] ?? cotton;
                    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-40px" }, transition: { duration: 0.5, delay: i * 0.06 }, children: _jsxs(Link, { href: `/services/${service.slug}`, className: "group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe", children: [_jsxs("div", { className: "relative aspect-[4/5] overflow-hidden", children: [_jsx("img", { src: img, alt: service.name, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" }), hasDiscount(service) && (_jsxs("span", { className: "absolute left-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground", children: ["-", getDiscount(service), "%"] })), _jsx("div", { className: "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100", children: _jsx(Eye, { className: "h-4 w-4" }) }), _jsxs("div", { className: "absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white backdrop-blur opacity-0 transition-all duration-500 group-hover:opacity-100", children: [_jsx("span", { className: "text-[10px] uppercase tracking-widest text-white/70", children: "Quick view" }), _jsx(ArrowRight, { className: "h-3.5 w-3.5" })] })] }), _jsxs("div", { className: "flex flex-1 flex-col p-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "flex -space-x-1.5", children: [service.colors.slice(0, 4).map((c) => (_jsx("span", { className: "h-4 w-4 rounded-full border border-border/60", style: { backgroundColor: c.hex_code }, title: c.name }, c.id))), service.colors.length > 4 && (_jsxs("span", { className: "flex h-4 w-4 items-center justify-center rounded-full border border-border/60 bg-secondary text-[8px] font-medium text-muted-foreground", children: ["+", service.colors.length - 4] }))] }), _jsxs("span", { className: "text-[10px] text-muted-foreground", children: [service.colors.length, " colors"] })] }), _jsx("h3", { className: "mt-3 font-display text-base font-semibold leading-tight", children: service.name }), _jsx("p", { className: "mt-1 text-xs text-muted-foreground line-clamp-2", children: service.short_description }), _jsxs("div", { className: "mt-auto flex items-center justify-between pt-3", children: [_jsx("span", { className: cn("font-display text-sm font-semibold", hasDiscount(service) && "text-destructive"), children: getPriceRange(service) }), _jsxs("span", { className: "text-[10px] uppercase tracking-widest text-violet", children: [service.variations.length, " vars"] })] })] })] }) }, service.slug));
                }) })] }));
}
