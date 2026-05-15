import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { SharedNav } from "@/components/SharedNav";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { BookCall } from "@/components/sections/BookCall";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { AiAssistant } from "@/components/AiAssistant";
import { BackToTop } from "@/components/BackToTop";
import { NoiseOverlay } from "@/components/NoiseOverlay";

export function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground dark overflow-x-hidden">
      <SEO
        title="About Core Elite Digital — AI-Powered Digital Agency Team & Story"
        description="Meet Core Elite Digital — an elite AI-powered digital agency with 42+ brands transformed and 98% client retention. Our mission: build digital empires for ambitious brands worldwide."
        canonical="https://coreelitedigital.com/about"
      />
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
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">About Us</span>
            </div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Who We Are</p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.92] mb-6">
              Built to Build<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353 0%, #F0C97A 100%)" }}>
                Empires.
              </span>
            </h1>
            <p className="text-foreground/50 text-base md:text-lg leading-relaxed max-w-xl">
              Founded in 2019, Core Elite Digital is an elite AI-powered digital agency. We don't take on 30 clients at a time — we take on the right ones, go all in, and build something that outlasts the campaign.
            </p>
          </motion.div>
        </div>
      </section>

      <About />
      <WhyUs />
      <Process />
      <Testimonials />
      <BookCall />
      <Footer />
    </div>
  );
}
