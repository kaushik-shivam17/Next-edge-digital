import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

declare global {
  interface Window {
    botpress?: {
      init: (config: { configUrl: string }) => void;
      open: () => void;
      close: () => void;
      on: (event: string, cb: () => void) => void;
    };
  }
}

const BOTPRESS_CONFIG_URL =
  "https://files.bpcontent.cloud/2026/05/11/13/20260511134241-QRYO0K8Q.json";
const BOTPRESS_SCRIPT_URL =
  "https://cdn.botpress.cloud/webchat/v3.6/inject.js";

export function AiAssistant() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.querySelector(`script[src="${BOTPRESS_SCRIPT_URL}"]`)) {
      setReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = BOTPRESS_SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      window.botpress?.init({ configUrl: BOTPRESS_CONFIG_URL });
      setTimeout(() => setReady(true), 800);
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="fixed left-6 z-50 flex flex-col items-start"
      style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
    >
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22, delay: 1.2 }}
        onClick={() => ready && window.botpress?.open()}
        data-testid="button-ai-assistant"
        aria-label="Open AI Chat Assistant"
        className="relative group flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #1a1506 0%, #0c0c0e 100%)",
          border: "1px solid rgba(202,163,83,0.35)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(202,163,83,0.08)",
          opacity: ready ? 1 : 0.6,
        }}
      >
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

        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)" }}
        >
          <Sparkles className="w-4 h-4" style={{ color: "#0c0c0e" }} />
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-xs font-bold text-white/90">Ask Elite AI</span>
          <span className="text-[10px] text-white/40 tracking-wide">Site Assistant</span>
        </div>
      </motion.button>
    </div>
  );
}
