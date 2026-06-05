import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import Lenis from "lenis";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Menu, X } from "lucide-react";

const BlogPage = lazy(() => import("./pages/BlogPage").then(m => ({ default: m.BlogPage })));
const ServicesPage = lazy(() => import("./pages/ServicesPage").then(m => ({ default: m.ServicesPage })));
const AiPage = lazy(() => import("./pages/AiPage").then(m => ({ default: m.AiPage })));
const AiCallPage = lazy(() => import("./pages/AiCallPage").then(m => ({ default: m.AiCallPage })));
const AiWhatsAppPage = lazy(() => import("./pages/AiWhatsAppPage").then(m => ({ default: m.AiWhatsAppPage })));
const AiSocialPage = lazy(() => import("./pages/AiSocialPage").then(m => ({ default: m.AiSocialPage })));
const AiSitePage = lazy(() => import("./pages/AiSitePage").then(m => ({ default: m.AiSitePage })));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage").then(m => ({ default: m.PortfolioPage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then(m => ({ default: m.ContactPage })));
const ProcessPage = lazy(() => import("./pages/ProcessPage").then(m => ({ default: m.ProcessPage })));
const ThankYouPage = lazy(() => import("./pages/ThankYouPage").then(m => ({ default: m.ThankYouPage })));

function PageFallback() {
  return (
    <div className="fixed inset-0 bg-[#09090b] flex items-center justify-center z-50">
      <img src="/logo.svg" alt="" style={{ width: 64, height: 64, objectFit: "contain", opacity: 0.7, animation: "pulse 1.5s ease-in-out infinite" }} />
    </div>
  );
}

import { Hero } from "./components/sections/Hero";
import { TrustedBy } from "./components/sections/TrustedBy";
import { Services } from "./components/sections/Services";
import { AiServices } from "./components/sections/AiServices";
import { Stats } from "./components/sections/Stats";
import { Process } from "./components/sections/Process";
import { Portfolio } from "./components/sections/Portfolio";
import { About } from "./components/sections/About";
import { Testimonials } from "./components/sections/Testimonials";
import { FAQ } from "./components/sections/FAQ";
import { WhyUs } from "./components/sections/WhyUs";
import { Contact } from "./components/sections/Contact";
import { BookCall } from "./components/sections/BookCall";
import { Blog } from "./components/sections/Blog";
import { Footer } from "./components/sections/Footer";
import { FloatingWhatsApp } from "./components/sections/FloatingWhatsApp";
import { CustomCursor } from "./components/CustomCursor";
import { NoiseOverlay } from "./components/NoiseOverlay";
import { BackToTop } from "./components/BackToTop";
import { CookieConsent } from "./components/CookieConsent";

const navLinks = [
  { label: "Work", href: "/portfolio", section: "work" },
  { label: "Services", href: "/services", section: "services" },
  { label: "AI Solutions", href: "/ai-solutions", section: "ai-solutions" },
  { label: "About", href: "/about", section: "about" },
  { label: "Contact", href: "/contact", section: "contact" },
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

  useEffect(() => {
    const sectionIds = ["work", "services", "ai-solutions", "about", "contact"];
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
      {isHoverDevice && <CustomCursor />}
      <CookieConsent />

      <FloatingWhatsApp />

      <BackToTop />

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
          aria-label="Main navigation"
          role="navigation"
          data-nav-container
          className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
          style={{
            background: scrolled ? "rgba(10,10,12,0.92)" : "rgba(10,10,12,0.5)",
            backdropFilter: "blur(20px)",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          }}
        >
          <div className="container flex items-center justify-between h-20 px-4 md:px-6">
            <a
              href="#"
              className="flex items-center gap-3 group"
              aria-label="Core Elite Digital — Go to homepage"
             
              onClick={(e) => {
                e.preventDefault();
                if (lenisRef.current) {
                  lenisRef.current.scrollTo(0, { duration: 1.4 });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <div className="relative flex-shrink-0 transition-transform duration-500 group-hover:scale-[1.07]">
                <img
                  src="/logo.svg"
                  alt="Core Elite Digital"
                  style={{ width: 44, height: 44, objectFit: "contain", filter: "drop-shadow(0 0 10px rgba(202,163,83,0.35))" }}
                />
              </div>
              <div className="flex flex-col leading-none gap-[4px]">
                <span className="font-black uppercase" style={{ fontSize: 13, letterSpacing: "0.13em", color: "#ffffff" }}>coreelite</span>
                <span className="font-bold uppercase" style={{ fontSize: 8, letterSpacing: "0.48em", color: "#CAA353" }}>digital</span>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase text-foreground/50">
              {navLinks.map((link) => {
                const isActive = activeSection === link.section;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                   
                    data-nav-item
                    className="relative group transition-colors duration-200 whitespace-nowrap"
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
                  </a>
                );
              })}
              <button
                onClick={() => handleNavClick("bookcall")}
               
                className="ml-2 px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap hover:opacity-85"
                style={{
                  background: "linear-gradient(135deg, #CAA353, #F0C97A)",
                  color: "#0c0c0e",
                  clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                }}
              >
                Book Free Call
              </button>
            </div>

            <button
             
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
                <div className="container px-4 py-6 flex flex-col gap-5">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.section;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                       
                        className="text-left text-sm font-semibold tracking-widest uppercase transition-colors min-h-[44px] flex items-center"
                        style={{ color: isActive ? "#CAA353" : "rgba(255,255,255,0.6)" }}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                  <button
                    onClick={() => handleNavClick("bookcall")}
                    className="w-full text-center px-5 py-3.5 text-xs font-bold tracking-widest uppercase rounded-sm min-h-[44px] flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e" }}
                  >
                    Book Free Call
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <main id="main-content" aria-label="Core Elite Digital — AI-Powered Digital Agency">
          <Hero />
          <TrustedBy />
          <Portfolio />
          <WhyUs />
          <Services />
          <AiServices />
          <About />
          <Stats />
          <Process />
          <Testimonials />
          <BookCall />
          <Contact />
          <FAQ />
          <Blog />
        </main>

        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Suspense fallback={<PageFallback />}>
        <Switch>
          <Route path="/blog">{() => <BlogPage />}</Route>
          <Route path="/services">{() => <ServicesPage />}</Route>
          <Route path="/ai-solutions">{() => <AiPage />}</Route>
          <Route path="/ai/call-management">{() => <AiCallPage />}</Route>
          <Route path="/ai/whatsapp">{() => <AiWhatsAppPage />}</Route>
          <Route path="/ai/social-media">{() => <AiSocialPage />}</Route>
          <Route path="/ai/site-building">{() => <AiSitePage />}</Route>
          <Route path="/portfolio">{() => <PortfolioPage />}</Route>
          <Route path="/about">{() => <AboutPage />}</Route>
          <Route path="/contact">{() => <ContactPage />}</Route>
          <Route path="/process">{() => <ProcessPage />}</Route>
          <Route path="/thank-you">{() => <ThankYouPage />}</Route>
          <Route>{() => <AgencySite />}</Route>
        </Switch>
      </Suspense>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
