import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { ArrowRight, CalendarCheck, Globe, ShieldCheck, CalendarDays } from "lucide-react";

const WHATSAPP_URL = `https://wa.me/918218628232?text=${encodeURIComponent("Hi! I'd like to book a free strategy call with nextedgetech.")}`;

const perks = [
  {
    icon: CalendarCheck,
    title: "30-Minute Call",
    description: "A focused, no-fluff session where we map out exactly what your brand needs to grow.",
  },
  {
    icon: Globe,
    title: "Any Time Zone",
    description: "We work with clients across India, UAE, and Singapore. We flex our schedule around yours.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Commitment",
    description: "Completely free. No pitch decks. No pressure. Just clarity and a clear action plan.",
  },
];

const timeZones = [
  { label: "New York", tz: "America/New_York", flag: "🇺🇸" },
  { label: "London", tz: "Europe/London", flag: "🇬🇧" },
  { label: "India", tz: "Asia/Kolkata", flag: "🇮🇳" },
  { label: "Dubai", tz: "Asia/Dubai", flag: "🇦🇪" },
  { label: "Singapore", tz: "Asia/Singapore", flag: "🇸🇬" },
];

function WorldClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.18 }}
      className="mb-8 md:mb-12 py-5 px-6 md:px-10 rounded-2xl"
      style={{
        background: "rgba(202,163,83,0.04)",
        border: "1px solid rgba(202,163,83,0.12)",
      }}
    >
      <p className="text-center text-[9px] font-bold tracking-[0.35em] uppercase text-foreground/25 mb-5">
        Live — We schedule around your local time
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {timeZones.map(({ label, tz, flag }) => {
          const timeStr = new Intl.DateTimeFormat("en-US", {
            timeZone: tz,
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }).format(now);
          const isBusinessHours = (() => {
            const h = parseInt(
              new Intl.DateTimeFormat("en-US", {
                timeZone: tz,
                hour: "numeric",
                hour12: false,
              }).format(now)
            );
            return h >= 8 && h < 20;
          })();
          return (
            <div key={label} className="flex items-center gap-3">
              <span className="text-2xl leading-none">{flag}</span>
              <div>
                <p className="text-base font-black tabular-nums tracking-tight text-foreground/80 leading-none">
                  {timeStr}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: isBusinessHours ? "#34D399" : "rgba(255,255,255,0.2)",
                      boxShadow: isBusinessHours ? "0 0 6px #34D39980" : "none",
                    }}
                  />
                  <p className="text-[10px] tracking-wider text-foreground/30">{label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-center text-[9px] tracking-widest uppercase text-foreground/20 mt-4">
        Green dot = currently business hours
      </p>
    </motion.div>
  );
}

export function BookCall() {
  return (
    <section className="py-16 md:py-32 relative z-10 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(202,163,83,0.07),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(45,100,255,0.06),transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-5"
          >
            Free Strategy Call
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-8"
          >
            Let's Talk About<br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #CAA353 0%, #F0C97A 60%, #CAA353 100%)" }}
            >
              Your Growth.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-lg text-foreground/50 leading-relaxed"
          >
            Book a free 30-minute strategy session. We'll audit your current digital presence,
            identify your biggest opportunities, and tell you exactly how we'd scale your brand —
            wherever you are in the world.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 md:mb-10">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl group"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                data-testid={`card-perk-${i}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "rgba(202,163,83,0.1)", border: "1px solid rgba(202,163,83,0.2)" }}
                >
                  <perk.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-base mb-2">{perk.title}</h3>
                <p className="text-foreground/50 text-sm leading-relaxed">{perk.description}</p>
              </motion.div>
            ))}
          </div>

          <WorldClock />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-book-calendar"
              className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 shadow-lg hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #CAA353, #F0C97A)",
                color: "#0c0c0e",
                boxShadow: "0 8px 32px rgba(202,163,83,0.25)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(202,163,83,0.4)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(202,163,83,0.25)"; }}
            >
              <CalendarDays className="w-5 h-5" />
              Book a Free Strategy Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              data-testid="button-book-whatsapp"
              className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
              }}
            >
              <SiWhatsapp className="w-4 h-4" />
              Send a Project Brief
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center justify-center gap-6 mt-10"
          >
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => {
                const starPath = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";
                if (i < 4) {
                  return (
                    <svg key={i} className="w-3.5 h-3.5" fill="#CAA353" viewBox="0 0 20 20">
                      <path d={starPath} />
                    </svg>
                  );
                }
                return (
                  <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20">
                    <defs>
                      <linearGradient id="half-star">
                        <stop offset="50%" stopColor="#CAA353" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
                      </linearGradient>
                    </defs>
                    <path d={starPath} fill="url(#half-star)" />
                  </svg>
                );
              })}
            </div>
            <p className="text-xs text-foreground/30 tracking-wide">
              4.5 rating · 42+ brands transformed · 3+ countries served
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
