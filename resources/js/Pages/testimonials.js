import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { Testimonials as TestimonialsSection } from "@/Components/sections/testimonials";
import { FinalCta } from "@/Components/sections/final-cta";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";
export default function Testimonials() {
    return (_jsx(ThemeProvider, { children: _jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [_jsx(Navbar, {}), _jsxs("main", { className: "pt-20", children: [_jsxs(Head, { children: [_jsx("title", { children: "Testimonials \u2014 PASSION" }), _jsx("meta", { name: "description", content: "Reflections from clients, master tailors, and creative directors who've made PASSION part of their routine." }), _jsx("meta", { property: "og:title", content: "Testimonials \u2014 PASSION" }), _jsx("meta", { property: "og:description", content: "The verdict from discerning men." })] }), _jsx("section", { className: "bg-gradient-soft pt-32 pb-12 md:pt-40", children: _jsxs("div", { className: "container-luxe max-w-3xl", children: [_jsx("p", { className: "eyebrow", children: "In their words" }), _jsxs("h1", { className: "mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight", children: ["The verdict from ", _jsx("span", { className: "text-gradient-brand", children: "discerning men." })] })] }) }), _jsx(TestimonialsSection, {}), _jsx(FinalCta, {})] }), _jsx(Footer, {}), _jsx(StickyWhatsApp, {})] }) }));
}
