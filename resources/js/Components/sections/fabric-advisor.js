import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { SITE } from "@/Lib/site";
const STEPS = [
    { key: "budget", label: "What's your investment range?", options: [
            { v: "Essential", emoji: "✦" },
            { v: "Signature", emoji: "✦✦" },
            { v: "Atelier", emoji: "✦✦✦" },
        ] },
    { key: "occasion", label: "Where will it be worn?", options: [
            { v: "Daily" }, { v: "Formal" }, { v: "Wedding" }, { v: "Casual" },
        ] },
    { key: "climate", label: "Your climate preference", options: [
            { v: "Hot" }, { v: "Temperate" }, { v: "Cool" },
        ] },
    { key: "softness", label: "Preferred handle", options: [
            { v: "Crisp" }, { v: "Balanced" }, { v: "Soft" },
        ] },
    { key: "color", label: "Color direction", options: [
            { v: "Neutral" }, { v: "Earth" }, { v: "Jewel" }, { v: "Monochrome" },
        ] },
];
function recommend(a) {
    if (a.occasion === "Formal" || a.occasion === "Wedding") {
        return {
            title: "Formal Latha Series",
            slug: "formal-latha",
            reason: "Lustrous handle and graceful drape for ceremonial moments.",
        };
    }
    if (a.softness === "Crisp" || a.budget === "Atelier") {
        return {
            title: "Luxury Wash & Wear",
            slug: "wash-wear",
            reason: "Travel-ready polish that holds its silhouette beautifully.",
        };
    }
    if (a.softness === "Soft" || a.climate === "Hot") {
        return {
            title: "Premium Cotton Collection",
            slug: "premium-cotton",
            reason: "Breathable, soft cotton woven for comfort with structure.",
        };
    }
    return {
        title: "Custom Fabric Selection",
        slug: "custom-selection",
        reason: "Bespoke advisory tailored to your exact specifications.",
    };
}
export function FabricAdvisor() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const done = step >= STEPS.length;
    const current = STEPS[step];
    const result = done ? recommend(answers) : null;
    const select = (v) => {
        setAnswers((a) => ({ ...a, [current.key]: v }));
        setTimeout(() => setStep((s) => s + 1), 250);
    };
    const reset = () => { setAnswers({}); setStep(0); };
    return (_jsx("section", { className: "relative py-24 md:py-32", children: _jsx("div", { className: "container-luxe", children: _jsxs("div", { className: "grid gap-10 lg:grid-cols-12 lg:gap-16", children: [_jsxs("div", { className: "lg:col-span-5", children: [_jsx("p", { className: "eyebrow", children: "Smart Advisor" }), _jsxs("h2", { className: "mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight", children: ["Your personal ", _jsx("span", { className: "text-gradient-brand", children: "fabric stylist." })] }), _jsx("p", { className: "mt-5 text-base text-muted-foreground md:text-lg", children: "Five quick questions. One curated recommendation, drawn from our archive of premium weaves and finishes \u2014 refined further by a human advisor over WhatsApp." }), _jsx("ul", { className: "mt-8 space-y-3 text-sm", children: [
                                    "Tailored to occasion, climate and handle preference",
                                    "Direct line to a master advisor",
                                    "Reserved access to limited heritage stock",
                                ].map((t) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx("span", { className: "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white", children: _jsx(Check, { className: "h-3 w-3" }) }), _jsx("span", { className: "text-foreground/80", children: t })] }, t))) })] }), _jsx("div", { className: "lg:col-span-7", children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: "pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-brand opacity-15 blur-3xl" }), _jsxs("div", { className: "overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-border/60 bg-gradient-soft p-5", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-white", children: _jsx(Sparkles, { className: "h-4 w-4" }) }), _jsxs("div", { className: "leading-tight", children: [_jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "PASSION \u00B7 Advisor" }), _jsx("p", { className: "font-display text-sm font-semibold", children: "Find your fabric in 30 seconds" })] })] }), _jsx("div", { className: "flex gap-1.5", children: STEPS.map((_, i) => (_jsx("span", { className: `h-1.5 w-6 rounded-full transition-colors ${i < step ? "bg-violet" : i === step ? "bg-foreground" : "bg-border"}` }, i))) })] }), _jsx("div", { className: "min-h-[320px] p-6 md:p-8", children: _jsx(AnimatePresence, { mode: "wait", children: !done ? (_jsxs(motion.div, { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.35 }, children: [_jsxs("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: ["Step ", step + 1, " of ", STEPS.length] }), _jsx("h3", { className: "mt-2 font-display text-2xl font-semibold leading-tight", children: current.label }), _jsx("div", { className: "mt-6 grid gap-2.5 sm:grid-cols-2", children: current.options.map((opt) => (_jsxs("button", { onClick: () => select(opt.v), className: "group flex items-center justify-between rounded-xl border border-border/70 bg-background p-4 text-left transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-card", children: [_jsxs("span", { className: "flex items-center gap-3", children: [opt.emoji && _jsx("span", { className: "text-violet", children: opt.emoji }), _jsx("span", { className: "text-sm font-medium", children: opt.v })] }), _jsx(ArrowRight, { className: "h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" })] }, opt.v))) })] }, step)) : (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5 }, children: [_jsx("p", { className: "eyebrow", children: "Your recommendation" }), _jsx("h3", { className: "mt-2 font-display text-3xl font-semibold leading-tight", children: result?.title }), _jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: result?.reason }), _jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: Object.entries(answers).map(([k, v]) => (_jsxs("span", { className: "rounded-full bg-secondary px-3 py-1 text-xs text-foreground/70", children: [k, ": ", _jsx("span", { className: "font-medium text-foreground", children: v })] }, k))) }), _jsxs("div", { className: "mt-7 flex flex-wrap gap-3", children: [_jsxs("a", { href: `${SITE.whatsappLink}?text=${encodeURIComponent(`Hi PASSION, I just got a recommendation for ${result?.title}. I'd love a consultation.`)}`, target: "_blank", rel: "noreferrer", className: "btn-luxe bg-foreground text-background", children: [_jsx(MessageCircle, { className: "h-4 w-4" }), "Continue on WhatsApp"] }), _jsx("button", { onClick: reset, className: "btn-luxe border border-border bg-background text-foreground", children: "Restart" })] })] }, "result")) }) })] })] }) })] }) }) }));
}
