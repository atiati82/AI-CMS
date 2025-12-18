# Andara SEO Content Engine - Master Specification

## Overview
This document defines the complete SEO algorithm and content generation rules for creating rank-capable pages. All AI agents, BigMind, and content generation systems must follow these specifications.

---

## 1. SEO Algorithm Layers

### A) Eligibility Layer (Must Pass to Rank)

| Check | Requirement | Implementation |
|-------|-------------|----------------|
| Crawlable | Google can reach URL via links + robots rules | Ensure all pages in sitemap, no accidental blocks |
| Indexable | No noindex, not blocked from indexing | Check meta robots tag, robots.txt |
| Canonicalized | Duplicate URLs consolidated | Set canonical tags, avoid duplicate content |
| Discoverable | XML sitemap for priority hints | Auto-add new pages to sitemap |

### B) Ranking Layer (What Decides Position)

| Signal | Weight | How to Win |
|--------|--------|-----------|
| Intent Match | HIGH | Page satisfies what searcher is trying to do |
| Relevance | HIGH | Clearly covers topic + related entities |
| Quality/Helpfulness | HIGH | People-first, not manipulation-focused |
| Authority | MEDIUM | Links, reputation, corroboration |
| Page Experience (CWV) | MEDIUM | Fast loading, stable layout, responsive |
| Context | LOW | Location, language, freshness |

---

## 2. Keyword Strategy (The Truth About Density)

### What "Keyword Density" Really Means in 2025

❌ **Myth**: Specific keyword percentage = rankings
✅ **Reality**: Topical authority via entities + intent completion

### Practical Density Guidelines

| Element | Target Range | Notes |
|---------|-------------|-------|
| Primary keyword | 0.5% – 1.2% | Often less on long pages |
| Variants/secondary | Natural placement | Where semantically relevant |
| Entities | Comprehensive | People, places, concepts, mechanisms |

### What to Include Naturally
- Primary topic term
- Close variants (singular/plural, synonyms)
- Entity set (people, places, concepts, measurements, mechanisms, definitions)
- Sub-questions (PAA-style) answered concisely

**RULE**: If it reads robotic, it's wrong. Never force repetitions.

---

## 3. SERP Snippet Specifications

### Title Tag
- **Target**: 50-60 characters
- **Rule**: Important promise/keyword early
- **Truncates by**: Pixel width (~580px)

### Meta Description
- **Target**: 150-160 characters
- **Rule**: Sufficiently descriptive, actionable
- **Include**: Value proposition, call-to-action hint

### URL Slug
- **Target**: 3-7 words
- **Rule**: Short, readable, keyword once, no fluff
- **Format**: `/topic-subtopic-focus`

---

## 4. Page Anatomy Specification

### Above the Fold (First Screen)
```
┌─────────────────────────────────────┐
│ H1: Intent-Matching Headline        │
│                                     │
│ 2-3 line "What you'll learn/solve"  │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🔑 Key Takeaways (3-7 bullets)  │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Body Structure Requirements

| Section | Required | Purpose |
|---------|----------|---------|
| Table of Contents | For long pages | Navigation + SEO structure |
| H2 Sections | YES | Map to sub-intents |
| Definition Section | YES (early) | Simple, direct explanation |
| How It Works | YES | Stepwise explanation |
| Comparison/Alternatives | YES | Captures comparison intent |
| FAQ Section | YES | 5-12 questions |

### Internal Links
- **Minimum**: 5-15 contextual internal links
- **Pattern**: Hub→spoke and spoke→hub
- **Anchors**: Descriptive, not "click here"

### Structured Data (Schema)
Required for Andara pages:
- `Article` / `BlogPosting` - Educational pages
- `FAQPage` - FAQ sections
- `Product` - Shop pages
- `Organization` - Site-wide (once)

---

## 5. Keyword Difficulty (KD) Decision Gate

### AI-Friendly KD Score (0-100)

Score based on top 10 ranking pages:
- Median domain authority
- Median referring domains to URL
- SERP type dominance (brands? forums?)
- Intent stability (consistent or mixed SERP?)
- Content depth requirement

### Decision Rules

| KD Range | Strategy | What's Needed |
|----------|----------|---------------|
| 0-20 | GO | Great on-page + internal links |
| 21-45 | GO + Cluster | Topical cluster + some external links |
| 46-70 | Consider | Strong authority + links + exceptional content |
| 71-100 | Skip | Not worth it unless pillar + PR strategy |

---

## 6. Content Generation Contract (AI Output Format)

Every AI-generated page MUST output:

```json
{
  "title_tag": "50-60 chars, keyword early",
  "meta_description": "150-160 chars, actionable",
  "url_slug": "3-7 words, readable",
  "h1": "Intent-matching headline",
  "intro": "2-3 sentences, what you'll learn",
  "key_takeaways": ["bullet 1", "bullet 2", "..."],
  "toc": ["Section 1", "Section 2", "..."],
  "sections": [
    {
      "intent": "define|explain|compare|guide",
      "h2": "Section Headline",
      "summary": "One sentence",
      "body": "Full content",
      "internal_links": ["page_key_1", "page_key_2"]
    }
  ],
  "faq": [
    {"question": "...", "answer": "..."}
  ],
  "schema_jsonld": {},
  "internal_link_plan": {
    "hub": "parent_page_key",
    "spokes": ["sibling_1", "sibling_2"]
  },
  "entity_coverage": ["entity1", "entity2", "..."]
}
```

---

## 7. Andara SEO Page Score (QA Rubric)

**Ship only if score ≥ 85/100**

| Category | Points | What to Check |
|----------|--------|---------------|
| Indexability & Canonical | 10 | Proper tags, no blocks |
| Intent Match | 20 | Intro + H2 map to search intent |
| Entity/Topic Coverage | 20 | Covers entities from SERP analysis |
| People-First Helpfulness | 15 | Not written to manipulate rankings |
| Internal Linking | 10 | 5-15 contextual links, hub/spoke |
| Schema Valid | 5 | Correct structured data |
| Snippet Quality (CTR) | 10 | Title + description compelling |
| Page Experience | 10 | Fast, stable, mobile-friendly |

---

## 8. Cluster Architecture (How to Actually Rank #1)

### The Library Strategy

```
         ┌─────────────────┐
         │  PILLAR/HUB    │ (Very complete, authoritative)
         │  Main Topic    │
         └────────┬────────┘
                  │
    ┌─────────────┼─────────────┐
    ▼             ▼             ▼
┌────────┐  ┌────────┐   ┌────────┐
│ Spoke 1│──│ Spoke 2│───│ Spoke 3│  (6-20 supporting pages)
│Sub-topic│  │Sub-topic│   │Sub-topic│
└────────┘  └────────┘   └────────┘
    │           │             │
    └───────────┼─────────────┘
          Lateral links (2-4 siblings)
```

### Rules
- 1 pillar/hub (very complete, authoritative)
- 6-20 supporting pages (each targets sub-intent)
- Each supporting page links UP to hub
- Each supporting page links LATERALLY to 2-4 siblings
- All pages have schema + clean canonicals + sitemap

**This makes Google see you as "the library," not "one article."**

---

## 9. Intent Classification

Before generating any page, classify the keyword:

| Intent | Signal Words | Page Type |
|--------|-------------|-----------|
| Informational | what, how, why, guide | Educational/Article |
| Comparative | best, vs, top, comparison | Comparison page |
| Transactional | buy, price, order, shop | Product/Shop page |
| Navigational | brand name, specific page | Landing page |

**RULE**: If mixed intent → generate TWO pages, not one.

---

## 10. Quick Reference Card

### Title Tag Formula
```
[Primary Keyword] - [Benefit/Value] | Andara Ionic
```

### Meta Description Formula
```
[What you'll learn/get]. [Key benefit]. [Unique angle]. Discover more.
```

### H1 Formula
```
[Action/Question] + [Primary Topic] + [Unique Angle]
```

### FAQ Minimum
```
5-12 questions covering:
- Definition questions (What is X?)
- Process questions (How does X work?)
- Comparison questions (X vs Y?)
- Use case questions (When should I X?)
- Problem questions (Why is X happening?)
```

---

*Last Updated: 2024-12-18*
*Version: 1.0*
*Owner: BigMind Content Engine*
