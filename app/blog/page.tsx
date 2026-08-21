import React from "react";
import type { Metadata } from "next";
import BlogPaginator from "./BlogPaginator";
import Hero from "@/components/Hero";
import { getPublishedPostsServer } from "@/lib/db/posts";
import JsonLd from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.elo-law-ethiopia.com";

export const metadata: Metadata = {
  title: "News & Legal Publications | Eferem Law Office",
  description:
    "Authoritative legal articles, statutory analyses, and judicial precedents published by Senior Counsel Eferem Hailemariam Bezabhe in Ethiopia.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: "News & Legal Publications | Eferem Law Office",
    description: "Executive legal insights and legal updates on Ethiopian commercial law.",
    url: `${siteUrl}/blog`,
    images: [`${siteUrl}/images/Logo.png`],
  },
};

// Server Component (SSR) for Instant Database Rendering
export default async function BlogListPage() {
  const serverPosts = await getPublishedPostsServer();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/blog/#webpage`,
    "url": `${siteUrl}/blog`,
    "name": "Legal Publications & Insights",
    "description": "Comprehensive index of legal publications by Eferem Law Office.",
    "publisher": {
      "@type": "LegalService",
      "name": "Eferem Law Office",
      "url": siteUrl
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-[#0A1D37]">
      <JsonLd data={blogSchema} />
      <Hero title="News & Legal Publications" subtitle="Judicial Insights, Statutory Analyses & Legal Precedents in Ethiopia" />
      <BlogPaginator initialPosts={serverPosts} />
    </div>
  );
}
