import React from "react";
import { motion } from "framer-motion";
import { Droplets, Mountain, Waves, Package } from "lucide-react";

interface WaterSourcesMapProps {
    className?: string;
}

const sources = [
    {
        id: "tap",
        label: "Municipal / Tap",
        icon: Droplets,
        color: "#60a5fa",
        description: "Treated for safety, benefits from filtration",
        x: 60,
        y: 80,
    },
    {
        id: "well",
        label: "Well / Bore",
        icon: Mountain,
        color: "#a78bfa",
        description: "Mineral-rich, requires testing",
        x: 340,
        y: 80,
    },
    {
        id: "spring",
        label: "Spring / Gravity",
        icon: Waves,
        color: "#34d399",
        description: "Naturally geo-structured",
        x: 60,
        y: 220,
    },
    {
        id: "bottled",
        label: "Bottled / Processed",
        icon: Package,
        color: "#f59e0b",
        description: "Variable quality, check source",
        x: 340,
        y: 220,
    },
];

export function WaterSourcesMap({ className = "" }: WaterSourcesMapProps) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 400 300" className="w-full h-full">
                <defs>
                    <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                    </radialGradient>
                    <filter id="source-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Connection lines to center */}
                {sources.map((source, index) => (
                    <motion.line
                        key={`line-${source.id}`}
                        x1={source.x}
                        y1={source.y}
                        x2={200}
                        y2={150}
                        stroke={source.color}
                        strokeWidth="2"
                        strokeOpacity="0.3"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.15 }}
                    />
                ))}

                {/* Center node - Terrain Water */}
                <motion.circle
                    cx={200}
                    cy={150}
                    r={45}
                    fill="url(#center-glow)"
                    stroke="#818cf8"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                    style={{ transformOrigin: "200px 150px" }}
                    filter="url(#source-glow)"
                />
                <motion.text
                    x={200}
                    y={145}
                    textAnchor="middle"
                    className="fill-white font-semibold"
                    style={{ fontSize: "11px" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    TERRAIN
                </motion.text>
                <motion.text
                    x={200}
                    y={160}
                    textAnchor="middle"
                    className="fill-white font-semibold"
                    style={{ fontSize: "11px" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    WATER
                </motion.text>

                {/* Source nodes */}
                {sources.map((source, index) => {
                    const IconComponent = source.icon;
                    return (
                        <motion.g
                            key={source.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                            style={{ transformOrigin: `${source.x}px ${source.y}px` }}
                        >
                            {/* Background circle */}
                            <circle
                                cx={source.x}
                                cy={source.y}
                                r={35}
                                fill="rgba(255,255,255,0.05)"
                                stroke={source.color}
                                strokeWidth="1.5"
                                strokeOpacity="0.5"
                            />

                            {/* Label */}
                            <text
                                x={source.x}
                                y={source.y + 5}
                                textAnchor="middle"
                                className="fill-white/80"
                                style={{ fontSize: "9px" }}
                            >
                                {source.label}
                            </text>
                        </motion.g>
                    );
                })}
            </svg>

            {/* Caption */}
            <p className="text-center text-sm text-white/60 mt-4">
                Different sources, one goal: <span className="text-indigo-400">conscious curation</span> of terrain water
            </p>
        </div>
    );
}

export default WaterSourcesMap;
