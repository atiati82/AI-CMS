# Project Context: Andara Ionic CMS

## Overview
Andara Ionic CMS is a specialized Content Management System for ionic mineral products, integrating scientific research with e-commerce.

## Technology Stack
- **Frontend**: React (v18+), TypeScript, Vite
- **Styling**: Tailwind CSS (presumed), Custom CSS (Andara Glass Styles)
- **Backend**: Node.js, Express, Drizzle ORM
- **Database**: SQLite (local dev), PostgreSQL (production typically, check drizzle config)
- **Package Manager**: npm

## Architecture
- Monorepo-like structure with `client/` and `server/` directories.
- Shared types in `shared/` (if applicable).

## Coding Guidelines
- Use Functional Components with Hooks.
- Strict TypeScript usage.
- Follow the "Andara Design System" for UI (Glassmorphism, Liquid Alchemy).

---

## Layout Protection (CRITICAL)

The following layout files are **CANONICAL** and must **NEVER** be overwritten:

| Layout | Path |
|--------|------|
| Landing | `client/src/templates/gpt/LandingLayout.tsx` |
| Product | `client/src/templates/gpt/ProductLayout.tsx` |
| Article | `client/src/templates/gpt/ArticleLayout.tsx` |
| Utility | `client/src/templates/gpt/UtilityLayout.tsx` |

These files contain the signature `CANONICAL_LAYOUT_V1`.

### AI Agent Rules

1. **Never edit canonical layouts** — Only consume via props
2. **Generate page content** in `client/src/pages/` or `client/src/generated/`
3. **Never restore old navigation, icons, or prior layout snapshots**
4. **Create NEW components** in `/generated/` if referenced components are missing
5. **Check before overwriting** — If a file contains `CANONICAL_LAYOUT_V1`, do not modify it

### Dev Server Rules

- UI and API both run on **port 3000** in development
- Express serves Vite middleware (no separate Vite server)
- Static serving is **production-only**
- Always use `npm run dev` for local development

### Build Pipeline Guards

Run `npm run guard:layouts` before any build to verify layout integrity:

```bash
npm run guard:layouts  # Standalone check
npm run build          # Automatically runs prebuild guard
```
