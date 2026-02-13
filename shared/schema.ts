import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, serial, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  vehicle: text("vehicle").notNull(),
  insurance: text("insurance"),
  message: text("message"),
  status: text("status").notNull().default("New Lead"),
  loanerRequested: boolean("loaner_requested").default(false),
  pickupRequested: boolean("pickup_requested").default(false),
  insuranceApproved: boolean("insurance_approved").default(false),
  insuranceApprovalTimestamp: timestamp("insurance_approval_timestamp"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  status: true,
  loanerRequested: true,
  pickupRequested: true,
  insuranceApproved: true,
  insuranceApprovalTimestamp: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const leadStatuses = [
  "New Lead",
  "Sale Closed",
  "Claim Initiated",
  "RA Signed",
  "Loaner Assigned",
  "Vehicle In Shop",
  "Scoped",
  "Estimate Sent",
  "First Look",
  "Supplement Submitted",
  "Awaiting Approval",
  "Approved",
  "R&I",
  "PDR",
  "QC 1",
  "Reinstall",
  "QC 2",
  "Detail",
  "Ready for Delivery",
  "Delivered",
  "Closed",
] as const;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("editor"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  passwordHash: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const userRoles = ["root", "admin", "editor"] as const;

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Session = typeof sessions.$inferSelect;

export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  overview: text("overview").notNull().default(""),
  targetKeywords: text("target_keywords").array().default(sql`'{}'::text[]`),
  searchIntent: text("search_intent"),
  estimatedSearchVolume: text("estimated_search_volume"),
  competitionLevel: text("competition_level"),
  leadPotential: text("lead_potential"),
  reasoning: text("reasoning"),
  status: text("status").notNull().default("suggested"),
  aiJobId: integer("ai_job_id"),
  postId: integer("post_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTopicSchema = createInsertSchema(topics).omit({
  id: true,
  createdAt: true,
  aiJobId: true,
  postId: true,
  status: true,
});

export type InsertTopic = z.infer<typeof insertTopicSchema>;
export type Topic = typeof topics.$inferSelect;
export const topicStatuses = ["suggested", "generating", "generated", "archived"] as const;

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull().default(""),
  excerpt: text("excerpt"),
  featuredImage: text("featured_image"),
  authorId: integer("author_id").references(() => users.id),
  status: text("status").notNull().default("draft"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords").array().default(sql`'{}'::text[]`),
  researchJobId: integer("research_job_id"),
  topicId: integer("topic_id"),
  readCount: integer("read_count").notNull().default(0),
  shareCount: integer("share_count").notNull().default(0),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  authorId: true,
});

export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;

export const postStatuses = ["draft", "queued", "published"] as const;

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  status: text("status").notNull().default("active"),
  unsubscribeToken: text("unsubscribe_token").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
  createdAt: true,
  status: true,
  unsubscribeToken: true,
});

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  subject: text("subject").notNull(),
  htmlContent: text("html_content").notNull(),
  status: text("status").notNull().default("draft"),
  sentAt: timestamp("sent_at"),
  recipientCount: integer("recipient_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNewsletterSchema = createInsertSchema(newsletters).omit({
  id: true,
  createdAt: true,
  status: true,
  sentAt: true,
  recipientCount: true,
});

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;

export const aiJobs = pgTable("ai_jobs", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  input: text("input").notNull(),
  output: text("output"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AiJob = typeof aiJobs.$inferSelect;

export const backlinks = pgTable("backlinks", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  utmSource: text("utm_source").notNull(),
  utmMedium: text("utm_medium").notNull().default("referral"),
  utmCampaign: text("utm_campaign").notNull(),
  shortCode: text("short_code").notNull().unique(),
  clicks: integer("clicks").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Backlink = typeof backlinks.$inferSelect;

export const backlinkClicks = pgTable("backlink_clicks", {
  id: serial("id").primaryKey(),
  backlinkId: integer("backlink_id").notNull().references(() => backlinks.id, { onDelete: "cascade" }),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  clickedAt: timestamp("clicked_at").defaultNow().notNull(),
});

export type BacklinkClick = typeof backlinkClicks.$inferSelect;

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
