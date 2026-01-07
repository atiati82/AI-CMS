import { Link } from 'wouter';
import {
    ArrowRight,
    Waves,
    RotateCcw,
    Wind,
    Zap,
    Droplets,
    Sparkles,
    CircleDot,
    Hexagon,
    FlaskConical,
    Settings,
    Timer,
    Gauge,
    Box,
    Layers,
    XCircle,
    CheckCircle,
    Activity,
    Atom,
    ArrowUpRight,
    Target,
    Compass
} from 'lucide-react';
import StandardPageLayout from '@/components/StandardPageLayout';
import { Card } from '@/components/ui/card';
import { FadeIn, StaggerContainer } from '@/components/animations';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Animated Vortex Spiral Visualization
function AnimatedVortexSpiral() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className="relative h-80 flex items-center justify-center">
            {/* Outer spiral rings */}
            {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                    animate={isInView ? {
                        opacity: 0.3 - i * 0.05,
                        scale: 1,
                        rotate: 360
                    } : { opacity: 0, scale: 0.5, rotate: 0 }}
                    transition={{
                        duration: 20 + i * 5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.2
                    }}
                    className="absolute rounded-full border-2 border-cyan-400/30"
                    style={{
                        width: `${180 + i * 40}px`,
                        height: `${180 + i * 40}px`,
                    }}
                />
            ))}

            {/* Inner vortex core */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative z-10"
            >
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/40 via-blue-600/30 to-transparent border border-cyan-400/50 shadow-[0_0_40px_rgba(34,211,238,0.4)] flex items-center justify-center"
                >
                    <div className="w-8 h-8 rounded-full bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
                </motion.div>
            </motion.div>

            {/* Floating particles spiraling outward */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    initial={{ opacity: 0 }}
                    animate={isInView ? {
                        opacity: [0, 0.8, 0],
                        x: [0, Math.cos(i * 30 * Math.PI / 180) * 120],
                        y: [0, Math.sin(i * 30 * Math.PI / 180) * 120],
                        scale: [0.5, 1, 0.3]
                    } : { opacity: 0 }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.25,
                        ease: "easeOut"
                    }}
                    className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                />
            ))}
        </div>
    );
}

// Flow Types Comparison
function FlowTypesComparison() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const flowTypes = [
        {
            name: 'Laminar Flow',
            desc: 'Smooth, parallel layers',
            visual: 'straight',
            color: 'slate'
        },
        {
            name: 'Turbulent Flow',
            desc: 'Chaotic, random motion',
            visual: 'chaotic',
            color: 'rose'
        },
        {
            name: 'Vortex Flow',
            desc: 'Structured turbulence with pattern',
            visual: 'spiral',
            color: 'cyan'
        }
    ];

    return (
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {flowTypes.map((flow, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: i * 0.15 }}
                >
                    <Card className={`p-6 bg-slate-900/60 border border-${flow.color}-500/20 hover:border-${flow.color}-500/40 transition-all h-full text-center`}>
                        {/* Flow visualization */}
                        <div className="h-20 flex items-center justify-center mb-4 overflow-hidden">
                            {flow.visual === 'straight' && (
                                <div className="flex flex-col gap-2">
                                    {[0, 1, 2].map((j) => (
                                        <motion.div
                                            key={j}
                                            animate={{ x: [0, 60, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: j * 0.2 }}
                                            className="w-16 h-1 bg-slate-400 rounded-full"
                                        />
                                    ))}
                                </div>
                            )}
                            {flow.visual === 'chaotic' && (
                                <div className="relative w-20 h-16">
                                    {[0, 1, 2, 3, 4].map((j) => (
                                        <motion.div
                                            key={j}
                                            animate={{
                                                x: [Math.random() * 40, Math.random() * 40 - 20, Math.random() * 40],
                                                y: [Math.random() * 30, Math.random() * 30 - 15, Math.random() * 30],
                                            }}
                                            transition={{ duration: 1 + Math.random(), repeat: Infinity }}
                                            className="absolute w-2 h-2 bg-rose-400 rounded-full"
                                            style={{ left: Math.random() * 60, top: Math.random() * 50 }}
                                        />
                                    ))}
                                </div>
                            )}
                            {flow.visual === 'spiral' && (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="w-16 h-16 rounded-full border-2 border-cyan-400 border-t-transparent"
                                    style={{ borderWidth: '3px' }}
                                />
                            )}
                        </div>
                        <h4 className={`font-medium text-${flow.color}-400 mb-2`}>{flow.name}</h4>
                        <p className="text-sm text-slate-500">{flow.desc}</p>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}

// Nature Vortex Cards
function NatureVortexCards() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const examples = [
        { title: 'Rivers & Streams', desc: 'Spirals in bends, vortices behind rocks', icon: Waves, color: 'cyan' },
        { title: 'Weather Systems', desc: 'Cyclones, hurricanes, dust devils', icon: Wind, color: 'violet' },
        { title: 'Spiral Galaxies', desc: 'Cosmic-scale vortex patterns', icon: Sparkles, color: 'amber' }
    ];

    return (
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {examples.map((ex, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                    <Card className={`p-6 bg-gradient-to-br from-${ex.color}-900/20 via-slate-900 to-slate-900 border border-${ex.color}-500/20 hover:border-${ex.color}-500/40 transition-all h-full group`}>
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            className={`w-14 h-14 rounded-xl bg-${ex.color}-500/10 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(var(--${ex.color}-rgb),0.2)]`}
                        >
                            <ex.icon className={`w-7 h-7 text-${ex.color}-500`} />
                        </motion.div>
                        <h4 className={`font-medium text-${ex.color}-400 mb-2`}>{ex.title}</h4>
                        <p className="text-sm text-slate-400">{ex.desc}</p>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}

// Vortex Effects Cards (Particles, Gases, Charge)
function VortexEffectsCards() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const effects = [
        {
            title: 'Particle Sorting',
            desc: 'Spin nudges heavier particles outward, lighter phases inward. Supports clarification and turbidity reduction.',
            icon: CircleDot,
            color: 'cyan',
            animation: 'outward'
        },
        {
            title: 'Gas Exchange',
            desc: 'More interface between water and air. Micro-bubbles form and collapse, enabling gas exchange.',
            icon: Droplets,
            color: 'violet',
            animation: 'bubbles'
        },
        {
            title: 'Charge Separation',
            desc: 'Flow along surfaces creates streaming potentials. Micro-regions of different charge and ordering emerge.',
            icon: Zap,
            color: 'amber',
            animation: 'charge'
        }
    ];

    return (
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {effects.map((effect, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ delay: i * 0.15 }}
                >
                    <Card className={`p-6 bg-slate-900/60 border border-${effect.color}-500/20 hover:border-${effect.color}-500/40 transition-all h-full group`}>
                        <div className="flex items-start gap-4">
                            <motion.div
                                whileHover={{ rotate: 15 }}
                                animate={effect.animation === 'outward' ? { scale: [1, 1.1, 1] } :
                                    effect.animation === 'bubbles' ? { y: [0, -5, 0] } :
                                        { rotate: [0, 5, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className={`w-12 h-12 rounded-lg bg-${effect.color}-500/10 flex items-center justify-center shrink-0`}
                            >
                                <effect.icon className={`w-6 h-6 text-${effect.color}-500`} />
                            </motion.div>
                            <div>
                                <h4 className={`font-medium text-${effect.color}-400 mb-2`}>{effect.title}</h4>
                                <p className="text-sm text-slate-400">{effect.desc}</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}

// Technology Types Cards
function TechnologyTypesCards() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const types = [
        {
            title: 'Inline Vortex Pipes',
            desc: 'Curved segments, constrictions, or internal guides. Create short, intense zones of spiral motion.',
            icon: Box,
            color: 'cyan'
        },
        {
            title: 'Vortex Chambers',
            desc: 'Cones, egg-shapes, or torus-like vessels. Water swirls and forms a visible central funnel.',
            icon: FlaskConical,
            color: 'amber'
        },
        {
            title: 'Counter-Rotating',
            desc: 'Two vortices spinning in opposite directions. Complex patterns where flows meet and interfere.',
            icon: RotateCcw,
            color: 'violet'
        }
    ];

    return (
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {types.map((type, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.15, type: "spring" }}
                >
                    <Card className={`p-6 bg-gradient-to-br from-${type.color}-900/10 via-slate-900 to-slate-900 border border-${type.color}-500/20 hover:border-${type.color}-500/40 transition-all h-full text-center group`}>
                        <motion.div
                            whileHover={{ scale: 1.15, rotate: type.title.includes('Counter') ? 180 : 10 }}
                            transition={{ type: "spring" }}
                            className={`w-16 h-16 mx-auto rounded-xl bg-${type.color}-500/10 flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(var(--${type.color}-rgb),0.15)]`}
                        >
                            <type.icon className={`w-8 h-8 text-${type.color}-500`} />
                        </motion.div>
                        <h4 className={`font-medium text-${type.color}-400 mb-3`}>{type.title}</h4>
                        <p className="text-sm text-slate-400">{type.desc}</p>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}

// Parameters Timeline
function ParametersTimeline() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const params = [
        { label: 'Flow Rate', icon: Gauge, desc: 'Fast vs gentle' },
        { label: 'Pressure', icon: Activity, desc: 'Enough to spin' },
        { label: 'Geometry', icon: Hexagon, desc: 'Angles & shapes' },
        { label: 'Duration', icon: Timer, desc: 'Time in vortex' },
        { label: 'Repetition', icon: RotateCcw, desc: 'Multiple stages' }
    ];

    return (
        <div ref={ref} className="relative">
            {/* Connecting line */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/30 via-amber-500/30 to-violet-500/30 origin-left hidden md:block"
            />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {params.map((param, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.3 + i * 0.15 }}
                        className="text-center relative z-10"
                    >
                        <div className="w-14 h-14 mx-auto rounded-full bg-slate-800 border border-cyan-500/30 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                            <param.icon className="w-6 h-6 text-cyan-400" />
                        </div>
                        <h4 className="font-medium text-white text-sm mb-1">{param.label}</h4>
                        <p className="text-xs text-slate-500">{param.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// Triad Diagram (Minerals, Vortex, Geometry)
function TriadDiagram() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [glowIndex, setGlowIndex] = useState(0);

    useEffect(() => {
        if (isInView) {
            const interval = setInterval(() => {
                setGlowIndex((prev) => (prev + 1) % 3);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isInView]);

    const corners = [
        { label: 'Minerals', icon: FlaskConical, color: 'amber', x: 50, y: 10 },
        { label: 'Vortex Motion', icon: RotateCcw, color: 'cyan', x: 10, y: 85 },
        { label: 'Geometry', icon: Hexagon, color: 'violet', x: 90, y: 85 }
    ];

    return (
        <div ref={ref} className="relative h-80 max-w-md mx-auto">
            {/* Triangle lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                <motion.path
                    d="M50,15 L15,80 L85,80 Z"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                />
            </svg>

            {/* Corner nodes */}
            {corners.map((corner, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
                    className="absolute"
                    style={{ left: `${corner.x}%`, top: `${corner.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                    <motion.div
                        animate={glowIndex === i ? {
                            boxShadow: `0 0 30px rgba(var(--${corner.color}-rgb), 0.6)`,
                            scale: 1.1
                        } : {
                            boxShadow: `0 0 10px rgba(var(--${corner.color}-rgb), 0.2)`,
                            scale: 1
                        }}
                        transition={{ duration: 0.5 }}
                        className={`w-16 h-16 rounded-xl bg-${corner.color}-500/10 border border-${corner.color}-500/30 flex items-center justify-center`}
                    >
                        <corner.icon className={`w-7 h-7 text-${corner.color}-500`} />
                    </motion.div>
                    <p className={`text-xs text-${corner.color}-400 text-center mt-2 font-medium`}>{corner.label}</p>
                </motion.div>
            ))}

            {/* Center droplet */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4"
            >
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-cyan-400/20 border border-white/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                    <Droplets className="w-5 h-5 text-white" />
                </motion.div>
            </motion.div>
        </div>
    );
}

export default function VortexTechnologiesPage() {
    const containerRef = useRef(null);

    return (
        <StandardPageLayout
            title={<>Vortex Technologies – <span className="text-cyan-400">Spin, Flow & Structure</span></>}
            subtitle="How spiral motion reshapes water behavior"
            heroVariant="cyan"
            heroIcon={RotateCcw}
            seoTitle="Vortex Technologies – How Spin & Flow Reshape Water"
            seoDescription="Discover how vortex technologies use spiral flow, spin and geometry to clarify, condition and structure water, inspired by rivers, springs and natural motion."
        >
            <div ref={containerRef} className="relative">

                {/* SECTION 1: HERO EXTENSION */}
                <section className="py-24 bg-gradient-to-b from-[#0a0c14] to-[#05060b] relative z-10">
                    <div className="container px-4 max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <FadeIn>
                                <div>
                                    <p className="text-xl text-cyan-200 leading-relaxed mb-6">
                                        <strong className="text-white">Water doesn't truly come alive in straight lines</strong> – it wakes up in spirals.
                                    </p>
                                    <p className="text-slate-400 mb-8">
                                        When water spins, it starts to sort, clarify and re-organize itself, just like in mountain streams and natural springs. Vortex technologies bring this natural choreography back into modern water systems stressed by pipes, pressure and 90° angles.
                                    </p>

                                    <StaggerContainer className="space-y-3 mb-8">
                                        {[
                                            { text: 'Spin instead of stress – turn harsh linear pressure into coherent spiral flow' },
                                            { text: 'From chaos to pattern – help water sort particles, exchange gases and reorganize charge' },
                                            { text: 'Inspired by rivers & storms – mimic the spirals, eddies and vortices of wild water' },
                                            { text: 'A bridge, not magic – vortices support structuring; they don\'t replace filtration' }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <RotateCcw className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                                                <span className="text-sm text-slate-300">{item.text}</span>
                                            </div>
                                        ))}
                                    </StaggerContainer>

                                    <div className="flex flex-wrap gap-4">
                                        <Link href="/science/structured-water-basics">
                                            <motion.button
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="px-6 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-medium text-sm hover:bg-cyan-500/30 transition-all"
                                            >
                                                Explore Structured Water Basics
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <AnimatedVortexSpiral />
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: WHAT IS A VORTEX */}
                <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                What a Vortex <span className="andara-text-gold-gradient">Really Is</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent w-24 mx-auto mb-6" />
                            <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
                                A vortex = water moving forward + rotating around an axis. It's <strong className="text-white">structured turbulence</strong> – motion that has pattern.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <FlowTypesComparison />
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <div className="mt-12 p-6 bg-slate-900/40 border border-white/5 rounded-xl max-w-3xl mx-auto">
                                <p className="text-center text-cyan-200/80 italic">
                                    In a well-formed vortex, layers follow spiral paths around a central "eye" – neither totally smooth nor completely chaotic.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 3: NATURE VORTICES */}
                <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                Vortices in Nature – <span className="andara-text-gold-gradient">Rivers, Storms & Galaxies</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-6" />
                            <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
                                The spiral is a universal pattern for distributing energy. Water recognizes this pattern and uses it whenever it can move freely.
                            </p>
                        </FadeIn>

                        <NatureVortexCards />
                    </div>
                </section>

                {/* SECTION 4: WHAT VORTEX FLOW DOES */}
                <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                How Vortex Motion <span className="andara-text-gold-gradient">Changes Water</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent w-24 mx-auto mb-16" />
                        </FadeIn>

                        <VortexEffectsCards />
                    </div>
                </section>

                {/* SECTION 5: TYPES OF TECHNOLOGY */}
                <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                Types of <span className="andara-text-gold-gradient">Vortex Technologies</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                        </FadeIn>

                        <TechnologyTypesCards />
                    </div>
                </section>

                {/* SECTION 6: TUNING PARAMETERS */}
                <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                Tuning the Vortex – <span className="andara-text-gold-gradient">Key Parameters</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent w-24 mx-auto mb-6" />
                            <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
                                Vortex technology is not a single gadget – it's a design language combining flow, shape and time.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <ParametersTimeline />
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 7: TRIAD - MINERALS, VORTEX, GEOMETRY */}
                <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-4xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                Vortex + Minerals + Geometry – <span className="andara-text-gold-gradient">A System</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-6" />
                            <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
                                Clarify → Condition → Structure. Filtration, minerals, vortex and geometry all contribute; none alone is "everything".
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <TriadDiagram />
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <Card className="mt-8 p-6 bg-gradient-to-br from-amber-900/10 via-slate-900 to-amber-900/10 border border-amber-500/20 max-w-2xl mx-auto">
                                <p className="text-center text-amber-200/80 text-sm">
                                    <strong className="text-amber-400">Andara Ionic</strong> offers primordial ionic sulfate minerals that support clarification and structuring processes, working alongside vortex motion and geometry.
                                </p>
                            </Card>
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 8: MYTHS & LIMITS */}
                <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-4xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                Myths, Limits & <span className="andara-text-gold-gradient">Responsible Use</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FadeIn>
                                <Card className="p-6 bg-rose-900/10 border border-rose-500/20 h-full">
                                    <h3 className="text-rose-400 font-medium mb-6 flex items-center gap-2">
                                        <XCircle className="w-5 h-5" /> Myths to Avoid
                                    </h3>
                                    <ul className="space-y-4 text-sm text-slate-400">
                                        <li className="flex items-start gap-2">
                                            <XCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                                            <span>"Magic wands" that permanently fix any water</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <XCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                                            <span>Replace filtration, testing or water management</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <XCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                                            <span>Work identically regardless of incoming water</span>
                                        </li>
                                    </ul>
                                </Card>
                            </FadeIn>

                            <FadeIn delay={0.1}>
                                <Card className="p-6 bg-emerald-900/10 border border-emerald-500/20 h-full">
                                    <h3 className="text-emerald-400 font-medium mb-6 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5" /> Responsible Framing
                                    </h3>
                                    <ul className="space-y-4 text-sm text-slate-400">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                            <span>Speak about <strong className="text-white">clarification, charge, structure</strong></span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                            <span>Effect depends on <strong className="text-white">system design & water quality</strong></span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                            <span>No medical promises – <strong className="text-white">educational focus only</strong></span>
                                        </li>
                                    </ul>
                                </Card>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* SECTION 9: NEXT STEPS */}
                <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                Where to Go Next in the <span className="andara-text-gold-gradient">Water Science Tree</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: 'Structured Water Basics', desc: 'Learn how internal ordering in water emerges', href: '/science/structured-water-basics', icon: Hexagon, color: 'cyan' },
                                { title: 'Water Phases & Fourth Phase', desc: 'Place vortices in the bigger picture', href: '/science/water-phases-complete', icon: Layers, color: 'amber' },
                                { title: 'pH, ORP & Conductivity', desc: 'Measure water signals together', href: '/science/ph-orp-ec', icon: Activity, color: 'violet' }
                            ].map((link, i) => (
                                <FadeIn key={i} delay={i * 0.1}>
                                    <Link href={link.href}>
                                        <Card className={`p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-${link.color}-500/40 transition-all cursor-pointer group h-full`}>
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                className={`w-12 h-12 rounded-xl bg-${link.color}-500/10 flex items-center justify-center mb-4`}
                                            >
                                                <link.icon className={`w-6 h-6 text-${link.color}-500 group-hover:scale-110 transition-transform`} />
                                            </motion.div>
                                            <h3 className="font-medium text-white mb-2">{link.title}</h3>
                                            <p className="text-sm text-slate-400 mb-4">{link.desc}</p>
                                            <ArrowRight className={`w-5 h-5 text-${link.color}-500 opacity-0 group-hover:opacity-100 transition-opacity`} />
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
