/**
 * Seed all 39 clusters with Visual Vibe configurations
 * Based on the "Visual Vibe Config" format from user specification
 * 
 * Run: npx tsx scripts/seed-cluster-vibes.ts
 */
import 'dotenv/config';

// Dynamic import to ensure DATABASE_URL is loaded first
async function run() {
    const { db } = await import('../server/db');
    const { clusters } = await import('../shared/schema');
    const { eq } = await import('drizzle-orm');

    // Define all 39 cluster visual vibes with the exact format specified
    const clusterVibes: Record<string, {
        color: string;
        visualVibe: {
            vibeKeywords: string[];
            emotionalTone: string[];
            animationIdeas: string[];
            aiImagePromptPattern?: string;
            designerNotes?: string;
        };
        clusterType?: 'page' | 'alias' | 'rollup';
    }> = {
        // 1) home
        home: {
            color: '#4b0082',
            visualVibe: {
                vibeKeywords: ['cosmic spring', 'lab-meets-nature', 'deep indigo night', 'bioluminescent water', 'premium temple-tech'],
                emotionalTone: ['awe', 'welcoming', 'elevated clarity', 'this is bigger than water', 'calm confidence'],
                animationIdeas: ['soft nebula gradients', 'bioluminescent water mist', 'sacred-geometry arcs', 'ion particles'],
                aiImagePromptPattern: '16:9 cinematic hero scene. Dark indigo night field with soft nebula gradients and subtle bioluminescent water mist. Center: elegant glass bottle silhouette hinted by rim light (no brand text), surrounded by faint sacred-geometry arcs and tiny ion particles. Style: premium future-organic, crystalline glow, high fidelity, clean negative space, soft bloom, ultra-detailed, 8k.',
                designerNotes: 'Primary landing vibe. Keep strong left-copy readability. Right side has hero visual. Glow is present but controlled. Minimal UI noise.'
            }
        },

        // 2) root (system base)
        root: {
            color: '#0b1020',
            visualVibe: {
                vibeKeywords: ['neutral system base', 'quiet container', 'invisible structure', 'framework layer'],
                emotionalTone: ['invisible stability', 'neutral', 'dependable', 'silent authority'],
                animationIdeas: ['subtle grain', 'soft radial light'],
                aiImagePromptPattern: '16:9 minimal dark background gradient. No objects. Subtle grain and soft radial light. Ultra-clean, low ornament, 8k.',
                designerNotes: 'This is the base skin. Should never dominate. Acts like the "canvas" for other clusters.'
            }
        },

        // 3) shop / products
        products: {
            color: '#4b0082',
            visualVibe: {
                vibeKeywords: ['premium', 'clean', 'conversion-focused', 'cosmic indigo', 'sunburst gold'],
                emotionalTone: ['certainty', 'professionalism', 'clean premium', 'high trust'],
                animationIdeas: ['conversionCard', 'pricing cards float', 'highlight card scale'],
                aiImagePromptPattern: '16:9 premium e-commerce hero. Dark cosmic indigo gradient with focused spotlight. Product bottle renders, glowing sunburst gold accents. Style: luxury lab artifact, crisp edges, high-end studio lighting, 8k.',
                designerNotes: 'Theme: Premium, clean, conversion-focused. CTA buttons in indigo/gold. Pricing grids with strong hierarchy.'
            }
        },

        // 4) science (hub)
        'science-education': {
            color: '#87ceeb',
            visualVibe: {
                vibeKeywords: ['science hub', 'knowledge atlas', 'structured navigation', 'clarity library'],
                emotionalTone: ['curious', 'grounded', 'systematic', 'learn without overwhelm'],
                animationIdeas: ['constellation-like node map', 'subtle lines connecting topics'],
                aiImagePromptPattern: '16:9 abstract science library cover. Soft sky-blue gradients on dark background, faint constellation-like node map, subtle lines connecting topics (water, minerals, bioelectricity). Clean, modern, legible negative space, 8k.',
                designerNotes: 'This is the umbrella hub. Should feel like an "index of worlds" with clear category tiles.'
            }
        },

        // 5) about
        about: {
            color: '#4b0082',
            visualVibe: {
                vibeKeywords: ['origin', 'team', 'mission', 'integrity', 'behind the lab', 'human story'],
                emotionalTone: ['sincere', 'calm confidence', 'transparent', 'relational'],
                animationIdeas: ['warm gold accents', 'soft documentary lighting'],
                aiImagePromptPattern: '16:9 calm brand portrait background. Indigo night gradient with warm gold accents, soft documentary lighting feel, minimal geometry, subtle texture, 8k.',
                designerNotes: 'Less "cosmic", more "real". Add trust + process visuals (hands, lab tools, nature). No hype.'
            }
        },

        // 6) trust / support
        support: {
            color: '#10b981',
            visualVibe: {
                vibeKeywords: ['calm', 'safe', 'reassuring green', 'support gateway', 'checklists'],
                emotionalTone: ['reassurance', 'clarity', 'accountability', 'we got you'],
                animationIdeas: ['calmFade', 'soft FAQ list fade', 'scrollTo transitions'],
                aiImagePromptPattern: '16:9 calm support background. Dark background with soft radial mint glows. Clean icons for shield, info, truck. Style: reassuring professional, ultra-clean, 8k.',
                designerNotes: 'Theme: Calm, safe, "we\'ve got you". Use accordions and big hit-areas. Soft radial mint glows behind cards.'
            }
        },

        // 7) bioelectric-science
        'bioelectric-science': {
            color: '#22c55e',
            visualVibe: {
                vibeKeywords: ['voltage', 'ion flow', 'living field green', 'electric cyan charge', 'membranes', 'signals'],
                emotionalTone: ['awakened understanding', 'energetic clarity', 'biofield resonance'],
                animationIdeas: ['energeticPulse', 'signal pulse lines', 'voltage count-up'],
                aiImagePromptPattern: '16:9 bioelectric field visualization. Dark background with emerald + cyan current lines. Thin neon lines, node diagrams, oscilloscope style. Style: scientific voltage, high-fidelity, 8k.',
                designerNotes: 'Theme: Voltage, currents, membranes, signals. Cards with thin neon borders. Use metric mono font for key numbers.'
            }
        },

        // 8) tools
        tools: {
            color: '#63b4ff',
            visualVibe: {
                vibeKeywords: ['calm lab dashboard', 'data clarity', 'precise yet friendly', 'interactive tools', 'tables that feel premium'],
                emotionalTone: ['ease', 'confidence', 'I can calculate this instantly', 'low stress'],
                animationIdeas: ['thin grid lines', 'soft glow around panels'],
                aiImagePromptPattern: '16:9 futuristic lab dashboard background. Dark clean UI field with subtle blue gradients, thin grid lines, soft glow around panels. No text. Clean, 8k.',
                designerNotes: 'Tools must be ultra-readable. Use mono numerals, strong contrast, no heavy ornament behind tables.'
            }
        },

        // 9) experiments
        experiments: {
            color: '#9aa7b6',
            visualVibe: {
                vibeKeywords: ['lab logbook', 'experiment cards', 'method + result', 'repeatable testing'],
                emotionalTone: ['disciplined', 'transparent', 'curious', 'rigorous'],
                animationIdeas: ['panel cards', 'small measurement icons'],
                aiImagePromptPattern: '16:9 experiment lab notebook aesthetic. Dark background with silver-blue lighting, subtle panel cards, small measurement icons, clean modern lab style, 8k.',
                designerNotes: 'Present methodology clearly. Always include "Setup / Steps / Result / Interpretation".'
            }
        },

        // 10) bioelectricity (science/bioelectric)
        bioelectricity: {
            color: '#8fc53a',
            visualVibe: {
                vibeKeywords: ['ion currents', 'cellular voltage', 'coherence', 'terrain electricity', 'living grid'],
                emotionalTone: ['empowered understanding', 'clarity', 'calm intensity'],
                animationIdeas: ['thin emerald lines and nodes', 'cyan sparks'],
                aiImagePromptPattern: '16:9 bioelectric grid close-up. Thin emerald lines and nodes flowing over liquid surface, subtle cyan sparks, dark clean void, sci-science aesthetic, 8k.',
                designerNotes: 'Same family as bioelectric-science, but more "chapter deep dive".'
            }
        },

        // 11) microbiome
        microbiome: {
            color: '#c49a6c',
            visualVibe: {
                vibeKeywords: ['terrain ecology', 'mineral-gut axis', 'microbial garden', 'digestion ecosystem', 'earth intelligence'],
                emotionalTone: ['grounded', 'nurturing', 'coherent', 'practical wisdom'],
                animationIdeas: ['organic fractal forms', 'mineral particles in gentle flow'],
                aiImagePromptPattern: '16:9 abstract microbiome ecosystem. Dark background with warm earthy gradients, subtle organic fractal forms, mineral particles in gentle flow, clean modern style, 8k.',
                designerNotes: 'Avoid gross biology visuals. Keep it elegant: "ecosystem and terrain".'
            }
        },

        // 12) story (Brand & Story hub)
        story: {
            color: '#ffd700',
            visualVibe: {
                vibeKeywords: ['origin chapters', 'volcanic earth to structured water', 'bridge between worlds', 'documentary mythos'],
                emotionalTone: ['inspiring', 'intimate', 'legendary but believable'],
                animationIdeas: ['volcanic stone texture', 'gold light veins', 'geometry arcs'],
                aiImagePromptPattern: '16:9 cinematic story header. Volcanic stone texture fades into dark indigo void with gold light veins. Subtle geometry arcs. Premium documentary lighting, 8k.',
                designerNotes: 'This is scroll storytelling. Use chapters, timeline, and "from…to…" transitions.'
            }
        },

        // 13) library
        library: {
            color: '#63b4ff',
            visualVibe: {
                vibeKeywords: ['index atlas', 'search-first', 'knowledge map', 'glossary cards', 'constellations of topics'],
                emotionalTone: ['organized calm', 'curiosity', 'everything is connected'],
                animationIdeas: ['node-map constellation lines'],
                aiImagePromptPattern: '16:9 abstract knowledge atlas. Dark background with soft blue gradients and node-map constellation lines, clean negative space, 8k.',
                designerNotes: 'Prioritize search, tags, filters. Feels like a "neural library".'
            }
        },

        // 14) tools_glossary_system
        tools_glossary_system: {
            color: '#0b1020',
            visualVibe: {
                vibeKeywords: ['system footer', 'neural links', 'glossary microcards', 'quiet navigation'],
                emotionalTone: ['invisible support', 'calm', 'dependable'],
                animationIdeas: ['subtle grid', 'near-invisible glow'],
                aiImagePromptPattern: '16:9 minimal dark system background. Subtle grid, near-invisible glow, 8k.',
                designerNotes: 'Keep it light and functional. Never distract from page content.'
            }
        },

        // 15) core_home
        core_home: {
            color: '#4b0082',
            visualVibe: {
                vibeKeywords: ['navigation core', 'pillar gateway', 'universe map', 'clean wayfinding'],
                emotionalTone: ['confident direction', 'simplicity', 'start here'],
                animationIdeas: ['cyan-gold gradients', 'geometry rings'],
                aiImagePromptPattern: '16:9 abstract navigation gateway. Indigo background with soft cyan-gold gradients and subtle geometry rings, minimal, 8k.',
                designerNotes: 'Mega menu + pillar cards. Must feel like a "portal map", not a list.'
            }
        },

        // 16) products_zone1
        products_zone1: {
            color: '#dfe7f1',
            visualVibe: {
                vibeKeywords: ['compliance-safe', 'water treatment clarity', 'instruction-first', 'no medical vibe'],
                emotionalTone: ['responsible', 'precise', 'calm authority'],
                animationIdeas: ['thin lines', 'subtle cyan highlight'],
                aiImagePromptPattern: '16:9 clean instruction background. Dark-to-silver gradient with subtle cyan highlight and thin lines. No mystical imagery. 8k.',
                designerNotes: 'This is the "firewall-safe commerce zone". Always include "what it is / what it is not" blocks.'
            }
        },

        // 17) science_water (Water Science)
        science_water: {
            color: '#3b82f6',
            visualVibe: {
                vibeKeywords: ['clean lab', 'flowing water', 'charged water blue', 'ripples', 'hexagonal geometry'],
                emotionalTone: ['clarity', 'purity', 'charged intelligence'],
                animationIdeas: ['liquidFloat', 'background ripples', 'vertically flowing text'],
                aiImagePromptPattern: '16:9 cinematic lab scene. Bright charged water blue glow. Flowing water ripples, vortex diagrams, pH strips, droplets. Style: clean laboratory, futuristic organic, 8k.',
                designerNotes: 'Theme: Clean lab + flowing water. Use 2-column layouts. cards-rounded-2xl with border-white/5.'
            }
        },

        // 18) science_minerals (Mineral Science)
        science_minerals: {
            color: '#f97316',
            visualVibe: {
                vibeKeywords: ['volcanic', 'earthy', 'elemental', 'molten mineral', 'basalt strata'],
                emotionalTone: ['grounded', 'ancient strength', 'elemental power'],
                animationIdeas: ['krystalBloom', 'rising from the earth', 'geological layer reveal'],
                aiImagePromptPattern: '16:9 volcanic mineral strata. Molten orange minerals glinting in dark basalt rock. Crystalline structures, timeline-like layers. Style: earthy elemental, premium scientific, 8k.',
                designerNotes: 'Theme: Volcanic, earthy, elemental. Cards with orange/gold top borders. Use angled gradients.'
            }
        },

        // 19) science_crystalline_bioelectric (Crystalline Matrix)
        science_crystalline_bioelectric: {
            color: '#a855f7',
            visualVibe: {
                vibeKeywords: ['geometry', 'crystal grids', 'light lattices', 'hex grids', 'violet noise'],
                emotionalTone: ['sacred order', 'mathematical awe', 'crystalline clarity'],
                animationIdeas: ['scalarSlide', 'geometry reveal', 'grid cards stagger'],
                aiImagePromptPattern: '16:9 crystalline lattice grid. Violet crystal glows over dark amethyst background. Subtle geometric SVG overlays, hex patterns. Style: mathematical beauty, high-fidelity geometry, 8k.',
                designerNotes: 'Theme: Geometry, crystal grids, light lattices. Use 3-6-9 layout grids. Semi-transparent glass cards.'
            }
        },

        // 20) science_terrain_sulphur
        science_terrain_sulphur: {
            color: '#ffe66b',
            visualVibe: {
                vibeKeywords: ['terrain model', 'sulphur pathways', 'detox logic', 'system flows', 'grounding'],
                emotionalTone: ['grounded clarity', 'systems thinking', 'reassuring structure'],
                animationIdeas: ['warm yellow-gold gradients', 'flow lines like rivers'],
                aiImagePromptPattern: '16:9 terrain pathways diagram aesthetic. Dark background with warm yellow-gold gradients, subtle flow lines like rivers, clean science overlay, no text, 8k.',
                designerNotes: 'Use flow diagrams. Always show "inputs → pathways → outputs".'
            }
        },

        // 21) andara_explanations
        andara_explanations: {
            color: '#87ceeb',
            visualVibe: {
                vibeKeywords: ['how it works', 'non-medical clarity', 'step-by-step', 'simple metaphors', 'safe language'],
                emotionalTone: ['calm', 'understandable', 'reassuring'],
                animationIdeas: ['clean icons (abstract)', 'minimal geometry'],
                aiImagePromptPattern: '16:9 simple explainer header. Dark background with sky-blue gradients, clean icons (abstract), minimal geometry, friendly clarity, 8k.',
                designerNotes: 'Always: "What it is / How to use / What you may notice / FAQ".'
            }
        },

        // 22) brand_story
        brand_story: {
            color: '#4b0082',
            visualVibe: {
                vibeKeywords: ['community', 'retreats', 'rituals', 'bridge between science and spirit', 'human resonance'],
                emotionalTone: ['belonging', 'inspiration', 'warmth'],
                animationIdeas: ['subtle silhouettes of people around light'],
                aiImagePromptPattern: '16:9 community story background. Indigo night with soft gold warmth, subtle silhouettes of people around light (abstract), premium cinematic feel, 8k.',
                designerNotes: 'Add community CTAs, events, "join the field" sections.'
            }
        },

        // 23) legal_firewall
        legal_firewall: {
            color: '#9aa7b6',
            visualVibe: {
                vibeKeywords: ['legal clarity', 'firewall architecture', 'disclaimers', 'governance', 'safety language'],
                emotionalTone: ['calm authority', 'precision', 'trust through boundaries'],
                animationIdeas: ['subtle grid', 'clean panel shapes'],
                aiImagePromptPattern: '16:9 legal architecture background. Dark-silver gradient, subtle grid, clean panel shapes like structured documents, no icons, minimal, 8k.',
                designerNotes: 'Highly readable. Use strong headings, low ornament, consistent link structure.'
            }
        },

        // 24) water-science (alias)
        'water-science': {
            color: '#3b82f6',
            visualVibe: {
                vibeKeywords: ['clean lab', 'flowing water', 'charged water blue', 'ripples', 'hexagonal geometry'],
                emotionalTone: ['clarity', 'purity', 'charged intelligence'],
                animationIdeas: ['liquidFloat', 'background ripples', 'vertically flowing text'],
                aiImagePromptPattern: '16:9 cinematic lab scene. Bright charged water blue glow. Flowing water ripples, vortex diagrams, pH strips, droplets. Style: clean laboratory, futuristic organic, 8k.',
                designerNotes: 'Theme: Clean lab + flowing water. Standardized 2024 spec.'
            },
            clusterType: 'alias'
        },

        // 25) mineral-science (alias)
        'mineral-science': {
            color: '#f97316',
            visualVibe: {
                vibeKeywords: ['volcanic', 'earthy', 'elemental', 'molten mineral', 'basalt strata'],
                emotionalTone: ['grounded', 'ancient strength', 'elemental power'],
                animationIdeas: ['krystalBloom', 'rising from the earth', 'geological layer reveal'],
                aiImagePromptPattern: '16:9 volcanic mineral strata. Molten orange minerals glinting in dark basalt rock. Crystalline structures, timeline-like layers. Style: earthy elemental, premium scientific, 8k.',
                designerNotes: 'Theme: Volcanic, earthy, elemental. Standardized 2024 spec.'
            },
            clusterType: 'alias'
        },

        // 26) crystalline-matrix (alias)
        'crystalline-matrix': {
            color: '#a855f7',
            visualVibe: {
                vibeKeywords: ['geometry', 'crystal grids', 'light lattices', 'hex grids', 'violet noise'],
                emotionalTone: ['sacred order', 'mathematical awe', 'crystalline clarity'],
                animationIdeas: ['scalarSlide', 'geometry reveal', 'grid cards stagger'],
                aiImagePromptPattern: '16:9 crystalline lattice grid. Violet crystal glows over dark amethyst background. Subtle geometric SVG overlays, hex patterns. Style: mathematical beauty, high-fidelity geometry, 8k.',
                designerNotes: 'Theme: Geometry, crystal grids, light lattices. Standardized 2024 spec.'
            },
            clusterType: 'alias'
        },

        // 27) dna
        dna: {
            color: '#9b7bff',
            visualVibe: {
                vibeKeywords: ['DNA + minerals', 'code architecture', 'helix geometry', 'crystalline genetics'],
                emotionalTone: ['reverence', 'precision', 'mystery with clarity'],
                animationIdeas: ['violet ray gradients', 'faint helix structure made of crystalline nodes', 'gold accents'],
                aiImagePromptPattern: '16:9 abstract DNA-mineral code scene. Violet ray gradients on dark background, faint helix structure made of crystalline nodes, subtle gold accents, clean premium science aesthetic, 8k.',
                designerNotes: 'Avoid medical claims. Keep it "structure + information" aesthetic.'
            }
        },

        // 28) blog
        blog: {
            color: '#63b4ff',
            visualVibe: {
                vibeKeywords: ['living library', 'article constellations', 'knowledge crystals', 'editorial calm'],
                emotionalTone: ['thoughtful', 'curious', 'evolving', 'grounded inspiration'],
                animationIdeas: ['constellation of article nodes'],
                aiImagePromptPattern: '16:9 editorial library header. Dark background with soft blue gradients, constellation of article nodes, minimal, modern, 8k.',
                designerNotes: 'Prioritize readability. Add tag map and "related constellation".'
            }
        },

        // 29) b2b
        b2b: {
            color: '#87ceeb',
            visualVibe: {
                vibeKeywords: ['partner network', 'professional trust', 'global map', 'distribution clarity'],
                emotionalTone: ['reliable', 'grown-up', 'confident partnership'],
                animationIdeas: ['subtle map-like grid', 'node connections', 'sky-blue and gold accents'],
                aiImagePromptPattern: '16:9 global partner header. Dark background with subtle map-like grid and node connections, sky-blue and gold accents, clean corporate-premium style, 8k.',
                designerNotes: 'Add "how it works" for partners + requirements + margins/logistics.'
            }
        },

        // 30) spiritual-electricity
        'spiritual-electricity': {
            color: '#4b0082',
            visualVibe: {
                vibeKeywords: ['ion intelligence', 'consciousness tech', 'subtle mystic science', 'sacred electricity'],
                emotionalTone: ['contemplative awe', 'coherent calm', 'expanded curiosity'],
                animationIdeas: ['faint geometry arcs', 'soft violet + cyan auric currents'],
                aiImagePromptPattern: '16:9 subtle spiritual-electric field. Indigo void with faint geometry arcs, soft violet + cyan auric currents, minimal and premium, not fantasy, 8k.',
                designerNotes: 'Keep it elegant and restrained. No "woo graphics". Use language and spacing to carry depth.'
            }
        },

        // 31) lab-measurements
        'lab-measurements': {
            color: '#9aa7b6',
            visualVibe: {
                vibeKeywords: ['ORP', 'pH', 'EC', 'TDS', 'measurement protocol', 'charts', 'lab standards'],
                emotionalTone: ['precise', 'confident', 'transparent', 'methodical'],
                animationIdeas: ['abstract meter dials', 'chart lines'],
                aiImagePromptPattern: '16:9 lab measurement scene. Dark background with silver-blue highlights, abstract meter dials and chart lines (no text), clean modern lab style, 8k.',
                designerNotes: 'Data must be king: chart readability, methodology blocks, exportable tables.'
            }
        },

        // 32) mineral-sources
        'mineral-sources': {
            color: '#63b4ff',
            visualVibe: {
                vibeKeywords: ['source comparison', 'volcanic vs sea vs synthetic', 'mineral authenticity', 'criteria framework'],
                emotionalTone: ['discerning', 'rational', 'fair', 'truth-seeking'],
                animationIdeas: ['split-field abstract', 'volcanic rock texture', 'clean mineral crystal texture'],
                aiImagePromptPattern: '16:9 comparison header. Split-field abstract: left volcanic rock texture, right clean mineral crystal texture, both on dark background with blue/gold accents, minimal, 8k.',
                designerNotes: 'Use comparison tables + scoring criteria + "what matters" callouts.'
            }
        },

        // 33) shop-product (alias to shop)
        'shop-product': {
            color: '#ffd700',
            visualVibe: {
                vibeKeywords: ['alias of shop', 'commerce hub', 'product selection clarity'],
                emotionalTone: ['certainty', 'professionalism', 'clean premium'],
                animationIdeas: ['soft reflections', 'crisp edges'],
                aiImagePromptPattern: '16:9 premium e-commerce hero. Dark clean background with subtle gold + cyan rim light. Product bottle and box staged like luxury lab artifact (no text), soft reflections, crisp edges, minimal geometry, high-end studio lighting, 8k.',
                designerNotes: 'In CMS: treat as alias to cluster shop to avoid duplication.'
            },
            clusterType: 'alias'
        },

        // 34) Water Science (duplicate record)
        'Water Science': {
            color: '#1aa7ff',
            visualVibe: {
                vibeKeywords: ['alias of science/water'],
                emotionalTone: ['wonder', 'clarity', 'playful seriousness'],
                animationIdeas: ['water lattice motion'],
                aiImagePromptPattern: '16:9 water lattice in motion. Translucent layered water planes, cyan glow, subtle geometry overlay, dark void background, clean educational sci style, 8k.',
                designerNotes: 'Keep canonical page routes.'
            },
            clusterType: 'alias'
        },

        // 35) Mineral Science (duplicate record)
        'Mineral Science': {
            color: '#63b4ff',
            visualVibe: {
                vibeKeywords: ['alias of science/minerals'],
                emotionalTone: ['confident learning', 'ordered understanding'],
                animationIdeas: ['mineral lattice macro'],
                aiImagePromptPattern: '16:9 mineral lattice macro. Light-blue crystal structures with soft gold highlights on dark background, clean high detail, 8k.',
                designerNotes: 'Avoid content duplication.'
            },
            clusterType: 'alias'
        },

        // 36) Crystalline Matrix (duplicate record)
        'Crystalline Matrix': {
            color: '#ffd700',
            visualVibe: {
                vibeKeywords: ['alias of science/geometry'],
                emotionalTone: ['awe at patterns behind matter'],
                animationIdeas: ['crystalline lattice'],
                aiImagePromptPattern: '16:9 3D crystalline lattice. Semi-transparent tetrahedral and hexagonal nodes in spatial grid, some nodes glowing brighter. Background: dark void with soft nebula gradients in indigo and turquoise. Style: sci-fi crystal matrix, elegant thin lines, premium, high-fidelity, clean negative space, soft bloom, ultra-detailed, 8k.',
                designerNotes: 'Keep the "reusable header" strategy.'
            },
            clusterType: 'alias'
        },

        // 37) brand-story (alias)
        'brand-story': {
            color: '#ffd700',
            visualVibe: {
                vibeKeywords: ['origin chapters', 'volcanic earth to structured water', 'bridge between worlds'],
                emotionalTone: ['inspiring', 'intimate', 'legendary but believable'],
                animationIdeas: ['volcanic stone texture', 'gold light veins'],
                aiImagePromptPattern: '16:9 cinematic story header. Volcanic stone texture fades into dark indigo void with gold light veins. Subtle geometry arcs. Premium documentary lighting, 8k.',
                designerNotes: 'Use chapters, timeline, and "from…to…" transitions.'
            },
            clusterType: 'alias'
        },

        // 38) Bioelectric Science (duplicate)
        'Bioelectric Science': {
            color: '#8fc53a',
            visualVibe: {
                vibeKeywords: ['voltage', 'ion flow', 'living circuits', 'field biology'],
                emotionalTone: ['awakened understanding', 'energetic clarity'],
                animationIdeas: ['emerald + cyan current lines'],
                aiImagePromptPattern: '16:9 bioelectric field visualization. Dark background with emerald + cyan current lines flowing through a subtle human-water silhouette (abstract). Clean scientific style, not mystical-cartoon. Soft glow, high fidelity, 8k.',
                designerNotes: 'Make the invisible measurable.'
            }
        },


        // 40) brand_story
        brand_story: {
            color: '#6366f1',
            visualVibe: {
                vibeKeywords: ['brand journey', 'narrative', 'indigo flow'],
                emotionalTone: ['inspiring', 'connected'],
                animationIdeas: ['horizontal timelines', 'scroll-based reveals'],
                designerNotes: 'Theme: Brand Story. Use horizontal timelines and GSAP ScrollTrigger for photo reveals.'
            }
        },

        // 41) trust_lab
        trust_lab: {
            color: '#0ea5e9',
            visualVibe: {
                vibeKeywords: ['validation', 'lab reports', 'precision'],
                emotionalTone: ['certainty', 'transparent'],
                animationIdeas: ['numbers count-up', 'charts drawing in'],
                designerNotes: 'Theme: Trust / Lab. Use count-up animations for metrics and SVG chart reveals.'
            }
        },

        // 42) community
        community: {
            color: '#ec4899',
            visualVibe: {
                vibeKeywords: ['mosaic', 'resonance', 'people'],
                emotionalTone: ['belonging', 'vibrant'],
                animationIdeas: ['floating mosaic photos', 'testimonial sliders'],
                designerNotes: 'Theme: Community. Use mosaic layouts with slight floating animations.'
            }
        },

        // 43) shop (alias for products)
        shop: {
            color: '#4b0082',
            visualVibe: {
                vibeKeywords: ['premium', 'clean', 'conversion-focused'],
                emotionalTone: ['certainty', 'professionalism'],
                animationIdeas: ['conversionCard'],
                designerNotes: 'Theme: Products. Alias for shop.'
            }
        },

        // 44) trust (alias for support)
        trust: {
            color: '#10b981',
            visualVibe: {
                vibeKeywords: ['calm', 'safe', 'reassuring green'],
                emotionalTone: ['reassurance', 'clarity'],
                animationIdeas: ['calmFade'],
                designerNotes: 'Theme: Support. Alias for trust/quality.'
            }
        },
        // 43) shop (alias for products)
        shop: {
            color: '#4b0082',
            visualVibe: {
                vibeKeywords: ['premium', 'clean', 'conversion-focused'],
                emotionalTone: ['certainty', 'professionalism'],
                animationIdeas: ['conversionCard'],
                designerNotes: 'Theme: Products. Alias for shop.'
            },
            clusterType: 'alias'
        },

        // 44) trust (alias for support)
        trust: {
            color: '#10b981',
            visualVibe: {
                vibeKeywords: ['calm', 'safe', 'reassuring green'],
                emotionalTone: ['reassurance', 'clarity'],
                animationIdeas: ['calmFade'],
                designerNotes: 'Theme: Support. Alias for trust/quality.'
            },
            clusterType: 'alias'
        },

        // 39) Rollup clusters (navigation-only)
        '__rollup__': {
            color: '#0b1020',
            visualVibe: {
                vibeKeywords: ['rollup navigation', 'cluster grouping', 'meta index'],
                emotionalTone: ['organized', 'clear', 'structural'],
                animationIdeas: ['subtle node-map', 'very low glow'],
                aiImagePromptPattern: '16:9 minimal atlas background. Dark gradient with subtle node-map, very low glow, 8k.',
                designerNotes: 'Rollups should be "index-only" clusters (no dedicated pages) that power navigation filters.'
            },
            clusterType: 'rollup'
        }
    };

    console.log('🎨 Starting Visual Vibe Seed for all clusters...\n');

    let updated = 0;
    let skipped = 0;
    let errors = 0;

    // Get all clusters from database
    const allClusters = await db.select().from(clusters);
    console.log(`Found ${allClusters.length} clusters in database\n`);

    for (const cluster of allClusters) {
        // Try to match by key first, then by name, then by slug
        let vibeConfig = clusterVibes[cluster.key] || clusterVibes[cluster.name] || clusterVibes[cluster.slug];

        if (!vibeConfig) {
            // Try partial matching for some common patterns
            if (cluster.key.includes('water') || cluster.name.toLowerCase().includes('water')) {
                vibeConfig = clusterVibes['water-science'];
            } else if (cluster.key.includes('mineral') || cluster.name.toLowerCase().includes('mineral')) {
                vibeConfig = clusterVibes['mineral-science'];
            } else if (cluster.key.includes('crystal') || cluster.name.toLowerCase().includes('crystal')) {
                vibeConfig = clusterVibes['crystalline-matrix'];
            } else if (cluster.key.includes('bio') || cluster.name.toLowerCase().includes('bio')) {
                vibeConfig = clusterVibes['bioelectricity'];
            } else {
                console.log(`⚠️  No vibe config found for: ${cluster.key} (${cluster.name})`);
                skipped++;
                continue;
            }
        }

        try {
            await db.update(clusters)
                .set({
                    color: vibeConfig.color,
                    visualVibe: vibeConfig.visualVibe
                })
                .where(eq(clusters.id, cluster.id));

            console.log(`✅ Updated: ${cluster.key} → color: ${vibeConfig.color}`);
            updated++;
        } catch (error: any) {
            console.error(`❌ Error updating ${cluster.key}:`, error.message);
            errors++;
        }
    }

    console.log('\n========================================');
    console.log(`🎨 Visual Vibe Seed Complete!`);
    console.log(`   ✅ Updated: ${updated}`);
    console.log(`   ⚠️  Skipped: ${skipped}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log('========================================\n');

    process.exit(0);
}

run().catch(console.error);
