import { motion } from "framer-motion";
import { WA } from "@/lib/whatsapp";
import { MessageSquare, CheckCircle2, ArrowRight, Users, TrendingUp, Repeat, Bot } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SharedNav } from "@/components/SharedNav";
import { BookCall } from "@/components/sections/BookCall";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { BackToTop } from "@/components/BackToTop";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { usePageSEO } from "@/hooks/usePageSEO";

const stats = [
  { value: "98%", label: "WhatsApp open rate vs 22% email" },
  { value: "3 min", label: "Avg. response time for customers" },
  { value: "5×", label: "More conversions vs cold calls" },
  { value: "₹0", label: "Extra staff needed" },
];

const automations = [
  { icon: Bot, title: "Instant Lead Response", desc: "The moment a lead messages you, AI responds — asks qualifying questions, captures name, budget, and intent. Hot leads are flagged and pushed to you in real time." },
  { icon: Repeat, title: "Follow-Up Sequences", desc: "AI sends timed, personalized follow-ups to every cold lead. Day 1, Day 3, Day 7 — with context from their previous messages. Zero manual effort." },
  { icon: Users, title: "Group Broadcast Campaigns", desc: "Send laser-targeted broadcast campaigns to segmented lists. AI personalizes every message using the recipient's name, industry, and purchase history." },
  { icon: TrendingUp, title: "Sales Pipeline Automation", desc: "AI moves leads through your funnel automatically — from first message to booked appointment to closed deal. Full visibility in your dashboard, synced to your CRM." },
];

const comparison = [
  { label: "Response time", human: "2–8 hours (when awake)", ai: "< 3 seconds, 24/7" },
  { label: "Concurrent chats", human: "3–5 max", ai: "Unlimited" },
  { label: "Follow-up rate", human: "~40% (forgotten)", ai: "100% automated" },
  { label: "Monthly cost", human: "₹25,000–₹40,000", ai: "Fraction of that" },
  { label: "Language support", human: "1–2 languages", ai: "40+ languages" },
  { label: "Availability", human: "8 hours/day, 5 days", ai: "24/7/365" },
];

export function AiWhatsAppPage() {
  usePageSEO({
    title: "AI WhatsApp Management | Automated Sales on WhatsApp — Core Elite Digital",
    description: "Turn WhatsApp into your highest-converting sales channel. AI responds instantly, follows up automatically, and closes deals while you sleep. 24/7, 40+ languages, zero extra staff.",
    keywords: "AI WhatsApp management, WhatsApp automation, WhatsApp business API, automated WhatsApp sales, WhatsApp chatbot India",
    canonical: "https://coreelitedigital.com/ai/whatsapp",
  });

  return (
    <div className="relative min-h-screen bg-background text-foreground dark overflow-x-hidden">
      <NoiseOverlay />
      <SharedNav />
      <FloatingWhatsApp />
      <BackToTop />

      {/* HERO */}
      <section className="relative pt-28 pb-16 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(37,211,102,0.07),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(202,163,83,0.06),transparent)]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(to right, rgba(202,163,83,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(202,163,83,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="container px-4 md:px-6 relative z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-3 mb-6">
              <a href="/" className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors">Home</a>
              <span className="text-foreground/15">·</span>
              <a href="/ai-solutions" className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors">AI Solutions</a>
              <span className="text-foreground/15">·</span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">WhatsApp AI</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#25D366" }} />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: "#25D366" }}>WhatsApp has a 98% open rate. Are you using it?</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6">
              Your Business Runs<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #25D366 0%, #CAA353 60%, #F0C97A 100%)" }}>
                On WhatsApp Now.
              </span><br />
              While You Sleep.
            </h1>

            <p className="text-foreground/55 text-base md:text-xl leading-relaxed max-w-2xl mb-10">
              A fully autonomous AI brain running on your WhatsApp Business. It responds in 3 seconds, qualifies leads, books appointments, sends follow-ups, and nurtures cold leads back to life — with zero human involvement.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={WA.aiWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-sm tracking-widest uppercase"
                style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e", clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
              >
                <MessageSquare className="w-4 h-4" />
                Automate My WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href={WA.aiWhatsAppDemo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-sm tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                See It in Action
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS — Social proof numbers */}
      <section className="py-12 border-t border-white/5">
        <div className="container px-4 md:px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="p-5 rounded-2xl text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-2xl md:text-3xl font-black text-primary mb-1">{s.value}</div>
                <div className="text-xs text-foreground/40 leading-snug">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON — The killer table */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container px-4 md:px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">The Reality Check</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">Human vs AI WhatsApp.<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353, #F0C97A)" }}>There's No Contest.</span></h2>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="grid grid-cols-3 p-4" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-xs font-bold tracking-widest uppercase text-foreground/40">Category</div>
                <div className="text-xs font-bold tracking-widest uppercase text-foreground/40 text-center">Human Team</div>
                <div className="text-xs font-bold tracking-widest uppercase text-primary text-center">Core Elite AI</div>
              </div>
              {comparison.map((row, i) => (
                <div key={i} className="grid grid-cols-3 p-4 items-center" style={{ borderBottom: i < comparison.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                  <div className="text-sm font-semibold text-foreground/70">{row.label}</div>
                  <div className="text-sm text-foreground/40 text-center">{row.human}</div>
                  <div className="text-sm font-bold text-primary text-center">{row.ai}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AUTOMATIONS */}
      <section className="py-16 md:py-24 border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(37,211,102,0.03),transparent)]" />
        <div className="container px-4 md:px-6 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">The Automation Stack</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">Everything Running<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353, #F0C97A)" }}>Without You Lifting a Finger.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {automations.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.1, duration: 0.6 }} className="p-7 rounded-2xl group relative" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,211,102,0.05), transparent)" }} />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.15)" }}>
                    <a.icon className="w-5 h-5" style={{ color: "#25D366" }} />
                  </div>
                  <h3 className="text-lg font-black mb-2">{a.title}</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-10 p-8 rounded-2xl" style={{ background: "rgba(202,163,83,0.04)", border: "1px solid rgba(202,163,83,0.12)" }}>
            <p className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-5">Full deployment includes:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["WhatsApp Business API official setup", "Custom AI persona & tone of voice", "Lead capture forms embedded in chat", "Payment link collection & reminders", "Catalogue & product query automation", "Review & feedback request sequences", "Multi-agent handoff for complex queries", "Analytics dashboard with conversion tracking"].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/70">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(202,163,83,0.06),transparent)]" />
        <div className="container px-4 md:px-6 max-w-3xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5">Your Competitor Just<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353, #F0C97A)" }}>Deployed This Yesterday.</span></h2>
            <p className="text-foreground/50 mb-8 text-lg">Every day you wait is another day of missed follow-ups, lost leads, and revenue walking out the door. Setup in 72 hours.</p>
            <a
              href={WA.aiWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 font-black text-sm tracking-widest uppercase"
              style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e", clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" }}
            >
              <MessageSquare className="w-5 h-5" />
              Start on WhatsApp Now
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <BookCall />
      <Footer />
    </div>
  );
}
