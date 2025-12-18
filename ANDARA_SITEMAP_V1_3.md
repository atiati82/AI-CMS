# Andara Sitemap v1.3 — Complete Motion & Visual Specifications

## Overview

Complete sitemap for 120+ pages with cluster organization, priority levels, visual vibes, and motion specifications aligned to Andara Component Language + Motion Library.

**Priority Levels:**
- **P1:** MVP / launch critical
- **P2:** Next layer after launch
- **P3:** Deep library / long-term SEO

**Zones:**
- **Zone 1:** Product & Application (EPA-style safe)
- **Zone 2:** Science & Education
- **Zone 3:** Brand & Story

---

## Motion Library Reference

### Ambient Loops
- `cosmicPulse` — Slow breathing cosmic background
- `crystallineShimmer` — Subtle sparkle on crystalline elements
- `waterRipple` — Gentle water surface oscillation
- `mineralGlow` — Soft pulsing glow on mineral nodes
- `spiritualElectricity` — Current-like flow along paths

### Entrance Animations
- `fadeInUp` — Fade in with upward slide
- `staggeredFadeIn` — Sequential reveal with delay
- `slideIn` — Slide from side
- `scrollReveal` — Triggered by scroll position
- `nodePulse` — Node appears with pulse

### Scroll-Triggered Effects
- `scrollHighlight` — Highlight element in viewport
- `scrollParallax` — Parallax depth on scroll
- `scroll-linked` — Direct scroll position mapping

### Hover States
- `hoverGlow` — Glow effect on hover
- `hoverLift` — Lift with shadow bloom
- `hoverScale` — Slight scale up
- `hoverTilt` — 3D tilt effect
- `hoverZoom` — Image zoom
- `hoverHighlight` — Border/background highlight

### Specialized Effects
- `particleFlow` — Particles moving along paths
- `waveInterference` — Wave pattern animation
- `electronFlow` — Electron movement visualization
- `dropAnimation` — Liquid drop effect
- `vortexSwirl` — Continuous spiral rotation
- `phaseShift` — Transition between states

---

## Cluster 1: CORE / HOME

### home_main
**Slug:** `/`  
**Title:** Andara Ionic – Primordial Ionic Sulfate Minerals  
**Priority:** P1  
**Zone:** Mixed (Intro + Product + Library gateway)  
**Tree Theme:** `matrix` (gold for brand)

**Visual Vibe:**
- Deep indigo, electric turquoise, soft gold, crystalline aura
- Hero bottle + water container with crystalline shimmer

**Motion:**
- Ambient cosmic particle field behind hero (slow, subtle)
- Hero bottle: `crystallineShimmer` + `waterRipple`
- Scroll-triggered `fadeInUp` sections for pillars
- `hoverGlow` on pillar cards and CTAs

**Components:**
- `.field` hero with cosmic background
- `.grid.cols-3` for three pillars
- `.btn.primary` for main CTA
- `.panel.facet` for pillar cards

---

### home_pillars_overview
**Slug:** `/pillars`  
**Title:** Three Pillars: Water, Minerals & Crystalline Fields  
**Priority:** P1  
**Zone:** Science intro  
**Tree Theme:** `matrix` (gold)

**Visual Vibe:**
- Pillars-of-light, structured diagrams, grid of knowledge

**Motion:**
- `staggeredFadeIn` for three pillar cards
- `parallaxY` slow drift of background geometry
- `hoverLift` on each pillar card

**Components:**
- `.grid.cols-3` for pillars
- `.panel.facet` with light effects
- `.divider` between sections

---

### home_science_library_gate
**Slug:** `/science-library`  
**Title:** Science Library – Water, Minerals & Crystalline Fields  
**Priority:** P1  
**Zone:** Science index  
**Tree Theme:** `mineral` (light blue for knowledge)

**Visual Vibe:**
- Living neural map, knowledge constellation, calm future lab

**Motion:**
- Center map: `nodePulse` on main Science Library node
- Link nodes: small glow on hover with `lineHighlight`
- `scrollReveal` on section blocks

**Components:**
- `.field` with neural map
- Interactive node system
- `.panel` for category cards
- Connection lines (SVG)

---

### home_start_here
**Slug:** `/start-here`  
**Title:** Start Here – New to Andara & Mineral Science?  
**Priority:** P2  
**Zone:** Onboarding  
**Tree Theme:** `bioelectric` (emerald for growth)

**Visual Vibe:**
- Warm welcome, soft gradients, simple icons

**Motion:**
- `fadeInUp` for step cards (1–2–3)
- `hoverScale` slightly on beginner steps
- Ambient gentle shimmer at top banner

**Components:**
- `.section` with steps
- `.panel.pad` for each step
- `.kicker` for section labels
- `.btn` for next actions

---

### home_choose_path
**Slug:** `/choose-your-path`  
**Title:** Choose Your Path – Curious, Deep Diver, Practitioner  
**Priority:** P2  
**Zone:** Navigation  
**Tree Theme:** `dna` (violet for paths)

**Visual Vibe:**
- Decision tree, journey cards, calm clarity

**Motion:**
- `staggeredFadeIn` for three path cards
- `hoverGlow` + slight tilt for selected path
- `scrollReveal` for deeper recommendations

**Components:**
- `.grid.cols-3` for paths
- `.panel.facet` for each journey
- `.btn.primary` for path selection
- Path icons with glow

---

## Cluster 2: PRODUCTS (Zone 1)

### product_100ml_main
**Slug:** `/shop/andara-ionic-100ml`  
**Title:** Andara Ionic – 100 ml Primordial Ionic Sulfate Minerals  
**Priority:** P1  
**Zone:** Zone 1 · Product & Application  
**Tree Theme:** `matrix` (gold for product)

**Visual Vibe:**
- Hero bottle close-up, before-after water, lab meets nature

**Motion:**
- Hero: bottle + two glasses with `waterRipple` + subtle `crystallineShimmer`
- Pricing cards: `hoverLift` + `borderGlow`
- Dilution infobox: `slideIn` from side on scroll

**Components:**
- `.field` hero with product
- `.grid.cols-2` for before/after
- `.panel.pad` for pricing
- `.chip` for features

---

### product_100ml_bundles
**Slug:** `/shop/andara-ionic-100ml-bundles`  
**Title:** Andara Ionic 100 ml – Value Bundles (3+1, 6+2)  
**Priority:** P1  
**Zone:** Zone 1  
**Tree Theme:** `matrix` (gold)

**Visual Vibe:**
- Stacked bottles, savings ribbons, grid pricing

**Motion:**
- Pricing table: `staggeredFadeInUp` for bundle rows
- `hoverEmphasis` on best-offer column
- `sparklePulse` behind 'Most Popular' tag

**Components:**
- `.grid.cols-3` for bundles
- `.panel.facet` for each bundle
- `.kicker` with `.dot` for "Best Value"
- `.btn.primary` for purchase

---

### dilution_calculator_main
**Slug:** `/andara-dilution-calculator`  
**Title:** Andara Dilution Calculator – Find Your Sulfate Activation Range  
**Priority:** P1  
**Zone:** Tool / Zone 1-Science bridge  
**Tree Theme:** `mineral` (light blue for calculation)

**Visual Vibe:**
- Calculator interface, sliders and inputs, data but friendly

**Motion:**
- Input cards `fadeInUp`
- Reactive number counters animate on input change
- Subtle glowing arc when user hits optimal 17–30 mg/L range

**Components:**
- `.panel.pad` for calculator
- Input sliders
- Result display with glow
- `.chip` for range indicators

---

### product_b2b_reseller
**Slug:** `/b2b-reseller`  
**Title:** B2B, Wholesale & Reseller Partners  
**Priority:** P2  
**Zone:** Commercial info  
**Tree Theme:** `bioelectric` (emerald for partnership)

**Visual Vibe:**
- Network nodes, business silhouettes, clean white + Andara accents

**Motion:**
- Network map: `nodePulse` for partner categories
- `hoverLift` on use-case tiles
- `scrollReveal` for partnership steps

**Components:**
- `.field` with network visualization
- `.grid.cols-3` for benefits
- `.panel.facet` for industries
- `.btn.primary` for application

---

## Cluster 3: SCIENCE LIBRARY – WATER

### water_overview_hidden_architecture
**Slug:** `/science/water-science`  
**Title:** Water Science – The Hidden Architecture of Life  
**Priority:** P1  
**Zone:** Science Zone 2  
**Tree Theme:** `water` (cyan)

**Visual Vibe:**
- Multi-layer water, hexagonal motifs, soft light beams

**Motion:**
- Hero: water surface with slow `waterRipple` parallax
- Infographics `slideIn` from sides
- `hoverHighlight` on key terms

**Components:**
- `.field` with water imagery
- `.panel.facet` for concepts
- Hexagonal grid overlay
- Light beam effects

---

### water_phases_structure_activation
**Slug:** `/science/water-phases-structure-activation`  
**Title:** Water Phases, Structure & Activation  
**Priority:** P1  
**Zone:** Science  
**Tree Theme:** `water` (cyan)

**Visual Vibe:**
- Ice–liquid–vapor triad, EZ bands, layered diagrams

**Motion:**
- Phase diagram `fadeIn` stepwise
- Scroll-triggered highlight of each phase
- EZ band glow animation on diagram

**Components:**
- `.field` with phase diagram
- `.grid.cols-3` for phases
- `.panel` for each state
- Animated transitions

---

### water_structured_ez
**Slug:** `/science/structured-water-ez`  
**Title:** Structured Water & EZ Domains  
**Priority:** P1  
**Zone:** Science deep dive  
**Tree Theme:** `liquid` (silver for structure)

**Visual Vibe:**
- Boundary layers, charge separation, field lines

**Motion:**
- Charged layers with alternating glow (positive/negative)
- `particleFlow` along boundary surfaces
- Tooltips `fadeIn` over diagrams

**Components:**
- `.field` with EZ visualization
- `.panel.facet` for layer details
- Charge indicators
- Particle system

---

### water_ph_orp_ec
**Slug:** `/science/water-ph-orp-ec`  
**Title:** pH, ORP & EC – How Water Carries Charge & Signals  
**Priority:** P2  
**Zone:** Science  
**Tree Theme:** `bioelectric` (emerald for charge)

**Visual Vibe:**
- Gauges, meters, parameter charts

**Motion:**
- Animated meters rising/falling on hover
- Comparison bars `slideIn` horizontally
- Small pulse on optimal ranges

**Components:**
- `.field` with meter displays
- `.grid.cols-3` for parameters
- Animated gauges
- Range indicators

---

### water_turbidity_clarity
**Slug:** `/science/water-turbidity-clarity`  
**Title:** Turbidity & Clarity – Seeing the Invisible  
**Priority:** P2  
**Zone:** Science  
**Tree Theme:** `water` (cyan)

**Visual Vibe:**
- Cloudy vs clear jars, particle fields, lab-like visuals

**Motion:**
- Split-screen before/after with reveal slider
- Particles slowly settling in illustration
- Hover to toggle clarity states

**Components:**
- `.grid.cols-2` for comparison
- `.panel` for each state
- Slider control
- Particle animation

---

## Cluster 4: SCIENCE LIBRARY – MINERALS

### mineral_overview_blueprint
**Slug:** `/science/mineral-science`  
**Title:** Mineral Science – Decode the Elemental Blueprint  
**Priority:** P1  
**Zone:** Science overview  
**Tree Theme:** `mineral` (light blue)

**Visual Vibe:**
- Periodic-table-inspired, node maps, earthy metals + indigo

**Motion:**
- Hero: periodic-style grid `fadeIn`
- `hoverGlow` on key ions (Mg, Fe, S, Si)
- `scrollReveal` for use-case columns

**Components:**
- `.field` with periodic grid
- `.panel.facet` for ion categories
- Interactive element map
- `.chip` for elements

---

### mineral_sulfate_chemistry
**Slug:** `/science/sulfate-chemistry`  
**Title:** Sulfate Chemistry – Why Sulfate Matters in Water  
**Priority:** P1  
**Zone:** Science  
**Tree Theme:** `sulfur` (yellow)

**Visual Vibe:**
- SO4 geometry, tetrahedra, yellow-gold highlights

**Motion:**
- Sulfate tetrahedron rotating slowly
- Flocculation animation: particles clustering and settling
- `scrollHighlight` on key sulfate ranges

**Components:**
- `.field` with tetrahedron
- 3D rotation animation
- `.panel` for chemistry
- Particle aggregation

---

### mineral_iron_magnesium_silicates
**Slug:** `/science/iron-magnesium-silicates`  
**Title:** Iron, Magnesium & Silicates – Earth's Catalytic Trio  
**Priority:** P2  
**Zone:** Science  
**Tree Theme:** `earth` (brown with mineral accents)

**Visual Vibe:**
- Mineral crystals, earthy tones, lines of charge

**Motion:**
- Crystal snapshots `fadeIn` with zoom
- `ionPaths` drawn dynamically between crystals
- `hoverGlow` on each element card

**Components:**
- `.grid.cols-3` for elements
- `.panel.facet` for each mineral
- Connection lines (SVG)
- Crystal imagery

---

### mineral_cofactors_enzymes
**Slug:** `/science/mineral-cofactors-enzymes`  
**Title:** Mineral Cofactors & Enzymes – The Hidden Keys  
**Priority:** P2  
**Zone:** Science  
**Tree Theme:** `bioelectric` (emerald for biological)

**Visual Vibe:**
- Enzyme lock-and-key, minimal diagrams, molecular style

**Motion:**
- Lock-and-key animation (ion snapping into enzyme site)
- `hoverHighlight` on specific minerals
- `scrollReveal` for enzyme classes

**Components:**
- `.field` with lock-key diagram
- Animated interaction
- `.panel` for enzyme types
- Mineral node highlights

---

## Cluster 5: CRYSTALLINE & BIOELECTRIC

### crystalline_overview
**Slug:** `/science/crystalline-matrix`  
**Title:** Crystalline Matrix – Geometry, Fields & Structure  
**Priority:** P1  
**Zone:** Science overview  
**Tree Theme:** `matrix` (gold for geometry)

**Visual Vibe:**
- Hexagonal lattices, star tetrahedrons, light grid

**Motion:**
- Lattice lines slowly pulsing
- `scrollReveal` for different scales (crystal → fascia)
- `hoverHighlight` on geometry types

**Components:**
- `.field` with lattice
- Sacred geometry overlays
- `.panel.facet` for structures
- Pulsing nodes

---

### crystalline_hexagonal
**Slug:** `/science/hexagonal-structures`  
**Title:** Hexagonal Structures – Honeycombs of Coherence  
**Priority:** P2  
**Zone:** Geometry  
**Tree Theme:** `matrix` (gold)

**Visual Vibe:**
- Honeycomb, hex-grids, blue-white glows

**Motion:**
- Honeycomb cells lighting up in patterns
- `scrollHighlight` per example (ice, bone, fascia)
- `hoverGlow` on specific cells

**Components:**
- `.field` with honeycomb
- Hexagonal grid (SVG)
- `.panel` for examples
- Cell highlighting

---

### bioelectric_overview
**Slug:** `/science/bioelectricity`  
**Title:** Bioelectricity: The Invisible Voltage System  
**Priority:** P1  
**Zone:** Science overview  
**Tree Theme:** `bioelectric` (emerald)

**Visual Vibe:**
- Human outline, field lines, ion dots

**Motion:**
- Human silhouette with flowing field lines
- Ion particles moving along paths (`particleFlow`)
- `scrollHighlight` on key concepts

**Components:**
- `.field` with body outline
- Field line visualization
- `.panel.facet` for concepts
- Ion particle system

---

### bioelectric_cell_voltage
**Slug:** `/science/cell-voltage`  
**Title:** Cell Voltage – Membrane Potentials & Coherence  
**Priority:** P2  
**Zone:** Science  
**Tree Theme:** `bioelectric` (emerald)

**Visual Vibe:**
- Battery icon meets cell, gradient across membrane, soft glow fields

**Motion:**
- Voltage gauge animation
- Membrane gradient color shifts
- Hover to view 'resting vs activated' states

**Components:**
- `.field` with cell diagram
- Voltage gauge
- `.panel` for states
- Gradient animation

---

## Cluster 6: TERRAIN & SULFUR PATHWAYS

### terrain_overview
**Slug:** `/science/terrain-model`  
**Title:** Terrain Model – The Body as a Living Ecosystem  
**Priority:** P1  
**Zone:** Systems view  
**Tree Theme:** `bioelectric` (emerald for ecosystem)

**Visual Vibe:**
- Ecosystem illustration, forest/body mirror, circulation loops

**Motion:**
- Ecosystem-to-body morph animation
- Scroll-linked zoom (macro nature → micro terrain)
- `hoverHighlight` on terrain factors

**Components:**
- `.field` with ecosystem visual
- Morph animation
- `.panel.facet` for factors
- Zoom transitions

---

### sulphur_sulfate_pathways_overview
**Slug:** `/science/sulphur-sulfate-pathways`  
**Title:** Sulphur & Sulfate Pathways – Earth's Transmutation Routes  
**Priority:** P1  
**Zone:** Science  
**Tree Theme:** `sulfur` (yellow)

**Visual Vibe:**
- S element symbol, flow arrows, earthy + yellow highlights

**Motion:**
- Pathway diagrams lighting sequentially
- Sulfate ion icons traveling tracks
- `scrollHighlight` for water/soil/body branches

**Components:**
- `.field` with pathway map
- Flow animation (SVG)
- `.panel` for each pathway
- Ion movement

---

### sulfate_activation_band
**Slug:** `/science/sulfate-activation-band`  
**Title:** The Sulfate Activation Band – 17–30 mg/L Window  
**Priority:** P2  
**Zone:** Measurement  
**Tree Theme:** `sulfur` (yellow)

**Visual Vibe:**
- Range band, overlapping curves, clean charts

**Motion:**
- Overlapping bell curves animating into overlap zone
- `highlightGlow` on 17–30 mg/L band
- Number counters animate to reference values

**Components:**
- `.field` with range visualization
- Overlapping curves
- `.panel` for context
- Glow effect on optimal band

---

## Cluster 7: ANDARA EXPLANATIONS

### andara_how_it_works
**Slug:** `/andara/how-it-works`  
**Title:** How Andara Ionic Works – Water Clarification & Conditioning  
**Priority:** P1  
**Zone:** Bridge: Product ↔ Science  
**Tree Theme:** `water` (cyan for water focus)

**Visual Vibe:**
- Step diagrams, before/after jars, charge arrows

**Motion:**
- Process flow 1→2→3 animated line
- Before/after slider on jars
- Particle clustering animation timed with scroll

**Components:**
- `.field` with process flow
- `.grid.cols-2` for before/after
- `.panel.pad` for steps
- Slider control

---

### andara_what_happens_when_added
**Slug:** `/andara/what-happens-when-you-add`  
**Title:** What Happens When You Add Andara to Water?  
**Priority:** P1  
**Zone:** Explanation  
**Tree Theme:** `water` (cyan)

**Visual Vibe:**
- Jar cutaway, particles, droplet icon

**Motion:**
- Drop animation (drop falling and diffusing)
- Clusters forming over time in repeat loop
- `scrollReveal` for explanatory captions

**Components:**
- `.field` with jar visual
- Drop animation
- Particle clustering
- `.panel` for stages

---

### andara_diy_water_testing
**Slug:** `/andara/diy-water-testing`  
**Title:** DIY Water Testing – See It With Your Own Eyes  
**Priority:** P2  
**Zone:** Participation  
**Tree Theme:** `mineral` (light blue for science)

**Visual Vibe:**
- Kitchen lab, test strips, hand-drawn-esque icons

**Motion:**
- Step cards `slideIn` sequentially
- `hoverZoom` on tool icons
- Subtle ripple behind 'before/after' photos

**Components:**
- Horizontal scroll `.grid`
- `.panel.pad` for each step
- `.chip` for materials
- Tool icons

---

## Cluster 8: BRAND / STORY

### brand_story_origin
**Slug:** `/about/andara-story`  
**Title:** The Andara Story – From Volcanic Origins to Liquid Light  
**Priority:** P2  
**Zone:** Brand story  
**Tree Theme:** `matrix` (gold for brand)

**Visual Vibe:**
- Timeline, volcano to bottle, human hands

**Motion:**
- Timeline horizontal scroll
- Parallax on key story images
- `hoverHighlight` on turning-point milestones

**Components:**
- `.field` with timeline
- Horizontal scroll container
- `.panel` for story beats
- Milestone markers

---

### brand_intention
**Slug:** `/about/intention`  
**Title:** Intention – Why Andara Exists  
**Priority:** P2  
**Zone:** Mission  
**Tree Theme:** `dna` (violet for vision)

**Visual Vibe:**
- Soft portraits, earth + cosmos, minimal typography

**Motion:**
- Text `fadeIn` with slight delay
- Background aurora slowly moving
- `hoverHighlight` on key intention quotes

**Components:**
- `.field` with aurora background
- `.h1` for main intention
- `.p` for narrative
- Quote highlights

---

### community_stories
**Slug:** `/community/stories`  
**Title:** Andara Community Stories  
**Priority:** P3  
**Zone:** Community  
**Tree Theme:** `bioelectric` (emerald for community)

**Visual Vibe:**
- Cards with quotes, subtle portrait silhouettes, warm glow

**Motion:**
- Card stack animation
- `hoverLift` + quote highlight
- `scrollReveal` section by section

**Components:**
- Masonry `.grid`
- `.panel.facet` for each story
- Quote styling
- Silhouette overlays

---

## Cluster 9: LEGAL / FIREWALL

### firewall_overview
**Slug:** `/firewall`  
**Title:** Andara Content Firewall – Zones, Language & Boundaries  
**Priority:** P1  
**Zone:** Meta  
**Tree Theme:** `mineral` (light blue for clarity)

**Visual Vibe:**
- Shield, three-level diagram, trust colors

**Motion:**
- 3-zone diagram lighting up per zone explanation
- `hoverHighlight` on allowed vs disallowed examples
- `scrollReveal` for guidelines

**Components:**
- `.field` with shield visual
- `.grid.cols-3` for zones
- `.panel` for each zone
- Example cards

---

### disclaimer_science
**Slug:** `/disclaimer/science`  
**Title:** Science & Education Disclaimer  
**Priority:** P1  
**Zone:** Legal  
**Tree Theme:** `mineral` (light blue)

**Visual Vibe:**
- Legal text but soft, info icons, clean layout

**Motion:**
- Accordion for sections
- Subtle `fadeIn`
- No flashy motion (professional)

**Components:**
- `.panel.pad` for disclaimer
- Accordion sections
- Info icons
- Minimal transitions

---

## Cluster 10: TOOLS & SYSTEM

### glossary_main
**Slug:** `/glossary`  
**Title:** Glossary – Water, Minerals & Fields  
**Priority:** P2  
**Zone:** Support  
**Tree Theme:** `mineral` (light blue for knowledge)

**Visual Vibe:**
- A–Z list, chips, cards

**Motion:**
- Letter sections `fadeIn`
- `hoverHighlight` on term
- Scroll-linked sticky alphabet index

**Components:**
- `.container` with alphabet nav
- `.panel` for each term
- `.chip` for categories
- Sticky sidebar

---

### andara_library_footer
**Slug:** `/andara-library`  
**Title:** Andara Library – Neural Science Footer Engine  
**Priority:** P1  
**Zone:** System  
**Tree Theme:** `dna` (violet for neural)

**Visual Vibe:**
- Neural map, footer intelligence, network lines

**Motion:**
- Footer neural graph with `nodePulse`
- `hoverGlow` showing potential next pages
- `scrollReveal` linking logic explanation

**Components:**
- `.field` with neural map
- Interactive node system
- Connection lines
- Related page suggestions

---

## Motion Pattern Summary by Page Type

### Product Pages
- **Primary:** `hoverLift`, `borderGlow`, `sparklePulse`
- **Transitions:** `fadeInUp`, `slideIn`
- **Interactive:** Price comparisons, bundle highlights

### Science Pages
- **Primary:** `scrollReveal`, `hoverHighlight`, `particleFlow`
- **Diagrams:** Animated charts, rotating 3D models
- **Interactive:** Tooltips, expandable sections

### Story Pages
- **Primary:** `fadeIn`, `parallax`, `cosmicPulse`
- **Narrative:** Timeline scrolling, quote highlights
- **Ambient:** Slow-moving backgrounds

### Tool Pages
- **Primary:** Reactive animations, number counters
- **Interactive:** Sliders, calculators, toggles
- **Feedback:** Glow on optimal ranges

---

## Tree Theme Mapping by Cluster

| Cluster | Primary Tree | Secondary Trees |
|---------|--------------|-----------------|
| Core/Home | `matrix` (gold) | `mineral`, `dna` |
| Products | `matrix` (gold) | `water` |
| Water Science | `water` (cyan) | `liquid` |
| Mineral Science | `mineral` (light blue) | `sulfur`, `earth` |
| Crystalline/Bioelectric | `matrix` (gold), `bioelectric` (emerald) | `dna` |
| Terrain/Sulfur | `bioelectric` (emerald), `sulfur` (yellow) | - |
| Andara Explanations | `water` (cyan) | `mineral` |
| Brand/Story | `matrix` (gold), `dna` (violet) | - |
| Legal/Firewall | `mineral` (light blue) | - |
| Tools/System | `mineral` (light blue), `dna` (violet) | - |

---

**Total Pages:** 120+ organized across 10 clusters with complete motion and visual specifications.
