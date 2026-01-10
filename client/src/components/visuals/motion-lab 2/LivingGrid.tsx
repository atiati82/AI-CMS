import React from 'react';
import { motion } from 'framer-motion';

interface LivingCellProps {
    color?: string;
    hoverColor?: string;
}

function LivingCell({ color = "rgba(255, 255, 255, 0.05)", hoverColor = "rgba(16, 185, 129, 0.4)" }: LivingCellProps) {
    return (
        <motion.div
            className="w-full h-full rounded-full border border-white/5 backdrop-blur-sm"
            style={{ backgroundColor: color }}
            whileHover={{
                scale: 1.5,
                backgroundColor: hoverColor,
                borderColor: hoverColor.replace('0.4', '0.8'),
                transition: { duration: 0.2 }
            }}
            animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
}

export function LivingGrid({ rows = 4, cols = 6 }: { rows?: number, cols?: number }) {
    const totalCells = rows * cols;

    return (
        <div className="relative w-full h-full min-h-[400px] overflow-hidden bg-slate-950/50 rounded-xl border border-white/10">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <h3 className="text-3xl font-bold text-white/20 mix-blend-overlay text-center">
                    Living Field<br />
                    <span className="text-sm font-normal">Hover to ripple</span>
                </h3>
            </div>

            <div
                className="absolute inset-0 grid gap-2 p-4"
                style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
                }}
            >
                {[...Array(totalCells)].map((_, i) => (
                    <LivingCell key={i} />
                ))}
            </div>
        </div>
    );
}
