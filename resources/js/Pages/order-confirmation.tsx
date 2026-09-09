import { Head, Link } from "@inertiajs/react";
import { CheckCircle, Package, Phone, MapPin, ChevronRight } from "lucide-react";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";

function formatPrice(p: number) {
  return `PKR ${p.toLocaleString()}`;
}

interface OrderItem {
  id: number;
  product_name: string;
  variant_name: string | null;
  color_name: string | null;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  shipping_address: string;
  subtotal: number;
  shipping_cost: number;
  discount: number;
  total: number;
  status: string;
  payment_method: string;
  created_at: string;
  items: OrderItem[];
}

interface Props {
  order: Order;
}

export default function OrderConfirmation({ order }: Props) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-16">
          <Head title="PASSION — Order Confirmed" />

          <section className="py-16 md:py-24">
            <div className="container-luxe max-w-2xl text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle className="h-10 w-10 text-emerald-600" />
              </div>
              <h1 className="mt-6 font-display text-3xl font-semibold md:text-4xl">Order Confirmed!</h1>
              <p className="mt-3 text-muted-foreground">Thank you for your order. We'll confirm it shortly.</p>

              <div className="mt-8 rounded-2xl border border-border/70 bg-card p-6 text-left">
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg font-semibold">{order.order_number}</p>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">{order.status}</span>
                </div>

                <div className="mt-6 space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between border-b border-border/40 pb-3 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.product_name}</p>
                        <p className="text-xs text-muted-foreground">{item.variant_name}{item.color_name ? ` — ${item.color_name}` : ""} × {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{formatPrice(item.subtotal)}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-1.5 border-t border-border/60 pt-4">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
                  <div className="flex justify-between border-t border-border/40 pt-1.5 text-base"><span className="font-semibold">Total</span><span className="font-semibold">{formatPrice(order.total)}</span></div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-border/70 bg-card p-6 text-left">
                <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider">Delivery Details</h3>
                <div className="mt-3 space-y-3">
                  <div className="flex items-start gap-3">
                    <Package className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
                    <div><p className="text-sm font-medium">{order.customer_name}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
                    <div><p className="text-sm font-medium">{order.customer_phone}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
                    <div><p className="text-sm">{order.shipping_address}</p></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link href="/services" className="btn-luxe bg-foreground text-background">
                  Continue Shopping <ChevronRight className="h-4 w-4" />
                </Link>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Back to Home</Link>
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
