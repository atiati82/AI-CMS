import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { ScrollProgress } from "@/components/plugins/ScrollProgress";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { Link } from "wouter";
import {
    Zap,
    Activity,
    Battery,
    Waves,
    Globe,
    RefreshCw,
    Cpu,
    ArrowRight
} from "lucide-react";

export default function BioelectricityRegenerationPage() {
    return (
        <StandardPageLayout
            title={<>Bioelectricity & <span className="text-amber-400">Voltage</span></>}
            subtitle={<>The invisible voltage system that shapes regeneration, terrain & life.<br /><span className="text-amber-400/80">Life is electric.</span></>}
            
            heroVariant="amber"
            heroIcon={Zap}
            badges={[{ text: "Energy & Flow", icon: Zap }]}
            seoTitle="Bioelectricity: Voltage, Terrain & Regeneration in the Body"
            seoDescription="Discover how the body operates as a bioelectric field system, where voltage and current shape health, regeneration, and the inner terrain."
            relatedLinks={[
                { title: "Sulfate Pathways", url: "/sulfate-pathways-terrain-model", type: "internal" },
                { title: "Crystalline Matrix", url: "/crystalline-matrix-light-geometry", type: "internal" }
            ]}
        >
            <ScrollProgress />

            {/* INTRO SECTION */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-8">More Than Chemistry</h2>
                        <p className="text-slate-300 leading-relaxed mb-12 max-w-2xl mx-auto">
                            Under every heartbeat, movement, thought, or regeneration process lies a continual flow of ions and electrons. The body is not only biochemical; it is a bioelectric field system.
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 group hover:border-amber-500/30 transition-colors">
                            <Zap className="w-8 h-8 text-amber-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Voltage</h3>
                            <p className="text-white/50 text-xs">The push within cells</p>
                        </div>
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 group hover:border-amber-500/30 transition-colors">
                            <Waves className="w-8 h-8 text-amber-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Water</h3>
                            <p className="text-white/50 text-xs">The carrier medium</p>
                        </div>
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 group hover:border-amber-500/30 transition-colors">
                            <Globe className="w-8 h-8 text-amber-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Terrain</h3>
                            <p className="text-white/50 text-xs">The environment</p>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* 2.1 VOLTAGE AS LANGUAGE */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                    <FadeIn className="flex-1 order-2 md:order-1">
                        <div className="relative p-8 bg-[#0b1020] rounded-2xl border border-white/5">
                            <div className="absolute top-4 left-4 -z-10 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
                            <h3 className="text-amber-400 font-bold mb-6 text-lg">The Body Battery</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-4 items-start">
                                    <Battery className="w-5 h-5 text-amber-400 mt-1" />
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Cells as Batteries</h4>
                                        <p className="text-slate-400 text-xs">Every cell maintains a membrane potential – a tiny voltage difference.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <Activity className="w-5 h-5 text-amber-400 mt-1" />
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Electrode Highways</h4>
                                        <p className="text-slate-400 text-xs">Blood, lymph, and interstitial fluid act as conductive pathways.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <Cpu className="w-5 h-5 text-amber-400 mt-1" />
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Field Coordination</h4>
                                        <p className="text-slate-400 text-xs">Nerves, fascia, and biofields coordinate the signal.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </FadeIn>
                    <FadeIn className="flex-1 order-1 md:order-2">
                        <div>
                            <h2 className="text-3xl font-display text-white mb-6">Voltage as the Language of Cells</h2>
                            <div className="prose prose-invert text-slate-300">
                                <p>
                                    Ions like Na⁺, K⁺, Ca²⁺, Cl⁻, and H⁺ carry the charge. Water is the medium that lets them move. Minerals are the ingredients that define what ions exist.
                                </p>
                                <p>
                                    You can think of the body as a giant network of microscopic batteries connected by electrolyte highways.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 2.2 THE TERRAIN */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-display text-white mb-8 text-center">The Terrain: More Than Organs</h2>
                        <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
                            A "good" terrain is not a single number. It is a pattern: Enough electrons, enough structure, enough minerals, enough flow.
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { label: "pH & Redox", val: "Balance" },
                            { label: "Minerals", val: "Composition" },
                            { label: "Conductivity", val: "Hydration" },
                            { label: "Structure", val: "Integrity" },
                            { label: "Biofield", val: "Coherence" }
                        ].map((item, i) => (
                            <div key={i} className="text-center p-4 bg-white/5 rounded-lg border border-white/5">
                                <span className="block text-xs text-amber-400 uppercase tracking-wider mb-1">{item.label}</span>
                                <span className="block text-white font-bold">{item.val}</span>
                            </div>
                        ))}
                    </StaggerContainer>
                    <FadeIn>
                        <div className="mt-8 text-center text-sm text-slate-400">
                            We never need to say "this heals X". We say: the terrain is the stage.
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 2.3 STRUCTURED WATER & MINERALS */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-8">The Trinity of Bioelectricity</h2>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg mb-2">1. Water</h3>
                                <p className="text-slate-400 text-sm">The medium & energy store (EZ-like).</p>
                            </div>
                            <div className="text-amber-500 font-bold text-xl">+</div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg mb-2">2. Minerals</h3>
                                <p className="text-slate-400 text-sm">The charges & cofactors.</p>
                            </div>
                            <div className="text-amber-500 font-bold text-xl">+</div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg mb-2">3. Structure</h3>
                                <p className="text-slate-400 text-sm">Membranes & matrices.</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 2.4 REGENERATION */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <FadeIn>
                        <div className="bg-gradient-to-br from-[#0b1020] to-[#020617] p-8 md:p-12 rounded-2xl border border-amber-500/20">
                            <div className="flex items-start gap-6">
                                <RefreshCw className="w-10 h-10 text-amber-400 shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-2xl font-display text-white mb-4">Regeneration & Voltage</h3>
                                    <div className="prose prose-invert text-slate-300">
                                        <p>
                                            Many emerging models see regeneration as deeply linked to cell voltage, redox balance, and field coherence.
                                        </p>
                                        <p>
                                            Healthy tissues tend to show stable, coherent voltage patterns. Stressed or degenerated tissues often show chaotic or collapsed voltage patterns.
                                        </p>
                                        <p className="font-bold text-white">
                                            Electricity here is not just about nerves firing; it’s about every cell’s ability to stay in dialogue with the whole.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 2.5 SUMMARY */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-display text-white mb-6">Why Bioelectricity Matters</h2>
                    <p className="text-slate-300 mb-8">
                        It gives us language for "terrain first" thinking. By understanding that life runs on voltages and currents, we see why water quality and mineral composition are fundamental.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/science/sulfate-pathways-water-body" className="p-4 rounded-xl border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all text-left group">
                            <span className="block text-xs text-slate-500 mb-1 group-hover:text-amber-400">Next Pillar</span>
                            <span className="block text-white font-bold">Sulfate Pathways &rarr;</span>
                        </Link>
                        <Link href="/science/light-sound-water" className="p-4 rounded-xl border border-white/10 hover:border-white/30 transition-all text-left">
                            <span className="block text-xs text-slate-500 mb-1">Previous Pillar</span>
                            <span className="block text-white font-bold">&larr; Photonic Flow</span>
                        </Link>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
