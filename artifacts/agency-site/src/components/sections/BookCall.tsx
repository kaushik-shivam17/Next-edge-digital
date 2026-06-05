import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { ArrowRight, CalendarCheck, Globe, ShieldCheck, MessageCircle } from "lucide-react";
import { scrollToSection } from "@/lib/scrollTo";

const WHATSAPP_URL = `https://wa.me/918218628232?text=${encodeURIComponent("Hi! I'd like to book a free strategy call with Core Elite Digital.")}`;

const perks = [
  {
    icon: CalendarCheck,
    title: "30-Minute Call",
    description: "A focused, no-fluff session where we map out exactly what your brand needs to grow.",
    time: "2 min ago",
  },
  {
    icon: Globe,
    title: "Any Time Zone",
    description: "We work with clients across India, UAE, and Singapore. We flex our schedule around yours.",
    time: "Just now",
  },
  {
    icon: ShieldCheck,
    title: "Zero Commitment",
    description: "Completely free. No pitch decks. No pressure. Just clarity and a clear action plan.",
    time: "Delivered",
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
        background: "rgba(37,211,102,0.04)",
        border: "1px solid rgba(37,211,102,0.15)",
      }}
    >
      <p className="text-center text-[9px] font-bold tracking-[0.35em] uppercase mb-5" style={{ color: "rgba(37,211,102,0.5)" }}>
        Live — We schedule around your local time
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
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
            <div key={label} className="flex items-center gap-2">
              <span className="text-lg sm:text-2xl leading-none">{flag}</span>
              <div>
                <p className="text-sm sm:text-base font-black tabular-nums tracking-tight text-foreground/80 leading-none">
                  {timeStr}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: isBusinessHours ? "#25D366" : "rgba(255,255,255,0.2)",
                      boxShadow: isBusinessHours ? "0 0 6px #25D36680" : "none",
                    }}
                  />
                  <p className="text-[10px] tracking-wider text-foreground/30">{label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-center text-[9px] tracking-widest uppercase mt-4" style={{ color: "rgba(37,211,102,0.3)" }}>
        Green dot = currently business hours
      </p>
    </motion.div>
  );
}

export function BookCall() {
  return (
    <section id="bookcall" className="py-16 md:py-32 relative z-10 overflow-hidden border-t border-white/5">
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,rgba(37,211,102,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(18,140,126,0.05),transparent)]" />

      {/* WhatsApp subtle pattern dots */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(37,211,102,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Large watermark WhatsApp icon */}
      <div
        className="absolute right-[-80px] bottom-[-60px] pointer-events-none select-none"
        style={{ opacity: 0.04 }}
      >
        <SiWhatsapp style={{ width: 420, height: 420, color: "#25D366" }} />
      </div>

      <div className="container px-4 md:px-6 relative z-10">

        {/* WhatsApp chat header strip */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-8 md:mb-12 px-5 py-4 rounded-2xl flex items-center gap-4"
          style={{
            background: "linear-gradient(135deg, #075E54 0%, #128C7E 60%, #25D366 100%)",
            boxShadow: "0 8px 40px rgba(37,211,102,0.2)",
          }}
        >
          <div className="relative flex-shrink-0">
            <div className="w-11 h-11 rounded-full bg-white/15 border border-white/25 flex items-center justify-center">
              <SiWhatsapp className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#128C7E]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm">Core Elite Digital</p>
            <p className="text-white/70 text-xs">Online · Strategy call available now</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-60" />
            <span className="text-white/60 text-[10px] tracking-wide font-semibold">LIVE</span>
          </div>
        </motion.div>

        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-5"
            style={{ color: "#25D366" }}
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
              style={{ backgroundImage: "linear-gradient(135deg, #25D366 0%, #128C7E 60%, #25D366 100%)" }}
            >
              Your Growth.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-base md:text-lg text-foreground/50 leading-relaxed"
          >
            Book a free 30-minute strategy session. We'll audit your current digital presence,
            identify your biggest opportunities, and tell you exactly how we'd scale your brand —
            wherever you are in the world.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">

          {/* Perk cards — WhatsApp chat bubble style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 md:mb-10">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col p-5 rounded-2xl group relative overflow-hidden"
                style={{
                  background: "rgba(37,211,102,0.04)",
                  border: "1px solid rgba(37,211,102,0.15)",
                  borderBottomLeftRadius: i === 0 ? 4 : undefined,
                }}
               
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,211,102,0.08), transparent)" }}
                />

                {/* Timestamp */}
                <p className="text-[9px] text-foreground/25 tracking-wide mb-3 text-right">{perk.time}</p>

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.25)" }}
                >
                  <perk.icon className="w-4.5 h-4.5" style={{ color: "#25D366", width: 18, height: 18 }} />
                </div>

                <h3 className="font-bold text-base mb-2 text-foreground/90">{perk.title}</h3>
                <p className="text-foreground/45 text-sm leading-relaxed flex-1">{perk.description}</p>

                {/* Checkmark ticks — WhatsApp style */}
                <div className="flex justify-end mt-3">
                  <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                    <path d="M1 5.5L4.5 9L10 3" stroke="#25D366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 5.5L9.5 9L15 3" stroke="#25D366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          <WorldClock />

          {/* CTA buttons */}
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
             
              className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-5 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #128C7E, #25D366)",
                color: "#ffffff",
                boxShadow: "0 8px 40px rgba(37,211,102,0.35)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 50px rgba(37,211,102,0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(37,211,102,0.35)"; }}
            >
              <SiWhatsapp className="w-5 h-5" />
              Book a Free Strategy Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={`https://wa.me/918218628232?text=${encodeURIComponent("Hi! I'd like to send a project brief to Core Elite Digital.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-5 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-300"
              style={{
                background: "rgba(37,211,102,0.06)",
                border: "1px solid rgba(37,211,102,0.25)",
                color: "rgba(37,211,102,0.7)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.12)";
                (e.currentTarget as HTMLElement).style.color = "#25D366";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,211,102,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.06)";
                (e.currentTarget as HTMLElement).style.color = "rgba(37,211,102,0.7)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,211,102,0.25)";
              }}
            >
              <MessageCircle className="w-4 h-4" />
              Send a Project Brief
            </a>
          </motion.div>

          {/* Social proof row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center justify-center gap-6 mt-10"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5" fill="#25D366" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-foreground/30 tracking-wide">
              5.0 rating · 50+ projects delivered · 10+ countries served
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
