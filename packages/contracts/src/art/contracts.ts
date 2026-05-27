export interface ArtPieceRecord {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string;
  featuredImage: string | null;
  galleryImages: string[];
  medium: string | null;
  dimensions: string | null;
  availability: "available" | "reserved" | "sold" | "commission-only";
  editionSize: number | null;
  price: string | null;
  isActive: boolean;
  displayOrder: number;
}

export interface ArtPieceCmsMetadata {
  kind: "art-piece";
  publishToSite: true;
  publishToBlogIndex: boolean;
  includeInSearch: boolean;
  showPrice: boolean;
  showInArtGrid: boolean;
  availableForPurchase: boolean;
  availableForCommissionReference: boolean;
  relatedPostIds: number[];
  relatedCollectionIds: number[];
}

export interface CollectionRecord {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string;
  featuredImage: string | null;
  isActive: boolean;
  displayOrder: number;
  itemIds: number[];
}

export interface CollectionCmsMetadata {
  kind: "collection";
  publishToSite: true;
  publishToBlogIndex: boolean;
  includeInSearch: boolean;
  showInArtGrid: boolean;
  showInNavigation: boolean;
  relatedPostIds: number[];
}
