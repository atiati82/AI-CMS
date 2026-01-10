import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { ScrollProgress } from "@/components/plugins/ScrollProgress";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { Link } from "wouter";
import {
    FlaskConical,
    Shield,
    Layers,
    Filter,
    Activity,
    Hexagon,
    ArrowRight
} from "lucide-react";

import { VideoBackground } from "@/components/SmartVideoEmbed";

export default function SulfatePathwaysPage() {
    return (
        <StandardPageLayout
            title={<>Sulfate <span className="text-emerald-400">Pathways</span></>}
            subtitle={<>Sulfur, Sulfate & the Terrain Model.<br /><span className="text-emerald-400/80">The hidden architects of structure.</span></>}
            backgroundElement={
                <VideoBackground
                    videoId="sulfate-structuring-bg"
                    keywords={["sulfate", "pathways", "detox", "structure"]}
                />
            }
            heroVariant="emerald"
            heroIcon={FlaskConical}
            badges={[{ text: "Chemistry & Terrain", icon: FlaskConical }]}
            seoTitle="Sulfate Pathways: Sulfur, Detox & Water Structure"
            seoDescription="Understand the critical role of sulfate in biological structure, detoxification, redox balance, and water clarification within the terrain model."
            relatedLinks={[
                { title: "Liquid Crystal Biology", url: "/liquid-crystal-biology", type: "internal" },
                { title: "Bioelectricity Hub", url: "/bioelectricity", type: "internal" }
            ]}
        >
            <ScrollProgress />

            {/* INTRO SECTION */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-8">The Hidden Architect</h2>
                        <p className="text-slate-300 leading-relaxed mb-12 max-w-2xl mx-auto">
                            Sulfur and sulfate are quiet giants. They appear in proteins, detox systems, connective tissue, and water clarification. This page explains sulfate as a terrain shaper – in water, in biology, in the in-between.
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
                        <div className="bg-[#0b1020] p-8 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Hexagon className="w-5 h-5 text-emerald-400" /> Sulfur (S)
                            </h3>
                            <p className="text-slate-400 text-sm">
                                The elemental form. Part of organic molecules like amino acids (cysteine, methionine).
                            </p>
                        </div>
                        <div className="bg-[#0b1020] p-8 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <FlaskConical className="w-5 h-5 text-emerald-400" /> Sulfate (SO₄²⁻)
                            </h3>
                            <p className="text-slate-400 text-sm">
                                The oxidized, charged form in water. A strongly structured ion with tetrahedral geometry that loves interfaces.
                            </p>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* 3.2 STRUCTURAL ION */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                    <FadeIn className="flex-1">
                        <div>
                            <h2 className="text-3xl font-display text-white mb-6">Sulfate as a Structural Ion</h2>
                            <div className="prose prose-invert text-slate-300">
                                <p>
                                    Wherever you find sulfate, you find interface chemistry at work. It helps form glycosaminoglycans (GAGs) in connective tissues and participates in protective mucous layers.
                                </p>
                                <p>
                                    Conceptually, sulfate-rich structures:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                                    <li>Hold water in ordered layers</li>
                                    <li>Cushion and separate surfaces</li>
                                    <li>Provide charge buffering and mechanical resilience</li>
                                </ul>
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn className="flex-1 flex justify-center">
                        <div className="relative isolate p-12 bg-[#0b1020] rounded-full border border-emerald-500/10">
                            <Layers className="w-48 h-48 text-emerald-500/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="p-4 bg-emerald-500/10 backdrop-blur-md rounded-lg border border-emerald-500/20 text-emerald-400 font-bold text-center">
                                    Structure +<br />Hydration
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 3.3 DETOX & REDOX */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <FadeIn>
                        <div className="bg-[#0b1020] p-8 md:p-12 rounded-2xl border border-emerald-500/20">
                            <h2 className="text-2xl font-display text-white mb-6 flex items-center gap-3">
                                <Shield className="w-6 h-6 text-emerald-400" />
                                Sulfate, Detox & Redox
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="text-slate-300 space-y-4">
                                    <p>
                                        In the terrain model, sulfate is closely tied to cleaning house. It is the final stage of many sulfur oxidation paths and is crucial for sulfation—a key route for transforming and clearing compounds.
                                    </p>
                                    <p>
                                        It participates indirectly in maintaining redox balance.
                                    </p>
                                </div>
                                <div className="bg-black/40 p-6 rounded-xl border border-white/5">
                                    <Activity className="w-8 h-8 text-emerald-400 mb-4" />
                                    <p className="text-sm text-slate-400 italic">
                                        "Wherever the body deals with load, waste, and transformation, sulfur pathways are nearby."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 3.4 WATER TREATMENT LINK */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <Filter className="w-12 h-12 text-emerald-500/60 mx-auto mb-6" />
                        <h2 className="text-3xl font-display text-white mb-6">Sulfate in Water: The Clarifier</h2>
                        <p className="text-slate-300 max-w-2xl mx-auto mb-12">
                            In water science, sulfates are used to clarify water through flocculation. They bind and precipitate impurities.
                            This means sulfate acts in both realms: as a clarifier in water treatment and as a structural/detox agent in biology.
                        </p>

                        <Link href="/science/turbidity-clarity-flocculation" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
                            Explore Mineral Flocculation <ArrowRight className="w-4 h-4" />
                        </Link>
                    </FadeIn>
                </div>
            </section>

            {/* 3.5 SUMMARY */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-6">The Bridge Ion</h2>
                        <p className="text-slate-300 mb-8">
                            Sulfate bridges water quality and terrain thinking. It is a symbol of structure + detox + interface + charge. You cannot separate water quality from mineral logic.
                        </p>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/science/liquid-crystal-biology-overview" className="p-4 rounded-xl border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-left group">
                            <span className="block text-xs text-slate-500 mb-1 group-hover:text-emerald-400">Next Pillar</span>
                            <span className="block text-white font-bold">Liquid Crystal Biology &rarr;</span>
                        </Link>
                        <Link href="/bioelectricity" className="p-4 rounded-xl border border-white/10 hover:border-white/30 transition-all text-left">
                            <span className="block text-xs text-slate-500 mb-1">Previous Pillar</span>
                            <span className="block text-white font-bold">&larr; Bioelectricity</span>
                        </Link>
                    </StaggerContainer>
                </div>
            </section>
        </StandardPageLayout>
    );
}
