import type { UserRole } from "../core/types";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends AuthUser {}

export interface SessionState {
  authenticated: boolean;
  user: AuthUser | null;
}
