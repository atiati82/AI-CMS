---
description: Scan project structure, configs, routing, DB layer, auth approach
---

# /scan Workflow - Project Structure Analysis

This workflow is triggered when the user types `/scan` to understand the current project state.

## Steps

1. **Project Root Structure**
   // turbo
   ```bash
   ls -la
   ```

2. **Server Structure**
   // turbo
   ```bash
   find server -type f -name "*.ts" | head -30
   ```

3. **Client Structure**
   // turbo
   ```bash
   find client/src -type f -name "*.tsx" | head -30
   ```

4. **Key Configurations**
   // turbo
   ```bash
   cat package.json | head -50
   ```

5. **Database Schema**
   // turbo
   ```bash
   cat server/db/migrations/*.sql | head -100
   ```

6. **Routes Overview**
   // turbo
   ```bash
   grep -r "router\." server/routes --include="*.ts" | head -30
   ```

7. **Auth Approach**
   // turbo
   ```bash
   cat server/routes/middleware/auth.ts 2>/dev/null || cat server/middleware/auth.ts 2>/dev/null || echo "Check auth middleware location"
   ```

## Output Format

After collecting information, provide a summary:

```markdown
### 📁 Project Structure
- **Server**: /server (routes, services, agents, db)
- **Client**: /client/src (pages, components, hooks)
- **Shared**: /shared (types, utilities)

### ⚙️ Key Configs
- Node.js + TypeScript
- Express backend
- React frontend with Vite
- PostgreSQL database

### 🗃️ Database
- Tables: pages, products, articles, users, knowledge_base, rag_memory_objects
- ORM: Drizzle (or raw SQL)

### 🔐 Auth
- Session-based authentication
- Admin middleware for protected routes

### 🛣️ Key Routes
- /api/ai/* - AI endpoints
- /api/admin/* - Admin endpoints
- /api/pages/* - Page management
```
