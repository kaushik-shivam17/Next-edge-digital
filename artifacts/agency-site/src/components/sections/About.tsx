import { motion } from "framer-motion";
import { Award, Users, Globe, Zap } from "lucide-react";

const team = [
  {
    name: "Aryan Mehta",
    role: "Founder & Creative Director",
    bio: "10+ years crafting digital experiences for high-growth brands. Obsessed with the intersection of design and revenue.",
    accent: "#CAA353",
    initials: "AM",
  },
  {
    name: "Priya Sharma",
    role: "Head of Digital Strategy",
    bio: "Former growth lead at two unicorn startups. She builds marketing systems that compound over time — not one-hit campaigns.",
    accent: "#60A5FA",
    initials: "PS",
  },
  {
    name: "Rohan Kapoor",
    role: "Lead Developer",
    bio: "Full-stack engineer with a designer's eye. He ships pixel-perfect, lightning-fast web experiences that actually convert.",
    accent: "#A78BFA",
    initials: "RK",
  },
];

const milestones = [
  { icon: Award, label: "150+ Brands Transformed", sub: "Across 12 industries globally" },
  { icon: Users, label: "98% Client Retention", sub: "Most clients stay 2+ years" },
  { icon: Globe, label: "Clients in 8 Countries", sub: "India, UAE, US, UK & more" },
  { icon: Zap, label: "Avg. 3-Week Turnaround", sub: "Without cutting corners" },
];

export function About() {
  return (
    <section id="about" className="py-32 relative z-10 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,rgba(202,163,83,0.04),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,rgba(45,100,255,0.04),transparent)]" />

      <div className="container px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">The Studio</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.9] mb-6">
              Real People.<br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #CAA353 0%, #F0C97A 100%)" }}
              >
                Real Results.
              </span>
            </h2>
            <p className="text-foreground/50 text-lg leading-relaxed max-w-md">
              Next Edge Digital is a remote-first studio founded in 2018. We're a tight team of strategists,
              designers, and engineers — no account managers, no middlemen. You work directly with the people
              doing the work.
            </p>
          </motion.div>

          {/* Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                className="p-5 rounded-2xl group"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: "rgba(202,163,83,0.1)", border: "1px solid rgba(202,163,83,0.18)" }}
                >
                  <m.icon className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm font-bold text-foreground/90 mb-1">{m.label}</p>
                <p className="text-xs text-foreground/35 leading-snug">{m.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-2">Who You'll Work With</p>
          <p className="text-foreground/40 text-sm">The core team behind every project.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-8 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${member.accent}10, transparent)` }}
              />
              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-8 right-8 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${member.accent}50, transparent)` }}
              />

              <div className="relative z-10">
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-base font-black group-hover:scale-105 transition-transform duration-300"
                  style={{
                    background: `${member.accent}18`,
                    border: `1px solid ${member.accent}35`,
                    color: member.accent,
                  }}
                >
                  {member.initials}
                </div>

                <h3 className="text-base font-bold text-foreground/90 mb-1">{member.name}</h3>
                <p
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-4"
                  style={{ color: member.accent }}
                >
                  {member.role}
                </p>
                <p className="text-foreground/45 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Philosophy quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 p-10 rounded-2xl text-center"
          style={{
            background: "rgba(202,163,83,0.04)",
            border: "1px solid rgba(202,163,83,0.12)",
          }}
        >
          <p
            className="text-xl md:text-2xl font-light leading-relaxed text-foreground/70 max-w-2xl mx-auto italic"
          >
            "We don't take on 30 clients at a time. We take on the right ones, go all in, and build
            something that outlasts the campaign."
          </p>
          <p className="mt-5 text-xs font-bold tracking-[0.25em] uppercase text-primary">
            — Aryan Mehta, Founder
          </p>
        </motion.div>

      </div>
    </section>
  );
}
