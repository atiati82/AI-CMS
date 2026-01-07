import React from 'react';
import { motion } from 'framer-motion';

interface BioParticlesProps {
    count?: number;
    className?: string;
    color?: string;
}

/**
 * BioParticles - Floating bio-inspired particle animation
 */
export function BioParticles({ count = 20, className = '', color = '#06b6d4' }: BioParticlesProps) {
    const particles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2
    }));

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        backgroundColor: color
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeInOut'
                    }}
                />
            ))}
        </div>
    );
}

export default BioParticles;
