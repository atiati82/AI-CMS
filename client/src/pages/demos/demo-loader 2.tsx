import React, { useState } from 'react';
import { TuningFrequencyLoader } from "@/components/ui/TuningFrequencyLoader";
import { Loading369 } from "@/components/ui/loading-369";
import { BioStructureLoader } from "@/components/visuals/svg/BioStructureLoader";
import { SacredGeometryLoader } from "@/components/visuals/svg/SacredGeometryLoader";
import { FrequencyTuningLoader } from "@/components/FrequencyTuningLoader";
import { HarmonicResonanceLoader } from "@/components/HarmonicResonanceLoader";
import { GoldLogoLoader } from "@/components/ui/GoldLogoLoader";
import { CosmicPulse } from "@/components/motion/CosmicPulse";
import { SacredGeoDraw } from "@/components/visuals/motion-lab/SacredGeoDraw";
import { AnimatePresence, motion } from "framer-motion";


export default function DemoLoaderPage() {
    const [showNew1, setShowNew1] = useState(false);
    const [showNew2, setShowNew2] = useState(false);

    return (
        <div className="min-h-screen bg-[#020617] p-8 md:p-20">
            <header className="mb-20 text-center space-y-4">
                <h1 className="text-4xl font-light tracking-[0.2em] text-white/90">
                    LOADER ARCHIVES
                </h1>
                <p className="text-cyan-400/60 tracking-wider text-sm uppercase">
                    Frequency & Resonance Visualization Gallery
                </p>
            </header>

            <div className="grid grid-cols-1 gap-24 max-w-7xl mx-auto">

                {/* 1. TUNING FREQUENCY LOADER (Original Candidate) */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4 text-amber-500/50 uppercase tracking-widest text-xs border-b border-amber-500/20 pb-2">
                        <span>01</span>
                        <span>Tuning Frequency Loader</span>
                    </div>
                    <div className="p-20 border border-amber-500/10 rounded-3xl bg-amber-900/[0.02] flex justify-center">
                        <TuningFrequencyLoader size={200} />
                    </div>
                </section>

                {/* 2. LOADING 3-6-9 (Restored Candidate) */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4 text-emerald-500/50 uppercase tracking-widest text-xs border-b border-emerald-500/20 pb-2">
                        <span>02</span>
                        <span>Loading 3-6-9 (Tesla)</span>
                    </div>
                    <div className="p-20 border border-emerald-500/10 rounded-3xl bg-emerald-900/[0.02] flex flex-col items-center gap-8">
                        <Loading369 size={120} />
                        <div className="flex gap-12">
                            <Loading369 size={64} />
                            <Loading369 size={48} />
                            <Loading369 size={32} />
                        </div>
                    </div>
                </section>

                {/* 3. BIO STRUCTURE LOADER */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4 text-cyan-500/50 uppercase tracking-widest text-xs border-b border-cyan-500/20 pb-2">
                        <span>03</span>
                        <span>Bio Structure Svg</span>
                    </div>
                    <div>
                        <BioStructureLoader />
                    </div>
                </section>

                {/* 4. SACRED GEOMETRY LOADER */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4 text-indigo-500/50 uppercase tracking-widest text-xs border-b border-indigo-500/20 pb-2">
                        <span>04</span>
                        <span>Sacred Geometry Svg</span>
                    </div>
                    <div>
                        <SacredGeometryLoader />
                    </div>
                </section>

                {/* 5. GOLD LOGO LOADER */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4 text-yellow-500/50 uppercase tracking-widest text-xs border-b border-yellow-500/20 pb-2">
                        <span>05</span>
                        <span>Gold Logo Loader</span>
                    </div>
                    <div className="p-20 border border-yellow-500/10 rounded-3xl bg-yellow-900/[0.02] flex justify-center items-center gap-8">
                        <GoldLogoLoader size={64} />
                        <GoldLogoLoader size={128} />
                    </div>
                </section>

                {/* 6. COSMIC PULSE */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4 text-purple-500/50 uppercase tracking-widest text-xs border-b border-purple-500/20 pb-2">
                        <span>06</span>
                        <span>Cosmic Pulse (Motion)</span>
                    </div>
                    <div className="p-20 border border-purple-500/10 rounded-3xl bg-purple-900/[0.02] flex justify-center">
                        <CosmicPulse size={200} color="#a855f7" />
                    </div>
                </section>

                {/* 7. SACRED GEO DRAW */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4 text-cyan-500/50 uppercase tracking-widest text-xs border-b border-cyan-500/20 pb-2">
                        <span>07</span>
                        <span>Sacred Geo Draw (Scroll-Driven)</span>
                    </div>
                    <div className="p-20 border border-cyan-500/10 rounded-3xl bg-cyan-900/[0.02] flex justify-center h-[500px]">
                        <SacredGeoDraw />
                    </div>
                </section>

                {/* NEW LOADERS PREVIEW */}
                <section className="space-y-8 pt-20 border-t border-white/5">
                    <h2 className="text-2xl font-light text-white/40 text-center uppercase tracking-widest">New Generations</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-12 border border-white/10 rounded-2xl bg-white/5 flex flex-col items-center justify-center gap-6">
                            <h3 className="text-purple-400 text-sm tracking-widest uppercase">Frequency Tuner (New)</h3>
                            <button
                                onClick={() => setShowNew1(true)}
                                className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors"
                            >
                                Preview Overlay
                            </button>
                        </div>

                        <div className="p-12 border border-white/10 rounded-2xl bg-white/5 flex flex-col items-center justify-center gap-6">
                            <h3 className="text-cyan-400 text-sm tracking-widest uppercase">Harmonic Resonance (Gemini)</h3>
                            <button
                                onClick={() => setShowNew2(true)}
                                className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg transition-colors"
                            >
                                Preview Overlay
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            <AnimatePresence>
                {showNew1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                        onClick={() => setShowNew1(false)}
                    >
                        <FrequencyTuningLoader isVisible={true} />
                    </motion.div>
                )}
                {showNew2 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                        onClick={() => setShowNew2(false)}
                    >
                        <HarmonicResonanceLoader isVisible={true} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
