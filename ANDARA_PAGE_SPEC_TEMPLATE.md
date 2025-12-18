# Andara Visual Page Specification Template

## Overview

This template defines how to create detailed visual page specifications for the Andara Ionic CMS. Use this format to describe pages with complete visual, structural, and motion details.

---

## Example: Science Library Master Page

### 1. Core Idea of the Page

**Purpose:**
Main entry point into all Andara scientific content. Explains:
- What the Science Library is
- The three master pillars (Water, Minerals, Crystalline Fields)
- How users navigate, learn in layers, and explore deep-dive pages

**Vibe:**
- "High-end future lab meets sacred nature"
- Calm, precise, visionary
- Feels like entering a living, intelligent library of Earth's codes

**Main Goals:**
- Show this is education, not medical claims
- Make it easy to jump into the right pillar
- Offer paths for: Curious beginners, Deep nerds, Practitioners

**Tree Theme:** `mineral` (light blue for knowledge/science)

---

### 2. Hero Section – "Welcome to the Science Library"

**Title:**
```
Science Library – Water, Minerals & Crystalline Fields
```

**Subline (visually larger):**
```
This is the living archive where water physics, ionic minerals, and crystalline fields meet — explained in clear language, layered from beginner-friendly to deep research.
```

**Body Copy (2-3 sentences):**
- The Science Library as Zone 2 (education, not treatment)
- Articles, diagrams, visual maps, and reference tables
- Each topic connected through deep linking (water ↔ minerals ↔ crystalline fields)

**Layout:**

**Left Column:**
- Headline & subline
- 3-5 bullet points:
  - Water phases, EZ & structuring
  - Ionic sulfate mineral pathways
  - Crystalline & bioelectric field interactions
  - Terrain model (body as living environment)
  - Neutral, educational orientation

**Right Column:**
- Hero illustration/motion:
  - Semi-transparent human silhouette (energetic outline, not medical)
  - Around it:
    - Flowing water patterns
    - Mineral symbol icons (Mg, SO₄²⁻, Fe, Si)
    - Crystalline geometric lines (hexagons, tetrahedrons)
  - All orbiting central glowing sphere ("Science Library Core")

**Emotion:**
Stepping into a future archive where the physics of life is beautifully organized and understandable.

**Components:**
```html
<section class="section">
  <div class="container">
    <div class="grid cols-2">
      <div class="panel pad">
        <h1 class="h1">Science Library – Water, Minerals & Crystalline Fields</h1>
        <p class="p" style="font-size: 1.2em;">This is the living archive...</p>
        <ul>
          <li>Water phases, EZ & structuring</li>
          <li>Ionic sulfate mineral pathways</li>
          <!-- More bullets -->
        </ul>
      </div>
      <div class="field">
        <!-- Hero illustration with orbiting elements -->
      </div>
    </div>
  </div>
</section>
```

**Motion:**
- Ambient cosmic particle field behind hero
- Mineral icons orbit slowly around central sphere
- Water patterns flow gently
- Geometric lines pulse softly

---

### 3. Section: "How This Library Is Structured"

**Headline:**
```
How the Science Library Works
```

**Copy:**
1. **Three Pillars, One Field**
   - Water, minerals, crystalline fields are three views on the same energetic architecture

2. **Layered Depth**
   - Every pillar has:
     - Overview pages (simple explanations)
     - Deep dives (for science lovers)
     - Visual maps and diagrams

3. **Neutral, Educational Zone**
   - No medical promises
   - Focus on physics, chemistry, field behavior
   - Andara Ionic as example, not medical product

**Visual Layout:**
3 columns with icons:

| Pillars | Depth Levels | Educational Firewall |
|---------|--------------|---------------------|
| Three interlocking circles | Staircase/layered stack | Shield/geometric grid |

**Components:**
```html
<section class="section">
  <div class="container">
    <h2 class="h2">How the Science Library Works</h2>
    <div class="grid cols-3">
      <div class="panel facet pad">
        <div class="icon"><!-- Interlocking circles --></div>
        <h3 class="h3">Three Pillars, One Field</h3>
        <p class="p">Water, minerals, crystalline fields...</p>
      </div>
      <!-- More columns -->
    </div>
  </div>
</section>
```

**Motion:**
- Cards `staggeredFadeIn`
- Icons pulse gently on hover
- `hoverLift` on each card

---

### 4. Section: "The Three Pillars Overview"

#### 4.1 Water Science Block

**Title:**
```
Water Science – Phases, Structure & Activation
```

**Bullets:**
- Liquid, vapor, ice — plus structured/EZ-like water
- How minerals and surfaces shape water's internal architecture
- Why charge separation, pH, ORP matter for clarity and coherence
- How vortexing, flow, environment influence water's memory-like behavior

**Visual:**
- Card/panel with:
  - Water ripple background
  - Hexagonal patterns overlay
  - Icon: droplet inside hexagon

**Tree Theme:** `water` (cyan)

---

#### 4.2 Mineral Science Block

**Title:**
```
Mineral Science – Ionic Codes & Elemental Pathways
```

**Bullets:**
- Difference between ionic, colloidal, solid minerals
- Why sulfate is key geometry for water and redox chemistry
- Cofactors: minerals behind enzymes, charge transfer, energy conversion
- Why mineral quality, form, balance matter more than marketing

**Visual:**
- Panel with:
  - Periodic-table inspired graphic
  - Highlighted ions: Mg²⁺, SO₄²⁻, Fe³⁺, SiO₄⁴⁻
  - Golden lines connecting like nodes

**Tree Theme:** `mineral` (light blue)

---

#### 4.3 Crystalline Fields Block

**Title:**
```
Crystalline Fields – Geometry, Charge & Coherence
```

**Bullets:**
- How crystalline structures (ice, minerals, collagen, fascia) guide charge flow
- Body as liquid crystal + ionic conductor
- Bioelectric patterns, membrane potentials, field coherence
- Sacred geometry as language for repeating natural patterns (not dogma)

**Visual:**
- Panel with:
  - Star tetrahedron or hexagon lattice
  - Soft glow around intersections
  - Faint overlay of fascia-like fibers

**Tree Theme:** `matrix` (gold for geometry)

**Components for All Three:**
```html
<section class="section">
  <div class="container">
    <div class="grid cols-3">
      <div class="panel facet pad" data-pillar="water">
        <div class="icon"><!-- Droplet in hexagon --></div>
        <h3 class="h3">Water Science – Phases, Structure & Activation</h3>
        <ul>
          <li>Liquid, vapor, ice — plus structured/EZ-like water</li>
          <!-- More bullets -->
        </ul>
      </div>
      <!-- Mineral and Crystalline panels -->
    </div>
  </div>
</section>
```

**Motion:**
- Each panel has pillar-specific background animation:
  - Water: `waterRipple`
  - Mineral: `mineralGlow` on nodes
  - Crystalline: `crystallineShimmer` on lattice
- `hoverGlow` with pillar-specific color
- Slight `hoverTilt` on each card

---

### 5. Section: "Choose Your Learning Journey"

**Headline:**
```
Choose How Deep You Want to Go
```

**Subline:**
```
Whether you're just curious or love technical papers, the Science Library is designed in layers. Start where you feel comfortable and go as deep as you like.
```

**Three Cards:**

#### 1. Beginner / Curious Explorer
**Tag:** "Explain it to me like I'm new to this."

**Links:**
- Water Science – Basics
- Mineral Science – Basics
- Crystalline Fields – Basics

**Copy Focus:**
Simple metaphors, visuals, story-based explanations

---

#### 2. Deep Diver / Science Lover
**Tag:** "Show me the mechanisms and data."

**Links:**
- EZ Water & structured domains
- Ionic vs. Colloidal vs. Solid
- Proton gradients & energy transfer
- Minerals & microbiome

**Copy Focus:**
References to parameters, lab behavior, diagrams

---

#### 3. Practitioner / System Thinker
**Tag:** "I want to see the big landscape."

**Links:**
- Terrain Model overview
- Sulfate pathways in water, soil, body
- Liquid crystal biology

**Copy Focus:**
Maps, frameworks, relationship diagrams

**Components:**
```html
<section class="section">
  <div class="container">
    <h2 class="h2">Choose How Deep You Want to Go</h2>
    <p class="p">Whether you're just curious...</p>
    
    <div class="grid cols-3">
      <div class="panel facet pad">
        <span class="kicker"><span class="dot"></span>Beginner</span>
        <h3 class="h3">Curious Explorer</h3>
        <p class="p">"Explain it to me like I'm new to this."</p>
        <ul>
          <li><a href="/science/water-basics">Water Science – Basics</a></li>
          <!-- More links -->
        </ul>
      </div>
      <!-- Deep Diver and Practitioner cards -->
    </div>
  </div>
</section>
```

**Motion:**
- On hover, cards `hoverLift`
- Mini diagram fades in below title
- Short description line appears
- Soft glow transitions between cards as cursor moves

---

### 6. Section: "Map of the Science Library"

**Headline:**
```
A Living Map of Water, Minerals & Crystalline Fields
```

**Description:**
- Each pillar has subtopics
- How they interlink
- Library keeps expanding

**Visual Concept:**
- **Central node:** "Science Library Core"
- **Three big branches:**
  - Water
  - Minerals
  - Crystalline Fields
- **Under each branch, example nodes:**
  - Water → EZ Water, pH/ORP, Vortexing
  - Minerals → Sulfate Chemistry, Ionic vs Colloidal, Rare Earths
  - Crystalline → Fascia Matrix, Bioelectric Patterns, Geometry Maps
- Each node clickable internal link

**Emotion:**
Looking at the neural map of the library — the "Andara Science Brain"

**Components:**
```html
<section class="section">
  <div class="container">
    <h2 class="h2">A Living Map of Water, Minerals & Crystalline Fields</h2>
    <div class="field">
      <!-- Interactive neural map visualization -->
      <div class="neural-map">
        <div class="node central" data-node="core">Science Library Core</div>
        <div class="branch" data-branch="water">
          <div class="node" data-node="ez-water">EZ Water</div>
          <div class="node" data-node="ph-orp">pH/ORP</div>
          <!-- More nodes -->
        </div>
        <!-- Mineral and Crystalline branches -->
      </div>
    </div>
  </div>
</section>
```

**Motion:**
- Central node: `nodePulse` continuously
- Branch nodes: small glow on hover with `lineHighlight` to central node
- Connecting lines animate when hovering nodes
- Smooth zoom/pan on click

---

### 7. Section: "How Andara Ionic Relates (Without Claims)"

**Headline:**
```
Where Andara Ionic Fits Into This Picture
```

**Copy (firewall-safe):**
Andara Ionic is:
- A sulfate-based ionic mineral solution
- Designed as water clarification and conditioning agent
- Operating in sulfate ranges that overlap:
  - Natural mineral waters
  - Classical water treatment windows
  - Biologically relevant sulfate levels (without health claims)

**Clarify:**
- This page is educational, not product promotion
- Andara appears as example:
  - How sulfate-driven flocculation works
  - How ionic charge affects water parameters
  - How mineral complexity influences structure

**Visual:**
Simple concept diagram:
```
[Physics & Chemistry of Water and Minerals] 
         ↓
  [Science Library]
         ↓
[Andara Ionic as Example of Ionic Sulfate Minerals]
```

**No buying links here.** Just neutral bridge between knowledge and product.

**Components:**
```html
<section class="section">
  <div class="container">
    <h2 class="h2">Where Andara Ionic Fits Into This Picture</h2>
    <div class="panel pad">
      <p class="p">Andara Ionic is a sulfate-based ionic mineral solution...</p>
      <div class="diagram">
        <!-- Flow diagram -->
      </div>
    </div>
  </div>
</section>
```

**Motion:**
- Diagram elements `fadeIn` sequentially
- Arrows animate flow direction
- No aggressive motion (professional tone)

---

### 8. Section: "Reading Safety & Disclaimer"

**Headline:**
```
Educational, Not Medical
```

**Short, clear block:**
This library:
- Explains physics, chemistry, mineral behavior, field concepts
- Does not give diagnostic or treatment advice
- Is not substitute for professional medical guidance

Any practical application belongs:
- In personal responsibility
- Or in professional practitioner context

**Visual:**
- Calm icon: book + shield
- Very neutral styling

**Components:**
```html
<section class="section tight">
  <div class="container">
    <div class="panel pad">
      <div class="icon"><!-- Book + shield --></div>
      <h3 class="h3">Educational, Not Medical</h3>
      <p class="p">This library explains physics, chemistry...</p>
    </div>
  </div>
</section>
```

**Motion:**
- Minimal, professional
- Subtle `fadeIn` only

---

### 9. Section: "Next Steps & Featured Entries"

**Headline:**
```
Where to Go Next
```

**Four Cards:**
1. Water Science – Phases, Structure & Activation
2. Mineral Science – Ionic vs. Colloidal vs. Solid
3. Crystalline Matrix – Geometry & Fields
4. Terrain Model – The Body as Living Ecosystem

**Each Card:**
- Mini visual (icon/abstract art)
- 1-2 line teaser
- "Explore" link

**Components:**
```html
<section class="section">
  <div class="container">
    <h2 class="h2">Where to Go Next</h2>
    <div class="grid cols-4">
      <div class="panel facet pad">
        <div class="icon"><!-- Water icon --></div>
        <h3 class="h3">Water Science</h3>
        <p class="p">Phases, Structure & Activation</p>
        <a href="/science/water-science" class="btn">Explore</a>
      </div>
      <!-- More cards -->
    </div>
  </div>
</section>
```

**Motion:**
- Cards `staggeredFadeIn`
- `hoverLift` with glow
- Icon subtle animation on hover

---

### 10. Overall Emotional & Visual Tone

**Colors:**
- Deep indigo/midnight blue → space for thinking
- Electric turquoise highlights → water & ions
- Soft gold lines → intelligence, coherence

**Emotion:**
- Calm, trustworthy, future-organic
- Feels like lab and temple at same time
- Communicated in clean scientific language

**Animation:**
- Subtle ambient motions:
  - Slow-moving particle flows in background
  - Links glow softly on hover
  - Small node pulses in map view

**Tree Theme:** `mineral` (light blue) for main page, with pillar-specific accents

---

## Template Structure for Any Page

Use this format for detailed page specifications:

### 1. Core Idea
- Purpose
- Vibe
- Main goals
- Tree theme

### 2. Hero Section
- Title
- Subline
- Body copy
- Layout (left/right columns)
- Emotion
- Components (HTML structure)
- Motion

### 3-N. Content Sections
For each section:
- Headline
- Copy/bullets
- Visual layout
- Components
- Motion

### Final. Overall Tone
- Colors
- Emotion
- Animation patterns
- Tree theme

---

## Motion Pattern Reference

**Ambient:**
- `cosmicPulse` — Background breathing
- `crystallineShimmer` — Sparkle on elements
- `waterRipple` — Water surface
- `mineralGlow` — Node pulsing
- `particleFlow` — Flowing particles

**Entrance:**
- `fadeInUp` — Fade with upward slide
- `staggeredFadeIn` — Sequential reveal
- `slideIn` — Slide from side
- `scrollReveal` — Scroll-triggered

**Hover:**
- `hoverGlow` — Glow effect
- `hoverLift` — Lift with shadow
- `hoverTilt` — 3D tilt
- `hoverZoom` — Image zoom
- `hoverHighlight` — Border/bg highlight

**Interactive:**
- `nodePulse` — Node pulsing
- `lineHighlight` — Connection line glow
- `borderGlow` — Border illumination

---

This template ensures every page specification includes complete visual, structural, and motion details for AI generation.
