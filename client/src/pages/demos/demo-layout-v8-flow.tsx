import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useTime, useMotionTemplate } from 'framer-motion';
import { ArrowDown, Droplet, Waves, Wind } from 'lucide-react';

const FlowLayout = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Liquid Scroll Effect values
    const scrollVelocity = useSpring(scrollY, { damping: 15, stiffness: 50 });
    const smoothY = useSpring(scrollY, { damping: 20, stiffness: 60 });

    const pathLength = useSpring(0, { damping: 20 });
    const time = useTime();

    // Create liquid distortion based on time
    const rotate = useTransform(time, [0, 10000], [0, 360], { clamp: false });
    const waveY = useTransform(time, [0, 4000], [-10, 10], { clamp: false });

    return (
        <div ref={containerRef} className="bg-[#080808] text-[#f0f0f0] font-sans selection:bg-teal-500/30">

            {/* --- SVG Filter Definition --- */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="liquid-distortion">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                </filter>
                <linearGradient id="water-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
            </svg>

            {/* --- Navigation --- */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-8 flex justify-between items-center mix-blend-difference pointer-events-none">
                <span className="text-xl font-bold tracking-tighter">ANDARA<span className="font-light opacity-70">FLOW</span></span>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-teal-400/50" />
                    <div className="w-2 h-2 rounded-full bg-teal-400/20" />
                </div>
            </nav>

            {/* --- Vertical Progress Line --- */}
            <div className="fixed left-8 top-0 bottom-0 w-[1px] bg-white/10 z-30 hidden md:block">
                <motion.div
                    className="w-full bg-teal-500 origin-top"
                    style={{ height: '100vh', scaleY: useTransform(scrollY, [0, 2000], [0, 1]) }}
                />
            </div>

            {/* --- Hero Section --- */}
            <section className="h-screen relative flex flex-col items-center justify-center overflow-hidden">
                <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.15), transparent 60%)',
                        scale: useTransform(scrollY, [0, 500], [1, 1.5])
                    }}
                />

                <h1 className="text-[15vw] font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0 relative z-10 mix-blend-overlay">
                    AQUA
                    <motion.span
                        className="block text-[8vw] font-light text-teal-200/50 italic"
                        style={{ x: useTransform(scrollY, [0, 300], [0, 100]) }}
                    >
                        Memory
                    </motion.span>
                </h1>

                {/* Liquid Blobs */}
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full border border-teal-500/20 blur-[80px]"
                    style={{ rotate }}
                />
                <motion.div
                    className="absolute w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[40px] mix-blend-screen"
                    animate={{
                        scale: [1, 1.2, 1],
                        borderRadius: ["50% 50% 50% 50%", "60% 40% 60% 40%", "50% 50% 50% 50%"]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                    className="absolute bottom-12 flex flex-col items-center gap-4 opacity-50 text-sm tracking-widest uppercase"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Scroll to Dive
                    <ArrowDown className="text-teal-400" />
                </motion.div>
            </section>

            {/* --- Content Stream --- */}
            <div className="max-w-4xl mx-auto relative z-10 px-6 py-24">

                {/* Section 1: Cohesion */}
                <div className="min-h-[80vh] flex items-center gap-12 group">
                    <div className="w-1/2 relative">
                        <motion.div
                            className="aspect-[3/4] rounded-full overflow-hidden bg-slate-900 border border-white/5 relative"
                            whileInView={{ borderRadius: ["50% 50% 50% 50%", "40% 60% 40% 60%", "50% 50% 50% 50%"] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?q=80&w=2660&auto=format&fit=crop"
                                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                                alt="Water Texture"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent mix-blend-multiply" />
                        </motion.div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex items-center gap-4 mb-4 text-teal-400">
                            <Droplet size={20} />
                            <span className="uppercase tracking-widest text-xs">Cohesion</span>
                        </div>
                        <h2 className="text-5xl font-light mb-8">Molecular <span className="font-serif italic text-teal-200">Embrace</span></h2>
                        <p className="text-xl text-neutral-400 leading-relaxed">
                            Water molecules are not solitary; they dance in continuous coordination. Our ionic minerals enhance this innate rhythm, creating larger, more stable coherent domains.
                        </p>
                    </div>
                </div>

                {/* Section 2: Flow State (Text Distortion) */}
                <div className="min-h-[60vh] flex flex-col justify-center items-center text-center py-32">
                    <motion.h3
                        className="text-[6vw] font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-blue-500"
                        style={{ filter: 'url(#liquid-distortion)' }}
                        whileHover={{ scale: 1.05 }}
                    >
                        UNBROKEN STREAM
                    </motion.h3>
                    <p className="max-w-lg mt-8 text-neutral-500 text-lg">
                        The journey from spring to cell is a continuous transmission of information.
                    </p>
                </div>

                {/* Section 3: Vortex */}
                <div className="min-h-[80vh] flex flex-row-reverse items-center gap-12 group">
                    <div className="w-1/2 relative aspect-square">
                        {/* CSS Vortex */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full border border-teal-500/20"
                                    style={{
                                        width: `${i * 20}%`,
                                        height: `${i * 20}%`,
                                        borderTopColor: 'transparent',
                                        rotate: i * 45
                                    }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10 - i, repeat: Infinity, ease: "linear" }}
                                />
                            ))}
                            <motion.div
                                className="w-32 h-32 rounded-full bg-teal-500/10 blur-xl absolute"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </div>
                    <div className="w-1/2 text-right">
                        <div className="flex items-center gap-4 mb-4 text-blue-400 justify-end">
                            <span className="uppercase tracking-widest text-xs">Vortex Dynamics</span>
                            <Wind size={20} />
                        </div>
                        <h2 className="text-5xl font-light mb-8">Spiraling <span className="font-serif italic text-blue-200">Energy</span></h2>
                        <p className="text-xl text-neutral-400 leading-relaxed">
                            Nature moves in spirals. We mimic the natural implosion physics of mountain streams to energize every drop before bottling.
                        </p>
                    </div>
                </div>

            </div>

            {/* --- Footer / Ocean Floor --- */}
            <footer className="h-[50vh] bg-gradient-to-t from-teal-950 to-[#080808] relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                <motion.div
                    className="text-center z-10"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Waves className="w-16 h-16 text-teal-600 mx-auto mb-6" />
                    <h4 className="text-3xl font-light tracking-widest mb-2">ANDARA</h4>
                    <p className="text-teal-800 uppercase tracking-[0.5em] text-sm">Deep Hydration</p>
                </motion.div>
            </footer>

        </div>
    );
};

export default FlowLayout;
