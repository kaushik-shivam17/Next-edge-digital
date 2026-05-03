import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Building2,
  Sparkles,
  BrainCircuit,
  ShieldCheck,
  Leaf,
  TrendingUp,
  Car,
  Building,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const brands: { name: string; icon: LucideIcon; color: string; bg: string }[] = [
  { name: "EdTech Future",      icon: GraduationCap, color: "#60A5FA", bg: "rgba(37,99,235,0.12)" },
  { name: "School Management",  icon: BookOpen,      color: "#34D399", bg: "rgba(5,150,105,0.12)"  },
  { name: "Reddy Estate",       icon: Building2,     color: "#FCD34D", bg: "rgba(180,83,9,0.12)"   },
  { name: "New Fashion",        icon: Sparkles,      color: "#F472B6", bg: "rgba(190,24,93,0.12)"  },
  { name: "Nova AI",            icon: BrainCircuit,  color: "#C084FC", bg: "rgba(124,58,237,0.12)" },
  { name: "CyberSec",           icon: ShieldCheck,   color: "#F87171", bg: "rgba(220,38,38,0.12)"  },
  { name: "Kova Skincare",      icon: Leaf,          color: "#CAA353", bg: "rgba(202,163,83,0.12)" },
  { name: "NestFin",            icon: TrendingUp,    color: "#22D3EE", bg: "rgba(14,116,144,0.12)" },
  { name: "Apex Motors",        icon: Car,           color: "#4ADE80", bg: "rgba(4,120,87,0.12)"   },
  { name: "Prestige Landbase",  icon: Building,      color: "#A78BFA", bg: "rgba(76,29,149,0.12)"  },
];

function BrandBadge({ brand }: { brand: typeof brands[0] }) {
  const Icon = brand.icon;
  return (
    <div
      className="shrink-0 flex items-center gap-3 px-5 py-2.5 rounded-full select-none group transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: brand.bg }}
      >
        <Icon size={14} style={{ color: brand.color }} strokeWidth={2} />
      </div>
      <span className="text-xs font-semibold tracking-widest uppercase whitespace-nowrap text-foreground/35 group-hover:text-foreground/60 transition-colors duration-300">
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
          Trusted by ambitious brands across 3+ countries worldwide
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
