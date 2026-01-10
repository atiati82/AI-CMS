import React from "react";
import { motion } from "framer-motion";

export function WaterMolecularDiagram() {
    // Animation variants
    const molecularVariants: any = {
        animate: (i: number) => ({
            x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
            y: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
            rotate: [0, Math.random() * 360, Math.random() * 360, 0],
            transition: {
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
            },
        }),
    };

    const structuredVariants: any = {
        animate: (i: number) => ({
            opacity: [0.4, 0.8, 0.4],
            scale: [0.95, 1.05, 0.95],
            transition: {
                duration: 4,
                delay: i * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
            },
        }),
    };

    const fieldVariants = {
        animate: {
            pathLength: [0, 1],
            opacity: [0.2, 0.6, 0.2],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "linear",
            },
        },
    };

    return (
        <div className="w-full overflow-hidden bg-linear-to-br from-[#020617] to-[#0f172a] rounded-2xl border border-[rgba(26,167,255,0.2)] p-6 shadow-[0_0_30px_rgba(26,167,255,0.1)]">
            <svg
                viewBox="0 0 800 300"
                className="w-full h-auto"
                style={{ overflow: "visible" }}
            >
                {/* Gradients */}
                <defs>
                    <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1aa7ff" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#38ffd1" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* 1. MOLECULAR LAYER (Left) */}
                <g transform="translate(100, 150)">
                    <text
                        x="0"
                        y="-100"
                        textAnchor="middle"
                        fill="var(--text-1)"
                        fontSize="14"
                        fontWeight="600"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Molecular Water
                    </text>
                    <text
                        x="0"
                        y="-80"
                        textAnchor="middle"
                        fill="var(--text-3)"
                        fontSize="11"
                        style={{ fontFamily: "var(--font-base)" }}
                    >
                        Random Motion (H₂O)
                    </text>

                    {/* Background circle */}
                    <circle
                        r="80"
                        fill="rgba(26, 167, 255, 0.05)"
                        stroke="rgba(26, 167, 255, 0.2)"
                        strokeDasharray="4 4"
                    />

                    {/* Random H2O Molecules */}
                    {Array.from({ length: 12 }).map((_, i) => (
                        <motion.g
                            key={`mol-${i}`}
                            custom={i}
                            variants={molecularVariants}
                            animate="animate"
                            // Distribute randomly in circle
                            initial={{
                                x: (Math.random() - 0.5) * 100,
                                y: (Math.random() - 0.5) * 100,
                            }}
                        >
                            {/* Oxygen */}
                            <circle r="6" fill="#1aa7ff" opacity="0.8" />
                            {/* Hydrogens */}
                            <circle cx="-5" cy="5" r="3" fill="#38ffd1" opacity="0.8" />
                            <circle cx="5" cy="5" r="3" fill="#38ffd1" opacity="0.8" />
                        </motion.g>
                    ))}
                </g>

                {/* Arrow 1 */}
                <motion.path
                    d="M 200 150 L 300 150"
                    stroke="url(#cyanGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
                />
                <polygon points="295,145 305,150 295,155" fill="#38ffd1" opacity="0.5" />

                {/* 2. STRUCTURED LAYER (Center) */}
                <g transform="translate(400, 150)">
                    <text
                        x="0"
                        y="-100"
                        textAnchor="middle"
                        fill="var(--text-1)"
                        fontSize="14"
                        fontWeight="600"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Structured Water
                    </text>
                    <text
                        x="0"
                        y="-80"
                        textAnchor="middle"
                        fill="var(--text-3)"
                        fontSize="11"
                        style={{ fontFamily: "var(--font-base)" }}
                    >
                        Hexagonal Clusters
                    </text>

                    {/* Hexagonal Lattice */}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <motion.g
                            key={`hex-${i}`}
                            custom={i}
                            variants={structuredVariants}
                            animate="animate"
                            transform={`rotate(${i * 60}) translate(0, -35)`}
                        >
                            {/* Hexagon shape */}
                            <path
                                d="M 0,-20 L 17,-10 L 17,10 L 0,20 L -17,10 L -17,-10 Z"
                                fill="rgba(56, 255, 209, 0.05)"
                                stroke="rgba(56, 255, 209, 0.6)"
                                strokeWidth="1.5"
                                filter="url(#glow)"
                            />
                            {/* Molecule inside */}
                            <circle r="3" fill="#38ffd1" opacity="0.9" />
                        </motion.g>
                    ))}
                    {/* Center Hexagon */}
                    <motion.path
                        d="M 0,-20 L 17,-10 L 17,10 L 0,20 L -17,10 L -17,-10 Z"
                        fill="rgba(56, 255, 209, 0.1)"
                        stroke="rgba(56, 255, 209, 0.8)"
                        strokeWidth="2"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        filter="url(#glow)"
                    />
                </g>

                {/* Arrow 2 */}
                <motion.path
                    d="M 500 150 L 600 150"
                    stroke="url(#cyanGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1.5, delay: 0.75, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
                />
                <polygon points="595,145 605,150 595,155" fill="#38ffd1" opacity="0.5" />


                {/* 3. FIELD-ACTIVE LAYER (Right) */}
                <g transform="translate(700, 150)">
                    <text
                        x="0"
                        y="-100"
                        textAnchor="middle"
                        fill="var(--text-1)"
                        fontSize="14"
                        fontWeight="600"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Field-Active
                    </text>
                    <text
                        x="0"
                        y="-80"
                        textAnchor="middle"
                        fill="var(--text-3)"
                        fontSize="11"
                        style={{ fontFamily: "var(--font-base)" }}
                    >
                        Coherent Liquid Crystal
                    </text>

                    {/* Radiating Fields */}
                    {Array.from({ length: 4 }).map((_, i) => (
                        <motion.circle
                            key={`field-${i}`}
                            r={20 + i * 15}
                            fill="none"
                            stroke="url(#cyanGradient)"
                            strokeWidth="1"
                            opacity={0.3 - i * 0.05}
                            animate={{
                                r: [20 + i * 15, 25 + i * 15, 20 + i * 15],
                                opacity: [0.3 - i * 0.05, 0.6 - i * 0.05, 0.3 - i * 0.05]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                        />
                    ))}

                    {/* Central Coherent Core */}
                    <circle r="8" fill="#fff" filter="url(#glow)" opacity="0.8">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                    </circle>

                    {/* Field lines */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <motion.line
                            key={`line-${i}`}
                            x1="0" y1="0" x2="0" y2="-70"
                            stroke="rgba(56, 255, 209, 0.4)"
                            strokeWidth="1"
                            transform={`rotate(${i * 45})`}
                            strokeDasharray="4 4"
                            animate={{ strokeDashoffset: [0, -8] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
}
