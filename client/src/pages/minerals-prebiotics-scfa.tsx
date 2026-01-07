import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { ScrollProgress } from "@/components/plugins/ScrollProgress";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { Link } from "wouter";
import {
    Atom,
    Layers,
    Cpu,
    Hexagon,
    Droplets,
    Activity,
    Zap,
    Mountain,
    ShieldAlert,
    HelpCircle,
    ArrowRight,
    Scale,
    FlaskConical,
    Waves,
    Leaf,
    Globe
} from "lucide-react";

export default function MineralScienceHubPage() {
    return (
        <StandardPageLayout
            title={<>Mineral Science <span className="text-amber-400">Blueprint</span></>}
            subtitle={<>The Elemental Alphabet of Matter.<br /><span className="text-amber-400/80">Water · Body · Soil.</span></>}
            registryId="type-sulfate"
            heroVariant="amber"
            heroIcon={Atom}
            badges={[{ text: "The Elemental Foundation", icon: Atom }]}
            seoTitle="Mineral Science: The Elemental Blueprint of Water, Body & Soil | Andara Ionic"
            seoDescription="Decode the mineral alphabet. Understand how ionic minerals, sulfates, and trace elements weave the connection between water structure, biological voltage, and soil health."
        >
            <ScrollProgress />

            {/* INTRO: THE ALPHABET */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-8">The Alphabet of Matter</h2>
                        <p className="text-slate-300 leading-relaxed mb-12 max-w-2xl mx-auto">
                            Before there were cells or humans, there were elements. Iron, Magnesium, Sulfur, Silica. Everything alive is built by arranging these elemental "letters" into complex forms. Mineral Science is the study of this interface: where physics (ions) meets biology (life).
                        </p>
                    </FadeIn>

                    {/* 3 MINERAL GROUPS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        <div className="p-6 bg-[#0b1020] rounded-xl border border-white/5 relative group">
                            <div className="absolute top-4 right-4 text-slate-700 font-bold text-4xl opacity-20">1</div>
                            <h3 className="text-white font-bold mb-2 text-lg">Macro Minerals</h3>
                            <p className="text-xs text-amber-500 font-mono mb-3">Ca, Mg, Na, K, P, S</p>
                            <p className="text-xs text-slate-400">The Builders. They shape structure (bones), balance fluids, and carry the primary electrical currents of the body.</p>
                        </div>
                        <div className="p-6 bg-[#0b1020] rounded-xl border border-white/5 relative group">
                            <div className="absolute top-4 right-4 text-slate-700 font-bold text-4xl opacity-20">2</div>
                            <h3 className="text-white font-bold mb-2 text-lg">Trace Minerals</h3>
                            <p className="text-xs text-cyan-500 font-mono mb-3">Zn, Cu, Mn, Se, Fe...</p>
                            <p className="text-xs text-slate-400">The Switches. Needed in tiny amounts to turn on enzymes, run detox pathways, and manage antioxidant systems.</p>
                        </div>
                        <div className="p-6 bg-[#0b1020] rounded-xl border border-white/5 relative group">
                            <div className="absolute top-4 right-4 text-slate-700 font-bold text-4xl opacity-20">3</div>
                            <h3 className="text-white font-bold mb-2 text-lg">Ultra-Trace</h3>
                            <p className="text-xs text-purple-500 font-mono mb-3">V, Sr, B, Li, La...</p>
                            <p className="text-xs text-slate-400">The Regulators. rare elements often missing from modern soil, involved in subtle catalytic coding.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FORM FACTOR: IONIC VS COLLOIDAL */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-display text-white mb-4">Why Form Matters</h2>
                        <p className="text-slate-400">The same element behaves differently depending on its state.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                        {/* Solid */}
                        <div className="p-8 rounded-2xl bg-[#0b1020] border border-white/5 opacity-60">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-6 mx-auto text-slate-500">
                                <Mountain className="w-6 h-6" />
                            </div>
                            <h3 className="text-center text-white font-bold mb-2">1. Solid / Rock</h3>
                            <p className="text-center text-xs text-slate-500 mb-4">Insoluble. Structural.</p>
                            <p className="text-center text-xs text-slate-600">
                                Important for geology, but biologically inert until dissolved.
                            </p>
                        </div>

                        {/* Colloidal */}
                        <div className="p-8 rounded-2xl bg-[#0b1020] border border-white/5 opacity-80">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-6 mx-auto text-slate-400">
                                <span className="text-xl font-bold">::</span>
                            </div>
                            <h3 className="text-center text-white font-bold mb-2">2. Colloidal</h3>
                            <p className="text-center text-xs text-slate-500 mb-4">Suspended Particles.</p>
                            <p className="text-center text-xs text-slate-500">
                                Tiny fragments floating in water. Useful sometimes, but cannot pass through ion channels.
                            </p>
                        </div>

                        {/* Ionic (Featured) */}
                        <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0b1020] to-indigo-950/20 border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.1)] transform md:-translate-y-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6 mx-auto text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-center text-white font-bold mb-2 text-xl">3. Ionic</h3>
                            <p className="text-center text-xs text-indigo-400 font-bold uppercase tracking-wider mb-4">The Universal Key</p>
                            <p className="text-center text-sm text-indigo-100/80 leading-relaxed">
                                Fully dissolved. Charged. Conductive. This is the form minerals take to conduct electricity, shape water structure, and enter cells.
                            </p>
                            <div className="mt-6 text-center">
                                <Link href="/science/ionic-vs-colloidal-vs-solid" className="text-indigo-400 text-xs font-bold hover:text-white transition-colors">Compare Forms &rarr;</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SULFATE: THE CONDUCTOR */}
            <section className="py-24 bg-[#05060b] relative z-10 border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 order-2 md:order-1">
                        <div className="p-3 inline-flex items-center gap-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                            <Hexagon className="w-4 h-4 text-yellow-500" />
                            <span className="text-xs font-bold text-yellow-500 uppercase tracking-wider">The Andara Key</span>
                        </div>
                        <h2 className="text-3xl font-display text-white mb-6">Sulfate: The Overlooked Conductor</h2>
                        <p className="text-slate-300 mb-4 leading-relaxed">
                            Among all minerals, Andara prioritizes <strong>Sulfates</strong> (SO₄²⁻). Why? Because sulfate is nature's bridge builder.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <span className="text-yellow-500 mt-1">✓</span>
                                <span><strong>Flocculation:</strong> Binds impurities into filterable clumps (Clarification).</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <span className="text-yellow-500 mt-1">✓</span>
                                <span><strong>Structure:</strong> Promotes EZ-water layering on surfaces.</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <span className="text-yellow-500 mt-1">✓</span>
                                <span><strong>Terrain:</strong> Essential for connective tissue and redox balance.</span>
                            </li>
                        </ul>
                        <div className="mt-8">
                            <Link href="/sulfate-chemistry" className="text-yellow-400 text-sm font-bold hover:text-white transition-colors">Read Sulfate Schematic &rarr;</Link>
                        </div>
                    </div>
                    <div className="flex-1 order-1 md:order-2 flex justify-center">
                        {/* Abstract Sulfate Visual */}
                        <div className="w-64 h-64 relative">
                            <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-3xl" />
                            <div className="absolute inset-0 border border-yellow-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="absolute inset-4 border border-yellow-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <span className="block text-4xl font-bold text-yellow-500">SO₄</span>
                                    <span className="block text-xs text-yellow-500/60 tracking-widest mt-1">TETRAHEDRAL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE TRIAD: WATER / BODY / SOIL */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-display text-white mb-6">The Liquid Blueprint</h2>
                        <p className="text-slate-400">It's the same intelligence, playing in three different layers.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* 1. Water */}
                        <div className="p-8 rounded-2xl bg-[#0b1020] border border-white/5 group hover:border-cyan-500/30 transition-colors">
                            <Droplets className="w-10 h-10 text-cyan-500 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-display text-white mb-4">In Water</h3>
                            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                                Minerals determine <strong>Conductivity</strong> and <strong>Structure</strong>. Without them, water is electrically dead. With them, it becomes a liquid crystal capable of carrying information.
                            </p>
                            <div className="p-4 bg-cyan-900/10 rounded-lg border border-cyan-500/10">
                                <span className="block text-xs text-cyan-400 font-bold uppercase tracking-wider mb-1">Key Function</span>
                                <span className="text-white text-sm">Charge Carrier</span>
                            </div>
                        </div>

                        {/* 2. Body */}
                        <div className="p-8 rounded-2xl bg-[#0b1020] border border-white/5 group hover:border-emerald-500/30 transition-colors">
                            <Activity className="w-10 h-10 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-display text-white mb-4">In Body</h3>
                            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                                Minerals act as <strong>Enzyme Keys</strong> and <strong>Voltage Wires</strong>. They build the terrain (bones, fascia) and allow the electrical nervous system to fire.
                            </p>
                            <div className="p-4 bg-emerald-900/10 rounded-lg border border-emerald-500/10">
                                <span className="block text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">Key Function</span>
                                <span className="text-white text-sm">Metabolic Switch</span>
                            </div>
                        </div>

                        {/* 3. Soil */}
                        <div className="p-8 rounded-2xl bg-[#0b1020] border border-white/5 group hover:border-amber-500/30 transition-colors">
                            <Leaf className="w-10 h-10 text-amber-500 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-display text-white mb-4">In Soil</h3>
                            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                                Minerals define fertility. A redox-balanced soil holds water better and feeds plants "intelligent" nutrients, which then pass to us.
                            </p>
                            <div className="p-4 bg-amber-900/10 rounded-lg border border-amber-500/10">
                                <span className="block text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">Key Function</span>
                                <span className="text-white text-sm">Root Intelligence</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ANDARA INTENTION */}
            <section className="py-24 bg-gradient-to-b from-[#020617] to-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <div className="w-12 h-12 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                        <Globe className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h2 className="text-3xl font-display text-white mb-6">The Andara Intention</h2>
                    <p className="text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
                        To re-introduce mineral intelligence into water. Not just as a supplement, but as a structural code that helps water behave like a living spring again.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/trust/comparison-other-mineral-products" className="block px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 hover:border-white/30 transition-all text-sm text-slate-300 hover:text-white">
                            Source Comparison
                        </Link>
                        <Link href="/science/minerals-microbiome-research-hub" className="block px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 hover:border-white/30 transition-all text-sm text-slate-300 hover:text-white">
                            Microbiome Connection
                        </Link>
                        <Link href="/science/bioelectricity-invisible-voltage" className="block px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 hover:border-white/30 transition-all text-sm text-slate-300 hover:text-white">
                            Bioelectricity
                        </Link>
                    </div>
                </div>
            </section>

        </StandardPageLayout>
    );
}
