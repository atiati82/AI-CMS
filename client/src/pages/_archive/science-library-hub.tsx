import React from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import {
    Library,
    Compass,
    Atom,
    Zap,
    Hexagon,
    ArrowRight,
    HelpCircle,
    BookOpen,
    Search,
    Beaker,
    Globe
} from "lucide-react";

export default function ScienceLibraryHubPage() {


    // --- JSON-LD Call (FAQ Schema) ---
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Is this a blog?", "acceptedAnswer": { "@type": "Answer", "text": "No. The Andara Science Library is a structured learning map designed for coherence and internal linking." } },
            { "@type": "Question", "name": "Is this medical advice?", "acceptedAnswer": { "@type": "Answer", "text": "No. The content is provided for educational and informational purposes only." } },
            { "@type": "Question", "name": "Where should I start if I’m new?", "acceptedAnswer": { "@type": "Answer", "text": "Start with the brand introduction page and the first 7 days guide, then explore the Water and Mineral Science pillars." } },
            { "@type": "Question", "name": "How do I find definitions?", "acceptedAnswer": { "@type": "Answer", "text": "Use the glossary page to find terms and definitions across the library." } }
        ]
    };

    return (
        <StandardPageLayout
            title={<>The Science <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38ffd1] to-[#f6d56a]">Library</span></>}
            subtitle={<>Water, Minerals & Crystalline Fields.<br />A structured knowledge system explaining the "why" behind high-fidelity hydration.</>}
            /* Using a cosmic/network background suitable for a library hub */
            heroVariant="cyan"
            heroIcon={Library}
            badges={[{ text: "The Learning Map", icon: Library }]}
            seoTitle="Andara Science Library: Water, Minerals & Crystalline Fields"
            seoDescription="Enter the Andara Science Library: a structured learning map of water science, mineral science, bioelectric terrain, and crystalline geometry."
            extraHead={<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
            backgroundElement={
                /* Preserving the Custom Network SVG Effect as a background element */
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.1" strokeDasharray="1 1" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.05" />
                        <path d="M50,20 L50,80 M20,50 L80,50" stroke="white" strokeWidth="0.05" />
                    </svg>
                </div>
            }
        >

            {/* PHILOSOPHY BLOCK */}
            <section className="py-16 bg-[#05060b] border-t border-white/5 text-center relative z-10">
                <div className="container px-4 max-w-3xl mx-auto">
                    <p className="text-white/60 mb-8 italic">
                        "This library is built as a learning graph, not a blog. Every page links forward and backward for coherence."
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-widest text-white/40">
                        <span>• Terrain-First</span>
                        <span>• Ion-Aware</span>
                        <span>• Interface-Aware</span>
                        <span>• Coherence-Driven</span>
                    </div>
                </div>
            </section>

            {/* 4 CORE PILLARS */}
            <section className="py-24 bg-[#020617] relative z-10">
                <div className="container px-4 max-w-6xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

                        {/* Pillar 1: Water Science */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-[#38ffd1] opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500" />
                            <div className="bg-[#0b1020] rounded-3xl border border-white/10 p-8 h-full relative z-10 group-hover:border-[#38ffd1]/30 transition-colors">
                                <div className="w-12 h-12 bg-[#38ffd1]/10 rounded-full flex items-center justify-center mb-6 text-[#38ffd1]">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-display text-white mb-2">1. Water Science</h3>
                                <p className="text-white/60 text-sm mb-6">The Hidden Architecture of Life. Interfaces, dissolved ions, flow patterns, and subtle electrical context.</p>
                                <ul className="space-y-2 mb-8">
                                    <li><Link href="/structured-water-basics" className="text-xs text-white/50 hover:text-[#38ffd1] flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Structured Water Basics</Link></li>
                                    <li><Link href="/science/ez-water-overview" className="text-xs text-white/50 hover:text-[#38ffd1] flex items-center gap-2"><ArrowRight className="w-3 h-3" /> EZ Water Zones</Link></li>
                                    <li><Link href="/orp-redox-water" className="text-xs text-white/50 hover:text-[#38ffd1] flex items-center gap-2"><ArrowRight className="w-3 h-3" /> ORP & Redox</Link></li>
                                </ul>
                                <Link href="/science/water-science-master" className="inline-flex items-center gap-2 text-sm font-bold text-[#38ffd1] hover:underline">
                                    Enter Water Hub <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Pillar 2: Mineral Science */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-[#f6d56a] opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500" />
                            <div className="bg-[#0b1020] rounded-3xl border border-white/10 p-8 h-full relative z-10 group-hover:border-[#f6d56a]/30 transition-colors">
                                <div className="w-12 h-12 bg-[#f6d56a]/10 rounded-full flex items-center justify-center mb-6 text-[#f6d56a]">
                                    <Atom className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-display text-white mb-2">2. Mineral Science</h3>
                                <p className="text-white/60 text-sm mb-6">Decode the Elemental Blueprint. Minerals as electrical codes, sulfate geometry, and trace cofactors.</p>
                                <ul className="space-y-2 mb-8">
                                    <li><Link href="/science/ionic-vs-colloidal-vs-solid" className="text-xs text-white/50 hover:text-[#f6d56a] flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Ionic vs Colloidal</Link></li>
                                    <li><Link href="/sulfate-chemistry" className="text-xs text-white/50 hover:text-[#f6d56a] flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Sulfate Chemistry</Link></li>
                                    <li><Link href="/trust/comparison-other-mineral-products" className="text-xs text-white/50 hover:text-[#f6d56a] flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Sources Comparison</Link></li>
                                </ul>
                                <Link href="/mineral-science-blueprint" className="inline-flex items-center gap-2 text-sm font-bold text-[#f6d56a] hover:underline">
                                    Enter Mineral Hub <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Pillar 3: Bioelectricity */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500" />
                            <div className="bg-[#0b1020] rounded-3xl border border-white/10 p-8 h-full relative z-10 group-hover:border-white/30 transition-colors">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 text-white">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-display text-white mb-2">3. Bioelectricity</h3>
                                <p className="text-white/60 text-sm mb-6">The Invisible Voltage Model. Gradients, coherence, and terrain as an electrical context.</p>
                                <ul className="space-y-2 mb-8">
                                    <li><Link href="/science/bioelectric-water" className="text-xs text-white/50 hover:text-white flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Bioelectric Water</Link></li>
                                    <li><Link href="/science/proton-gradients-energy-transfer" className="text-xs text-white/50 hover:text-white flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Proton Gradients</Link></li>
                                    <li><Link href="/terrain-concepts" className="text-xs text-white/50 hover:text-white flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Terrain Concepts</Link></li>
                                </ul>
                                <Link href="/science/bioelectricity-invisible-voltage" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:underline">
                                    Enter Voltage Hub <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Pillar 4: Crystalline Matrix */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500" />
                            <div className="bg-[#0b1020] rounded-3xl border border-white/10 p-8 h-full relative z-10 group-hover:border-purple-400/30 transition-colors">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 text-purple-400">
                                    <Hexagon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-display text-white mb-2">4. Crystalline Matrix</h3>
                                <p className="text-white/60 text-sm mb-6">A Pattern Language. Sacred geometry, tetrahedral sulfate structures, and field coherence.</p>
                                <ul className="space-y-2 mb-8">
                                    <li><Link href="/science/tetrahedral-sulfate-geometry" className="text-xs text-white/50 hover:text-purple-400 flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Tetrahedral Geometry</Link></li>
                                    <li><Link href="/science/triangular-harmonics" className="text-xs text-white/50 hover:text-purple-400 flex items-center gap-2"><ArrowRight className="w-3 h-3" /> 3-6-9 Harmonics</Link></li>
                                    <li><Link href="/science/ez-geometry-map" className="text-xs text-white/50 hover:text-purple-400 flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Integrated Map</Link></li>
                                </ul>
                                <Link href="/science/crystalline-matrix-overview" className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:underline">
                                    Enter Matrix Hub <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* LEARNING PATHS */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-display text-white mb-12 text-center flex items-center justify-center gap-2">
                        <Compass className="w-6 h-6 text-white/40" /> Recommended Learning Paths
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5">
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2"><div className="w-2 h-2 bg-[#38ffd1] rounded-full" /> Beginner Path</h4>
                            <ol className="list-decimal list-inside space-y-2 text-xs text-white/60">
                                <li><Link href="/what-is-andara-ionic" className="hover:text-white underline decoration-dotted">What Is Andara?</Link></li>
                                <li><Link href="/getting-started-first-7-days" className="hover:text-white underline decoration-dotted">First 7 Days Routine</Link></li>
                                <li><Link href="/structured-water-basics" className="hover:text-white underline decoration-dotted">Structured Water Basics</Link></li>
                            </ol>
                        </div>
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5">
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2"><div className="w-2 h-2 bg-[#f6d56a] rounded-full" /> Dosing Path</h4>
                            <ol className="list-decimal list-inside space-y-2 text-xs text-white/60">
                                <li><Link href="/andara-dilution-calculator" className="hover:text-white underline decoration-dotted">Visual Calculator</Link></li>
                                <li><Link href="/andara-ionic-dilution-table" className="hover:text-white underline decoration-dotted">Reference Table</Link></li>
                                <li><Link href="/faq-product-application" className="hover:text-white underline decoration-dotted">Application FAQ</Link></li>
                            </ol>
                        </div>
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5">
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2"><div className="w-2 h-2 bg-white/50 rounded-full" /> Terrain Path</h4>
                            <ol className="list-decimal list-inside space-y-2 text-xs text-white/60">
                                <li><Link href="/science/bioelectricity-invisible-voltage" className="hover:text-white underline decoration-dotted">Invisible Voltage</Link></li>
                                <li><Link href="/science/proton-gradients-energy-transfer" className="hover:text-white underline decoration-dotted">Proton Gradients</Link></li>
                                <li><Link href="/terrain-concepts" className="hover:text-white underline decoration-dotted">Terrain Concepts</Link></li>
                            </ol>
                        </div>
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5">
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2"><div className="w-2 h-2 bg-purple-400 rounded-full" /> Geometry Path</h4>
                            <ol className="list-decimal list-inside space-y-2 text-xs text-white/60">
                                <li><Link href="/science/crystalline-matrix-overview" className="hover:text-white underline decoration-dotted">Matrix Hub</Link></li>
                                <li><Link href="/science/tetrahedral-sulfate-geometry" className="hover:text-white underline decoration-dotted">Tetrahedral Geometry</Link></li>
                                <li><Link href="/science/triangular-harmonics" className="hover:text-white underline decoration-dotted">3-6-9 Harmonics</Link></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            {/* NAVIGATION & SEARCH */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <h3 className="text-white font-bold mb-8">System Navigation</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/andara-library-index" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 flex items-center gap-2">
                            <Search className="w-4 h-4" /> Index
                        </Link>
                        <Link href="/glossary-terms-definitions" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> Glossary
                        </Link>
                        <Link href="/andara-dilution-calculator" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 flex items-center gap-2">
                            <Beaker className="w-4 h-4" /> Labs/Calc
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Library FAQ</h2>
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
