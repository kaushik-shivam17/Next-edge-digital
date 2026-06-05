import { motion } from "framer-motion";
import { Phone, CheckCircle2, XCircle, ArrowRight, TrendingUp, Clock, Globe, Zap } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SharedNav } from "@/components/SharedNav";
import { BookCall } from "@/components/sections/BookCall";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { BackToTop } from "@/components/BackToTop";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { usePageSEO } from "@/hooks/usePageSEO";

const painPoints = [
  "You're paying a receptionist ₹25,000/month who misses calls on lunch break",
  "Every missed call is a lead your competitor picks up instead",
  "Your team wastes 2–3 hours/day on repetitive FAQ calls",
  "You have zero data on what callers actually ask for",
  "International leads call outside business hours and never call back",
];

const features = [
  {
    icon: Clock,
    title: "24/7/365 Call Answering",
    desc: "Never miss another call. Our AI picks up in under 1 second — at 3 AM on a Sunday, during your vacation, always.",
    stat: "< 1s pickup",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    desc: "Speaks Hindi, English, Arabic, Tamil, Marathi and 40+ languages. Your caller gets served in their language, instantly.",
    stat: "40+ languages",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Lead Qualification",
    desc: "AI scores every caller, extracts budget, timeline, and intent — and pushes hot leads straight to your sales team's WhatsApp.",
    stat: "3x conversion",
  },
  {
    icon: Zap,
    title: "Instant CRM Sync",
    desc: "Every call logged, transcribed, and synced to your CRM automatically. Full call recordings, summaries, and next steps — without touching a keyboard.",
    stat: "100% logged",
  },
];

const objections = [
  { q: "Will it sound robotic?", a: "Our AI voices are trained on real human speech. 94% of callers in beta tests couldn't tell it wasn't human." },
  { q: "What if someone has a complex issue?", a: "Complex cases are instantly escalated to your team with a full brief — the AI hands off gracefully, never drops the ball." },
  { q: "How long to set up?", a: "72 hours. We handle everything: voice cloning, script building, CRM integration, testing." },
  { q: "What's the ROI?", a: "Our clients recover the monthly cost within the first 4–6 captured leads they would have otherwise missed." },
];

const lossCalc = [
  { label: "Avg. calls missed per day", value: "12" },
  { label: "% that become leads", value: "35%" },
  { label: "Avg. deal value", value: "₹18,000" },
  { label: "Monthly revenue lost", value: "₹2.3L+" },
];

export function AiCallPage() {
  usePageSEO({
    title: "AI Call Management | 24/7 Intelligent Call Handling — Core Elite Digital",
    description: "Never miss a lead again. Our AI Call Management system answers every call in under 1 second, qualifies leads in real time, and syncs everything to your CRM. 24/7, 40+ languages.",
    keywords: "AI call management, automated call answering, AI receptionist, lead qualification, CRM integration, 24/7 call handling India",
    canonical: "https://coreelitedigital.com/ai/call-management",
  });

  return (
    <div className="relative min-h-screen bg-background text-foreground dark overflow-x-hidden">
      <NoiseOverlay />
      <SharedNav />
      <FloatingWhatsApp />
      <BackToTop />

      {/* HERO — Pattern interrupt opening */}
      <section className="relative pt-28 pb-16 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(202,163,83,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_0%_100%,rgba(239,68,68,0.05),transparent)]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(to right, rgba(202,163,83,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(202,163,83,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="container px-4 md:px-6 relative z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-3 mb-6">
              <a href="/" className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors">Home</a>
              <span className="text-foreground/15">·</span>
              <a href="/ai-solutions" className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors">AI Solutions</a>
              <span className="text-foreground/15">·</span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Call Management</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-red-400">Right now, your phone is losing you money</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6">
              Every Missed Call<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #CAA353 100%)" }}>
                Is a Paid Lead
              </span><br />
              Handed to a Rival.
            </h1>

            <p className="text-foreground/55 text-base md:text-xl leading-relaxed max-w-2xl mb-10">
              Our AI Call Management system answers every single call in under 1 second — qualifies leads, books appointments, answers FAQs, and syncs to your CRM. <strong className="text-foreground/90">24/7. Zero humans needed.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/918218628232?text=I%20want%20to%20deploy%20AI%20Call%20Management%20for%20my%20business"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-sm tracking-widest uppercase"
                style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e", clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
              >
                <Phone className="w-4 h-4" />
                Deploy My AI Phone System
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/918218628232?text=${encodeURIComponent("Hi! I'd like to see a live demo of the AI Phone System.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-sm tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                See a Live Demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LOSS CALCULATOR — Make them feel the pain */}
      <section className="py-16 md:py-24 border-t border-white/5 relative">
        <div className="container px-4 md:px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-red-400 mb-3">The Cost of Inaction</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-12">
              What Unanswered Calls<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353, #F0C97A)" }}>Actually Cost You.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {lossCalc.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-5 rounded-2xl"
                  style={{ background: i === 3 ? "rgba(202,163,83,0.08)" : "rgba(255,255,255,0.02)", border: i === 3 ? "1px solid rgba(202,163,83,0.25)" : "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className={`text-2xl md:text-3xl font-black mb-1 ${i === 3 ? "text-primary" : "text-foreground"}`}>{item.value}</div>
                  <div className="text-xs text-foreground/40 leading-snug">{item.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 md:p-8 rounded-2xl" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)" }}>
              <p className="text-sm font-bold tracking-[0.15em] uppercase text-red-400 mb-4">Without AI Call Management, you're probably doing this:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {painPoints.map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/60">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES — The solution */}
      <section className="py-16 md:py-24 border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(202,163,83,0.04),transparent)]" />
        <div className="container px-4 md:px-6 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">What You Get</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-12">
              Your Smartest Employee.<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353, #F0C97A)" }}>Never Sleeps. Never Quits.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="p-7 rounded-2xl relative group"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(202,163,83,0.07), transparent)" }} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(202,163,83,0.1)", border: "1px solid rgba(202,163,83,0.18)" }}>
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-black tracking-widest uppercase text-primary px-2 py-1 rounded-md" style={{ background: "rgba(202,163,83,0.08)" }}>{f.stat}</span>
                  </div>
                  <h3 className="text-lg font-black mb-2">{f.title}</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* What's included checklist */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-10 p-8 rounded-2xl" style={{ background: "rgba(202,163,83,0.04)", border: "1px solid rgba(202,163,83,0.12)" }}>
            <p className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-5">Everything included in your deployment:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Custom AI voice that sounds like your brand", "Unlimited concurrent calls (no busy signal, ever)", "Live call transcription & sentiment analysis", "Auto-booking via Google Calendar / Calendly", "WhatsApp escalation for hot leads", "Weekly performance dashboard", "Multi-location & department routing", "Dedicated 72-hour setup & onboarding"].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/70">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* OBJECTIONS — Kill every excuse */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container px-4 md:px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">Straight Answers</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-10">Questions We Know<br />You're Already Thinking.</h2>
            <div className="flex flex-col gap-4">
              {objections.map((o, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="font-bold text-foreground mb-2">{o.q}</p>
                  <p className="text-sm text-foreground/55 leading-relaxed">{o.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* URGENCY CTA */}
      <section className="py-16 md:py-24 border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(202,163,83,0.06),transparent)]" />
        <div className="container px-4 md:px-6 max-w-3xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(202,163,83,0.08)", border: "1px solid rgba(202,163,83,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-primary">Only 3 deployment slots open this month</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5">
              Stop Bleeding Leads.<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353, #F0C97A)" }}>Start Today.</span>
            </h2>
            <p className="text-foreground/50 mb-8 text-lg">72-hour deployment. Full setup handled by us. No technical knowledge needed.</p>
            <a
              href="https://wa.me/918218628232?text=I%20want%20to%20deploy%20AI%20Call%20Management%20for%20my%20business"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 font-black text-sm tracking-widest uppercase"
              style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e", clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" }}
            >
              <Phone className="w-5 h-5" />
              Claim My Slot on WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="mt-4 text-xs text-foreground/30">We reply within 1 hour. No sales pitch. Straight to the point.</p>
          </motion.div>
        </div>
      </section>

      <BookCall />
      <Footer />
    </div>
  );
}
