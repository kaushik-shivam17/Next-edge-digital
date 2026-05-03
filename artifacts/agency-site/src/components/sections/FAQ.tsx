import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "How long does a typical website project take?",
    answer:
      "Most of our website projects are delivered within 4–8 weeks, depending on scope. Simple brochure sites can be done in 3 weeks, while complex web apps or e-commerce platforms may take 10–12 weeks. We always share a clear timeline before we begin.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We've built market-leading digital presences across fashion, fintech, real estate, automotive, SaaS, healthcare, and more. Our process is built to adapt to any market — what we bring is a relentless obsession with positioning, performance, and conversion.",
  },
  {
    question: "Do you work with startups or only established brands?",
    answer:
      "Both. We love working with ambitious founders who are building something from the ground up, as well as established brands ready to break into a new tier. What matters most is that you're serious about growth and willing to move fast.",
  },
  {
    question: "What does social media management include?",
    answer:
      "Our social media service covers full content strategy, high-quality creative production, copywriting, scheduling, community management, paid social campaigns, and monthly performance reporting. We don't outsource any of it — your brand voice is in our hands.",
  },
  {
    question: "How are projects priced?",
    answer:
      "We publish transparent starting prices. Web Maintenance starts from ₹5,000/month (approx. $60/month), and a full Website Build starts from ₹8,000 (approx. $97). Custom retainers for full-service partnerships are scoped after a discovery call. All pricing is confirmed in writing before any work begins — no surprises, no hidden fees.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. We offer monthly retainer packages for clients who want us to handle ongoing optimization, content, and growth. We also provide a 30-day post-launch support window for all website builds, so you're never left on your own.",
  },
  {
    question: "What makes Next Edge different from other agencies?",
    answer:
      "Most agencies sell you on pretty designs and disappear after launch. We're obsessed with outcomes — revenue, followers, leads, rankings. Every decision we make is tied to a measurable result. Our 98% client retention rate isn't an accident.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-b border-white/5 last:border-0"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-7 gap-6 text-left group"
        aria-expanded={open}
        data-testid={`faq-item-${index}`}
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
          {/* Left sticky header */}
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
              Can't find what you're looking for? Message us directly and we'll get back to you within 24 hours.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-primary hover:text-primary/80 transition-colors"
            >
              Ask Us Directly
              <span className="text-base">→</span>
            </motion.a>
          </div>

          {/* Right accordion */}
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
