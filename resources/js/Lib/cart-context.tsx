import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export interface CartItem {
  id: string;
  service: any;
  variation: any;
  color: any;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (service: any, variation: any, color: any, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem("passion-cart");
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
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

  const addItem = useCallback(
    (service: any, variation: any, color: any, quantity = 1) => {
      setItems((prev) => {
        const key = `${service.slug}-${variation.id}-${color.name}`;
        const existing = prev.find((i) => i.id === key);
        if (existing) {
          return prev.map((i) =>
            i.id === key ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [...prev, { id: key, service, variation, color, quantity }];
      });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem("passion-cart");
  }, []);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = items.reduce((sum, i) => sum + i.variation.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, cartCount, cartTotal, cartOpen, openCart, closeCart, toggleCart, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
