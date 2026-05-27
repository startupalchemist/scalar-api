import type { CreateUserInput, SessionRecord, UserRecord } from "../schema";

export interface AuthRepository {
  createUser(input: CreateUserInput): Promise<UserRecord>;
  getUserByEmail(email: string): Promise<UserRecord | undefined>;
  getUserById(id: number): Promise<UserRecord | undefined>;
  getUsers(): Promise<UserRecord[]>;
  updateUser(id: number, updates: Partial<UserRecord>): Promise<UserRecord | undefined>;
  deleteUser(id: number): Promise<void>;
  createSession(userId: number, token: string, expiresAt: Date): Promise<SessionRecord>;
  getSessionByToken(token: string): Promise<SessionRecord | undefined>;
  deleteSession(token: string): Promise<void>;
  deleteExpiredSessions(cutoff?: Date): Promise<void>;
}
