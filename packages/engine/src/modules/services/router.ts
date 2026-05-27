import { Router } from "express";
import { z } from "zod";
import type { ServicesRepository } from "../../repositories";
import type { AuthMiddleware, RoleMiddlewareFactory } from "../../http";

export interface ServicesRouteDependencies {
  repository: ServicesRepository;
  authMiddleware: AuthMiddleware;
  requireRole: RoleMiddlewareFactory;
}

const servicePatchSchema = z.object({
  title: z.string().min(1).optional(),
  badge: z.string().optional(),
  header: z.string().optional(),
  description: z.string().optional(),
  keyDetails: z.array(z.string()).optional(),
  icon: z.string().optional(),
  slug: z.string().optional(),
  accentColor: z.string().optional(),
  showPrice: z.boolean().optional(),
  price: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export function createServicesRouter(deps: ServicesRouteDependencies) {
  const router = Router();

  router.get("/api/services/public", async (_req, res) => {
    try {
      const all = await deps.repository.getServices();
      res.json(all.filter((service) => service.isActive).sort((a, b) => a.displayOrder - b.displayOrder));
    } catch {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  router.get("/api/services/by-slug/:slug", async (req, res) => {
    try {
      const slug = `/${req.params.slug}`;
      const all = await deps.repository.getServices();
      const service = all.find((entry) => entry.isActive && entry.slug === slug);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  router.get("/api/services", deps.authMiddleware, deps.requireRole("root", "admin"), async (_req, res) => {
    try {
      res.json(await deps.repository.getServices());
    } catch {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  router.post("/api/services", deps.authMiddleware, deps.requireRole("root", "admin"), async (req, res) => {
    try {
      const { title } = req.body;
      if (!title || typeof title !== "string" || !title.trim()) {
        return res.status(400).json({ message: "Title is required" });
      }

      const all = await deps.repository.getServices();
      const maxOrder = all.length > 0 ? Math.max(...all.map((service) => service.displayOrder)) : -1;
      const service = await deps.repository.createService({
        title: title.trim(),
        badge: "",
        header: "",
        description: "",
        keyDetails: [],
        showPrice: false,
        price: null,
        isActive: true,
        displayOrder: maxOrder + 1,
      });
      res.status(201).json(service);
    } catch {
      res.status(500).json({ message: "Failed to create service" });
    }
  });

  router.patch("/api/services/:id", deps.authMiddleware, deps.requireRole("root", "admin"), async (req, res) => {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }

      const parsed = servicePatchSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid fields", errors: parsed.error.issues });
      }

      const updates = parsed.data as Record<string, unknown>;
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No valid fields to update" });
      }

      const service = await deps.repository.updateService(id, updates);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch {
      res.status(500).json({ message: "Failed to update service" });
    }
  });

  router.delete("/api/services/:id", deps.authMiddleware, deps.requireRole("root", "admin"), async (req, res) => {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }

      const existing = await deps.repository.getServiceById(id);
      if (!existing) {
        return res.status(404).json({ message: "Service not found" });
      }

      await deps.repository.deleteService(id);
      res.json({ message: "Service deleted" });
    } catch {
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  return router;
}
