---
description: Verify changes with checklist, commands, and UI click-path
---

# /verify Workflow - Change Verification

This workflow is triggered when the user types `/verify` after implementing changes.

## Verification Checklist

### 1. Build Check
// turbo
```bash
npm run build 2>&1 | tail -10
```
Expected: "Build completed" or similar success message

### 2. Lint Check
// turbo
```bash
npm run lint 2>&1 | tail -10
```
Expected: No errors (warnings acceptable)

### 3. Server Start
// turbo
```bash
curl -s http://localhost:3000/health | head -1
```
Expected: `{"status":"ok"}` or similar

### 4. Test Run (if tests exist)
```bash
npm test 2>&1 | tail -20
```
Expected: All tests pass

## UI Verification (Manual Steps)

Provide a click-path for the user:

```markdown
### 🔍 UI Verification Steps

1. **Open URL**: http://localhost:3000/admin?tab=[feature]
2. **Navigate**: Click on [specific menu item]
3. **Action**: Click [button/form action]
4. **Expected Result**: 
   - [What should appear]
   - [What data should show]
   - [What messages should display]
5. **Check Console**: Open DevTools → Console → Verify no red errors
```

## API Verification (if applicable)

```bash
# GET endpoint
curl -s http://localhost:3000/api/[endpoint] | jq .

# POST endpoint
curl -X POST http://localhost:3000/api/[endpoint] \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}' | jq .
```

## Database Verification (if applicable)

```bash
psql $DATABASE_URL -c "SELECT * FROM [table] LIMIT 5"
```

## Output Format

```markdown
### ✅ Verification Complete

**Build**: ✅ Passed
**Lint**: ✅ Passed  
**Server**: ✅ Running
**Tests**: ✅ X/X passed (or N/A)

**UI Check**:
- [x] Component renders
- [x] Data loads correctly
- [x] Actions work as expected
- [x] No console errors

**API Check**:
- [x] Endpoints respond correctly
- [x] Data format is correct

---
Feature is ready for use.
```

## If Verification Fails

1. Document the failure
2. Identify root cause category
3. Apply fix
4. Re-run verification
5. Consider creating a /lesson for the fix
