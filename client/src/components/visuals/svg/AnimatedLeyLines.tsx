import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedLeyLinesProps {
    className?: string;
    lineCount?: number;
}

/**
 * AnimatedLeyLines - Animated energy lines connecting points
 */
export function AnimatedLeyLines({ className = '', lineCount = 6 }: AnimatedLeyLinesProps) {
    return (
        <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
                <linearGradient id="leyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
            </defs>
            {Array.from({ length: lineCount }).map((_, i) => {
                const startX = Math.random() * 100;
                const endX = Math.random() * 100;
                return (
                    <motion.line
                        key={i}
                        x1={startX}
                        y1="0"
                        x2={endX}
                        y2="100"
                        stroke="url(#leyGradient)"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: 'easeInOut'
                        }}
                    />
                );
            })}
        </svg>
    );
}

export default AnimatedLeyLines;
