import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlugServer } from "@/lib/db/posts";
import ArticleContentRenderer from "./ArticleContentRenderer";
import ShareButton from "./ShareButton";
import JsonLd from "@/components/JsonLd";
import {
  LuArrowLeft,
  LuCalendar,
  LuClock,
  LuUser,
  LuTag,
  LuShieldCheck
} from "react-icons/lu";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.elo-law-ethiopia.com";

// Dynamic per-article Metadata generation for Search Engines & AI Bots
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlugServer(params.slug);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested legal publication could not be located.",
    };
  }

  const cleanExcerpt = post.excerpt || post.content.replace(/[#*`_\[\]()]/g, "").slice(0, 160) + "...";
  const articleUrl = `${siteUrl}/blog/${post.slug || post.id}`;
  const ogImage = post.image || `${siteUrl}/images/Logo.png`;

  return {
    title: `${post.title} | Eferem Law Office`,
    description: cleanExcerpt,
    keywords: [
      post.category || "Corporate Law",
      "Ethiopian Legal Advisory",
      "Eferem Hailemariam Bezabhe",
      "Ethiopian Law Firm Insight",
      post.title
    ],
    authors: [{ name: post.authorName || "Eferem Hailemariam", url: siteUrl }],
    openGraph: {
      type: "article",
      url: articleUrl,
      title: post.title,
      description: cleanExcerpt,
      publishedTime: typeof post.publishedAt === "string" ? post.publishedAt : new Date(post.publishedAt).toISOString(),
      authors: [post.authorName || "Eferem Hailemariam"],
      section: post.category || "Corporate & Commercial",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: cleanExcerpt,
      images: [ogImage],
    },
    alternates: {
      canonical: articleUrl,
    },
  };
}

// Server Component (SSR) for Instant Database Article Rendering
export default async function SingleBlogPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlugServer(params.slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateStr?: Date | string) => {
    if (!dateStr) return "Published";
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? "Published"
      : date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
  };

  const displayImage = post.image || post.featuredImageKey || "/images/experience/1.png";
  const articleUrl = `${siteUrl}/blog/${post.slug || post.id}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}/#article`,
    "headline": post.title,
    "description": post.excerpt || post.content.replace(/[#*`_\[\]()]/g, "").slice(0, 160) + "...",
    "image": [displayImage],
    "datePublished": typeof post.publishedAt === "string" ? post.publishedAt : new Date(post.publishedAt).toISOString(),
    "dateModified": typeof post.createdAt === "string" ? post.createdAt : new Date(post.createdAt).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.authorName || "Eferem Hailemariam Bezabhe",
      "jobTitle": "Senior Managing Partner",
      "worksFor": {
        "@type": "LegalService",
        "name": "Eferem Law Office"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Eferem Law Office",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/Logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "articleSection": post.category || "Corporate & Commercial",
    "wordCount": post.content ? post.content.trim().split(/\s+/).length : 0
  };

  return (
    <div className="w-full min-h-screen bg-[#0A1D37] text-white pt-36 pb-24 px-4 sm:px-8 lg:px-12 relative overflow-hidden">

      <JsonLd data={blogPostingSchema} />

      {/* Background Lighting Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#FBA832]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-[#085AA3]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col gap-10 relative z-10">

        {/* Back Button & Share Row */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#061528] border border-slate-700/80 hover:border-[#FBA832] text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-md"
          >
            <LuArrowLeft className="w-4 h-4 text-[#FBA832]" />
            <span>Back to Legal Publications</span>
          </Link>

          <ShareButton />
        </div>

        {/* Article Main Header Box */}
        <div className="flex flex-col gap-6">
          {/* Practice Category Pill */}
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/40 text-[#FBA832] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit shadow-md">
              <LuTag className="w-3.5 h-3.5" />
              <span>{post.category || "Corporate & Commercial"}</span>
            </span>

            <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
              <LuShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Legal Insight</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif-heading text-3xl sm:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>

          {/* Meta Attributes Bar */}
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300 pt-2 border-t border-b border-slate-800 py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#085AA3] border border-[#FBA832]/50 flex items-center justify-center text-[#FBA832] font-bold text-xs">
                <LuUser className="w-4 h-4" />
              </div>
              <span className="font-semibold text-white">
                {post.authorName || "Eferem Hailemariam"} (Senior Partner)
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <LuCalendar className="w-4 h-4 text-[#FBA832]" />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <LuClock className="w-4 h-4 text-[#FBA832]" />
              <span>{post.readingTime || "4 min read"}</span>
            </div>
          </div>
        </div>

        {/* Featured Hero Banner Image */}
        <div className="w-full rounded-[32px] overflow-hidden border-2 border-[#FBA832]/30 shadow-2xl bg-[#061528] max-h-[480px] relative">
          <img
            src={displayImage}
            alt={post.title}
            className="w-full h-full object-cover max-h-[480px]"
          />
        </div>

        {/* Article Body Content (Client Component with Markdown Renderer) */}
        <ArticleContentRenderer content={post.content} />

        {/* Dynamic Executive Author Biography Card */}
        {(() => {
          const authorName = post.authorName || "Eferem Hailemariam Bezabhe";
          const initials = authorName
            .split(" ")
            .map((n: string) => n[0])
            .filter(Boolean)
            .slice(0, 2)
            .join("")
            .toUpperCase() || "EH";
          const isEferem = authorName.toLowerCase().includes("eferem");
          const authorRole = isEferem ? "Senior Managing Partner" : "Legal Counsel & Author";
          const authorBio = isEferem
            ? "Senior Legal Counsel specializing in Corporate Law, Public Procurement, Commercial Litigation, and Foreign Direct Investment in Ethiopia. Over two decades of executive legal practice representing corporations and NGO entities."
            : `Legal Counsel and contributor at Eferem Law Office specializing in ${post.category || "Ethiopian Commercial Law"} and legal research analysis.`;

          return (
            <div className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-r from-[#0D274C] via-[#081B35] to-[#061528] border-2 border-[#FBA832]/40 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-[#085AA3] border-2 border-[#FBA832] text-[#FBA832] flex items-center justify-center shrink-0 shadow-xl font-serif-heading font-bold text-2xl">
                {initials}
              </div>

              <div className="flex flex-col gap-2 text-center sm:text-left">
                <h3 className="font-serif-heading text-xl font-bold text-white">
                  {authorName} <span className="text-[#FBA832] text-sm font-sans-body font-bold ml-1">({authorRole})</span>
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {authorBio}
                </p>

                <Link
                  href="/contact"
                  className="mt-3 px-6 py-2.5 rounded-xl bg-[#FBA832] text-[#0A1D37] font-bold text-xs shadow-lg transition-all hover:scale-105 w-fit mx-auto sm:mx-0"
                >
                  Request Legal Consultation →
                </Link>
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}
