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
        <main className="pt-20">
          <Head>
            <title>About the Founder — PASSION</title>
            <meta name="description" content="Muhammad Asif Khan founded PASSION on a single conviction: the way a man dresses begins with the fabric." />
            <meta property="og:title" content="About the Founder — PASSION" />
            <meta property="og:description" content="Redefining men's elegance through precision fabric craftsmanship." />
          </Head>

      <section className="bg-gradient-soft pt-32 pb-12 md:pt-40">
        <div className="container-luxe max-w-3xl">
          <p className="eyebrow">The House</p>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
            A house built on <span className="text-gradient-brand">conviction.</span>
          </h1>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
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
