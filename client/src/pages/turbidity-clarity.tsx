import React from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import {
    Cloud,
    Eye,
    Activity,
    Layers,
    FlaskConical,
    Search,
    SplitSquareHorizontal,
    CheckCircle2,
    ArrowRight,
    HelpCircle
} from "lucide-react";

export default function TurbidityClarityPage() {
    return (
        <StandardPageLayout
            title={<>Turbidity <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-cyan-400">& Clarity</span></>}
            subtitle={<>From cloudy to clear.<br />Understanding particle behavior and visual context.</>}
            heroVariant="cyan"
            heroIcon={Cloud}
            badges={[{ text: "Visual Context", icon: Cloud }]}
            
            seoTitle="Turbidity & Clarity in Water: What 'Cloudy' Really Means"
            seoDescription="Learn turbidity and clarity as water context markers. Understand why water becomes cloudy (particles, colloids), and how clarity differs from purity."
        >

            {/* DEFINITIONS */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* Turbidity */}
                        <div className="andara-glass-card p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-500/10 rounded-bl-full pointer-events-none" />
                            <Cloud className="w-8 h-8 text-slate-400 mb-6" />
                            <h2 className="text-2xl font-display text-white mb-4">Turbidity</h2>
                            <p className="text-white/60 leading-relaxed mb-6">
                                The cloudiness of water caused by <strong>suspended material</strong> (physical particles, colloids, bubbles). It's about light scattering.
                            </p>
                            <div className="bg-[#020617] p-4 rounded-lg border border-white/10 text-sm text-slate-400 font-mono">
                                Visible Particles + Light Scatter
                            </div>
                        </div>

                        {/* Clarity */}
                        <div className="andara-glass-card p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full pointer-events-none" />
                            <Eye className="w-8 h-8 text-cyan-400 mb-6" />
                            <h2 className="text-2xl font-display text-white mb-4">Clarity</h2>
                            <p className="text-white/60 leading-relaxed mb-6">
                                Visual transparency. <strong>Clarity ≠ Purity.</strong> Clear water can still contain high dissolved solids or treatment chemistry.
                            </p>
                            <div className="bg-[#020617] p-4 rounded-lg border border-white/10 text-sm text-cyan-400 font-mono">
                                Visual Transparency ≠ Chemical Purity
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CAUSES (GRID) */}
            <section className="py-24 bg-[#020617]">
                <div className="container px-4 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">What Makes Water Cloudy?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="andara-glass-card p-6 opacity-80 hover:opacity-100 transition-opacity">
                            <Activity className="w-6 h-6 text-orange-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Suspended Particles</h3>
                            <p className="text-white/60 text-xs">Sediment, fine sand, rust. Physical debris that hangs in the water.</p>
                        </div>

                        <div className="andara-glass-card p-6 opacity-80 hover:opacity-100 transition-opacity">
                            <Layers className="w-6 h-6 text-purple-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Colloids</h3>
                            <p className="text-white/60 text-xs">Tiny particles that don't settle easily. Can be mineral or organic.</p>
                        </div>

                        <div className="andara-glass-card p-6 opacity-80 hover:opacity-100 transition-opacity">
                            <Cloud className="w-6 h-6 text-blue-300 mb-4" />
                            <h3 className="text-white font-bold mb-2">Micro-bubbles</h3>
                            <p className="text-white/60 text-xs">Air/gas trapped by pressure or temp changes. Often clears up if you wait.</p>
                        </div>

                        <div className="andara-glass-card p-6 opacity-80 hover:opacity-100 transition-opacity">
                            <FlaskConical className="w-6 h-6 text-pink-400 mb-4" />
                            <h3 className="text-white font-bold mb-2">Treatment</h3>
                            <p className="text-white/60 text-xs">Municipal additives can sometimes create temporary cloudiness.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPARISONS (TDS & Interfaces) */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-display text-white mb-6 flex items-center gap-2">
                                <Search className="w-5 h-5 text-yellow-500" /> vs. TDS (Dissolved Solids)
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed mb-6">
                                <strong>Visible vs. Invisible.</strong><br /><br />
                                TDS involves dissolved ions you cannot see. Turbidity involves matter you can see. Clear water can have high TDS. Cloudy water can have low TDS.
                            </p>
                            <Link href="/conductivity-tds-water" className="text-xs text-yellow-500 hover:text-white flex items-center gap-1">
                                Compare with TDS <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <div>
                            <h3 className="text-xl font-display text-white mb-6 flex items-center gap-2">
                                <SplitSquareHorizontal className="w-5 h-5 text-indigo-400" /> vs. Interfaces (Structure)
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed mb-6">
                                <strong>Surface Area.</strong><br /><br />
                                Suspended particles create extra interface surfaces. In structured water theory, this changes hydration dynamics (more random boundaries = less coherence).
                            </p>
                            <Link href="/science/water-structure" className="text-xs text-indigo-400 hover:text-white flex items-center gap-1">
                                See Interface Theory <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ANDARA WORKFLOW */}
            <section className="py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-3xl font-display text-white mb-6">Work with Clarity, Not Promises</h2>
                        <p className="text-white/60 mb-6">
                            Andara promotes a stable conditioning routine. We use clarification language to describe better baseline interpretation, not magic purification.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/how-to-use-andara" className="px-5 py-2.5 bg-white/10 rounded-lg text-white text-sm font-bold hover:bg-white/20 transition-colors">
                                How Conditioning Works
                            </Link>
                            <Link href="/andara-dilution-calculator" className="px-5 py-2.5 border border-white/10 rounded-lg text-white text-sm font-bold hover:border-white/30 transition-colors flex items-center gap-2">
                                <FlaskConical className="w-4 h-4" /> Dosing Calc
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 andara-glass-card p-8">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> The Clarity Rule
                        </h3>
                        <p className="text-white/60 text-sm mb-4">
                            "Turbidity describes suspended matter. TDS describes dissolved ions. Clarity is a visual context marker, not a moral grade."
                        </p>
                        <Link href="/getting-started-first-7-days" className="text-xs font-bold text-emerald-400 hover:text-white underline decoration-dashed">
                            View 7-Day Guide
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#05060b]">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Visual Water FAQ</h2>
                    <div className="space-y-6">
                        {[
                            { name: "What is turbidity in simple words?", text: "Turbidity is how cloudy water looks because suspended particles scatter light." },
                            { name: "Can water be clear and still be not clean?", text: "Yes. Water can be clear while still containing dissolved substances or treatment residues." },
                            { name: "What should I read next?", text: "Read ORP & Redox to understand electron potential context and pH Balance to understand acidity/alkalinity as a marker." }
                        ].map((item, i) => (
                            <div key={i} className="border-b border-white/10 pb-6">
                                <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                    <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                    {item.name}
                                </h3>
                                <p className="text-white/60 pl-8 leading-relaxed text-sm">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </StandardPageLayout>
    );
}
