import React from 'react';
import { motion } from 'framer-motion';

interface SacredGeoDrawProps {
    className?: string;
    variant?: 'hexagon' | 'triangle' | 'flower';
    size?: number;
    animate?: boolean;
}

/**
 * SacredGeoDraw - Animated sacred geometry drawing component
 */
export function SacredGeoDraw({
    className = '',
    variant = 'hexagon',
    size = 200,
    animate = true
}: SacredGeoDrawProps) {
    const paths = {
        hexagon: "M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z",
        triangle: "M50 10 L90 80 L10 80 Z",
        flower: "M50 50 m-30 0 a30 30 0 1 0 60 0 a30 30 0 1 0 -60 0"
    };

    return (
        <div className={`relative ${className}`} style={{ width: size, height: size }}>
            <motion.svg
                viewBox="0 0 100 100"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient id="sacredGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#38ffd1" />
                    </linearGradient>
                </defs>
                <motion.path
                    d={paths[variant]}
                    stroke="url(#sacredGradient)"
                    strokeWidth="1.5"
                    fill="none"
                    initial={animate ? { pathLength: 0, opacity: 0 } : {}}
                    animate={animate ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
            </motion.svg>
        </div>
    );
}

export default SacredGeoDraw;
