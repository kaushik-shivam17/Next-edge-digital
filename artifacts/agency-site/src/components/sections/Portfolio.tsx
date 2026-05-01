import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Aura Fashion",
    category: "E-Commerce",
    tags: ["Web Design", "Shopify", "Social Media"],
    gradient: ["#7F1D1D", "#BE185D", "#4C1D95"],
    result: "+214% Online Revenue",
    year: "2024",
  },
  {
    title: "Nova Wealth",
    category: "Fintech Platform",
    tags: ["Web App", "Brand Identity", "SEO"],
    gradient: ["#1E3A5F", "#0E7490", "#1D4ED8"],
    result: "3x Client Acquisition",
    year: "2024",
  },
  {
    title: "Lumina Estates",
    category: "Luxury Real Estate",
    tags: ["Website", "Social Media", "Brand"],
    gradient: ["#78350F", "#B45309", "#92400E"],
    result: "+40% Avg Sale Price",
    year: "2023",
  },
  {
    title: "Apex Motors",
    category: "Automotive Brand",
    tags: ["Redesign", "Digital Strategy", "Social"],
    gradient: ["#064E3B", "#065F46", "#047857"],
    result: "580K New Followers",
    year: "2023",
  },
  {
    title: "Orbit Media",
    category: "B2B SaaS",
    tags: ["Web Design", "SEO", "Branding"],
    gradient: ["#3B0764", "#4C1D95", "#5B21B6"],
    result: "+180% Organic Traffic",
    year: "2024",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      className="group relative flex-shrink-0 w-[320px] md:w-[400px] h-[480px] rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      data-testid={`card-portfolio-${index}`}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]}, ${project.gradient[2]})`,
        }}
      />

      {/* Mesh overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Dark vignette bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Top bar */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
        <span
          className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.7)" }}
        >
          {project.year}
        </span>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <ArrowUpRight className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Center glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)" }}
      />

      {/* Result badge */}
      <div className="absolute top-1/2 -translate-y-1/2 left-5 z-10">
        <div
          className="px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400"
          style={{
            background: "rgba(202,163,83,0.2)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(202,163,83,0.4)",
            color: "#F0C97A",
          }}
        >
          {project.result}
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/40 mb-2">
          {project.category}
        </p>
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
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-32 bg-background relative z-10 border-t border-white/5 overflow-hidden"
    >
      {/* Header */}
      <motion.div
        style={{ y: headerY, opacity: headerOpacity }}
        className="container px-4 md:px-6 mb-14"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Our Work</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Selected Projects</h2>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-foreground/40 text-sm max-w-xs leading-relaxed">
              A curated selection of digital experiences engineered for category leaders.
            </p>
            <div className="flex-shrink-0 hidden md:flex items-center gap-2 text-foreground/30 text-xs tracking-widest uppercase">
              <span>Drag to explore</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto pl-[max(1rem,calc((100vw-1280px)/2+1rem))] pr-8 pb-6 scrollbar-hide"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {projects.map((project, index) => (
          <div key={index} style={{ scrollSnapAlign: "start" }}>
            <ProjectCard project={project} index={index} />
          </div>
        ))}

        {/* View all CTA card */}
        <motion.a
          href="#contact"
          className="flex-shrink-0 w-[240px] h-[480px] rounded-2xl flex flex-col items-center justify-center gap-4 group"
          style={{
            background: "rgba(202,163,83,0.04)",
            border: "1px solid rgba(202,163,83,0.15)",
          }}
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

      {/* Scroll gradient fade edges */}
      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
