import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { X, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "916398054033";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const QUICK_MESSAGES = [
  { label: "Discuss a website project", icon: "🌐" },
  { label: "Social media management", icon: "📱" },
  { label: "Book a free strategy call", icon: "📞" },
];

export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const openChat = (message?: string) => {
    const url = message
      ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
      : WHATSAPP_URL;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Premium popup card */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-80 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(12, 12, 14, 0.92)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(37,211,102,0.1)",
            }}
            data-testid="whatsapp-popup"
          >
            {/* Header */}
            <div
              className="px-5 py-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1a5c38 0%, #128C7E 50%, #25D366 100%)",
              }}
            >
              {/* Subtle radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <SiWhatsapp className="w-5 h-5 text-white" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-white border-2 border-[#128C7E]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm tracking-wide">Next Edge Digital</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <p className="text-white/75 text-[11px] tracking-wide">Online · Replies instantly</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  data-testid="button-whatsapp-close"
                  aria-label="Close"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Chat bubble */}
            <div className="px-5 pt-4 pb-2">
              <div
                className="inline-block px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-foreground/80 leading-relaxed max-w-[85%]"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                Hi there! How can we help you grow your business today?
              </div>
            </div>

            {/* Quick replies */}
            <div className="px-4 pb-4 space-y-2 mt-2">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/30 px-1 mb-3">
                Quick Replies
              </p>
              {QUICK_MESSAGES.map((msg, i) => (
                <motion.button
                  key={msg.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.2 }}
                  onClick={() => openChat(msg.label)}
                  data-testid={`button-whatsapp-msg-${i}`}
                  className="group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(37,211,102,0.08)";
                    e.currentTarget.style.borderColor = "rgba(37,211,102,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  }}
                >
                  <span className="text-base">{msg.icon}</span>
                  <span className="flex-1 text-foreground/70 group-hover:text-foreground transition-colors text-[13px]">
                    {msg.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-foreground/20 group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-all" />
                </motion.button>
              ))}

              {/* Open WhatsApp CTA */}
              <button
                onClick={() => openChat()}
                data-testid="button-whatsapp-open"
                className="w-full mt-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.01]"
                style={{
                  background: "linear-gradient(135deg, #128C7E, #25D366)",
                  boxShadow: "0 4px 16px rgba(37,211,102,0.25)",
                }}
              >
                <SiWhatsapp className="w-4 h-4" />
                Open WhatsApp Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button row */}
      <div className="flex items-center gap-3">
        {/* "Let's Talk" label */}
        <AnimatePresence>
          {(hovered || open) && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.92 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="px-4 py-2 rounded-full text-sm font-semibold text-white pointer-events-none select-none whitespace-nowrap"
              style={{
                background: "rgba(12,12,14,0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              }}
            >
              {open ? "Close chat" : "Let's Talk"}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main button */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          data-testid="button-whatsapp-toggle"
          data-cursor-text="CHAT"
          aria-label="Contact us on WhatsApp"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #128C7E 0%, #25D366 100%)",
            boxShadow: open
              ? "0 0 0 0 transparent"
              : "0 8px 24px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)",
            }}
          />

          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <X className="w-6 h-6 text-white" />
              </motion.span>
            ) : (
              <motion.span
                key="icon"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <SiWhatsapp className="w-6 h-6 text-white" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Pulse ring (only when closed) */}
          {!open && (
            <>
              <motion.span
                animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-[#25D366]"
              />
              <motion.span
                animate={{ scale: [1, 1.35], opacity: [0.3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                className="absolute inset-0 rounded-full bg-[#25D366]"
              />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
