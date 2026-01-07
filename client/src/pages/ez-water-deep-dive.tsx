import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { Link } from "wouter";
import { BackgroundLayer } from "@/components/visuals/BackgroundLayer";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/ui/SmartImage";
import {
    Map,
    Layers,
    Droplets,
    Leaf,
    User,
    ArrowRight,
    HelpCircle,
    FlaskConical,
    Globe,
    Zap,
    ShieldCheck
} from "lucide-react";

export default function BioelectricMapsPage() {
    return (
        <StandardPageLayout
            title={<>Bioelectric <span className="text-cyan-400">Maps</span></>}
            subtitle={<>Water · Body · Soil<br />Understanding the shared terrain logic across scales.</>}
            heroVariant="cyan"
            heroIcon={Map}
            badges={[{ text: "Universal Patterns", icon: Map }]}
            seoTitle="Bioelectric Maps: Water, Body & Soil — One Terrain Pattern Across Scales"
            seoDescription="Explore Andara’s bioelectric maps across scales: how water, the body, and soil share a common terrain pattern of ions, interfaces, gradients, and conductivity."
        >
            {/* DEFINITION: CONTEXT LAYERS */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10 overflow-hidden">
                <BackgroundLayer  opacity={20} />
                <div className="container px-4 max-w-6xl mx-auto relative z-10">
                    <h2 className="text-3xl font-display text-white mb-16 text-center">The 4 Universal Map Layers</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Layer 1 */}
                        <div className="group relative bg-[#0b1020]/80 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] overflow-hidden">
                            <BackgroundLayer  opacity={60} />
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 right-4 text-white/5 text-6xl font-display font-bold group-hover:text-cyan-500/10 transition-colors">1</div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Droplets className="w-6 h-6" />
                                </div>
                                <h3 className="text-white font-bold mb-3 text-lg group-hover:text-cyan-300 transition-colors">Carrier Medium</h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed">Water is the stage. Every system begins with the hydrated environment.</p>
                                <Link href="/science/bioelectric-water">
                                    <span className="text-xs font-bold text-cyan-400/80 hover:text-cyan-300 uppercase tracking-widest flex items-center gap-2 cursor-pointer">
                                        Explore Water <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Layer 2 */}
                        <div className="group relative bg-[#0b1020]/80 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] overflow-hidden">
                            <BackgroundLayer  opacity={60} />
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 right-4 text-white/5 text-6xl font-display font-bold group-hover:text-yellow-500/10 transition-colors">2</div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-white font-bold mb-3 text-lg group-hover:text-yellow-300 transition-colors">Charge Carriers</h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed">Ions allow the "spark." Without them, the medium is silent.</p>
                                <Link href="/science/ionic-vs-colloidal-vs-solid">
                                    <span className="text-xs font-bold text-yellow-400/80 hover:text-yellow-300 uppercase tracking-widest flex items-center gap-2 cursor-pointer">
                                        Ionic Context <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Layer 3 */}
                        <div className="group relative bg-[#0b1020]/80 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] overflow-hidden">
                            <BackgroundLayer  opacity={60} />
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 right-4 text-white/5 text-6xl font-display font-bold group-hover:text-blue-500/10 transition-colors">3</div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <h3 className="text-white font-bold mb-3 text-lg group-hover:text-blue-300 transition-colors">Interfaces</h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed">Boundaries create structure. Surfaces organize the water.</p>
                                <Link href="/science/water-structure">
                                    <span className="text-xs font-bold text-blue-400/80 hover:text-blue-300 uppercase tracking-widest flex items-center gap-2 cursor-pointer">
                                        Structure <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Layer 4 */}
                        <div className="group relative bg-[#0b1020]/80 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] overflow-hidden">
                            <BackgroundLayer  opacity={60} />
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 right-4 text-white/5 text-6xl font-display font-bold group-hover:text-red-500/10 transition-colors">4</div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h3 className="text-white font-bold mb-3 text-lg group-hover:text-red-300 transition-colors">Gradients</h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed">Differences create direction. Conductivity explains distribution.</p>
                                <Link href="/science/proton-gradients-energy-transfer">
                                    <span className="text-xs font-bold text-red-400/80 hover:text-red-300 uppercase tracking-widest flex items-center gap-2 cursor-pointer">
                                        Protons & Flow <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE 3 SYSTEMS MAPS */}
            <section className="py-24 bg-[#020617] relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">

                    {/* Map A: Water */}
                    <Link href="/science/water-science-master" className="group block mb-12">
                        <div className="relative p-10 rounded-3xl bg-[#0b1020] border border-white/5 transition-all duration-500 overflow-hidden hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                            <BackgroundLayer  opacity={60} />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center border-b border-white/5 pb-8 mb-8">
                                <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                                    <Droplets className="w-10 h-10 text-blue-400" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-display text-white mb-2 group-hover:text-blue-300 transition-colors">Map A: Water Systems</h3>
                                    <p className="text-white/60 text-lg font-light">
                                        Focuses on the container, the source, and the mineral addition. Water is never "just water"—it is a context carrier.
                                    </p>
                                </div>
                                <div className="shrink-0">
                                    <Button variant="andara-glass" className="rounded-full">
                                        Explore Water <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="relative z-10 flex justify-center md:justify-start gap-12">
                                <div className="text-center">
                                    <span className="block text-xs font-bold text-blue-400/60 uppercase tracking-widest mb-1">01</span>
                                    <span className="text-white text-sm font-medium">Source</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-xs font-bold text-blue-400/60 uppercase tracking-widest mb-1">02</span>
                                    <span className="text-white text-sm font-medium">Container</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-xs font-bold text-blue-400/60 uppercase tracking-widest mb-1">03</span>
                                    <span className="text-white text-sm font-medium">Minerals</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Map B: Body */}
                    <Link href="/science/bioelectricity-invisible-voltage" className="group block mb-12">
                        <div className="relative p-10 rounded-3xl bg-[#0b1020] border border-white/5 transition-all duration-500 overflow-hidden hover:border-red-500/40 hover:shadow-[0_0_50px_rgba(239,68,68,0.1)]">
                            <BackgroundLayer  opacity={70} />
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center border-b border-white/5 pb-8 mb-8">
                                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20 group-hover:scale-110 transition-transform duration-500">
                                    <User className="w-10 h-10 text-red-400" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-display text-white mb-2 group-hover:text-red-300 transition-colors">Map B: Body Systems</h3>
                                    <p className="text-white/60 text-lg font-light">
                                        Focuses on hydration as an electrical context. The body is a field of gradients inside water, not just a machine of parts.
                                    </p>
                                </div>
                                <div className="shrink-0">
                                    <Button variant="andara-glass" className="rounded-full">
                                        Explore Body <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="relative z-10 flex justify-center md:justify-start gap-12">
                                <div className="text-center">
                                    <span className="block text-xs font-bold text-red-400/60 uppercase tracking-widest mb-1">01</span>
                                    <span className="text-white text-sm font-medium">Tissues</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-xs font-bold text-red-400/60 uppercase tracking-widest mb-1">02</span>
                                    <span className="text-white text-sm font-medium">Membranes</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-xs font-bold text-red-400/60 uppercase tracking-widest mb-1">03</span>
                                    <span className="text-white text-sm font-medium">Voltage</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Map C: Soil */}
                    <Link href="/mineral-science-blueprint" className="group block">
                        <div className="relative p-10 rounded-3xl bg-[#0b1020] border border-white/5 transition-all duration-500 overflow-hidden hover:border-green-500/40 hover:shadow-[0_0_50px_rgba(34,197,94,0.1)]">
                            <BackgroundLayer  opacity={70} />
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center border-b border-white/5 pb-8 mb-8">
                                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20 group-hover:scale-110 transition-transform duration-500">
                                    <Leaf className="w-10 h-10 text-green-400" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-display text-white mb-2 group-hover:text-green-300 transition-colors">Map C: Soil Systems</h3>
                                    <p className="text-white/60 text-lg font-light">
                                        Focuses on mineral-moisture interfaces. Soil is the "external gut" and hydration architecture for plants.
                                    </p>
                                </div>
                                <div className="shrink-0">
                                    <Button variant="andara-glass" className="rounded-full">
                                        Explore Minerals <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="relative z-10 flex justify-center md:justify-start gap-12">
                                <div className="text-center">
                                    <span className="block text-xs font-bold text-green-400/60 uppercase tracking-widest mb-1">01</span>
                                    <span className="text-white text-sm font-medium">Roots</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-xs font-bold text-green-400/60 uppercase tracking-widest mb-1">02</span>
                                    <span className="text-white text-sm font-medium">Microbes</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-xs font-bold text-green-400/60 uppercase tracking-widest mb-1">03</span>
                                    <span className="text-white text-sm font-medium">Network</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>
            </section>

            {/* COHERENCE PRACTICE */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <BackgroundLayer  opacity={30} />
                <div className="container px-4 max-w-5xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl font-display text-white mb-6">How to Use the Map</h2>
                    <p className="text-white/60 text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
                        Stop chasing single numbers. Start mapping the context. Follow this sequence for any system.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="relative p-6 rounded-xl bg-[#0b1020] border border-white/5">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0b1020] px-3 py-1 rounded-full border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">Step 1</div>
                            <p className="text-white/80 font-medium text-sm mt-4">Choose ONE system (Water, Body, or Soil). Don't mix them yet.</p>
                        </div>
                        <div className="relative p-6 rounded-xl bg-[#0b1020] border border-white/5">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0b1020] px-3 py-1 rounded-full border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">Step 2</div>
                            <p className="text-white/80 font-medium text-sm mt-4">Identify the 4 Layers (Medium, Ions, Interfaces, Gradients).</p>
                        </div>
                        <div className="relative p-6 rounded-xl bg-[#0b1020] border border-white/5">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0b1020] px-3 py-1 rounded-full border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">Step 3</div>
                            <p className="text-white/80 font-medium text-sm mt-4">Stabilize content. Use the 7-day window rule.</p>
                        </div>
                        <div className="relative p-6 rounded-xl bg-[#0b1020] border border-white/5">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0b1020] px-3 py-1 rounded-full border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">Step 4</div>
                            <p className="text-white/80 font-medium text-sm mt-4">Only then refine. Use the calculator to adjust dosing.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ANDARA CONNECTION */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10 overflow-hidden">
                <div className="container px-4 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
                    <div className="flex-1">
                        <span className="text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase mb-4 block">Ionic Foundation</span>
                        <h2 className="text-4xl font-display text-white mb-6">Ionic Context Across Maps</h2>
                        <p className="text-white/60 mb-8 text-lg font-light leading-relaxed">
                            Andara Ionic provides the <span className="text-cyan-400 font-medium">Layer 2 (Ionic Carrier)</span> context for your water map. This stabilizes the foundation so you can observe the pattern.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/terrain-concepts">
                                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-white border-0">
                                    Understand Terrain
                                </Button>
                            </Link>
                            <Link href="/andara-dilution-calculator">
                                <Button size="lg" variant="outline" className="text-cyan-400 border-cyan-500/20 hover:bg-cyan-950/30">
                                    <FlaskConical className="w-4 h-4 mr-2" /> Dosing Calc
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 w-full max-w-sm mx-auto">
                        <div className="relative bg-[#0b1020] p-10 rounded-3xl border border-white/5 text-center shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent rounded-3xl pointer-events-none" />
                            <Map className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                            <h3 className="text-xl text-white font-bold mb-3">Start with Water</h3>
                            <p className="text-white/50 text-sm mb-8 italic">
                                "When you stabilize the water map, the body map becomes easier to read."
                            </p>
                            <Link href="/getting-started-first-7-days">
                                <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30 w-full">
                                    7-Day Water Protocol <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Bioelectric Maps FAQ</h2>
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-[#0b1020]/50 border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                Are these maps literal scientific diagrams?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">They are framework maps: a structured way to think about terrain across systems using consistent layers.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#0b1020]/50 border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                Why connect water, body, and soil?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">Because the pattern of ions, interfaces, gradients, and conductivity repeats across scales.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#0b1020]/50 border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                What should I read next?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">Read Terrain Concepts and Voltage & Detox Pathways for the next level of the model.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#0b1020]/50 border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                Where do I start if I’m new?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">Start with the Water Science hub to build the foundation, then explore Mineral Science and Bioelectricity.</p>
                        </div>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
