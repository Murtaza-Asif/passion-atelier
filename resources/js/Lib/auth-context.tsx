import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from "react";
import { useCart } from "./cart-context";

interface AuthContextType {
  showAuthModal: boolean;
  requireAuth: (service: any, variation: any, color: any, quantity: number) => void;
  continueAsGuest: () => void;
  loginWithGoogle: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const PENDING_CART_KEY = "passion-pending-cart";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { addItem } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingItem, setPendingItem] = useState<{
    service: any;
    variation: any;
    color: any;
    quantity: number;
  } | null>(null);

  const requireAuth = useCallback((service: any, variation: any, color: any, quantity: number) => {
    setPendingItem({ service, variation, color, quantity });
    setShowAuthModal(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setShowAuthModal(false);
    setPendingItem(null);
  }, []);

  const continueAsGuest = useCallback(() => {
    if (!pendingItem) return;
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

  return (
    <AuthContext.Provider value={{ showAuthModal, requireAuth, continueAsGuest, loginWithGoogle, closeAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

export function PendingCartRestorer() {
  const { addItem } = useCart();
  const restored = useRef(false);

  useEffect(() => {
    if (restored.current) return;
    try {
      const raw = localStorage.getItem(PENDING_CART_KEY);
      if (!raw) return;
      localStorage.removeItem(PENDING_CART_KEY);
      const item = JSON.parse(raw);
      if (item.service && item.variation && item.color) {
        addItem(item.service, item.variation, item.color, item.quantity || 1);
      }
    } catch {}
    restored.current = true;
  }, []);

  return null;
}
