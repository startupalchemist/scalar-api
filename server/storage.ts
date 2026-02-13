import {
  leads, users, sessions, posts, subscribers, newsletters, aiJobs,
  type Lead, type InsertLead,
  type User, type InsertUser,
  type Session,
  type Post, type InsertPost,
  type Subscriber, type InsertSubscriber,
  type Newsletter, type InsertNewsletter,
  type AiJob,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLead(id: number): Promise<Lead | undefined>;
  updateLead(id: number, data: Partial<Lead>): Promise<Lead | undefined>;

  createUser(user: InsertUser & { passwordHash: string }): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: number): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
  updateUser(id: number, data: Partial<User>): Promise<User | undefined>;
  deleteUser(id: number): Promise<void>;

  createSession(userId: number, token: string, expiresAt: Date): Promise<Session>;
  getSessionByToken(token: string): Promise<Session | undefined>;
  deleteSession(token: string): Promise<void>;
  deleteExpiredSessions(): Promise<void>;

  createPost(post: InsertPost & { authorId: number }): Promise<Post>;
  getPosts(status?: string): Promise<Post[]>;
  getPostById(id: number): Promise<Post | undefined>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  updatePost(id: number, data: Partial<Post>): Promise<Post | undefined>;
  deletePost(id: number): Promise<void>;

  createSubscriber(sub: InsertSubscriber & { unsubscribeToken: string }): Promise<Subscriber>;
  getSubscribers(status?: string): Promise<Subscriber[]>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  getSubscriberByToken(token: string): Promise<Subscriber | undefined>;
  updateSubscriber(id: number, data: Partial<Subscriber>): Promise<Subscriber | undefined>;
  deleteSubscriber(id: number): Promise<void>;

  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletters(): Promise<Newsletter[]>;
  getNewsletterById(id: number): Promise<Newsletter | undefined>;
  updateNewsletter(id: number, data: Partial<Newsletter>): Promise<Newsletter | undefined>;

  createAiJob(job: { type: string; input: string }): Promise<AiJob>;
  getAiJobs(): Promise<AiJob[]>;
  updateAiJob(id: number, data: Partial<AiJob>): Promise<AiJob | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createLead(lead: InsertLead): Promise<Lead> {
    const [result] = await db.insert(leads).values(lead).returning();
    return result;
  }
  async getLeads(): Promise<Lead[]> {
    return db.select().from(leads).orderBy(desc(leads.createdAt));
  }
  async getLead(id: number): Promise<Lead | undefined> {
    const [result] = await db.select().from(leads).where(eq(leads.id, id));
    return result;
  }
  async updateLead(id: number, data: Partial<Lead>): Promise<Lead | undefined> {
    const [result] = await db.update(leads).set(data).where(eq(leads.id, id)).returning();
    return result;
  }

  async createUser(user: InsertUser & { passwordHash: string }): Promise<User> {
    const [result] = await db.insert(users).values({
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role || "editor",
    }).returning();
    return result;
  }
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [result] = await db.select().from(users).where(eq(users.email, email));
    return result;
  }
  async getUserById(id: number): Promise<User | undefined> {
    const [result] = await db.select().from(users).where(eq(users.id, id));
    return result;
  }
  async getUsers(): Promise<User[]> {
    return db.select().from(users).orderBy(desc(users.createdAt));
  }
  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const [result] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return result;
  }
  async deleteUser(id: number): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  async createSession(userId: number, token: string, expiresAt: Date): Promise<Session> {
    const [result] = await db.insert(sessions).values({ userId, token, expiresAt }).returning();
    return result;
  }
  async getSessionByToken(token: string): Promise<Session | undefined> {
    const [result] = await db.select().from(sessions).where(eq(sessions.token, token));
    return result;
  }
  async deleteSession(token: string): Promise<void> {
    await db.delete(sessions).where(eq(sessions.token, token));
  }
  async deleteExpiredSessions(): Promise<void> {
    await db.delete(sessions).where(
      eq(sessions.expiresAt, new Date(0))
    );
  }

  async createPost(post: InsertPost & { authorId: number }): Promise<Post> {
    const [result] = await db.insert(posts).values(post).returning();
    return result;
  }
  async getPosts(status?: string): Promise<Post[]> {
    if (status) {
      return db.select().from(posts).where(eq(posts.status, status)).orderBy(desc(posts.createdAt));
    }
    return db.select().from(posts).orderBy(desc(posts.createdAt));
  }
  async getPostById(id: number): Promise<Post | undefined> {
    const [result] = await db.select().from(posts).where(eq(posts.id, id));
    return result;
  }
  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [result] = await db.select().from(posts).where(eq(posts.slug, slug));
    return result;
  }
  async updatePost(id: number, data: Partial<Post>): Promise<Post | undefined> {
    const [result] = await db.update(posts).set({ ...data, updatedAt: new Date() }).where(eq(posts.id, id)).returning();
    return result;
  }
  async deletePost(id: number): Promise<void> {
    await db.delete(posts).where(eq(posts.id, id));
  }

  async createSubscriber(sub: InsertSubscriber & { unsubscribeToken: string }): Promise<Subscriber> {
    const [result] = await db.insert(subscribers).values(sub).returning();
    return result;
  }
  async getSubscribers(status?: string): Promise<Subscriber[]> {
    if (status) {
      return db.select().from(subscribers).where(eq(subscribers.status, status)).orderBy(desc(subscribers.createdAt));
    }
    return db.select().from(subscribers).orderBy(desc(subscribers.createdAt));
  }
  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const [result] = await db.select().from(subscribers).where(eq(subscribers.email, email));
    return result;
  }
  async getSubscriberByToken(token: string): Promise<Subscriber | undefined> {
    const [result] = await db.select().from(subscribers).where(eq(subscribers.unsubscribeToken, token));
    return result;
  }
  async updateSubscriber(id: number, data: Partial<Subscriber>): Promise<Subscriber | undefined> {
    const [result] = await db.update(subscribers).set(data).where(eq(subscribers.id, id)).returning();
    return result;
  }
  async deleteSubscriber(id: number): Promise<void> {
    await db.delete(subscribers).where(eq(subscribers.id, id));
  }

  async createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter> {
    const [result] = await db.insert(newsletters).values(newsletter).returning();
    return result;
  }
  async getNewsletters(): Promise<Newsletter[]> {
    return db.select().from(newsletters).orderBy(desc(newsletters.createdAt));
  }
  async getNewsletterById(id: number): Promise<Newsletter | undefined> {
    const [result] = await db.select().from(newsletters).where(eq(newsletters.id, id));
    return result;
  }
  async updateNewsletter(id: number, data: Partial<Newsletter>): Promise<Newsletter | undefined> {
    const [result] = await db.update(newsletters).set(data).where(eq(newsletters.id, id)).returning();
    return result;
  }

  async createAiJob(job: { type: string; input: string }): Promise<AiJob> {
    const [result] = await db.insert(aiJobs).values(job).returning();
    return result;
  }
  async getAiJobs(): Promise<AiJob[]> {
    return db.select().from(aiJobs).orderBy(desc(aiJobs.createdAt));
  }
  async updateAiJob(id: number, data: Partial<AiJob>): Promise<AiJob | undefined> {
    const [result] = await db.update(aiJobs).set(data).where(eq(aiJobs.id, id)).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
