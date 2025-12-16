/**
 * Motion Presets Dictionary
 * 
 * This file defines all named animation presets that can be referenced
 * in REPLIT / MOTION LAYOUT PROMPT comments within AI Startup HTML.
 * 
 * Usage in HTML comments:
 *   <!-- 
 *   REPLIT / MOTION LAYOUT PROMPT – HERO
 *   - Motion (Framer Motion dictionary):
 *     - Apply `ambient-water-ripple` to subtle overlays
 *     - Apply `scroll-fade-up` for headline
 *   -->
 * 
 * The motion interpreter will parse these and apply the corresponding
 * Framer Motion configurations at runtime.
 */

import { type Variants, type Transition, type TargetAndTransition } from "framer-motion";

// ============================================================================
// TYPES
// ============================================================================

export type MotionTrigger = 'scroll' | 'hover' | 'tap' | 'focus' | 'loop' | 'mount';

export interface MotionPreset {
  name: string;
  description: string;
  trigger: MotionTrigger;
  variants?: Variants;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  whileInView?: TargetAndTransition;
  whileHover?: TargetAndTransition;
  whileTap?: TargetAndTransition;
  whileFocus?: TargetAndTransition;
  exit?: TargetAndTransition;
  transition?: Transition;
  viewport?: { once?: boolean; margin?: string; amount?: number | 'some' | 'all' };
  /** For stagger effects - defines child animation */
  staggerChildren?: number;
  delayChildren?: number;
  /** For infinite/loop animations */
  repeat?: number | 'Infinity';
  repeatType?: 'loop' | 'reverse' | 'mirror';
}

export interface ParsedMotionSpec {
  section: string;
  layoutClass?: string;
  motionItems: Array<{
    preset: string;
    targetSelector?: string;
    targetDescription?: string;
  }>;
  layoutSpec?: string;
  vibeKeywords?: string[];
  emotionalTone?: string[];
  imageryDescription?: string;
  colorPalette?: string[];
}

// ============================================================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================================================

export const scrollFadeUp: MotionPreset = {
  name: 'scroll-fade-up',
  description: 'Elements fade in and slide up when scrolled into view',
  trigger: 'scroll',
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const scrollFadeUpFast: MotionPreset = {
  name: 'scroll-fade-up-fast',
  description: 'Quick fade and slide up on scroll',
  trigger: 'scroll',
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export const scrollFadeUpStagger: MotionPreset = {
  name: 'scroll-fade-up-stagger',
  description: 'Children fade in sequentially when parent scrolls into view',
  trigger: 'scroll',
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-50px' },
  staggerChildren: 0.1,
  delayChildren: 0.1,
  transition: { duration: 0.5 },
};

export const scrollFadeIn: MotionPreset = {
  name: 'scroll-fade-in',
  description: 'Simple opacity fade when scrolled into view',
  trigger: 'scroll',
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.8, ease: 'easeOut' },
};

export const scrollSlideLeft: MotionPreset = {
  name: 'scroll-slide-left',
  description: 'Slide in from the left on scroll',
  trigger: 'scroll',
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const scrollSlideRight: MotionPreset = {
  name: 'scroll-slide-right',
  description: 'Slide in from the right on scroll',
  trigger: 'scroll',
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const scrollScaleUp: MotionPreset = {
  name: 'scroll-scale-up',
  description: 'Scale up from small when scrolled into view',
  trigger: 'scroll',
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: 'easeOut' },
};

// ============================================================================
// HOVER ANIMATIONS
// ============================================================================

export const hoverLiftSoft: MotionPreset = {
  name: 'hover-lift-soft',
  description: 'Subtle lift and scale on hover',
  trigger: 'hover',
  whileHover: { y: -4, scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2, ease: 'easeOut' },
};

export const hoverLiftStrong: MotionPreset = {
  name: 'hover-lift-strong',
  description: 'More pronounced lift on hover with shadow implied',
  trigger: 'hover',
  whileHover: { y: -8, scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.25, ease: 'easeOut' },
};

export const hoverScale: MotionPreset = {
  name: 'hover-scale',
  description: 'Simple scale up on hover',
  trigger: 'hover',
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 },
};

export const hoverGlow: MotionPreset = {
  name: 'hover-glow',
  description: 'Subtle brightness increase on hover',
  trigger: 'hover',
  whileHover: { filter: 'brightness(1.1)' },
  transition: { duration: 0.3 },
};

export const hoverRotateSlight: MotionPreset = {
  name: 'hover-rotate-slight',
  description: 'Slight rotation on hover for playful effect',
  trigger: 'hover',
  whileHover: { rotate: 2, scale: 1.02 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

// ============================================================================
// AMBIENT / LOOP ANIMATIONS
// ============================================================================

export const ambientWaterRipple: MotionPreset = {
  name: 'ambient-water-ripple',
  description: 'Subtle continuous ripple effect like water surface',
  trigger: 'loop',
  animate: {
    scale: [1, 1.02, 1],
    opacity: [0.8, 1, 0.8],
  },
  transition: {
    duration: 4,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'mirror',
  },
};

export const ambientFloatingIcons: MotionPreset = {
  name: 'ambient-floating-icons',
  description: 'Gentle floating motion for decorative elements',
  trigger: 'loop',
  animate: {
    y: [0, -10, 0],
    x: [0, 5, 0],
  },
  transition: {
    duration: 6,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'reverse',
  },
};

export const ambientPulse: MotionPreset = {
  name: 'ambient-pulse',
  description: 'Gentle pulsing glow effect',
  trigger: 'loop',
  animate: {
    opacity: [0.7, 1, 0.7],
    scale: [1, 1.05, 1],
  },
  transition: {
    duration: 3,
    ease: 'easeInOut',
    repeat: Infinity,
  },
};

export const ambientBreathing: MotionPreset = {
  name: 'ambient-breathing',
  description: 'Slow breathing scale for organic feel',
  trigger: 'loop',
  animate: {
    scale: [1, 1.03, 1],
  },
  transition: {
    duration: 5,
    ease: 'easeInOut',
    repeat: Infinity,
  },
};

export const crystallineShimmerSlow: MotionPreset = {
  name: 'crystalline-shimmer-slow',
  description: 'Slow crystalline shimmer effect with subtle rotation',
  trigger: 'loop',
  animate: {
    opacity: [0.9, 1, 0.9],
    rotate: [0, 1, 0],
    filter: ['brightness(1)', 'brightness(1.1)', 'brightness(1)'],
  },
  transition: {
    duration: 8,
    ease: 'easeInOut',
    repeat: Infinity,
  },
};

export const crystallineShimmerFast: MotionPreset = {
  name: 'crystalline-shimmer-fast',
  description: 'Faster crystalline shimmer for highlights',
  trigger: 'loop',
  animate: {
    opacity: [0.85, 1, 0.85],
    filter: ['brightness(1)', 'brightness(1.15)', 'brightness(1)'],
  },
  transition: {
    duration: 3,
    ease: 'easeInOut',
    repeat: Infinity,
  },
};

export const ambientDrift: MotionPreset = {
  name: 'ambient-drift',
  description: 'Slow horizontal drift for background elements',
  trigger: 'loop',
  animate: {
    x: [0, 20, 0, -20, 0],
  },
  transition: {
    duration: 20,
    ease: 'linear',
    repeat: Infinity,
  },
};

// ============================================================================
// MOUNT / ENTRY ANIMATIONS
// ============================================================================

export const mountFadeIn: MotionPreset = {
  name: 'mount-fade-in',
  description: 'Fade in when component mounts',
  trigger: 'mount',
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export const mountSlideUp: MotionPreset = {
  name: 'mount-slide-up',
  description: 'Slide up and fade in on mount',
  trigger: 'mount',
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export const mountScaleIn: MotionPreset = {
  name: 'mount-scale-in',
  description: 'Scale in from small on mount',
  trigger: 'mount',
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

// ============================================================================
// EXIT ANIMATIONS
// ============================================================================

export const exitFadeOut: MotionPreset = {
  name: 'exit-fade-out',
  description: 'Fade out when exiting',
  trigger: 'mount',
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: 'easeIn' },
};

export const exitSlideDown: MotionPreset = {
  name: 'exit-slide-down',
  description: 'Slide down and fade out on exit',
  trigger: 'mount',
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3, ease: 'easeIn' },
};

// ============================================================================
// SPECIAL EFFECTS
// ============================================================================

export const parallaxSlow: MotionPreset = {
  name: 'parallax-slow',
  description: 'Slow parallax movement on scroll (use with useScroll)',
  trigger: 'scroll',
  // Note: Parallax requires scroll-linked animation, handled specially
  initial: { y: 0 },
  transition: { duration: 0 },
};

export const revealFromBottom: MotionPreset = {
  name: 'reveal-from-bottom',
  description: 'Clip reveal animation from bottom',
  trigger: 'scroll',
  initial: { clipPath: 'inset(100% 0 0 0)' },
  whileInView: { clipPath: 'inset(0% 0 0 0)' },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.8, ease: 'easeOut' },
};

export const typewriterReveal: MotionPreset = {
  name: 'typewriter-reveal',
  description: 'Progressive text reveal effect',
  trigger: 'scroll',
  initial: { width: 0 },
  whileInView: { width: '100%' },
  viewport: { once: true },
  transition: { duration: 1, ease: 'linear' },
};

// ============================================================================
// PRESET REGISTRY
// ============================================================================

export const MOTION_PRESETS: Record<string, MotionPreset> = {
  // Scroll animations
  'scroll-fade-up': scrollFadeUp,
  'scroll-fade-up-fast': scrollFadeUpFast,
  'scroll-fade-up-stagger': scrollFadeUpStagger,
  'scroll-fade-in': scrollFadeIn,
  'scroll-slide-left': scrollSlideLeft,
  'scroll-slide-right': scrollSlideRight,
  'scroll-scale-up': scrollScaleUp,
  
  // Hover animations
  'hover-lift-soft': hoverLiftSoft,
  'hover-lift-strong': hoverLiftStrong,
  'hover-scale': hoverScale,
  'hover-glow': hoverGlow,
  'hover-rotate-slight': hoverRotateSlight,
  
  // Ambient/loop animations
  'ambient-water-ripple': ambientWaterRipple,
  'ambient-floating-icons': ambientFloatingIcons,
  'ambient-pulse': ambientPulse,
  'ambient-breathing': ambientBreathing,
  'ambient-drift': ambientDrift,
  'crystalline-shimmer-slow': crystallineShimmerSlow,
  'crystalline-shimmer-fast': crystallineShimmerFast,
  
  // Mount animations
  'mount-fade-in': mountFadeIn,
  'mount-slide-up': mountSlideUp,
  'mount-scale-in': mountScaleIn,
  
  // Exit animations
  'exit-fade-out': exitFadeOut,
  'exit-slide-down': exitSlideDown,
  
  // Special effects
  'parallax-slow': parallaxSlow,
  'reveal-from-bottom': revealFromBottom,
  'typewriter-reveal': typewriterReveal,
};

/**
 * Get a motion preset by name
 */
export function getMotionPreset(name: string): MotionPreset | undefined {
  return MOTION_PRESETS[name.toLowerCase()];
}

/**
 * Get all available preset names
 */
export function getAvailablePresets(): string[] {
  return Object.keys(MOTION_PRESETS);
}

/**
 * Check if a preset name is valid
 */
export function isValidPreset(name: string): boolean {
  return name.toLowerCase() in MOTION_PRESETS;
}

/**
 * Get presets by trigger type
 */
export function getPresetsByTrigger(trigger: MotionTrigger): MotionPreset[] {
  return Object.values(MOTION_PRESETS).filter(preset => preset.trigger === trigger);
}
