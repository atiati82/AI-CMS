/**
 * SEO Copilot Session Summary - RAG Ingestion
 * 
 * Complete session summary for AI agent reference
 */

import 'dotenv/config';
import { ingestDocument } from '../server/services/knowledge-base';

const SESSION_SUMMARY = `
# SEO Copilot System - Complete Implementation Summary

## Session Date: 2025-12-18

## What Was Built

### 1. Content Block API (12 Endpoints)

File: server/routes/seo/content-blocks.ts
Mounted at: /api/seo/content-blocks

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /:pageId | GET | Get all blocks for a page |
| /:pageId/live | GET | Get only live blocks (frontend rendering) |
| /all/drafts | GET | Get all drafts (admin dashboard) |
| / | POST | Create new block |
| /:id | PATCH | Update block |
| /:id | DELETE | Delete block |
| /:id/publish | POST | Publish draft → live |
| /:id/archive | POST | Archive block |
| /:id/unpublish | POST | Unpublish live → draft |
| /generate | POST | AI-generate new block |
| /:id/impression | POST | Track view |
| /:id/click | POST | Track click |

### 2. SeoDashboard Content Blocks Tab

File: client/src/components/admin/SeoDashboard.tsx

Added:
- ContentBlock interface
- Query: /api/seo/content-blocks/all/drafts
- Mutations: publishBlock, archiveBlock
- TabsTrigger: "Content Blocks" tab
- TabsContent: List of draft blocks
- ContentBlockCard component with preview/approve/archive

### 3. Auto-Generate Content Blocks

File: server/services/seo-brain.ts

Added method: autoGenerateContentBlocks()
- Called from createSuggestionsForPage() after saving suggestions
- Triggers for: faq_block, content_expansion, new_section, internal_linking
- Threshold: impactScore >= 40
- Creates draft blocks automatically for high-opportunity suggestions

### 4. SEO Copilot Overlay

File: client/src/components/admin/SeoCopilotOverlay.tsx

Features:
- Floating "SEO AI" button (bottom-right corner)
- Slide-in panel with three tabs:
  - Overview: SEO score, word count, links, FAQ status
  - Section Help: Context-specific suggestions
  - Opportunities: Top pages needing optimization
- Admin-only rendering (isAdminMode prop)

### 5. RAG Knowledge Documents

Two documents ingested:
1. SEO Copilot System Specification (teaching:seo-copilot-system)
2. Implementation Learnings (learning:seo-copilot-implementation)

---

## Key Patterns to Remember

### Content Block Hook Format
\`\`\`
after_h2:section-slug   → After H2 with that ID
after_h3:section-slug   → After H3
sidebar                 → In page sidebar
inline                  → Within content flow
footer                  → At page footer
\`\`\`

### Block Status Lifecycle
\`\`\`
draft → publish() → live → archive() → archived
              ↑
         unpublish()
\`\`\`

### Block Types
- insight: Concept expansion cards
- faq: FAQ mini-boxes
- related_links: Internal linking cards
- definition: Glossary terms
- stat_highlight: Key statistics
- comparison: Comparison tables
- cta: Call-to-action blocks

---

## Files Created/Modified

### New Files
- server/routes/seo/content-blocks.ts
- client/src/components/admin/SeoCopilotOverlay.tsx
- scripts/ingest-seo-copilot.ts
- scripts/ingest-seo-implementation-learnings.ts

### Modified Files
- server/routes/seo/index.ts (mounted content-blocks router)
- server/services/seo-brain.ts (added autoGenerateContentBlocks)
- client/src/components/admin/SeoDashboard.tsx (Content Blocks tab)

---

## Integration Required

To use SeoCopilotOverlay, add to admin layout:
\`\`\`tsx
import SeoCopilotOverlay from '@/components/admin/SeoCopilotOverlay';
<SeoCopilotOverlay pageId={currentPageId} isAdminMode={true} />
\`\`\`

---

## Testing

Test content block created:
- ID: test-block-001
- Type: insight
- Page: Shop page (5776c727-0ba4-4577-a9b6-62b34000d7dd)
- Status: draft
`;

async function main() {
    console.log('Ingesting final session summary to RAG...');

    try {
        const documentId = await ingestDocument({
            title: 'SEO Copilot System - Complete Implementation Summary',
            content: SESSION_SUMMARY,
            source: 'session:seo-copilot-2025-12-18',
            type: 'document',
            metadata: {
                category: 'implementation',
                subcategory: 'seo-copilot',
                sessionDate: '2025-12-18',
                tags: ['seo', 'content-blocks', 'api', 'overlay', 'dashboard', 'complete-implementation'],
                ingestedAt: new Date().toISOString()
            }
        });

        console.log(`✅ Session summary ingested with ID: ${documentId}`);
    } catch (error) {
        console.error('❌ Failed:', error);
        process.exit(1);
    }

    process.exit(0);
}

main();
