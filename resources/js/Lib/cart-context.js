import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
const CartContext = createContext(null);
function loadCart() {
    try {
        const raw = localStorage.getItem("passion-cart");
        if (raw)
            return JSON.parse(raw);
    }
    catch { }
    return [];
}
export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    useEffect(() => {
        setItems(loadCart());
    }, []);
    useEffect(() => {
        if (items.length > 0 || localStorage.getItem("passion-cart")) {
            localStorage.setItem("passion-cart", JSON.stringify(items));
        }
    }, [items]);
    const openCart = useCallback(() => setCartOpen(true), []);
    const closeCart = useCallback(() => setCartOpen(false), []);
    const toggleCart = useCallback(() => setCartOpen((o) => !o), []);
    const addItem = useCallback((service, variation, color, quantity = 1) => {
        setItems((prev) => {
            const key = `${service.slug}-${variation.id}-${color.name}`;
            const existing = prev.find((i) => i.id === key);
            if (existing) {
                return prev.map((i) => i.id === key ? { ...i, quantity: i.quantity + quantity } : i);
            }
            return [...prev, { id: key, service, variation, color, quantity }];
        });
    }, []);
    const removeItem = useCallback((id) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }, []);
    const updateQuantity = useCallback((id, qty) => {
        if (qty < 1)
            return;
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
    }, []);
    const clearCart = useCallback(() => {
        setItems([]);
        localStorage.removeItem("passion-cart");
    }, []);
    const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const cartTotal = items.reduce((sum, i) => sum + i.variation.price * i.quantity, 0);
    return (_jsx(CartContext.Provider, { value: { items, cartCount, cartTotal, cartOpen, openCart, closeCart, toggleCart, addItem, removeItem, updateQuantity, clearCart }, children: children }));
}
export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx)
        throw new Error("useCart must be used within a CartProvider");
    return ctx;
}
