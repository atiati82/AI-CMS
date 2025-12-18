---
description: Apply minimal changes with safe increments
---

# /patch Workflow - Safe Implementation

This workflow is triggered when the user types `/patch` to start implementing changes.

## Pre-Flight Checks

1. **Confirm Plan Exists**
   - If no plan exists, run /plan first
   - Ensure user has approved the plan

2. **Check Server Status**
   // turbo
   ```bash
   curl -s http://localhost:3000/health || echo "Server not running"
   ```

## Implementation Steps

For each change in the plan:

### Step 1: Make Small Change
- Edit ONE file at a time
- Keep changes minimal and focused

### Step 2: Verify After Each Change
// turbo
```bash
npm run build 2>&1 | head -20
```

### Step 3: Check for Lint Errors
// turbo
```bash
npm run lint 2>&1 | head -20
```

### Step 4: Confirm No Type Errors
If build succeeds, continue. If not, fix before proceeding.

## Output Format

After each change:

```markdown
### 🛠 Patch Applied

**File**: `path/to/file.ts`
**Change**: [Brief description]
**Status**: ✅ Build passed | ⚠️ Needs fix

---
Changes remaining: X of Y
```

## After All Changes

1. **Restart Dev Server**
   // turbo
   ```bash
   npm run dev &
   ```

2. **Smoke Test**
   - Open the relevant URL
   - Click through the feature
   - Confirm no console errors

3. **Provide Verification**
   ```markdown
   ### 🔍 Verification
   - Open: http://localhost:3000/admin?tab=feature
   - Click: [specific button]
   - Expected: [what should happen]
   ```

## Rollback Preparation

Before applying patches, note:
- Git status (any uncommitted changes?)
- Current working state
- How to revert each change

```markdown
### ↩ Rollback Steps
1. Revert file X: `git checkout -- path/to/file`
2. Restart server: `npm run dev`
```
