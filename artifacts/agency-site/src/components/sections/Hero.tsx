import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Layered background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(45,100,255,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(45,100,255,0.06),transparent)]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[10%] w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"
      />

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-foreground/70">
              Currently Accepting New Clients
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-[clamp(3rem,9vw,7.5rem)] font-black tracking-tight leading-[0.9] mb-8"
          >
            <span className="block text-foreground">We Build</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-blue-400">
              Digital Empires.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-foreground/50 mb-14 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Next Edge Digital is an elite studio that engineers market-leading websites
            and dominates social media for ambitious brands. We don't do average.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              data-testid="button-hero-primary"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-primary/90 transition-all duration-300 hover:gap-4"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#work"
              data-testid="button-hero-secondary"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-foreground/70 font-semibold text-sm tracking-widest uppercase border border-white/10 rounded-sm hover:border-white/30 hover:text-foreground transition-all duration-300"
            >
              View Our Work
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-foreground/30"
          >
            {["150+ Projects Delivered", "98% Client Retention", "7 Years of Excellence"].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium">
                <span className="w-1 h-1 rounded-full bg-primary/60" />
                {badge}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-foreground/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
