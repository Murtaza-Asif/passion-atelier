import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { ThemeProvider } from "./theme-provider";
import { StickyWhatsApp } from "./sticky-whatsapp";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    </ThemeProvider>
  );
}
