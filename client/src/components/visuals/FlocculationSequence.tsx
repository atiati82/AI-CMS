import React from 'react';
import { motion } from 'framer-motion';

export function FlocculationSequence() {
    return (
        <div className="p-8 bg-amber-900/10 rounded-2xl border border-amber-500/20 text-center my-12">
            <h3 className="text-amber-400 font-display text-xl mb-8">Flocculation Sequence</h3>
            <div className="flex gap-4 justify-center items-center">
                <div className="w-16 h-16 rounded-full border border-amber-500/30 flex items-center justify-center text-[10px] text-amber-200">Chaotic</div>
                <div className="w-4 h-px bg-amber-500/30" />
                <motion.div
                    className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center text-xs text-amber-100 font-bold"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Binding
                </motion.div>
                <div className="w-4 h-px bg-amber-500/30" />
                <div className="w-24 h-24 rounded-full bg-amber-900/40 border border-amber-500/50 flex items-center justify-center text-sm text-white font-bold">Clear</div>
            </div>
        </div>
    );
}

export default FlocculationSequence;
