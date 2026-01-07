/**
 * ScrollProgress - A subtle scroll progress indicator
 * Shows a progress bar at the top of the page as the user scrolls
 */

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 origin-left z-[100]"
            style={{ scaleX }}
        />
    );
}

export default ScrollProgress;
