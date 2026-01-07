
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";

export default function DrinkingWaterHomePage() {
    useScrollTop();

    return (
        <StandardPageLayout
            title="Home Drinking Water"
            subtitle="Clarification, Conditioning & Everyday Ritual"
            vibeKeywords={['Ritual', 'Clarity', 'Mouthfeel']}
            seoTitle="Home Drinking Water – Clarified & Conditioned With Minerals"
            seoDescription="Discover how Andara Ionic can be used as a mineral-based clarification and conditioning step for your home drinking water, supporting clearer, cleaner-feeling and more coherent water."
            seoKeywords={["andara ionic drinking water", "mineral water conditioner home", "sulfate minerals for water clarification", "structured-feeling drinking water", "home water clarification method", "conditioning tap water with minerals", "everyday drinking water ritual", "clarified water vs untreated tap"]}
        >
            <div className="container mx-auto px-4 py-12 space-y-16">

                {/* Intro */}
                <section className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl text-emerald-400 font-light">More Than Just Filtration</h2>
                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                        Filtration is important, but even filtered water can feel "flat" or "tired". Andara Ionic is a micro-dose mineral step that works after filtration to clarify, condition, and make the water feel more alive and coherent. No promises—just a better relationship with the water you drink all day.
                    </p>
                </section>

                {/* Where It Fits */}
                <section className="max-w-4xl mx-auto space-y-8 text-center">
                    <h2 className="text-2xl text-white">The Flow</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-slate-400">
                        <div className="bg-slate-900 px-4 py-2 rounded-full border border-slate-800">Source</div>
                        <div className="text-emerald-500">→</div>
                        <div className="bg-slate-900 px-4 py-2 rounded-full border border-slate-800">Filter</div>
                        <div className="text-emerald-500">→</div>
                        <div className="bg-emerald-950/30 px-6 py-3 rounded-full border border-emerald-500/30 text-emerald-100 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]">Andara Conditioning</div>
                        <div className="text-emerald-500">→</div>
                        <div className="bg-slate-900 px-4 py-2 rounded-full border border-slate-800">Glass / Bottle</div>
                    </div>
                    <p className="text-slate-500 max-w-2xl mx-auto italic">
                        Support clarification, rebalance ionic composition, and order hydration structure.
                    </p>
                </section>

                <Separator className="bg-slate-800" />

                {/* Practical Scenarios */}
                <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Carafe Method */}
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                        <div className="text-3xl mb-2">🍶</div>
                        <h3 className="text-xl text-white font-medium">Carafe Ritual</h3>
                        <div className="space-y-2 text-sm text-slate-400">
                            <p><strong>1 Liter Glass Carafe</strong></p>
                            <p>Add <strong>1 ml</strong> Andara.</p>
                        </div>
                        <p className="text-sm text-slate-300">
                            Swirl gently. Let sit for a few minutes to allow flocculation and structuring to begin. Observe clarity and mouthfeel.
                        </p>
                    </div>

                    {/* Family Station */}
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                        <div className="text-3xl mb-2">💧</div>
                        <h3 className="text-xl text-white font-medium">Family Station</h3>
                        <div className="space-y-2 text-sm text-slate-400">
                            <p><strong>3 - 5 Liter Dispenser</strong></p>
                            <p>Add <strong>3 - 5 ml</strong> Andara.</p>
                        </div>
                        <p className="text-sm text-slate-300">
                            Create a central "altar of water" in the kitchen. Less plastic bottles, more intention.
                        </p>
                    </div>

                    {/* Travel/Office */}
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                        <div className="text-3xl mb-2">🚀</div>
                        <h3 className="text-xl text-white font-medium">Travel & Office</h3>
                        <div className="space-y-2 text-sm text-slate-400">
                            <p><strong>Travel Bottle (500-750ml)</strong></p>
                            <p>Add <strong>0.5 - 1 ml</strong>.</p>
                        </div>
                        <p className="text-sm text-slate-300">
                            Continuity of your water field from home to office to retreats.
                        </p>
                    </div>

                </section>

                {/* Science & Terrain */}
                <section className="bg-slate-950/50 rounded-2xl p-8 border border-slate-800 max-w-4xl mx-auto space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-emerald-400 font-medium">Sulfate Activation Range</h3>
                            <p className="text-slate-300 text-sm">
                                1 ml per liter lands you in the <strong>17–18 mg/L</strong> sulfate zone. This biological sweet spot appears in plasma (~30 mg/L) and classical water treatment windows.
                            </p>
                            <Link href="/science/sulfate-chemistry">
                                <span className="text-emerald-500 text-xs hover:underline cursor-pointer">Explore Sulfate Chemistry &rarr;</span>
                            </Link>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-emerald-400 font-medium">Terrain View</h3>
                            <p className="text-slate-300 text-sm">
                                Your body is a water terrain. The quality, clarity, and ionic pattern of what you drink contributes to the inner "climate". Moving from "just not toxic" to "coherently arranged".
                            </p>
                        </div>
                    </div>
                </section>

                {/* Integration */}
                <section className="max-w-3xl mx-auto space-y-6">
                    <h2 className="text-xl text-white text-center">Integration with Filters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-slate-900 p-4 rounded border border-slate-800">
                            <strong className="text-white block mb-1">Reverse Osmosis (RO)</strong>
                            <span className="text-slate-400">RO can feel empty. Andara clarifies and structures it after remineralization.</span>
                        </div>
                        <div className="bg-slate-900 p-4 rounded border border-slate-800">
                            <strong className="text-white block mb-1">Spring / Bottled</strong>
                            <span className="text-slate-400">Already mineralized, but Andara adds specific sulfate-driven structuring.</span>
                        </div>
                    </div>
                </section>

                {/* Rituals */}
                <section className="max-w-3xl mx-auto text-center space-y-6 opacity-80 hover:opacity-100 transition-opacity">
                    <h2 className="text-xl text-white">Morning & Evening</h2>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-lg mx-auto">
                        <strong>Morning:</strong> Swirl in the 3-6-9 pattern. Place in a calm spot.<br />
                        <strong>Evening:</strong> Prepare for tomorrow. Let sit overnight for deep settling.
                    </p>
                </section>

                {/* Firewall */}
                <section className="bg-red-950/10 border border-red-900/20 rounded-xl p-8 text-center space-y-4 max-w-3xl mx-auto">
                    <h2 className="text-xl text-red-200/90 font-medium">Not a Medical Product</h2>
                    <div className="text-slate-400 text-sm space-y-2">
                        <p>Andara Ionic is a water clarification & conditioning product.</p>
                        <p>It is not a pharmaceutical, supplement, or cure.</p>
                        <p>All ideas here are about water quality, clarity, and feel.</p>
                    </div>
                </section>

                <Separator className="bg-slate-800" />

                {/* Footer Links */}
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Link href="/shop/andara-ionic-100ml">
                        <Button variant="ghost" className="text-slate-400 hover:text-emerald-400">Shop 100ml Source &rarr;</Button>
                    </Link>
                    <Link href="/andara-dilution-calculator">
                        <Button variant="ghost" className="text-slate-400 hover:text-emerald-400">Dilution Calculator &rarr;</Button>
                    </Link>
                    <Link href="/natural-vs-treated-water">
                        <Button variant="ghost" className="text-slate-400 hover:text-emerald-400">Natural vs Treated &rarr;</Button>
                    </Link>
                </div>

            </div>
        </StandardPageLayout>
    );
}
