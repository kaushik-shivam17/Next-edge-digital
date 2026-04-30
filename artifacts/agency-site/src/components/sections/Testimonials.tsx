import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Next Edge Digital completely overhauled our digital presence. Within 6 months of launching the new platform and social strategy, our direct-to-consumer revenue increased by 214%. They don't just build websites — they build businesses.",
    author: "Sarah Jenkins",
    role: "CMO",
    company: "Veridian Apparel",
    result: "+214% Revenue",
  },
  {
    quote:
      "Working with the Next Edge team feels like having an elite internal studio. Their strategic thinking and flawless execution positioned our software as the premium choice in a saturated market. The ROI has been extraordinary.",
    author: "David Chen",
    role: "Founder & CEO",
    company: "ScaleTech",
    result: "3x Client Growth",
  },
  {
    quote:
      "They commanded our rebrand with absolute precision. The attention to detail in everything — from the brand identity to the social content — allowed us to raise our project fees by 40% without losing a single client. World-class.",
    author: "Marcus Thorne",
    role: "Principal",
    company: "Thorne Architecture",
    result: "+40% Pricing Power",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 relative bg-background border-t border-white/5 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(45,100,255,0.05),transparent)]" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4"
          >
            Client Outcomes
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-6"
          >
            Results That Speak
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/50 text-lg leading-relaxed"
          >
            We measure success by the impact we create. Hear from the leaders who trusted us with their brands.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative p-8 md:p-10 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-colors duration-500 group flex flex-col"
              data-testid={`card-testimonial-${i}`}
            >
              {/* Result badge */}
              <div className="inline-flex mb-6">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm bg-primary/10 text-primary border border-primary/20">
                  {t.result}
                </span>
              </div>

              <Quote className="w-8 h-8 text-primary/15 mb-6 group-hover:text-primary/25 transition-colors" />

              <p className="text-foreground/70 leading-relaxed flex-1 mb-8 text-sm md:text-base">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-black text-primary">
                    {t.author.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-sm text-foreground">{t.author}</div>
                  <div className="text-foreground/40 text-xs mt-0.5">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
