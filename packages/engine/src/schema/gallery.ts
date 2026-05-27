import type { EntityTimestamps, IdentifiedRecord } from "./core";

export interface GallerySectionRecord extends IdentifiedRecord, EntityTimestamps {
  name: string;
  serviceSlug?: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface GalleryItemRecord extends IdentifiedRecord, EntityTimestamps {
  sectionId: number;
  src: string;
  alt: string;
  badge?: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface GallerySectionWithItems extends GallerySectionRecord {
  items: GalleryItemRecord[];
}
