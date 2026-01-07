import React, { useEffect } from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { BackgroundLayer } from "@/components/visuals/BackgroundLayer";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/button";
import {
    Globe,
    Layers,
    Zap,
    Atom,
    RotateCw,
    Sun,
    Magnet,
    ArrowRight,
    HelpCircle,
    Map,
    Microscope,
    Box,
    Hexagon,
    Scale,
    Activity,
    Cpu
} from "lucide-react";

export default function WaterCrystalGeometryMapPage() {

    // --- JSON-LD Call ---
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Water, Crystal & Geometry Map: Integrated Field Model",
        "description": "Master integration map connecting water structure, minerals, geometry, and measurable field variables."
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the Water–Crystal–Geometry Map?",
                "acceptedAnswer": { "@type": "Answer", "text": "A master model linking minerals (ions), hydration interfaces, gradients (pH/ORP drift), and field variables (light, vortex, magnetics) into one testable framework." }
            },
            {
                "@type": "Question",
                "name": "Is this a scientific claim or a metaphor?",
                "acceptedAnswer": { "@type": "Answer", "text": "It’s an educational framework grounded in measurable windows, while geometry is used as pattern language to organize learning and design." }
            }
        ]
    };

    return (
        <StandardPageLayout
            title={<>Water, Crystal <br />& <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-500">Geometry Map</span></>}
            subtitle={<>The Integrated Field Model.<br />Linking Ions, Interfaces & Gradients.</>}

            heroVariant="emerald"
            heroIcon={Map}
            badges={[{ text: "Master Framework", icon: Globe }]}
            seoTitle="Water, Crystal & Geometry Map: The Integrated Field Model"
            seoDescription="The Water–Crystal–Geometry Map is Andara’s integrated field model linking ions (minerals), interfaces, gradients, and field variables like light and vortex flow."
            extraHead={
                <>
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
                </>
            }
        >

            {/* SECTION 1: THE 4-LAYER MODEL */}
            <section className="py-24 bg-[#05060b] relative border-y border-white/5 overflow-hidden">
                <BackgroundLayer registryId="water-geometry" opacity={10} />
                <div className="container px-4 max-w-6xl mx-auto relative z-10">
                    <h2 className="text-3xl font-display text-white mb-16 text-center">The 4-Layer Integrated Field Model</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Layer 1: Ion Field */}
                        <div className="andara-glass-card p-6 relative group group-hover:bg-amber-500/10 transition-colors">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 mb-4 font-bold border border-amber-500/30">1</div>
                            <h3 className="text-xl font-bold text-white mb-2">Ion Field</h3>
                            <span className="text-xs font-mono text-amber-400 uppercase tracking-wide mb-4 block">The Carriers</span>
                            <p className="text-white/60 text-sm mb-6 min-h-[40px]">Minerals determine conductivity and density.</p>

                            <div className="p-3 bg-white/5 rounded-lg mb-4">
                                <div className="flex items-center gap-2 text-xs text-white/80 font-bold mb-1"><Microscope className="w-3 h-3" /> Measure</div>
                                <div className="text-white/60 text-xs">EC / TDS Meters</div>
                            </div>

                            <Link href="/mineral-science-blueprint" className="flex items-center gap-2 text-amber-400 text-xs font-bold hover:underline mt-auto">
                                Explore Minerals <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        {/* Layer 2: Interface Field */}
                        <div className="andara-glass-card p-6 relative group group-hover:bg-cyan-500/10 transition-colors">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500 mb-4 font-bold border border-cyan-500/30">2</div>
                            <h3 className="text-xl font-bold text-white mb-2">Interface Field</h3>
                            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wide mb-4 block">The Organizers</span>
                            <p className="text-white/60 text-sm mb-6 min-h-[40px]">Boundaries determine drift and particle organization.</p>

                            <div className="p-3 bg-white/5 rounded-lg mb-4">
                                <div className="flex items-center gap-2 text-xs text-white/80 font-bold mb-1"><Layers className="w-3 h-3" /> Measure</div>
                                <div className="text-white/60 text-xs">Clarity / Drift (Open vs Closed)</div>
                            </div>

                            <Link href="/science/water-structure" className="flex items-center gap-2 text-cyan-400 text-xs font-bold hover:underline mt-auto relative z-10">
                                Explore Interfaces <ArrowRight className="w-3 h-3" />
                            </Link>

                            {/* Ecosystem Visual */}
                            <div className="absolute inset-x-0 bottom-0 h-32 opacity-30 group-hover:opacity-50 transition-opacity pointer-events-none mix-blend-screen">
                                <SmartImage registryId="hydration-stack-diagram" className="w-full h-full object-cover mask-image-b" />
                            </div>
                        </div>

                        {/* Layer 3: Gradient Field */}
                        <div className="andara-glass-card p-6 relative group group-hover:bg-purple-500/10 transition-colors">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 mb-4 font-bold border border-purple-500/30">3</div>
                            <h3 className="text-xl font-bold text-white mb-2">Gradient Field</h3>
                            <span className="text-xs font-mono text-purple-400 uppercase tracking-wide mb-4 block">The Engines</span>
                            <p className="text-white/60 text-sm mb-6 min-h-[40px]">Directionality via pH and redox potential.</p>

                            <div className="p-3 bg-white/5 rounded-lg mb-4">
                                <div className="flex items-center gap-2 text-xs text-white/80 font-bold mb-1"><Zap className="w-3 h-3" /> Measure</div>
                                <div className="text-white/60 text-xs">pH / ORP Drifts (Temp Controlled)</div>
                            </div>

                            <Link href="/science/proton-gradients-energy-transfer" className="flex items-center gap-2 text-purple-400 text-xs font-bold hover:underline mt-auto">
                                Explore Gradients <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        {/* Layer 4: Variables */}
                        <div className="andara-glass-card p-6 relative group group-hover:bg-blue-500/10 transition-colors">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 mb-4 font-bold border border-blue-500/30">4</div>
                            <h3 className="text-xl font-bold text-white mb-2">Variables</h3>
                            <span className="text-xs font-mono text-blue-400 uppercase tracking-wide mb-4 block">The Environment</span>
                            <p className="text-white/60 text-sm mb-6 min-h-[40px]">External inputs that influence organization.</p>

                            <div className="p-3 bg-white/5 rounded-lg mb-4">
                                <div className="flex items-center gap-2 text-xs text-white/80 font-bold mb-1"><Globe className="w-3 h-3" /> Measure</div>
                                <div className="text-white/60 text-xs">Drift under Light / Vortex / Magnet</div>
                            </div>

                            <Link href="/science/light-sound-water" className="flex items-center gap-2 text-blue-400 text-xs font-bold hover:underline mt-auto">
                                Explore Variables <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* GEOMETRY & VARIABLES CLUSTER */}
            <section className="py-24 bg-[#020617] relative">
                <BackgroundLayer registryId="water-geometry" opacity={5} />
                <div className="container px-4 max-w-5xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* Geometry Layer */}
                        <div>
                            <h2 className="text-2xl font-display text-white mb-8 flex items-center gap-3">
                                <Box className="w-6 h-6 text-amber-400" /> Geometry Layer
                            </h2>
                            <div className="space-y-4">
                                <Link href="/science/hexagonal-structures" className="block p-4 andara-glass-panel hover:bg-white/5 transition-colors group">
                                    <div className="flex items-center justify-between">
                                        <strong className="text-white group-hover:text-amber-400 transition-colors">Hexagonal Symmetry</strong>
                                        <Hexagon className="w-4 h-4 text-white/20 group-hover:text-amber-400" />
                                    </div>
                                    <p className="text-white/60 text-sm mt-2">Organization motifs. Visualizing order.</p>
                                </Link>

                                <Link href="/science/tetrahedral-sulfate-geometry" className="block p-4 andara-glass-panel hover:bg-white/5 transition-colors group">
                                    <div className="flex items-center justify-between">
                                        <strong className="text-white group-hover:text-amber-400 transition-colors">Tetrahedral Sulfate</strong>
                                        <Box className="w-4 h-4 text-white/20 group-hover:text-amber-400" />
                                    </div>
                                    <p className="text-white/60 text-sm mt-2">Molecular bridge linking mineral chemistry to form.</p>
                                </Link>

                                <Link href="/science/triangular-harmonics" className="block p-4 andara-glass-panel hover:bg-white/5 transition-colors group">
                                    <div className="flex items-center justify-between">
                                        <strong className="text-white group-hover:text-amber-400 transition-colors">Pattern Language</strong>
                                        <Activity className="w-4 h-4 text-white/20 group-hover:text-amber-400" />
                                    </div>
                                    <p className="text-white/60 text-sm mt-2">The navigation and design system.</p>
                                </Link>
                            </div>
                        </div>

                        {/* Variables Layer */}
                        <div>
                            <h2 className="text-2xl font-display text-white mb-8 flex items-center gap-3">
                                <Globe className="w-6 h-6 text-cyan-400" /> Field Variables
                            </h2>
                            <div className="space-y-4">
                                <Link href="/science/light-sound-water" className="block p-4 andara-glass-panel hover:bg-white/5 transition-colors group">
                                    <div className="flex items-center justify-between">
                                        <strong className="text-white group-hover:text-cyan-400 transition-colors">Light (Photonic)</strong>
                                        <Sun className="w-4 h-4 text-white/20 group-hover:text-cyan-400" />
                                    </div>
                                    <p className="text-white/60 text-sm mt-2">Environmental boundary condition testing.</p>
                                </Link>

                                <Link href="/vortex-technologies" className="block p-4 andara-glass-panel hover:bg-white/5 transition-colors group">
                                    <div className="flex items-center justify-between">
                                        <strong className="text-white group-hover:text-cyan-400 transition-colors">Flow (Vortex)</strong>
                                        <RotateCw className="w-4 h-4 text-white/20 group-hover:text-cyan-400" />
                                    </div>
                                    <p className="text-white/60 text-sm mt-2">Reorganizing particles via spin.</p>
                                </Link>

                                <Link href="/magnet-placement-experiments" className="block p-4 andara-glass-panel hover:bg-white/5 transition-colors group">
                                    <div className="flex items-center justify-between">
                                        <strong className="text-white group-hover:text-cyan-400 transition-colors">Magnetics</strong>
                                        <Magnet className="w-4 h-4 text-white/20 group-hover:text-cyan-400" />
                                    </div>
                                    <p className="text-white/60 text-sm mt-2">Discipline-first baseline testing.</p>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#0b1020]">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Common Questions</h2>
                    <div className="space-y-4">
                        {faqSchema.mainEntity.map((item, i) => (
                            <div key={i} className="andara-glass-panel p-6">
                                <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                    <HelpCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                                    {item.name}
                                </h3>
                                <p className="text-white/60 pl-8 leading-relaxed text-sm">{item.acceptedAnswer.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </StandardPageLayout>
    );
}
