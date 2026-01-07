
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";

export default function PlantWateringPage() {
    useScrollTop();

    return (
        <StandardPageLayout
            title="Plant Watering"
            subtitle="Bringing Mineral-Structured Water Back to the Roots"
            vibeKeywords={['Growth', 'Root Zone', 'Structure']}
            seoTitle="Plant Watering – Using Andara Ionic for Root-Zone Water Quality"
            seoDescription="Discover how Andara Ionic can be used in watering plants, pots and small gardens to clarify and condition irrigation water. Focus on water quality, not fertilizer claims."
            seoKeywords={["andara ionic plant watering", "mineral-structured water for plants", "sulfate minerals irrigation water", "clarified water for houseplants", "plant watering water quality"]}
        >
            <div className="container mx-auto px-4 py-12 space-y-16">

                {/* Intro */}
                <section className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl text-emerald-400 font-light">Water: The Invisible Soil Architect</h2>
                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                        Most plant advice starts with soil or light. Very few ask: "What is the quality of the water entering the root zone?" Andara works one layer below fertilizer—on the structure, clarity, and mineral-coherence of the water itself.
                    </p>
                </section>

                {/* The Three Layers */}
                <section className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-2xl text-white text-center">Three Layers of Every Watering</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-6 bg-slate-900 border-slate-800 rounded-lg">
                            <div className="text-xl mb-2">💧</div>
                            <div className="font-bold text-white mb-1">1. Base Water</div>
                            <div className="text-sm text-slate-500">Tap, Well, or Filtered</div>
                        </div>
                        <div className="p-6 bg-slate-900 border-slate-800 rounded-lg">
                            <div className="text-xl mb-2">🌱</div>
                            <div className="font-bold text-white mb-1">2. Soil & Life</div>
                            <div className="text-sm text-slate-500">Compost, Microbes, Roots</div>
                        </div>
                        <div className="p-6 bg-emerald-950/20 border-emerald-900/40 rounded-lg border-dashed">
                            <div className="text-xl mb-2">✨</div>
                            <div className="font-bold text-emerald-400 mb-1">3. Structured Input</div>
                            <div className="text-sm text-emerald-100/70">Clarified, Mineral-Ordered Water</div>
                        </div>
                    </div>
                    <p className="text-center text-slate-400 text-sm italic">
                        Andara's role is strictly in Layer 3: helping water enter the living world with coherence.
                    </p>
                </section>

                <Separator className="bg-slate-800" />

                {/* Protocols */}
                <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Houseplants */}
                    <div className="space-y-6">
                        <h2 className="text-2xl text-white flex items-center gap-3">
                            <span className="text-4xl">🪴</span> Houseplants
                        </h2>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                            <p className="text-slate-300 text-sm">For pots, balcony boxes, and indoor green spaces.</p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-slate-400 border-b border-slate-800 pb-2">
                                    <span>Frequency</span>
                                    <span className="text-white">Every 2nd or 3rd watering</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-400 border-b border-slate-800 pb-2">
                                    <span>Strategy</span>
                                    <span className="text-emerald-400">Stable Pattern</span>
                                </div>
                            </div>
                            <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm pt-2">
                                <li>Observe root zone moisture (not too soggy).</li>
                                <li>Check how soil dries between waterings.</li>
                                <li>For balcony: Mix a "mother bucket" (e.g., 20L) and refill cans from there.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Watering Can */}
                    <div className="space-y-6">
                        <h2 className="text-2xl text-white flex items-center gap-3">
                            <span className="text-4xl">🚿</span> Watering Can Mix
                        </h2>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                            <p className="text-slate-300 text-sm">Universal method for garden beds and larger pots.</p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-slate-400 border-b border-slate-800 pb-2">
                                    <span>Volume</span>
                                    <span className="text-white">10 Liters</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-400 border-b border-slate-800 pb-2">
                                    <span>Dose</span>
                                    <span className="text-emerald-400 font-bold">10 - 20 ml</span>
                                </div>
                            </div>
                            <ol className="list-decimal list-inside space-y-2 text-slate-400 text-sm pt-2">
                                <li>Fill can with water.</li>
                                <li>Add 1-2 ml per liter (Total 10-20ml).</li>
                                <li>Stir with a stick. Water base of plants.</li>
                            </ol>
                            <div className="text-xs text-slate-500 italic pt-2">
                                Terrain observation: Does water pool or soak? Is soil crumbly?
                            </div>
                        </div>
                    </div>

                </section>

                {/* Fertilizers & Micro-Terrain */}
                <section className="bg-slate-950/50 rounded-2xl p-8 border border-slate-800 max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl text-white">Micro-Terrain Thinking</h2>
                        <p className="text-slate-400">Each pot is a tiny world.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-emerald-400 font-medium">With Fertilizers?</h3>
                            <p className="text-slate-300 text-sm">
                                Yes, Andara is compatible with organic fertilizers and compost teas.
                            </p>
                            <div className="bg-emerald-950/30 p-4 rounded border border-emerald-900/30 text-sm text-emerald-100">
                                <strong>Order of Operations:</strong><br />
                                1. Condition Base Water (Andara)<br />
                                2. Add Fertilizer<br />
                                3. Water
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-emerald-400 font-medium">Why It Matters</h3>
                            <p className="text-slate-300 text-sm">
                                Water structure influences how air and moisture alternate in the root zone. Andara invites water into a coherent state so the living soil community can work harmoniously.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Journal */}
                <section className="max-w-3xl mx-auto text-center space-y-6 opacity-80 hover:opacity-100 transition-opacity">
                    <h2 className="text-xl text-white">Try a 4-Week Journal</h2>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-lg mx-auto">
                        Don't look for miracles. Look for relationship. Note the date, the weather, and the <em>feel</em> of the soil.
                    </p>
                </section>

                {/* Firewall */}
                <section className="bg-red-950/10 border border-red-900/20 rounded-xl p-8 text-center space-y-4 max-w-3xl mx-auto">
                    <h2 className="text-xl text-red-200/90 font-medium">Plant Care Boundaries</h2>
                    <div className="text-slate-400 text-sm space-y-2">
                        <p>Andara Ionic is a <strong>water conditioning product</strong>.</p>
                        <p>It is not a fertilizer, pesticide, or "plant medicine".</p>
                        <p>We make no claims about yields, growth rates, or disease resistance.</p>
                        <p>You remain responsible for soil nutrition and irrigation frequency.</p>
                    </div>
                </section>

                <Separator className="bg-slate-800" />

                {/* Footer Links */}
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Link href="/applications/drinking-water-home">
                        <Button variant="ghost" className="text-slate-400 hover:text-emerald-400">Home Applications →</Button>
                    </Link>
                    <Link href="/concepts/terrain-model-overview">
                        <Button variant="ghost" className="text-slate-400 hover:text-emerald-400">Terrain Model →</Button>
                    </Link>
                    <Link href="/andara-dilution-calculator">
                        <Button variant="ghost" className="text-slate-400 hover:text-emerald-400">Dilution Calculator →</Button>
                    </Link>
                </div>

            </div>
        </StandardPageLayout>
    );
}
