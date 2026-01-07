import React from 'react';
import { motion } from 'framer-motion';

export function MagneticFlowDiagram() {
    return (
        <div className="aspect-square bg-purple-900/10 rounded-3xl border border-purple-500/20 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                {[10, 20, 30, 40].map(r => (
                    <motion.div
                        key={r}
                        className="absolute rounded-full border border-purple-500/10"
                        style={{ width: r * 4, height: r * 4 }}
                        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, delay: r * 0.1, repeat: Infinity }}
                    />
                ))}
            </div>
            <motion.div
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-2xl z-10 flex items-center justify-center text-white"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
                N | S
            </motion.div>
        </div>
    );
}

export default MagneticFlowDiagram;
