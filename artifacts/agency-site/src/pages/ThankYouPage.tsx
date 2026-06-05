import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, MessageCircle, Home } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { SEO } from "@/components/SEO";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { BackToTop } from "@/components/BackToTop";
import { WA } from "@/lib/whatsapp";

const WHATSAPP_URL = WA.followUp;

const perks = [
  { label: "Personal review by our partners", delay: 0.6 },
  { label: "Response within 24 hours", delay: 0.7 },
  { label: "No spam — ever", delay: 0.8 },
];

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; alpha: number; r: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        alpha: Math.random() * 0.4 + 0.05,
        r: Math.random() * 1.5 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(202,163,83,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

export function ThankYouPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground dark overflow-x-hidden flex flex-col">
      <SEO
        title="Thank You — Core Elite Digital"
        description="Your inquiry has been received. Our partners will personally review your submission and respond within 24 hours."
        canonical="https://coreelitedigital.com/thank-you"
      />
      <NoiseOverlay />
      <FloatingWhatsApp />
      <BackToTop />

      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(202,163,83,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(45,100,255,0.05),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(202,163,83,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(202,163,83,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Nav — minimal */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-10 h-20">
        <a
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="Core Elite Digital — Home"
        >
          <img
            src="/logo.svg"
            alt="Core Elite Digital"
            style={{ width: 38, height: 38, objectFit: "contain", filter: "drop-shadow(0 0 10px rgba(202,163,83,0.4))" }}
          />
          <div className="flex flex-col leading-none gap-[4px]">
            <span className="font-black uppercase" style={{ fontSize: 12, letterSpacing: "0.13em", color: "#ffffff" }}>coreelite</span>
            <span className="font-bold uppercase" style={{ fontSize: 7, letterSpacing: "0.48em", color: "#CAA353" }}>digital</span>
          </div>
        </a>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12 md:py-20">
        <div className="max-w-2xl w-full mx-auto text-center">

          {/* Success icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
            className="relative inline-flex items-center justify-center mb-10"
          >
            {/* Outer glow ring */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(202,163,83,0.15) 0%, transparent 70%)", width: 160, height: 160, margin: "-32px" }}
            />
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid rgba(202,163,83,0.4)", width: 100, height: 100, margin: "-2px" }}
            />
            {/* Icon container */}
            <div
              className="relative w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(202,163,83,0.12) 0%, rgba(240,201,122,0.08) 100%)",
                border: "1.5px solid rgba(202,163,83,0.4)",
                boxShadow: "0 0 40px rgba(202,163,83,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <CheckCircle2 className="w-12 h-12 text-primary" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-xs font-semibold tracking-[0.35em] uppercase text-primary mb-5"
          >
            Inquiry Received
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6"
          >
            Thank{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #CAA353 0%, #F0C97A 50%, #CAA353 100%)" }}
            >
              You.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base md:text-lg text-foreground/50 leading-relaxed max-w-lg mx-auto mb-10"
          >
            Your project brief has been received. Our partners personally review every inquiry — no bots, no auto-replies. Expect a response within{" "}
            <span className="text-foreground/80 font-semibold">24 hours.</span>
          </motion.p>

          {/* Guarantee pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            {perks.map(({ label, delay }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay, duration: 0.4 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(202,163,83,0.06)",
                  border: "1px solid rgba(202,163,83,0.18)",
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="text-[11px] font-semibold tracking-wider uppercase text-foreground/55">{label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-24 h-px mx-auto mb-12 origin-center"
            style={{ background: "linear-gradient(to right, transparent, rgba(202,163,83,0.4), transparent)" }}
          />

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/"
              className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 font-bold text-sm tracking-[0.12em] uppercase transition-all duration-300 hover:opacity-85"
              style={{
                background: "linear-gradient(135deg, #CAA353, #F0C97A)",
                color: "#0c0c0e",
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              <Home className="w-4 h-4" />
              Back to Home
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300"
              style={{
                background: "rgba(37,211,102,0.08)",
                border: "1px solid rgba(37,211,102,0.3)",
                color: "#25D366",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.15)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,211,102,0.55)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.08)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,211,102,0.3)";
              }}
            >
              <SiWhatsapp className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-12 text-[11px] text-foreground/25 tracking-wide"
          >
            While you wait — explore our{" "}
            <a href="/portfolio" className="text-foreground/40 hover:text-primary transition-colors underline underline-offset-2">
              work
            </a>{" "}
            or read about our{" "}
            <a href="/process" className="text-foreground/40 hover:text-primary transition-colors underline underline-offset-2">
              process
            </a>
            .
          </motion.p>
        </div>
      </main>

      {/* Footer bar */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="relative z-10 border-t border-white/5 px-6 py-5 flex items-center justify-center"
      >
        <p className="text-[11px] text-foreground/20 tracking-wide text-center">
          &copy; {new Date().getFullYear()} Core Elite Digital. All rights reserved.
        </p>
      </motion.footer>
    </div>
  );
}
