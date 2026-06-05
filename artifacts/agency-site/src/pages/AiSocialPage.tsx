import { motion } from "framer-motion";
import { Bot, CheckCircle2, ArrowRight, Instagram, BarChart3, Sparkles, Calendar } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SharedNav } from "@/components/SharedNav";
import { BookCall } from "@/components/sections/BookCall";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { BackToTop } from "@/components/BackToTop";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { usePageSEO } from "@/hooks/usePageSEO";

const platforms = [
  { name: "Instagram", color: "#E1306C" },
  { name: "Facebook", color: "#1877F2" },
  { name: "LinkedIn", color: "#0A66C2" },
  { name: "Twitter / X", color: "#000000" },
  { name: "YouTube", color: "#FF0000" },
  { name: "Pinterest", color: "#E60023" },
];

const features = [
  { icon: Sparkles, title: "AI Content Generation", desc: "AI creates scroll-stopping captions, carousels, reels scripts, and stories — brand-consistent, trend-aware, and engineered to drive engagement, not just likes." },
  { icon: Calendar, title: "Smart Auto-Scheduling", desc: "AI posts when your audience is most active on each platform. Optimal timing analysis runs continuously, adjusting your schedule as patterns evolve." },
  { icon: Instagram, title: "Engagement Automation", desc: "AI comments, replies to DMs, answers common questions, and engages with your audience in your brand voice — building community while you focus on the business." },
  { icon: BarChart3, title: "Real-Time Strategy Pivot", desc: "AI monitors performance every 6 hours. Underperforming content is replaced. High-performers are replicated. Your strategy gets sharper every single week." },
];

const results = [
  { metric: "Average follower growth", before: "+180/month (manual)", after: "+1,200/month (AI)" },
  { metric: "Content output", before: "3–5 posts/week", after: "14–21 posts/week" },
  { metric: "Engagement rate", before: "1.8% avg", after: "5.4% avg" },
  { metric: "DM response time", before: "6–18 hours", after: "< 30 seconds" },
  { metric: "Monthly time spent", before: "40+ hours", after: "< 2 hours review" },
];

export function AiSocialPage() {
  usePageSEO({
    title: "AI Social Media Management | Dominate Every Feed — Core Elite Digital",
    description: "AI generates, schedules, and posts brand-consistent content across all platforms. Automated engagement, real-time strategy adjustments, and 4× more output than a human team.",
    keywords: "AI social media management, automated social media, AI content creation, social media automation India, Instagram automation",
    canonical: "https://coreelitedigital.com/ai/social-media",
  });

  return (
    <div className="relative min-h-screen bg-background text-foreground dark overflow-x-hidden">
      <NoiseOverlay />
      <SharedNav />
      <FloatingWhatsApp />
      <BackToTop />

      {/* HERO */}
      <section className="relative pt-28 pb-16 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(99,102,241,0.09),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(202,163,83,0.06),transparent)]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(to right, rgba(202,163,83,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(202,163,83,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="container px-4 md:px-6 relative z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-3 mb-6">
              <a href="/" className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors">Home</a>
              <span className="text-foreground/15">·</span>
              <a href="/ai-solutions" className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors">AI Solutions</a>
              <span className="text-foreground/15">·</span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">AI Social Media</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-indigo-400">Your competitor posts 4× more than you. AI is why.</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6">
              Dominate Every Feed.<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #6366f1 0%, #CAA353 60%, #F0C97A 100%)" }}>
                Effortlessly.
              </span>
            </h1>

            <p className="text-foreground/55 text-base md:text-xl leading-relaxed max-w-2xl mb-6">
              AI generates, schedules, and posts brand-consistent content across <strong className="text-foreground/90">6 platforms simultaneously</strong> — analysing performance, adjusting strategy, and engaging your audience in real time. No content team. No agency fees. No burnout.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {platforms.map((p) => (
                <span key={p.name} className="px-3 py-1.5 text-xs font-bold tracking-wider rounded-full" style={{ background: `${p.color}15`, border: `1px solid ${p.color}30`, color: p.color }}>
                  {p.name}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/918218628232?text=I%20want%20AI%20to%20manage%20my%20social%20media"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-sm tracking-widest uppercase"
                style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e", clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
              >
                <Bot className="w-4 h-4" />
                Let AI Run My Social
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href={`https://wa.me/918218628232?text=${encodeURIComponent("Hi! I'd like to see sample AI social media content from Core Elite Digital.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-sm tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                See Sample Content
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RESULTS COMPARISON */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container px-4 md:px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">Average Client Results</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">Manual vs AI Social.<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353, #F0C97A)" }}>The Numbers Don't Lie.</span></h2>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="grid grid-cols-3 p-4" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-xs font-bold tracking-widest uppercase text-foreground/40">Metric</div>
                <div className="text-xs font-bold tracking-widest uppercase text-foreground/40 text-center">Manual / Agency</div>
                <div className="text-xs font-bold tracking-widest uppercase text-primary text-center">Core Elite AI</div>
              </div>
              {results.map((row, i) => (
                <div key={i} className="grid grid-cols-3 p-4 items-center" style={{ borderBottom: i < results.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                  <div className="text-sm font-semibold text-foreground/70">{row.metric}</div>
                  <div className="text-sm text-foreground/40 text-center">{row.before}</div>
                  <div className="text-sm font-bold text-primary text-center">{row.after}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 md:py-24 border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(99,102,241,0.04),transparent)]" />
        <div className="container px-4 md:px-6 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">How It Works</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">One Setup.<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353, #F0C97A)" }}>Perpetual Growth Machine.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.1, duration: 0.6 }} className="p-7 rounded-2xl group relative" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.07), transparent)" }} />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                    <f.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-black mb-2">{f.title}</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-10 p-8 rounded-2xl" style={{ background: "rgba(202,163,83,0.04)", border: "1px solid rgba(202,163,83,0.12)" }}>
            <p className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-5">Full AI social package includes:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Brand voice & tone profiling session", "Competitor analysis & gap identification", "30-day content calendar (AI-generated)", "Reel scripts & visual content briefs", "Hashtag strategy & SEO-optimized captions", "Monthly performance report & strategy review", "Community management & DM automation", "Ad creative generation for paid campaigns"].map((item) => (
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
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5">While You Read This,<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353, #F0C97A)" }}>Your Feed Is Silent.</span></h2>
            <p className="text-foreground/50 mb-8 text-lg">Brands that post consistently 5× outperform those that don't. AI makes that effortless. Starting in 72 hours.</p>
            <a
              href="https://wa.me/918218628232?text=I%20want%20AI%20to%20manage%20my%20social%20media"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 font-black text-sm tracking-widest uppercase"
              style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e", clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" }}
            >
              <Bot className="w-5 h-5" />
              Activate AI Social Now
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="mt-4 text-xs text-foreground/30">No lock-in contracts. Cancel anytime.</p>
          </motion.div>
        </div>
      </section>

      <BookCall />
      <Footer />
    </div>
  );
}
