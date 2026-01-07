import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { ScrollProgress } from "@/components/plugins/ScrollProgress";
import { Link } from "wouter";
import {
    Microscope,
    Sprout,
    ShieldCheck,
    FlaskConical,
    Activity,
    Droplets
} from "lucide-react";

export default function MineralsAndMicrobiomePage() {
    return (
        <StandardPageLayout
            title={<>Minerals & <span className="text-emerald-400">Microbiome</span></>}
            subtitle={<>The Mineral Roots of Gut Health.<br /><span className="text-emerald-400/80">Your gut is an inner soil. Re-mineralize the terrain.</span></>}
            
            heroVariant="emerald"
            heroIcon={Sprout}
            badges={[{ text: "Ecology & Terrain", icon: Sprout }]}
            seoTitle="Minerals & Microbiome: The Foundation of Gut Health"
            seoDescription="Learn how minerals act as architects for the microbiome, influencing enzyme function, fermentation, and the structural integrity of the gut terrain."
        >
            <ScrollProgress />

            {/* INTRO SECTION */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-display text-white mb-8">The Forgotten Architect</h2>
                    <p className="text-slate-300 leading-relaxed mb-12 max-w-2xl mx-auto">
                        Before the world fell in love with probiotics, life quietly ran on minerals. The microbiome is not only "good bacteria". It is an ecosystem built on mineral availability, redox balance, and structured interfaces.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-6">
                        <div className="p-6 bg-[#0b1020] rounded-xl border border-white/5 flex items-center gap-4">
                            <Microscope className="w-8 h-8 text-emerald-400" />
                            <div className="text-left">
                                <h3 className="text-white font-bold">Enzymes</h3>
                                <p className="text-slate-400 text-xs">Need Mg²⁺, Zn²⁺, Fe²⁺/³⁺</p>
                            </div>
                        </div>
                        <div className="p-6 bg-[#0b1020] rounded-xl border border-white/5 flex items-center gap-4">
                            <ShieldCheck className="w-8 h-8 text-emerald-400" />
                            <div className="text-left">
                                <h3 className="text-white font-bold">Mucosa</h3>
                                <p className="text-slate-400 text-xs">Needs Sulfate & Structure</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6.1 MINERALS AS ARCHITECTS */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <h2 className="text-3xl font-display text-white mb-6">Minerals as Ecosystem Architects</h2>
                        <div className="prose prose-invert text-slate-300">
                            <p>
                                If minerals are missing or imbalanced, enzymes slow down, fermentation pathways distort, and metabolite profiles shift.
                            </p>
                            <p>
                                This is not about treating a disease; it’s about <strong>ecosystem tone</strong>.
                            </p>
                            <ul className="space-y-4 mt-6">
                                <li className="flex gap-4">
                                    <Sprout className="w-5 h-5 text-emerald-400 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-white text-sm">Fermentation</h4>
                                        <p className="text-xs text-slate-400">Microbes need ion cofactors to process fibers into short-chain fatty acids.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <Activity className="w-5 h-5 text-emerald-400 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-white text-sm">Resilience</h4>
                                        <p className="text-xs text-slate-400">Balanced minerals support consistent anaerobic niches.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="relative isolate">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/20 blur-3xl rounded-full" />
                            <FlaskConical className="w-48 h-48 text-slate-700/50 relative z-10" />
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <span className="text-emerald-400 font-bold text-lg bg-[#0b1020]/80 px-4 py-2 rounded-full border border-emerald-500/20 backdrop-blur-md">
                                    Co-Factors
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6.3 SULFATE & MUCOUS */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="bg-[#0b1020] p-8 md:p-12 rounded-2xl border border-emerald-500/20">
                        <h2 className="text-2xl font-display text-white mb-6 flex items-center gap-3">
                            <ShieldCheck className="w-6 h-6 text-emerald-400" />
                            Sulfate & The Gut Shield
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="text-slate-300 space-y-4">
                                <p>
                                    Sulfate is a key part of mucous structures (mucin), modulating hydration and redox at the gut wall.
                                </p>
                                <p>
                                    A well-supported sulfate environment helps maintain better interface quality, cushioning the gut lining and supporting the microbes that live there.
                                </p>
                            </div>
                            <div className="bg-black/40 p-6 rounded-xl border border-white/5 flex flex-col justify-center">
                                <p className="text-sm text-slate-400 italic text-center">
                                    "Better interface quality = Clearer signal environment."
                                </p>
                                <Link href="/science/sulfate-pathways-water-body" className="mt-4 text-xs text-center text-emerald-400 hover:text-white transition-colors underline decoration-emerald-500/30 underline-offset-4">
                                    Read more on Sulfate Pathways &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6.4 DEEP SEA MINERALS */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <Droplets className="w-12 h-12 text-blue-400 mx-auto mb-6" />
                    <h2 className="text-2xl font-display text-white mb-6">Deep Ocean Minerals</h2>
                    <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                        When water carries a coherent spectrum of minerals (like deep-sea sources), the gut ecosystem often becomes more resilient. Studies suggest shifts toward beneficial metabolites and reduced irritation markers.
                    </p>
                </div>
            </section>

            {/* 6.5 SUMMARY */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-display text-white mb-6">Terrain + Logic</h2>
                    <p className="text-slate-300 mb-8">
                        This page reframes gut health as terrain + mineral logic. It prepares readers to see microbiome discussions as part of a larger mineral and bioelectric system.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/concepts/terrain-model-overview" className="p-4 rounded-xl border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-left group">
                            <span className="block text-xs text-slate-500 mb-1 group-hover:text-emerald-400">Next Pillar</span>
                            <span className="block text-white font-bold">Terrain Concepts &rarr;</span>
                        </Link>
                        <Link href="/science/dna-mineral-codes" className="p-4 rounded-xl border border-white/10 hover:border-white/30 transition-all text-left">
                            <span className="block text-xs text-slate-500 mb-1">Previous Pillar</span>
                            <span className="block text-white font-bold">&larr; DNA & Mineral Codes</span>
                        </Link>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
