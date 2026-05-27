import { Router } from "express";
import type { AuthRepository } from "../../repositories";
import type {
  PasswordHasher,
  PasswordVerifier,
  SessionCreator,
  SessionDestroyer,
  AuthMiddleware,
  RoleMiddlewareFactory,
  PlatformRequest,
} from "../../http";
import { toPlatformRequestUser } from "../../http";

export interface AuthRouteDependencies {
  repository: AuthRepository;
  verifyPassword: PasswordVerifier;
  hashPassword: PasswordHasher;
  createSession: SessionCreator;
  destroySession: SessionDestroyer;
  authMiddleware: AuthMiddleware;
  requireRole: RoleMiddlewareFactory;
}

export function createAuthRouter(deps: AuthRouteDependencies) {
  const router = Router();

  router.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }

      const user = await deps.repository.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const valid = await deps.verifyPassword(password, user.passwordHash);
      if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      await deps.createSession(res, user.id);
      res.json(toPlatformRequestUser(user));
    } catch {
      res.status(500).json({ message: "Login failed" });
    }
  });

  router.post("/api/auth/logout", async (req, res) => {
    await deps.destroySession(req, res);
    res.json({ message: "Logged out" });
  });

  router.get("/api/auth/me", deps.authMiddleware, (req: PlatformRequest, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json(req.user);
  });

  router.get("/api/users", deps.authMiddleware, deps.requireRole("root", "admin"), async (_req, res) => {
    try {
      const users = await deps.repository.getUsers();
      res.json(users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      })));
    } catch {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  router.post("/api/users", deps.authMiddleware, deps.requireRole("root", "admin"), async (req: PlatformRequest, res) => {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password required" });
      }
      if (role === "root" && req.user?.role !== "root") {
        return res.status(403).json({ message: "Only the webmaster can create root users" });
      }

      const existing = await deps.repository.getUserByEmail(email);
      if (existing) {
        return res.status(409).json({ message: "Email already in use" });
      }

      const passwordHash = await deps.hashPassword(password);
      const user = await deps.repository.createUser({
        name,
        email,
        role: role || "editor",
        passwordHash,
      });

      res.status(201).json(toPlatformRequestUser(user));
    } catch {
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  router.patch("/api/users/:id", deps.authMiddleware, deps.requireRole("root", "admin"), async (req: PlatformRequest, res) => {
    try {
      const id = parseInt(String(req.params.id), 10);
      const target = await deps.repository.getUserById(id);
      if (!target) {
        return res.status(404).json({ message: "User not found" });
      }
      if (target.role === "root" && req.user?.role !== "root") {
        return res.status(403).json({ message: "Cannot modify webmaster account" });
      }
      if (req.body.role === "root" && req.user?.role !== "root") {
        return res.status(403).json({ message: "Only the webmaster can assign root role" });
      }

      const updates: Record<string, unknown> = {};
      if (req.body.role) updates.role = req.body.role;
      if (req.body.name) updates.name = req.body.name;

      const user = await deps.repository.updateUser(id, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(toPlatformRequestUser(user));
    } catch {
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  router.delete("/api/users/:id", deps.authMiddleware, deps.requireRole("root", "admin"), async (req: PlatformRequest, res) => {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (req.user?.id === id) {
        return res.status(400).json({ message: "Cannot delete yourself" });
      }

      const target = await deps.repository.getUserById(id);
      if (!target) {
        return res.status(404).json({ message: "User not found" });
      }
      if (target.role === "root" && req.user?.role !== "root") {
        return res.status(403).json({ message: "Cannot delete webmaster account" });
      }

      await deps.repository.deleteUser(id);
      res.json({ message: "User deleted" });
    } catch {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  return router;
}
