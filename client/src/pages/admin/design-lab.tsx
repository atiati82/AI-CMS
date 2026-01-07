import React from "react";
import Layout from "@/components/layout";
import { AnimatedLeyLines } from "@/components/visuals/svg/AnimatedLeyLines";
import { BioStructureLoader } from "@/components/visuals/svg/BioStructureLoader";
import { BioParticles } from "@/components/visuals/svg/BioParticles";
import { AndaraDynamicIcon } from "@/components/visuals/svg/AndaraIconRegistry";

export default function SVGDesignLab() {
    return (
        <Layout>
            <div className="min-h-screen pt-24 pb-20 bg-[#0b1020]">
                <div className="container mx-auto px-6">
                    <header className="mb-16 text-center">
                        <h1 className="text-4xl md:text-6xl font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-600 mb-4">
                            SVG Animation Lab
                        </h1>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto">
                            Researching "State of the Art" motion primitives.
                            <br />
                            <span className="text-sm font-mono text-cyan-400 mt-2 block">
                                Status: Experimental // Rendermode: SVG + Hardware Acceleration
                            </span>
                        </p>
                    </header>

                    {/* Concept A: Scroll-Linked Lines */}
                    <section className="mb-24">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-display text-white">Concept A: Ley Lines</h2>
                            <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-xs uppercase tracking-wider">
                                Scroll Linked
                            </span>
                        </div>
                        <AnimatedLeyLines />
                        <p className="text-white/40 text-sm italic text-center max-w-xl mx-auto">
                            "The detox pathways reveal themselves as you deepen your journey."
                        </p>
                    </section>

                    {/* Concept B: Bio-Structural Core */}
                    <section className="mb-24">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-display text-white">Concept B: Bio-Structural Core</h2>
                            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs uppercase tracking-wider">
                                Auto-Breathing
                            </span>
                        </div>
                        <BioStructureLoader />
                        <p className="text-white/40 text-sm italic text-center max-w-xl mx-auto">
                            "Structure is not static; it breathes with the rhythm of the mineral kingdom."
                        </p>
                    </section>

                    {/* Concept C: Bio-Particles */}
                    <section className="mb-24">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-display text-white">Concept C: Bio-Atmosphere</h2>
                            <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full text-xs uppercase tracking-wider">
                                Ambient Float
                            </span>
                        </div>
                        <BioParticles />
                        <p className="text-white/40 text-sm italic text-center max-w-xl mx-auto">
                            "The air itself is alive with ionization."
                        </p>
                    </section>

                </div>
            </div>
        </Layout>
    );
}
