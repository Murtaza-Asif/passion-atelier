import { Head } from "@inertiajs/react";
import { ProductGrid } from "@/Components/sections/product-grid";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";

import type { FrontendProduct } from "@/Lib/site";

interface ServicePageProps {
  services: FrontendProduct[];
}

export default function Services({ services }: ServicePageProps) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-20">
          <Head>
            <title>Shop Collections — PASSION</title>
            <meta name="description" content="Browse our complete collection of premium men's unstitched fabrics — Premium Cotton, Luxury Wash & Wear, Formal Latha, and Custom Selection." />
            <meta property="og:title" content="Shop Collections — PASSION" />
            <meta property="og:description" content="Four signature unstitched fabric collections, each engineered for a different way of wearing." />
          </Head>

          <section className="bg-gradient-soft pt-32 pb-12 md:pt-40">
            <div className="container-luxe">
              <p className="eyebrow">The Shop</p>
              <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.6rem)] font-semibold leading-[1.02] tracking-tight">
                Four signatures, <span className="text-gradient-brand">one philosophy.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
                Each collection is a study in restraint — refined materials,
                considered finishing, and detail you only notice when it's missing.
              </p>
            </div>
          </section>

          <section className="py-12 md:py-20">
            <div className="container-luxe">
              <ProductGrid services={services} />
            </div>
          </section>
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </ThemeProvider>
  );
}
