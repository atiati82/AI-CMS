import React from 'react';
import { motion } from 'framer-motion';

/**
 * TriangleMapSVG - Andara Triangle: Water-Minerals-Fields
 * Visual navigation component showing the three pillars of the integrated field map
 */
export function TriangleMapSVG({
    className = '',
    size = 400,
    interactive = true,
    onPillarClick
}: {
    className?: string;
    size?: number;
    interactive?: boolean;
    onPillarClick?: (pillar: 'water' | 'minerals' | 'fields') => void;
}) {
    // Andara brand colors
    const colors = {
        water: '#0EA5E9',      // Sky Blue
        minerals: '#D4AF37',   // Gold
        fields: '#22C55E',     // Nature Green
        center: '#4F46E5',     // Indigo
        text: '#1E293B',
        textLight: '#64748B',
        line: '#CBD5E1',
        glow: 'rgba(79, 70, 229, 0.3)'
    };

    const center = size / 2;
    const radius = size * 0.35;

    // Triangle vertices (equilateral, pointing up)
    const vertices = {
        water: {
            x: center,
            y: center - radius,
            label: 'Water Structure',
            sublabel: 'Interfaces'
        },
        minerals: {
            x: center - radius * Math.sin(Math.PI / 3),
            y: center + radius * Math.cos(Math.PI / 3),
            label: 'Mineral Geometry',
            sublabel: 'Ions & Lattices'
        },
        fields: {
            x: center + radius * Math.sin(Math.PI / 3),
            y: center + radius * Math.cos(Math.PI / 3),
            label: 'Fields & Flow',
            sublabel: 'Pattern Inputs'
        }
    };

    const handleClick = (pillar: 'water' | 'minerals' | 'fields') => {
        if (interactive && onPillarClick) {
            onPillarClick(pillar);
        }
    };

    return (
        <motion.svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={`triangle-map-svg ${className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <defs>
                {/* Gradient for center glow */}
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={colors.center} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={colors.center} stopOpacity="0" />
                </radialGradient>

                {/* Pillar gradients */}
                <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colors.water} />
                    <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
                <linearGradient id="mineralsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colors.minerals} />
                    <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <linearGradient id="fieldsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colors.fields} />
                    <stop offset="100%" stopColor="#16A34A" />
                </linearGradient>

                {/* Glow filters */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Background glow */}
            <circle cx={center} cy={center} r={radius * 0.6} fill="url(#centerGlow)" />

            {/* Triangle edges */}
            <motion.polygon
                points={`${vertices.water.x},${vertices.water.y} ${vertices.minerals.x},${vertices.minerals.y} ${vertices.fields.x},${vertices.fields.y}`}
                fill="none"
                stroke={colors.line}
                strokeWidth="2"
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
            />

            {/* Connecting lines to center */}
            {(['water', 'minerals', 'fields'] as const).map((pillar, i) => (
                <motion.line
                    key={pillar}
                    x1={center}
                    y1={center}
                    x2={vertices[pillar].x}
                    y2={vertices[pillar].y}
                    stroke={colors.line}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                />
            ))}

            {/* Center node */}
            <motion.circle
                cx={center}
                cy={center}
                r={size * 0.08}
                fill={colors.center}
                filter="url(#glow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
            />
            <text
                x={center}
                y={center + 4}
                textAnchor="middle"
                fill="white"
                fontSize={size * 0.025}
                fontWeight="600"
            >
                MAP
            </text>

            {/* Pillar nodes */}
            {(['water', 'minerals', 'fields'] as const).map((pillar, i) => {
                const v = vertices[pillar];
                const gradient = `url(#${pillar}Gradient)`;
                const nodeRadius = size * 0.1;

                return (
                    <motion.g
                        key={pillar}
                        onClick={() => handleClick(pillar)}
                        style={{ cursor: interactive ? 'pointer' : 'default' }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.15, type: 'spring' }}
                        whileHover={interactive ? { scale: 1.1 } : undefined}
                    >
                        {/* Node circle */}
                        <circle
                            cx={v.x}
                            cy={v.y}
                            r={nodeRadius}
                            fill={gradient}
                            filter="url(#glow)"
                        />

                        {/* Icon inside node */}
                        <text
                            x={v.x}
                            y={v.y + 6}
                            textAnchor="middle"
                            fill="white"
                            fontSize={size * 0.05}
                        >
                            {pillar === 'water' ? '💧' : pillar === 'minerals' ? '◇' : '⚡'}
                        </text>

                        {/* Label */}
                        <text
                            x={v.x}
                            y={pillar === 'water' ? v.y - nodeRadius - 12 : v.y + nodeRadius + 20}
                            textAnchor="middle"
                            fill={colors.text}
                            fontSize={size * 0.032}
                            fontWeight="600"
                        >
                            {v.label}
                        </text>
                        <text
                            x={v.x}
                            y={pillar === 'water' ? v.y - nodeRadius - 0 : v.y + nodeRadius + 34}
                            textAnchor="middle"
                            fill={colors.textLight}
                            fontSize={size * 0.025}
                        >
                            {v.sublabel}
                        </text>
                    </motion.g>
                );
            })}
        </motion.svg>
    );
}

export default TriangleMapSVG;
