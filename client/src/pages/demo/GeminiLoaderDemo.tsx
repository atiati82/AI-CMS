import React, { useState } from 'react';
import { HarmonicResonanceLoader } from '@/components/HarmonicResonanceLoader';

export default function GeminiLoaderDemo() {
    const [isLoading, setIsLoading] = useState(false);

    const startLoader = () => {
        setIsLoading(true);
    };

    const handleComplete = () => {
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#020408] text-white font-sans selection:bg-blue-500/30">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px]" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-[80vh]">
                <div className="text-center max-w-2xl mb-12">
                    <div className="inline-block px-3 py-1 mb-4 border border-blue-500/30 rounded-full bg-blue-500/10 text-xs tracking-[0.2em] text-blue-300 uppercase">
                        Gemini System Generation
                    </div>
                    <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
                        Harmonic <br /> Resonance
                    </h1>
                    <p className="text-lg text-white/50 font-light leading-relaxed">
                        An advanced visualization system for the Andara Ionic frequency signature.
                        Simulating the phase-locking of scalar waves to the 432Hz harmonic baseline.
                    </p>
                </div>

                <button
                    onClick={startLoader}
                    className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 active:scale-95"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    <span className="relative flex items-center gap-3">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span className="tracking-widest uppercase text-sm">Initiate tuning sequence</span>
                    </span>
                </button>

                {/* Mini Preview Deck */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl opacity-60">
                    <div className="p-6 border border-white/5 rounded-lg bg-black/20">
                        <h3 className="text-xs uppercase tracking-widest text-white/40 mb-2">Phase 1</h3>
                        <p className="text-sm">Scanning ambient frequencies.</p>
                    </div>
                    <div className="p-6 border border-white/5 rounded-lg bg-black/20">
                        <h3 className="text-xs uppercase tracking-widest text-white/40 mb-2">Phase 2</h3>
                        <p className="text-sm">Signal acqusition & locking.</p>
                    </div>
                    <div className="p-6 border border-white/5 rounded-lg bg-black/20">
                        <h3 className="text-xs uppercase tracking-widest text-white/40 mb-2">Phase 3</h3>
                        <p className="text-sm">Stabilization complete.</p>
                    </div>
                </div>
            </div>

            <HarmonicResonanceLoader
                isVisible={isLoading}
                onComplete={handleComplete}
                duration={4500}
            />
        </div>
    );
}
