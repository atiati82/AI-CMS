import React from 'react';
import { motion } from 'framer-motion';

interface SacredGeometryLoaderProps {
    size?: number;
    className?: string;
}

/**
 * SacredGeometryLoader - Animated loader with sacred geometry pattern
 */
export function SacredGeometryLoader({ size = 48, className = '' }: SacredGeometryLoaderProps) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <motion.svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
                <defs>
                    <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#FFD700" />
                        <stop offset="100%" stopColor="#38ffd1" />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M50 15 L75 30 L75 60 L50 75 L25 60 L25 30 Z"
                    stroke="url(#loaderGradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.circle
                    cx="50"
                    cy="50"
                    r="3"
                    fill="#FFD700"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </motion.svg>
        </div>
    );
}

export default SacredGeometryLoader;
