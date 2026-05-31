import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/Lib/site";

export function StickyWhatsApp() {
  const [show, setShow] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1200);
    const p = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 6000);
    return () => { clearTimeout(t); clearInterval(p); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={SITE.whatsappLink}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="group fixed bottom-6 left-6 z-40 inline-flex items-center gap-3 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background shadow-luxe transition-transform hover:scale-105"
          aria-label="WhatsApp consultation"
        >
          <span className="relative">
            <MessageCircle className="h-5 w-5" />
            {pulse && (
              <motion.span
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 rounded-full bg-electric"
              />
            )}
          </span>
          <span className="hidden pr-1 sm:inline">Chat on WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
