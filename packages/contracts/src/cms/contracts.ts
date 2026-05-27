export const cmsContentKinds = [
  "post",
  "service",
  "product",
  "art-piece",
  "collection",
  "landing-page",
  "newsletter",
] as const;

export type CmsContentKind = (typeof cmsContentKinds)[number];

export const cmsAuthoringModes = [
  "manual",
  "ai-assisted",
  "ai-generated",
] as const;

export type CmsAuthoringMode = (typeof cmsAuthoringModes)[number];

export const cmsPublishStatuses = [
  "draft",
  "review",
  "scheduled",
  "published",
  "archived",
] as const;

export type CmsPublishStatus = (typeof cmsPublishStatuses)[number];

export const cmsDistributionChannels = [
  "site",
  "blog-index",
  "newsletter",
  "subscriber-email",
  "rss",
  "seo-sitemap",
] as const;

export type CmsDistributionChannel = (typeof cmsDistributionChannels)[number];

export const cmsPlacementKinds = [
  "detail-page",
  "blog-index",
  "listing-grid",
  "navigation-menu",
  "navigation-dropdown",
] as const;

export type CmsPlacementKind = (typeof cmsPlacementKinds)[number];

export interface CmsSeoFields {
  title: string | null;
  description: string | null;
  keywords: string[];
  canonicalUrl?: string | null;
}

export interface CmsNavigationPlacement {
  showInNavigation: boolean;
  showInDropdown: boolean;
  navigationLabel?: string | null;
  navigationOrder?: number | null;
  parentNavigationKey?: string | null;
}

export interface CmsPresentationFlags {
  hasDetailPage: boolean;
  showOnPrimaryIndex: boolean;
  showInNavigation: boolean;
  showInDropdown: boolean;
}

export interface CmsPlacementRules {
  placements: CmsPlacementKind[];
  detailPagePath: string | null;
  primaryIndexPath: string | null;
  listingGroupKey: string | null;
  navigation: CmsNavigationPlacement;
  presentation: CmsPresentationFlags;
}

export interface CmsContentSummary {
  id: number;
  kind: CmsContentKind;
  title: string;
  slug: string;
  status: CmsPublishStatus;
  authoringMode: CmsAuthoringMode;
  excerpt: string | null;
  featuredImage: string | null;
  tags: string[];
  seo: CmsSeoFields;
  placement: CmsPlacementRules;
  distributionChannels: CmsDistributionChannel[];
  publishedAt: string | null;
  updatedAt: string;
}

export interface CmsContentDetail extends CmsContentSummary {
  body: string;
  previewText: string | null;
  structuredDataType?: string | null;
  relatedItemIds: number[];
  metadata: Record<string, unknown>;
}

export interface CmsNewsletterPreview {
  subject: string;
  previewText: string | null;
  audienceSegment: string;
  includedContentIds: number[];
  sendAt: string | null;
  recipientCount?: number;
  htmlContent?: string;
}

export interface CmsSubscriberSummary {
  id: number;
  email: string;
  name: string | null;
  status: string;
  createdAt: string;
}

export interface CmsAuthoringRequest {
  kind: CmsContentKind;
  mode: CmsAuthoringMode;
  title?: string;
  prompt?: string;
  keywords?: string[];
  brandVoice?: string;
  relatedServiceSlugs?: string[];
}

export interface CmsItemMutationInput {
  kind: CmsContentKind;
  title: string;
  slug?: string;
  body?: string;
  excerpt?: string | null;
  previewText?: string | null;
  featuredImage?: string | null;
  tags?: string[];
  authoringMode?: CmsAuthoringMode;
  status?: CmsPublishStatus;
  seo?: Partial<CmsSeoFields>;
  distributionChannels?: CmsDistributionChannel[];
  placement?: Partial<CmsPlacementRules>;
  metadata?: Record<string, unknown>;
}
