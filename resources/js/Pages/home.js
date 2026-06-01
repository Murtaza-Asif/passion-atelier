import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Hero } from "@/Components/sections/hero";
import { ServicesSection } from "@/Components/sections/services-section";
import { LogoMarquee } from "@/Components/sections/logo-marquee";
import { FabricAdvisor } from "@/Components/sections/fabric-advisor";
import { Testimonials } from "@/Components/sections/testimonials";
import { FounderSection } from "@/Components/sections/founder";
import { LocationsSection } from "@/Components/sections/locations";
import { FinalCta } from "@/Components/sections/final-cta";
import { Head } from "@inertiajs/react";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";
export default function Home({ services, collections }) {
    return (_jsx(ThemeProvider, { children: _jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [_jsx(Navbar, {}), _jsxs("main", { className: "pt-20", children: [_jsxs(Head, { children: [_jsx("title", { children: "PASSION \u2014 Crafted Fabric. Tailored Identity. Defined Excellence." }), _jsx("meta", { name: "description", content: "Premium men's unstitched fabrics \u2014 Cotton, Wash & Wear, Formal Latha \u2014 engineered for elegance and precision tailoring. Book a fabric consultation." }), _jsx("meta", { property: "og:title", content: "PASSION \u2014 Premium Men's Unstitched Fabrics" }), _jsx("meta", { property: "og:description", content: "Crafted fabric. Tailored identity. Defined excellence." })] }), _jsx(Hero, {}), _jsx(LogoMarquee, {}), _jsx(ServicesSection, { services: services, collections: collections }), _jsx(FabricAdvisor, {}), _jsx(FounderSection, {}), _jsx(Testimonials, {}), _jsx(LocationsSection, {}), _jsx(FinalCta, {})] }), _jsx(Footer, {}), _jsx(StickyWhatsApp, {})] }) }));
}
