import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Lightbulb, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover & Define",
    description:
      "We immerse ourselves in your business, market, and competition. Every strategy we build starts with clarity on where you are and relentless ambition for where you're going.",
    duration: "Week 1",
    deliverable: "Strategy Document",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Strategize & Design",
    description:
      "We craft a bespoke digital blueprint — brand-aligned, performance-optimized, and built to convert. You'll see a vision that makes you proud before a single line of code is written.",
    duration: "Weeks 2–3",
    deliverable: "Design Prototype",
  },
  {
    icon: Code2,
    number: "03",
    title: "Build & Refine",
    description:
      "Our engineers and designers work in lockstep to bring your vision to life with precision. Iterative reviews and real-time collaboration mean zero surprises at launch.",
    duration: "Weeks 4–6",
    deliverable: "Live Staging Build",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch & Scale",
    description:
      "We deploy, monitor, and amplify. Post-launch is where most agencies disappear — we accelerate. Ongoing optimization ensures your digital presence compounds over time.",
    duration: "Week 7+",
    deliverable: "Launch & Growth Plan",
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.4"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const iconScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="group flex flex-col"
      data-testid={`card-process-${index}`}
    >
      <div className="relative flex items-center justify-center w-28 h-28 mx-auto mb-8">
        {/* Outer ring */}
        <motion.div
          style={{ scale: iconScale }}
          className="absolute inset-0 rounded-full border border-white/5 group-hover:border-primary/20 transition-colors duration-500"
        />
        {/* Inner ring */}
        <div className="absolute inset-3 rounded-full border border-white/5 group-hover:border-primary/10 transition-colors duration-500" />
        {/* Icon circle */}
        <div
          className="relative w-16 h-16 rounded-full bg-background border group-hover:border-primary/40 flex items-center justify-center transition-all duration-500 z-10"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <step.icon className="w-6 h-6 text-primary" />
        </div>
        {/* Step badge */}
        <div
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border border-white/10 flex items-center justify-center z-20 group-hover:border-primary/30 transition-colors"
        >
          <span className="text-[10px] font-black text-primary">{step.number}</span>
        </div>
      </div>

      <h3 className="text-lg font-bold text-center mb-3 group-hover:text-primary transition-colors duration-300">{step.title}</h3>
      <p className="text-foreground/50 text-sm leading-relaxed text-center mb-6">{step.description}</p>

      {/* Meta info */}
      <div className="mt-auto flex items-center justify-center gap-4">
        <div className="text-center">
          <p className="text-[9px] tracking-[0.25em] uppercase text-foreground/25 mb-1">Timeline</p>
          <p className="text-xs font-semibold text-foreground/50">{step.duration}</p>
        </div>
        <div className="w-px h-6 bg-white/10" />
        <div className="text-center">
          <p className="text-[9px] tracking-[0.25em] uppercase text-foreground/25 mb-1">Deliverable</p>
          <p className="text-xs font-semibold text-primary/70">{step.deliverable}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "center center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" ref={sectionRef} className="py-16 md:py-32 bg-card/10 border-t border-white/5 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(45,100,255,0.05),transparent)]" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4"
          >
            How We Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-6"
          >
            Our Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/50 text-lg leading-relaxed"
          >
            Four deliberate steps that transform your vision into a digital force of nature. No shortcuts. No compromises.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Animated connector line */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-[1px] overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
            <motion.div
              className="h-full origin-left"
              style={{
                scaleX: lineScale,
                background: "linear-gradient(to right, rgba(202,163,83,0.6), rgba(240,201,122,0.8), rgba(202,163,83,0.3))",
              }}
            />
          </div>

          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
