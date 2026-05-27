export interface ProductVariantRecord {
  id: number;
  sku: string;
  title: string;
  price: string;
  compareAtPrice: string | null;
  inventoryQuantity: number | null;
  optionValues: Record<string, string>;
  isActive: boolean;
}

export interface ProductRecord {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string;
  featuredImage: string | null;
  galleryImages: string[];
  price: string | null;
  compareAtPrice: string | null;
  currency: string;
  requiresShipping: boolean;
  isActive: boolean;
  displayOrder: number;
  variants: ProductVariantRecord[];
}

export interface ProductCmsMetadata {
  kind: "product";
  publishToSite: true;
  publishToBlogIndex: boolean;
  includeInSearch: boolean;
  showPrice: boolean;
  showInProductGrid: boolean;
  relatedPostIds: number[];
  relatedCollectionIds: number[];
}
