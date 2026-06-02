import { Head, Link } from "@inertiajs/react";
import { Package, ChevronRight, ShoppingBag, Clock } from "lucide-react";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";

function formatPrice(p: number) {
  return `PKR ${p.toLocaleString()}`;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-indigo-100 text-indigo-700",
  shipped: "bg-sky-100 text-sky-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

interface OrderItemSummary {
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
  total: number;
  status: string;
  created_at: string;
  items: OrderItemSummary[];
}

interface Props {
  orders: {
    data: Order[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
  };
}

export default function MyOrders({ orders }: Props) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-20">
          <Head title="My Orders — PASSION" />

          <section className="border-b border-border/60 bg-secondary/30">
            <div className="container-luxe flex items-center gap-2 py-3 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <span className="text-foreground">My Orders</span>
            </div>
          </section>

          <section className="py-10 md:py-16">
            <div className="container-luxe max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/10">
                  <Package className="h-6 w-6 text-violet" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-semibold md:text-3xl">My Orders</h1>
                  <p className="text-sm text-muted-foreground">Your order history</p>
                </div>
              </div>

              {orders.data.length === 0 ? (
                <div className="mt-12 text-center">
                  <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/40" />
                  <h2 className="mt-4 font-display text-xl font-semibold">No orders yet</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Your orders will appear here once you place one.</p>
                  <Link href="/services" className="btn-luxe mt-6 inline-flex bg-foreground text-background">Start Shopping</Link>
                </div>
              ) : (
                <div className="mt-8 space-y-4">
                  {orders.data.map((order) => (
                    <Link
                      key={order.id}
                      href={route("my-orders")}
                      className="group block rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all hover:border-foreground/20 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display text-base font-semibold">{order.order_number}</span>
                            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS_STYLES[order.status] || "bg-secondary text-muted-foreground"}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(order.created_at).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}</span>
                            <span>{order.items.length} item{order.items.length !== 1 ? "s" : ""}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{formatPrice(Number(order.total))}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {order.items.map((item) => (
                          <span key={item.id} className="rounded-lg bg-secondary/70 px-2.5 py-1 text-[11px] text-muted-foreground">
                            {item.product_name}{item.variant_name ? ` — ${item.variant_name}` : ""} × {item.quantity}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {orders.last_page > 1 && (
                <div className="mt-8 flex items-center justify-center gap-3">
                  {orders.prev_page_url && (
                    <Link href={orders.prev_page_url} className="btn-luxe border border-border/60 text-foreground">Previous</Link>
                  )}
                  <span className="text-sm text-muted-foreground">
                    Page {orders.current_page} of {orders.last_page}
                  </span>
                  {orders.next_page_url && (
                    <Link href={orders.next_page_url} className="btn-luxe border border-border/60 text-foreground">Next</Link>
                  )}
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </ThemeProvider>
  );
}
