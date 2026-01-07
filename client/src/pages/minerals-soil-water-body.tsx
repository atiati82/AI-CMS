import React from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { StackedCard } from "@/components/visuals/StackedCard";
import { FadeIn } from "@/components/animations";
import {
    Layers,
    Atom,
    Droplets,
    Mountain,
    Beaker,
    TrendingUp,
    ShieldAlert,
    ArrowRight,
    HelpCircle
} from "lucide-react";

export default function BlackMicaSulfatedMineralsPage() {
    // Scrollytelling Layers - The Core Concepts
    const layers = [
        {
            title: "Black Mica",
            subtitle: "The Sheet Mineral",
            desc: "Biotite (black mica) is a phyllosilicate. Its power lies in its layers—creating vast surface area for interface interactions.",
            link: "#black-mica",
            image: "/bioelectric-bg.png",
            color: "orange",
            Icon: Layers
        },
        {
            title: "Sulphate Minerals",
            subtitle: "The Ionic Geometry",
            desc: "Minerals built around the SO₄ tetrahedron. This stable geometry shapes solubility and ionic behavior in water.",
            link: "/tetrahedral-sulfate-geometry",
            image: "/proton-gradient-bg.png",
            color: "yellow",
            Icon: Atom
        },
        {
            title: "Water Interaction",
            subtitle: "Interface vs Solution",
            desc: "Some effects happen because minerals dissolve (Ions). Others happen because water organizes on the surface (Interfaces).",
            link: "/hydration-layers-interfaces",
            image: "/ion-channels-bg.png",
            color: "cyan",
            Icon: Droplets
        },
        {
            title: "Geologic Origin",
            subtitle: "Source Matters",
            desc: "Igneous origins (granites), volcanic heat, and hydrothermal vents create these mineral profiles.",
            link: "#origin",
            image: "/cell-membrane-bg.png",
            color: "red",
            Icon: Mountain
        }
    ];

    return (
        <StandardPageLayout
            title={<>Black Mica & <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-400">Sulphate Minerals</span></>}
            subtitle="The dark, mineral-rich layers of earth capable of holding and structuring charges."
            
            heroVariant="amber"
            heroIcon={Layers}
            badges={[{ text: "Geologic Origin Series", icon: Mountain }]}
            seoTitle="Black Mica & Sulphate Minerals: Geologic Origin, Surface Effects, and Water Chemistry"
            seoDescription="Black mica (biotite) is a layered mineral with iron–magnesium chemistry and strong surface/interface behavior. Learn how these mineral classes form and interact with water."
            relatedLinks={[
                { title: "Sulfate Chemistry", url: "/sulfate-chemistry", type: "internal" },
                { title: "Ionic vs Colloidal", url: "/ionic-vs-colloidal-vs-solid", type: "internal" }
            ]}
        >
            {/* DEFINITION SECTION */}
            <section className="relative z-10 py-24 bg-[#020617]">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8 mb-12">
                            <p className="text-white/80 leading-relaxed text-2xl font-display mb-6">
                                "Black mica is an interface mineral. Sulphate minerals are an ionic-geometry family."
                            </p>
                            <p className="text-white/60 text-lg">
                                Together, they highlight how <strong>origin</strong> + <strong>structure</strong> shape interactions with water.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3">
                            <Layers className="w-5 h-5 text-orange-400" />
                            <div className="text-left">
                                <span className="block text-white font-bold text-sm">Mica</span>
                                <span className="block text-white/40 text-xs">Layered Structure</span>
                            </div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3">
                            <Atom className="w-5 h-5 text-yellow-400" />
                            <div className="text-left">
                                <span className="block text-white font-bold text-sm">Sulphate (SO₄)</span>
                                <span className="block text-white/40 text-xs">Tetrahedral Geometry</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SCROLLYTELLING - CORE CONCEPTS */}
            <section className="relative z-10 w-full bg-[#020617] pb-32">
                <div className="container px-4 mx-auto">
                    <div className="relative py-20 text-center z-20 pointer-events-none">
                        <h2 className="text-3xl font-display text-white mb-4">The Mineral Logic</h2>
                        <p className="text-white/50 max-w-xl mx-auto">
                            Understanding the framework behind the names.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        {layers.map((layer, i) => (
                            <StackedCard key={i} index={i} total={layers.length} {...layer} />
                        ))}
                    </div>
                </div>
            </section>

            {/* INTERACTION LAYERS: DISSOLUTION VS SURFACE */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-6xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-16 text-center">Two Ways to Interact</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Dissolution */}
                        <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Beaker className="w-24 h-24 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <Beaker className="w-5 h-5 text-blue-400" /> Ionic Layer (Dissolution)
                            </h3>
                            <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">Conductivity Context</p>
                            <p className="text-white/70 mb-6 leading-relaxed">
                                If minerals dissolve, they contribute ions to the carrier environment. This affects <strong>EC/TDS</strong> and changes the chemical composition of the water.
                            </p>
                            <ul className="space-y-2">
                                <li className="text-xs text-white/50 flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Increases Conductivity</li>
                                <li className="text-xs text-white/50 flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full" /> Provides Electrolytes</li>
                            </ul>
                        </div>

                        {/* Surface Effects */}
                        <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Layers className="w-24 h-24 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <Layers className="w-5 h-5 text-cyan-400" /> Interface Layer (Surfaces)
                            </h3>
                            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">Structure Context</p>
                            <p className="text-white/70 mb-6 leading-relaxed">
                                Even without dissolving, mineral surfaces (like mica sheets) create boundaries. Water organizes here. This influences <strong>hydration</strong> and adsorption.
                            </p>
                            <ul className="space-y-2">
                                <li className="text-xs text-white/50 flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500 rounded-full" /> Adsorption Sites</li>
                                <li className="text-xs text-white/50 flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500 rounded-full" /> Hydration Shells</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ORIGIN & IRON-SULFUR */}
            <section className="py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <FadeIn>
                            <div>
                                <h2 className="text-2xl font-display text-white mb-6">Why Link Iron & Sulfur?</h2>
                                <p className="text-white/60 mb-6 leading-relaxed">
                                    People link black mica and sulphate minerals because they often share geologic origins (volcanic/hydrothermal) and chemistry (Iron + Sulphate).
                                </p>
                                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                                    <h4 className="font-bold text-white mb-2 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-purple-400" /> Redox Context</h4>
                                    <p className="text-sm text-white/60">
                                        Iron chemistry often drives "redox" (electron movement). Sulphate geometry provides the stable partner. Together, they create a specific type of energetic environment.
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn>
                            <div>
                                <h2 className="text-2xl font-display text-white mb-6">Source Integrity</h2>
                                <p className="text-white/60 mb-6 leading-relaxed">
                                    Not all "black mica" is safe. Origin determines contaminants.
                                </p>
                                <div className="p-6 bg-red-500/5 rounded-xl border border-red-500/10">
                                    <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> The Ionic Firewall</h4>
                                    <p className="text-sm text-white/60">
                                        Mineral origin determines both potential value and potential risk. We educate on boundaries: source verification, testing, and understanding toxicity limits.
                                    </p>
                                    <Link href="/trust/faq-safety-quality" className="text-xs font-bold text-red-400 hover:text-white mt-4 block transition-colors">
                                        Read Toxicity Boundaries &rarr;
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Common Questions</h2>
                    <div className="space-y-6">
                        <div className="border-b border-white/10 pb-6">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                What is black mica?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed">Black mica commonly refers to biotite, a layered sheet mineral (phyllosilicate) rich in iron and magnesium that expresses strong surface/interface behavior.</p>
                        </div>
                        <div className="border-b border-white/10 pb-6">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                What are sulphate minerals?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed">Sulphate minerals are minerals built around the sulphate ion (SO4^2−), a tetrahedral geometry unit that pairs with many different cations.</p>
                        </div>
                        <div className="border-b border-white/10 pb-6">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                Is sulfated minerals the same as sulphate minerals?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed">In most casual usage, yes—people mean minerals that contain sulphate groups. The precise category is sulphate minerals.</p>
                        </div>
                        <div className="border-b border-white/10 pb-6">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                Do these minerals change water by dissolving?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed">Sometimes minerals dissolve and contribute ions (ionic mineral layer). But many mineral interactions happen at surfaces and interfaces without major dissolution (interface layer).</p>
                        </div>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
