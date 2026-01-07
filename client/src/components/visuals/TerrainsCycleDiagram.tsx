import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Droplets, User, Sprout, Network, ArrowRight } from "lucide-react";

export const TerrainsCycleDiagram: React.FC = () => {
    // Rotation animation for the cycle
    const cycleTransition = {
        duration: 20,
        repeat: Infinity,
        ease: "linear" as const
    };

    return (
        <div className="w-full h-full min-h-[500px] bg-[#020617] rounded-xl overflow-hidden relative flex items-center justify-center p-8 border border-white/5">
            {/* Background Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05),transparent_70%)]" />

            {/* Central Hub */}
            <div className="absolute z-10 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md relative">
                    <Network className="w-10 h-10 text-white/80" />
                    {/* Pulsing rings */}
                    <motion.div
                        className="absolute inset-0 rounded-full border border-white/20"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </div>
                <span className="mt-4 text-xs font-bold uppercase tracking-widest text-white/40">The Mineral Network</span>
            </div>

            {/* Rotating Cycle Container */}
            <motion.div
                className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] absolute"
                animate={{ rotate: 360 }}
                transition={cycleTransition}
            >
                {/* Node 1: Water (Top) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                    {/* Counter-rotate content so it stays upright */}
                    <motion.div
                        className="flex flex-col items-center"
                        animate={{ rotate: -360 }}
                        transition={cycleTransition}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-[#0b1020] border border-blue-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)] group-hover:scale-110 transition-transform duration-300">
                            <Droplets className="w-8 h-8 text-blue-400" />
                        </div>
                        <div className="mt-2 text-center bg-[#020617]/80 px-2 py-1 rounded-md backdrop-blur-sm">
                            <span className="block text-sm font-bold text-blue-300">Water Terrain</span>
                            <span className="text-[10px] text-white/50">Structure & Memory</span>
                        </div>
                    </motion.div>
                </div>

                {/* Node 2: Body (Bottom Right) */}
                <div className="absolute bottom-[15%] right-0 flex flex-col items-center group">
                    <motion.div
                        className="flex flex-col items-center"
                        animate={{ rotate: -360 }}
                        transition={cycleTransition}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-[#0b1020] border border-amber-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.2)] group-hover:scale-110 transition-transform duration-300">
                            <User className="w-8 h-8 text-amber-400" />
                        </div>
                        <div className="mt-2 text-center bg-[#020617]/80 px-2 py-1 rounded-md backdrop-blur-sm">
                            <span className="block text-sm font-bold text-amber-300">Body Terrain</span>
                            <span className="text-[10px] text-white/50">Connectivity & Flow</span>
                        </div>
                    </motion.div>
                </div>

                {/* Node 3: Soil (Bottom Left) */}
                <div className="absolute bottom-[15%] left-0 flex flex-col items-center group">
                    <motion.div
                        className="flex flex-col items-center"
                        animate={{ rotate: -360 }}
                        transition={cycleTransition}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-[#0b1020] border border-green-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)] group-hover:scale-110 transition-transform duration-300">
                            <Sprout className="w-8 h-8 text-green-400" />
                        </div>
                        <div className="mt-2 text-center bg-[#020617]/80 px-2 py-1 rounded-md backdrop-blur-sm">
                            <span className="block text-sm font-bold text-green-300">Soil Terrain</span>
                            <span className="text-[10px] text-white/50">Exchange & Network</span>
                        </div>
                    </motion.div>
                </div>

                {/* Connecting Ring */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                </svg>

            </motion.div>

            {/* Flow Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Creating visible particles flowing clockwise along the ring logic could be complex purely with CSS/framer. 
                     Using a simple overlay ring with rotation for now. */}
            </div>

        </div>
    );
};
