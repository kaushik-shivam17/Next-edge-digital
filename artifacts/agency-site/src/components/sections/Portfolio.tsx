import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Aura Fashion",
    category: "E-Commerce",
    filter: "ecommerce",
    tags: ["Web Design", "Shopify", "Social Media"],
    gradient: ["#7F1D1D", "#BE185D", "#4C1D95"],
    result: "+214% Online Revenue",
    year: "2024",
    slug: "aurafashion.com",
    ui: { nav: 3, hero: true, blocks: [4, 3] },
  },
  {
    title: "Nova Wealth",
    category: "Fintech",
    filter: "fintech",
    tags: ["Web App", "Brand Identity", "SEO"],
    gradient: ["#1E3A5F", "#0E7490", "#1D4ED8"],
    result: "3x Client Acquisition",
    year: "2024",
    slug: "novawealth.io",
    ui: { nav: 4, hero: true, blocks: [3, 4] },
  },
  {
    title: "Lumina Estates",
    category: "Real Estate",
    filter: "realestate",
    tags: ["Website", "Social Media", "Brand"],
    gradient: ["#78350F", "#B45309", "#92400E"],
    result: "+40% Avg Sale Price",
    year: "2023",
    slug: "luminaestates.co",
    ui: { nav: 3, hero: true, blocks: [2, 4] },
  },
  {
    title: "Apex Motors",
    category: "Automotive",
    filter: "automotive",
    tags: ["Redesign", "Digital Strategy", "Social"],
    gradient: ["#064E3B", "#065F46", "#047857"],
    result: "580K New Followers",
    year: "2023",
    slug: "apexmotors.com",
    ui: { nav: 5, hero: true, blocks: [3, 3] },
  },
  {
    title: "Orbit Media",
    category: "B2B SaaS",
    filter: "saas",
    tags: ["Web Design", "SEO", "Branding"],
    gradient: ["#3B0764", "#4C1D95", "#5B21B6"],
    result: "+180% Organic Traffic",
    year: "2024",
    slug: "orbitmedia.io",
    ui: { nav: 4, hero: true, blocks: [4, 2] },
  },
  {
    title: "Forge Capital",
    category: "Finance",
    filter: "finance",
    tags: ["Brand Identity", "Web Design"],
    gradient: ["#1F2937", "#374151", "#4B5563"],
    result: "Premium Market Position",
    year: "2024",
    slug: "forgecapital.com",
    ui: { nav: 3, hero: true, blocks: [2, 3] },
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "E-Commerce", value: "ecommerce" },
  { label: "Fintech", value: "fintech" },
  { label: "Real Estate", value: "realestate" },
  { label: "Automotive", value: "automotive" },
  { label: "SaaS", value: "saas" },
  { label: "Finance", value: "finance" },
];

function BrowserMockup({ project }: { project: typeof projects[0] }) {
  return (
    <div className="absolute inset-0 flex flex-col pointer-events-none">
      {/* Browser chrome */}
      <div
        className="flex-shrink-0 h-8 flex items-center px-3 gap-2 z-10"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,80,80,0.7)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,200,50,0.7)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "rgba(50,210,90,0.7)" }} />
        </div>
        <div
          className="flex-1 h-5 rounded-full flex items-center px-2.5 gap-1.5 mx-1"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(50,210,90,0.6)" }} />
          <span className="text-[8px] text-white/25 tracking-wide truncate font-mono">{project.slug}</span>
        </div>
      </div>

      {/* Simulated page content */}
      <div className="flex-1 relative overflow-hidden opacity-25">
        {/* Simulated nav */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
          <div className="w-4 h-1.5 rounded-full bg-white/60" />
          <div className="flex-1" />
          {Array.from({ length: project.ui.nav }).map((_, i) => (
            <div key={i} className="w-6 h-1 rounded-full bg-white/30" />
          ))}
          <div className="w-8 h-3 rounded-sm bg-white/40" />
        </div>

        {/* Simulated hero */}
        {project.ui.hero && (
          <div className="px-4 py-3 flex flex-col gap-1.5">
            <div className="h-2.5 rounded-sm w-2/3 bg-white/50" />
            <div className="h-1.5 rounded-sm w-full bg-white/25" />
            <div className="h-1.5 rounded-sm w-4/5 bg-white/25" />
            <div className="mt-1 flex gap-2">
              <div className="h-4 w-14 rounded-sm bg-white/40" />
              <div className="h-4 w-14 rounded-sm bg-white/20" />
            </div>
          </div>
        )}

        {/* Simulated content blocks row 1 */}
        <div className="px-4 grid gap-1.5 mt-1" style={{ gridTemplateColumns: `repeat(${project.ui.blocks[0]}, 1fr)` }}>
          {Array.from({ length: project.ui.blocks[0] }).map((_, i) => (
            <div key={i} className="h-10 rounded-md bg-white/10" />
          ))}
        </div>
        {/* Simulated content blocks row 2 */}
        <div className="px-4 grid gap-1.5 mt-1.5" style={{ gridTemplateColumns: `repeat(${project.ui.blocks[1]}, 1fr)` }}>
          {Array.from({ length: project.ui.blocks[1] }).map((_, i) => (
            <div key={i} className="h-8 rounded-md bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      layout
      className="group relative flex-shrink-0 w-[300px] md:w-[380px] h-[460px] rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      data-testid={`card-portfolio-${index}`}
      data-cursor-text="VIEW"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]}, ${project.gradient[2]})` }}
      />

      {/* Browser mockup */}
      <BrowserMockup project={project} />

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Top right hover arrow */}
      <div className="absolute top-10 right-5 z-10">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <ArrowUpRight className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Result badge on hover */}
      <div className="absolute top-1/2 -translate-y-1/2 left-5 z-10">
        <div
          className="px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          style={{ background: "rgba(202,163,83,0.2)", backdropFilter: "blur(8px)", border: "1px solid rgba(202,163,83,0.4)", color: "#F0C97A" }}
        >
          {project.result}
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/40 mb-2">{project.category}</p>
        <h3 className="text-2xl font-black text-white mb-4 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.filter === activeFilter);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-16 md:py-32 bg-background relative z-10 border-t border-white/5 overflow-hidden"
    >
      <motion.div style={{ y: headerY, opacity: headerOpacity }} className="container px-4 md:px-6 mb-6 md:mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 md:gap-8 mb-6 md:mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Our Work</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Selected Projects</h2>
          </div>
          <p className="text-foreground/40 text-sm max-w-xs leading-relaxed">
            A curated selection of digital experiences engineered for category leaders.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              data-testid={`filter-${f.value}`}
              className="relative px-5 py-2 text-[11px] font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300"
              style={{
                background: activeFilter === f.value ? "rgba(202,163,83,0.12)" : "rgba(255,255,255,0.04)",
                border: activeFilter === f.value ? "1px solid rgba(202,163,83,0.4)" : "1px solid rgba(255,255,255,0.08)",
                color: activeFilter === f.value ? "#CAA353" : "rgba(255,255,255,0.35)",
              }}
            >
              {f.label}
              {activeFilter === f.value && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(202,163,83,0.06)" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          ))}
          <span className="ml-auto text-[10px] text-foreground/25 tracking-widest uppercase hidden md:block">
            Drag to explore →
          </span>
        </div>
      </motion.div>

      {/* Horizontal scroll track */}
      <div
        className="flex gap-5 overflow-x-auto pl-[max(1rem,calc((100vw-1280px)/2+1rem))] pr-8 pb-6 scrollbar-hide"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <div key={project.title} style={{ scrollSnapAlign: "start" }}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </AnimatePresence>

        {/* View all CTA card */}
        <motion.a
          href="#contact"
          className="flex-shrink-0 w-[220px] h-[460px] rounded-2xl flex flex-col items-center justify-center gap-4 group"
          style={{ background: "rgba(202,163,83,0.04)", border: "1px solid rgba(202,163,83,0.15)" }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ background: "rgba(202,163,83,0.08)" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            style={{ background: "rgba(202,163,83,0.15)", border: "1px solid rgba(202,163,83,0.3)" }}
          >
            <ArrowRight className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center px-6">
            <p className="text-sm font-bold text-foreground/60 group-hover:text-foreground transition-colors">
              Start Your Project
            </p>
            <p className="text-xs text-foreground/30 mt-1">Let's build something great</p>
          </div>
        </motion.a>
      </div>

      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
