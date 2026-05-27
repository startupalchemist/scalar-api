export interface GalleryItemRecord {
  id: number;
  src: string;
  alt: string;
  badge: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface GallerySectionRecord {
  id: number;
  name: string;
  serviceSlug?: string | null;
  displayOrder: number;
  isActive: boolean;
  items: GalleryItemRecord[];
}
