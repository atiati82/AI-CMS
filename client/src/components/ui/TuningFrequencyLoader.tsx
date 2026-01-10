import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { AndaraIcon } from "@/components/andara-icon";

interface TuningFrequencyLoaderProps {
    className?: string;
    size?: number;
}

export function TuningFrequencyLoader({ className, size = 120 }: TuningFrequencyLoaderProps) {
    // Frequencies represented by concentric rings
    // We'll use 3 rings pulsating at slightly different rates to create interference/tuning patterns

    return (
        <div
            className={cn("relative flex items-center justify-center", className)}
            style={{ width: size, height: size }}
        >
            {/* Frequency Ring 1 (Slow, Deep) */}
            <motion.div
                className="absolute inset-0 rounded-full border border-amber-500/30"
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0, 0.3],
                    borderColor: ["rgba(245, 158, 11, 0.3)", "rgba(245, 158, 11, 0)", "rgba(245, 158, 11, 0.3)"]
                }}
                transition={{
                    duration: 3,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    repeat: Infinity
                }}
            />

            {/* Frequency Ring 2 (Medium, Harmonic) */}
            <motion.div
                className="absolute inset-0 rounded-full border border-cyan-400/40"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                    scale: [0.8, 1.3, 0.8],
                    opacity: [0.4, 0.1, 0.4],
                }}
                transition={{
                    duration: 2.1,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: 0.5
                }}
            />

            {/* Frequency Ring 3 (Fast, High Frequency) */}
            <motion.div
                className="absolute inset-0 rounded-full border border-white/20"
                initial={{ scale: 0.9 }}
                animate={{
                    scale: [0.9, 1.1, 0.9],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                    duration: 1.618, // Golden Ratio approx
                    ease: "easeInOut",
                    repeat: Infinity
                }}
            />

            {/* Central Tuning Core */}
            <div className="relative z-10 flex items-center justify-center w-1/2 h-1/2 rounded-full bg-black/40 backdrop-blur-sm border border-white/5">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                    className="w-full h-full p-2"
                >
                    <AndaraIcon className="w-full h-full text-[#bf953f]" />
                </motion.div>

                {/* Inner Glow Pulse */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-[#bf953f]/20 blur-xl"
                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Geometric Lattice (Scanning/Tuning) */}
            <motion.div
                className="absolute inset-[-20%] border border-white/5 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-linear-to-b from-white/20 to-transparent" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-linear-to-t from-white/20 to-transparent" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-1 bg-linear-to-r from-white/20 to-transparent" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-1 bg-gradient-to-l from-white/20 to-transparent" />
            </motion.div>
        </div>
    );
}
