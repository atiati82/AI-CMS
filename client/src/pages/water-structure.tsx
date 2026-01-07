import React, { useEffect } from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import {
    Droplets,
    Layers,
    Activity,
    Zap,
    Hexagon,
    ArrowRight,
    HelpCircle,
    ShieldCheck,
    CheckCircle2,
    XCircle,
    Search,
    Sun,
    Triangle
} from "lucide-react";

export default function StructuredWaterBasicsPage() {
    return (
        <StandardPageLayout
            title={<>Structured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">Water Basics</span></>}
            subtitle={<>Interfaces. Hydration Layers. Coherence.<br />What "Structure" Really Means.</>}
            heroVariant="cyan"
            heroIcon={Droplets}
            badges={[{ text: "Science Pillar", icon: Droplets }]}
            seoTitle={'Structured Water Basics — What "Water Structure" Means (Interfaces, Hydration Layers & Coherence)'}
            seoDescription={"Learn structured water basics in the Andara Science Library: what \"structure\" means, how interfaces and hydration layers create organization, how pH/ORP/conductivity act as context markers, and how to approach structured-water routines with coherent baseline methods. Education-first, claim-clean."}
        >
            {/* DEFINITION SECTION */}
            <section className="relative z-10 py-16 bg-[#020617]">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <div className="andara-glass-card p-10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
                        <h2 className="text-2xl font-bold text-white mb-6">The Definition</h2>
                        <p className="text-xl md:text-2xl text-purple-100 font-display leading-relaxed italic mb-8">
                            "Structured water = organized water behavior at interfaces."
                        </p>
                        <p className="text-white/60 mb-6 max-w-2xl mx-auto">
                            No interface, no structure narrative. Bulk water behaves differently than boundary water.
                        </p>
                        <Link href="/science/water-structure">
                            <button className="px-6 py-2 rounded-full border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-colors text-sm">
                                See Interfaces →
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* TWO LEVELS OF STRUCTURE */}
            <section className="py-20 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Two Levels of "Structure"</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Level A */}
                        <div className="andara-glass-panel p-8">
                            <div className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">Level A</div>
                            <h3 className="text-xl font-bold text-white mb-4">Molecular Properties</h3>
                            <p className="text-white/70 mb-4">Always present. Water is polar, interactive, and forms networks naturally.</p>
                            <div className="w-full h-px bg-white/10" />
                        </div>
                        {/* Level B */}
                        <div className="andara-glass-card p-8 border-l-4 border-l-cyan-500">
                            <div className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">Level B</div>
                            <h3 className="text-xl font-bold text-white mb-4">Interface Organization</h3>
                            <p className="text-white/70 mb-4">What people mean by "structured". At boundaries (glass, minerals, membranes), water forms ordered hydration layers that change local behavior.</p>
                            <div className="text-xs text-cyan-500 font-bold">Andara focuses here.</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY INTERFACES MATTER */}
            <section className="py-24 bg-[#020617] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-display text-white mb-6">The Hidden Architecture</h2>
                            <p className="text-white/70 mb-6 leading-relaxed">
                                Interfaces are where charge distributions form, gradients become stable, and ions organize differently than in bulk. This is the bridge between water chemistry and biology.
                            </p>
                            <div className="space-y-4">
                                <Link href="/science/bioelectricity-invisible-voltage">
                                    <div className="flex items-center gap-3 p-4 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                        <Activity className="w-5 h-5 text-yellow-400" />
                                        <div>
                                            <h4 className="text-white text-sm font-bold group-hover:text-yellow-200">Bioelectricity Limit</h4>
                                            <p className="text-white/40 text-xs">Voltage implies structure.</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-white/30 ml-auto group-hover:text-white" />
                                    </div>
                                </Link>
                                <Link href="/science/bioelectric-water">
                                    <div className="flex items-center gap-3 p-4 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                        <Zap className="w-5 h-5 text-blue-400" />
                                        <div>
                                            <h4 className="text-white text-sm font-bold group-hover:text-blue-200">Bioelectric Water</h4>
                                            <p className="text-white/40 text-xs">Hydration as voltage.</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-white/30 ml-auto group-hover:text-white" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="relative w-64 h-64">
                                {/* Abstract representation of layers */}
                                <div className="absolute inset-0 border border-white/10 rounded-full" />
                                <div className="absolute inset-4 border border-cyan-500/20 rounded-full" />
                                <div className="absolute inset-8 border border-cyan-500/40 rounded-full bg-cyan-500/5 backdrop-blur-sm" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Layers className="w-12 h-12 text-cyan-400 opacity-80" />
                                </div>
                                <div className="absolute -bottom-8 text-center w-full text-xs text-white/40">Hydration Layers ("Skin")</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE MARKER TRIANGLE */}
            <section className="py-20 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-display text-white mb-4">The Marker Triangle</h2>
                    <p className="text-white/60 mb-12">A single marker can mislead. A stable triangle reveals patterns.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        {/* Connecting lines for large screens usually done with SVG, simplified here with CSS/layout */}

                        <Link href="/ph-balance-water">
                            <div className="andara-glass-card p-6 h-full hover:bg-white/5 transition-all group">
                                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4 border border-purple-500/30 group-hover:scale-110 transition-transform">
                                    <span className="text-purple-400 font-bold">pH</span>
                                </div>
                                <h4 className="text-white font-bold mb-2">Proton Context</h4>
                                <p className="text-white/50 text-xs">Is it acidic or alkaline?</p>
                            </div>
                        </Link>

                        <Link href="/orp-redox-water">
                            <div className="andara-glass-card p-6 h-full hover:bg-white/5 transition-all group">
                                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4 border border-amber-500/30 group-hover:scale-110 transition-transform">
                                    <span className="text-amber-400 font-bold">ORP</span>
                                </div>
                                <h4 className="text-white font-bold mb-2">Redox Tendency</h4>
                                <p className="text-white/50 text-xs">Electron donor or stealer?</p>
                            </div>
                        </Link>

                        <Link href="/conductivity-tds-water">
                            <div className="andara-glass-card p-6 h-full hover:bg-white/5 transition-all group">
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4 border border-blue-500/30 group-hover:scale-110 transition-transform">
                                    <span className="text-blue-400 font-bold">EC</span>
                                </div>
                                <h4 className="text-white font-bold mb-2">Ion Density</h4>
                                <p className="text-white/50 text-xs">How many charge carriers?</p>
                            </div>
                        </Link>

                    </div>
                </div>
            </section>

            {/* CLARITY VS STRUCTURE VS PURITY */}
            <section className="py-20 bg-[#020617]">
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="andara-glass-panel p-8">
                        <h2 className="text-2xl font-display text-white mb-8 text-center">Clarity vs. Structure vs. Purity</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 rounded bg-white/5 border border-white/5">
                                <Search className="w-6 h-6 text-cyan-400 mt-1 shrink-0" />
                                <div>
                                    <h4 className="text-white font-bold">Clarity (Turbidity)</h4>
                                    <p className="text-white/60 text-sm">Visual suspended particles. <Link href="/science/turbidity-clarity-flocculation" className="text-cyan-400 hover:underline">See Turbidity →</Link></p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded bg-white/5 border border-white/5">
                                <Layers className="w-6 h-6 text-purple-400 mt-1 shrink-0" />
                                <div>
                                    <h4 className="text-white font-bold">Structure (Interface Organization)</h4>
                                    <p className="text-white/60 text-sm">Boundary behavior (hydration layers). This page's topic.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded bg-white/5 border border-white/5">
                                <ShieldCheck className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
                                <div>
                                    <h4 className="text-white font-bold">Purity (Quality Standards)</h4>
                                    <p className="text-white/60 text-sm">Contaminants and compliance. Andara keeps this educational and does not overpromise.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MINERALS & LIGHT */}
            <section className="py-20 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Hexagon className="w-5 h-5 text-blue-400" /> Structure & Minerals
                            </h3>
                            <p className="text-white/60 mb-4 text-sm">
                                Minerals act as interfaces (surfaces) and ions (charge carriers). They provide the pattern language for water to organize around.
                            </p>
                            <ul className="space-y-2 mb-6">
                                <li><Link href="/science/ionic-vs-colloidal-vs-solid" className="text-xs text-blue-400 hover:text-white transition-colors">• Ionic vs Colloidal vs Solid</Link></li>
                                <li><Link href="/sulfate-chemistry" className="text-xs text-blue-400 hover:text-white transition-colors">• Sulfate Chemistry</Link></li>
                                <li><Link href="/science/tetrahedral-sulfate-geometry" className="text-xs text-blue-400 hover:text-white transition-colors">• Tetrahedral Geometry</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Sun className="w-5 h-5 text-yellow-400" /> Structure & Light
                            </h3>
                            <p className="text-white/60 mb-4 text-sm">
                                Interfaces respond to energy input. Photonic context influences how water behaves at boundaries.
                            </p>
                            <ul className="space-y-2 mb-6">
                                <li><Link href="/science/light-sound-water" className="text-xs text-yellow-400 hover:text-white transition-colors">• Light & Water</Link></li>
                                <li><Link href="/science/light-sound-water" className="text-xs text-yellow-400 hover:text-white transition-colors">• Light Lattices</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            {/* HOW TO APPROACH */}
            <section className="py-24 bg-[#020617] relative">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-display text-white mb-12">How to Approach a Routine</h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-left">
                        <div className="flex-1 p-6 border border-white/5 rounded-lg bg-white/5">
                            <span className="text-xs font-bold text-white/40 block mb-2">Step 1</span>
                            <h4 className="font-bold text-white">Choose Baseline</h4>
                            <Link href="/natural-vs-treated-water" className="text-xs text-cyan-400 hover:underline">Select source →</Link>
                        </div>
                        <ArrowRight className="w-6 h-6 text-white/20 rotate-90 md:rotate-0" />
                        <div className="flex-1 p-6 border border-white/5 rounded-lg bg-white/5">
                            <span className="text-xs font-bold text-white/40 block mb-2">Step 2</span>
                            <h4 className="font-bold text-white">Consistent Mineral Context</h4>
                            <Link href="/andara-dilution-calculator" className="text-xs text-cyan-400 hover:underline">Use Calculator →</Link>
                        </div>
                        <ArrowRight className="w-6 h-6 text-white/20 rotate-90 md:rotate-0" />
                        <div className="flex-1 p-6 border border-white/5 rounded-lg bg-white/5">
                            <span className="text-xs font-bold text-white/40 block mb-2">Step 3</span>
                            <h4 className="font-bold text-white">Run 7-Day Window</h4>
                            <Link href="/getting-started-first-7-days" className="text-xs text-cyan-400 hover:underline">Start Protocol →</Link>
                        </div>
                    </div>
                </div>
            </section>


            {/* ANDARA IONIC FIT */}
            <section className="py-16 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <h3 className="text-lg font-bold text-white mb-4">Where Andara Fits</h3>
                    <p className="text-white/60 mb-6 font-light italic">
                        "Andara Ionic is not marketed as 'structured water in a bottle.' It is a consistent ionic mineral context layer used to support coherent water routines."
                    </p>
                    <Link href="/what-is-andara-ionic">
                        <button className="text-xs text-white/40 hover:text-white underline decoration-dashed">
                            Read Brand Definition
                        </button>
                    </Link>
                </div>
            </section>


            {/* FAQ */}
            <section className="py-20 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-display text-white mb-8 text-center">Common Questions</h2>
                    <div className="space-y-4">
                        {[
                            { name: "Is structured water scientifically accepted?", text: "There are different interpretations and debates. Andara uses structured water as an educational framework for interface behavior rather than a single claim." },
                            { name: "Is structured water the same as alkaline water?", text: "No. pH is one marker; structured water refers to organization at interfaces. They can overlap but are not the same." },
                            { name: "What should I read next?", text: "Read Hydration Layers & Interfaces, EZ Water Overview, and Bioelectric Water for deeper foundations." }
                        ].map((item, i) => (
                            <div key={i} className="andara-glass-panel p-6">
                                <h3 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4 text-white/30" /> {item.name}
                                </h3>
                                <p className="text-white/60 text-sm pl-6">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
