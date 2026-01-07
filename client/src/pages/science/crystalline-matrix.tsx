/**
 * Crystalline Matrix - Science Page Demo
 * 
 * Showcases the CrystallineScrollAnimation component with 
 * ArticleLayout patterns. Demonstrates the layout library
 * and animation presets in action.
 */

import { Link } from 'wouter';
import {
    ArrowRight,
    Sparkles,
    Zap,
    Hexagon,
    Layers,
    Activity,
    Atom,
    BookOpen,
    CircleDot,
    FlaskConical
} from 'lucide-react';
import StandardPageLayout from '@/components/StandardPageLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { motion, useInView } from 'framer-motion';
import { useRef, Suspense, lazy } from 'react';

// Lazy load the GSAP crystalline animation for performance
const CrystallineScrollAnimation = lazy(() =>
    import('@/components/visuals/CrystallineScrollAnimation').then(m => ({ default: m.CrystallineScrollAnimation }))
);

// Loading fallback for GSAP component
function AnimationLoadingFallback() {
    return (
        <div className="h-screen w-full bg-[#020617] flex items-center justify-center border-y border-white/5">
            <div className="text-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="w-16 h-16 mx-auto mb-4"
                >
                    <Hexagon className="w-16 h-16 text-cyan-500/50" />
                </motion.div>
                <p className="text-slate-500 text-sm">Loading crystalline visualization...</p>
            </div>
        </div>
    );
}

// Phase explanation cards
function PhaseCard({ phase, title, description, color, icon: Icon, delay = 0 }: {
    phase: string;
    title: string;
    description: string;
    color: string;
    icon: any;
    delay?: number;
}) {
    return (
        <FadeIn delay={delay}>
            <Card className={`p-6 bg-gradient-to-br from-${color}-900/20 via-slate-900 to-slate-900 border border-${color}-500/20 hover:border-${color}-500/40 transition-all h-full`}>
                <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-lg bg-${color}-500/20 flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 text-${color}-400`} />
                    </div>
                    <span className={`text-xs font-mono uppercase tracking-widest text-${color}-400`}>{phase}</span>
                </div>
                <h3 className="text-white font-medium mb-2">{title}</h3>
                <p className="text-sm text-slate-400">{description}</p>
            </Card>
        </FadeIn>
    );
}

// Mineral role visualization
function MineralRolesGrid() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const minerals = [
        { name: 'Sulfate (SO₄²⁻)', role: 'Primary structuring agent', effect: 'Creates hydrogen bond bridges', color: 'amber' },
        { name: 'Magnesium (Mg²⁺)', role: 'Charge carrier', effect: 'Stabilizes water shells', color: 'emerald' },
        { name: 'Silica (SiO₂)', role: 'Surface template', effect: 'Provides ordering surfaces', color: 'cyan' },
        { name: 'Iron (Fe²⁺/Fe³⁺)', role: 'Redox catalyst', effect: 'Enables charge transfer', color: 'rose' },
    ];

    return (
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {minerals.map((mineral, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className={`p-4 rounded-xl bg-${mineral.color}-900/10 border border-${mineral.color}-500/20`}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Atom className={`w-5 h-5 text-${mineral.color}-400`} />
                        <span className={`font-medium text-${mineral.color}-300`}>{mineral.name}</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-1"><strong className="text-white">{mineral.role}</strong></p>
                    <p className="text-xs text-slate-500">{mineral.effect}</p>
                </motion.div>
            ))}
        </div>
    );
}

export default function CrystallineMatrixPage() {
    const containerRef = useRef(null);

    return (
        <StandardPageLayout
            title={<>The Crystalline Matrix – <span className="text-cyan-400">Structure from Chaos</span></>}
            subtitle="How minerals transform random water molecules into coherent crystalline geometry"
            heroVariant="purple"
            heroIcon={Hexagon}
            seoTitle="Crystalline Matrix – How Minerals Structure Water | Andara Science"
            seoDescription="Explore how ionic minerals create crystalline order in water. Interactive GSAP scrollytelling shows the 4 phases: Chaos → Alignment → Matrix → Resonance."
        >
            <div ref={containerRef} className="relative">
                {/* SECTION 1: INTRO */}
                <section className="py-24 bg-gradient-to-b from-[#0a0c14] to-[#05060b] relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 text-center">
                                What Is the <span className="andara-text-gold-gradient">Crystalline Matrix</span>?
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-full max-w-md mx-auto mb-10" />
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <div className="p-6 bg-gradient-to-r from-purple-900/10 via-slate-900 to-purple-900/10 border border-purple-500/20 rounded-xl text-center max-w-3xl mx-auto mb-12">
                                <p className="text-lg text-slate-300 leading-relaxed">
                                    The <span className="text-purple-300 font-medium">crystalline matrix</span> is the organized,
                                    geometric arrangement of water molecules that emerges when
                                    <span className="text-amber-300"> ionic minerals</span> provide the right conditions
                                    for <span className="text-cyan-300">structure to form</span>.
                                </p>
                            </div>
                        </FadeIn>

                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-purple-500/40 transition-all">
                                <Layers className="w-8 h-8 text-purple-500 mb-4" />
                                <h3 className="font-medium text-white mb-2">Ordered Layers</h3>
                                <p className="text-sm text-slate-400">Molecules align into coherent planes along surfaces and interfaces</p>
                            </Card>
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/40 transition-all">
                                <Hexagon className="w-8 h-8 text-amber-500 mb-4" />
                                <h3 className="font-medium text-white mb-2">Geometric Patterns</h3>
                                <p className="text-sm text-slate-400">Hexagonal and tetrahedral geometries emerge from hydrogen bonding</p>
                            </Card>
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-cyan-500/40 transition-all">
                                <Activity className="w-8 h-8 text-cyan-500 mb-4" />
                                <h3 className="font-medium text-white mb-2">Energy Flow</h3>
                                <p className="text-sm text-slate-400">Structured regions can hold charge and transmit information</p>
                            </Card>
                        </StaggerContainer>
                    </div>
                </section>

                {/* SECTION 2: INTERACTIVE CRYSTALLINE ANIMATION */}
                <section className="relative z-10">
                    <FadeIn>
                        <div className="text-center py-12 bg-[#020617]">
                            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                                The Four Phases of <span className="andara-text-gold-gradient">Matrix Formation</span>
                            </h2>
                            <p className="text-slate-400 max-w-xl mx-auto mb-2">
                                Scroll through the animation below to witness the transformation
                            </p>
                            <p className="text-xs text-slate-500">
                                ↓ Scroll slowly through this section ↓
                            </p>
                        </div>
                    </FadeIn>

                    <Suspense fallback={<AnimationLoadingFallback />}>
                        <CrystallineScrollAnimation />
                    </Suspense>
                </section>

                {/* SECTION 3: PHASE BREAKDOWN */}
                <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-6xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                Understanding Each <span className="andara-text-gold-gradient">Phase</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-full max-w-md mx-auto mb-16" />
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <PhaseCard
                                phase="Phase 1"
                                title="Molecular Chaos"
                                description="Without structure, water molecules move randomly. Entropy dominates. This is the baseline state of most treated water."
                                color="slate"
                                icon={Activity}
                                delay={0}
                            />
                            <PhaseCard
                                phase="Phase 2"
                                title="The Alignment"
                                description="Minerals and charge begin influencing the molecules. They start finding geometric positions, guided by hydrogen bonding."
                                color="cyan"
                                icon={Sparkles}
                                delay={0.1}
                            />
                            <PhaseCard
                                phase="Phase 3"
                                title="Matrix Forms"
                                description="Connection lines emerge between aligned molecules. The individual becomes part of a unified crystalline lattice structure."
                                color="emerald"
                                icon={Hexagon}
                                delay={0.2}
                            />
                            <PhaseCard
                                phase="Phase 4"
                                title="Resonance"
                                description="The completed structure can hold charge, transmit information, and support biological processes. Order enables function."
                                color="purple"
                                icon={Zap}
                                delay={0.3}
                            />
                        </div>
                    </div>
                </section>

                {/* SECTION 4: HOW MINERALS CREATE STRUCTURE */}
                <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                How Minerals Create <span className="andara-text-gold-gradient">Structure</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent w-full max-w-md mx-auto mb-6" />
                            <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
                                Each mineral plays a specific role in the formation of crystalline order
                            </p>
                        </FadeIn>

                        <MineralRolesGrid />

                        <FadeIn delay={0.4}>
                            <div className="mt-12 p-6 bg-gradient-to-r from-amber-900/10 via-slate-900 to-amber-900/10 border border-amber-500/20 rounded-xl max-w-3xl mx-auto">
                                <div className="flex items-start gap-4">
                                    <FlaskConical className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-lg font-medium text-white mb-2">Andara Ionic's Role</h3>
                                        <p className="text-sm text-slate-400">
                                            Andara Ionic contains a balanced spectrum of these structuring minerals in their
                                            <strong className="text-amber-200"> ionic form</strong> – already dissolved and ready
                                            to interact with water molecules. This is why a few drops can initiate
                                            visible clarification and ordering.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 5: CROSS-LINKS */}
                <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <FadeIn>
                            <h2 className="text-3xl font-light text-white mb-4 text-center">
                                Explore <span className="andara-text-gold-gradient">Related Science</span>
                            </h2>
                            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-full max-w-md mx-auto mb-16" />
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: 'Sulfate Chemistry', desc: 'How SO₄ shapes water structure', href: '/science/sulfate-chemistry', icon: FlaskConical, color: 'amber' },
                                { title: 'Tetrahedral Geometry', desc: 'The geometric foundation of order', href: '/science/tetrahedral-sulfate-geometry', icon: Hexagon, color: 'purple' },
                                { title: 'Structured Water Basics', desc: 'Introduction to water ordering', href: '/science/structured-water-basics', icon: Layers, color: 'cyan' },
                                { title: 'EZ Water Overview', desc: 'Exclusion zones at interfaces', href: '/science/ez-water-overview', icon: CircleDot, color: 'emerald' }
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

                        {/* CTA */}
                        <FadeIn delay={0.5}>
                            <div className="mt-16 text-center">
                                <Link href="/shop">
                                    <Button className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-6 text-base font-semibold text-black hover:opacity-90 shadow-lg shadow-amber-500/20">
                                        <BookOpen className="w-5 h-5 mr-2" />
                                        Experience Crystalline Water
                                    </Button>
                                </Link>
                                <p className="mt-4 text-sm text-slate-500">
                                    Try Andara Ionic and observe the clarification effect firsthand
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>
            </div>
        </StandardPageLayout>
    );
}
