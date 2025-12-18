# Andara Ionic 123-Page Library — Visual & Motion Specifications

## Overview

Complete visual and motion specifications for all 123 pages in the Andara Ionic universe, organized by zone and purpose.

**Zones:**
- **Zone 1:** Product & Shop
- **Zone 2:** Science & Education
- **Zone 3:** Brand & Story

---

## A. SHOP / PRODUCT & OFFER PAGES

### 1. Price per Liter Explainer
**Zone:** 1  
**Purpose:** Show price-per-liter changes between 100ml, 1L, and bundles  
**Tree Theme:** `matrix` (gold for value/pricing)

**Visual:**
- Hero: Split-screen – left: Andara bottle, right: glowing price-per-liter bar
- Color: Gold gradients for value emphasis

**Motion:**
- Bars smoothly grow from left to right
- Numbers count up with easing
- Subtle pulsing highlight around "best value" bar
- Duration: `var(--dur-3)` (420ms)

**Components:**
- `.field` hero with split layout
- `.panel.facet` for pricing cards
- `.divider` between price tiers
- `.chip` for "Best Value" badges

---

### 2. Bundle Savings Overview
**Zone:** 1  
**Purpose:** 3+1, 6+3, 8-pack, 9L bundles with psychological pricing  
**Tree Theme:** `matrix` (gold)

**Visual:**
- Hero: Tile of bundle boxes (3x, 6x, 9x) with "Most Loved" highlight
- Gold accent on savings badges

**Motion:**
- Cards stagger in (60-90ms per item)
- Hover: gentle lift `translateY(-4px)` and glow
- "Save X%" badges shimmer softly
- Stagger: `stagger.item` pattern

**Components:**
- `.grid.cols-3` for bundle cards
- `.panel.pad` for each bundle
- `.btn.primary` for purchase actions
- `.kicker` with `.dot` for "Most Popular"

---

### 3. EU vs Bali Line Comparison
**Zone:** 1  
**Purpose:** Explain EU 1L vs Bali 100ml lines  
**Tree Theme:** `water` (ocean blue for global)

**Visual:**
- Hero: Two vertical columns – "EU Line" vs "Bali Line"
- World-map subtle in background
- Cyan/aqua tones for international theme

**Motion:**
- Columns slide in from left/right
- Small animated line connecting Europe ↔ Bali
- Hover on flags = soft pulsing halo
- Arc-line animation: `path` stroke-dashoffset

**Components:**
- `.grid.cols-2` for comparison
- `.panel.facet` for each line
- `.divider` with gradient between columns
- Flag icons with hover glow

---

### 4. Shipping & Logistics – Global Overview
**Zone:** 1  
**Purpose:** Shipping zones, delivery times, costs, glass protection  
**Tree Theme:** `water` (global flow)

**Visual:**
- Hero: Minimal world map with luminous hubs (EU, Bali)
- Arc-lines connecting regions

**Motion:**
- Lines slowly flow across map
- Icons (plane, box, drop) fade up in sequence
- Pulsing hubs with `radial-gradient` animation
- Flow: continuous loop with `animation-delay`

**Components:**
- `.field` with map background
- `.chip` for shipping zones
- `.panel` for delivery info cards
- Animated SVG paths for routes

---

### 5. Reseller Program Overview
**Zone:** 1/3  
**Purpose:** Practitioner/store reseller landing  
**Tree Theme:** `bioelectric` (emerald for partnership/growth)

**Visual:**
- Hero: Glowing Andara bottles on shelf
- Subtle silhouettes of people in background
- Emerald accent for partnership theme

**Motion:**
- Bottles fade in sequentially
- "Partner with Andara" headline slides up
- Icons (handshake, globe, box) appear one-by-one
- Soft breathing glow on bottles

**Components:**
- `.field` hero
- `.grid.cols-3` for benefits
- `.btn.primary` for application CTA
- `.kicker` for "Join the Network"

---

### 6. B2B Industries – Overview
**Zone:** 1/3  
**Purpose:** Umbrella for all B2B verticals  
**Tree Theme:** `bioelectric` (emerald)

**Visual:**
- Hero: Grid of 6 icon-cards (Spas, Retreats, Water Bars, Cafés, Agriculture, Labs)
- Each card has industry icon + gradient

**Motion:**
- Staggered reveal of cards
- Hover: icon rotates slightly or glows
- Background gradient slowly shifts
- Card lift on hover with shadow bloom

**Components:**
- `.grid.cols-3` (2 rows)
- `.panel.facet` for each industry
- Icon with `transform: rotate()` on hover
- `.h3` for industry names

---

### 7. B2B – Spas & Retreats
**Zone:** 1/3  
**Purpose:** Spa water rituals, baths, tea-water  
**Tree Theme:** `liquid` (silver for spa/wellness)

**Visual:**
- Hero: Warm spa scene – bath, steam, Andara bottle, candle glows
- Silver/slate tones with warm accents

**Motion:**
- Gentle parallax steam (slow vertical drift)
- Water surface has slow ripple effect
- Hero headline fades in softly
- Ambient floating particles

**Components:**
- `.field` with spa imagery
- `.panel` for use-case cards
- `.p` with relaxed line-height
- Soft glow effects

---

### 8. B2B – Water Bars & Conscious Cafés
**Zone:** 1/3  
**Purpose:** Structured water menus for bars & cafés  
**Tree Theme:** `water` (cyan)

**Visual:**
- Hero: Bar counter with glasses glowing in different hues
- Each glass represents different water preparation

**Motion:**
- Glasses appear one after another
- Light passes through them like scan line
- Hover: glass glows brighter
- Liquid level animates subtly

**Components:**
- `.grid.cols-4` for water types
- `.panel` for each preparation
- `.chip` for water categories
- Gradient overlays on glasses

---

## B. WATER SCIENCE DEEP-DIVE PAGES

### 9. pH in Water Systems
**Zone:** 2  
**Purpose:** pH parameter education  
**Tree Theme:** `mineral` (light blue for science)

**Visual:**
- Hero: pH scale bar (0–14) with drinking water zone highlighted
- Color gradient from red → neutral → blue

**Motion:**
- Gradient slider moves across bar
- Droplet icon "falls" onto neutral zone
- Numbers fade in sequentially
- Indicator animates to target pH

**Components:**
- `.field` with pH scale
- `.panel` for explanation cards
- Animated range slider
- `.kicker` for "Neutral Zone"

---

### 10. ORP & Redox Basics
**Zone:** 2  
**Purpose:** ORP, electrons, oxidation/reduction  
**Tree Theme:** `bioelectric` (emerald for electron flow)

**Visual:**
- Hero: Dial/gauge from + to – mV
- Electron particles visualized

**Motion:**
- Needle sweeps to optimal zone
- Electrons (small particles) move left/right
- Pulse effect on optimal zone
- Gauge rotation with easing

**Components:**
- `.field` with gauge visualization
- `.panel.facet` for redox concepts
- Animated SVG dial
- Particle system for electrons

---

### 11. Electrical Conductivity & TDS
**Zone:** 2  
**Purpose:** EC, TDS, conductivity education  
**Tree Theme:** `bioelectric` (emerald)

**Visual:**
- Hero: Two electrodes in water with sparks/dots between
- Conductivity meter display

**Motion:**
- Dots flow between electrodes
- EC meter value counts up
- Graph line gently animates
- Spark effects on connection

**Components:**
- `.field` with electrode diagram
- `.panel` for metrics
- Animated line graph
- Counter animation for TDS value

---

### 12. Turbidity & Clarity
**Zone:** 2  
**Purpose:** Turbidity, light scattering, flocculation  
**Tree Theme:** `water` (cyan)

**Visual:**
- Hero: Side-by-side glasses, one cloudy, one clear
- Light beam passing through

**Motion:**
- Cloudy glass slowly clears
- Turbidity meter bar shrinks
- Beam of light becomes sharper
- Particle settling animation

**Components:**
- `.grid.cols-2` for comparison
- `.panel` for each glass
- Animated opacity for clarity
- `.divider` between states

---

### 13. Hydration Layers & Interfaces
**Zone:** 2  
**Purpose:** Structured layers near surfaces  
**Tree Theme:** `liquid` (silver for interfaces)

**Visual:**
- Hero: Micro-diagram: surface, water layers, ions
- Layered visualization

**Motion:**
- Layers "click" into place
- Ions gently oscillate
- Soft glow forms near surface
- Staggered layer reveal

**Components:**
- `.field` with layered diagram
- `.panel.facet` for each layer
- Animated stacking effect
- Ion particle system

---

### 14. Light & Water
**Zone:** 2  
**Purpose:** Photons, wavelengths, structure  
**Tree Theme:** `dna` (violet for light/photonic)

**Visual:**
- Hero: Beam of light entering water, splitting into spectral tones
- Prismatic effect

**Motion:**
- Beam continuously sweeps across
- Subtle spectral shift
- Particles shimmer
- Rainbow gradient animation

**Components:**
- `.field` with light beam
- Spectral gradient overlay
- `.panel` for wavelength info
- Animated refraction

---

### 15. EZ Water – Home Experiments
**Zone:** 2  
**Purpose:** DIY EZ experiments  
**Tree Theme:** `water` (cyan)

**Visual:**
- Hero: Table with tools (laser, glass, tape)
- Step-by-step layout

**Motion:**
- Step cards slide horizontally
- Icons animate on hover
- Laser beam, glass outline, light reflection
- Sequential reveal

**Components:**
- Horizontal scroll `.grid`
- `.panel.pad` for each step
- `.chip` for materials needed
- Icon animations

---

### 16. Vortex Technologies
**Zone:** 2  
**Purpose:** Vortexing devices, spiral flow  
**Tree Theme:** `water` (cyan for flow)

**Visual:**
- Hero: Water spiral in glass tube, aerial view
- Vortex pattern

**Motion:**
- Subtle looping vortex animation
- Cards rotate slightly on scroll
- Spiral path animation
- Continuous rotation

**Components:**
- `.field` with vortex visual
- `.panel` for device types
- Animated spiral SVG
- Rotation transforms

---

### 17. Magnetics & Orientation
**Zone:** 2  
**Purpose:** Magnetic fields & water  
**Tree Theme:** `bioelectric` (emerald for fields)

**Visual:**
- Hero: Magnet near water pipe, field lines
- Magnetic field visualization

**Motion:**
- Field lines shimmer
- Droplet icons align along field
- Pulsing magnetic poles
- Alignment animation on scroll

**Components:**
- `.field` with magnetic diagram
- `.panel.facet` for concepts
- Animated field lines (SVG)
- Particle alignment

---

### 18. Natural vs Treated Waters
**Zone:** 2  
**Purpose:** Compare water types  
**Tree Theme:** `water` (cyan)

**Visual:**
- Hero: Four cards (spring, tap, filtered, Andara-conditioned)
- Mini parameter charts

**Motion:**
- Cards stagger in
- Metrics animate from 0 to target
- Background gradient shifts grey → vivid
- Chart bars grow

**Components:**
- `.grid.cols-4`
- `.panel.pad` for each type
- Animated bar charts
- `.chip` for water categories

---

## C. MINERAL SCIENCE DEEP-DIVE PAGES

### 19. Ocean Minerals
**Zone:** 2  
**Purpose:** Ocean mineral composition  
**Tree Theme:** `water` (ocean blue)

**Visual:**
- Hero: Deep blue ocean cross-section
- Mineral icons floating at depths

**Motion:**
- Icons drift gently
- Depth labels fade in
- Waves at top oscillate slowly
- Vertical parallax on scroll

**Components:**
- `.field` with ocean gradient
- `.panel` for mineral profiles
- Floating icon animation
- Wave SVG animation

---

### 20. Lake & Brine Minerals
**Zone:** 2  
**Purpose:** Salt lake brines, concentrated minerals  
**Tree Theme:** `sulfur` (yellow for salt)

**Visual:**
- Hero: Salt lake aerial view
- Crystallized salt textures

**Motion:**
- Hexagonal salt patterns fade in
- TDS meter bar grows
- Crystal formation animation
- Texture reveal

**Components:**
- `.field` with salt texture
- `.panel.facet` for brine types
- Hexagonal grid overlay
- Meter animation

---

### 21. Plant & Seaweed Minerals
**Zone:** 2  
**Purpose:** Kelp, algae, greens as mineral carriers  
**Tree Theme:** `bioelectric` (emerald for plants)

**Visual:**
- Hero: Collage of kelp, seaweed, spirulina, moringa
- Green organic theme

**Motion:**
- Leaves float slowly
- Trace mineral icons orbit them
- Gentle sway animation
- Orbital paths

**Components:**
- `.field` with plant collage
- `.panel` for each source
- Floating animation
- Orbital icon system

---

### 22. Fulvic & Humic Complexes
**Zone:** 2  
**Purpose:** Humus, fulvic, humic acids  
**Tree Theme:** `earth` (brown for soil)

**Visual:**
- Hero: Dark earthy gradient
- Molecular network lines

**Motion:**
- Network nodes pulse
- Slow zoom-in on soil profile
- Connection lines animate
- Node glow effects

**Components:**
- `.field` with earth tones
- `.panel.facet` for complexes
- Network diagram (SVG)
- Pulsing nodes

---

### 23. Sea Salts & Trace Elements
**Zone:** 2  
**Purpose:** Himalayan, Celtic, sea salts  
**Tree Theme:** `sulfur` (yellow)

**Visual:**
- Hero: Pink salt crystals macro
- Mineral icons

**Motion:**
- Crystals appear as scattered particles
- Particles gather together
- Icons pop in next to each
- Crystal formation

**Components:**
- `.field` with salt texture
- `.grid.cols-3` for salt types
- Particle system
- `.chip` for elements

---

### 24. Black Mica & Sulfated Minerals
**Zone:** 2  
**Purpose:** Black mica origin, sulfate ions  
**Tree Theme:** `sulfur` (yellow for sulfate)

**Visual:**
- Hero: Black mica rock cross-section glowing
- Ions emerging into water

**Motion:**
- Pulses of light from rock to water
- Sulfate icons drift outward
- Glow effect on rock
- Particle emission

**Components:**
- `.field` with rock visual
- `.panel` for mineral info
- Animated light pulses
- Ion particle system

---

### 25. Rare Earth Elements
**Zone:** 2  
**Purpose:** Rare earths in trace form  
**Tree Theme:** `dna` (violet for rare/cosmic)

**Visual:**
- Hero: Star-like lattice of glowing nodes
- Element symbols

**Motion:**
- Nodes twinkle
- Nodes expand on hover with tooltip
- Constellation-like pattern
- Gentle pulsing

**Components:**
- `.field` with star field
- Interactive node map
- Tooltip on hover
- `.chip` for elements

---

### 26. Mineral Cofactors & Enzymes
**Zone:** 2  
**Purpose:** Minerals as enzyme cofactors  
**Tree Theme:** `bioelectric` (emerald for biological)

**Visual:**
- Hero: Lock-and-key metaphor
- Enzyme as lock, mineral as glowing key

**Motion:**
- Key slides into lock
- Unlock animation loops
- Enzyme network fades in
- Connection highlights

**Components:**
- `.field` with lock-key diagram
- `.panel.facet` for enzymes
- Animated SVG interaction
- Network visualization

---

### 27. Iron & Sulfur Synergy
**Zone:** 2  
**Purpose:** Fe + S, redox chemistry  
**Tree Theme:** `sulfur` (yellow with rust red accent)

**Visual:**
- Hero: Dual-color (rust red + soft yellow)
- Fe and S icons interacting

**Motion:**
- Red/Yellow pulses alternate
- Small particles aggregate then settle
- Synergy animation
- Color mixing effect

**Components:**
- `.field` with dual gradient
- `.panel` for Fe/S roles
- Particle aggregation
- Alternating pulse

---

### 28. Mineral Toxicity & Boundaries
**Zone:** 2  
**Purpose:** Doses, thresholds, testing  
**Tree Theme:** `mineral` (light blue for education)

**Visual:**
- Hero: Balanced scales
- Minerals vs warning sign

**Motion:**
- Scale gently tilts to equilibrium
- "Safe zone" band glows
- Balance animation
- Threshold indicator

**Components:**
- `.field` with scale visual
- `.panel` for safety info
- Animated balance
- Range indicator

---

## D. CRYSTALLINE MATRIX & GEOMETRY

### 29. Hexagonal Water Structures
**Zone:** 2  
**Purpose:** Hexagonal motifs in water  
**Tree Theme:** `matrix` (gold for geometry)

**Visual:**
- Hero: Rotating hexagonal snowflake
- Water-cell motif

**Motion:**
- Gentle continuous rotation
- Highlight segments on scroll
- Symmetry emphasis
- 360° rotation loop

**Components:**
- `.field` with hexagon
- Animated SVG hexagon
- Segment highlighting
- Rotation transform

---

### 30. Tetrahedral Sulfate Geometry
**Zone:** 2  
**Purpose:** SO₄ tetrahedral shape  
**Tree Theme:** `sulfur` (yellow)

**Visual:**
- Hero: 3D tetrahedron rotating
- Vertex labels

**Motion:**
- Tetrahedron rotates continuously
- Edges pulse
- Labels fade in sequence
- 3D rotation effect

**Components:**
- `.field` with 3D visual
- Animated 3D tetrahedron
- Sequential labels
- Edge glow

---

### 31. 3–6–9 Harmonic Layouts
**Zone:** 2/3  
**Purpose:** 3-6-9 in Andara layout  
**Tree Theme:** `matrix` (gold)

**Visual:**
- Hero: 3, 6, 9 node layout around center
- Sacred geometry pattern

**Motion:**
- Nodes light up 3→6→9 sequence
- Radial lines expand
- Harmonic pulsing
- Sequential activation

**Components:**
- `.field` with node diagram
- Animated node sequence
- Radial line animation
- Center glow

---

### 32. Crystal Grids in Nature
**Zone:** 2  
**Purpose:** Crystalline grids from minerals  
**Tree Theme:** `matrix` (gold)

**Visual:**
- Hero: Collage of crystal structures
- Different zoom levels

**Motion:**
- Zoom transitions between magnifications
- Crystal formation reveals
- Scale animation
- Layered parallax

**Components:**
- `.field` with crystal imagery
- Zoom transition effect
- `.panel` for each structure
- Magnification indicator

---

### 33. Light Lattices & Photonic Flow
**Zone:** 2  
**Purpose:** Crystals, light, photonic coherence  
**Tree Theme:** `dna` (violet for photonic)

**Visual:**
- Hero: Luminous grid with light particles
- Lattice structure

**Motion:**
- Particles move along lattice paths
- Hover reveals tooltips
- Flow animation
- Path illumination

**Components:**
- `.field` with lattice
- Animated particle paths
- Interactive nodes
- Flow visualization

---

### 34. Water, Crystal & Geometry – Integrated Field Map
**Zone:** 2/3  
**Purpose:** Tie water, minerals, geometry together  
**Tree Theme:** `matrix` (gold)

**Visual:**
- Hero: Triad graphic (Water – Minerals – Geometry)
- Glowing connection lines

**Motion:**
- Each corner pulses on hover
- Center field slowly breathes
- Connection lines animate
- Unified field effect

**Components:**
- `.field` with triad
- Three `.panel.facet` corners
- Connecting lines (SVG)
- Breathing animation

---

## E. BIOELECTRIC & TERRAIN PAGES

### 35. Terrain vs Germ
**Zone:** 2  
**Purpose:** Terrain model vs germ focus  
**Tree Theme:** `bioelectric` (emerald for terrain)

**Visual:**
- Hero: Split illustration
- Left: microbe-focused, Right: environment-focused

**Motion:**
- Fade-in comparison arrows
- Background shifts grey → green-blue
- Side-by-side reveal
- Color transition

**Components:**
- `.grid.cols-2` comparison
- `.panel` for each model
- `.divider` between
- Color gradient shift

---

### 36. Cell Membrane Electric Model
**Zone:** 2  
**Purpose:** Cell as battery system  
**Tree Theme:** `bioelectric` (emerald)

**Visual:**
- Hero: Cell membrane cross-section
- Ions plotted

**Motion:**
- Ions move across channels
- Potential difference animates
- Membrane pulse
- Gradient flow

**Components:**
- `.field` with membrane diagram
- Ion particle system
- Voltage indicator
- Channel animation

---

### 37. Ion Channels & Gradients
**Zone:** 2  
**Purpose:** Channels, pumps, gradients  
**Tree Theme:** `bioelectric` (emerald)

**Visual:**
- Hero: Animated gate in membrane
- Opening/closing mechanism

**Motion:**
- Gate opens and closes
- Ions pass when open
- Gradient arrows move
- Flow animation

**Components:**
- `.field` with channel
- Animated gate (SVG)
- Ion flow particles
- Gradient arrows

---

### 38. Proton Gradient Maps
**Zone:** 2  
**Purpose:** Proton gradients, mitochondria  
**Tree Theme:** `bioelectric` (emerald)

**Visual:**
- Hero: Mitochondria-like shape
- Gradient bar wrapping

**Motion:**
- Protons as glowing beads flow
- Membrane tunnel animation
- Gradient flow
- Bead movement

**Components:**
- `.field` with mitochondria
- Particle flow system
- Gradient animation
- Tunnel path

---

### 39. Voltage & Detox Pathways
**Zone:** 2  
**Purpose:** Voltage, charge, movement  
**Tree Theme:** `bioelectric` (emerald)

**Visual:**
- Hero: Body silhouette
- Arrows and potential zones

**Motion:**
- Charge pulses travel along paths
- Detox routes light up sequentially
- Pathway animation
- Zone highlighting

**Components:**
- `.field` with body outline
- Animated pathways
- Sequential lighting
- Pulse effects

---

### 40. Bioelectric Conductivity in Tissues
**Zone:** 2  
**Purpose:** Conductivity, minerals, signals  
**Tree Theme:** `bioelectric` (emerald)

**Visual:**
- Hero: Nerve-like cable
- Water-filled crystalline tube

**Motion:**
- Light pulses through tube
- Conductivity meter animates
- Signal transmission
- Pulse propagation

**Components:**
- `.field` with tube visual
- Pulse animation
- Meter display
- Signal path

---

### 41. EMF, Minerals & Shielding
**Zone:** 2  
**Purpose:** Fields, conductors, shields  
**Tree Theme:** `bioelectric` (emerald)

**Visual:**
- Hero: Shield icon with waves
- Some passing, some deflected

**Motion:**
- Waves animate outward
- Earth grounding line glows
- Deflection animation
- Shield pulse

**Components:**
- `.field` with shield
- Wave animation (SVG)
- Grounding indicator
- Deflection paths

---

### 42. Bioelectric Maps: Water · Body · Soil
**Zone:** 2/3  
**Purpose:** Connect water, human, soil circuits  
**Tree Theme:** `bioelectric` (emerald)

**Visual:**
- Hero: Three stacked layers
- Sky/water, human, soil with lines

**Motion:**
- Charge pulses cycle between layers
- Continuous loop
- Layer connection
- Unified field

**Components:**
- `.field` with layered diagram
- Three `.panel` layers
- Connecting pulses
- Cycle animation

---

## F. MINERALS & MICROBIOME

### 43. Mineral Roots of the Microbiome
**Zone:** 2  
**Purpose:** Bifidobacterium, SCFA, enzymes  
**Tree Theme:** `earth` (brown for microbiome)

**Visual:**
- Hero: Gut cross-section
- Colorful microbiome cloud

**Motion:**
- Microbes wobble gently
- Mineral icons "dock" near enzymes
- SCFA arrows spiral outward
- Organic movement

**Components:**
- `.field` with gut visual
- Microbe particles
- Docking animation
- Spiral paths

---

### 44. Bifidobacterium & Prebiotic Fibers
**Zone:** 2  
**Purpose:** Minerals + fibers support fermentation  
**Tree Theme:** `earth` (brown)

**Visual:**
- Hero: Fiber strands being broken down
- Cartoon microbes, minerals nearby

**Motion:**
- Fiber strands shorten
- Acids (acetate/lactate) drift away
- Breakdown animation
- Product emission

**Components:**
- `.field` with fiber visual
- Microbe animation
- Fiber degradation
- Acid particle drift

---

### 45. SCFAs & Mineral Environments
**Zone:** 2  
**Purpose:** SCFA production, pH zones  
**Tree Theme:** `earth` (brown)

**Visual:**
- Hero: SCFA icons orbiting cell
- Acetate, butyrate, propionate

**Motion:**
- Orbiting paths
- pH mini-bar shifts
- Orbital animation
- Zone transitions

**Components:**
- `.field` with cell
- Orbital paths (SVG)
- SCFA icons
- pH indicator

---

### 46. Deep-Sea Mineral Waters & Gut Studies
**Zone:** 2  
**Purpose:** Summarize deep sea water studies  
**Tree Theme:** `water` (ocean blue)

**Visual:**
- Hero: Deep water gradient
- Gut silhouette with particles

**Motion:**
- Particles move slowly upward
- Study metrics slide in
- Gradient flow
- Data reveal

**Components:**
- `.field` with ocean gradient
- Particle system
- Metric cards
- Sequential reveal

---

## G. STORY / BRAND / COMMUNITY

### 47. From Volcanoes to Vitality
**Zone:** 3  
**Purpose:** Volcanic origin → Andara vision  
**Tree Theme:** `matrix` (gold for brand)

**Visual:**
- Hero: Timeline (volcano → rock → solution → glass)
- Story progression

**Motion:**
- Timeline animates left to right
- Each stage glows in viewport
- Progressive reveal
- Stage highlighting

**Components:**
- `.field` with timeline
- Stage `.panel` cards
- Horizontal scroll
- Glow effects

---

### 48. Inside the Andara Lab
**Zone:** 2/3  
**Purpose:** Methods & measurements  
**Tree Theme:** `mineral` (light blue for science)

**Visual:**
- Hero: Lab bench with meters
- Andara bottle, instruments

**Motion:**
- Instrument screens flicker to life
- Graphs draw themselves
- Meter animations
- Data visualization

**Components:**
- `.field` with lab scene
- Animated meters
- Graph drawing
- Screen flicker

---

### 49. Vision – Water, Minerals & Future Cities
**Zone:** 3  
**Purpose:** Visionary future cities  
**Tree Theme:** `dna` (violet for futuristic)

**Visual:**
- Hero: Futuristic city
- Glowing water lines through buildings

**Motion:**
- Light flows along pipes
- Buildings light up successively
- Flow animation
- Sequential activation

**Components:**
- `.field` with city visual
- Flow paths (SVG)
- Building highlights
- Pipe animation

---

### 50. Community & Experiments Hub
**Zone:** 3  
**Purpose:** User experiments, setups  
**Tree Theme:** `bioelectric` (emerald for community)

**Visual:**
- Hero: Polaroid-style snapshots
- Pinned on board

**Motion:**
- Cards drop in with rotation
- Hovering straightens them
- Pin-board effect
- Card shuffle

**Components:**
- `.grid` masonry layout
- `.panel` for each snapshot
- Rotation animation
- Hover straighten

---

### 51. Andara Library Index
**Zone:** 2  
**Purpose:** Neural Footer top-level index  
**Tree Theme:** `matrix` (gold for library)

**Visual:**
- Hero: Library-like UI
- Big category tiles

**Motion:**
- Tiles scale on hover
- Topic chips stagger in
- Grid animation
- Hover lift

**Components:**
- `.grid.cols-4` for categories
- `.panel.facet` tiles
- `.chip` for topics
- Scale transform

---

### 52. Experiments & Measurements Index
**Zone:** 2  
**Purpose:** Index for all experiments  
**Tree Theme:** `mineral` (light blue for science)

**Visual:**
- Hero: Icon grid of tools
- Meter, beaker, laser, vortex

**Motion:**
- Tools bounce on entry
- Tags slide up from below
- Staggered reveal
- Bounce animation

**Components:**
- `.grid.cols-4` for tools
- `.panel` for each experiment
- Icon bounce
- Tag slide-up

---

## Motion System Summary

### Timing Constants
- **Fast:** `var(--dur-1)` (160ms) - Micro-interactions
- **Normal:** `var(--dur-2)` (260ms) - Hover, glow
- **Slow:** `var(--dur-3)` (420ms) - Reveal, slide

### Easing
- **Ease-out:** `var(--ease-out)` - Most animations
- **Ease-inout:** `var(--ease-inout)` - Continuous loops

### Common Patterns
- **Stagger:** 60-90ms per item
- **Hover lift:** `-2px` buttons, `-4px` cards
- **Pulse:** `scale(1.05)` with opacity shift
- **Flow:** Continuous loop with `animation-delay`

---

## Tree Theme Mapping by Zone

| Zone | Primary Trees | Use Case |
|------|---------------|----------|
| Zone 1 (Product) | `matrix` (gold), `water` (cyan) | Value, global reach |
| Zone 2 (Science) | `mineral` (light blue), `bioelectric` (emerald), `water` (cyan) | Education, research |
| Zone 3 (Brand) | `matrix` (gold), `dna` (violet) | Vision, future |

---

## Integration with AI Generation

When generating these pages, the AI should:

1. **Detect page type** from brief
2. **Apply appropriate tree theme** from mappings above
3. **Use motion patterns** specified for that page type
4. **Include Andara Ionic 1.0 classes** (`.field`, `.panel.facet`, etc.)
5. **Reference motion constants** (`var(--dur-2)`, `var(--ease-out)`)

---

**Total Pages:** 123 (73 existing + 52 new v1.4 extension)
