"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuClock,
  LuCalendar,
  LuTag,
  LuBookOpen,
  LuArrowUpRight,
  LuSparkles,
  LuShieldCheck
} from "react-icons/lu";

interface BlogCardProps {
  d: any[];
}

export default function BlogCard({ d }: BlogCardProps) {
  const blogs = d || [];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [mousePos, setMousePos] = useState<{ [key: string]: { x: number; y: number } }>({});

  const categories = ["All", "Corporate & Commercial", "Tax & Finance", "Litigation", "Intellectual Property"];

  const filteredBlogs = blogs.filter((b) => {
    if (selectedCategory === "All") return true;
    return (b.category || "").toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recent";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Recent"
      : date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  };

  const getCleanExcerpt = (content: string, excerpt?: string) => {
    if (excerpt && excerpt.trim().length > 0) {
      return excerpt.replace(/!\[.*?\]\(.*?\)/g, "").replace(/\[(.*?)\]\(.*?\)/g, "$1").replace(/[#*`_>~-]/g, "").trim();
    }
    if (!content) return "Explore statutory analysis, landmark precedents, and corporate advisory insights...";

    const cleanText = content
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/[#*`_>~-]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    return cleanText.length > 115 ? cleanText.slice(0, 115) + "..." : cleanText;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos((prev) => ({
      ...prev,
      [cardId]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  if (!blogs || blogs.length === 0) {
    return (
      <div className="w-full py-20 px-5 text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-3xl bg-[#FBA832]/10 border border-[#FBA832]/30 text-[#FBA832] flex items-center justify-center">
          <LuBookOpen className="w-8 h-8" />
        </div>
        <h3 className="font-serif-heading text-2xl font-bold text-white">No Legal Publications Yet</h3>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md">
          Check back soon for legal updates, regulatory analyses, and court decisions from Eferem Law Office.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-12">

      {/* Header & Category Filter Tabs */}
      <div className="flex flex-col items-center text-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="px-4 py-1.5 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
            <LuSparkles className="w-4 h-4 text-[#FBA832] animate-pulse" />
            <span>Legal Intelligence & Insights</span>
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-extrabold text-white max-w-2xl leading-tight">
            Judicial Dossiers & <span className="text-gold-gradient font-serif-heading">Publications</span>
          </h2>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#061528] border border-slate-700/80 shadow-2xl">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  active
                    ? "text-[#0A1D37] shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="categoryTab"
                    className="absolute inset-0 bg-[#FBA832] rounded-xl z-0 shadow-md shadow-[#FBA832]/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Creative Animated Card Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredBlogs.map((blog: any, index: number) => {
            const targetSlug = blog.slug || blog.id || blog._id;
            const cardId = blog.id || blog._id || String(index);
            const pos = mousePos[cardId] || { x: 150, y: 150 };
            const displayImage =
              blog.image ||
              blog.featuredImageKey ||
              `/images/experience/${(index % 3) + 1}.png`;

            return (
              <motion.div
                key={cardId}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onMouseMove={(e) => handleMouseMove(e, cardId)}
                className="h-full"
              >
                <Link
                  href={`/blog/${targetSlug}`}
                  className="group relative w-full h-full rounded-[32px] bg-[#0A1A2F] border-l-4 border-l-[#FBA832] border-t border-r border-b border-slate-800 hover:border-[#FBA832]/80 shadow-2xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_50px_-10px_rgba(251,168,50,0.35)]"
                >
                  {/* Real-time Dynamic Laser Spotlight Glow following cursor */}
                  <div
                    className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                    style={{
                      background: `radial-gradient(450px circle at ${pos.x}px ${pos.y}px, rgba(251, 168, 50, 0.22), transparent 80%)`,
                    }}
                  />

                  {/* Animated Light Sweep Shimmer Trail */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 pointer-events-none" />

                  {/* Header Bar */}
                  <div className="p-6 pb-0 flex items-center justify-between relative z-20">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#085AA3]/50 border border-[#FBA832]/40 text-[#FBA832] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md group-hover:scale-105 transition-transform">
                      <LuTag className="w-3 h-3 text-[#FBA832]" />
                      <span>{blog.category || "Corporate Law"}</span>
                    </span>

                    {/* Animated Watermark Index Number */}
                    <span className="font-serif-heading font-extrabold text-4xl text-slate-700/40 group-hover:text-[#FBA832]/40 group-hover:scale-125 transition-all duration-500 select-none">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 flex flex-col gap-4 relative z-20 flex-1">
                    
                    {/* Image Frame with Subtle 3D Tilt */}
                    <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-700 group-hover:border-[#FBA832]/60 relative shadow-inner bg-[#061528] transition-all duration-500 group-hover:rotate-1 group-hover:scale-[1.02]">
                      <img
                        src={displayImage}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                        onError={(e: any) => {
                          e.target.src = `/images/experience/${(index % 3) + 1}.png`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] via-transparent to-transparent opacity-80" />

                      {/* Verified Badge Icon */}
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-[#0A1D37]/90 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/40 backdrop-blur-md flex items-center gap-1 shadow-md group-hover:scale-105 transition-transform">
                        <LuShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified Analysis</span>
                      </span>
                    </div>

                    {/* Meta Attributes */}
                    <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-1">
                      <span className="flex items-center gap-1.5 text-[#FBA832] font-semibold">
                        <LuClock className="w-3.5 h-3.5" />
                        <span>{blog.readingTime || "3 min read"}</span>
                      </span>

                      <span className="flex items-center gap-1.5 text-slate-400">
                        <LuCalendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-white group-hover:text-[#FBA832] transition-colors leading-snug line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* Parsed Clean Excerpt */}
                    <p className="text-slate-300 text-xs leading-relaxed font-sans-body line-clamp-2">
                      {getCleanExcerpt(blog.content, blog.excerpt)}
                    </p>
                  </div>

                  {/* Animated Footer Trigger */}
                  <div className="p-5 px-6 border-t border-slate-800/90 bg-[#061222]/90 flex items-center justify-between text-xs font-bold text-[#FBA832] relative z-20">
                    <span className="tracking-wide group-hover:text-white transition-colors">Access Legal Brief</span>
                    <div className="w-8 h-8 rounded-full bg-[#FBA832]/10 group-hover:bg-[#FBA832] text-[#FBA832] group-hover:text-[#0A1D37] border border-[#FBA832]/40 flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:scale-110 shadow-md">
                      <LuArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
