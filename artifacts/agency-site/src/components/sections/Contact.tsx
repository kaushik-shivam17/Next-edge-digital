import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Mail, MapPin, Clock } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const WHATSAPP_NUMBER = "63980540";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to discuss a project with Next Edge Digital.")}`;

const contactDetails = [
  {
    icon: Mail,
    label: "General Inquiries",
    value: "hello@nextedgedigital.com",
    href: "mailto:hello@nextedgedigital.com",
  },
  {
    icon: MapPin,
    label: "Studio Location",
    value: "100 Broadway, Suite 400, New York, NY",
    href: "#",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "We respond within 24 business hours",
    href: "#",
  },
];

export function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Received",
      description: "Our partners will review your submission and respond within 24 hours.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-32 relative bg-card/10 z-10 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(45,100,255,0.04),transparent)]" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Get In Touch</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-[0.95]">
                Ready to<br />
                <span className="text-primary">Dominate</span><br />
                Your Market?
              </h2>
              <p className="text-foreground/50 text-lg leading-relaxed mb-10 max-w-sm">
                We are selectively accepting new projects. Fill out the form and our partners will personally review your inquiry.
              </p>

              {/* WhatsApp CTA */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-contact-whatsapp"
                className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 hover:border-[#25D366]/60 transition-all duration-300 group mb-10"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <SiWhatsapp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider uppercase text-[#25D366]">Chat on WhatsApp</p>
                  <p className="text-sm text-foreground/60 mt-0.5">Get an instant response</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#25D366]/60 ml-auto group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="space-y-8">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-primary/30 transition-colors">
                    <detail.icon className="w-4 h-4 text-primary/70" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/30 mb-1">{detail.label}</p>
                    <a
                      href={detail.href}
                      className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
                      data-testid={`link-contact-${detail.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {detail.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3 bg-card p-8 md:p-12 rounded-2xl border border-white/5"
          >
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    required
                    placeholder="John Smith"
                    data-testid="input-name"
                    className="bg-background/60 border-white/10 h-12 rounded-sm focus-visible:ring-primary focus-visible:border-primary/50 placeholder:text-foreground/20 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40">
                    Company
                  </Label>
                  <Input
                    id="company"
                    required
                    placeholder="Acme Corp"
                    data-testid="input-company"
                    className="bg-background/60 border-white/10 h-12 rounded-sm focus-visible:ring-primary focus-visible:border-primary/50 placeholder:text-foreground/20 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="john@company.com"
                  data-testid="input-email"
                  className="bg-background/60 border-white/10 h-12 rounded-sm focus-visible:ring-primary focus-visible:border-primary/50 placeholder:text-foreground/20 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service" className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40">
                  Primary Service Needed
                </Label>
                <Select>
                  <SelectTrigger
                    id="service"
                    data-testid="select-service"
                    className="bg-background/60 border-white/10 h-12 rounded-sm focus:ring-primary focus:border-primary/50 transition-colors text-foreground/70"
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-white/10">
                    <SelectItem value="web">Website Design & Development</SelectItem>
                    <SelectItem value="social">Social Media Management</SelectItem>
                    <SelectItem value="brand">Brand Identity</SelectItem>
                    <SelectItem value="seo">SEO & Organic Growth</SelectItem>
                    <SelectItem value="strategy">Digital Strategy</SelectItem>
                    <SelectItem value="other">Multiple Services / Full Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40">
                  Tell Us About Your Project
                </Label>
                <Textarea
                  id="message"
                  required
                  rows={5}
                  data-testid="textarea-message"
                  placeholder="Share your goals, timeline, and any relevant context..."
                  className="bg-background/60 border-white/10 rounded-sm focus-visible:ring-primary focus-visible:border-primary/50 placeholder:text-foreground/20 resize-none transition-colors"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                data-testid="button-submit"
                className="w-full h-14 text-sm font-bold tracking-widest uppercase bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm group transition-all"
              >
                Submit Inquiry
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* WhatsApp alternative */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-form-whatsapp"
                className="w-full flex items-center justify-center gap-2 h-12 rounded-sm border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 transition-colors duration-200 text-sm font-semibold"
              >
                <SiWhatsapp className="w-4 h-4" />
                Or message us directly on WhatsApp
              </a>

              <p className="text-center text-[10px] text-foreground/25 tracking-wider">
                We respond to all inquiries within 24 business hours. Your information is kept strictly confidential.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
