import type { EntityTimestamps, IdentifiedRecord } from "./core";

export interface ServiceRecord extends IdentifiedRecord, EntityTimestamps {
  title: string;
  badge: string;
  header: string;
  description: string;
  keyDetails: string[] | null;
  icon: string;
  slug: string;
  accentColor: string;
  showPrice: boolean;
  price?: string | null;
  isActive: boolean;
  displayOrder: number;
}

export interface CreateServiceInput {
  title: string;
  badge?: string;
  header?: string;
  description?: string;
  keyDetails?: string[];
  icon?: string;
  slug?: string;
  accentColor?: string;
  showPrice?: boolean;
  price?: string | null;
  isActive?: boolean;
  displayOrder?: number;
}
