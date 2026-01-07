import React from 'react';
import { motion } from 'framer-motion';

interface GoldLogoLoaderProps {
    size?: number;
    className?: string;
}

/**
 * GoldLogoLoader - Animated loading indicator with Andara gold theme.
 */
export function GoldLogoLoader({ size = 48, className = '' }: GoldLogoLoaderProps) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <motion.div
                className="relative"
                style={{ width: size, height: size }}
            >
                {/* Outer ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-amber-500/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />

                {/* Inner spinning hexagon hint */}
                <motion.svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                    <defs>
                        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#B8860B" />
                            <stop offset="50%" stopColor="#FFD700" />
                            <stop offset="100%" stopColor="#DAA520" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z"
                        stroke="url(#goldGradient)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                    />
                </motion.svg>

                {/* Center pulsing dot */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1 rounded-full bg-amber-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </motion.div>
        </div>
    );
}

export default GoldLogoLoader;
