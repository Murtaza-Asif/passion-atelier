import { Head, Link } from "@inertiajs/react";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";
import { ArrowLeft } from "lucide-react";

export default function UnderDevelopment({ status }: { status?: number }) {
  const title = status === 404 ? "Page Not Found" : status === 403 ? "Access Denied" : "Under Development";
  const message = status === 404
    ? "This page doesn't exist. It may have been moved or the link you followed may be broken."
    : status === 403
      ? "You don't have permission to access this page."
      : "This page is being crafted with the same precision as our fabrics. Check back soon.";

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex min-h-[70vh] items-center justify-center px-4 pt-20">
          <Head>
            <title>{`${title} — PASSION`}</title>
          </Head>
          <div className="max-w-md text-center">
            <div className="text-8xl font-bold text-gradient-brand leading-none">{status || "*"}</div>
            <h1 className="mt-4 font-display text-3xl font-semibold">{title}</h1>
            <p className="mt-3 text-muted-foreground">{message}</p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 text-sm text-violet underline underline-offset-4 hover:text-violet/80"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to home
            </Link>
          </div>
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </ThemeProvider>
  );
}
