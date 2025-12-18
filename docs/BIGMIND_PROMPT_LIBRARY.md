# BigMind Prompt Library

> Master reference for all BigMind AI capabilities and prompt patterns.
> Store in RAG for AI learning and user quick-reference.

---

## Zone System Reference

| Zone | Name | Purpose | Language Style |
|------|------|---------|----------------|
| **Zone 1** | Product/Application | Water treatment, dosing, practical use | Simple, technical, educational, NO health claims |
| **Zone 2** | Science/Education | Neutral science, chemistry, mechanisms | Academic but accessible, metaphysics-aware |
| **Zone 3** | Brand/Story | Vision, values, origin stories | Emotional, storytelling, inspirational |

---

## 1. Magic Page Creation (From Words → Full Page)

### 1a. Topic → Science Library Page (Zone 2)

```prompt
BigMind, create a new Zone 2 – Science Library page about:
'{topic, e.g. Sulfate minerals in structured water}'.

1. Search the CMS database and document library for all relevant content.
2. Summarise the core scientific ideas in Andara style (educational, metaphysics-aware, no medical claims).
3. Propose:
   • URL slug
   • H1 title
   • Meta title & meta description
   • 5–10 SEO keywords
   • Full outline (H2/H3)
   • Internal links to existing pages (slugs + anchor texts).
4. Then generate the raw HTML content using the Andara Component System (hero + sections), without CSS.
```

### 1b. Topic → Brand/Story Page (Zone 3)

```prompt
BigMind, create a new Zone 3 – Brand/Story page about:
'{topic, e.g. Why Andara works with volcanic sulfate minerals}'.

Use emotional but responsible language (no medical claims).
1. Give me: slug, H1, meta title/description, 5–8 SEO keywords.
2. Then write a story-based page in sections (H2, H3) that connects: origin, intention, values, and future vision.
3. At the end, suggest 3 internal links to Science Library pages that deepen the topic.
```

### 1c. Topic → Product Explainer (Zone 1)

```prompt
BigMind, within Zone 1 – Product/Application, write an educational explainer page about:
'{topic, e.g. How 1 ml per liter works in water conditioning}'.

Focus on water treatment, clarification, and sulfate ranges, no health claims.
1. Use existing product pages and dilution info from the database.
2. Explain in simple, 'school-level' language: why the dose, what happens in the water, what users can observe.
3. Output: slug, H1, meta data, outline, and full HTML using Andara components.
```

---

## 2. Database Synthesis (Content → New Pages)

### 2a. Find Gaps and Propose Pages

```prompt
BigMind, scan all Science Library and Product pages relating to:
'{keyword, e.g. sulfate, microbiome, terrain}'.

1. Summarise what we already cover in the current pages.
2. Identify 3–7 important content gaps (questions we haven't answered yet).
3. For each gap, propose a new Magic Page with:
   • slug
   • H1
   • meta title/description
   • 5–10 SEO keywords
   • 5–8 bullet outline.
4. Mark each page as Zone 1, Zone 2 or Zone 3 based on our firewall rules.
```

### 2b. Merge Docs into Master Guide

```prompt
BigMind, create a master guide page in Zone 2 that merges all existing content on:
'{topic, e.g. sulfate chemistry in water treatment and nature}'.

1. Search and summarise all related pages and documents.
2. Build a single long-form guide with:
   • H1, meta data, SEO keywords
   • Sections explaining: basic chemistry, water treatment role, natural analogies, Andara's position (without health claims).
3. Generate raw HTML using .andara-hero and .andara-section blocks.
4. At the end, list 5 related internal links for deeper reading.
```

---

## 3. SEO Optimization Prompts

### 3a. SEO Pack for Existing Page

```prompt
BigMind, for the page with slug '{slug, e.g. /water-science/ez-water}', generate an updated SEO pack:

1. One primary focus keyword (KWFinder-level, not too hard).
2. 5–10 secondary keywords / long tails.
3. An SEO-optimised meta title (max ~60 chars).
4. An SEO-optimised meta description (max ~155 chars).
5. 3–5 internal link suggestions (source anchors + target slugs).

Use our firewall rules and keep language educational and safe.
```

### 3b. Cluster SEO Strategy

```prompt
BigMind, for the cluster 'Mineral Science', create an SEO strategy:

1. List all pages in this cluster (from the CMS).
2. For each, assign:
   • primary keyword
   • 3–5 secondary keywords
   • search intent (informational / commercial / transactional / navigational).
3. Show me how they should internally link to each other like a hub-and-spoke model (who is pillar, who are spokes).
4. Suggest 3 new Magic Pages to strengthen this cluster.
```

---

## 4. HTML Content Generation

### 4a. Full HTML Page from Title

```prompt
BigMind, generate a full Zone 2 Science Library HTML page (no CSS) for the topic:
'{title, e.g. Minerals & Microbiome – The Mineral Roots of Gut Health}'.

Use Andara Component System:
• Hero (.andara-hero) with left text / right visual idea
• 4–6 .andara-section blocks for content
• 1 .andara-grid section if suitable (e.g. comparing mineral sources, mechanisms, etc.).

Keep language educational, use no health claims, and keep Andara as example, not protagonist.
At top, also give: slug, H1, meta title, meta description, primary keyword, secondary keywords.
```

### 4b. Short Teaser Section

```prompt
BigMind, create a short teaser section (.andara-section) for the homepage that introduces:
'{topic, e.g. Bioelectric Water}'.

Include:
• H2
• 1–2 short paragraphs
• 3 bullet benefits or insights
• 1 CTA link label + suggested slug.

No CSS, only the HTML snippet.
```

---

## 5. Zone Logic Prompts

### 5a. Same Topic, 3 Zones

```prompt
BigMind, for the topic 'sulfate minerals in water', create 3 content variants:

1. Zone 1 – Product/Application: How sulfate range relates to water conditioning with Andara Ionic (no health claims).
2. Zone 2 – Science/Education: Neutral explanation of sulfate chemistry in water, nature, and classical treatment.
3. Zone 3 – Brand/Story: A visionary storytelling piece about why Andara chose sulfate as a core mineral language.

For each zone, give:
• H1
• 1–2 paragraph summary
• 3 bullet key points
• Suggested internal links to existing pages.
```

---

## 6. Database Query Prompts

### 6a. Show What Exists

```prompt
BigMind, list all pages currently in the CMS where the topic, tags or content mention '{keyword, e.g. sulfate}'.

For each page, show:
• slug
• H1
• Zone (1/2/3)
• Cluster (Water Science, Mineral Science, Bioelectricity, etc.)
• 1–2 sentence summary.

Then suggest 3 new pages that would logically connect and expand this topic.
```

### 6b. Compare Two Pages

```prompt
BigMind, compare these two pages:
• {slug1}
• {slug2}

1. Explain how their content overlaps.
2. Show what is unique to each.
3. Suggest how to differentiate them better (different intent, different angle).
4. Suggest any missing section on each page and give sample headlines for that section.
```

---

## 7. Quick One-Liners

Fast prompts for common tasks:

| Intent | Prompt |
|--------|--------|
| **Outline** | "BigMind, draft a Zone 2 page outline for 'Bioelectric Water' from our existing data." |
| **Suggest pages** | "BigMind, suggest 5 Magic Pages around 'ionic sulfate minerals + terrain model' with slugs and meta data." |
| **Expand sentence** | "BigMind, turn this sentence into a full Science Library page using our Andara Component HTML." |
| **Enrich page** | "BigMind, enrich page /mineral-science/sulfate-chemistry with better SEO and 3 new internal links." |
| **List pages** | "BigMind, list all pages about 'structured water' with their SEO status." |
| **Fix SEO** | "BigMind, add missing SEO keywords to all pages in the Water Science cluster." |

---

## Andara Component System Reference

### Hero Block
```html
<section class="andara-hero">
  <div class="hero-content">
    <h1>Title</h1>
    <p class="hero-subtitle">Subtitle text</p>
    <a href="#" class="hero-cta">Learn More</a>
  </div>
  <div class="hero-visual">
    <!-- Visual element placeholder -->
  </div>
</section>
```

### Content Section
```html
<section class="andara-section">
  <h2>Section Title</h2>
  <p>Content paragraphs...</p>
</section>
```

### Grid Section
```html
<section class="andara-grid">
  <div class="grid-item">
    <h3>Item 1</h3>
    <p>Description</p>
  </div>
  <div class="grid-item">
    <h3>Item 2</h3>
    <p>Description</p>
  </div>
</section>
```

---

## Content Firewall Rules

**ALWAYS APPLY:**
- ❌ NO health claims, medical advice, or therapeutic promises
- ❌ NO "cures", "heals", "treats" language
- ✅ Educational, informational, curiosity-driven
- ✅ "May support", "traditionally used for", "research suggests"
- ✅ Water treatment focus for Zone 1
- ✅ Neutral science for Zone 2
- ✅ Story and values for Zone 3

---

## Cluster Reference

| Cluster | Description | Primary Zone |
|---------|-------------|--------------|
| Water Science | EZ water, structured water, hydration science | Zone 2 |
| Mineral Science | Sulfate chemistry, ionic minerals, trace elements | Zone 2 |
| Bioelectricity | Bioelectric fields, cellular charge, voltage | Zone 2 |
| Product Guides | Dosing, application, water treatment | Zone 1 |
| Brand Story | Origin, vision, values, future | Zone 3 |
| FAQ | Common questions across all zones | Mixed |

---

*Last Updated: 2025-12-18*
*For BigMind AI RAG Learning*
