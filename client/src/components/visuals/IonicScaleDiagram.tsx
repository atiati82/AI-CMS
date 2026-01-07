import React from 'react';
import { motion } from 'framer-motion';

export function IonicScaleDiagram() {
    return (
        <div className="p-8 bg-slate-900/50 rounded-2xl border border-white/10 my-8">
            <h4 className="text-white font-bold mb-6 text-center">The Scale of Matter</h4>
            <div className="relative h-20 bg-slate-800 rounded-full flex items-center px-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-emerald-500/20 to-amber-500/20 rounded-full" />
                <div className="flex justify-between w-full relative z-10">
                    {['Ionic', 'Colloidal', 'Particulate'].map((label, i) => (
                        <div key={label} className="text-center">
                            <motion.div
                                className="w-4 h-4 rounded-full bg-white mx-auto mb-2"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                            />
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default IonicScaleDiagram;
