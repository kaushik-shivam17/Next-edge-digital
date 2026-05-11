import { motion } from "framer-motion";
import { Bot, Zap, Shield, Clock } from "lucide-react";
import { SharedNav } from "@/components/SharedNav";
import { AiServices } from "@/components/sections/AiServices";
import { Stats } from "@/components/sections/Stats";
import { BookCall } from "@/components/sections/BookCall";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { AiAssistant } from "@/components/AiAssistant";
import { BackToTop } from "@/components/BackToTop";
import { NoiseOverlay } from "@/components/NoiseOverlay";

const highlights = [
  { icon: Clock, value: "24/7", label: "Always Active" },
  { icon: Zap, value: "< 1s", label: "Response Time" },
  { icon: Shield, value: "100%", label: "Automated" },
  { icon: Bot, value: "4 AI", label: "Systems" },
];

export function AiPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground dark overflow-x-hidden">
      <NoiseOverlay />
      <SharedNav />
      <FloatingWhatsApp />
      <AiAssistant />
      <BackToTop />

      <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(202,163,83,0.09),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(99,102,241,0.06),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(202,163,83,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(202,163,83,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <a href="/" className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors">Home</a>
              <span className="text-foreground/15">·</span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">AI Solutions</span>
            </div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">AI Automation Suite</p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.92] mb-6">
              Your Business,<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353 0%, #F0C97A 100%)" }}>
                Always On.
              </span>
            </h1>
            <p className="text-foreground/50 text-base md:text-lg leading-relaxed max-w-xl mb-12">
              Four AI-powered systems that handle calls, WhatsApp, social media, and websites — working in perfect sync around the clock, so you can focus on what matters.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                  className="flex flex-col items-center p-4 rounded-xl text-center"
                  style={{ background: "rgba(202,163,83,0.06)", border: "1px solid rgba(202,163,83,0.15)" }}
                >
                  <h.icon className="w-5 h-5 text-primary mb-2" />
                  <div className="text-xl font-black text-primary">{h.value}</div>
                  <div className="text-[10px] font-semibold tracking-wider uppercase text-foreground/40 mt-0.5">{h.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <AiServices />
      <Stats />
      <FAQ />
      <BookCall />
      <Footer />
    </div>
  );
}
