// @ts-nocheck
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { LiquidBentoGrid, FlowSection, ActiveGlassCard } from "@/components/design/LiquidAlchemyExpansion";
import { Layers, Box, Cpu, Sparkles, Workflow, Database, FlaskConical, Microscope } from 'lucide-react';
import { HeroGlass } from "@/components/visuals/HeroGlass";

export default function LiquidExpansionDemo() {

    // Sample Data for Bento Grid
    const modules = [
        {
            id: "structure",
            title: "Geometric Core",
            description: "The fundamental lattice structure of the design system. Rigid yet permeable.",
            className: "md:col-span-1 md:row-span-2",
            icon: Box,
            header: <div className="w-full h-full bg-slate-800/50 flex items-center justify-center"><Box className="w-24 h-24 text-white/5" /></div>
        },
        {
            id: "fluidity",
            title: "Liquid Dynamics",
            description: "State-of-the-art motion primitives that mimic fluid dynamics.",
            className: "md:col-span-2",
            icon: FlaskConical,
            header: <div className="w-full h-full bg-gradient-to-r from-emerald-900/20 to-cyan-900/20" />
        },
        {
            id: "interaction",
            title: "Proactive Glass",
            description: "Interfaces that respond to presence before touch.",
            className: "md:col-span-1",
            icon: Sparkles
        },
        {
            id: "data",
            title: "Deep Data Layers",
            description: "Visualizing complex mineral data through stratified opacity.",
            className: "md:col-span-1",
            icon: Database
        },
    ];

    return (
        <StandardPageLayout>
            <HeroGlass
                title="Liquid Alchemy V2"
                subtitle="Research and expansion of the Andara Design System into state-of-the-art layouts."
                badgeText="Design System"
                variant="gold"
            // No image for this abstract demo, just the gradient/effects
            >
                <div className="flex gap-4 justify-center mt-8">
                    <button className="px-6 py-3 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold tracking-wider uppercase text-xs hover:bg-amber-500/30 transition-colors">
                        View Documentation
                    </button>
                    <button className="px-6 py-3 rounded-full bg-white/5 text-slate-300 border border-white/10 font-bold tracking-wider uppercase text-xs hover:bg-white/10 transition-colors">
                        Component Library
                    </button>
                </div>
            </HeroGlass>

            <FlowSection variant="aurora">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-6">
                        The Crystal Lattice
                    </h2>
                    <p className="text-lg text-slate-400 font-light leading-relaxed">
                        A bento-grid based expansion allowing for asymmetrical, content-driven layouts that maintain the signature "glass" aesthetic while introducing high-performance active states.
                    </p>
                </div>

                <LiquidBentoGrid items={modules} />
            </FlowSection>

            <FlowSection variant="obsidian" className="border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
                            <Microscope className="w-4 h-4" /> Case Study
                        </div>
                        <h3 className="text-3xl font-display font-bold text-white mb-6">Atomic Design Principles</h3>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Expanding beyond simple cards to "Active Surfaces". These surfaces are not just containers, but responsive viewports into the underlying data strata.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Spotlight Hover Effects",
                                "Refractive Borders",
                                "Variable Blur Depth",
                                "Liquid Motion Backgrounds"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-300">
                                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative">
                        {/* Visual Demo of nested glass */}
                        <ActiveGlassCard className="h-96 w-full p-8 flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-cyan-500/5" />
                            <div className="relative z-10 w-full max-w-sm">
                                <ActiveGlassCard className="h-48 w-full bg-black/40 border-emerald-500/20 flex flex-col items-center justify-center">
                                    <Workflow className="w-12 h-12 text-emerald-400 mb-4 opacity-80" />
                                    <span className="text-sm font-bold text-emerald-100 uppercase tracking-widest">Nested Recursion</span>
                                </ActiveGlassCard>
                            </div>
                        </ActiveGlassCard>
                    </div>
                </div>
            </FlowSection>

        </StandardPageLayout>
    );
}
// @ts-nocheck
