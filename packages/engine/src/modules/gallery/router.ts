import { Router } from "express";
import type { GalleryRepository } from "../../repositories";
import type { AuthMiddleware, RoleMiddlewareFactory } from "../../http";

export interface GalleryRouteDependencies {
  repository: GalleryRepository;
  authMiddleware: AuthMiddleware;
  requireRole: RoleMiddlewareFactory;
}

export function createGalleryRouter(deps: GalleryRouteDependencies) {
  const router = Router();

  router.get("/api/gallery", async (_req, res) => {
    try {
      res.json(await deps.repository.getPublicGallery());
    } catch {
      res.status(500).json({ message: "Failed to fetch gallery" });
    }
  });

  router.get("/api/gallery/admin", deps.authMiddleware, deps.requireRole("root", "admin"), async (_req, res) => {
    try {
      res.json(await deps.repository.getAdminGallery());
    } catch {
      res.status(500).json({ message: "Failed to fetch admin gallery" });
    }
  });

  router.get("/api/gallery/sections", deps.authMiddleware, deps.requireRole("root", "admin"), async (_req, res) => {
    try {
      res.json(await deps.repository.getGallerySections());
    } catch {
      res.status(500).json({ message: "Failed to fetch gallery sections" });
    }
  });

  router.post("/api/gallery/sections", deps.authMiddleware, deps.requireRole("root", "admin"), async (req, res) => {
    try {
      const { name, serviceSlug, displayOrder, isActive } = req.body;
      if (!name || typeof name !== "string") {
        return res.status(400).json({ message: "Section name is required" });
      }

      const section = await deps.repository.createGallerySection({
        name,
        serviceSlug: typeof serviceSlug === "string" ? serviceSlug : null,
        displayOrder: typeof displayOrder === "number" ? displayOrder : 0,
        isActive: isActive !== false,
      });

      res.status(201).json(section);
    } catch {
      res.status(500).json({ message: "Failed to create gallery section" });
    }
  });

  router.patch("/api/gallery/sections/:id", deps.authMiddleware, deps.requireRole("root", "admin"), async (req, res) => {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }

      const updates: Record<string, unknown> = {};
      if (req.body.name !== undefined) updates.name = req.body.name;
      if (req.body.serviceSlug !== undefined) {
        updates.serviceSlug = typeof req.body.serviceSlug === "string" ? req.body.serviceSlug : null;
      }
      if (typeof req.body.displayOrder === "number") updates.displayOrder = req.body.displayOrder;
      if (typeof req.body.isActive === "boolean") updates.isActive = req.body.isActive;

      const section = await deps.repository.updateGallerySection(id, updates);
      if (!section) {
        return res.status(404).json({ message: "Section not found" });
      }

      res.json(section);
    } catch {
      res.status(500).json({ message: "Failed to update gallery section" });
    }
  });

  router.delete("/api/gallery/sections/:id", deps.authMiddleware, deps.requireRole("root", "admin"), async (req, res) => {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }

      await deps.repository.deleteGallerySection(id);
      res.json({ message: "Section deleted" });
    } catch {
      res.status(500).json({ message: "Failed to delete gallery section" });
    }
  });

  router.post("/api/gallery/items", deps.authMiddleware, deps.requireRole("root", "admin"), async (req, res) => {
    try {
      const { sectionId, src, alt, badge, displayOrder, isActive } = req.body;
      const parsedSectionId = parseInt(String(sectionId), 10);

      if (Number.isNaN(parsedSectionId) || !src || !alt) {
        return res.status(400).json({ message: "sectionId, src, and alt are required" });
      }

      const item = await deps.repository.createGalleryItem({
        sectionId: parsedSectionId,
        src,
        alt,
        badge: typeof badge === "string" ? badge : null,
        displayOrder: typeof displayOrder === "number" ? displayOrder : 0,
        isActive: isActive !== false,
      });

      res.status(201).json(item);
    } catch {
      res.status(500).json({ message: "Failed to create gallery item" });
    }
  });

  router.patch("/api/gallery/items/:id", deps.authMiddleware, deps.requireRole("root", "admin"), async (req, res) => {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }

      const updates: Record<string, unknown> = {};
      if (req.body.src !== undefined) updates.src = req.body.src;
      if (req.body.alt !== undefined) updates.alt = req.body.alt;
      if (req.body.badge !== undefined) updates.badge = req.body.badge || null;
      if (typeof req.body.displayOrder === "number") updates.displayOrder = req.body.displayOrder;
      if (typeof req.body.isActive === "boolean") updates.isActive = req.body.isActive;
      if (req.body.sectionId !== undefined) {
        const parsedSectionId = parseInt(String(req.body.sectionId), 10);
        if (Number.isNaN(parsedSectionId)) {
          return res.status(400).json({ message: "Invalid sectionId" });
        }
        updates.sectionId = parsedSectionId;
      }

      const item = await deps.repository.updateGalleryItem(id, updates);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      res.json(item);
    } catch {
      res.status(500).json({ message: "Failed to update gallery item" });
    }
  });

  router.delete("/api/gallery/items/:id", deps.authMiddleware, deps.requireRole("root", "admin"), async (req, res) => {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }

      await deps.repository.deleteGalleryItem(id);
      res.json({ message: "Item deleted" });
    } catch {
      res.status(500).json({ message: "Failed to delete gallery item" });
    }
  });

  return router;
}
