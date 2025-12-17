---
description: How to keep the development server online and running
---

# Keeping the Server Online

This workflow teaches how to check server status, diagnose issues, and restart the server when needed.

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the dev server |
| `lsof -ti:3000` | Check if port 3000 is in use |
| `lsof -ti:5000` | Check if port 5000 is in use |
| `curl http://localhost:3000/api/health` | Health check |

## 1. Check if Server is Running

// turbo
```bash
lsof -ti:3000 || echo "Nothing on port 3000"
```

Also check port 5000 (server binds to PORT env var, defaults to 5000):
// turbo
```bash
lsof -ti:5000 || echo "Nothing on port 5000"
```

## 2. Check Server Health

// turbo
```bash
curl -s http://localhost:3000/api/health 2>/dev/null || curl -s http://localhost:5000/api/health 2>/dev/null || echo "Server not responding"
```

## 3. View Recent Server Logs

If a terminal is running the server, use `read_terminal` to check the output.

Look for error patterns:
- `EADDRINUSE` - Port already in use
- `ECONNREFUSED` - Database connection failed
- `Cannot find module` - Missing dependency
- `SyntaxError` - Code error preventing startup

## 4. Start the Server (If Not Running)

```bash
cd /Users/atti/Documents/localhost-AI-CMS/andara-ionic-cms && npm run dev
```

The server runs on port 3000 by default (via Vite proxy in development).

## 5. Restart the Server (Kill and Start Fresh)

// turbo
```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null; lsof -ti:5000 | xargs kill -9 2>/dev/null; sleep 1
```

Then start fresh:
```bash
cd /Users/atti/Documents/localhost-AI-CMS/andara-ionic-cms && npm run dev
```

## 6. Common Issues & Fixes

### Port Already in Use
```bash
# Kill processes on ports 3000 and 5000
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:5000 | xargs kill -9 2>/dev/null
```

### Database Connection Failed
Check if PostgreSQL is running:
// turbo
```bash
pg_isready || echo "PostgreSQL not running"
```

If PostgreSQL is down:
```bash
brew services start postgresql@14
```

### Missing Dependencies
```bash
npm install
```

### TypeScript/Build Errors
// turbo
```bash
cd /Users/atti/Documents/localhost-AI-CMS/andara-ionic-cms && npm run check 2>&1 | head -50
```

Fix any TypeScript errors before starting the server.

## 7. Server Startup Flow

The server (`server/index.ts`) does:
1. Validates environment variables
2. Initializes PostgreSQL session store
3. Sets up Stripe webhook handler
4. Configures middleware (JSON, session, rate limiting)
5. Registers routes (modular + legacy)
6. Sets up Vite (development) or static files (production)
7. Listens on PORT (default 5000)

## 8. Environment Requirements

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption key (has default)
- `PORT` - Server port (defaults to 5000)

Optional:
- `GEMINI_API_KEY` - For AI features
- `OPENAI_API_KEY` - For AI features fallback
- `STRIPE_SECRET_KEY` - For payments
- `STRIPE_WEBHOOK_SECRET` - For Stripe webhooks

## 9. Monitoring Tips

### Watch for Server Crashes
If the server crashes during development, check:
1. Terminal output for error stack traces
2. Recent file changes that might have caused syntax errors
3. Database connectivity

### Auto-Recovery Pattern
If the server keeps crashing, run it with a loop:
```bash
while true; do npm run dev; echo "Server crashed, restarting in 2s..."; sleep 2; done
```

## 10. Before Starting Work

**ALWAYS verify the server is running before making API calls or testing:**

// turbo
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ || curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/
```

A response of `200` or `304` means the server is healthy.
