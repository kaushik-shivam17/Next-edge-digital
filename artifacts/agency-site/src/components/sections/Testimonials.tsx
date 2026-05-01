import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Next Edge Digital completely overhauled our digital presence. Within 6 months of launching the new platform and social strategy, our direct-to-consumer revenue increased by 214%. They don't just build websites — they build businesses.",
    author: "Sarah Jenkins",
    role: "CMO",
    company: "Veridian Apparel",
    result: "+214% Revenue",
    accent: "#CAA353",
  },
  {
    quote:
      "Working with the Next Edge team feels like having an elite internal studio. Their strategic thinking and flawless execution positioned our software as the premium choice in a saturated market. The ROI has been extraordinary.",
    author: "David Chen",
    role: "Founder & CEO",
    company: "ScaleTech",
    result: "3x Client Growth",
    accent: "#60A5FA",
  },
  {
    quote:
      "They commanded our rebrand with absolute precision. The attention to detail in everything — from the brand identity to the social content — allowed us to raise our project fees by 40% without losing a single client. World-class.",
    author: "Marcus Thorne",
    role: "Principal",
    company: "Thorne Architecture",
    result: "+40% Pricing Power",
    accent: "#A78BFA",
  },
  {
    quote:
      "Our social media following went from 12K to over 580K followers in eight months. The content strategy they developed gave us a distinct voice that no competitor could replicate. Phenomenal team, phenomenal results.",
    author: "James Harlow",
    role: "Brand Director",
    company: "Apex Motors",
    result: "580K New Followers",
    accent: "#34D399",
  },
];

const AUTOPLAY_DURATION = 5000;

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setActive(idx);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    goTo((active + 1) % testimonials.length, 1);
  }, [active, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + testimonials.length) % testimonials.length, -1);
  }, [active, goTo]);

  useEffect(() => {
    if (paused) return;
    setProgress(0);

    let start: number | null = null;
    let raf: number;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= AUTOPLAY_DURATION) {
        next();
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, paused, next]);

  const t = testimonials[active];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <section className="py-32 relative bg-background border-t border-white/5 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(45,100,255,0.05),transparent)]" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4"
          >
            Client Outcomes
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-6"
          >
            Results That Speak
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/50 text-lg leading-relaxed"
          >
            We measure success by the impact we create. Hear from leaders who trusted us with their brands.
          </motion.p>
        </div>

        {/* Main carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="relative rounded-2xl overflow-hidden p-10 md:p-16"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Accent glow */}
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none transition-all duration-700"
              style={{
                background: `radial-gradient(circle, ${t.accent}18 0%, transparent 70%)`,
                filter: "blur(60px)",
                transform: "translate(30%, -30%)",
              }}
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                {/* Result badge */}
                <div className="inline-flex mb-8">
                  <span
                    className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm border"
                    style={{
                      background: `${t.accent}15`,
                      color: t.accent,
                      borderColor: `${t.accent}30`,
                    }}
                  >
                    {t.result}
                  </span>
                </div>

                <Quote
                  className="w-10 h-10 mb-6 transition-colors duration-500"
                  style={{ color: `${t.accent}30` }}
                />

                <p className="text-foreground/75 leading-relaxed mb-10 text-lg md:text-xl font-light">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border"
                    style={{
                      background: `${t.accent}15`,
                      borderColor: `${t.accent}30`,
                    }}
                  >
                    <span className="text-sm font-black" style={{ color: t.accent }}>
                      {t.author.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{t.author}</div>
                    <div className="text-foreground/40 text-sm mt-0.5">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls row */}
          <div className="mt-8 flex items-center justify-between">
            {/* Dot indicators with progress */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > active ? 1 : -1)}
                  className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
                  style={{
                    width: i === active ? 48 : 16,
                    background: "rgba(255,255,255,0.1)",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                >
                  {i === active && (
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: `${progress}%`,
                        background: t.accent,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Arrow controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                data-testid="button-testimonial-prev"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-foreground/40 hover:text-foreground hover:border-white/30 transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                data-testid="button-testimonial-next"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-foreground/40 hover:text-foreground hover:border-white/30 transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
