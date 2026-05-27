import { clientConfigs } from "@platform/config";
import type { ClientConfig } from "@platform/config";
import type { ClientKey } from "@platform/contracts";
import type { PlatformContext } from "./module-types";
import { createPlatformRouter, type PlatformRouterDependencies } from "./create-platform-router";

export function getClientConfig(clientKey: ClientKey): ClientConfig {
  return clientConfigs[clientKey] as ClientConfig;
}

export function createPlatformContext(clientKey: ClientKey): PlatformContext {
  return {
    client: getClientConfig(clientKey),
  };
}

export function createClientPlatformRouter(clientKey: ClientKey, dependencies: Omit<PlatformRouterDependencies, "client">) {
  return createPlatformRouter({
    client: getClientConfig(clientKey),
    ...dependencies,
  });
}
