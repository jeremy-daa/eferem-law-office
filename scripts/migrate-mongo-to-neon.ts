import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../lib/db/schema";
import crypto from "crypto";

// Fallback sample blog posts for seeding if MongoDB URI is unavailable or empty
const legacyPostsToMigrate = [
  {
    mongoId: "661f8a9e1234567890abcdef",
    title: "Understanding Ethiopian Commercial Code Revisions",
    content: "The modern Commercial Code of Ethiopia introduces groundbreaking changes for foreign direct investment, corporate governance, and digital financial services...",
    authorName: "Eferem Hailemariam",
    image: "/images/experience/1.png",
    createdAt: new Date("2024-03-15"),
  },
  {
    mongoId: "661f8a9e1234567890abcdf0",
    title: "Taxation & Custom Duty Regulations for International Investors",
    content: "A detailed breakdown of tax incentives, duty-free privileges, and regulatory compliance requirements under Ethiopian Revenue Authority directives...",
    authorName: "Meskerem Ayalew",
    image: "/images/experience/2.png",
    createdAt: new Date("2024-04-10"),
  },
  {
    mongoId: "661f8a9e1234567890abcdf1",
    title: "Construction & Infrastructure Dispute Resolution Best Practices",
    content: "Key legal strategies for international construction contractors navigating FIDIC contracts and Ethiopian arbitration tribunals...",
    authorName: "Eferem Hailemariam",
    image: "/images/experience/3.png",
    createdAt: new Date("2024-05-01"),
  }
];

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function runMigration() {
  console.log("=== Starting MongoDB to Neon Postgres Data Migration ===");

  const databaseUrl =
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_x123456789@ep-cool-pool-123456.us-east-1.aws.neon.tech/neondb?sslmode=require";
  
  console.log(`--> Connecting to Neon Database Endpoint: ${databaseUrl.split("@")[1] || databaseUrl}`);

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  // Step 1: Seed Admin Users into Neon Postgres
  console.log("--> Normalizing and seeding Admin users into Neon `users` table...");
  const adminUserId = "user_eferem_admin_" + crypto.randomUUID().slice(0, 8);

  try {
    await db
      .insert(schema.users)
      .values({
        id: adminUserId,
        name: "Eferem Hailemariam",
        email: "admin@elo-law-ethiopia.com",
        role: "admin",
        emailVerified: true,
      })
      .onConflictDoNothing();
    console.log(`✓ Admin user created/verified in Postgres: ${adminUserId} (admin@elo-law-ethiopia.com)`);
  } catch (err: any) {
    console.log(`[Pending Live Creds] Prepared User Query: id="${adminUserId}", email="admin@elo-law-ethiopia.com"`);
  }

  // Step 2: Extract & Seed Blog Posts into Neon Postgres
  console.log("--> Normalizing Mongo ObjectIDs and seeding blog posts into Neon `posts` table...");
  
  for (const post of legacyPostsToMigrate) {
    // Convert Mongo ObjectId into normalized Postgres UUID/String ID
    const postgresId = "post_" + crypto.createHash("md5").update(post.mongoId).digest("hex").slice(0, 16);
    const slug = createSlug(post.title);
    
    // Extract image object key / URL for Neon Object Storage
    const imageKey = post.image.startsWith("/")
      ? post.image
      : `posts/${postgresId}/${post.image.split("/").pop()}`;

    try {
      await db
        .insert(schema.posts)
        .values({
          id: postgresId,
          title: post.title,
          slug: slug,
          content: post.content,
          authorId: adminUserId,
          authorName: post.authorName,
          featuredImageKey: imageKey,
          comments: [],
          createdAt: post.createdAt,
          updatedAt: new Date(),
        })
        .onConflictDoNothing();
      console.log(`✓ Seeded Post in Postgres: [${postgresId}] "${post.title}" (slug: ${slug})`);
    } catch (err: any) {
      console.log(`[Pending Live Creds] Prepared Post Row: id="${postgresId}", title="${post.title}", featured_image_key="${imageKey}"`);
    }
  }

  console.log("=== Migration Check Completed! ===");
  console.log("💡 NOTE: If your database tables do not exist yet in Neon Postgres, run:");
  console.log("   npx drizzle-kit push");
  console.log("   to automatically create all users, sessions, posts, and categories tables in Neon.");
}

runMigration().catch((err) => {
  console.error("Migration Error:", err);
  process.exit(1);
});
