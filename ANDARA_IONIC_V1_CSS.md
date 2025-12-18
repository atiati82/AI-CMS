# Andara Ionic 1.0 CSS — Design Language Documentation

## Overview

The Andara Ionic 1.0 CSS system is a complete design language built on **tree theming**, allowing pages to automatically switch visual identity based on content domain using a single `data-tree` attribute.

---

## Core Philosophy

### 1. Future-Organic Design
- Minimal layout + living gradients + soft glow (never neon UI-gamer)
- Crystalline hierarchy: content structured in "facets" (cards/panels) with subtle borders + light reflection
- Field-first UX: background is the "field", cards are "containers", buttons are "activators"
- Sacred geometry accenting: thin-line geometry as ornament, not noise

---

## Tree Identities (Semantic Color Mapping)

Each content domain has a unique color identity activated via `data-tree` attribute:

| Tree | Domain | Primary Color | Secondary Color | Usage |
|------|--------|---------------|-----------------|-------|
| `water` | Water Science | `#1aa7ff` (ocean blue) | `#38ffd1` (aqua) | Water, hydration, EZ water |
| `mineral` | Mineral Science | `#63b4ff` (light blue) | `#b8e3ff` (ice blue) | Minerals, ionic science |
| `matrix` | Crystalline Matrix | `#f6d56a` (gold) | `#ffb74a` (amber) | Sacred geometry, crystals |
| `bioelectric` | Bioelectricity | `#2cff9a` (emerald) | `#00c2ff` (cyan) | Cell voltage, energy |
| `sulfur` | Sulfate Pathways | `#ffe66b` (yellow) | `#ffb300` (gold) | Sulfates, ionic pathways |
| `liquid` | Liquid Crystal | `#dfe7f1` (silver) | `#9aa7b6` (slate) | Collagen, fascia |
| `dna` | DNA & Mineral Codes | `#9b7bff` (violet) | `#ff5fd7` (magenta) | Genetics, cosmic codes |
| `earth` | Earth Sources | `#c49a6c` (tan) | `#7a5a3a` (brown) | Microbiome, enzymes |

---

## Usage

### Applying Tree Theme

Set the `data-tree` attribute on the `<body>` element:

```html
<!-- Water Science page -->
<body data-tree="water">
  <div class="field">
    <h1 class="h1">Structured Water Science</h1>
  </div>
</body>

<!-- Bioelectricity page -->
<body data-tree="bioelectric">
  <div class="panel pad">
    <h2 class="h2">Cell Voltage & Energy</h2>
  </div>
</body>
```

The entire page automatically adopts the correct color scheme without changing component code.

---

## Component Classes

### Layout
- `.container` — Max-width container (1180px)
- `.section` — Vertical section padding (80px)
- `.section.tight` — Reduced padding (56px)
- `.grid` — Grid layout
- `.grid.cols-2` — 2-column grid
- `.grid.cols-3` — 3-column grid

### Panels & Cards
- `.panel` — Crystal panel with glassmorphism
- `.panel.pad` — Panel with large padding (32px)
- `.panel.pad-md` — Panel with medium padding (24px)
- `.facet` — Panel with light refraction effects
- `.field` — Hero backdrop with gradient field

### Typography
- `.h1` — Large headline (clamp 38-64px)
- `.h2` — Section headline (clamp 28-44px)
- `.h3` — Sub-headline (clamp 20-28px)
- `.p` — Body text (clamp 15-17px)
- `.kicker` — Uppercase label with accent dot

### Buttons
- `.btn` — Base button (activator)
- `.btn.primary` — Primary button with gradient

### Badges
- `.chip` — Badge/chip with spark indicator

### Dividers
- `.divider` — Gradient divider line

---

## CSS Custom Properties

### Colors
```css
--bg-0: #05060b;        /* deepest space */
--bg-1: #070a12;        /* primary background */
--bg-2: #0b1020;        /* elevated background */
--text-1: rgba(255,255,255,0.92);  /* primary text */
--text-2: rgba(255,255,255,0.72);  /* secondary text */
--text-3: rgba(255,255,255,0.55);  /* muted text */
```

### Dynamic Accents (set by tree)
```css
--accent-1  /* Primary accent (changes per tree) */
--accent-2  /* Secondary accent (changes per tree) */
```

### Spacing
```css
--pad-1: 10px;
--pad-2: 14px;
--pad-3: 18px;
--pad-4: 24px;
--pad-5: 32px;
```

### Radii
```css
--r-sm: 12px;
--r-md: 18px;
--r-lg: 26px;
--r-xl: 34px;
```

### Motion
```css
--ease-out: cubic-bezier(.16, 1, .3, 1);
--ease-inout: cubic-bezier(.65, 0, .35, 1);
--dur-1: 160ms;
--dur-2: 260ms;
--dur-3: 420ms;
```

---

## Motion Guidelines

### Micro-interactions
- **Hover lift:** `translateY(-2px)` for buttons, `translateY(-4px)` for cards
- **Glow fade:** Opacity 0 → 1 in 260ms with `--ease-out`
- **Tap:** Scale 0.98 for 120–160ms

### Scroll/Reveal
- **Soft slide:** `y: 18 → 0`, opacity `0 → 1`, duration `420ms`, ease `--ease-out`
- **Stagger lists:** 60–90ms per item

### Never Use
- Hard bounce/elastic for science pages
- Over-rotations (keep sacred geometry subtle)

---

## Integration with AI Generation

When generating pages, the AI should:

1. **Detect content domain** from brief
2. **Set appropriate `data-tree`** attribute
3. **Use Andara Ionic 1.0 classes** (`.panel`, `.field`, `.btn`, etc.)
4. **Reference CSS custom properties** (`var(--accent-1)`, `var(--text-1)`)
5. **Follow motion guidelines** for animations

---

## Example Page Structure

```html
<body data-tree="bioelectric">
  <div class="container">
    <section class="section">
      <div class="field">
        <span class="kicker">
          <span class="dot"></span>
          Bioelectric Science
        </span>
        <h1 class="h1">Cell Voltage & Energy</h1>
        <p class="p">Exploring the electrical charge of every cell</p>
        <button class="btn primary">Learn More</button>
      </div>
    </section>

    <section class="section">
      <div class="grid cols-3">
        <div class="panel facet pad">
          <h3 class="h3">Voltage Restoration</h3>
          <p class="p">How minerals enhance cellular charge</p>
        </div>
        <!-- More panels -->
      </div>
    </section>
  </div>
</body>
```

---

## File Location

**CSS File:** [`client/src/styles/andara-ionic-v1.css`](file:///Users/atti/Documents/localhost-AI-CMS/andara-ionic-cms/client/src/styles/andara-ionic-v1.css)

**Import in your app:**
```typescript
import '@/styles/andara-ionic-v1.css';
```
