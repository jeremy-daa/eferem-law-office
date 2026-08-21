import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { desc, eq, or } from "drizzle-orm";
import { getPresignedReadUrl } from "@/lib/s3";

export interface PostRecord {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  authorName: string;
  featuredImageKey?: string;
  image?: string;
  readingTime: string;
  publishedAt: Date | string;
  isPublished: boolean;
  createdAt: Date | string;
}

function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// Server-side helper to fetch published posts for SSR
export async function getPublishedPostsServer(): Promise<PostRecord[]> {
  try {
    const rawPosts = await db
      .select()
      .from(posts)
      .where(eq(posts.isPublished, true))
      .orderBy(desc(posts.publishedAt));

    const postsWithUrls = await Promise.all(
      rawPosts.map(async (p) => {
        let imageUrl = p.featuredImageKey || "";
        if (imageUrl && !imageUrl.startsWith("http") && !imageUrl.startsWith("/")) {
          try {
            imageUrl = await getPresignedReadUrl(imageUrl);
          } catch (err) {
            imageUrl = "/images/experience/1.png";
          }
        }
        if (!imageUrl) {
          imageUrl = "/images/experience/1.png";
        }

        return {
          id: p.id,
          title: p.title,
          slug: p.slug,
          category: p.category || "Corporate & Commercial",
          excerpt: p.excerpt || p.content.slice(0, 140) + "...",
          content: p.content,
          authorName: p.authorName || "Eferem Hailemariam",
          featuredImageKey: p.featuredImageKey || "",
          image: imageUrl,
          readingTime: p.readingTime || calculateReadingTime(p.content),
          publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString() : new Date().toISOString(),
          isPublished: p.isPublished,
          createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString(),
        };
      })
    );

    return postsWithUrls;
  } catch (err) {
    console.error("Server-side getPublishedPostsServer error:", err);
    return [];
  }
}

// Server-side helper to fetch a single post by slug or ID for SSR
export async function getPostBySlugServer(slugOrId: string): Promise<PostRecord | null> {
  try {
    const foundPosts = await db
      .select()
      .from(posts)
      .where(or(eq(posts.slug, slugOrId), eq(posts.id, slugOrId)))
      .limit(1);

    if (foundPosts.length === 0) return null;

    const p = foundPosts[0];
    let imageUrl = p.featuredImageKey || "";
    if (imageUrl && !imageUrl.startsWith("http") && !imageUrl.startsWith("/")) {
      try {
        imageUrl = await getPresignedReadUrl(imageUrl);
      } catch (err) {
        imageUrl = "/images/experience/1.png";
      }
    }
    if (!imageUrl) {
      imageUrl = "/images/experience/1.png";
    }

    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: p.category || "Corporate & Commercial",
      excerpt: p.excerpt || p.content.slice(0, 140) + "...",
      content: p.content,
      authorName: p.authorName || "Eferem Hailemariam",
      featuredImageKey: p.featuredImageKey || "",
      image: imageUrl,
      readingTime: p.readingTime || calculateReadingTime(p.content),
      publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString() : new Date().toISOString(),
      isPublished: p.isPublished,
      createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString(),
    };
  } catch (err) {
    console.error("Server-side getPostBySlugServer error:", err);
    return null;
  }
}
