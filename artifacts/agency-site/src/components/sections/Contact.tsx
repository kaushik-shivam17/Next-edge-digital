import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Received",
      description: "We'll be in touch within 24 hours.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="py-32 relative bg-background z-10 border-t border-white/5">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8">Ready to <br/><span className="text-primary">Dominate?</span></h2>
            <p className="text-xl text-foreground/60 leading-relaxed mb-12 max-w-lg">
              We are currently accepting new projects for Q3. Fill out the form below and our partners will review your inquiry.
            </p>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-2">General Inquiries</h4>
                <a href="mailto:hello@nexusagency.co" className="text-2xl font-medium hover:text-primary transition-colors">hello@nexusagency.co</a>
              </div>
              <div>
                <h4 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-2">Location</h4>
                <address className="text-xl font-medium not-italic">
                  100 Broadway, Suite 400<br />
                  New York, NY 10005
                </address>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-8 md:p-12 rounded-2xl border border-white/5"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-xs uppercase tracking-widest text-foreground/60">Full Name</Label>
                  <Input id="name" required className="bg-background/50 border-white/10 h-12 rounded-none focus-visible:ring-primary focus-visible:border-primary transition-all" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="company" className="text-xs uppercase tracking-widest text-foreground/60">Company</Label>
                  <Input id="company" required className="bg-background/50 border-white/10 h-12 rounded-none focus-visible:ring-primary focus-visible:border-primary transition-all" />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="email" className="text-xs uppercase tracking-widest text-foreground/60">Email Address</Label>
                <Input id="email" type="email" required className="bg-background/50 border-white/10 h-12 rounded-none focus-visible:ring-primary focus-visible:border-primary transition-all" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="service" className="text-xs uppercase tracking-widest text-foreground/60">Primary Interest</Label>
                <Select required>
                  <SelectTrigger id="service" className="bg-background/50 border-white/10 h-12 rounded-none focus-visible:ring-primary focus-visible:border-primary transition-all">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Website Design & Development</SelectItem>
                    <SelectItem value="social">Social Media Management</SelectItem>
                    <SelectItem value="brand">Brand Identity</SelectItem>
                    <SelectItem value="seo">SEO & Growth</SelectItem>
                    <SelectItem value="other">Other / Multiple</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="message" className="text-xs uppercase tracking-widest text-foreground/60">Project Details</Label>
                <Textarea id="message" required rows={4} className="bg-background/50 border-white/10 rounded-none focus-visible:ring-primary focus-visible:border-primary transition-all resize-none" />
              </div>

              <Button type="submit" size="lg" className="w-full h-14 text-base bg-primary text-primary-foreground hover:bg-primary/90 rounded-none uppercase tracking-widest mt-4">
                Submit Inquiry
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
