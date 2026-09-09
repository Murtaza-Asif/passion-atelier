import { Head } from "@inertiajs/react";
import { FabricAdvisor } from "@/Components/sections/fabric-advisor";
import { FinalCta } from "@/Components/sections/final-cta";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";

export default function Advisor() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-16">
          <Head>
            <title>PASSION — Fabric Advisor</title>
            <meta name="description" content="An intelligent advisor that recommends your perfect unstitched fabric in five questions." />
            <meta property="og:title" content="PASSION — Fabric Advisor" />
            <meta property="og:description" content="Get a tailored fabric recommendation in 30 seconds, then refine it with a master advisor." />
          </Head>
      <section className="bg-gradient-soft pt-32 pb-12 md:pt-16">
        <div className="container-luxe max-w-3xl text-center">
          <p className="eyebrow">Smart Advisor</p>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
            Five questions.<br />
            <span className="text-gradient-brand">Your fabric, found.</span>
          </h1>
        </div>
      </section>
          <FabricAdvisor />
          <FinalCta />
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </ThemeProvider>
  );
}
