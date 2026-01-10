import React from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { BackgroundLayer } from "@/components/visuals/BackgroundLayer";
import { Button } from "@/components/ui/button";
import {
    ClipboardList,
    Calculator,
    Droplets,
    Clock,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Beaker
} from "lucide-react";

import { VideoBackground } from "@/components/SmartVideoEmbed";

export default function HowToUseAndaraPage() {

    // --- JSON-LD ---
    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Use Andara Ionic",
        "description": "Standard protocol for preparing Andara Ionic water.",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Choose Water Source",
                "text": "Select a consistent baseline water source (Spring, RO, Distilled) and stick to it."
            },
            {
                "@type": "HowToStep",
                "name": "Calculate Dosage",
                "text": "Use the dilution calculator to determine the correct amount of Andara for your container volume."
            },
            {
                "@type": "HowToStep",
                "name": "Add and Wait",
                "text": "Add minerals, stir gently, and allow the water to rest for the coherence window (typically overnight)."
            }
        ]
    };

    return (
        <StandardPageLayout
            title={<>How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">Use</span> Andara</>}
            subtitle={<>Simple Preparation Protocol.<br />Consistency is the Key.</>}
            backgroundElement={
                <VideoBackground
                    videoId="andara-flow-abstract"
                    keywords={["how-to", "protocol", "water", "andara"]}
                />
            }
            heroVariant="emerald"
            heroIcon={ClipboardList}
            badges={[{ text: "Usage Protocol", icon: Beaker }]}
            seoTitle="How to Use Andara Ionic: Preparation Protocol & Dosage"
            seoDescription="Step-by-step guide on how to use Andara Ionic minerals. Learn the 3 pillars of usage: Source consistency, precise dilution, and the coherence time window."
            intro="The effectiveness of Andara relies on protocol, not quantity. Follow these steps to establish a stable mineral context."
            extraHead={<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />}
        >

            {/* CALCULATOR CALLOUT - Top Priority */}
            <section className="py-12 relative z-20 -mt-8 mb-8">
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="andara-glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-cyan-500/30 bg-cyan-950/20">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                                <Calculator className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Dosage Calculator</h3>
                                <p className="text-white/60 text-sm">Don't guess. Calculate the exact ratio for your container.</p>
                            </div>
                        </div>
                        <Link href="/andara-dilution-calculator">
                            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold whitespace-nowrap">
                                Open Calculator <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 3 PILLARS OF USAGE */}
            <section className="py-16 relative z-10">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-display text-white mb-4">The 3 Steps to Stability</h2>
                        <p className="text-white/60">Success comes from removing variables.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Step 1 */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative p-8 rounded-2xl border border-white/10 bg-[#05060b] h-full">
                                <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center font-bold text-black border-4 border-[#020617]">1</span>
                                <Droplets className="w-10 h-10 text-teal-400 mb-6" />
                                <h3 className="text-xl font-bold text-white mb-4">Pick One Source</h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">
                                    Do not rotate between tap, bottle, and filter water daily. Choose ONE baseline.
                                </p>
                                <ul className="text-white/50 text-xs space-y-2">
                                    <li className="flex gap-2"><CheckCircle2 className="w-3 h-3 text-teal-500" /> Spring Water (Recommended)</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-3 h-3 text-teal-500" /> Double Filtered</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-3 h-3 text-teal-500" /> Distilled/RO (Requires remineralization)</li>
                                </ul>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative p-8 rounded-2xl border border-white/10 bg-[#05060b] h-full">
                                <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-black border-4 border-[#020617]">2</span>
                                <Calculator className="w-10 h-10 text-blue-400 mb-6" />
                                <h3 className="text-xl font-bold text-white mb-4">Calculate Dose</h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">
                                    Use the Ratio: <strong>1 drop per 100ml</strong> (Standard) or <strong>5ml (1 tsp) per Gallon</strong>.
                                </p>
                                <div className="bg-white/5 p-3 rounded border border-white/10">
                                    <p className="text-xs text-center text-white/80">
                                        <span className="text-blue-400 font-bold">1 Liter</span> = 10-12 Drops<br />
                                        <span className="text-blue-400 font-bold">1 Gallon</span> = 1 Teaspoon (5ml)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative p-8 rounded-2xl border border-white/10 bg-[#05060b] h-full">
                                <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold text-black border-4 border-[#020617]">3</span>
                                <Clock className="w-10 h-10 text-purple-400 mb-6" />
                                <h3 className="text-xl font-bold text-white mb-4">The "Wait" Window</h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">
                                    Do not drink immediately. The flocculation process needs time to organize.
                                </p>
                                <ul className="text-white/50 text-xs space-y-2">
                                    <li className="flex gap-2"><CheckCircle2 className="w-3 h-3 text-purple-500" /> 8-12 Hours (Ideal/Overnight)</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-3 h-3 text-purple-500" /> 24 Hours (Maximum Clarity)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DETAILED WALKTHROUGH */}
            <section className="py-24 bg-[#05060b] relative border-t border-white/5">
                <BackgroundLayer opacity={20} />
                <div className="container px-4 max-w-4xl mx-auto relative z-10">
                    <h2 className="text-2xl font-display text-white mb-12 text-center">Protocol in Detail</h2>

                    <div className="space-y-12">
                        {/* Step A */}
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center text-2xl font-bold text-white/40">A</div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Prepare Vessel</h3>
                                <p className="text-white/60 mb-4">Use a glass or ceramic vessel. Measurement markings are helpful.</p>
                                <div className="p-4 rounded bg-yellow-500/10 border border-yellow-500/20 flex gap-3 text-sm text-yellow-200">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    Avoid metal containers for storage as ionic minerals may react with certain metals over long periods.
                                </div>
                            </div>
                        </div>

                        {/* Step B */}
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center text-2xl font-bold text-white/40">B</div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Inject Minerals</h3>
                                <p className="text-white/60 mb-4">Add the Andara Ionic solution. You will see a golden/amber cloud initially - this is the ferric iron sulfate dispersing.</p>
                            </div>
                        </div>

                        {/* Step C */}
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center text-2xl font-bold text-white/40">C</div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Agitate (Vortex)</h3>
                                <p className="text-white/60 mb-4">Stir vigorously to create a vortex. This ensures rapid "Charge Contact" (Stage 1) with all water molecules.</p>
                            </div>
                        </div>

                        {/* Step D */}
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center text-2xl font-bold text-white/40">D</div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Rest & Clear</h3>
                                <p className="text-white/60 mb-4">Allow to sit undisturbed. Sediment may form at the bottom - this is trapped impurities. Pour off the clear top water (decant) for consumption.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LINKS */}
            <section className="py-20 bg-[#020617] border-t border-white/5">
                <div className="container px-4 text-center">
                    <h2 className="text-2xl font-display text-white mb-8">Related Resources</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/getting-started-first-7-days">
                            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                                First 7 Days Protocol
                            </Button>
                        </Link>
                        <Link href="/trust/water-clarification-lab">
                            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                                See Visual Evidence
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

        </StandardPageLayout>
    );
}
