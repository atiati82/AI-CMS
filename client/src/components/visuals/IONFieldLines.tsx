import React from 'react';
import { motion } from 'framer-motion';

interface IONFieldLinesProps {
    className?: string;
    variant?: 'radial' | 'flow' | 'vortex';
    centerX?: number;
    centerY?: number;
}

/**
 * IONFieldLines - Electromagnetic field visualization
 * SVG-based field lines with path drawing animations
 */
export function IONFieldLines({
    className = '',
    variant = 'radial',
    centerX = 50,
    centerY = 50
}: IONFieldLinesProps) {

    const generateRadialPaths = () => {
        const paths = [];
        const lineCount = 16;

        for (let i = 0; i < lineCount; i++) {
            const angle = (i / lineCount) * Math.PI * 2;
            const x1 = centerX + Math.cos(angle) * 10;
            const y1 = centerY + Math.sin(angle) * 10;
            const x2 = centerX + Math.cos(angle) * 40;
            const y2 = centerY + Math.sin(angle) * 40;

            // Curved path for more organic feel
            const cpx = centerX + Math.cos(angle + 0.3) * 25;
            const cpy = centerY + Math.sin(angle + 0.3) * 25;

            paths.push({
                id: `radial-${i}`,
                d: `M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`,
                delay: i * 0.05
            });
        }

        return paths;
    };

    const generateFlowPaths = () => {
        const paths = [];
        const streamCount = 8;

        for (let i = 0; i < streamCount; i++) {
            const yOffset = (i / streamCount) * 100;
            const amplitude = 15 + Math.sin(i) * 5;

            paths.push({
                id: `flow-${i}`,
                d: `M 0 ${yOffset} Q 25 ${yOffset - amplitude} 50 ${yOffset} T 100 ${yOffset}`,
                delay: i * 0.08
            });
        }

        return paths;
    };

    const generateVortexPaths = () => {
        const paths = [];
        const spiralCount = 5;

        for (let i = 0; i < spiralCount; i++) {
            const points = [];
            const turns = 2 + i * 0.5;
            const segments = 40;

            for (let j = 0; j <= segments; j++) {
                const t = j / segments;
                const angle = t * Math.PI * 2 * turns;
                const radius = 5 + t * 35;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                points.push(`${j === 0 ? 'M' : 'L'} ${x} ${y}`);
            }

            paths.push({
                id: `vortex-${i}`,
                d: points.join(' '),
                delay: i * 0.1
            });
        }

        return paths;
    };

    const paths = variant === 'radial'
        ? generateRadialPaths()
        : variant === 'flow'
            ? generateFlowPaths()
            : generateVortexPaths();

    return (
        <svg
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
        >
            <defs>
                <linearGradient id="ionFieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>

                <filter id="ionFieldGlow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {paths.map((path) => (
                <motion.path
                    key={path.id}
                    d={path.d}
                    stroke="url(#ionFieldGradient)"
                    strokeWidth="0.3"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#ionFieldGlow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: 1,
                        opacity: [0, 0.8, 0.6],
                    }}
                    transition={{
                        pathLength: { duration: 2, delay: path.delay, ease: 'easeInOut' },
                        opacity: { duration: 1.5, delay: path.delay }
                    }}
                />
            ))}

            {/* Central charge point */}
            {variant === 'radial' && (
                <motion.circle
                    cx={centerX}
                    cy={centerY}
                    r="2"
                    fill="#8b5cf6"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [0, 1.2, 1],
                        opacity: [0, 1, 0.8]
                    }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            )}

            {/* Pulsing glow */}
            {variant === 'radial' && (
                <motion.circle
                    cx={centerX}
                    cy={centerY}
                    r="8"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="0.5"
                    opacity="0.3"
                    animate={{
                        r: [8, 12, 8],
                        opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
            )}
        </svg>
    );
}

export default IONFieldLines;
