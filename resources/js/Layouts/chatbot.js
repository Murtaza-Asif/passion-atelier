import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { SITE } from "@/lib/site";
const FAQS = [
    {
        match: /price|cost|how much|rate/i,
        reply: "Our unstitched lengths sit across three tiers — Essential, Signature and Atelier. Pricing varies by weave and finish; the easiest way is a quick WhatsApp consultation with current rate cards.",
        cta: [{ label: "Get pricing on WhatsApp", href: SITE.whatsappLink }],
    },
    {
        match: /summer|hot|breath/i,
        reply: "For warm climates I'd recommend the Premium Cotton Collection — soft, breathable, and structured enough to hold a tailored cut.",
        cta: [{ label: "View Cotton Collection", href: "/services/premium-cotton" }],
    },
    {
        match: /wedding|formal|event/i,
        reply: "Our Formal Latha Series is the boardroom and ceremonial standard — lustrous handle, graceful drape, year-round formal weight.",
        cta: [{ label: "View Latha Series", href: "/services/formal-latha" }],
    },
    {
        match: /travel|wrinkle|wash/i,
        reply: "Luxury Wash & Wear is engineered for travel — wrinkle-resistant and crisp through long days.",
        cta: [{ label: "View Wash & Wear", href: "/services/wash-wear" }],
    },
    {
        match: /custom|bespoke|advisor|consult/i,
        reply: "Our advisors run private 1-to-1 fabric consultations — color matching, weight, occasion mapping, and access to reserved stock.",
        cta: [
            { label: "Book consultation", href: SITE.whatsappLink },
            { label: "Try Smart Advisor", href: "/advisor" },
        ],
    },
    {
        match: /location|address|store|where/i,
        reply: "Two ateliers — Khayaban-e-Amin in Lahore, and a flagship in Silicon Valley, USA. Both are open by appointment.",
        cta: [{ label: "See locations", href: "/contact" }],
    },
    {
        match: /ship|delivery|international/i,
        reply: "Yes — we ship internationally with insured express delivery. Most consultations finalise sourcing and dispatch within 5–7 working days.",
        cta: [{ label: "Ask about your country", href: SITE.whatsappLink }],
    },
];
const SUGGESTIONS = [
    "What's the right fabric for summer?",
    "How much does an Atelier-tier length cost?",
    "I need fabric for a wedding",
    "Do you ship internationally?",
];
const GREETING = {
    from: "bot",
    text: "Hello — I'm the PASSION advisor. Ask me anything about our fabrics, pricing, or book a consultation with a human stylist.",
};
export function Chatbot() {
    const [open, setOpen] = useState(false);
    const [msgs, setMsgs] = useState([GREETING]);
    const [draft, setDraft] = useState("");
    const [typing, setTyping] = useState(false);
    const scrollRef = useRef(null);
    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [msgs, typing]);
    const send = async (text) => {
        if (!text.trim())
            return;
        setMsgs((m) => [...m, { from: "user", text }]);
        setDraft("");
        setTyping(true);
        try {
            const response = await fetch("http://localhost:5678/webhook/chat-bot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: text, sessionId: "murtaza-123@" }),
            });
            if (!response.ok)
                throw new Error("Network response was not ok");
            const data = await response.json();
            const responseData = Array.isArray(data) ? data[0] : data;
            const botReply = {
                from: "bot",
                text: responseData.output || responseData.message || "I'm processing your request...",
            };
            setMsgs((m) => [...m, botReply]);
        }
        catch (error) {
            console.error("Error connecting to n8n:", error);
            const hit = FAQS.find((f) => f.match.test(text));
            const fallback = {
                from: "bot",
                text: "Sorry, I'm having trouble connecting. You can talk to us on WhatsApp.",
                cta: [{ label: "Continue on WhatsApp", href: SITE.whatsappLink }],
            };
            setMsgs((m) => [...m, hit ? { from: "bot", text: hit.reply, cta: hit.cta } : fallback]);
        }
        finally {
            setTyping(false);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setOpen((o) => !o), "aria-label": "Open chat", className: "fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow transition-transform hover:scale-105", children: _jsx(AnimatePresence, { mode: "wait", children: open ? (_jsx(motion.span, { initial: { rotate: -90, opacity: 0 }, animate: { rotate: 0, opacity: 1 }, exit: { rotate: 90, opacity: 0 }, children: _jsx(X, { className: "h-5 w-5" }) }, "x")) : (_jsx(motion.span, { initial: { rotate: 90, opacity: 0 }, animate: { rotate: 0, opacity: 1 }, exit: { rotate: -90, opacity: 0 }, children: _jsx(MessageCircle, { className: "h-5 w-5" }) }, "msg")) }) }), _jsx(AnimatePresence, { children: open && (_jsxs(motion.div, { initial: { opacity: 0, y: 20, scale: 0.96 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 20, scale: 0.96 }, transition: { type: "spring", stiffness: 240, damping: 24 }, className: "fixed bottom-24 right-4 z-40 flex h-[560px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-border/70 bg-background shadow-luxe sm:right-6", children: [_jsxs("div", { className: "relative border-b border-border/60 bg-foreground p-5 text-background", children: [_jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-glow opacity-40" }), _jsxs("div", { className: "relative flex items-center gap-3", children: [_jsx("span", { className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand", children: _jsx(Sparkles, { className: "h-4 w-4" }) }), _jsxs("div", { className: "leading-tight", children: [_jsx("p", { className: "font-display text-base font-semibold", children: "PASSION Advisor" }), _jsxs("p", { className: "flex items-center gap-1.5 text-xs text-background/70", children: [_jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-violet" }), "Online \u00B7 replies instantly"] })] })] })] }), _jsxs("div", { ref: scrollRef, className: "flex-1 space-y-4 overflow-y-auto bg-secondary/30 p-4", children: [msgs.map((m, i) => (_jsx(Bubble, { msg: m }, i))), typing && (_jsx("div", { className: "flex justify-start", children: _jsx("div", { className: "rounded-2xl rounded-bl-md bg-card px-4 py-3 shadow-card", children: _jsx("div", { className: "flex gap-1", children: [0, 1, 2].map((d) => (_jsx(motion.span, { className: "h-1.5 w-1.5 rounded-full bg-foreground/40", animate: { y: [0, -4, 0] }, transition: { duration: 0.8, repeat: Infinity, delay: d * 0.15 } }, d))) }) }) })), msgs.length === 1 && (_jsx("div", { className: "flex flex-wrap gap-2 pt-2", children: SUGGESTIONS.map((s) => (_jsx("button", { onClick: () => send(s), className: "rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-foreground/40 hover:bg-secondary", children: s }, s))) }))] }), _jsxs("form", { onSubmit: (e) => { e.preventDefault(); send(draft); }, className: "flex items-center gap-2 border-t border-border/60 bg-background p-3", children: [_jsx("input", { value: draft, onChange: (e) => setDraft(e.target.value), placeholder: "Ask about a fabric\u2026", className: "flex-1 rounded-full border border-border bg-secondary px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-foreground focus:outline-none" }), _jsx("button", { type: "submit", "aria-label": "Send", className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-white transition-transform hover:scale-105", children: _jsx(Send, { className: "h-4 w-4" }) })] })] })) })] }));
}
function Bubble({ msg }) {
    const isBot = msg.from === "bot";
    return (_jsx(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, className: `flex ${isBot ? "justify-start" : "justify-end"}`, children: _jsxs("div", { className: `max-w-[85%] space-y-2`, children: [_jsx("div", { className: `rounded-2xl px-4 py-3 text-sm leading-relaxed ${isBot
                        ? "rounded-bl-md bg-card text-foreground shadow-card"
                        : "rounded-br-md bg-foreground text-background"}`, children: msg.text }), msg.cta && (_jsx("div", { className: "flex flex-wrap gap-2", children: msg.cta.map((c) => (_jsx("a", { href: c.href, target: c.href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer", className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-secondary", children: c.label }, c.label))) }))] }) }));
}
