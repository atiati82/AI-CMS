import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
};

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  className = "",
  direction = "up"
}: FadeInProps) {
  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 20 };
      case "down": return { opacity: 0, y: -20 };
      case "left": return { opacity: 0, x: 20 };
      case "right": return { opacity: 0, x: -20 };
      case "none": return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    if (direction === "none") return { opacity: 1 };
    if (direction === "left" || direction === "right") return { opacity: 1, x: 0 };
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

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function StaggerContainer({ children, className = "", delay = 0 }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: delay }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={staggerItem}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleOnHover({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ 
  children, 
  direction = "left",
  className = "" 
}: { 
  children: ReactNode; 
  direction?: "left" | "right";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
