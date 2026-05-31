import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, ShoppingBag } from "lucide-react";
import { SITE } from "@/Lib/site";
import { useTheme } from "./theme-provider";
import { useCart } from "@/Lib/cart-context";
import { cn } from "@/Lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const { theme, toggle } = useTheme();
  const { cartCount, toggleCart } = useCart();

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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="container-luxe">
        <div
          className={cn(
            "flex items-center justify-between rounded-full transition-all duration-500",
            scrolled
              ? "glass shadow-card px-3 py-2"
              : "px-2 py-2",
          )}
        >
          <Link href="/" className="flex items-center gap-2 px-3 py-1">
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-[10px] font-bold tracking-wider text-white">
              P
              <span className="absolute -inset-1 -z-10 rounded-full bg-gradient-brand opacity-40 blur-md" />
            </span>
            <span className="font-display text-base font-semibold tracking-tight">
              {SITE.brand}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {SITE.nav.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground",
                  currentUrl === item.to && "text-foreground bg-secondary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleCart}
              aria-label="Open cart"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-border/60 text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground sm:inline-flex"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-bold text-background">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-border/60 text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground sm:inline-flex"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="btn-luxe hidden bg-foreground text-background hover:opacity-90 sm:inline-flex"
            >
              Book Consultation
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-500",
            open ? "mt-3 max-h-[600px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="glass rounded-2xl p-3 shadow-card">
            <nav className="flex flex-col">
              {SITE.nav.map((item) => (
                <Link
                  key={item.to}
                  href={item.to}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary",
                    currentUrl === item.to && "text-foreground bg-secondary"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-2 flex items-center gap-2 border-t border-border/60 p-2 pt-3">
              <button
                onClick={toggleCart}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60"
                aria-label="Open cart"
              >
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-bold text-background">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={toggle}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="btn-luxe flex-1 bg-foreground text-background"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
