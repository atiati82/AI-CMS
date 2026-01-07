
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";

export default function CookingTeaCoffeePage() {
    useScrollTop();

    return (
        <StandardPageLayout
            title="Cooking, Tea & Coffee"
            subtitle="Bringing Mineral Intelligence into Your Daily Rituals"
            vibeKeywords={['Ritual', 'Extraction', 'Taste']}
            seoTitle="Cooking, Tea & Coffee – Using Andara Ionic in Daily Rituals"
            seoDescription="See how Andara Ionic can be used for cooking, tea and coffee. Learn when to add it, how much to use, and what shifts you may notice in taste, clarity and feel."
            seoKeywords={["andara ionic tea coffee", "cooking with mineral water", "how to use andara in cooking", "sulfate minerals tea extraction", "structured water for coffee"]}
        >
            <div className="container mx-auto px-4 py-12 space-y-16">

                {/* Intro */}
                <section className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl text-emerald-400 font-light">Where Water Becomes Taste</h2>
                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                        Water is not just a carrier. It decides what is extracted from leaves and beans, and how aromatics arrange. Andara Ionic conditions the water so extraction, mouthfeel, and aftertaste can shift in subtle, real ways.
                    </p>
                </section>

                {/* Setup */}
                <section className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl text-white">First Ingredients, Then Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <Card className="p-4 bg-slate-900 border-slate-800">
                                <div className="text-emerald-500 font-bold mb-1">01</div>
                                <div className="text-white text-sm font-medium">Good Source Water</div>
                                <div className="text-slate-500 text-xs">Filtered, spring, or good tap</div>
                            </Card>
                            <Card className="p-4 bg-slate-900 border-slate-800">
                                <div className="text-emerald-500 font-bold mb-1">02</div>
                                <div className="text-white text-sm font-medium">Filtration</div>
                                <div className="text-slate-500 text-xs">Jug, RO, Under-sink</div>
                            </Card>
                            <Card className="p-4 bg-emerald-950/20 border-emerald-900/40 border-dashed">
                                <div className="text-emerald-400 font-bold mb-1">03</div>
                                <div className="text-emerald-100 text-sm font-medium">Andara Conditioning</div>
                                <div className="text-emerald-500/80 text-xs">Add before heating</div>
                            </Card>
                        </div>
                    </div>
                    <p className="text-center text-slate-400 text-sm italic">
                        "Keep your normal kitchen habits but upgrade the invisible ingredient—the water."
                    </p>
                </section>

                <Separator className="bg-slate-800" />

                {/* Tea Section */}
                <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 order-2 md:order-1">
                        <h2 className="text-2xl text-emerald-400">Tea: Gentle Extraction</h2>
                        <div className="space-y-4 text-slate-300 text-sm">
                            <p><strong>The Dose:</strong> ≈ 1 ml Andara Ionic per 1 liter water (~17–18 mg/L sulfate).</p>
                            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 space-y-2">
                                <h4 className="text-white font-medium">Protocol</h4>
                                <ol className="list-decimal list-inside space-y-1 text-slate-400">
                                    <li>Fill kettle with 1 liter usual tea water.</li>
                                    <li>Add 1 ml Andara Ionic. Swirl/stir.</li>
                                    <li>Heat as normal.</li>
                                    <li>Brew. (Don't change tea type or time initially).</li>
                                </ol>
                            </div>
                            <p><strong>Observe:</strong> Clarity in the cup, rounder texture ("silkier"), and balanced bitterness.</p>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 text-center text-8xl opacity-20 select-none grayscale">
                        🍵
                    </div>
                </section>

                {/* Coffee Section */}
                <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-1 text-center text-8xl opacity-20 select-none grayscale">
                        ☕
                    </div>
                    <div className="space-y-6 order-2">
                        <h2 className="text-2xl text-amber-500">Coffee: Structure Behind Crema</h2>
                        <div className="space-y-4 text-slate-300 text-sm">
                            <p><strong>The Dose:</strong> ≈ 1 ml Andara Ionic per 1 liter brew water.</p>
                            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 space-y-2">
                                <h4 className="text-white font-medium">Protocol (Filter/Pour-Over)</h4>
                                <ol className="list-decimal list-inside space-y-1 text-slate-400">
                                    <li>Prep 1L water in kettle.</li>
                                    <li>Add 1 ml Andara Ionic. Swirl. Heat.</li>
                                    <li>Brew as usual.</li>
                                </ol>
                            </div>
                            <p><strong>Note for Machines:</strong> You can use conditioned water in tank-fed espresso machines, but always respect manufacturer descaling and hardness guidelines.</p>
                        </div>
                    </div>
                </section>

                {/* Cooking Section */}
                <section className="bg-slate-900/30 rounded-2xl p-8 border border-slate-800 max-w-4xl mx-auto space-y-8">
                    <div className="text-center">
                        <h2 className="text-2xl text-white">Cooking: Soups, Grains & Veg</h2>
                        <p className="text-slate-400 text-sm mt-2">Not every dish needs it, but simple foods show quality clearly.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 bg-slate-950 border-slate-800">
                            <h3 className="text-emerald-400 font-medium mb-2">Soups & Broths</h3>
                            <p className="text-xs text-slate-500 mb-4">1-2 Liters • ~1ml/L</p>
                            <p className="text-slate-300 text-sm">
                                Observe how fats, proteins, and herbs arrange. Does the soup feel more "connected"?
                            </p>
                        </Card>
                        <Card className="p-6 bg-slate-950 border-slate-800">
                            <h3 className="text-emerald-400 font-medium mb-2">Grains (Rice/Quinoa)</h3>
                            <p className="text-xs text-slate-500 mb-4">Cooking water or Steam splash</p>
                            <p className="text-slate-300 text-sm">
                                Use conditioned water for cooking or the final steam "fluff". Notice texture (sticky vs fluffy) and moisture retention.
                            </p>
                        </Card>
                    </div>
                </section>

                {/* Guidelines */}
                <section className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-2xl text-white text-center">Guidelines & Common Sense</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-emerald-400 font-medium border-b border-emerald-500/30 pb-2">Do's</h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>✅ Use after filtration.</li>
                                <li>✅ Add before heating for best mixing.</li>
                                <li>✅ Start with ~1ml/L standard band.</li>
                                <li>✅ Note what you taste and feel.</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-red-400 font-medium border-b border-red-500/30 pb-2">Don'ts</h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>❌ Not a substitute for sterilization.</li>
                                <li>❌ Don't massively overdose "for effect".</li>
                                <li>❌ Don't ignore medical restrictions.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Firewall */}
                <section className="bg-red-950/10 border border-red-900/20 rounded-xl p-8 text-center space-y-4 max-w-3xl mx-auto">
                    <h2 className="text-xl text-red-200/90 font-medium">Safety Firewall</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Andara Ionic is a water clarification & conditioning product. It is <strong>not a medicine, supplement, or flavoring</strong>. It does not treat disease. All food hygiene and safety norms remain your responsibility.
                    </p>
                </section>

                <Separator className="bg-slate-800" />

                {/* Footer Links */}
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Link href="/applications/drinking-water-home">
                        <Button variant="ghost" className="text-slate-400 hover:text-emerald-400">Drinking Water Guide →</Button>
                    </Link>
                    <Link href="/support/how-to-choose-dose">
                        <Button variant="ghost" className="text-slate-400 hover:text-emerald-400">Dilution Calculator →</Button>
                    </Link>
                </div>

            </div>
        </StandardPageLayout>
    );
}
