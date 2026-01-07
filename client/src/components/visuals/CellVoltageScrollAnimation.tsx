import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function CellVoltageScrollAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden my-20"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-blue-900/10 blur-[100px] rounded-full" />

            <motion.div style={{ y, opacity, scale }} className="relative z-10 text-center">
                {/* Voltage Meter Visual */}
                <div className="relative w-64 h-64 mx-auto mb-8 rounded-full border-4 border-cyan-500/30 flex items-center justify-center bg-black/40 backdrop-blur-sm shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                    <div className="absolute inset-2 rounded-full border-2 border-dashed border-emerald-500/30 animate-spin-slow" />

                    <div className="flex flex-col items-center">
                        <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                            -25mV
                        </span>
                        <span className="text-sm text-cyan-500/80 mt-2 font-mono uppercase tracking-widest">
                            Cell Potential
                        </span>
                    </div>

                    {/* Orbiting Particles */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
                    </motion.div>
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4"
                    >
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                    </motion.div>
                </div>

                <h3 className="text-2xl text-white font-light tracking-wide">
                    The <span className="font-bold text-cyan-400">Electric</span> Foundation of Life
                </h3>
            </motion.div>
        </div>
    );
}
