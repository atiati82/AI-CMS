---
description: Keep the development server online and diagnose connection issues
---

# Server Uptime & Connection Troubleshooting

This workflow teaches you how to diagnose and fix server connection issues when the user reports "black page", "can't connect", or "server not loading".

## Understanding the Server Setup

**Port Configuration:**
- Default port: `3000` (configured via `PORT` environment variable)
- Fallback port: `5000` (if PORT not set)
- Server binds to: `0.0.0.0` (all interfaces)

**Server Entry Point:**
- File: `server/index.ts`
- Command: `npm run dev` → `NODE_ENV=development tsx server/index.ts`

**Key Server Components:**
1. Express app with session management (PostgreSQL-backed)
2. Vite dev server (development mode only)
3. WebSocket server for real-time features
4. Stripe webhook endpoint (must be before express.json middleware)
5. AI agents initialization (content, seo, design, devops, visual-interpreter, orchestrator)

## Diagnostic Steps (Execute in Order)

### 1. Check if server process is running
```bash
lsof -i :3000 | grep LISTEN
```
**Expected output:** Should show `node` or `tsx` process listening on port 3000
**If empty:** Server is not running, proceed to step 4

### 2. Test server connectivity
```bash
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:3000
```
**Expected output:** `HTTP Status: 200`
**If connection refused:** Server crashed or not listening, proceed to step 4
**If 500 error:** Server is running but has internal errors, check logs in step 3

### 3. Check server logs
```bash
tail -100 /tmp/andara-server.log 2>/dev/null || echo "No log file found"
```
**Look for:**
- ✅ `serving on port 3000` - Server started successfully
- ❌ Error messages, stack traces, or crash indicators
- ❌ `Failed to resolve import` - Missing npm package (Vite error)
- ⚠️ Environment warnings (SESSION_SECRET, JWT_SECRET)
- Exit codes (143 = terminated, 1 = error)

### 4. Kill all conflicting processes
```bash
pkill -9 -f "tsx server" 2>/dev/null; pkill -9 -f "node.*vite" 2>/dev/null; lsof -ti:3000 | xargs kill -9 2>/dev/null; lsof -ti:5000 | xargs kill -9 2>/dev/null; sleep 3; echo "All processes killed"
```
**Purpose:** Clean slate - removes zombie processes, port conflicts, and hung servers

### 5. Restart the development server
// turbo
```bash
npm run dev 2>&1 | tee /tmp/andara-server.log
```
**This command:**
- Runs in background (async)
- Logs to both terminal and `/tmp/andara-server.log`
- Should complete in ~8 seconds

**Wait for these success indicators:**
- ✅ `AI Agents initialized: content, seo, design, devops, visual-interpreter, orchestrator`
- ✅ `[stripe] Stripe sync ready`
- ✅ `serving on port 3000`

### 6. Verify server is accessible
// turbo
```bash
sleep 3 && curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:3000
```
**Expected:** `HTTP Status: 200`

### 7. Instruct user to refresh browser
Tell the user to:
1. Hard refresh the browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)
2. Navigate to: `http://localhost:3000` or `http://localhost:3000/admin`

## Common Issues & Solutions

### Issue: "Connection Refused"
**Cause:** Server not running or crashed
**Solution:** Execute steps 4-6 above

### Issue: "Black Page" or "Blank Screen"
**Causes:**
1. Vite dev server failed to start (frontend issue)
2. JavaScript errors in browser console
3. API routes returning errors

**Solution:**
1. Check browser console for errors (ask user)
2. Verify Vite is running: Look for `[BABEL]` messages in logs
3. Test API endpoint: `curl http://localhost:3000/api/health`

### Issue: Vite Import Error - "Failed to resolve import"
**Cause:** Missing npm package or incorrect import path in frontend code
**Example error:**
```
[vite] Internal server error: Failed to resolve import "highlight.js/styles/github-dark.css"
```

**Solution:**
1. Check the error message in logs to identify the missing package
2. Install the missing package:
   ```bash
   npm install [package-name]
   ```
   Example: `npm install highlight.js`
3. Kill processes and restart server (steps 4-6)

**Common missing packages:**
- `highlight.js` - For syntax highlighting
- `react-syntax-highlighter` - Alternative syntax highlighter
- CSS files from npm packages - Usually resolved by installing the base package


### Issue: Missing Module - "ERR_MODULE_NOT_FOUND" / "Cannot find module"
**Cause:** A file is imported but doesn't exist. Common after git pulls, merges, or moving files.
**Example error:**
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module .../cron-job.service
```

**Solution:**
1. Check if the file exists: `ls [path-to-file]`
2. If missing, check if it was renamed or verify with `find_by_name`
3. **Emergency Fix:** Create a placeholder file with minimal exports to allow server to start.
   - Example: If `cron-job.service.ts` is missing, create it with an empty exported function.
   ```typescript
   export function startCronJobs() { console.log('Placeholder cron'); }
   ```

### Issue: Information Mismatch / Stale Logs
**Cause:** Reading old error messages from a previous crash because the log file wasn't cleared or timestamps weren't checked.
**Symptoms:** `view_file` shows correct code, but logs show syntax errors at those lines.

**Solution:**
1. **Always check timestamps** in the log against current time.
2. **Clear logs** before reproducing: `Truncate or Delete /tmp/andara-server.log`
3. **Fresh start:** Run `npm run dev > /tmp/andara-server-fresh.log 2>&1` to get a guaranteed new log stream.


### Issue: Babel/Vite Syntax Error - "Unexpected token" or "'import'/'export' may only appear at top level"
**Cause:** Syntax error in TypeScript/TSX code - often corrupted code, misplaced statements, or incorrect indentation
**Example errors:**
```
Pre-transform error: admin.tsx: Unexpected token (5959:27)
Pre-transform error: admin.tsx: 'import' and 'export' may only appear at the top level
```

**Solution:**
1. Check the error message for exact line number and file path
2. View the problematic lines: `view_file [filename] [startLine] [endLine]`
3. Common issues to look for:
   - **Orphaned type definitions**: Type syntax appearing inside function body
   - **Misplaced export**: `export default` inside a function instead of at file end  
   - **Missing closing braces**: Function not properly closed before next declaration
   - **Wrong indentation**: Leading spaces on `export default` statement
4. Fix the syntax issue and wait for Vite hot reload
5. If hot reload doesn't work, manually restart server (steps 4-6)


### Issue: Server Crashes Immediately (Exit Code 143)
**Cause:** Terminated by signal (SIGTERM)
**Common reasons:**
- Port already in use
- Database connection failure
- Missing environment variables

**Solution:**
1. Check `.env` file exists with required variables:
   - `DATABASE_URL`
   - `GOOGLE_API_KEY` or `GEMINI_API_KEY`
   - `OPENAI_API_KEY`
2. Test database connection: `psql $DATABASE_URL -c "SELECT 1"`
3. Kill all processes and restart (steps 4-6)

### Issue: Server Running but 500 Errors
**Cause:** Internal server errors (routes, database, AI providers)
**Solution:**
1. Check logs for stack traces
2. Test specific routes:
   ```bash
   curl http://localhost:3000/api/health
   curl http://localhost:3000/api/ai/agents
   ```
3. Verify database is accessible
4. Check AI provider API keys are valid

### Issue: Port 3000 Already in Use
**Solution:**
```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null
```
Or change port in `.env`:
```
PORT=5000
```

## Environment Variables Checklist

**Required:**
- `DATABASE_URL` - PostgreSQL connection string
- `GOOGLE_API_KEY` or `GEMINI_API_KEY` - For Gemini AI
- `OPENAI_API_KEY` - For OpenAI AI

**Optional (with defaults):**
- `PORT` - Server port (default: 5000, typically set to 3000)
- `SESSION_SECRET` - Session encryption key (has default, set for production)
- `JWT_SECRET` - JWT signing key (has default, set for production)
- `STRIPE_SECRET_KEY` - Stripe integration
- `NODE_ENV` - Environment mode (development/production)

## Quick Recovery Command Sequence

When user says "can't connect" or "black page", run this sequence:

```bash
# 1. Kill everything
pkill -9 -f "tsx server" 2>/dev/null; lsof -ti:3000 | xargs kill -9 2>/dev/null; sleep 2

# 2. Restart server
npm run dev 2>&1 | tee /tmp/andara-server.log

# 3. Wait and verify (in separate command after 8 seconds)
sleep 3 && curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:3000
```

## Monitoring Server Health

**Check if server is still running:**
```bash
lsof -i :3000 | grep LISTEN && echo "✅ Server is running" || echo "❌ Server is down"
```

**Monitor logs in real-time:**
```bash
tail -f /tmp/andara-server.log
```

**Check server uptime:**
```bash
ps aux | grep "tsx server" | grep -v grep
```

## Prevention Tips

1. **Always use `npm run dev`** - Don't run `tsx server/index.ts` directly
2. **Log to file** - Use `2>&1 | tee /tmp/andara-server.log` for debugging
3. **Clean shutdown** - Kill processes properly before restarting
4. **Wait between restarts** - Give 2-3 seconds after killing processes
5. **Check logs first** - Before restarting, understand why it crashed
6. **Verify environment** - Ensure `.env` file is present and complete

## Success Indicators

When server is healthy, you should see:
- ✅ `serving on port 3000`
- ✅ `AI Agents initialized: content, seo, design, devops, visual-interpreter, orchestrator`
- ✅ `[stripe] Stripe sync ready`
- ✅ `All Systems + DevOps Monitoring + Audit Logging Installed`
- ✅ HTTP 200 response from `curl http://localhost:3000`
- ✅ Process visible in `lsof -i :3000`

## When to Escalate to User

Ask the user for help if:
1. Database connection fails repeatedly
2. Environment variables are missing (ask them to provide)
3. Browser shows specific JavaScript errors (ask them to share console)
4. Server starts but specific features don't work (may be code issue)
5. Port conflicts persist after killing processes
