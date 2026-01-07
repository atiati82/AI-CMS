import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { ScrollProgress } from "@/components/plugins/ScrollProgress";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { Link } from "wouter";
import {
    Hexagon,
    Zap,
    Droplets,
    Triangle,
    Box,
    Sparkles,
    Waves,
    Grid,
    Lightbulb
} from "lucide-react";

export default function CrystallineMatrixPage() {
    return (
        <StandardPageLayout
            title={<>Crystalline <span className="text-cyan-400">Matrix</span></>}
            subtitle={<>Light, Geometry & Memory.<br /><span className="text-cyan-400/80">Life is not just chemistry, but geometry + light + information.</span></>}
            
            heroVariant="cyan"
            heroIcon={Hexagon}
            badges={[{ text: "Structure & Coherence", icon: Hexagon }]}
            seoTitle="Crystalline Matrix: Light, Geometry & Memory in Water and Biology"
            seoDescription="Explore how the crystalline matrix acts as the hardware grid of the planet and body, storing information and guiding light and electricity through ordered geometry."
            relatedLinks={[
                { title: "Sulfate Geometry", url: "/tetrahedral-sulfate-geometry", type: "internal" },
                { title: "Bioelectric Hub", url: "/bioelectricity", type: "internal" }
            ]}
        >
            <ScrollProgress />

            {/* INTRO SECTION */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-8">Patterns of Nature</h2>
                        <p className="text-slate-300 leading-relaxed mb-12 max-w-2xl mx-auto">
                            All of nature runs on patterns. Mountains, shells, snowflakes, minerals, even the way nerves branch and rivers flow – everything follows geometry.
                            The Crystalline Matrix is the idea that life uses structures to express light and information.
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 group hover:border-cyan-500/30 transition-colors">
                            <Box className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Minerals</h3>
                            <p className="text-white/50 text-xs">Crystal lattices</p>
                        </div>
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 group hover:border-cyan-500/30 transition-colors">
                            <Droplets className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Water</h3>
                            <p className="text-white/50 text-xs">Ordered clusters & EZ domains</p>
                        </div>
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 group hover:border-cyan-500/30 transition-colors">
                            <Grid className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Biology</h3>
                            <p className="text-white/50 text-xs">Collagen networks & cytoskeletons</p>
                        </div>
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 group hover:border-cyan-500/30 transition-colors">
                            <Zap className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Function</h3>
                            <p className="text-white/50 text-xs">Storage, guidance & resonance</p>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* 1.1 WHAT IS A CRYSTALLINE MATRIX */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                    <FadeIn className="flex-1">
                        <div>
                            <h2 className="text-3xl font-display text-white mb-6">What is a Crystalline Matrix?</h2>
                            <div className="prose prose-invert text-slate-300">
                                <p>
                                    A crystal is not just a pretty stone. It is a repeating pattern of atoms or molecules, aligned in ordered geometries (cubes, hexagons, tetrahedra), able to resonate with light, electricity, and vibration.
                                </p>
                                <p>
                                    A crystalline matrix forms when these ordered structures connect into networks:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                                    <li>Rock layers in the Earth</li>
                                    <li>Mineral grids in the crust</li>
                                    <li>Silica-based structures in water and biology</li>
                                    <li>Collagen and cytoskeleton inside the body</li>
                                </ul>
                                <p className="mt-4">
                                    They form pathways where charge travels, light slows down and bends, and information can be stored and repeated.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn className="flex-1 flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            <div className="absolute inset-0 border-2 border-cyan-500/20 rotate-45 rounded-3xl animate-pulse" />
                            <div className="absolute inset-4 border-2 border-cyan-500/40 rounded-full" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Grid className="w-24 h-24 text-cyan-500/60" />
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 1.2 SACRED GEOMETRY */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-display text-white mb-12 text-center">Sacred Geometry & Minerals</h2>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="flex gap-4 items-start">
                            <Triangle className="w-10 h-10 text-amber-400 shrink-0" />
                            <div>
                                <h3 className="text-white font-bold text-lg">Tetrahedron</h3>
                                <p className="text-slate-400 text-sm">Stability + Direction. Often seen in silicates.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <Box className="w-10 h-10 text-emerald-400 shrink-0" />
                            <div>
                                <h3 className="text-white font-bold text-lg">Cube / Square</h3>
                                <p className="text-slate-400 text-sm">Grounding + Structure. Seen in halite and pyrite.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <Hexagon className="w-10 h-10 text-cyan-400 shrink-0" />
                            <div>
                                <h3 className="text-white font-bold text-lg">Hexagon</h3>
                                <p className="text-slate-400 text-sm">Efficiency + Packing. Seen in quartz, snowflakes, honeycombs.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <Waves className="w-10 h-10 text-purple-400 shrink-0" />
                            <div>
                                <h3 className="text-white font-bold text-lg">Spirals</h3>
                                <p className="text-slate-400 text-sm">Growth + Movement. Vortices and shells.</p>
                            </div>
                        </div>
                    </StaggerContainer>

                    <FadeIn>
                        <p className="text-center text-slate-300 max-w-2xl mx-auto italic">
                            "These shapes are not only symbolic – they shape how electric fields move, how water aligns, and how frequencies get filtered."
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* 1.3 CRYSTALLINE WATER */}
            <section className="py-24 bg-[#020617] relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <div className="bg-[#0b1020] border border-white/5 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                            <h2 className="text-2xl md:text-3xl font-display text-white mb-6">Crystalline Water: Liquid Crystal Behavior</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4 text-slate-300">
                                    <p>
                                        Inside and around crystals, water can behave like a liquid crystal: partly fluid, partly ordered. It becomes sensitive to fields, light, temperature, and minerals.
                                    </p>
                                    <p>
                                        When water interacts with silica, clay, biotite, or collagen, it organizes into zones of higher structure. This creates specific refractive and electrical properties.
                                    </p>
                                </div>
                                <div className="bg-black/20 p-6 rounded-xl border border-white/5">
                                    <h4 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" /> The Structured Water Connection
                                    </h4>
                                    <p className="text-sm text-slate-400 mb-4">
                                        This is deeply connected to EZ (Exclusion Zone) water. It's not magic; it's physics. Ordered surfaces create ordered water layers.
                                    </p>
                                    <Link href="/science/ez-water-overview" className="text-xs text-white hover:text-cyan-400 font-bold underline decoration-white/20 underline-offset-4">
                                        Learn more about EZ Water &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 1.4 MEMORY */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <Lightbulb className="w-12 h-12 text-yellow-500/80 mx-auto mb-6" />
                        <h2 className="text-3xl font-display text-white mb-6">Light, Minerals & "Memory"</h2>
                        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                            We don’t need to promise magic. We can simply observe: When you combine ordered matter (crystals) with ordered energy (coherent light) and a sensitive medium (water), you get patterns that persist.
                        </p>
                        <div className="p-6 bg-white/5 rounded-xl inline-block max-w-xl mx-auto">
                            <p className="text-white font-medium">
                                "Water aligned to these structures may hold patterns of charge and arrangement for a while. That is a practical way to talk about memory and imprinting."
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 1.5 SUMMARY FOR ANDARA */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-display text-white mb-8">Why This Matters for Andara</h2>
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Beyond Ingredients</h3>
                                <p className="text-slate-400 text-sm">Explains why minerals are not just chemical ingredients, but geometry + charge.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                            <div>
                                <h3 className="text-white font-bold text-lg">The Unified Story</h3>
                                <p className="text-slate-400 text-sm">Connects structured water, sulfate ions, and mineral lattices into one coherent narrative.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Bridge to Consciousness</h3>
                                <p className="text-slate-400 text-sm">Provides a bridge from Earth geology → water → body → consciousness without over-claiming.</p>
                            </div>
                        </li>
                    </ul>

                    <div className="mt-12 text-center p-8 bg-[#0b1020] rounded-2xl border border-cyan-500/10">
                        <p className="text-xl text-white font-light italic mb-6">
                            "The world is wired with invisible crystal networks. Water reads and rides them. Andara minerals are the keys."
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/bioelectricity" className="px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-lg transition-colors font-bold text-sm">
                                Next: Bioelectricity
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
