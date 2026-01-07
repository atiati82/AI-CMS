import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FrequencyTuningLoaderProps {
    isVisible: boolean;
    onComplete?: () => void;
    duration?: number; // in milliseconds
}

export const FrequencyTuningLoader: React.FC<FrequencyTuningLoaderProps> = ({
    isVisible,
    onComplete,
    duration = 3000,
}) => {
    const [progress, setProgress] = useState(0);
    const [currentFrequency, setCurrentFrequency] = useState(432);

    useEffect(() => {
        if (!isVisible) {
            setProgress(0);
            setCurrentFrequency(432);
            return;
        }

        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            // Animate frequency values
            const freq = 432 + Math.sin(elapsed / 100) * 96 + (newProgress / 100) * 96;
            setCurrentFrequency(Math.round(freq));

            if (newProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    onComplete?.();
                }, 500);
            }
        }, 16);

        return () => clearInterval(interval);
    }, [isVisible, duration, onComplete]);

    // Generate frequency bars
    const frequencyBars = Array.from({ length: 24 }, (_, i) => {
        const height = 20 + Math.sin((progress / 100) * Math.PI * 2 + i * 0.5) * 60;
        const delay = i * 0.03;
        return { height, delay, index: i };
    });

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    style={{
                        background: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(12px)',
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="relative"
                        style={{
                            width: '420px',
                            padding: '48px',
                            background: 'linear-gradient(135deg, rgba(20, 20, 40, 0.95) 0%, rgba(10, 10, 25, 0.98) 100%)',
                            borderRadius: '24px',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            boxShadow: `
                0 0 60px rgba(139, 92, 246, 0.3),
                0 0 120px rgba(59, 130, 246, 0.2),
                inset 0 0 60px rgba(139, 92, 246, 0.05)
              `,
                        }}
                    >
                        {/* Animated glow orb */}
                        <motion.div
                            className="absolute top-1/2 left-1/2"
                            style={{
                                width: '200px',
                                height: '200px',
                                marginLeft: '-100px',
                                marginTop: '-100px',
                                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
                                filter: 'blur(40px)',
                                pointerEvents: 'none',
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />

                        {/* Central frequency display */}
                        <div className="relative z-10 text-center mb-8">
                            <motion.div
                                className="text-6xl font-bold mb-2"
                                style={{
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))',
                                }}
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            >
                                {currentFrequency}
                            </motion.div>
                            <div
                                className="text-sm tracking-widest uppercase"
                                style={{
                                    color: 'rgba(139, 92, 246, 0.8)',
                                    letterSpacing: '0.2em',
                                }}
                            >
                                Hz
                            </div>
                        </div>

                        {/* Frequency visualizer bars */}
                        <div className="relative z-10 flex items-end justify-center gap-1 h-24 mb-8">
                            {frequencyBars.map((bar) => (
                                <motion.div
                                    key={bar.index}
                                    className="w-2 rounded-full"
                                    style={{
                                        background: `linear-gradient(to top, 
                      rgba(139, 92, 246, 0.8) 0%, 
                      rgba(59, 130, 246, 0.6) 50%,
                      rgba(139, 92, 246, 0.3) 100%)`,
                                        boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
                                    }}
                                    animate={{
                                        height: `${bar.height}%`,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        delay: bar.delay,
                                        ease: 'easeOut',
                                    }}
                                />
                            ))}
                        </div>

                        {/* Status text */}
                        <motion.div
                            className="relative z-10 text-center mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div
                                className="text-lg tracking-wide"
                                style={{
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    textShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
                                }}
                            >
                                Tuning Frequencies
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    ...
                                </motion.span>
                            </div>
                        </motion.div>

                        {/* Progress bar */}
                        <div className="relative z-10 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{
                                    background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 50%, #8b5cf6 100%)',
                                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.8)',
                                }}
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            />
                        </div>

                        {/* Orbital rings */}
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
                                style={{
                                    width: `${180 + i * 60}px`,
                                    height: `${180 + i * 60}px`,
                                    marginLeft: `${-(90 + i * 30)}px`,
                                    marginTop: `${-(90 + i * 30)}px`,
                                    border: '1px solid rgba(139, 92, 246, 0.2)',
                                    boxShadow: `0 0 20px rgba(139, 92, 246, 0.1)`,
                                }}
                                animate={{
                                    rotate: i % 2 === 0 ? 360 : -360,
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    rotate: {
                                        duration: 8 + i * 2,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    },
                                    scale: {
                                        duration: 2 + i * 0.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    },
                                }}
                            />
                        ))}

                        {/* Particle effects */}
                        {Array.from({ length: 12 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full pointer-events-none"
                                style={{
                                    width: '4px',
                                    height: '4px',
                                    background: 'rgba(139, 92, 246, 0.8)',
                                    boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)',
                                    top: '50%',
                                    left: '50%',
                                }}
                                animate={{
                                    x: [0, Math.cos((i / 12) * Math.PI * 2) * 150],
                                    y: [0, Math.sin((i / 12) * Math.PI * 2) * 150],
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: 'easeOut',
                                }}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
