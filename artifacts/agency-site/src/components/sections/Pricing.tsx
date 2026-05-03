import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wrench, Globe, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

type Currency = {
  code: string;
  symbol: string;
  maintenance: string;
  website: string;
  locale: string;
};

const currencies: Record<string, Currency> = {
  IN: { code: "INR", symbol: "₹", maintenance: "2,50,000", website: "6,65,000", locale: "en-IN" },
  US: { code: "USD", symbol: "$", maintenance: "3,000",    website: "8,000",    locale: "en-US" },
  GB: { code: "GBP", symbol: "£", maintenance: "2,400",    website: "6,400",    locale: "en-GB" },
  AE: { code: "AED", symbol: "AED", maintenance: "11,000", website: "29,400",   locale: "en-AE" },
  SG: { code: "SGD", symbol: "S$", maintenance: "4,100",   website: "10,800",   locale: "en-SG" },
  AU: { code: "AUD", symbol: "A$", maintenance: "4,600",   website: "12,200",   locale: "en-AU" },
  CA: { code: "CAD", symbol: "C$", maintenance: "4,100",   website: "10,900",   locale: "en-CA" },
  DEFAULT: { code: "USD", symbol: "$", maintenance: "3,000", website: "8,000",  locale: "en-US" },
};

const plans = [
  {
    id: "maintenance",
    icon: Wrench,
    label: "Web Maintenance",
    tag: "Most Popular",
    tagColor: "from-primary to-amber-400",
    description:
      "Full-spectrum website care — performance monitoring, security patches, content updates, speed optimisation, and monthly analytics reporting.",
    features: [
      "Monthly security & CMS updates",
      "Core Web Vitals monitoring",
      "Content & copy updates",
      "Uptime monitoring (99.9% SLA)",
      "Monthly performance report",
      "Priority support (48-hr response)",
    ],
    accent: "from-primary/20 to-amber-600/5",
    glow: "rgba(202,163,83,0.18)",
    border: "rgba(202,163,83,0.35)",
    priceKey: "maintenance" as const,
    suffix: "/ mo",
    note: "Billed monthly · Cancel anytime",
    cta: "Get Maintenance Plan",
    highlighted: true,
  },
  {
    id: "website",
    icon: Globe,
    label: "Website Build",
    tag: "Full Project",
    tagColor: "from-blue-500 to-indigo-500",
    description:
      "Custom-engineered, conversion-focused websites from discovery through launch — design, development, SEO foundation, and handoff training.",
    features: [
      "Discovery & strategy workshop",
      "Custom UI/UX design (Figma)",
      "Full-stack development",
      "SEO & performance baseline",
      "CMS integration & training",
      "30-day post-launch support",
    ],
    accent: "from-blue-500/15 to-indigo-600/5",
    glow: "rgba(99,102,241,0.15)",
    border: "rgba(99,102,241,0.3)",
    priceKey: "website" as const,
    suffix: "one-time",
    note: "Timeline: 4–8 weeks · Milestone billing",
    cta: "Start Your Project",
    highlighted: false,
  },
  {
    id: "custom",
    icon: Sparkles,
    label: "Custom Retainer",
    tag: "Tailored",
    tagColor: "from-emerald-500 to-teal-500",
    description:
      "Full-service digital partnership for ambitious brands — strategy, design, development, social, SEO, and analytics under one roof.",
    features: [
      "Dedicated account manager",
      "Unlimited design requests",
      "Development hours included",
      "Social media management",
      "SEO & content strategy",
      "Weekly strategy calls",
    ],
    accent: "from-emerald-500/15 to-teal-600/5",
    glow: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.25)",
    priceKey: null,
    suffix: "",
    note: "Scoped to your goals · No lock-in",
    cta: "Request a Quote",
    highlighted: false,
  },
];

function useCurrency() {
  const [currency, setCurrency] = useState<Currency>(currencies.DEFAULT);
  const [country, setCountry] = useState<string>("US");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        const code: string = data.country_code || "US";
        setCountry(code);
        setCurrency(currencies[code] ?? currencies.DEFAULT);
      })
      .catch(() => {
        setCurrency(currencies.DEFAULT);
      })
      .finally(() => setLoading(false));
  }, []);

  return { currency, country, loading };
}

function PriceDisplay({ plan, currency, loading }: { plan: typeof plans[0]; currency: Currency; loading: boolean }) {
  if (!plan.priceKey) {
    return (
      <div className="mb-8">
        <p className="text-4xl font-black tracking-tight text-foreground">Let's Talk</p>
        <p className="text-foreground/40 text-sm mt-1">Custom scope & pricing</p>
      </div>
    );
  }

  const amount = currency[plan.priceKey];

  return (
    <div className="mb-2">
      <div className="flex items-end gap-2">
        <span className="text-lg font-semibold text-foreground/50 mb-1">from</span>
        <span
          className="text-4xl md:text-5xl font-black tracking-tight"
          style={{
            background: plan.highlighted
              ? "linear-gradient(135deg, #CAA353, #F0C97A)"
              : "linear-gradient(135deg, #fff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: loading ? "blur(8px)" : "none",
            transition: "filter 0.3s ease",
          }}
        >
          {loading ? "—" : `${currency.symbol}${amount}`}
        </span>
      </div>
      <p className="text-foreground/40 text-sm mt-1">
        {plan.suffix}&nbsp;
        {!loading && <span className="text-foreground/25">· {currency.code}</span>}
      </p>
    </div>
  );
}

function PricingCard({ plan, currency, loading, index }: { plan: typeof plans[0]; currency: Currency; loading: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col h-full"
    >
      {plan.highlighted && (
        <div
          className="absolute -inset-px rounded-3xl pointer-events-none z-0"
          style={{
            background: "linear-gradient(135deg, rgba(202,163,83,0.4), rgba(240,201,122,0.1), transparent 60%)",
          }}
        />
      )}

      <div
        className="relative flex flex-col h-full rounded-3xl p-8 md:p-10 z-10 overflow-hidden"
        style={{
          background: plan.highlighted
            ? "rgba(202,163,83,0.05)"
            : "rgba(255,255,255,0.02)",
          border: `1px solid ${plan.border}`,
          boxShadow: `0 0 40px ${plan.glow}`,
        }}
      >
        {/* Accent gradient */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${plan.accent} opacity-40 pointer-events-none`} />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <plan.icon className="w-5 h-5 text-primary" />
            </div>

            <span
              className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-gradient-to-r ${plan.tagColor} text-white`}
            >
              {plan.tag}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-2">{plan.label}</h3>
          <p className="text-foreground/45 text-sm leading-relaxed mb-8">{plan.description}</p>

          {/* Price */}
          <PriceDisplay plan={plan} currency={currency} loading={loading} />

          {/* Note */}
          <p className="text-foreground/30 text-xs mb-8">{plan.note}</p>

          {/* Features */}
          <ul className="space-y-3 mb-10 flex-1">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <CheckCircle2
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: plan.highlighted ? "#CAA353" : "rgba(255,255,255,0.35)" }}
                />
                <span className="text-sm text-foreground/60">{f}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="group flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-bold tracking-wider uppercase transition-all duration-300"
            style={
              plan.highlighted
                ? {
                    background: "linear-gradient(135deg, #CAA353, #F0C97A)",
                    color: "#0c0c0e",
                  }
                : {
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.8)",
                  }
            }
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            {plan.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

const countryNames: Record<string, string> = {
  IN: "India", US: "United States", GB: "United Kingdom",
  AE: "UAE", SG: "Singapore", AU: "Australia", CA: "Canada",
};

export function Pricing() {
  const { currency, country, loading } = useCurrency();

  return (
    <section id="pricing" className="py-16 md:py-32 relative bg-background z-10">
      <div className="container px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-20 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Investment</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Transparent<br />Pricing
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-3"
          >
            <p className="text-foreground/50 max-w-md text-lg leading-relaxed">
              No surprises. No padded agency rates. Just honest pricing that reflects the value we deliver.
            </p>

            {/* Geo badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full self-start"
              style={{
                background: "rgba(202,163,83,0.08)",
                border: "1px solid rgba(202,163,83,0.2)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary font-medium">
                {loading
                  ? "Detecting your location…"
                  : `Showing prices in ${currency.code} for ${countryNames[country] ?? "your region"}`}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              currency={currency}
              loading={loading}
              index={index}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center text-foreground/25 text-xs mt-10 max-w-xl mx-auto leading-relaxed"
        >
          All prices are starting points. Final scope is determined after a free discovery call.
          We work with clients across India, UAE, Singapore, UK, and the US — pricing adapts to your market.
        </motion.p>

      </div>
    </section>
  );
}
