import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "E-Commerce",
    category: "Fashion & Retail",
    filter: "ecommerce",
    tags: ["Web Design", "Shopify", "Social Media"],
    gradient: ["#7F1D1D", "#BE185D", "#4C1D95"],
    result: "+214% Online Revenue",
    year: "2024",
    slug: "aurafashion.com",
    photo: "https://market-resized.envatousercontent.com/previews/files/514154043/Preview_screenshots/04_Category_Product.png?w=590&h=300&cf_fit=crop&crop=top&format=auto&q=85&s=46f89e681ba7c30a6f5ee28fe8876b4aac9d266d8b2d9519c4ad6c1fea140041",
  },
  {
    title: "Fintech",
    category: "Wealth Management",
    filter: "fintech",
    tags: ["Web App", "Brand Identity", "SEO"],
    gradient: ["#1E3A5F", "#0E7490", "#1D4ED8"],
    result: "3x Client Acquisition",
    year: "2024",
    slug: "novawealth.io",
    photo: "https://cdn.prod.website-files.com/5e8e816d43060db856099187/6751dc989b7707e15032e025_6751d3c478272fd875108466_dark-theme-dashboard-webflow-template.png",
  },
  {
    title: "Real Estate",
    category: "Luxury Property",
    filter: "realestate",
    tags: ["Website", "Social Media", "Brand"],
    gradient: ["#78350F", "#B45309", "#92400E"],
    result: "+40% Avg Sale Price",
    year: "2023",
    slug: "luminaestates.co",
    photo: "https://images.pexels.com/photos/31737859/pexels-photo-31737859/free-photo-of-modern-luxurious-home-exterior-at-night.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    title: "Automotive",
    category: "Auto & Mobility",
    filter: "automotive",
    tags: ["Redesign", "Digital Strategy", "Social"],
    gradient: ["#064E3B", "#065F46", "#047857"],
    result: "580K New Followers",
    year: "2023",
    slug: "apexmotors.com",
    photo: "https://plus.unsplash.com/premium_photo-1686730540270-93f2c33351b6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGFyayUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "B2B SaaS",
    category: "Tech & Software",
    filter: "saas",
    tags: ["Web Design", "SEO", "Branding"],
    gradient: ["#3B0764", "#4C1D95", "#5B21B6"],
    result: "+180% Organic Traffic",
    year: "2024",
    slug: "orbitmedia.io",
    photo: "https://adminlte.io/wp-content/uploads/2026/03/saas-vault-v2.jpg",
  },
  {
    title: "Finance",
    category: "Investment & Capital",
    filter: "finance",
    tags: ["Brand Identity", "Web Design"],
    gradient: ["#1F2937", "#374151", "#4B5563"],
    result: "Premium Market Position",
    year: "2024",
    slug: "forgecapital.com",
    photo: "https://plus.unsplash.com/premium_photo-1664476845274-27c2dabdd7f0?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "E-Commerce", value: "ecommerce" },
  { label: "Fintech", value: "fintech" },
  { label: "Real Estate", value: "realestate" },
  { label: "Automotive", value: "automotive" },
  { label: "SaaS", value: "saas" },
  { label: "Finance", value: "finance" },
];

function EcommerceMockup() {
  return (
    <div className="flex flex-col h-full px-3 pt-2 gap-2">
      {/* Nav */}
      <div className="flex items-center justify-between">
        <div className="h-2 w-14 rounded-full bg-white/60" />
        <div className="flex gap-2">
          <div className="h-1.5 w-8 rounded-full bg-white/30" />
          <div className="h-1.5 w-8 rounded-full bg-white/30" />
          <div className="h-1.5 w-8 rounded-full bg-white/30" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full border border-white/30" />
          <div className="h-4 w-4 rounded-full border border-white/30" />
        </div>
      </div>
      {/* Hero banner */}
      <div className="h-14 rounded-lg bg-white/10 flex items-center px-3 gap-3 border border-white/10">
        <div className="flex flex-col gap-1 flex-1">
          <div className="h-1.5 w-20 rounded-full bg-white/60" />
          <div className="h-1 w-14 rounded-full bg-white/30" />
          <div className="mt-1 h-3.5 w-12 rounded bg-white/50" />
        </div>
        <div className="w-12 h-10 rounded-md bg-white/15 border border-white/15" />
      </div>
      {/* Product grid */}
      <div className="grid grid-cols-3 gap-2 flex-1">
        {[
          { h: "h-12", price: "$89", label: "Noir Coat" },
          { h: "h-10", price: "$124", label: "Silk Dress" },
          { h: "h-14", price: "$56", label: "Linen Set" },
        ].map((p, i) => (
          <div key={i} className="flex flex-col gap-1 rounded-lg overflow-hidden bg-white/5 border border-white/10 p-1.5">
            <div className={`${p.h} rounded bg-white/15 w-full`} />
            <div className="h-1 w-3/4 rounded-full bg-white/40" />
            <div className="h-1 w-1/2 rounded-full bg-white/60" />
            <div className="h-2.5 w-full rounded bg-white/25 mt-auto" />
          </div>
        ))}
      </div>
      {/* Bottom bar */}
      <div className="flex gap-2 pb-1">
        <div className="flex-1 h-3 rounded bg-white/20" />
        <div className="w-8 h-3 rounded bg-white/10" />
      </div>
    </div>
  );
}

function FintechMockup() {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-10 flex flex-col items-center py-3 gap-3 border-r border-white/10 bg-white/5">
        <div className="w-5 h-5 rounded bg-white/30" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-4 h-4 rounded bg-white/15" />
        ))}
      </div>
      {/* Main */}
      <div className="flex-1 px-3 py-2 flex flex-col gap-2">
        <div className="h-1.5 w-20 rounded-full bg-white/50" />
        {/* Balance card */}
        <div className="rounded-lg bg-white/10 border border-white/15 px-3 py-2 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="h-1 w-12 rounded-full bg-white/30" />
            <div className="h-2.5 w-20 rounded-full bg-white/70" />
            <div className="flex gap-1 mt-0.5">
              <div className="h-1.5 w-8 rounded-full bg-green-400/50" />
              <div className="h-1.5 w-5 rounded-full bg-white/20" />
            </div>
          </div>
          {/* Mini chart */}
          <div className="flex items-end gap-0.5 h-8">
            {[3, 5, 4, 7, 5, 8, 6, 9].map((h, i) => (
              <div key={i} className="w-1.5 rounded-t-sm" style={{ height: `${h * 4}px`, background: i === 7 ? "rgba(96,165,250,0.8)" : "rgba(255,255,255,0.2)" }} />
            ))}
          </div>
        </div>
        {/* Stat row */}
        <div className="grid grid-cols-3 gap-1.5">
          {[["$12.4K", "Income"], ["$3.2K", "Spent"], ["92%", "Goal"]].map(([val, label], i) => (
            <div key={i} className="rounded-md bg-white/5 border border-white/10 px-2 py-1.5">
              <div className="h-2 w-8 rounded-full bg-white/60 mb-0.5" />
              <div className="h-1 w-6 rounded-full bg-white/25" />
            </div>
          ))}
        </div>
        {/* Transaction rows */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-2 py-1 border-b border-white/5">
            <div className="w-4 h-4 rounded-full bg-white/15 flex-shrink-0" />
            <div className="flex-1 h-1.5 rounded-full bg-white/25" />
            <div className="h-1.5 w-8 rounded-full bg-white/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

function RealEstateMockup() {
  return (
    <div className="flex flex-col h-full px-3 pt-2 gap-2">
      {/* Nav */}
      <div className="flex items-center justify-between mb-0.5">
        <div className="h-2 w-16 rounded-full bg-white/60" />
        <div className="flex gap-1.5">
          {[...Array(3)].map((_, i) => <div key={i} className="h-1.5 w-7 rounded-full bg-white/25" />)}
        </div>
        <div className="h-4 w-14 rounded-full bg-white/30" />
      </div>
      {/* Hero property */}
      <div className="h-20 rounded-xl bg-white/10 border border-white/10 relative overflow-hidden flex items-end p-2">
        {/* Fake building silhouette */}
        <div className="absolute inset-0 flex items-end justify-center gap-1 px-2">
          <div className="w-8 h-12 bg-white/10 rounded-t-sm" />
          <div className="w-12 h-16 bg-white/15 rounded-t-md" />
          <div className="w-8 h-10 bg-white/10 rounded-t-sm" />
          <div className="w-6 h-14 bg-white/12 rounded-t-sm" />
        </div>
        <div className="relative z-10 flex items-center gap-2 w-full">
          <div className="flex-1 flex flex-col gap-0.5">
            <div className="h-2 w-16 rounded-full bg-white/80" />
            <div className="h-1.5 w-10 rounded-full bg-white/40" />
          </div>
          <div className="h-5 w-14 rounded-lg bg-white/30 border border-white/20" />
        </div>
      </div>
      {/* Stats row */}
      <div className="flex gap-2">
        {[["3 BHK", "Beds"], ["2", "Baths"], ["1,800", "sq.ft"]].map(([v, l], i) => (
          <div key={i} className="flex-1 rounded-lg bg-white/8 border border-white/10 p-1.5 flex flex-col items-center gap-0.5">
            <div className="h-2 w-7 rounded-full bg-white/60" />
            <div className="h-1 w-5 rounded-full bg-white/25" />
          </div>
        ))}
      </div>
      {/* Listing cards */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        {[{ price: "₹3.8Cr", type: "Villa" }, { price: "₹1.2Cr", type: "Apt." }].map((item, i) => (
          <div key={i} className="rounded-lg bg-white/8 border border-white/10 overflow-hidden flex flex-col">
            <div className="h-10 bg-white/10" />
            <div className="p-1.5 flex flex-col gap-0.5">
              <div className="h-1.5 w-10 rounded-full bg-white/60" />
              <div className="h-1 w-8 rounded-full bg-white/30" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomotiveMockup() {
  return (
    <div className="flex flex-col h-full">
      {/* Nav */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="h-2 w-12 rounded-full bg-white/70" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => <div key={i} className="h-1.5 w-7 rounded-full bg-white/25" />)}
        </div>
        <div className="h-4 w-12 rounded-full bg-white/35" />
      </div>
      {/* Full-width car hero */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-3 pb-2">
        {/* Car SVG silhouette */}
        <svg viewBox="0 0 200 80" className="w-full max-h-24 opacity-70" fill="none">
          {/* Body */}
          <path d="M20 52 L35 35 L55 28 L100 24 L145 28 L168 35 L180 52 L178 58 L22 58 Z" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
          {/* Roof */}
          <path d="M55 28 L70 18 L130 18 L145 28" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
          {/* Windshield */}
          <path d="M70 18 L75 28 L125 28 L130 18 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
          {/* Front wheel */}
          <circle cx="55" cy="60" r="10" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          <circle cx="55" cy="60" r="5" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          {/* Rear wheel */}
          <circle cx="145" cy="60" r="10" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          <circle cx="145" cy="60" r="5" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          {/* Headlight */}
          <ellipse cx="176" cy="46" rx="4" ry="3" fill="rgba(255,240,150,0.5)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
          {/* Grill */}
          <rect x="170" y="50" width="10" height="4" rx="1" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
        </svg>
        {/* Model & price */}
        <div className="flex items-center justify-between w-full mt-1">
          <div className="flex flex-col gap-0.5">
            <div className="h-2.5 w-20 rounded-full bg-white/70" />
            <div className="h-1.5 w-14 rounded-full bg-white/35" />
          </div>
          <div className="h-5 w-16 rounded-full bg-white/20 border border-white/30" />
        </div>
        {/* Spec chips */}
        <div className="flex gap-1.5 w-full mt-2">
          {["AWD", "450HP", "0–100 in 3.8s"].map((s, i) => (
            <div key={i} className="h-4 px-2 rounded-full bg-white/10 border border-white/20 flex items-center">
              <div className="h-1 rounded-full bg-white/50" style={{ width: `${s.length * 3.5}px` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SaaSMockup() {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-10 flex flex-col items-center py-3 gap-2.5 border-r border-white/10 bg-white/4">
        <div className="w-5 h-5 rounded bg-white/40" />
        <div className="w-full h-px bg-white/10 my-0.5" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 rounded" style={{ background: i === 0 ? "rgba(167,139,250,0.5)" : "rgba(255,255,255,0.1)" }} />
        ))}
      </div>
      {/* Main */}
      <div className="flex-1 px-2.5 py-2 flex flex-col gap-1.5 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="h-1.5 w-16 rounded-full bg-white/50" />
          <div className="h-4 w-12 rounded bg-white/20" />
        </div>
        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-1.5">
          {[["24.8K", "+12%", "Users"], ["$8.4K", "+28%", "MRR"], ["4.2%", "-0.3%", "Churn"]].map(([v, d, l], i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-1.5">
              <div className="h-2 w-8 rounded-full bg-white/60 mb-0.5" />
              <div className="h-1.5 w-6 rounded-full mb-1" style={{ background: i === 2 ? "rgba(248,113,113,0.6)" : "rgba(74,222,128,0.6)" }} />
              <div className="h-1 w-5 rounded-full bg-white/20" />
            </div>
          ))}
        </div>
        {/* Bar chart */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-2 flex-1">
          <div className="h-1 w-14 rounded-full bg-white/35 mb-2" />
          <div className="flex items-end gap-1 h-12">
            {[4, 6, 5, 8, 7, 9, 7, 10, 8, 11, 9, 12].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h * 4}px`, background: i === 11 ? "rgba(167,139,250,0.8)" : "rgba(255,255,255,0.15)" }} />
            ))}
          </div>
        </div>
        {/* Table rows */}
        <div className="flex flex-col gap-1">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 py-1 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="flex-1 h-1.5 rounded-full bg-white/20" />
              <div className="w-8 h-1.5 rounded-full bg-white/35" />
              <div className="w-5 h-3 rounded bg-white/15" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FinanceMockup() {
  return (
    <div className="flex flex-col h-full px-3 pt-2 gap-2">
      {/* Nav */}
      <div className="flex items-center justify-between">
        <div className="h-2 w-14 rounded-full bg-white/60" />
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => <div key={i} className="h-1.5 w-8 rounded-full bg-white/25" />)}
        </div>
        <div className="h-5 w-5 rounded-full bg-white/30" />
      </div>
      {/* Portfolio value */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
        <div className="h-1 w-14 rounded-full bg-white/30 mb-1" />
        <div className="h-3 w-24 rounded-full bg-white/70 mb-1" />
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-12 rounded-full bg-green-400/50" />
          <div className="h-1.5 w-8 rounded-full bg-white/20" />
        </div>
        {/* Line chart */}
        <div className="mt-2 h-12 relative">
          <svg viewBox="0 0 180 40" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fin-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            <path d="M0 32 L20 28 L40 25 L60 22 L80 20 L100 18 L120 14 L140 12 L160 8 L180 5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
            <path d="M0 32 L20 28 L40 25 L60 22 L80 20 L100 18 L120 14 L140 12 L160 8 L180 5 L180 40 L0 40 Z" fill="url(#fin-grad)"/>
          </svg>
        </div>
      </div>
      {/* Asset allocation */}
      <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden flex">
        {[[45, "rgba(255,255,255,0.5)"], [25, "rgba(255,255,255,0.25)"], [20, "rgba(255,255,255,0.15)"], [10, "rgba(255,255,255,0.08)"]].map(([w, c], i) => (
          <div key={i} style={{ width: `${w}%`, background: c as string }} />
        ))}
      </div>
      {/* Asset rows */}
      <div className="flex flex-col gap-1.5 flex-1">
        {[["Equities", "45%", "+8.2%"], ["Bonds", "25%", "+2.4%"], ["Gold", "20%", "+4.1%"]].map(([name, alloc, ret], i) => (
          <div key={i} className="flex items-center gap-2 px-1">
            <div className="w-2 h-2 rounded-sm bg-white/40" />
            <div className="flex-1 h-1.5 rounded-full bg-white/20" />
            <div className="h-1.5 w-6 rounded-full bg-white/35" />
            <div className="h-1.5 w-8 rounded-full bg-green-400/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

function IndustryMockup({ filter, slug }: { filter: string; slug: string }) {
  return (
    <div className="absolute inset-0 flex flex-col pointer-events-none">
      {/* Browser chrome */}
      <div
        className="flex-shrink-0 h-8 flex items-center px-3 gap-2 z-10"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,80,80,0.7)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,200,50,0.7)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "rgba(50,210,90,0.7)" }} />
        </div>
        <div
          className="flex-1 h-5 rounded-full flex items-center px-2.5 gap-1.5 mx-1"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(50,210,90,0.6)" }} />
          <span className="text-[8px] text-white/25 tracking-wide truncate font-mono">{slug}</span>
        </div>
      </div>
      {/* Industry-specific content */}
      <div className="flex-1 overflow-hidden opacity-[0.35]">
        {filter === "ecommerce"  && <EcommerceMockup />}
        {filter === "fintech"    && <FintechMockup />}
        {filter === "realestate" && <RealEstateMockup />}
        {filter === "automotive" && <AutomotiveMockup />}
        {filter === "saas"       && <SaaSMockup />}
        {filter === "finance"    && <FinanceMockup />}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      layout
      className="group relative flex-shrink-0 w-[300px] md:w-[400px] h-[500px] rounded-3xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      data-testid={`card-portfolio-${index}`}
      data-cursor-text="VIEW"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Gold border glow on hover */}
      <div
        className="absolute inset-0 rounded-3xl z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: "inset 0 0 0 1.5px rgba(202,163,83,0.55), 0 0 60px rgba(202,163,83,0.12)" }}
      />

      {/* Deep gradient base */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(160deg, ${project.gradient[0]}cc, ${project.gradient[1]}99, ${project.gradient[2]}cc)` }}
      />

      {/* Photo — full color, strong presence */}
      <img
        src={project.photo}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        style={{ opacity: 0.6 }}
        loading="lazy"
      />

      {/* Cinematic vignette — heavy at bottom, clear at top */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.05) 100%)"
      }} />

      {/* Noise grain texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />

      {/* ── TOP BAR ── */}
      <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between">
        {/* Year pill */}
        <span
          className="text-[9px] font-bold tracking-[0.3em] uppercase px-2.5 py-1 rounded-full"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
        >
          {project.year}
        </span>

        {/* Arrow button */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400"
          style={{ background: "rgba(202,163,83,0.2)", backdropFilter: "blur(8px)", border: "1px solid rgba(202,163,83,0.4)" }}
        >
          <ArrowUpRight className="w-4 h-4" style={{ color: "#F0C97A" }} />
        </div>
      </div>

      {/* ── RESULT BADGE (centre, always present) ── */}
      <div className="absolute top-1/2 -translate-y-8 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <div
          className="px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400"
          style={{ background: "rgba(202,163,83,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(202,163,83,0.5)", color: "#F0C97A", letterSpacing: "0.18em" }}
        >
          {project.result}
        </div>
      </div>

      {/* ── BOTTOM CONTENT ── */}
      <div className="absolute bottom-0 left-0 right-0 p-7 z-20">
        {/* Category */}
        <p
          className="text-[9px] font-bold tracking-[0.35em] uppercase mb-2.5"
          style={{ color: "#CAA353" }}
        >
          {project.category}
        </p>

        {/* Title */}
        <h3 className="text-3xl font-black text-white mb-5 leading-tight tracking-tight group-hover:text-white transition-colors duration-300">
          {project.title}
        </h3>

        {/* Divider */}
        <div className="w-8 h-px mb-4" style={{ background: "rgba(202,163,83,0.4)" }} />

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.filter === activeFilter);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-16 md:py-32 bg-background relative z-10 border-t border-white/5 overflow-hidden"
    >
      <motion.div style={{ y: headerY, opacity: headerOpacity }} className="container px-4 md:px-6 mb-6 md:mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 md:gap-8 mb-6 md:mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Our Work</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Selected Projects</h2>
          </div>
          <p className="text-foreground/40 text-sm max-w-xs leading-relaxed">
            A curated selection of digital experiences engineered for category leaders.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              data-testid={`filter-${f.value}`}
              className="relative px-5 py-2 text-[11px] font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300"
              style={{
                background: activeFilter === f.value ? "rgba(202,163,83,0.12)" : "rgba(255,255,255,0.04)",
                border: activeFilter === f.value ? "1px solid rgba(202,163,83,0.4)" : "1px solid rgba(255,255,255,0.08)",
                color: activeFilter === f.value ? "#CAA353" : "rgba(255,255,255,0.35)",
              }}
            >
              {f.label}
              {activeFilter === f.value && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(202,163,83,0.06)" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          ))}
          <span className="ml-auto text-[10px] text-foreground/25 tracking-widest uppercase hidden md:block">
            Drag to explore →
          </span>
        </div>
      </motion.div>

      {/* Horizontal scroll track */}
      <div
        className="flex gap-5 overflow-x-auto pl-[max(1rem,calc((100vw-1280px)/2+1rem))] pr-8 pb-6 scrollbar-hide"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", willChange: "scroll-position" }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <div key={project.title} style={{ scrollSnapAlign: "start" }}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </AnimatePresence>

        {/* View all CTA card */}
        <motion.a
          href="#contact"
          className="flex-shrink-0 w-[220px] h-[500px] rounded-3xl flex flex-col items-center justify-center gap-4 group"
          style={{ background: "rgba(202,163,83,0.04)", border: "1px solid rgba(202,163,83,0.15)" }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ background: "rgba(202,163,83,0.08)" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            style={{ background: "rgba(202,163,83,0.15)", border: "1px solid rgba(202,163,83,0.3)" }}
          >
            <ArrowRight className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center px-6">
            <p className="text-sm font-bold text-foreground/60 group-hover:text-foreground transition-colors">
              Start Your Project
            </p>
            <p className="text-xs text-foreground/30 mt-1">Let's build something great</p>
          </div>
        </motion.a>
      </div>

      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
