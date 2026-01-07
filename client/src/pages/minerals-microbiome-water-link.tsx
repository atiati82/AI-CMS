import React from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import {
    Zap,
    Scale,
    Activity,
    Gauge,
    SplitSquareHorizontal,
    CheckCircle2,
    FlaskConical,
    ArrowRight,
    HelpCircle
} from "lucide-react";

export default function ConductivityTDSPage() {
    return (
        <StandardPageLayout
            title={<>Electrical Conductivity <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">& TDS</span></>}
            subtitle={<>How to read water numbers.<br />Context markers, not "good vs bad."</>}
            heroVariant="amber"
            heroIcon={Zap}
            badges={[{ text: "Ion Density Markers", icon: Zap }]}
            
            seoTitle="Electrical Conductivity & TDS in Water: What the Numbers Mean"
            seoDescription="Learn what electrical conductivity and TDS mean in water. Understand ions as charge carriers, interpreting EC/TDS as context markers not 'good/bad', and how to use stable baselines."
        >

            {/* DEFINITIONS */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* EC */}
                        <div className="andara-glass-card p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-bl-full pointer-events-none" />
                            <Zap className="w-8 h-8 text-yellow-500 mb-6" />
                            <h2 className="text-2xl font-display text-white mb-4">Electrical Conductivity (EC)</h2>
                            <p className="text-white/60 leading-relaxed mb-6">
                                A measurement of how easily water conducts electricity. Water conducts because of <strong>dissolved ions</strong> (charged particles).
                            </p>
                            <div className="bg-[#020617] p-4 rounded-lg border border-white/10 text-sm text-yellow-400 font-mono">
                                More Ions = Higher Conductivity
                            </div>
                        </div>

                        {/* TDS */}
                        <div className="p-8 rounded-2xl bg-[#0b1020] border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full pointer-events-none" />
                            <Scale className="w-8 h-8 text-blue-400 mb-6" />
                            <h2 className="text-2xl font-display text-white mb-4">Total Dissolved Solids (TDS)</h2>
                            <p className="text-white/60 leading-relaxed mb-6">
                                Estimates how much "dissolved material" is in the water. Includes minerals, salts, and other compounds.
                            </p>
                            <div className="bg-[#020617] p-4 rounded-lg border border-white/10 text-sm text-blue-400 font-mono">
                                Total Content Context (Not just "Good Minerals")
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* WHAT RAISES/LOWERS IT */}
            <section className="py-24 bg-[#020617]">
                <div className="container px-4 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Interpreting the Levels</h2>

                    <div className="space-y-6">
                        <div className="andara-glass-card p-6 flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 flex-shrink-0">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg mb-2">What Raises Conductivity?</h3>
                                <p className="text-white/60 text-sm">More charge carriers: Mineral ions, salts, naturally mineralized spring water, or treated water with dissolved content.</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-[#0b1020] border border-white/5 flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-12 h-12 rounded-full bg-slate-500/10 flex items-center justify-center text-slate-400 flex-shrink-0">
                                <Gauge className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg mb-2">What Does Low Conductivity Mean?</h3>
                                <p className="text-white/60 text-sm">"Thin" ionic context. Typical of RO, distilled, or purified water. Not "bad," just a different baseline.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STRUCTURE & TERRAIN */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-display text-white mb-6 flex items-center gap-2">
                                <SplitSquareHorizontal className="w-5 h-5 text-indigo-400" /> vs. Structured Water
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed mb-6">
                                <strong>TDS ≠ Structure.</strong><br /><br />
                                Conductivity tells you ion density. Structure language tells you about boundary organization (hydration layers). They are different metrics.
                            </p>
                            <Link href="/structured-water-basics" className="text-xs text-indigo-400 hover:text-white flex items-center gap-1">
                                Learn about Structure <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <div>
                            <h3 className="text-xl font-display text-white mb-6 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-yellow-500" /> vs. Bioelectric Terrain
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed mb-6">
                                <strong>Ions are charge carriers.</strong><br /><br />
                                In the terrain model, conductivity represents "distribution capacity." Without ions, gradients cannot form effectively.
                            </p>
                            <Link href="/science/bioelectric-water" className="text-xs text-yellow-500 hover:text-white flex items-center gap-1">
                                Learn about Bioelectricity <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ANDARA WORKFLOW */}
            <section className="py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-3xl font-display text-white mb-6">The "Coherence" Workflow</h2>
                        <p className="text-white/60 mb-6">
                            Don't chase "perfect numbers." Chase coherence. Andara Ionic acts as a consistent mineral context layer, helping you stabilize your baseline.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/getting-started-first-7-days" className="px-5 py-2.5 bg-white/10 rounded-lg text-white text-sm font-bold hover:bg-white/20 transition-colors">
                                7-Day Protocol
                            </Link>
                            <Link href="/andara-dilution-calculator" className="px-5 py-2.5 border border-white/10 rounded-lg text-white text-sm font-bold hover:border-white/30 transition-colors flex items-center gap-2">
                                <FlaskConical className="w-4 h-4" /> Dosing Calc
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 andara-glass-card p-8">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400" /> Use It Wisely
                        </h3>
                        <ol className="text-left space-y-4 text-sm text-white/70">
                            <li className="flex gap-3"><span className="text-white/30 font-mono">01</span> Pick a baseline source (Spring, Tap, RO).</li>
                            <li className="flex gap-3"><span className="text-white/30 font-mono">02</span> Note EC/TDS as a context footprint.</li>
                            <li className="flex gap-3"><span className="text-white/30 font-mono">03</span> Keep one recipe stable for 7 days.</li>
                            <li className="flex gap-3"><span className="text-white/30 font-mono">04</span> Refine gently.</li>
                        </ol>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#05060b]">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Measurement FAQ</h2>
                    <div className="space-y-6">
                        {[
                            { name: "Is higher TDS always better?", text: "No. Higher TDS means more dissolved content; quality depends on composition and your baseline goals." },
                            { name: "Is zero TDS ideal?", text: "Not universally. Near-zero TDS is simply a thin ionic context baseline and may be useful for some routines." },
                            { name: "What should I read next?", text: "Read Turbidity & Clarity for particle context and ORP/Redox for electron potential context." }
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
