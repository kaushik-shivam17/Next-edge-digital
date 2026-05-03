import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, MapPin } from "lucide-react";

type Currency = {
  code: string;
  symbol: string;
  maintenance: string;
  website: string;
  locale: string;
};

const currencies: Record<string, Currency> = {
  IN:      { code: "INR", symbol: "₹",   maintenance: "2,50,000", website: "6,65,000", locale: "en-IN" },
  US:      { code: "USD", symbol: "$",   maintenance: "3,000",    website: "8,000",    locale: "en-US" },
  GB:      { code: "GBP", symbol: "£",   maintenance: "2,400",    website: "6,400",    locale: "en-GB" },
  AE:      { code: "AED", symbol: "AED ", maintenance: "11,000",  website: "29,400",   locale: "en-AE" },
  SG:      { code: "SGD", symbol: "S$",  maintenance: "4,100",    website: "10,800",   locale: "en-SG" },
  AU:      { code: "AUD", symbol: "A$",  maintenance: "4,600",    website: "12,200",   locale: "en-AU" },
  CA:      { code: "CAD", symbol: "C$",  maintenance: "4,100",    website: "10,900",   locale: "en-CA" },
  DEFAULT: { code: "USD", symbol: "$",   maintenance: "3,000",    website: "8,000",    locale: "en-US" },
};

const countryNames: Record<string, string> = {
  IN: "India", US: "United States", GB: "United Kingdom",
  AE: "UAE", SG: "Singapore", AU: "Australia", CA: "Canada",
};

function useCurrency() {
  const [currency, setCurrency] = useState<Currency>(currencies.DEFAULT);
  const [country, setCountry]   = useState<string>("US");
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d) => {
        const c = d.country_code || "US";
        setCountry(c);
        setCurrency(currencies[c] ?? currencies.DEFAULT);
      })
      .catch(() => setCurrency(currencies.DEFAULT))
      .finally(() => setLoading(false));
  }, []);

  return { currency, country, loading };
}

/* ─── Animated shimmer border wrapper ─────────────────────────────────── */
function ShimmerBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[28px] p-px overflow-hidden" style={{ isolation: "isolate" }}>
      {/* rotating conic gradient that creates the shimmer */}
      <motion.div
        className="absolute inset-0 rounded-[28px]"
        style={{
          background:
            "conic-gradient(from 0deg, #8B6914 0%, #CAA353 20%, #F0C97A 40%, #CAA353 60%, #8B6914 80%, #CAA353 100%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      />
      {/* inner mask */}
      <div
        className="relative rounded-[27px] overflow-hidden z-10"
        style={{ background: "#0d0d10" }}
      >
        {children}
      </div>
    </div>
  );
}

/* ─── Plan data ────────────────────────────────────────────────────────── */
const plans = [
  {
    id:       "maintenance",
    idx:      "01",
    label:    "Web Maintenance",
    sub:      "Monthly Care Plan",
    description:
      "Full-spectrum website care — security patches, performance monitoring, content updates, and monthly reporting.",
    features: [
      "Monthly security & CMS updates",
      "Core Web Vitals monitoring",
      "Content & copy updates",
      "Uptime monitoring (99.9% SLA)",
      "Monthly performance report",
      "Priority 48-hr support",
    ],
    priceKey: "maintenance" as const,
    suffix:   "/ month",
    note:     "Billed monthly · Cancel anytime",
    cta:      "Get Started",
    featured: false,
  },
  {
    id:       "website",
    idx:      "02",
    label:    "Website Build",
    sub:      "Full Design & Development",
    description:
      "Cinematic, conversion-engineered websites built from discovery to launch — with design, dev, SEO foundation, and post-launch support.",
    features: [
      "Discovery & strategy workshop",
      "Custom UI/UX design (Figma)",
      "Full-stack development",
      "SEO & performance baseline",
      "CMS integration & training",
      "30-day post-launch support",
    ],
    priceKey: "website" as const,
    suffix:   "one-time",
    note:     "4–8 week delivery · Milestone billing",
    cta:      "Start a Project",
    featured: true,
  },
  {
    id:       "custom",
    idx:      "03",
    label:    "Custom Retainer",
    sub:      "Full-Service Partnership",
    description:
      "End-to-end digital partnership — strategy, design, development, social, SEO, and reporting all under one roof.",
    features: [
      "Dedicated account manager",
      "Unlimited design requests",
      "Development hours included",
      "Social media management",
      "SEO & content strategy",
      "Weekly strategy calls",
    ],
    priceKey: null,
    suffix:   "",
    note:     "Scoped to your goals · No lock-in",
    cta:      "Request a Quote",
    featured: false,
  },
];

/* ─── Side card ────────────────────────────────────────────────────────── */
function SideCard({
  plan,
  currency,
  loading,
  delay,
  side,
}: {
  plan: typeof plans[0];
  currency: Currency;
  loading: boolean;
  delay: number;
  side: "left" | "right";
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    el.style.transform = `perspective(800px) rotateX(${((y - cy) / cy) * -5}deg) rotateY(${((x - cx) / cx) * 5}deg)`;
  };
  const handleLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
  };

  const amount = plan.priceKey ? currency[plan.priceKey] : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="flex flex-col h-full p-8 md:p-10 rounded-3xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          transition: "transform 0.15s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Index */}
        <span
          className="text-[80px] font-black leading-none mb-4 select-none"
          style={{ color: "rgba(255,255,255,0.04)" }}
        >
          {plan.idx}
        </span>

        {/* Label */}
        <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-foreground/30 mb-1">{plan.sub}</p>
        <h3 className="text-2xl font-black tracking-tight text-foreground mb-4">{plan.label}</h3>

        {/* Divider */}
        <div className="w-full h-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Price */}
        {amount ? (
          <div className="mb-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-foreground/30 mb-1">from</span>
              <span
                className="text-4xl font-black tracking-tight text-foreground"
                style={{
                  filter: loading ? "blur(10px)" : "none",
                  transition: "filter 0.4s ease",
                }}
              >
                {currency.symbol}{amount}
              </span>
            </div>
            <p className="text-foreground/25 text-xs mt-1">{plan.suffix} · {currency.code}</p>
          </div>
        ) : (
          <div className="mb-1">
            <p className="text-3xl font-black tracking-tight text-foreground">Let's Talk</p>
            <p className="text-foreground/25 text-xs mt-1">Custom scope & pricing</p>
          </div>
        )}

        <p className="text-foreground/25 text-[11px] mt-1 mb-8">{plan.note}</p>

        {/* Features */}
        <ul className="space-y-0 flex-1 mb-8">
          {plan.features.map((f, i) => (
            <li
              key={f}
              className="flex items-center gap-3 py-3"
              style={{ borderBottom: i < plan.features.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
            >
              <Check className="w-3.5 h-3.5 shrink-0 text-foreground/25" />
              <span className="text-sm text-foreground/50">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="group flex items-center justify-between w-full px-6 py-4 rounded-2xl text-sm font-bold tracking-wider uppercase transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.6)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(202,163,83,0.08)";
            e.currentTarget.style.borderColor = "rgba(202,163,83,0.25)";
            e.currentTarget.style.color = "#CAA353";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color = "rgba(255,255,255,0.6)";
          }}
        >
          {plan.cta}
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Featured center card ─────────────────────────────────────────────── */
function FeaturedCard({ plan, currency, loading }: { plan: typeof plans[0]; currency: Currency; loading: boolean }) {
  const amount = plan.priceKey ? currency[plan.priceKey] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 md:-mt-6 md:-mb-6 flex flex-col"
    >
      {/* "Most popular" badge above card */}
      <div className="flex justify-center mb-4">
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(202,163,83,0.12)",
            border: "1px solid rgba(202,163,83,0.3)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary">Flagship Service</span>
        </div>
      </div>

      <ShimmerBorder>
        <div
          className="relative flex flex-col h-full p-8 md:p-12 overflow-hidden"
          style={{ background: "linear-gradient(160deg, #111113 0%, #0d0d10 60%)" }}
        >
          {/* Background gold orb */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(202,163,83,0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(202,163,83,0.07) 0%, transparent 70%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Index */}
            <span
              className="text-[100px] font-black leading-none mb-2 select-none"
              style={{
                background: "linear-gradient(135deg, rgba(202,163,83,0.15), transparent)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {plan.idx}
            </span>

            {/* Label */}
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary/70 mb-1">{plan.sub}</p>
            <h3
              className="text-3xl md:text-4xl font-black tracking-tight mb-4"
              style={{
                background: "linear-gradient(135deg, #fff 50%, rgba(255,255,255,0.6))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {plan.label}
            </h3>
            <p className="text-foreground/40 text-sm leading-relaxed mb-8 max-w-xs">{plan.description}</p>

            {/* Divider */}
            <div
              className="w-full h-px mb-8"
              style={{ background: "linear-gradient(to right, rgba(202,163,83,0.4), transparent)" }}
            />

            {/* Price — hero display */}
            {amount && (
              <div className="mb-2">
                <p className="text-xs text-foreground/40 tracking-widest uppercase mb-2">Starting from</p>
                <div className="flex items-end gap-3 flex-wrap">
                  <span
                    className="text-6xl md:text-7xl font-black tracking-tight leading-none"
                    style={{
                      background: "linear-gradient(135deg, #CAA353 0%, #F0C97A 50%, #CAA353 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: loading ? "blur(12px)" : "none",
                      transition: "filter 0.5s ease",
                    }}
                  >
                    {currency.symbol}{amount}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-foreground/35 text-sm">{plan.suffix}</span>
                  {!loading && (
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded"
                      style={{ background: "rgba(202,163,83,0.1)", color: "#CAA353", border: "1px solid rgba(202,163,83,0.2)" }}
                    >
                      {currency.code}
                    </span>
                  )}
                </div>
              </div>
            )}

            <p className="text-foreground/25 text-[11px] mt-2 mb-10">{plan.note}</p>

            {/* Features */}
            <ul className="space-y-0 flex-1 mb-10">
              {plan.features.map((f, i) => (
                <li
                  key={f}
                  className="flex items-center gap-4 py-3.5"
                  style={{ borderBottom: i < plan.features.length - 1 ? "1px solid rgba(202,163,83,0.08)" : "none" }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "rgba(202,163,83,0.12)", border: "1px solid rgba(202,163,83,0.25)" }}
                  >
                    <Check className="w-2.5 h-2.5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground/65 font-medium">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#contact"
              className="group relative flex items-center justify-between w-full px-8 py-5 rounded-2xl text-sm font-black tracking-widest uppercase overflow-hidden transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #CAA353, #F0C97A)",
                color: "#0c0c0e",
                boxShadow: "0 0 40px rgba(202,163,83,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 60px rgba(202,163,83,0.4), inset 0 1px 0 rgba(255,255,255,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 40px rgba(202,163,83,0.25), inset 0 1px 0 rgba(255,255,255,0.3)"; }}
            >
              {plan.cta}
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </ShimmerBorder>
    </motion.div>
  );
}

/* ─── Section ──────────────────────────────────────────────────────────── */
export function Pricing() {
  const { currency, country, loading } = useCurrency();
  const [left, center, right] = plans;

  return (
    <section id="pricing" className="py-16 md:py-40 relative overflow-hidden bg-background z-10">

      {/* Ambient background glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(202,163,83,0.05) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(202,163,83,0.2), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)" }}
      />

      <div className="container px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold tracking-[0.35em] uppercase text-primary mb-5"
          >
            Investment
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6"
          >
            Transparent
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #CAA353, #F0C97A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Pricing
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-foreground/45 text-lg leading-relaxed mb-8"
          >
            No padded agency rates. No surprises. Just honest pricing built
            for ambitious brands worldwide.
          </motion.p>

          {/* Geo pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "rgba(202,163,83,0.07)",
              border: "1px solid rgba(202,163,83,0.18)",
            }}
          >
            <MapPin className="w-3 h-3 text-primary" />
            <span className="text-xs text-primary/80 font-medium">
              {loading
                ? "Detecting your location…"
                : `Prices shown in ${currency.code} · ${countryNames[country] ?? "Global"}`}
            </span>
            {!loading && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
          </motion.div>
        </div>

        {/* Cards grid — side cards align to center card height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center">
          <SideCard plan={left}  currency={currency} loading={loading} delay={0}    side="left"  />
          <FeaturedCard          currency={currency} loading={loading} plan={center} />
          <SideCard plan={right} currency={currency} loading={loading} delay={0.05} side="right" />
        </div>

        {/* Footer footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-foreground/20 text-xs mt-14 max-w-lg mx-auto leading-loose tracking-wide"
        >
          All prices are starting points — final scope is confirmed after a free discovery call.
          <br />
          We serve clients in India, UAE, Singapore, UK, US, and beyond.
        </motion.p>
      </div>
    </section>
  );
}
