import type { PlatformModule } from "../../core/module-types";

export const authModule: PlatformModule = {
  key: "auth",
  description: "Shared staff authentication, session handling, and role-gated access control.",
};

export * from "./router";
