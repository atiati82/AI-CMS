import { Link } from 'wouter';
import {
    ArrowRight,
    Waves,
    Layers,
    Sparkles,
    Zap,
    Droplets,
    Wind,
    Sun,
    Hexagon,
    Activity,
    FlaskConical,
    Eye,
    XCircle,
    CheckCircle,
    BookOpen,
    CircleDot,
    Atom,
    Compass,
    Thermometer
} from 'lucide-react';
import StandardPageLayout from '@/components/StandardPageLayout';
import { Card } from '@/components/ui/card';
import { FadeIn, StaggerContainer } from '@/components/animations';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Animated Water Molecules
function AnimatedMolecules() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isOrdered, setIsOrdered] = useState(false);

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => setIsOrdered(true), 2000);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    // Generate random positions for chaotic state
    const molecules = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        randomX: Math.random() * 280,
        randomY: Math.random() * 200,
        orderedX: (i % 6) * 50 + 20,
        orderedY: Math.floor(i / 6) * 55 + 20,
        delay: i * 0.05
    }));

    return (
        <div ref={ref} className="relative py-8">
            <div className="max-w-xl mx-auto">
                {/* Container */}
                <div className="relative h-64 rounded-2xl bg-gradient-to-br from-cyan-900/20 via-slate-900 to-slate-900 border border-cyan-500/20 overflow-hidden">
                    {/* Background Grid for ordered state */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isOrdered ? { opacity: 0.1 } : { opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                        style={{
                            backgroundImage: 'radial-gradient(circle, rgba(34,211,238,0.3) 1px, transparent 1px)',
                            backgroundSize: '50px 55px'
                        }}
                    />

                    {/* Molecules */}
                    {molecules.map((mol) => (
                        <motion.div
                            key={mol.id}
                            initial={{ x: mol.randomX, y: mol.randomY, rotate: Math.random() * 360 }}
                            animate={isOrdered
                                ? { x: mol.orderedX, y: mol.orderedY, rotate: 0 }
                                : {
                                    x: [mol.randomX, mol.randomX + 30, mol.randomX - 20, mol.randomX],
                                    y: [mol.randomY, mol.randomY - 20, mol.randomY + 30, mol.randomY],
                                    rotate: [0, 90, 180, 0]
                                }
                            }
                            transition={isOrdered
                                ? { duration: 1.5, delay: mol.delay, type: "spring" }
                                : { repeat: Infinity, duration: 4, ease: "easeInOut" }
                            }
                            className="absolute"
                        >
                            {/* Water molecule representation */}
                            <div className="relative">
                                <div className={`w-6 h-6 rounded-full ${isOrdered ? 'bg-cyan-400' : 'bg-cyan-500/60'} shadow-[0_0_10px_rgba(34,211,238,0.5)]`} />
                                <div className={`absolute -top-2 -left-2 w-3 h-3 rounded-full ${isOrdered ? 'bg-white' : 'bg-white/60'}`} />
                                <div className={`absolute -top-2 -right-2 w-3 h-3 rounded-full ${isOrdered ? 'bg-white' : 'bg-white/60'}`} />
                            </div>
                        </motion.div>
                    ))}

                    {/* State Label */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-900/80 border border-white/20"
                    >
                        <span className={`text-sm font-medium ${isOrdered ? 'text-cyan-400' : 'text-slate-400'}`}>
                            {isOrdered ? '✨ Ordered Structure' : '~ Random Motion'}
                        </span>
                    </motion.div>
                </div>

                {/* Caption */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-6 text-sm text-slate-400"
                >
                    {isOrdered
                        ? "When conditions align, molecules form coherent layers"
                        : "Watch as random motion transforms into order..."
                    }
                </motion.p>
            </div>
        </div>
    );
}

// Four Pillars of Structure
function StructurePillars() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const pillars = [
        {
            title: 'Minerals & Ions',
            desc: 'Sulfate, bicarbonate, magnesium, silica influence hydrogen bonding and clustering',
            icon: FlaskConical,
            color: 'amber',
            details: ['Shapes water shells', 'Charges surfaces', 'Guides ordering']
        },
        {
            title: 'Charge & Fields',
            desc: 'Electric fields and charge separation create ordered zones',
            icon: Zap,
            color: 'cyan',
            details: ['Surface charges', 'Streaming potentials', 'EZ-like layers']
        },
        {
            title: 'Flow & Vortex',
            desc: 'Movement sculpts structure through exposure, separation and folding',
            icon: Wind,
            color: 'violet',
            details: ['Clarification', 'Aeration', 'Interface renewal']
        },
        {
            title: 'Light & Geometry',
            desc: 'Light bands and container shapes alter internal patterns',
            icon: Sun,
            color: 'emerald',
            details: ['UV/IR response', 'Temperature zones', 'Curved surfaces']
        }
    ];

    return (
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                    <Card className={`p-6 bg-gradient-to-br from-${pillar.color}-900/20 via-slate-900 to-slate-900 border border-${pillar.color}-500/20 hover:border-${pillar.color}-500/40 transition-all h-full group`}>
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={`w-14 h-14 rounded-xl bg-${pillar.color}-500/10 flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(var(--${pillar.color}-rgb),0.2)]`}
                        >
                            <pillar.icon className={`w-7 h-7 text-${pillar.color}-500`} />
                        </motion.div>
                        <h3 className={`font-medium text-${pillar.color}-400 mb-2`}>{pillar.title}</h3>
                        <p className="text-sm text-slate-400 mb-4">{pillar.desc}</p>
                        <ul className="space-y-1">
                            {pillar.details.map((d, j) => (
                                <li key={j} className="text-xs text-slate-500 flex items-center gap-2">
                                    <CircleDot className={`w-2 h-2 text-${pillar.color}-500`} />
                                    {d}
                                </li>
                            ))}
                        </ul>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}

// Interface Layers Visualization
function InterfaceLayersViz() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className="relative max-w-lg mx-auto py-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                className="relative"
            >
                {/* Surface */}
                <div className="h-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-t-lg shadow-[0_0_20px_rgba(245,158,11,0.3)]" />

                {/* Layer 1 - Most structured */}
                <motion.div
                    initial={{ height: 0 }}
                    animate={isInView ? { height: 40 } : { height: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-gradient-to-b from-cyan-500/40 to-cyan-500/20 flex items-center justify-center"
                >
                    <span className="text-xs text-cyan-300 font-medium">Layer 1 – Strong Order</span>
                </motion.div>

                {/* Layer 2 */}
                <motion.div
                    initial={{ height: 0 }}
                    animate={isInView ? { height: 50 } : { height: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="bg-gradient-to-b from-cyan-500/20 to-cyan-500/10 flex items-center justify-center"
                >
                    <span className="text-xs text-cyan-400/80">Layer 2 – Medium Order</span>
                </motion.div>

                {/* Layer 3 */}
                <motion.div
                    initial={{ height: 0 }}
                    animate={isInView ? { height: 60 } : { height: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="bg-gradient-to-b from-cyan-500/10 to-slate-900 flex items-center justify-center rounded-b-lg"
                >
                    <span className="text-xs text-slate-500">Layer 3 → Bulk Water</span>
                </motion.div>

                {/* Arrows */}
                <div className="absolute -right-20 top-0 bottom-0 flex flex-col justify-between py-2 text-xs text-slate-500">
                    <span>Surface</span>
                    <span>↓ EZ Zone</span>
                    <span>Bulk</span>
                </div>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1 }}
                className="text-center mt-8 text-sm text-slate-400"
            >
                Water forms <span className="text-cyan-400">structured layers</span> at hydrophilic surfaces
            </motion.p>
        </div>
    );
}

// Floating Water Particle Animation
function FloatingWaterParticle({ delay = 0, size = 'md' }: { delay?: number; size?: 'sm' | 'md' | 'lg' }) {
    const sizeMap = { sm: 'w-2 h-2', md: 'w-3 h-3', lg: 'w-4 h-4' };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: [0.1, 0.4, 0.1],
                y: [0, -30, 0],
                scale: [1, 1.2, 1]
            }}
            transition={{
                repeat: Infinity,
                duration: 6,
                delay,
                ease: "easeInOut"
            }}
            className="absolute"
        >
            <div className={`${sizeMap[size]} rounded-full bg-cyan-400/30 blur-[2px]`} />
        </motion.div>
    );
}

export default function StructuredWaterBasicsPage() {
    const containerRef = useRef(null);

    return (
        <StandardPageLayout
            title={<>Structured Water Basics – <span className="text-cyan-400">How Order Emerges</span></>}
            subtitle="Understanding regions of coherence in liquid water"
            heroVariant="cyan"
            heroIcon={Waves}
            seoTitle="Structured Water Basics – How Order Emerges in Liquid Water | Andara Science"
            seoDescription="Learn how structured water forms through minerals, charge, flow and geometry. Understand the science of water ordering at interfaces without hype or magic."
        >
            <div ref={containerRef} className="relative">
                {/* Floating Background Particles */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <FloatingWaterParticle delay={0} size="lg" />
                    <FloatingWaterParticle delay={1} size="md" />
                    <FloatingWaterParticle delay={2} size="sm" />
                    <FloatingWaterParticle delay={3} size="md" />
                    <FloatingWaterParticle delay={4} size="lg" />
                </div>

                {/* SECTION 1: WHY STRUCTURE MATTERS */}
                <section className="py-24 bg-gradient-to-b from-[#0a0c14] to-[#05060b] relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 text-center">
                                Why <span className="andara-text-gold-gradient">"Structure"</span> Matters in Water
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent w-32 mx-auto mb-10" />
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <p className="text-lg text-slate-300 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                                When most people think of water, they imagine a <span className="text-slate-400">random, sloshing liquid</span>.
                                In reality, water is capable of forming <span className="text-cyan-400">order</span>.
                            </p>
                        </FadeIn>

                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
                                <Layers className="w-8 h-8 text-cyan-500 mb-4" />
                                <p className="text-sm text-slate-300"><strong className="text-white">Layers</strong> along surfaces and membranes</p>
                            </Card>
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/40 transition-all duration-300 shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1">
                                <Hexagon className="w-8 h-8 text-amber-500 mb-4" />
                                <p className="text-sm text-slate-300"><strong className="text-white">Micro-clusters</strong> that behave differently from bulk</p>
                            </Card>
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-violet-500/40 transition-all duration-300 shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1">
                                <Activity className="w-8 h-8 text-violet-500 mb-4" />
                                <p className="text-sm text-slate-300"><strong className="text-white">Regions</strong> with different density, charge and viscosity</p>
                            </Card>
                        </StaggerContainer>

                        <FadeIn delay={0.3}>
                            <div className="p-6 bg-gradient-to-r from-cyan-900/10 via-slate-900 to-cyan-900/10 border border-cyan-500/20 rounded-xl text-center max-w-3xl mx-auto">
                                <p className="text-cyan-200/90">
                                    <strong className="text-cyan-400">Structured water</strong> = regions where molecules are more ordered,
                                    more coherent, and more aligned with surfaces, charges and fields than the surrounding bulk.
                                </p>
                                <p className="text-sm text-slate-500 mt-4 italic">
                                    Not magic – a pattern that appears when minerals, charge, geometry and flow come together.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 2: FROM RANDOM TO ORDERED */}
                <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/hex-grid-bg.svg')] opacity-[0.02] bg-repeat pointer-events-none" />
                    <div className="container px-4 max-w-5xl mx-auto relative">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                From Random to Ordered – <span className="andara-text-gold-gradient">How Structure Forms</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent w-24 mx-auto mb-6" />
                            <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
                                Watch as chaotic molecular motion transforms into coherent layers
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <AnimatedMolecules />
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <div className="mt-16">
                                <h3 className="text-xl font-medium text-white mb-6 text-center">Interfaces – Where Structure Likes to Live</h3>
                                <InterfaceLayersViz />
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 3: INGREDIENTS */}
                <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-6xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                Ingredients That <span className="andara-text-gold-gradient">Support Structure</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-6" />
                            <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
                                Structure emerges from a synergy of elements working together
                            </p>
                        </FadeIn>

                        <StructurePillars />

                        <FadeIn delay={0.6}>
                            <div className="mt-12 p-6 bg-slate-900/40 border border-white/5 rounded-xl max-w-3xl mx-auto">
                                <p className="text-center text-amber-200/80 italic">
                                    Water is "structured" whenever minerals, charge, geometry, light and flow bring it into a more coherent, layered state.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 4: HOW STRUCTURE SHOWS UP */}
                <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                How Structure <span className="andara-text-gold-gradient">Shows Up</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent w-24 mx-auto mb-6" />
                            <p className="text-center text-slate-400 mb-16">
                                We can't see structured water directly, but we can notice changes in behavior
                            </p>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FadeIn>
                                <Card className="p-8 bg-slate-900/60 backdrop-blur-xl border border-white/5 h-full">
                                    <Eye className="w-8 h-8 text-cyan-500 mb-4" />
                                    <h3 className="text-lg font-medium text-white mb-4">Visual & Tactile Clues</h3>
                                    <ul className="space-y-3 text-sm text-slate-400">
                                        <li className="flex items-start gap-2">
                                            <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                                            <span>Looks <strong className="text-white">clearer and more brilliant</strong></span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Droplets className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                                            <span>Feels <strong className="text-white">silkier or softer</strong> in mouth or on skin</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Activity className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                                            <span>Different <strong className="text-white">droplet shapes</strong> and surface behavior</span>
                                        </li>
                                    </ul>
                                </Card>
                            </FadeIn>

                            <FadeIn delay={0.1}>
                                <Card className="p-8 bg-slate-900/60 backdrop-blur-xl border border-white/5 h-full">
                                    <FlaskConical className="w-8 h-8 text-amber-500 mb-4" />
                                    <h3 className="text-lg font-medium text-white mb-4">Technical Measurements</h3>
                                    <ul className="space-y-3 text-sm text-slate-400">
                                        <li className="flex items-start gap-2">
                                            <CircleDot className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                                            <span><strong className="text-white">Surface tension</strong> – how tightly water pulls</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CircleDot className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                                            <span><strong className="text-white">Contact angle</strong> – beading vs spreading</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CircleDot className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                                            <span><strong className="text-white">Viscosity</strong> – flow at small scales</span>
                                        </li>
                                    </ul>
                                </Card>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* SECTION 5: MYTHS VS GROUNDED */}
                <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-4xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                Myths, Hype & <span className="andara-text-gold-gradient">A Grounded View</span>
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
                                            <span>"Structured water breaks all laws of physics"</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <XCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                                            <span>"One device permanently wires your water forever"</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <XCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                                            <span>"Structured water alone can heal everything"</span>
                                        </li>
                                    </ul>
                                </Card>
                            </FadeIn>

                            <FadeIn delay={0.1}>
                                <Card className="p-6 bg-emerald-900/10 border border-emerald-500/20 h-full">
                                    <h3 className="text-emerald-400 font-medium mb-6 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5" /> Grounded Reality
                                    </h3>
                                    <ul className="space-y-4 text-sm text-slate-400">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                            <span><strong className="text-white">Different organization</strong> of the same H₂O</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                            <span>Structure is <strong className="text-white">dynamic</strong> – appears, changes, dissolves</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                            <span>Focus on <strong className="text-white">clarifying</strong>, <strong className="text-white">conditioning</strong>, <strong className="text-white">understanding terrain</strong></span>
                                        </li>
                                    </ul>
                                </Card>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* SECTION 6: ANDARA CONNECTION */}
                <section className="py-16 bg-[#020617] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-3xl mx-auto">
                        <FadeIn>
                            <Card className="p-8 bg-gradient-to-br from-amber-900/10 via-slate-900 to-amber-900/10 border border-amber-500/20 rounded-xl">
                                <div className="flex items-start gap-4">
                                    <Sparkles className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-medium text-white mb-4">Where Andara Ionic Fits</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                            Andara Ionic is a <strong className="text-amber-200">primordial ionic sulfate mineral concentrate</strong> used to clarify and condition water, helping it move closer to patterns observed in natural mineral-rich environments.
                                        </p>
                                        <p className="text-amber-200/80 italic text-sm">
                                            "Water is a responsive, structuring medium that listens to minerals, geometry, light and motion – and Andara Ionic is one of the ways we learn to collaborate with that intelligence."
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 7: CROSS-LINKS */}
                <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                Explore the <span className="andara-text-gold-gradient">Water Structure Track</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: 'Water Phases & Fourth Phase', desc: 'Where the idea of "fourth phase" comes from', href: '/science/water-phases-complete', icon: Layers, color: 'cyan' },
                                { title: 'EZ Water Overview', desc: 'Exclusion Zone water at interfaces', href: '/science/ez-water-overview', icon: Hexagon, color: 'amber' },
                                { title: 'Hydration Clusters', desc: 'Water organizing along membranes and minerals', href: '/science/hydration-clusters', icon: Atom, color: 'violet' },
                                { title: 'pH, ORP & Conductivity', desc: "Measuring water's signals together", href: '/science/ph-orp-ec', icon: Activity, color: 'emerald' }
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
