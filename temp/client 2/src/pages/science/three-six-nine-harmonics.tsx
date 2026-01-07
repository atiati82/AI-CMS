import React, { useEffect } from "react";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { FadeIn } from "@/components/animations";
import {
    Triangle,
    Hexagon,
    Network,
    ArrowRight,
    HelpCircle,
    Layers,
    Box,
    Share2,
    Minimize2,
    Maximize2,
    Activity
} from "lucide-react";

export default function ThreeSixNineHarmonicsPage() {
    // --- SEO & Rank Math Fields ---
    useEffect(() => {
        document.title = "3-6-9 Harmonics: Andara Pattern Language (Water, Minerals, Fields)";

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', "3-6-9 harmonics is Andara’s pattern language: a visual and conceptual system to connect water structure, mineral geometry, and bioelectric terrain into a coherent map.");
    }, []);

    // --- JSON-LD Call ---
    const schemas = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "3-6-9 Harmonics: Andara Pattern Language",
            "description": "A conceptual framework for organizing water science and bioelectric terrain."
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Is 3-6-9 a scientific principle?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Not in the way this page uses it. Andara uses 3-6-9 as a pattern language for organizing education, navigation, and visual design."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Why does Andara use 3-6-9 in the science library?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "It creates consistent structure across topics and helps connect water, mineral, and bioelectric concepts into one coherent map."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How can I apply 3-6-9 to every page?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Use the template: 3 foundations, 6 structure examples, 9 integration links. This makes the library scalable."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Does this relate to Tesla?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Tesla is often quoted in 3-6-9 discussions, but Andara uses the framework as a design and information architecture tool, not as proof of claims."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What should I read next?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Read hexagonal-water-structures and tetrahedral-sulfate-geometry to move from pattern language into geometry foundations."
                    }
                }
            ]
        }
    ];

    return (
        <Layout>
            {schemas.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}

            {/* HERO SECTION */}
            <section className="relative bg-[#020617] text-white overflow-hidden py-20 min-h-[50vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#05060b] to-[#020617] z-0" />

                {/* Geometric Visual */}
                <div className="absolute inset-0 z-0 opacity-20">
                    {/* Triads and Hexagons */}
                    <svg className="absolute inset-0 w-full h-full">
                        <path d="M500,300 L600,100 L700,300 Z" stroke="#38ffd1" strokeWidth="1" fill="none" opacity="0.3" />
                        <path d="M400,400 L500,200 L600,400 L500,600 L300,600 L200,400 Z" stroke="#f6d56a" strokeWidth="1" fill="none" opacity="0.2" />
                        <circle cx="900" cy="500" r="200" stroke="#1aa7ff" strokeWidth="1" fill="none" opacity="0.2" />
                    </svg>
                </div>
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[#38ffd1]/5 rounded-full blur-[100px] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="container relative z-10 px-4 text-center">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 mb-8">
                            <Share2 className="w-3.5 h-3.5 text-[#38ffd1]" />
                            <span className="text-xs font-bold tracking-widest uppercase">Pattern Language</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium leading-tight mb-6">
                            3 - 6 - 9 Harmonics
                            <br />
                            <span className="text-white/50 text-2xl md:text-3xl mt-4 block tracking-wide">Foundations · Structure · Integration</span>
                        </h1>
                        <p className="text-lg text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Andara's system for connecting water, minerals, and fields<br />
                            into a coherent map.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 1: THE MEANING */}
            <section className="py-20 bg-[#05060b] border-y border-white/5">
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-display text-white mb-6">Not Superstition. Architecture.</h2>
                        <p className="text-white/70 leading-relaxed max-w-2xl mx-auto">
                            We use 3-6-9 as a <strong>Geometry-Based UI Framework</strong> to organize complex science into navigable layers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* 3 - Foundation */}
                        <div className="p-8 bg-[#0b1020] rounded-3xl border border-white/5 group hover:border-[#38ffd1]/30 transition-all text-center">
                            <div className="w-16 h-16 rounded-full bg-[#38ffd1]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Triangle className="w-8 h-8 text-[#38ffd1]" />
                            </div>
                            <h3 className="text-4xl font-display font-bold text-white mb-2">3</h3>
                            <h4 className="text-[#38ffd1] font-bold uppercase tracking-widest text-xs mb-4">Foundation</h4>
                            <p className="text-white/60 text-sm">
                                <strong>The Triad.</strong><br />
                                Minimal stable units.<br />
                                (Ions, Interfaces, Gradients)
                            </p>
                        </div>

                        {/* 6 - Structure */}
                        <div className="p-8 bg-[#0b1020] rounded-3xl border border-white/5 group hover:border-[#f6d56a]/30 transition-all text-center">
                            <div className="w-16 h-16 rounded-full bg-[#f6d56a]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Hexagon className="w-8 h-8 text-[#f6d56a]" />
                            </div>
                            <h3 className="text-4xl font-display font-bold text-white mb-2">6</h3>
                            <h4 className="text-[#f6d56a] font-bold uppercase tracking-widest text-xs mb-4">Structure</h4>
                            <p className="text-white/60 text-sm">
                                <strong>The Hexagon.</strong><br />
                                Symmetry & Organization.<br />
                                (Crystals, Flow, Patterns)
                            </p>
                        </div>

                        {/* 9 - Integration */}
                        <div className="p-8 bg-[#0b1020] rounded-3xl border border-white/5 group hover:border-[#1aa7ff]/30 transition-all text-center">
                            <div className="w-16 h-16 rounded-full bg-[#1aa7ff]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Network className="w-8 h-8 text-[#1aa7ff]" />
                            </div>
                            <h3 className="text-4xl font-display font-bold text-white mb-2">9</h3>
                            <h4 className="text-[#1aa7ff] font-bold uppercase tracking-widest text-xs mb-4">Integration</h4>
                            <p className="text-white/60 text-sm">
                                <strong>The Field.</strong><br />
                                System-level synthesis.<br />
                                (Terrain, Maps, Experience)
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: APPLICATION IN DOMAINS */}
            <section className="py-24 bg-[#020617]">
                <div className="container px-4 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-16 text-center">Applied Pattern Language</h2>

                    <div className="space-y-4">
                        {[
                            {
                                domain: "Water Science", icon: Layers, color: "text-[#1aa7ff]",
                                rule3: "Phases • Interfaces • Gradients",
                                rule6: "Hexagonal Symmetry • Flow Patterns",
                                rule9: "Water-Body-Soil Map",
                                link: "/bioelectric-water"
                            },
                            {
                                domain: "Mineral Geometry", icon: Box, color: "text-[#38ffd1]",
                                rule3: "Tetrahedral Foundation (SO₄)",
                                rule6: "Crystalline Lattice Structures",
                                rule9: "Matrix & Field Effects",
                                link: "/tetrahedral-sulfate-geometry"
                            },
                            {
                                domain: "Bioelectric Terrain", icon: Activity, color: "text-[#f6d56a]",
                                rule3: "Carriers • Gates • Gradients",
                                rule6: "Drift Curves • Orientation Variables",
                                rule9: "Citizen Science & Mapping",
                                link: "/bioelectric-maps-water-body-soil"
                            },
                        ].map((item, i) => (
                            <Link key={i} href={item.link} className="block group">
                                <div className="flex flex-col md:flex-row items-center bg-[#0b1020] rounded-2xl border border-white/5 p-6 md:p-8 hover:border-white/20 transition-all">
                                    <div className={`p-4 rounded-xl bg-white/5 mr-0 md:mr-8 mb-4 md:mb-0`}>
                                        <item.icon className={`w-8 h-8 ${item.color}`} />
                                    </div>
                                    <div className="flex-1 w-full">
                                        <h3 className="text-xl font-bold text-white mb-4 text-center md:text-left">{item.domain}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                            <div className="bg-[#020617] p-3 rounded-lg border border-white/5">
                                                <span className={`block text-xs font-bold ${item.color} opacity-50 mb-1`}>3 (Foundation)</span>
                                                <span className="text-white/70">{item.rule3}</span>
                                            </div>
                                            <div className="bg-[#020617] p-3 rounded-lg border border-white/5">
                                                <span className={`block text-xs font-bold ${item.color} opacity-50 mb-1`}>6 (Structure)</span>
                                                <span className="text-white/70">{item.rule6}</span>
                                            </div>
                                            <div className="bg-[#020617] p-3 rounded-lg border border-white/5">
                                                <span className={`block text-xs font-bold ${item.color} opacity-50 mb-1`}>9 (Integration)</span>
                                                <span className="text-white/70">{item.rule9}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-0 md:ml-8 mt-6 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight className="w-5 h-5 text-white/60" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* DESIGN SYSTEM */}
            <section className="py-24 bg-[#0b1020] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-display text-white mb-8 text-center">Design System Integration</h2>
                    <div className="bg-[#020617] rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-[#38ffd1]/5 rounded-full blur-[50px] pointer-events-none" />

                        <p className="text-white/70 mb-8 text-center max-w-2xl mx-auto">
                            Every page in the Science Library follows the <strong>3-6-9 Template</strong> to ensure scalability and coherence.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="p-4 border border-dashed border-white/20 rounded-xl">
                                <Minimize2 className="w-6 h-6 text-white/40 mx-auto mb-2" />
                                <strong className="block text-white text-sm">Foundation Block</strong>
                                <span className="text-white/40 text-xs">Definitions & Core Terms</span>
                            </div>
                            <div className="p-4 border border-dashed border-white/20 rounded-xl">
                                <Maximize2 className="w-6 h-6 text-white/40 mx-auto mb-2" />
                                <strong className="block text-white text-sm">Structure Block</strong>
                                <span className="text-white/40 text-xs">Examples & Diagrams</span>
                            </div>
                            <div className="p-4 border border-dashed border-white/20 rounded-xl">
                                <Share2 className="w-6 h-6 text-white/40 mx-auto mb-2" />
                                <strong className="block text-white text-sm">Integration Block</strong>
                                <span className="text-white/40 text-xs">Links & Next Steps</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#05060b]">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Common Questions</h2>
                    <div className="space-y-6">
                        {schemas[1]?.mainEntity?.map((item, i) => (
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

            {/* NEXT STEPS */}
            <section className="py-20 bg-gradient-to-t from-[#020617] to-[#05060b] text-center">
                <div className="container px-4">
                    <h2 className="text-xl font-display text-white mb-6">Explore the Cluster</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50">/hexagonal-water-structures</span>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50">/tetrahedral-sulfate-geometry</span>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50">/crystalline-matrix-hub</span>
                    </div>
                </div>
            </section>

        </Layout>
    );
}
