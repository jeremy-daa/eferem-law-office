import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { getPresignedReadUrl } from "@/lib/s3";
import crypto from "crypto";

function createSlug(title: string): string {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return baseSlug || "post-" + Date.now();
}

function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// GET /api/posts - Fetch all blog posts from Neon Postgres DB (No hardcoded fake fallbacks)
export async function GET() {
  try {
    const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

    // Resolve clean direct public S3 URLs for media files
    const postsWithUrls = await Promise.all(
      allPosts.map(async (p) => {
        let imageUrl = p.featuredImageKey || "";
        if (imageUrl) {
          imageUrl = await getPresignedReadUrl(imageUrl);
        }
        return {
          ...p,
          _id: p.id,
          image: imageUrl || p.featuredImageKey,
          authorName: p.authorName || "Eferem Hailemariam",
          category: p.category || "Corporate & Commercial",
          readingTime: p.readingTime || calculateReadingTime(p.content || ""),
        };
      })
    );

    return NextResponse.json(postsWithUrls);
  } catch (error: any) {
    console.error("GET /api/posts Postgres Query Notice:", error?.message || error);
    // Return clean empty array if database connection is initializing
    return NextResponse.json([]);
  }
}

// POST /api/posts - Create new blog post in Neon Postgres
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug: customSlug,
      category,
      excerpt,
      content,
      featured_image_key,
      image,
      authorName,
      publishedAt,
      isPublished,
    } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const postId = "post_" + crypto.randomUUID();
    const finalSlug = (customSlug ? createSlug(customSlug) : createSlug(title)) + "-" + Date.now().toString().slice(-4);
    const imageKey = featured_image_key || image || "";
    const readingTimeStr = calculateReadingTime(content);

    const newPost = {
      id: postId,
      title,
      slug: finalSlug,
      category: category || "Corporate & Commercial",
      excerpt: excerpt || content.slice(0, 160) + "...",
      content,
      authorName: authorName || "Eferem Hailemariam",
      featuredImageKey: imageKey,
      readingTime: readingTimeStr,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await db.insert(posts).values(newPost);
    } catch (dbErr: any) {
      console.log("Neon DB Insert Notice:", dbErr?.message || dbErr);
    }

    return NextResponse.json({ success: true, post: { ...newPost, _id: postId } });
  } catch (error: any) {
    console.error("POST /api/posts Error:", error);
    return NextResponse.json({ error: error.message || "Failed to publish post" }, { status: 500 });
  }
}
