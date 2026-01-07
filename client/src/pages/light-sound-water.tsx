import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { Link } from "wouter";
import {
    Sun,
    Waves,
    Zap,
    SplitSquareHorizontal,
    ArrowRight,
    HelpCircle,
    FlaskConical,
    Sparkles,
    Eye
} from "lucide-react";

export default function LightAndWaterPage() {
    return (
        <StandardPageLayout
            title={<>Light & <span className="text-amber-400">Water</span></>}
            subtitle={<>Light is input. Interfaces are architecture.<br /><span className="text-amber-400/80">Water is the medium.</span></>}
            heroVariant="amber"
            heroIcon={Sun}
            badges={[{ text: "Photonic Effects", icon: Sun }]}
            seoTitle="Light & Water: Photonic Effects on Water Structure & Coherence"
            seoDescription="Explore how light interacts with water at interfaces: photons as energy input, transparency, hydration layers, and water structure context."
            relatedLinks={[
                { title: "Interfaces", url: "/hydration-layers-interfaces", type: "internal" },
                { title: "Structure Basics", url: "/structured-water-basics", type: "internal" }
            ]}
        >
            {/* DEFINITIONS SECTION */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-12">
                            <h2 className="text-2xl font-display text-white mb-6">What We Mean by "Light"</h2>
                            <p className="text-white/70 text-lg leading-relaxed max-w-3xl mx-auto">
                                In this library, "light" refers to the broad electromagnetic spectrum—visible, infrared (heat), and UV—acting as an energy input that water environments respond to.
                            </p>
                        </div>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#0b1020] p-8 rounded-xl border border-white/5 hover:border-amber-500/20 transition-colors">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <SplitSquareHorizontal className="w-5 h-5 text-amber-400" /> The Contact Point
                            </h3>
                            <p className="text-white/60 text-sm mb-4">
                                Light interactions are most significant at <strong>interfaces</strong>. This is where hydration layers can receive energy input.
                            </p>
                            <Link href="/science/water-structure" className="text-xs text-amber-400 hover:text-white flex items-center gap-1">
                                See Interfaces <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        <div className="bg-[#0b1020] p-8 rounded-xl border border-white/5 hover:border-amber-500/20 transition-colors opacity-90">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Waves className="w-5 h-5 text-amber-400" /> Structure Language
                            </h3>
                            <p className="text-white/60 text-sm mb-4">
                                "Ordered water" near surfaces may respond to light differently than bulk water. This is the core of the "light + structure" conversation.
                            </p>
                            <Link href="/structured-water-basics" className="text-xs text-amber-400 hover:text-white flex items-center gap-1">
                                See Structure <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* 3 PHOTONIC ROLES */}
            <section className="py-24 bg-[#020617]">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-12 text-center">3 Photonic Roles in Water</h2>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Role A */}
                        <div className="p-6 rounded-xl bg-[#0b1020] border border-white/5 hover:border-amber-500/20 transition-colors group">
                            <Sparkles className="w-8 h-8 text-amber-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Information Carrier</h3>
                            <p className="text-white/60 text-xs mb-3">Light carries frequency/pattern. Water at boundaries can interact with this input.</p>
                            <Link href="/science/crystalline-matrix-overview" className="text-xs text-amber-400 hover:text-white flex items-center gap-1">
                                Crystalline Matrix <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        {/* Role B */}
                        <div className="p-6 rounded-xl bg-[#0b1020] border border-white/5 hover:border-amber-500/20 transition-colors group">
                            <Zap className="w-8 h-8 text-amber-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Energy Input</h3>
                            <p className="text-white/60 text-xs mb-3">Absorption (especially IR) changes energy conditions in the water medium.</p>
                            <Link href="/science/ez-water-overview" className="text-xs text-amber-400 hover:text-white flex items-center gap-1">
                                EZ & Energy <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        {/* Role C */}
                        <div className="p-6 rounded-xl bg-[#0b1020] border border-white/5 hover:border-amber-500/20 transition-colors group">
                            <Eye className="w-8 h-8 text-amber-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Transparency</h3>
                            <p className="text-white/60 text-xs mb-3">How far does it go? Water transmits some wavelengths deep, others shallow.</p>
                            <Link href="/science/turbidity-clarity-flocculation" className="text-xs text-amber-400 hover:text-white flex items-center gap-1">
                                Clarity Basics <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* BIOELECTRIC BRIDGE */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <FadeIn className="flex-1">
                        <div>
                            <h2 className="text-3xl font-display text-white mb-6">The Bioelectric Bridge</h2>
                            <p className="text-white/60 mb-6">
                                We don't say "light heals." We say: <span className="text-amber-400">Light affects context.</span> Context shapes gradients. Gradients drive bioelectricity.
                            </p>
                            <p className="text-white/60 mb-6">
                                Andara Ionic provides the <span className="text-amber-400">mineral interface</span>. Minerals provide the surfaces and ions that allow this "light + water" system to hold coherence.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/science/bioelectricity-invisible-voltage" className="px-5 py-2.5 bg-white/10 rounded-lg text-white text-sm font-bold hover:bg-white/20 transition-colors">
                                    Bioelectric Hub
                                </Link>
                                <Link href="/andara-dilution-calculator" className="px-5 py-2.5 border border-white/10 rounded-lg text-white text-sm font-bold hover:border-white/30 transition-colors flex items-center gap-2">
                                    <FlaskConical className="w-4 h-4" /> Dosing Calc
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn className="flex-1">
                        <div className="bg-[#0b1020] p-8 rounded-2xl border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Sun className="w-24 h-24 text-amber-400" />
                            </div>
                            <h3 className="text-white font-bold mb-4 relative z-10">Practical Coherence Rules</h3>
                            <ol className="text-left space-y-4 text-sm text-white/70 mb-6 relative z-10">
                                <li className="flex gap-3"><span className="text-amber-400 font-bold">1.</span> Stable Baseline (7 Days)</li>
                                <li className="flex gap-3"><span className="text-amber-400 font-bold">2.</span> Stable Recipe</li>
                                <li className="flex gap-3"><span className="text-amber-400 font-bold">3.</span> Track patterns, not fantasies</li>
                                <li className="flex gap-3"><span className="text-amber-400 font-bold">4.</span> Change one variable at a time</li>
                            </ol>
                            <Link href="/getting-started-first-7-days" className="text-xs font-bold text-amber-400 hover:text-white underline decoration-dashed relative z-10">
                                7-Day Protocol
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Light & Water FAQ</h2>
                    <div className="space-y-6">
                        <div className="border-b border-white/10 pb-6">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                Is this page claiming a measurable effect of light on water?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">No. This page explains framework connections: photons as input, interfaces as architecture, and water as the medium.</p>
                        </div>
                        <div className="border-b border-white/10 pb-6">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                Why is this in the Crystalline/Matrix narrative too?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">Because light, structure, and symmetry form a natural bridge into crystalline matrix and photonic-flow language.</p>
                        </div>
                        <div className="border-b border-white/10 pb-6">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                Where should I go next?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">Read Light Lattices & Photonic Flow, the Crystalline Matrix hub, and Phases of Water to expand the map.</p>
                        </div>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
