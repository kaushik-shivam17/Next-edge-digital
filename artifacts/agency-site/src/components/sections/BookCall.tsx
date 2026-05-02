import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { ArrowRight, CalendarCheck, Clock4, ShieldCheck, CalendarDays } from "lucide-react";

const WHATSAPP_URL = `https://wa.me/916398054033?text=${encodeURIComponent("Hi! I'd like to book a free strategy call with Next Edge Digital.")}`;

const perks = [
  {
    icon: CalendarCheck,
    title: "30-Minute Call",
    description: "A focused, no-fluff session where we map out exactly what your brand needs to grow.",
  },
  {
    icon: Clock4,
    title: "Same-Day Confirmation",
    description: "We confirm your slot within hours — no waiting, no automated queues.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Commitment",
    description: "Completely free. No pitch decks. No pressure. Just clarity and a clear action plan.",
  },
];

export function BookCall() {
  return (
    <section className="py-32 relative z-10 overflow-hidden border-t border-white/5">
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
        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
            identify your biggest opportunities, and tell you exactly how we'd scale your brand.
          </motion.p>
        </div>

        {/* Perks row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
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

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary: WhatsApp booking */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-book-calendar"
            className="group inline-flex items-center gap-3 px-8 py-5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 shadow-lg hover:scale-[1.02]"
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

          {/* Secondary: Send Brief */}
          <a
            href="#contact"
            data-testid="button-book-whatsapp"
            className="group inline-flex items-center gap-3 px-8 py-5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300"
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

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-center justify-center gap-6 mt-10"
        >
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5" fill="#CAA353" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-xs text-foreground/30 tracking-wide">
            5.0 rating · 150+ brands transformed · Remote-first, globally deployed
          </p>
        </motion.div>
      </div>
    </section>
  );
}
