import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, ChevronRight, Loader2, RotateCcw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

const MAX_INPUT_LENGTH = 2000;
const MAX_HISTORY = 20;

function TypingDots() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-1.5 h-1.5 rounded-full"
            style={{ background: "#CAA353" }}
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
      <span className="text-[11px] text-white/30 tracking-wide">Edge is typing…</span>
    </div>
  );
}

function getQuickReplies(content: string): string[] {
  const lower = content.toLowerCase();

  const hasPricing = /pric|₹|\$|£|aed|cost|budget|plan|retainer|one.time|month/i.test(lower);
  const hasPortfolio = /portfolio|case study|shopspere|finflow|luxe|velocity|cloudsync|wealthwise|project|example|result|conversion/i.test(lower);
  const hasServices = /service|website|social media|seo|brand|design|strategy|development|analytics/i.test(lower);
  const hasBooking = /book|discovery|call|whatsapp|contact|get started|start|reach out/i.test(lower);
  const hasTimeline = /week|timeline|how long|delivery|duration|time/i.test(lower);

  if (hasBooking && !hasPricing) {
    return ["What's the cost?", "See our portfolio", "Tell me about SEO"];
  }
  if (hasPricing && !hasBooking) {
    return ["Book a free call", "What's included?", "How long does it take?"];
  }
  if (hasPortfolio) {
    return ["How much does it cost?", "Book a free call", "What services do you offer?"];
  }
  if (hasTimeline) {
    return ["What's the cost?", "Book a free call", "See our work"];
  }
  if (hasServices && !hasPricing) {
    return ["How much does it cost?", "Book a free call", "How long does it take?"];
  }

  return ["How much does it cost?", "Book a free call", "See our portfolio"];
}

const SUGGESTED = [
  "What services do you offer?",
  "How much does a project cost?",
  "How long does a website take?",
  "Can I see your portfolio?",
  "How do I get started?",
];

const GREETING = `Hi! I'm Edge — nextedgetech's AI assistant. 🤝

I'm here to answer any questions about our services, portfolio, process, or pricing.

How can I help you today?`;

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggested, setShowSuggested] = useState(true);
  const [hasUnread, setHasUnread] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    const sanitized = text.trim().slice(0, MAX_INPUT_LENGTH);
    if (!sanitized || loading) return;
    const text_to_send = sanitized;
    setShowSuggested(false);
    setInput("");
    setLoading(true);

    const userMsg: Message = { role: "user", content: text_to_send };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    const assistantMsg: Message = { role: "assistant", content: "", streaming: true };
    setMessages((prev) => [...prev, assistantMsg]);

    const recentMessages = newMessages.slice(-MAX_HISTORY);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: recentMessages.map(({ role, content }) => ({ role, content: content.slice(0, MAX_INPUT_LENGTH) })),
        }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));
        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.content) {
              full += data.content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: full, streaming: true };
                return updated;
              });
            }
            if (data.done) {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: full, streaming: false };
                return updated;
              });
            }
          } catch {}
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try WhatsApp: **+918218628232**",
          streaming: false,
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
        <AnimatePresence>
          {!open && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onClick={() => setOpen(true)}
              className="relative group flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #1a1506 0%, #0c0c0e 100%)",
                border: "1px solid rgba(202,163,83,0.35)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(202,163,83,0.08)",
              }}
            >
              {/* Animated ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{ boxShadow: ["0 0 0 0 rgba(202,163,83,0.3)", "0 0 0 8px rgba(202,163,83,0)", "0 0 0 0 rgba(202,163,83,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
              />

              {/* Icon */}
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)" }}
              >
                <Sparkles className="w-4 h-4" style={{ color: "#0c0c0e" }} />
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-xs font-bold text-white/90">Ask Edge AI</span>
                <span className="text-[10px] text-white/40 tracking-wide">Site Assistant</span>
              </div>

              {/* Unread dot */}
              {hasUnread && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                  style={{ background: "#F0C97A", boxShadow: "0 0 8px rgba(240,201,122,0.6)" }}
                />
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed bottom-6 left-3 right-3 sm:left-6 sm:right-auto sm:w-[90vw] sm:max-w-[360px] z-50 flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: "rgba(12,12,14,0.97)",
              border: "1px solid rgba(202,163,83,0.2)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
              height: "min(520px, calc(100dvh - 100px))",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)" }}
                >
                  <Sparkles className="w-4 h-4" style={{ color: "#0c0c0e" }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Edge AI</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] text-white/40">nextedgetech Assistant</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setMessages([{ role: "assistant", content: GREETING }]);
                    setShowSuggested(true);
                    setInput("");
                  }}
                  title="Restart conversation"
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-white/50" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <X className="w-3.5 h-3.5 text-white/50" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
              {messages.map((msg, i) => {
                const isLastMsg = i === messages.length - 1;
                const isCompletedAssistant = msg.role === "assistant" && !msg.streaming && i > 0;
                const showChips = isLastMsg && isCompletedAssistant && !loading;
                const quickReplies = showChips ? getQuickReplies(msg.content) : [];

                return (
                  <div key={i}>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                          style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)" }}
                        >
                          <Sparkles className="w-3 h-3" style={{ color: "#0c0c0e" }} />
                        </div>
                      )}
                      <div
                        className="max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                        style={
                          msg.role === "user"
                            ? { background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e", fontWeight: 500, borderBottomRightRadius: "6px" }
                            : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.07)", borderBottomLeftRadius: "6px" }
                        }
                      >
                        {msg.streaming && msg.content === "" ? (
                          <TypingDots />
                        ) : (
                          <>
                            {renderContent(msg.content)}
                            {msg.streaming && (
                              <span className="inline-block w-1.5 h-4 ml-0.5 rounded-sm align-middle animate-pulse" style={{ background: "#CAA353" }} />
                            )}
                          </>
                        )}
                      </div>
                    </motion.div>

                    {/* Quick reply chips */}
                    {showChips && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        className="flex flex-wrap gap-1.5 mt-2 pl-8"
                      >
                        {quickReplies.map((reply, ri) => (
                          <motion.button
                            key={reply}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: 0.2 + ri * 0.07 }}
                            onClick={() => send(reply)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all active:scale-95"
                            style={{
                              background: "rgba(202,163,83,0.08)",
                              border: "1px solid rgba(202,163,83,0.22)",
                              color: "rgba(240,201,122,0.85)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(202,163,83,0.15)";
                              e.currentTarget.style.borderColor = "rgba(202,163,83,0.4)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(202,163,83,0.08)";
                              e.currentTarget.style.borderColor = "rgba(202,163,83,0.22)";
                            }}
                          >
                            <ChevronRight className="w-2.5 h-2.5 flex-shrink-0" />
                            {reply}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}

              {/* Initial suggested questions */}
              {showSuggested && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-1.5 pl-8"
                >
                  {SUGGESTED.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all group"
                      style={{ background: "rgba(202,163,83,0.06)", border: "1px solid rgba(202,163,83,0.15)", color: "rgba(255,255,255,0.6)" }}
                    >
                      <ChevronRight className="w-3 h-3 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" style={{ color: "#CAA353" }} />
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="flex-shrink-0 px-3 py-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                  placeholder="Ask anything about nextedgetech…"
                  maxLength={MAX_INPUT_LENGTH}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-30"
                  style={{ background: input.trim() ? "linear-gradient(135deg, #CAA353, #F0C97A)" : "rgba(255,255,255,0.08)" }}
                >
                  {loading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: input.trim() ? "#0c0c0e" : "rgba(255,255,255,0.4)" }} />
                  ) : (
                    <Send className="w-3.5 h-3.5" style={{ color: input.trim() ? "#0c0c0e" : "rgba(255,255,255,0.4)" }} />
                  )}
                </button>
              </div>
              <p className="text-center text-[9px] text-white/15 mt-2 tracking-wide">
                Powered by nextedgetech · AI may make mistakes
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function renderContent(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} style={{ color: "#F0C97A", fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}
