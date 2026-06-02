import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { ShoppingBag, ArrowLeft, Minus, Plus, Trash2, Shield, CreditCard } from "lucide-react";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";
import { useCart } from "@/Lib/cart-context";
import { cn } from "@/Lib/utils";
function formatPrice(p) {
    return `PKR ${p.toLocaleString()}`;
}
export default function Checkout() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const { items, cartTotal, cartCount, updateQuantity, removeItem, clearCart } = useCart();
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        customer_name: user?.name || "",
        customer_email: user?.email || "",
        customer_phone: "",
        shipping_address: "",
        notes: "",
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        const newErrors = {};
        if (!form.customer_name.trim())
            newErrors.customer_name = "Name is required";
        if (!form.customer_phone.trim())
            newErrors.customer_phone = "Phone is required";
        if (!form.shipping_address.trim())
            newErrors.shipping_address = "Address is required";
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        if (items.length === 0)
            return;
        setSubmitting(true);
        router.post(route("checkout.store"), {
            customer_name: form.customer_name,
            customer_email: form.customer_email,
            customer_phone: form.customer_phone,
            shipping_address: form.shipping_address,
            notes: form.notes,
            items: items.map((item) => ({
                product_id: item.service.id,
                variant_id: item.variation.id,
                product_name: item.service.name,
                variant_name: item.variation.name,
                color_name: item.color.name,
                quantity: item.quantity,
                unit_price: item.variation.price,
                subtotal: item.variation.price * item.quantity,
            })),
        }, {
            onSuccess: () => {
                clearCart();
            },
            onError: (errs) => {
                setErrors(errs);
                setSubmitting(false);
            },
            onFinish: () => setSubmitting(false),
        });
    };
    if (items.length === 0) {
        return (_jsx(ThemeProvider, { children: _jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [_jsx(Navbar, {}), _jsx("main", { className: "pt-20", children: _jsxs("div", { className: "container-luxe py-20 text-center", children: [_jsx(ShoppingBag, { className: "mx-auto h-16 w-16 text-muted-foreground/40" }), _jsx("h1", { className: "mt-6 font-display text-2xl font-semibold", children: "Your cart is empty" }), _jsx("p", { className: "mt-2 text-muted-foreground", children: "Add some products before checking out." }), _jsx(Link, { href: "/services", className: "btn-luxe mt-6 inline-flex bg-foreground text-background", children: "Browse Products" })] }) }), _jsx(Footer, {}), _jsx(StickyWhatsApp, {})] }) }));
    }
    return (_jsx(ThemeProvider, { children: _jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [_jsx(Navbar, {}), _jsxs("main", { className: "pt-20", children: [_jsx(Head, { title: "Checkout \u2014 PASSION", children: _jsx("meta", { name: "description", content: "Complete your order." }) }), _jsx("section", { className: "border-b border-border/60 bg-secondary/30", children: _jsxs("div", { className: "container-luxe flex items-center gap-2 py-3 text-xs text-muted-foreground", children: [_jsx(Link, { href: "/", className: "hover:text-foreground", children: "Home" }), _jsx("span", { children: "/" }), _jsx(Link, { href: "/services", className: "hover:text-foreground", children: "Shop" }), _jsx("span", { children: "/" }), _jsx("span", { className: "text-foreground", children: "Checkout" })] }) }), _jsx("section", { className: "py-10 md:py-16", children: _jsx("div", { className: "container-luxe", children: _jsxs("div", { className: "grid gap-10 lg:grid-cols-12", children: [_jsxs("div", { className: "lg:col-span-7", children: [_jsx("h1", { className: "font-display text-2xl font-semibold md:text-3xl", children: "Contact & Shipping" }), user && (_jsxs("p", { className: "mt-2 text-sm text-emerald-600", children: ["Signed in as ", user.email] })), _jsxs("form", { onSubmit: handleSubmit, className: "mt-8 space-y-5", children: [_jsxs("div", { children: [_jsxs("label", { className: "text-sm font-medium text-foreground", children: ["Full Name ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx("input", { type: "text", name: "customer_name", value: form.customer_name, onChange: handleChange, className: cn("mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-violet", errors.customer_name ? "border-destructive" : "border-border/70"), placeholder: "Muhammad Asif Khan" }), errors.customer_name && _jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.customer_name })] }), _jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-foreground", children: "Email (optional)" }), _jsx("input", { type: "email", name: "customer_email", value: form.customer_email, onChange: handleChange, className: "mt-1 w-full rounded-xl border border-border/70 bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-violet", placeholder: "asif@example.com" })] }), _jsxs("div", { children: [_jsxs("label", { className: "text-sm font-medium text-foreground", children: ["Phone ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx("input", { type: "tel", name: "customer_phone", value: form.customer_phone, onChange: handleChange, className: cn("mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-violet", errors.customer_phone ? "border-destructive" : "border-border/70"), placeholder: "+92 300 1234567" }), errors.customer_phone && _jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.customer_phone })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "text-sm font-medium text-foreground", children: ["Shipping Address ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx("textarea", { name: "shipping_address", value: form.shipping_address, onChange: handleChange, rows: 3, className: cn("mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-violet", errors.shipping_address ? "border-destructive" : "border-border/70"), placeholder: "House #, Street, City, Province" }), errors.shipping_address && _jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.shipping_address })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-foreground", children: "Order Notes (optional)" }), _jsx("textarea", { name: "notes", value: form.notes, onChange: handleChange, rows: 2, className: "mt-1 w-full rounded-xl border border-border/70 bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-violet", placeholder: "Any special instructions..." })] }), _jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-border/60 bg-emerald-50/50 p-4 text-sm", children: [_jsx(CreditCard, { className: "h-5 w-5 shrink-0 text-emerald-600" }), _jsx("span", { className: "text-emerald-800", children: "Pay with cash on delivery \u2014 no card needed." })] }), _jsx("button", { type: "submit", disabled: submitting, className: "btn-luxe w-full bg-foreground text-background disabled:opacity-50", children: submitting ? "Placing Order..." : `Place Order — ${formatPrice(cartTotal)}` }), _jsxs(Link, { href: "/services", className: "flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), " Continue Shopping"] })] })] }), _jsx("div", { className: "lg:col-span-5", children: _jsxs("div", { className: "sticky top-28 rounded-2xl border border-border/70 bg-card p-6", children: [_jsx("h2", { className: "font-display text-lg font-semibold", children: "Order Summary" }), _jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [cartCount, " item", cartCount !== 1 ? "s" : ""] }), _jsx("div", { className: "mt-6 space-y-4", children: items.map((item) => (_jsxs("div", { className: "flex gap-4 border-b border-border/40 pb-4 last:border-0", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.service.name }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [item.variation.name, " \u2014 ", item.color.name] }), _jsxs("div", { className: "mt-2 flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center rounded-lg border border-border/60", children: [_jsx("button", { type: "button", onClick: () => updateQuantity(item.id, item.quantity - 1), className: "flex h-7 w-7 items-center justify-center text-foreground/60 hover:text-foreground", children: _jsx(Minus, { className: "h-3 w-3" }) }), _jsx("span", { className: "flex h-7 w-8 items-center justify-center text-xs font-semibold tabular-nums", children: item.quantity }), _jsx("button", { type: "button", onClick: () => updateQuantity(item.id, item.quantity + 1), className: "flex h-7 w-7 items-center justify-center text-foreground/60 hover:text-foreground", children: _jsx(Plus, { className: "h-3 w-3" }) })] }), _jsx("button", { type: "button", onClick: () => removeItem(item.id), className: "text-muted-foreground/60 hover:text-destructive", children: _jsx(Trash2, { className: "h-3.5 w-3.5" }) })] })] }), _jsxs("div", { className: "text-right shrink-0", children: [_jsx("p", { className: "text-sm font-semibold text-foreground", children: formatPrice(item.variation.price * item.quantity) }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [formatPrice(item.variation.price), " / ea"] })] })] }, item.id))) }), _jsxs("div", { className: "mt-6 space-y-2 border-t border-border/60 pt-4", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Subtotal" }), _jsx("span", { className: "font-medium text-foreground", children: formatPrice(cartTotal) })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Shipping" }), _jsx("span", { className: "text-muted-foreground", children: "Calculated at confirmation" })] }), _jsxs("div", { className: "flex justify-between border-t border-border/40 pt-2 text-base", children: [_jsx("span", { className: "font-semibold text-foreground", children: "Total" }), _jsx("span", { className: "font-semibold text-foreground", children: formatPrice(cartTotal) })] })] }), _jsxs("div", { className: "mt-6 flex items-center gap-2 rounded-xl bg-secondary/50 p-3 text-xs text-muted-foreground", children: [_jsx(Shield, { className: "h-4 w-4 shrink-0" }), "Your information is secure and will only be used for this order."] })] }) })] }) }) })] }), _jsx(Footer, {}), _jsx(StickyWhatsApp, {})] }) }));
}
