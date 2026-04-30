import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 150, suffix: "+", label: "Projects Delivered", description: "Across 12 industries worldwide" },
  { value: 98, suffix: "%", label: "Client Retention Rate", description: "Clients who stay, grow, and scale" },
  { value: 7, suffix: " Yrs", label: "Industry Experience", description: "Refined craft and proven process" },
  { value: 12, suffix: "M+", prefix: "$", label: "Client Revenue Generated", description: "Measurable business impact" },
];

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix || ""}{count}{suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-24 border-y border-white/5 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(45,100,255,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,180,0,0.04),transparent_70%)]" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
              data-testid={`stat-${index}`}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-3 text-foreground">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-2">
                {stat.label}
              </div>
              <div className="text-xs text-foreground/30 hidden md:block">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
