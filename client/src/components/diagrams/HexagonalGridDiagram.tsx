import React from 'react';
import { motion } from 'framer-motion';

interface HexagonalGridDiagramProps {
    mode?: 'chaos' | 'structure' | 'transition';
    className?: string;
}

export const HexagonalGridDiagram: React.FC<HexagonalGridDiagramProps> = ({
    mode = 'structure',
    className = ''
}) => {
    // Hexagon geometry
    const hexRadius = 30;
    const hexHeight = Math.sqrt(3) * hexRadius;
    const hexWidth = 2 * hexRadius;
    const xOffset = hexWidth * 0.75;
    const yOffset = hexHeight;

    // Grid dimensions
    const rows = 5;
    const cols = 7;

    // Generate grid points
    const generateGrid = () => {
        const points = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * xOffset;
                const y = row * yOffset + (col % 2 === 1 ? yOffset / 2 : 0);

                let opacity = 1;
                let scale = 1;
                let rotate = 0;
                let xDrift = 0;
                let yDrift = 0;

                if (mode === 'chaos') {
                    // Chaos: Random positions, rotations, opacities
                    xDrift = (Math.random() - 0.5) * 40;
                    yDrift = (Math.random() - 0.5) * 40;
                    rotate = Math.random() * 360;
                    scale = 0.5 + Math.random() * 0.8;
                    opacity = 0.3 + Math.random() * 0.7;
                } else if (mode === 'transition') {
                    // Transition: Ordered on left, chaotic on right
                    const progress = col / (cols - 1); // 0 to 1
                    if (progress > 0.4) {
                        const chaosFactor = (progress - 0.4) * 1.5;
                        xDrift = (Math.random() - 0.5) * 30 * chaosFactor;
                        yDrift = (Math.random() - 0.5) * 30 * chaosFactor;
                        rotate = Math.random() * 180 * chaosFactor;
                    }
                }

                points.push({ id: `${row}-${col}`, x: x + xDrift, y: y + yDrift, r: row, c: col, opacity, scale, rotate });
            }
        }
        return points;
    };

    const gridPoints = generateGrid();

    return (
        <div className={`w-full bg-slate-50 rounded-lg border p-6 flex items-center justify-center ${className}`}>
            <svg width="100%" height="300" viewBox="0 0 500 300" className="overflow-visible">
                <defs>
                    <filter id="glow-hex" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Connection Lines (only in structure mode) */}
                {mode === 'structure' && (
                    <g stroke="#e2e8f0" strokeWidth="2">
                        {/* Draw simplified connections */}
                        {gridPoints.map((p, i) => (
                            <path key={`conn-${i}`} d={`M${p.x} ${p.y} l20 0`} strokeOpacity="0.5" />
                        ))}
                    </g>
                )}

                {/* Molecules */}
                {gridPoints.map((point, i) => (
                    <motion.g
                        key={point.id}
                        initial={false}
                        animate={{
                            x: point.x,
                            y: point.y,
                            scale: point.scale,
                            rotate: point.rotate,
                            opacity: point.opacity
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            delay: i * 0.02
                        }}
                    >
                        {/* H3O2 Hexagon Ring Representation */}
                        <polygon
                            points="-15,-26 15,-26 30,0 15,26 -15,26 -30,0"
                            fill={mode === 'chaos' ? '#94a3b8' : '#3b82f6'}
                            fillOpacity={mode === 'chaos' ? 0.2 : 0.1}
                            stroke={mode === 'chaos' ? '#64748b' : '#2563eb'}
                            strokeWidth="1.5"
                        />

                        {/* Central Oxygen */}
                        <circle r="4" fill={mode === 'chaos' ? '#64748b' : '#1d4ed8'} />

                        {/* Hydrogen Bonds */}
                        {mode !== 'chaos' && (
                            <>
                                <circle cx="12" cy="-20" r="2" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1" />
                                <circle cx="12" cy="20" r="2" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1" />
                                <circle cx="-24" cy="0" r="2" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1" />
                            </>
                        )}
                    </motion.g>
                ))}

                {/* Labels & Anontations */}
                <g transform="translate(10, 280)">
                    <text className="text-xs fill-slate-500 font-mono">
                        MAG: {mode === 'chaos' ? '0.00 G' : mode === 'structure' ? '1200+ G' : 'INT'}
                    </text>
                </g>

                {mode === 'structure' && (
                    <motion.path
                        d="M50 150 L450 150"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.3 }}
                        transition={{ duration: 1.5, delay: 1 }}
                    />
                )}
            </svg>
        </div>
    );
};
