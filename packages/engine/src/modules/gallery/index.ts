import type { PlatformModule } from "../../core/module-types";

export const galleryModule: PlatformModule = {
  key: "gallery",
  description: "Public and admin gallery sections and items, including service-scoped gallery variants.",
  dependsOn: ["auth", "services"],
};

export * from "./router";
