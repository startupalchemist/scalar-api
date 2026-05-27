import { Router } from "express";
import type { BlogRepository } from "../../repositories";
import type { AuthMiddleware, PlatformRequest, RoleMiddlewareFactory } from "../../http";

export interface BlogRouteHooks {
  onPostPublished?: (payload: Record<string, unknown>) => Promise<void> | void;
}

export interface BlogRouteDependencies {
  repository: BlogRepository;
  authMiddleware: AuthMiddleware;
  requireRole: RoleMiddlewareFactory;
  hooks?: BlogRouteHooks;
}

const postPatchFields = [
  "title",
  "content",
  "excerpt",
  "tags",
  "seoTitle",
  "seoDescription",
  "seoKeywords",
  "status",
  "featuredImage",
] as const;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function createBlogRouter(deps: BlogRouteDependencies) {
  const router = Router();

  router.get("/api/posts/queue", deps.authMiddleware, deps.requireRole("root", "admin", "editor"), async (_req, res) => {
    try {
      res.json(await deps.repository.getPosts("queued"));
    } catch {
      res.status(500).json({ message: "Failed to fetch queue" });
    }
  });

  router.get("/api/posts", async (req, res) => {
    try {
      const status = typeof req.query.status === "string" ? req.query.status : undefined;
      res.json(await deps.repository.getPosts(status));
    } catch {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  router.get("/api/posts/:idOrSlug", async (req, res) => {
    try {
      const param = String(req.params.idOrSlug);
      const id = parseInt(param, 10);
      const post = Number.isNaN(id)
        ? await deps.repository.getPostBySlug(param)
        : await deps.repository.getPostById(id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  router.post("/api/posts", deps.authMiddleware, deps.requireRole("root", "admin", "editor"), async (req: PlatformRequest, res) => {
    try {
      const { title, content, excerpt, tags, seoTitle, seoDescription, seoKeywords, status, featuredImage } = req.body;
      if (!title || typeof title !== "string") {
        return res.status(400).json({ message: "Title is required" });
      }
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      let slug = slugify(title);
      if (!slug) {
        return res.status(400).json({ message: "Title must contain alphanumeric characters" });
      }

      const existing = await deps.repository.getPostBySlug(slug);
      if (existing) {
        slug = `${slug}-${Date.now().toString(36)}`;
      }

      const normalizedStatus = typeof status === "string" ? status : "draft";
      const post = await deps.repository.createPost({
        title,
        slug,
        content: typeof content === "string" ? content : "",
        excerpt: typeof excerpt === "string" ? excerpt : null,
        tags: Array.isArray(tags) ? tags.filter((tag): tag is string => typeof tag === "string") : [],
        seoTitle: typeof seoTitle === "string" ? seoTitle : null,
        seoDescription: typeof seoDescription === "string" ? seoDescription : null,
        seoKeywords: Array.isArray(seoKeywords) ? seoKeywords.filter((tag): tag is string => typeof tag === "string") : [],
        status: normalizedStatus,
        featuredImage: typeof featuredImage === "string" ? featuredImage : null,
        publishedAt: normalizedStatus === "published" ? new Date() : null,
        authorId: req.user.id,
      });

      res.status(201).json(post);
    } catch {
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  router.patch("/api/posts/:id", deps.authMiddleware, deps.requireRole("root", "admin", "editor"), async (req, res) => {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      const updates: Record<string, unknown> = {};
      for (const field of postPatchFields) {
        if (req.body[field] !== undefined) {
          updates[field] = req.body[field];
        }
      }

      if (updates.status === "published") {
        const existing = await deps.repository.getPostById(id);
        if (existing && !existing.publishedAt) {
          updates.publishedAt = new Date();
        }
      }

      if (typeof updates.title === "string") {
        let nextSlug = slugify(updates.title);
        if (!nextSlug) {
          return res.status(400).json({ message: "Title must contain alphanumeric characters" });
        }

        const existing = await deps.repository.getPostBySlug(nextSlug);
        if (existing && existing.id !== id) {
          nextSlug = `${nextSlug}-${Date.now().toString(36)}`;
        }
        updates.slug = nextSlug;
      }

      const post = await deps.repository.updatePost(id, updates);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch {
      res.status(500).json({ message: "Failed to update post" });
    }
  });

  router.delete("/api/posts/purge-all", deps.authMiddleware, deps.requireRole("root"), async (_req, res) => {
    try {
      const [allPosts, allTopics] = await Promise.all([
        deps.repository.getPosts(),
        deps.repository.getTopics(),
      ]);

      for (const post of allPosts) {
        await deps.repository.deletePost(post.id);
      }
      for (const topic of allTopics) {
        await deps.repository.deleteTopic(topic.id);
      }

      res.json({ message: `Deleted ${allPosts.length} posts and ${allTopics.length} associated topics` });
    } catch {
      res.status(500).json({ message: "Failed to purge posts" });
    }
  });

  router.delete("/api/posts/:id", deps.authMiddleware, deps.requireRole("root", "admin"), async (req, res) => {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      await deps.repository.deletePost(id);
      res.json({ message: "Post deleted" });
    } catch {
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  router.post("/api/posts/:id/publish", deps.authMiddleware, deps.requireRole("root", "admin", "editor"), async (req, res) => {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      const post = await deps.repository.getPostById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const publishedAt = new Date();
      const updated = await deps.repository.updatePost(id, {
        status: "published",
        publishedAt,
      });

      if (!updated) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(updated);

      await deps.hooks?.onPostPublished?.({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        tags: post.tags,
        publishedAt: publishedAt.toISOString(),
      });
    } catch {
      res.status(500).json({ message: "Failed to publish post" });
    }
  });

  router.post("/api/posts/:id/read", async (req, res) => {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      await deps.repository.incrementPostReadCount(id);
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Failed to track read" });
    }
  });

  router.post("/api/posts/:id/share", async (req, res) => {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      await deps.repository.incrementPostShareCount(id);
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Failed to track share" });
    }
  });

  return router;
}
