import type { ClientKey } from "@platform/contracts";
import { creationsByOracleConfig } from "./clients/creations-by-oracle";
import { dentSocietyDfwConfig } from "./clients/dent-society-dfw";
import { dentSocietyConfig } from "./clients/dent-society";
import { reignServicesConfig } from "./clients/reign-services";
import { tachyonbuiltConfig } from "./clients/tachyonbuilt";

export * from "./types";
export * from "./clients/creations-by-oracle";
export * from "./clients/dent-society-dfw";
export * from "./clients/dent-society";
export * from "./clients/reign-services";
export * from "./clients/tachyonbuilt";

export const clientConfigs = {
  "dent-society": dentSocietyConfig,
  "dent-society-dfw": dentSocietyDfwConfig,
  "reign-services": reignServicesConfig,
  "creations-by-oracle": creationsByOracleConfig,
  "tachyonbuilt": tachyonbuiltConfig,
} satisfies Record<ClientKey, unknown>;
