import { motion } from "framer-motion";
import { Target, Zap, LineChart, HeartHandshake } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Outcome-Obsessed",
    description:
      "We don't celebrate pretty designs. We celebrate revenue, leads, and growth. Every decision is tied to a measurable business result.",
    accent: "#CAA353",
  },
  {
    icon: Zap,
    title: "Speed Without Sacrifice",
    description:
      "Most agencies take 6 months. We deliver market-ready work in weeks — without cutting corners on quality or strategy.",
    accent: "#60A5FA",
  },
  {
    icon: LineChart,
    title: "Full-Funnel Thinking",
    description:
      "We don't just hand off a website. We engineer the entire digital ecosystem — from first impression to repeat purchase.",
    accent: "#A78BFA",
  },
  {
    icon: HeartHandshake,
    title: "Genuine Partnership",
    description:
      "You get direct access to senior strategists — not account managers reading from scripts. Your success is our reputation.",
    accent: "#34D399",
  },
];

export function WhyUs() {
  return (
    <section className="py-24 relative z-10 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(202,163,83,0.04),transparent)]" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">Why Next Edge</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95]">
              Not Another Agency.<br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #CAA353 0%, #F0C97A 100%)" }}
              >
                A Growth Partner.
              </span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-foreground/50 max-w-sm text-base leading-relaxed"
          >
            There are thousands of agencies. Here's why 98% of our clients never leave.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-7 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${r.accent}12, transparent)`,
                }}
              />

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-400"
                style={{
                  background: `${r.accent}15`,
                  border: `1px solid ${r.accent}30`,
                }}
              >
                <r.icon className="w-4.5 h-4.5" style={{ color: r.accent, width: 18, height: 18 }} />
              </div>

              <h3
                className="text-base font-bold mb-2.5 transition-colors duration-300"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {r.title}
              </h3>
              <p className="text-foreground/45 text-sm leading-relaxed">{r.description}</p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${r.accent}50, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
