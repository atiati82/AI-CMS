import React, { useState } from 'react';
import { FrequencyTuningLoader } from '@/components/FrequencyTuningLoader';

export default function FrequencyLoaderDemo() {
    const [showLoader, setShowLoader] = useState(false);

    const handleTrigger = () => {
        setShowLoader(true);
    };

    const handleComplete = () => {
        setShowLoader(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-white mb-4">
                    Frequency Tuning Loader
                </h1>
                <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
                    A stunning animated loader that visualizes frequency tuning with dynamic bars,
                    orbital rings, and particle effects.
                </p>

                <button
                    onClick={handleTrigger}
                    className="px-8 py-4 text-lg font-semibold text-white rounded-xl transition-all duration-300 transform hover:scale-105"
                    style={{
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                        boxShadow: '0 10px 40px rgba(139, 92, 246, 0.4)',
                    }}
                >
                    Show Frequency Loader
                </button>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="text-3xl mb-2">🎵</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Dynamic Frequencies</h3>
                        <p className="text-sm text-purple-200">
                            Real-time frequency visualization with animated Hz values
                        </p>
                    </div>

                    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="text-3xl mb-2">✨</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Particle Effects</h3>
                        <p className="text-sm text-purple-200">
                            Radial particle animations and orbital ring systems
                        </p>
                    </div>

                    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="text-3xl mb-2">🌊</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Smooth Animations</h3>
                        <p className="text-sm text-purple-200">
                            Fluid transitions powered by Framer Motion
                        </p>
                    </div>
                </div>

                <div className="mt-12 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 max-w-2xl mx-auto">
                    <h3 className="text-lg font-semibold text-white mb-3">Usage Example</h3>
                    <pre className="text-left text-sm text-purple-200 overflow-x-auto">
                        <code>{`import { FrequencyTuningLoader } from '@/components/FrequencyTuningLoader';

function MyComponent() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <FrequencyTuningLoader
        isVisible={loading}
        onComplete={() => setLoading(false)}
        duration={3000}
      />
      <button onClick={() => setLoading(true)}>
        Start Loading
      </button>
    </>
  );
}`}</code>
                    </pre>
                </div>
            </div>

            <FrequencyTuningLoader
                isVisible={showLoader}
                onComplete={handleComplete}
                duration={3000}
            />
        </div>
    );
}
