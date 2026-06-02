import { Hero } from "@/Components/sections/hero";
import { ServicesSection } from "@/Components/sections/services-section";
import { LogoMarquee } from "@/Components/sections/logo-marquee";
import { FabricAdvisor } from "@/Components/sections/fabric-advisor";
import { Testimonials } from "@/Components/sections/testimonials";
import { FounderSection } from "@/Components/sections/founder";
import { LocationsSection } from "@/Components/sections/locations";
import { FinalCta } from "@/Components/sections/final-cta";
import { Head } from "@inertiajs/react";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";

import type { FrontendProduct } from "@/Lib/site";

interface FrontendCollection {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string | null;
  banner_url: string | null;
  banner_images: string[];
}

interface HomePageProps {
  services: FrontendProduct[];
  collections: FrontendCollection[];
}

export default function Home({ services, collections }: HomePageProps) {
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-background text-foreground">
                <Navbar />
                <main className="pt-20">
                    <Head>
                        <title>PASSION — Crafted Fabric. Tailored Identity. Defined Excellence.</title>
                        <meta name="description" content="Premium men's unstitched fabrics — Cotton, Wash & Wear, Formal Latha — engineered for elegance and precision tailoring. Book a fabric consultation." />
                        <meta property="og:title" content="PASSION — Premium Men's Unstitched Fabrics" />
                        <meta property="og:description" content="Crafted fabric. Tailored identity. Defined excellence." />
                    </Head>

                    <Hero />
                    <LogoMarquee />
                    <ServicesSection services={services} collections={collections} />
                    <FabricAdvisor />
                    <FounderSection />
                    <Testimonials />
                    <LocationsSection />
                    <FinalCta />
                </main>
                <Footer />
                <StickyWhatsApp />
            </div>
        </ThemeProvider>
    );
}
