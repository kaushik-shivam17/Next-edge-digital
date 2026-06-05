import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What AI automation services do you offer?",
    answer:
      "We offer four core AI services: AI Call Management (24/7 intelligent call handling and lead qualification), AI WhatsApp Management (automated customer engagement and sales on WhatsApp), AI Social Media Management (AI-generated content, scheduling, and engagement across all platforms), and AI Site Building (self-optimizing websites with AI-driven conversion rate optimization). These can be deployed individually or as a complete AI business ecosystem.",
  },
  {
    question: "How does AI Call Management work?",
    answer:
      "Our AI Call Management system handles inbound calls around the clock, qualifies leads based on your criteria, answers frequently asked questions in natural language, books appointments directly into your calendar, and syncs everything to your CRM. It works in multiple languages and sounds indistinguishable from a trained human agent. No missed calls, no missed revenue.",
  },
  {
    question: "Can AI really manage my WhatsApp professionally?",
    answer:
      "Absolutely. Our AI WhatsApp system integrates with the WhatsApp Business API and handles customer inquiries, sends automated follow-ups, collects payments, qualifies leads, and routes complex queries to your team — all within seconds. Most of our clients see a 60–80% reduction in manual WhatsApp workload while improving response times to under 30 seconds.",
  },
  {
    question: "How long does a typical website project take?",
    answer:
      "Most of our website projects are delivered within 30–60 days, depending on scope. Simple brochure sites can be done in 21 days, while complex web apps or e-commerce platforms may take 70–90 days. AI Site Building projects deploy significantly faster — often within 5–10 days. We always share a clear timeline before we begin.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We've built market-leading digital presences and AI systems across e-commerce, fintech, real estate, automotive, SaaS, healthcare, education, fashion, and more. Our AI solutions are especially powerful for service businesses, local businesses, and any brand that handles high volumes of customer communication. What matters most is your ambition to grow.",
  },
  {
    question: "Do you work with startups or only established brands?",
    answer:
      "Both. We love working with ambitious founders building from the ground up and established brands ready to break into a new tier. Our AI solutions are particularly valuable for startups because they let you operate at the scale of a much larger team from day one — without hiring costs.",
  },
  {
    question: "What makes Core Elite Digital different from other agencies?",
    answer:
      "Most agencies sell you a website and disappear. We build AI-powered business ecosystems — combining premium website design, strategic SEO, intelligent automation, and ongoing optimization. Our 98% client retention rate comes from one simple principle: we're only successful when you are. Every AI system and every website we build is tied to measurable business outcomes.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes, always. Every AI system we deploy comes with ongoing monitoring, optimization, and support. Website projects include a 30-day post-launch window, and we offer monthly retainer packages for clients who want continuous improvement, content, and growth management. You're never left on your own.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border-b border-white/5 last:border-0"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-7 gap-6 text-left group"
        aria-expanded={open}
       
      >
        <span
          className="text-base md:text-lg font-semibold leading-snug transition-colors duration-300"
          style={{ color: open ? "#CAA353" : "rgba(255,255,255,0.85)" }}
        >
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300"
          style={{
            background: open ? "rgba(202,163,83,0.12)" : "rgba(255,255,255,0.04)",
            borderColor: open ? "rgba(202,163,83,0.4)" : "rgba(255,255,255,0.08)",
          }}
        >
          <Plus className="w-4 h-4" style={{ color: open ? "#CAA353" : "rgba(255,255,255,0.4)" }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-foreground/50 text-base leading-relaxed pb-8 max-w-3xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section className="py-16 md:py-32 relative bg-background z-10 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,rgba(202,163,83,0.04),transparent)]" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4"
            >
              Got Questions?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.92] mb-6"
            >
              Frequently<br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #CAA353 0%, #F0C97A 100%)" }}
              >
                Asked
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-foreground/50 text-base leading-relaxed mb-8"
            >
              Questions about AI automation, our services, or how we work? We've answered the most common ones here. Still curious? Talk to us directly.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              href={`https://wa.me/918218628232?text=${encodeURIComponent("Hi! I have a question for Core Elite Digital.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-primary hover:text-primary/80 transition-colors"
            >
              Ask Us on WhatsApp
              <span className="text-base">→</span>
            </motion.a>
          </div>

          <div className="lg:col-span-3">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
