import { useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquare, Bot, Globe, ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { scrollToSection } from "@/lib/scrollTo";

const aiServices = [
  {
    icon: Phone,
    number: "01",
    title: "AI Call Management",
    tagline: "Never miss a lead. Ever.",
    description:
      "Our intelligent AI handles every inbound call, qualifies leads in real time, books appointments, answers FAQs, and syncs everything to your CRM — 24 hours a day, 7 days a week, in multiple languages.",
    tags: ["24/7 Call Handling", "Lead Qualification", "CRM Sync", "Multi-Language"],
    glow: "rgba(202,163,83,0.12)",
    border: "rgba(202,163,83,0.25)",
  },
  {
    icon: MessageSquare,
    number: "02",
    title: "AI WhatsApp Management",
    tagline: "Your business, always online.",
    description:
      "A fully automated AI brain running on your WhatsApp. It responds instantly to inquiries, sends follow-ups, handles support, collects payments, and nurtures leads — all while you sleep.",
    tags: ["Instant Responses", "Automated Follow-ups", "Booking & Payments", "Sales Automation"],
    glow: "rgba(37,211,102,0.08)",
    border: "rgba(37,211,102,0.2)",
  },
  {
    icon: Bot,
    number: "03",
    title: "AI Social Media Management",
    tagline: "Dominate every feed, effortlessly.",
    description:
      "AI generates, schedules, and posts brand-consistent content across all platforms. It analyzes performance, adjusts strategy in real time, and engages with your audience — scaling your presence without a team.",
    tags: ["AI Content Creation", "Auto-Scheduling", "Multi-Platform", "Engagement AI"],
    glow: "rgba(99,102,241,0.1)",
    border: "rgba(99,102,241,0.2)",
  },
  {
    icon: Globe,
    number: "04",
    title: "AI Site Building",
    tagline: "Websites that build themselves.",
    description:
      "AI-powered website creation that launches in days, not months. Self-optimizing landing pages, automated A/B testing, dynamic content personalization, and AI-driven conversion rate optimization — continuously improving.",
    tags: ["Rapid Deployment", "Self-Optimizing", "A/B Testing AI", "Conversion AI"],
    glow: "rgba(202,163,83,0.12)",
    border: "rgba(202,163,83,0.25)",
  },
];

const stats = [
  { icon: Clock, value: "24/7", label: "Always Active" },
  { icon: Zap, value: "< 1s", label: "Response Time" },
  { icon: Shield, value: "100%", label: "Automated" },
];

function AiServiceCard({ service, index }: { service: typeof aiServices[0]; index: number }) {
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
        className="group relative flex flex-col h-full p-8 md:p-10 rounded-2xl overflow-hidden cursor-default"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: `1px solid ${service.border}`,
          transition: "transform 0.15s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Glow bg */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${service.glow}, transparent)` }}
        />

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
        <h3 className="text-xl md:text-2xl font-black mb-1 relative z-10 group-hover:text-primary transition-colors duration-300">
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
        <button
          onClick={() => scrollToSection("contact")}
          className="group/btn relative z-10 flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase transition-colors duration-300"
          style={{ color: "rgba(255,255,255,0.35)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#CAA353"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
        >
          Get Started
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>

        {/* Animated border on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${service.border}` }}
        />
      </div>
    </motion.div>
  );
}

export function AiServices() {
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

            {/* Stat pills */}
            <div className="flex flex-wrap gap-3">
              {stats.map(({ icon: Icon, value, label }) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {aiServices.map((service, index) => (
            <AiServiceCard key={index} service={service} index={index} />
          ))}
        </div>

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
