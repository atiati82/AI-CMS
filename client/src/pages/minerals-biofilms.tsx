import React, { useRef } from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { StackedCard } from "@/components/visuals/StackedCard";
import {
    Droplets,
    Leaf,
    Mountain,
    Layers,
    HelpCircle,
    ArrowRight,
    Activity,
    ShieldCheck,
    Scale,
    Waves
} from "lucide-react";
import { useScroll } from "framer-motion";

export default function MineralSourcesComparisonPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // --- JSON-LD Call ---
    const schemas = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Mineral Sources Comparison: Ocean, Plant, Fulvic & Geologic",
            "description": "Educational guide comparing mineral sources based on their terrain effects: Carrier (Ionic), Cofactor (Regulation), and Interface (Surface) behavior."
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Are ocean minerals and sea salt the same?",
                    "acceptedAnswer": { "@type": "Answer", "text": "No. Both can be carrier-forward, but processing and mineral spectra can differ significantly." }
                },
                {
                    "@type": "Question",
                    "name": "Are plant minerals better than salts?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Not automatically. Plant minerals emphasize cofactor/matrix context; salts emphasize carrier/electrolyte context. Better depends on your goal." }
                },
                {
                    "@type": "Question",
                    "name": "What are fulvic/humic mineral complexes?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Mineral systems associated with fulvic/humic substances, often emphasizing complexation and transport context rather than simple electrolyte salts." }
                },
                {
                    "@type": "Question",
                    "name": "Why do geologic minerals matter for water structure?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Geologic minerals emphasize interface behavior (surfaces, lattices), which is where water structure conversations often become meaningful." }
                },
                {
                    "@type": "Question",
                    "name": "What should I read next?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Read mineral-cofactors-enzymes next, then mineral-toxicity-boundaries." }
                }
            ]
        }
    ];

    // Scrollytelling Layers - The 3 Comparison Lenses
    const layers = [
        {
            title: "Layer A: Carriers",
            subtitle: "Ionic / Electrolyte Context",
            desc: "How much of the mineral content is dissolved ions? These drive conductivity (EC) and charge mobility.",
            link: "#carriers",
            image: "/bioelectric-bg.png",
            color: "blue",
            Icon: Activity
        },
        {
            title: "Layer B: Cofactors",
            subtitle: "Regulatory Context",
            desc: "Are minerals bound in biological matrices (plants/fulvic)? These interact with enzymatic pathways.",
            link: "#cofactors",
            image: "/proton-gradient-bg.png",
            color: "green",
            Icon: Leaf
        },
        {
            title: "Layer C: Interfaces",
            subtitle: "Surface / Lattice Context",
            desc: "Are minerals solids or structured surfaces (GEOLOGIC)? These shape hydration layers and boundaries.",
            link: "#interfaces",
            image: "/cell-membrane-bg.png",
            color: "orange",
            Icon: Mountain
        }
    ];

    return (
        <StandardPageLayout
            title={<>Mineral Sources <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400">Comparison</span></>}
            subtitle={<>Ocean · Plant · Fulvic · Geologic<br />Comparing Sources by <span className="text-white font-bold">Terrain Function.</span></>}
            /* Automation: registryId resolved via route /trust/comparison-other-mineral-products -> mineral-ocean */
            heroVariant="cyan" // Distinct from blue/green
            heroIcon={Waves}
            badges={[{ text: "Source Intelligence Series", icon: Mountain }]}
            seoTitle="Mineral Sources Comparison: Ocean vs Plant vs Geologic Minerals"
            seoDescription="Compare ocean minerals, plant/seaweed minerals, fulvic complexes, sea salts, and geologic minerals. Learn what each source emphasizes (carriers, cofactors, interfaces) and how they relate to ionic minerals."
            extraHead={
                <>
                    {schemas.map((schema, i) => (
                        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
                    ))}
                </>
            }
        >

            <div ref={containerRef} className="bg-[#020617] text-white selection:bg-green-500/30">

                {/* DEFINITION SECTION */}
                <section className="relative z-10 py-24 bg-[#020617]">
                    <div className="container px-4 max-w-4xl mx-auto text-center">
                        <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8 mb-12">
                            <p className="text-white/80 leading-relaxed text-2xl font-display mb-6">
                                "The best mineral source is the one aligned to the terrain layer you’re tuning."
                            </p>
                            <p className="text-white/60 text-lg">
                                Carriers tune conductivity. Cofactors tune regulation. Interfaces tune boundaries.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SCROLLYTELLING - THE 3 LENSES */}
                <section className="relative z-10 w-full bg-[#020617] pb-32">
                    <div className="container px-4 mx-auto">
                        <div className="relative py-20 text-center z-20 pointer-events-none">
                            <h2 className="text-3xl font-display text-white mb-4">The Comparison Method</h2>
                            <p className="text-white/50 max-w-xl mx-auto">
                                Don't just look at the label. Look at the function.
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            {layers.map((layer, i) => (
                                <StackedCard key={i} index={i} total={layers.length} {...layer} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* SOURCE BREAKDOWN */}
                <section className="py-24 bg-[#05060b] border-t border-white/5">
                    <div className="container px-4 max-w-6xl mx-auto">
                        <h2 className="text-3xl font-display text-white mb-16 text-center">Source Profiles</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {/* Ocean / Salts */}
                            <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                                    <Waves className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Ocean & Sea Salts</h3>
                                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">Carrier-Forward</p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex justify-between text-sm border-b border-white/5 pb-2">
                                        <span className="text-white/60">Carriers (Ions)</span>
                                        <span className="text-white font-bold">High</span>
                                    </li>
                                    <li className="flex justify-between text-sm border-b border-white/5 pb-2">
                                        <span className="text-white/60">Cofactors</span>
                                        <span className="text-white/40">Medium</span>
                                    </li>
                                    <li className="flex justify-between text-sm border-b border-white/5 pb-2">
                                        <span className="text-white/60">Interfaces</span>
                                        <span className="text-white/40">Low</span>
                                    </li>
                                </ul>
                                <p className="text-xs text-white/50">Best for: Broad-spectrum electrolyte context.</p>
                            </div>

                            {/* Plant / Fulvic */}
                            <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8 relative overflow-hidden group hover:border-green-500/30 transition-colors">
                                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                    <Leaf className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Plant & Fulvic</h3>
                                <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-6">Cofactor-Forward</p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex justify-between text-sm border-b border-white/5 pb-2">
                                        <span className="text-white/60">Carriers (Ions)</span>
                                        <span className="text-white/40">Medium</span>
                                    </li>
                                    <li className="flex justify-between text-sm border-b border-white/5 pb-2">
                                        <span className="text-white/60">Cofactors</span>
                                        <span className="text-white font-bold">High</span>
                                    </li>
                                    <li className="flex justify-between text-sm border-b border-white/5 pb-2">
                                        <span className="text-white/60">Interfaces</span>
                                        <span className="text-white/40">Low-Med</span>
                                    </li>
                                </ul>
                                <p className="text-xs text-white/50">Best for: Matrix-carried minerals & complexation.</p>
                            </div>

                            {/* Geologic */}
                            <div className="bg-[#0b1020] rounded-2xl border border-white/10 p-8 relative overflow-hidden group hover:border-orange-500/30 transition-colors">
                                <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mb-6">
                                    <Mountain className="w-6 h-6 text-orange-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Geologic Minerals</h3>
                                <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">Interface-Forward</p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex justify-between text-sm border-b border-white/5 pb-2">
                                        <span className="text-white/60">Carriers (Ions)</span>
                                        <span className="text-white/40">Low-Med</span>
                                    </li>
                                    <li className="flex justify-between text-sm border-b border-white/5 pb-2">
                                        <span className="text-white/60">Cofactors</span>
                                        <span className="text-white/40">Low</span>
                                    </li>
                                    <li className="flex justify-between text-sm border-b border-white/5 pb-2">
                                        <span className="text-white/60">Interfaces</span>
                                        <span className="text-white font-bold">High</span>
                                    </li>
                                </ul>
                                <p className="text-xs text-white/50">Best for: Surface/Lattice context & water structure.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* COMPARISON TABLE */}
                <section className="py-24 bg-[#020617] border-t border-white/5">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <h2 className="text-3xl font-display text-white mb-12 text-center">At A Glance</h2>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="p-4 text-white/50 font-normal text-sm uppercase tracking-wider">Source Type</th>
                                        <th className="p-4 text-white font-bold text-sm">Carrier (Ions)</th>
                                        <th className="p-4 text-white font-bold text-sm">Cofactor Context</th>
                                        <th className="p-4 text-white font-bold text-sm">Interface/Surface</th>
                                        <th className="p-4 text-white/50 font-normal text-sm uppercase tracking-wider">Primary Strength</th>
                                    </tr>
                                </thead>
                                <tbody className="text-white/70 text-sm">
                                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-bold text-white">Ocean Minerals</td>
                                        <td className="p-4 text-blue-400">High</td>
                                        <td className="p-4">Medium</td>
                                        <td className="p-4 text-white/30">Low</td>
                                        <td className="p-4 text-xs font-mono">Broad-spectrum carriers</td>
                                    </tr>
                                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-bold text-white">Plant/Seaweed</td>
                                        <td className="p-4">Medium</td>
                                        <td className="p-4 text-green-400">High</td>
                                        <td className="p-4 text-white/30">Low-Med</td>
                                        <td className="p-4 text-xs font-mono">Matrix-carried</td>
                                    </tr>
                                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-bold text-white">Fulvic/Humic</td>
                                        <td className="p-4">Medium</td>
                                        <td className="p-4 text-green-400">Med-High</td>
                                        <td className="p-4">Medium</td>
                                        <td className="p-4 text-xs font-mono">Complexation + Transport</td>
                                    </tr>
                                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-bold text-white">Sea Salts</td>
                                        <td className="p-4 text-blue-400">High</td>
                                        <td className="p-4 text-white/30">Low</td>
                                        <td className="p-4 text-white/30">Low</td>
                                        <td className="p-4 text-xs font-mono">Simple Electrolytes</td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-bold text-white">Geologic</td>
                                        <td className="p-4 text-white/30">Low-Med</td>
                                        <td className="p-4 text-white/30">Low-Med</td>
                                        <td className="p-4 text-orange-400">High</td>
                                        <td className="p-4 text-xs font-mono">Lattice & Interfaces</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* QUALITY & BOUNDARIES */}
                <section className="py-24 bg-[#05060b] border-t border-white/5">
                    <div className="container px-4 max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-display text-white mb-6">The Firewall: Reality Check</h2>
                        <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                            A real science library includes boundaries. Variability is real. Contaminants are real.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <div className="p-6 bg-red-500/5 rounded-xl border border-red-500/10">
                                <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Variability</h4>
                                <p className="text-xs text-white/60">
                                    Two "ocean extracts" can be radically different depending on processing. Two "geologic sources" can have different purity. <strong>Source transparency matters.</strong>
                                </p>
                            </div>
                            <div className="p-6 bg-red-500/5 rounded-xl border border-red-500/10">
                                <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2"><Scale className="w-4 h-4" /> Label Honesty</h4>
                                <p className="text-xs text-white/60">
                                    Avoid "trace minerals" products that don't list composition. Look for clear form distinction (Ionic vs Colloidal vs Solid).
                                </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link href="/trust/faq-safety-quality" className="text-sm font-bold text-red-400 hover:text-white border-b border-red-400/30 pb-1 transition-colors">
                                Read Toxicity Boundaries &rarr;
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 bg-[#020617] border-t border-white/5">
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

                {/* NEXT STEPS */}
                <section className="py-20 bg-gradient-to-t from-[#020617] to-[#05060b] text-center">
                    <div className="container px-4">
                        <Link href="/science/mineral-science-blueprint">
                            <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-all border border-white/10 shadow-lg backdrop-blur-sm group">
                                Next: Mineral Cofactors & Enzymes
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </section>

            </div>
        </StandardPageLayout>
    );
}
