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
  },
  {
    icon: MonitorSmartphone,
    number: "02",
    title: "Website Design & Development",
    description:
      "Cinematic, high-performance web experiences engineered to convert. We obsess over every interaction until your site feels like a premium product, not a brochure.",
    tags: ["UI/UX Design", "Custom Development", "Performance Optimization"],
  },
  {
    icon: Share2,
    number: "03",
    title: "Social Media Management",
    description:
      "We build commanding social narratives that dominate feeds, build cult-level brand followings, and turn passive scrollers into loyal customers.",
    tags: ["Content Strategy", "Community Building", "Paid Social"],
  },
  {
    icon: PenTool,
    number: "04",
    title: "Brand Identity",
    description:
      "Visual systems and messaging frameworks that project authority, command premium pricing, and make your brand instantly recognizable in any market.",
    tags: ["Logo & Identity", "Brand Guidelines", "Messaging Framework"],
  },
  {
    icon: TrendingUp,
    number: "05",
    title: "SEO & Organic Growth",
    description:
      "Data-driven organic acceleration that puts you in front of high-intent customers exactly when they're ready to buy. We don't chase vanity metrics.",
    tags: ["Technical SEO", "Content Marketing", "Link Acquisition"],
  },
  {
    icon: BarChart3,
    number: "06",
    title: "Analytics & Reporting",
    description:
      "Full-funnel transparency so you always know what's working and why. Custom dashboards that turn raw data into decisions that compound over time.",
    tags: ["GA4 Setup", "Conversion Tracking", "Monthly Reporting"],
  },
];

export function Services() {
  return (
    <section id="services" className="py-32 relative bg-background z-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group p-8 md:p-10 bg-background hover:bg-card/80 transition-colors duration-500 relative overflow-hidden"
              data-testid={`card-service-${index}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-500">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500">
                  {service.number}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 relative z-10">{service.title}</h3>
              <p className="text-foreground/50 text-sm leading-relaxed mb-6 relative z-10">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 relative z-10">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm bg-white/5 text-foreground/40 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
