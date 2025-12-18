import React from 'react';
import { motion } from 'framer-motion';

/**
 * SO4TetrahedronDiagram - Sulfate Tetrahedron Visualization
 * Shows the tetrahedral geometry of SO4²⁻ with labeled atoms
 */
export function SO4TetrahedronDiagram({
    className = '',
    size = 300,
    showLabels = true,
    animated = true
}: {
    className?: string;
    size?: number;
    showLabels?: boolean;
    animated?: boolean;
}) {
    // Andara brand colors
    const colors = {
        sulfur: '#D4AF37',     // Gold
        oxygen: '#0EA5E9',     // Sky Blue
        bond: '#4F46E5',       // Indigo
        bondLight: 'rgba(79, 70, 229, 0.3)',
        text: '#1E293B',
        textLight: '#64748B',
        glow: 'rgba(212, 175, 55, 0.4)'
    };

    const center = size / 2;
    const scale = size / 300;

    // Tetrahedron vertices (3D projected to 2D)
    // Sulfur at center, 4 oxygen atoms at tetrahedron vertices
    const sulfur = { x: center, y: center };

    // Oxygen positions (tetrahedral arrangement projected)
    const oxygenPositions = [
        { x: center, y: center - 80 * scale, label: 'O' },           // Top
        { x: center - 70 * scale, y: center + 50 * scale, label: 'O' }, // Bottom-left
        { x: center + 70 * scale, y: center + 50 * scale, label: 'O' }, // Bottom-right
        { x: center + 15 * scale, y: center + 10 * scale, label: 'O', hidden: true } // Back (smaller, depth effect)
    ];

    const atomRadius = 20 * scale;
    const sulfurRadius = 28 * scale;
    const backOxygenRadius = 14 * scale;

    return (
        <motion.svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={`so4-tetrahedron-diagram ${className}`}
            initial={animated ? { opacity: 0 } : undefined}
            animate={animated ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5 }}
        >
            <defs>
                {/* Gradients */}
                <radialGradient id="sulfurGradient" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#F5DEB3" />
                    <stop offset="50%" stopColor={colors.sulfur} />
                    <stop offset="100%" stopColor="#8B7355" />
                </radialGradient>
                <radialGradient id="oxygenGradient" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#7DD3FC" />
                    <stop offset="50%" stopColor={colors.oxygen} />
                    <stop offset="100%" stopColor="#0369A1" />
                </radialGradient>
                <radialGradient id="oxygenBackGradient" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#BAE6FD" />
                    <stop offset="100%" stopColor="#7DD3FC" />
                </radialGradient>

                {/* Glow filter */}
                <filter id="atomGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Background glow around sulfur */}
            <motion.circle
                cx={center}
                cy={center}
                r={60 * scale}
                fill={colors.glow}
                initial={animated ? { scale: 0 } : undefined}
                animate={animated ? { scale: 1 } : undefined}
                transition={{ delay: 0.2 }}
            />

            {/* Bonds (back bond first - depth) */}
            <motion.line
                x1={sulfur.x}
                y1={sulfur.y}
                x2={oxygenPositions[3].x}
                y2={oxygenPositions[3].y}
                stroke={colors.bondLight}
                strokeWidth={3 * scale}
                strokeDasharray="4 2"
                initial={animated ? { pathLength: 0 } : undefined}
                animate={animated ? { pathLength: 1 } : undefined}
                transition={{ delay: 0.3 }}
            />

            {/* Front bonds */}
            {oxygenPositions.slice(0, 3).map((o, i) => (
                <motion.line
                    key={i}
                    x1={sulfur.x}
                    y1={sulfur.y}
                    x2={o.x}
                    y2={o.y}
                    stroke={colors.bond}
                    strokeWidth={4 * scale}
                    initial={animated ? { pathLength: 0 } : undefined}
                    animate={animated ? { pathLength: 1 } : undefined}
                    transition={{ delay: 0.4 + i * 0.1 }}
                />
            ))}

            {/* Back oxygen (depth effect - drawn first) */}
            <motion.circle
                cx={oxygenPositions[3].x}
                cy={oxygenPositions[3].y}
                r={backOxygenRadius}
                fill="url(#oxygenBackGradient)"
                opacity={0.6}
                initial={animated ? { scale: 0 } : undefined}
                animate={animated ? { scale: 1 } : undefined}
                transition={{ delay: 0.6, type: 'spring' }}
            />

            {/* Sulfur atom (center) */}
            <motion.circle
                cx={sulfur.x}
                cy={sulfur.y}
                r={sulfurRadius}
                fill="url(#sulfurGradient)"
                filter="url(#atomGlow)"
                initial={animated ? { scale: 0 } : undefined}
                animate={animated ? { scale: 1 } : undefined}
                transition={{ delay: 0.5, type: 'spring' }}
            />
            {showLabels && (
                <text
                    x={sulfur.x}
                    y={sulfur.y + 6 * scale}
                    textAnchor="middle"
                    fill="white"
                    fontSize={16 * scale}
                    fontWeight="700"
                >
                    S
                </text>
            )}

            {/* Front oxygen atoms */}
            {oxygenPositions.slice(0, 3).map((o, i) => (
                <motion.g key={i}>
                    <motion.circle
                        cx={o.x}
                        cy={o.y}
                        r={atomRadius}
                        fill="url(#oxygenGradient)"
                        filter="url(#atomGlow)"
                        initial={animated ? { scale: 0 } : undefined}
                        animate={animated ? { scale: 1 } : undefined}
                        transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
                    />
                    {showLabels && (
                        <text
                            x={o.x}
                            y={o.y + 5 * scale}
                            textAnchor="middle"
                            fill="white"
                            fontSize={14 * scale}
                            fontWeight="600"
                        >
                            O
                        </text>
                    )}
                </motion.g>
            ))}

            {/* Formula label */}
            {showLabels && (
                <motion.g
                    initial={animated ? { opacity: 0, y: 10 } : undefined}
                    animate={animated ? { opacity: 1, y: 0 } : undefined}
                    transition={{ delay: 1 }}
                >
                    <text
                        x={center}
                        y={size - 20 * scale}
                        textAnchor="middle"
                        fill={colors.text}
                        fontSize={18 * scale}
                        fontWeight="600"
                    >
                        SO₄²⁻
                    </text>
                    <text
                        x={center}
                        y={size - 5 * scale}
                        textAnchor="middle"
                        fill={colors.textLight}
                        fontSize={12 * scale}
                    >
                        Tetrahedral Sulfate
                    </text>
                </motion.g>
            )}

            {/* Bond angle indicator */}
            <motion.path
                d={`M ${center - 25 * scale} ${center - 15 * scale} Q ${center} ${center - 35 * scale} ${center + 25 * scale} ${center - 15 * scale}`}
                fill="none"
                stroke={colors.textLight}
                strokeWidth={1}
                strokeDasharray="3 2"
                initial={animated ? { opacity: 0 } : undefined}
                animate={animated ? { opacity: 0.5 } : undefined}
                transition={{ delay: 1.2 }}
            />
            <text
                x={center}
                y={center - 45 * scale}
                textAnchor="middle"
                fill={colors.textLight}
                fontSize={10 * scale}
            >
                109.5°
            </text>
        </motion.svg>
    );
}

export default SO4TetrahedronDiagram;
