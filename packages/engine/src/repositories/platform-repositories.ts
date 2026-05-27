import type { AuthRepository } from "./auth-repository";
import type { BlogRepository } from "./blog-repository";
import type { GalleryRepository } from "./gallery-repository";
import type { LeadsRepository } from "./leads-repository";
import type { RatingsRepository } from "./ratings-repository";
import type { ServicesRepository } from "./services-repository";

export interface PlatformRepositories {
  auth: AuthRepository;
  leads: LeadsRepository;
  blog: BlogRepository;
  services: ServicesRepository;
  gallery: GalleryRepository;
  ratings: RatingsRepository;
}
