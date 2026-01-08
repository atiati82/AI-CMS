import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveBackgroundProps {
    className?: string;
    variant?: 'particles' | 'gradient' | 'mesh';
    registryId?: string; // Optional, for future image-based backgrounds
}

/**
 * InteractiveBackground - Animated background with various effects
 */
export function InteractiveBackground({
    className = '',
    variant = 'gradient'
}: InteractiveBackgroundProps) {
    if (variant === 'gradient') {
        return (
            <div className={`absolute inset-0 overflow-hidden ${className}`}>
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />
            </div>
        );
    }

    if (variant === 'particles') {
        return (
            <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
                {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                        animate={{
                            y: [-10, 10, -10],
                            opacity: [0.2, 0.6, 0.2]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>
        );
    }

    // mesh variant
    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
                <defs>
                    <pattern id="mesh" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mesh)" className="text-cyan-500" />
            </svg>
        </div>
    );
}

export default InteractiveBackground;
