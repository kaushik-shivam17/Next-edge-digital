import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const WHATSAPP_NUMBER = "916398054033";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to discuss a project with Next Edge Digital.")}`;

const contactDetails = [
  { icon: Mail, label: "General Inquiries", value: "hello@nextedgedigital.com", href: "mailto:hello@nextedgedigital.com" },
  { icon: MapPin, label: "Studio", value: "Remote-first · Serving clients globally", href: "#" },
  { icon: Clock, label: "Response Time", value: "We respond within 24 business hours", href: "#" },
];

const services = [
  "Website Design & Development",
  "Social Media Management",
  "Brand Identity",
  "SEO & Organic Growth",
  "Digital Strategy",
  "Full-Service Package",
];

const budgets = [
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Let's Discuss",
];

type FormData = {
  name: string;
  company: string;
  email: string;
  service: string;
  budget: string;
  message: string;
};

const STEP_LABELS = ["About You", "Your Project", "Final Details"];

const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

export function Contact() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "", company: "", email: "", service: "", budget: "", message: "",
  });

  const update = (key: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const canAdvance = () => {
    if (step === 0) return formData.name.trim() && formData.company.trim() && formData.email.trim();
    if (step === 1) return formData.service;
    return formData.message.trim();
  };

  const goNext = () => {
    if (!canAdvance()) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, 2));
  };

  const goPrev = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canAdvance()) return;
    setSubmitted(true);
    toast({ title: "Inquiry Received", description: "Our partners will personally review your submission within 24 hours." });
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
                    <a href={detail.href} className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium">
                      {detail.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side — multi-step form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div
              className="bg-card p-8 md:p-12 rounded-2xl border border-white/5 relative overflow-hidden"
              data-testid="form-contact"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center py-16 text-center gap-6"
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(202,163,83,0.1)", border: "1px solid rgba(202,163,83,0.3)" }}
                    >
                      <CheckCircle2 className="w-9 h-9 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black mb-3">Inquiry Received</h3>
                      <p className="text-foreground/50 leading-relaxed max-w-xs mx-auto">
                        Our partners will personally review your submission and respond within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => { setSubmitted(false); setStep(0); setFormData({ name: "", company: "", email: "", service: "", budget: "", message: "" }); }}
                      className="text-xs font-semibold tracking-widest uppercase text-foreground/30 hover:text-foreground/60 transition-colors"
                    >
                      Submit Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Step progress */}
                    <div className="flex items-center gap-3 mb-10">
                      {STEP_LABELS.map((label, i) => (
                        <div key={i} className="flex items-center gap-3 flex-1 last:flex-none">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-400"
                              style={{
                                background: i < step ? "rgba(202,163,83,1)" : i === step ? "rgba(202,163,83,0.15)" : "rgba(255,255,255,0.05)",
                                border: i <= step ? "1px solid rgba(202,163,83,0.6)" : "1px solid rgba(255,255,255,0.08)",
                                color: i < step ? "#0c0c0e" : i === step ? "#CAA353" : "rgba(255,255,255,0.25)",
                              }}
                            >
                              {i < step ? "✓" : i + 1}
                            </div>
                            <span
                              className="text-[10px] font-semibold tracking-wider uppercase hidden sm:block transition-colors duration-300"
                              style={{ color: i === step ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)" }}
                            >
                              {label}
                            </span>
                          </div>
                          {i < STEP_LABELS.length - 1 && (
                            <div className="flex-1 h-[1px] mx-1 transition-all duration-500"
                              style={{ background: i < step ? "rgba(202,163,83,0.5)" : "rgba(255,255,255,0.07)" }}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Form steps */}
                    <form onSubmit={handleSubmit}>
                      <div className="overflow-hidden relative min-h-[320px]">
                        <AnimatePresence mode="wait" custom={direction}>
                          {step === 0 && (
                            <motion.div
                              key="step0"
                              custom={direction}
                              variants={stepVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className="space-y-6"
                            >
                              <div>
                                <p className="text-lg font-bold mb-1">Who are you?</p>
                                <p className="text-foreground/40 text-sm mb-6">Let's start with the basics.</p>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                  <Label htmlFor="name" className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40">Full Name</Label>
                                  <Input id="name" required value={formData.name} onChange={(e) => update("name", e.target.value)} placeholder="John Smith" data-testid="input-name" className="bg-background/60 border-white/10 h-12 rounded-sm focus-visible:ring-primary focus-visible:border-primary/50 placeholder:text-foreground/20 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="company" className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40">Company</Label>
                                  <Input id="company" required value={formData.company} onChange={(e) => update("company", e.target.value)} placeholder="Acme Corp" data-testid="input-company" className="bg-background/60 border-white/10 h-12 rounded-sm focus-visible:ring-primary focus-visible:border-primary/50 placeholder:text-foreground/20 transition-colors" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40">Email Address</Label>
                                <Input id="email" type="email" required value={formData.email} onChange={(e) => update("email", e.target.value)} placeholder="john@company.com" data-testid="input-email" className="bg-background/60 border-white/10 h-12 rounded-sm focus-visible:ring-primary focus-visible:border-primary/50 placeholder:text-foreground/20 transition-colors" />
                              </div>
                            </motion.div>
                          )}

                          {step === 1 && (
                            <motion.div
                              key="step1"
                              custom={direction}
                              variants={stepVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className="space-y-6"
                            >
                              <div>
                                <p className="text-lg font-bold mb-1">What do you need?</p>
                                <p className="text-foreground/40 text-sm mb-6">Select the service that best fits your goal.</p>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {services.map((s) => (
                                  <button
                                    type="button"
                                    key={s}
                                    onClick={() => update("service", s)}
                                    className="text-left px-4 py-3.5 rounded-lg text-sm font-medium transition-all duration-200"
                                    style={{
                                      background: formData.service === s ? "rgba(202,163,83,0.12)" : "rgba(255,255,255,0.03)",
                                      border: formData.service === s ? "1px solid rgba(202,163,83,0.45)" : "1px solid rgba(255,255,255,0.07)",
                                      color: formData.service === s ? "#CAA353" : "rgba(255,255,255,0.55)",
                                    }}
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40">Budget Range (optional)</Label>
                                <div className="flex flex-wrap gap-2">
                                  {budgets.map((b) => (
                                    <button
                                      type="button"
                                      key={b}
                                      onClick={() => update("budget", b === formData.budget ? "" : b)}
                                      className="px-3.5 py-2 rounded-md text-xs font-semibold tracking-wide transition-all duration-200"
                                      style={{
                                        background: formData.budget === b ? "rgba(202,163,83,0.1)" : "rgba(255,255,255,0.03)",
                                        border: formData.budget === b ? "1px solid rgba(202,163,83,0.35)" : "1px solid rgba(255,255,255,0.07)",
                                        color: formData.budget === b ? "#CAA353" : "rgba(255,255,255,0.4)",
                                      }}
                                    >
                                      {b}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {step === 2 && (
                            <motion.div
                              key="step2"
                              custom={direction}
                              variants={stepVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className="space-y-6"
                            >
                              <div>
                                <p className="text-lg font-bold mb-1">Tell us about your project.</p>
                                <p className="text-foreground/40 text-sm mb-6">Share your goals, timeline, and any context that helps us understand your vision.</p>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="message" className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40">Project Details</Label>
                                <Textarea id="message" required rows={7} data-testid="textarea-message" value={formData.message} onChange={(e) => update("message", e.target.value)} placeholder="Describe what you're building, what results you're after, and your timeline..." className="bg-background/60 border-white/10 rounded-sm focus-visible:ring-primary focus-visible:border-primary/50 placeholder:text-foreground/20 resize-none transition-colors" />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Navigation */}
                      <div className="flex items-center gap-3 mt-8">
                        {step > 0 && (
                          <button
                            type="button"
                            onClick={goPrev}
                            className="px-6 py-3.5 text-xs font-bold tracking-widest uppercase border border-white/10 text-foreground/40 hover:text-foreground hover:border-white/20 transition-all duration-300 rounded-sm"
                          >
                            Back
                          </button>
                        )}

                        {step < 2 ? (
                          <button
                            type="button"
                            onClick={goNext}
                            disabled={!canAdvance()}
                            data-testid="button-next-step"
                            className="flex-1 flex items-center justify-center gap-2 h-12 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-300 group disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{
                              background: "linear-gradient(135deg, #CAA353, #F0C97A)",
                              color: "#0c0c0e",
                            }}
                          >
                            Continue
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={!canAdvance()}
                            data-testid="button-submit"
                            className="flex-1 flex items-center justify-center gap-2 h-12 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-300 group disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{
                              background: "linear-gradient(135deg, #CAA353, #F0C97A)",
                              color: "#0c0c0e",
                            }}
                          >
                            Submit Inquiry
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        )}
                      </div>
                    </form>

                    {/* WhatsApp alt */}
                    <div className="mt-6 pt-6 border-t border-white/5">
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="button-form-whatsapp"
                        className="w-full flex items-center justify-center gap-2 h-11 rounded-sm border border-[#25D366]/20 text-[#25D366]/70 hover:bg-[#25D366]/10 hover:text-[#25D366] hover:border-[#25D366]/40 transition-all duration-300 text-sm font-semibold"
                      >
                        <SiWhatsapp className="w-4 h-4" />
                        Or message us directly on WhatsApp
                      </a>
                      <p className="text-center text-[10px] text-foreground/20 tracking-wider mt-4">
                        We respond to all inquiries within 24 business hours. Your information is kept strictly confidential.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
