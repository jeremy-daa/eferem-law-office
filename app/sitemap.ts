import { MetadataRoute } from "next";
import { getPublishedPostsServer } from "@/lib/db/posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.elo-law-ethiopia.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPostsServer();

  const blogPostUrls = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug || post.id}`,
    lastModified: new Date(post.publishedAt || post.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/practice-areas`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  return [...staticPages, ...blogPostUrls];
}
