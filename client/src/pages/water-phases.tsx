import React, { useEffect } from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import {
    Snowflake,
    Droplets,
    Cloud,
    Layers,
    ArrowRight,
    HelpCircle,
    FlaskConical,
    Thermometer,
    Gauge,
    Component,
    CheckCircle2,
    SplitSquareHorizontal
} from "lucide-react";
import { VideoBackground } from "@/components/SmartVideoEmbed";

export default function PhasesOfWaterPage() {
    // Background Phase Visuals
    const heroBackground = (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Ice Lattices (Left) */}
                <path d="M10,20 L15,10 L20,20 L15,30 Z" stroke="#cbd5e1" fill="none" strokeWidth="0.2" opacity="0.6" />
                <path d="M15,50 L20,40 L25,50 L20,60 Z" stroke="#cbd5e1" fill="none" strokeWidth="0.2" opacity="0.6" />

                {/* Vapor (Right) */}
                <circle cx="80" cy="30" r="2" fill="#fff" opacity="0.3" />
                <circle cx="85" cy="40" r="1.5" fill="#fff" opacity="0.2" />

                {/* Interface/Liquid (Center) */}
                <path d="M40,80 Q50,70 60,80" stroke="#38ffd1" strokeWidth="0.5" fill="none" />
                <path d="M40,85 Q50,75 60,85" stroke="#38ffd1" strokeWidth="0.5" fill="none" opacity="0.5" />
            </svg>
        </div>
    );

    return (
        <StandardPageLayout
            title={<>Phases of <span className="text-slate-300">Water</span></>}
            subtitle={<>Solid, Liquid, Vapor... and the Interface.<br /><span className="text-slate-400">Understanding the full spectrum of water behavior.</span></>}
            heroVariant="cyan"
            heroIcon={Snowflake}
            badges={[{ text: "State Dynamics", icon: Snowflake }]}
            backgroundElement={<VideoBackground keywords={["water", "ice", "vapor", "phases", "blue", "clean"]} overlayOpacity={0.3} />}
            seoTitle="Phases of Water: Solid, Liquid, Vapor & Structured Water Concepts"
            seoDescription="Learn the phases of water: ice, liquid, vapor, and structured/interface water concepts. Understand how temperature, pressure, interfaces, ions, and coherence shape water behavior."
        >
            {/* CLASSICAL PHASES SECTION */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-5xl mx-auto">
                    <h2 className="text-2xl font-display text-white mb-12 text-center">The Baseline Reality (Classical Phases)</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Solid */}
                        <div className="p-8 rounded-xl bg-[#0b1020] border border-white/5 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-slate-500/10 flex items-center justify-center text-slate-300 mb-6">
                                <Snowflake className="w-6 h-6" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Phase 1: Solid (Ice)</h3>
                            <p className="text-white/60 text-sm">Fixed lattice structure. Low mobility. The most "ordered" classical state.</p>
                        </div>

                        {/* Liquid */}
                        <div className="p-8 rounded-xl bg-[#0b1020] border border-white/5 flex flex-col items-center text-center relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#38ffd1] to-transparent opacity-50" />
                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
                                <Droplets className="w-6 h-6" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Phase 2: Liquid (Bulk)</h3>
                            <p className="text-white/60 text-sm">Dynamic fluidity. High mobility. Chaos dominates unless interfaces are present.</p>
                        </div>

                        {/* Vapor */}
                        <div className="p-8 rounded-xl bg-[#0b1020] border border-white/5 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-slate-500/10 flex items-center justify-center text-slate-300 mb-6">
                                <Cloud className="w-6 h-6" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Phase 3: Vapor (Gas)</h3>
                            <p className="text-white/60 text-sm">High energy. Molecules are far apart. Freedom of movement dominates.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE INTERFACE CONVERSATION */}
            <section className="py-24 bg-[#020617]">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full mb-6">
                        <Layers className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">The "Fourth Phase" Discussion</span>
                    </div>
                    <h2 className="text-3xl font-display text-white mb-8">Structured Water as Interface Behavior</h2>
                    <p className="text-white/70 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
                        Many researchers discuss a "fourth phase." Andara frames this functionally: <strong>Water organizes at interfaces.</strong>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="border-l-2 border-indigo-500 pl-6">
                            <h3 className="text-indigo-400 font-bold text-lg mb-2">Structured Water</h3>
                            <p className="text-white/60 text-sm mb-4">
                                When water meets a boundary, it can form organized layers. This is "structure," distinct from bulk liquid chaos.
                            </p>
                            <Link href="/structured-water-basics" className="text-xs text-white/40 hover:text-white flex items-center gap-1 group">
                                Basics <ArrowRight className="w-3 h-3 group-hover:text-indigo-400 transition-colors" />
                            </Link>
                        </div>

                        <div className="border-l-2 border-cyan-500 pl-6">
                            <h3 className="text-cyan-400 font-bold text-lg mb-2">EZ Water (Exclusion Zone)</h3>
                            <p className="text-white/60 text-sm mb-4">
                                A specific model of interface organization that often includes charge separation logic.
                            </p>
                            <Link href="/science/ez-water-overview" className="text-xs text-white/40 hover:text-white flex items-center gap-1 group">
                                EZ Overview <ArrowRight className="w-3 h-3 group-hover:text-cyan-400 transition-colors" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTROL VARIABLES */}
            <section className="py-24 bg-[#05060b]">
                <div className="container px-4 max-w-5xl mx-auto">
                    <h2 className="text-2xl font-display text-white mb-12 text-center">What Controls the Phase?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Variable A */}
                        <div className="p-6 rounded-xl bg-[#0b1020] border border-white/5 flex items-start gap-4">
                            <Thermometer className="w-6 h-6 text-slate-400 mt-1" />
                            <div>
                                <h3 className="text-white font-bold text-sm mb-1">Temperature</h3>
                                <p className="text-white/50 text-xs">Shifts molecular motion (Ice ↔ Liquid ↔ Vapor).</p>
                            </div>
                        </div>

                        {/* Variable B */}
                        <div className="p-6 rounded-xl bg-[#0b1020] border border-white/5 flex items-start gap-4">
                            <Gauge className="w-6 h-6 text-slate-400 mt-1" />
                            <div>
                                <h3 className="text-white font-bold text-sm mb-1">Pressure</h3>
                                <p className="text-white/50 text-xs">Shifts phase boundaries. Important for deep-ocean models.</p>
                            </div>
                        </div>

                        {/* Variable C */}
                        <div className="p-6 rounded-xl bg-[#0b1020] border border-white/5 flex items-start gap-4">
                            <Component className="w-6 h-6 text-slate-400 mt-1" />
                            <div>
                                <h3 className="text-white font-bold text-sm mb-1">Solutes (Ions)</h3>
                                <p className="text-white/50 text-xs">Dissolved ions change freezing/boiling points and interface behavior.</p>
                            </div>
                        </div>

                        {/* Variable D */}
                        <div className="p-6 rounded-xl bg-[#0b1020] border border-white/5 flex items-start gap-4">
                            <SplitSquareHorizontal className="w-6 h-6 text-indigo-400 mt-1" />
                            <div>
                                <h3 className="text-white font-bold text-sm mb-1">Interfaces</h3>
                                <p className="text-white/50 text-xs">Boundaries create hydration layers (the "structured phase").</p>
                            </div>
                        </div>

                        {/* Variable E */}
                        <div className="p-6 rounded-xl bg-[#0b1020] border border-white/5 flex items-start gap-4">
                            <CheckCircle2 className="w-6 h-6 text-cyan-400 mt-1" />
                            <div>
                                <h3 className="text-white font-bold text-sm mb-1">Coherence</h3>
                                <p className="text-white/50 text-xs">Stability over time makes patterns readable.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ANDARA BRIDGE */}
            <section className="py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-3xl font-display text-white mb-6">Minerals & Phase Context</h2>
                        <p className="text-white/60 mb-6">
                            Andara Ionic acts as a <span className="text-slate-300">mineral context layer</span>. Consistent ion presence supports stable hydration shells, helping regular liquid water maintain better interface coherence.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/what-is-andara-ionic" className="px-5 py-2.5 bg-white/10 rounded-lg text-white text-sm font-bold hover:bg-white/20 transition-colors">
                                What Is Andara?
                            </Link>
                            <Link href="/andara-dilution-calculator" className="px-5 py-2.5 border border-white/10 rounded-lg text-white text-sm font-bold hover:border-white/30 transition-colors flex items-center gap-2">
                                <FlaskConical className="w-4 h-4" /> Dosing Calc
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 bg-[#0b1020] p-8 rounded-2xl border border-white/5">
                        <h3 className="text-white font-bold mb-4">Summary Map</h3>
                        <ul className="text-left space-y-3 text-sm text-white/70 mb-6 font-mono">
                            <li className="flex gap-3"><span className="text-slate-500">A.</span> Solid/Liquid/Vapor = Bulk</li>
                            <li className="flex gap-3"><span className="text-indigo-400">B.</span> Structured/Interface = Boundary</li>
                            <li className="flex gap-3"><span className="text-cyan-400">C.</span> Ions = Context</li>
                            <li className="flex gap-3"><span className="text-white">D.</span> Coherence = Stability</li>
                        </ul>
                        <Link href="/natural-vs-treated-water" className="text-xs font-bold text-indigo-400 hover:text-white underline decoration-dashed">
                            Compare Water Sources
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#05060b]">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Phases FAQ</h2>
                    <div className="space-y-6">
                        {[
                            { name: "Are there really 4 phases of water?", text: "Classically, water is taught as solid/liquid/gas. Many structured-water models discuss additional interface-organized behavior that differs from bulk liquid." },
                            { name: "Is structured water a separate phase?", text: "Andara treats structured water primarily as interface behavior—organized boundary layers—rather than relying on a single universal phase label." },
                            { name: "Where should I read next?", text: "Read Natural vs Treated Water for source comparisons and Water Case Studies for global examples that build baseline literacy." }
                        ].map((item, i) => (
                            <div key={i} className="border-b border-white/10 pb-6">
                                <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                    <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                    {item.name}
                                </h3>
                                <p className="text-white/60 pl-8 leading-relaxed text-sm">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
