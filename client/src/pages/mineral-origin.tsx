
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SmartVideoEmbed, VideoBackground } from "@/components/SmartVideoEmbed";

export default function TrustMineralOriginPage() {
    useScrollTop();

    return (
        <StandardPageLayout
            title="Mineral Origin & Geological Story"
            subtitle="The Volcanic Roots of Andara Ionic"
            backgroundElement={<VideoBackground keywords={["primordial", "volcanic", "earth", "origin", "magma"]} overlayOpacity={0.3} />}
            vibeKeywords={['Primordial', 'Volcanic', 'Trace Elements']}
            seoTitle="Mineral Origin & Geological Story – The Volcanic Roots of Andara Ionic"
            seoDescription="Explore the geological story behind Andara Ionic: from deep-crust volcanic minerals and ionic sulfate formation to modern water clarification. Clear, non-medical, terrain-focused."
            seoKeywords={["Andara Ionic mineral origin", "volcanic mineral source", "geological story", "ionic sulfate minerals", "primordial mineral complex", "deep crust minerals", "water clarification minerals"]}
        >
            <div className="container mx-auto px-4 py-12 space-y-16">

                {/* Intro */}
                <section className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl text-emerald-400 font-light">A Story in the Earth's Crust</h2>
                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                        Before Andara Ionic is a bottle on a shelf, it is a geological event. It begins with primordial volcanic rocks—heated, compressed, and rich in the sulfate-forming elements that define our clarification power.
                    </p>
                </section>

                {/* Geological Lineage */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl text-white">Volcanic & Deep Crust Origins</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            The base complex originates from dark, layered silicate rocks typical of deep volcanic-metamorphic environments.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <Badge variant="outline" className="mt-1 border-red-500/30 text-red-400">Heat & Pressure</Badge>
                                <span className="text-slate-400 text-sm">Rocks altered by geological forces to create a dense elemental library.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Badge variant="outline" className="mt-1 border-amber-500/30 text-amber-400">Silicate Matrix</Badge>
                                <span className="text-slate-400 text-sm">Rich in Iron, Magnesium, Aluminum, and Potassium in a structured lattice.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Badge variant="outline" className="mt-1 border-blue-500/30 text-blue-400">Primordial</Badge>
                                <span className="text-slate-400 text-sm">Not extensive topsoil, but deep mineral seams.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="h-64 rounded-2xl overflow-hidden border border-slate-800 relative group">
                        <SmartVideoEmbed
                            keywords={['volcanic', 'mica', 'origin']}
                            className="h-full w-full"
                            caption="The volcanic crucible of deep-earth mineral formation."
                        />
                    </div>
                </section>

                {/* Formation of Ionic Sulfates */}
                <section className="bg-slate-900 rounded-3xl p-8 border border-slate-800 space-y-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl text-white mb-4">Why Sulfates?</h2>
                        <p className="text-slate-400 text-sm">
                            Sulfur isn't an extra ingredient; it's central to the rock's chemistry. Under the right conditions, sulfur-bearing minerals oxidize into soluble sulfates, creating the "ionic metal sulfate" complex that gives Andara its clarification power.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        <div className="p-4 bg-black/20 rounded-xl border border-slate-800">
                            <h3 className="text-yellow-200/80 mb-2">Sulfur</h3>
                            <p className="text-slate-500 text-xs">The key transformer.</p>
                        </div>
                        <div className="p-4 bg-black/20 rounded-xl border border-slate-800">
                            <h3 className="text-slate-300 mb-2">+ Metals</h3>
                            <p className="text-slate-500 text-xs">Fe, Al, Mg, Zn...</p>
                        </div>
                        <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/30">
                            <h3 className="text-emerald-400 mb-2">= Ionic Sulfates</h3>
                            <p className="text-emerald-400/70 text-xs">Soluble, Active, Clarifying.</p>
                        </div>
                    </div>
                </section>

                {/* Extraction Process */}
                <section className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-2xl text-white">From Rock to Concentrate</h2>
                        <p className="text-slate-400 mt-2 text-sm">Unlocking the ionic fraction without creating a synthetic salt.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card className="p-4 bg-slate-900 border-slate-800 relative">
                            <span className="absolute top-2 right-3 text-slate-700 font-bold text-4xl opacity-20">1</span>
                            <h3 className="text-white font-medium mb-2">Prepare</h3>
                            <p className="text-slate-500 text-xs">Rock is crushed and exposed to controlled conditions.</p>
                        </Card>
                        <Card className="p-4 bg-slate-900 border-slate-800 relative">
                            <span className="absolute top-2 right-3 text-slate-700 font-bold text-4xl opacity-20">2</span>
                            <h3 className="text-white font-medium mb-2">Activate</h3>
                            <p className="text-slate-500 text-xs">Water and chemistry guide the formation of liquid metal sulfates.</p>
                        </Card>
                        <Card className="p-4 bg-slate-900 border-slate-800 relative">
                            <span className="absolute top-2 right-3 text-slate-700 font-bold text-4xl opacity-20">3</span>
                            <h3 className="text-white font-medium mb-2">Separate</h3>
                            <p className="text-slate-500 text-xs">Insoluble rock remains are removed, leaving a dense mineral liquid.</p>
                        </Card>
                        <Card className="p-4 bg-emerald-950/10 border-emerald-500/20 relative border">
                            <span className="absolute top-2 right-3 text-emerald-800 font-bold text-4xl opacity-20">4</span>
                            <h3 className="text-emerald-300 font-medium mb-2">Refine</h3>
                            <p className="text-emerald-400/60 text-xs">Filtered and stabilized into the golden master concentrate.</p>
                        </Card>
                    </div>
                </section>

                {/* Why it Matters */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 h-full bg-slate-900/50 rounded-2xl border border-slate-800 p-8 flex flex-col justify-center text-center space-y-4">
                        <h3 className="text-lg text-white">Complex vs. Simple</h3>
                        <p className="text-slate-400 text-xs">
                            Single synthetic salts (like pure Alum) lack the trace element constellation of a volcanic complex. Our "messy" geological profile is exactly why it works broadly on water structure and terrain.
                        </p>
                    </div>

                    <div className="order-1 md:order-2 space-y-6">
                        <h2 className="text-2xl text-white">Why This Lineage Matters</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Sulfate-based flocculation is a proven water treatment method. But the geological origin provides a multi-element coagulant—not just a single chemical.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><span className="text-emerald-500">•</span> <strong>Flocculation:</strong> Binds suspended particles.</li>
                            <li><span className="text-emerald-500">•</span> <strong>Charge Balance:</strong> Neutralizes electrical noise in water.</li>
                            <li><span className="text-emerald-500">•</span> <strong>Trace Spectrum:</strong> Adds Manganese, Zinc, Boron, etc.</li>
                        </ul>
                    </div>
                </section>

                <Separator className="bg-slate-800" />

                {/* Transparency Note */}
                <section className="text-center space-y-4 max-w-2xl mx-auto">
                    <Badge variant="outline" className="border-slate-700 text-slate-500 mb-2">Transparency</Badge>
                    <h2 className="text-xl text-white">Our Brand Promise</h2>
                    <p className="text-sm text-slate-400">
                        We acknowledge the long history of this mineral class in global research. For Andara, we focus on the clear water clarification use case, ensuring you get the authentic primordial complex without sensational health claims.
                    </p>
                </section>

                {/* Footer */}
                <div className="text-center text-xs text-slate-600 pt-8 border-t border-slate-800">
                    The story of Andara begins in the volcano, but it ends in your glass—clear, structured, and ready to drink.
                </div>

            </div>
        </StandardPageLayout>
    );
}
