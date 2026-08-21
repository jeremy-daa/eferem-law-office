"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuCalendar, LuClock, LuArrowRight, LuNewspaper } from "react-icons/lu";

// Fallback articles if dynamic DB is empty
const fallbackBlogs = [
  {
    _id: "1",
    title: "Navigating Commercial Law & Foreign Investment in Ethiopia",
    content: "An essential legal overview of recent legislative updates governing corporate registration, foreign exchange protocols, and commercial dispute resolution mechanisms in Ethiopia.",
    image: "/images/home/hero/justice.jpg",
    createdAt: new Date().toISOString(),
    category: "Commercial Law",
    readTime: "5 min read",
  },
  {
    _id: "2",
    title: "Understanding Custom Duty Regulations & Corporate Tax Laws",
    title_sub: "Tax Compliance Guide",
    content: "Key legal strategies for multinational corporations and local enterprises navigating customs valuation, income tax exemptions, and duty-free import incentives.",
    image: "/images/home/hero/justice-2.jpg",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    category: "Tax & Duty",
    readTime: "4 min read",
  },
  {
    _id: "3",
    title: "Property Rights & Commercial Real Estate Transactions",
    content: "A comprehensive analysis of land lease policies, urban land holding rights, and due diligence requirements for property acquisitions in Addis Ababa.",
    image: "/images/home/hero/justice-3.jpg",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    category: "Property Law",
    readTime: "6 min read",
  },
];

export default function Blog() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBlogs(data);
        } else {
          setBlogs(fallbackBlogs);
        }
      })
      .catch(() => setBlogs(fallbackBlogs));
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const displayList = blogs && blogs.length > 0 ? blogs.slice(0, 3) : fallbackBlogs;

  return (
    <section className="relative w-full py-20 bg-[#0A1D37] text-white overflow-hidden">
      {/* Radial Gradient Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FBA832]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl flex flex-col items-center gap-3.5 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold tracking-wider uppercase">
            <LuNewspaper className="w-3.5 h-3.5" />
            <span>Legal Insights & News</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold leading-tight">
            Latest Publications & <span className="text-gold-gradient font-serif-heading">Legal News</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans-body">
            Stay informed with expert analysis, regulatory updates, and commercial law commentaries authored by Eferem Law Office.
          </p>
        </motion.div>

        {/* Magazine Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayList.map((blog, index) => (
            <motion.div
              key={blog._id || index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/blog/${blog._id}`}
                className="group relative h-full rounded-xl overflow-hidden bg-[#0D274C]/90 border border-white/10 hover:border-[#FBA832]/50 backdrop-blur-xl flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_-10px_rgba(251,168,50,0.25)]"
              >
                {/* Image Cover */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#061528]">
                  <Image
                    src={blog.image || "/images/home/hero/justice.jpg"}
                    alt={blog.title}
                    fill
                    className="object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                    quality={100}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D274C] via-transparent to-transparent opacity-90" />

                  {/* Category Chip */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#FBA832] text-[#0A1D37] text-xs font-bold shadow-md">
                    {blog.category || "Legal Commentary"}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-3.5">
                  <div>
                    {/* Date & Read Time */}
                    <div className="flex items-center gap-3 text-slate-300 text-xs font-medium mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <LuCalendar className="w-3.5 h-3.5 text-[#FBA832]" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <LuClock className="w-3.5 h-3.5 text-[#FBA832]" />
                        <span>{blog.readTime || "4 min read"}</span>
                      </div>
                    </div>

                    <h3 className="font-serif-heading text-lg font-bold text-white group-hover:text-[#FBA832] transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>

                    <p className="text-slate-300 text-xs leading-relaxed mt-2 line-clamp-3">
                      {blog.content}
                    </p>
                  </div>

                  {/* Read Article Trigger */}
                  <div className="pt-3.5 border-t border-slate-700/80 flex items-center justify-between text-[#FBA832] text-xs font-semibold">
                    <span>Read Full Article</span>
                    <LuArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Blog Link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-lg bg-[#0D274C] hover:bg-[#085AA3] border border-[#FBA832]/30 hover:border-[#FBA832] text-white font-semibold text-sm transition-all duration-300 group"
          >
            <span>Explore All Insights</span>
            <LuArrowRight className="w-4 h-4 text-[#FBA832] group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}


