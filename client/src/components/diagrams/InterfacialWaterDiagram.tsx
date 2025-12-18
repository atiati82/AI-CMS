import React from "react";
import { motion } from "framer-motion";

export function InterfacialWaterDiagram() {
    return (
        <div className="w-full overflow-hidden bg-[#070a12] rounded-2xl border border-[rgba(56,255,209,0.2)] shadow-2xl relative">
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-xs text-white/70">
                Hydrophilic Interface Visualization
            </div>

            <svg viewBox="0 0 800 400" className="w-full h-auto">
                <defs>
                    <linearGradient id="ezGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38ffd1" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#38ffd1" stopOpacity="0" />
                    </linearGradient>
                    <pattern id="hexPattern" x="0" y="0" width="20" height="34.6" patternUnits="userSpaceOnUse">
                        <path d="M 0,-10 L 10,-5 L 10,5 L 0,10 L -10,5 L -10,-5 Z" fill="none" stroke="rgba(56,255,209,0.2)" strokeWidth="1" transform="translate(10, 17.3)" />
                    </pattern>
                </defs>

                {/* 1. SURFACE (Left) */}
                <g>
                    {/* Material block */}
                    <rect x="0" y="0" width="50" height="400" fill="#2c3e50" />
                    {/* Hydrophilic Surface Layer */}
                    <rect x="50" y="0" width="10" height="400" fill="#38ffd1" opacity="0.8" />
                    {/* Surface Charges (+/- depending on material, let's assume charge inducing) */}
                    <line x1="60" y1="0" x2="60" y2="400" stroke="#fff" strokeWidth="2" strokeDasharray="4 2" />

                    <text transform="rotate(-90 25 200)" x="25" y="200" textAnchor="middle" fill="#fff" opacity="0.5" fontSize="14" letterSpacing="2">
                        SURFACE
                    </text>
                </g>

                {/* 2. EZ LAYER (Middle Left) */}
                <g transform="translate(60, 0)">
                    {/* Background Highlight */}
                    <motion.rect
                        width="200" height="400"
                        fill="url(#ezGradient)"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: [0.4, 0.6, 0.4] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Hexagonal Structure indicating Order */}
                    <rect width="200" height="400" fill="url(#hexPattern)" opacity="0.6" />

                    {/* EZ Label */}
                    <text x="100" y="30" textAnchor="middle" fill="#38ffd1" fontSize="16" fontWeight="bold">Exclusion Zone (EZ)</text>
                    <text x="100" y="50" textAnchor="middle" fill="#38ffd1" fontSize="12" opacity="0.8">Structured Liquid Crystal</text>
                    <text x="100" y="380" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="bold">- - - - -</text>

                    {/* Floating particles being excluded */}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <motion.circle
                            key={`excluded-${i}`}
                            r={4}
                            fill="#ff5f5f"
                            cx={180}
                            cy={50 + i * 70}
                            animate={{ cx: [180, 280] }} // Pushed out to bulk
                            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
                            opacity={0.7}
                        />
                    ))}
                </g>

                {/* separator line */}
                <line x1="260" y1="0" x2="260" y2="400" stroke="#38ffd1" strokeWidth="1" strokeDasharray="5 5" opacity="0.5" />

                {/* 3. BULK WATER (Right) */}
                <g transform="translate(260, 0)">
                    {/* Bulk Label */}
                    <text x="270" y="30" textAnchor="middle" fill="#1aa7ff" fontSize="16" fontWeight="bold">Bulk Water</text>
                    <text x="270" y="50" textAnchor="middle" fill="#1aa7ff" fontSize="12" opacity="0.8">Random H₂O + Protons</text>
                    <text x="100" y="380" textAnchor="middle" fill="#ff5fd7" fontSize="24" fontWeight="bold">+ + + + +</text>

                    {/* Chaotic Molecules */}
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.g
                            key={`bulk-${i}`}
                            initial={{ x: Math.random() * 500, y: Math.random() * 400 }}
                            animate={{
                                x: [null, Math.random() * 500, Math.random() * 500],
                                y: [null, Math.random() * 400, Math.random() * 400],
                                rotate: 360
                            }}
                            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                        >
                            <circle r="3" fill="#1aa7ff" opacity="0.4" />
                            {/* H3O+ Protons accumulation near EZ boundary */}
                            {i < 8 && (
                                <g>
                                    <circle r="6" fill="#ff5fd7" opacity="0.3" />
                                    <text x="0" y="3" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="bold">+</text>
                                </g>
                            )}
                        </motion.g>
                    ))}
                </g>

                {/* 4. BATTERY METAPHOR */}
                <g transform="translate(0, 320)">
                    {/* Voltage arrow */}
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#fff" />
                        </marker>
                    </defs>
                    <motion.path
                        d="M 160,20 L 360,20"
                        stroke="#fff"
                        strokeWidth="2"
                        markerStart="url(#arrow)"
                        markerEnd="url(#arrow)"
                        opacity="0.5"
                    />
                    <text x="260" y="15" textAnchor="middle" fill="#fff" fontSize="12">Potential Difference (Voltage)</text>
                </g>

            </svg>
        </div>
    );
}
