import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Award, Users, Clock } from "lucide-react";
import { Magnetic } from "../Magnetic";
import { HeroCanvas } from "../HeroCanvas";

const HEADLINE_1 = "We Build";
const HEADLINE_2 = "Digital";
const HEADLINE_3 = "Empires.";

function SplitReveal({ text, delay = 0, className = "", style }: { text: string; delay?: number; className?: string; style?: React.CSSProperties }) {
  const words = text.split(" ");
  return (
    <span className={className} style={style}>
      {words.map((word, wi) => (
        <motion.span
          key={wi}
          className="inline-block mr-[0.25em] last:mr-0"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
            delay: delay + wi * 0.08,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function ScrambleText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const [displayed, setDisplayed] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let iteration = 0;
    const total = text.length * 3;

    const start = () => {
      timerRef.current = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayed(
            text
              .split("")
              .map((char, idx) => {
                if (idx < Math.floor(iteration / 3)) return char;
                return char === " " ? " " : chars[Math.floor(Math.random() * chars.length)];
              })
              .join("")
          );
          iteration++;
          if (iteration > total) {
            clearInterval(interval);
            setDisplayed(text);
          }
        }, 30);
      }, delay * 1000);
    };
    start();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, delay]);

  return <span className={className}>{displayed}</span>;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
      {/* Canvas constellation */}
      <HeroCanvas />

      {/* Layered glow */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(202,163,83,0.07),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(45,100,255,0.05),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_20%_60%,rgba(202,163,83,0.04),transparent)]" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(202,163,83,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(202,163,83,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -40, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[8%] w-80 h-80 rounded-full pointer-events-none z-[1]"
        style={{ background: "radial-gradient(circle, rgba(202,163,83,0.08) 0%, transparent 70%)", filter: "blur(40px)" }}
      />
      <motion.div
        animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-1/4 right-[8%] w-96 h-96 rounded-full pointer-events-none z-[1]"
        style={{ background: "radial-gradient(circle, rgba(45,100,255,0.07) 0%, transparent 70%)", filter: "blur(50px)" }}
      />

      {/* Content */}
      <motion.div style={{ y, opacity }} className="container relative z-10 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-5 md:mb-12"
            style={{
              background: "rgba(202,163,83,0.06)",
              border: "1px solid rgba(202,163,83,0.2)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-[11px] font-bold tracking-[0.25em] text-primary"
            >
              CURRENTLY ACCEPTING NEW CLIENTS
            </motion.span>
          </motion.div>

          {/* Headline — starts visible for LCP, subtle y-only lift */}
          <motion.h1
            initial={{ opacity: 1, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2rem,8.5vw,8rem)] font-black tracking-tight leading-[0.88] mb-5 md:mb-8"
          >
            <span className="block text-foreground">{HEADLINE_1}</span>
            <span className="block">
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #CAA353 0%, #F0C97A 40%, #CAA353 70%, #8B6914 100%)" }}
              >
                {HEADLINE_2}
              </span>
              {" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)" }}
              >
                {HEADLINE_3}
              </span>
            </span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-xl text-foreground/45 mb-8 md:mb-14 max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
          >
            An elite studio engineering market-leading websites and dominating social media
            for ambitious brands worldwide.{" "}
            <span className="text-foreground/70 font-medium">We don't do average.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
          >
            <Magnetic strength={0.3} className="w-full sm:w-auto">
              <a
                href="#contact"
                data-testid="button-hero-primary"
                data-cursor-text="START"
                className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-9 py-4 font-bold text-sm tracking-[0.15em] uppercase overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #CAA353, #F0C97A, #CAA353)",
                  backgroundSize: "200% 100%",
                  color: "#0c0c0e",
                  clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                }}
              >
                <motion.span
                  className="absolute inset-0"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ background: "rgba(255,255,255,0.15)" }}
                />
                <span className="relative">Start a Project</span>
                <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25} className="w-full sm:w-auto">
              <a
                href="#work"
                data-testid="button-hero-secondary"
                data-cursor-text="VIEW"
                className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-9 py-4 text-foreground/60 font-semibold text-sm tracking-[0.15em] uppercase hover:text-foreground transition-all duration-300"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                  backdropFilter: "blur(8px)",
                }}
              >
                View Our Work
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="opacity-50"
                >
                  →
                </motion.span>
              </a>
            </Magnetic>
          </motion.div>

          {/* Trust badges — icon + text, no emoji */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className="mt-8 md:mt-16 flex flex-wrap items-center justify-center gap-2 md:gap-3"
          >
            {[
              { label: "42+ Brands Transformed", Icon: Award },
              { label: "98% Client Retention", Icon: Users },
              { label: "6+ Years of Excellence", Icon: Clock },
            ].map(({ label, Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 + i * 0.1, duration: 0.5 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] tracking-[0.18em] uppercase font-semibold"
                style={{
                  background: "rgba(202,163,83,0.06)",
                  border: "1px solid rgba(202,163,83,0.15)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                <Icon className="w-3 h-3 flex-shrink-0" style={{ color: "#CAA353" }} />
                {label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-foreground/20 font-medium">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground/20 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-primary/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
