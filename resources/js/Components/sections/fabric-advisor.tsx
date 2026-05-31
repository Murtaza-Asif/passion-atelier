import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { SITE } from "@/Lib/site";

type Step = {
  key: keyof Answers;
  label: string;
  options: { v: string; emoji?: string }[];
};
type Answers = {
  budget: string;
  occasion: string;
  climate: string;
  softness: string;
  color: string;
};

const STEPS: Step[] = [
  { key: "budget", label: "What's your investment range?", options: [
    { v: "Essential", emoji: "✦" },
    { v: "Signature", emoji: "✦✦" },
    { v: "Atelier", emoji: "✦✦✦" },
  ]},
  { key: "occasion", label: "Where will it be worn?", options: [
    { v: "Daily" }, { v: "Formal" }, { v: "Wedding" }, { v: "Casual" },
  ]},
  { key: "climate", label: "Your climate preference", options: [
    { v: "Hot" }, { v: "Temperate" }, { v: "Cool" },
  ]},
  { key: "softness", label: "Preferred handle", options: [
    { v: "Crisp" }, { v: "Balanced" }, { v: "Soft" },
  ]},
  { key: "color", label: "Color direction", options: [
    { v: "Neutral" }, { v: "Earth" }, { v: "Jewel" }, { v: "Monochrome" },
  ]},
];

function recommend(a: Answers) {
  if (a.occasion === "Formal" || a.occasion === "Wedding") {
    return {
      title: "Formal Latha Series",
      slug: "formal-latha",
      reason: "Lustrous handle and graceful drape for ceremonial moments.",
    };
  }
  if (a.softness === "Crisp" || a.budget === "Atelier") {
    return {
      title: "Luxury Wash & Wear",
      slug: "wash-wear",
      reason: "Travel-ready polish that holds its silhouette beautifully.",
    };
  }
  if (a.softness === "Soft" || a.climate === "Hot") {
    return {
      title: "Premium Cotton Collection",
      slug: "premium-cotton",
      reason: "Breathable, soft cotton woven for comfort with structure.",
    };
  }
  return {
    title: "Custom Fabric Selection",
    slug: "custom-selection",
    reason: "Bespoke advisory tailored to your exact specifications.",
  };
}

export function FabricAdvisor() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const done = step >= STEPS.length;
  const current = STEPS[step];
  const result = done ? recommend(answers as Answers) : null;

  const select = (v: string) => {
    setAnswers((a) => ({ ...a, [current.key]: v }));
    setTimeout(() => setStep((s) => s + 1), 250);
  };

  const reset = () => { setAnswers({}); setStep(0); };

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-luxe">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">Smart Advisor</p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
              Your personal <span className="text-gradient-brand">fabric stylist.</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Five quick questions. One curated recommendation, drawn from our
              archive of premium weaves and finishes — refined further by a
              human advisor over WhatsApp.
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Tailored to occasion, climate and handle preference",
                "Direct line to a master advisor",
                "Reserved access to limited heritage stock",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-foreground/80">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-brand opacity-15 blur-3xl" />
              <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card">
                <div className="flex items-center justify-between border-b border-border/60 bg-gradient-soft p-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-white">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">PASSION · Advisor</p>
                      <p className="font-display text-sm font-semibold">Find your fabric in 30 seconds</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    {STEPS.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-6 rounded-full transition-colors ${
                          i < step ? "bg-violet" : i === step ? "bg-foreground" : "bg-border"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="min-h-[320px] p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    {!done ? (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35 }}
                      >
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                          Step {step + 1} of {STEPS.length}
                        </p>
                        <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">
                          {current.label}
                        </h3>
                        <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                          {current.options.map((opt) => (
                            <button
                              key={opt.v}
                              onClick={() => select(opt.v)}
                              className="group flex items-center justify-between rounded-xl border border-border/70 bg-background p-4 text-left transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-card"
                            >
                              <span className="flex items-center gap-3">
                                {opt.emoji && <span className="text-violet">{opt.emoji}</span>}
                                <span className="text-sm font-medium">{opt.v}</span>
                              </span>
                              <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <p className="eyebrow">Your recommendation</p>
                        <h3 className="mt-2 font-display text-3xl font-semibold leading-tight">
                          {result?.title}
                        </h3>
                        <p className="mt-3 text-sm text-muted-foreground">
                          {result?.reason}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {Object.entries(answers).map(([k, v]) => (
                            <span key={k} className="rounded-full bg-secondary px-3 py-1 text-xs text-foreground/70">
                              {k}: <span className="font-medium text-foreground">{v}</span>
                            </span>
                          ))}
                        </div>
                        <div className="mt-7 flex flex-wrap gap-3">
                          <a
                            href={`${SITE.whatsappLink}?text=${encodeURIComponent(`Hi PASSION, I just got a recommendation for ${result?.title}. I'd love a consultation.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-luxe bg-foreground text-background"
                          >
                            <MessageCircle className="h-4 w-4" />
                            Continue on WhatsApp
                          </a>
                          <button
                            onClick={reset}
                            className="btn-luxe border border-border bg-background text-foreground"
                          >
                            Restart
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
