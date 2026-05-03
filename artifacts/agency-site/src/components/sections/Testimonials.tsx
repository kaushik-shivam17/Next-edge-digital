import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Next Edge Digital rebuilt our entire Shopify store and took over our Instagram and Meta ads. In 5 months, our monthly orders went from 800 to nearly 2,600. I was skeptical at first — now I tell every founder I know to call them before anyone else.",
    author: "Rahul Sharma",
    role: "Co-Founder",
    company: "Kova Skincare",
    location: "Mumbai, India",
    flag: "🇮🇳",
    result: "+214% Orders",
    accent: "#CAA353",
  },
  {
    quote:
      "We were burning money on ads that weren't converting. Next Edge audited everything, rebuilt our landing pages, and restructured our funnel. Our cost per acquisition dropped by 60% in the first 8 weeks. The team is sharp, fast, and genuinely cares.",
    author: "Priya Mehta",
    role: "Head of Growth",
    company: "NestFin",
    location: "Bengaluru, India",
    flag: "🇮🇳",
    result: "-60% Cost Per Lead",
    accent: "#F472B6",
  },
  {
    quote:
      "Working with Next Edge feels like having an elite in-house team. They rebranded ScaleTech end-to-end — website, pitch deck, LinkedIn presence. Within a quarter we closed two enterprise contracts we'd been chasing for over a year. Exceptional work.",
    author: "David Chen",
    role: "Founder & CEO",
    company: "ScaleTech",
    location: "Singapore",
    flag: "🇸🇬",
    result: "3x Enterprise Deals",
    accent: "#60A5FA",
  },
  {
    quote:
      "Our Instagram went from 14K to 580K followers in 8 months. But more importantly, the content actually drives showroom walk-ins now. Next Edge understood our brand voice immediately and executed without hand-holding. Rare and valuable.",
    author: "James Harlow",
    role: "Brand Director",
    company: "Apex Motors",
    location: "Dubai, UAE",
    flag: "🇦🇪",
    result: "580K Followers",
    accent: "#34D399",
  },
  {
    quote:
      "They redesigned our property listings portal and built a targeted content strategy around luxury buyers. Our average enquiry quality shot up dramatically and we closed a ₹4.2 Cr deal from an Instagram DM within two months of launch.",
    author: "Arjun Kapoor",
    role: "Director",
    company: "Prestige Landbase",
    location: "Delhi, India",
    flag: "🇮🇳",
    result: "₹4.2Cr Deal Closed",
    accent: "#A78BFA",
  },
  {
    quote:
      "We rebranded our architecture firm with Next Edge and raised our project fees by 40% the same year. Clients started coming to us — not the other way around. The website and brand positioning they built is simply in a different league.",
    author: "Marcus Thorne",
    role: "Principal Architect",
    company: "Thorne Studio",
    location: "London, UK",
    flag: "🇬🇧",
    result: "+40% Project Fees",
    accent: "#F59E0B",
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
    <section className="py-16 md:py-32 relative bg-background border-t border-white/5 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(45,100,255,0.05),transparent)]" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-20">
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
                {/* Top row: stars + result badge */}
                <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <svg key={si} className="w-4 h-4" fill="#CAA353" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
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
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-foreground">{t.author}</div>
                    <div className="text-foreground/40 text-sm mt-0.5">
                      {t.role}, {t.company}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0 px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <span className="text-base leading-none">{t.flag}</span>
                    <span className="text-[10px] font-medium tracking-wide text-foreground/35 hidden sm:block">{t.location}</span>
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
