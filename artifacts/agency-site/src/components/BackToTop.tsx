import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          aria-label="Back to top"
          data-testid="button-back-to-top"
          className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full flex items-center justify-center group transition-all duration-300 hover:scale-110"
          style={{
            background: "rgba(202,163,83,0.1)",
            border: "1px solid rgba(202,163,83,0.3)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 24px rgba(202,163,83,0.15)",
          }}
        >
          <ArrowUp className="w-4 h-4 text-primary group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
