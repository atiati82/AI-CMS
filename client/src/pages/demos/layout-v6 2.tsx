import React from 'react';
import StandardPageLayout from '@/components/StandardPageLayout';
import { motion } from 'framer-motion';

export default function DemoLayoutV6() {
    return (
        <StandardPageLayout
            title="V6 Hyperspace"
            subtitle="Flying Layout Demo"
            seoTitle="Demo Layout V6 - Hyperspace"
            seoDescription="Hyperspace layout demonstration with floating elements."
        >
            <div className="min-h-screen relative overflow-hidden bg-zinc-950 text-white p-8 rounded-xl border border-white/10 mt-8 mx-4">
                {/* Starfield Effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                <div className="relative z-10 max-w-4xl mx-auto text-center pt-20 pb-20">
                    <motion.h2
                        className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Hyperspace Mode
                    </motion.h2>

                    <motion.p
                        className="text-xl text-slate-300 mb-12"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Fast-loading, auto-routed V6 layout.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-lg hover:bg-white/10 transition-colors"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <h3 className="text-xl font-semibold mb-2 text-cyan-300">Module {i}</h3>
                                <p className="text-sm text-slate-400">Floating independent content block.</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </StandardPageLayout>
    );
}
