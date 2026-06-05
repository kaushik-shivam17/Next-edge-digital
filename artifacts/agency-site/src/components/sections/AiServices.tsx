import { useRef, MouseEvent, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, MessageSquare, Bot, Globe, ArrowRight, Zap, Shield, Clock,
  Check, X, MessageCircle,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { scrollToSection } from "@/lib/scrollTo";
import { WA } from "@/lib/whatsapp";

const WHATSAPP_URL = WA.quote;

type CurrencyKey = "INR" | "USD" | "AED" | "SGD" | "GBP";
const CURRENCIES: Record<CurrencyKey, { symbol: string; label: string; flag: string; rate: number }> = {
  INR: { symbol: "₹", label: "INR", flag: "🇮🇳", rate: 1 },
  USD: { symbol: "$", label: "USD", flag: "🇺🇸", rate: 0.012 },
  AED: { symbol: "AED", label: "AED", flag: "🇦🇪", rate: 0.044 },
  SGD: { symbol: "S$", label: "SGD", flag: "🇸🇬", rate: 0.016 },
  GBP: { symbol: "£", label: "GBP", flag: "🇬🇧", rate: 0.0097 },
};

function detectCurrency(): CurrencyKey {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") return "INR";
    if (tz === "Asia/Dubai" || tz === "Asia/Muscat") return "AED";
    if (tz === "Asia/Singapore") return "SGD";
    if (tz === "Europe/London") return "GBP";
    const lang = navigator.language || "";
    if (lang.includes("IN")) return "INR";
    if (lang.includes("AE")) return "AED";
    if (lang.includes("SG")) return "SGD";
    if (lang.includes("GB")) return "GBP";
  } catch (_) {}
  return "USD";
}

function formatPrice(amountINR: number, currency: CurrencyKey): string {
  const { symbol, rate } = CURRENCIES[currency];
  const converted = Math.round(amountINR * rate);
  if (currency === "INR") return `${symbol}${converted.toLocaleString("en-IN")}`;
  if (currency === "AED") return `${symbol} ${converted.toLocaleString()}`;
  return `${symbol}${converted.toLocaleString()}`;
}

type ServicePricing = {
  planName: string;
  baseINR: number | null;
  billingNote: string;
  custom: boolean;
  features: string[];
  highlight?: boolean;
};

const aiServices = [
  {
    id: "ai-call",
    icon: Phone,
    number: "01",
    title: "AI Call Management",
    tagline: "Never miss a lead. Ever.",
    description:
      "Our intelligent AI handles every inbound call, qualifies leads in real time, books appointments, answers FAQs, and syncs everything to your CRM — 24 hours a day, 7 days a week, in multiple languages.",
    tags: ["24/7 Call Handling", "Lead Qualification", "CRM Sync", "Multi-Language"],
    glow: "rgba(202,163,83,0.12)",
    border: "rgba(202,163,83,0.25)",
    pricing: {
      planName: "AI Call Agent",
      baseINR: 3500,
      billingNote: "per month · scales with call volume",
      custom: false,
      highlight: true,
      features: [
        "24/7 automated inbound call handling",
        "Intelligent lead qualification engine",
        "Appointment booking & calendar sync",
        "CRM integration & live data sync",
        "Multi-language support",
        "Handles unlimited concurrent calls",
        "Monthly performance report",
        "Onboarded & live in 3–5 days",
      ],
    } as ServicePricing,
  },
  {
    id: "ai-whatsapp",
    icon: MessageSquare,
    number: "02",
    title: "AI WhatsApp Management",
    tagline: "Your business, always online.",
    description:
      "A fully automated AI brain running on your WhatsApp. It responds instantly to inquiries, sends follow-ups, handles support, collects payments, and nurtures leads — all while you sleep.",
    tags: ["Instant Responses", "Automated Follow-ups", "Booking & Payments", "Sales Automation"],
    glow: "rgba(37,211,102,0.08)",
    border: "rgba(37,211,102,0.2)",
    pricing: {
      planName: "AI WhatsApp Agent",
      baseINR: 2200,
      billingNote: "per month · scales with message volume",
      custom: false,
      highlight: true,
      features: [
        "Instant 24/7 automated responses",
        "Lead qualification & scoring",
        "Automated follow-up sequences",
        "Payment collection & invoicing",
        "CRM & calendar integration",
        "Custom objection handling scripts",
        "Monthly performance report",
        "Onboarded & live in 3–5 days",
      ],
    } as ServicePricing,
  },
  {
    id: "ai-social",
    icon: Bot,
    number: "03",
    title: "AI Social Media Management",
    tagline: "Dominate every feed, effortlessly.",
    description:
      "AI generates, schedules, and posts brand-consistent content across all platforms. It analyzes performance, adjusts strategy in real time, and engages with your audience — scaling your presence without a team.",
    tags: ["AI Content Creation", "Auto-Scheduling", "Multi-Platform", "Engagement AI"],
    glow: "rgba(99,102,241,0.1)",
    border: "rgba(99,102,241,0.2)",
    pricing: {
      planName: "AI Social Suite",
      baseINR: null,
      billingNote: "custom quote · based on platforms & volume",
      custom: true,
      features: [
        "AI content creation & brand copywriting",
        "Auto-scheduling across all platforms",
        "Multi-platform management (6+ channels)",
        "Engagement AI & community management",
        "Trend monitoring & real-time strategy",
        "Performance analytics & monthly reporting",
        "Dedicated account manager",
        "Free discovery call to scope your package",
      ],
    } as ServicePricing,
  },
  {
    id: "ai-site",
    icon: Globe,
    number: "04",
    title: "AI Site Building",
    tagline: "Websites that build themselves.",
    description:
      "AI-powered website creation that launches in days, not months. Self-optimizing landing pages, automated A/B testing, dynamic content personalization, and AI-driven conversion rate optimization — continuously improving.",
    tags: ["Rapid Deployment", "Self-Optimizing", "A/B Testing AI", "Conversion AI"],
    glow: "rgba(202,163,83,0.12)",
    border: "rgba(202,163,83,0.25)",
    pricing: {
      planName: "AI Website Package",
      baseINR: 6000,
      billingNote: "one-time · AI maintenance available from ₹2,200/mo",
      custom: false,
      highlight: true,
      features: [
        "Full custom AI-powered website design & build",
        "Self-optimizing landing pages",
        "Automated A/B testing setup",
        "AI-driven conversion rate optimization",
        "Mobile-first & SEO optimised",
        "Delivered in 7–14 days",
        "30-day post-launch support included",
        "Optional: add AI WhatsApp/Call from ₹2,200/mo",
      ],
    } as ServicePricing,
  },
];

const overallStats = [
  { icon: Clock, value: "24/7", label: "Always Active" },
  { icon: Zap, value: "< 1s", label: "Response Time" },
  { icon: Shield, value: "100%", label: "Automated" },
];

function AiServiceCard({
  service,
  index,
  isSelected,
  onClick,
}: {
  service: typeof aiServices[0];
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.015)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="group relative flex flex-col h-full p-6 md:p-10 rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: isSelected ? "rgba(202,163,83,0.06)" : "rgba(255,255,255,0.02)",
          border: isSelected ? "1px solid rgba(202,163,83,0.55)" : `1px solid ${service.border}`,
          transition: "transform 0.15s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease",
          transformStyle: "preserve-3d",
          willChange: "transform",
          boxShadow: isSelected ? "0 0 40px rgba(202,163,83,0.12)" : "none",
        }}
      >
        {/* Glow bg */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${service.glow}, transparent)`,
            opacity: isSelected ? 1 : 0,
          }}
        />
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${service.glow}, transparent)` }}
        />

        {/* Selected indicator */}
        {isSelected && (
          <div
            className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "rgba(202,163,83,0.15)", border: "1px solid rgba(202,163,83,0.5)" }}
          >
            <div className="w-2 h-2 rounded-full" style={{ background: "#CAA353" }} />
          </div>
        )}

        {/* Number top-right */}
        <span
          className="absolute top-8 right-8 text-6xl font-black leading-none pointer-events-none select-none"
          style={{ color: "rgba(255,255,255,0.03)" }}
        >
          {service.number}
        </span>

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-500 relative z-10"
          style={{
            background: `linear-gradient(135deg, rgba(202,163,83,0.15), rgba(202,163,83,0.05))`,
            border: "1px solid rgba(202,163,83,0.25)",
          }}
        >
          <service.icon className="w-6 h-6 text-primary" />
        </div>

        {/* Title */}
        <h3
          className="text-xl md:text-2xl font-black mb-1 relative z-10 transition-colors duration-300"
          style={{ color: isSelected ? "#F0C97A" : undefined }}
        >
          {service.title}
        </h3>

        {/* Tagline */}
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4 relative z-10" style={{ color: "#CAA353" }}>
          {service.tagline}
        </p>

        {/* Description */}
        <p className="text-foreground/50 text-sm leading-relaxed mb-7 relative z-10 flex-1">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 relative z-10 mb-7">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md"
              style={{ background: "rgba(202,163,83,0.08)", border: "1px solid rgba(202,163,83,0.18)", color: "rgba(202,163,83,0.7)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div
          className="group/btn relative z-10 flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase transition-colors duration-300"
          style={{ color: isSelected ? "#CAA353" : "rgba(255,255,255,0.35)" }}
        >
          {isSelected ? "Hide Pricing" : "See Pricing"}
          <motion.div animate={{ rotate: isSelected ? 90 : 0 }} transition={{ duration: 0.25 }}>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>
        </div>

        {/* Animated border on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${service.border}` }}
        />
      </div>
    </motion.div>
  );
}

function ServicePricingPanel({
  service,
  currency,
  setCurrency,
}: {
  service: typeof aiServices[0];
  currency: CurrencyKey;
  setCurrency: (k: CurrencyKey) => void;
}) {
  const p = service.pricing;
  const priceStr = p.baseINR != null ? formatPrice(p.baseINR, currency) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg, rgba(202,163,83,0.08) 0%, rgba(10,10,12,1) 60%)",
        border: "1px solid rgba(202,163,83,0.35)",
        boxShadow: "0 0 60px rgba(202,163,83,0.08)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(202,163,83,0.07),transparent)] pointer-events-none" />

      <div className="relative z-10 p-7 md:p-10">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(202,163,83,0.15)", border: "1px solid rgba(202,163,83,0.3)" }}
            >
              <service.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-primary mb-0.5">Pricing</p>
              <h4 className="font-black text-lg leading-tight" style={{ color: "#F0C97A" }}>{p.planName}</h4>
            </div>
          </div>

          {/* Currency switcher */}
          <div
            className="inline-flex items-center gap-1 p-1 rounded-xl flex-wrap"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {(Object.keys(CURRENCIES) as CurrencyKey[]).map((k) => {
              const c = CURRENCIES[k];
              const selected = currency === k;
              return (
                <button
                  key={k}
                  onClick={() => setCurrency(k)}
                  className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-bold tracking-widest uppercase transition-all duration-200 whitespace-nowrap"
                  style={{
                    color: selected ? "#0c0c0e" : "rgba(255,255,255,0.35)",
                    background: selected ? "linear-gradient(135deg, #CAA353, #F0C97A)" : "transparent",
                  }}
                >
                  <span className="text-xs leading-none">{c.flag}</span>
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Price + features */}
          <div>
            <div className="mb-6">
              {p.custom ? (
                <>
                  <p className="text-4xl font-black tracking-tight text-foreground/80">Custom</p>
                  <p className="text-[10px] text-foreground/35 mt-1.5 tracking-wide">{p.billingNote}</p>
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-semibold text-foreground/35 uppercase tracking-widest">from</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${currency}-${service.id}`}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="text-4xl md:text-5xl font-black tracking-tight"
                        style={{ color: "#F0C97A" }}
                      >
                        {priceStr}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <p className="text-[10px] text-foreground/35 mt-1.5 tracking-wide">{p.billingNote}</p>
                  {currency !== "INR" && (
                    <p className="text-[10px] text-foreground/20 mt-1 tracking-wide">Exchange rates are approximate.</p>
                  )}
                </>
              )}
            </div>

            <div className="h-px mb-6" style={{ background: "rgba(202,163,83,0.15)" }} />

            <ul className="space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <Check className="flex-shrink-0 mt-[3px] text-primary" style={{ width: 13, height: 13 }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div className="flex flex-col justify-between gap-6">
            <div
              className="rounded-xl p-5"
              style={{ background: "rgba(202,163,83,0.05)", border: "1px solid rgba(202,163,83,0.12)" }}
            >
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-2">How it works</p>
              <ol className="space-y-2 text-sm text-foreground/50 list-none">
                {[
                  "Book a free 30-min discovery call",
                  "We scope & onboard your AI system",
                  "Go live in 3–14 days",
                  "Ongoing optimisation & support",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black mt-px"
                      style={{ background: "rgba(202,163,83,0.12)", color: "#CAA353", border: "1px solid rgba(202,163,83,0.25)" }}
                    >
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #CAA353, #F0C97A)",
                  color: "#0c0c0e",
                  boxShadow: "0 6px 28px rgba(202,163,83,0.28)",
                }}
              >
                <SiWhatsapp className="w-4 h-4" />
                {p.custom ? "Get Custom Pricing" : "Book Free Consultation"}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <button
                onClick={() => scrollToSection("contact")}
                className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "rgba(255,255,255,0.55)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                }}
              >
                Submit an Enquiry Form
              </button>

              <p className="text-center text-[10px] text-foreground/25 tracking-wide">
                No lock-in contracts · Free 30-min strategy call included
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AiServices() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currency, setCurrency] = useState<CurrencyKey>("INR");
  const pricingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrency(detectCurrency());
  }, []);

  const handleCardClick = (id: string) => {
    const opening = selectedId !== id;
    setSelectedId(opening ? id : null);
    if (opening) {
      setTimeout(() => {
        pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 120);
    }
  };

  const selectedService = aiServices.find((s) => s.id === selectedId) ?? null;

  return (
    <section id="ai-solutions" className="py-16 md:py-32 relative z-10 overflow-hidden border-t border-white/5">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(202,163,83,0.06),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(99,102,241,0.04),transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(202,163,83,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(202,163,83,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(202,163,83,0.08)", border: "1px solid rgba(202,163,83,0.2)" }}>
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary">AI-Powered Solutions</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.9]">
              Your Business,<br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #CAA353 0%, #F0C97A 50%, #CAA353 100%)" }}
              >
                Fully Automated.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-md"
          >
            <p className="text-foreground/50 text-lg leading-relaxed mb-6">
              We deploy cutting-edge AI systems that run your customer communications, social media, and website operations — around the clock, without human intervention.
            </p>
            <p className="text-foreground/30 text-sm mb-6">
              Click any service card below to see transparent pricing.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-3">
              {overallStats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full"
                  style={{ background: "rgba(202,163,83,0.06)", border: "1px solid rgba(202,163,83,0.18)" }}
                >
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  <span className="text-sm font-black text-foreground/90">{value}</span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-foreground/35">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {aiServices.map((service, index) => (
            <AiServiceCard
              key={service.id}
              service={service}
              index={index}
              isSelected={selectedId === service.id}
              onClick={() => handleCardClick(service.id)}
            />
          ))}
        </div>

        {/* Inline pricing panel */}
        <div ref={pricingRef}>
          <AnimatePresence mode="wait">
            {selectedService && (
              <motion.div
                key={selectedService.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden mb-6"
              >
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary">
                      {selectedService.title} — Pricing
                    </p>
                    <button
                      onClick={() => setSelectedId(null)}
                      className="flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase text-foreground/30 hover:text-foreground/60 transition-colors"
                    >
                      <X className="w-3 h-3" />
                      Close
                    </button>
                  </div>
                  <ServicePricingPanel
                    service={selectedService}
                    currency={currency}
                    setCurrency={setCurrency}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs tracking-wide"
            style={{
              background: "rgba(37,211,102,0.04)",
              border: "1px solid rgba(37,211,102,0.15)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#25D366" }} />
            All projects start with a free 30-min strategy call on WhatsApp — zero commitment, zero pressure.
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative p-8 md:p-12 rounded-2xl overflow-hidden text-center"
          style={{
            background: "rgba(202,163,83,0.05)",
            border: "1px solid rgba(202,163,83,0.2)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(202,163,83,0.08),transparent)] pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4">Ready to Automate?</p>
            <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
              Deploy AI Across Your Entire Business
            </h3>
            <p className="text-foreground/50 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              One integrated AI ecosystem handling calls, WhatsApp, social media, and your website simultaneously. Book a free strategy session to see what's possible.
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="group inline-flex items-center gap-3 px-8 py-4 font-bold text-sm tracking-[0.12em] uppercase transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #CAA353, #F0C97A)",
                color: "#0c0c0e",
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              Book a Free AI Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
