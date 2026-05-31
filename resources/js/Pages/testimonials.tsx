import { Head } from "@inertiajs/react";
import { Testimonials as TestimonialsSection } from "@/Components/sections/testimonials";
import { FinalCta } from "@/Components/sections/final-cta";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";

export default function Testimonials() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-20">
          <Head>
            <title>Testimonials — PASSION</title>
            <meta name="description" content="Reflections from clients, master tailors, and creative directors who've made PASSION part of their routine." />
            <meta property="og:title" content="Testimonials — PASSION" />
            <meta property="og:description" content="The verdict from discerning men." />
          </Head>
      <section className="bg-gradient-soft pt-32 pb-12 md:pt-40">
        <div className="container-luxe max-w-3xl">
          <p className="eyebrow">In their words</p>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
            The verdict from <span className="text-gradient-brand">discerning men.</span>
          </h1>
        </div>
      </section>
          <TestimonialsSection />
          <FinalCta />
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </ThemeProvider>
  );
}
