import { motion } from "framer-motion";
import { Globe, CheckCircle2, ArrowRight, TrendingUp, Zap, Target, RefreshCw } from "lucide-react";
import { WA } from "@/lib/whatsapp";
import { SEO } from "@/components/SEO";
import { SharedNav } from "@/components/SharedNav";
import { BookCall } from "@/components/sections/BookCall";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { BackToTop } from "@/components/BackToTop";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { usePageSEO } from "@/hooks/usePageSEO";

const features = [
  { icon: Zap, title: "Launched in Days, Not Months", desc: "Traditional agencies take 3–6 months. We deploy your AI-optimized site in 7–14 days. Full design, development, copy, and SEO — shipped fast without compromising quality." },
  { icon: Target, title: "Self-Optimizing Conversion Rate", desc: "AI runs continuous A/B tests on headlines, CTAs, layouts, and offers. Every week, the highest-converting version wins. Your site gets smarter automatically — without you touching it." },
  { icon: RefreshCw, title: "Dynamic Content Personalization", desc: "First-time visitor from Instagram? Returning user who clicked an ad? Your site shows them different content, offers, and CTAs — personalized in real time to maximize conversions." },
  { icon: TrendingUp, title: "AI SEO That Compounds", desc: "AI continuously optimizes your content, meta structure, internal links, and page speed. Your rankings improve month over month — automatically, without writing a single blog post manually." },
];

const timeline = [
  { day: "Day 1–2", task: "Discovery & Strategy", desc: "Brand audit, competitor analysis, conversion goal mapping" },
  { day: "Day 3–5", task: "Design & Copy", desc: "AI-assisted UX design, persuasive copywriting, mobile-first layouts" },
  { day: "Day 6–10", task: "Build & Integrate", desc: "Development, CRM integration, analytics setup, speed optimization" },
  { day: "Day 11–14", task: "Test & Launch", desc: "QA across 40+ devices, SEO validation, go-live & handover" },
];

const conversionKillers = [
  "Your site takes 4+ seconds to load — visitors leave in 3",
  "No heatmap data — you're guessing what visitors want",
  "Generic hero copy that sounds like every other site",
  "No A/B testing — you're leaving conversions on the table",
  "Not optimized for mobile — 70%+ of traffic is mobile",
  "Outdated SEO — built for 2018, not 2026",
];

export function AiSitePage() {
  usePageSEO({
    title: "AI Site Building | Self-Optimizing Websites That Convert — Core Elite Digital",
    description: "Launched in 7–14 days. Self-optimizing AI websites that run continuous A/B tests, personalize content for each visitor, and improve conversion rates automatically — every single week.",
    keywords: "AI website builder, conversion rate optimization, self-optimizing website, AI web design India, high-converting website",
    canonical: "https://coreelitedigital.com/ai/site-building",
  });

  return (
    <div className="relative min-h-screen bg-background text-foreground dark overflow-x-hidden">
      <NoiseOverlay />
      <SharedNav />
      <FloatingWhatsApp />
      <BackToTop />

      {/* HERO */}
      <section className="relative pt-28 pb-16 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(202,163,83,0.09),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_80%,rgba(59,130,246,0.05),transparent)]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(to right, rgba(202,163,83,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(202,163,83,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="container px-4 md:px-6 relative z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-3 mb-6">
              <a href="/" className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors">Home</a>
              <span className="text-foreground/15">·</span>
              <a href="/ai-solutions" className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors">AI Solutions</a>
              <span className="text-foreground/15">·</span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">AI Site Building</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: "rgba(202,163,83,0.08)", border: "1px solid rgba(202,163,83,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary">97% of websites fail to convert. Is yours one of them?</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6">
              A Website That<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353 0%, #F0C97A 100%)" }}>
                Gets Smarter
              </span><br />
              Every Week.
            </h1>

            <p className="text-foreground/55 text-base md:text-xl leading-relaxed max-w-2xl mb-10">
              Launched in 7–14 days, our AI-built websites run <strong className="text-foreground/90">continuous A/B tests</strong>, personalize content for each visitor, auto-optimize for SEO, and improve their own conversion rate — week after week, without any manual input.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={WA.aiSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-sm tracking-widest uppercase"
                style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e", clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
              >
                <Globe className="w-4 h-4" />
                Build My AI Site
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/portfolio" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-sm tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                See Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONVERSION KILLERS */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container px-4 md:px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-red-400 mb-3">Is Your Website Killing Your Business?</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">Signs Your Current Site<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353, #F0C97A)" }}>Is Bleeding Revenue.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {conversionKillers.map((killer, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)" }}>
                  <span className="text-red-500 font-black text-lg leading-none mt-0.5">✕</span>
                  <p className="text-sm text-foreground/65">{killer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 md:py-24 border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(202,163,83,0.04),transparent)]" />
        <div className="container px-4 md:px-6 max-w-4xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">14-Day Launch Process</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">From Zero to Live<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353, #F0C97A)" }}>In Two Weeks.</span></h2>
            <div className="flex flex-col gap-4">
              {timeline.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }} className="flex gap-5 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-xs" style={{ background: "rgba(202,163,83,0.12)", border: "1px solid rgba(202,163,83,0.25)", color: "#CAA353" }}>{i + 1}</div>
                    {i < timeline.length - 1 && <div className="w-px flex-1 mt-2" style={{ background: "rgba(202,163,83,0.15)", minHeight: 24 }} />}
                  </div>
                  <div className="pb-6 pt-1">
                    <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary mb-1">{t.day}</div>
                    <div className="font-black text-lg mb-1">{t.task}</div>
                    <div className="text-sm text-foreground/50">{t.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="container px-4 md:px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">What Makes It Different</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">Not Just a Website.<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353, #F0C97A)" }}>A Conversion Machine.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.1, duration: 0.6 }} className="p-7 rounded-2xl group relative" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(202,163,83,0.07), transparent)" }} />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(202,163,83,0.1)", border: "1px solid rgba(202,163,83,0.18)" }}>
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-black mb-2">{f.title}</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-10 p-8 rounded-2xl" style={{ background: "rgba(202,163,83,0.04)", border: "1px solid rgba(202,163,83,0.12)" }}>
            <p className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-5">Your AI site package includes:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Custom design (no templates)", "Conversion copywriting by senior strategists", "Mobile-first, 95+ PageSpeed score guaranteed", "AI-powered A/B testing engine (lifetime)", "Heatmap & session recording integration", "CRM & WhatsApp lead capture integration", "Automated SEO optimization (monthly)", "12-month performance guarantee"].map((item) => (
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
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5">Your Website Should Be<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #CAA353, #F0C97A)" }}>Working For You. Not Against You.</span></h2>
            <p className="text-foreground/50 mb-8 text-lg">14-day delivery. Guaranteed PageSpeed 95+. AI that optimizes every week. No excuses, just results.</p>
            <a
              href={WA.aiSite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 font-black text-sm tracking-widest uppercase"
              style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e", clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" }}
            >
              <Globe className="w-5 h-5" />
              Get My AI Website
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="mt-4 text-xs text-foreground/30">Limited slots. Priority given to serious inquiries only.</p>
          </motion.div>
        </div>
      </section>

      <BookCall />
      <Footer />
    </div>
  );
}
