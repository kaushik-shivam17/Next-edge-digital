import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { ArrowRight, CalendarCheck, Clock4, ShieldCheck } from "lucide-react";

const WHATSAPP_URL = `https://wa.me/916398054033?text=${encodeURIComponent("Hi! I'd like to book a free strategy call with Next Edge Digital.")}`;

const perks = [
  {
    icon: CalendarCheck,
    title: "30-Minute Call",
    description: "A focused, no-fluff session where we map out exactly what your brand needs.",
  },
  {
    icon: Clock4,
    title: "Same-Day Response",
    description: "We confirm your slot within hours — no waiting, no automated queues.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Commitment",
    description: "The call is completely free. No pitch decks. No pressure. Just clarity.",
  },
];

export function BookCall() {
  return (
    <section className="py-32 relative z-10 overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(37,211,102,0.07),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(45,100,255,0.06),transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Headline block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-[#25D366] mb-5"
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-primary">
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
            identify your biggest opportunities, and tell you exactly how we'd approach scaling your brand.
          </motion.p>
        </div>

        {/* Perks row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {perks.map((perk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-card/40 border border-white/5 hover:border-[#25D366]/20 transition-colors duration-300"
              data-testid={`card-perk-${i}`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center mb-5">
                <perk.icon className="w-5 h-5 text-[#25D366]" />
              </div>
              <h3 className="font-bold text-base mb-2">{perk.title}</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">{perk.description}</p>
            </motion.div>
          ))}
        </div>

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
            data-testid="button-book-whatsapp"
            className="group inline-flex items-center gap-3 px-8 py-5 rounded-xl bg-[#25D366] hover:bg-[#22c35e] text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:scale-[1.02]"
          >
            <SiWhatsapp className="w-5 h-5" />
            Book Free Strategy Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            data-testid="button-book-form"
            className="inline-flex items-center gap-2 px-8 py-5 rounded-xl bg-transparent border border-white/10 text-foreground/70 hover:border-white/30 hover:text-foreground font-semibold text-sm tracking-wide transition-all duration-300"
          >
            Fill Out the Brief Instead
          </a>
        </motion.div>

        {/* Social proof micro-line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-xs text-foreground/25 mt-8 tracking-wide"
        >
          Joined by 150+ brands who trusted us to transform their digital presence.
        </motion.p>
      </div>
    </section>
  );
}
