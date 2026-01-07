import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { ScrollProgress } from "@/components/plugins/ScrollProgress";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { VortexScrollAnimation } from "@/components/visuals/VortexScrollAnimation";
import { Link } from "wouter";
import {
    RotateCw,
    Wind,
    Waves,
    Activity,
    Zap,
    Droplets,
    Tornado,
    ArrowRight,
    Hexagon,
    Filter,
    ArrowDown
} from "lucide-react";
import { VortexSpinner } from "@/components/plugins/VortexSpinner";

export default function VortexSpiralHydrodynamicsPage() {
    return (
        <StandardPageLayout
            title={<>Vortexing & <span className="text-cyan-400">Flow</span></>}
            subtitle={<>Why movement matters for water.<br /><span className="text-cyan-400/80">From mountain streams to cosmic spirals.</span></>}
            registryId="geo-vortex"
            heroVariant="cyan"
            heroIcon={Tornado}
            badges={[{ text: "Fluid Dynamics", icon: Tornado }]}
            seoTitle="Vortexing & Flow: Why Movement Matters for Water | Andara Ionic"
            seoDescription="Understand the physics of vortexing: how spiraling flow influences gas exchange, microstructure, and water quality, without the hype."
        >
            <ScrollProgress />

            {/* INTRO SECTION */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-8">The Pattern of Flow</h2>
                        <p className="text-slate-300 leading-relaxed mb-12 max-w-2xl mx-auto">
                            When you watch a mountain stream, a whirlpool in a river, or the spiral of a galaxy, you’re seeing the same pattern: the vortex.
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 group hover:border-cyan-500/30 transition-colors">
                            <Wind className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Gas Exchange</h3>
                            <p className="text-slate-400 text-xs">Releases trapped gases and improves oxygenation through movement.</p>
                        </div>
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 group hover:border-cyan-500/30 transition-colors">
                            <Activity className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Microstructure</h3>
                            <p className="text-slate-400 text-xs">Encourages re-organization of clusters and particles.</p>
                        </div>
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 group hover:border-cyan-500/30 transition-colors">
                            <RotateCw className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Reset Button</h3>
                            <p className="text-slate-400 text-xs">Helps water reorganize itself again and again.</p>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* SCROLL ANIMATION: IMPLOSION DYNAMICS */}
            <div className="relative z-0">
                <VortexScrollAnimation />
            </div>

            {/* 1. WHY MOVEMENT CHANGES WATER */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <FadeIn className="flex-1">
                            <h2 className="text-3xl font-display text-white mb-6">Why Movement Changes Water</h2>
                            <div className="prose prose-invert text-slate-300">
                                <p>
                                    Most people feel it before they understand it. Water from a fast-flowing spring feels lighter and more alive than water sitting stagnant in a bottle.
                                </p>
                                <p>
                                    <strong>Movement acts as a reset button.</strong> It changes water because it affects:
                                </p>
                                <ul className="space-y-2 mt-4">
                                    <li className="flex gap-3 items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2" />
                                        <span><strong>Gas Exchange:</strong> How O₂ enters and CO₂ leaves.</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2" />
                                        <span><strong>Temperature:</strong> Breaks up hot and cold pockets.</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2" />
                                        <span><strong>Impurities:</strong> Determines if they settle or stay suspended.</span>
                                    </li>
                                </ul>
                            </div>
                        </FadeIn>

                        {/* STILL vs FLOWING VISUAL */}
                        <FadeIn className="flex-1 w-full">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-center">
                                    <div className="w-16 h-16 bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <div className="w-8 h-8 border-2 border-slate-600 rounded-sm" />
                                    </div>
                                    <h3 className="text-slate-400 font-bold text-sm mb-1">Stagnant</h3>
                                    <p className="text-xs text-slate-500">Low exchange<br />Layered<br />Dull</p>
                                </div>
                                <div className="p-6 bg-cyan-900/10 rounded-xl border border-cyan-500/30 text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
                                    <div className="w-16 h-16 bg-cyan-900/30 rounded-full mx-auto mb-4 flex items-center justify-center relative z-10">
                                        <RotateCw className="w-8 h-8 text-cyan-400 animate-spin-slow" />
                                    </div>
                                    <h3 className="text-cyan-400 font-bold text-sm mb-1 relative z-10">Dynamic</h3>
                                    <p className="text-xs text-cyan-300/60 relative z-10">Mixing<br />Reorganizing<br />Alive</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 2. WHAT IS A VORTEX */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                        <FadeIn className="flex-1">
                            <h2 className="text-3xl font-display text-white mb-6">What is a Vortex?</h2>
                            <p className="text-cyan-400 font-mono text-sm mb-6 uppercase tracking-wider">Physics, No Jargon.</p>
                            <div className="prose prose-invert text-slate-300">
                                <p>
                                    Simply put: <strong>A spinning flow where water turns around an invisible axis.</strong> Like a spiral staircase made of fluid.
                                </p>
                                <p>
                                    In water science, a vortex creates regions of changing pressure—lower in the center, higher on the outside. This sets up shear forces that mix, separate, and "order" the flow.
                                </p>
                                <p className="italic text-slate-400 mt-4 border-l-2 border-cyan-500/30 pl-4 py-2">
                                    "Juxtapose water spiraling inward in smooth, curved trajectories instead of crashing into flat walls."
                                </p>
                            </div>
                        </FadeIn>

                        <div className="flex-1 w-full flex justify-center">
                            {/* Reusing the Spinner component as a visual anchor */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80">
                                <VortexSpinner />
                                <div className="absolute -bottom-8 left-0 right-0 text-center">
                                    <span className="text-xs font-mono text-cyan-500/50">FIG 2.1 // IMPLOSION DYNAMICS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. MEASURABLE EFFECTS */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Measurable Influence</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 3.1 Gas Content */}
                        <div className="p-6 rounded-xl bg-[#0b1020] border border-white/5 hover:border-cyan-500/20 transition-all">
                            <Wind className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-lg font-bold text-white mb-3">1. Degassing</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Helps release trapped gases like chlorine smell or stale CO₂, and improves oxygenation by repeatedly exposing water to air.
                            </p>
                        </div>

                        {/* 3.2 Mixing */}
                        <div className="p-6 rounded-xl bg-[#0b1020] border border-white/5 hover:border-cyan-500/20 transition-all">
                            <RotateCw className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-lg font-bold text-white mb-3">2. Mixing</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                An efficient natural mixer that blends temperature zones and evenly distributes ionic minerals across the volume.
                            </p>
                        </div>

                        {/* 3.3 Particles */}
                        <div className="p-6 rounded-xl bg-[#0b1020] border border-white/5 hover:border-cyan-500/20 transition-all">
                            <Tornado className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-lg font-bold text-white mb-3">3. Sorting</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Shear forces can push heavier particles outward and pull lighter regions inward, encouraging flocculation and reorganization.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-cyan-900/10 border border-cyan-500/20 rounded-xl text-center">
                        <p className="text-cyan-200 text-sm font-medium">
                            "Vortexing helps reorganise both the macro-flow (how it moves) and the micro-cluster landscape (how things are distributed)."
                        </p>
                    </div>
                </div>
            </section>

            {/* 4. VORTEX & EZ WATER */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <Waves className="w-12 h-12 text-purple-400 mx-auto mb-6" />
                    <h2 className="text-2xl font-display text-white mb-6">The EZ Water Connection</h2>
                    <p className="text-slate-300 mb-8 leading-relaxed">
                        There is an interesting bridge between standard physics and ordered water. While EZ water forms near surfaces, vortexing creates <strong>dynamic gradients</strong> of pressure and charge.
                    </p>
                    <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white text-sm">
                            We don't say "vortexing creates EZ water."<br />
                            We say: <strong>It supports conditions where structured domains are more likely to emerge.</strong>
                        </p>
                    </div>
                </div>
            </section>

            {/* 6. ANDARA INTEGRATION (Flow Path) */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">The Integrated Protocol</h2>

                    {/* FLOW PATH JOURNEY */}
                    <div className="relative">
                        {/* Connecting Line (Mobile: Hidden, Desktop: Visible) */}
                        <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {/* Step 1 */}
                            <div className="relative text-center group">
                                <div className="w-24 h-24 mx-auto bg-[#0b1020] border border-white/10 rounded-full flex items-center justify-center relative z-10 mb-4 group-hover:border-cyan-500/50 transition-colors">
                                    <Filter className="w-8 h-8 text-slate-400" />
                                </div>
                                <h4 className="text-white font-bold mb-1">1. Clean</h4>
                                <p className="text-xs text-slate-400">Filter impurities</p>
                            </div>

                            {/* Step 2 */}
                            <div className="relative text-center group">
                                <div className="w-24 h-24 mx-auto bg-[#0b1020] border border-white/10 rounded-full flex items-center justify-center relative z-10 mb-4 group-hover:border-cyan-500/50 transition-colors">
                                    <Droplets className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h4 className="text-white font-bold mb-1">2. Condition</h4>
                                <p className="text-xs text-slate-400">Add Andara Minerals</p>
                            </div>

                            {/* Step 3 */}
                            <div className="relative text-center group">
                                <div className="w-24 h-24 mx-auto bg-[#0b1020] border border-white/10 rounded-full flex items-center justify-center relative z-10 mb-4 group-hover:border-cyan-500/50 transition-colors">
                                    <RotateCw className="w-8 h-8 text-cyan-400" />
                                </div>
                                <h4 className="text-white font-bold mb-1">3. Vortex</h4>
                                <p className="text-xs text-slate-400">Spin to Organize</p>
                            </div>

                            {/* Step 4 */}
                            <div className="relative text-center group">
                                <div className="w-24 h-24 mx-auto bg-[#0b1020] border border-white/10 rounded-full flex items-center justify-center relative z-10 mb-4 group-hover:border-cyan-500/50 transition-colors">
                                    <Zap className="w-8 h-8 text-amber-400" />
                                </div>
                                <h4 className="text-white font-bold mb-1">4. Coherence</h4>
                                <p className="text-xs text-slate-400">Ready to Drink</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-slate-300 italic max-w-2xl mx-auto">
                            "Andara works on chemistry and charge. Vortexing works on movement and pattern. Together, they bring water closer to a spring-like state."
                        </p>
                    </div>
                </div>
            </section>

            {/* 7. WAYS TO EXPERIENCE */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-display text-white mb-8">Try It At Home</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="p-6 bg-[#0b1020] rounded-xl border border-white/5">
                            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                <span className="bg-cyan-500/20 text-cyan-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">A</span>
                                Hand Vortex
                            </h3>
                            <p className="text-slate-400 text-sm">
                                Use a wooden spoon in a glass carafe. Stir in one direction until a deep funnel forms. Stop and watch the implosion. Taste the difference in texture.
                            </p>
                        </div>
                        <div className="p-6 bg-[#0b1020] rounded-xl border border-white/5">
                            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                <span className="bg-cyan-500/20 text-cyan-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">B</span>
                                Two-Bottle Tornado
                            </h3>
                            <p className="text-slate-400 text-sm">
                                Connect two bottles. Flip and spin to create a draining vortex. This is a powerful visual demo of spiral stability and flow.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SUMMARY NAV */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-display text-white mb-6">Explore the Science</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/magnetics-water" className="p-4 rounded-xl border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-left group">
                            <span className="block text-xs text-slate-500 mb-1 group-hover:text-cyan-400">Next Topic</span>
                            <span className="block text-white font-bold">Magnetics & Fields &rarr;</span>
                        </Link>
                        <Link href="/science/water-science-master" className="p-4 rounded-xl border border-white/10 hover:border-white/30 transition-all text-left">
                            <span className="block text-xs text-slate-500 mb-1">Back to Hub</span>
                            <span className="block text-white font-bold">&larr; Water Science</span>
                        </Link>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
