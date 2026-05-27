import { and, desc, eq, sql } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type {
  AuthRepository,
  BlogRepository,
  GalleryRepository,
  LeadsRepository,
  PlatformRepositories,
  RatingsRepository,
  ServicesRepository,
} from "../repositories";
import type {
  AiJobRecord,
  BacklinkClickRecord,
  BacklinkRecord,
  CreateLeadInput,
  CreatePostInput,
  CreateServiceInput,
  CreateUserInput,
  GalleryItemRecord,
  GallerySectionRecord,
  GallerySectionWithItems,
  LeadRecord,
  NewsletterRecord,
  PostRecord,
  RatingRecord,
  ServiceRecord,
  SessionRecord,
  SubscriberRecord,
  TopicRecord,
  UserRecord,
  WebhookLogRecord,
  WebhookRecord,
} from "../schema";
import {
  aiJobs,
  backlinkClicks,
  backlinks,
  galleryItems,
  gallerySections,
  leads,
  newsletters,
  posts,
  ratings,
  services,
  sessions,
  settings,
  subscribers,
  topics,
  users,
  webhookLogs,
  webhooks,
  contractorCoreSchema,
} from "./contractor-core-schema";

type ContractorCoreDb = NodePgDatabase<typeof contractorCoreSchema>;

export class DrizzleAuthRepository implements AuthRepository {
  constructor(private readonly db: ContractorCoreDb) {}

  async createUser(input: CreateUserInput): Promise<UserRecord> {
    const [result] = await this.db.insert(users).values({
      name: input.name,
      email: input.email,
      passwordHash: input.passwordHash,
      role: input.role || "editor",
    }).returning();
    return result;
  }

  async getUserByEmail(email: string) {
    const [result] = await this.db.select().from(users).where(eq(users.email, email));
    return result;
  }

  async getUserById(id: number) {
    const [result] = await this.db.select().from(users).where(eq(users.id, id));
    return result;
  }

  async getUsers() {
    return this.db.select().from(users).orderBy(desc(users.createdAt));
  }

  async updateUser(id: number, updates: Partial<UserRecord>) {
    const [result] = await this.db.update(users).set(updates).where(eq(users.id, id)).returning();
    return result;
  }

  async deleteUser(id: number) {
    await this.db.delete(users).where(eq(users.id, id));
  }

  async createSession(userId: number, token: string, expiresAt: Date): Promise<SessionRecord> {
    const [result] = await this.db.insert(sessions).values({ userId, token, expiresAt }).returning();
    return result;
  }

  async getSessionByToken(token: string) {
    const [result] = await this.db.select().from(sessions).where(eq(sessions.token, token));
    return result;
  }

  async deleteSession(token: string) {
    await this.db.delete(sessions).where(eq(sessions.token, token));
  }

  async deleteExpiredSessions(cutoff = new Date()) {
    await this.db.delete(sessions).where(sql`${sessions.expiresAt} < ${cutoff}`);
  }
}

export class DrizzleLeadsRepository implements LeadsRepository {
  constructor(private readonly db: ContractorCoreDb) {}

  async createLead(input: CreateLeadInput): Promise<LeadRecord> {
    const [result] = await this.db.insert(leads).values(input).returning();
    return result;
  }

  async getLeads() {
    return this.db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLead(id: number) {
    const [result] = await this.db.select().from(leads).where(eq(leads.id, id));
    return result;
  }

  async updateLead(id: number, updates: Partial<LeadRecord>) {
    const [result] = await this.db.update(leads).set(updates).where(eq(leads.id, id)).returning();
    return result;
  }
}

export class DrizzleBlogRepository implements BlogRepository {
  constructor(private readonly db: ContractorCoreDb) {}

  async createPost(input: CreatePostInput): Promise<PostRecord> {
    const [result] = await this.db.insert(posts).values(input).returning();
    return result;
  }

  async getPosts(status?: string) {
    if (status) {
      return this.db.select().from(posts).where(eq(posts.status, status)).orderBy(desc(posts.createdAt));
    }
    return this.db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async getPostById(id: number) {
    const [result] = await this.db.select().from(posts).where(eq(posts.id, id));
    return result;
  }

  async getPostBySlug(slug: string) {
    const [result] = await this.db.select().from(posts).where(eq(posts.slug, slug));
    return result;
  }

  async updatePost(id: number, updates: Partial<PostRecord>) {
    const [result] = await this.db.update(posts).set({ ...updates, updatedAt: new Date() }).where(eq(posts.id, id)).returning();
    return result;
  }

  async deletePost(id: number) {
    await this.db.delete(posts).where(eq(posts.id, id));
  }

  async createSubscriber(input: Omit<SubscriberRecord, "id" | "createdAt">): Promise<SubscriberRecord> {
    const [result] = await this.db.insert(subscribers).values(input).returning();
    return result;
  }

  async getSubscribers(status?: string) {
    if (status) {
      return this.db.select().from(subscribers).where(eq(subscribers.status, status)).orderBy(desc(subscribers.createdAt));
    }
    return this.db.select().from(subscribers).orderBy(desc(subscribers.createdAt));
  }

  async getSubscriberByEmail(email: string) {
    const [result] = await this.db.select().from(subscribers).where(eq(subscribers.email, email));
    return result;
  }

  async getSubscriberByToken(token: string) {
    const [result] = await this.db.select().from(subscribers).where(eq(subscribers.unsubscribeToken, token));
    return result;
  }

  async updateSubscriber(id: number, updates: Partial<SubscriberRecord>) {
    const [result] = await this.db.update(subscribers).set(updates).where(eq(subscribers.id, id)).returning();
    return result;
  }

  async deleteSubscriber(id: number) {
    await this.db.delete(subscribers).where(eq(subscribers.id, id));
  }

  async createNewsletter(input: Omit<NewsletterRecord, "id" | "createdAt">): Promise<NewsletterRecord> {
    const [result] = await this.db.insert(newsletters).values(input).returning();
    return result;
  }

  async getNewsletters() {
    return this.db.select().from(newsletters).orderBy(desc(newsletters.createdAt));
  }

  async getNewsletterById(id: number) {
    const [result] = await this.db.select().from(newsletters).where(eq(newsletters.id, id));
    return result;
  }

  async updateNewsletter(id: number, updates: Partial<NewsletterRecord>) {
    const [result] = await this.db.update(newsletters).set(updates).where(eq(newsletters.id, id)).returning();
    return result;
  }

  async createAiJob(input: Pick<AiJobRecord, "type" | "input">): Promise<AiJobRecord> {
    const [result] = await this.db.insert(aiJobs).values(input).returning();
    return result;
  }

  async getAiJobs() {
    return this.db.select().from(aiJobs).orderBy(desc(aiJobs.createdAt));
  }

  async getAiJobsByType(type: string) {
    return this.db.select().from(aiJobs).where(eq(aiJobs.type, type)).orderBy(desc(aiJobs.createdAt));
  }

  async updateAiJob(id: number, updates: Partial<AiJobRecord>) {
    const [result] = await this.db.update(aiJobs).set(updates).where(eq(aiJobs.id, id)).returning();
    return result;
  }

  async createTopic(input: Omit<TopicRecord, "id" | "createdAt" | "status"> & { status?: string }): Promise<TopicRecord> {
    const [result] = await this.db.insert(topics).values({
      ...input,
      status: input.status || "suggested",
    }).returning();
    return result;
  }

  async getTopics(status?: string) {
    if (status) {
      return this.db.select().from(topics).where(eq(topics.status, status)).orderBy(desc(topics.createdAt));
    }
    return this.db.select().from(topics).orderBy(desc(topics.createdAt));
  }

  async getTopicById(id: number) {
    const [result] = await this.db.select().from(topics).where(eq(topics.id, id));
    return result;
  }

  async updateTopic(id: number, updates: Partial<TopicRecord>) {
    const [result] = await this.db.update(topics).set(updates).where(eq(topics.id, id)).returning();
    return result;
  }

  async deleteTopic(id: number) {
    await this.db.delete(topics).where(eq(topics.id, id));
  }

  async incrementPostReadCount(id: number) {
    await this.db.update(posts).set({ readCount: sql`${posts.readCount} + 1` }).where(eq(posts.id, id));
  }

  async incrementPostShareCount(id: number) {
    await this.db.update(posts).set({ shareCount: sql`${posts.shareCount} + 1` }).where(eq(posts.id, id));
  }

  async createBacklink(input: Omit<BacklinkRecord, "id" | "createdAt" | "clicks">): Promise<BacklinkRecord> {
    const [result] = await this.db.insert(backlinks).values(input).returning();
    return result;
  }

  async getBacklinksByPostId(postId: number) {
    return this.db.select().from(backlinks).where(eq(backlinks.postId, postId)).orderBy(desc(backlinks.createdAt));
  }

  async getBacklinkByShortCode(shortCode: string) {
    const [result] = await this.db.select().from(backlinks).where(eq(backlinks.shortCode, shortCode));
    return result;
  }

  async getAllBacklinks() {
    return this.db.select().from(backlinks).orderBy(desc(backlinks.createdAt));
  }

  async incrementBacklinkClicks(id: number) {
    await this.db.update(backlinks).set({ clicks: sql`${backlinks.clicks} + 1` }).where(eq(backlinks.id, id));
  }

  async createBacklinkClick(input: Omit<BacklinkClickRecord, "id" | "clickedAt">): Promise<BacklinkClickRecord> {
    const [result] = await this.db.insert(backlinkClicks).values(input).returning();
    return result;
  }

  async getBacklinkClicksByBacklinkId(backlinkId: number) {
    return this.db.select().from(backlinkClicks).where(eq(backlinkClicks.backlinkId, backlinkId)).orderBy(desc(backlinkClicks.clickedAt));
  }

  async getBacklinkAnalytics() {
    return this.db
      .select({
        platform: backlinks.platform,
        clicks: sql<number>`sum(${backlinks.clicks})::int`,
        backlinkCount: sql<number>`count(*)::int`,
      })
      .from(backlinks)
      .groupBy(backlinks.platform)
      .orderBy(sql`sum(${backlinks.clicks}) desc`);
  }
}

export class DrizzleServicesRepository implements ServicesRepository {
  constructor(private readonly db: ContractorCoreDb) {}

  async getServices() {
    return this.db.select().from(services).orderBy(services.displayOrder, desc(services.createdAt));
  }

  async getServiceById(id: number) {
    const [result] = await this.db.select().from(services).where(eq(services.id, id));
    return result;
  }

  async createService(input: CreateServiceInput): Promise<ServiceRecord> {
    const [result] = await this.db.insert(services).values(input).returning();
    return result;
  }

  async updateService(id: number, updates: Partial<ServiceRecord>) {
    const [result] = await this.db.update(services).set(updates).where(eq(services.id, id)).returning();
    return result;
  }

  async deleteService(id: number) {
    await this.db.delete(services).where(eq(services.id, id));
  }
}

export class DrizzleGalleryRepository implements GalleryRepository {
  constructor(private readonly db: ContractorCoreDb) {}

  async getPublicGallery(): Promise<{ sections: GallerySectionWithItems[] }> {
    const sections = await this.db
      .select()
      .from(gallerySections)
      .where(eq(gallerySections.isActive, true))
      .orderBy(gallerySections.displayOrder);

    const result: GallerySectionWithItems[] = [];
    for (const section of sections) {
      const items = await this.db
        .select()
        .from(galleryItems)
        .where(and(eq(galleryItems.sectionId, section.id), eq(galleryItems.isActive, true)))
        .orderBy(galleryItems.displayOrder);
      result.push({ ...section, items });
    }
    return { sections: result };
  }

  async getAdminGallery(): Promise<{ sections: GallerySectionWithItems[] }> {
    const sections = await this.db.select().from(gallerySections).orderBy(gallerySections.displayOrder);
    const result: GallerySectionWithItems[] = [];

    for (const section of sections) {
      const items = await this.db
        .select()
        .from(galleryItems)
        .where(eq(galleryItems.sectionId, section.id))
        .orderBy(galleryItems.displayOrder);
      result.push({ ...section, items });
    }

    return { sections: result };
  }

  async getGalleryByServiceSlug(slug: string): Promise<{ sections: GallerySectionWithItems[] }> {
    const sections = await this.db
      .select()
      .from(gallerySections)
      .where(and(eq(gallerySections.isActive, true), eq(gallerySections.serviceSlug, slug)))
      .orderBy(gallerySections.displayOrder);

    const result: GallerySectionWithItems[] = [];
    for (const section of sections) {
      const items = await this.db
        .select()
        .from(galleryItems)
        .where(and(eq(galleryItems.sectionId, section.id), eq(galleryItems.isActive, true)))
        .orderBy(galleryItems.displayOrder);
      result.push({ ...section, items });
    }
    return { sections: result };
  }

  async getGallerySections() {
    return this.db.select().from(gallerySections).orderBy(gallerySections.displayOrder);
  }

  async getGallerySectionById(id: number) {
    const [result] = await this.db.select().from(gallerySections).where(eq(gallerySections.id, id));
    return result;
  }

  async createGallerySection(input: Omit<GallerySectionRecord, "id" | "createdAt">): Promise<GallerySectionRecord> {
    const [result] = await this.db.insert(gallerySections).values(input).returning();
    return result;
  }

  async updateGallerySection(id: number, updates: Partial<GallerySectionRecord>) {
    const [result] = await this.db.update(gallerySections).set(updates).where(eq(gallerySections.id, id)).returning();
    return result;
  }

  async deleteGallerySection(id: number) {
    await this.db.delete(gallerySections).where(eq(gallerySections.id, id));
  }

  async getGalleryItems(sectionId?: number) {
    if (sectionId !== undefined) {
      return this.db.select().from(galleryItems).where(eq(galleryItems.sectionId, sectionId)).orderBy(galleryItems.displayOrder);
    }
    return this.db.select().from(galleryItems).orderBy(galleryItems.displayOrder);
  }

  async getGalleryItemById(id: number) {
    const [result] = await this.db.select().from(galleryItems).where(eq(galleryItems.id, id));
    return result;
  }

  async createGalleryItem(input: Omit<GalleryItemRecord, "id" | "createdAt">): Promise<GalleryItemRecord> {
    const [result] = await this.db.insert(galleryItems).values(input).returning();
    return result;
  }

  async updateGalleryItem(id: number, updates: Partial<GalleryItemRecord>) {
    const [result] = await this.db.update(galleryItems).set(updates).where(eq(galleryItems.id, id)).returning();
    return result;
  }

  async deleteGalleryItem(id: number) {
    await this.db.delete(galleryItems).where(eq(galleryItems.id, id));
  }
}

export class DrizzleRatingsRepository implements RatingsRepository {
  constructor(private readonly db: ContractorCoreDb) {}

  async createRating(input: Omit<RatingRecord, "id" | "createdAt">): Promise<RatingRecord> {
    const [result] = await this.db.insert(ratings).values(input).returning();
    return result;
  }

  async getRatingByToken(token: string) {
    const [result] = await this.db.select().from(ratings).where(eq(ratings.token, token));
    return result;
  }

  async getRatingsByLeadId(leadId: number) {
    return this.db.select().from(ratings).where(eq(ratings.leadId, leadId)).orderBy(desc(ratings.createdAt));
  }

  async getAllRatings() {
    return this.db.select().from(ratings).orderBy(desc(ratings.createdAt));
  }

  async createWebhook(input: Omit<WebhookRecord, "id" | "createdAt">): Promise<WebhookRecord> {
    const [result] = await this.db.insert(webhooks).values(input).returning();
    return result;
  }

  async getWebhooks() {
    return this.db.select().from(webhooks).orderBy(desc(webhooks.createdAt));
  }

  async getWebhookById(id: number) {
    const [result] = await this.db.select().from(webhooks).where(eq(webhooks.id, id));
    return result;
  }

  async updateWebhook(id: number, updates: Partial<WebhookRecord>) {
    const [result] = await this.db.update(webhooks).set(updates).where(eq(webhooks.id, id)).returning();
    return result;
  }

  async deleteWebhook(id: number) {
    await this.db.delete(webhooks).where(eq(webhooks.id, id));
  }

  async getActiveWebhooksForEvent(event: string) {
    const active = await this.db.select().from(webhooks).where(eq(webhooks.active, true));
    return active.filter((hook) => hook.events.includes(event));
  }

  async createWebhookLog(input: Omit<WebhookLogRecord, "id" | "createdAt">): Promise<WebhookLogRecord> {
    const [result] = await this.db.insert(webhookLogs).values(input).returning();
    return result;
  }

  async getWebhookLogs(webhookId?: number) {
    if (webhookId) {
      return this.db.select().from(webhookLogs).where(eq(webhookLogs.webhookId, webhookId)).orderBy(desc(webhookLogs.createdAt)).limit(100);
    }
    return this.db.select().from(webhookLogs).orderBy(desc(webhookLogs.createdAt)).limit(100);
  }

  async getSetting(key: string) {
    const [result] = await this.db.select().from(settings).where(eq(settings.key, key));
    return result?.value;
  }

  async setSetting(key: string, value: string) {
    await this.db.insert(settings).values({ key, value }).onConflictDoUpdate({
      target: settings.key,
      set: { value, updatedAt: new Date() },
    });
  }

  async getLeadSentimentSent(leadId: number) {
    const value = await this.getSetting(`sentiment_sent_${leadId}`);
    return value === "true";
  }

  async markLeadSentimentSent(leadId: number) {
    await this.setSetting(`sentiment_sent_${leadId}`, "true");
  }
}

export function createDrizzleContractorCoreRepositories(db: ContractorCoreDb): PlatformRepositories {
  return {
    auth: new DrizzleAuthRepository(db),
    leads: new DrizzleLeadsRepository(db),
    blog: new DrizzleBlogRepository(db),
    services: new DrizzleServicesRepository(db),
    gallery: new DrizzleGalleryRepository(db),
    ratings: new DrizzleRatingsRepository(db),
  };
}
