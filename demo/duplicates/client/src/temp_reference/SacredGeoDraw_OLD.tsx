import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function SacredGeoDraw() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Map scroll progress to path drawing
    // When the component is generating (0.2 to 0.8 visibility), we draw the path
    const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <div ref={containerRef} className="relative w-64 h-64 mx-auto">
            {/* Rotating Container */}
            <motion.div
                style={{ rotate }}
                className="w-full h-full"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    {/* Flower of Life / Hexagonal Pattern */}
                    <motion.path
                        d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z M50 20 L50 80 M20 35 L80 65 M80 35 L20 65"
                        fill="transparent"
                        stroke="url(#geo-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{
                            pathLength: pathLength
                        }}
                    />
                    {/* Outer Circle */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                    />
                    <defs>
                        <linearGradient id="geo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#22d3ee" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>

            {/* Center Pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 bg-cyan-400 rounded-full blur-md"
                />
            </div>
        </div>
    );
}
