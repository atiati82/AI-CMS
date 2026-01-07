import React from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { FadeIn } from "@/components/animations";
import {
    Hexagon,
    Zap,
    Sparkles,
    Triangle,
    ArrowRight,
    HelpCircle,
    Component,
    Atom,
    Lightbulb,
    Layers,
    FlaskConical
} from "lucide-react";
import { SulfateTetrahedron } from "@/components/visuals/SulfateTetrahedron";
import { SacredGeoDraw } from "@/components/visuals/motion-lab/SacredGeoDraw";
import { HexagonalLatticeDraw } from "@/components/visuals/motion-lab/HexagonalLatticeDraw";

export default function CrystallineMatrixHubPage() {
    // --- JSON-LD Call (FAQ Schema) ---
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Is this science or spirituality?", "acceptedAnswer": { "@type": "Answer", "text": "It is a pattern language bridge: chemistry and interfaces explained with geometry metaphors and coherent design logic." } },
            { "@type": "Question", "name": "Is the sulfate tetrahedron a real thing?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The sulfate ion (SO4²−) is commonly described as tetrahedral in chemistry, and Andara uses it as a bridge into pattern literacy." } },
            { "@type": "Question", "name": "Are you claiming guaranteed physical effects from geometry?", "acceptedAnswer": { "@type": "Answer", "text": "No. These pages are educational and claim-clean, without guaranteed outcome claims." } },
            { "@type": "Question", "name": "Where should I go next?", "acceptedAnswer": { "@type": "Answer", "text": "For minerals, go to Mineral Science Blueprint. For terrain and voltage models, go to the Bioelectricity hub." } }
        ]
    };

    return (
        <StandardPageLayout
            title={<>Crystalline <span className="text-cyan-400">Matrix</span></>}
            subtitle={<>Water, Minerals & Fields.<br />A pattern language describing structure, coherence, and interface geometry.</>}
            heroVariant="cyan"
            heroIcon={Hexagon}
            badges={[{ text: "Science Pillar 04", icon: Hexagon }]}

            seoTitle="Crystalline Matrix: Water, Ionic Minerals, Geometry & Field Coherence"
            seoDescription="Explore the Andara Crystalline Matrix pillar: how water, ions, and geometry connect through interfaces and field coherence. Learn the SO₄ tetrahedron, hexagonal symmetry concepts, and 3-6-9 harmonics."
        >
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* ANDARA MATRIX MODEL (4 PRINCIPLES) */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-6xl mx-auto">
                    <h2 className="text-2xl font-display text-white mb-12 text-center">4 Principles of Coherence</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 hover:border-cyan-400/30 transition-colors">
                            <div className="w-10 h-10 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 text-cyan-400"><Component className="w-5 h-5" /></div>
                            <h3 className="text-white font-bold mb-2 text-sm">1. Geometry is a Lens</h3>
                            <p className="text-white/50 text-xs leading-relaxed">It's not a belief system; it's a way to see relationships. Geometry describes order in nature.</p>
                        </div>

                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 hover:border-cyan-400/30 transition-colors">
                            <div className="w-10 h-10 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 text-cyan-400"><Layers className="w-5 h-5" /></div>
                            <h3 className="text-white font-bold mb-2 text-sm">2. Interface Structure</h3>
                            <p className="text-white/50 text-xs leading-relaxed">Water organizes most meaningfully at boundaries (hydration layers). This IS structure.</p>
                        </div>

                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 hover:border-cyan-400/30 transition-colors">
                            <div className="w-10 h-10 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 text-cyan-400"><Triangle className="w-5 h-5" /></div>
                            <h3 className="text-white font-bold mb-2 text-sm">3. Ion Geometry</h3>
                            <p className="text-white/50 text-xs leading-relaxed">The sulfate ion (SO₄²⁻) carries a tetrahedral geometry. A clean bridge from chemistry to form.</p>
                        </div>

                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 hover:border-cyan-400/30 transition-colors">
                            <div className="w-10 h-10 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 text-cyan-400"><Sparkles className="w-5 h-5" /></div>
                            <h3 className="text-white font-bold mb-2 text-sm">4. Coherence</h3>
                            <p className="text-white/50 text-xs leading-relaxed">The target state. Stable, repeatable pattern behavior expressed in both science and symbol.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* START HERE (CORE PAGES) */}
            <section className="py-24 bg-[#020617] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-display text-white mb-8">Start Here (Core Concepts)</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/science/ez-geometry-map" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm hover:bg-white/10 hover:border-cyan-400/50 transition-colors">Integrated Map</Link>
                        <Link href="/science/tetrahedral-sulfate-geometry" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm hover:bg-white/10 hover:border-cyan-400/50 transition-colors">Sulfate Tetrahedron</Link>
                        <Link href="/science/triangular-harmonics" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm hover:bg-white/10 hover:border-cyan-400/50 transition-colors">3-6-9 Harmonics</Link>
                        <Link href="/science/spiritual-electricity-ion-intelligence" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm hover:bg-white/10 hover:border-cyan-400/50 transition-colors">Ion Intelligence</Link>
                        <Link href="/science/light-sound-water" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm hover:bg-white/10 hover:border-cyan-400/50 transition-colors">Light Lattices</Link>
                    </div>
                </div>
            </section>

            {/* TOPIC MAP */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-5xl mx-auto space-y-16">

                    {/* A + B: Sulfate & Symmetry */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-display text-white mb-6 flex items-center gap-2">
                                <Atom className="w-5 h-5 text-cyan-400" /> Sulfate Bridge
                            </h3>
                            <div className="mb-6 rounded-lg overflow-hidden border border-white/5 bg-[#020617]">
                                <SulfateTetrahedron />
                            </div>
                            <p className="text-white/60 text-sm mb-6 min-h-[40px]">
                                The most scientific entry point. Chemistry becomes visible as geometry through the tetrahedral sulfate ion.
                            </p>
                            <ul className="space-y-3">
                                <li><Link href="/sulfate-chemistry" className="text-sm text-white/70 hover:text-cyan-400 flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Sulfate Chemistry (Mineral Link)</Link></li>
                                <li><Link href="/science/tetrahedral-sulfate-geometry" className="text-sm text-white/70 hover:text-cyan-400 flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Tetrahedral Geometry</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-display text-white mb-6 flex items-center gap-2">
                                <Hexagon className="w-5 h-5 text-cyan-400" /> Structure & Symmetry
                            </h3>
                            <p className="text-white/60 text-sm mb-6 min-h-[40px]">
                                Conceptual language for describing order. Hexagonal structure as an interface metaphor.
                            </p>
                            <ul className="space-y-3">
                                <li><Link href="/science/hexagonal-structures" className="text-sm text-white/70 hover:text-cyan-400 flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Hexagonal Water Concepts</Link></li>
                                <li><Link href="/science/water-structure" className="text-sm text-white/70 hover:text-cyan-400 flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Interface Layers</Link></li>
                                <li><Link href="/structured-water-basics" className="text-sm text-white/70 hover:text-cyan-400 flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Structured Water Basics</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="py-12 flex justify-center">
                        <HexagonalLatticeDraw />
                    </div>

                    {/* C + D: Harmonics & Light */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-display text-white mb-6 flex items-center gap-2">
                                <Component className="w-5 h-5 text-[#38ffd1]" /> Pattern Language
                            </h3>
                            <p className="text-white/60 text-sm mb-6 min-h-[40px]">
                                Design and narrative bridges. Pattern repeats across scales, providing a "navigation intelligence."
                            </p>
                            <ul className="space-y-3">
                                <li><Link href="/science/triangular-harmonics" className="text-sm text-white/70 hover:text-[#38ffd1] flex items-center gap-2"><ArrowRight className="w-3 h-3" /> 3-6-9 Harmonics</Link></li>
                                <li><Link href="/science/crystalline-matrix-overview" className="text-sm text-white/70 hover:text-[#38ffd1] flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Crystal Grids in Nature</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-display text-white mb-6 flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-[#38ffd1]" /> Light & Lattices
                            </h3>
                            <p className="text-white/60 text-sm mb-6 min-h-[40px]">
                                Structure and orientation are linked to light perception. Coherence metaphors involving photonic flow.
                            </p>
                            <ul className="space-y-3">
                                <li><Link href="/science/light-sound-water" className="text-sm text-white/70 hover:text-[#38ffd1] flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Light Lattices</Link></li>
                                <li><Link href="/science/light-sound-water" className="text-sm text-white/70 hover:text-[#38ffd1] flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Light & Water</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="h-px bg-white/5 w-full" />

                    {/* F: Signature Page */}
                    <div>
                        <h3 className="text-xl font-display text-white mb-6 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-white" /> The Andara Signature
                        </h3>
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <p className="text-white/60 text-sm max-w-md">
                                Unifying meaning, ritual, and pattern without drifting into unverifiable science. The "highest vibe" educational layer.
                            </p>
                            <div className="flex gap-6 flex-wrap">
                                <Link href="/science/spiritual-electricity-ion-intelligence" className="text-sm text-white/70 hover:text-white flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Spiritual Electricity</Link>
                                <Link href="/science/bioelectricity-invisible-voltage" className="text-sm text-white/70 hover:text-white flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Bioelectricity Hub</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* CONNECTION TO ANDARA */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-3xl font-display text-white mb-6">Connecting Pattern to Practice</h2>
                        <p className="text-white/60 mb-6">
                            Andara Ionic connects <span className="text-cyan-400">mineral geometry</span> with water interfaces and biological terrain.
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
                    <div className="flex-1 bg-[#0b1020] p-8 rounded-2xl border border-cyan-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full pointer-events-none" />
                        <h3 className="text-cyan-400 font-bold mb-4">The Application</h3>
                        <p className="text-white/70 text-sm mb-4">
                            "Coherence isn't just a word; it's a practice. The 7-day protocol establishes the rhythmic consistency needed for shifts."
                        </p>
                        <Link href="/getting-started-first-7-days" className="text-xs font-bold underline decoration-dashed text-cyan-400 hover:text-white">
                            View 7-Day Protocol
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Matrix MCQ</h2>
                    <div className="space-y-6">
                        {faqSchema.mainEntity.map((item, i) => (
                            <div key={i} className="border-b border-white/10 pb-6">
                                <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                    <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                    {item.name}
                                </h3>
                                <p className="text-white/60 pl-8 leading-relaxed text-sm">{item.acceptedAnswer.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
