import type { PlatformModule } from "../../core/module-types";

export const servicesModule: PlatformModule = {
  key: "services",
  description: "Service catalog CRUD and service-detail content used by service-business frontends.",
  dependsOn: ["auth"],
};

export * from "./router";
