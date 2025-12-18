import React from "react";
import { motion } from "framer-motion";

/**
 * ScienceLibraryHeroIllustration
 * 
 * SVG illustration for the Science Library hero section:
 * - Central glowing "Science Core" sphere
 * - Orbiting mineral ion symbols (Mg, SO₄²⁻, Fe, Si)
 * - Flowing water patterns
 * - Crystalline geometric lines (hexagons, tetrahedrons)
 */
export function ScienceLibraryHeroIllustration() {
    // Orbital mineral data
    const minerals = [
        { symbol: "Mg²⁺", color: "#63b4ff", angle: 0, distance: 120 },
        { symbol: "SO₄²⁻", color: "#f6d56a", angle: 90, distance: 140 },
        { symbol: "Fe³⁺", color: "#ff6b6b", angle: 180, distance: 110 },
        { symbol: "SiO₄", color: "#38ffd1", angle: 270, distance: 130 },
    ];

    return (
        <div className="relative w-full aspect-square max-w-[500px] mx-auto">
            {/* Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-radial from-accent/20 via-accent/5 to-transparent blur-3xl" />
            </div>

            <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
                style={{ filter: "drop-shadow(0 0 20px rgba(99, 180, 255, 0.15))" }}
            >
                <defs>
                    {/* Core Gradient */}
                    <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#63b4ff" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#1aa7ff" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                    </radialGradient>

                    {/* Gold Line Gradient */}
                    <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f2c76c" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#f6d56a" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#f2c76c" stopOpacity="0.3" />
                    </linearGradient>

                    {/* Water Pattern Gradient */}
                    <linearGradient id="waterFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1aa7ff" stopOpacity="0" />
                        <stop offset="50%" stopColor="#38ffd1" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#1aa7ff" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Hexagonal Grid Background */}
                <g opacity="0.15">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <motion.polygon
                            key={`hex-${i}`}
                            points="200,140 230,160 230,200 200,220 170,200 170,160"
                            fill="none"
                            stroke="#63b4ff"
                            strokeWidth="0.5"
                            style={{
                                transform: `rotate(${i * 60}deg)`,
                                transformOrigin: "200px 200px",
                            }}
                            animate={{ opacity: [0.1, 0.4, 0.1] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: i * 0.3,
                            }}
                        />
                    ))}
                </g>

                {/* Tetrahedron Lines */}
                <g opacity="0.25">
                    <motion.line
                        x1="200" y1="120" x2="140" y2="240"
                        stroke="url(#goldLine)" strokeWidth="1"
                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    />
                    <motion.line
                        x1="200" y1="120" x2="260" y2="240"
                        stroke="url(#goldLine)" strokeWidth="1"
                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.line
                        x1="140" y1="240" x2="260" y2="240"
                        stroke="url(#goldLine)" strokeWidth="1"
                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    />
                </g>

                {/* Water Flow Curves */}
                <g>
                    {[0, 1, 2].map((i) => (
                        <motion.path
                            key={`flow-${i}`}
                            d={`M ${80 + i * 40} 200 Q 200 ${160 - i * 20} ${320 - i * 40} 200`}
                            fill="none"
                            stroke="url(#waterFlow)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: [0, 1, 1, 0],
                                opacity: [0, 0.6, 0.6, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                delay: i * 1.5,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </g>

                {/* Orbital Rings */}
                {[100, 130, 160].map((r, i) => (
                    <motion.circle
                        key={`ring-${i}`}
                        cx="200" cy="200" r={r}
                        fill="none"
                        stroke="#63b4ff"
                        strokeWidth="0.5"
                        strokeDasharray="4 8"
                        opacity="0.2"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 30 + i * 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{ transformOrigin: "200px 200px" }}
                    />
                ))}

                {/* Central Core */}
                <motion.circle
                    cx="200" cy="200" r="50"
                    fill="url(#coreGradient)"
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "200px 200px" }}
                />

                {/* Core Inner Glow */}
                <motion.circle
                    cx="200" cy="200" r="25"
                    fill="#63b4ff"
                    opacity="0.6"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "200px 200px" }}
                />

                {/* Core Label */}
                <text
                    x="200" y="205"
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                    letterSpacing="0.1em"
                    opacity="0.9"
                >
                    CORE
                </text>
            </svg>

            {/* Orbiting Minerals (HTML for better text rendering) */}
            <div className="absolute inset-0">
                {minerals.map((mineral, i) => (
                    <motion.div
                        key={mineral.symbol}
                        className="absolute left-1/2 top-1/2"
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 20 + i * 5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            transformOrigin: "0 0",
                        }}
                    >
                        <motion.div
                            className="absolute flex items-center justify-center px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm border"
                            style={{
                                left: mineral.distance,
                                top: -10,
                                backgroundColor: `${mineral.color}20`,
                                borderColor: `${mineral.color}40`,
                                color: mineral.color,
                            }}
                            animate={{
                                rotate: -360,
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                rotate: {
                                    duration: 20 + i * 5,
                                    repeat: Infinity,
                                    ease: "linear",
                                },
                                scale: {
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.5,
                                },
                            }}
                        >
                            {mineral.symbol}
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default ScienceLibraryHeroIllustration;
