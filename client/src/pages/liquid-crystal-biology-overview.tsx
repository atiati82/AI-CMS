import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { ScrollProgress } from "@/components/plugins/ScrollProgress";
import { Link } from "wouter";
import {
    ScanEye,
    Grid,
    Waves,
    RadioReceiver,
    Smartphone,
    Layers,
    Sparkles
} from "lucide-react";

export default function LiquidCrystalBiologyPage() {
    return (
        <StandardPageLayout
            title={<>Liquid Crystal <span className="text-cyan-400">Biology</span></>}
            subtitle={<>The Body as a Soft Crystal.<br /><span className="text-cyan-400/80">Living tissues are not solid or liquid. They are liquid crystals.</span></>}
            
            heroVariant="cyan"
            heroIcon={Sparkles}
            badges={[{ text: "Biophysics & Structure", icon: Sparkles }]}
            seoTitle="Liquid Crystal Biology: The Body as a Soft Crystal Device"
            seoDescription="Explore the emerging scientific model of the body as a liquid crystal: a state of matter that is fluid yet ordered, capable of guiding electricity and storing information."
        >
            <ScrollProgress />

            {/* INTRO SECTION */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-display text-white mb-8">Beyond the "Bag of Chemicals"</h2>
                    <p className="text-slate-300 leading-relaxed mb-12 max-w-2xl mx-auto">
                        The old model saw the body as a bag of fluids and chemicals. The emerging model is closer to a liquid crystal device – soft, flexible, but still ordered enough to guide electricity, store information, and respond to fields.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-6">
                        <div className="p-6 bg-[#0b1020] rounded-xl border border-white/5 flex items-center gap-4">
                            <Smartphone className="w-8 h-8 text-cyan-400" />
                            <div className="text-left">
                                <h3 className="text-white font-bold">Like a Screen</h3>
                                <p className="text-slate-400 text-xs text-nowrap">We use liquid crystals to<br />control light & data.</p>
                            </div>
                        </div>
                        <div className="p-6 bg-[#0b1020] rounded-xl border border-white/5 flex items-center gap-4">
                            <ScanEye className="w-8 h-8 text-cyan-400" />
                            <div className="text-left">
                                <h3 className="text-white font-bold">Like a Body</h3>
                                <p className="text-slate-400 text-xs text-nowrap">We use order to<br />guide biological signals.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4.1 WHAT IS IT? */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-display text-white mb-6">What is a Liquid Crystal?</h2>
                            <div className="prose prose-invert text-slate-300">
                                <p>
                                    A liquid crystal is a state of matter between solid and liquid. Molecules can flow like a liquid, but they retain directional order like a crystal.
                                </p>
                                <p>
                                    In biology, water, lipids, membranes, collagen, and the cytoskeleton can all show liquid crystalline behavior. This means cells are not random soup; they are organized phase systems.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full" />
                            <div className="relative bg-[#0b1020]/80 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Waves className="w-6 h-6 text-slate-400" />
                                        <span className="text-slate-300">Fluidity (Flow)</span>
                                    </div>
                                    <div className="h-px bg-white/10" />
                                    <div className="flex items-center gap-4">
                                        <Grid className="w-6 h-6 text-cyan-400" />
                                        <span className="text-white font-bold">Order (Crystal)</span>
                                    </div>
                                    <div className="h-px bg-white/10" />
                                    <div className="text-center pt-2 text-cyan-400 font-bold">
                                        = Liquid Crystal
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4.2 TISSUES */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Tissues as Crystals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-xl bg-gradient-to-br from-[#0b1020] to-[#020617] border border-white/5">
                            <Layers className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-white font-bold text-lg mb-2">Cell Membranes</h3>
                            <p className="text-slate-400 text-sm">Ordered lipid bilayers that maintain charge separation.</p>
                        </div>
                        <div className="p-6 rounded-xl bg-gradient-to-br from-[#0b1020] to-[#020617] border border-white/5">
                            <Grid className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-white font-bold text-lg mb-2">Collagen</h3>
                            <p className="text-slate-400 text-sm">Triple helices arranged in fibers and matrices.</p>
                        </div>
                        <div className="p-6 rounded-xl bg-gradient-to-br from-[#0b1020] to-[#020617] border border-white/5">
                            <Waves className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-white font-bold text-lg mb-2">Structure Water</h3>
                            <p className="text-slate-400 text-sm">Water structured at interfaces (EZ water).</p>
                        </div>
                        <div className="p-6 rounded-xl bg-gradient-to-br from-[#0b1020] to-[#020617] border border-white/5">
                            <RadioReceiver className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-white font-bold text-lg mb-2">Field Sensitivity</h3>
                            <p className="text-slate-400 text-sm">Responding to electromagnetic and mechanical cues.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4.3 WHY IT MATTERS */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-display text-white mb-6">Changing the Question</h2>
                    <p className="text-slate-300 italic text-lg mb-8">
                        It shifts the question from <br />
                        <span className="text-slate-500 line-through">"What does this molecule do?"</span> <br />
                        to <br />
                        <span className="text-cyan-400 font-bold">"What pattern does this molecule help stabilize in the crystal-like body?"</span>
                    </p>
                    <p className="text-slate-400">
                        This model helps us see ourselves as structured, resonant beings. Water and minerals tune this instrument.
                    </p>
                </div>
            </section>

            {/* 4.4 SUMMARY */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-display text-white mb-6">The Living Crystal</h2>
                    <p className="text-slate-300 mb-8">
                        The Liquid Crystal Biology pillar acts as a bridge between water science, crystalline matrix, and bioelectricity.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/science/dna-mineral-codes" className="p-4 rounded-xl border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-left group">
                            <span className="block text-xs text-slate-500 mb-1 group-hover:text-cyan-400">Next Pillar</span>
                            <span className="block text-white font-bold">DNA & Mineral Codes &rarr;</span>
                        </Link>
                        <Link href="/science/sulfate-pathways-water-body" className="p-4 rounded-xl border border-white/10 hover:border-white/30 transition-all text-left">
                            <span className="block text-xs text-slate-500 mb-1">Previous Pillar</span>
                            <span className="block text-white font-bold">&larr; Sulfate Pathways</span>
                        </Link>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
