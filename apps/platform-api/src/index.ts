import cookieParser from "cookie-parser";
import express from "express";
import {
  createClientPlatformRouter,
  createClientCmsRepository,
  createContractorCoreDb,
  createDrizzleContractorCoreRepositories,
  createPgPool,
} from "@platform/engine";
import type { ClientKey } from "@platform/contracts";
import { clientConfigs } from "@platform/config";
import { createAuthHelpers, hashPassword, verifyPassword } from "./auth";
import { createWebhookDispatcher } from "./webhooks";

function getClientKey(): ClientKey {
  const configured = process.env.PLATFORM_CLIENT_KEY || "reign-services";

  if (!(configured in clientConfigs)) {
    throw new Error(`Unknown PLATFORM_CLIENT_KEY: ${configured}`);
  }

  return configured as ClientKey;
}

const clientKey = getClientKey();
const pool = createPgPool();
const db = createContractorCoreDb(pool);
const repositories = createDrizzleContractorCoreRepositories(db);
const cmsRepository = createClientCmsRepository(clientConfigs[clientKey], repositories.blog, repositories.services, repositories.ratings);
const auth = createAuthHelpers(repositories.auth);
const fireWebhooks = createWebhookDispatcher(repositories.ratings);

const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));

app.get("/healthz", (_req, res) => {
  res.json({
    ok: true,
    client: clientKey,
    modules: clientConfigs[clientKey].modules,
  });
});

app.use(createClientPlatformRouter(clientKey, {
  auth: {
    repository: repositories.auth,
    verifyPassword,
    hashPassword,
    createSession: auth.createSession,
    destroySession: auth.destroySession,
    authMiddleware: auth.authMiddleware,
    requireRole: auth.requireRole,
  },
  cms: {
    repository: cmsRepository,
    authMiddleware: auth.authMiddleware,
    requireRole: auth.requireRole,
  },
  blog: {
    repository: repositories.blog,
    authMiddleware: auth.authMiddleware,
    requireRole: auth.requireRole,
    hooks: {
      onPostPublished: (payload) => fireWebhooks("post.published", payload),
    },
  },
  gallery: {
    repository: repositories.gallery,
    authMiddleware: auth.authMiddleware,
    requireRole: auth.requireRole,
  },
  leads: {
    repository: repositories.leads,
    authMiddleware: auth.authMiddleware,
    requireRole: auth.requireRole,
    leadStatuses: clientConfigs[clientKey].leadPipeline.statuses,
    hooks: {
      onLeadCreated: (payload) => fireWebhooks("lead.created", payload),
      onLeadUpdated: (payload) => fireWebhooks("lead.updated", payload),
      onDelivered: async () => {
        // Sentiment email delivery will move here after the ratings module is extracted.
      },
    },
  },
  ratings: {
    repository: repositories.ratings,
    authMiddleware: auth.authMiddleware,
    requireRole: auth.requireRole,
  },
  settings: {
    repository: repositories.ratings,
    authMiddleware: auth.authMiddleware,
    requireRole: auth.requireRole,
  },
  services: {
    repository: repositories.services,
    authMiddleware: auth.authMiddleware,
    requireRole: auth.requireRole,
  },
}));

app.use((err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error("Unhandled API error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

const port = parseInt(process.env.PORT || "5000", 10);

app.listen(port, "0.0.0.0", () => {
  console.log(`platform-api serving ${clientKey} on port ${port}`);
});
