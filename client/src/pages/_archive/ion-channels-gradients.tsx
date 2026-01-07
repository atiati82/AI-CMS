import React from "react";
import { motion } from "framer-motion";
import StandardPageLayout from "@/components/StandardPageLayout";
import { Link } from "wouter";
import { BackgroundLayer } from "@/components/visuals/BackgroundLayer";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/ui/SmartImage";
import { FadeIn, StaggerContainer } from "@/components/animations";
import {
    GitCommit,
    Zap,
    ArrowRight,
    HelpCircle,
    Activity,
    Layers,
    FlaskConical,
    Split,
    ShieldCheck
} from "lucide-react";

export default function IonChannelsGradientsPage() {
    return (
        <StandardPageLayout
            title={<>Ion Channels & <span className="text-sky-400">Gradients</span></>}
            subtitle={<>How direction is created in living systems.<br /><span className="text-sky-400/80">Gradient = Potential. Gate = Choice.</span></>}
            /* Using bioelectric-proton-gradient mapped in registry */
            heroVariant="blue"
            heroIcon={Split}
            badges={[{ text: "The Gates of Flow", icon: Split }]}
            seoTitle="Ion Channels & Gradients: Gates of Flow, Voltage Logic & Terrain Context"
            seoDescription="Understand ion channels and gradients as the gates of flow in bioelectric systems. Learn how ions create potential differences and how membranes stabilize gradients."
            relatedLinks={[
                { title: "Membrane Electric Model", url: "/cell-membrane-electric-model", type: "internal" },
                { title: "Proton Gradients", url: "/proton-gradients-energy-transfer", type: "internal" }
            ]}
        >
            {/* DEFINITION SECTION */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10 overflow-hidden">
                <BackgroundLayer  opacity={20} />
                <div className="container px-4 max-w-5xl mx-auto text-center relative z-10">
                    <FadeIn>
                        <h2 className="text-3xl font-display text-white mb-12">Definitions: The Vocabulary of Flow</h2>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
                        <div className="group relative bg-[#0b1020]/80 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-sky-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(14,165,233,0.1)] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 text-center">
                                <div className="w-12 h-12 mx-auto rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-white font-bold mb-3 text-lg group-hover:text-sky-300 transition-colors">Ion</h3>
                                <p className="text-white/60 text-sm leading-relaxed">The "carrier." An atom with charge that allows electrical behavior in water.</p>
                            </div>
                        </div>

                        <div className="group relative bg-[#0b1020]/80 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-sky-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(14,165,233,0.1)] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 text-center">
                                <div className="w-12 h-12 mx-auto rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <h3 className="text-white font-bold mb-3 text-lg group-hover:text-sky-300 transition-colors">Gradient</h3>
                                <p className="text-white/60 text-sm leading-relaxed">The "potential." A difference across a boundary (inside vs outside) creates a tendency to move.</p>
                            </div>
                        </div>

                        <div className="group relative bg-[#0b1020]/80 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-sky-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(14,165,233,0.1)] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 text-center">
                                <div className="w-12 h-12 mx-auto rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <GitCommit className="w-6 h-6 rotate-90" />
                                </div>
                                <h3 className="text-white font-bold mb-3 text-lg group-hover:text-sky-300 transition-colors">Channel (Gate)</h3>
                                <p className="text-white/60 text-sm leading-relaxed">The "regulator." A pathway that controls when and how much flows.</p>
                            </div>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* MEMBRANE IS INTELLIGENCE */}
            <section className="py-24 bg-[#020617] relative z-10 overflow-hidden">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <FadeIn className="flex-1 w-full order-2 md:order-1">
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                                <SmartImage
                                    
                                    alt="Cell Membrane Ion Channels"
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                    interaction="zoom-hover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />

                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <h3 className="text-sky-400 font-bold mb-6 text-xl">The 3 Gate Functions</h3>
                                    <ul className="space-y-6">
                                        <li className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-sky-500/20 backdrop-blur-sm flex items-center justify-center text-sky-400 font-bold text-xs shrink-0 border border-sky-500/30">A</div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm">Selection</h4>
                                                <p className="text-white/60 text-xs">Which ions pass? (Not everything fits.)</p>
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-sky-500/20 backdrop-blur-sm flex items-center justify-center text-sky-400 font-bold text-xs shrink-0 border border-sky-500/30">B</div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm">Timing</h4>
                                                <p className="text-white/60 text-xs">When does it open? (Rhythm matters.)</p>
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-sky-500/20 backdrop-blur-sm flex items-center justify-center text-sky-400 font-bold text-xs shrink-0 border border-sky-500/30">C</div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm">Rate Control</h4>
                                                <p className="text-white/60 text-xs">How much flows? (Volume regulation.)</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn className="flex-1 order-1 md:order-2">
                            <div>
                                <span className="text-sky-400 font-mono text-xs tracking-[0.2em] uppercase mb-4 block">Selective Intelligence</span>
                                <h2 className="text-4xl font-display text-white mb-6">The Membrane is Not a Wall</h2>
                                <p className="text-white/60 mb-8 leading-relaxed text-lg font-light">
                                    It’s a selective intelligence layer. Without gates, gradients would collapse into randomness (entropy). With gates, the difference is maintained and used for work.
                                </p>
                                <div className="space-y-4">
                                    <p className="text-white/80 text-sm font-medium">This connects deeply to:</p>
                                    <Link href="/cell-membrane-electric-model">
                                        <Button variant="andara-glass" className="w-full justify-start pl-4 h-12 text-sm text-sky-300/90 hover:text-sky-200">
                                            <ArrowRight className="w-4 h-4 mr-3 opacity-70" /> The Cell Membrane Electric Model
                                        </Button>
                                    </Link>
                                    <Link href="/science/water-structure">
                                        <Button variant="andara-glass" className="w-full justify-start pl-4 h-12 text-sm text-sky-300/90 hover:text-sky-200">
                                            <ArrowRight className="w-4 h-4 mr-3 opacity-70" /> Hydration Layers & Interfaces
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* TERRAIN & CONTEXT */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-3xl font-display text-white mb-4">Context Behind the Gates</h2>
                        <p className="text-white/50 max-w-2xl mx-auto mb-16 text-lg">
                            The gate mechanics rely on the environment (Terrain).
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <Link href="/science/bioelectric-water" className="group block">
                            <div className="h-full bg-[#0b1020] p-8 rounded-2xl border border-white/5 hover:border-sky-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.1)]">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2 group-hover:text-sky-300 transition-colors">
                                    <FlaskConical className="w-5 h-5 text-sky-400" /> Water as Medium
                                </h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                                    Water is the stage. If the water structure (hydration layers) is chaotic, ionic movement is noisy.
                                </p>
                                <span className="text-xs font-bold text-sky-400/60 group-hover:text-sky-400 flex items-center gap-2 uppercase tracking-widest transition-colors">
                                    Bioelectric Water <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>

                        <Link href="/science/ionic-vs-colloidal-vs-solid" className="group block">
                            <div className="h-full bg-[#0b1020] p-8 rounded-2xl border border-white/5 hover:border-sky-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.1)]">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2 group-hover:text-sky-300 transition-colors">
                                    <Layers className="w-5 h-5 text-sky-400" /> Minerals as Context
                                </h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                                    Minerals provide the ionic participants. Form matters: ionic minerals integrate; solid minerals settle.
                                </p>
                                <span className="text-xs font-bold text-sky-400/60 group-hover:text-sky-400 flex items-center gap-2 uppercase tracking-widest transition-colors">
                                    Ionic vs Colloidal <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    </StaggerContainer>
                </div>
            </section>

            {/* ANDARA MAP SUMMARY */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10 overflow-hidden">
                <BackgroundLayer  opacity={10} />
                <div className="container px-4 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
                    <FadeIn className="flex-1">
                        <div>
                            <h2 className="text-4xl font-display text-white mb-8">The Andara Bioelectric Map</h2>
                            <ul className="space-y-4">
                                {[
                                    "Ions carry charge behavior.",
                                    "Gradients create potential.",
                                    "Gates regulate flow.",
                                    "Interfaces stabilize context.",
                                    "Consistency produces coherence."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-center group">
                                        <span className="w-8 h-8 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 font-bold text-sm border border-sky-500/20 group-hover:bg-sky-500/20 transition-colors">{i + 1}</span>
                                        <span className="text-white/70 group-hover:text-white transition-colors text-lg font-light">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>
                    <FadeIn className="flex-1 w-full max-w-md">
                        <div className="bg-[#0b1020]/80 backdrop-blur-md p-10 rounded-3xl border border-sky-500/20 text-center shadow-2xl relative overflow-hidden group hover:border-sky-500/40 transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-transparent pointer-events-none" />
                            <ShieldCheck className="w-16 h-16 text-sky-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
                            <h3 className="text-xl text-white font-bold mb-3">Practical Coherence</h3>
                            <p className="text-white/60 text-sm mb-8 italic">
                                "Random changes create gradient noise. Stable recipes create coherent signal."
                            </p>
                            <div className="flex flex-col gap-3">
                                <Link href="/andara-dilution-calculator">
                                    <Button className="w-full bg-sky-600 hover:bg-sky-500 text-white border-0 h-12">
                                        Dosing Calculator
                                    </Button>
                                </Link>
                                <Link href="/getting-started-first-7-days">
                                    <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 h-12">
                                        7-Day Protocol
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Gradients & Gates FAQ</h2>
                    <div className="space-y-6">
                        <div className="bg-[#0b1020]/50 p-6 rounded-2xl border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-sky-400 mt-1 flex-shrink-0" />
                                Are ion channels only a biology topic?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">They are a biology term, and Andara also uses the gate + gradient model as a universal pattern language for directional flow.</p>
                        </div>
                        <div className="bg-[#0b1020]/50 p-6 rounded-2xl border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-sky-400 mt-1 flex-shrink-0" />
                                Is this page claiming health benefits?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">No. This page is educational and does not make medical claims.</p>
                        </div>
                        <div className="bg-[#0b1020]/50 p-6 rounded-2xl border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-sky-400 mt-1 flex-shrink-0" />
                                Where should I go next?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">Read Bioelectric Conductivity in Tissues, Bioelectric Maps, and Voltage & Detox Pathways for the next layers.</p>
                        </div>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
