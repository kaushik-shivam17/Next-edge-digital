import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck } from "lucide-react";

const STORAGE_KEY = "ce_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const t = setTimeout(() => setVisible(true), 1800);
      return () => clearTimeout(t);
    }
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
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className="fixed bottom-6 left-1/2 z-[200] w-[calc(100vw-2rem)] max-w-xl"
          style={{ transform: "translateX(-50%)" }}
          role="dialog"
          aria-label="Cookie consent"
          aria-modal="false"
        >
          <div
            className="relative rounded-2xl px-5 py-4 md:px-6 md:py-5"
            style={{
              background: "linear-gradient(135deg, #111007 0%, #0c0c0e 100%)",
              border: "1px solid rgba(202,163,83,0.22)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(202,163,83,0.06)",
            }}
          >
            {/* Dismiss */}
            <button
              onClick={decline}
              aria-label="Dismiss cookie banner"
              className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/8 transition-all"
            >
              <X style={{ width: 13, height: 13 }} />
            </button>

            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
                style={{ background: "linear-gradient(135deg, rgba(202,163,83,0.18), rgba(202,163,83,0.06))", border: "1px solid rgba(202,163,83,0.2)" }}
              >
                <Cookie style={{ width: 16, height: 16, color: "#CAA353" }} />
              </div>

              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[13px] font-bold text-white/90 tracking-tight">We use cookies</p>
                  <ShieldCheck style={{ width: 12, height: 12, color: "#CAA353", flexShrink: 0 }} />
                </div>
                <p className="text-[11.5px] text-white/42 leading-relaxed mb-4">
                  We use cookies to improve your experience, analyse site traffic and personalise content. By clicking{" "}
                  <span className="text-white/60 font-medium">Accept</span>, you agree to our use of cookies.{" "}
                  <a
                    href="#"
                    className="text-primary/80 hover:text-primary underline underline-offset-2 transition-colors"
                    tabIndex={0}
                  >
                    Privacy Policy
                  </a>
                </p>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={accept}
                    className="flex-1 h-9 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
                    style={{
                      background: "linear-gradient(135deg, #CAA353, #F0C97A)",
                      color: "#0c0c0e",
                    }}
                  >
                    Accept All
                  </button>
                  <button
                    onClick={decline}
                    className="flex-1 h-9 rounded-lg text-[11px] font-bold tracking-widest uppercase text-white/50 hover:text-white/80 transition-all duration-200 active:scale-[0.97]"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    Essential Only
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
