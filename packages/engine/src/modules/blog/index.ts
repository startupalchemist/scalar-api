import type { PlatformModule } from "../../core/module-types";

export const blogModule: PlatformModule = {
  key: "blog",
  description: "Posts, topics, publishing queue, and AI-assisted content workflows.",
  dependsOn: ["auth", "seo", "marketing-automation"],
};

export * from "./router";
