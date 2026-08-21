"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuPlusCircle,
  LuFileText,
  LuFolder,
  LuClock,
  LuTrash2,
  LuFileEdit,
  LuExternalLink,
  LuSearch,
  LuRefreshCw,
  LuDatabase,
  LuCheckCircle,
  LuEye,
  LuEyeOff
} from "react-icons/lu";

interface Post {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  category?: string;
  excerpt?: string;
  content: string;
  image?: string;
  featuredImageKey?: string;
  authorName?: string;
  readingTime?: string;
  publishedAt?: string;
  isPublished?: boolean;
  createdAt?: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this legal article from Neon Postgres and S3 storage?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPosts();
      } else {
        alert("Failed to delete article.");
      }
    } catch (err) {
      alert("Error connecting to server.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleVisibility = async (id: string, currentStatus?: boolean) => {
    try {
      const newStatus = currentStatus === false ? true : false;
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: newStatus }),
      });
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) => (p.id === id || p._id === id ? { ...p, isPublished: newStatus } : p))
        );
      }
    } catch (err) {
      console.error("Failed to toggle visibility:", err);
    }
  };

  // Filter posts by search query & category
  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoriesList = ["All", ...Array.from(new Set(posts.map((p) => p.category || "Corporate & Commercial")))];

  return (
    <div className="w-full py-12 px-4 sm:px-8 lg:px-12 bg-[#0A1D37] text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        {/* Dashboard Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold tracking-tight">
              Legal Insights <span className="text-gold-gradient font-serif-heading">CMS</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-sans-body mt-1">
              Manage law firm publications, category insights, and S3 media attachments
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={fetchPosts}
              className="p-3.5 rounded-2xl bg-[#061528] border border-slate-700/80 hover:border-[#FBA832] text-slate-300 hover:text-white transition-all shadow-md"
              title="Refresh Articles"
            >
              <LuRefreshCw className={`w-5 h-5 ${loading ? "animate-spin text-[#FBA832]" : ""}`} />
            </button>

            <Link
              href="/admin/create-post"
              className="w-full md:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#FBA832] to-[#f99b15] hover:from-[#f99b15] hover:to-[#e08905] text-[#0A1D37] font-bold text-sm shadow-xl shadow-[#FBA832]/30 flex items-center justify-center gap-2.5 transition-all hover:scale-105"
            >
              <LuPlusCircle className="w-5 h-5" />
              <span>+ Create New Article</span>
            </Link>
          </div>
        </div>

        {/* Quick Statistics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0D274C] to-[#061528] border border-[#FBA832]/30 shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FBA832]/15 border border-[#FBA832]/40 text-[#FBA832] flex items-center justify-center shrink-0">
              <LuFileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Articles</span>
              <h3 className="text-2xl font-bold font-serif-heading text-white">{posts.length}</h3>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0D274C] to-[#061528] border border-[#FBA832]/30 shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#085AA3]/30 border border-[#085AA3]/50 text-[#085AA3] flex items-center justify-center shrink-0">
              <LuFolder className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Categories</span>
              <h3 className="text-2xl font-bold font-serif-heading text-white">{Math.max(1, categoriesList.length - 1)}</h3>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0D274C] to-[#061528] border border-[#FBA832]/30 shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <LuCheckCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Published Insights</span>
              <h3 className="text-2xl font-bold font-serif-heading text-white">{posts.length}</h3>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0D274C] to-[#061528] border border-[#FBA832]/30 shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0">
              <LuDatabase className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Storage Engine</span>
              <h3 className="text-sm font-bold font-serif-heading text-purple-300">Neon Postgres & S3</h3>
            </div>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#061528] border border-slate-800">
          <div className="relative w-full sm:w-80">
            <LuSearch className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0D274C]/60 border border-slate-700/80 focus:border-[#FBA832] rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categoriesList.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#FBA832] text-[#0A1D37] font-bold shadow-md"
                    : "bg-[#0D274C]/60 text-slate-300 hover:text-white border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Grid */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center gap-3">
            <LuRefreshCw className="w-8 h-8 text-[#FBA832] animate-spin" />
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Fetching Legal Articles from Neon Postgres...
            </span>
          </div>
        ) : filteredPosts.length === 0 ? (
          /* Empty State */
          <div className="py-20 px-6 rounded-3xl bg-gradient-to-b from-[#0D274C]/60 to-[#061528] border-2 border-dashed border-slate-700 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-[#FBA832]/10 border border-[#FBA832]/30 text-[#FBA832] flex items-center justify-center">
              <LuFileText className="w-8 h-8" />
            </div>
            <h3 className="font-serif-heading text-2xl font-bold">No Articles Found</h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md">
              {search || selectedCategory !== "All"
                ? "No published articles match your current search or category filter."
                : "Your legal insights database is currently empty. Click below to write your first legal publication."}
            </p>
            <Link
              href="/admin/create-post"
              className="mt-2 px-8 py-3.5 rounded-2xl bg-[#FBA832] text-[#0A1D37] font-bold text-xs shadow-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              <LuPlusCircle className="w-4 h-4" />
              <span>+ Create First Article</span>
            </Link>
          </div>
        ) : (
          /* Articles List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id || post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-3xl bg-gradient-to-b from-[#0D274C] to-[#061528] border border-slate-700/80 hover:border-[#FBA832]/60 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Banner Image / Thumbnail */}
                  <div className="relative w-full h-44 bg-[#061528] overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 gap-2">
                        <LuFileText className="w-10 h-10" />
                        <span className="text-xs">No Cover Image Attached</span>
                      </div>
                    )}
                    
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0A1D37]/90 border border-[#FBA832]/40 text-[#FBA832] text-[11px] font-bold shadow-md">
                      {post.category || "Corporate & Commercial"}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <LuClock className="w-3 h-3 text-[#FBA832]" />
                        {post.readingTime || "3 min read"}
                      </span>
                      <span>•</span>
                      <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Just now"}</span>
                    </div>

                    <h4 className="font-serif-heading text-lg font-bold text-white line-clamp-2 leading-snug">
                      {post.title}
                    </h4>

                    <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed font-sans-body">
                      {post.excerpt || post.content.replace(/[#*`]/g, "").slice(0, 120) + "..."}
                    </p>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 px-6 border-t border-slate-800/80 bg-[#061528]/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/blog/${post.slug || post.id || post._id}`}
                        target="_blank"
                        className="p-2 rounded-xl text-slate-400 hover:text-[#FBA832] hover:bg-[#0D274C] transition-colors"
                        title="View Live Article"
                      >
                        <LuExternalLink className="w-4 h-4" />
                      </Link>

                      {/* 1-Click Visibility Toggle */}
                      <button
                        onClick={() => handleToggleVisibility(post.id || post._id || "", post.isPublished)}
                        className={`p-2 rounded-xl border transition-all flex items-center gap-1 text-[11px] font-bold ${
                          post.isPublished !== false
                            ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20"
                            : "bg-amber-500/10 border-amber-500/40 text-amber-400 hover:bg-amber-500/20"
                        }`}
                        title={post.isPublished !== false ? "Click to Hide Article (Draft)" : "Click to Publish Article (Public)"}
                      >
                        {post.isPublished !== false ? <LuEye className="w-4 h-4" /> : <LuEyeOff className="w-4 h-4" />}
                        <span>{post.isPublished !== false ? "Visible" : "Hidden"}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(post.id || post._id || "")}
                        disabled={deletingId === (post.id || post._id)}
                        className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/20 transition-colors"
                        title="Delete Article"
                      >
                        <LuTrash2 className="w-4 h-4" />
                      </button>

                      <Link
                        href={`/admin/create-post?id=${post.id || post._id}`}
                        className="px-4 py-1.5 rounded-xl bg-[#085AA3]/40 border border-[#FBA832]/30 text-[#FBA832] hover:bg-[#FBA832] hover:text-[#0A1D37] text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <LuFileEdit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </Link>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}
