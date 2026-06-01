import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeader } from "./services-section";
const TESTIMONIALS = [
    {
        quote: "The hand of their wash & wear is unlike anything I've sourced from Milan in fifteen years. My clients ask for it by name now.",
        name: "Faisal R.",
        role: "Master Tailor · North Savile",
    },
    {
        quote: "I ordered three lengths for my wedding party. Every guest noticed the drape. The advisor over WhatsApp made the entire process feel personal.",
        name: "Hamza K.",
        role: "Karachi",
    },
    {
        quote: "PASSION's Latha series sits in a category of its own — the kind of fabric you reach for when nothing else will do.",
        name: "Daniyal A.",
        role: "Creative Director, Atelier 47",
    },
    {
        quote: "Consistent quality across six orders. Their cotton holds shape better than goods I've sourced at three times the price.",
        name: "Saad M.",
        role: "Boutique owner, Lahore",
    },
    {
        quote: "What surprised me was the after-care — they followed up after stitching to confirm the fit. That's heritage thinking.",
        name: "Imran B.",
        role: "Banker, Dubai",
    },
    {
        quote: "Booked a consultation expecting a sales pitch. Got a forty-minute conversation about weave density. I'm a customer for life.",
        name: "Owais T.",
        role: "Architect",
    },
];
export function Testimonials() {
    return (_jsx("section", { className: "relative py-24 md:py-32", children: _jsxs("div", { className: "container-luxe", children: [_jsx(SectionHeader, { eyebrow: "In their words", title: _jsxs(_Fragment, { children: ["The verdict from", _jsx("br", {}), _jsx("span", { className: "text-gradient-brand", children: "discerning men." })] }), description: "A small selection of unedited reflections from clients, tailors and creative directors who've made PASSION a part of their routine." }), _jsx("div", { className: "mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: TESTIMONIALS.map((t, i) => (_jsxs(motion.figure, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.5, delay: (i % 3) * 0.08 }, className: "group relative flex flex-col rounded-2xl border border-border/70 bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-card", children: [_jsx(Quote, { className: "h-7 w-7 text-violet/60" }), _jsxs("blockquote", { className: "mt-5 text-[15px] leading-relaxed text-foreground/85", children: ["\"", t.quote, "\""] }), _jsxs("figcaption", { className: "mt-7 flex items-center gap-3 border-t border-border/60 pt-5", children: [_jsx("span", { className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand font-display text-sm font-semibold text-white", children: t.name.split(" ").map((p) => p[0]).join("") }), _jsxs("span", { className: "leading-tight", children: [_jsx("span", { className: "block text-sm font-semibold text-foreground", children: t.name }), _jsx("span", { className: "block text-xs text-muted-foreground", children: t.role })] })] })] }, i))) })] }) }));
}
