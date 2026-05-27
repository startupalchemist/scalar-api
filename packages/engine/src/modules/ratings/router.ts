import { Router } from "express";
import type { RatingsRepository } from "../../repositories";
import type { AuthMiddleware, RoleMiddlewareFactory } from "../../http";

export interface RatingsRouteDependencies {
  repository: RatingsRepository;
  authMiddleware: AuthMiddleware;
  requireRole: RoleMiddlewareFactory;
}

export function createRatingsRouter(deps: RatingsRouteDependencies) {
  const router = Router();

  router.get("/api/rate/:token", async (req, res) => {
    try {
      const token = String(req.params.token);
      const score = parseInt(String(req.query.score), 10);
      const leadId = req.query.leadId ? parseInt(String(req.query.leadId), 10) : null;
      const channel = typeof req.query.channel === "string" ? req.query.channel : "email";

      if (Number.isNaN(score) || score < 1 || score > 5) {
        return res.status(400).json({ message: "Invalid score" });
      }

      const existing = await deps.repository.getRatingByToken(token);
      if (existing) {
        return res.redirect(`/rate/${token}?done=1`);
      }

      await deps.repository.createRating({
        leadId: leadId !== null && Number.isNaN(leadId) ? null : leadId,
        score,
        token,
        channel,
      });

      res.redirect(`/rate/${token}?done=1&score=${score}`);
    } catch {
      res.status(500).json({ message: "Failed to submit rating" });
    }
  });

  router.get("/api/ratings", deps.authMiddleware, deps.requireRole("root", "admin"), async (_req, res) => {
    try {
      res.json(await deps.repository.getAllRatings());
    } catch {
      res.status(500).json({ message: "Failed to fetch ratings" });
    }
  });

  router.get("/api/ratings/summary", deps.authMiddleware, deps.requireRole("root", "admin"), async (_req, res) => {
    try {
      const allRatings = await deps.repository.getAllRatings();
      const total = allRatings.length;
      const average = total > 0
        ? allRatings.reduce((sum, rating) => sum + rating.score, 0) / total
        : 0;

      res.json({
        total,
        average: Math.round(average * 10) / 10,
        distribution: [1, 2, 3, 4, 5].map((score) => ({
          score,
          count: allRatings.filter((rating) => rating.score === score).length,
        })),
      });
    } catch {
      res.status(500).json({ message: "Failed to fetch rating summary" });
    }
  });

  return router;
}
