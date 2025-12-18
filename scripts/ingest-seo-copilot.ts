/**
 * SEO Copilot System - RAG Ingestion Script
 * 
 * This script ingests the full SEO Copilot system specification into the AI RAG
 * so that AI agents (including the SEO Agent) can learn from it.
 * 
 * Run with: npx tsx scripts/ingest-seo-copilot.ts
 */

import 'dotenv/config';
import { ingestDocument } from '../server/services/knowledge-base';

const SEO_COPILOT_KNOWLEDGE = `
# SEO Copilot System - Complete Specification

## System Overview

The SEO Copilot System is a dual-layer architecture providing both editor-facing coaching and user-facing dynamic content to maximize SEO performance.

### Two Core Components

1. **Editor-Only Floating Box (SEO Copilot Overlay)**
   - Motion overlay visible ONLY in admin/edit mode
   - Reads page content, SEO fields, search metrics, competitor data
   - Provides section-specific recommendations in real-time
   - Zero risk of user confusion or Google cloaking penalties
   - Goal: Transform CMS into a live SEO coach

2. **User-Visible Dynamic Content Blocks (SEO Booster Cards)**
   - Pre-rendered content blocks inserted at strategic positions
   - Types: Insight cards, FAQ blocks, Related Topics, Definition boxes
   - MUST be in HTML DOM on initial render for SEO value
   - Animated with Motion for engagement but content is static/SSR
   - Goal: Fill SEO gaps with valuable, indexed content

---

## Editor-Only SEO Copilot Overlay

### UI Behavior
- Small floating button in bottom-right corner: "SEO AI"
- On click: panel slides in with tabs:
  - **Page Overview**: Overall SEO score, meta status, word count, link count
  - **Section Help**: Suggestions for the section where cursor is placed
  - **Opportunities**: CTR gaps, position improvement targets, content gaps

### Section-Specific Suggestions

When editor cursor is in a paragraph, the panel updates with:

1. **Word Count**: "Add 150–250 words here on [subtopic]"
2. **Keyword Usage**: "Use exact phrase [keyword variant] once in this paragraph"
3. **Internal Link**: "Add internal link to [page] with anchor [phrase]"
4. **Missing FAQ**: "You're missing FAQ for this search intent. Suggested Q&A: [question]?"

### Why Safe
- Never rendered in public view
- Content is identical for users and bots (no cloaking)
- Only editors see suggestions
- Human review required before applying

---

## User-Visible Dynamic Content Blocks

### Core Principle
Dynamic content blocks must be REAL CONTENT, not SEO stuff. Users should never see "We need to add more keywords here."

### Block Types

1. **Andara Library Insight Card**
   - Short expansion on a concept mentioned in the text
   - 1–2 paragraph explanation of a related micro-topic
   - 2–3 internal links to deeper articles

2. **Floating FAQ Mini Box**
   - Appears after ~30% scroll
   - Shows 2–3 FAQs matching user's search intent
   - FAQs stored in DB and server-rendered (Google loves this)

3. **Related Topics Smart Card**
   - Internal linking with semantic awareness
   - "People who read about this also explore: [topics]"

4. **Stat Highlight Block**
   - Key statistics with visual emphasis
   - Cites research or measurements

5. **Definition Box**
   - Glossary-style micro-definitions
   - Schema.org DefinedTerm markup friendly

### SEO Requirements

For Google to index dynamic content:
- Content in DOM on initial render (SSR / pre-render)
- Not hidden behind cloaking
- Valuable to users (educational, not keyword-stuffed)
- Schema markup (FAQ, HowTo, DefinedTerm)

### Rendering Strategy

1. Daily SEO AI generates content → saves to DB with status = 'draft'
2. Editor reviews and approves → status = 'live'
3. Page renders → queries ai_content_blocks for active blocks
4. SSR outputs HTML → Motion animates on viewport entry

---

## Data Model: ai_content_blocks Table

\`\`\`sql
CREATE TABLE ai_content_blocks (
  id VARCHAR PRIMARY KEY,
  page_id VARCHAR NOT NULL REFERENCES pages(id),
  hook TEXT NOT NULL,  -- e.g., 'after_h2:ez-water', 'sidebar', 'footer'
  block_type TEXT NOT NULL,  -- 'insight' | 'faq' | 'related_links' | 'definition' | 'stat' | 'callout'
  html_content TEXT NOT NULL,  -- Pre-rendered HTML
  focus_keyword TEXT,
  secondary_keywords JSONB DEFAULT '[]',
  priority INTEGER DEFAULT 3,  -- 1-5, lower = higher priority
  status TEXT DEFAULT 'draft',  -- 'draft' | 'live' | 'archived'
  impressions INTEGER DEFAULT 0,
  click_throughs INTEGER DEFAULT 0,
  generated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  last_reviewed_at TIMESTAMP,
  reviewed_by VARCHAR REFERENCES admin_users(id)
);
\`\`\`

### Hook Format

| Hook Value | Meaning |
|------------|---------|
| after_h2:ez-water | After H2 with id/slug "ez-water" |
| after_h3:benefits | After H3 "benefits" |
| sidebar | In page sidebar |
| inline | Within content flow |
| footer | At page footer |

---

## Daily SEO AI Integration

### Pipeline Overview

1. **Sync Search Console Metrics**
2. **Calculate Opportunity Scores** for each published page
3. **Generate AI Suggestions** for high-opportunity pages
4. **Create Content Block Drafts** for content gaps

### Gap Detection → Block Creation

When daily SEO job finds a gap:

\`\`\`typescript
async function handleGapDetection(gap: SeoGap) {
  // 1. Generate content block (500–800 characters)
  const htmlContent = await seoBrainService.generateContentBlock(
    gap.pageId,
    gap.suggestedBlockType,
    \`after_h2:\${gap.targetSection}\`,
    gap.context
  );
  
  // 2. Store as draft in ai_content_blocks
  await storage.createAiContentBlock({
    pageId: gap.pageId,
    hook: \`after_h2:\${gap.targetSection}\`,
    blockType: gap.suggestedBlockType,
    htmlContent,
    focusKeyword: gap.targetKeyword,
    status: 'draft'
  });
}
\`\`\`

### CMS Editor Experience

Editors see a list of "Suggested Content Blocks" for each page with actions:
- ✏️ Edit - Open block editor to tweak content
- 🗑️ Discard - Archive the draft
- ✅ Approve - Set status = 'live', block appears on page

---

## Existing Implementation

### Already Implemented
- \`ai_content_blocks\` table schema (schema.ts:1191-1221)
- Storage CRUD methods (storage.ts:1924-1988)
- \`DynamicSEOBlock\` component (dynamic-seo-block.tsx)
- \`SeoBrainService.generateContentBlock()\` method

### Needs Implementation
- API routes for content blocks
- SeoCopilotOverlay component (admin-only floating panel)
- Content block management in SeoDashboard

### Key Files
- client/src/components/dynamic-seo-block.tsx - Frontend component
- server/services/seo-brain.ts - Main SEO service
- server/agents/seo.ts - SEO agent
- shared/schema.ts - Database schema (lines 1191-1221)
- server/storage.ts - Storage methods (lines 1924-1988)

---

## API Endpoints (To Implement)

### Content Blocks API
- GET /api/seo/content-blocks/:pageId - Get all blocks for a page
- GET /api/seo/content-blocks/:pageId/live - Get only live blocks
- POST /api/seo/content-blocks - Create new block
- PATCH /api/seo/content-blocks/:id - Update block
- POST /api/seo/content-blocks/:id/publish - Publish block
- POST /api/seo/content-blocks/:id/archive - Archive block
- DELETE /api/seo/content-blocks/:id - Delete block

---

## Safety Rules

1. **Never show SEO coaching to end users** - Editor overlay is admin-only
2. **All user-facing content must be pre-rendered** - No JavaScript-only content
3. **Content blocks must be valuable first** - Not keyword-stuffed filler
4. **Minimal visual interference** - One sticky box or 1-2 inline cards max
`;

async function main() {
   console.log('Ingesting SEO Copilot System knowledge into RAG...');

   try {
      const documentId = await ingestDocument({
         title: 'SEO Copilot System - Complete Specification',
         content: SEO_COPILOT_KNOWLEDGE,
         source: 'teaching:seo-copilot-system',
         type: 'document',
         metadata: {
            category: 'seo',
            subcategory: 'copilot-system',
            version: '1.0',
            tags: ['seo', 'copilot', 'overlay', 'dynamic-content-blocks', 'ai-content-blocks', 'editor-mode', 'faq', 'internal-linking'],
            ingestedAt: new Date().toISOString()
         }
      });

      console.log(`✅ Successfully ingested SEO Copilot knowledge with ID: ${documentId}`);
      console.log('The SEO AI agent can now query this knowledge.');
   } catch (error) {
      console.error('❌ Failed to ingest:', error);
      process.exit(1);
   }

   process.exit(0);
}

main();

