import React from 'react';
import { motion } from 'framer-motion';

export function EzWaterScrollAnimation() {
    return (
        <div className="h-96 flex items-center justify-center bg-blue-900/10 rounded-3xl border border-blue-500/20 my-12 overflow-hidden relative">
            <motion.div
                className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="text-center z-10">
                <h3 className="text-blue-400 font-display text-xl mb-4">EZ Water Structure Visualization</h3>
                <div className="flex gap-4 justify-center">
                    {[1, 2, 3, 4, 5].map(i => (
                        <motion.div
                            key={i}
                            className="w-12 h-12 rounded-full border border-blue-400/30 flex items-center justify-center text-blue-300 text-xs"
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 3,
                                delay: i * 0.2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            H₂O
                        </motion.div>
                    ))}
                </div>
                <p className="mt-8 text-blue-200/50 text-sm font-light">Scroll to observe phase transition</p>
            </div>
        </div>
    );
}

export default EzWaterScrollAnimation;
