# Andara Spacing Map v1.0

> **Base Grid:** 8px | **Macro Rhythm:** Fibonacci-inspired (24→40→64→96→128)

---

## Allowed Spacing Values (px)

| Token | Value | Use Case |
|-------|-------|----------|
| `0` | 0 | Reset |
| `1` | 4 | Micro: icon-to-text |
| `2` | 8 | Base unit |
| `3` | 12 | Tight spacing |
| `4` | 16 | Compact |
| `5` | 20 | Comfortable |
| `6` | 24 | Standard |
| `7` | 32 | Spacious |
| `8` | 40 | Macro start |
| `9` | 48 | Macro |
| `10` | 64 | Section gap |
| `11` | 80 | Major section |
| `12` | 96 | Hero padding |
| `13` | 128 | Max section |

---

## Page Layout Rules

| Element | Mobile | Tablet | Desktop | Tailwind |
|---------|--------|--------|---------|----------|
| Container gutter | 16px | 24px | 32px | `px-4 md:px-6 lg:px-8` |
| Container max-width | — | — | 1152px | `max-w-6xl` |
| Main padding (y) | 40px | 40px | 40px | `py-10` |

---

## Section Spacing Rules

| Transition | Gap | Tailwind |
|------------|-----|----------|
| Section → Section | 64px | `mt-16` |
| Header → Section | 40px | `mt-10` |
| Content → CTA | 48px | `mt-12` |
| Footer border top | 32px | `pt-8` |

---

## Card & Grid Rules

| Element | Padding | Gap | Tailwind |
|---------|---------|-----|----------|
| Card (small) | 16px | — | `p-4` |
| Card (medium) | 20px | — | `p-5` |
| Card (standard) | 24px | — | `p-6` |
| Card (spacious) | 32px | — | `p-8` |
| Grid items | — | 16px | `gap-4` |
| Card grids | — | 20-24px | `gap-5` or `gap-6` |
| 2-column layout | — | 32px | `gap-8` |
| Sidebar offset | — | 40px | `gap-10` |

---

## Typography Spacing

| Transition | Gap | Tailwind |
|------------|-----|----------|
| H1 → subtitle | 16px | `mt-4` |
| H2 → paragraph | 12px | `mt-3` |
| H3 → paragraph | 8px | `mt-2` |
| Paragraph → paragraph | 16px | via `space-y-4` |
| Paragraph → card/table | 24px | `mt-6` |

---

## Header Rules

| Element | Padding | Tailwind |
|---------|---------|----------|
| Header (y) | 12px | `py-3` |
| Nav item gap | 16px | `gap-4` |

---

## Tailwind Classes Quick Reference

```tailwind
/* Gutters (responsive) */
px-4 md:px-6 lg:px-8

/* Vertical stacks */
space-y-4   /* 16px - paragraphs */
space-y-6   /* 24px - sections content */

/* Section margins */
mt-10       /* 40px - after header */
mt-12       /* 48px - to CTA */
mt-16       /* 64px - section gap */

/* Card paddings */
p-4         /* 16px - compact */
p-5         /* 20px - comfortable */
p-6         /* 24px - standard */
p-8         /* 32px - spacious */

/* Grid gaps */
gap-4       /* 16px - tight grid */
gap-6       /* 24px - standard grid */
gap-8       /* 32px - 2-column */
gap-10      /* 40px - sidebar */
```

---

## Files Updated

- `client/src/styles/andara-spacing.css` — CSS custom properties
- `tailwind.config.ts` — Spacing token extension
- `client/src/templates/gpt/LandingLayout.tsx`
- `client/src/templates/gpt/ProductLayout.tsx`
- `client/src/templates/gpt/ArticleLayout.tsx`
- `client/src/templates/gpt/UtilityLayout.tsx`
