import type { EntityTimestamps, IdentifiedRecord } from "./core";

export interface UserRecord extends IdentifiedRecord, EntityTimestamps {
  name: string;
  email: string;
  passwordHash: string;
  role: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  passwordHash: string;
  role?: string;
}

export interface SessionRecord extends IdentifiedRecord {
  userId: number;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}
