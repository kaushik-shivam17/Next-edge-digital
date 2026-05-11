import { motion } from "framer-motion";
import { SharedNav } from "@/components/SharedNav";
import { Services } from "@/components/sections/Services";
import { AiServices } from "@/components/sections/AiServices";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { BookCall } from "@/components/sections/BookCall";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { AiAssistant } from "@/components/AiAssistant";
import { BackToTop } from "@/components/BackToTop";
import { NoiseOverlay } from "@/components/NoiseOverlay";

export function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground dark overflow-x-hidden">
      <NoiseOverlay />
      <SharedNav />
      <FloatingWhatsApp />
      <AiAssistant />
      <BackToTop />

      <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(202,163,83,0.07),transparent)]" />
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
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Services</span>
            </div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">What We Do</p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.92] mb-6">
              Full-Stack Digital<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353 0%, #F0C97A 100%)" }}>
                Excellence.
              </span>
            </h1>
            <p className="text-foreground/50 text-base md:text-lg leading-relaxed max-w-xl">
              From AI-powered automation to premium website design — every service is engineered to move the needle on what matters: revenue, retention, and reputation.
            </p>
          </motion.div>
        </div>
      </section>

      <div id="ai-solutions"><AiServices /></div>
      <div id="services"><Services /></div>
      <WhyUs />
      <Process />
      <BookCall />
      <Footer />
    </div>
  );
}
