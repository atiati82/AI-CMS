import React from 'react';
import { motion } from 'framer-motion';

export function MagneticScrollAnimation() {
    return (
        <div className="h-[50vh] flex items-center justify-center pointer-events-none">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-center"
            >
                <div className="text-purple-400 text-6xl font-bold mb-4 italic opacity-10">FLUX</div>
                <div className="flex gap-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 h-32 bg-linear-to-b from-transparent via-purple-500/30 to-transparent"
                            animate={{
                                y: [-20, 20, -20],
                                opacity: [0.1, 0.4, 0.1]
                            }}
                            transition={{
                                duration: 2 + Math.random(),
                                repeat: Infinity,
                                delay: Math.random()
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default MagneticScrollAnimation;
