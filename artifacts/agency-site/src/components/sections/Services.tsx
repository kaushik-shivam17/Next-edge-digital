import { useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import { MonitorSmartphone, Share2, PenTool, TrendingUp, Compass, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Compass,
    number: "01",
    title: "Digital Strategy",
    description:
      "Comprehensive roadmaps that align your digital presence with aggressive growth targets. Every decision is data-driven, purposeful, and built to win.",
    tags: ["Market Research", "Competitive Analysis", "Growth Planning"],
    accent: "from-blue-500/20 to-indigo-600/5",
  },
  {
    icon: MonitorSmartphone,
    number: "02",
    title: "Website Design & Dev",
    description:
      "Cinematic, high-performance web experiences engineered to convert. We obsess over every interaction until your site feels like a premium product, not a brochure.",
    tags: ["UI/UX Design", "Custom Development", "Performance Optimization"],
    accent: "from-primary/20 to-amber-600/5",
  },
  {
    icon: Share2,
    number: "03",
    title: "Social Media Management",
    description:
      "We build commanding social narratives that dominate feeds, build cult-level brand followings, and turn passive scrollers into loyal customers.",
    tags: ["Content Strategy", "Community Building", "Paid Social"],
    accent: "from-pink-500/20 to-rose-600/5",
  },
  {
    icon: PenTool,
    number: "04",
    title: "Brand Identity",
    description:
      "Visual systems and messaging frameworks that project authority, command premium pricing, and make your brand instantly recognizable in any market.",
    tags: ["Logo & Identity", "Brand Guidelines", "Messaging Framework"],
    accent: "from-violet-500/20 to-purple-600/5",
  },
  {
    icon: TrendingUp,
    number: "05",
    title: "SEO & Organic Growth",
    description:
      "Data-driven organic acceleration that puts you in front of high-intent customers exactly when they're ready to buy. We don't chase vanity metrics.",
    tags: ["Technical SEO", "Content Marketing", "Link Acquisition"],
    accent: "from-emerald-500/20 to-teal-600/5",
  },
  {
    icon: BarChart3,
    number: "06",
    title: "Analytics & Reporting",
    description:
      "Full-funnel transparency so you always know what's working and why. Custom dashboards that turn raw data into decisions that compound over time.",
    tags: ["GA4 Setup", "Conversion Tracking", "Monthly Reporting"],
    accent: "from-cyan-500/20 to-sky-600/5",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    const glare = card.querySelector<HTMLDivElement>(".glare");
    if (glare) {
      glare.style.opacity = "1";
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.07) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    const glare = card.querySelector<HTMLDivElement>(".glare");
    if (glare) glare.style.opacity = "0";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-testid={`card-service-${index}`}
        className="group relative p-8 md:p-10 h-full overflow-hidden cursor-default"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "16px",
          transition: "transform 0.1s ease, box-shadow 0.3s ease",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glare layer */}
        <div className="glare absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-300 z-20" />

        {/* Accent gradient */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        />

        {/* Animated border on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 1px rgba(202,163,83,0.2)" }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
              style={{
                background: "rgba(202,163,83,0.08)",
                border: "1px solid rgba(202,163,83,0.15)",
              }}
            >
              <service.icon className="w-5 h-5 text-primary" />
            </div>
            <span
              className="text-5xl font-black transition-colors duration-500"
              style={{ color: "rgba(255,255,255,0.04)" }}
            >
              {service.number}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-foreground/45 text-sm leading-relaxed mb-6">{service.description}</p>

          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md text-foreground/35"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="py-16 md:py-32 relative bg-background z-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-20 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">What We Do</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Capabilities
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-foreground/50 max-w-md text-lg leading-relaxed"
          >
            We execute with surgical precision across every digital touchpoint.
            Our services are engineered for one outcome: market leadership.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
