
import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/animations";
import { InteractiveBackground } from "@/components/visuals/InteractiveBackground";
import { Zap, Battery, Activity, ArrowRight, Brain } from "lucide-react";
import { Link } from "wouter";

export default function BioelectricConcept() {
    return (
        <StandardPageLayout
            title="Bioelectric Water"
            subtitle="Voltage, Frequency & The Body Electric"
            seoTitle="Bioelectric Water Theory"
            seoDescription="Understanding the voltage of life."
            heroVariant="gold" // Electric Amber Theme
            backgroundElement={
                <div className="absolute inset-0 pointer-events-none">
                    <InteractiveBackground registryId="bioelectric-hero" className="opacity-40 mix-blend-screen" />
                </div>
            }
        >
            <div className="container mx-auto px-4 py-24 space-y-32">

                {/* SECTION 1: The Core Thesis */}
                <section className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <span className="text-amber-400 font-mono tracking-widest text-sm uppercase mb-4 block">
                                The Voltage of Life
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
                                Humans are electric beings. <br />
                                <span className="text-slate-400">Health is measured in millivolts.</span>
                            </h2>
                            <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                                Jerry Tennant's research links electron density directly to acidity. An acidic environment is electron-poor (low voltage), while an alkaline environment is electron-rich—providing the raw power for cellular regeneration.
                            </p>

                            <div className="mt-8 flex gap-4">
                                <div className="px-6 py-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                    <span className="block text-2xl font-bold text-amber-400">-25 mV</span>
                                    <span className="text-xs text-amber-200/70 uppercase tracking-wider">Operating Voltage</span>
                                </div>
                                <div className="px-6 py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                    <span className="block text-2xl font-bold text-emerald-400">-50 mV</span>
                                    <span className="text-xs text-emerald-200/70 uppercase tracking-wider">Healing Voltage</span>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-amber-900/20">
                                {/* Placeholder for "Living Grid" or similar visual */}
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-amber-950/50" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Zap className="w-24 h-24 text-amber-500 opacity-20 animate-pulse" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 to-transparent">
                                    <p className="font-mono text-amber-300 text-sm">FIG 1.0: Cellular Capacitance</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* SECTION 2: The Mineral Bridge */}
                <section>
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-3xl font-display text-white mb-4">The Mineral Bridge</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Pure water is an insulator. It requires dissolved electrolytes—ionic minerals—to conduct the signals of life.
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StaggerItem>
                            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/30 transition-colors h-full">
                                <Battery className="w-10 h-10 text-amber-400 mb-6" />
                                <h3 className="text-xl font-display text-white mb-3">Charge Storage</h3>
                                <p className="text-slate-400 text-sm">
                                    Cells act as batteries. The membrane maintains a charge gradient, powered by the difference in mineral definition inside vs outside the cell.
                                </p>
                            </div>
                        </StaggerItem>
                        <StaggerItem>
                            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/30 transition-colors h-full">
                                <Activity className="w-10 h-10 text-amber-400 mb-6" />
                                <h3 className="text-xl font-display text-white mb-3">Signal Speed</h3>
                                <p className="text-slate-400 text-sm">
                                    Thought, movement, and heartbeat depend on the rapid flow of ions. Depleted minerals mean a "slow internet connection" for your nervous system.
                                </p>
                            </div>
                        </StaggerItem>
                        <StaggerItem>
                            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/30 transition-colors h-full">
                                <Brain className="w-10 h-10 text-amber-400 mb-6" />
                                <h3 className="text-xl font-display text-white mb-3">Consciousness Field</h3>
                                <p className="text-slate-400 text-sm">
                                    High-conductivity terrain allows for coherent field retention. This is where "Structure" meets "Spirit" in the Andara philosophy.
                                </p>
                            </div>
                        </StaggerItem>
                    </StaggerContainer>
                </section>

                {/* HERO CTA: Shop Link */}
                <section className="py-24 relative overflow-hidden rounded-3xl border border-amber-500/20 bg-slate-900/50">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-50" />
                    <div className="absolute -right-24 -top-24 w-96 h-96 bg-amber-500/20 blur-3xl rounded-full" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 md:px-16 gap-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-4">Recharge Your Terrain</h2>
                            <p className="text-slate-300 max-w-lg">
                                Andara Ionic Minerals restore the conductivity required for optimal voltage. Start your recharge protocol today.
                            </p>
                        </div>
                        <Link href="/products/andara-ionic-1l-bundles">
                            <button className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold tracking-wide rounded-full transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2">
                                Get the Conductivity Bundle <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </div>
                </section>

            </div>
        </StandardPageLayout>
    );
}
