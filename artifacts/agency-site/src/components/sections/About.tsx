import { motion } from "framer-motion";
import { Award, Users, Globe, Zap } from "lucide-react";

const milestones = [
  { icon: Award, label: "42+ Brands Transformed", sub: "Across multiple industries globally" },
  { icon: Users, label: "98% Client Retention", sub: "Most clients stay 2+ years" },
  { icon: Globe, label: "Clients in 3+ Countries", sub: "India, UAE & Singapore" },
  { icon: Zap, label: "Avg. 3-Week Turnaround", sub: "Without cutting corners" },
];

export function About() {
  return (
    <section id="about" className="py-16 md:py-32 relative z-10 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,rgba(202,163,83,0.04),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,rgba(45,100,255,0.04),transparent)]" />

      <div className="container px-4 md:px-6 relative z-10">

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 md:mb-20"
        >
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
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

        {/* Philosophy quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="p-10 rounded-2xl text-center"
          style={{
            background: "rgba(202,163,83,0.04)",
            border: "1px solid rgba(202,163,83,0.12)",
          }}
        >
          <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground/70 max-w-2xl mx-auto italic">
            "We don't take on 30 clients at a time. We take on the right ones, go all in, and build
            something that outlasts the campaign."
          </p>
          <p className="mt-5 text-xs font-bold tracking-[0.25em] uppercase text-primary">
            — nextedgetech
          </p>
        </motion.div>

      </div>
    </section>
  );
}
