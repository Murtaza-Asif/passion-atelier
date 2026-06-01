import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState, useRef } from "react";
import { Menu, X, Moon, Sun, ShoppingBag, User, LogOut, Package, ChevronDown } from "lucide-react";
import { SITE } from "@/Lib/site";
import { useTheme } from "./theme-provider";
import { useCart } from "@/Lib/cart-context";
import { cn } from "@/Lib/utils";

export function Navbar() {
  const { auth } = usePage().props as { auth: { user: any } };
  const user = auth?.user;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const { theme, toggle } = useTheme();
  const { cartCount, toggleCart } = useCart();
  const userMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!userMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userMenuOpen]);

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

            {user ? (
              <div className="relative hidden sm:block" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-full border border-border/60 px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary"
                >
                  <User className="h-4 w-4" />
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", userMenuOpen && "rotate-180")} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-border/60 bg-card py-1 shadow-xl">
                    <div className="border-b border-border/40 px-4 py-2.5">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Link href={route("my-orders")} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-secondary" onClick={() => setUserMenuOpen(false)}>
                      <Package className="h-4 w-4" /> My Orders
                    </Link>
                    <Link href={route("profile.edit")} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-secondary" onClick={() => setUserMenuOpen(false)}>
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    <div className="border-t border-border/40">
                      <Link href={route("logout")} method="post" as="button" className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-destructive/80 transition-colors hover:bg-secondary">
                        <LogOut className="h-4 w-4" /> Sign Out
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href={route("login")} className="btn-luxe hidden bg-foreground text-background hover:opacity-90 sm:inline-flex">
                Sign In
              </Link>
            )}

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
              {user ? (
                <div className="flex flex-1 items-center justify-between gap-1 rounded-xl bg-secondary/50 px-2">
                  <Link href={route("my-orders")} className="flex-1 rounded-lg px-2 py-2 text-center text-xs font-medium text-foreground/80 hover:bg-background/50">Orders</Link>
                  <span className="h-5 w-px bg-border/60" />
                  <Link href={route("profile.edit")} className="flex-1 rounded-lg px-2 py-2 text-center text-xs font-medium text-foreground/80 hover:bg-background/50">Profile</Link>
                  <span className="h-5 w-px bg-border/60" />
                  <Link href={route("logout")} method="post" as="button" className="flex-1 rounded-lg px-2 py-2 text-center text-xs font-medium text-destructive/80 hover:bg-background/50">Sign Out</Link>
                </div>
              ) : (
                <Link href={route("login")} className="btn-luxe flex-1 bg-foreground text-background">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
