import React from 'react';
import { motion } from 'framer-motion';

interface FlipCard3DProps {
    index?: number;
    title?: string;
    subtitle?: string;
    backTitle?: string;
    backContent?: string;
    onAccess?: () => void;
}

export function FlipCard3D({
    index = 0,
    title = "Artifact",
    subtitle = "Hover to Reveal Data",
    backTitle = "Hidden Knowledge",
    backContent = "\"The mineral kingdom communicates through light and frequency.\"",
    onAccess
}: FlipCard3DProps) {
    return (
        <motion.div
            initial={{ opacity: 0, rotateY: 90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2, type: "spring" }}
            className="group relative h-96 w-full cursor-pointer perspective-1000"
        >
            <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md flex flex-col items-center justify-center p-8 [backface-visibility:hidden]">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-emerald-600 mb-6 blur-lg opacity-50" />
                    <div className="relative z-10 text-center">
                        <h3 className="text-2xl font-bold text-white mb-2">{title} {index > 0 ? index : ''}</h3>
                        <p className="text-slate-400">{subtitle}</p>
                    </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 to-emerald-900/80 border border-amber-500/30 rounded-2xl backdrop-blur-xl p-8 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold text-amber-400 mb-4">{backTitle}</h3>
                    <p className="text-slate-200 text-sm">
                        {backContent}
                    </p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onAccess?.();
                        }}
                        className="mt-6 px-4 py-2 border border-amber-500/50 text-amber-400 rounded-full text-xs uppercase tracking-widest hover:bg-amber-500/20 transition-colors"
                    >
                        Access
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
