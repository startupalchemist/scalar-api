import { Router } from "express";
import type { ClientConfig } from "@platform/config";
import { createAuthRouter, type AuthRouteDependencies } from "../modules/auth/router";
import { createBlogRouter, type BlogRouteDependencies } from "../modules/blog/router";
import { createCmsRouter, type CmsRouteDependencies } from "../modules/cms/router";
import { createGalleryRouter, type GalleryRouteDependencies } from "../modules/gallery/router";
import { createLeadsRouter, type LeadsRouteDependencies } from "../modules/leads/router";
import { createRatingsRouter, type RatingsRouteDependencies } from "../modules/ratings/router";
import { createSettingsRouter, type SettingsRouteDependencies } from "../modules/settings/router";
import { createServicesRouter, type ServicesRouteDependencies } from "../modules/services/router";

export interface PlatformRouterDependencies {
  client: ClientConfig;
  auth: AuthRouteDependencies;
  blog: BlogRouteDependencies;
  cms: CmsRouteDependencies;
  gallery: GalleryRouteDependencies;
  leads: LeadsRouteDependencies;
  ratings: RatingsRouteDependencies;
  settings: SettingsRouteDependencies;
  services: ServicesRouteDependencies;
}

export function createPlatformRouter(deps: PlatformRouterDependencies) {
  const router = Router();

  if (deps.client.modules.auth) {
    router.use(createAuthRouter(deps.auth));
  }
  if (deps.client.modules.cms) {
    router.use(createCmsRouter(deps.cms));
  }
  if (deps.client.modules.blog) {
    router.use(createBlogRouter(deps.blog));
  }
  if (deps.client.modules.gallery) {
    router.use(createGalleryRouter(deps.gallery));
  }
  if (deps.client.modules.leads) {
    router.use(createLeadsRouter(deps.leads));
  }
  if (deps.client.modules.ratings) {
    router.use(createRatingsRouter(deps.ratings));
  }
  if (deps.client.modules.blog || deps.client.modules.seo || deps.client.modules.webhooks) {
    router.use(createSettingsRouter(deps.settings));
  }
  if (deps.client.modules.services) {
    router.use(createServicesRouter(deps.services));
  }

  return router;
}
