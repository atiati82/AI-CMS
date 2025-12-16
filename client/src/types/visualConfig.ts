export type Priority = "P1" | "P2" | "P3";

export type VibeKeyword =
  | "volcanic spring"
  | "crystalline"
  | "structured water"
  | "cosmic"
  | "laboratory-meets-nature"
  | "warm minimalism"
  | "primordial"
  | "bioelectric"
  | "fourth phase"
  | "exclusion zone"
  | "ionic"
  | "mineral science"
  | "living water";

export type EmotionalTone =
  | "awe"
  | "trust"
  | "reassurance"
  | "curiosity"
  | "future-organic"
  | "origin"
  | "discovery"
  | "clarity"
  | "vitality"
  | "scientific wonder"
  | "grounded";

export type AnimationIdea =
  | "ambient-water-ripple"
  | "ambient-crystalline-shimmer"
  | "ambient-cosmic-field"
  | "scroll-fade-up"
  | "scroll-fade-up-stagger"
  | "scroll-fade-down"
  | "scroll-fade-left"
  | "scroll-fade-right"
  | "scroll-scale-up"
  | "hover-lift-soft"
  | "hover-glow-border"
  | "hover-scale"
  | "timeline-glow-progress"
  | "stagger-children-fast"
  | "stagger-children-slow"
  | "card-reveal"
  | "ambient-pulse"
  | "ambient-float"
  | "floating mineral glyphs"
  | "nebula-like field pulsing";

export type LayoutType =
  | "two-column-hero-left-text"
  | "two-column-hero-right-text"
  | "two-column-content"
  | "grid-02-cards"
  | "grid-03-cards"
  | "grid-04-pillars"
  | "timeline-horizontal-steps"
  | "timeline-vertical-steps"
  | "full-width-band-cta"
  | "centered-content"
  | "narrow-content"
  | "wide-content"
  | "hero-fullscreen"
  | "split-screen";

export type SectionType =
  | "hero"
  | "standard"
  | "alternate"
  | "dark"
  | "gradient"
  | "subtle";

export interface AndaraVisualConfig {
  pageId: string;
  cluster: string;
  priority: Priority;
  vibeKeywords: VibeKeyword[];
  emotionalTone: EmotionalTone[];
  animationIdeas: AnimationIdea[];
  layoutType?: LayoutType;
  sectionType?: SectionType;
  aiImagePromptHero?: string;
  aiVideoPromptHero?: string;
  designerNotes?: string;
}

export interface SectionConfig {
  id: string;
  type: SectionType;
  layout: LayoutType;
  animations: AnimationIdea[];
  content: {
    heading?: string;
    subheading?: string;
    body?: string;
    bullets?: string[];
    cta?: {
      text: string;
      href: string;
      variant?: "primary" | "secondary" | "ghost" | "link";
    };
  };
}

export interface PageConfig {
  meta: AndaraVisualConfig;
  sections: SectionConfig[];
}

export function parseVisualConfig(comment: string): AndaraVisualConfig | null {
  const startMarker = "<!--ANDARA_VISUAL_CONFIG_JSON";
  const endMarker = "END_ANDARA_VISUAL_CONFIG_JSON-->";
  
  const startIndex = comment.indexOf(startMarker);
  const endIndex = comment.indexOf(endMarker);
  
  if (startIndex === -1 || endIndex === -1) {
    return null;
  }
  
  const jsonString = comment
    .slice(startIndex + startMarker.length, endIndex)
    .trim();
  
  try {
    return JSON.parse(jsonString) as AndaraVisualConfig;
  } catch {
    console.error("Failed to parse ANDARA_VISUAL_CONFIG_JSON");
    return null;
  }
}

export function generateVisualConfigComment(config: AndaraVisualConfig): string {
  return `<!--ANDARA_VISUAL_CONFIG_JSON
${JSON.stringify(config, null, 2)}
END_ANDARA_VISUAL_CONFIG_JSON-->`;
}
