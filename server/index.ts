import express, { type Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { seedRootUser } from "./auth";
import { storage } from "./storage";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(cookieParser());
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

async function runOneTimePDRCleanup(): Promise<void> {
  try {
    // v2 supersedes v1: no date filter, deletes ALL published/queued legacy posts
    const flag = await storage.getSetting("pdr_cleanup_v2");
    if (flag === "done") return;

    const allPosts = await storage.getPosts();
    const legacyPosts = allPosts.filter((p) => p.status === "published" || p.status === "queued");
    const removedPostIds = new Set(legacyPosts.map((p) => p.id));
    let deletedPosts = 0;
    for (const post of legacyPosts) {
      await storage.deletePost(post.id);
      deletedPosts++;
    }

    // Hard-delete topics linked to removed posts
    const allTopics = await storage.getTopics();
    let deletedTopics = 0;
    for (const topic of allTopics) {
      if (topic.postId && removedPostIds.has(topic.postId)) {
        await storage.deleteTopic(topic.id);
        deletedTopics++;
      }
    }

    await storage.setSetting("pdr_cleanup_v2", "done");
    log(`[startup cleanup v2] Removed ${deletedPosts} legacy published/queued posts and ${deletedTopics} associated topics; ${allPosts.length - legacyPosts.length} draft posts preserved`);
  } catch (err) {
    log(`[startup cleanup] Failed: ${err}`);
  }
}

type SeedItem = { src: string; alt: string; badge?: string; displayOrder: number };
type SeedSection = { name: string; displayOrder: number; items: SeedItem[] };

async function seedGallery(): Promise<void> {
  try {
    const flag = await storage.getSetting("gallery_seeded_v1");
    if (flag === "done") return;

    const SECTIONS: SeedSection[] = [
      {
        name: "Project Spotlight",
        displayOrder: 0,
        items: [
          { src: "/gallery/spotlight-before-1.jpeg",   alt: "Before: bare patchy backyard",                badge: "Before",      displayOrder: 0 },
          { src: "/gallery/spotlight-progress-1.jpeg",  alt: "In Progress: gravel base and edging laid",   badge: "In Progress", displayOrder: 1 },
          { src: "/gallery/spotlight-after-1.jpeg",     alt: "After: lush turf with rock border",           badge: "After",       displayOrder: 2 },
          { src: "/gallery/spotlight-after-2.jpeg",     alt: "After: turf with flagstone and planter boxes",badge: "After",       displayOrder: 3 },
          { src: "/gallery/spotlight-after-3.jpeg",     alt: "After: flagstone patio and turf, tree feature",badge: "After",      displayOrder: 4 },
          { src: "/gallery/spotlight-after-4.jpeg",     alt: "After: golden hour full reveal",              badge: "After",       displayOrder: 5 },
        ],
      },
      {
        name: "Turf & Pavers",
        displayOrder: 1,
        items: [
          { src: "/gallery/pool-stepping-stones.webp",   alt: "Pool with turf and stepping stones",                  displayOrder: 0 },
          { src: "/gallery/pool-diamond-pavers.webp",    alt: "Pool with diamond turf and paver surround",           displayOrder: 1 },
          { src: "/gallery/outdoor-kitchen-pavers.webp", alt: "Covered outdoor kitchen with fire pit and pavers",    displayOrder: 2 },
          { src: "/gallery/firepit-pavers-night.webp",   alt: "Fire pit with turf grid at night",                   displayOrder: 3 },
          { src: "/gallery/aerial-pool-turf-1.jpeg",     alt: "Aerial view: pool with turf and paver install",       displayOrder: 4 },
          { src: "/gallery/aerial-pool-turf-2.jpeg",     alt: "Aerial view: pool and turf backyard",                displayOrder: 5 },
          { src: "/gallery/aerial-pool-turf-3.jpeg",     alt: "Aerial view: full turf backyard with pool",           displayOrder: 6 },
          { src: "/gallery/aerial-pool-turf-4.jpeg",     alt: "Aerial view: modern pool with turf and fire pit",     displayOrder: 7 },
        ],
      },
      {
        name: "Custom Patterns",
        displayOrder: 2,
        items: [
          { src: "/gallery/pattern-diamond-factory.jpeg", alt: "Custom diamond-cut turf pattern",          displayOrder: 0 },
          { src: "/gallery/pattern-floral-wall.jpeg",     alt: "Custom floral turf accent wall",           displayOrder: 1 },
          { src: "/gallery/pattern-circular-luxury.jpeg", alt: "Custom circular pattern on luxury estate", displayOrder: 2 },
        ],
      },
      {
        name: "Putting Greens",
        displayOrder: 3,
        items: [
          { src: "/gallery/putting-green-aerial-1.jpeg",  alt: "Aerial view: multi-hole putting green",   displayOrder: 0 },
          { src: "/gallery/putting-green-aerial-2.jpeg",  alt: "Aerial view: putting green alternate angle",displayOrder: 1 },
          { src: "/gallery/putting-green-gazebo.jpeg",    alt: "Putting green with backyard gazebo",       displayOrder: 2 },
          { src: "/gallery/putting-green-side-yard.jpeg", alt: "Dual putting green in side yard",          displayOrder: 3 },
        ],
      },
      {
        name: "Sports & Commercial",
        displayOrder: 4,
        items: [
          { src: "/gallery/sports-mini-soccer.jpeg",       alt: "Backyard mini soccer field with turf",   displayOrder: 0 },
          { src: "/gallery/sports-commercial-soccer.jpeg", alt: "Full indoor commercial soccer field",    displayOrder: 1 },
        ],
      },
      {
        name: "Outdoor Living",
        displayOrder: 5,
        items: [
          { src: "/gallery/outdoor-living-pergola.jpeg", alt: "Modern pergola with outdoor seating", displayOrder: 0 },
        ],
      },
      {
        name: "Residential",
        displayOrder: 6,
        items: [
          { src: "/gallery/residential-playground.jpeg", alt: "Children's playground on artificial turf",          displayOrder: 0 },
          { src: "/gallery/residential-frontyard.jpeg",  alt: "Clean front yard turf and pavers, aerial view", displayOrder: 1 },
        ],
      },
    ];

    for (const sectionData of SECTIONS) {
      const section = await storage.createGallerySection({
        name: sectionData.name,
        displayOrder: sectionData.displayOrder,
        isActive: true,
      });
      for (const item of sectionData.items) {
        await storage.createGalleryItem({
          sectionId: section.id,
          src: item.src,
          alt: item.alt,
          badge: item.badge ?? null,
          displayOrder: item.displayOrder,
          isActive: true,
        });
      }
    }

    await storage.setSetting("gallery_seeded_v1", "done");
    log(`[gallery seed] Seeded ${SECTIONS.length} sections with 26 images`);
  } catch (err) {
    log(`[gallery seed] Failed: ${err}`);
  }
}

(async () => {
  await seedRootUser();
  await runOneTimePDRCleanup();
  await seedGallery();
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Internal Server Error:", err);

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
