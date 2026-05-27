import type { PlatformModule } from "../../core/module-types";

export const leadsModule: PlatformModule = {
  key: "leads",
  description: "Lead intake, status pipelines, CRM views, and client-specific intake schema.",
  dependsOn: ["auth"],
};

export * from "./router";
