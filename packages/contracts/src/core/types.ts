export const clientKeys = [
  "dent-society",
  "dent-society-dfw",
  "reign-services",
  "creations-by-oracle",
  "tachyonbuilt",
] as const;

export type ClientKey = (typeof clientKeys)[number];

export const moduleKeys = [
  "cms",
  "auth",
  "users",
  "leads",
  "blog",
  "seo",
  "services",
  "gallery",
  "ratings",
  "webhooks",
  "notifications",
  "marketing-automation",
  "ecommerce",
  "art-commissions",
  "contractor-portal",
  "crm",
  "calendar",
  "pricing",
  "chat",
] as const;

export type ModuleKey = (typeof moduleKeys)[number];

export const userRoles = ["root", "admin", "editor", "staff", "customer"] as const;
export type UserRole = (typeof userRoles)[number];

export const businessVerticals = [
  "pdr",
  "contractor",
  "artist-commerce",
] as const;
export type BusinessVertical = (typeof businessVerticals)[number];

export const themeModes = ["dark", "light", "mixed"] as const;
export type ThemeMode = (typeof themeModes)[number];

export interface BrandTheme {
  mode: ThemeMode;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

export interface ParticleLogoSettings {
  enabled: boolean;
  sourceAssetPath: string;
  morphFromUploadedLogo: boolean;
  sampleResolution: number;
  primaryColor: string;
  secondaryColor: string;
  dimColor: string;
}

export interface ModuleFlags {
  cms: boolean;
  auth: boolean;
  leads: boolean;
  blog: boolean;
  services: boolean;
  gallery: boolean;
  ratings: boolean;
  webhooks: boolean;
  seo: boolean;
  notifications: boolean;
  marketingAutomation: boolean;
  ecommerce: boolean;
  artCommissions: boolean;
  contractorPortal: boolean;
  crm: boolean;
  calendar: boolean;
  pricing: boolean;
  chat: boolean;
}
