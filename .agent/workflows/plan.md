---
description: Create a 3-5 step plan with touched files
---

# /plan Workflow - Implementation Planning

This workflow is triggered when the user types `/plan [feature/task]` to create an implementation plan.

## Steps

1. **Understand the Request**
   - Restate the goal in one sentence
   - Ask clarifying questions if needed

2. **Identify Affected Layers**
   Check which layers are impacted:
   - [ ] UI (client/src)
   - [ ] API (server/routes)
   - [ ] DB (server/db, migrations)
   - [ ] Auth (server/middleware/auth.ts)
   - [ ] Agents (server/agents)
   - [ ] RAG (server/services/knowledge-base.ts)
   - [ ] Ops (deployment, env)

3. **Map Existing Patterns**
   - Check similar implementations in codebase
   - Note naming conventions
   - Identify reusable components/services

4. **Create Plan**
   Produce 3-5 bullet points describing the smallest path to success

5. **List Touched Files**
   Enumerate all files that will be created/modified

## Output Format

```markdown
### ✅ Plan: [Feature Name]

**Goal**: [One-sentence description]

**Affected Layers**: UI, API, DB

**Steps**:
1. Create migration for new table
2. Add service layer function
3. Create API route
4. Add UI component
5. Wire up navigation

**Files to Touch**:
- `server/db/migrations/XXX_new_feature.sql` - [NEW]
- `server/services/new-feature.ts` - [NEW]
- `server/routes/new-feature.ts` - [NEW]
- `client/src/pages/admin.tsx` - [MODIFY]
- `client/src/components/admin/AdminSidebar.tsx` - [MODIFY]

**Options** (if applicable):
- **Option A**: [Description] - Simpler but limited
- **Option B**: [Description] - More complex but flexible
- **Chosen**: Option A because [reason]

---
Ready to proceed? Type `/patch` to start implementation.
```

## Decision Guidelines

When providing options:
- Always recommend one option with clear reasoning
- Consider: simplicity, reversibility, alignment with existing patterns
- Default to smaller, safer changes
