import React from "react";
import { motion } from "framer-motion";
import StandardPageLayout from "@/components/StandardPageLayout";
import { Link } from "wouter";
import { BackgroundLayer } from "@/components/visuals/BackgroundLayer";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/ui/SmartImage";
import { FadeIn } from "@/components/animations";
import {
    Activity,
    Layers,
    Zap,
    ArrowRight,
    HelpCircle,
    FlaskConical,
    Network,
    Shuffle
} from "lucide-react";

export default function BioelectricConductivityPage() {
    return (
        <StandardPageLayout
            title={<>Bioelectric <span className="text-cyan-400">Conductivity</span></>}
            subtitle={<>How context travels.<br />Understanding the movement of charge through the hydrated medium of life.</>}
            /* Using bioelectric-ion-field mapped in registry */
            heroVariant="cyan"
            heroIcon={Network}
            badges={[{ text: "The Distribution Layer", icon: Network }]}
            seoTitle="Bioelectric Conductivity in Tissues: Distribution & Water Context"
            seoDescription="Learn how bioelectric conductivity works as a distribution layer in living systems. This Andara page explains conductivity as water + ion participation."
        >
            {/* DEFINITION SECTION */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10 overflow-hidden">
                <BackgroundLayer  opacity={20} />
                <div className="container px-4 max-w-4xl mx-auto text-center relative z-10">
                    <FadeIn>
                        <h2 className="text-3xl font-display text-white mb-8">Conductivity Is Movement Capacity</h2>
                        <p className="text-white/70 text-xl leading-relaxed mb-12 font-light">
                            It's not a "force"—it's a highway system. Conductivity describes how easily charge relationships can move through a medium.
                        </p>
                    </FadeIn>

                    <div className="bg-[#0b1020]/90 backdrop-blur-md p-10 rounded-2xl border border-white/5 inline-block text-left relative max-w-3xl w-full shadow-2xl">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#020617] px-6 py-2 text-cyan-400 text-sm font-bold uppercase tracking-widest border border-cyan-500/20 rounded-full shadow-lg">
                            The Andara Stance
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-12 mt-6">
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl text-white font-bold mb-4">Not "Good" or "Bad"</h3>
                                <p className="text-white/50 text-base mb-6">Conductivity is a context marker, not a contest.</p>
                                <ul className="space-y-4 text-sm text-white/70">
                                    <li className="flex items-center gap-3 justify-center md:justify-start"><span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]" /> Too Low = Thin Context</li>
                                    <li className="flex items-center gap-3 justify-center md:justify-start"><span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]" /> Too High = Dense/Chaotic</li>
                                    <li className="flex items-center gap-3 justify-center md:justify-start"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" /> Goal = Coherence</li>
                                </ul>
                            </div>
                            <div className="w-full md:w-px h-px md:h-48 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                            <div className="flex-1 text-center md:text-left w-full">
                                <h3 className="text-xl text-white font-bold mb-4">Metrics Are Different</h3>
                                <p className="text-white/50 text-base mb-6">Don't confuse the markers.</p>
                                <div className="grid grid-cols-1 gap-3 w-full">
                                    <Link href="/conductivity-tds-water">
                                        <Button variant="andara-glass" className="w-full justify-start text-xs border-white/10 hover:border-cyan-500/30">
                                            Conductivity: Participation Density
                                        </Button>
                                    </Link>
                                    <Link href="/orp-redox-water">
                                        <Button variant="andara-glass" className="w-full justify-start text-xs border-white/10 hover:border-cyan-500/30">
                                            ORP: Potential/Electron Context
                                        </Button>
                                    </Link>
                                    <Link href="/ph-balance-water">
                                        <Button variant="andara-glass" className="w-full justify-start text-xs border-white/10 hover:border-cyan-500/30">
                                            pH: Hydrogen Ion Activity
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE 4 DRIVERS */}
            <section className="py-24 bg-[#020617] relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-16 text-center">4 Drivers of Living Conductivity</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Driver A */}
                        <Link href="/science/bioelectric-water" className="group">
                            <div className="h-full bg-[#0b1020] p-8 rounded-2xl border border-white/5 flex gap-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold text-xl shrink-0 group-hover:scale-110 transition-transform">A</div>
                                <div>
                                    <h3 className="text-white font-bold mb-2 text-lg flex items-center gap-3">
                                        Water <span className="text-white/30 text-xs font-normal uppercase tracking-wider py-1 px-2 rounded-full border border-white/10">Carrier Medium</span>
                                    </h3>
                                    <p className="text-white/60 text-sm mb-4 leading-relaxed">Allows charge relationships to move through hydrated space.</p>
                                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Bioelectric Water <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Driver B */}
                        <Link href="/science/ionic-vs-colloidal-vs-solid" className="group">
                            <div className="h-full bg-[#0b1020] p-8 rounded-2xl border border-white/5 flex gap-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold text-xl shrink-0 group-hover:scale-110 transition-transform">B</div>
                                <div>
                                    <h3 className="text-white font-bold mb-2 text-lg flex items-center gap-3">
                                        Ions <span className="text-white/30 text-xs font-normal uppercase tracking-wider py-1 px-2 rounded-full border border-white/10">Charge Carriers</span>
                                    </h3>
                                    <p className="text-white/60 text-sm mb-4 leading-relaxed">Practical carriers of charge behavior and potential.</p>
                                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Ionic Form <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Driver C */}
                        <Link href="/science/water-structure" className="group">
                            <div className="h-full bg-[#0b1020] p-8 rounded-2xl border border-white/5 flex gap-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold text-xl shrink-0 group-hover:scale-110 transition-transform">C</div>
                                <div>
                                    <h3 className="text-white font-bold mb-2 text-lg flex items-center gap-3">
                                        Interfaces <span className="text-white/30 text-xs font-normal uppercase tracking-wider py-1 px-2 rounded-full border border-white/10">Structure</span>
                                    </h3>
                                    <p className="text-white/60 text-sm mb-4 leading-relaxed">Boundaries organize distribution surfaces.</p>
                                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Hydration Layers <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Driver D */}
                        <Link href="/science/proton-gradients-energy-transfer" className="group">
                            <div className="h-full bg-[#0b1020] p-8 rounded-2xl border border-white/5 flex gap-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold text-xl shrink-0 group-hover:scale-110 transition-transform">D</div>
                                <div>
                                    <h3 className="text-white font-bold mb-2 text-lg flex items-center gap-3">
                                        Gradients <span className="text-white/30 text-xs font-normal uppercase tracking-wider py-1 px-2 rounded-full border border-white/10">Direction</span>
                                    </h3>
                                    <p className="text-white/60 text-sm mb-4 leading-relaxed">Creates "where the movement goes." High to low.</p>
                                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Proton Gradients <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* COHERENCE PRACTICE */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-display text-white mb-6">The Real "Hack" is Stability</h2>
                    <p className="text-white/60 text-xl font-light mb-16">
                        You can't "hack" conductivity with randomness. You build it with consistency.
                    </p>

                    <div className="flex flex-col md:flex-row gap-8 justify-center max-w-4xl mx-auto">
                        <div className="flex-1 bg-[#020617] p-8 rounded-2xl border border-white/5 group hover:border-red-500/20 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                                <Shuffle className="w-8 h-8 text-red-400 opacity-80" />
                            </div>
                            <h3 className="text-red-400/90 font-bold text-lg mb-3">Random Dosing</h3>
                            <p className="text-white/50 text-sm leading-relaxed">Creates "noise" in the gradient map. Conductivity fluctuates wildly, preventing adaptation.</p>
                        </div>

                        <div className="flex-1 bg-[#020617] p-8 rounded-2xl border border-cyan-500/30 relative shadow-[0_0_50px_rgba(6,182,212,0.05)]">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-[#020617] px-4 py-1 rounded-full text-xs font-bold uppercase shadow-lg">Recommended</div>
                            <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-6">
                                <Activity className="w-8 h-8 text-cyan-400" />
                            </div>
                            <h3 className="text-cyan-400 font-bold text-lg mb-3">Stable Routine</h3>
                            <p className="text-white/70 text-sm leading-relaxed">Creates "signal." 7 days of same input = coherent conductivity context the body can read.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONNECTION TO ANDARA */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10 overflow-hidden">
                <BackgroundLayer  opacity={10} />
                <div className="container px-4 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
                    <div className="flex-1">
                        <h2 className="text-4xl font-display text-white mb-6">Structuring the Medium</h2>
                        <p className="text-white/60 mb-8 text-lg font-light leading-relaxed">
                            Andara Ionic acts as the <span className="text-cyan-400">mineral context layer</span>. It provides the ionic carriers that allow conductivity to express itself.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/what-is-andara-ionic">
                                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-white border-0">
                                    What Is Andara?
                                </Button>
                            </Link>
                            <Link href="/andara-dilution-calculator">
                                <Button size="lg" variant="outline" className="text-cyan-400 border-cyan-500/20 hover:bg-cyan-950/30">
                                    <FlaskConical className="w-4 h-4 mr-2" /> Dosing Calc
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 w-full max-w-sm">
                        <div className="bg-[#0b1020]/80 backdrop-blur-md p-10 rounded-3xl border border-white/5 shadow-2xl">
                            <h3 className="text-white font-bold mb-6 text-xl">Start Clean</h3>
                            <ol className="space-y-4 text-white/70 mb-8">
                                <li className="flex gap-4 items-center">
                                    <span className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold border border-cyan-500/20">1</span>
                                    <span>Choose one base water.</span>
                                </li>
                                <li className="flex gap-4 items-center">
                                    <span className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold border border-cyan-500/20">2</span>
                                    <span>Keep dosing stable (Calc).</span>
                                </li>
                                <li className="flex gap-4 items-center">
                                    <span className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold border border-cyan-500/20">3</span>
                                    <span>Change 1 variable at a time.</span>
                                </li>
                            </ol>
                            <Link href="/getting-started-first-7-days">
                                <Button variant="ghost" className="w-full text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30">
                                    View 7-Day Protocol <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Conductivity FAQ</h2>
                    <div className="space-y-4">
                        <div className="p-6 rounded-2xl bg-[#0b1020]/50 border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                Is conductivity the same as energy?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">No. Conductivity describes the medium’s capacity to allow charge relationships to move.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#0b1020]/50 border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                Does higher conductivity mean better?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">Not necessarily. Andara focuses on coherence and stability rather than extremes.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#0b1020]/50 border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                How does this connect to Andara Ionic dosing?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">Use the Andara dilution calculator to keep dosing consistent and refine gently.</p>
                        </div>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
