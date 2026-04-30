import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  category: string;
  tags: string[];
  gradient: string;
  result: string;
};

const projects: Project[] = [
  {
    title: "Aura Fashion",
    category: "E-Commerce",
    tags: ["Web Design", "Shopify", "Social Media"],
    gradient: "from-rose-500/20 via-pink-600/10 to-purple-700/20",
    result: "+214% Online Revenue",
  },
  {
    title: "Nova Wealth",
    category: "Fintech Platform",
    tags: ["Web App", "Brand Identity", "SEO"],
    gradient: "from-blue-500/20 via-cyan-600/10 to-indigo-700/20",
    result: "3x Client Acquisition",
  },
  {
    title: "Lumina Estates",
    category: "Luxury Real Estate",
    tags: ["Website", "Social Media", "Brand"],
    gradient: "from-amber-500/20 via-yellow-600/10 to-orange-700/20",
    result: "+40% Average Sale Price",
  },
  {
    title: "Apex Motors",
    category: "Automotive Brand",
    tags: ["Redesign", "Digital Strategy", "Social"],
    gradient: "from-emerald-500/20 via-teal-600/10 to-green-700/20",
    result: "580K New Social Followers",
  },
  {
    title: "Orbit Media",
    category: "B2B SaaS",
    tags: ["Web Design", "SEO", "Branding"],
    gradient: "from-violet-500/20 via-purple-600/10 to-fuchsia-700/20",
    result: "+180% Organic Traffic",
  },
];

// Each card is its own component so it can safely use hooks at the top level
function PortfolioCard({
  project,
  parallaxDir,
  large,
  index,
}: {
  project: Project;
  parallaxDir: number;
  large?: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxDir]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="group cursor-pointer"
      data-testid={`card-portfolio-${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <div
        className={`relative overflow-hidden rounded-xl ${
          large ? "aspect-[16/10]" : "aspect-[4/3]"
        } mb-5 border border-white/5 group-hover:border-white/15 transition-colors duration-500`}
      >
        {/* Gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 group-hover:scale-105`}
        />
        <div className="absolute inset-0 bg-background/25" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Result badge */}
        <div className="absolute top-5 left-5 px-3 py-1.5 rounded-sm bg-black/60 backdrop-blur-sm border border-white/10 z-10">
          <span className="text-xs font-bold text-primary tracking-wider">{project.result}</span>
        </div>

        {/* Arrow */}
        <div className="absolute top-5 right-5 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <ArrowUpRight className="w-4 h-4" />
        </div>

        {/* Center title */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/40 mb-2">
              {project.category}
            </p>
            <h3
              className={`font-black tracking-tight text-foreground ${
                large ? "text-3xl md:text-4xl" : "text-2xl"
              }`}
            >
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

export function Portfolio() {
  return (
    <section id="work" className="py-32 bg-background relative z-10 border-t border-white/5">
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
          <PortfolioCard project={projects[0]} parallaxDir={-30} large index={0} />
          <PortfolioCard project={projects[1]} parallaxDir={60} large index={1} />
        </div>

        {/* Bottom 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PortfolioCard project={projects[2]} parallaxDir={-20} index={2} />
          <PortfolioCard project={projects[3]} parallaxDir={40} index={3} />
          <PortfolioCard project={projects[4]} parallaxDir={-20} index={4} />
        </div>
      </div>
    </section>
  );
}
