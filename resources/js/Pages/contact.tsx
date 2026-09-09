import { Head } from "@inertiajs/react";
import { LocationsSection } from "@/Components/sections/locations";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/Lib/site";
import { Navbar } from "@/Layouts/navbar";
import { Footer } from "@/Layouts/footer";
import { ThemeProvider } from "@/Layouts/theme-provider";
import { StickyWhatsApp } from "@/Layouts/sticky-whatsapp";

export default function Contact() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-16">
          <Head>
            <title>PASSION — Contact</title>
            <meta name="description" content="Speak to a fabric advisor — by WhatsApp, email, or in-person at our Karachi outlet." />
            <meta property="og:title" content="PASSION — Contact" />
            <meta property="og:description" content="Two outlets, one standard. Reach a master fabric advisor." />
          </Head>
      <section className="bg-gradient-soft pt-32 pb-12 md:pt-16">
        <div className="container-luxe max-w-3xl">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
            Speak to an <span className="text-gradient-brand">advisor.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            The fastest reply is on WhatsApp. For longer briefs, email us directly or visit us by appointment.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <ContactCard icon={MessageCircle} label="WhatsApp" value="+92 321 2047973" href={SITE.whatsappLink} />
            <ContactCard icon={Mail} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
            <ContactCard icon={Phone} label="Studio" value="+92 321 2047973" href="tel:+923212047973" />
          </div>
        </div>
      </section>
          <LocationsSection />
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </ThemeProvider>
  );
}

function ContactCard({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-foreground/40"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white">
        <Icon className="h-4 w-4" />
      </span>
      <p className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-base font-semibold">{value}</p>
    </a>
  );
}
