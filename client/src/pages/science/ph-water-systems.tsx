import { Link } from 'wouter';
import {
    ArrowRight,
    Droplets,
    Beaker,
    Activity,
    Zap,
    Waves,
    Layers,
    Shield,
    ThermometerSun,
    Gauge,
    Scale,
    FlaskConical,
    TestTube,
    BookOpen,
    CircleDot,
    Sparkles
} from 'lucide-react';
import StandardPageLayout from '@/components/StandardPageLayout';
import { Card } from '@/components/ui/card';
import { FadeIn, StaggerContainer } from '@/components/animations';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { VideoBackground } from '@/components/SmartVideoEmbed';

// Animated pH Scale Component
function AnimatedPHScale() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const phColors = [
        { ph: 0, color: '#dc2626', label: 'Strong Acid' },
        { ph: 1, color: '#ea580c' },
        { ph: 2, color: '#f97316' },
        { ph: 3, color: '#fb923c' },
        { ph: 4, color: '#fbbf24' },
        { ph: 5, color: '#facc15' },
        { ph: 6, color: '#a3e635' },
        { ph: 7, color: '#22c55e', label: 'Neutral' },
        { ph: 8, color: '#14b8a6' },
        { ph: 9, color: '#06b6d4' },
        { ph: 10, color: '#0ea5e9' },
        { ph: 11, color: '#3b82f6' },
        { ph: 12, color: '#6366f1' },
        { ph: 13, color: '#8b5cf6' },
        { ph: 14, color: '#a855f7', label: 'Strong Base' }
    ];

    return (
        <div ref={ref} className="relative py-8">
            {/* pH Scale Bar */}
            <div className="relative h-16 rounded-full overflow-hidden shadow-2xl border border-white/10">
                <div className="absolute inset-0 flex">
                    {phColors.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ scaleY: 0 }}
                            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                            style={{ backgroundColor: item.color }}
                            className="flex-1 origin-bottom"
                        />
                    ))}
                </div>
                {/* Glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/20" />
            </div>

            {/* pH Numbers */}
            <div className="flex justify-between mt-4 px-2">
                {[0, 7, 14].map((ph) => (
                    <motion.div
                        key={ph}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 0.5 + ph * 0.05, duration: 0.3 }}
                        className="text-center"
                    >
                        <span className="text-2xl font-bold text-white">{ph}</span>
                        <div className="text-xs text-slate-400">
                            {ph === 0 && 'Acidic'}
                            {ph === 7 && 'Neutral'}
                            {ph === 14 && 'Alkaline'}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Logarithmic explanation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-8 grid grid-cols-3 gap-4 text-center"
            >
                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <span className="text-2xl font-mono text-orange-400">pH 6</span>
                    <p className="text-xs text-slate-400 mt-1">10× more acidic than pH 7</p>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span className="text-2xl font-mono text-green-400">pH 7</span>
                    <p className="text-xs text-slate-400 mt-1">Neutral baseline</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <span className="text-2xl font-mono text-blue-400">pH 8</span>
                    <p className="text-xs text-slate-400 mt-1">10× more alkaline than pH 7</p>
                </div>
            </motion.div>
        </div>
    );
}

// Animated Water Type Comparison
function WaterTypeComparison() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const waterTypes = [
        { name: 'Rainwater', ph: 5.5, phEnd: 6.5, color: 'from-yellow-500 to-lime-500', desc: 'Slightly acidic from CO₂' },
        { name: 'Mountain Spring', ph: 6.5, phEnd: 8.5, color: 'from-lime-500 to-cyan-500', desc: 'Mineral-balanced' },
        { name: 'Ocean Water', ph: 8.0, phEnd: 8.2, color: 'from-cyan-500 to-blue-500', desc: 'Buffered by carbonates' },
        { name: 'Tap Water', ph: 6.5, phEnd: 8.5, color: 'from-emerald-500 to-teal-500', desc: 'Regulated for pipes' }
    ];

    return (
        <div ref={ref} className="space-y-6">
            {waterTypes.map((water, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="group"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <span className="text-white font-medium w-40">{water.name}</span>
                        <div className="flex-1 h-8 bg-slate-900/80 rounded-full overflow-hidden relative border border-white/10">
                            {/* Background scale */}
                            <div className="absolute inset-0 flex opacity-20">
                                {Array.from({ length: 14 }).map((_, j) => (
                                    <div key={j} className="flex-1 border-r border-white/10" />
                                ))}
                            </div>
                            {/* pH Range Bar */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={isInView ? {
                                    width: `${((water.phEnd - water.ph) / 14) * 100}%`,
                                    left: `${(water.ph / 14) * 100}%`
                                } : { width: 0 }}
                                transition={{ delay: i * 0.15 + 0.3, duration: 0.6, ease: "easeOut" }}
                                className={`absolute h-full bg-gradient-to-r ${water.color} rounded-full shadow-lg`}
                                style={{ left: `${(water.ph / 14) * 100}%` }}
                            />
                        </div>
                        <span className="text-sm font-mono text-slate-400 w-24 text-right">
                            {water.ph}–{water.phEnd}
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 ml-44">{water.desc}</p>
                </motion.div>
            ))}
        </div>
    );
}

// Three Signals Visualization
function ThreeSignalsViz() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className="relative">
            {/* Central Connection */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 0.3 } : { scale: 0, opacity: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/20 via-amber-500/20 to-violet-500/20 blur-3xl"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {/* pH */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    <Card className="p-8 bg-gradient-to-br from-cyan-900/30 via-slate-900 to-slate-900 border border-cyan-500/20 hover:border-cyan-500/40 transition-all h-full group">
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                        >
                            <Scale className="w-8 h-8 text-cyan-400" />
                        </motion.div>
                        <h3 className="text-xl font-medium text-cyan-400 mb-3">pH</h3>
                        <p className="text-sm text-slate-400 mb-4">Acid/Base Balance</p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Reflects how willing water is to donate or accept protons (H⁺). The position on the 0–14 scale.
                        </p>
                        <div className="mt-6 pt-4 border-t border-white/5">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-orange-400">Acidic</span>
                                <div className="flex-1 h-1 mx-2 rounded-full bg-gradient-to-r from-orange-500 via-green-500 to-blue-500" />
                                <span className="text-blue-400">Alkaline</span>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* ORP */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <Card className="p-8 bg-gradient-to-br from-amber-900/30 via-slate-900 to-slate-900 border border-amber-500/20 hover:border-amber-500/40 transition-all h-full group">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                        >
                            <Zap className="w-8 h-8 text-amber-400" />
                        </motion.div>
                        <h3 className="text-xl font-medium text-amber-400 mb-3">ORP</h3>
                        <p className="text-sm text-slate-400 mb-4">Oxidation-Reduction Potential</p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Measures how oxidizing or reducing water is. Positive → takes electrons. Negative → gives electrons.
                        </p>
                        <div className="mt-6 pt-4 border-t border-white/5">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-rose-400">−mV</span>
                                <div className="flex-1 h-1 mx-2 rounded-full bg-gradient-to-r from-rose-500 via-slate-500 to-amber-500" />
                                <span className="text-amber-400">+mV</span>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* EC */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <Card className="p-8 bg-gradient-to-br from-violet-900/30 via-slate-900 to-slate-900 border border-violet-500/20 hover:border-violet-500/40 transition-all h-full group">
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-6 group-hover:bg-violet-500/20 transition-colors shadow-[0_0_30px_rgba(139,92,246,0.2)]"
                        >
                            <Activity className="w-8 h-8 text-violet-400" />
                        </motion.div>
                        <h3 className="text-xl font-medium text-violet-400 mb-3">Conductivity</h3>
                        <p className="text-sm text-slate-400 mb-4">Electrical Conductivity (EC)</p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Measures how well water conducts electricity. Higher EC = more dissolved ions in the water.
                        </p>
                        <div className="mt-6 pt-4 border-t border-white/5">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500">Low</span>
                                <div className="flex-1 h-1 mx-2 rounded-full bg-gradient-to-r from-slate-700 to-violet-500" />
                                <span className="text-violet-400">High</span>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Connection Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-12 text-center"
            >
                <p className="text-amber-200/80 italic max-w-2xl mx-auto">
                    Together: pH shows acid–base balance, ORP shows the electron story, EC shows how many ionic players are in the game.
                </p>
            </motion.div>
        </div>
    );
}

// Floating Molecule Animation
function FloatingMolecule({ className, delay = 0 }: { className?: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: [0.1, 0.3, 0.1],
                y: [0, -20, 0],
                rotate: [0, 180, 360]
            }}
            transition={{
                repeat: Infinity,
                duration: 8,
                delay,
                ease: "easeInOut"
            }}
            className={className}
        >
            <div className="relative">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 blur-sm" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-400/40" />
            </div>
        </motion.div>
    );
}

export default function PHWaterSystemsPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

    return (
        <StandardPageLayout
            title={<>pH in Water Systems – <span className="text-cyan-400">Acids, Bases & Balance</span></>}
            subtitle="Understanding the living signal of how water interacts with minerals, gases and life"
            heroVariant="cyan"
            heroIcon={Beaker}
            backgroundElement={<VideoBackground keywords={["water", "pure", "blue", "clean", "chemistry"]} overlayOpacity={0.35} />}
            seoTitle="pH in Water Systems – Acids, Bases & Balance | Andara Science"
            seoDescription="Explore pH beyond the simple school concept. Understand how acids, bases and buffers shape water quality, and how pH relates to ORP, conductivity and mineral balance."
        >
            <div ref={containerRef} className="relative">
                {/* Floating Background Elements */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <FloatingMolecule className="absolute top-1/4 left-1/4" delay={0} />
                    <FloatingMolecule className="absolute top-1/3 right-1/4" delay={2} />
                    <FloatingMolecule className="absolute bottom-1/4 left-1/3" delay={4} />
                    <FloatingMolecule className="absolute top-2/3 right-1/3" delay={6} />
                </div>

                {/* SECTION 1: WHY pH MATTERS */}
                <section className="py-24 bg-gradient-to-b from-[#0a0c14] to-[#05060b] relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 text-center">
                                Why pH Is <span className="andara-text-gold-gradient">More Than Just a Number</span> on a Strip
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent w-32 mx-auto mb-10" />
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <p className="text-lg text-slate-300 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                                Most people meet pH as a colored strip in chemistry class.<br />
                                <span className="text-orange-400">Red</span> = acidic, <span className="text-blue-400">Blue</span> = alkaline, <span className="text-green-400">Green</span> = neutral.
                            </p>
                        </FadeIn>

                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
                                <Waves className="w-8 h-8 text-cyan-500 mb-4" />
                                <p className="text-sm text-slate-300">pH is a <strong className="text-white">living signal</strong> of how water interacts with minerals, gases, surfaces and life</p>
                            </Card>
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/40 transition-all duration-300 shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1">
                                <Activity className="w-8 h-8 text-amber-500 mb-4" />
                                <p className="text-sm text-slate-300">It influences <strong className="text-white">corrosion vs. scaling</strong>, taste, and how ORP and conductivity behave</p>
                            </Card>
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-violet-500/40 transition-all duration-300 shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1">
                                <Scale className="w-8 h-8 text-violet-500 mb-4" />
                                <p className="text-sm text-slate-300">It's not "good/bad" – it's <strong className="text-white">context</strong>: where is this water on its journey?</p>
                            </Card>
                        </StaggerContainer>

                        <FadeIn delay={0.3}>
                            <div className="p-6 bg-slate-900/40 border border-white/5 rounded-xl text-center max-w-2xl mx-auto">
                                <p className="text-amber-200/80 italic">
                                    No pH dogma, no "higher is always better".<br />
                                    Just understanding how acids, bases and buffers shape the water you drink.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 2: WHAT pH MEASURES */}
                <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/hex-grid-bg.svg')] opacity-[0.02] bg-repeat pointer-events-none" />
                    <div className="container px-4 max-w-5xl mx-auto relative">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                What pH <span className="andara-text-gold-gradient">Actually Measures</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent w-24 mx-auto mb-6" />
                            <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
                                pH measures how many free hydrogen ions (H⁺) are active in water.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <AnimatedPHScale />
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <div className="mt-16 max-w-3xl mx-auto">
                                <h3 className="text-xl font-medium text-white mb-6 text-center">The Deeper View: Activity, Not Just "Acid vs Alkali"</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { title: 'Dissolved Gases', desc: 'CO₂ creating carbonic acid', icon: Wind, color: 'cyan' },
                                        { title: 'Minerals', desc: 'Bicarbonates, sulfates, chlorides', icon: Layers, color: 'amber' },
                                        { title: 'Organic Acids', desc: 'From soil, plants, microbes', icon: Leaf, color: 'emerald' }
                                    ].map((item, i) => (
                                        <Card key={i} className={`p-4 bg-slate-900/60 border border-white/5 hover:border-${item.color}-500/30 transition-all text-center`}>
                                            <item.icon className={`w-6 h-6 text-${item.color}-500 mx-auto mb-2`} />
                                            <h4 className="font-medium text-white text-sm mb-1">{item.title}</h4>
                                            <p className="text-xs text-slate-500">{item.desc}</p>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 3: TYPICAL pH RANGES */}
                <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                Typical pH Ranges in <span className="andara-text-gold-gradient">Natural & Treated Waters</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <WaterTypeComparison />
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <div className="mt-12 p-6 bg-gradient-to-br from-emerald-900/20 via-slate-900 to-slate-900 border border-emerald-500/20 rounded-xl max-w-3xl mx-auto">
                                <p className="text-center text-slate-300">
                                    <strong className="text-emerald-300">The Important Pattern:</strong><br />
                                    Healthy natural waters usually live in the middle, somewhere between mildly acidic and mildly alkaline – <span className="text-white">not at extreme ends</span>.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 4: BUFFERS */}
                <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                pH, Minerals & Buffering – <span className="andara-text-gold-gradient">The Quiet Stabilizers</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <FadeIn>
                                <Card className="p-8 bg-slate-900/60 backdrop-blur-xl border border-white/5 h-full">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Shield className="w-8 h-8 text-cyan-500" />
                                        <h3 className="text-xl font-medium text-white">Buffers: The Shock Absorbers</h3>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                        A buffer is a combination of a weak acid and its conjugate base that resists pH change.
                                    </p>
                                    <ul className="space-y-3 text-sm text-slate-400">
                                        <li className="flex items-start gap-2">
                                            <CircleDot className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                                            <span><strong className="text-white">Bicarbonate/Carbonate</strong> – from calcium, magnesium</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CircleDot className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                                            <span><strong className="text-white">Phosphate buffers</strong> – important in biology</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CircleDot className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                                            <span><strong className="text-white">Organic acids</strong> – and their salts</span>
                                        </li>
                                    </ul>
                                </Card>
                            </FadeIn>

                            <FadeIn delay={0.1}>
                                <Card className="p-8 bg-gradient-to-br from-amber-900/20 via-slate-900 to-slate-900 border border-amber-500/20 h-full">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Sparkles className="w-8 h-8 text-amber-500" />
                                        <h3 className="text-xl font-medium text-white">Where Sulfate Fits In</h3>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                        Sulfate (SO₄²⁻) is a strong-acid anion. In drinking water ranges, it doesn't buffer pH strongly like bicarbonate.
                                    </p>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Its role is more about <strong className="text-amber-200">charge balance</strong>, <strong className="text-amber-200">metal interactions</strong>, and <strong className="text-amber-200">structuring interfaces</strong>.
                                    </p>
                                    <div className="mt-6 p-4 bg-slate-900/60 rounded-lg border border-white/5">
                                        <p className="text-xs text-slate-500 italic">
                                            In structured, mineral-rich water: pH is held stable by bicarbonate, while sulfate contributes to clarification and charge distribution.
                                        </p>
                                    </div>
                                </Card>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* SECTION 5: THREE SIGNALS */}
                <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-6xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                pH, ORP & Conductivity – <span className="andara-text-gold-gradient">Three Signals, One Story</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-6" />
                            <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
                                pH never speaks alone. To understand water, you look at three main signals together.
                            </p>
                        </FadeIn>

                        <ThreeSignalsViz />
                    </div>
                </section>

                {/* SECTION 6: pH IN YOUR GLASS */}
                <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-4xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                pH in Your Glass – <span className="andara-text-gold-gradient">What to Look For</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <Card className="p-8 bg-gradient-to-br from-emerald-900/10 via-slate-900 to-emerald-900/10 border border-emerald-500/20 mb-10">
                                <div className="text-center mb-8">
                                    <span className="text-4xl font-mono text-emerald-400">pH 6.5 – 8.5</span>
                                    <p className="text-sm text-slate-400 mt-2">Recommended range for everyday drinking water</p>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-4 bg-slate-900/50 rounded-lg border border-white/5">
                                        <p className="text-sm text-slate-500 mb-2">Avoids:</p>
                                        <p className="text-white"><strong>Corrosion</strong> (too acidic)</p>
                                    </div>
                                    <div className="p-4 bg-slate-900/50 rounded-lg border border-white/5">
                                        <p className="text-sm text-slate-500 mb-2">Avoids:</p>
                                        <p className="text-white"><strong>Mineral crust</strong> (too alkaline)</p>
                                    </div>
                                </div>
                            </Card>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FadeIn delay={0.2}>
                                <Card className="p-6 bg-orange-900/10 border border-orange-500/20">
                                    <h3 className="text-orange-400 font-medium mb-4">Very Low pH (Strongly Acidic)</h3>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li>• Metallic or sour taste</li>
                                        <li>• Higher risk of pipe corrosion</li>
                                    </ul>
                                </Card>
                            </FadeIn>
                            <FadeIn delay={0.3}>
                                <Card className="p-6 bg-blue-900/10 border border-blue-500/20">
                                    <h3 className="text-blue-400 font-medium mb-4">Very High pH (Strongly Alkaline)</h3>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li>• "Soapy" or chalky taste</li>
                                        <li>• May leave white deposits</li>
                                    </ul>
                                </Card>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* SECTION 7: ANDARA CONNECTION */}
                <section className="py-16 bg-[#05060b] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-3xl mx-auto">
                        <FadeIn>
                            <Card className="p-8 bg-slate-900/60 backdrop-blur-xl border border-amber-500/20 rounded-xl">
                                <div className="flex items-start gap-4">
                                    <Beaker className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-medium text-white mb-4">How This Connects to Andara Ionic</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                            Within the Andara Ionic ecosystem, pH is treated as a <strong className="text-white">neutral, measurable parameter</strong> – not a marketing promise.
                                        </p>
                                        <p className="text-amber-200/80 italic text-sm">
                                            "pH is one important signal among several. In the Andara perspective, clarity, structure and mineral harmony matter at least as much as chasing a single number on a scale."
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 8: CROSS-LINKS */}
                <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                Explore the <span className="andara-text-gold-gradient">Science Library</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: 'ORP & Redox Basics', desc: 'The electron/oxidation side of the story', href: '/science/orp-redox', icon: Zap, color: 'amber' },
                                { title: 'pH, ORP & Conductivity', desc: 'The full diagnostic panel', href: '/science/ph-orp-ec', icon: Gauge, color: 'cyan' },
                                { title: 'Structured Water Basics', desc: 'How structure and pH interact', href: '/science/water-science-master', icon: Waves, color: 'violet' },
                                { title: 'Natural vs Treated Waters', desc: 'Compare pH and mineral patterns', href: '/science/springs', icon: Droplets, color: 'emerald' }
                            ].map((link, i) => (
                                <FadeIn key={i} delay={i * 0.1}>
                                    <Link href={link.href}>
                                        <Card className={`p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-${link.color}-500/40 transition-all cursor-pointer group`}>
                                            <div className="flex items-center gap-4">
                                                <link.icon className={`w-8 h-8 text-${link.color}-500 group-hover:scale-110 transition-transform`} />
                                                <div>
                                                    <h3 className="font-medium text-white mb-1">{link.title}</h3>
                                                    <p className="text-sm text-slate-400">{link.desc}</p>
                                                </div>
                                                <ArrowRight className={`w-5 h-5 text-${link.color}-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity`} />
                                            </div>
                                        </Card>
                                    </Link>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </StandardPageLayout>
    );
}

// Missing Wind and Leaf imports - adding them
const Wind = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
        <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
        <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
);

const Leaf = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
);
