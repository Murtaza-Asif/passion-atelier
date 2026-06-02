import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState, useRef } from "react";
import { Menu, X, Moon, Sun, ShoppingBag, User, LogOut, Package, ChevronDown } from "lucide-react";
import { SITE } from "@/Lib/site";
import { useTheme } from "./theme-provider";
import { useCart } from "@/Lib/cart-context";
import { cn } from "@/Lib/utils";
export function Navbar() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');
    const { theme, toggle } = useTheme();
    const { cartCount, toggleCart } = useCart();
    const userMenuRef = useRef(null);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    useEffect(() => {
        setCurrentUrl(window.location.pathname);
    }, []);
    useEffect(() => { setOpen(false); }, [currentUrl]);
    useEffect(() => {
        if (!userMenuOpen)
            return;
        const handler = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [userMenuOpen]);
    return (_jsx("header", { className: cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "py-2" : "py-4"), children: _jsxs("div", { className: "container-luxe", children: [_jsxs("div", { className: cn("flex items-center justify-between rounded-full transition-all duration-500", scrolled
                        ? "glass shadow-card px-3 py-2"
                        : "px-2 py-2"), children: [_jsxs(Link, { href: "/", className: "flex items-center gap-2 px-3 py-1", children: [_jsxs("span", { className: "relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-[10px] font-bold tracking-wider text-white", children: ["P", _jsx("span", { className: "absolute -inset-1 -z-10 rounded-full bg-gradient-brand opacity-40 blur-md" })] }), _jsx("span", { className: "font-display text-base font-semibold tracking-tight", children: SITE.brand })] }), _jsx("nav", { className: "hidden items-center gap-1 lg:flex", children: SITE.nav.map((item) => (_jsx(Link, { href: item.to, className: cn("relative rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground", currentUrl === item.to && "text-foreground bg-secondary"), children: item.label }, item.to))) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { onClick: toggleCart, "aria-label": "Open cart", className: "relative hidden h-10 w-10 items-center justify-center rounded-full border border-border/60 text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground sm:inline-flex", children: [_jsx(ShoppingBag, { className: "h-4 w-4" }), cartCount > 0 && (_jsx("span", { className: "absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-bold text-background", children: cartCount > 9 ? "9+" : cartCount }))] }), _jsx("button", { onClick: toggle, "aria-label": "Toggle theme", className: "hidden h-10 w-10 items-center justify-center rounded-full border border-border/60 text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground sm:inline-flex", children: theme === "dark" ? _jsx(Sun, { className: "h-4 w-4" }) : _jsx(Moon, { className: "h-4 w-4" }) }), user ? (_jsxs("div", { className: "relative hidden sm:block", ref: userMenuRef, children: [_jsxs("button", { onClick: () => setUserMenuOpen((o) => !o), className: "flex items-center gap-2 rounded-full border border-border/60 px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary", children: [_jsx(User, { className: "h-4 w-4" }), _jsx("span", { className: "max-w-[100px] truncate", children: user.name }), _jsx(ChevronDown, { className: cn("h-3.5 w-3.5 transition-transform", userMenuOpen && "rotate-180") })] }), userMenuOpen && (_jsxs("div", { className: "absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-border/60 bg-card py-1 shadow-xl", children: [_jsxs("div", { className: "border-b border-border/40 px-4 py-2.5", children: [_jsx("p", { className: "text-sm font-medium text-foreground", children: user.name }), _jsx("p", { className: "text-xs text-muted-foreground", children: user.email })] }), _jsxs(Link, { href: route("my-orders"), className: "flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-secondary", onClick: () => setUserMenuOpen(false), children: [_jsx(Package, { className: "h-4 w-4" }), " My Orders"] }), _jsxs(Link, { href: route("profile.edit"), className: "flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-secondary", onClick: () => setUserMenuOpen(false), children: [_jsx(User, { className: "h-4 w-4" }), " Profile"] }), _jsx("div", { className: "border-t border-border/40", children: _jsxs(Link, { href: route("logout"), method: "post", as: "button", className: "flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-destructive/80 transition-colors hover:bg-secondary", children: [_jsx(LogOut, { className: "h-4 w-4" }), " Sign Out"] }) })] }))] })) : (_jsx(Link, { href: route("login"), className: "btn-luxe hidden bg-foreground text-background hover:opacity-90 sm:inline-flex", children: "Sign In" })), _jsx("button", { onClick: () => setOpen((o) => !o), "aria-label": "Open menu", className: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 lg:hidden", children: open ? _jsx(X, { className: "h-5 w-5" }) : _jsx(Menu, { className: "h-5 w-5" }) })] })] }), _jsx("div", { className: cn("lg:hidden overflow-hidden transition-all duration-500", open ? "mt-3 max-h-[600px] opacity-100" : "max-h-0 opacity-0"), children: _jsxs("div", { className: "glass rounded-2xl p-3 shadow-card", children: [_jsx("nav", { className: "flex flex-col", children: SITE.nav.map((item) => (_jsx(Link, { href: item.to, className: cn("rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary", currentUrl === item.to && "text-foreground bg-secondary"), children: item.label }, item.to))) }), _jsxs("div", { className: "mt-2 flex items-center gap-2 border-t border-border/60 p-2 pt-3", children: [_jsxs("button", { onClick: toggleCart, className: "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60", "aria-label": "Open cart", children: [_jsx(ShoppingBag, { className: "h-4 w-4" }), cartCount > 0 && (_jsx("span", { className: "absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-bold text-background", children: cartCount > 9 ? "9+" : cartCount }))] }), _jsx("button", { onClick: toggle, className: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60", "aria-label": "Toggle theme", children: theme === "dark" ? _jsx(Sun, { className: "h-4 w-4" }) : _jsx(Moon, { className: "h-4 w-4" }) }), user ? (_jsxs("div", { className: "flex flex-1 items-center justify-between gap-1 rounded-xl bg-secondary/50 px-2", children: [_jsx(Link, { href: route("my-orders"), className: "flex-1 rounded-lg px-2 py-2 text-center text-xs font-medium text-foreground/80 hover:bg-background/50", children: "Orders" }), _jsx("span", { className: "h-5 w-px bg-border/60" }), _jsx(Link, { href: route("profile.edit"), className: "flex-1 rounded-lg px-2 py-2 text-center text-xs font-medium text-foreground/80 hover:bg-background/50", children: "Profile" }), _jsx("span", { className: "h-5 w-px bg-border/60" }), _jsx(Link, { href: route("logout"), method: "post", as: "button", className: "flex-1 rounded-lg px-2 py-2 text-center text-xs font-medium text-destructive/80 hover:bg-background/50", children: "Sign Out" })] })) : (_jsx(Link, { href: route("login"), className: "btn-luxe flex-1 bg-foreground text-background", children: "Sign In" }))] })] }) })] }) }));
}
