import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Layers, Zap, Hexagon, ArrowRight, Activity, Droplets } from 'lucide-react';

const PrismLayout = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // Mouse parralax
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        x.set((clientX / innerWidth) - 0.5);
        y.set((clientY / innerHeight) - 0.5);
    };

    return (
        <div
            ref={containerRef}
            className="min-h-[400vh] bg-slate-950 text-slate-100 selection:bg-cyan-500/30 font-sans overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* --- Background Ambient Light --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div
                    className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-40"
                    style={{
                        background: 'radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(59,130,246,0) 70%)',
                        x: useTransform(mouseX, [-0.5, 0.5], [-50, 50]),
                        y: useTransform(mouseY, [-0.5, 0.5], [-50, 50]),
                    }}
                />
                <motion.div
                    className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-30"
                    style={{
                        background: 'radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(139,92,246,0) 70%)',
                        x: useTransform(mouseX, [-0.5, 0.5], [50, -50]),
                        y: useTransform(mouseY, [-0.5, 0.5], [50, -50]),
                    }}
                />
            </div>

            {/* --- Navigation --- */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference">
                <div className="flex items-center gap-2">
                    <Hexagon className="w-8 h-8 text-cyan-400 animate-spin-slow" strokeWidth={1.5} />
                    <span className="text-2xl font-light tracking-[0.2em] uppercase">Andara<span className="font-bold text-cyan-400">Prism</span></span>
                </div>
                <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase opacity-70">
                    <a href="#" className="hover:text-cyan-400 transition-colors">Refraction</a>
                    <a href="#" className="hover:text-purple-400 transition-colors">Spectrum</a>
                    <a href="#" className="hover:text-pink-400 transition-colors">Geometry</a>
                </div>
                <button className="px-6 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-all backdrop-blur-md">
                    Connect
                </button>
            </nav>

            {/* --- Hero Section --- */}
            <section className="relative h-screen flex items-center justify-center z-10 perspective-[1000px]">
                <motion.div
                    className="relative text-center z-20"
                    style={{
                        rotateX: useTransform(mouseY, [-0.5, 0.5], [10, -10]),
                        rotateY: useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        <h1 className="text-[12vw] font-bold leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-cyan-100 to-transparent bg-300% animate-gradient">
                            LUX
                        </h1>
                        <h2 className="text-[4vw] font-light tracking-[0.5em] text-cyan-200/80 -mt-4 uppercase">
                            Crystalline Light
                        </h2>
                    </motion.div>

                    {/* Crystal Card */}
                    <div className="mt-20 flex justify-center">
                        <motion.div
                            className="w-[300px] h-[400px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/50 transition-colors duration-500 shadow-2xl shadow-cyan-900/20"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                            {/* Inner refraction lines */}
                            <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-cover" />

                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                <Activity className="w-16 h-16 text-cyan-400 mb-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                                <h3 className="text-2xl font-bold mb-2">Photonic Activation</h3>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    Structuring water through high-frequency light spectra and scalar wave geometry.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ z: -1 }}
                >
                    <FloatingCrystal delay={0} x={-30} y={-20} size={10} color="cyan" />
                    <FloatingCrystal delay={1} x={35} y={15} size={14} color="purple" />
                    <FloatingCrystal delay={2} x={-20} y={40} size={8} color="pink" />
                </motion.div>
            </section>

            {/* --- Content Section 1: The Spectrum --- */}
            <section className="relative min-h-screen py-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-cyan-400 tracking-widest uppercase text-sm font-bold mb-4 block">Refraction Physics</span>
                            <h3 className="text-6xl font-light mb-8">Split the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-bold">Invisible</span></h3>
                            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-md">
                                Just as a prism reveals the hidden colors within white light, our structured minerals reveal the latent energy within water.
                            </p>

                            <div className="flex gap-4">
                                <FeatureTag icon={Zap} label="High Voltage" />
                                <FeatureTag icon={Droplets} label="Ionic Flow" />
                                <FeatureTag icon={Layers} label="Structured" />
                            </div>
                        </motion.div>
                    </div>

                    <div className="relative h-[600px] flex items-center justify-center">
                        {/* Glass Stack Effect */}
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute w-full h-full rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md shadow-2xl"
                                style={{
                                    zIndex: 3 - i,
                                    scale: 1 - i * 0.05,
                                    y: i * 20,
                                    rotate: i * 5,
                                    opacity: 1 - i * 0.2,
                                }}
                                whileHover={{
                                    y: i * 5,
                                    rotate: i * 2,
                                    scale: 1,
                                    backgroundColor: `rgba(255,255,255,${0.05 + (i * 0.02)})`
                                }}
                                transition={{ type: "spring", stiffness: 100 }}
                            >
                                {i === 0 && (
                                    <div className="h-full flex items-center justify-center relative overflow-hidden rounded-[3rem]">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10" />
                                        <div className="p-12">
                                            <div className="text-6xl font-bold opacity-10 blur-[2px]">0{i + 1}</div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Parallax Scroll Text --- */}
            <div className="py-20 overflow-hidden bg-slate-900/50 backdrop-blur-sm mt-20">
                <motion.div
                    className="flex whitespace-nowrap gap-12 font-bold text-8xl text-white/5"
                    style={{ x: useTransform(scrollYProgress, [0, 1], [0, -1000]) }}
                >
                    <span>CRYSTALLINE STRUCTURE</span>
                    <span>•</span>
                    <span>IONIC RESONANCE</span>
                    <span>•</span>
                    <span>BIOELECTRIC FIELD</span>
                    <span>•</span>
                    <span>QUANTUM COHERENCE</span>
                </motion.div>
            </div>


            {/* --- Split Section --- */}
            <section className="min-h-screen flex flex-col md:flex-row">
                <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-950 p-20 flex flex-col justify-center border-r border-white/5 relative group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517409949673-8b7762699317?q=80&w=2576&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay group-hover:opacity-30 transition-opacity duration-700 md:grayscale group-hover:grayscale-0" />
                    <div className="relative z-10">
                        <h4 className="text-4xl font-light mb-6">Dark Field</h4>
                        <p className="text-slate-400 max-w-md">Exploring the microscopic terrain of water. Observe the visible difference in structure and coherence.</p>
                        <button className="mt-8 flex items-center gap-2 text-cyan-400 hover:gap-4 transition-all">
                            View Analysis <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
                <div className="flex-1 bg-slate-950 p-20 flex flex-col justify-center relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10 text-right">
                        <h4 className="text-4xl font-light mb-6">Light Field</h4>
                        <p className="text-slate-400 max-w-md ml-auto">Harnessing the full spectrum of photonic energy to revitalize atomic bonds within the liquid crystal.</p>
                        <button className="mt-8 flex items-center gap-2 text-purple-400 hover:gap-4 transition-all ml-auto">
                            Explore Energy <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </section>

            {/* --- Footer --- */}
            <footer className="py-20 border-t border-white/5 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                <h5 className="text-xs tracking-[0.5em] uppercase text-slate-500 mb-6">Andara Series V7</h5>
                <p className="text-slate-600">The Prism Concept</p>
            </footer>

        </div>
    );
};

// --- Sub-components ---

const FloatingCrystal = ({ delay, x, y, size, color }: { delay: number, x: number, y: number, size: number, color: string }) => {
    const colors = {
        cyan: 'bg-cyan-400',
        purple: 'bg-purple-400',
        pink: 'bg-pink-400'
    };

    return (
        <motion.div
            className={`absolute rounded-full blur-xl opacity-20 ${colors[color as keyof typeof colors]}`}
            style={{
                left: `${50 + x}%`,
                top: `${50 + y}%`,
                width: `${size}rem`,
                height: `${size}rem`,
            }}
            animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.1, 1],
            }}
            transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
        />
    )
}

const FeatureTag = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <div className="px-4 py-2 bg-white/5 border border-white/5 rounded-lg flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 hover:bg-white/10 hover:border-cyan-500/30 transition-all cursor-default">
        <Icon size={14} className="text-cyan-400" />
        {label}
    </div>
)

export default PrismLayout;
