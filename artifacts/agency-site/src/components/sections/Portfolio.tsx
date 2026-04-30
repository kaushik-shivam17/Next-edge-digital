import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Aura Fashion",
    category: "E-Commerce",
    tags: ["Web Design", "Shopify", "Social Media"],
    gradient: "from-rose-500/20 via-pink-600/10 to-purple-700/20",
    accent: "rose-400",
    result: "+214% Online Revenue",
  },
  {
    title: "Nova Wealth",
    category: "Fintech Platform",
    tags: ["Web App", "Brand Identity", "SEO"],
    gradient: "from-blue-500/20 via-cyan-600/10 to-indigo-700/20",
    accent: "blue-400",
    result: "3x Client Acquisition",
  },
  {
    title: "Lumina Estates",
    category: "Luxury Real Estate",
    tags: ["Website", "Social Media", "Brand"],
    gradient: "from-amber-500/20 via-yellow-600/10 to-orange-700/20",
    accent: "amber-400",
    result: "+40% Average Sale Price",
  },
  {
    title: "Apex Motors",
    category: "Automotive Brand",
    tags: ["Redesign", "Digital Strategy", "Social"],
    gradient: "from-emerald-500/20 via-teal-600/10 to-green-700/20",
    accent: "emerald-400",
    result: "580K New Social Followers",
  },
  {
    title: "Orbit Media",
    category: "B2B SaaS",
    tags: ["Web Design", "SEO", "Branding"],
    gradient: "from-violet-500/20 via-purple-600/10 to-fuchsia-700/20",
    accent: "violet-400",
    result: "+180% Organic Traffic",
  },
];

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="work" ref={containerRef} className="py-32 bg-background relative z-10 border-t border-white/5">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Our Work</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Selected Projects</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-foreground/50 max-w-sm text-base leading-relaxed"
          >
            A curated selection of digital experiences engineered for category leaders.
          </motion.p>
        </div>

        {/* Featured top 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {projects.slice(0, 2).map((project, index) => {
            const y = useTransform(scrollYProgress, [0, 1], [0, index === 1 ? 60 : -30]);
            return (
              <PortfolioCard key={index} project={project} y={y} large data-testid={`card-portfolio-${index}`} />
            );
          })}
        </div>

        {/* Bottom 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.slice(2).map((project, index) => {
            const y = useTransform(scrollYProgress, [0, 1], [0, (index % 2 === 0 ? -20 : 40)]);
            return (
              <PortfolioCard key={index + 2} project={project} y={y} data-testid={`card-portfolio-${index + 2}`} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

type Project = {
  title: string;
  category: string;
  tags: string[];
  gradient: string;
  accent: string;
  result: string;
};

function PortfolioCard({
  project,
  y,
  large,
  "data-testid": testId,
}: {
  project: Project;
  y: ReturnType<typeof useTransform>;
  large?: boolean;
  "data-testid"?: string;
}) {
  return (
    <motion.div
      style={{ y }}
      className="group cursor-pointer"
      data-testid={testId}
    >
      <div
        className={`relative overflow-hidden rounded-xl ${large ? "aspect-[16/10]" : "aspect-[4/3]"} mb-5 border border-white/5 group-hover:border-white/15 transition-colors duration-500`}
      >
        {/* Gradient background representing the project */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-all duration-700 group-hover:scale-105`} />
        <div className="absolute inset-0 bg-background/20" />

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Result badge */}
        <div className="absolute top-5 left-5 px-3 py-1.5 rounded-sm bg-black/60 backdrop-blur-sm border border-white/10">
          <span className="text-xs font-bold text-primary tracking-wider">{project.result}</span>
        </div>

        {/* Arrow */}
        <div className="absolute top-5 right-5 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
          <ArrowUpRight className="w-4 h-4" />
        </div>

        {/* Center title card */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/40 mb-2">{project.category}</p>
            <h3 className={`font-black tracking-tight text-foreground ${large ? "text-3xl md:text-4xl" : "text-2xl"}`}>
              {project.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm bg-white/5 text-foreground/40 border border-white/5"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
