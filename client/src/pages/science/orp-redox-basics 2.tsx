import { Link } from 'wouter';
import {
    ArrowRight,
    Zap,
    Activity,
    Waves,
    Scale,
    CircleDot,
    Gauge,
    Droplets,
    FlaskConical,
    Shield,
    Sparkles,
    TrendingUp,
    TrendingDown,
    Minus,
    Plus,
    Timer,
    BookOpen,
    CheckCircle,
    AlertTriangle,
    Thermometer
} from 'lucide-react';
import StandardPageLayout from '@/components/StandardPageLayout';
import { Card } from '@/components/ui/card';
import { FadeIn, StaggerContainer } from '@/components/animations';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Animated ORP Scale Component
function AnimatedORPScale() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [currentMV, setCurrentMV] = useState(0);

    useEffect(() => {
        if (isInView) {
            const interval = setInterval(() => {
                setCurrentMV(prev => {
                    if (prev < 200) return prev + 10;
                    return prev;
                });
            }, 30);
            return () => clearInterval(interval);
        }
    }, [isInView]);

    return (
        <div ref={ref} className="relative py-8">
            {/* ORP Scale Bar */}
            <div className="relative h-20 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900/80">
                {/* Gradient Background */}
                <div className="absolute inset-0 flex">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: '50%' } : { width: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-violet-600 via-blue-500 to-emerald-500"
                    />
                    <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: '50%' } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500"
                    />
                </div>

                {/* Center Line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                />

                {/* Animated Indicator */}
                <motion.div
                    initial={{ left: '50%' }}
                    animate={isInView ? { left: '65%' } : { left: '50%' }}
                    transition={{ delay: 1.5, duration: 1, type: "spring" }}
                    className="absolute top-2 bottom-2 w-1 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900 border border-white/20 text-sm font-mono text-white whitespace-nowrap">
                        +{currentMV} mV
                    </div>
                </motion.div>

                {/* Labels */}
                <div className="absolute inset-0 flex items-center justify-between px-6 text-white/60 text-sm font-medium">
                    <span className="flex items-center gap-2">
                        <Minus className="w-4 h-4 text-violet-400" />
                        Reducing
                    </span>
                    <span className="flex items-center gap-2">
                        Oxidizing
                        <Plus className="w-4 h-4 text-rose-400" />
                    </span>
                </div>
            </div>

            {/* mV Markers */}
            <div className="flex justify-between mt-4 px-4">
                {['-400 mV', '-200 mV', '0 mV', '+200 mV', '+400 mV'].map((label, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="text-xs font-mono text-slate-500"
                    >
                        {label}
                    </motion.span>
                ))}
            </div>

            {/* Explanation Cards */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.5 }}
                className="mt-10 grid grid-cols-2 gap-6"
            >
                <Card className="p-6 bg-gradient-to-br from-violet-900/20 via-slate-900 to-slate-900 border border-violet-500/20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                            <TrendingDown className="w-5 h-5 text-violet-400" />
                        </div>
                        <div>
                            <h4 className="font-medium text-violet-400">Negative ORP ( – mV )</h4>
                            <p className="text-xs text-slate-500">Reducing environment</p>
                        </div>
                    </div>
                    <p className="text-sm text-slate-400">
                        Water tends to <strong className="text-violet-300">donate electrons</strong> to substances. Higher presence of electron-donating species.
                    </p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-rose-900/20 via-slate-900 to-slate-900 border border-rose-500/20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-rose-400" />
                        </div>
                        <div>
                            <h4 className="font-medium text-rose-400">Positive ORP ( + mV )</h4>
                            <p className="text-xs text-slate-500">Oxidizing environment</p>
                        </div>
                    </div>
                    <p className="text-sm text-slate-400">
                        Water tends to <strong className="text-rose-300">take electrons</strong> from substances. Strong oxidizing chemistry.
                    </p>
                </Card>
            </motion.div>
        </div>
    );
}

// Animated See-Saw Visualization
function RedoxSeeSaw() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [tilt, setTilt] = useState(0);

    useEffect(() => {
        if (isInView) {
            const interval = setInterval(() => {
                setTilt(prev => Math.sin(Date.now() / 1000) * 15);
            }, 50);
            return () => clearInterval(interval);
        }
    }, [isInView]);

    return (
        <div ref={ref} className="relative py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                className="relative max-w-lg mx-auto"
            >
                {/* Fulcrum */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[40px] border-l-transparent border-r-transparent border-b-amber-500/50" />

                {/* See-Saw Board */}
                <motion.div
                    style={{ rotate: tilt }}
                    className="relative h-16 bg-gradient-to-r from-violet-500/30 via-slate-700 to-rose-500/30 rounded-full border border-white/10 shadow-2xl origin-center"
                >
                    {/* Left Side - Reducing */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-12 h-12 rounded-full bg-violet-500/30 border border-violet-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                        >
                            <Minus className="w-6 h-6 text-violet-400" />
                        </motion.div>
                        <span className="text-xs text-violet-300 font-medium">e⁻ donors</span>
                    </div>

                    {/* Right Side - Oxidizing */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <span className="text-xs text-rose-300 font-medium">e⁻ takers</span>
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                            className="w-12 h-12 rounded-full bg-rose-500/30 border border-rose-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                        >
                            <Plus className="w-6 h-6 text-rose-400" />
                        </motion.div>
                    </div>

                    {/* Center Pivot */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
                </motion.div>

                {/* Caption */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-8 text-sm text-slate-400"
                >
                    The mV reading shows who is <span className="text-amber-400">"winning"</span> at this moment
                </motion.p>
            </motion.div>

            {/* Definition Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 }}
                className="mt-12 grid grid-cols-2 gap-6 max-w-2xl mx-auto"
            >
                <Card className="p-5 bg-slate-900/60 border border-violet-500/20 text-center">
                    <h4 className="text-violet-400 font-medium mb-2">Oxidation</h4>
                    <p className="text-sm text-slate-400">Losing electrons</p>
                    <p className="text-xs text-slate-500 mt-2">Fe²⁺ → Fe³⁺ + e⁻</p>
                </Card>
                <Card className="p-5 bg-slate-900/60 border border-rose-500/20 text-center">
                    <h4 className="text-rose-400 font-medium mb-2">Reduction</h4>
                    <p className="text-sm text-slate-400">Gaining electrons</p>
                    <p className="text-xs text-slate-500 mt-2">O₂ + 4e⁻ → 2O²⁻</p>
                </Card>
            </motion.div>
        </div>
    );
}

// Animated Electron Particle
function ElectronParticle({ delay = 0 }: { delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{
                opacity: [0, 1, 1, 0],
                x: [-100, 0, 100, 200]
            }}
            transition={{
                repeat: Infinity,
                duration: 4,
                delay,
                ease: "linear"
            }}
            className="absolute"
        >
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
        </motion.div>
    );
}

// Water Context Cards
function WaterContextCards() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const contexts = [
        {
            title: 'Freshly Chlorinated Water',
            orp: 'High positive ORP',
            desc: 'Strong oxidizing environment, designed for disinfection',
            color: 'rose',
            icon: AlertTriangle
        },
        {
            title: 'Natural Spring Water',
            orp: 'Moderate ORP',
            desc: 'Balance of oxidizing and reducing influences from rock minerals',
            color: 'emerald',
            icon: Droplets
        },
        {
            title: 'Conditioned Water',
            orp: 'Variable ORP',
            desc: 'May shift depending on treatment processes and mineral content',
            color: 'amber',
            icon: FlaskConical
        }
    ];

    return (
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contexts.map((ctx, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                    <Card className={`p-6 bg-gradient-to-br from-${ctx.color}-900/20 via-slate-900 to-slate-900 border border-${ctx.color}-500/20 hover:border-${ctx.color}-500/40 transition-all h-full group`}>
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={`w-12 h-12 rounded-xl bg-${ctx.color}-500/10 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(var(--${ctx.color}-rgb),0.2)]`}
                        >
                            <ctx.icon className={`w-6 h-6 text-${ctx.color}-500`} />
                        </motion.div>
                        <h3 className="font-medium text-white mb-2">{ctx.title}</h3>
                        <p className={`text-sm text-${ctx.color}-400 mb-3`}>{ctx.orp}</p>
                        <p className="text-xs text-slate-500">{ctx.desc}</p>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}

export default function ORPRedoxBasicsPage() {
    const containerRef = useRef(null);

    return (
        <StandardPageLayout
            title={<>ORP & Redox Basics – <span className="text-amber-400">Oxidation–Reduction in Water</span></>}
            subtitle="Understanding the electron mood of water"
            heroVariant="amber"
            heroIcon={Zap}
            seoTitle="ORP & Redox Basics – Oxidation-Reduction in Water | Andara Science"
            seoDescription="Learn about ORP (Oxidation-Reduction Potential) in water systems. Understand how electron exchange shapes water chemistry and relates to pH and conductivity."
        >
            <div ref={containerRef} className="relative">
                {/* Floating Electrons Background */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <div className="absolute top-1/4 left-0 w-full h-8">
                        <ElectronParticle delay={0} />
                        <ElectronParticle delay={1.5} />
                        <ElectronParticle delay={3} />
                    </div>
                    <div className="absolute top-2/3 left-0 w-full h-8">
                        <ElectronParticle delay={0.5} />
                        <ElectronParticle delay={2} />
                    </div>
                </div>

                {/* SECTION 1: WHY ORP MATTERS */}
                <section className="py-24 bg-gradient-to-b from-[#0a0c14] to-[#05060b] relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 text-center">
                                Why ORP Is the <span className="andara-text-gold-gradient">"Electron Mood"</span> of Water
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-32 mx-auto mb-10" />
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <p className="text-lg text-slate-300 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                                Most people know pH – <span className="text-amber-400">almost nobody knows ORP</span>.
                            </p>
                        </FadeIn>

                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/40 transition-all duration-300 shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1">
                                <Zap className="w-8 h-8 text-amber-500 mb-4" />
                                <p className="text-sm text-slate-300">Tells you whether water tends to <strong className="text-white">take or give electrons</strong></p>
                            </Card>
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
                                <Activity className="w-8 h-8 text-cyan-500 mb-4" />
                                <p className="text-sm text-slate-300">Shows how <strong className="text-white">"spent" or "charged"</strong> the redox chemistry is</p>
                            </Card>
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-violet-500/40 transition-all duration-300 shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1">
                                <Gauge className="w-8 h-8 text-violet-500 mb-4" />
                                <p className="text-sm text-slate-300">With pH and conductivity, reveals <strong className="text-white">water's hidden inner state</strong></p>
                            </Card>
                        </StaggerContainer>

                        <FadeIn delay={0.3}>
                            <div className="p-6 bg-slate-900/40 border border-white/5 rounded-xl text-center max-w-2xl mx-auto">
                                <p className="text-amber-200/80 italic">
                                    A basic feel for ORP lets you read water like a <span className="text-amber-400">weather map for electrons</span>.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 2: WHAT ORP MEASURES */}
                <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/hex-grid-bg.svg')] opacity-[0.02] bg-repeat pointer-events-none" />
                    <div className="container px-4 max-w-5xl mx-auto relative">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                What ORP <span className="andara-text-gold-gradient">Actually Measures</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-6" />
                            <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
                                ORP stands for <strong className="text-white">Oxidation–Reduction Potential</strong> and is measured in millivolts (mV).
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <AnimatedORPScale />
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 3: REDOX SEE-SAW */}
                <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-4xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                Oxidation & Reduction – <span className="andara-text-gold-gradient">The Electron Exchange</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-6" />
                            <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
                                Imagine ORP as the balance point on a see-saw between oxidizing and reducing forces.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <RedoxSeeSaw />
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 4: THREE SIGNALS */}
                <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                ORP, pH & Minerals – <span className="andara-text-gold-gradient">One Story, Three Signals</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-6" />
                            <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
                                ORP never acts alone. To understand water's redox mood, you look at three signals together.
                            </p>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'pH', desc: 'Acid/base balance (H⁺ vs OH⁻)', icon: Scale, color: 'cyan' },
                                { title: 'ORP', desc: 'Electron balance (oxidation vs reduction)', icon: Zap, color: 'amber' },
                                { title: 'Conductivity', desc: 'How many ions carry current', icon: Activity, color: 'violet' }
                            ].map((signal, i) => (
                                <FadeIn key={i} delay={i * 0.15}>
                                    <Card className={`p-8 bg-gradient-to-br from-${signal.color}-900/20 via-slate-900 to-slate-900 border border-${signal.color}-500/20 h-full text-center`}>
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className={`w-16 h-16 rounded-2xl bg-${signal.color}-500/10 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(var(--${signal.color}-rgb),0.2)]`}
                                        >
                                            <signal.icon className={`w-8 h-8 text-${signal.color}-500`} />
                                        </motion.div>
                                        <h3 className={`text-xl font-medium text-${signal.color}-400 mb-3`}>{signal.title}</h3>
                                        <p className="text-sm text-slate-400">{signal.desc}</p>
                                    </Card>
                                </FadeIn>
                            ))}
                        </div>

                        <FadeIn delay={0.5}>
                            <div className="mt-12 p-6 bg-slate-900/40 border border-white/5 rounded-xl max-w-3xl mx-auto">
                                <p className="text-center text-slate-400 text-sm">
                                    <strong className="text-white">Important:</strong> Two waters with the same pH can have <span className="text-amber-400">very different ORP</span>, depending on their minerals, gases and redox-active substances.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 5: WATER CONTEXTS */}
                <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                ORP in <span className="andara-text-gold-gradient">Different Water Contexts</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                        </FadeIn>

                        <WaterContextCards />

                        <FadeIn delay={0.4}>
                            <div className="mt-12 p-6 bg-gradient-to-r from-amber-900/10 via-slate-900 to-amber-900/10 border border-amber-500/20 rounded-xl max-w-3xl mx-auto">
                                <p className="text-center text-amber-200/80 italic">
                                    "Is this water chemically hungry for electrons, or does it have more electron-donating capacity right now?"
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 6: WHY ORP MATTERS */}
                <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                Why ORP Matters for <span className="andara-text-gold-gradient">Clarification & Stability</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    num: '1',
                                    title: 'Infrastructure',
                                    desc: 'Very oxidizing water can be corrosive to metals. Understanding ORP helps in choosing materials.',
                                    icon: Shield,
                                    color: 'cyan'
                                },
                                {
                                    num: '2',
                                    title: 'Mineral Transformations',
                                    desc: 'Some metals change form depending on redox state (Fe²⁺ ↔ Fe³⁺), affecting color and clarity.',
                                    icon: Sparkles,
                                    color: 'amber'
                                },
                                {
                                    num: '3',
                                    title: 'Treatment Processes',
                                    desc: 'Flocculation, filtration, and advanced treatments behave differently based on starting ORP.',
                                    icon: FlaskConical,
                                    color: 'violet'
                                }
                            ].map((item, i) => (
                                <FadeIn key={i} delay={i * 0.1}>
                                    <Card className={`p-6 bg-slate-900/60 border border-white/5 hover:border-${item.color}-500/30 transition-all h-full`}>
                                        <div className={`w-8 h-8 rounded-full bg-${item.color}-500/20 flex items-center justify-center mb-4`}>
                                            <span className={`text-${item.color}-400 font-bold`}>{item.num}</span>
                                        </div>
                                        <h3 className="font-medium text-white mb-3">{item.title}</h3>
                                        <p className="text-sm text-slate-400">{item.desc}</p>
                                    </Card>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 7: MEASURING ORP */}
                <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-4xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                Measuring ORP – <span className="andara-text-gold-gradient">Practical Basics</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <Card className="p-8 bg-slate-900/60 backdrop-blur-xl border border-white/5 mb-10">
                                <h3 className="text-lg font-medium text-white mb-6 text-center">Basic Steps</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { step: '1', label: 'Calibrate', desc: 'Per device manual', icon: CheckCircle },
                                        { step: '2', label: 'Rinse', desc: 'With clean water', icon: Droplets },
                                        { step: '3', label: 'Immerse', desc: 'Wait to stabilize', icon: Timer },
                                        { step: '4', label: 'Record', desc: 'mV + pH + temp', icon: BookOpen }
                                    ].map((s, i) => (
                                        <div key={i} className="text-center p-4 bg-slate-800/50 rounded-lg border border-white/5">
                                            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-3">
                                                <span className="text-amber-500 font-bold">{s.step}</span>
                                            </div>
                                            <h4 className="font-medium text-white mb-1">{s.label}</h4>
                                            <p className="text-xs text-slate-500">{s.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="p-6 bg-slate-900/40 border border-amber-500/20 rounded-xl">
                                <p className="text-center text-slate-400 text-sm">
                                    <strong className="text-amber-400">For best results:</strong> Log ORP over time alongside pH, Conductivity/TDS, visual clarity, and treatment steps to build your own water-terrain timeline.
                                </p>
                            </div>
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
                                { title: 'pH, ORP & Conductivity', desc: 'The full diagnostic panel', href: '/science/ph-orp-ec', icon: Gauge, color: 'cyan' },
                                { title: 'pH in Water Systems', desc: 'Acids, bases and balance', href: '/science/ph-water-systems', icon: Scale, color: 'amber' },
                                { title: 'Structured Water Basics', desc: 'How structure and redox interact', href: '/science/water-science-master', icon: Waves, color: 'violet' },
                                { title: 'Electrical Conductivity', desc: 'When water becomes an electrolyte', href: '/science/hydration-clusters', icon: Activity, color: 'emerald' }
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

                        <FadeIn delay={0.5}>
                            <p className="text-center text-slate-500 mt-12 max-w-2xl mx-auto text-sm">
                                Move from "ORP is just a strange meter number" toward understanding it as part of a multi-parameter language that water uses to show its inner balance of electrons, minerals and structure.
                            </p>
                        </FadeIn>
                    </div>
                </section>
            </div>
        </StandardPageLayout>
    );
}
