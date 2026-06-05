import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Calendar, Tag } from "lucide-react";
import { Footer } from "@/components/sections/Footer";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  mainImage: string;
  category: string;
};

const POSTS: Post[] = [
  {
    id: "1",
    title: "Why Your Website Is Costing You Clients (And How to Fix It)",
    slug: "why-your-website-is-costing-you-clients",
    excerpt: "Most agency websites look impressive but convert terribly. Here's what separates a site that looks good from one that actually generates leads.",
    publishedAt: "2026-03-10",
    mainImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    category: "Web Design",
  },
  {
    id: "2",
    title: "The AI Stack We Use to Run Clients' Social Media at 10x Speed",
    slug: "ai-stack-social-media-10x-speed",
    excerpt: "We've built a system that creates, schedules, and optimises content for multiple accounts simultaneously. Here's the exact stack behind it.",
    publishedAt: "2026-04-22",
    mainImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    category: "AI",
  },
  {
    id: "3",
    title: "What Our First 10 Brand Builds Taught Us About What Actually Works",
    slug: "10-brand-builds-what-works",
    excerpt: "Early in our journey, patterns emerge fast. We share the non-obvious things that separate brands that dominate from those that disappear — straight from the studio floor.",
    publishedAt: "2026-05-15",
    mainImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    category: "Strategy",
  },
  {
    id: "4",
    title: "The Difference Between a ₹5K and ₹50K Brand Identity",
    slug: "budget-vs-premium-brand-identity",
    excerpt: "It's not the hours spent or the tools used. It's a fundamentally different process, starting point, and deliverable. Here's the real breakdown.",
    publishedAt: "2026-04-05",
    mainImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    category: "Branding",
  },
  {
    id: "5",
    title: "SEO Is Not Dead. You're Just Doing 2020 SEO in 2026.",
    slug: "seo-is-not-dead-2026",
    excerpt: "Keyword stuffing, generic backlinks, thin content — if your SEO strategy looks like this, you're competing against ghosts. Here's what elite SEO looks like now.",
    publishedAt: "2026-02-18",
    mainImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
    category: "SEO",
  },
  {
    id: "6",
    title: "How WhatsApp Automation Turned Leads Into Paying Clients Overnight",
    slug: "whatsapp-automation-lead-conversion",
    excerpt: "A service business was losing leads because they couldn't respond fast enough. We deployed a WhatsApp AI and changed the game. Here's exactly what happened.",
    publishedAt: "2026-05-28",
    mainImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    category: "AI",
  },
];

function PostCard({ post, index }: { post: Post; index: number }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.a
      href={`/blog/${post.slug}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.3s, box-shadow 0.3s",
        WebkitTapHighlightColor: "transparent",
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(202,163,83,0.3)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <img
          src={post.mainImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span
          className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(202,163,83,0.2)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(202,163,83,0.4)",
            color: "#F0C97A",
          }}
        >
          <Tag className="w-2.5 h-2.5" />
          {post.category}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-foreground/30 mb-3">
          <Calendar className="w-3 h-3" />
          {date}
        </div>
        <h3 className="text-lg font-bold leading-snug mb-3 text-foreground/90 group-hover:text-primary transition-colors duration-300 flex-1">
          {post.title}
        </h3>
        <p className="text-sm text-foreground/45 leading-relaxed line-clamp-3 mb-5">
          {post.excerpt}
        </p>
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary/60 group-hover:text-primary transition-colors duration-300 mt-auto">
          Read Article
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.a>
  );
}

export function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <div className="pt-28 pb-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(202,163,83,0.06),transparent)] pointer-events-none" />
        <div className="container px-4 md:px-6 relative z-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-foreground/30 hover:text-foreground/60 transition-colors mb-12"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </a>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Journal</p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">The Playbook</h1>
            <p className="text-foreground/45 text-lg max-w-xl leading-relaxed">
              Frameworks, case studies, and uncommon thinking from inside the Core Elite Digital studio.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
