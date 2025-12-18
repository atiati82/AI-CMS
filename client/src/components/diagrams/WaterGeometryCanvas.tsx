import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GeometryMode = 'tetrahedral' | 'hexagonal' | 'vortex';

export function WaterGeometryCanvas() {
    const [activeGeo, setActiveGeo] = useState<GeometryMode>('tetrahedral');

    const geometries = [
        { id: 'tetrahedral', label: 'Tetrahedral Network' },
        { id: 'hexagonal', label: 'Hexagonal Lattice' },
        { id: 'vortex', label: 'Vortex Flow' }
    ];

    return (
        <div className="w-full flex flex-col md:flex-row gap-6 items-center bg-[#05060b] rounded-2xl border border-[rgba(255,215,0,0.1)] p-8 my-8">
            {/* Controls */}
            <div className="flex flex-col gap-3 w-full md:w-1/4">
                <h3 className="text-xl font-display text-white mb-4">Geometry Types</h3>
                {geometries.map((geo) => (
                    <button
                        key={geo.id}
                        onClick={() => setActiveGeo(geo.id as GeometryMode)}
                        className={`
              px-4 py-3 text-left rounded-lg transition-all duration-300 border
              ${activeGeo === geo.id
                                ? 'bg-[rgba(255,215,0,0.1)] border-[rgba(255,215,0,0.5)] text-[#f2c76c]'
                                : 'bg-transparent border-transparent text-white/50 hover:bg-white/5'}
            `}
                    >
                        {geo.label}
                    </button>
                ))}
            </div>

            {/* Visualization Canvas */}
            <div className="w-full md:w-3/4 aspect-video bg-[#0b1020] rounded-xl relative overflow-hidden border border-white/5 shadow-inner">
                <svg viewBox="0 0 600 400" className="w-full h-full">
                    <defs>
                        <filter id="geoGlow">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <linearGradient id="goldLinear" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f2c76c" />
                            <stop offset="100%" stopColor="#c0963b" />
                        </linearGradient>
                    </defs>

                    <AnimatePresence mode="wait">

                        {/* TETRAHEDRAL */}
                        {activeGeo === 'tetrahedral' && (
                            <motion.g
                                key="tetra"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.2 }}
                                transition={{ duration: 0.5 }}
                                transform="translate(300, 200)"
                            >
                                <text x="0" y="-150" textAnchor="middle" fill="#f2c76c" fontSize="18" fontWeight="bold">Tetrahedral (H₂O)</text>
                                {/* Central Oxygen */}
                                <circle r="20" fill="#1aa7ff" opacity="0.9" />

                                {/* 4 Hydrogens in Tetrahedral arrangement (Projected to 2D) */}
                                {[0, 1, 2, 3].map((i) => {
                                    const angle = (i * 360 / 3) + (i === 3 ? 0 : 30); // simplistic projection
                                    const dist = i === 3 ? 0 : 60; // one in center (back/front), 3 around
                                    return (
                                        <motion.g
                                            key={i}
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        >
                                            <motion.line
                                                x1="0" y1="0"
                                                x2={i === 3 ? 0 : Math.cos(angle * Math.PI / 180) * 60}
                                                y2={i === 3 ? -40 : Math.sin(angle * Math.PI / 180) * 60}
                                                stroke="rgba(255,255,255,0.3)" strokeWidth="2"
                                            />
                                            <circle
                                                cx={i === 3 ? 0 : Math.cos(angle * Math.PI / 180) * 60}
                                                cy={i === 3 ? -40 : Math.sin(angle * Math.PI / 180) * 60}
                                                r="8" fill="#fff"
                                            />
                                        </motion.g>
                                    )
                                })}

                                {/* Orbiting Electrons (conceptually) */}
                                <motion.ellipse
                                    rx="80" ry="30"
                                    fill="none" stroke="rgba(255,215,0,0.3)"
                                    animate={{ rotateX: [0, 360], rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.ellipse
                                    rx="30" ry="80"
                                    fill="none" stroke="rgba(255,215,0,0.3)"
                                    animate={{ rotateY: [0, 360], rotate: -360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                />
                            </motion.g>
                        )}

                        {/* HEXAGONAL */}
                        {activeGeo === 'hexagonal' && (
                            <motion.g
                                key="hex"
                                initial={{ opacity: 0, rotate: -20 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 20 }}
                                transition={{ duration: 0.5 }}
                                transform="translate(300, 200)"
                            >
                                <text x="0" y="-150" textAnchor="middle" fill="#38ffd1" fontSize="18" fontWeight="bold">Hexagonal Lattice (Ice/EZ)</text>

                                {/* Lattice Grid */}
                                <g>
                                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                                        <motion.g key={i} transform={`rotate(${angle}) translate(0, -60)`}>
                                            {/* Outer Hexagon ring */}
                                            <path d="M 0,-30 L 26,-15 L 26,15 L 0,30 L -26,15 L -26,-15 Z"
                                                fill="rgba(56, 255, 209, 0.1)" stroke="#38ffd1" strokeWidth="1" />
                                            <circle r="4" fill="#38ffd1" />
                                        </motion.g>
                                    ))}
                                    {/* Central Hexagon */}
                                    <path d="M 0,-30 L 26,-15 L 26,15 L 0,30 L -26,15 L -26,-15 Z"
                                        fill="rgba(56, 255, 209, 0.2)" stroke="#38ffd1" strokeWidth="2" filter="url(#geoGlow)" />
                                </g>

                                {/* Ghost layers implying 3D stacking */}
                                <g opacity="0.3" transform="scale(1.5) translate(0,0)">
                                    <path d="M 0,-30 L 26,-15 L 26,15 L 0,30 L -26,15 L -26,-15 Z"
                                        fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="4 4" />
                                </g>
                            </motion.g>
                        )}

                        {/* VORTEX */}
                        {activeGeo === 'vortex' && (
                            <motion.g
                                key="vortex"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.5 }}
                                transform="translate(300, 200)"
                            >
                                <text x="0" y="-150" textAnchor="middle" fill="#9b7bff" fontSize="18" fontWeight="bold">Vortex Flow</text>

                                {/* Spiral Path */}
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <motion.circle
                                        key={i}
                                        r={i * 8}
                                        fill="none"
                                        stroke={`rgba(155, 123, 255, ${1 - i / 20})`}
                                        strokeWidth={2}
                                        strokeDasharray={`${i * 5} ${i * 2}`}
                                        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                                        transition={{
                                            rotate: { duration: 10 - i * 0.3, repeat: Infinity, ease: "linear" },
                                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                        }}
                                        style={{ transformOrigin: "0 0" }} // center relative to group translate
                                    />
                                ))}

                                {/* Central Suction */}
                                <circle r="10" fill="white" filter="url(#geoGlow)">
                                    <animate attributeName="r" values="10;15;10" dur="2s" repeatCount="indefinite" />
                                </circle>
                            </motion.g>
                        )}

                    </AnimatePresence>
                </svg>
            </div>
        </div>
    );
}
