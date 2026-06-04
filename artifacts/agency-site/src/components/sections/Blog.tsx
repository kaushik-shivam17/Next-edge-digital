import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { fetchBlogPosts, type SanityPost } from "@/lib/sanity";

const FALLBACK_POSTS: SanityPost[] = [
  {
    _id: "1",
    title: "Why Your Website Is Costing You Clients (And How to Fix It)",
    slug: "why-your-website-is-costing-you-clients",
    excerpt: "Most agency websites look impressive but convert terribly. Here's what separates a site that looks good from one that actually generates leads.",
    publishedAt: "2024-05-10",
    mainImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    categories: [{ title: "Web Design" }],
  },
  {
    _id: "2",
    title: "The AI Stack We Use to Run Clients' Social Media at 10x Speed",
    slug: "ai-stack-social-media-10x-speed",
    excerpt: "We've built a system that creates, schedules, and optimises content for 12+ accounts simultaneously. Here's the exact stack behind it.",
    publishedAt: "2024-04-22",
    mainImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    categories: [{ title: "AI" }],
  },
  {
    _id: "3",
    title: "What 42 Brand Transformations Taught Us About What Actually Works",
    slug: "42-brand-transformations-what-works",
    excerpt: "After working with 42+ brands across industries and continents, patterns emerge. We share the non-obvious things that separate brands that dominate from those that disappear.",
    publishedAt: "2024-03-15",
    mainImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    categories: [{ title: "Strategy" }],
  },
];

function PostCard({ post, index }: { post: SanityPost; index: number }) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : null;

  return (
    <motion.a
      href={`/blog/${post.slug}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group block rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.3s, box-shadow 0.3s",
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
      {post.mainImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.mainImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {post.categories?.[0] && (
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
              {post.categories[0].title}
            </span>
          )}
        </div>
      )}
      <div className="p-6">
        {date && (
          <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-foreground/30 mb-3">
            <Calendar className="w-3 h-3" />
            {date}
          </div>
        )}
        <h3 className="text-lg font-bold leading-snug mb-3 text-foreground/90 group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-foreground/45 leading-relaxed line-clamp-2 mb-5">
            {post.excerpt}
          </p>
        )}
        <div
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary/60 group-hover:text-primary transition-colors duration-300"
        >
          Read Article
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.a>
  );
}

export function Blog() {
  const [posts, setPosts] = useState<SanityPost[]>(FALLBACK_POSTS);

  useEffect(() => {
    fetchBlogPosts()
      .then((data) => { if (data?.length) setPosts(data.slice(0, 3)); })
      .catch(() => {});
  }, []);

  return (
    <section id="blog" className="py-16 md:py-32 relative z-10 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(202,163,83,0.03),transparent)]" />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Insights</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              The Playbook
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-3 items-start md:items-end"
          >
            <p className="text-foreground/50 max-w-sm text-base leading-relaxed text-right">
              Frameworks, case studies, and uncommon thinking from inside our studio.
            </p>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary/70 hover:text-primary transition-colors group"
            >
              All Articles
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <PostCard key={post._id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
