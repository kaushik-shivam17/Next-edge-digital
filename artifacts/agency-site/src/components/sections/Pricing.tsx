import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MessageCircle, Globe, Zap, Layers, ArrowRight, Sparkles } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
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

type Plan = {
  id: string;
  icon: React.ElementType;
  badge: string | null;
  name: string;
  tagline: string;
  baseINR: number | null;
  billingNote: string;
  features: string[];
  cta: string;
  highlight: boolean;
  custom: boolean;
};

const PLANS: Plan[] = [
  {
    id: "website",
    icon: Globe,
    badge: null,
    name: "Website",
    tagline: "Custom-built, conversion-ready sites",
    baseINR: 6000,
    billingNote: "one-time · varies by complexity",
    features: [
      "Custom responsive design",
      "Up to 5 pages (more available)",
      "Mobile-first & SEO optimised",
      "Contact / booking form",
      "WhatsApp button integration",
      "1 revision round included",
      "Delivered in 7–14 days",
    ],
    cta: "Book Free Consultation",
    highlight: false,
    custom: false,
  },
  {
    id: "ai-agent",
    icon: Zap,
    badge: null,
    name: "AI Agent",
    tagline: "24/7 intelligent business automation",
    baseINR: 2200,
    billingNote: "per month · scales with volume",
    features: [
      "AI WhatsApp or Call Bot",
      "24 / 7 automated responses",
      "Lead qualification engine",
      "CRM & calendar integration",
      "Custom objection handling",
      "Monthly performance report",
      "Onboarded in 3–5 days",
    ],
    cta: "Start Automating",
    highlight: false,
    custom: false,
  },
  {
    id: "web-ai",
    icon: Layers,
    badge: "Most Popular",
    name: "Web + AI Management",
    tagline: "Complete digital engine, done for you",
    baseINR: 5000,
    billingNote: "per month · website setup included",
    features: [
      "Full website design & build",
      "AI agent setup & training",
      "Monthly content updates",
      "SEO monitoring & reporting",
      "Analytics dashboard access",
      "Proactive strategy reviews",
      "Priority WhatsApp support",
    ],
    cta: "Get Started Today",
    highlight: true,
    custom: false,
  },
  {
    id: "custom",
    icon: Sparkles,
    badge: null,
    name: "Other Services",
    tagline: "Branding · SEO · Social · Ads",
    baseINR: null,
    billingNote: "custom quote · no surprises",
    features: [
      "Brand identity & logo design",
      "Social media management",
      "SEO & content strategy",
      "Paid advertising (Meta / Google)",
      "Video & creative production",
      "Tailored scope & timeline",
      "Free discovery call included",
    ],
    cta: "Get Custom Pricing",
    highlight: false,
    custom: true,
  },
];

function CurrencyTab({ k, selected, onSelect }: { k: CurrencyKey; selected: boolean; onSelect: () => void }) {
  const c = CURRENCIES[k];
  return (
    <button
      onClick={onSelect}
      className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all duration-200 whitespace-nowrap"
      style={{
        color: selected ? "#0c0c0e" : "rgba(255,255,255,0.35)",
        background: selected ? "linear-gradient(135deg, #CAA353, #F0C97A)" : "transparent",
      }}
    >
      <span className="text-sm leading-none">{c.flag}</span>
      <span>{c.label}</span>
    </button>
  );
}

function PlanCard({ plan, currency, index }: { plan: Plan; currency: CurrencyKey; index: number }) {
  const priceStr = plan.baseINR != null ? formatPrice(plan.baseINR, currency) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: plan.highlight
          ? "linear-gradient(160deg, rgba(202,163,83,0.10) 0%, rgba(10,10,12,1) 65%)"
          : "rgba(255,255,255,0.02)",
        border: plan.highlight
          ? "1px solid rgba(202,163,83,0.45)"
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: plan.highlight ? "0 0 60px rgba(202,163,83,0.10)" : "none",
      }}
    >
      {plan.badge && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px px-5 py-1 text-[9px] font-black tracking-[0.22em] uppercase rounded-b-xl"
          style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e" }}
        >
          {plan.badge}
        </div>
      )}

      <div className="p-7 flex flex-col flex-1" style={{ paddingTop: plan.badge ? "2.1rem" : "1.75rem" }}>

        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: plan.highlight ? "rgba(202,163,83,0.15)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${plan.highlight ? "rgba(202,163,83,0.3)" : "rgba(255,255,255,0.08)"}`,
            }}
          >
            <plan.icon
              style={{ color: plan.highlight ? "#CAA353" : "rgba(255,255,255,0.45)", width: 18, height: 18 }}
            />
          </div>
          <div>
            <h3 className="font-black text-base tracking-tight" style={{ color: plan.highlight ? "#F0C97A" : "#fff" }}>
              {plan.name}
            </h3>
            <p className="text-[10px] text-foreground/30 leading-tight mt-0.5">{plan.tagline}</p>
          </div>
        </div>

        <div className="mb-6 min-h-[72px]">
          {plan.custom ? (
            <>
              <p className="text-3xl font-black tracking-tight text-foreground/70">Custom</p>
              <p className="text-[10px] text-foreground/30 mt-1">{plan.billingNote}</p>
            </>
          ) : (
            <>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[10px] font-semibold text-foreground/30 uppercase tracking-widest">from</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${currency}-${plan.id}`}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="text-3xl font-black tracking-tight"
                    style={{ color: plan.highlight ? "#F0C97A" : "#fff" }}
                  >
                    {priceStr}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="text-[10px] text-foreground/30 mt-1">{plan.billingNote}</p>
            </>
          )}
        </div>

        <div
          className="mb-5"
          style={{ height: 1, background: plan.highlight ? "rgba(202,163,83,0.15)" : "rgba(255,255,255,0.05)" }}
        />

        <ul className="space-y-2.5 flex-1 mb-7">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.58)" }}>
              <Check
                className="flex-shrink-0 mt-[3px]"
                style={{ width: 13, height: 13, color: plan.highlight ? "#CAA353" : "rgba(255,255,255,0.28)" }}
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02]"
          style={
            plan.highlight
              ? {
                  background: "linear-gradient(135deg, #CAA353, #F0C97A)",
                  color: "#0c0c0e",
                  boxShadow: "0 6px 28px rgba(202,163,83,0.30)",
                }
              : {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "rgba(255,255,255,0.65)",
                }
          }
          onMouseEnter={(e) => {
            if (!plan.highlight) {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }
          }}
          onMouseLeave={(e) => {
            if (!plan.highlight) {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
            }
          }}
        >
          <SiWhatsapp className="w-4 h-4" />
          {plan.cta}
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

export function Pricing() {
  const [currency, setCurrency] = useState<CurrencyKey>("INR");

  useEffect(() => {
    setCurrency(detectCurrency());
  }, []);

  return (
    <section id="pricing" className="py-16 md:py-32 relative z-10 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(202,163,83,0.06),transparent)]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.012,
          backgroundImage: "radial-gradient(circle, rgba(202,163,83,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">

        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "#CAA353" }}
          >
            Transparent Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.07 }}
            className="text-4xl md:text-6xl font-black tracking-tight leading-[0.92] mb-5"
          >
            Invest in Results,<br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #CAA353, #F0C97A)" }}
            >
              Not Promises.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="text-base text-foreground/45 leading-relaxed"
          >
            No hidden fees. No lock-in contracts. Every price is a starting point — final cost is confirmed after a free discovery call tailored to your exact needs.
          </motion.p>
        </div>

        {/* Currency switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="flex items-center justify-center mb-10 md:mb-14"
        >
          <div
            className="inline-flex items-center gap-1 p-1.5 rounded-xl flex-wrap justify-center"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {(Object.keys(CURRENCIES) as CurrencyKey[]).map((k) => (
              <CurrencyTab key={k} k={k} selected={currency === k} onSelect={() => setCurrency(k)} />
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} currency={currency} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center mt-12"
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

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="text-center text-[10px] mt-4 tracking-wide"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          Prices shown are starting rates in {CURRENCIES[currency].label} and are indicative.
          {currency !== "INR" ? " Exchange rates are approximate." : ""}
        </motion.p>
      </div>
    </section>
  );
}
