import type { RatingRecord, SettingRecord, WebhookLogRecord, WebhookRecord } from "../schema";

export interface RatingsRepository {
  createRating(input: Omit<RatingRecord, "id" | "createdAt">): Promise<RatingRecord>;
  getRatingByToken(token: string): Promise<RatingRecord | undefined>;
  getRatingsByLeadId(leadId: number): Promise<RatingRecord[]>;
  getAllRatings(): Promise<RatingRecord[]>;
  createWebhook(input: Omit<WebhookRecord, "id" | "createdAt">): Promise<WebhookRecord>;
  getWebhooks(): Promise<WebhookRecord[]>;
  getWebhookById(id: number): Promise<WebhookRecord | undefined>;
  updateWebhook(id: number, updates: Partial<WebhookRecord>): Promise<WebhookRecord | undefined>;
  deleteWebhook(id: number): Promise<void>;
  getActiveWebhooksForEvent(event: string): Promise<WebhookRecord[]>;
  createWebhookLog(input: Omit<WebhookLogRecord, "id" | "createdAt">): Promise<WebhookLogRecord>;
  getWebhookLogs(webhookId?: number): Promise<WebhookLogRecord[]>;
  getSetting(key: string): Promise<string | undefined>;
  setSetting(key: string, value: string): Promise<void>;
  getLeadSentimentSent(leadId: number): Promise<boolean>;
  markLeadSentimentSent(leadId: number): Promise<void>;
  getSettings?(): Promise<SettingRecord[]>;
}
