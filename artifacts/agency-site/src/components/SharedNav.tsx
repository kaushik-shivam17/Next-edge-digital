import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "AI Solutions", href: "/ai-solutions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SharedNav() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav
      aria-label="Main navigation"
      role="navigation"
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,10,12,0.92)" : "rgba(10,10,12,0.5)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="container flex items-center justify-between h-16 md:h-20 px-4 md:px-6">
        <a
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Core Elite Digital — Go to homepage"
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

        <div className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-widest uppercase text-foreground/50">
          {navLinks.map((link) => {
            const isActive = location === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                className="relative group transition-colors duration-200 whitespace-nowrap"
                style={{ color: isActive ? "rgba(202,163,83,1)" : undefined }}
              >
                <span className={`transition-colors duration-200 ${isActive ? "text-primary" : "hover:text-foreground"}`}>
                  {link.label}
                </span>
                <span
                  className="absolute -bottom-1 left-0 h-[1px] transition-all duration-300"
                  style={{ width: isActive ? "100%" : "0%", background: "linear-gradient(to right, #CAA353, #F0C97A)" }}
                />
              </a>
            );
          })}
          <a
            href="/#bookcall"
            className="ml-2 px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap hover:opacity-85"
            style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e", clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
          >
            Book Free Call
          </a>
        </div>

        <button
          className="md:hidden p-3 -mr-1 text-foreground/80 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
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
                const isActive = location === link.href;
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
              <a
                href="/#bookcall"
                className="w-full text-center px-5 py-3.5 text-xs font-bold tracking-widest uppercase rounded-sm min-h-[44px] flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e" }}
              >
                Book Free Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
