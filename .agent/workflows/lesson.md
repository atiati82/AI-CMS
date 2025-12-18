---
description: How to execute /lesson command to learn from fixes
---

# /lesson Workflow - Convert Fixes to RAG Memory

This workflow is triggered when the user types `/lesson` after a fix or debugging session.

## Purpose
Convert every significant fix or debugging session into a RAG memory object so the AI agent learns and doesn't repeat mistakes.

## Steps

1. **Analyze the Recent Fix**
   - Review what error occurred
   - Identify what was wrong and how it was fixed

2. **Create a RAG Memory Object**
   Insert into `rag_memory_objects` table with:
   ```json
   {
     "lesson_id": "lesson-CONTEXT-PATTERN",
     "title": "Brief descriptive title",
     "root_cause": {
       "category": "config|dependency|runtime|type|DB|auth|routing|rendering",
       "description": "What caused the issue"
     },
     "fix_steps": [
       { "step": 1, "action": "First fix step" },
       { "step": 2, "action": "Second fix step" }
     ],
     "prevention_rule": {
       "rule": "How to prevent this in future"
     },
     "do_not_repeat_policy": "Simple statement of what NOT to do",
     "tags": ["relevant", "tags"],
     "severity": "info|warning|error|critical"
   }
   ```

3. **SQL Insert Command**
   // turbo
   ```bash
   psql $DATABASE_URL -c "INSERT INTO rag_memory_objects (lesson_id, title, root_cause, fix_steps, prevention_rule, do_not_repeat_policy, tags, severity, context) VALUES ('lesson-ID', 'Title', '{\"category\":\"type\",\"description\":\"...\"}', '[{\"step\":1,\"action\":\"...\"}]', '{\"rule\":\"...\"}', 'Do not repeat policy', ARRAY['tag1','tag2'], 'warning', '{}') ON CONFLICT (lesson_id) DO UPDATE SET last_triggered = CURRENT_TIMESTAMP, trigger_count = rag_memory_objects.trigger_count + 1"
   ```

4. **Confirm to User**
   - Report that the lesson has been stored
   - Explain what was learned

## Categories Reference
- **config**: Environment variables, settings files
- **dependency**: Package versions, missing packages
- **runtime**: Runtime errors, null dereference
- **type**: TypeScript type errors
- **DB**: Database connection, query errors
- **auth**: Authentication, permission issues
- **routing**: URL routing, 404s, wrong handlers
- **rendering**: UI rendering, component errors

## Example

After fixing a "cannot read property of undefined" error:

```
### Lesson Created
- **ID**: lesson-2025-12-17-null-check
- **Title**: Always check for null before accessing properties
- **Category**: runtime
- **Prevention**: Add null checks or optional chaining (?.) before property access
```
