import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-fabric.jpg";
import { SITE } from "@/lib/site";
export function Hero() {
    const ref = useRef(null);
    const stageRef = useRef(null);
    // Pointer-driven motion values — normalized -1..1
    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const spx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.4 });
    const spy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.4 });
    // Layered parallax — different depths for the cinematic feel
    const tiltX = useTransform(spy, [-1, 1], [4, -4]);
    const tiltY = useTransform(spx, [-1, 1], [-6, 6]);
    const layer1X = useTransform(spx, [-1, 1], [-18, 18]);
    const layer1Y = useTransform(spy, [-1, 1], [-12, 12]);
    const layer2X = useTransform(spx, [-1, 1], [-36, 36]);
    const layer2Y = useTransform(spy, [-1, 1], [-22, 22]);
    const sheenX = useTransform(spx, [-1, 1], [-60, 60]);
    const sheenY = useTransform(spy, [-1, 1], [-60, 60]);
    // Scroll-driven parallax on the fabric stage
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const scrollY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
    const scrollFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.7]);
    // Single passive pointer listener, throttled to rAF — zero jank
    useEffect(() => {
        let rafId = 0;
        let nextX = 0;
        let nextY = 0;
        let pending = false;
        const flush = () => {
            px.set(nextX);
            py.set(nextY);
            pending = false;
        };
        const onMove = (e) => {
            const stage = stageRef.current;
            if (!stage)
                return;
            const r = stage.getBoundingClientRect();
            // Use the stage as the reference frame so motion feels anchored to the visual
            nextX = ((e.clientX - r.left) / r.width) * 2 - 1;
            nextY = ((e.clientY - r.top) / r.height) * 2 - 1;
            // Clamp to keep extremes contained
            nextX = Math.max(-1.2, Math.min(1.2, nextX));
            nextY = Math.max(-1.2, Math.min(1.2, nextY));
            if (!pending) {
                pending = true;
                rafId = requestAnimationFrame(flush);
            }
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => {
            window.removeEventListener("pointermove", onMove);
            cancelAnimationFrame(rafId);
        };
    }, [px, py]);
    return (_jsxs("section", { ref: ref, className: "relative overflow-hidden bg-gradient-soft pt-32 pb-24 md:pt-40 md:pb-32", children: [_jsx("div", { className: "pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[820px] w-[820px] rounded-full opacity-50 blur-3xl", style: { background: "var(--gradient-glow)" } }), _jsx("div", { className: "pointer-events-none absolute -bottom-40 left-[-10%] -z-10 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl", style: { background: "radial-gradient(50% 50% at 50% 50%, oklch(0.85 0.15 285 / 0.35), transparent 70%)" } }), _jsx("div", { className: "pointer-events-none absolute inset-0 -z-10 opacity-[0.035]", style: {
                    backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                    backgroundSize: "88px 88px",
                    maskImage: "radial-gradient(ellipse at center, black 35%, transparent 78%)",
                } }), _jsx("div", { className: "container-luxe", children: _jsxs("div", { className: "grid items-center gap-14 lg:grid-cols-12 lg:gap-20", children: [_jsxs("div", { className: "lg:col-span-6 xl:col-span-6", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1.5 text-xs backdrop-blur", children: [_jsxs("span", { className: "relative flex h-2 w-2", children: [_jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-60" }), _jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-violet" })] }), _jsx("span", { className: "font-medium tracking-wide text-foreground/80", children: "New \u00B7 Spring '26 unstitched edit" })] }), _jsxs("h1", { className: "mt-7 font-display text-[clamp(2.6rem,6.6vw,5.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]", children: [_jsx(RevealLine, { delay: 0.05, children: "Crafted Fabric." }), _jsx(RevealLine, { delay: 0.18, children: "Tailored Identity." }), _jsx(RevealLine, { delay: 0.31, children: _jsx("span", { className: "text-gradient-brand", children: "Defined Excellence." }) })] }), _jsx(motion.p, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5, duration: 0.7 }, className: "mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg", children: "Premium men's unstitched fabrics \u2014 Cotton, Latha and Wash & Wear \u2014 engineered for elegance and precision tailoring. Sourced, woven and finished for those who insist on quiet, undeniable refinement." }), _jsxs(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.62, duration: 0.7 }, className: "mt-10 flex flex-wrap items-center gap-3", children: [_jsxs("a", { href: "/collections", className: "btn-luxe bg-foreground text-background", children: ["Explore Collection", _jsx(ArrowRight, { className: "h-4 w-4" })] }), _jsxs("a", { href: SITE.whatsappLink, target: "_blank", rel: "noreferrer", className: "btn-luxe border border-border bg-background text-foreground hover:border-foreground/30", children: [_jsx(MessageCircle, { className: "h-4 w-4 text-violet" }), "Book Fabric Consultation"] })] }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.85, duration: 0.9 }, className: "mt-14 grid max-w-lg grid-cols-3 divide-x divide-border/60 text-left", children: [
                                        { v: "32+", l: "Fabric weaves" },
                                        { v: "12k", l: "Garments tailored" },
                                        { v: "98%", l: "Repeat clients" },
                                    ].map((s) => (_jsxs("div", { className: "px-4 first:pl-0", children: [_jsx("p", { className: "font-display text-2xl font-semibold text-foreground", children: s.v }), _jsx("p", { className: "mt-1 text-xs uppercase tracking-widest text-muted-foreground", children: s.l })] }, s.l))) })] }), _jsx("div", { className: "lg:col-span-6 xl:col-span-6", children: _jsxs(motion.div, { ref: stageRef, initial: { opacity: 0, scale: 0.97 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1, ease: [0.2, 0.8, 0.2, 1] }, style: {
                                    rotateX: tiltX,
                                    rotateY: tiltY,
                                    transformPerspective: 1200,
                                    y: scrollY,
                                    opacity: scrollFade,
                                }, className: "relative mx-auto aspect-[4/5] w-full max-w-[520px] [transform-style:preserve-3d] will-change-transform", children: [_jsx("div", { className: "absolute -inset-8 -z-10 rounded-[2.25rem] bg-gradient-brand opacity-25 blur-3xl" }), _jsxs(motion.div, { style: { scale: scrollScale }, className: "relative h-full w-full overflow-hidden rounded-[1.85rem] shadow-luxe will-change-transform", children: [_jsx(motion.img, { src: heroImg, alt: "Layered premium unstitched fabrics \u2014 cotton, latha and wash & wear", width: 1280, height: 1600, draggable: false, style: { x: layer1X, y: layer1Y }, className: "absolute inset-[-6%] h-[112%] w-[112%] object-cover will-change-transform select-none" }), _jsx(motion.div, { "aria-hidden": true, style: { x: layer2X, y: layer2Y }, className: "pointer-events-none absolute inset-[-10%] mix-blend-soft-light opacity-70 will-change-transform", children: _jsx("div", { className: "absolute inset-0", style: {
                                                        background: "radial-gradient(60% 50% at 30% 30%, oklch(0.92 0.05 295 / 0.55), transparent 60%), radial-gradient(50% 40% at 75% 80%, oklch(0.55 0.22 270 / 0.35), transparent 65%)",
                                                    } }) }), _jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0", style: {
                                                    background: "radial-gradient(120% 80% at 50% 0%, transparent 40%, oklch(0 0 0 / 0.18) 100%), linear-gradient(180deg, transparent 50%, oklch(0 0 0 / 0.25) 100%)",
                                                } }), _jsx(motion.div, { "aria-hidden": true, style: { x: sheenX, y: sheenY }, className: "pointer-events-none absolute inset-0 will-change-transform", children: _jsx("div", { className: "absolute -inset-24", style: {
                                                        background: "radial-gradient(420px circle at 50% 50%, oklch(0.92 0.12 285 / 0.32), transparent 60%)",
                                                    } }) }), _jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 mix-blend-overlay opacity-50", style: {
                                                    background: "linear-gradient(110deg, transparent 30%, oklch(1 0 0 / 0.22) 50%, transparent 70%)",
                                                    backgroundSize: "250% 100%",
                                                    animation: "shimmer 7s linear infinite",
                                                } }), _jsxs("div", { className: "absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/15 bg-black/45 p-3 text-white backdrop-blur-md", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10", children: _jsx(Sparkles, { className: "h-4 w-4" }) }), _jsxs("div", { className: "leading-tight", children: [_jsx("p", { className: "text-[11px] uppercase tracking-widest text-white/60", children: "Signature" }), _jsx("p", { className: "text-sm font-medium", children: "Atelier Noir Weave" })] })] }), _jsx("span", { className: "rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider", children: "SS '26" })] })] }), _jsxs(motion.div, { initial: { opacity: 0, x: -16, y: -8 }, animate: { opacity: 1, x: 0, y: 0 }, transition: { delay: 0.9, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }, style: { x: layer2X, y: layer2Y }, className: "absolute -left-6 top-10 hidden rounded-2xl border border-border/70 bg-background/90 p-4 shadow-card backdrop-blur md:block", children: [_jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Hand-finished" }), _jsx("p", { className: "mt-1 font-display text-base font-semibold", children: "120s combed yarn" })] }), _jsxs(motion.div, { initial: { opacity: 0, x: 16, y: 8 }, animate: { opacity: 1, x: 0, y: 0 }, transition: { delay: 1.05, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }, style: { x: layer1X, y: layer1Y }, className: "absolute -right-6 bottom-16 hidden rounded-2xl border border-border/70 bg-background/90 p-3 shadow-card backdrop-blur md:flex md:items-center md:gap-3", children: [_jsxs("div", { className: "flex -space-x-2", children: [_jsx("span", { className: "h-7 w-7 rounded-full border-2 border-background bg-[oklch(0.97_0.005_280)]" }), _jsx("span", { className: "h-7 w-7 rounded-full border-2 border-background bg-[oklch(0.28_0.02_280)]" }), _jsx("span", { className: "h-7 w-7 rounded-full border-2 border-background bg-[oklch(0.32_0.18_270)]" })] }), _jsxs("div", { className: "leading-tight", children: [_jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "3 weaves" }), _jsx("p", { className: "text-sm font-medium", children: "Cotton \u00B7 Latha \u00B7 W&W" })] })] })] }) })] }) })] }));
}
function RevealLine({ children, delay = 0 }) {
    return (_jsx("span", { className: "block overflow-hidden pb-[0.08em]", children: _jsx(motion.span, { initial: { y: "105%" }, animate: { y: 0 }, transition: { delay, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }, className: "block will-change-transform", children: children }) }));
}
