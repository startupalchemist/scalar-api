import type { CmsContentKind, CmsItemMutationInput } from "@platform/contracts";
import { Router } from "express";
import type { CmsRepository } from "../../repositories";
import type { AuthMiddleware, PlatformRequest, RoleMiddlewareFactory } from "../../http";

export interface CmsRouteDependencies {
  repository: CmsRepository;
  authMiddleware: AuthMiddleware;
  requireRole: RoleMiddlewareFactory;
}

function isCmsKind(value: string): value is CmsContentKind {
  return [
    "post",
    "service",
    "product",
    "art-piece",
    "collection",
    "landing-page",
    "newsletter",
  ].includes(value);
}

export function createCmsRouter(deps: CmsRouteDependencies) {
  const router = Router();

  function ensureKindPermission(req: PlatformRequest, res: { status: (code: number) => { json: (body: unknown) => unknown } }, kind: CmsContentKind) {
    const role = req.user?.role;
    if (!role) {
      res.status(401).json({ message: "Not authenticated" });
      return false;
    }
    if (kind === "service" && !["root", "admin"].includes(role)) {
      res.status(403).json({ message: "Insufficient permissions for service content" });
      return false;
    }
    if (kind === "post" && !["root", "admin", "editor"].includes(role)) {
      res.status(403).json({ message: "Insufficient permissions for post content" });
      return false;
    }
    return true;
  }

  router.get("/api/cms/items", deps.authMiddleware, deps.requireRole("root", "admin", "editor"), async (req, res) => {
    try {
      const kind = typeof req.query.kind === "string" && isCmsKind(req.query.kind)
        ? req.query.kind
        : undefined;
      const status = typeof req.query.status === "string" ? req.query.status : undefined;
      const includeArchived = req.query.includeArchived === "true";

      const items = await deps.repository.listItems({ kind, status, includeArchived });
      res.json(items);
    } catch {
      res.status(500).json({ message: "Failed to fetch CMS items" });
    }
  });

  router.get("/api/cms/items/:kind/:idOrSlug", deps.authMiddleware, deps.requireRole("root", "admin", "editor"), async (req, res) => {
    try {
      const kindParam = String(req.params.kind);
      if (!isCmsKind(kindParam)) {
        return res.status(400).json({ message: "Invalid CMS kind" });
      }

      const idOrSlug = String(req.params.idOrSlug);
      const numericId = parseInt(idOrSlug, 10);
      const item = Number.isNaN(numericId)
        ? await deps.repository.getItemBySlug(kindParam, idOrSlug)
        : await deps.repository.getItemById(kindParam, numericId);

      if (!item) {
        return res.status(404).json({ message: "CMS item not found" });
      }

      res.json(item);
    } catch {
      res.status(500).json({ message: "Failed to fetch CMS item" });
    }
  });

  router.post("/api/cms/items", deps.authMiddleware, deps.requireRole("root", "admin", "editor"), async (req: PlatformRequest, res) => {
    try {
      const input = req.body as CmsItemMutationInput;
      if (!input || !isCmsKind(String(input.kind))) {
        return res.status(400).json({ message: "Invalid CMS kind" });
      }
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      if (!input.title || typeof input.title !== "string") {
        return res.status(400).json({ message: "Title is required" });
      }
      if (!ensureKindPermission(req, res, input.kind)) {
        return;
      }

      const item = await deps.repository.createItem(input, req.user.id);
      res.status(201).json(item);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create CMS item";
      res.status(500).json({ message });
    }
  });

  router.patch("/api/cms/items/:kind/:id", deps.authMiddleware, deps.requireRole("root", "admin", "editor"), async (req: PlatformRequest, res) => {
    try {
      const kind = String(req.params.kind);
      const id = parseInt(String(req.params.id), 10);
      if (!isCmsKind(kind) || Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid CMS item reference" });
      }
      if (!ensureKindPermission(req, res, kind)) {
        return;
      }

      const item = await deps.repository.updateItem(kind, id, req.body as Partial<CmsItemMutationInput>);
      if (!item) {
        return res.status(404).json({ message: "CMS item not found" });
      }
      res.json(item);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update CMS item";
      res.status(500).json({ message });
    }
  });

  router.post("/api/cms/items/:kind/:id/publish", deps.authMiddleware, deps.requireRole("root", "admin", "editor"), async (req: PlatformRequest, res) => {
    try {
      const kind = String(req.params.kind);
      const id = parseInt(String(req.params.id), 10);
      if (!isCmsKind(kind) || Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid CMS item reference" });
      }
      if (!ensureKindPermission(req, res, kind)) {
        return;
      }

      const item = await deps.repository.publishItem(kind, id);
      if (!item) {
        return res.status(404).json({ message: "CMS item not found" });
      }
      res.json(item);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to publish CMS item";
      res.status(500).json({ message });
    }
  });

  router.get("/api/cms/subscribers", deps.authMiddleware, deps.requireRole("root", "admin", "editor"), async (req, res) => {
    try {
      const status = typeof req.query.status === "string" ? req.query.status : undefined;
      const subscribers = await deps.repository.listSubscribers(status);
      res.json(subscribers);
    } catch {
      res.status(500).json({ message: "Failed to fetch subscribers" });
    }
  });

  router.post("/api/cms/subscribers", deps.authMiddleware, deps.requireRole("root", "admin", "editor"), async (req, res) => {
    try {
      const { email, name } = req.body;
      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Email is required" });
      }
      const subscriber = await deps.repository.createSubscriber({
        email,
        name: typeof name === "string" ? name : null,
      });
      res.status(201).json(subscriber);
    } catch {
      res.status(500).json({ message: "Failed to create subscriber" });
    }
  });

  router.post("/api/cms/items/:kind/:id/newsletter-preview", deps.authMiddleware, deps.requireRole("root", "admin", "editor"), async (req: PlatformRequest, res) => {
    try {
      const kind = String(req.params.kind);
      const id = parseInt(String(req.params.id), 10);
      if (!isCmsKind(kind) || Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid CMS item reference" });
      }
      if (!ensureKindPermission(req, res, kind)) {
        return;
      }

      const preview = await deps.repository.buildNewsletterPreview(kind, id);
      if (!preview) {
        return res.status(404).json({ message: "CMS item not found" });
      }
      res.json(preview);
    } catch {
      res.status(500).json({ message: "Failed to build newsletter preview" });
    }
  });

  router.post("/api/cms/items/:kind/:id/newsletter-draft", deps.authMiddleware, deps.requireRole("root", "admin", "editor"), async (req: PlatformRequest, res) => {
    try {
      const kind = String(req.params.kind);
      const id = parseInt(String(req.params.id), 10);
      if (!isCmsKind(kind) || Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid CMS item reference" });
      }
      if (!ensureKindPermission(req, res, kind)) {
        return;
      }

      const result = await deps.repository.createNewsletterDraftFromItem(kind, id);
      if (!result) {
        return res.status(404).json({ message: "CMS item not found" });
      }
      res.status(201).json(result);
    } catch {
      res.status(500).json({ message: "Failed to create newsletter draft" });
    }
  });

  return router;
}
