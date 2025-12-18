# Andara Ionic 100ml – Product Page Specification

> Canonical reference for the flagship product page.  
> Water treatment framing throughout — no health claims.

---

## Route
`/shop/andara-ionic-100ml`

---

## Sections

### 1. Hero
- Dark indigo background, volcanic night-spring aesthetic
- Headline: "Andara Ionic 100 ml – Primordial ionic sulfate minerals for crystal-clear, activated water."
- Key sentence: "A few drops turn ordinary water into a clarified, mineral-structured medium."
- Three bullet points: volcanic origin, clarifies/structures, compact format
- CTAs: Order (primary), View bundles (secondary), Science link

### 2. What It Is
- Concentrated ionic sulfate mineral solution for water treatment
- Two cards:
  1. Volcanic Mineral Signature (ionic sulfates, flocculation, pH buffering)
  2. Water Treatment · Not a Supplement (not medical, focus on water chemistry)

### 3. Benefits Grid
- Clarification & Flocculation
- Sulfate Activation Range (17–30 mg/L)
- Structured/EZ-like Interfaces

### 4. How To Use (4 Steps)
1. Start with clean, filtered water
2. Dose ~1 ml per liter (17–18 mg/L sulfate)
3. Mix, vortex or oxygenate
4. Allow settling and observe

### 5. Pricing
| Pack | Volume | Price | Per Liter | Savings |
|------|--------|-------|-----------|---------|
| Single | 100 ml | €19,90 | ~€199/L | — |
| Quad (3+1) | 400 ml | €59,70 | ~€149/L | 25% |
| Infinity (6+2) | 800 ml | €119,40 | ~€149/L | 25% |

### 6. Science Snippet
Three portal cards:
- Water Science → `/science/water-science`
- Mineral Science → `/science/mineral-sources`
- Crystalline & Geometry → `/science/crystalline-matrix`

### 7. FAQ
- Is it a supplement? → No, water treatment only
- How much per liter? → ~1 ml = 17–18 mg/L sulfate
- Visible effects? → Yes, flocs + clarity
- Combine with devices? → Yes, vortexers, magnets, etc.

### 8. Neural Science Footer
Four columns linking to:
- Water Science
- Mineral & Crystalline
- Bioelectric & DNA
- Tools & Calculators

---

## Reusable Component: ProductBox

Location: `/client/src/components/shop/ProductBox.tsx`

### Variants
1. **compact** — inline mention, single line
2. **standard** — card with bullets and CTA
3. **featured** — full-width callout with product visual

### Usage
```tsx
import { ProductBox } from "@/components/shop/ProductBox";

// Inline mention
<ProductBox variant="compact" />

// Standard card
<ProductBox variant="standard" showPricing={true} />

// Featured callout
<ProductBox variant="featured" showCTA={true} />
```

---

## Design Notes
- Tree theme: `mineral` (gold/amber accents)
- Background: `#020617` (deep indigo)
- Primary CTA: gold gradient `from-[#f6d56a] to-[#e8b923]`
- Water accents: `#1aa7ff`, `#38ffd1`
