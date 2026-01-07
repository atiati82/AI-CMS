import React from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { FadeIn } from "@/components/animations";
import {
    Beaker,
    ArrowRight,
    HelpCircle,
    Activity,
    Droplets,
    AlertTriangle,
    ClipboardList
} from "lucide-react";

export default function FerrousIronSulphatePage() {
    return (
        <StandardPageLayout
            title="Ferrous Iron Sulphate"
            subtitle="Understanding the connection between ferrous iron (Fe²⁺), sulfate chemistry, and water system behavior."
            
            heroVariant="blue"
            heroIcon={Beaker}
            badges={[{ text: "Chemistry Education", icon: Beaker }]}
            seoTitle="Ferrous Iron Sulphate: What It Is + How It Relates to Sulfate Chemistry & Water Systems"
            seoDescription="Learn what ferrous iron sulphate is, what “ferrous” means, how it connects to sulfate chemistry, ionic minerals, and water measurements like EC/TDS."
            relatedLinks={[
                { title: "Sulfate Chemistry", url: "/sulfate-chemistry", type: "internal" },
                { title: "What is Redox?", url: "/orp-redox-water", type: "internal" }
            ]}
        >
            {/* SECTION 1: DEFINITIONS */}
            <section className="py-20 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <FadeIn>
                            <div>
                                <h2 className="text-2xl font-display text-white mb-6">What is it?</h2>
                                <p className="text-white/70 mb-6 leading-relaxed">
                                    Ferrous iron sulphate (often written as ferrous sulfate) is a chemistry term that combines two key components:
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                                        <div className="w-8 h-8 rounded-full bg-[#f6d56a]/20 flex items-center justify-center text-[#f6d56a] font-bold text-xs flex-shrink-0">Fe</div>
                                        <div>
                                            <strong className="block text-white">Ferrous Iron (Fe²⁺)</strong>
                                            <span className="text-white/60 text-sm">Iron in a specific oxidation state, distinct from ferric iron (Fe³⁺).</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                                        <div className="w-8 h-8 rounded-full bg-[#1aa7ff]/20 flex items-center justify-center text-[#1aa7ff] font-bold text-xs flex-shrink-0">SO₄</div>
                                        <div>
                                            <strong className="block text-white">Sulphate Ion (SO₄²⁻)</strong>
                                            <span className="text-white/60 text-sm">The tetrahedral anion that links this to mineral science.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </FadeIn>

                        <FadeIn>
                            <div className="bg-[#0b1020] p-8 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-bold text-white mb-4">Why is "Ferrous" important?</h3>
                                <p className="text-white/60 text-sm mb-6">
                                    The word "ferrous" matters because iron behaves differently depending on its oxidation state (redox).
                                    This behavior is influenced by oxygen, pH, and other ions in the water.
                                </p>
                                <div className="flex flex-col gap-2">
                                    <Link href="/orp-redox-water" className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all group">
                                        <span className="text-sm text-white group-hover:text-[#f6d56a]">What is Redox (ORP)?</span>
                                        <ArrowRight className="w-4 h-4 text-white/30" />
                                    </Link>
                                    <Link href="/sulfate-chemistry" className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all group">
                                        <span className="text-sm text-white group-hover:text-[#1aa7ff]">Sulfate Chemistry</span>
                                        <ArrowRight className="w-4 h-4 text-white/30" />
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* SECTION 2: MEASUREMENT CONTEXT */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4">
                    <FadeIn>
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-display text-white mb-6">How This Relates to Water Measurements</h2>
                            <p className="text-white/60">
                                Home meters cannot identify "ferrous iron sulphate" by name.
                                Instead, we measure the <strong>system changes</strong> that occur when ionic chemistry is active.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FadeIn>
                            <div className="p-6 rounded-2xl bg-[#0b1020] border border-white/5">
                                <Activity className="w-8 h-8 text-[#1aa7ff] mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">EC / TDS</h3>
                                <p className="text-[#1aa7ff] font-mono text-xs uppercase tracking-wider mb-4">Ionic Fingerprint</p>
                                <p className="text-white/60 text-sm">
                                    Ionic composition changes show up in Electrical Conductivity (EC) and Total Dissolved Solids (TDS).
                                </p>
                                <Link href="/conductivity-tds-water" className="mt-4 inline-block text-xs font-bold text-white/40 hover:text-white transition-colors">Learn More →</Link>
                            </div>
                        </FadeIn>

                        <FadeIn>
                            <div className="p-6 rounded-2xl bg-[#0b1020] border border-white/5">
                                <Droplets className="w-8 h-8 text-[#f6d56a] mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">ORP (Redox)</h3>
                                <p className="text-[#f6d56a] font-mono text-xs uppercase tracking-wider mb-4">Context Window</p>
                                <p className="text-white/60 text-sm">
                                    Oxidation-Reduction Potential (ORP) is a context signal that can drift with temperature, gases, and iron states.
                                </p>
                                <Link href="/orp-redox-water" className="mt-4 inline-block text-xs font-bold text-white/40 hover:text-white transition-colors">Learn More →</Link>
                            </div>
                        </FadeIn>

                        <FadeIn>
                            <div className="p-6 rounded-2xl bg-[#0b1020] border border-white/5">
                                <ClipboardList className="w-8 h-8 text-[#38ffd1] mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Time Curves</h3>
                                <p className="text-[#38ffd1] font-mono text-xs uppercase tracking-wider mb-4">The Real Skill</p>
                                <p className="text-white/60 text-sm">
                                    Single measurements are noisy. Reliable patterns emerge when you measure at T0, T30 min, and T24h.
                                </p>
                                <Link href="/parameter-tracking" className="mt-4 inline-block text-xs font-bold text-white/40 hover:text-white transition-colors">See Protocol →</Link>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>


            {/* SECTION 3: PROTOCOL */}
            <section className="py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto">
                    <FadeIn>
                        <div className="bg-[#0b1020] rounded-3xl p-8 border border-white/10">
                            <h2 className="text-2xl font-display text-white mb-6">Practical Comparison Protocol</h2>
                            <p className="text-white/60 mb-8">
                                An educational template for comparing baseline water vs a changed water condition.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-sm">1</div>
                                    <div>
                                        <h4 className="font-bold text-white">Setup</h4>
                                        <p className="text-sm text-white/60">Fill 2 identical glass jars with baseline water. Label A (Baseline) and B (Test).</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-sm">2</div>
                                    <div>
                                        <h4 className="font-bold text-white">Measure</h4>
                                        <p className="text-sm text-white/60">Measure Temperature, EC/TDS at T0 (Start), T30 (30 mins), and T24h (Next Day).</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-sm">3</div>
                                    <div>
                                        <h4 className="font-bold text-white">Log Results</h4>
                                        <p className="text-sm text-white/60">Record your data to see the "curve" of change vs the stability of the baseline.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <Link href="/andara-vs-baseline-water-protocol" className="inline-flex items-center gap-2 px-6 py-3 bg-[#63b4ff] text-white font-bold rounded-lg hover:bg-[#1aa7ff] transition-colors">
                                    View Full Protocol <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 4: COMMON MISTAKES */}
            <section className="py-20 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-8">Common Mistakes & Myths</h2>
                        <div className="space-y-4 text-left">
                            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex gap-4">
                                <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                                <div>
                                    <h4 className="text-red-300 font-bold text-sm">Mistake: Assuming TDS identifies ferrous iron sulphate</h4>
                                    <p className="text-red-200/60 text-sm">TDS cannot identify specific compounds—only the total dissolved solids burden.</p>
                                </div>
                            </div>
                            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex gap-4">
                                <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                                <div>
                                    <h4 className="text-red-300 font-bold text-sm">Mistake: Overclaiming from a single observation</h4>
                                    <p className="text-red-200/60 text-sm">Only curves + repeated runs produce reliable patterns. Single readings are often noise.</p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Common Questions</h2>
                    <div className="space-y-6">
                        <div className="border-b border-white/10 pb-6">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                What is ferrous iron sulphate?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed">Ferrous iron sulphate is a compound term that combines ferrous iron (Fe²⁺) with the sulphate ion (SO₄²⁻). It’s often written as ferrous sulfate.</p>
                        </div>
                        <div className="border-b border-white/10 pb-6">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                What does ferrous mean?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed">Ferrous refers to iron in the Fe²⁺ state.</p>
                        </div>
                        <div className="border-b border-white/10 pb-6">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                How does this relate to sulfate chemistry?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed">It relates to sulfate chemistry through the sulphate ion (SO₄²⁻), a key anion in mineral-water discussions.</p>
                        </div>
                        <div className="border-b border-white/10 pb-6">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                Can I detect ferrous iron sulphate with a TDS meter?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed">No. EC/TDS can reflect overall ionic content but cannot identify specific compounds.</p>
                        </div>
                    </div>
                </div>
            </section>

        </StandardPageLayout>
    );
}
