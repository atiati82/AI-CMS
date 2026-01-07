<!-- Auto-generated: tailored Copilot instructions for andara-ionic-cms -->
# Copilot / AI Agent Instructions — Andara Ionic CMS

Purpose: Give an AI coding agent the minimal, high-value context needed to be productive editing and extending this repo.

- **Big picture**: This is a monorepo-style app with a server (Express + TypeScript) and a Vite React client under `client/`. The server bootstraps AI agents and background jobs, and the client is built by Vite and served from `dist/public` in production.

- **Entry points**:
  - Server: [server/index.ts](server/index.ts#L1) — starts Express, initializes AI agents (`server/agents/orchestrator.ts`), cron jobs, and Stripe sync. Note the Stripe webhook is registered before `express.json()` to preserve `raw` body.
  - Client: Vite root is `client/` configured in [vite.config.ts](vite.config.ts#L1).

- **How to run locally** (most common tasks):
  - Dev all (runs client + server): `npm run dev:all` (uses `concurrently`).
  - Start only API (no Vite middleware): `npm run dev:api` (sets `NO_VITE_MIDDLEWARE=true`).
  - Run client dev server: `npm run dev:client` (Vite on port 5173).
  - Build client: `npm run build` (Vite build outputs to `dist/public`).
  - Production start: `npm run start` (expects built `dist/index.cjs` server bundle).

- **Important runtime/details for edits**:
  - Stripe webhook: See [server/index.ts](server/index.ts#L1). The route `/api/stripe/webhook` must be defined before JSON body parsing so signature verification works.
  - Vite middleware: In dev the server can proxy API requests to `http://localhost:3000` (see `vite.config.ts` proxy). The server conditionally mounts Vite middleware unless `NO_VITE_MIDDLEWARE=true`.
  - Sessions: Server uses Postgres-backed sessions via `connect-pg-simple` (see `server/index.ts`). Ensure `DATABASE_URL` and `SESSION_SECRET` env vars are set for session behavior.

- **AI agents & orchestration**:
  - Agent bootstrap: `initializeAgents()` in [server/agents/orchestrator.ts](server/agents/orchestrator.ts#L1) registers agents (content, seo, design, visual interpreter, research, orchestrator).
  - Intent routing: `server/services/intent-classifier.ts` and `server/agents/orchestrator.ts` map user messages to agent tasks; use `buildTaskInput()` patterns when adding new intents.
  - Workflows: Persistent workflow engine and templates live under `server/services/workflow-templates` and `server/services/workflow-engine` — prefer using templates rather than ad-hoc multi-step runs.

- **Project-specific conventions** (follow these exactly):
  - Code locations: Server code lives in `server/`, client code in `client/src/`, and shared utilities in `shared/`.
  - Path aliases: `@` -> `client/src`, `@shared` -> `shared` (see `tsconfig.json` and `vite.config.ts`). Use these aliases when editing client code.
  - Environment-first safety: `server/middleware/envValidator` is used at startup — adding required env vars must update validator tests.
  - Raw buffers: Where signature verification is needed (Stripe/webhooks) use `express.raw()` and validate Buffer payloads.

- **Build & CI notes**:
  - CI workflows are in `.github/workflows/*.yml`. Production server start expects `dist/index.cjs` to exist (`npm run start`).
  - Type checks: `npm run check` runs `tsc` (project uses `noEmit`).
  - Route checks: `npm run check:routes` runs `tsx scripts/check-routes.ts` to validate routes mapping.

- **Where to look for examples**:
  - AI orchestration and task routing: [server/agents/orchestrator.ts](server/agents/orchestrator.ts#L1)
  - Server bootstrap & lifecycle: [server/index.ts](server/index.ts#L1)
  - Vite + client setup: [vite.config.ts](vite.config.ts#L1)
  - TypeScript config & aliases: [tsconfig.json](tsconfig.json#L1)

- **When opening PRs**:
  - Keep server changes isolated under `server/` and client UI under `client/src/`.
  - Update `check:routes` script inputs if you add new endpoints.
  - If adding a new agent, register it in `server/agents/orchestrator.ts` and add any new workflow templates under `server/services/workflow-templates`.

If anything above is unclear or you want deeper examples (e.g., exact agent/tool APIs), tell me which area to expand and I will iterate.
