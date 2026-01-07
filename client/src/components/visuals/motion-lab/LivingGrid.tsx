import React from 'react';
import { motion } from 'framer-motion';

interface LivingGridProps {
    className?: string;
    rows?: number;
    cols?: number;
    color?: string;
}

/**
 * LivingGrid - Animated grid with pulsing nodes
 */
export function LivingGrid({
    className = '',
    rows = 5,
    cols = 5,
    color = '#06b6d4'
}: LivingGridProps) {
    return (
        <div className={`grid gap-2 ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {Array.from({ length: rows * cols }).map((_, i) => (
                <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </div>
    );
}

export default LivingGrid;
