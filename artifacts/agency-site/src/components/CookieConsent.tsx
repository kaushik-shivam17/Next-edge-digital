import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck } from "lucide-react";

const STORAGE_KEY = "ce_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return;
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-0 left-0 right-0 sm:bottom-5 z-[200] flex justify-center sm:px-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 48 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="w-full sm:max-w-lg pointer-events-auto"
            role="dialog"
            aria-label="Cookie consent"
            aria-modal="false"
          >
            <div
              className="relative px-5 py-5 sm:rounded-2xl sm:px-6"
              style={{
                background: "linear-gradient(135deg, #111007 0%, #0c0c0e 100%)",
                borderTop: "1px solid rgba(202,163,83,0.22)",
                borderLeft: "1px solid transparent",
                borderRight: "1px solid transparent",
                borderBottom: "1px solid transparent",
                boxShadow: "0 -4px 32px rgba(0,0,0,0.55)",
              }}
            >
              {/* Apply full border + shadow on sm+ via a pseudo approach using a child */}
              <style>{`
                @media (min-width: 640px) {
                  .cookie-panel {
                    border: 1px solid rgba(202,163,83,0.22) !important;
                    box-shadow: 0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(202,163,83,0.06) !important;
                  }
                }
              `}</style>

              {/* Dismiss button */}
              <button
                onClick={decline}
                aria-label="Dismiss cookie banner"
                className="absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/8 transition-all touch-manipulation"
              >
                <X style={{ width: 15, height: 15 }} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-3 pr-10">
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(202,163,83,0.18), rgba(202,163,83,0.06))",
                    border: "1px solid rgba(202,163,83,0.2)",
                  }}
                >
                  <Cookie style={{ width: 16, height: 16, color: "#CAA353" }} />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[14px] font-bold text-white/90 tracking-tight">We use cookies</p>
                  <ShieldCheck style={{ width: 13, height: 13, color: "#CAA353", flexShrink: 0 }} />
                </div>
              </div>

              {/* Body */}
              <p className="text-[12px] text-white/45 leading-relaxed mb-4">
                We use cookies to improve your experience, analyse traffic and personalise content. By clicking{" "}
                <span className="text-white/65 font-medium">Accept</span>, you agree to our use of cookies.{" "}
                <a
                  href="#"
                  className="text-primary/80 hover:text-primary underline underline-offset-2 transition-colors"
                  tabIndex={0}
                >
                  Privacy Policy
                </a>
              </p>

              {/* Action buttons */}
              <div className="flex items-stretch gap-2.5">
                <button
                  onClick={accept}
                  className="flex-1 h-11 rounded-xl text-[12px] font-bold tracking-widest uppercase transition-all duration-200 hover:brightness-110 active:scale-[0.97] touch-manipulation"
                  style={{
                    background: "linear-gradient(135deg, #CAA353, #F0C97A)",
                    color: "#0c0c0e",
                  }}
                >
                  Accept All
                </button>
                <button
                  onClick={decline}
                  className="flex-1 h-11 rounded-xl text-[12px] font-bold tracking-widest uppercase text-white/50 hover:text-white/80 transition-all duration-200 active:scale-[0.97] touch-manipulation"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  Essential Only
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
