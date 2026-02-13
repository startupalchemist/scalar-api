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

  // ─── User Management (root + admin, with root protection) ───

  app.get("/api/users", authMiddleware, requireRole("root", "admin"), async (_req, res) => {
    try {
      const users = await storage.getUsers();
      res.json(users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, createdAt: u.createdAt })));
    } catch {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.post("/api/users", authMiddleware, requireRole("root", "admin"), async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password required" });
      }
      if (role === "root" && req.user!.role !== "root") {
        return res.status(403).json({ message: "Only the webmaster can create root users" });
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

  app.patch("/api/users/:id", authMiddleware, requireRole("root", "admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const target = await storage.getUserById(id);
      if (!target) {
        return res.status(404).json({ message: "User not found" });
      }
      if (target.role === "root" && req.user!.role !== "root") {
        return res.status(403).json({ message: "Cannot modify webmaster account" });
      }
      if (req.body.role === "root" && req.user!.role !== "root") {
        return res.status(403).json({ message: "Only the webmaster can assign root role" });
      }
      const updates: Record<string, any> = {};
      if (req.body.role) updates.role = req.body.role;
      if (req.body.name) updates.name = req.body.name;

      const user = await storage.updateUser(id, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
    } catch {
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  app.delete("/api/users/:id", authMiddleware, requireRole("root", "admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      if (req.user!.id === id) {
        return res.status(400).json({ message: "Cannot delete yourself" });
      }
      const target = await storage.getUserById(id);
      if (!target) {
        return res.status(404).json({ message: "User not found" });
      }
      if (target.role === "root" && req.user!.role !== "root") {
        return res.status(403).json({ message: "Cannot delete webmaster account" });
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

  app.get("/api/posts/queue", authMiddleware, requireRole("root", "admin", "editor"), async (_req, res) => {
    try {
      const queued = await storage.getPosts("queued");
      res.json(queued);
    } catch {
      res.status(500).json({ message: "Failed to fetch queue" });
    }
  });

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
      const fields = ["title", "content", "excerpt", "tags", "seoTitle", "seoDescription", "seoKeywords", "status", "featuredImage"];
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

  // ─── AI Article Generation (single topic) ──────────────────────

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
        seoKeywords: article.seoKeywords || [],
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

  // ─── Research Agent: 5 Topic Suggestions Only ──────────────────

  app.get("/api/topics", authMiddleware, requireRole("root", "admin", "editor"), async (req, res) => {
    try {
      const status = req.query.status as string | undefined;
      const allTopics = await storage.getTopics(status);
      res.json(allTopics);
    } catch {
      res.status(500).json({ message: "Failed to fetch topics" });
    }
  });

  app.get("/api/topics/:id", authMiddleware, requireRole("root", "admin", "editor"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const topic = await storage.getTopicById(id);
      if (!topic) return res.status(404).json({ message: "Topic not found" });
      res.json(topic);
    } catch {
      res.status(500).json({ message: "Failed to fetch topic" });
    }
  });

  app.post("/api/ai/research", authMiddleware, requireRole("root", "admin", "editor"), async (req, res) => {
    try {
      const job = await storage.createAiJob({
        type: "research",
        input: JSON.stringify({ triggeredBy: req.user!.email }),
      });

      res.json({ jobId: job.id, status: "processing" });

      (async () => {
        try {
          const researchPrompt = `You are an expert SEO strategist and content marketing researcher for Dent Society, a premium paintless dent repair (PDR) and hail damage restoration company in Dallas-Fort Worth, Texas.

Conduct thorough competitive and market research for the PDR and hail damage repair industry. Analyze:
1. What topics competitors are ranking for
2. High-volume, low-competition keywords in the PDR/hail repair space
3. Seasonal search trends (storm season, hail events)
4. Customer pain points and frequently asked questions
5. Local SEO opportunities in Dallas-Fort Worth

Then identify 5 highly effective article topics that will:
- Drive organic search traffic
- Convert readers into leads
- Target different aspects of PDR and hail repair
- Include location-specific angles where relevant
- Cover informational, commercial, and transactional intent

For each topic provide:
- title: compelling headline
- overview: 1-paragraph overview of the article concept (what it covers, angle, unique value)
- targetKeywords: array of 5-8 target keywords/phrases
- searchIntent: "informational" | "commercial" | "transactional"
- estimatedSearchVolume: "high" | "medium" | "low"
- competitionLevel: "high" | "medium" | "low"
- leadPotential: brief explanation of how this drives leads
- reasoning: why this topic was chosen, what search data supports it

Respond in JSON format:
{
  "marketInsights": "Brief summary of competitive landscape and opportunities",
  "topics": [
    {
      "title": "...",
      "overview": "...",
      "targetKeywords": ["..."],
      "searchIntent": "...",
      "estimatedSearchVolume": "...",
      "competitionLevel": "...",
      "leadPotential": "...",
      "reasoning": "..."
    }
  ]
}`;

          const researchResponse = await openai.chat.completions.create({
            model: "gpt-5.2",
            messages: [{ role: "user", content: researchPrompt }],
            response_format: { type: "json_object" },
            max_completion_tokens: 4096,
          });

          const researchRaw = researchResponse.choices[0]?.message?.content || "{}";
          let research;
          try {
            research = JSON.parse(researchRaw);
          } catch {
            research = { marketInsights: "", topics: [] };
          }

          const topicsData = research.topics || [];
          for (const t of topicsData.slice(0, 5)) {
            await storage.createTopic({
              title: t.title,
              overview: t.overview || "",
              targetKeywords: t.targetKeywords || [],
              searchIntent: t.searchIntent || null,
              estimatedSearchVolume: t.estimatedSearchVolume || null,
              competitionLevel: t.competitionLevel || null,
              leadPotential: t.leadPotential || null,
              reasoning: t.reasoning || null,
              aiJobId: job.id,
            });
          }

          await storage.updateAiJob(job.id, {
            output: JSON.stringify({ research, topicCount: topicsData.length }),
            status: "completed",
          });
        } catch (e: any) {
          console.error("Research agent error:", e?.message);
          await storage.updateAiJob(job.id, { output: JSON.stringify({ error: e?.message }), status: "failed" });
        }
      })();
    } catch (error: any) {
      console.error("Research agent error:", error);
      res.status(500).json({ message: "Failed to start research agent", error: error?.message });
    }
  });

  // ─── Writer Agent: Generate Article from Topic ──────────────────

  app.post("/api/topics/:id/generate", authMiddleware, requireRole("root", "admin", "editor"), async (req, res) => {
    try {
      const topicId = parseInt(req.params.id);
      const topic = await storage.getTopicById(topicId);
      if (!topic) return res.status(404).json({ message: "Topic not found" });
      if (topic.status === "generated" || topic.status === "generating") {
        return res.status(400).json({ message: "Article already generated or in progress for this topic" });
      }

      await storage.updateTopic(topicId, { status: "generating" });
      res.json({ status: "generating", topicId });

      (async () => {
        try {
          const articlePrompt = `You are an expert automotive content writer for Dent Society, a precision hail damage repair company in Dallas, TX.

Write a comprehensive, SEO-optimized blog article based on this research:
Topic: ${topic.title}
Overview: ${topic.overview}
Target Keywords: ${(topic.targetKeywords || []).join(", ")}
Search Intent: ${topic.searchIntent || "informational"}

Rules:
- Write in a controlled, confident tone. No exclamation points. No sales hype.
- Naturally incorporate target keywords throughout the content
- Use substantive, factual content with specific details about PDR techniques, insurance processes, and storm damage
- Target Dallas-Fort Worth market when relevant
- Structure with H2 and H3 headings using markdown
- Minimum 1000 words
- Include internal linking suggestions (use placeholder URLs like /services, /contact, /insurance-claim-assistance)
- End with a subtle call-to-action that encourages contacting Dent Society

Respond in JSON format:
{
  "title": "Article Title",
  "excerpt": "2 sentence excerpt for search results",
  "content": "Full markdown article content",
  "tags": ["tag1", "tag2", "tag3"],
  "seoTitle": "SEO page title (60 chars max)",
  "seoDescription": "Meta description (155 chars max)",
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}`;

          const articleResponse = await openai.chat.completions.create({
            model: "gpt-5.2",
            messages: [{ role: "user", content: articlePrompt }],
            response_format: { type: "json_object" },
            max_completion_tokens: 8192,
          });

          const articleRaw = articleResponse.choices[0]?.message?.content || "{}";
          let article;
          try {
            article = JSON.parse(articleRaw);
          } catch {
            article = { title: topic.title, content: articleRaw, excerpt: "", tags: [], seoTitle: "", seoDescription: "", seoKeywords: [] };
          }

          let slug = slugify(article.title || topic.title);
          const existingSlug = await storage.getPostBySlug(slug);
          if (existingSlug) slug = slug + "-" + Date.now().toString(36);

          const post = await storage.createPost({
            title: article.title || topic.title,
            slug,
            content: article.content || "",
            excerpt: article.excerpt || null,
            tags: article.tags || [],
            seoTitle: article.seoTitle || null,
            seoDescription: article.seoDescription || null,
            seoKeywords: article.seoKeywords || [],
            status: "queued",
            featuredImage: null,
            publishedAt: null,
            topicId,
            authorId: req.user!.id,
          });

          await storage.updateTopic(topicId, { status: "generated", postId: post.id });
        } catch (e: any) {
          console.error("Writer agent error:", e?.message);
          await storage.updateTopic(topicId, { status: "suggested" });
        }
      })();
    } catch (error: any) {
      console.error("Writer agent error:", error);
      res.status(500).json({ message: "Failed to generate article from topic" });
    }
  });

  // ─── Archive Topic ──────────────────────────────────────────────

  app.patch("/api/topics/:id/archive", authMiddleware, requireRole("root", "admin", "editor"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const topic = await storage.updateTopic(id, { status: "archived" });
      if (!topic) return res.status(404).json({ message: "Topic not found" });
      res.json(topic);
    } catch {
      res.status(500).json({ message: "Failed to archive topic" });
    }
  });

  app.get("/api/ai/research-jobs", authMiddleware, requireRole("root", "admin", "editor"), async (_req, res) => {
    try {
      const jobs = await storage.getAiJobsByType("research");
      res.json(jobs);
    } catch {
      res.status(500).json({ message: "Failed to fetch research jobs" });
    }
  });

  // ─── Publisher Agent: Publish + SEO + Backlinks + Auto-Newsletter ──

  app.post("/api/posts/:id/publish", authMiddleware, requireRole("root", "admin", "editor"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getPostById(id);
      if (!post) return res.status(404).json({ message: "Post not found" });

      const updated = await storage.updatePost(id, { status: "published", publishedAt: new Date() });
      res.json(updated);

      (async () => {
        try {
          if (!post.seoTitle || !post.seoDescription || !(post.seoKeywords && post.seoKeywords.length > 0)) {
            const seoPrompt = `You are an SEO specialist. Generate optimized SEO metadata for this blog article.

Title: ${post.title}
Excerpt: ${post.excerpt || ""}
Tags: ${(post.tags || []).join(", ")}

Respond in JSON:
{
  "seoTitle": "SEO title (60 chars max)",
  "seoDescription": "Meta description (155 chars max)",
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}`;

            try {
              const seoResponse = await openai.chat.completions.create({
                model: "gpt-5.2",
                messages: [{ role: "user", content: seoPrompt }],
                response_format: { type: "json_object" },
                max_completion_tokens: 512,
              });

              const seoRaw = seoResponse.choices[0]?.message?.content || "{}";
              let seoData;
              try { seoData = JSON.parse(seoRaw); } catch { seoData = {}; }

              const seoUpdates: Record<string, any> = {};
              if (!post.seoTitle && seoData.seoTitle) seoUpdates.seoTitle = seoData.seoTitle;
              if (!post.seoDescription && seoData.seoDescription) seoUpdates.seoDescription = seoData.seoDescription;
              if ((!post.seoKeywords || post.seoKeywords.length === 0) && seoData.seoKeywords) seoUpdates.seoKeywords = seoData.seoKeywords;

              if (Object.keys(seoUpdates).length > 0) {
                await storage.updatePost(id, seoUpdates);
              }
            } catch (e: any) {
              console.error("SEO agent error:", e?.message);
            }
          }

          const baseUrl = process.env.REPLIT_DEV_DOMAIN
            ? `https://${process.env.REPLIT_DEV_DOMAIN}`
            : process.env.REPLIT_DEPLOYMENT_URL
              ? `https://${process.env.REPLIT_DEPLOYMENT_URL}`
              : "";

          const backlinkPlatforms = ["Reddit", "LinkedIn", "Twitter", "Medium", "Hacker News"];
          for (const platform of backlinkPlatforms) {
            try {
              const shortCode = crypto.randomBytes(4).toString("hex");
              const utmSource = platform.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              const utmCampaign = post.slug;
              const articleUrl = `${baseUrl}/blog/${post.slug}?utm_source=${utmSource}&utm_medium=referral&utm_campaign=${utmCampaign}`;

              await storage.createBacklink({
                postId: id,
                platform,
                url: articleUrl,
                utmSource,
                utmMedium: "referral",
                utmCampaign,
                shortCode,
              });
            } catch (e: any) {
              console.error(`Backlink creation error for ${platform}:`, e?.message);
            }
          }

          try {
            const articleLink = `${baseUrl}/blog/${post.slug}`;
            const nlSubject = post.title;
            const nlHtml = `<div style="font-family:Manrope,sans-serif;background:#0B0B0D;color:#F5F5F7;padding:40px 20px;">
<h1 style="font-size:24px;margin-bottom:16px;">${post.title}</h1>
${post.excerpt ? `<p style="color:#B3B3B8;font-size:16px;line-height:1.6;margin-bottom:24px;">${post.excerpt}</p>` : ""}
<a href="${articleLink}" style="display:inline-block;background:#FF192C;color:white;padding:12px 32px;text-decoration:none;font-size:14px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Read Full Article</a>
<p style="color:#B3B3B8;font-size:12px;margin-top:40px;">Dent Society - Precision Restoration Lab</p>
</div>`;

            const newsletter = await storage.createNewsletter({ subject: nlSubject, htmlContent: nlHtml });

            const activeSubscribers = await storage.getSubscribers("active");
            if (activeSubscribers.length > 0) {
              let sent = 0;
              try {
                const { client, fromEmail } = await getResendClient();
                for (const sub of activeSubscribers) {
                  try {
                    await client.emails.send({
                      from: fromEmail,
                      to: sub.email,
                      subject: nlSubject,
                      html: nlHtml +
                        `<p style="font-size:12px;color:#999;margin-top:40px;"><a href="${baseUrl}/api/unsubscribe/${sub.unsubscribeToken}">Unsubscribe</a></p>`,
                    });
                    sent++;
                  } catch (e) {
                    console.error(`Failed to send to ${sub.email}:`, e);
                  }
                }
              } catch (e) {
                console.error("Resend client error:", e);
              }

              await storage.updateNewsletter(newsletter.id, {
                status: "sent",
                sentAt: new Date(),
                recipientCount: sent,
              });
            }
          } catch (e: any) {
            console.error("Auto-newsletter error:", e?.message);
          }
        } catch (e: any) {
          console.error("Publisher agent error:", e?.message);
        }
      })();
    } catch {
      res.status(500).json({ message: "Failed to publish post" });
    }
  });

  // ─── Read/Share Count Tracking ──────────────────────────────────

  app.post("/api/posts/:id/read", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.incrementPostReadCount(id);
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Failed to track read" });
    }
  });

  app.post("/api/posts/:id/share", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.incrementPostShareCount(id);
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Failed to track share" });
    }
  });

  // ─── Backlink Agent ─────────────────────────────────────────────

  app.post("/api/ai/backlink-research", authMiddleware, requireRole("root", "admin"), async (req, res) => {
    try {
      const { postId } = req.body;
      if (!postId) return res.status(400).json({ message: "Post ID required" });

      const post = await storage.getPostById(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });

      const prompt = `You are an expert SEO link building strategist. Analyze this blog article and recommend the 8 most effective platforms/websites to distribute it for maximum backlink value and organic traffic.

Article Title: ${post.title}
Article Topic: ${post.excerpt || post.title}
Tags: ${(post.tags || []).join(", ")}

For each platform, provide:
- platform: name of the platform/website
- type: "social" | "forum" | "directory" | "guest-post" | "aggregator" | "community"
- authority: "high" | "medium" | "low" (domain authority estimate)
- relevance: brief explanation of why this platform is effective for this content
- suggestedAction: what specifically to do on this platform (e.g., "Submit to relevant subreddit", "Share with industry hashtags")

Respond in JSON format:
{
  "platforms": [
    {
      "platform": "...",
      "type": "...",
      "authority": "...",
      "relevance": "...",
      "suggestedAction": "..."
    }
  ]
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-5.2",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_completion_tokens: 2048,
      });

      const raw = response.choices[0]?.message?.content || "{}";
      let result;
      try {
        result = JSON.parse(raw);
      } catch {
        result = { platforms: [] };
      }

      res.json(result);
    } catch (error: any) {
      console.error("Backlink research error:", error);
      res.status(500).json({ message: "Failed to research backlink platforms" });
    }
  });

  app.post("/api/backlinks/generate", authMiddleware, requireRole("root", "admin"), async (req, res) => {
    try {
      const { postId, platform } = req.body;
      if (!postId || !platform) return res.status(400).json({ message: "Post ID and platform required" });

      const post = await storage.getPostById(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });

      const shortCode = crypto.randomBytes(4).toString("hex");
      const utmSource = platform.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const utmCampaign = post.slug;

      const baseUrl = process.env.REPLIT_DEV_DOMAIN
        ? `https://${process.env.REPLIT_DEV_DOMAIN}`
        : process.env.REPLIT_DEPLOYMENT_URL
          ? `https://${process.env.REPLIT_DEPLOYMENT_URL}`
          : "";

      const articleUrl = `${baseUrl}/blog/${post.slug}?utm_source=${utmSource}&utm_medium=referral&utm_campaign=${utmCampaign}`;

      const backlink = await storage.createBacklink({
        postId,
        platform,
        url: articleUrl,
        utmSource,
        utmMedium: "referral",
        utmCampaign,
        shortCode,
      });

      const trackingUrl = `${baseUrl}/r/${shortCode}`;

      res.json({ backlink, trackingUrl, articleUrl });
    } catch (error: any) {
      console.error("Backlink generation error:", error);
      res.status(500).json({ message: "Failed to generate backlink" });
    }
  });

  app.get("/api/backlinks", authMiddleware, requireRole("root", "admin"), async (req, res) => {
    try {
      const postId = req.query.postId ? parseInt(req.query.postId as string) : undefined;
      const links = postId ? await storage.getBacklinksByPostId(postId) : await storage.getAllBacklinks();
      res.json(links);
    } catch {
      res.status(500).json({ message: "Failed to fetch backlinks" });
    }
  });

  app.get("/api/backlinks/analytics", authMiddleware, requireRole("root", "admin"), async (_req, res) => {
    try {
      const analytics = await storage.getBacklinkAnalytics();
      res.json(analytics);
    } catch {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // ─── Backlink Click Tracking Redirect ───────────────────────────

  app.get("/r/:shortCode", async (req, res) => {
    try {
      const backlink = await storage.getBacklinkByShortCode(req.params.shortCode);
      if (!backlink) return res.status(404).send("Not found");

      await storage.incrementBacklinkClicks(backlink.id);
      await storage.createBacklinkClick({
        backlinkId: backlink.id,
        referrer: req.headers.referer || null,
        userAgent: req.headers["user-agent"] || null,
      });

      res.redirect(301, backlink.url);
    } catch {
      res.status(500).send("Error");
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
