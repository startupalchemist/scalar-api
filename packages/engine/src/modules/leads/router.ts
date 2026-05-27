import { Router } from "express";
import type { LeadsRepository } from "../../repositories";
import type { AuthMiddleware, PlatformRequest, RoleMiddlewareFactory } from "../../http";

export interface LeadUpdateHooks {
  onLeadCreated?: (payload: Record<string, unknown>) => Promise<void> | void;
  onLeadUpdated?: (payload: Record<string, unknown>) => Promise<void> | void;
  onDelivered?: (lead: { id: number; name: string; email: string }) => Promise<void> | void;
}

export interface LeadsRouteDependencies {
  repository: LeadsRepository;
  authMiddleware: AuthMiddleware;
  requireRole: RoleMiddlewareFactory;
  leadStatuses: readonly string[];
  hooks?: LeadUpdateHooks;
}

export function createLeadsRouter(deps: LeadsRouteDependencies) {
  const router = Router();

  router.post("/api/leads", async (req, res) => {
    try {
      const lead = await deps.repository.createLead(req.body);
      res.status(201).json(lead);

      await deps.hooks?.onLeadCreated?.({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        vehicle: lead.vehicle,
        insurance: lead.insurance,
        message: lead.message,
        status: lead.status,
        createdAt: lead.createdAt,
      });
    } catch {
      res.status(500).json({ message: "Failed to create lead" });
    }
  });

  router.get("/api/leads", deps.authMiddleware, deps.requireRole("root", "admin"), async (_req, res) => {
    try {
      res.json(await deps.repository.getLeads());
    } catch {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  router.get("/api/leads/:id", deps.authMiddleware, deps.requireRole("root", "admin"), async (req, res) => {
    try {
      const lead = await deps.repository.getLead(parseInt(String(req.params.id), 10));
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json(lead);
    } catch {
      res.status(500).json({ message: "Failed to fetch lead" });
    }
  });

  router.patch("/api/leads/:id", deps.authMiddleware, deps.requireRole("root", "admin"), async (req: PlatformRequest, res) => {
    try {
      const id = parseInt(String(req.params.id), 10);
      const updates: Record<string, unknown> = {};

      if (req.body.status) {
        if (!deps.leadStatuses.includes(req.body.status)) {
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

      const lead = await deps.repository.updateLead(id, updates);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }

      res.json(lead);

      await deps.hooks?.onLeadUpdated?.({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        vehicle: lead.vehicle,
        status: lead.status,
        changes: Object.keys(updates),
      });

      if (updates.status === "Delivered") {
        await deps.hooks?.onDelivered?.({
          id: lead.id,
          name: lead.name,
          email: lead.email,
        });
      }
    } catch {
      res.status(500).json({ message: "Failed to update lead" });
    }
  });

  return router;
}
