import React from "react";
import { motion } from "framer-motion";

interface LivingWaterVennProps {
    className?: string;
}

export function LivingWaterVenn({ className = "" }: LivingWaterVennProps) {
    const circles = [
        {
            id: "clean",
            label: "Clean",
            description: "Free from burden",
            color: "#22d3ee",
            cx: 140,
            cy: 120,
        },
        {
            id: "structured",
            label: "Structured",
            description: "Organised at interfaces",
            color: "#a78bfa",
            cx: 260,
            cy: 120,
        },
        {
            id: "charged",
            label: "Charged",
            description: "Carrying potential",
            color: "#34d399",
            cx: 200,
            cy: 220,
        },
    ];

    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 400 320" className="w-full h-full">
                <defs>
                    {/* Gradient definitions */}
                    <radialGradient id="clean-gradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
                    </radialGradient>
                    <radialGradient id="structured-gradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.1" />
                    </radialGradient>
                    <radialGradient id="charged-gradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#34d399" stopOpacity="0.1" />
                    </radialGradient>
                    <radialGradient id="center-gradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
                    </radialGradient>

                    {/* Glow filter */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Background circles with animation */}
                {circles.map((circle, index) => (
                    <motion.circle
                        key={circle.id}
                        cx={circle.cx}
                        cy={circle.cy}
                        r={90}
                        fill={`url(#${circle.id}-gradient)`}
                        stroke={circle.color}
                        strokeWidth="2"
                        strokeOpacity="0.5"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: index * 0.2,
                            ease: "easeOut",
                        }}
                        style={{ transformOrigin: `${circle.cx}px ${circle.cy}px` }}
                        filter="url(#glow)"
                    />
                ))}

                {/* Center highlight - the overlap zone */}
                <motion.circle
                    cx="200"
                    cy="150"
                    r="35"
                    fill="url(#center-gradient)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    style={{ transformOrigin: "200px 150px" }}
                />

                {/* Labels */}
                {circles.map((circle, index) => (
                    <motion.g
                        key={`label-${circle.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
                    >
                        <text
                            x={circle.cx}
                            y={circle.cy - 10}
                            textAnchor="middle"
                            className="fill-white font-semibold text-sm"
                            style={{ fontSize: "14px" }}
                        >
                            {circle.label}
                        </text>
                        <text
                            x={circle.cx}
                            y={circle.cy + 10}
                            textAnchor="middle"
                            className="fill-white/60 text-xs"
                            style={{ fontSize: "11px" }}
                        >
                            {circle.description}
                        </text>
                    </motion.g>
                ))}

                {/* Center label */}
                <motion.text
                    x="200"
                    y="155"
                    textAnchor="middle"
                    className="fill-white font-bold text-xs"
                    style={{ fontSize: "10px" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                >
                    LIVING
                </motion.text>

                {/* Icons */}
                {/* Filter icon for Clean */}
                <motion.path
                    d="M140 80 L130 95 L150 95 Z"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                />

                {/* Hexagon icon for Structured */}
                <motion.path
                    d="M260 70 L272 80 L272 96 L260 106 L248 96 L248 80 Z"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                />

                {/* Lightning icon for Charged */}
                <motion.path
                    d="M200 265 L208 275 L202 275 L205 290 L195 277 L201 277 Z"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                />
            </svg>
        </div>
    );
}

export default LivingWaterVenn;
