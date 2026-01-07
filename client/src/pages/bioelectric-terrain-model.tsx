import React from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import StandardPageLayout from "@/components/StandardPageLayout";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { Link } from "wouter";
import {
    Activity,
    Lock,
    Unlock,
    MoveRight,
    Split,
    Zap,
    Layers,
    Hexagon,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CellMembraneElectricModelPage() {
    return (
        <StandardPageLayout
            title={<>Cell Membrane <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-500">Electric Model</span></>}
            subtitle={<>The Cell as a Battery.<br />Boundaries Create Voltage.</>}
            
            heroVariant="blue"
            heroIcon={Layers}
            badges={[{ text: "Membrane Potential", icon: Layers }]}
            seoTitle="Cell Membrane Electric Model: The Cell as a Battery (Membrane Potential Explained)"
            seoDescription="Learn the cell membrane electric model in the Andara Library: the cell as a battery created by boundaries, ion gradients, and water as the carrier medium."
            relatedLinks={[
                { title: "Ion Channels", url: "/ion-channels-gradients", type: "internal" },
                { title: "Cell Voltage", url: "/cell-voltage", type: "internal" }
            ]}
        >

            {/* THE MINIMAL MODEL */}
            <section className="relative z-10 py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-3xl font-display text-white mb-6">Boundaries Create Voltage</h2>
                        <p className="text-white/70 mb-12 leading-relaxed text-lg max-w-3xl mx-auto">
                            The most important idea in bioelectricity is simple: A boundary that separates charge creates potential. The cell membrane is that boundary. "Cell as a battery" is not just a metaphor—it's a clean way to understand bioelectricity.
                        </p>

                        <div className="bg-[#0b1020] p-10 rounded-2xl border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
                            <h3 className="text-xl font-bold text-white mb-8">The Minimal Model (Battery Elements)</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-blue-900/40 flex items-center justify-center mb-4 border border-blue-500/30">
                                        <Split className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h4 className="font-bold text-white mb-2">1. Two Sides</h4>
                                    <p className="text-xs text-white/50">Inside vs Outside</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-blue-900/40 flex items-center justify-center mb-4 border border-blue-500/30">
                                        <Lock className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <h4 className="font-bold text-white mb-2">2. Boundary</h4>
                                    <p className="text-xs text-white/50">The Membrane</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-blue-900/40 flex items-center justify-center mb-4 border border-blue-500/30">
                                        <Activity className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <h4 className="font-bold text-white mb-2">3. Gradient</h4>
                                    <p className="text-xs text-white/50">Difference in Charge</p>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-white/10">
                                <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block mb-2">The Andara Definition</span>
                                <p className="text-white/80 italic text-lg">
                                    "Membrane potential = voltage created by charge separation across a boundary."
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ACTIVE REGULATOR & GATING */}
            <section className="relative z-10 py-20 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <FadeIn>
                            <div>
                                <h2 className="text-3xl font-display text-white mb-6">Active Regulator</h2>
                                <p className="text-white/70 mb-6 leading-relaxed">
                                    The membrane is not just a wall. It is an active regulator of flow. It creates separation, selectivity, and timing. This is why bioelectricity is <span className="text-white font-bold">organized electricity</span>, not random static.
                                </p>
                                <div className="space-y-4">
                                    <div className="bg-[#0b1020] rounded-xl border border-white/5 p-6 flex items-start gap-4">
                                        <Unlock className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Selective Permeability</h4>
                                            <p className="text-white/60 text-sm">
                                                Some things pass easily (water), others pass only through channels (ions). This "gating" is foundational.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-[#0b1020] rounded-xl border border-white/5 p-6 flex items-start gap-4">
                                        <MoveRight className="w-6 h-6 text-amber-400 mt-1 shrink-0" />
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Stored Direction</h4>
                                            <p className="text-white/60 text-sm">
                                                Gradients are stored direction. They create the potential for movement (bio-work).
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn>
                            <div className="my-8 rounded-xl overflow-hidden border border-white/10 relative shadow-2xl shadow-teal-900/10">
                                <SmartImage
                                    
                                    aspectRatio="aspect-square"
                                    className="w-full"
                                    interaction="reveal"
                                />
                                <div className="absolute inset-0 border border-teal-500/20 rounded-xl pointer-events-none" />
                            </div>
                            <div className="bg-[#0b1020] rounded-2xl border border-white/5 p-8 relative overflow-hidden aspect-square flex flex-col items-center justify-center">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50" />

                                <div className="w-64 h-64 rounded-full border-4 border-white/20 relative flex items-center justify-center">
                                    {/* Inner Cell */}
                                    <div className="absolute inset-2 rounded-full border border-white/5 bg-blue-500/5 animate-pulse" />

                                    <span className="text-xs text-white/30 uppercase tracking-widest absolute -top-8">Outside (+)</span>
                                    <span className="text-xs text-white/30 uppercase tracking-widest absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Inside (-)</span>

                                    {/* Ion Channel Graphic */}
                                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-white/10 backdrop-blur-md border border-white/30 rounded flex flex-col items-center justify-center gap-1">
                                        <div className="w-1 h-1 rounded-full bg-yellow-400" />
                                        <div className="w-1 h-1 rounded-full bg-yellow-400" />
                                    </div>

                                    <div className="absolute right-8 top-1/2 -translate-y-1/2 text-yellow-400 text-xs font-bold animate-bounce opacity-50">
                                        Na+
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-0 right-0 text-center">
                                    <p className="text-white/40 text-xs">Simplified Membrane Model</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* PROTONS & ENERGY */}
            <section className="py-20 bg-[#020617]">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold mb-6">
                            <Zap className="w-3 h-3" /> Includes Energy Transfer
                        </div>
                        <h2 className="text-3xl font-display text-white mb-6">Proton Gradients</h2>
                        <p className="text-white/70 mb-12 max-w-2xl mx-auto">
                            Proton gradients get special attention because they are the "energy language" of life (ATP synthesis, mitochondria). pH is essentially a measure of this proton environment context.
                        </p>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/science/proton-gradients-energy-transfer" className="block w-full">
                            <div className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left px-6 transition-colors group">
                                <span className="block text-white font-bold mb-1 group-hover:text-red-400 transition-colors">Proton Gradients Concept</span>
                                <span className="text-white/40 text-xs">Learn the mechanics →</span>
                            </div>
                        </Link>
                        <Link href="/ph-balance-water" className="block w-full">
                            <div className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left px-6 transition-colors group">
                                <span className="block text-white font-bold mb-1 group-hover:text-cyan-400 transition-colors">pH as Context</span>
                                <span className="text-white/40 text-xs">Review pH markers →</span>
                            </div>
                        </Link>
                    </StaggerContainer>
                </div>
            </section>

            {/* WATER & HYDRATION LAYERS */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-5xl mx-auto">
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-[#0b1020] rounded-2xl border border-white/5 p-8">
                            <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
                                <Layers className="w-5 h-5" /> Water's Role
                            </h3>
                            <p className="text-white/70 text-sm mb-4 leading-relaxed">
                                The membrane doesn't exist in a vacuum. It is surrounded by water. Water is the medium in which ions move, charges distribute, and bioelectricity happens.
                            </p>
                            <span className="text-white/40 text-xs italic">"Bioelectricity is always water + ions + boundary."</span>
                        </div>

                        <div className="bg-[#0b1020] rounded-2xl border border-white/5 p-8">
                            <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                                <Hexagon className="w-5 h-5" /> Hydration Layers
                            </h3>
                            <p className="text-white/70 text-sm mb-4 leading-relaxed">
                                When a boundary exists, water organizes at the surface. These "hydration layers" (or interface water) help stabilize local ordering patterns and support gradient coherence.
                            </p>
                            <Link href="/science/water-structure" className="text-white/50 hover:text-white text-xs underline decoration-dashed">Explore Interfaces</Link>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* NEXT STEPS */}
            <section className="py-24 bg-[#020617]">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <FadeIn>
                        <div className="p-8 bg-[#0b1020] rounded-2xl border border-white/5">
                            <h4 className="text-white font-bold mb-6">Continue Building the Model</h4>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/science/ion-transport">
                                    <Button variant="andara-glass" size="lg" className="rounded-full h-12 px-8">
                                        Ion Channels & Gradients <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                                <Link href="/bioelectricity">
                                    <Button variant="andara-outline" size="lg" className="rounded-full h-12 px-8">
                                        Back to Hub
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </StandardPageLayout>
    );
}
