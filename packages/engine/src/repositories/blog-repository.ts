import type {
  AiJobRecord,
  BacklinkClickRecord,
  BacklinkRecord,
  CreatePostInput,
  NewsletterRecord,
  PostRecord,
  SubscriberRecord,
  TopicRecord,
} from "../schema";

export interface BlogRepository {
  createPost(input: CreatePostInput): Promise<PostRecord>;
  getPosts(status?: string): Promise<PostRecord[]>;
  getPostById(id: number): Promise<PostRecord | undefined>;
  getPostBySlug(slug: string): Promise<PostRecord | undefined>;
  updatePost(id: number, updates: Partial<PostRecord>): Promise<PostRecord | undefined>;
  deletePost(id: number): Promise<void>;
  createSubscriber(input: Omit<SubscriberRecord, "id" | "createdAt">): Promise<SubscriberRecord>;
  getSubscribers(status?: string): Promise<SubscriberRecord[]>;
  getSubscriberByEmail(email: string): Promise<SubscriberRecord | undefined>;
  getSubscriberByToken(token: string): Promise<SubscriberRecord | undefined>;
  updateSubscriber(id: number, updates: Partial<SubscriberRecord>): Promise<SubscriberRecord | undefined>;
  deleteSubscriber(id: number): Promise<void>;
  createNewsletter(input: Omit<NewsletterRecord, "id" | "createdAt">): Promise<NewsletterRecord>;
  getNewsletters(): Promise<NewsletterRecord[]>;
  getNewsletterById(id: number): Promise<NewsletterRecord | undefined>;
  updateNewsletter(id: number, updates: Partial<NewsletterRecord>): Promise<NewsletterRecord | undefined>;
  createAiJob(input: Pick<AiJobRecord, "type" | "input">): Promise<AiJobRecord>;
  getAiJobs(): Promise<AiJobRecord[]>;
  getAiJobsByType(type: string): Promise<AiJobRecord[]>;
  updateAiJob(id: number, updates: Partial<AiJobRecord>): Promise<AiJobRecord | undefined>;
  createTopic(input: Omit<TopicRecord, "id" | "createdAt" | "status"> & { status?: string }): Promise<TopicRecord>;
  getTopics(status?: string): Promise<TopicRecord[]>;
  getTopicById(id: number): Promise<TopicRecord | undefined>;
  updateTopic(id: number, updates: Partial<TopicRecord>): Promise<TopicRecord | undefined>;
  deleteTopic(id: number): Promise<void>;
  incrementPostReadCount(id: number): Promise<void>;
  incrementPostShareCount(id: number): Promise<void>;
  createBacklink(input: Omit<BacklinkRecord, "id" | "createdAt" | "clicks">): Promise<BacklinkRecord>;
  getBacklinksByPostId(postId: number): Promise<BacklinkRecord[]>;
  getBacklinkByShortCode(shortCode: string): Promise<BacklinkRecord | undefined>;
  getAllBacklinks(): Promise<BacklinkRecord[]>;
  incrementBacklinkClicks(id: number): Promise<void>;
  createBacklinkClick(input: Omit<BacklinkClickRecord, "id" | "clickedAt">): Promise<BacklinkClickRecord>;
  getBacklinkClicksByBacklinkId(backlinkId: number): Promise<BacklinkClickRecord[]>;
  getBacklinkAnalytics(): Promise<{ platform: string; clicks: number; backlinkCount: number }[]>;
}
