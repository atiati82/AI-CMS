# AI Consistency Gate
> Last Updated: 2026-01-07 22:39:27

## Active Development Focus
This is a living document that both Antigravity and GitHub Copilot reference for code consistency.

### Current State
- **Last Commit**: d60ab12 - 🔄 Auto-sync: 2026-01-07 22:09
- **Branch**: main
- **Sync Interval**: Every 30 minutes

### Architectural Standards
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Andara Design System (Glassmorphism, Liquid Alchemy)
- **Backend**: Node.js + Express + Drizzle ORM + PostgreSQL
- **AI**: BigMind CMS with Gemini integration

### Key Design Tokens
- Primary Gradient: `from-cyan-500 to-blue-600`
- Glass Effect: `glass-card` class with backdrop-blur
- Motion: Framer Motion with Liquid-Crystal Float archetype

### For GitHub Copilot
When generating code for this project:
1. Use TypeScript strict mode
2. Follow functional component patterns with hooks
3. Apply Andara Design System classes for styling
4. Use the existing motion presets from `client/src/lib/motion-presets.ts`

### Deployment
- **Platform**: Railway.com
- **Auto-Deploy**: Triggered on GitHub push to main
