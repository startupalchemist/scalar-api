export interface ServiceRecord {
  id: number;
  title: string;
  slug: string;
  badge: string;
  header: string;
  description: string;
  keyDetails: string[];
  icon: string;
  accentColor: string;
  showPrice: boolean;
  price: string | null;
  isActive: boolean;
  displayOrder: number;
}

export interface ServiceCmsMetadata {
  kind: "service";
  publishToSite: true;
  publishToBlogIndex: false;
  includeInSearch: boolean;
  showInServiceGrid: boolean;
  showInNavigationDropdown: boolean;
  relatedPostIds: number[];
}
