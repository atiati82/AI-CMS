/**
 * Layout Vocabulary for AI Design Interpretation
 * 
 * This module provides a comprehensive layout library that enables AI to:
 * 1. Identify section types from DOM/code structure
 * 2. Match layouts using keywords and signals
 * 3. Apply appropriate motion presets automatically
 * 
 * Usage: Import layouts and use matchLayoutByKeywords() or getLayoutById()
 */

import { 
  fadeUp, fadeDown, scaleUp, slideInLeft, slideInRight,
  stagger, overlay, mount, hover, ambient,
  timing, easing, viewport
} from "./motion";

// ============================================================================
// TYPES
// ============================================================================

export type LayoutCategory = 
  | "hero"
  | "features"
  | "process"
  | "social-proof"
  | "pricing"
  | "faq"
  | "metrics"
  | "content"
  | "media"
  | "interactive"
  | "lists"
  | "scroll"
  | "cta"
  | "footer";

export interface LayoutMotionConfig {
  container?: object;
  item?: object;
  entrance?: object;
  hover?: object;
  exit?: object;
  special?: object;
}

export interface LayoutDefinition {
  id: string;
  name: string;
  description: string;
  category: LayoutCategory;
  keywords: string[];
  signals: string[];
  motion: LayoutMotionConfig;
  visualEnhancements?: string[];
}

// ============================================================================
// LAYOUT DEFINITIONS
// ============================================================================

export const layouts: LayoutDefinition[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. HERO & ABOVE-THE-FOLD
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "hero_split",
    name: "Hero Split Layout",
    description: "Large headline on left, supporting text + CTA; big image/visual on right.",
    category: "hero",
    keywords: ["hero", "two-column", "headline", "primary-cta", "image-right"],
    signals: ["h1", "cta-button", "large-image", "grid-2-col"],
    motion: {
      container: stagger.container,
      item: stagger.item,
      entrance: {
        headline: { ...fadeUp, transition: { duration: timing.slower, ease: easing.smooth } },
        image: { ...slideInRight, transition: { duration: timing.slower, delay: 0.2 } },
      },
      hover: hover.lift,
    },
    visualEnhancements: [
      "gradient-text on headline",
      "glow effect on CTA button",
      "parallax on image",
      "floating decorative elements"
    ],
  },
  {
    id: "hero_centered",
    name: "Hero Centered Layout",
    description: "Full-width top section with centered headline, subhead, one main CTA.",
    category: "hero",
    keywords: ["hero", "centered", "full-width", "headline-big", "single-cta"],
    signals: ["h1", "text-center", "cta-button", "max-width-container"],
    motion: {
      container: stagger.container,
      entrance: {
        headline: { ...fadeUp, transition: { duration: timing.slower } },
        subhead: { ...fadeUp, transition: { duration: timing.slow, delay: 0.15 } },
        cta: { ...scaleUp, transition: { duration: timing.normal, delay: 0.3 } },
      },
    },
    visualEnhancements: [
      "animated gradient background",
      "particle effects",
      "text reveal animation",
      "pulsing CTA glow"
    ],
  },
  {
    id: "hero_media_bg",
    name: "Hero Media Background",
    description: "Hero section with background image/video and overlay text + CTA.",
    category: "hero",
    keywords: ["hero", "background-image", "overlay-text", "video-bg", "gradient-overlay"],
    signals: ["background-image", "overlay", "h1", "cta-button"],
    motion: {
      entrance: {
        overlay: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: timing.slower } },
        content: { ...fadeUp, transition: { duration: timing.slow, delay: 0.3 } },
      },
    },
    visualEnhancements: [
      "ken-burns effect on image",
      "gradient overlay with brand colors",
      "text shadow for readability",
      "subtle zoom on scroll"
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. FEATURE & BENEFITS BLOCKS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "feature_columns",
    name: "Feature Columns Layout",
    description: "Three or four columns, each with icon, title, short text.",
    category: "features",
    keywords: ["features", "icon-grid", "three-column", "benefits", "cards-small"],
    signals: ["grid-3-col", "grid-4-col", "icon", "h3", "short-paragraph"],
    motion: {
      container: stagger.container,
      item: stagger.item,
      hover: hover.lift,
    },
    visualEnhancements: [
      "icon glow on hover",
      "glassmorphism cards",
      "gradient icon backgrounds",
      "border shimmer effect"
    ],
  },
  {
    id: "benefit_grid",
    name: "Benefit Grid Layout",
    description: "Card-based grid showing key benefits, often 2–4 per row.",
    category: "features",
    keywords: ["benefit", "card-grid", "section-title", "short-copy", "icons-or-badges"],
    signals: ["grid", "card", "icon", "h3", "badge"],
    motion: {
      container: stagger.container,
      item: stagger.item,
      hover: hover.scale,
    },
    visualEnhancements: [
      "card hover elevation",
      "gradient borders",
      "icon color transitions",
      "subtle card rotation on hover"
    ],
  },
  {
    id: "icon_bullets",
    name: "Icon Bullet Row",
    description: "Horizontal line of bullets with icons, often under hero.",
    category: "features",
    keywords: ["icon-list", "bullets", "short-text", "in-row", "micro-benefits"],
    signals: ["flex-row", "icon", "small-text", "horizontal-list"],
    motion: {
      container: { ...stagger.container, variants: { visible: { transition: { staggerChildren: 0.05 } } } },
      item: stagger.item,
    },
    visualEnhancements: [
      "icon pulse animation",
      "separator lines between items",
      "subtle icon float"
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. PROCESS, TIMELINE & JOURNEY
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "step_process",
    name: "Step Process Layout",
    description: "Steps 1–3–5 in sequence (horizontal or vertical) with labels.",
    category: "process",
    keywords: ["steps", "process", "numbered", "timeline-lite", "how-it-works"],
    signals: ["numbered-list", "step-indicator", "connector-line", "h3"],
    motion: {
      container: stagger.container,
      item: stagger.item,
      special: {
        connector: { initial: { scaleX: 0 }, whileInView: { scaleX: 1 }, transition: { duration: timing.slow } },
      },
    },
    visualEnhancements: [
      "animated step numbers",
      "progressive connector line fill",
      "step completion checkmarks",
      "glow on active step"
    ],
  },
  {
    id: "timeline_vertical",
    name: "Vertical Timeline Layout",
    description: "Events or stages stacked vertically, often with line/connector.",
    category: "process",
    keywords: ["timeline", "milestones", "vertical-flow", "dates", "progression"],
    signals: ["vertical-list", "date", "connector-line", "alternating"],
    motion: {
      container: stagger.container,
      item: {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: timing.normal } },
      },
      special: {
        line: { initial: { scaleY: 0 }, whileInView: { scaleY: 1 }, transition: { duration: timing.slower } },
      },
    },
    visualEnhancements: [
      "animated timeline line draw",
      "milestone dot pulse",
      "alternating card colors",
      "date badges with glow"
    ],
  },
  {
    id: "journey_roadmap",
    name: "Journey Roadmap Layout",
    description: "Roadmap/phase layout with phases as cards along a path.",
    category: "process",
    keywords: ["roadmap", "phases", "milestones", "path", "future-plan"],
    signals: ["phase-cards", "path-svg", "milestone-markers", "h3"],
    motion: {
      container: stagger.container,
      item: stagger.item,
      special: {
        path: { initial: { pathLength: 0 }, whileInView: { pathLength: 1 }, transition: { duration: 1.5 } },
      },
    },
    visualEnhancements: [
      "SVG path draw animation",
      "milestone markers pop-in",
      "phase card glow",
      "dotted path with traveling dot"
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SOCIAL PROOF & TESTIMONIALS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "testimonial_slider",
    name: "Testimonial Slider Layout",
    description: "One testimonial visible at a time, with arrows or dots to change.",
    category: "social-proof",
    keywords: ["testimonial", "carousel", "quote", "avatar", "slider"],
    signals: ["carousel", "quote", "avatar", "navigation-dots", "arrows"],
    motion: {
      entrance: mount.fade,
      special: {
        slide: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 } },
      },
    },
    visualEnhancements: [
      "quote icon decoration",
      "avatar ring glow",
      "slide crossfade effect",
      "dot indicator animation"
    ],
  },
  {
    id: "testimonial_grid",
    name: "Testimonial Grid Layout",
    description: "Multiple testimonials in 2–3 columns, often small cards.",
    category: "social-proof",
    keywords: ["testimonial", "grid", "social-proof", "cards", "customer-quotes"],
    signals: ["grid-2-col", "grid-3-col", "quote", "avatar", "card"],
    motion: {
      container: stagger.container,
      item: stagger.item,
      hover: hover.lift,
    },
    visualEnhancements: [
      "card glassmorphism",
      "quote marks decoration",
      "star rating animation",
      "hover card elevation"
    ],
  },
  {
    id: "logo_wall",
    name: "Logo Wall Layout",
    description: "Grid of partner/customer logos as social proof.",
    category: "social-proof",
    keywords: ["logos", "brand-grid", "trust", "social-proof", "clients"],
    signals: ["logo-grid", "grayscale-images", "flex-wrap", "small-images"],
    motion: {
      container: stagger.container,
      item: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: timing.fast } },
      },
    },
    visualEnhancements: [
      "grayscale to color on hover",
      "infinite horizontal scroll",
      "logo subtle bounce",
      "opacity fade at edges"
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. PRICING, PLANS & OFFERS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "pricing_table",
    name: "Pricing Table Layout",
    description: "2–4 pricing cards side-by-side, each with price, features, CTA.",
    category: "pricing",
    keywords: ["pricing", "plans", "tier-cards", "price-badge", "cta-button"],
    signals: ["grid-3-col", "price", "feature-list", "cta-button", "badge"],
    motion: {
      container: stagger.container,
      item: stagger.item,
      hover: hover.lift,
      special: {
        popular: { animate: { scale: [1, 1.02, 1] }, transition: { duration: 2, repeat: Infinity } },
      },
    },
    visualEnhancements: [
      "popular plan scale/glow",
      "price counter animation",
      "feature checkmark stagger",
      "gradient CTA buttons"
    ],
  },
  {
    id: "offer_highlight",
    name: "Offer Highlight Layout",
    description: "Single featured offer card with emphasized price/discount.",
    category: "pricing",
    keywords: ["special-offer", "highlight-card", "price-focus", "discount", "hero-card"],
    signals: ["large-card", "price", "discount-badge", "cta-button", "border-accent"],
    motion: {
      entrance: { ...scaleUp, transition: { duration: timing.slow } },
      hover: hover.glow,
    },
    visualEnhancements: [
      "discount badge pulse",
      "price strikethrough animation",
      "urgency timer",
      "border shimmer effect"
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. FAQ, ACCORDIONS & STRUCTURED INFO
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "faq_accordion",
    name: "FAQ Accordion Layout",
    description: "List of questions, each expandable with answer (accordion).",
    category: "faq",
    keywords: ["faq", "accordion", "toggle", "question-answer", "collapse"],
    signals: ["accordion", "toggle-icon", "question", "answer", "expandable"],
    motion: {
      container: stagger.container,
      item: stagger.item,
      special: {
        expand: { initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 } },
        icon: { initial: { rotate: 0 }, animate: { rotate: 180 } },
      },
    },
    visualEnhancements: [
      "smooth height animation",
      "chevron rotation",
      "active item highlight",
      "answer fade-in"
    ],
  },
  {
    id: "tabbed_content",
    name: "Tabbed Content Layout",
    description: "Tabs at top (or side) switching content panels.",
    category: "faq",
    keywords: ["tabs", "tab-panel", "switch-content", "navigation-inline", "category-sections"],
    signals: ["tab-list", "tab-panel", "active-indicator", "horizontal-nav"],
    motion: {
      special: {
        indicator: { layoutId: "tab-indicator", transition: { type: "spring", stiffness: 500, damping: 30 } },
        panel: { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } },
      },
    },
    visualEnhancements: [
      "sliding active indicator",
      "tab content crossfade",
      "active tab glow",
      "content panel slide"
    ],
  },
  {
    id: "comparison_table",
    name: "Comparison Table Layout",
    description: "Table comparing features across products/plans.",
    category: "faq",
    keywords: ["comparison", "table", "columns", "checkmarks", "vs-layout"],
    signals: ["table", "thead", "checkmark-icons", "grid-columns"],
    motion: {
      container: stagger.container,
      item: stagger.item,
    },
    visualEnhancements: [
      "row hover highlight",
      "checkmark pop animation",
      "sticky header on scroll",
      "column highlight on hover"
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. METRICS & HIGHLIGHT BOXES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "stats_highlight",
    name: "Stats Highlight Layout",
    description: "Large numbers with labels (e.g., '50+ Clients').",
    category: "metrics",
    keywords: ["stats", "kpi", "numeric-highlight", "metrics", "pill-cards"],
    signals: ["large-number", "stat-label", "grid", "counter"],
    motion: {
      container: stagger.container,
      item: stagger.item,
      special: {
        counter: { initial: { opacity: 0 }, whileInView: { opacity: 1 } },
      },
    },
    visualEnhancements: [
      "number count-up animation",
      "stat card glow",
      "icon pulse beside number",
      "gradient text on numbers"
    ],
  },
  {
    id: "highlight_box",
    name: "Highlight Box Layout",
    description: "Single emphasized box around key message or warning.",
    category: "metrics",
    keywords: ["highlight", "border-box", "callout", "note", "emphasis"],
    signals: ["border-accent", "icon", "single-box", "callout"],
    motion: {
      entrance: { ...fadeUp, transition: { duration: timing.normal } },
    },
    visualEnhancements: [
      "left border accent",
      "icon glow",
      "subtle background pattern",
      "pulse on important"
    ],
  },
  {
    id: "code_example_block",
    name: "Code Example Box",
    description: "Code snippet area with monospaced font, often with copy button.",
    category: "metrics",
    keywords: ["code-block", "monospace", "snippet", "developer", "example"],
    signals: ["pre", "code", "monospace-font", "copy-button", "syntax-highlight"],
    motion: {
      entrance: mount.slideUp,
    },
    visualEnhancements: [
      "syntax highlighting",
      "line numbers",
      "copy button feedback",
      "language badge"
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. CONTENT SECTIONS, BLOG & DOCS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "article_longform",
    name: "Article / Longform Layout",
    description: "Single column content (H1, H2, paragraphs, images).",
    category: "content",
    keywords: ["article", "blog-post", "single-column", "rich-text", "documentation"],
    signals: ["prose", "h1", "h2", "paragraphs", "images-inline"],
    motion: {
      entrance: fadeUp,
    },
    visualEnhancements: [
      "reading progress bar",
      "smooth anchor scrolling",
      "image zoom on click",
      "pull quotes styling"
    ],
  },
  {
    id: "blog_list",
    name: "Blog List Layout",
    description: "List of articles as cards/rows with title, excerpt, meta.",
    category: "content",
    keywords: ["blog-list", "posts", "cards", "excerpt", "date-meta"],
    signals: ["card-list", "title", "excerpt", "date", "author"],
    motion: {
      container: stagger.container,
      item: stagger.item,
      hover: hover.lift,
    },
    visualEnhancements: [
      "card hover elevation",
      "image zoom on hover",
      "category color badges",
      "reading time estimate"
    ],
  },
  {
    id: "sidebar_content",
    name: "Sidebar Content Layout",
    description: "Main content plus a right or left sidebar with navigation or info.",
    category: "content",
    keywords: ["sidebar", "two-column", "navigation", "toc", "filters"],
    signals: ["grid-sidebar", "aside", "nav-list", "sticky-sidebar"],
    motion: {
      entrance: {
        main: fadeUp,
        sidebar: { ...slideInLeft, transition: { delay: 0.2 } },
      },
    },
    visualEnhancements: [
      "sticky sidebar on scroll",
      "active section highlight",
      "smooth scroll to sections",
      "collapsible sidebar mobile"
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. IMAGES, GALLERIES & MEDIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "image_gallery_grid",
    name: "Image Gallery Grid",
    description: "Grid of images, typically responsive with hover effects.",
    category: "media",
    keywords: ["gallery", "image-grid", "thumbnails", "lightbox", "media-section"],
    signals: ["image-grid", "thumbnails", "hover-overlay", "lightbox-trigger"],
    motion: {
      container: stagger.container,
      item: stagger.item,
      hover: hover.scale,
    },
    visualEnhancements: [
      "hover zoom effect",
      "overlay with icon on hover",
      "masonry layout option",
      "lightbox with navigation"
    ],
  },
  {
    id: "media_caption",
    name: "Media + Caption Layout",
    description: "Single large image/video with caption below or beside.",
    category: "media",
    keywords: ["media", "caption", "figure", "centered-image", "video-block"],
    signals: ["figure", "figcaption", "large-image", "video", "centered"],
    motion: {
      entrance: { ...scaleUp, transition: { duration: timing.slow } },
    },
    visualEnhancements: [
      "image border radius",
      "caption fade-in",
      "play button overlay for video",
      "subtle shadow"
    ],
  },
  {
    id: "svg_illustration_cluster",
    name: "SVG Illustration Cluster",
    description: "SVG or icons grouped together (e.g., 'network of light' visuals).",
    category: "media",
    keywords: ["svg", "illustration", "icon-cluster", "decorative", "visual-focus"],
    signals: ["svg", "icon-group", "decorative", "absolute-positioned"],
    motion: {
      special: {
        float: ambient.float,
        pulse: ambient.pulse,
      },
    },
    visualEnhancements: [
      "floating animation",
      "glow effects",
      "particle system",
      "connection lines between nodes"
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. INTERACTIVE PANELS, MODALS & DRAWERS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "modal_overlay",
    name: "Modal Overlay Layout",
    description: "Screen overlay with centered dialog (backdrop + panel).",
    category: "interactive",
    keywords: ["modal", "overlay", "dialog", "backdrop", "pop-up"],
    signals: ["overlay", "dialog", "backdrop", "close-button", "centered"],
    motion: {
      entrance: overlay.scale,
      special: {
        backdrop: overlay.backdrop,
      },
    },
    visualEnhancements: [
      "backdrop blur",
      "scale-in animation",
      "close on outside click",
      "focus trap"
    ],
  },
  {
    id: "drawer_panel",
    name: "Drawer Panel Layout",
    description: "Side panel sliding in from left/right (or bottom).",
    category: "interactive",
    keywords: ["drawer", "side-panel", "slide-in", "offcanvas", "navigation-panel"],
    signals: ["drawer", "slide-panel", "offcanvas", "close-button"],
    motion: {
      entrance: overlay.slideRight,
      special: {
        backdrop: overlay.backdrop,
      },
    },
    visualEnhancements: [
      "slide animation",
      "backdrop blur",
      "edge shadow",
      "smooth close transition"
    ],
  },
  {
    id: "notification_toast",
    name: "Notification Toast Layout",
    description: "Small floating message (usually bottom-left/right).",
    category: "interactive",
    keywords: ["toast", "notification", "floating-box", "auto-dismiss", "small-card"],
    signals: ["toast", "fixed-position", "auto-dismiss", "icon-status"],
    motion: {
      entrance: overlay.slideUp,
      exit: { opacity: 0, y: 20, transition: { duration: timing.fast } },
    },
    visualEnhancements: [
      "slide-up animation",
      "progress bar auto-dismiss",
      "status color coding",
      "stack multiple toasts"
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. LISTS, SORTING & DRAG/DROP
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "sortable_list",
    name: "Sortable List Layout",
    description: "Vertical list of items that can be drag-reordered.",
    category: "lists",
    keywords: ["reorder", "draggable", "list-items", "handle-icon", "motion-reorder"],
    signals: ["list", "drag-handle", "reorderable", "vertical-stack"],
    motion: {
      special: {
        reorder: { layout: true, layoutId: "sortable-item" },
      },
    },
    visualEnhancements: [
      "drag handle icon",
      "item lift on drag",
      "drop zone indicator",
      "smooth reorder animation"
    ],
  },
  {
    id: "drag_drop_zone",
    name: "Drag & Drop Zone Layout",
    description: "Drop area with upload or drag hint (dashed border).",
    category: "lists",
    keywords: ["dropzone", "drag-and-drop", "upload", "dashed-border", "file-input"],
    signals: ["dropzone", "dashed-border", "upload-icon", "file-input"],
    motion: {
      special: {
        active: { scale: 1.02, borderColor: "var(--accent)" },
      },
    },
    visualEnhancements: [
      "dashed border animation",
      "icon bounce on hover",
      "active state highlight",
      "file preview on drop"
    ],
  },
  {
    id: "card_carousel",
    name: "Card Carousel Layout",
    description: "Horizontal scroll/drag area of cards (snap or free).",
    category: "lists",
    keywords: ["carousel", "horizontal-scroll", "cards", "slider", "snap-scroll"],
    signals: ["horizontal-scroll", "cards", "snap-points", "navigation-arrows"],
    motion: {
      container: { drag: "x", dragConstraints: { left: 0, right: 0 } },
      item: stagger.item,
    },
    visualEnhancements: [
      "smooth snap scrolling",
      "edge fade effect",
      "navigation arrows",
      "dot indicators"
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. SCROLL & STORYTELLING
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "scroll_story_section",
    name: "Scroll Story Section",
    description: "Section whose content changes with scroll (pinned or progressive).",
    category: "scroll",
    keywords: ["scroll-linked", "parallax", "storytelling", "pinned-section", "animations-on-scroll"],
    signals: ["scroll-trigger", "pinned", "parallax", "progress-indicator"],
    motion: {
      special: {
        parallax: { style: { y: "var(--scroll-y)" } },
        progress: { scaleX: "var(--scroll-progress)" },
      },
    },
    visualEnhancements: [
      "scroll-linked animations",
      "parallax layers",
      "progress indicator",
      "sticky elements"
    ],
  },
  {
    id: "layered_parallax",
    name: "Layered Parallax Scroll",
    description: "Multi-layer depth effect with background, midground, and foreground elements moving at different scroll speeds. Creates immersive 3D-like depth perception.",
    category: "scroll",
    keywords: [
      "layered-parallax", "parallax", "depth-layers", "z-layers", "multi-speed",
      "immersive", "floating-elements", "3d-effect", "depth-scroll", "stacked-layers",
      "background-foreground", "visual-depth", "parallax-hero", "cinematic"
    ],
    signals: [
      "stacked-layers", "absolute-positioned", "z-index-layers", "multiple-images",
      "overlay-elements", "position-absolute", "transform-translateY", "will-change-transform",
      "background-layer", "midground-layer", "foreground-layer", "parallax-container"
    ],
    motion: {
      container: {
        style: { position: "relative", overflow: "hidden" },
      },
      special: {
        backgroundLayer: {
          style: { 
            y: "calc(var(--scroll-progress) * -50px)",
            transition: { ease: "linear" }
          },
        },
        midgroundLayer: {
          style: { 
            y: "calc(var(--scroll-progress) * -100px)",
            transition: { ease: "linear" }
          },
        },
        foregroundLayer: {
          style: { 
            y: "calc(var(--scroll-progress) * -150px)",
            transition: { ease: "linear" }
          },
        },
        floatingElement: {
          animate: { y: [-10, 10, -10] },
          transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        },
      },
      entrance: {
        ...fadeUp,
        transition: { duration: 0.8, ease: [0.23, 0.82, 0.35, 1] },
      },
    },
    visualEnhancements: [
      "depth blur on distant layers",
      "layer shadows for separation",
      "floating decorative elements",
      "gradient overlays between layers",
      "scale difference for depth",
      "opacity fade on scroll",
      "ambient particle effects",
      "ken-burns on background layer"
    ],
  },
  {
    id: "sticky_header",
    name: "Sticky Header Layout",
    description: "Header that remains fixed at top while content scrolls.",
    category: "scroll",
    keywords: ["sticky", "header", "nav-bar", "fixed-top", "scroll-behavior"],
    signals: ["header", "sticky", "fixed-top", "nav", "z-index-high"],
    motion: {
      special: {
        shrink: { height: [80, 60], transition: { duration: timing.fast } },
        show: { y: 0, opacity: 1 },
        hide: { y: -100, opacity: 0 },
      },
    },
    visualEnhancements: [
      "shrink on scroll",
      "blur backdrop",
      "shadow on scroll",
      "hide/show on scroll direction"
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. CALL-TO-ACTION & FOOTER
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "cta_bar",
    name: "CTA Bar Layout",
    description: "Narrow horizontal strip with short text + button.",
    category: "cta",
    keywords: ["cta-bar", "inline-cta", "banner", "small-strip", "promo"],
    signals: ["banner", "inline-flex", "cta-button", "short-text"],
    motion: {
      entrance: { ...fadeUp, transition: { duration: timing.fast } },
    },
    visualEnhancements: [
      "gradient background",
      "dismiss button",
      "countdown timer",
      "animated border"
    ],
  },
  {
    id: "cta_section",
    name: "CTA Section Layout",
    description: "Larger CTA block near end of page ('Ready to start?').",
    category: "cta",
    keywords: ["call-to-action", "headline", "button", "end-section", "conversion"],
    signals: ["section", "h2", "cta-button", "centered", "background-gradient"],
    motion: {
      container: stagger.container,
      entrance: fadeUp,
      special: {
        button: { whileHover: { scale: 1.05 }, whileTap: { scale: 0.98 } },
      },
    },
    visualEnhancements: [
      "gradient background",
      "glow effect on button",
      "decorative elements",
      "testimonial snippet"
    ],
  },
  {
    id: "footer_multi_column",
    name: "Footer Multi-Column Layout",
    description: "Multi-column footer with links, logo, social icons.",
    category: "footer",
    keywords: ["footer", "multi-column", "links", "copyright", "social-icons"],
    signals: ["footer", "grid-columns", "nav-links", "social-icons", "copyright"],
    motion: {
      container: stagger.container,
      item: stagger.item,
    },
    visualEnhancements: [
      "link hover underline",
      "social icon hover color",
      "newsletter signup",
      "back-to-top button"
    ],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Normalize a string for matching (lowercase, remove hyphens/special chars)
 */
function normalizeForMatch(str: string): string {
  return str.toLowerCase().replace(/[-_\s]/g, "").trim();
}

/**
 * Deep clone an object to prevent mutation of shared singletons
 */
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Get a layout definition by ID (returns a defensive copy)
 */
export function getLayoutById(id: string): LayoutDefinition | undefined {
  const layout = layouts.find(layout => layout.id === id);
  return layout ? deepClone(layout) : undefined;
}

/**
 * Get all layouts in a category (returns defensive copies)
 */
export function getLayoutsByCategory(category: LayoutCategory): LayoutDefinition[] {
  return layouts.filter(layout => layout.category === category).map(deepClone);
}

/**
 * Match layouts by keywords - returns scored matches with defensive copies
 */
export function matchLayoutByKeywords(keywords: string[]): Array<{ layout: LayoutDefinition; score: number }> {
  const normalizedKeywords = keywords.map(normalizeForMatch);
  
  const scored = layouts.map(layout => {
    const allKeywords = [...layout.keywords, ...layout.signals].map(normalizeForMatch);
    const matchCount = normalizedKeywords.filter(kw => 
      allKeywords.some(lk => lk.includes(kw) || kw.includes(lk))
    ).length;
    
    return {
      layout: deepClone(layout),
      score: normalizedKeywords.length > 0 ? matchCount / normalizedKeywords.length : 0,
    };
  });
  
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

/**
 * Match layout by analyzing DOM signals (returns defensive copy)
 */
export function matchLayoutBySignals(signals: string[]): LayoutDefinition | undefined {
  const matches = matchLayoutByKeywords(signals);
  return matches.length > 0 ? matches[0].layout : undefined;
}

/**
 * Get motion config for a layout (returns a defensive deep copy)
 */
export function getMotionForLayout(layoutId: string): LayoutMotionConfig | undefined {
  const layout = layouts.find(l => l.id === layoutId);
  return layout?.motion ? deepClone(layout.motion) : undefined;
}

/**
 * Get visual enhancement suggestions for a layout (returns a copy)
 */
export function getVisualEnhancements(layoutId: string): string[] {
  const layout = layouts.find(l => l.id === layoutId);
  return layout?.visualEnhancements ? [...layout.visualEnhancements] : [];
}

/**
 * Get all unique categories
 */
export function getAllCategories(): LayoutCategory[] {
  return Array.from(new Set(layouts.map(l => l.category)));
}

/**
 * Search layouts by text query (returns defensive copies)
 */
export function searchLayouts(query: string): LayoutDefinition[] {
  const q = query.toLowerCase();
  return layouts
    .filter(layout => 
      layout.name.toLowerCase().includes(q) ||
      layout.description.toLowerCase().includes(q) ||
      layout.keywords.some(k => k.includes(q))
    )
    .map(deepClone);
}

// ============================================================================
// LAYOUT CATEGORIES METADATA
// ============================================================================

export const categoryMeta: Record<LayoutCategory, { name: string; icon: string; description: string }> = {
  "hero": { name: "Hero", icon: "🎯", description: "Above-the-fold sections" },
  "features": { name: "Features", icon: "✨", description: "Feature and benefit blocks" },
  "process": { name: "Process", icon: "📍", description: "Timelines and journey flows" },
  "social-proof": { name: "Social Proof", icon: "⭐", description: "Testimonials and trust signals" },
  "pricing": { name: "Pricing", icon: "💰", description: "Plans and offers" },
  "faq": { name: "FAQ", icon: "❓", description: "Accordions and structured info" },
  "metrics": { name: "Metrics", icon: "📊", description: "Stats and highlight boxes" },
  "content": { name: "Content", icon: "📝", description: "Articles and documentation" },
  "media": { name: "Media", icon: "🖼️", description: "Images and galleries" },
  "interactive": { name: "Interactive", icon: "🎛️", description: "Modals and drawers" },
  "lists": { name: "Lists", icon: "📋", description: "Sortable and carousel layouts" },
  "scroll": { name: "Scroll", icon: "📜", description: "Scroll-linked sections" },
  "cta": { name: "CTA", icon: "🚀", description: "Call-to-action blocks" },
  "footer": { name: "Footer", icon: "📌", description: "Footer layouts" },
};

// ============================================================================
// EXPORT SUMMARY
// ============================================================================

export default {
  layouts,
  categoryMeta,
  getLayoutById,
  getLayoutsByCategory,
  matchLayoutByKeywords,
  matchLayoutBySignals,
  getMotionForLayout,
  getVisualEnhancements,
  getAllCategories,
  searchLayouts,
};
