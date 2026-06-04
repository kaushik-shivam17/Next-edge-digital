import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Users, Globe, Zap, User } from "lucide-react";
import { fetchTeamMembers, type SanityTeamMember } from "@/lib/sanity";

const milestones = [
  { icon: Award, label: "42+ Brands Transformed", sub: "Across multiple industries globally" },
  { icon: Users, label: "98% Client Retention", sub: "Most clients stay 2+ years" },
  { icon: Globe, label: "Clients in 3+ Countries", sub: "India, UAE & Singapore" },
  { icon: Zap, label: "Avg. 3-Week Turnaround", sub: "Without cutting corners" },
];

function TeamCard({ member, index }: { member: SanityTeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-6 rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(202,163,83,0.25)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

      <div className="relative z-10 flex items-start gap-4">
        <div className="flex-shrink-0">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="w-14 h-14 rounded-xl object-cover"
              style={{ border: "1px solid rgba(202,163,83,0.2)" }}
              loading="lazy"
            />
          ) : (
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(202,163,83,0.08)", border: "1px solid rgba(202,163,83,0.15)" }}
            >
              <User className="w-6 h-6 text-primary/50" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-bold text-foreground/90 group-hover:text-primary transition-colors duration-300">
            {member.name}
          </h4>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary/60 mb-2">{member.role}</p>
          {member.bio && (
            <p className="text-sm text-foreground/40 leading-relaxed line-clamp-2">{member.bio}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function About() {
  const [team, setTeam] = useState<SanityTeamMember[]>([]);

  useEffect(() => {
    fetchTeamMembers()
      .then((data) => { if (data?.length) setTeam(data); })
      .catch(() => {});
  }, []);

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

        {/* Team Members (from Sanity) */}
        {team.length > 0 && (
          <div className="mb-12 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-8"
            >
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">The Team</p>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight">Who We Are</h3>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.map((member, i) => (
                <TeamCard key={member._id} member={member} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Philosophy quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="p-6 md:p-10 rounded-2xl text-center"
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
            — Core Elite Digital
          </p>
        </motion.div>

      </div>
    </section>
  );
}
