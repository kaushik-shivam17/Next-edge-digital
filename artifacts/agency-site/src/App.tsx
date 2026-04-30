import { motion, useScroll, useSpring } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { Stats } from "./components/sections/Stats";
import { Portfolio } from "./components/sections/Portfolio";
import { Testimonials } from "./components/sections/Testimonials";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";

const queryClient = new QueryClient();

function AgencySite() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground dark selection:bg-primary selection:text-primary-foreground font-sans">
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container flex items-center justify-between h-20 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-sm" />
            <span className="text-2xl font-bold tracking-tighter">NEXUS.</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase text-foreground/80">
            <a href="#" className="hover:text-primary transition-colors">Work</a>
            <a href="#" className="hover:text-primary transition-colors">Services</a>
            <a href="#" className="hover:text-primary transition-colors">Agency</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <button className="md:hidden flex flex-col gap-1.5 p-2">
            <span className="w-6 h-0.5 bg-foreground block" />
            <span className="w-6 h-0.5 bg-foreground block" />
          </button>
        </div>
      </nav>

      <main>
        <Hero />
        <Services />
        <Stats />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
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
