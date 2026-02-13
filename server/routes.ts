import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, leadStatuses } from "@shared/schema";
import { z } from "zod";
import { authMiddleware, requireRole, hashPassword, verifyPassword, createSession, destroySession } from "./auth";
import crypto from "crypto";
import OpenAI from "openai";
import { getResendClient } from "./resend";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 100);
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ─── Auth Routes ───────────────────────────────────────────────

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const valid = await verifyPassword(password, user.passwordHash);
      if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      await createSession(res, user.id);
      res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
    } catch {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    await destroySession(req, res);
    res.json({ message: "Logged out" });
  });

  app.get("/api/auth/me", authMiddleware, (req, res) => {
    const u = req.user!;
    res.json({ id: u.id, name: u.name, email: u.email, role: u.role });
  });

  // ─── User Management (root only) ──────────────────────────────

  app.get("/api/users", authMiddleware, requireRole("root"), async (_req, res) => {
    try {
      const users = await storage.getUsers();
      res.json(users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, createdAt: u.createdAt })));
    } catch {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.post("/api/users", authMiddleware, requireRole("root"), async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password required" });
      }
      const existing = await storage.getUserByEmail(email);
      if (existing) {
        return res.status(409).json({ message: "Email already in use" });
      }
      const passwordHash = await hashPassword(password);
      const user = await storage.createUser({ name, email, role: role || "editor", passwordHash });
      res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
    } catch {
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.delete("/api/users/:id", authMiddleware, requireRole("root"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (req.user!.id === id) {
        return res.status(400).json({ message: "Cannot delete yourself" });
      }
      await storage.deleteUser(id);
      res.json({ message: "User deleted" });
    } catch {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  // ─── Lead Routes ───────────────────────────────────────────────

  app.post("/api/leads", async (req, res) => {
    try {
      const data = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(data);
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create lead" });
      }
    }
  });

  app.get("/api/leads", authMiddleware, requireRole("root", "admin"), async (_req, res) => {
    try {
      const allLeads = await storage.getLeads();
      res.json(allLeads);
    } catch {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  app.get("/api/leads/:id", authMiddleware, requireRole("root", "admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const lead = await storage.getLead(id);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json(lead);
    } catch {
      res.status(500).json({ message: "Failed to fetch lead" });
    }
  });

  app.patch("/api/leads/:id", authMiddleware, requireRole("root", "admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates: Record<string, any> = {};

      if (req.body.status) {
        if (!leadStatuses.includes(req.body.status)) {
          return res.status(400).json({ message: "Invalid status" });
        }
        updates.status = req.body.status;
      }

      if (typeof req.body.loanerRequested === "boolean") {
        updates.loanerRequested = req.body.loanerRequested;
      }
      if (typeof req.body.pickupRequested === "boolean") {
        updates.pickupRequested = req.body.pickupRequested;
      }
      if (typeof req.body.insuranceApproved === "boolean") {
        updates.insuranceApproved = req.body.insuranceApproved;
        if (req.body.insuranceApproved) {
          updates.insuranceApprovalTimestamp = new Date();
        }
      }

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No valid fields to update" });
      }

      const lead = await storage.updateLead(id, updates);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json(lead);
    } catch {
      res.status(500).json({ message: "Failed to update lead" });
    }
  });

  // ─── Blog Post Routes ─────────────────────────────────────────

  app.get("/api/posts", async (req, res) => {
    try {
      const status = req.query.status as string | undefined;
      const allPosts = await storage.getPosts(status);
      res.json(allPosts);
    } catch {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/:idOrSlug", async (req, res) => {
    try {
      const param = req.params.idOrSlug;
      const id = parseInt(param);
      const post = isNaN(id) ? await storage.getPostBySlug(param) : await storage.getPostById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  app.post("/api/posts", authMiddleware, requireRole("root", "admin", "editor"), async (req, res) => {
    try {
      const { title, content, excerpt, tags, seoTitle, seoDescription, status, featuredImage } = req.body;
      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }
      let slug = slugify(title);
      const existing = await storage.getPostBySlug(slug);
      if (existing) {
        slug = slug + "-" + Date.now().toString(36);
      }
      const post = await storage.createPost({
        title,
        slug,
        content: content || "",
        excerpt: excerpt || null,
        tags: tags || [],
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        status: status || "draft",
        featuredImage: featuredImage || null,
        publishedAt: status === "published" ? new Date() : null,
        authorId: req.user!.id,
      });
      res.status(201).json(post);
    } catch {
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  app.patch("/api/posts/:id", authMiddleware, requireRole("root", "admin", "editor"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates: Record<string, any> = {};
      const fields = ["title", "content", "excerpt", "tags", "seoTitle", "seoDescription", "status", "featuredImage"];
      for (const f of fields) {
        if (req.body[f] !== undefined) updates[f] = req.body[f];
      }
      if (updates.status === "published") {
        const existing = await storage.getPostById(id);
        if (existing && !existing.publishedAt) {
          updates.publishedAt = new Date();
        }
      }
      if (updates.title) {
        updates.slug = slugify(updates.title);
        const existing = await storage.getPostBySlug(updates.slug);
        if (existing && existing.id !== id) {
          updates.slug = updates.slug + "-" + Date.now().toString(36);
        }
      }
      const post = await storage.updatePost(id, updates);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch {
      res.status(500).json({ message: "Failed to update post" });
    }
  });

  app.delete("/api/posts/:id", authMiddleware, requireRole("root", "admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deletePost(id);
      res.json({ message: "Post deleted" });
    } catch {
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  // ─── AI Article Generation ────────────────────────────────────

  app.post("/api/ai/generate-article", authMiddleware, requireRole("root", "admin", "editor"), async (req, res) => {
    try {
      const { topic, keywords, tone } = req.body;
      if (!topic) {
        return res.status(400).json({ message: "Topic is required" });
      }

      const job = await storage.createAiJob({
        type: "article",
        input: JSON.stringify({ topic, keywords, tone }),
      });

      const systemPrompt = `You are an expert automotive content writer for Dent Society, a precision hail damage repair company in Dallas, TX. Write authoritative, professional blog articles about paintless dent repair, hail damage, insurance claims, and storm damage restoration.

Rules:
- Write in a controlled, confident tone. No exclamation points. No sales hype.
- Use substantive, factual content. Include specific details about PDR techniques, insurance processes, and storm damage.
- Target Dallas-Fort Worth market when relevant.
- Structure with H2 and H3 headings using markdown.
- Include a compelling excerpt (2 sentences max).
- Suggest 3-5 relevant tags.
- Suggest an SEO title (60 chars max) and meta description (155 chars max).
- Minimum 800 words of article content.`;

      const userPrompt = `Write a blog article about: ${topic}${keywords ? `\nTarget keywords: ${keywords}` : ""}${tone ? `\nTone: ${tone}` : ""}

Respond in this exact JSON format:
{
  "title": "Article Title",
  "excerpt": "Brief 1-2 sentence excerpt",
  "content": "Full article content in markdown",
  "tags": ["tag1", "tag2"],
  "seoTitle": "SEO Title",
  "seoDescription": "Meta description"
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-5.2",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 4096,
      });

      const raw = response.choices[0]?.message?.content || "{}";
      let article;
      try {
        article = JSON.parse(raw);
      } catch {
        article = { title: topic, content: raw, excerpt: "", tags: [], seoTitle: "", seoDescription: "" };
      }

      await storage.updateAiJob(job.id, { output: raw, status: "completed" });

      const slug = slugify(article.title || topic);
      const existingSlug = await storage.getPostBySlug(slug);
      const finalSlug = existingSlug ? slug + "-" + Date.now().toString(36) : slug;

      const post = await storage.createPost({
        title: article.title || topic,
        slug: finalSlug,
        content: article.content || "",
        excerpt: article.excerpt || null,
        tags: article.tags || [],
        seoTitle: article.seoTitle || null,
        seoDescription: article.seoDescription || null,
        status: "draft",
        featuredImage: null,
        publishedAt: null,
        authorId: req.user!.id,
      });

      res.json({ post, job });
    } catch (error: any) {
      console.error("AI generation error:", error);
      res.status(500).json({ message: "Failed to generate article", error: error?.message });
    }
  });

  app.get("/api/ai/jobs", authMiddleware, requireRole("root", "admin"), async (_req, res) => {
    try {
      const jobs = await storage.getAiJobs();
      res.json(jobs);
    } catch {
      res.status(500).json({ message: "Failed to fetch AI jobs" });
    }
  });

  // ─── Newsletter Subscriber Routes ─────────────────────────────

  app.post("/api/subscribers", async (req, res) => {
    try {
      const { name, email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const existing = await storage.getSubscriberByEmail(email);
      if (existing) {
        if (existing.status === "unsubscribed") {
          await storage.updateSubscriber(existing.id, { status: "active" });
          return res.json({ message: "Re-subscribed" });
        }
        return res.json({ message: "Already subscribed" });
      }
      const unsubscribeToken = crypto.randomBytes(32).toString("hex");
      await storage.createSubscriber({ name: name || null, email, unsubscribeToken });
      res.status(201).json({ message: "Subscribed" });
    } catch {
      res.status(500).json({ message: "Failed to subscribe" });
    }
  });

  app.get("/api/subscribers", authMiddleware, requireRole("root", "admin"), async (req, res) => {
    try {
      const status = req.query.status as string | undefined;
      const subs = await storage.getSubscribers(status);
      res.json(subs);
    } catch {
      res.status(500).json({ message: "Failed to fetch subscribers" });
    }
  });

  app.delete("/api/subscribers/:id", authMiddleware, requireRole("root", "admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSubscriber(id);
      res.json({ message: "Subscriber deleted" });
    } catch {
      res.status(500).json({ message: "Failed to delete subscriber" });
    }
  });

  app.get("/api/unsubscribe/:token", async (req, res) => {
    try {
      const sub = await storage.getSubscriberByToken(req.params.token);
      if (!sub) {
        return res.status(404).json({ message: "Subscriber not found" });
      }
      await storage.updateSubscriber(sub.id, { status: "unsubscribed" });
      res.json({ message: "Unsubscribed successfully" });
    } catch {
      res.status(500).json({ message: "Failed to unsubscribe" });
    }
  });

  // ─── Newsletter Routes ────────────────────────────────────────

  app.get("/api/newsletters", authMiddleware, requireRole("root", "admin"), async (_req, res) => {
    try {
      const newsletters = await storage.getNewsletters();
      res.json(newsletters);
    } catch {
      res.status(500).json({ message: "Failed to fetch newsletters" });
    }
  });

  app.post("/api/newsletters", authMiddleware, requireRole("root", "admin"), async (req, res) => {
    try {
      const { subject, htmlContent } = req.body;
      if (!subject || !htmlContent) {
        return res.status(400).json({ message: "Subject and content required" });
      }
      const newsletter = await storage.createNewsletter({ subject, htmlContent });
      res.status(201).json(newsletter);
    } catch {
      res.status(500).json({ message: "Failed to create newsletter" });
    }
  });

  app.post("/api/newsletters/:id/send", authMiddleware, requireRole("root", "admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const newsletter = await storage.getNewsletterById(id);
      if (!newsletter) {
        return res.status(404).json({ message: "Newsletter not found" });
      }
      if (newsletter.status === "sent") {
        return res.status(400).json({ message: "Newsletter already sent" });
      }

      const activeSubscribers = await storage.getSubscribers("active");
      if (activeSubscribers.length === 0) {
        return res.status(400).json({ message: "No active subscribers" });
      }

      let sent = 0;
      try {
        const { client, fromEmail } = await getResendClient();
        for (const sub of activeSubscribers) {
          try {
            await client.emails.send({
              from: fromEmail,
              to: sub.email,
              subject: newsletter.subject,
              html: newsletter.htmlContent +
                `<p style="font-size:12px;color:#999;margin-top:40px;"><a href="${process.env.REPLIT_DEV_DOMAIN ? 'https://' + process.env.REPLIT_DEV_DOMAIN : ''}/api/unsubscribe/${sub.unsubscribeToken}">Unsubscribe</a></p>`,
            });
            sent++;
          } catch (e) {
            console.error(`Failed to send to ${sub.email}:`, e);
          }
        }
      } catch (e) {
        console.error("Resend client error:", e);
        return res.status(500).json({ message: "Email service unavailable" });
      }

      await storage.updateNewsletter(id, {
        status: "sent",
        sentAt: new Date(),
        recipientCount: sent,
      });

      res.json({ message: `Newsletter sent to ${sent} subscribers`, sent });
    } catch {
      res.status(500).json({ message: "Failed to send newsletter" });
    }
  });

  // ─── Dashboard Stats ──────────────────────────────────────────

  app.get("/api/stats", authMiddleware, requireRole("root", "admin"), async (_req, res) => {
    try {
      const [allLeads, allPosts, allSubscribers, allNewsletters] = await Promise.all([
        storage.getLeads(),
        storage.getPosts(),
        storage.getSubscribers(),
        storage.getNewsletters(),
      ]);

      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      res.json({
        leads: {
          total: allLeads.length,
          new: allLeads.filter(l => l.status === "New Lead").length,
          recent: allLeads.filter(l => l.createdAt > thirtyDaysAgo).length,
          closed: allLeads.filter(l => l.status === "Closed" || l.status === "Delivered").length,
        },
        posts: {
          total: allPosts.length,
          published: allPosts.filter(p => p.status === "published").length,
          drafts: allPosts.filter(p => p.status === "draft").length,
        },
        subscribers: {
          total: allSubscribers.length,
          active: allSubscribers.filter(s => s.status === "active").length,
        },
        newsletters: {
          total: allNewsletters.length,
          sent: allNewsletters.filter(n => n.status === "sent").length,
        },
      });
    } catch {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  return httpServer;
}
