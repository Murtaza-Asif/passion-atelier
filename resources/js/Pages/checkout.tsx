import { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { ShoppingBag, ArrowLeft, Minus, Plus, Trash2, Truck, Shield, CreditCard } from "lucide-react";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";
import { useCart } from "@/Lib/cart-context";
import { cn } from "@/Lib/utils";

function formatPrice(p: number) {
  return `PKR ${p.toLocaleString()}`;
}

export default function Checkout() {
  const { auth } = usePage().props as { auth: { user: any } };
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};
    if (!form.customer_name.trim()) newErrors.customer_name = "Name is required";
    if (!form.customer_phone.trim()) newErrors.customer_phone = "Phone is required";
    if (!form.shipping_address.trim()) newErrors.shipping_address = "Address is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (items.length === 0) return;

    setSubmitting(true);

    router.post(
      route("checkout.store"),
      {
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
      },
      {
        onSuccess: () => {
          clearCart();
        },
        onError: (errs) => {
          setErrors(errs as Record<string, string>);
          setSubmitting(false);
        },
        onFinish: () => setSubmitting(false),
      },
    );
  };

  if (items.length === 0) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main className="pt-20">
            <div className="container-luxe py-20 text-center">
              <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/40" />
              <h1 className="mt-6 font-display text-2xl font-semibold">Your cart is empty</h1>
              <p className="mt-2 text-muted-foreground">Add some products before checking out.</p>
              <Link href="/services" className="btn-luxe mt-6 inline-flex bg-foreground text-background">Browse Products</Link>
            </div>
          </main>
          <Footer />
          <StickyWhatsApp />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-20">
          <Head title="Checkout — PASSION">
            <meta name="description" content="Complete your order." />
          </Head>

          <section className="border-b border-border/60 bg-secondary/30">
            <div className="container-luxe flex items-center gap-2 py-3 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-foreground">Shop</Link>
              <span>/</span>
              <span className="text-foreground">Checkout</span>
            </div>
          </section>

          <section className="py-10 md:py-16">
            <div className="container-luxe">
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <h1 className="font-display text-2xl font-semibold md:text-3xl">Contact & Shipping</h1>
                  {user && (
                    <p className="mt-2 text-sm text-emerald-600">Signed in as {user.email}</p>
                  )}

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                      <label className="text-sm font-medium text-foreground">Full Name <span className="text-destructive">*</span></label>
                      <input type="text" name="customer_name" value={form.customer_name} onChange={handleChange} className={cn("mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-violet", errors.customer_name ? "border-destructive" : "border-border/70")} placeholder="Muhammad Asif Khan" />
                      {errors.customer_name && <p className="mt-1 text-xs text-destructive">{errors.customer_name}</p>}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-foreground">Email (optional)</label>
                        <input type="email" name="customer_email" value={form.customer_email} onChange={handleChange} className="mt-1 w-full rounded-xl border border-border/70 bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-violet" placeholder="asif@example.com" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Phone <span className="text-destructive">*</span></label>
                        <input type="tel" name="customer_phone" value={form.customer_phone} onChange={handleChange} className={cn("mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-violet", errors.customer_phone ? "border-destructive" : "border-border/70")} placeholder="+92 300 1234567" />
                        {errors.customer_phone && <p className="mt-1 text-xs text-destructive">{errors.customer_phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Shipping Address <span className="text-destructive">*</span></label>
                      <textarea name="shipping_address" value={form.shipping_address} onChange={handleChange} rows={3} className={cn("mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-violet", errors.shipping_address ? "border-destructive" : "border-border/70")} placeholder="House #, Street, City, Province" />
                      {errors.shipping_address && <p className="mt-1 text-xs text-destructive">{errors.shipping_address}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Order Notes (optional)</label>
                      <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} className="mt-1 w-full rounded-xl border border-border/70 bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-violet" placeholder="Any special instructions..." />
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-emerald-50/50 p-4 text-sm">
                      <CreditCard className="h-5 w-5 shrink-0 text-emerald-600" />
                      <span className="text-emerald-800">Pay with cash on delivery — no card needed.</span>
                    </div>

                    <button type="submit" disabled={submitting} className="btn-luxe w-full bg-foreground text-background disabled:opacity-50">
                      {submitting ? "Placing Order..." : `Place Order — ${formatPrice(cartTotal)}`}
                    </button>

                    <Link href="/services" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                      <ArrowLeft className="h-4 w-4" /> Continue Shopping
                    </Link>
                  </form>
                </div>

                <div className="lg:col-span-5">
                  <div className="sticky top-28 rounded-2xl border border-border/70 bg-card p-6">
                    <h2 className="font-display text-lg font-semibold">Order Summary</h2>
                    <p className="mt-1 text-xs text-muted-foreground">{cartCount} item{cartCount !== 1 ? "s" : ""}</p>

                    <div className="mt-6 space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4 border-b border-border/40 pb-4 last:border-0">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{item.service.name}</p>
                            <p className="text-xs text-muted-foreground">{item.variation.name} — {item.color.name}</p>
                            <div className="mt-2 flex items-center gap-3">
                              <div className="flex items-center rounded-lg border border-border/60">
                                <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center text-foreground/60 hover:text-foreground"><Minus className="h-3 w-3" /></button>
                                <span className="flex h-7 w-8 items-center justify-center text-xs font-semibold tabular-nums">{item.quantity}</span>
                                <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center text-foreground/60 hover:text-foreground"><Plus className="h-3 w-3" /></button>
                              </div>
                              <button type="button" onClick={() => removeItem(item.id)} className="text-muted-foreground/60 hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-semibold text-foreground">{formatPrice(item.variation.price * item.quantity)}</p>
                            <p className="text-xs text-muted-foreground">{formatPrice(item.variation.price)} / ea</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 space-y-2 border-t border-border/60 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium text-foreground">{formatPrice(cartTotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-muted-foreground">Calculated at confirmation</span>
                      </div>
                      <div className="flex justify-between border-t border-border/40 pt-2 text-base">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="font-semibold text-foreground">{formatPrice(cartTotal)}</span>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2 rounded-xl bg-secondary/50 p-3 text-xs text-muted-foreground">
                      <Shield className="h-4 w-4 shrink-0" />
                      Your information is secure and will only be used for this order.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </ThemeProvider>
  );
}
