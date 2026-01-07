import React from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { cn } from "@/lib/utils";
// import { FadeIn } from "@/components/animations"; // Removing unused
import {
    Gem,
    Mountain,
    Snowflake,
    Hexagon,
    Box,
    Globe,
    HelpCircle,
    ArrowRight,
    Layers,
    FlaskConical,
    Activity
} from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { CrystalToolkit } from "@/components/plugins/CrystalToolkit";

export default function CrystalGridsInNaturePage() {
    // --- JSON-LD Call ---
    const schemas = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Crystal Grids in Nature: Symmetry in the Wild",
            "description": "Educational guide on recognizing repeating lattice patterns in rock, soil, and ice."
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What is a crystal grid in nature?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A repeating structural pattern (lattice) that forms in minerals, salts, ice, and many organized materials."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Are crystal grids only spiritual?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No. The term can be used spiritually, but the underlying idea—repeating patterns in crystals—is a real physical phenomenon."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How does this relate to water?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Water interacts with mineral surfaces and forms interfaces. These boundaries and conditions can influence measurable drift patterns and clarity behavior."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What should I measure if I want to test differences?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Start with temperature, EC/TDS, and clarity photos. Add pH and ORP when your baseline setup is stable."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What should I read next?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Read spiritual-electricity-ion-intelligence for the meaning layer or water-crystal-geometry-map for the integrated field map."
                    }
                }
            ]
        }
    ];

    return (
        <StandardPageLayout
            title={<>Crystal Grids <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400 drop-shadow-md">in Nature</span></>}
            subtitle={<>Rock, Soil & Ice.<br />Observation before <span className="text-white font-bold">Obligation.</span></>}
            heroVariant="amber"
            heroIcon={Gem}
            badges={[{ text: "Pattern Recognition", icon: Gem }]}

            seoTitle="Crystal Grids in Nature: Patterns in Rock, Soil & Ice"
            seoDescription="Crystal grids in nature appear as repeating patterns in minerals, rocks, soils, and ice. Connect geometry to measurable water experiments."
        >
            {schemas.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}

            {/* SECTION 1: DEFINITIONS */}
            <section className="py-20 bg-[#05060b] border-y border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-display text-white mb-6">What is a Crystal Grid?</h2>
                            <p className="text-white/70 mb-6 leading-relaxed">
                                In science language, a "crystal grid" is simply a <strong>repeating structural pattern</strong> (lattice) formed by atoms or molecules.
                            </p>
                            <p className="text-white/70 mb-6 leading-relaxed">
                                Nature chooses these patterns because they are stable, efficient, and scalable. In Andara terms, this is "Order Emerging from Constraints."
                            </p>
                        </div>

                        <div className="relative">
                            <div className="bg-[#0b1020] rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-[#38ffd1]" /> Where to See It
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-3 bg-white/5 rounded-lg flex items-center gap-3">
                                        <Mountain className="w-5 h-5 text-[#f6d56a]" />
                                        <div className="text-sm">
                                            <strong className="block text-white">Minerals & Rocks</strong>
                                            <span className="text-white/60">Crystal faces, cleavage planes, consistent angles.</span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-lg flex items-center gap-3">
                                        <Layers className="w-5 h-5 text-[#a855f7]" />
                                        <div className="text-sm">
                                            <strong className="block text-white">Soil & Sediments</strong>
                                            <span className="text-white/60">Aggregates, pore structures, clay platelets.</span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-lg flex items-center gap-3">
                                        <Snowflake className="w-5 h-5 text-[#38ffd1]" />
                                        <div className="text-sm">
                                            <strong className="block text-white">Ice & Water</strong>
                                            <span className="text-white/60">Hexagonal symmetry, freeze patterns, interfaces.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: GEOMETRY VOCABULARY */}
            <section className="py-24 bg-[#020617] relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-8 text-center">Geometry Vocabulary</h2>

                    <div className="mb-16 max-w-2xl mx-auto">
                        <CrystalToolkit />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Hex */}
                        <Link href="/science/hexagonal-structures" className="block group h-full">
                            <div className="h-full bg-[#0b1020] rounded-2xl border border-white/5 p-8 hover:border-[#38ffd1]/30 transition-all text-center relative overflow-hidden">
                                <div className="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                    <SmartImage registryId="geo-hex-holographic" className="w-full h-full" objectFit="cover" />
                                </div>
                                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0b1020] via-transparent to-transparent" />

                                <div className="relative z-10">
                                    <div className="w-12 h-12 mx-auto rounded-full bg-[#38ffd1]/10 flex items-center justify-center text-[#38ffd1] mb-6 backdrop-blur-sm">
                                        <SmartImage registryId="water-exclusion-holographic" className="w-full h-full" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">Hex Symmetry</h3>
                                    <p className="text-white/60 text-sm mb-4">Sixfold patterns. Efficient tiling. Common in ice and honeycomb.</p>
                                    <span className="text-[#38ffd1] text-xs font-bold uppercase tracking-wider">Explore Hex</span>
                                </div>
                            </div>
                        </Link>

                        {/* Tetra */}
                        <Link href="/science/tetrahedral-sulfate-geometry" className="block group h-full">
                            <div className="h-full bg-[#0b1020] rounded-2xl border border-white/5 p-8 hover:border-[#f6d56a]/30 transition-all text-center relative overflow-hidden">
                                <div className="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                    <SmartImage registryId="geo-tetrahedral" className="w-full h-full" objectFit="cover" />
                                </div>
                                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0b1020] via-transparent to-transparent" />

                                <div className="relative z-10">
                                    <div className="w-12 h-12 mx-auto rounded-full bg-[#f6d56a]/10 flex items-center justify-center text-[#f6d56a] mb-6 backdrop-blur-sm">
                                        <Box className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">Tetrahedral Blocks</h3>
                                    <p className="text-white/60 text-sm mb-4">Four-sided stability. Molecular building blocks (SO4). Connection points.</p>
                                    <span className="text-[#f6d56a] text-xs font-bold uppercase tracking-wider">Explore Tetra</span>
                                </div>
                            </div>
                        </Link>

                        {/* Harmonic */}
                        <Link href="/science/triangular-harmonics" className="block group h-full">
                            <div className="h-full bg-[#0b1020] rounded-2xl border border-white/5 p-8 hover:border-[#a855f7]/30 transition-all text-center relative overflow-hidden">
                                <div className="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                    <SmartImage registryId="geo-vortex" className="w-full h-full" objectFit="cover" />
                                </div>
                                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0b1020] via-transparent to-transparent" />

                                <div className="relative z-10">
                                    <div className="w-12 h-12 mx-auto rounded-full bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7] mb-6 backdrop-blur-sm">
                                        <Activity className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">Pattern Logic</h3>
                                    <p className="text-white/60 text-sm mb-4">Integration of form and flow. The 3-6-9 design language.</p>
                                    <span className="text-[#a855f7] text-xs font-bold uppercase tracking-wider">Explore Pattern</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* EXPERIMENT BRIDGE */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-display text-white mb-8 text-center">From Observation to Experiment</h2>

                    <div className="space-y-6">
                        {/* Bridge A: Clarity */}
                        <div className="bg-[#0b1020] rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-full md:w-auto p-4 bg-white/5 rounded-full">
                                <FlaskConical className="w-8 h-8 text-[#1aa7ff]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-2">Bridge A: Clarity & Settling</h3>
                                <p className="text-white/60 text-sm mb-4">Mineral surfaces change how particles suspended in water settle. You can see this.</p>
                                <Link href="/diy-clarity-tests" className="inline-flex items-center gap-2 text-[#1aa7ff] text-xs font-bold hover:underline">
                                    Run Clarity Protocol <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>

                        {/* Bridge B: Drift */}
                        <div className="bg-[#0b1020] rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-full md:w-auto p-4 bg-white/5 rounded-full">
                                <Activity className="w-8 h-8 text-[#38ffd1]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-2">Bridge B: Interface Drift</h3>
                                <p className="text-white/60 text-sm mb-4">Interfaces dominate small volumes. Check open vs closed drift curves.</p>
                                <Link href="/science/water-structure" className="inline-flex items-center gap-2 text-[#38ffd1] text-xs font-bold hover:underline">
                                    Run Drift Protocol <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CREDIBILITY RULES */}
            <section className="py-20 bg-[#020617] relative z-10">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <h2 className="text-xl font-display text-white mb-8">Credibility Firewall</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                            <strong className="block text-red-200 text-sm mb-1">Do Not Claim</strong>
                            <p className="text-red-200/60 text-xs">That a crystal grid "proves" health outcomes or magic.</p>
                        </div>
                        <div className="p-4 rounded-xl border border-[#38ffd1]/20 bg-[#38ffd1]/5">
                            <strong className="block text-[#38ffd1] text-sm mb-1">Do Claim</strong>
                            <p className="text-[#38ffd1]/60 text-xs">That repeating patterns are real physical phenomena in minerals and ice.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Common Questions</h2>
                    <div className="space-y-6">
                        {schemas[1]?.mainEntity?.map((item: any, i: number) => (
                            <div key={i} className="border-b border-white/10 pb-6">
                                <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                    <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                    {item.name}
                                </h3>
                                <p className="text-white/60 pl-8 leading-relaxed">{item.acceptedAnswer.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
