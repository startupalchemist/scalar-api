# Phase 1 Engine Extraction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first reusable shared-platform code layer for the repo family by extracting normalized contracts, client config, and engine module boundaries for the shared service-business feature set.

**Architecture:** Keep this phase deliberately thin. Do not migrate full business logic yet. Instead, create a stable target structure that mirrors the existing seam in the source repos: contracts, config, and engine modules. Base the contractor core on `Reign-Services-Tx` with superset inputs from `tachyonbuilt-contracting`, while keeping Creations-by-Oracle as an optional domain family instead of forcing it into contractor modules.

**Tech Stack:** TypeScript, Node package workspaces, Vite/React app family, Express, Drizzle, Zod

---

### Task 1: Create Phase 1 package structure

**Files:**
- Create: `platform-consolidation/packages/contracts/package.json`
- Create: `platform-consolidation/packages/contracts/tsconfig.json`
- Create: `platform-consolidation/packages/contracts/src/index.ts`
- Create: `platform-consolidation/packages/config/package.json`
- Create: `platform-consolidation/packages/config/tsconfig.json`
- Create: `platform-consolidation/packages/config/src/index.ts`
- Create: `platform-consolidation/packages/engine/package.json`
- Create: `platform-consolidation/packages/engine/tsconfig.json`
- Create: `platform-consolidation/packages/engine/src/index.ts`

- [ ] Step 1: Add workspace package manifests and tsconfig files
- [ ] Step 2: Add empty source entrypoints for the three shared packages
- [ ] Step 3: Verify the package layout exists with `find platform-consolidation/packages -maxdepth 3 -type f | sort`

### Task 2: Extract normalized platform contracts

**Files:**
- Create: `platform-consolidation/packages/contracts/src/core/types.ts`
- Create: `platform-consolidation/packages/contracts/src/auth/contracts.ts`
- Create: `platform-consolidation/packages/contracts/src/leads/contracts.ts`
- Create: `platform-consolidation/packages/contracts/src/blog/contracts.ts`
- Create: `platform-consolidation/packages/contracts/src/services/contracts.ts`
- Create: `platform-consolidation/packages/contracts/src/gallery/contracts.ts`
- Modify: `platform-consolidation/packages/contracts/src/index.ts`

- [ ] Step 1: Define shared cross-client enums and base types
- [ ] Step 2: Define auth, lead, blog, service, and gallery DTOs from the overlapping source-repo shape
- [ ] Step 3: Export contracts from the package barrel
- [ ] Step 4: Verify exports by reading the generated package files

### Task 3: Extract client configuration

**Files:**
- Create: `platform-consolidation/packages/config/src/types.ts`
- Create: `platform-consolidation/packages/config/src/clients/dent-society.ts`
- Create: `platform-consolidation/packages/config/src/clients/dent-society-dfw.ts`
- Create: `platform-consolidation/packages/config/src/clients/reign-services.ts`
- Create: `platform-consolidation/packages/config/src/clients/tachyonbuilt.ts`
- Create: `platform-consolidation/packages/config/src/clients/creations-by-oracle.ts`
- Modify: `platform-consolidation/packages/config/src/index.ts`

- [ ] Step 1: Define the shared client-config shape
- [ ] Step 2: Encode brand, theme, module flags, lead pipeline, and frontend traits for each client
- [ ] Step 3: Export all client configs and a lookup map
- [ ] Step 4: Verify the config files reflect repo-specific differences already identified

### Task 4: Create shared engine module boundaries

**Files:**
- Create: `platform-consolidation/packages/engine/src/core/module-types.ts`
- Create: `platform-consolidation/packages/engine/src/core/create-platform-context.ts`
- Create: `platform-consolidation/packages/engine/src/modules/auth/index.ts`
- Create: `platform-consolidation/packages/engine/src/modules/leads/index.ts`
- Create: `platform-consolidation/packages/engine/src/modules/blog/index.ts`
- Create: `platform-consolidation/packages/engine/src/modules/services/index.ts`
- Create: `platform-consolidation/packages/engine/src/modules/gallery/index.ts`
- Create: `platform-consolidation/packages/engine/src/modules/ratings/index.ts`
- Create: `platform-consolidation/packages/engine/src/modules/index.ts`
- Modify: `platform-consolidation/packages/engine/src/index.ts`

- [ ] Step 1: Define a minimal platform context and module manifest shape
- [ ] Step 2: Create the first shared domain module entrypoints
- [ ] Step 3: Create the engine barrel exports
- [ ] Step 4: Verify the engine tree matches the migration blueprint

### Task 5: Capture extraction notes for source-to-target mapping

**Files:**
- Create: `platform-consolidation/docs/phase-1-source-map.md`

- [ ] Step 1: Document which source repos feed which target modules
- [ ] Step 2: Record which repo is the authority when source behavior conflicts
- [ ] Step 3: Record deferred domains for later phases, including ecommerce, portal, email, and AI image/logo workflows
- [ ] Step 4: Verify the source map matches the implementation files created in this phase
