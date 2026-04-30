import { motion } from "framer-motion";

const brands = [
  "Veridian Apparel",
  "ScaleTech",
  "Thorne Architecture",
  "Nova Wealth",
  "Lumina Estates",
  "Apex Motors",
  "Aura Fashion",
  "Orbit Media",
  "Forge Capital",
  "Meridian Health",
];

export function TrustedBy() {
  return (
    <section className="py-16 border-y border-white/5 bg-card/20 overflow-hidden relative z-10">
      <div className="container px-4 md:px-6 mb-10">
        <p className="text-center text-xs font-semibold tracking-[0.3em] uppercase text-foreground/30">
          Trusted by industry leaders
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0 gap-16 items-center"
        >
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center gap-3 text-foreground/25 hover:text-foreground/50 transition-colors duration-300 cursor-default select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              <span className="text-sm font-semibold tracking-widest uppercase whitespace-nowrap">{brand}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
