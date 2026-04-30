import { motion } from "framer-motion";
import { MonitorSmartphone, Share2, PenTool, TrendingUp, Compass } from "lucide-react";

const services = [
  {
    title: "Digital Strategy",
    description: "Comprehensive roadmaps that align your digital presence with aggressive business goals.",
    icon: Compass,
  },
  {
    title: "Web Design & Dev",
    description: "High-performance, cinematic web experiences that convert visitors into absolute loyalists.",
    icon: MonitorSmartphone,
  },
  {
    title: "Social Media",
    description: "Commanding social narratives that dominate feeds and build cult-like brand followings.",
    icon: Share2,
  },
  {
    title: "Brand Identity",
    description: "Visual systems and messaging frameworks that project authority and premium positioning.",
    icon: PenTool,
  },
  {
    title: "SEO & Growth",
    description: "Data-driven organic acceleration to ensure you capture and convert high-intent traffic.",
    icon: TrendingUp,
  }
];

export function Services() {
  return (
    <section className="py-32 relative bg-background z-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Capabilities</h2>
            <p className="text-xl text-foreground/60 leading-relaxed">
              We execute with surgical precision across every digital touchpoint. Our services are designed for one outcome: market leadership.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-colors duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none">
                <service.icon className="w-32 h-32 text-primary" />
              </div>
              
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors duration-500 border border-white/10 group-hover:border-primary/30">
                <service.icon className="w-5 h-5 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-foreground/60 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
