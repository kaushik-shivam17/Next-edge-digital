import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "NEXUS completely overhauled our digital presence. Within 6 months of launching the new platform and social strategy, our direct-to-consumer revenue increased by 314%. They don't just build websites; they build businesses.",
    author: "Sarah Jenkins",
    role: "CMO, Veridian Apparel",
  },
  {
    quote: "Working with them feels like having an elite internal team. Their strategic thinking and flawless execution positioned our software as the premium choice in a crowded market. The ROI has been staggering.",
    author: "David Chen",
    role: "Founder, ScaleTech",
  },
  {
    quote: "They commanded our rebrand with absolute authority. The attention to detail and cinematic quality of the final product allowed us to raise our prices by 40% without losing a single client. Truly world-class.",
    author: "Marcus Thorne",
    role: "CEO, Thorne Architecture",
  }
];

export function Testimonials() {
  return (
    <section className="py-32 relative bg-card/20 border-t border-white/5 z-10 overflow-hidden">
      {/* Decorative noise/texture could go here via pseudo element in CSS */}
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Client Outcomes</h2>
          <p className="text-xl text-foreground/60">
            We measure success by the impact we create. Hear from the leaders who trusted us with their brands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 md:p-10 rounded-2xl bg-background border border-white/5 relative group hover:border-primary/30 transition-colors"
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-8 right-8 group-hover:text-primary/40 transition-colors" />
              <p className="text-lg leading-relaxed text-foreground/80 mb-10 relative z-10">
                "{t.quote}"
              </p>
              <div className="mt-auto">
                <div className="font-bold text-lg">{t.author}</div>
                <div className="text-primary text-sm uppercase tracking-wider mt-1">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
