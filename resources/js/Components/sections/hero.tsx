import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-fabric.jpg";
import { SITE } from "@/lib/site";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Pointer-driven motion values — normalized -1..1
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.4 });
  const spy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.4 });

  // Layered parallax — different depths for the cinematic feel
  const tiltX = useTransform(spy, [-1, 1], [4, -4]);
  const tiltY = useTransform(spx, [-1, 1], [-6, 6]);
  const layer1X = useTransform(spx, [-1, 1], [-18, 18]);
  const layer1Y = useTransform(spy, [-1, 1], [-12, 12]);
  const layer2X = useTransform(spx, [-1, 1], [-36, 36]);
  const layer2Y = useTransform(spy, [-1, 1], [-22, 22]);
  const sheenX = useTransform(spx, [-1, 1], [-60, 60]);
  const sheenY = useTransform(spy, [-1, 1], [-60, 60]);

  // Scroll-driven parallax on the fabric stage
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const scrollFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.7]);

  // Single passive pointer listener, throttled to rAF — zero jank
  useEffect(() => {
    let rafId = 0;
    let nextX = 0;
    let nextY = 0;
    let pending = false;

    const flush = () => {
      px.set(nextX);
      py.set(nextY);
      pending = false;
    };

    const onMove = (e: PointerEvent) => {
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      // Use the stage as the reference frame so motion feels anchored to the visual
      nextX = ((e.clientX - r.left) / r.width) * 2 - 1;
      nextY = ((e.clientY - r.top) / r.height) * 2 - 1;
      // Clamp to keep extremes contained
      nextX = Math.max(-1.2, Math.min(1.2, nextX));
      nextY = Math.max(-1.2, Math.min(1.2, nextY));
      if (!pending) {
        pending = true;
        rafId = requestAnimationFrame(flush);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [px, py]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-soft pt-32 pb-24 md:pt-40 md:pb-32"
    >
      {/* Ambient brand glow — fixed, very soft */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[820px] w-[820px] rounded-full opacity-50 blur-3xl"
           style={{ background: "var(--gradient-glow)" }} />
      <div className="pointer-events-none absolute -bottom-40 left-[-10%] -z-10 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl"
           style={{ background: "radial-gradient(50% 50% at 50% 50%, oklch(0.85 0.15 285 / 0.35), transparent 70%)" }} />

      {/* Editorial hairline grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(ellipse at center, black 35%, transparent 78%)",
        }}
      />

      <div className="container-luxe">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Left: editorial copy with generous whitespace */}
          <div className="lg:col-span-6 xl:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1.5 text-xs backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
              </span>
              <span className="font-medium tracking-wide text-foreground/80">
                New · Spring '26 unstitched edit
              </span>
            </motion.div>

            <h1 className="mt-7 font-display text-[clamp(2.6rem,6.6vw,5.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              <RevealLine delay={0.05}>Crafted Fabric.</RevealLine>
              <RevealLine delay={0.18}>Tailored Identity.</RevealLine>
              <RevealLine delay={0.31}>
                <span className="text-gradient-brand">Defined Excellence.</span>
              </RevealLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Premium men's unstitched fabrics — Cotton, Latha and Wash &amp; Wear —
              engineered for elegance and precision tailoring. Sourced, woven and
              finished for those who insist on quiet, undeniable refinement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a href="/collections" className="btn-luxe bg-foreground text-background">
                Explore Collection
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="btn-luxe border border-border bg-background text-foreground hover:border-foreground/30"
              >
                <MessageCircle className="h-4 w-4 text-violet" />
                Book Fabric Consultation
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.9 }}
              className="mt-14 grid max-w-lg grid-cols-3 divide-x divide-border/60 text-left"
            >
              {[
                { v: "32+", l: "Fabric weaves" },
                { v: "12k", l: "Garments tailored" },
                { v: "98%", l: "Repeat clients" },
              ].map((s) => (
                <div key={s.l} className="px-4 first:pl-0">
                  <p className="font-display text-2xl font-semibold text-foreground">{s.v}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: cinematic fabric stage */}
          <div className="lg:col-span-6 xl:col-span-6">
            <motion.div
              ref={stageRef}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
              style={{
                rotateX: tiltX,
                rotateY: tiltY,
                transformPerspective: 1200,
                y: scrollY,
                opacity: scrollFade,
              }}
              className="relative mx-auto aspect-[4/5] w-full max-w-[520px] [transform-style:preserve-3d] will-change-transform"
            >
              {/* Halo */}
              <div className="absolute -inset-8 -z-10 rounded-[2.25rem] bg-gradient-brand opacity-25 blur-3xl" />

              {/* Stage */}
              <motion.div
                style={{ scale: scrollScale }}
                className="relative h-full w-full overflow-hidden rounded-[1.85rem] shadow-luxe will-change-transform"
              >
                {/* Hero fabric image — scale + parallax */}
                <motion.img
                  src={heroImg}
                  alt="Layered premium unstitched fabrics — cotton, latha and wash &amp; wear"
                  width={1280}
                  height={1600}
                  draggable={false}
                  style={{ x: layer1X, y: layer1Y }}
                  className="absolute inset-[-6%] h-[112%] w-[112%] object-cover will-change-transform select-none"
                />

                {/* Soft fabric drape — secondary depth layer (subtle violet wash) */}
                <motion.div
                  aria-hidden
                  style={{ x: layer2X, y: layer2Y }}
                  className="pointer-events-none absolute inset-[-10%] mix-blend-soft-light opacity-70 will-change-transform"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(60% 50% at 30% 30%, oklch(0.92 0.05 295 / 0.55), transparent 60%), radial-gradient(50% 40% at 75% 80%, oklch(0.55 0.22 270 / 0.35), transparent 65%)",
                    }}
                  />
                </motion.div>

                {/* Studio-grade soft shadow vignette */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(120% 80% at 50% 0%, transparent 40%, oklch(0 0 0 / 0.18) 100%), linear-gradient(180deg, transparent 50%, oklch(0 0 0 / 0.25) 100%)",
                  }}
                />

                {/* Cursor-following sheen — no blend issues, pure additive light */}
                <motion.div
                  aria-hidden
                  style={{ x: sheenX, y: sheenY }}
                  className="pointer-events-none absolute inset-0 will-change-transform"
                >
                  <div
                    className="absolute -inset-24"
                    style={{
                      background:
                        "radial-gradient(420px circle at 50% 50%, oklch(0.92 0.12 285 / 0.32), transparent 60%)",
                    }}
                  />
                </motion.div>

                {/* Slow drifting silk sheen — pure CSS, GPU-only */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-50"
                  style={{
                    background:
                      "linear-gradient(110deg, transparent 30%, oklch(1 0 0 / 0.22) 50%, transparent 70%)",
                    backgroundSize: "250% 100%",
                    animation: "shimmer 7s linear infinite",
                  }}
                />

                {/* Fabric chip */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/15 bg-black/45 p-3 text-white backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[11px] uppercase tracking-widest text-white/60">Signature</p>
                      <p className="text-sm font-medium">Atelier Noir Weave</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider">
                    SS '26
                  </span>
                </div>
              </motion.div>

              {/* Floating spec card — top-left */}
              <motion.div
                initial={{ opacity: 0, x: -16, y: -8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ x: layer2X, y: layer2Y }}
                className="absolute -left-6 top-10 hidden rounded-2xl border border-border/70 bg-background/90 p-4 shadow-card backdrop-blur md:block"
              >
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Hand-finished
                </p>
                <p className="mt-1 font-display text-base font-semibold" style={{ color: "oklch(0.13 0.015 280)" }}>120s combed yarn</p>
              </motion.div>

              {/* Floating swatch chips — bottom-right */}
              <motion.div
                initial={{ opacity: 0, x: 16, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.05, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ x: layer1X, y: layer1Y }}
                className="absolute -right-6 bottom-16 hidden rounded-2xl border border-border/70 bg-background/90 p-3 shadow-card backdrop-blur md:flex md:items-center md:gap-3"
              >
                <div className="flex -space-x-2">
                  <span className="h-7 w-7 rounded-full border-2 border-background bg-[oklch(0.97_0.005_280)]" />
                  <span className="h-7 w-7 rounded-full border-2 border-background bg-[oklch(0.28_0.02_280)]" />
                  <span className="h-7 w-7 rounded-full border-2 border-background bg-[oklch(0.32_0.18_270)]" />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">3 weaves</p>
                  <p className="text-sm font-medium">Cotton · Latha · W&amp;W</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="block will-change-transform"
      >
        {children}
      </motion.span>
    </span>
  );
}
