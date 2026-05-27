import type {
  CmsContentDetail,
  CmsContentKind,
  CmsItemMutationInput,
  CmsNewsletterPreview,
  CmsSubscriberSummary,
  CmsContentSummary,
} from "@platform/contracts";

export interface CmsListFilters {
  kind?: CmsContentKind;
  status?: string;
  includeArchived?: boolean;
}

export interface CmsRepository {
  listItems(filters?: CmsListFilters): Promise<CmsContentSummary[]>;
  getItemBySlug(kind: CmsContentKind, slug: string): Promise<CmsContentDetail | undefined>;
  getItemById(kind: CmsContentKind, id: number): Promise<CmsContentDetail | undefined>;
  createItem(input: CmsItemMutationInput, actorUserId: number): Promise<CmsContentDetail>;
  updateItem(kind: CmsContentKind, id: number, input: Partial<CmsItemMutationInput>): Promise<CmsContentDetail | undefined>;
  publishItem(kind: CmsContentKind, id: number): Promise<CmsContentDetail | undefined>;
  listSubscribers(status?: string): Promise<CmsSubscriberSummary[]>;
  createSubscriber(input: { email: string; name?: string | null }): Promise<CmsSubscriberSummary>;
  buildNewsletterPreview(kind: CmsContentKind, id: number): Promise<CmsNewsletterPreview | undefined>;
  createNewsletterDraftFromItem(kind: CmsContentKind, id: number): Promise<{ newsletterId: number; preview: CmsNewsletterPreview } | undefined>;
}
