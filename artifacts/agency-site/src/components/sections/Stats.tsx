import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    value: 150,
    suffix: "+",
    label: "Projects Delivered",
    description: "Across 12 industries worldwide",
    accent: "#CAA353",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Retention Rate",
    description: "Clients who stay, grow, and scale",
    accent: "#60A5FA",
  },
  {
    value: 7,
    suffix: " Yrs",
    label: "Industry Experience",
    description: "Refined craft and proven process",
    accent: "#A78BFA",
  },
  {
    value: 12,
    suffix: "M+",
    prefix: "$",
    label: "Revenue Generated",
    description: "Measurable business impact",
    accent: "#34D399",
  },
];

const DIGITS = "0123456789";

function GlitchNumber({
  value,
  suffix,
  prefix,
  accent,
  delay = 0,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  accent: string;
  delay?: number;
}) {
  const [displayed, setDisplayed] = useState("0");
  const [phase, setPhase] = useState<"idle" | "scramble" | "resolve" | "done">("idle");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const target = String(value);

  useEffect(() => {
    if (!inView) return;

    const startDelay = setTimeout(() => {
      setPhase("scramble");

      let frame = 0;
      const totalScrambleFrames = 28;
      const resolveAfter = 20;

      const interval = setInterval(() => {
        frame++;

        if (frame < resolveAfter) {
          // Pure random digits
          setDisplayed(
            target
              .split("")
              .map(() => DIGITS[Math.floor(Math.random() * DIGITS.length)])
              .join("")
          );
        } else {
          // Resolve left to right
          const resolved = Math.floor(((frame - resolveAfter) / (totalScrambleFrames - resolveAfter)) * target.length);
          setPhase("resolve");
          setDisplayed(
            target
              .split("")
              .map((char, idx) =>
                idx < resolved
                  ? char
                  : DIGITS[Math.floor(Math.random() * DIGITS.length)]
              )
              .join("")
          );
        }

        if (frame >= totalScrambleFrames) {
          clearInterval(interval);
          setDisplayed(target);
          setPhase("done");
        }
      }, 45);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startDelay);
  }, [inView, target, delay]);

  return (
    <div ref={ref} className="relative">
      <span
        className="tabular-nums font-black tracking-tighter select-none"
        style={{
          color: phase === "done" ? "white" : phase === "idle" ? "rgba(255,255,255,0.1)" : accent,
          transition: "color 0.5s ease",
          textShadow: phase !== "idle" && phase !== "done"
            ? `0 0 20px ${accent}80, 0 0 40px ${accent}40`
            : phase === "done"
            ? `0 0 30px ${accent}30`
            : "none",
        }}
      >
        {prefix || ""}
        {displayed}
        {suffix}
      </span>

      {/* Scan line flash during scramble */}
      {(phase === "scramble" || phase === "resolve") && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.08, repeat: Infinity }}
          style={{
            background: `linear-gradient(to bottom, transparent 40%, ${accent}20 50%, transparent 60%)`,
          }}
        />
      )}
    </div>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center text-center group"
      data-testid={`stat-${index}`}
    >
      {/* Vertical divider (between cards on desktop) */}
      {index > 0 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.12 + 0.3 }}
          className="hidden md:block absolute -left-px top-1/2 -translate-y-1/2 w-px h-16 origin-center"
          style={{ background: `linear-gradient(to bottom, transparent, ${stat.accent}40, transparent)` }}
        />
      )}

      {/* Accent dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.1, type: "spring", stiffness: 300 }}
        className="w-1.5 h-1.5 rounded-full mb-5"
        style={{ backgroundColor: stat.accent, boxShadow: `0 0 8px ${stat.accent}80` }}
      />

      {/* The big number */}
      <div className="text-[clamp(2.8rem,6vw,4.5rem)] leading-none mb-4">
        <GlitchNumber
          value={stat.value}
          suffix={stat.suffix}
          prefix={stat.prefix}
          accent={stat.accent}
          delay={index * 0.18 + 0.3}
        />
      </div>

      {/* Label */}
      <div
        className="text-[10px] font-bold tracking-[0.25em] uppercase mb-2 transition-colors duration-500"
        style={{ color: stat.accent }}
      >
        {stat.label}
      </div>

      {/* Description */}
      <div className="text-xs text-foreground/25 hidden md:block leading-relaxed max-w-[160px]">
        {stat.description}
      </div>
    </motion.div>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-28 relative z-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(202,163,83,0.05),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(96,165,250,0.04),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_20%,rgba(167,139,250,0.04),transparent)]" />
      </div>

      {/* Horizontal scan lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: 0.025 }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-white"
            style={{ top: `${(i / 15) * 100}%` }}
          />
        ))}
      </motion.div>

      {/* Top/bottom border lines with pulse */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        animate={inView ? { scaleX: [0, 1] } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "linear-gradient(to right, transparent, rgba(202,163,83,0.4), transparent)",
          transformOrigin: "left",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        animate={inView ? { scaleX: [0, 1] } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          background: "linear-gradient(to right, transparent, rgba(202,163,83,0.4), transparent)",
          transformOrigin: "right",
        }}
      />

      {/* Stats grid */}
      <div className="container px-4 md:px-6 relative z-10">
        {/* System label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[9px] tracking-[0.4em] uppercase text-foreground/25 font-medium">
            Verified Performance Metrics
          </span>
          <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-white/10" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
