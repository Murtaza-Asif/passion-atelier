import { Head } from "@inertiajs/react";
import { ProductGrid } from "@/Components/sections/product-grid";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";

import type { FrontendProduct } from "@/Lib/site";

interface CollectionsPageProps {
  services: FrontendProduct[];
}

export default function Collections({ services }: CollectionsPageProps) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-20">
          <Head>
            <title>All Collections — PASSION</title>
            <meta name="description" content="Browse PASSION's complete collection of premium men's unstitched fabrics — Cotton, Wash & Wear, Latha, and bespoke selections." />
            <meta property="og:title" content="Collections — PASSION" />
            <meta property="og:description" content="Premium men's unstitched fabric collections." />
          </Head>
          <section className="bg-gradient-soft pt-32 pb-8 md:pt-40">
            <div className="container-luxe max-w-3xl">
              <p className="eyebrow">The Collections</p>
              <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
                Every length, <span className="text-gradient-brand">considered.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
                Four signature collections, each refined to a single purpose. Tap any tile to discover its story.
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
