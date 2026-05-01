import { motion } from "framer-motion";

const brands = [
  { name: "Veridian Apparel", initials: "VA", color: "#BE185D" },
  { name: "ScaleTech", initials: "ST", color: "#1D4ED8" },
  { name: "Thorne Architecture", initials: "TA", color: "#92400E" },
  { name: "Nova Wealth", initials: "NW", color: "#0E7490" },
  { name: "Lumina Estates", initials: "LE", color: "#B45309" },
  { name: "Apex Motors", initials: "AM", color: "#047857" },
  { name: "Aura Fashion", initials: "AF", color: "#7C3AED" },
  { name: "Orbit Media", initials: "OM", color: "#4C1D95" },
  { name: "Forge Capital", initials: "FC", color: "#374151" },
  { name: "Meridian Health", initials: "MH", color: "#065F46" },
];

function BrandBadge({ brand }: { brand: typeof brands[0] }) {
  return (
    <div className="shrink-0 flex items-center gap-3 px-5 py-2.5 rounded-full select-none group"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white flex-shrink-0"
        style={{ background: brand.color }}
      >
        {brand.initials}
      </div>
      <span className="text-xs font-semibold tracking-widest uppercase whitespace-nowrap text-foreground/35 group-hover:text-foreground/55 transition-colors duration-300">
        {brand.name}
      </span>
    </div>
  );
}

export function TrustedBy() {
  return (
    <section className="py-16 border-y border-white/5 bg-card/20 overflow-hidden relative z-10">
      <div className="container px-4 md:px-6 mb-10">
        <p className="text-center text-xs font-semibold tracking-[0.3em] uppercase text-foreground/30">
          Trusted by industry leaders across 12 sectors
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0 gap-3 items-center"
        >
          {[...brands, ...brands].map((brand, i) => (
            <BrandBadge key={i} brand={brand} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
