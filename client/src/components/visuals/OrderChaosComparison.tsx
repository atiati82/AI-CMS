import React from 'react';
import { motion } from 'framer-motion';

export function OrderChaosComparison() {
    return (
        <div className="grid grid-cols-2 gap-8 my-12">
            <div className="p-8 bg-red-500/5 rounded-2xl border border-red-500/10 text-center">
                <h4 className="text-red-400 text-xs font-bold uppercase mb-4">Chaos</h4>
                <div className="h-32 relative overflow-hidden">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-red-400/30 rounded-full"
                            animate={{
                                x: [Math.random() * 100, Math.random() * 100],
                                y: [Math.random() * 100, Math.random() * 100],
                            }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                    ))}
                </div>
            </div>
            <div className="p-8 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 text-center">
                <h4 className="text-emerald-400 text-xs font-bold uppercase mb-4">Order</h4>
                <div className="h-32 grid grid-cols-5 grid-rows-4 gap-2">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-full h-full bg-emerald-400/30 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrderChaosComparison;
