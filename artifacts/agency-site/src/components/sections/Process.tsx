import { motion } from "framer-motion";
import { Search, Lightbulb, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover & Define",
    description:
      "We immerse ourselves in your business, market, and competition. Every strategy we build starts with clarity on where you are and relentless ambition for where you're going.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Strategize & Design",
    description:
      "We craft a bespoke digital blueprint — brand-aligned, performance-optimized, and built to convert. You'll see a vision that makes you proud before a single line of code is written.",
  },
  {
    icon: Code2,
    number: "03",
    title: "Build & Refine",
    description:
      "Our engineers and designers work in lockstep to bring your vision to life with precision. Iterative reviews and real-time collaboration mean zero surprises at launch.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch & Scale",
    description:
      "We deploy, monitor, and amplify. Post-launch is where most agencies disappear — we accelerate. Ongoing optimization ensures your digital presence compounds over time.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-32 bg-card/10 border-t border-white/5 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(45,100,255,0.05),transparent)]" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
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
          {/* Connector line on desktop */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group flex flex-col"
              data-testid={`card-process-${index}`}
            >
              <div className="relative flex items-center justify-center w-28 h-28 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border border-white/5 group-hover:border-primary/20 transition-colors duration-500" />
                <div className="absolute inset-3 rounded-full border border-white/5 group-hover:border-primary/10 transition-colors duration-500" />
                <div className="relative w-16 h-16 rounded-full bg-background border border-white/10 group-hover:border-primary/30 flex items-center justify-center transition-colors duration-500 z-10">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border border-white/10 flex items-center justify-center z-20">
                  <span className="text-[10px] font-black text-primary">{step.number}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-center mb-3">{step.title}</h3>
              <p className="text-foreground/50 text-sm leading-relaxed text-center">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
