import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Aura Fashion",
    category: "E-Commerce",
    image: "/project-1.png",
  },
  {
    title: "Nova Wealth",
    category: "Fintech Platform",
    image: "/project-2.png",
  },
  {
    title: "Lumina Estates",
    category: "Luxury Real Estate",
    image: "/project-3.png",
  },
  {
    title: "Apex Motors",
    category: "Automotive Brand",
    image: "/project-4.png",
  }
];

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="py-32 bg-background relative z-10">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Selected Work</h2>
          <p className="text-xl text-foreground/60 max-w-2xl">
            A curated selection of digital experiences engineered for category leaders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => {
            const y = useTransform(
              scrollYProgress,
              [0, 1],
              [0, index % 2 !== 0 ? 100 : -50]
            );

            return (
              <motion.div
                key={index}
                style={{ y }}
                className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-6">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">{project.category}</div>
                  <h3 className="text-3xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
