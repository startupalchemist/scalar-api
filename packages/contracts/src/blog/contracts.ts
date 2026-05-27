export interface BlogPostSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  status: "draft" | "queued" | "published";
  tags: string[];
  publishedAt: string | null;
}

export interface BlogPostDetail extends BlogPostSummary {
  content: string;
  seoTitle: string | null;
  seoDescription: string | null;
  featuredImage: string | null;
}

export interface BlogGenerationRequest {
  topic: string;
  keywords?: string;
  tone?: string;
}

export interface BlogPublishPlan {
  publishToSite: boolean;
  publishToBlogIndex: boolean;
  includeInNewsletter: boolean;
  emailSubscribers: boolean;
  requirePreviewApproval: boolean;
}
