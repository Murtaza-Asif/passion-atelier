import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { FabricAdvisor } from "@/Components/sections/fabric-advisor";
import { FinalCta } from "@/Components/sections/final-cta";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";
export default function Advisor() {
    return (_jsx(ThemeProvider, { children: _jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [_jsx(Navbar, {}), _jsxs("main", { className: "pt-20", children: [_jsxs(Head, { children: [_jsx("title", { children: "Smart Fabric Advisor \u2014 PASSION" }), _jsx("meta", { name: "description", content: "An intelligent advisor that recommends your perfect unstitched fabric in five questions." }), _jsx("meta", { property: "og:title", content: "Smart Fabric Advisor \u2014 PASSION" }), _jsx("meta", { property: "og:description", content: "Get a tailored fabric recommendation in 30 seconds, then refine it with a master advisor." })] }), _jsx("section", { className: "bg-gradient-soft pt-32 pb-12 md:pt-40", children: _jsxs("div", { className: "container-luxe max-w-3xl text-center", children: [_jsx("p", { className: "eyebrow", children: "Smart Advisor" }), _jsxs("h1", { className: "mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight", children: ["Five questions.", _jsx("br", {}), _jsx("span", { className: "text-gradient-brand", children: "Your fabric, found." })] })] }) }), _jsx(FabricAdvisor, {}), _jsx(FinalCta, {})] }), _jsx(Footer, {}), _jsx(StickyWhatsApp, {})] }) }));
}
