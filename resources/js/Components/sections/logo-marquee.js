import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
const LOGOS = [
    "MAISON HUDSON", "ATELIER 47", "ROCHE & SONS", "GRAND BOULEVARD",
    "LE CABINET", "NORTH SAVILE", "CASA MILANO", "VERTEX SUITINGS",
];
export function LogoMarquee() {
    const row = [...LOGOS, ...LOGOS];
    return (_jsxs("section", { className: "border-y border-border/60 bg-secondary/40 py-10", children: [_jsx("div", { className: "container-luxe mb-6", children: _jsx("p", { className: "eyebrow text-center", children: "Trusted by tailoring houses across 14 countries" }) }), _jsxs("div", { className: "relative overflow-hidden", children: [_jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" }), _jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" }), _jsx(motion.div, { className: "flex gap-16 whitespace-nowrap", animate: { x: ["0%", "-50%"] }, transition: { duration: 38, repeat: Infinity, ease: "linear" }, children: row.map((name, i) => (_jsx("span", { className: "font-display text-xl font-semibold tracking-[0.25em] text-foreground/40 transition-colors hover:text-foreground", children: name }, i))) })] })] }));
}
