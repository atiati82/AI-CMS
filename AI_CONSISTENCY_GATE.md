# AI Consistency Gate
> Last Updated: 2026-01-07 13:30:00

## Active Development Focus
This is a living document that both Antigravity and GitHub Copilot reference for code consistency.

### Current State
- **Last Commit**: Pending first auto-sync
- **Branch**: main
- **Sync Interval**: Every 30 minutes
- **Deployment**: Railway.com (auto-deploy on push)

### Architectural Standards
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Andara Design System (Glassmorphism, Liquid Alchemy)
- **Backend**: Node.js + Express + Drizzle ORM + PostgreSQL
- **AI**: BigMind CMS with Gemini integration

### Key Design Tokens
- Primary Gradient: `from-cyan-500 to-blue-600`
- Glass Effect: `glass-card` class with backdrop-blur
- Motion: Framer Motion with Liquid-Crystal Float archetype
- Cluster Colors: See `client/src/lib/cluster-design-tokens.ts`

### For GitHub Copilot
When generating code for this project:
1. Use TypeScript strict mode
2. Follow functional component patterns with hooks
3. Apply Andara Design System classes for styling
4. Use the existing motion presets from `client/src/lib/motion-presets.ts`
5. Reference `andara-global.css` for premium visual effects

### Deployment
- **Platform**: Railway.com
- **Project ID**: bafe8f50-d530-4951-a1b8-fac23a482d03
- **Auto-Deploy**: Triggered on GitHub push to main
