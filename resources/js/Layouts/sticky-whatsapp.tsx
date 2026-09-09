import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { SITE } from "@/Lib/site";

export function StickyWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const userClosedRef = useRef(false);

  const markClosed = () => {
    userClosedRef.current = true;
    try { localStorage.setItem("wa_closed", "1"); } catch {}
  };

  useEffect(() => {
    try { if (localStorage.getItem("wa_closed") === "1") userClosedRef.current = true; } catch {}
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible || expanded || userClosedRef.current) return;
    const t = setTimeout(() => setExpanded(true), 3000);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8">
      {/* Chat bubble — opens UPWARD */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="absolute bottom-20 right-0 w-[290px] sm:w-[310px] origin-bottom-right"
          >
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-luxe">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3" style={{ background: "linear-gradient(135deg, #075E54, #25D366)" }}>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">PASSION Atelier</p>
                    <p className="text-[11px] text-white/80">Online now</p>
                  </div>
                </div>
                <button
                  onClick={() => { markClosed(); setExpanded(false); }}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Message bubble */}
              <div className="px-4 py-4" style={{ background: "linear-gradient(180deg, #ECE5DD 0%, #D9E8D6 100%)" }}>
                <div className="flex gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg, #075E54, #25D366)" }}>
                    P
                  </span>
                  <div className="max-w-[210px]">
                    <div className="rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 shadow-sm">
                      <p className="text-[13px] leading-relaxed" style={{ color: "#303030" }}>
                        Assalam o Alaikum! 👋
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "#303030" }}>
                        Need help finding the perfect fabric? I&apos;m here to assist you.
                      </p>
                    </div>
                    <p className="mt-1 text-[10px]" style={{ color: "#8696A0" }}>Just now ✓✓</p>
                  </div>
                </div>
              </div>

              {/* CTA button */}
              <div className="border-t border-border/40 bg-background px-4 py-3">
                <a
                  href={`${SITE.whatsappLink}?text=${encodeURIComponent("Hi PASSION, I'd like to know more about your fabrics.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-full px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:brightness-110"
                  style={{ background: "#25D366" }}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            onClick={() => { if (expanded) markClosed(); setExpanded((p) => !p); }}
            className="relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #075E54, #25D366)" }}
            aria-label={expanded ? "Close chat" : "Open WhatsApp chat"}
          >
            <AnimatePresence mode="wait">
              {expanded ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-6 w-6" />
                </motion.span>
              ) : (
                <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <MessageCircle className="h-6 w-6" />
                </motion.span>
              )}
            </AnimatePresence>

            {!expanded && (
              <span className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-0" style={{ animation: "whatsapp-ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
