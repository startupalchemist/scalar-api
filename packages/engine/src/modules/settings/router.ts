import { Router } from "express";
import type { RatingsRepository } from "../../repositories";
import type { AuthMiddleware, RoleMiddlewareFactory } from "../../http";

export interface SettingsRouteDependencies {
  repository: RatingsRepository;
  authMiddleware: AuthMiddleware;
  requireRole: RoleMiddlewareFactory;
}

function isBlogServicesJson(value: string) {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    return false;
  }

  return Array.isArray(parsed) && parsed.every((item) => {
    if (typeof item !== "object" || item === null) {
      return false;
    }
    const entry = item as Record<string, unknown>;
    if (typeof entry.title !== "string") {
      return false;
    }
    return entry.description === undefined || typeof entry.description === "string";
  });
}

export function createSettingsRouter(deps: SettingsRouteDependencies) {
  const router = Router();

  router.get("/api/settings/blog-services", deps.authMiddleware, deps.requireRole("root", "admin"), async (_req, res) => {
    try {
      const value = await deps.repository.getSetting("blog_services");
      res.json({ key: "blog_services", value: value ?? null });
    } catch {
      res.status(500).json({ message: "Failed to fetch blog services" });
    }
  });

  router.put("/api/settings/blog-services", deps.authMiddleware, deps.requireRole("root", "admin"), async (req, res) => {
    try {
      const { value } = req.body;
      if (typeof value !== "string") {
        return res.status(400).json({ message: "Value must be a string" });
      }
      if (!isBlogServicesJson(value)) {
        return res.status(400).json({ message: "Value must be a JSON array of service objects" });
      }

      await deps.repository.setSetting("blog_services", value);
      res.json({ key: "blog_services", value });
    } catch {
      res.status(500).json({ message: "Failed to update blog services" });
    }
  });

  router.get("/api/settings/:key", deps.authMiddleware, deps.requireRole("root", "admin"), async (req, res) => {
    try {
      const key = String(req.params.key);
      const value = await deps.repository.getSetting(key);
      res.json({ key, value: value ?? null });
    } catch {
      res.status(500).json({ message: "Failed to fetch setting" });
    }
  });

  router.put("/api/settings/:key", deps.authMiddleware, deps.requireRole("root", "admin"), async (req, res) => {
    try {
      const key = String(req.params.key);
      const { value } = req.body;
      if (typeof value !== "string") {
        return res.status(400).json({ message: "Value must be a string" });
      }

      await deps.repository.setSetting(key, value);
      res.json({ key, value });
    } catch {
      res.status(500).json({ message: "Failed to update setting" });
    }
  });

  return router;
}
