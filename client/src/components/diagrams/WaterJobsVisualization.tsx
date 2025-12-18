import React from "react";
import { motion } from "framer-motion";

export function WaterJobsVisualization() {
    return (
        <div className="w-full overflow-hidden bg-[#070a12] rounded-2xl border border-[rgba(255,255,255,0.05)] shadow-2xl">
            <svg viewBox="0 0 800 500" className="w-full h-auto">
                <defs>
                    <radialGradient id="solventGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#1aa7ff" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#1aa7ff" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="scaffoldGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#38ffd1" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#38ffd1" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="batteryGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#2cff9a" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#2cff9a" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="infoGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#9b7bff" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#9b7bff" stopOpacity="0" />
                    </radialGradient>

                    <filter id="jobGlow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* --- 1. SOLVENT (Top Left) --- */}
                <g transform="translate(0, 0)">
                    <rect width="400" height="250" fill="transparent" />
                    {/* Subtle background highlight */}
                    <circle cx="200" cy="125" r="80" fill="url(#solventGrad)" opacity="0.5" />

                    <text x="200" y="40" textAnchor="middle" fill="#1aa7ff" fontSize="16" fontWeight="bold" style={{ fontFamily: "var(--font-display)" }}>
                        1. Solvent & Carrier
                    </text>

                    {/* Flowing stream path */}
                    <path d="M 50,125 Q 125,75 200,125 T 350,125" fill="none" stroke="rgba(26,167,255,0.2)" strokeWidth="40" />

                    {/* Particles flowing */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <motion.circle
                            key={`solv-${i}`}
                            r={4}
                            fill="#fff"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                offsetDistance: ["0%", "100%"],
                                opacity: [0, 1, 1, 0]
                            }}
                            // Utilizing SVG path animation via Framer Motion's style or a custom wrapper would be ideal, 
                            // but for simple SVG, we simulate flow with x/y interpolation along a curve approximation
                            // Simplified: Linear movement with wave function on Y
                            cx={50} cy={125}
                        >
                            <animate
                                attributeName="cx"
                                from="50" to="350"
                                dur={`${3 + i * 0.5}s`}
                                repeatCount="indefinite"
                                begin={`${i * 0.4}s`}
                            />
                            <animate
                                attributeName="cy"
                                values="125;100;125;150;125"
                                keyTimes="0;0.25;0.5;0.75;1"
                                dur={`${3 + i * 0.5}s`}
                                repeatCount="indefinite"
                                begin={`${i * 0.4}s`}
                            />
                            <animate attributeName="opacity" values="0;1;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
                        </motion.circle>
                    ))}
                    {/* Solute particles */}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <circle key={`solute-${i}`} r={6} fill="#1aa7ff" opacity="0.8">
                            <animate
                                attributeName="cx"
                                from="50" to="350"
                                dur={`${4 + i * 0.6}s`}
                                repeatCount="indefinite"
                                begin={`${i * 0.5}s`}
                            />
                            <animate
                                attributeName="cy"
                                values="125;140;125;110;125"
                                dur={`${4 + i * 0.6}s`}
                                repeatCount="indefinite"
                                begin={`${i * 0.5}s`}
                            />
                        </circle>
                    ))}
                </g>

                {/* --- 2. SCAFFOLDING (Top Right) --- */}
                <g transform="translate(400, 0)">
                    <rect width="400" height="250" fill="transparent" />
                    <circle cx="200" cy="125" r="80" fill="url(#scaffoldGrad)" opacity="0.5" />

                    <text x="200" y="40" textAnchor="middle" fill="#38ffd1" fontSize="16" fontWeight="bold" style={{ fontFamily: "var(--font-display)" }}>
                        2. Scaffolding & Shape
                    </text>

                    {/* Protein Structure */}
                    <motion.path
                        d="M 150,150 Q 175,100 200,150 T 250,150"
                        fill="none"
                        stroke="#38ffd1"
                        strokeWidth="5"
                        strokeLinecap="round"
                        animate={{
                            d: [
                                "M 150,150 Q 175,100 200,150 T 250,150",
                                "M 150,140 Q 175,90 200,140 T 250,140",
                                "M 150,150 Q 175,100 200,150 T 250,150"
                            ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Water Layers supporting it */}
                    {Array.from({ length: 12 }).map((_, i) => (
                        <motion.circle
                            key={`scaf-${i}`}
                            r={3}
                            fill="#fff"
                            opacity="0.6"
                            cx={140 + i * 10}
                            cy={165 - Math.sin(i * 0.5) * 10}
                            animate={{ cy: [165 - Math.sin(i * 0.5) * 10, 160 - Math.sin(i * 0.5) * 10, 165 - Math.sin(i * 0.5) * 10] }}
                            transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                        />
                    ))}
                    {Array.from({ length: 12 }).map((_, i) => (
                        <motion.circle
                            key={`scaf-top-${i}`}
                            r={3}
                            fill="#fff"
                            opacity="0.6"
                            cx={140 + i * 10}
                            cy={125 - Math.sin(i * 0.5) * 10}
                            animate={{ cy: [125 - Math.sin(i * 0.5) * 10, 120 - Math.sin(i * 0.5) * 10, 125 - Math.sin(i * 0.5) * 10] }}
                            transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                        />
                    ))}

                    <text x="200" y="200" textAnchor="middle" fill="#38ffd1" fontSize="10" opacity="0.7">
                        Structuring layers support form
                    </text>
                </g>

                {/* --- 3. BATTERY (Bottom Left) --- */}
                <g transform="translate(0, 250)">
                    <rect width="400" height="250" fill="transparent" />
                    <circle cx="200" cy="125" r="80" fill="url(#batteryGrad)" opacity="0.5" />

                    <text x="200" y="40" textAnchor="middle" fill="#2cff9a" fontSize="16" fontWeight="bold" style={{ fontFamily: "var(--font-display)" }}>
                        3. Charge & Battery
                    </text>

                    {/* Surface */}
                    <rect x="100" y="100" width="200" height="10" fill="rgba(255,255,255,0.1)" rx="5" />

                    {/* Charges */}
                    {/* Positives */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <text key={`pos-${i}`} x={120 + i * 22} y={90} fill="#2cff9a" fontSize="14" fontWeight="bold">+</text>
                    ))}
                    {/* Negatives (EZ layer) */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <text key={`neg-${i}`} x={120 + i * 22} y={130} fill="#ff5fd7" fontSize="18" fontWeight="bold">-</text>
                    ))}
                    {/* Flow indicator */}
                    <path d="M 320,110 L 360,110" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
                    <polygon points="360,105 370,110 360,115" fill="#fff" />
                    <text x="345" y="130" textAnchor="middle" fill="#fff" fontSize="10">Voltage</text>

                    {/* Lightning bolt */}
                    <motion.path
                        d="M 200,80 L 190,100 L 210,100 L 200,120"
                        stroke="#2cff9a"
                        strokeWidth="2"
                        fill="none"
                        opacity="0"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                </g>

                {/* --- 4. INFORMATION (Bottom Right) --- */}
                <g transform="translate(400, 250)">
                    <rect width="400" height="250" fill="transparent" />
                    <circle cx="200" cy="125" r="80" fill="url(#infoGrad)" opacity="0.5" />

                    <text x="200" y="40" textAnchor="middle" fill="#9b7bff" fontSize="16" fontWeight="bold" style={{ fontFamily: "var(--font-display)" }}>
                        4. Information Medium
                    </text>

                    {/* Source Pulse */}
                    <circle cx="200" cy="125" r="5" fill="#fff" />

                    {/* Ripples */}
                    {Array.from({ length: 4 }).map((_, i) => (
                        <motion.circle
                            key={`rip-${i}`}
                            cx="200"
                            cy="125"
                            r="10"
                            fill="none"
                            stroke="#9b7bff"
                            strokeWidth="2"
                            animate={{ r: [10, 80], opacity: [0.8, 0] }}
                            transition={{ duration: 3, delay: i * 0.7, repeat: Infinity, ease: "linear" }}
                        />
                    ))}

                    {/* Wave interference pattern overlaid essentially */}
                    <motion.path
                        d="M 120,125 Q 160,85 200,125 T 280,125"
                        fill="none"
                        stroke="rgba(155, 123, 255, 0.5)"
                        strokeWidth="1"
                        animate={{
                            d: [
                                "M 120,125 Q 160,85 200,125 T 280,125",
                                "M 120,125 Q 160,165 200,125 T 280,125",
                                "M 120,125 Q 160,85 200,125 T 280,125"
                            ]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <text x="200" y="220" textAnchor="middle" fill="#9b7bff" fontSize="10" opacity="0.7">
                        Frequency & Pattern Memory
                    </text>
                </g>

                {/* Grid lines */}
                <line x1="400" y1="20" x2="400" y2="480" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
                <line x1="20" y1="250" x2="780" y2="250" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />

            </svg>
        </div>
    );
}
