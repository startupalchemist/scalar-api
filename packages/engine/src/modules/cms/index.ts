import type { PlatformModule } from "../../core/module-types";

export const cmsModule: PlatformModule = {
  key: "cms",
  description: "Unified content management surface for posts, services, and future product and art content.",
  dependsOn: ["auth", "blog", "services"],
};

export * from "./router";
