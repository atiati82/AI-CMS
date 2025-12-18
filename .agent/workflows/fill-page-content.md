---
description: Extract knowledge base content and generate missing page specs in aistartuphtml format
---

# Workflow: Fill Page Content

This workflow defines the process to extract page specifications from the Andara Knowledge Base and generate full HTML descriptions for the entire application.

### 1. Extraction & Indexing
Run the extraction script to parse the Sitemap and Page Library. This will create a master JSON index of all known pages and their available metadata.

```bash
# Extract structure from markdown files
npx ts-node scripts/content-engine/extract-structure.ts
```

### 2. Gap Analysis
Identify which pages have complete visual specifications and which need AI generation.

```bash
# Report on missing content
npx ts-node scripts/content-engine/audit-content.ts
```

### 3. AI Content Generation
Use GPT-4o Mini to generate the missing page content in the `aistartuphtml` format. This script reads the Master Index and the Page Spec Template.

```bash
# Generate content for all missing pages
# Requires OPENAI_API_KEY in .env
npx ts-node scripts/content-engine/generate-pages.ts
```

### 4. Verification
Verify the generated HTML files against the template standards.

```bash
# Check generated files
ls -l content/generated-pages/
```
