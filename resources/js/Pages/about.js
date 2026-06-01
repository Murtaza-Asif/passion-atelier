import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { FounderSection } from "@/Components/sections/founder";
import { FinalCta } from "@/Components/sections/final-cta";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";
export default function About() {
    return (_jsx(ThemeProvider, { children: _jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [_jsx(Navbar, {}), _jsxs("main", { className: "pt-20", children: [_jsxs(Head, { children: [_jsx("title", { children: "About the Founder \u2014 PASSION" }), _jsx("meta", { name: "description", content: "Muhammad Asif Khan founded PASSION on a single conviction: the way a man dresses begins with the fabric." }), _jsx("meta", { property: "og:title", content: "About the Founder \u2014 PASSION" }), _jsx("meta", { property: "og:description", content: "Redefining men's elegance through precision fabric craftsmanship." })] }), _jsx("section", { className: "bg-gradient-soft pt-32 pb-12 md:pt-40", children: _jsxs("div", { className: "container-luxe max-w-3xl", children: [_jsx("p", { className: "eyebrow", children: "The House" }), _jsxs("h1", { className: "mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight", children: ["A house built on ", _jsx("span", { className: "text-gradient-brand", children: "conviction." })] }), _jsx("p", { className: "mt-6 text-base text-muted-foreground md:text-lg", children: "PASSION exists because men deserve a fabric house that takes their wardrobe as seriously as they do." })] }) }), _jsx(FounderSection, {}), _jsx(FinalCta, {})] }), _jsx(Footer, {}), _jsx(StickyWhatsApp, {})] }) }));
}
