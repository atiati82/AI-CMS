import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import {
    Atom,
    Droplets,
    User,
    Sprout,
    Network,
    ArrowRight
} from "lucide-react";
import { Link } from "wouter";
import { TerrainsCycleDiagram } from "@/components/visuals/TerrainsCycleDiagram";

export default function MineralBlueprintPage() {
    return (
        <StandardPageLayout
            title={<>Mineral Science <span className="text-purple-400">Blueprint</span></>}
            subtitle="Decode the Elemental Blueprint Behind Water, Body & Soil."
            heroVariant="purple"
            heroIcon={Network}
            registryId="mineral-network"
            badges={[{ text: "Systems Thinking", icon: Network }]}
            seoTitle="Mineral Science – Decode the Elemental Blueprint | Andara"
            seoDescription="Minerals are the blueprint that connects Water, Body, and Soil. Explore the 3 Terrains and the role of ionic sulfates in this system."
        >
            {/* 1. HERO CONTEXT */}
            <section className="py-24 bg-gradient-to-b from-[#0a0c14] to-[#05060b] relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="prose prose-invert max-w-3xl mx-auto mb-12 text-center">
                        <p className="text-xl text-slate-300 leading-relaxed">
                            Minerals are not just nutrients; they are the pattern-makers. They write the invisible blueprint that allows life to organize, hold water, and transfer energy.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. THREE TERRAINS - VISUAL CYCLE */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-light text-white mb-4">The Three <span className="andara-text-gold-gradient">Terrains</span> Cycle</h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-full max-w-md mx-auto mb-6" />
                        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                            Minerals don't just sit in a bottle. They cycle continuously between water, body, and soil, acting as the <strong className="text-white">connective language</strong> between these systems.
                        </p>
                    </div>

                    <div className="w-full max-w-4xl mx-auto">
                        <TerrainsCycleDiagram />
                    </div>
                </div>
            </section>

            {/* 3. KEY FAMILIES */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-light text-white mb-4 text-center">The Elemental <span className="andara-text-gold-gradient">Families</span></h2>
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-full max-w-md mx-auto mb-12" />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 border border-white/10 rounded-xl bg-slate-900/60 backdrop-blur-xl hover:border-emerald-500/40 transition-all">
                            <strong className="block text-emerald-400 mb-2">The Builders</strong>
                            <span className="text-sm text-slate-400">Calcium, Magnesium. Provide structure and stability.</span>
                        </div>
                        <div className="p-6 border border-white/10 rounded-xl bg-slate-900/60 backdrop-blur-xl hover:border-blue-500/40 transition-all">
                            <strong className="block text-blue-400 mb-2">The Movers</strong>
                            <span className="text-sm text-slate-400">Sodium, Potassium. Regulate fluid balance and pumps.</span>
                        </div>
                        <div className="p-6 border border-white/10 rounded-xl bg-slate-900/60 backdrop-blur-xl hover:border-amber-500/40 transition-all">
                            <strong className="block text-amber-400 mb-2">The Spark</strong>
                            <span className="text-sm text-slate-400">Trace Elements. Catalysts for enzymes and reactions.</span>
                        </div>
                        <div className="p-6 border border-white/10 rounded-xl bg-slate-900/60 backdrop-blur-xl hover:border-purple-500/40 transition-all">
                            <strong className="block text-purple-400 mb-2">The Architects</strong>
                            <span className="text-sm text-slate-400">Sulfur / Sulfates. Determine geometry and hydration layers.</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. ANDARA'S PLACE */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto text-center">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Atom className="w-8 h-8 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-display text-white mb-4">Andara's Role in the Blueprint</h2>
                    <p className="text-muted-foreground mb-8">
                        Andara Ionic provides the <strong>sulfate-mineral key</strong>. It is designed to restore the "Architect" function in water, re-establishing the geometric blueprint so that biology can recognize and use the water effectively.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/sulfate-chemistry">
                            <a className="text-primary hover:underline flex items-center gap-1">Sulfate Chemistry <ArrowRight className="w-4 h-4" /></a>
                        </Link>
                        <Link href="/science/mineral-sources">
                            <a className="text-primary hover:underline flex items-center gap-1">Mineral Sources <ArrowRight className="w-4 h-4" /></a>
                        </Link>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
