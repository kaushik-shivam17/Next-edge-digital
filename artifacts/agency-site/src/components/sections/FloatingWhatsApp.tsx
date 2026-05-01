import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { X } from "lucide-react";

const WHATSAPP_NUMBER = "916398054033";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const QUICK_MESSAGES = [
  "I'd like to discuss a website project",
  "Tell me about social media management",
  "I want to get a free consultation",
];

export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);

  const openChat = (message?: string) => {
    const url = message
      ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
      : WHATSAPP_URL;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup card */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-card border border-white/10 rounded-2xl shadow-2xl w-72 overflow-hidden"
            data-testid="whatsapp-popup"
          >
            {/* Header */}
            <div className="bg-[#25D366] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <SiWhatsapp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Next Edge Digital</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                    <p className="text-white/80 text-xs">Typically replies instantly</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1"
                data-testid="button-whatsapp-close"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <p className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-1">
                Quick messages
              </p>
              {QUICK_MESSAGES.map((msg) => (
                <button
                  key={msg}
                  onClick={() => openChat(msg)}
                  data-testid={`button-whatsapp-msg-${QUICK_MESSAGES.indexOf(msg)}`}
                  className="w-full text-left px-4 py-3 rounded-xl bg-background/60 border border-white/5 hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-all duration-200 text-sm text-foreground/80 hover:text-foreground"
                >
                  {msg}
                </button>
              ))}
              <button
                onClick={() => openChat()}
                data-testid="button-whatsapp-open"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#22c35e] text-white font-bold text-sm transition-colors duration-200 mt-1"
              >
                <SiWhatsapp className="w-4 h-4" />
                Open WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        data-testid="button-whatsapp-toggle"
        aria-label="Contact us on WhatsApp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#22c35e] shadow-lg shadow-[#25D366]/30 flex items-center justify-center transition-colors duration-200"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <SiWhatsapp className="w-6 h-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-25" />
        )}
      </motion.button>
    </div>
  );
}
