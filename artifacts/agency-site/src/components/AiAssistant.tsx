import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

const BOTPRESS_SHAREABLE_URL =
  "https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/05/11/13/20260511134241-QRYO0K8Q.json";

export function AiAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed z-50 flex flex-col"
            style={{
              bottom: "calc(max(1.5rem, env(safe-area-inset-bottom)) + 68px)",
              left: "1.5rem",
              width: "min(380px, calc(100vw - 3rem))",
              height: "min(580px, calc(100vh - 160px))",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(202,163,83,0.28)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(202,163,83,0.08)",
            }}
          >
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #1a1506, #0c0c0e)",
                borderBottom: "1px solid rgba(202,163,83,0.18)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)" }}
                >
                  <Sparkles style={{ width: 12, height: 12, color: "#0c0c0e" }} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white/90 leading-none">Elite AI</p>
                  <p className="text-[9px] text-white/35 tracking-wide mt-0.5">Core Elite Digital · Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X style={{ width: 14, height: 14 }} />
              </button>
            </div>

            <iframe
              src={BOTPRESS_SHAREABLE_URL}
              title="Elite AI Chat Assistant"
              style={{ width: "100%", flex: 1, border: "none", background: "#0c0c0e", display: "block" }}
              allow="microphone"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="fixed left-6 z-50"
        style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22, delay: 1.2 }}
          onClick={() => setOpen((v) => !v)}
         
          aria-label="Toggle AI Chat Assistant"
          className="relative group flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #1a1506 0%, #0c0c0e 100%)",
            border: open
              ? "1px solid rgba(202,163,83,0.6)"
              : "1px solid rgba(202,163,83,0.35)",
            boxShadow: open
              ? "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(202,163,83,0.12)"
              : "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(202,163,83,0.06)",
          }}
        >
          {!open && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(202,163,83,0.3)",
                  "0 0 0 8px rgba(202,163,83,0)",
                  "0 0 0 0 rgba(202,163,83,0)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />
          )}

          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)" }}
          >
            <Sparkles className="w-4 h-4" style={{ color: "#0c0c0e" }} />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-xs font-bold text-white/90">
              {open ? "Close Chat" : "Ask Elite AI"}
            </span>
            <span className="text-[10px] text-white/40 tracking-wide">Site Assistant</span>
          </div>
        </motion.button>
      </div>
    </>
  );
}
