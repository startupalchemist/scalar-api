import type {
  GalleryItemRecord,
  GallerySectionRecord,
  GallerySectionWithItems,
} from "../schema";

export interface GalleryRepository {
  getPublicGallery(): Promise<{ sections: GallerySectionWithItems[] }>;
  getAdminGallery(): Promise<{ sections: GallerySectionWithItems[] }>;
  getGalleryByServiceSlug?(slug: string): Promise<{ sections: GallerySectionWithItems[] }>;
  getGallerySections(): Promise<GallerySectionRecord[]>;
  getGallerySectionById(id: number): Promise<GallerySectionRecord | undefined>;
  createGallerySection(input: Omit<GallerySectionRecord, "id" | "createdAt">): Promise<GallerySectionRecord>;
  updateGallerySection(id: number, updates: Partial<GallerySectionRecord>): Promise<GallerySectionRecord | undefined>;
  deleteGallerySection(id: number): Promise<void>;
  getGalleryItems(sectionId?: number): Promise<GalleryItemRecord[]>;
  getGalleryItemById(id: number): Promise<GalleryItemRecord | undefined>;
  createGalleryItem(input: Omit<GalleryItemRecord, "id" | "createdAt">): Promise<GalleryItemRecord>;
  updateGalleryItem(id: number, updates: Partial<GalleryItemRecord>): Promise<GalleryItemRecord | undefined>;
  deleteGalleryItem(id: number): Promise<void>;
}
