import React from "react";
import { motion } from "framer-motion";

export function BioStructureLoader() {
    return (
        <div className="relative w-full h-[600px] flex items-center justify-center bg-slate-950 border border-white/5 rounded-2xl mb-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent" />

            {/* Core Seed */}
            <motion.div
                className="w-4 h-4 rounded-full bg-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.6)] z-10"
                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Inner Ring (Hexagon) */}
            <motion.div
                className="absolute"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-60">
                    <motion.path
                        d="M100 20 L170 60 L170 140 L100 180 L30 140 L30 60 Z"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="1"
                    />
                </svg>
            </motion.div>

            {/* Middle Ring (Rhombic Crystal Structure) */}
            <motion.div
                className="absolute"
                animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <svg width="300" height="300" viewBox="0 0 300 300" className="opacity-40">
                    <path
                        d="M150 50 L250 150 L150 250 L50 150 Z"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="1"
                    />
                </svg>
            </motion.div>

            {/* Outer Ring (Complex) */}
            <motion.div
                className="absolute"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
                <svg width="600" height="600" viewBox="0 0 600 600" className="opacity-20">
                    <circle cx="300" cy="300" r="250" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                    <circle cx="300" cy="300" r="200" fill="none" stroke="white" strokeWidth="0.5" />
                </svg>
            </motion.div>
        </div>
    );
}
