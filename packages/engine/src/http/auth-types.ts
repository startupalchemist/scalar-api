import type { Request, Response } from "express";
import type { UserRecord } from "../schema";

export interface PlatformRequestUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface PlatformRequest extends Request {
  user?: PlatformRequestUser;
}

export type SessionCreator = (res: Response, userId: number) => Promise<void>;
export type SessionDestroyer = (req: Request, res: Response) => Promise<void>;
export type PasswordHasher = (password: string) => Promise<string>;
export type PasswordVerifier = (password: string, hash: string) => Promise<boolean>;
export type AuthMiddleware = (req: PlatformRequest, res: Response, next: () => void) => void | Promise<void>;
export type RoleMiddlewareFactory = (...roles: string[]) => (req: PlatformRequest, res: Response, next: () => void) => void;

export function toPlatformRequestUser(user: UserRecord): PlatformRequestUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
