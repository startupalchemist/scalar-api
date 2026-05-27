import type { EntityTimestamps, IdentifiedRecord } from "./core";

export interface TopicRecord extends IdentifiedRecord, EntityTimestamps {
  title: string;
  overview: string;
  targetKeywords: string[] | null;
  searchIntent?: string | null;
  estimatedSearchVolume?: string | null;
  competitionLevel?: string | null;
  leadPotential?: string | null;
  reasoning?: string | null;
  status: string;
  aiJobId?: number | null;
  postId?: number | null;
}

export interface PostRecord extends IdentifiedRecord, EntityTimestamps {
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  authorId?: number | null;
  status: string;
  tags: string[] | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords: string[] | null;
  researchJobId?: number | null;
  topicId?: number | null;
  readCount: number;
  shareCount: number;
  publishedAt?: Date | null;
}

export interface CreatePostInput {
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  authorId: number;
  status?: string;
  tags?: string[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string[];
  publishedAt?: Date | null;
}

export interface SubscriberRecord extends IdentifiedRecord, EntityTimestamps {
  name?: string | null;
  email: string;
  status: string;
  unsubscribeToken: string;
}

export interface NewsletterRecord extends IdentifiedRecord, EntityTimestamps {
  subject: string;
  htmlContent: string;
  status: string;
  sentAt?: Date | null;
  recipientCount?: number | null;
}

export interface AiJobRecord extends IdentifiedRecord {
  type: string;
  input: string;
  output?: string | null;
  status: string;
  createdAt: Date;
}

export interface BacklinkRecord extends IdentifiedRecord {
  postId: number;
  platform: string;
  url: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  shortCode: string;
  clicks: number;
  createdAt: Date;
}

export interface BacklinkClickRecord extends IdentifiedRecord {
  backlinkId: number;
  referrer?: string | null;
  userAgent?: string | null;
  clickedAt: Date;
}
