import { Variants } from "framer-motion";

export const motionPresets: Record<string, Variants> = {
  "scroll-fade-up": {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.23, 0.82, 0.35, 1] },
    },
  },

  "scroll-fade-up-stagger": {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  },

  "scroll-fade-down": {
    hidden: { opacity: 0, y: -24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.23, 0.82, 0.35, 1] },
    },
  },

  "scroll-fade-left": {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.23, 0.82, 0.35, 1] },
    },
  },

  "scroll-fade-right": {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.23, 0.82, 0.35, 1] },
    },
  },

  "scroll-scale-up": {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.23, 0.82, 0.35, 1] },
    },
  },

  "hover-lift-soft": {
    rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.4)" },
    hover: {
      y: -4,
      boxShadow: "0 18px 45px rgba(0,0,0,0.55)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  },

  "hover-glow-border": {
    rest: { 
      borderColor: "rgba(51, 65, 85, 0.7)",
      boxShadow: "none",
    },
    hover: {
      borderColor: "rgba(52, 211, 153, 0.6)",
      boxShadow: "0 0 20px rgba(52, 211, 153, 0.15)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  },

  "hover-scale": {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  },

  "ambient-pulse": {
    initial: { opacity: 0.4 },
    animate: {
      opacity: [0.4, 0.6, 0.4],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  "ambient-float": {
    initial: { y: 0 },
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  "ambient-crystalline-shimmer": {
    initial: { opacity: 0.3 },
    animate: {
      opacity: [0.3, 0.5, 0.3],
      scale: [1, 1.02, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  "ambient-water-ripple": {
    initial: { scale: 1, opacity: 0.2 },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.2, 0.35, 0.2],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  "ambient-cosmic-field": {
    initial: { opacity: 0.3, rotate: 0 },
    animate: {
      opacity: [0.3, 0.45, 0.3],
      rotate: [0, 1, 0, -1, 0],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  "timeline-glow-progress": {
    hidden: { width: "0%", opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.23, 0.82, 0.35, 1],
      },
    },
  },

  "stagger-children-fast": {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  },

  "stagger-children-slow": {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  },

  "button-press": {
    rest: { scale: 1 },
    pressed: {
      scale: 0.97,
      transition: { duration: 0.1 },
    },
  },

  "card-reveal": {
    hidden: { opacity: 0, y: 30, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.23, 0.82, 0.35, 1] 
      },
    },
  },

  "section-fade": {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },

  "stagger-container": {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.08,
      },
    },
  },

  "stagger-item": {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },

  "stagger-container-slow": {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.12,
      },
    },
  },

  "stagger-item-fade": {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },

  "hero-headline": {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 0.82, 0.35, 1] },
    },
  },

  "hero-subline": {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
    },
  },
};

export const viewportSettings = {
  once: true,
  amount: 0.25,
  margin: "-50px",
} as const;

export const viewportSettingsEager = {
  once: true,
  amount: 0.1,
  margin: "-100px",
} as const;

export const viewportSettingsAndara = {
  once: true,
  margin: "-20% 0px -20% 0px",
} as const;
