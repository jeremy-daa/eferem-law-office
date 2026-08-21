import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import { deleteS3Object, getPresignedReadUrl } from "@/lib/s3";

function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// GET /api/posts/[id] - Fetch single post by SLUG or ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const identifier = params.id;
    const foundPosts = await db
      .select()
      .from(posts)
      .where(or(eq(posts.slug, identifier), eq(posts.id, identifier)))
      .limit(1);

    if (foundPosts.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const p = foundPosts[0];
    let imageUrl = p.featuredImageKey || "";
    if (imageUrl) {
      imageUrl = await getPresignedReadUrl(imageUrl);
    }

    return NextResponse.json({
      ...p,
      _id: p.id,
      image: imageUrl || p.featuredImageKey,
    });
  } catch (error: any) {
    console.error("GET /api/posts/[id] Error:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

// PUT /api/posts/[id] - Update blog post in Neon Postgres
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const postId = params.id;
    const body = await req.json();
    const {
      title,
      category,
      excerpt,
      content,
      featured_image_key,
      image,
      authorName,
      publishedAt,
      isPublished,
    } = body;

    const updatedValues: any = {
      updatedAt: new Date(),
    };

    if (title) updatedValues.title = title;
    if (category) updatedValues.category = category;
    if (excerpt !== undefined) updatedValues.excerpt = excerpt;
    if (content) {
      updatedValues.content = content;
      updatedValues.readingTime = calculateReadingTime(content);
    }
    if (authorName) updatedValues.authorName = authorName;
    if (featured_image_key || image) updatedValues.featuredImageKey = featured_image_key || image;
    if (publishedAt) updatedValues.publishedAt = new Date(publishedAt);
    if (isPublished !== undefined) updatedValues.isPublished = Boolean(isPublished);

    try {
      await db.update(posts).set(updatedValues).where(eq(posts.id, postId));
    } catch (err: any) {
      console.log("Neon DB Update Notice:", err?.message || err);
    }

    return NextResponse.json({ success: true, message: "Post updated successfully" });
  } catch (error: any) {
    console.error("PUT /api/posts/[id] Error:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE /api/posts/[id] - Delete post from Neon Postgres & clean up S3 media object
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const postId = params.id;

    try {
      const foundPosts = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);
      if (foundPosts.length > 0 && foundPosts[0].featuredImageKey) {
        await deleteS3Object(foundPosts[0].featuredImageKey);
      }
      await db.delete(posts).where(eq(posts.id, postId));
    } catch (err: any) {
      console.log("Neon DB Delete Notice:", err?.message || err);
    }

    return NextResponse.json({ success: true, message: "Post deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/posts/[id] Error:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
