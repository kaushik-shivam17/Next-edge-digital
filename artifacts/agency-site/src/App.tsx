import { useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Menu, X } from "lucide-react";

import { Hero } from "./components/sections/Hero";
import { TrustedBy } from "./components/sections/TrustedBy";
import { Services } from "./components/sections/Services";
import { Stats } from "./components/sections/Stats";
import { Process } from "./components/sections/Process";
import { Portfolio } from "./components/sections/Portfolio";
import { Testimonials } from "./components/sections/Testimonials";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";
import { FloatingWhatsApp } from "./components/sections/FloatingWhatsApp";

const queryClient = new QueryClient();

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

function AgencySite() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground dark selection:bg-primary selection:text-primary-foreground font-sans">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-white/5">
        <div className="container flex items-center justify-between h-20 px-4 md:px-6">
          <a href="#" className="flex items-center gap-3 group" data-testid="link-logo">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary rounded-sm rotate-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative text-xs font-black text-primary-foreground tracking-tighter leading-none">NE</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-widest uppercase text-foreground">Next Edge</span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">Digital</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-10 text-xs font-semibold tracking-widest uppercase text-foreground/60">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
                className="hover:text-primary transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              data-testid="button-nav-cta"
              className="ml-4 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase hover:bg-primary/90 transition-colors duration-200 rounded-sm"
            >
              Start a Project
            </a>
          </div>

          <button
            data-testid="button-mobile-menu"
            className="md:hidden p-2 text-foreground/80"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background border-t border-white/5 overflow-hidden"
            >
              <div className="container px-4 py-6 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    data-testid={`link-mobile-${link.label.toLowerCase()}`}
                    className="text-sm font-semibold tracking-widest uppercase text-foreground/70 hover:text-primary transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  data-testid="button-mobile-cta"
                  className="w-full text-center px-5 py-3 bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase rounded-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Start a Project
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <Stats />
        <Process />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AgencySite />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
