import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onStart = () => setLoading(true);
    const onFinish = () => {
      setTimeout(() => setLoading(false), 400);
    };

    router.on("start", onStart);
    router.on("finish", onFinish);

    return () => {
      router.off("start", onStart);
      router.off("finish", onFinish);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center gap-5">
            {/* Outer ring pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="block h-20 w-20 rounded-full border-2 border-violet/20 animate-ping" />
            </div>

            {/* Spinning ring */}
            <div className="relative h-16 w-16">
              <svg
                className="h-full w-full animate-spin"
                viewBox="0 0 50 50"
                style={{ animationDuration: "1.2s" }}
              >
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="text-violet/20"
                />
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="url(#loaderGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="80 44"
                />
                <defs>
                  <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-violet)" />
                    <stop offset="100%" stopColor="var(--color-electric)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand shadow-lg">
                  <span className="font-display text-sm font-bold text-white">P</span>
                </div>
              </div>
            </div>

            {/* Brand text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-display text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground"
            >
              PASSION
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
