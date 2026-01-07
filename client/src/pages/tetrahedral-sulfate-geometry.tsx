import React from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout"; // Refactored to StandardPageLayout
import { StackedCard } from "@/components/visuals/StackedCard";
import {
    Atom,
    Droplets,
    Network,
    Scale,
    ArrowRight,
    HelpCircle,
    Triangle,
    Component
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense, lazy } from "react";

const MoleculeBuilder = lazy(() => import("@/components/plugins/MoleculeBuilder").then(module => ({ default: module.MoleculeBuilder })));

export default function TetrahedralSulfateGeometryPage() {

    // Scrollytelling Layers - The Structural Logic
    const layers = [
        {
            title: "The Shape",
            subtitle: "Tetrahedral",
            desc: "4 oxygen atoms spaced evenly around one sulfur center. The classic 109.5° bond angle creates distributed stability.",
            link: "#geometry",
            registryId: "geo-tetrahedral",
            color: "yellow",
            Icon: Triangle
        },
        {
            title: "The Lattice",
            subtitle: "Mineral Architecture",
            desc: "This stable shape becomes a 'brick' in larger mineral structures (gypsum, jarosite, sulfates). It builds order.",
            link: "/science/mineral-science-blueprint",
            registryId: "mineral-salts",
            color: "orange",
            Icon: Component
        },
        {
            title: "The Interface",
            subtitle: "Hydration",
            desc: "In water, the tetrahedron orients hydration shells. It is an 'anchor' for water structure at the ionic scale.",
            link: "/hydration-layers-interfaces",
            registryId: "water-interface",
            color: "cyan",
            Icon: Droplets
        },
        {
            title: "The Resonance",
            subtitle: "Stability",
            desc: "Charge is shared across the oxygen framework. This resonance makes SO₄²⁻ robust and chemically consistent.",
            link: "/sulfate-chemistry",
            registryId: "pillar-electric",
            color: "blue",
            Icon: Atom
        }
    ];

    return (
        <StandardPageLayout
            title={<>The SO₄ <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500">Tetrahedron</span></>}
            subtitle={<>Geometry of the <span className="text-white font-bold">Sulphate Ion.</span><br />Structure, Symmetry, and Resonance.</>}

            heroVariant="amber"
            heroIcon={Triangle}
            badges={[{ text: "Molecular Geometry", icon: Triangle }]}
            seoTitle="Tetrahedral Sulphate Ion Geometry (SO₄²⁻): Structure, Symmetry, and Why It Matters"
            seoDescription="The sulphate ion (SO₄²⁻) has a tetrahedral geometry that shapes how it hydrates, bonds, and behaves in minerals. Learn the SO₄ tetrahedron and crystalline relationships."
        >
            {/* DEFINITION SECTION WITH VISUAL */}
            <section className="relative z-10 py-24 bg-[#020617]">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <Atom className="w-5 h-5 text-yellow-400" />
                                    <span className="text-xs font-bold text-white/50 tracking-widest uppercase">The Definition</span>
                                </div>
                                <p className="text-white/80 leading-relaxed text-xl font-display mb-6">
                                    "The sulphate ion is a tetrahedral structure: one sulfur center coordinated to four oxygen atoms."
                                </p>
                                <p className="text-white/60">
                                    This stable symmetry strongly influences mineral lattices, hydration behavior, and ionic interactions in water. It is a molecular archetype.
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 w-full flex justify-center">
                            {/* Visual Interpreter: The Tetrahedron */}
                            <div className="w-full max-w-md">
                                <Suspense fallback={<div className="h-[500px] w-full bg-[#0b1020] rounded-3xl animate-pulse flex items-center justify-center text-white/50">Loading 3D Model...</div>}>
                                    <MoleculeBuilder />
                                </Suspense>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SCROLLYTELLING - STRUCTURAL LOGIC */}
            <section className="relative z-10 w-full bg-[#020617] pb-32">
                <div className="container px-4 mx-auto">
                    <div className="relative py-20 text-center z-20 pointer-events-none">
                        <h2 className="text-3xl font-display text-white mb-4">Geometric Logic</h2>
                        <p className="text-white/50 max-w-xl mx-auto">
                            Why this specific shape matters for Water, Minerals, and Fields.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        {layers.map((layer, i) => (
                            <StackedCard key={i} index={i} total={layers.length} {...layer} />
                        ))}
                    </div>
                </div>
            </section>

            {/* DEEP DIVE: LATTICE & WATER */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-6xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-16 text-center">System Integration</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Minerals */}
                        <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8 hover:border-orange-500/30 transition-colors">
                            <Component className="w-10 h-10 text-orange-400 mb-6" />
                            <h3 className="text-xl font-bold text-white mb-4">Mineral Lattices</h3>
                            <p className="text-white/60 text-sm mb-6 leading-relaxed">
                                Many minerals (gypsum, jarosite, zinc sulphate) are built around the SO₄ tetrahedron. It acts like a repeatable building block—a "brick" that defines the larger crystal structure.
                            </p>
                            <Link href="/science/mineral-science-blueprint" className="text-orange-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
                                Explore Minerals <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        {/* Water */}
                        <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8 hover:border-cyan-500/30 transition-colors">
                            <Droplets className="w-10 h-10 text-cyan-400 mb-6" />
                            <h3 className="text-xl font-bold text-white mb-4">Water Interface</h3>
                            <p className="text-white/60 text-sm mb-6 leading-relaxed">
                                When dissolved, the tetrahedron becomes a hydrated ion. It orients water molecules around it. We treat sulphate as a "carrier-and-interface context variable" that organizes the local medium.
                            </p>
                            <Link href="/science/water-structure" className="text-cyan-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
                                View Hydration <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        {/* Terminology */}
                        <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8 hover:border-indigo-500/30 transition-colors">
                            <Scale className="w-10 h-10 text-indigo-400 mb-6" />
                            <h3 className="text-xl font-bold text-white mb-4">Precision Naming</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-white/80 font-bold block text-sm">Sulphate (SO₄²⁻)</span>
                                    <span className="text-white/50 text-xs">Tetrahedral, oxygen-rich. The archetype.</span>
                                </div>
                                <div>
                                    <span className="text-white/80 font-bold block text-sm">Sulfite (SO₃²⁻)</span>
                                    <span className="text-white/50 text-xs">Trigonal, different behavior.</span>
                                </div>
                                <div>
                                    <span className="text-white/80 font-bold block text-sm">Sulfide (S²⁻)</span>
                                    <span className="text-white/50 text-xs">No oxygen, distinct chemistry.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY IT FITS THE MATRIX */}
            <section className="py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/10 text-xs uppercase tracking-widest mb-8">
                        <Network className="w-3 h-3" /> The Matrix Connection
                    </div>
                    <h2 className="text-3xl font-display text-white mb-6">Why Geometry is the Bridge</h2>
                    <p className="text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
                        The Crystalline Matrix unifies water structure, mineral geometry, and fields. Sulphate belongs here because it is a clear, teachable archetype—a geometry that repeats in stones, in water, and in the pattern language of nature.
                    </p>

                    <div className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/20 inline-block">
                        <p className="text-lg font-display text-yellow-300">
                            "The SO₄ tetrahedron is one of nature’s repeatable geometry codes."
                        </p>
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
                                What is the sulphate ion?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed">The sulphate ion is SO4^2−: one sulfur atom bonded to four oxygen atoms with an overall −2 charge.</p>
                        </div>
                        <div className="border-b border-white/10 pb-6">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                Why is sulphate tetrahedral?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed">Its bonding arrangement places four oxygen atoms around sulfur in a stable tetrahedral geometry, distributing interaction points evenly in 3D space.</p>
                        </div>
                        <div className="border-b border-white/10 pb-6">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                Why does sulphate geometry matter?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed">Because the SO4 tetrahedron is a repeatable structural unit that integrates into mineral lattices and shapes how sulphate minerals form and behave.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEXT STEPS */}
            <section className="py-20 bg-gradient-to-t from-[#020617] to-[#05060b] text-center">
                <div className="container px-4">
                    <Link href="/sulfate-chemistry">
                        <Button variant="andara-glass" size="lg" className="rounded-full h-14 px-8 text-base">
                            Next: Sulfate Chemistry
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </section>
        </StandardPageLayout>
    );
}
