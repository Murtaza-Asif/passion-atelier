import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { LocationsSection } from "@/Components/sections/locations";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/Lib/site";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";
export default function Contact() {
    return (_jsx(ThemeProvider, { children: _jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [_jsx(Navbar, {}), _jsxs("main", { className: "pt-20", children: [_jsxs(Head, { children: [_jsx("title", { children: "Contact \u2014 PASSION" }), _jsx("meta", { name: "description", content: "Speak to a master fabric advisor \u2014 by WhatsApp, email, or in-person at our Lahore and Silicon Valley ateliers." }), _jsx("meta", { property: "og:title", content: "Contact \u2014 PASSION" }), _jsx("meta", { property: "og:description", content: "Two ateliers, one standard. Reach a master fabric advisor." })] }), _jsx("section", { className: "bg-gradient-soft pt-32 pb-12 md:pt-40", children: _jsxs("div", { className: "container-luxe max-w-3xl", children: [_jsx("p", { className: "eyebrow", children: "Contact" }), _jsxs("h1", { className: "mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight", children: ["Speak to an ", _jsx("span", { className: "text-gradient-brand", children: "advisor." })] }), _jsx("p", { className: "mt-6 max-w-xl text-base text-muted-foreground md:text-lg", children: "The fastest reply is on WhatsApp. For longer briefs, email us directly or visit us by appointment." }), _jsxs("div", { className: "mt-10 grid gap-4 sm:grid-cols-3", children: [_jsx(ContactCard, { icon: MessageCircle, label: "WhatsApp", value: "+92 323 2032700", href: SITE.whatsappLink }), _jsx(ContactCard, { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` }), _jsx(ContactCard, { icon: Phone, label: "Studio", value: "+92 323 2032700", href: `tel:+${SITE.whatsapp}` })] })] }) }), _jsx(LocationsSection, {})] }), _jsx(Footer, {}), _jsx(StickyWhatsApp, {})] }) }));
}
function ContactCard({ icon: Icon, label, value, href }) {
    return (_jsxs("a", { href: href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer", className: "group rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-foreground/40", children: [_jsx("span", { className: "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white", children: _jsx(Icon, { className: "h-4 w-4" }) }), _jsx("p", { className: "mt-4 text-[10px] uppercase tracking-widest text-muted-foreground", children: label }), _jsx("p", { className: "mt-1 font-display text-base font-semibold", children: value })] }));
}
