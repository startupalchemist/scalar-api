import type { PlatformModule } from "../../core/module-types";

export const ratingsModule: PlatformModule = {
  key: "ratings",
  description: "Customer sentiment and rating capture for service completion workflows.",
  dependsOn: ["leads"],
};

export * from "./router";
