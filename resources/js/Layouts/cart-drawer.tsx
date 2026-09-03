import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useCart } from "@/Lib/cart-context";
import { SITE } from "@/Lib/site";
import cotton from "@/assets/fabric-cotton.jpg";
import washwear from "@/assets/fabric-washwear.jpg";
import latha from "@/assets/fabric-latha.jpg";
import custom from "@/assets/fabric-custom.jpg";
import { useMemo } from "react";

const imageMap: Record<string, string> = { cotton, washwear, latha, custom };

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, cartCount, cartTotal, removeItem, updateQuantity } = useCart();

  const checkoutText = useMemo(
    () =>
      items
        .map((i) => `${i.service.name} — ${i.variation.name} (${i.color.name}) × ${i.quantity}`)
        .join("\n"),
    [items]
  );

  const whatsappLink = `${SITE.whatsappLink}?text=${encodeURIComponent(
    `Hi PASSION, I'd like to place an order:\n\n${checkoutText}\n\nTotal: PKR ${cartTotal.toLocaleString()}`
  )}`;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-70 flex w-full max-w-md flex-col border-l border-border/60 bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span className="font-display text-base font-semibold">Cart</span>
                {cartCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1.5 text-[10px] font-bold text-background">
                    {cartCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 transition-colors hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground/30" />
                  <p className="mt-4 font-display text-lg font-semibold">Your cart is empty</p>
                  <p className="mt-1 text-sm text-muted-foreground">Add some fabrics to get started.</p>
                  <button
                    onClick={onClose}
                    className="btn-luxe mt-6 border border-border bg-background text-foreground"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 rounded-2xl border border-border/60 bg-card p-3"
                    >
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border/60">
                        <img
                          src={imageMap[item.service.image]}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <p className="text-sm font-semibold leading-tight truncate">{item.service.name}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {item.variation.name} · {item.color.name}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center rounded-lg border border-border/60">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="flex h-7 w-8 items-center justify-center text-xs font-semibold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold tabular-nums">
                              PKR {(item.variation.price * item.quantity).toLocaleString()}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border/60 px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-display text-lg font-semibold">
                    PKR {cartTotal.toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Shipping calculated at checkout</p>
                <Link href="/checkout" className="btn-luxe mt-4 w-full bg-violet text-white">
                  Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-luxe mt-2 w-full bg-foreground text-background"
                >
                  <MessageCircle className="h-4 w-4" />
                  Checkout via WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
