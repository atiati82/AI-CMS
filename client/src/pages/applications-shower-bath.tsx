
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";

export default function ShowerBathPage() {
    useScrollTop();

    return (
        <StandardPageLayout
            title="Shower & Bath Water"
            subtitle="Feel, Smell & the Daily Skin Terrain"
            vibeKeywords={['Softness', 'Steam', 'Immersion']}
            seoTitle="Shower & Bath Water – Clarified, Softer-Feeling, Less Harsh"
            seoDescription="See how Andara Ionic can be used as a mineral-based clarification and conditioning step for shower and bath water, focusing on feel, smell and the daily water terrain around your skin."
            seoKeywords={["shower water conditioning", "bath water clarification minerals", "andara ionic shower bath use", "reduce harsh feel of tap water", "mineral-based bath water treatment", "chlorine smell in bath water"]}
        >
            <div className="container mx-auto px-4 py-12 space-y-16">

                {/* Intro */}
                <section className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl text-emerald-400 font-light">The Water We Wear</h2>
                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                        We care about soaps and serums, but rarely about the water itself. Chlorine smells, hardness, and residues can make water feel "harsh" or drying. Andara Ionic offers a micro-dose mineral step to refine the feel and smell of your daily water terrain.
                    </p>
                </section>

                {/* Where It Fits */}
                <section className="max-w-4xl mx-auto space-y-8 text-center">
                    <h2 className="text-2xl text-white">A Final Refinement</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-900 border-slate-800 rounded-lg">
                            <div className="text-xl mb-2">🚿</div>
                            <div className="font-bold text-white mb-1">Shower Logic</div>
                            <div className="text-sm text-slate-500">Source &rarr; Filter (Optional) &rarr; Andara Local Rinse</div>
                        </div>
                        <div className="p-6 bg-slate-900 border-slate-800 rounded-lg">
                            <div className="text-xl mb-2">🛁</div>
                            <div className="font-bold text-white mb-1">Bath Logic</div>
                            <div className="text-sm text-slate-500">Fill Tub &rarr; Add Andara &rarr; Soak in Conditioned Field</div>
                        </div>
                    </div>
                </section>

                <Separator className="bg-slate-800" />

                {/* Bath Use */}
                <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-2xl text-white flex items-center gap-3">
                            <span className="text-4xl">🛁</span> Bath Ritual
                        </h2>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                            <h3 className="text-emerald-400 font-medium">Standard Tub (~100-150L)</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-slate-400 border-b border-slate-800 pb-2">
                                    <span>Dose Range</span>
                                    <span className="text-white font-bold">5 - 10 ml</span>
                                </div>
                            </div>
                            <ol className="list-decimal list-inside space-y-2 text-slate-400 text-sm pt-2">
                                <li>Fill tub with warm water.</li>
                                <li>Add 5-10 ml Andara. Swirl clock/counter-clock.</li>
                                <li>Wait 1-2 mins for settling.</li>
                                <li>Step in and observe.</li>
                            </ol>
                            <p className="text-xs text-slate-500 italic">
                                Notice: "Softness", gentler steam, less chlorine smell.
                            </p>
                        </div>
                    </div>

                    {/* Shower Use */}
                    <div className="space-y-6">
                        <h2 className="text-2xl text-white flex items-center gap-3">
                            <span className="text-4xl">🚿</span> Shower Methods
                        </h2>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-white font-medium text-sm mb-1">Basin / Pitcher Rinse</h4>
                                    <p className="text-sm text-slate-400">
                                        Keep a 3-5L jug. Add 3-5ml (~1ml/L). Use as a final rinse for hair/body. The last water to touch you is refined.
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-slate-800">
                                    <h4 className="text-white font-medium text-sm mb-1">Bucket Bath Hybrid</h4>
                                    <p className="text-sm text-slate-400">
                                        Quick wash, then switch to a 10-20L bucket of conditioned water (10-20ml Andara). Pour over body.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sensory Dimensions */}
                <section className="bg-slate-950/50 rounded-2xl p-8 border border-slate-800 max-w-4xl mx-auto">
                    <h2 className="text-2xl text-white text-center mb-8">Sensory Dimensions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="space-y-2">
                            <div className="text-emerald-500 font-bold">Smell</div>
                            <div className="text-sm text-slate-400">Softening the chlorine atmosphere.</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-emerald-500 font-bold">Touch</div>
                            <div className="text-sm text-slate-400">Silky slip vs squeaky dryness.</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-emerald-500 font-bold">Steam</div>
                            <div className="text-sm text-slate-400">Breathing a gentler mist.</div>
                        </div>
                    </div>
                </section>

                {/* Emotional Framing */}
                <section className="max-w-3xl mx-auto text-center space-y-6 opacity-80 hover:opacity-100 transition-opacity">
                    <h2 className="text-xl text-white">A Conversation with Water</h2>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-lg mx-auto">
                        With Andara, the shower is not just automatic. It's a mindful interaction. A micro-dose of primordial minerals invites the field to be clearer and softer, subtly re-arranging the water around you.
                    </p>
                </section>

                {/* Firewall */}
                <section className="bg-red-950/10 border border-red-900/20 rounded-xl p-8 text-center space-y-4 max-w-3xl mx-auto">
                    <h2 className="text-xl text-red-200/90 font-medium">Skin Terrain, Not Therapy</h2>
                    <div className="text-slate-400 text-sm space-y-2">
                        <p>This is a <strong>water conditioning</strong> page.</p>
                        <p>It is not a cosmetic, dermatological treatment, or cure for eczema/psoriasis.</p>
                        <p>If you have skin conditions, consult your professional. Listen to your body.</p>
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
                    <Link href="/applications/drinking-water-home">
                        <Button variant="ghost" className="text-slate-400 hover:text-emerald-400">Home Drinking Water &rarr;</Button>
                    </Link>
                </div>

            </div>
        </StandardPageLayout>
    );
}
