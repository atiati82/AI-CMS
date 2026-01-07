
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function TrustQualityPage() {
    useScrollTop();

    return (
        <StandardPageLayout
            title="Trust & Quality"
            subtitle="How Andara Builds Reliability"
            vibeKeywords={['Transparency', 'Verification', 'Purity']}
            seoTitle="Trust & Quality Overview – How Andara Ionic Ensures Purity, Consistency & Transparency"
            seoDescription="Discover how Andara Ionic approaches quality: from geological sourcing and lab testing to batch tracking and documentation. Explains our trust framework for water clarification minerals."
            seoKeywords={["Andara Ionic quality", "trust and transparency", "mineral origin verification", "lab tested minerals", "batch tracking", "quality assurance process", "water clarification minerals"]}
        >
            <div className="container mx-auto px-4 py-12 space-y-16">

                {/* Intro */}
                <section className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl text-emerald-400 font-light">Can I Trust It?</h2>
                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                        When you put something into your drinking water, you don't just ask "Does it work?" You ask "Is it safe? Is it consistent?" This page outlines our framework for origin, testing, and honest communication—without hype or hidden promises.
                    </p>
                </section>

                {/* Trust Framework Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                        { title: "Geology", desc: "Known origin", icon: "🌋" },
                        { title: "Process", desc: "Defined dilution", icon: "⚗️" },
                        { title: "Lab Data", desc: "Independent verification", icon: "🔬" },
                        { title: "Honesty", desc: "No false claims", icon: "🤝" },
                        { title: "Education", desc: "User sovereignty", icon: "📚" }
                    ].map((item, i) => (
                        <Card key={i} className="p-4 bg-slate-900 border-slate-800 text-center hover:bg-slate-800/50 transition-colors">
                            <div className="text-2xl mb-2">{item.icon}</div>
                            <h3 className="text-white font-medium text-sm mb-1">{item.title}</h3>
                            <p className="text-slate-500 text-xs">{item.desc}</p>
                        </Card>
                    ))}
                </section>

                {/* Origin & Process */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl text-white">Origin: Primordial Rock</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            We don't buy random commodity minerals. Andara Ionic is built on a specific class of volcanic minerals, rich in sulfate-forming elements, iron, and ultra-trace signatures.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li className="flex gap-2">
                                <span className="text-emerald-500">1.</span>
                                <span><strong>Concentrate Reception:</strong> Each batch logged with ID and documentation.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-emerald-500">2.</span>
                                <span><strong>Controlled Dilution:</strong> Precise master stock creation (e.g., 1:10).</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-emerald-500">3.</span>
                                <span><strong>Bottling:</strong> Every bottle linked to a batch record.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="h-64 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center p-8">
                        <div className="text-center space-y-2">
                            <div className="text-4xl">🏔️ ➔ 💧 ➔ 🧴</div>
                            <p className="text-slate-500 text-xs">Rock Source ➔ Concentrate ➔ Your Bottle</p>
                        </div>
                    </div>
                </section>

                {/* Lab Testing */}
                <section className="bg-slate-900 rounded-3xl p-8 border border-slate-800 space-y-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl text-white mb-4">What We Actually Test</h2>
                        <p className="text-slate-400 text-sm">
                            We test for material reality, not magic. Our labs confirm the elemental profile and safety parameters.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 bg-black/20 rounded-xl border border-slate-800">
                            <h3 className="text-emerald-300 mb-3">Elemental Profile</h3>
                            <ul className="space-y-2 text-xs text-slate-400">
                                <li className="flex justify-between border-b border-slate-800 pb-1">
                                    <span>Major Elements</span>
                                    <span className="text-slate-500">Fe, Mg, K, Ca, Sulfate</span>
                                </li>
                                <li className="flex justify-between border-b border-slate-800 pb-1">
                                    <span>Trace Elements</span>
                                    <span className="text-slate-500">Mn, Zn, B, Li, V...</span>
                                </li>
                                <li className="flex justify-between pt-1">
                                    <span>Heavy Metals Panel</span>
                                    <span className="text-slate-500">Pb, Cd, As, Hg (Safety Check)</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 bg-black/20 rounded-xl border border-slate-800">
                            <h3 className="text-blue-300 mb-3">Physical-Chemical</h3>
                            <ul className="space-y-2 text-xs text-slate-400">
                                <li className="flex justify-between border-b border-slate-800 pb-1">
                                    <span>pH</span>
                                    <span className="text-slate-500">Acidity check</span>
                                </li>
                                <li className="flex justify-between border-b border-slate-800 pb-1">
                                    <span>Density / Specific Gravity</span>
                                    <span className="text-slate-500">Concentration check</span>
                                </li>
                                <li className="flex justify-between pt-1">
                                    <span>Conductivity / TDS</span>
                                    <span className="text-slate-500">Ionic strength</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Boundaries & Disclaimer */}
                <section className="bg-emerald-950/10 border border-emerald-500/20 p-8 rounded-2xl text-center space-y-6">
                    <h2 className="text-2xl text-white">Clear Boundaries</h2>
                    <div className="max-w-2xl mx-auto space-y-4 text-sm text-slate-300">
                        <p>
                            <strong>What we DO claim:</strong> Water clarification, mineral conditioning, flocculation of impurities, ionic structuring.
                        </p>
                        <p className="text-slate-500">
                            <strong>What we do NOT claim:</strong> We do not diagnose, treat, cure, or prevent disease. Andara is a water treatment solution, not a medicine.
                        </p>
                    </div>
                    <div className="flex justify-center gap-4 pt-4">
                        <Badge variant="outline" className="border-red-500/30 text-red-400">No Medical Claims</Badge>
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">Material Science Only</Badge>
                    </div>
                </section>

                {/* Verification Call to Action */}
                <section className="text-center space-y-4">
                    <h2 className="text-xl text-white">Trust, But Verify</h2>
                    <p className="text-slate-400 text-sm max-w-xl mx-auto">
                        We encourage you to be a scientist in your own home. Use a TDS meter, check pH, observe turbidity. True trust comes from your own observation combined with our transparent data.
                    </p>
                </section>

                {/* Footer */}
                <div className="text-center text-xs text-slate-600 pt-8 border-t border-slate-800">
                    Transparency is our baseline. If you need specific certificates or data points, our support team is ready to share.
                </div>

            </div>
        </StandardPageLayout>
    );
}
