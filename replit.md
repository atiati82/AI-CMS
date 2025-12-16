# Andara Ionic - Primordial Ionic Sulfate Minerals Web Application

## Overview
Andara Ionic is a full-stack web application designed to showcase and sell primordial ionic sulfate mineral products. Its core purpose is to educate users through an extensive science library containing over 120 pages on water science, minerals, and bioelectric health. The application integrates e-commerce capabilities with a robust Content Management System (CMS), enabling non-technical administrators to manage all content, products, and articles. The project focuses on a single product family, aiming to provide comprehensive educational content about structured water and mineral science.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
The frontend uses React with TypeScript, Vite for bundling, Wouter for routing, and TanStack Query for server state management. The UI is built with Radix UI primitives, shadcn/ui (New York style), Tailwind CSS v4 for styling, and Framer Motion for animations, adhering to a "dark cosmic theme" (`Andara Template v0.8`) with specific color palettes and visual effects like glass morphism and glow. State management primarily utilizes React Query for data fetching and React hooks for local state.

### Backend
The backend is an Express.js application built with Node.js and TypeScript. It provides RESTful APIs for products, content, and administrative functions. Authentication for admin users is session-based, employing `express-session` and `bcrypt` for password hashing to secure CMS operations. The build process uses `esbuild` for the server and Vite for the client.

### Data Storage
PostgreSQL serves as the primary database, managed with Drizzle ORM for type-safe schema and queries. Key tables include `Clusters` (thematic content groupings), `Pages` (core content with templates, SEO, draft/publish workflow), `Products` (e-commerce details), `Science Articles` (educational content), and `Admin Users` (authentication). A storage abstraction layer (`server/storage.ts`) separates database interactions from business logic.

### Content Management System (CMS)
The CMS provides full CRUD operations for all content types, featuring a hierarchical page tree, inline editing with draft/publish workflows, content clustering, and tag-based filtering. It supports 18 specialized page templates for various content needs. The admin interface includes a dashboard, tabbed content management, tree view for pages, and content preview.

### AI Integration (BigMind Studio & AI Startup System)
The application incorporates a comprehensive AI-powered system called "BigMind Studio" and an "AI Startup System."
- **AI Startup System:** Converts text briefs into fully designed React pages (TSX, HTML, SEO metadata) using Gemini 2.0 Flash, a layout vocabulary, and a motion system.
- **BigMind Studio:** A content creation and CMS management system with a Chat panel (CMS Mode for database operations via function calling, Library Mode for strategic advice) and a Studio panel (Magic Page Creator wizard for AI-generated page creation). It also includes a Settings panel for AI preferences and prompt configuration.
- **BigMind Suggestions Manager:** Extracts, persists, and manages AI recommendations (e.g., content gaps, SEO improvements, visual/motion configs) for review and application.
- **Auto-Generated Featured Images:** When BigMind creates a page via createPage, it automatically generates a featured image prompt based on the page title and cluster color scheme (indigo for water, sky for minerals, etc.), creates a media asset slot, and triggers async image generation. The generated image is auto-applied as the page's featuredImage. Users can also manually manage images via the Media Library (regenerate, use as featured, delete).
- **Suggested Images Panel:** In BigMind chat, AI responses with image prompts display a clickable "Images" button showing the count. Clicking reveals an expandable panel where users can:
  - View all suggested image prompts extracted from the AI response
  - Edit each prompt in a text area before generating
  - Click "Generate Image" to create AI-generated images via `/api/admin/generate-image`
  - See generated images displayed inline with success indicators

### Design & Motion Systems
- **Andara HTML Content Pattern:** Uses a custom CSS component system and Framer Motion for AI-generated content, guided by a "Visual Config Block" in React components.
- **Unified Motion System:** Located in `client/src/lib/motion.ts`, it centralizes all animation logic, including timing tokens, easing presets, ready-to-use animation props, mount animations, stagger systems, hover effects, ambient animations, parallax layer presets, and reduced motion support.
- **Layout Vocabulary System:** In `client/src/lib/layouts.ts`, this library contains 38 layout definitions across 14 categories (including new Layered Parallax Scroll), enabling AI to interpret DOM structures, match sections to layouts, and apply appropriate motion presets and visual enhancements.
- **Andara Page Renderer:** A React component (`client/src/components/andara-page-renderer.tsx`) that transforms static Andara HTML into animated, motion-enhanced pages by applying scroll-triggered animations, staggered effects, and hero treatments.
- **Motion Grammar:** 10 motion archetypes integrated into BigMind system prompt for AI-guided motion application (Liquid-Crystal Float, Energetic Pulse, Magnetic Drift, Krystal Bloom, Scalar Slide, Vortex Reveal, Parallax Depth, Ripple Emergence, Subtle Shimmer, Layered Parallax Scroll).
- **Layered Parallax Scroll:** Layout definition with detection keywords (parallax, depth-layers, z-layers, multi-speed, immersive) and DOM signals for AI to recognize sections suitable for multi-layer depth scroll effects.
- **Motion Designer (CMS Page Editor):** In the Visual Config section of the PageEditorModal, administrators can:
  - Select a Motion Preset from all 10 archetypes via dropdown
  - Configure Entrance Motion, Hover Motion, and Ambient Motion text inputs
  - View active motion preview with name and description
- **Motion Layout Link Manager:** Below the Motion Designer, a grid of 6 element slots (Hero Section, Content Sections, Cards/Boxes, Buttons/CTAs, Background, Images) allows click-to-toggle motion linking. Features include:
  - Auto-link button to apply default motions to all elements
  - Clear All button to remove all motion links
  - Visual feedback showing linked status and motion type
  - Data persisted in `visualConfig.elementMotions` as JSON

## External Dependencies

### Third-Party Services
*   **Database:** PostgreSQL.
*   **Payments:** Stripe (via Replit integration with `stripe-replit-sync` for automatic data synchronization).
*   **SEO Analytics:** Google Search Console API (`@googleapis/searchconsole`) for search performance metrics, top queries, page indexing status.

### Google Search Console Integration
The application integrates with Google Search Console for SEO analytics:
- **Service:** `server/services/searchConsoleService.ts` - GSC API client with methods for queries, pages, performance data.
- **API Endpoints:** 
  - `GET /api/admin/seo/status` - Check if GSC is configured
  - `GET /api/admin/seo/summary` - Summary stats (clicks, impressions, CTR, top query/page)
  - `GET /api/admin/seo/queries` - Top search queries
  - `GET /api/admin/seo/pages` - Top performing pages
  - `GET /api/admin/seo/performance` - Performance by date
  - `POST /api/admin/seo/inspect` - URL inspection
- **Required Secrets:** `GSC_CLIENT_EMAIL`, `GSC_PRIVATE_KEY`, `GSC_SITE_URL` (service account credentials from Google Cloud Console)

### Stripe E-Commerce Integration
The application integrates with Stripe for payment processing using the Replit Stripe connector:
- **Stripe Sync:** Uses `stripe-replit-sync` package for automatic synchronization of products, prices, customers, and subscriptions from Stripe to the local PostgreSQL database.
- **Webhook Handling:** Stripe webhooks are processed via `/api/stripe/webhook` endpoint (registered before `express.json()` middleware for raw body access).
- **Products:** Products and prices are managed in Stripe Dashboard; the app reads from Stripe directly or synced `stripe.*` tables.
- **Orders Table:** Local `orders` table tracks checkout sessions, customer info, shipping details, and order status (pending, paid, processing, shipped, delivered, cancelled, refunded).
- **Checkout Flow:** `/api/stripe/checkout` creates Stripe Checkout Sessions; `/api/stripe/config` provides the publishable key.
- **Admin Order Management:** Admin routes (`/api/admin/orders/*`) provide order listing, status updates, and tracking number management.

**Key Stripe Files:**
- `server/services/stripeClient.ts` - Stripe SDK initialization and sync setup
- `server/services/stripeService.ts` - Business logic for products, prices, checkout
- `server/services/webhookHandlers.ts` - Webhook processing

### Key NPM Packages
*   **Frontend:** `react`, `react-dom`, `@tanstack/react-query`, `wouter`, `@radix-ui/*`, `tailwindcss`, `framer-motion`, `lucide-react`, `date-fns`, `zod`, `react-hook-form`.
*   **Backend:** `express`, `drizzle-orm`, `drizzle-kit`, `pg`, `bcryptjs`, `express-session`, `memorystore`, `zod`, `zod-validation-error`, `stripe`, `stripe-replit-sync`.
*   **Build Tools:** `vite`, `@vitejs/plugin-react`, `esbuild`, `tsx`, `typescript`, `@tailwindcss/vite`.

### Environment Variables
*   `DATABASE_URL`
*   `SESSION_SECRET`
*   `GSC_CLIENT_EMAIL` (Google Search Console service account email)
*   `GSC_PRIVATE_KEY` (Google Search Console private key)
*   `GSC_SITE_URL` (Default site URL for GSC queries)

### Asset Management
*   AI-generated images are stored in `attached_assets/generated_images/`.
*   Static assets (favicon, OpenGraph images) are in `client/public/`.
*   Local fonts (Open Sans, Surrounding) are in `client/public/fonts/`.

## Comprehensive Documentation
A complete technical documentation file exists at `AI_CMS_DOCUMENTATION.md` (1,850+ lines) that can be used to replicate this AI CMS system in another project. It includes:
- Complete database schema definitions
- All backend services with full code examples
- BigMind system prompts and function declarations
- Motion system with 10 archetypes
- Layout vocabulary with 37+ layout definitions
- BigMind response parser implementation
- Andara page renderer component
- Page templates and slot definitions
- Admin panel features and UI components
- AI model selection flow (frontend → backend → AI client)
- Complete file structure with descriptions
- Quick start checklist for replication

### SEO Brain System
A comprehensive WordPress-style SEO AI tool integration providing:
- **SEO Dashboard:** Three-tab interface (AI Suggestions, Top Opportunities, Proposed Pages) in the admin panel under "SEO Brain" navigation
- **AI Suggestions:** Real-time SEO improvement recommendations with apply/dismiss actions
- **Opportunity Scoring:** Algorithmic analysis of pages with improvement potential based on Search Console data
- **Proposed Pages:** AI-suggested new content opportunities with one-click page generation ("Magic Page Generator")
- **SEO Copilot Button:** Contextual AI SEO assistance in PageEditorModal for real-time suggestions while editing
- **DynamicSEOBlock Component:** Hook-based content placement system (after_h2, sidebar, inline) with Framer Motion animations
- **Design Tokens System:** Per-cluster visual design tokens including colors, typography, motion profiles, with live preview editor in Design System → Themes tab

**Database Tables:**
- `page_ai_suggestions` - AI-generated SEO improvements
- `page_search_metrics` - Search Console performance data
- `proposed_pages` - AI-suggested new content opportunities
- `design_tokens` - Per-cluster visual styling configuration

**API Routes:**
- `/api/admin/seo-brain/todays-actions` - Today's SEO tasks dashboard data
- `/api/admin/seo-brain/run-optimization` - Trigger SEO analysis
- `/api/admin/proposed-pages/*` - CRUD for proposed pages
- `/api/admin/design-tokens/*` - CRUD for design tokens

## Recent Updates (December 2025)
- **SEO Brain Integration:** Full SEO optimization system with AI suggestions, opportunity scoring, and proposed page generation
- **Design Tokens Editor:** Per-cluster visual customization with colors, gradients, motion profiles, and live preview
- **Magic Page Generator:** One-click page creation from SEO-proposed content opportunities
- **SEO Copilot:** Real-time AI SEO suggestions within page editor
- **AI Model Selection Fix:** Backend now properly extracts and uses `model` parameter from request body for both BigMind CMS and admin chat endpoints
- **Model Override Support:** `chatWithFunctions` accepts `modelOverride` parameter that takes precedence over configured model
- **Default Model:** GPT-4.1-mini configured as default for code generation and layout interpretation