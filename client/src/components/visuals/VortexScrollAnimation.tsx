import React from 'react';
import { motion } from 'framer-motion';

interface VortexScrollAnimationProps {
    className?: string;
    size?: number;
}

/**
 * VortexScrollAnimation - Spiral vortex animation triggered on scroll
 */
export function VortexScrollAnimation({ className = '', size = 200 }: VortexScrollAnimationProps) {
    return (
        <motion.div
            className={`relative ${className}`}
            style={{ width: size, height: size }}
            initial={{ opacity: 0, rotate: -180 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
        >
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="vortexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M50 50 m0 0 a2 2 0 0 1 4 4 a6 6 0 0 1 -10 10 a14 14 0 0 1 20 -20 a24 24 0 0 1 -32 32"
                    stroke="url(#vortexGradient)"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                />
                <motion.circle
                    cx="50"
                    cy="50"
                    r="4"
                    fill="#7c3aed"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </svg>
        </motion.div>
    );
}

export default VortexScrollAnimation;
