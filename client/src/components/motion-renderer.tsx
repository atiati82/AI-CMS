/**
 * MotionRenderer Component
 * 
 * Applies Framer Motion animations based on parsed motion specs.
 * Takes motionSpecs from the AI enrichment and applies the corresponding
 * animation presets to child elements.
 */

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { type ReactNode, useMemo } from "react";
import { MOTION_PRESETS, getMotionPreset, type MotionPreset } from "@/lib/motion-presets";

interface MotionItemSpec {
  preset: string;
  targetSelector?: string;
  targetDescription?: string;
  trigger?: 'scroll' | 'hover' | 'loop' | 'mount';
}

interface MotionWrapperProps {
  preset: string;
  children: ReactNode;
  className?: string;
}

export function MotionWrapper({ preset, children, className = "" }: MotionWrapperProps) {
  const motionPreset = useMemo(() => getMotionPreset(preset), [preset]);
  
  if (!motionPreset) {
    console.warn(`Motion preset "${preset}" not found`);
    return <div className={className}>{children}</div>;
  }

  const motionProps: Record<string, any> = {};
  
  if (motionPreset.initial) motionProps.initial = motionPreset.initial;
  if (motionPreset.animate) motionProps.animate = motionPreset.animate;
  if (motionPreset.whileInView) motionProps.whileInView = motionPreset.whileInView;
  if (motionPreset.whileHover) motionProps.whileHover = motionPreset.whileHover;
  if (motionPreset.whileTap) motionProps.whileTap = motionPreset.whileTap;
  if (motionPreset.whileFocus) motionProps.whileFocus = motionPreset.whileFocus;
  if (motionPreset.exit) motionProps.exit = motionPreset.exit;
  if (motionPreset.transition) motionProps.transition = motionPreset.transition;
  if (motionPreset.viewport) motionProps.viewport = motionPreset.viewport;

  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  staggerDelay?: number;
  delayChildren?: number;
  children: ReactNode;
  className?: string;
}

export function StaggerContainer({ 
  staggerDelay = 0.1, 
  delayChildren = 0.1,
  children, 
  className = "" 
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay, delayChildren }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AmbientMotionProps {
  preset: 'ambient-water-ripple' | 'ambient-floating-icons' | 'ambient-pulse' | 
          'ambient-breathing' | 'ambient-drift' | 'crystalline-shimmer-slow' | 
          'crystalline-shimmer-fast' | 'ambient-volcanic-glow' | 'ambient-crystalline-shimmer';
  children: ReactNode;
  className?: string;
}

export function AmbientMotion({ preset, children, className = "" }: AmbientMotionProps) {
  const presetMap: Record<string, any> = {
    'ambient-water-ripple': {
      animate: { scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] },
      transition: { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" as const }
    },
    'ambient-floating-icons': {
      animate: { y: [0, -10, 0], x: [0, 5, 0] },
      transition: { duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" as const }
    },
    'ambient-pulse': {
      animate: { opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] },
      transition: { duration: 3, ease: "easeInOut", repeat: Infinity }
    },
    'ambient-breathing': {
      animate: { scale: [1, 1.03, 1] },
      transition: { duration: 5, ease: "easeInOut", repeat: Infinity }
    },
    'ambient-drift': {
      animate: { x: [0, 20, 0, -20, 0] },
      transition: { duration: 20, ease: "linear", repeat: Infinity }
    },
    'crystalline-shimmer-slow': {
      animate: { opacity: [0.9, 1, 0.9], rotate: [0, 1, 0], filter: ['brightness(1)', 'brightness(1.1)', 'brightness(1)'] },
      transition: { duration: 8, ease: "easeInOut", repeat: Infinity }
    },
    'crystalline-shimmer-fast': {
      animate: { opacity: [0.85, 1, 0.85], filter: ['brightness(1)', 'brightness(1.15)', 'brightness(1)'] },
      transition: { duration: 3, ease: "easeInOut", repeat: Infinity }
    },
    'ambient-volcanic-glow': {
      animate: { 
        filter: ['brightness(1) hue-rotate(0deg)', 'brightness(1.2) hue-rotate(10deg)', 'brightness(1) hue-rotate(0deg)'],
        boxShadow: ['0 0 20px rgba(255,100,0,0.3)', '0 0 40px rgba(255,150,0,0.5)', '0 0 20px rgba(255,100,0,0.3)']
      },
      transition: { duration: 4, ease: "easeInOut", repeat: Infinity }
    },
    'ambient-crystalline-shimmer': {
      animate: { 
        opacity: [0.9, 1, 0.9], 
        scale: [1, 1.01, 1],
        filter: ['brightness(1)', 'brightness(1.15)', 'brightness(1)']
      },
      transition: { duration: 5, ease: "easeInOut", repeat: Infinity }
    }
  };

  const config = presetMap[preset] || presetMap['ambient-pulse'];

  return (
    <motion.div className={className} {...config}>
      {children}
    </motion.div>
  );
}

interface ScrollRevealProps {
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  children: ReactNode;
  className?: string;
}

export function ScrollReveal({ 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  children, 
  className = "" 
}: ScrollRevealProps) {
  const getInitial = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 30 };
      case 'down': return { opacity: 0, y: -30 };
      case 'left': return { opacity: 0, x: 50 };
      case 'right': return { opacity: 0, x: -50 };
      case 'none': return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    if (direction === 'none') return { opacity: 1 };
    if (direction === 'left' || direction === 'right') return { opacity: 1, x: 0 };
    return { opacity: 1, y: 0 };
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HoverLiftProps {
  intensity?: 'soft' | 'strong';
  children: ReactNode;
  className?: string;
}

export function HoverLift({ intensity = 'soft', children, className = "" }: HoverLiftProps) {
  const config = intensity === 'soft' 
    ? { whileHover: { y: -4, scale: 1.02 }, whileTap: { scale: 0.98 } }
    : { whileHover: { y: -8, scale: 1.03 }, whileTap: { scale: 0.97 } };

  return (
    <motion.div
      className={className}
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...config}
    >
      {children}
    </motion.div>
  );
}

export function getPresetDescription(preset: string): string {
  const motionPreset = getMotionPreset(preset);
  return motionPreset?.description || `Unknown preset: ${preset}`;
}

export function getAvailablePresetsList(): Array<{ name: string; description: string; trigger: string }> {
  return Object.entries(MOTION_PRESETS).map(([name, preset]) => ({
    name,
    description: preset.description,
    trigger: preset.trigger
  }));
}
