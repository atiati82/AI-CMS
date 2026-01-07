
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";

export default function SoilGardenPage() {
    useScrollTop();

    return (
        <StandardPageLayout
            title="Soil & Garden Beds"
            subtitle="Conditioning Water for Living Soil"
            vibeKeywords={['Living Terrain', 'Soil Health', 'Bioelectric Network']}
            seoTitle="Soil & Garden Beds – Conditioning Water for Living Soil"
            seoDescription="Learn how Andara Ionic can be used to clarify and condition irrigation water for raised beds and small gardens, supporting a more coherent, terrain-aware soil environment."
            seoKeywords={["andara ionic garden soil", "mineral-structured irrigation water", "clarified water for garden beds", "sulfate minerals garden watering", "soil terrain and water quality"]}
        >
            <div className="container mx-auto px-4 py-12 space-y-16">

                {/* Intro */}
                <section className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl text-emerald-400 font-light">From Dirt to Living Terrain</h2>
                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                        A garden bed is not just dirt + fertilizer; it is a living terrain of minerals, microbes, and air pockets. Water is the moving architecture that fills pores and transports nutrients. This page is not about "feeding" plants, but conditioning the water that flows through the soil so the whole terrain organizes itself harmoniously.
                    </p>
                </section>

                {/* Where Andara Fits */}
                <section className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-2xl text-white text-center">The Role of Water Structure</h2>
                    <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 text-center">
                        <p className="text-slate-300 text-lg mb-6">
                            Andara Ionic is a mineral sulfate complex used to clarify and condition water.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                            <div className="space-y-2">
                                <div className="text-emerald-500 font-bold">Clarify</div>
                                <div className="text-slate-400">Support flocculation of suspended particles.</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-emerald-500 font-bold">Signature</div>
                                <div className="text-slate-400">Bring a coherent sulfate signature to water films.</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-emerald-500 font-bold">Order</div>
                                <div className="text-slate-400">Support ordered hydration in the root zone.</div>
                            </div>
                        </div>
                    </div>
                </section>

                <Separator className="bg-slate-800" />

                {/* Practical Scenarios */}
                <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Storage Containers */}
                    <div className="space-y-6">
                        <h2 className="text-2xl text-white flex items-center gap-3">
                            <span className="text-4xl">🛢️</span> Barrels & Tanks
                        </h2>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                            <p className="text-slate-300 text-sm">Best for staging water before irrigation.</p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-slate-400 border-b border-slate-800 pb-2">
                                    <span>Volume (Example)</span>
                                    <span className="text-white">60 Liters</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-400 border-b border-slate-800 pb-2">
                                    <span>Dose</span>
                                    <span className="text-emerald-400 font-bold">60 - 120 ml</span>
                                </div>
                            </div>
                            <ol className="list-decimal list-inside space-y-2 text-slate-400 text-sm pt-2">
                                <li>Fill barrel. Add 1-2 ml per liter.</li>
                                <li>Stir/vortex with a stick.</li>
                                <li>Let sit 10-30 mins (settling & structuring).</li>
                                <li>Draw for watering cans or hose-feed.</li>
                            </ol>
                        </div>
                    </div>

                    {/* Raised Beds */}
                    <div className="space-y-6">
                        <h2 className="text-2xl text-white flex items-center gap-3">
                            <span className="text-4xl">🌱</span> Raised Beds
                        </h2>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                            <p className="text-slate-300 text-sm">Use conditioned water for regular irrigation or occasional flushing.</p>
                            <div className="bg-emerald-950/20 p-4 rounded border border-emerald-900/30">
                                <h4 className="text-emerald-400 font-medium text-sm mb-2">Terrain Observations</h4>
                                <ul className="list-disc list-inside space-y-1 text-slate-400 text-xs">
                                    <li>Does water penetrate evenly?</li>
                                    <li>Less surface crusting?</li>
                                    <li>Soil feel: Crumbly vs Compacted?</li>
                                    <li>Vital vs Inert?</li>
                                </ul>
                            </div>
                            <p className="text-xs text-slate-500 italic">
                                Not about miracles—about developing a relationship with soil behavior.
                            </p>
                        </div>
                    </div>

                </section>

                {/* Terrain Logic & Amendments */}
                <section className="bg-slate-950/50 rounded-2xl p-8 border border-slate-800 max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl text-white">Terrain Logic</h2>
                        <p className="text-slate-400">Soil is a bioelectric and mineral network.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-emerald-400 font-medium">Bioelectric Mesh</h3>
                            <p className="text-slate-300 text-sm">
                                When you condition water with a mineral sulfate complex, you give the soil a coherent ionic environment where biology can self-organize intelligently.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-emerald-400 font-medium">With Amendments</h3>
                            <p className="text-slate-300 text-sm">
                                Condition base water first, then add compost teas or organic fertilizers. Andara aligns the water; nutrients feed the plants. (Water Quality First &rarr; Nutrient Content Second).
                            </p>
                        </div>
                    </div>
                </section>

                {/* Journal */}
                <section className="max-w-3xl mx-auto text-center space-y-6 opacity-80 hover:opacity-100 transition-opacity">
                    <h2 className="text-xl text-white">The Garden Terrain Log</h2>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-lg mx-auto">
                        Turn gardening into a dialogue. Note the weather, the water used, and the <em>intuitive feel</em> of the soil vitality.
                    </p>
                </section>

                {/* Firewall */}
                <section className="bg-red-950/10 border border-red-900/20 rounded-xl p-8 text-center space-y-4 max-w-3xl mx-auto">
                    <h2 className="text-xl text-red-200/90 font-medium">Gardener Responsibility</h2>
                    <div className="text-slate-400 text-sm space-y-2">
                        <p>We clarify water. We do not promise yields, growth rates, or pest resistance.</p>
                        <p>This is <strong>not a pesticide or fertilizer</strong>.</p>
                        <p>You are responsible for soil prep, crop choice, and irrigation management.</p>
                    </div>
                </section>

                <Separator className="bg-slate-800" />

                {/* Footer Links */}
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Link href="/applications/drinking-water-home">
                        <Button variant="ghost" className="text-slate-400 hover:text-emerald-400">Home Applications →</Button>
                    </Link>
                    <Link href="/shop/andara-ionic-100ml">
                        <Button variant="ghost" className="text-slate-400 hover:text-emerald-400">Shop Andara →</Button>
                    </Link>
                    <Link href="/science/mineral-sources">
                        <Button variant="ghost" className="text-slate-400 hover:text-emerald-400">Mineral Origin →</Button>
                    </Link>
                </div>

            </div>
        </StandardPageLayout>
    );
}
