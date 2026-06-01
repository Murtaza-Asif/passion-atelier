import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { useCart } from "./cart-context";
const AuthContext = createContext(null);
export const PENDING_CART_KEY = "passion-pending-cart";
export function AuthProvider({ children }) {
    const { addItem } = useCart();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [pendingItem, setPendingItem] = useState(null);
    const requireAuth = useCallback((service, variation, color, quantity) => {
        setPendingItem({ service, variation, color, quantity });
        setShowAuthModal(true);
    }, []);
    const closeAuthModal = useCallback(() => {
        setShowAuthModal(false);
        setPendingItem(null);
    }, []);
    const continueAsGuest = useCallback(() => {
        if (!pendingItem)
            return;
        addItem(pendingItem.service, pendingItem.variation, pendingItem.color, pendingItem.quantity);
        setShowAuthModal(false);
        setPendingItem(null);
    }, [pendingItem, addItem]);
    const loginWithGoogle = useCallback(() => {
        if (pendingItem) {
            localStorage.setItem(PENDING_CART_KEY, JSON.stringify(pendingItem));
        }
        setShowAuthModal(false);
        setPendingItem(null);
        window.location.href = "/auth/google";
    }, [pendingItem]);
    return (_jsx(AuthContext.Provider, { value: { showAuthModal, requireAuth, continueAsGuest, loginWithGoogle, closeAuthModal }, children: children }));
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}
export function PendingCartRestorer() {
    const { addItem } = useCart();
    const restored = useRef(false);
    useEffect(() => {
        if (restored.current)
            return;
        try {
            const raw = localStorage.getItem(PENDING_CART_KEY);
            if (!raw)
                return;
            localStorage.removeItem(PENDING_CART_KEY);
            const item = JSON.parse(raw);
            if (item.service && item.variation && item.color) {
                addItem(item.service, item.variation, item.color, item.quantity || 1);
            }
        }
        catch { }
        restored.current = true;
    }, []);
    return null;
}
