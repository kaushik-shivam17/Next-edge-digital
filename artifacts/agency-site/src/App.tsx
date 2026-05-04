import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Menu, X } from "lucide-react";

import { Hero } from "./components/sections/Hero";
import { TrustedBy } from "./components/sections/TrustedBy";
import { Services } from "./components/sections/Services";
import { Stats } from "./components/sections/Stats";
import { Process } from "./components/sections/Process";
import { Portfolio } from "./components/sections/Portfolio";
import { About } from "./components/sections/About";
import { Testimonials } from "./components/sections/Testimonials";
import { FAQ } from "./components/sections/FAQ";
import { WhyUs } from "./components/sections/WhyUs";
import { Contact } from "./components/sections/Contact";
import { BookCall } from "./components/sections/BookCall";
import { Pricing } from "./components/sections/Pricing";
import { Footer } from "./components/sections/Footer";
import { FloatingWhatsApp } from "./components/sections/FloatingWhatsApp";
import { CustomCursor } from "./components/CustomCursor";
import { NoiseOverlay } from "./components/NoiseOverlay";
import { BackToTop } from "./components/BackToTop";
import { AiAssistant } from "./components/AiAssistant";
import { Preloader } from "./components/Preloader";


const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function AgencySite() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const scrollHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isHoverDevice, setIsHoverDevice] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    setIsHoverDevice(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });

    if (isTouch) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
      infinite: false,
    });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Intersection Observer for active nav section
  useEffect(() => {
    const sectionIds = ["work", "services", "pricing", "about", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80, duration: 1.4 });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative min-h-screen bg-background text-foreground dark selection:bg-primary selection:text-primary-foreground font-sans"
      style={{ cursor: isHoverDevice ? "none" : "auto" }}
    >
        <AnimatePresence>
          {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
        </AnimatePresence>

        {/* Fixed floating elements are siblings of the animated wrapper — never inside a transformed parent */}
        {isHoverDevice && <CustomCursor />}
        <FloatingWhatsApp />
        <AiAssistant />
        <BackToTop />

        {/* Animated content wrapper — opacity only, no transform, so fixed children above are unaffected */}
        <div className="site-enter">
        <NoiseOverlay />

        {/* Top scroll progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
          style={{
            scaleX,
            background: "linear-gradient(to right, #8B6914, #CAA353, #F0C97A)",
            boxShadow: "0 0 8px rgba(202,163,83,0.6)",
          }}
        />

        {/* Right-side vertical scroll indicator */}
        <div className="fixed right-0 top-0 bottom-0 w-[2px] z-40 hidden md:block" style={{ background: "rgba(255,255,255,0.04)" }}>
          <motion.div
            className="w-full"
            style={{
              height: scrollHeight,
              background: "linear-gradient(to bottom, #8B6914, #CAA353, #F0C97A)",
              boxShadow: "0 0 6px rgba(202,163,83,0.35)",
            }}
          />
        </div>

        {/* Navbar */}
        <nav
          data-nav-container
          className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
          style={{
            background: scrolled ? "rgba(10,10,12,0.92)" : "rgba(10,10,12,0.5)",
            backdropFilter: "blur(20px)",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          }}
        >
          <div className="container flex items-center justify-between h-20 px-4 md:px-6">
            <a href="#" className="flex items-center gap-3 group" data-testid="link-logo" onClick={(e) => { e.preventDefault(); if (lenisRef.current) { lenisRef.current.scrollTo(0, { duration: 1.4 }); } else { window.scrollTo({ top: 0, behavior: "smooth" }); } }}>
              <div
                className="relative flex-shrink-0 transition-transform duration-500 group-hover:scale-[1.07]"
                style={{ width: 38, height: 38, padding: 1.5, background: "linear-gradient(135deg, #8B6914 0%, #CAA353 55%, #F0C97A 100%)", borderRadius: 9, boxSizing: "border-box", boxShadow: "0 0 18px rgba(202,163,83,0.22)" }}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: "#0c0c0e", borderRadius: 7 }}
                >
                  <span
                    className="font-black leading-none select-none"
                    style={{ fontSize: 11, letterSpacing: "-0.02em", background: "linear-gradient(135deg, #CAA353, #F0C97A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                  >
                    NE
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ background: "#F0C97A", boxShadow: "0 0 8px rgba(240,201,122,0.95)" }} />
              </div>
              <div className="flex flex-col leading-none gap-[4px]">
                <span className="font-black uppercase" style={{ fontSize: 13, letterSpacing: "0.13em", color: "#ffffff" }}>nextedge</span>
                <span className="font-bold uppercase" style={{ fontSize: 8, letterSpacing: "0.48em", color: "#CAA353" }}>tech</span>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-10 text-xs font-semibold tracking-widest uppercase text-foreground/50">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                    data-nav-item
                    className="relative group transition-colors duration-200"
                    style={{ color: isActive ? "rgba(202,163,83,1)" : undefined }}
                  >
                    <span className={`transition-colors duration-200 ${isActive ? "text-primary" : "hover:text-foreground"}`}>
                      {link.label}
                    </span>
                    <span
                      className="absolute -bottom-1 left-0 h-[1px] transition-all duration-300"
                      style={{
                        width: isActive ? "100%" : "0%",
                        background: "linear-gradient(to right, #CAA353, #F0C97A)",
                      }}
                    />
                  </button>
                );
              })}
              <button
                onClick={() => handleNavClick("#contact")}
                data-testid="button-nav-cta"
                className="ml-4 px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #CAA353, #F0C97A)",
                  color: "#0c0c0e",
                  clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                Start a Project
              </button>
            </div>

            <button
              data-testid="button-mobile-menu"
              className="md:hidden p-3 -mr-1 text-foreground/80 touch-manipulation"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="container px-4 py-6 flex flex-col gap-6">
                  {navLinks.map((link) => {
                    const id = link.href.replace("#", "");
                    const isActive = activeSection === id;
                    return (
                      <button
                        key={link.label}
                        onClick={() => handleNavClick(link.href)}
                        data-testid={`link-mobile-${link.label.toLowerCase()}`}
                        className="text-left text-sm font-semibold tracking-widest uppercase transition-colors"
                        style={{ color: isActive ? "#CAA353" : "rgba(255,255,255,0.6)" }}
                      >
                        {link.label}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handleNavClick("#contact")}
                    data-testid="button-mobile-cta"
                    className="w-full text-center px-5 py-3 text-xs font-bold tracking-widest uppercase rounded-sm"
                    style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e" }}
                  >
                    Start a Project
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <main>
          <Hero />
          <TrustedBy />
          <Portfolio />
          <WhyUs />
          <Services />
          <Pricing />
          <About />
          <Stats />
          <Process />
          <Testimonials />
          <BookCall />
          <Contact />
          <FAQ />
        </main>

        <Footer />
        </div>
      </div>
  );
}

function App() {
  return (
    <TooltipProvider>
      <AgencySite />
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
