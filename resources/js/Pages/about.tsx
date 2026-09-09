import { Head } from "@inertiajs/react";
import { FounderSection } from "@/Components/sections/founder";
import { FinalCta } from "@/Components/sections/final-cta";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";

export default function About() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-16">
          <Head>
            <title>PASSION — About the Founder</title>
            <meta name="description" content="Muhammad Asif Khan founded PASSION on a single conviction: the way a man dresses begins with the fabric." />
            <meta property="og:title" content="PASSION — About the Founder" />
            <meta property="og:description" content="Redefining men's elegance through precision fabric craftsmanship." />
          </Head>

      <section className="bg-gradient-soft pt-28 pb-8 sm:pt-32 md:pt-16 md:pb-12">
        <div className="container-luxe max-w-3xl px-4 sm:px-6">
          <p className="eyebrow">The House</p>
          <h1 className="mt-4 font-display text-[clamp(1.7rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
            A house built on <span className="text-gradient-brand">conviction.</span>
          </h1>
          <p className="mt-4 text-sm text-muted-foreground sm:mt-6 sm:text-base md:text-lg">
            PASSION exists because men deserve a fabric house that takes their
            wardrobe as seriously as they do.
          </p>
        </div>
      </section>
          <FounderSection />
          <FinalCta />
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </ThemeProvider>
  );
}
