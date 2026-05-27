import type { ClientConfig } from "@platform/config";
import type { ModuleKey } from "@platform/contracts";
import type { PlatformRepositories } from "../repositories";

export interface PlatformContext {
  client: ClientConfig;
  repositories?: Partial<PlatformRepositories>;
}

export interface PlatformModule {
  key: ModuleKey;
  description: string;
  dependsOn?: ModuleKey[];
}
