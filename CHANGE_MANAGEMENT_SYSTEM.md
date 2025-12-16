# AI CMS Change Management System

## Overview

This document defines three critical prompts for managing changes, learning from errors, and validating feature placement in the AI CMS system.

---

## 7.1 Changeset Writer Prompt

**Purpose**: Create structured changeset entries for all work performed on the system.

### Prompt Template

```
Create a new changeset entry for this work. Must include:

1. **feature_key**: Unique identifier for this feature/change (e.g., 'routes-refactoring-phase-1')
2. **module**: Which module/area was changed (e.g., 'server/routes', 'admin/ui', 'security')
3. **intent**: Why was this change made? What problem does it solve?
4. **diff_summary**: High-level summary of code changes
5. **ui_placement**: 
   - route: URL path (if applicable)
   - nav: Navigation group
   - slot: Display order
   - order: Priority
6. **api_changes**: List of API endpoints added/modified/removed
7. **db_migrations**: Database schema changes (if any)
8. **tests**: Tests added/modified
9. **risk_level**: low | medium | high | critical
10. **rollback_plan**: Steps to revert this change if needed

Output JSON matching version_changeset schema.
```

### Example Output

```json
{
  "changeset_id": "cs_2025-12-17_001",
  "feature_key": "routes-refactoring-phase-1-4",
  "module": "server/routes",
  "intent": "Extract monolithic routes.ts into modular, maintainable route files to improve code organization, testability, and reduce file size from 3,293 lines",
  "diff_summary": {
    "files_added": 16,
    "files_modified": 2,
    "files_deleted": 0,
    "total_lines_changed": 500,
    "modules_created": ["public", "admin", "ai"]
  },
  "ui_placement": {
    "route": null,
    "nav": null,
    "slot": null,
    "order": null,
    "note": "Backend refactoring - no UI changes"
  },
  "api_changes": {
    "added": [],
    "modified": [],
    "removed": [],
    "note": "Routes moved to modules but endpoints unchanged"
  },
  "db_migrations": {
    "required": false,
    "scripts": [],
    "note": "No database changes"
  },
  "tests": {
    "added": 0,
    "modified": 0,
    "coverage_change": 0,
    "note": "Tests planned for Phase 6"
  },
  "risk_level": "low",
  "risk_factors": [
    "Old routes remain as fallback",
    "Both systems run in parallel",
    "Gradual migration approach"
  ],
  "rollback_plan": {
    "steps": [
      "1. Revert commit 0383e70",
      "2. Remove modular route imports from server/routes/index.ts",
      "3. Restart server",
      "4. Verify old routes.ts is handling all requests"
    ],
    "estimated_time": "5 minutes",
    "data_loss_risk": "none"
  },
  "dependencies": [
    "express",
    "jwt",
    "bcryptjs",
    "multer"
  ],
  "created_at": "2025-12-17T00:17:00Z",
  "created_by": "system",
  "git_commits": [
    "4d83253",
    "7473cec",
    "674bf8e",
    "a1f76c0",
    "53c7cbe",
    "5ec5ed1",
    "0383e70"
  ]
}
```

---

## 7.2 RAG Lesson Generator Prompt

**Purpose**: Generate structured lessons from errors and fixes to prevent future issues.

### Prompt Template

```
From this changeset + error logs, generate a rag_memory_object lesson. Must contain:

1. **root_cause**: What actually caused the issue? Be specific.
2. **fix_steps**: Exact steps taken to resolve the issue
3. **prevention_rule**: Rule to prevent this from happening again
4. **do_not_repeat_policy**: Explicit policy statement
5. **tags**: Categorization tags (e.g., ['security', 'routes', 'typescript'])
6. **severity**: info | warning | error | critical
7. **context**: When/where this applies
8. **examples**: Code examples showing right vs wrong

Output JSON matching rag_memory_object schema.
```

### Example Output

```json
{
  "lesson_id": "rag_lesson_001",
  "title": "Storage Method Mismatch in Modular Routes",
  "root_cause": {
    "issue": "Called storage.getDocuments() which doesn't exist",
    "actual_method": "storage.getAllDocuments()",
    "why_happened": "Assumed method name without checking storage interface",
    "impact": "TypeScript compilation errors, server wouldn't start"
  },
  "fix_steps": [
    {
      "step": 1,
      "action": "Search storage.ts for actual method names",
      "command": "grep 'getAllDocuments' server/storage.ts"
    },
    {
      "step": 2,
      "action": "Update route to use correct method",
      "code": "const documents = await storage.getAllDocuments();"
    },
    {
      "step": 3,
      "action": "Verify TypeScript compilation",
      "command": "npm run dev"
    }
  ],
  "prevention_rule": {
    "rule": "ALWAYS verify storage method names before using them",
    "enforcement": "Before creating route handlers, grep storage.ts for available methods",
    "checklist": [
      "Check storage interface definition",
      "Verify method signature matches usage",
      "Test with TypeScript compiler before committing"
    ]
  },
  "do_not_repeat_policy": "When extracting routes from monolithic files, MUST verify all storage method calls against the actual storage interface. Do NOT assume method names based on convention.",
  "tags": [
    "typescript",
    "storage",
    "routes",
    "refactoring",
    "api-mismatch"
  ],
  "severity": "warning",
  "context": {
    "when": "During route extraction/refactoring",
    "where": "Any route handler using storage methods",
    "who": "Developers creating new route modules"
  },
  "examples": {
    "wrong": {
      "code": "const documents = await storage.getDocuments(filters);",
      "issue": "Method doesn't exist"
    },
    "right": {
      "code": "const documents = await storage.getAllDocuments();",
      "note": "Use actual method from interface"
    }
  },
  "related_lessons": [],
  "created_at": "2025-12-17T00:17:00Z",
  "last_triggered": null,
  "trigger_count": 0
}
```

---

## 7.3 Preflight / Placement Validator Prompt

**Purpose**: Validate that admin features are properly registered and wired.

### Prompt Template

```
Validate that every admin feature added in this changeset is present in the registry and appears in the intended slot. If not, list missing wiring:

1. **route**: Is the route registered in the router?
2. **nav_group**: Is it in the correct navigation group?
3. **slot**: Does it appear in the intended slot/order?
4. **permission_guard**: Is the permission check in place?
5. **tests**: Are there tests proving visibility/permissions?

For each feature, check:
- Registry entry exists
- Route is registered
- Navigation item appears
- Permission guard is active
- Tests validate behavior

Output JSON with validation results and missing items.
```

### Example Output

```json
{
  "validation_id": "val_2025-12-17_001",
  "changeset_id": "cs_2025-12-17_001",
  "validated_at": "2025-12-17T00:17:00Z",
  "features_checked": [
    {
      "feature_key": "routes-refactoring-phase-1-4",
      "type": "backend-refactoring",
      "requires_ui": false,
      "validation_result": {
        "status": "pass",
        "checks": {
          "route_registered": {
            "status": "pass",
            "details": "All 16 route modules registered in server/routes/index.ts"
          },
          "nav_group": {
            "status": "n/a",
            "details": "Backend refactoring - no UI changes"
          },
          "slot": {
            "status": "n/a",
            "details": "Backend refactoring - no UI changes"
          },
          "permission_guard": {
            "status": "pass",
            "details": "requireAdmin middleware applied to all admin routes"
          },
          "tests": {
            "status": "fail",
            "details": "No tests added yet - planned for Phase 6",
            "severity": "medium"
          }
        },
        "missing_wiring": [
          {
            "component": "tests",
            "issue": "No integration tests for modular routes",
            "impact": "Cannot verify routes work correctly",
            "remediation": "Add tests in Phase 6",
            "priority": "high"
          }
        ]
      }
    }
  ],
  "overall_status": "pass_with_warnings",
  "warnings": [
    "Tests missing for route modules - add in Phase 6"
  ],
  "blockers": [],
  "recommendations": [
    "Add integration tests before Phase 5",
    "Create test template for route modules",
    "Set up CI/CD to run tests automatically"
  ]
}
```

### Validation Checklist

For each admin feature, verify:

- [ ] **Registry Entry**
  - Feature key is unique
  - All required fields populated
  - Icon and description provided

- [ ] **Route Configuration**
  - Route path is correct
  - Component is imported
  - Route is registered in router

- [ ] **Navigation**
  - Appears in correct nav group
  - Slot/order is correct
  - Badge (if any) works
  - Hidden flag is correct

- [ ] **Permissions**
  - Required permissions listed
  - Permission guard is active
  - Unauthorized users blocked

- [ ] **API Bindings**
  - All endpoints listed
  - Methods are correct
  - Rate limiting applied

- [ ] **Audit Logging**
  - Events are defined
  - Category is correct
  - Logging is active

- [ ] **Tests**
  - Feature appears when authorized
  - Feature hidden when unauthorized
  - Functionality works correctly
  - Error cases handled

---

## Usage in Development Workflow

### 1. Before Starting Work
```bash
# Review existing changesets
cat docs/changesets/*.json

# Check for related lessons
grep -r "similar-feature" docs/rag_lessons/
```

### 2. During Development
```bash
# Create changeset as you work
# Document decisions and changes
# Note any issues encountered
```

### 3. Before Committing
```bash
# Run preflight validation
npm run validate:placement

# Generate changeset
npm run changeset:create

# Generate lessons from errors (if any)
npm run rag:generate
```

### 4. After Deployment
```bash
# Verify changeset accuracy
# Update lessons if needed
# Archive changeset
```

---

## Integration with Admin Feature Registry

These prompts work together with the Admin Feature Registry:

1. **Changeset Writer** → Documents what was built
2. **RAG Lesson Generator** → Learns from mistakes
3. **Placement Validator** → Ensures proper wiring

All three reference the Admin Feature Registry as the source of truth for feature configuration.

---

## Storage Schema

### version_changeset Table
```sql
CREATE TABLE version_changeset (
  id UUID PRIMARY KEY,
  changeset_id VARCHAR(255) UNIQUE,
  feature_key VARCHAR(255),
  module VARCHAR(255),
  intent TEXT,
  diff_summary JSONB,
  ui_placement JSONB,
  api_changes JSONB,
  db_migrations JSONB,
  tests JSONB,
  risk_level VARCHAR(50),
  rollback_plan JSONB,
  created_at TIMESTAMP,
  created_by VARCHAR(255),
  git_commits TEXT[]
);
```

### rag_memory_object Table
```sql
CREATE TABLE rag_memory_object (
  id UUID PRIMARY KEY,
  lesson_id VARCHAR(255) UNIQUE,
  title VARCHAR(500),
  root_cause JSONB,
  fix_steps JSONB,
  prevention_rule JSONB,
  do_not_repeat_policy TEXT,
  tags TEXT[],
  severity VARCHAR(50),
  context JSONB,
  examples JSONB,
  created_at TIMESTAMP,
  last_triggered TIMESTAMP,
  trigger_count INTEGER
);
```

---

## Conclusion

These three prompts create a comprehensive change management system that:
- Documents all changes systematically
- Learns from errors automatically
- Validates feature placement rigorously

This ensures consistency, quality, and maintainability across the entire AI CMS system.
