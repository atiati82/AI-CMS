/**
 * SEO Copilot Implementation Learnings - RAG Ingestion Script
 * 
 * This script ingests the learnings from implementing the SEO Copilot system
 * into the AI RAG so future AI agents can reference this knowledge.
 * 
 * Run with: npx tsx scripts/ingest-seo-implementation-learnings.ts
 */

import 'dotenv/config';
import { ingestDocument } from '../server/services/knowledge-base';

const SEO_IMPLEMENTATION_LEARNINGS = `
# SEO Copilot System - Implementation Learnings

## Session Summary

This session covered the research, documentation, and implementation of the SEO Copilot system for the Andara CMS.

---

## Key Implementation Patterns

### 1. Content Block API Design Pattern

When creating API routes for content blocks:

\`\`\`typescript
// Route structure: server/routes/seo/content-blocks.ts
// Mount in parent: router.use('/content-blocks', contentBlocksRouter);

// Key endpoints to implement:
GET /:pageId                 - Get all blocks for a page
GET /:pageId/live            - Get only published blocks (for frontend)
GET /all/drafts              - Get all drafts (for admin dashboard)
POST /                       - Create new block
PATCH /:id                   - Update block
DELETE /:id                  - Delete block
POST /:id/publish            - Transition draft → live
POST /:id/archive            - Transition to archived
POST /:id/unpublish          - Transition live → draft
POST /generate               - AI-generate new block
POST /:id/impression         - Track view analytics
POST /:id/click              - Track click analytics
\`\`\`

### 2. Hook-Based Content Positioning

Content blocks use a "hook" system to specify where they appear:

| Hook Format | Example | Meaning |
|-------------|---------|---------|
| after_h2:slug | after_h2:ez-water | After H2 with id "ez-water" |
| after_h3:slug | after_h3:benefits | After H3 "benefits" |
| sidebar | sidebar | In page sidebar |
| inline | inline | Within content flow |
| footer | footer | At page footer |

### 3. Block Status Lifecycle

\`\`\`
draft → publish() → live → archive() → archived
                 ↑
            unpublish()
\`\`\`

### 4. Frontend Tab Integration Pattern

When adding a new tab to SeoDashboard:

1. Add interface for data type (ContentBlock)
2. Add query for data (useQuery with queryKey)
3. Add mutations for actions (useMutation for publish/archive)
4. Add TabsTrigger in TabsList
5. Add TabsContent with Card/ScrollArea
6. Create card component (ContentBlockCard)

---

## Database Schema Reference

The ai_content_blocks table structure:

\`\`\`sql
CREATE TABLE ai_content_blocks (
  id VARCHAR PRIMARY KEY,
  page_id VARCHAR REFERENCES pages(id),
  hook TEXT NOT NULL,          -- Position hook
  block_type TEXT NOT NULL,    -- insight, faq, related_links, etc.
  html_content TEXT NOT NULL,  -- Pre-rendered HTML
  focus_keyword TEXT,
  secondary_keywords JSONB,
  priority INTEGER DEFAULT 5,
  status TEXT DEFAULT 'draft', -- draft, live, archived
  impressions INTEGER DEFAULT 0,
  click_throughs INTEGER DEFAULT 0,
  generated_at TIMESTAMP,
  last_reviewed_at TIMESTAMP,
  reviewed_by VARCHAR
);
\`\`\`

---

## Storage Methods Available

The storage interface provides these methods for content blocks:

\`\`\`typescript
storage.getAiContentBlock(id)
storage.getAiContentBlocks(pageId)
storage.getAiContentBlocksByHook(pageId, hook)
storage.getLiveAiContentBlocks(pageId)
storage.createAiContentBlock(block)
storage.updateAiContentBlock(id, updates)
storage.deleteAiContentBlock(id)
storage.publishAiContentBlock(id, reviewerId?)
storage.archiveAiContentBlock(id)
storage.incrementBlockImpressions(id)
storage.incrementBlockClickThroughs(id)
\`\`\`

---

## Block Types and Icons

| Block Type | Icon | Purpose |
|------------|------|---------|
| insight | Lightbulb | Concept expansion |
| faq | HelpCircle | FAQ mini-boxes |
| related_links | Link2 | Internal linking |
| definition | BookOpen | Glossary terms |
| stat_highlight | BarChart3 | Key statistics |
| comparison | Target | Comparison tables |
| cta | Zap | Call-to-action |

---

## Common Pitfalls Avoided

1. **TypeScript path aliases** - Use @shared/schema in imports, not relative paths
2. **Database data_type constraint** - Use 'document' not 'teaching' for knowledge_base ingestion
3. **dotenv loading** - Always import 'dotenv/config' at top of standalone scripts
4. **Router mounting** - Import sub-router and use router.use('/path', subRouter)

---

## Files Created/Modified

### New Files
- server/routes/seo/content-blocks.ts (12 API endpoints)
- scripts/ingest-seo-copilot.ts (RAG ingestion script)

### Modified Files
- server/routes/seo/index.ts (mounted content-blocks router)
- client/src/components/admin/SeoDashboard.tsx (Content Blocks tab + ContentBlockCard)

---

## Integration Points

The SEO Copilot system integrates with:

1. **SeoBrainService** - For AI content generation via generateContentBlock()
2. **Storage layer** - All CRUD operations go through storage interface
3. **SeoDashboard** - Admin UI for managing blocks
4. **DynamicSEOBlock component** - Frontend renderer for live blocks (already exists)
5. **Daily SEO optimization job** - Can auto-generate block drafts (needs wiring)

---

## Next Steps for Future Sessions

1. Build SEO Copilot Overlay (floating editor panel)
2. Wire daily SEO job to auto-generate content block drafts
3. Add JSON-LD schema markup to FAQ and Definition blocks
4. Implement block A/B testing variant system
`;

async function main() {
    console.log('Ingesting SEO Copilot Implementation Learnings into RAG...');

    try {
        const documentId = await ingestDocument({
            title: 'SEO Copilot System - Implementation Learnings',
            content: SEO_IMPLEMENTATION_LEARNINGS,
            source: 'learning:seo-copilot-implementation',
            type: 'document',
            metadata: {
                category: 'implementation',
                subcategory: 'seo-copilot',
                sessionDate: '2025-12-18',
                tags: ['seo', 'content-blocks', 'api-routes', 'implementation', 'patterns', 'dashboard'],
                ingestedAt: new Date().toISOString()
            }
        });

        console.log(`✅ Successfully ingested implementation learnings with ID: ${documentId}`);
        console.log('AI agents can now reference these patterns for future implementations.');
    } catch (error) {
        console.error('❌ Failed to ingest:', error);
        process.exit(1);
    }

    process.exit(0);
}

main();
