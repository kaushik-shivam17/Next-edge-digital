import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

/* ─── Types & Data ─────────────────────────────────────────────────────── */

type Currency = {
  code: string;
  symbol: string;
  maintenance: string;
  website: string;
};

// Base prices: ₹3,000/month maintenance · ₹8,000 one-time website build
// All other currencies converted at live approximate rates from INR
const currencies: Record<string, Currency> = {
  IN:      { code: "INR", symbol: "₹",    maintenance: "5,000",  website: "8,000"  },
  US:      { code: "USD", symbol: "$",    maintenance: "60",     website: "97"     },
  GB:      { code: "GBP", symbol: "£",    maintenance: "47",     website: "77"     },
  AE:      { code: "AED", symbol: "AED ", maintenance: "220",    website: "354"    },
  SG:      { code: "SGD", symbol: "S$",   maintenance: "81",     website: "130"    },
  AU:      { code: "AUD", symbol: "A$",   maintenance: "91",     website: "147"    },
  CA:      { code: "CAD", symbol: "C$",   maintenance: "82",     website: "132"    },
  DEFAULT: { code: "USD", symbol: "$",    maintenance: "60",     website: "97"     },
};

const countryNames: Record<string, string> = {
  IN: "India", US: "United States", GB: "United Kingdom",
  AE: "UAE", SG: "Singapore", AU: "Australia", CA: "Canada",
};

const plans = [
  {
    index:    "I",
    id:       "maintenance",
    label:    "Web Maintenance",
    category: "Ongoing Retainer",
    priceKey: "maintenance" as const,
    period:   "per month",
    billing:  "Billed monthly. Cancel anytime.",
    pitch:    "Complete website stewardship — security, performance, updates, and monthly analytics. Your site, always at its best.",
    deliverables: [
      "Monthly security & CMS updates",
      "Core Web Vitals monitoring",
      "Content & copy revisions",
      "99.9% uptime guarantee",
      "Monthly performance report",
      "48-hour priority response",
    ],
    cta: "Begin Engagement",
    featured: false,
  },
  {
    index:    "II",
    id:       "website",
    label:    "Website Build",
    category: "Full Project",
    priceKey: "website" as const,
    period:   "one-time",
    billing:  "Milestone billing. 4–8 week delivery.",
    pitch:    "A bespoke, conversion-engineered digital presence built from first principles — strategy, design, engineering, and launch.",
    deliverables: [
      "Discovery & strategy workshop",
      "Custom UI/UX design in Figma",
      "Full-stack development",
      "SEO & performance foundation",
      "CMS integration & training",
      "30-day post-launch support",
    ],
    cta: "Start a Project",
    featured: true,
  },
  {
    index:    "III",
    id:       "custom",
    label:    "Custom Retainer",
    category: "Full Partnership",
    priceKey: null,
    period:   "",
    billing:  "Scoped to your goals. No lock-in.",
    pitch:    "An end-to-end digital partnership — strategy, design, development, social, SEO, and reporting unified under one team.",
    deliverables: [
      "Dedicated account manager",
      "Unlimited design requests",
      "Development hours included",
      "Social media management",
      "SEO & content strategy",
      "Weekly strategy sessions",
    ],
    cta: "Request a Proposal",
    featured: false,
  },
];

/* ─── Hook ─────────────────────────────────────────────────────────────── */

function useCurrency() {
  const [currency, setCurrency] = useState<Currency>(currencies.DEFAULT);
  const [country,  setCountry]  = useState("IN");
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d) => {
        const c = d.country_code || "IN";
        setCountry(c);
        setCurrency(currencies[c] ?? currencies.DEFAULT);
      })
      .catch(() => setCurrency(currencies.DEFAULT))
      .finally(() => setLoading(false));
  }, []);

  return { currency, country, loading };
}

/* ─── Card ─────────────────────────────────────────────────────────────── */

function PlanCard({
  plan,
  currency,
  loading,
  index,
}: {
  plan: typeof plans[0];
  currency: Currency;
  loading: boolean;
  index: number;
}) {
  const amount = plan.priceKey ? currency[plan.priceKey] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col"
      style={{
        borderLeft: "1px solid rgba(255,255,255,0.07)",
        borderRight: index === plans.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
      }}
    >
      {/* Featured top bar */}
      {plan.featured && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, #CAA353, transparent)" }}
        />
      )}

      <div className="flex flex-col h-full px-8 md:px-10 pt-10 pb-10">

        {/* Roman numeral */}
        <p
          className="text-xs tracking-[0.4em] mb-6"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: plan.featured ? "#CAA353" : "rgba(255,255,255,0.2)",
            fontWeight: 700,
          }}
        >
          {plan.index}
        </p>

        {/* Category */}
        <p
          className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-2"
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif" }}
        >
          {plan.category}
        </p>

        {/* Title */}
        <h3
          className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "'Syne', sans-serif", color: "#fff", lineHeight: 1.1 }}
        >
          {plan.label}
        </h3>

        {/* Pitch */}
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'Inter', sans-serif" }}
        >
          {plan.pitch}
        </p>

        {/* Thin rule */}
        <div className="w-full h-px mb-8" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Price block */}
        <div className="mb-1">
          {amount ? (
            <>
              <p
                className="text-[10px] tracking-[0.35em] uppercase mb-3"
                style={{ color: "#CAA353", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Starting from
              </p>
              <div
                className="flex items-end gap-2 flex-wrap"
                style={{
                  filter: loading ? "blur(10px)" : "none",
                  transition: "filter 0.4s ease",
                }}
              >
                <p
                  className="font-bold leading-none"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    color: plan.featured ? "#fff" : "rgba(255,255,255,0.85)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {currency.symbol}{amount}
                </p>
                {plan.period && (
                  <p
                    className="text-sm pb-1.5"
                    style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif" }}
                  >
                    / {plan.period}
                  </p>
                )}
              </div>
              {!loading && (
                <p className="text-[11px] mt-2" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Inter', sans-serif" }}>
                  {currency.code}
                </p>
              )}
            </>
          ) : (
            <>
              <p
                className="text-[10px] tracking-[0.35em] uppercase mb-3"
                style={{ color: "#CAA353", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Pricing
              </p>
              <p
                className="font-bold leading-none mb-3"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "rgba(255,255,255,0.85)",
                  letterSpacing: "-0.02em",
                }}
              >
                On Request
              </p>
              <p
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Inter', sans-serif" }}
              >
                Tailored to your scope
              </p>
            </>
          )}
        </div>

        {/* Billing note */}
        <p
          className="text-[11px] mt-3 mb-8"
          style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Inter', sans-serif" }}
        >
          {plan.billing}
        </p>

        {/* Thin rule */}
        <div className="w-full h-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Deliverables */}
        <ul className="flex-1 mb-10">
          {plan.deliverables.map((item, i) => (
            <li
              key={item}
              className="flex items-start gap-4 py-3.5"
              style={{
                borderBottom: i < plan.deliverables.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
            >
              {/* Em dash marker — editorial style */}
              <span
                className="text-xs shrink-0 mt-0.5"
                style={{
                  color: plan.featured ? "#CAA353" : "rgba(255,255,255,0.2)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                —
              </span>
              <span
                className="text-sm"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.5,
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="group flex items-center justify-between w-full px-6 py-4 transition-all duration-300"
          style={
            plan.featured
              ? {
                  background: "#CAA353",
                  color: "#0c0c0e",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }
              : {
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }
          }
          onMouseEnter={(e) => {
            if (plan.featured) {
              e.currentTarget.style.background = "#F0C97A";
            } else {
              e.currentTarget.style.borderColor = "rgba(202,163,83,0.4)";
              e.currentTarget.style.color = "#CAA353";
            }
          }}
          onMouseLeave={(e) => {
            if (plan.featured) {
              e.currentTarget.style.background = "#CAA353";
            } else {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            }
          }}
        >
          {plan.cta}
          <ArrowUpRight
            className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
          />
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Section ──────────────────────────────────────────────────────────── */

export function Pricing() {
  const { currency, country, loading } = useCurrency();

  return (
    <section id="pricing" className="py-20 md:py-40 relative bg-background z-10">

      {/* Top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />

      <div className="container px-4 md:px-6">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-[10px] tracking-[0.4em] uppercase mb-5"
              style={{ color: "#CAA353", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              Investment
            </p>
            <h2
              className="font-bold tracking-tight"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                lineHeight: 1.0,
                color: "#fff",
                letterSpacing: "-0.03em",
              }}
            >
              Transparent
              <br />
              Pricing.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 md:max-w-xs"
          >
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}
            >
              No inflated agency rates. No hidden costs.
              Honest pricing built for serious brands worldwide.
            </p>

            {/* Geo indicator */}
            <div
              className="inline-flex items-center gap-2.5 self-start px-3.5 py-2"
              style={{
                border: "1px solid rgba(202,163,83,0.15)",
                background: "rgba(202,163,83,0.04)",
              }}
            >
              <MapPin className="w-3 h-3 text-primary shrink-0" />
              <span
                className="text-[11px] tracking-wide"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}
              >
                {loading
                  ? "Detecting location…"
                  : `${currency.code} · ${countryNames[country] ?? "Global"}`}
              </span>
              {!loading && (
                <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Thin full-width rule ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-px mb-0 origin-left"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        {/* ── Plans grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y divide-white/5 md:divide-y-0">
          {plans.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              currency={currency}
              loading={loading}
              index={i}
            />
          ))}
        </div>

        {/* ── Bottom rule ── */}
        <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* ── Footnote ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 text-center text-[11px] leading-loose tracking-wide"
          style={{
            color: "rgba(255,255,255,0.18)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          All figures are starting points. Final scope confirmed after a complimentary discovery call.
          <br />
          We work with clients across India, UAE, Singapore, United Kingdom, United States, and beyond.
        </motion.p>

      </div>
    </section>
  );
}
