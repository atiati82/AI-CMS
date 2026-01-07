import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface HarmonicResonanceLoaderProps {
    isVisible: boolean;
    onComplete?: () => void;
    duration?: number; // ms
}

export const HarmonicResonanceLoader: React.FC<HarmonicResonanceLoaderProps> = ({
    isVisible,
    onComplete,
    duration = 4000,
}) => {
    const [phase, setPhase] = useState<'scanning' | 'locking' | 'complete'>('scanning');
    const [frequency, setFrequency] = useState(0);
    const [coherence, setCoherence] = useState(0);

    // Audio-visual simulation
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!isVisible) {
            setPhase('scanning');
            setFrequency(0);
            setCoherence(0);
            return;
        }

        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Simulate Frequency "hunting"
            if (progress < 0.6) {
                // Random scanning
                setFrequency(Math.floor(200 + Math.random() * 600));
                setCoherence(Math.random() * 40);
            } else if (progress < 0.85) {
                // Locking in
                setPhase('locking');
                const target = 432;
                const current = 500 - (progress - 0.6) * 4 * (500 - target); // Approximation
                setFrequency(Math.floor(target + (Math.random() * 20 - 10)));
                setCoherence(40 + (progress - 0.6) * 200);
            } else {
                // Locked
                setPhase('complete');
                setFrequency(432);
                setCoherence(100);
            }

            if (progress >= 1 && phase !== 'complete') {
                clearInterval(interval);
                setTimeout(() => onComplete?.(), 800);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [isVisible, duration, onComplete]);

    // Canvas Wave Animation
    useEffect(() => {
        if (!isVisible || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let frameId: number;
        let t = 0;

        const draw = () => {
            if (!ctx || !canvas) return;

            // Resize handling (rudimentary)
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            const width = rect.width;
            const height = rect.height;

            ctx.clearRect(0, 0, width, height);
            t += 0.05;

            // Draw Sine Waves
            const waveCount = phase === 'locking' || phase === 'complete' ? 3 : 5;
            const baseAmp = phase === 'complete' ? 5 : 20;

            for (let i = 0; i < waveCount; i++) {
                ctx.beginPath();
                ctx.lineCap = 'round';
                ctx.lineWidth = 2; // Thin, sharp lines

                // Color depends on coherence
                const opacity = 0.3 + (i / waveCount) * 0.5;
                const hue = phase === 'complete' ? 160 : 250 - (coherence * 0.5); // Blue -> Teal/Gold
                ctx.strokeStyle = `hsla(${hue}, 80%, 70%, ${opacity})`;

                const amplitude = baseAmp * (1 + Math.sin(t * 0.5 + i));
                const freqOffset = phase === 'complete' ? 0 : Math.sin(t * 0.1 + i) * 0.02;

                for (let x = 0; x < width; x += 2) {
                    // Sine equation
                    const y = height / 2 +
                        Math.sin(x * 0.02 + t + i * 0.5 + freqOffset * x) * amplitude * Math.sin(x / width * Math.PI); // Envelope

                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            // Draw "Target" Line
            if (phase !== 'scanning') {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 1;
                ctx.moveTo(0, height / 2);
                ctx.lineTo(width, height / 2);
                ctx.stroke();
            }

            frameId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(frameId);
    }, [isVisible, phase, coherence]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8 } }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative w-[500px] h-[300px] bg-[#0A0A12] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                        style={{
                            boxShadow: "0 0 80px -20px rgba(100, 200, 255, 0.2)"
                        }}
                    >
                        {/* Decorative Grid Background */}
                        <div className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: 'linear-gradient(#334 1px, transparent 1px), linear-gradient(90deg, #334 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }}
                        />

                        {/* Main Content Container */}
                        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-8">

                            {/* Header Status */}
                            <div className="w-full flex justify-between items-center mb-6 text-xs font-mono tracking-widest uppercase text-white/50">
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className={`w-2 h-2 rounded-full ${phase === 'complete' ? 'bg-emerald-400' : 'bg-blue-500'}`}
                                    />
                                    <span>{phase === 'complete' ? 'LOCKED' : 'CALIBRATING'}</span>
                                </div>
                                <div>SYS.ION.04</div>
                            </div>

                            {/* Central Visualization Area */}
                            <div className="relative w-full h-24 mb-6 bg-black/20 rounded-lg overflow-hidden border border-white/5">
                                <canvas ref={canvasRef} className="w-full h-full" />

                                {/* Scanning Bar Overlay */}
                                <AnimatePresence>
                                    {phase !== 'complete' && (
                                        <motion.div
                                            className="absolute top-0 bottom-0 w-[2px] bg-white/30 blur-[2px]"
                                            initial={{ left: '0%' }}
                                            animate={{ left: '100%' }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Data Readout */}
                            <div className="grid grid-cols-2 gap-8 w-full">
                                <div className="flex flex-col">
                                    <span className="text-xxs uppercase tracking-wider text-white/40 mb-1">Frequency</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-light font-mono text-white tabular-nums">
                                            {frequency.toString().padStart(3, '0')}
                                        </span>
                                        <span className="text-sm text-white/60">Hz</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="text-xxs uppercase tracking-wider text-white/40 mb-1">Coherence</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-3xl font-light font-mono tabular-nums transition-colors duration-300 ${coherence > 90 ? 'text-emerald-400' : 'text-blue-400'}`}>
                                            {Math.floor(coherence)}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Status Text */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                key={phase}
                                className="mt-6 text-sm text-center font-light tracking-wide"
                                style={{ color: phase === 'complete' ? '#6EE7B7' : '#93C5FD' }}
                            >
                                {phase === 'scanning' && "Scanning ambient field..."}
                                {phase === 'locking' && "Aligning harmonic resonance..."}
                                {phase === 'complete' && "Resonance stabilized."}
                            </motion.div>

                        </div>

                        {/* Glow Effects */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[100px] bg-blue-500/10 blur-[60px] pointer-events-none" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
