import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, Clock } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { SharedNav } from "@/components/SharedNav";
import { SiWhatsapp } from "react-icons/si";
import { WA } from "@/lib/whatsapp";

const WHATSAPP_URL = WA.blogReader;

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  mainImage: string;
  category: string;
  readTime: string;
  content: string[];
};

const ALL_POSTS: Post[] = [
  {
    id: "1",
    title: "Why Your Website Is Costing You Clients (And How to Fix It)",
    slug: "why-your-website-is-costing-you-clients",
    excerpt: "Most agency websites look impressive but convert terribly. Here's what separates a site that looks good from one that actually generates leads.",
    publishedAt: "2026-03-10",
    mainImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
    category: "Web Design",
    readTime: "6 min read",
    content: [
      "Your website is not just a digital business card. It's your 24/7 salesperson. And if it's not converting visitors into leads, it's actively costing you money every single day.",
      "The brutal truth? Most business websites look decent but are built with zero understanding of buyer psychology. They're designed to impress — not to convert. Big mistake.",
      "**The #1 Mistake: Designing for Yourself, Not Your Buyer**",
      "We see it constantly. Founders who pour ₹3–5 lakhs into a website, get it launched, and then wonder why leads aren't flooding in. The site is beautiful. The animations are smooth. The team page has professional photos. But the conversion rate is 0.3%.",
      "Why? Because the entire site is written from the brand's perspective — not the client's. 'We are a leading provider of...' 'Our mission is to...' Nobody cares. Your visitor arrived with a problem. They want to know if you can solve it. Fast.",
      "**What a High-Converting Website Actually Does**",
      "In the first 3 seconds, your visitor needs to understand: what you do, who it's for, and what they should do next. If your headline doesn't answer all three, you've already lost them.",
      "Above the fold is prime real estate. Every word, every element must earn its place. Lead with the outcome your client wants — not with who you are.",
      "**The Fixes That Actually Move the Needle**",
      "Rewrite your hero headline around the result you deliver. Replace 'Welcome to [Company]' with something like 'We help e-commerce brands double revenue in 90 days.' Then make the CTA obvious, singular, and action-oriented. 'Get My Free Strategy Call' beats 'Contact Us' every time.",
      "Add social proof immediately below the fold. Real testimonials with names, photos, and specific results. Not generic five-star reviews — transformation stories.",
      "Speed matters enormously. A 1-second delay in load time costs you 7% in conversions. Compress your images. Minimise JavaScript. Use a CDN. Get your Lighthouse score above 90.",
      "**The Bottom Line**",
      "A website that converts isn't about trends or aesthetics. It's about understanding your buyer's journey and removing every friction point between them and becoming a client. Fix the copy first. Then the structure. Then the design. In that order.",
    ],
  },
  {
    id: "2",
    title: "The AI Stack We Use to Run Clients' Social Media at 10x Speed",
    slug: "ai-stack-social-media-10x-speed",
    excerpt: "We've built a system that creates, schedules, and optimises content for multiple accounts simultaneously. Here's the exact stack behind it.",
    publishedAt: "2026-04-22",
    mainImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    category: "AI",
    readTime: "8 min read",
    content: [
      "Social media management used to mean: hire a content team, spend hours briefing them, wait for drafts, revise endlessly, approve, schedule, analyse, and repeat. Every week. Forever.",
      "We've replaced most of that with a tightly orchestrated AI system. Here's how.",
      "**Step 1: Brand Voice Training**",
      "Before any AI touches a client's content, we feed it a brand bible — tone of voice, audience personas, content pillars, banned phrases, competitor differentiators. We run this through a fine-tuned system prompt that acts as a persistent editorial director.",
      "Every piece of content generated from this point forward sounds like the brand, not like a chatbot.",
      "**Step 2: Content Ideation at Scale**",
      "Each Monday, the system ingests trending topics in the client's industry (via RSS feeds, Reddit API, and Google Trends), cross-references them against the brand's content pillars, and outputs a ranked list of 30 content ideas with hooks, formats, and target platforms.",
      "A human (us) reviews this in about 15 minutes. We approve, tweak, or reject. The AI learns from rejections over time.",
      "**Step 3: Drafting and Multi-Format Expansion**",
      "Approved ideas go into a drafting pipeline. A long-form LinkedIn post gets automatically adapted into an Instagram caption, a Twitter/X thread, and a short-form video script. One idea, four pieces of content. Four channels. One pass.",
      "Images are generated or sourced (via licensed stock libraries), branded with overlays, and attached to the relevant post draft automatically.",
      "**Step 4: Scheduling and Optimal Timing**",
      "Content goes into a scheduling layer that analyses historical engagement data for each account and slots posts at statistically optimal times. No manual scheduling. No guessing.",
      "**Step 5: Performance Loop**",
      "Every two weeks, the system pulls analytics — reach, saves, comments, link clicks — and generates a plain-English performance summary with recommendations. We review, implement changes to the prompt stack, and the system gets sharper.",
      "**What This Means For Clients**",
      "Brands using this system see a 4–6x increase in output volume with consistent quality. Response time from brief to published post drops from 3–5 days to under 6 hours. And because the system is learning continuously, content performance compounds over time.",
    ],
  },
  {
    id: "3",
    title: "What Our First 10 Brand Builds Taught Us About What Actually Works",
    slug: "10-brand-builds-what-works",
    excerpt: "Early in our journey, patterns emerge fast. We share the non-obvious things that separate brands that dominate from those that disappear — straight from the studio floor.",
    publishedAt: "2026-05-15",
    mainImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    category: "Strategy",
    readTime: "7 min read",
    content: [
      "Ten brand builds in. Patterns are already brutally clear. Some of these are obvious in hindsight. Others surprised us. All of them are things we now build into every engagement from day one.",
      "**1. Founders Who Can Articulate Their 'Why' Clearly Build Stronger Brands**",
      "Every time. Without exception. When we ask 'why does this business exist beyond making money?' and the founder answers with conviction and specificity, the brand we build has soul. When they shrug, we know we have work to do before we touch a logo.",
      "**2. The Visual Identity Is the Last Thing to Fix**",
      "Clients always want to start with the logo. We always push back. Brand positioning, messaging hierarchy, and target audience definition have to come first. A beautiful logo built on a weak foundation is just expensive wallpaper.",
      "**3. Consistency Beats Creativity in the Long Run**",
      "We've seen brands with average creative assets outperform beautifully designed competitors purely through relentless consistency. Same colour palette. Same tone. Same posting rhythm. Every week, for months. Audiences reward predictability with trust.",
      "**4. The Brief Always Lies**",
      "Not intentionally. But what a client tells us they need at the start of a project is almost never what they actually need. The real brief emerges through questions, discovery calls, and honest conversation about what's not working. We now spend 2–3x more time in discovery than we used to.",
      "**5. Speed of Decision-Making Determines Project Quality**",
      "Projects that drag — where feedback takes days, approvals require committees, and stakeholders multiply — produce worse outcomes. Not because of the delay itself, but because momentum dies. Creative energy is finite. The best work happens in focused sprints.",
      "**6. Local Context Is Everything in India**",
      "What works for a D2C brand in London doesn't translate directly to a market in Tier 1 India. Language, visual cues, trust signals, and buying triggers are different. We've learned to design for the actual customer, not the international template.",
      "**What's Next**",
      "These ten builds taught us more than we expected. We're heads-down on the next chapter — and building a studio that gets sharper with every project.",
    ],
  },
  {
    id: "4",
    title: "The Difference Between a ₹5K and ₹50K Brand Identity",
    slug: "budget-vs-premium-brand-identity",
    excerpt: "It's not the hours spent or the tools used. It's a fundamentally different process, starting point, and deliverable. Here's the real breakdown.",
    publishedAt: "2026-04-05",
    mainImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    category: "Branding",
    readTime: "5 min read",
    content: [
      "This question comes up constantly in client conversations. 'I've seen brand identities for ₹5,000 on Fiverr. Why does yours cost ₹50,000?' Fair question. Here's the honest answer.",
      "**What You Get for ₹5K**",
      "A logo. Possibly a colour palette. Maybe a font recommendation. Delivered in 2–3 days. Created by a designer who is working from a template library, applying your business name and colour preference to an existing structure.",
      "It looks professional enough. It works for a business card. But it is not a brand identity — it's a logo. There's a significant difference.",
      "**What Actually Goes Into a ₹50K Brand Identity**",
      "Before a single pixel is designed, we do: competitor landscape analysis, audience persona mapping, positioning statement development, brand archetype identification, messaging hierarchy construction, and tone of voice definition.",
      "Only after that foundational work does visual exploration begin. And it begins with concepts, not executions — rough directions that are tested for distinctiveness, scalability, and resonance with the target audience before anything is refined.",
      "The final deliverable includes: primary and secondary logo systems, full colour palette with usage rules, typography system (primary, secondary, and body typefaces with sizing scales), iconography style, photography direction, brand voice guidelines, and a usage manual showing the system in context across real touchpoints.",
      "**The Real Difference**",
      "A ₹5K logo tells people your name. A ₹50K brand identity makes them feel something. It creates recognition, preference, and trust — the three things that turn a stranger into a customer and a customer into a repeat buyer.",
      "Premium branding is not an expense. It's infrastructure. Brands that invest in it early build equity that compounds over years.",
    ],
  },
  {
    id: "5",
    title: "SEO Is Not Dead. You're Just Doing 2020 SEO in 2026.",
    slug: "seo-is-not-dead-2026",
    excerpt: "Keyword stuffing, generic backlinks, thin content — if your SEO strategy looks like this, you're competing against ghosts. Here's what elite SEO looks like now.",
    publishedAt: "2026-02-18",
    mainImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80",
    category: "SEO",
    readTime: "7 min read",
    content: [
      "SEO is not dead. You're just doing 2020 SEO in 2026. The tactics that worked five years ago don't just stop working — they actively hurt you now. Google's algorithm has evolved. Here's what elite SEO actually looks like today.",
      "**What's Dead**",
      "Keyword density as a strategy. Exact-match anchor text spam. Low-quality guest posts on irrelevant sites. Article spinning. Thin service pages with 300 words and stock photography. PBNs. Anything your SEO agency reports in terms of 'domain authority acquired this month.'",
      "Google's Helpful Content System, introduced and steadily reinforced since 2022, is ruthless about thin, AI-generated, or manipulative content. Sites built on these tactics are being deindexed at scale.",
      "**What's Winning in 2026**",
      "Topical authority. Rather than ranking individual keywords, Google rewards sites that demonstrate genuine expertise across an entire topic cluster. One page about 'SEO' isn't enough — you need interconnected content that covers every facet of the subject comprehensively.",
      "Original data and primary research. Content that contains data, case studies, or insights you can't find anywhere else earns links naturally. Become a primary source, not a content aggregator.",
      "Technical excellence. Core Web Vitals are a confirmed ranking factor. If your LCP is above 2.5 seconds or your CLS is above 0.1, you're paying a penalty in rankings. Fix the foundation before building content.",
      "E-E-A-T signals. Experience, Expertise, Authoritativeness, Trustworthiness — Google evaluates these through author credentials, external mentions, citation patterns, and overall brand authority. Build the entity, not just the page.",
      "**The Strategy That Works**",
      "Build fewer, better pages. Invest in original research and genuine case studies. Fix your technical foundation. Earn real mentions from real publications in your industry. Be patient — SEO is a 6–18 month game, and anyone who tells you otherwise is selling something.",
    ],
  },
  {
    id: "6",
    title: "How WhatsApp Automation Turned Leads Into Paying Clients Overnight",
    slug: "whatsapp-automation-lead-conversion",
    excerpt: "A service business was losing leads because they couldn't respond fast enough. We deployed a WhatsApp AI and changed the game. Here's exactly what happened.",
    publishedAt: "2026-05-28",
    mainImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
    category: "AI",
    readTime: "6 min read",
    content: [
      "The client: a mid-sized home services business. Monthly leads: 200–250 via WhatsApp, Instagram, and their website form. Monthly conversions: about 40. That's an 18% close rate on inquiries — and they thought it was fine.",
      "It wasn't. The problem was response time.",
      "**The Problem: Leads Die in the First 5 Minutes**",
      "Research is clear: if you respond to a lead within 5 minutes, you're 21x more likely to convert them than if you wait 30 minutes. Most service businesses respond within hours, sometimes days. By then, the prospect has already booked a competitor.",
      "This client's average first response time: 3.5 hours. On weekends: 11+ hours.",
      "**The Solution: WhatsApp AI That Never Sleeps**",
      "We deployed a WhatsApp AI system trained on the client's service catalogue, pricing structure, FAQs, and objection handling scripts. It connects to their CRM to check real-time availability and book consultations directly into the calendar.",
      "When a lead messages in, the AI responds within 10 seconds — any time, day or night. It qualifies the lead (budget, timeline, location, service type), answers objections with human-sounding responses, and attempts to book a call or visit on the spot.",
      "If the conversation reaches a point where human judgment is needed, it flags the conversation and notifies the team with a summary. The human jumps in already knowing exactly what the lead needs.",
      "**The Results After 60 Days**",
      "Average first response time: 10 seconds (down from 3.5 hours). Consultations booked per month: 89 (up from ~52). Revenue from new clients in month two: up 34%. The system handled 74% of leads end-to-end without human intervention.",
      "**What This Proves**",
      "The leads were always there. The opportunity was always there. What was missing was the infrastructure to capture it at the moment intent was highest. WhatsApp AI doesn't replace your team — it makes sure no lead goes cold while your team is human.",
    ],
  },
];

export function BlogPostPage({ slug }: { slug: string }) {
  const post = ALL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground dark">
        <SharedNav />
        <div className="pt-40 pb-20 text-center container px-4">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4">404</p>
          <h1 className="text-4xl font-black mb-4">Post Not Found</h1>
          <p className="text-foreground/40 mb-8">This article doesn't exist or may have been moved.</p>
          <a href="/blog" className="text-primary hover:underline text-sm font-bold tracking-widest uppercase">← Back to The Playbook</a>
        </div>
        <Footer />
      </div>
    );
  }

  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <SharedNav />

      <article className="pt-28 pb-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(202,163,83,0.05),transparent)] pointer-events-none" />

        <div className="container px-4 md:px-6 max-w-3xl mx-auto relative z-10">

          {/* Back link */}
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            The Playbook
          </a>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                style={{ background: "rgba(202,163,83,0.15)", border: "1px solid rgba(202,163,83,0.3)", color: "#F0C97A" }}
              >
                <Tag className="w-2.5 h-2.5" />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-foreground/30">
                <Calendar className="w-3 h-3" />
                {date}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-foreground/30">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-5">
              {post.title}
            </h1>
            <p className="text-lg text-foreground/50 leading-relaxed">
              {post.excerpt}
            </p>
          </motion.header>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="rounded-2xl overflow-hidden mb-12"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <img
              src={post.mainImage}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
              loading="eager"
            />
          </motion.div>

          {/* Article body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="prose-content"
            style={{ color: "rgba(255,255,255,0.72)", fontSize: "17px", lineHeight: "1.85" }}
          >
            {post.content.map((para, i) => {
              if (para.startsWith("**") && para.endsWith("**")) {
                return (
                  <h2
                    key={i}
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#fff",
                      marginTop: i === 0 ? 0 : "2.5rem",
                      marginBottom: "1rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {para.slice(2, -2)}
                  </h2>
                );
              }
              return (
                <p key={i} style={{ marginBottom: "1.5rem" }}>
                  {para}
                </p>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-16 p-8 rounded-2xl text-center"
            style={{ background: "rgba(37,211,102,0.04)", border: "1px solid rgba(37,211,102,0.15)" }}
          >
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: "#25D366" }}>
              Ready to Apply This?
            </p>
            <h3 className="text-2xl font-black mb-3">Let's Talk About Your Brand</h3>
            <p className="text-foreground/40 text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Book a free 30-minute strategy session on WhatsApp. No pitch. Just clarity on what your brand needs next.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide text-white transition-all duration-300 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #128C7E, #25D366)", boxShadow: "0 8px 30px rgba(37,211,102,0.3)" }}
            >
              <SiWhatsapp className="w-4 h-4" />
              Book a Free Strategy Call
            </a>
          </motion.div>

          {/* Back to blog */}
          <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-foreground/30 hover:text-foreground/60 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to The Playbook
            </a>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
