import React from 'react';
import { TuningFrequencyLoader } from "@/components/ui/TuningFrequencyLoader";

export default function DemoLoaderPage() {
    return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-light tracking-[0.2em] text-white/90">
                    TUNING FREQUENCY
                </h1>
                <p className="text-cyan-400/60 tracking-wider text-sm uppercase">
                    System Resonance Calibration
                </p>
            </div>

            <div className="p-20 border border-white/5 rounded-3xl bg-white/[0.02]">
                <TuningFrequencyLoader size={200} />
            </div>

            <div className="grid grid-cols-3 gap-12 pt-12">
                <div className="flex flex-col items-center space-y-4">
                    <span className="text-xs text-white/30 uppercase tracking-widest">Small</span>
                    <TuningFrequencyLoader size={64} />
                </div>
                <div className="flex flex-col items-center space-y-4">
                    <span className="text-xs text-white/30 uppercase tracking-widest">Medium</span>
                    <TuningFrequencyLoader size={120} />
                </div>
                <div className="flex flex-col items-center space-y-4">
                    <span className="text-xs text-white/30 uppercase tracking-widest">Large</span>
                    <TuningFrequencyLoader size={160} />
                </div>
            </div>
        </div>
    );
}
