/**
 * Unified Motion System
 * 
 * Single source of truth for all animations across Andara Ionic.
 * Provides consistent timing, easing, and motion patterns.
 * 
 * Usage:
 *   import { motion, fadeUp, stagger, useReducedMotion } from "@/lib/motion";
 *   <motion.div {...fadeUp}>Content</motion.div>
 */

import { Variants, Transition, TargetAndTransition } from "framer-motion";

// ============================================================================
// TIMING & EASING TOKENS
// ============================================================================

export const timing = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
  ambient: 4,
} as const;

export const easing = {
  smooth: [0.23, 0.82, 0.35, 1] as const,
  snappy: [0.25, 0.1, 0.25, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  easeOut: "easeOut" as const,
  easeIn: "easeIn" as const,
  easeInOut: "easeInOut" as const,
  linear: "linear" as const,
} as const;

export const staggerTiming = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
} as const;

// ============================================================================
// VIEWPORT SETTINGS
// ============================================================================

export const viewport = {
  default: { once: true, amount: 0.25 as const },
  eager: { once: true, amount: 0.1 as const, margin: "-100px" },
  lazy: { once: true, amount: 0.4 as const },
  repeat: { once: false, amount: 0.25 as const },
} as const;

// ============================================================================
// MOTION PROPS - Ready-to-spread on motion.* components
// ============================================================================

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewport.default,
  transition: { duration: timing.slow, ease: easing.smooth },
};

export const fadeUpFast = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewport.default,
  transition: { duration: timing.normal, ease: easing.easeOut },
};

export const fadeDown = {
  initial: { opacity: 0, y: -24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewport.default,
  transition: { duration: timing.slow, ease: easing.smooth },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: viewport.default,
  transition: { duration: timing.slow, ease: easing.easeOut },
};

export const fadeLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: viewport.default,
  transition: { duration: timing.slow, ease: easing.smooth },
};

export const fadeRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: viewport.default,
  transition: { duration: timing.slow, ease: easing.smooth },
};

export const scaleUp = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: viewport.default,
  transition: { duration: timing.slower, ease: easing.smooth },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: timing.normal, ease: easing.easeOut },
};

// ============================================================================
// MOUNT ANIMATIONS (for components that animate on first render)
// ============================================================================

export const mountFadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: timing.normal, ease: easing.easeOut },
};

export const mountFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: timing.normal, ease: easing.easeOut },
};

export const mountSlideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: timing.slow, ease: easing.smooth },
};

export const mountSlideDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: timing.slow, ease: easing.smooth },
};

export const mountSlideLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: timing.slow, ease: easing.smooth },
};

export const mountSlideRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: timing.slow, ease: easing.smooth },
};

// ============================================================================
// EXIT ANIMATIONS
// ============================================================================

export const exitFadeOut = {
  exit: { opacity: 0 },
  transition: { duration: timing.fast, ease: easing.easeIn },
};

export const exitFadeDown = {
  exit: { opacity: 0, y: 20 },
  transition: { duration: timing.fast, ease: easing.easeIn },
};

export const exitFadeUp = {
  exit: { opacity: 0, y: -20 },
  transition: { duration: timing.fast, ease: easing.easeIn },
};

export const exitScaleOut = {
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: timing.fast, ease: easing.easeIn },
};

// ============================================================================
// STAGGER ANIMATIONS (for lists/grids)
// ============================================================================

export const stagger = {
  container: {
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: viewport.default,
    variants: {
      hidden: {},
      visible: {
        transition: { staggerChildren: staggerTiming.normal },
      },
    } as Variants,
  },
  containerFast: {
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: viewport.default,
    variants: {
      hidden: {},
      visible: {
        transition: { staggerChildren: staggerTiming.fast },
      },
    } as Variants,
  },
  containerSlow: {
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: viewport.default,
    variants: {
      hidden: {},
      visible: {
        transition: { staggerChildren: staggerTiming.slow },
      },
    } as Variants,
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: timing.normal, ease: easing.smooth },
    },
  } as Variants,
  itemFade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: timing.normal, ease: easing.easeOut },
    },
  } as Variants,
  itemScale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: timing.normal, ease: easing.smooth },
    },
  } as Variants,
  itemLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: timing.normal, ease: easing.smooth },
    },
  } as Variants,
};

// ============================================================================
// HOVER ANIMATIONS
// ============================================================================

export const hover = {
  lift: {
    whileHover: { y: -4, scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: timing.fast, ease: easing.easeOut },
  },
  liftStrong: {
    whileHover: { y: -8, scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { duration: timing.fast, ease: easing.easeOut },
  },
  scale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: timing.fast },
  },
  scaleSubtle: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: timing.instant },
  },
  glow: {
    whileHover: { filter: "brightness(1.1)" },
    transition: { duration: timing.fast },
  },
  rotate: {
    whileHover: { rotate: 2, scale: 1.02 },
    transition: { duration: timing.fast, ease: easing.easeOut },
  },
};

// ============================================================================
// TAP/PRESS ANIMATIONS
// ============================================================================

export const tap = {
  subtle: {
    whileTap: { scale: 0.98 },
    transition: { duration: timing.instant },
  },
  strong: {
    whileTap: { scale: 0.95 },
    transition: { duration: timing.instant },
  },
  press: {
    whileTap: { scale: 0.97, y: 1 },
    transition: { duration: timing.instant },
  },
};

// ============================================================================
// GROUPED MOUNT ANIMATIONS (convenient access)
// ============================================================================

export const mount = {
  fade: mountFadeIn,
  fadeUp: mountFadeUp,
  slideUp: mountSlideUp,
  slideDown: mountSlideDown,
  slideLeft: mountSlideLeft,
  slideRight: mountSlideRight,
};

// Slide-in aliases for easier access
export const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: viewport.default,
  transition: { duration: timing.slow, ease: easing.smooth },
};

export const slideInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: viewport.default,
  transition: { duration: timing.slow, ease: easing.smooth },
};

// ============================================================================
// AMBIENT/LOOP ANIMATIONS
// ============================================================================

export const ambient = {
  pulse: {
    animate: {
      opacity: [0.4, 0.6, 0.4],
      scale: [1, 1.02, 1],
    },
    transition: {
      duration: timing.ambient,
      repeat: Infinity,
      ease: easing.easeInOut,
    },
  },
  float: {
    animate: {
      y: [-8, 8, -8],
    },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: easing.easeInOut,
    },
  },
  floatSlow: {
    animate: {
      y: [-12, 12, -12],
    },
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: easing.easeInOut,
    },
  },
  shimmer: {
    animate: {
      opacity: [0.8, 1, 0.8],
      filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"],
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: easing.easeInOut,
    },
  },
  breathe: {
    animate: {
      scale: [1, 1.03, 1],
    },
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: easing.easeInOut,
    },
  },
  ripple: {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.2, 0.35, 0.2],
    },
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: easing.easeInOut,
    },
  },
  drift: {
    animate: {
      x: [0, 20, 0, -20, 0],
    },
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: easing.linear,
    },
  },
};

// ============================================================================
// SPECIAL EFFECTS
// ============================================================================

export const special = {
  cardReveal: {
    initial: { opacity: 0, y: 30, rotateX: -10 },
    whileInView: {
      opacity: 1,
      y: 0,
      rotateX: 0,
    },
    viewport: viewport.default,
    transition: { duration: timing.slower, ease: easing.smooth },
  },
  heroHeadline: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewport.eager,
    transition: { duration: timing.slower, ease: easing.smooth },
  },
  heroSubline: {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewport.eager,
    transition: { duration: timing.slow, delay: 0.2, ease: easing.easeOut },
  },
  revealFromBottom: {
    initial: { clipPath: "inset(100% 0 0 0)" },
    whileInView: { clipPath: "inset(0% 0 0 0)" },
    viewport: viewport.default,
    transition: { duration: timing.slower, ease: easing.easeOut },
  },
};

// ============================================================================
// OVERLAY ANIMATIONS (for modals, menus, drawers)
// ============================================================================

export const overlay = {
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: timing.fast },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: timing.normal, ease: easing.smooth },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: timing.normal, ease: easing.smooth },
  },
  slideLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: timing.normal, ease: easing.smooth },
  },
  slideRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: timing.normal, ease: easing.smooth },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: timing.fast, ease: easing.smooth },
  },
};

// ============================================================================
// REDUCED MOTION SUPPORT
// ============================================================================

export const reducedMotion = {
  fadeUp: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: viewport.default,
    transition: { duration: timing.fast },
  },
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: viewport.default,
    transition: { duration: timing.fast },
  },
  instant: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    transition: { duration: 0 },
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Create stagger delay for manual stagger control
 */
export function staggerDelay(index: number, baseDelay = 0.05): number {
  return index * baseDelay;
}

/**
 * Create a custom transition
 */
export function createTransition(
  duration: number = timing.normal,
  ease: typeof easing[keyof typeof easing] = easing.smooth,
  delay: number = 0
): Transition {
  return { duration, ease, delay };
}

/**
 * Merge motion props with custom overrides
 */
export function withMotion<T extends object>(
  preset: T,
  overrides: Partial<T> = {}
): T {
  return { ...preset, ...overrides };
}

/**
 * Create motion props with custom delay
 */
export function withDelay<T extends { transition?: Transition }>(
  preset: T,
  delay: number
): T {
  return {
    ...preset,
    transition: { ...preset.transition, delay },
  };
}

// ============================================================================
// CSS KEYFRAMES (for use in style tags when Framer Motion isn't available)
// ============================================================================

export const cssKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.02); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(-8px); }
    50% { transform: translateY(8px); }
  }
  @keyframes shimmer {
    0%, 100% { opacity: 0.8; filter: brightness(1); }
    50% { opacity: 1; filter: brightness(1.1); }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// ============================================================================
// FRAMER MOTION VARIANTS (legacy support for motionPresets.ts consumers)
// ============================================================================

// ============================================================================
// PARALLAX LAYER PRESETS
// ============================================================================

export const parallax = {
  /** Background layer - slowest movement, creates depth */
  backgroundLayer: {
    initial: { y: 0, scale: 1.05 },
    style: { willChange: 'transform' },
  },
  /** Midground layer - medium speed movement */
  midgroundLayer: {
    initial: { y: 0, scale: 1.02 },
    style: { willChange: 'transform' },
  },
  /** Foreground layer - fastest movement, closest to viewer */
  foregroundLayer: {
    initial: { y: 0, scale: 1 },
    style: { willChange: 'transform' },
  },
  /** Floating decorative elements with parallax-like ambient motion */
  floatingElement: {
    animate: {
      y: [-15, 15, -15],
      x: [-5, 5, -5],
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: easing.easeInOut,
    },
  },
  /** Subtle parallax drift for decorative elements */
  driftElement: {
    animate: {
      y: [-8, 8, -8],
      rotate: [-1, 1, -1],
    },
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: easing.easeInOut,
    },
  },
  /** Container for parallax sections */
  container: {
    style: {
      position: 'relative' as const,
      overflow: 'hidden',
      perspective: '1000px',
    },
  },
};

/** Parallax scroll factors for different layer depths */
export const parallaxFactors = {
  background: 0.3,  // Moves 30% of scroll speed
  midground: 0.6,   // Moves 60% of scroll speed  
  foreground: 0.9,  // Moves 90% of scroll speed
  floating: 0.5,    // Moves 50% of scroll speed
};

export const variants: Record<string, Variants> = {
  "scroll-fade-up": {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: timing.slow, ease: easing.smooth },
    },
  },
  "scroll-fade-down": {
    hidden: { opacity: 0, y: -24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: timing.slow, ease: easing.smooth },
    },
  },
  "scroll-fade-left": {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: timing.slow, ease: easing.smooth },
    },
  },
  "scroll-fade-right": {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: timing.slow, ease: easing.smooth },
    },
  },
  "stagger-container": {
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerTiming.normal },
    },
  },
  "stagger-item": {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: timing.normal, ease: easing.smooth },
    },
  },
  "hover-lift": {
    rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.4)" },
    hover: {
      y: -4,
      boxShadow: "0 18px 45px rgba(0,0,0,0.55)",
      transition: { duration: timing.fast, ease: easing.easeOut },
    },
  },
  "hover-scale": {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: timing.fast, ease: easing.easeOut },
    },
  },
};

// Re-export motion from framer-motion for convenience
export { motion, AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";
