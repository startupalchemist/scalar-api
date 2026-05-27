import type {
  CmsContentDetail,
  CmsContentKind,
  CmsItemMutationInput,
  CmsNewsletterPreview,
  CmsSubscriberSummary,
  CmsContentSummary,
  CmsPlacementKind,
  CmsPlacementRules,
} from "@platform/contracts";
import type { ClientConfig as PlatformClientConfig } from "@platform/config";
import crypto from "crypto";
import type { PostRecord, ServiceRecord } from "../schema";
import type { BlogRepository } from "./blog-repository";
import type { CmsListFilters, CmsRepository } from "./cms-repository";
import type { RatingsRepository } from "./ratings-repository";
import type { ServicesRepository } from "./services-repository";

type SupportedCmsKind = "post" | "service";
type CmsOverrideKey = `${SupportedCmsKind}:${number}`;

interface CmsStoredOverrides {
  placement?: Partial<CmsPlacementRules>;
  distributionChannels?: CmsContentDetail["distributionChannels"];
  authoringMode?: CmsContentDetail["authoringMode"];
}

type CmsOverrideMap = Partial<Record<CmsOverrideKey, CmsStoredOverrides>>;
type CmsSettingsStore = Pick<RatingsRepository, "getSetting" | "setSetting">;
const CMS_OVERRIDES_KEY = "cms_item_overrides";

function getCollectionConfig(client: PlatformClientConfig, kind: SupportedCmsKind) {
  return client.cms.collections.find((collection) => collection.kinds.includes(kind));
}

function placementIncludes(placements: CmsPlacementKind[], kind: CmsPlacementKind) {
  return placements.includes(kind);
}

function toIsoString(date: Date | null | undefined) {
  return date ? date.toISOString() : null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function buildPlacement(client: PlatformClientConfig, kind: SupportedCmsKind, slug: string) {
  const collection = getCollectionConfig(client, kind);
  const detailPageBasePath = collection?.detailPageBasePath || "/";
  const detailPagePath = detailPageBasePath === "/"
    ? `/${slug}`.replace(/\/{2,}/g, "/")
    : `${detailPageBasePath}/${slug}`.replace(/\/{2,}/g, "/");

  const placements = collection?.defaultPlacements || ["detail-page"];

  return {
    placements,
    detailPagePath: placementIncludes(placements, "detail-page") ? detailPagePath : null,
    primaryIndexPath: collection?.indexPagePath || null,
    listingGroupKey: collection?.key || null,
    navigation: {
      showInNavigation: collection?.defaultShowInNavigation ?? false,
      showInDropdown: collection?.defaultShowInDropdown ?? false,
      navigationLabel: null,
      navigationOrder: null,
      parentNavigationKey: collection?.navigationParentKey || null,
    },
    presentation: {
      hasDetailPage: placementIncludes(placements, "detail-page"),
      showOnPrimaryIndex: placementIncludes(placements, "blog-index") || placementIncludes(placements, "listing-grid"),
      showInNavigation: collection?.defaultShowInNavigation ?? false,
      showInDropdown: collection?.defaultShowInDropdown ?? false,
    },
  };
}

function mergePlacement(base: CmsPlacementRules, override?: Partial<CmsPlacementRules>): CmsPlacementRules {
  if (!override) {
    return base;
  }

  return {
    placements: override.placements ?? base.placements,
    detailPagePath: override.detailPagePath ?? base.detailPagePath,
    primaryIndexPath: override.primaryIndexPath ?? base.primaryIndexPath,
    listingGroupKey: override.listingGroupKey ?? base.listingGroupKey,
    navigation: {
      ...base.navigation,
      ...(override.navigation ?? {}),
    },
    presentation: {
      ...base.presentation,
      ...(override.presentation ?? {}),
    },
  };
}

function buildOverrideKey(kind: SupportedCmsKind, id: number): CmsOverrideKey {
  return `${kind}:${id}`;
}

function mapPost(client: PlatformClientConfig, post: PostRecord, overrides?: CmsStoredOverrides): CmsContentDetail {
  const basePlacement = buildPlacement(client, "post", post.slug);
  return {
    id: post.id,
    kind: "post",
    title: post.title,
    slug: post.slug,
    status: post.status as CmsContentDetail["status"],
    authoringMode: overrides?.authoringMode ?? "ai-assisted",
    excerpt: post.excerpt ?? null,
    featuredImage: post.featuredImage ?? null,
    tags: post.tags ?? [],
    seo: {
      title: post.seoTitle ?? null,
      description: post.seoDescription ?? null,
      keywords: post.seoKeywords ?? [],
      canonicalUrl: null,
    },
    placement: mergePlacement(basePlacement, overrides?.placement),
    distributionChannels: overrides?.distributionChannels ?? ["site", "blog-index", "newsletter", "subscriber-email", "rss", "seo-sitemap"],
    publishedAt: toIsoString(post.publishedAt),
    updatedAt: post.updatedAt?.toISOString() || post.createdAt.toISOString(),
    body: post.content,
    previewText: post.excerpt ?? null,
    structuredDataType: "BlogPosting",
    relatedItemIds: post.topicId ? [post.topicId] : [],
    metadata: {
      authorId: post.authorId ?? null,
      readCount: post.readCount,
      shareCount: post.shareCount,
      topicId: post.topicId ?? null,
      researchJobId: post.researchJobId ?? null,
    },
  };
}

function mapService(client: PlatformClientConfig, service: ServiceRecord, overrides?: CmsStoredOverrides): CmsContentDetail {
  const normalizedSlug = service.slug.replace(/^\/+/, "") || `service-${service.id}`;
  const basePlacement = buildPlacement(client, "service", normalizedSlug);

  return {
    id: service.id,
    kind: "service",
    title: service.title,
    slug: normalizedSlug,
    status: service.isActive ? "published" : "draft",
    authoringMode: overrides?.authoringMode ?? "manual",
    excerpt: service.header || service.description || null,
    featuredImage: null,
    tags: [],
    seo: {
      title: service.title,
      description: service.description || null,
      keywords: service.keyDetails ?? [],
      canonicalUrl: null,
    },
    placement: mergePlacement(basePlacement, overrides?.placement),
    distributionChannels: overrides?.distributionChannels ?? ["site", "seo-sitemap"],
    publishedAt: service.isActive ? toIsoString(service.createdAt) : null,
    updatedAt: service.updatedAt?.toISOString() || service.createdAt.toISOString(),
    body: service.description,
    previewText: service.header || null,
    structuredDataType: "Service",
    relatedItemIds: [],
    metadata: {
      badge: service.badge,
      icon: service.icon,
      accentColor: service.accentColor,
      keyDetails: service.keyDetails ?? [],
      showPrice: service.showPrice,
      price: service.price ?? null,
      displayOrder: service.displayOrder,
    },
  };
}

function toSummary(item: CmsContentDetail): CmsContentSummary {
  return {
    id: item.id,
    kind: item.kind,
    title: item.title,
    slug: item.slug,
    status: item.status,
    authoringMode: item.authoringMode,
    excerpt: item.excerpt,
    featuredImage: item.featuredImage,
    tags: item.tags,
    seo: item.seo,
    placement: item.placement,
    distributionChannels: item.distributionChannels,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
  };
}

export class ClientCmsRepository implements CmsRepository {
  constructor(
    private readonly client: PlatformClientConfig,
    private readonly blog: BlogRepository,
    private readonly services: ServicesRepository,
    private readonly settings: CmsSettingsStore,
  ) {}

  async listItems(filters?: CmsListFilters): Promise<CmsContentSummary[]> {
    const overrides = await this.getOverrides();
    const items: CmsContentDetail[] = [];

    if (!filters?.kind || filters.kind === "post") {
      const posts = await this.blog.getPosts(filters?.status);
      items.push(...posts.map((post) => mapPost(this.client, post, overrides[buildOverrideKey("post", post.id)])));
    }

    if (!filters?.kind || filters.kind === "service") {
      const services = await this.services.getServices();
      const filteredServices = filters?.status === "published"
        ? services.filter((service) => service.isActive)
        : services;
      items.push(...filteredServices.map((service) => mapService(this.client, service, overrides[buildOverrideKey("service", service.id)])));
    }

    return items
      .filter((item) => filters?.includeArchived ? true : item.status !== "archived")
      .sort((a, b) => {
        const aTime = itemDateValue(a);
        const bTime = itemDateValue(b);
        return bTime - aTime;
      })
      .map(toSummary);
  }

  async getItemBySlug(kind: CmsContentKind, slug: string): Promise<CmsContentDetail | undefined> {
    const overrides = await this.getOverrides();
    if (kind === "post") {
      const post = await this.blog.getPostBySlug(slug);
      return post ? mapPost(this.client, post, overrides[buildOverrideKey("post", post.id)]) : undefined;
    }
    if (kind === "service") {
      const services = await this.services.getServices();
      const service = services.find((entry) => entry.slug.replace(/^\/+/, "") === slug);
      return service ? mapService(this.client, service, overrides[buildOverrideKey("service", service.id)]) : undefined;
    }
    return undefined;
  }

  async getItemById(kind: CmsContentKind, id: number): Promise<CmsContentDetail | undefined> {
    const overrides = await this.getOverrides();
    if (kind === "post") {
      const post = await this.blog.getPostById(id);
      return post ? mapPost(this.client, post, overrides[buildOverrideKey("post", post.id)]) : undefined;
    }
    if (kind === "service") {
      const service = await this.services.getServiceById(id);
      return service ? mapService(this.client, service, overrides[buildOverrideKey("service", service.id)]) : undefined;
    }
    return undefined;
  }

  async createItem(input: CmsItemMutationInput, actorUserId: number): Promise<CmsContentDetail> {
    if (input.kind === "post") {
      const slug = await this.resolvePostSlug(input.title, input.slug);
      const normalizedStatus = input.status ?? "draft";
      const post = await this.blog.createPost({
        title: input.title,
        slug,
        content: input.body ?? "",
        excerpt: input.excerpt ?? null,
        featuredImage: input.featuredImage ?? null,
        authorId: actorUserId,
        status: normalizedStatus,
        tags: input.tags ?? [],
        seoTitle: input.seo?.title ?? null,
        seoDescription: input.seo?.description ?? null,
        seoKeywords: input.seo?.keywords ?? [],
        publishedAt: normalizedStatus === "published" ? new Date() : null,
      });
      await this.saveOverrides("post", post.id, input);
      return (await this.getItemById("post", post.id))!;
    }

    if (input.kind === "service") {
      const services = await this.services.getServices();
      const maxOrder = services.length > 0 ? Math.max(...services.map((service) => service.displayOrder)) : -1;
      const service = await this.services.createService({
        title: input.title.trim(),
        badge: asString(input.metadata?.badge, ""),
        header: input.excerpt ?? input.previewText ?? "",
        description: input.body ?? "",
        keyDetails: asStringArray(input.metadata?.keyDetails),
        icon: asString(input.metadata?.icon, "Wrench"),
        slug: normalizeServiceSlug(input.slug ?? input.title),
        accentColor: asString(input.metadata?.accentColor, "#5D3FD3"),
        showPrice: asBoolean(input.metadata?.showPrice, false),
        price: asNullableString(input.metadata?.price),
        isActive: input.status === "published",
        displayOrder: asNumber(input.metadata?.displayOrder, maxOrder + 1),
      });
      await this.saveOverrides("service", service.id, input);
      return (await this.getItemById("service", service.id))!;
    }

    throw new Error(`CMS createItem does not yet support kind ${input.kind}`);
  }

  async updateItem(kind: CmsContentKind, id: number, input: Partial<CmsItemMutationInput>): Promise<CmsContentDetail | undefined> {
    if (kind === "post") {
      const existing = await this.blog.getPostById(id);
      if (!existing) {
        return undefined;
      }

      const updates: Partial<PostRecord> = {};
      if (typeof input.title === "string" && input.title.trim()) {
        updates.title = input.title;
        updates.slug = await this.resolvePostSlug(input.title, input.slug, id);
      } else if (typeof input.slug === "string") {
        updates.slug = await this.resolvePostSlug(existing.title, input.slug, id);
      }
      if (input.body !== undefined) updates.content = input.body;
      if (input.excerpt !== undefined) updates.excerpt = input.excerpt;
      if (input.featuredImage !== undefined) updates.featuredImage = input.featuredImage;
      if (input.tags !== undefined) updates.tags = input.tags;
      if (input.status !== undefined) updates.status = input.status;
      if (input.seo?.title !== undefined) updates.seoTitle = input.seo.title ?? null;
      if (input.seo?.description !== undefined) updates.seoDescription = input.seo.description ?? null;
      if (input.seo?.keywords !== undefined) updates.seoKeywords = input.seo.keywords;
      if (input.status === "published" && !existing.publishedAt) {
        updates.publishedAt = new Date();
      }

      await this.blog.updatePost(id, updates);
      await this.saveOverrides("post", id, input);
      return this.getItemById("post", id);
    }

    if (kind === "service") {
      const existing = await this.services.getServiceById(id);
      if (!existing) {
        return undefined;
      }

      const updates: Partial<ServiceRecord> = {};
      if (typeof input.title === "string" && input.title.trim()) updates.title = input.title.trim();
      if (input.excerpt !== undefined) updates.header = input.excerpt ?? "";
      if (input.body !== undefined) updates.description = input.body;
      if (input.slug !== undefined) updates.slug = normalizeServiceSlug(input.slug || existing.slug || existing.title);
      if (input.status !== undefined) updates.isActive = input.status === "published";
      if (input.metadata?.badge !== undefined) updates.badge = asString(input.metadata.badge, "");
      if (input.metadata?.keyDetails !== undefined) updates.keyDetails = asStringArray(input.metadata.keyDetails);
      if (input.metadata?.icon !== undefined) updates.icon = asString(input.metadata.icon, existing.icon);
      if (input.metadata?.accentColor !== undefined) updates.accentColor = asString(input.metadata.accentColor, existing.accentColor);
      if (input.metadata?.showPrice !== undefined) updates.showPrice = asBoolean(input.metadata.showPrice, existing.showPrice);
      if (input.metadata?.price !== undefined) updates.price = asNullableString(input.metadata.price);
      if (input.metadata?.displayOrder !== undefined) updates.displayOrder = asNumber(input.metadata.displayOrder, existing.displayOrder);

      await this.services.updateService(id, updates);
      await this.saveOverrides("service", id, input);
      return this.getItemById("service", id);
    }

    return undefined;
  }

  async publishItem(kind: CmsContentKind, id: number): Promise<CmsContentDetail | undefined> {
    if (kind === "post") {
      const existing = await this.blog.getPostById(id);
      if (!existing) {
        return undefined;
      }
      await this.blog.updatePost(id, {
        status: "published",
        publishedAt: existing.publishedAt ?? new Date(),
      });
      return this.getItemById("post", id);
    }

    if (kind === "service") {
      const existing = await this.services.getServiceById(id);
      if (!existing) {
        return undefined;
      }
      await this.services.updateService(id, { isActive: true });
      return this.getItemById("service", id);
    }

    return undefined;
  }

  async listSubscribers(status?: string): Promise<CmsSubscriberSummary[]> {
    const subscribers = await this.blog.getSubscribers(status);
    return subscribers.map((subscriber) => ({
      id: subscriber.id,
      email: subscriber.email,
      name: subscriber.name ?? null,
      status: subscriber.status,
      createdAt: subscriber.createdAt.toISOString(),
    }));
  }

  async createSubscriber(input: { email: string; name?: string | null }): Promise<CmsSubscriberSummary> {
    const existing = await this.blog.getSubscriberByEmail(input.email);
    if (existing) {
      return {
        id: existing.id,
        email: existing.email,
        name: existing.name ?? null,
        status: existing.status,
        createdAt: existing.createdAt.toISOString(),
      };
    }

    const created = await this.blog.createSubscriber({
      email: input.email,
      name: input.name ?? null,
      status: "active",
      unsubscribeToken: crypto.randomBytes(24).toString("hex"),
    });

    return {
      id: created.id,
      email: created.email,
      name: created.name ?? null,
      status: created.status,
      createdAt: created.createdAt.toISOString(),
    };
  }

  async buildNewsletterPreview(kind: CmsContentKind, id: number): Promise<CmsNewsletterPreview | undefined> {
    const item = await this.getItemById(kind, id);
    if (!item) {
      return undefined;
    }

    const activeSubscribers = await this.blog.getSubscribers("active");
    const previewText = item.previewText ?? item.excerpt ?? null;
    const htmlContent = renderNewsletterHtml(this.client, item);

    return {
      subject: buildNewsletterSubject(this.client, item),
      previewText,
      audienceSegment: this.client.cms.newsletter.defaultAudienceSegment,
      includedContentIds: [item.id],
      sendAt: null,
      recipientCount: activeSubscribers.length,
      htmlContent,
    };
  }

  async createNewsletterDraftFromItem(kind: CmsContentKind, id: number): Promise<{ newsletterId: number; preview: CmsNewsletterPreview } | undefined> {
    const preview = await this.buildNewsletterPreview(kind, id);
    if (!preview) {
      return undefined;
    }

    const newsletter = await this.blog.createNewsletter({
      subject: preview.subject,
      htmlContent: preview.htmlContent || "",
      status: this.client.cms.newsletter.requirePreviewApproval ? "draft" : "approved",
      sentAt: null,
      recipientCount: preview.recipientCount ?? 0,
    });

    return {
      newsletterId: newsletter.id,
      preview,
    };
  }

  private async getOverrides(): Promise<CmsOverrideMap> {
    const raw = await this.settings.getSetting(CMS_OVERRIDES_KEY);
    if (!raw) {
      return {};
    }

    try {
      const parsed = JSON.parse(raw) as CmsOverrideMap;
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  private async saveOverrides(kind: SupportedCmsKind, id: number, input: Partial<CmsItemMutationInput>) {
    const overrides = await this.getOverrides();
    const key = buildOverrideKey(kind, id);
    const next: CmsStoredOverrides = {
      ...(overrides[key] ?? {}),
    };

    if (input.placement) {
      next.placement = {
        ...(next.placement ?? {}),
        ...input.placement,
        navigation: input.placement.navigation
          ? {
            ...(next.placement?.navigation ?? {}),
            ...input.placement.navigation,
          }
          : next.placement?.navigation,
        presentation: input.placement.presentation
          ? {
            ...(next.placement?.presentation ?? {}),
            ...input.placement.presentation,
          }
          : next.placement?.presentation,
      };
    }
    if (input.distributionChannels) {
      next.distributionChannels = input.distributionChannels;
    }
    if (input.authoringMode) {
      next.authoringMode = input.authoringMode;
    }

    overrides[key] = next;
    await this.settings.setSetting(CMS_OVERRIDES_KEY, JSON.stringify(overrides));
  }

  private async resolvePostSlug(title: string, requestedSlug?: string, existingId?: number) {
    let slug = slugify(requestedSlug || title);
    if (!slug) {
      slug = `post-${Date.now().toString(36)}`;
    }

    const existing = await this.blog.getPostBySlug(slug);
    if (existing && existing.id !== existingId) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }
    return slug;
  }
}

function itemDateValue(item: CmsContentDetail) {
  return Date.parse(item.publishedAt || item.updatedAt || new Date(0).toISOString());
}

export function createClientCmsRepository(
  client: PlatformClientConfig,
  blog: BlogRepository,
  services: ServicesRepository,
  settings: CmsSettingsStore,
): CmsRepository {
  return new ClientCmsRepository(client, blog, services, settings);
}

function asString(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function asNullableString(value: unknown) {
  return typeof value === "string" ? value : null;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}

function asBoolean(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function asNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function normalizeServiceSlug(value: string) {
  const normalized = slugify(value);
  return normalized ? `/${normalized}` : "";
}

function buildNewsletterSubject(client: PlatformClientConfig, item: CmsContentDetail) {
  if (client.cms.newsletter.allowAiSubjectLines) {
    return `${client.displayName}: ${item.title}`;
  }
  return item.title;
}

function renderNewsletterHtml(client: PlatformClientConfig, item: CmsContentDetail) {
  const detailPath = item.placement.detailPagePath || `/${item.slug}`;
  const previewText = item.previewText ?? item.excerpt ?? "";
  return [
    `<h1>${escapeHtml(item.title)}</h1>`,
    previewText ? `<p>${escapeHtml(previewText)}</p>` : "",
    `<div>${escapeHtml(item.body.slice(0, 1200))}</div>`,
    `<p><a href="${detailPath}">Read more on ${escapeHtml(client.displayName)}</a></p>`,
  ].filter(Boolean).join("");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}
