
import React from 'react';
import StandardPageLayout from '@/components/StandardPageLayout';
import { Zap, Activity, Grid, Layers, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DesignShowcasePage() {
    return (
        <StandardPageLayout
            title={
                <>
                    Ionic <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Bio-Resonance</span>
                </>
            }
            subtitle="The Architecture of Living Voltage"
            heroVariant="emerald" // Manual override for demo purposes (would be auto-fetched in prod)
            heroIcon={Zap}
            badges={[
                { text: "Design Showcase", icon: Grid },
                { text: "Bio-Physics", icon: Activity }
            ]}
            seoTitle="Andara Design Showcase - Bio-Resonance"
            seoDescription="A demonstration of the Smart Layout system using the Bioelectric theme."
            intro={
                <>
                    Life is not just chemistry; it is <strong className="text-emerald-400">electricity</strong>.
                    This page demonstrates the "Bioelectric" visual DNA applied through our Smart Layout system.
                </>
            }
            sections={[
                {
                    id: "voltage-model",
                    title: "The Voltage Model",
                    variant: "glass",
                    content: (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <p className="mb-6 text-lg text-slate-300">
                                    Cells function as capacitors. The cell membrane manages a voltage gradient that dictates cellular health.
                                    When voltage drops, oxygen levels drop, and function declines.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "pH is a measurement of voltage",
                                        "Electron donors vs. Electron stealers",
                                        "Structured water as the battery"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-emerald-200/80">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 box-shadow-glow" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative h-64 w-full bg-emerald-900/10 rounded-xl border border-emerald-500/20 flex items-center justify-center overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5" />
                                <Activity className="w-16 h-16 text-emerald-500/40 group-hover:text-emerald-400 transition-colors duration-500 group-hover:scale-110 transform" />
                                <div className="absolute bottom-4 left-4 text-xs font-mono text-emerald-500/60 uppercase tracking-widest">
                                    Fig 1.1 - Potential Difference
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    id: "crystalline-pathways",
                    title: "Crystalline Pathways",
                    variant: "transparent",
                    content: (
                        <div className="space-y-8">
                            <p>
                                Minerals provide the conductive matrix for this energy. Without the mineral lattice,
                                the water within the body cannot maintain its structured, liquid-crystalline phase.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {[
                                    { title: "Conductivity", icon: Zap, desc: "Efficient electron flow" },
                                    { title: "Structure", icon: Layers, desc: "Hexagonal lattice support" },
                                    { title: "Resonance", icon: Activity, desc: "Frequency alignment" }
                                ].map((card, i) => (
                                    <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-white/10 transition-all group cursor-default">
                                        <card.icon className="w-8 h-8 text-emerald-400 mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                        <h3 className="text-white font-display text-lg mb-2">{card.title}</h3>
                                        <p className="text-sm text-slate-400">{card.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }
            ]}
            relatedLinks={[
                { title: "EZ Water Overview", url: "/science/ez-water-overview", type: "internal" },
                { title: "Ionic Minerals", url: "/science/ionic-vs-colloidal-vs-solid", type: "internal" }
            ]}
        >
            {/* Custom CTA Section via Children */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-900/20" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                        Ignite Your <span className="text-emerald-400">Vitality</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-slate-300 mb-10 text-lg">
                        Experience the difference of bio-available ionic minerals designed for cellular voltage.
                    </p>
                    <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold tracking-wide rounded-full transition-all hover:scale-105 flex items-center gap-2 mx-auto">
                        Explore the Shop <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </section>
        </StandardPageLayout>
    );
}
