import React from 'react';
import { motion } from 'framer-motion';

export function CrystallineScrollAnimation() {
    return (
        <div className="h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="relative">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-64 h-64 border-2 border-cyan-500/20 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] relative"
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
                    </div>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center text-cyan-400 font-display text-4xl tracking-widest uppercase opacity-40">
                    Structure
                </div>
            </div>
        </div>
    );
}

export default CrystallineScrollAnimation;
