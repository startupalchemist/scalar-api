import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import type { AuthRepository, PlatformRequest } from "@platform/engine";

const SESSION_COOKIE = "platform_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

function generateToken(): string {
  return crypto.randomBytes(48).toString("hex");
}

export function createAuthHelpers(repository: AuthRepository) {
  async function createSession(res: Response, userId: number): Promise<void> {
    const token = generateToken();
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

    await repository.createSession(userId, token, expiresAt);

    res.cookie(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION_MS,
      path: "/",
    });
  }

  async function destroySession(req: Request, res: Response): Promise<void> {
    const token = req.cookies?.[SESSION_COOKIE];
    if (token) {
      await repository.deleteSession(token);
    }
    res.clearCookie(SESSION_COOKIE, { path: "/" });
  }

  async function authMiddleware(req: PlatformRequest, res: Response, next: NextFunction): Promise<void> {
    const token = req.cookies?.[SESSION_COOKIE];
    if (!token) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const session = await repository.getSessionByToken(token);
    if (!session || session.expiresAt < new Date()) {
      res.clearCookie(SESSION_COOKIE, { path: "/" });
      res.status(401).json({ message: "Session expired" });
      return;
    }

    const user = await repository.getUserById(session.userId);
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    next();
  }

  function requireRole(...roles: string[]) {
    return (req: PlatformRequest, res: Response, next: NextFunction): void => {
      if (!req.user) {
        res.status(401).json({ message: "Not authenticated" });
        return;
      }
      if (!roles.includes(req.user.role)) {
        res.status(403).json({ message: "Insufficient permissions" });
        return;
      }
      next();
    };
  }

  return {
    authMiddleware,
    createSession,
    destroySession,
    requireRole,
  };
}
