import { pgTable, text, timestamp, varchar, boolean, integer, jsonb } from "drizzle-orm/pg-core";

// Neon Managed Auth User Schema
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  emailVerified: boolean("email_verified").default(false),
  image: text("image"),
  role: text("role").default("admin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Neon Managed Better Auth Session Schema
export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Comprehensive Relational Law Firm Blog Posts Schema
export const posts = pgTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: text("category").notNull().default("Corporate & Commercial"),
  excerpt: text("excerpt"),
  content: text("content").notNull(), // Markdown Content with inline S3 assets/documents
  authorId: text("author_id").references(() => users.id, { onDelete: "set null" }),
  authorName: text("author_name").default("Eferem Hailemariam"),
  featuredImageKey: text("featured_image_key"), // Hero banner key/URL in post-items S3 bucket
  readingTime: text("reading_time").default("3 min read"), // Auto-calculated reading time
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
  comments: jsonb("comments").$type<
    { commenter: string; email: string; content: string; createdAt: string }[]
  >().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Categories Table
export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
