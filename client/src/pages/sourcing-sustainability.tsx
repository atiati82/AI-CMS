import React, { useRef } from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import {
    Mountain,
    Globe2,
    ShieldCheck,
    FlaskConical,
    Microscope,
    ArrowRight,
    Leaf,
    Droplets
} from "lucide-react";
import { useScroll, motion, useTransform } from "framer-motion";

export default function SourcingSustainabilityPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

    // --- JSON-LD Call ---
    const schemas = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sourcing & Sustainability: The Volcanic Triad",
            "description": "Our minerals are sourced from a protected ancient volcanic triad deposit, not the open ocean. Purity, potency, and sustainability are ensured by geologic isolation."
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Is Andara Ionic sourced from the ocean?",
                    "acceptedAnswer": { "@type": "Answer", "text": "No. It is sourced from an ancient inland sea deposit (geologic), protected from modern ocean pollution." }
                },
                {
                    "@type": "Question",
                    "name": "Is the harvesting sustainable?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Yes. We harvest from a vast geologic deposit where extraction is minimal compared to the reserve, with no disruption to marine ecosystems." }
                }
            ]
        }
    ];

    return (
        <StandardPageLayout
            title={<>Sourcing & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-orange-400">Sustainability</span></>}
            subtitle={<>Ancient Volcanic Origins.<br />Protected from Modern Contaminants.</>}
            /* Automation: registryId resolved via route /sourcing-sustainability -> volcanic-triad-bg */
            heroVariant="red" // Volcanic theme
            heroIcon={Mountain}
            badges={[{ text: "Geologic Purity", icon: ShieldCheck }]}
            seoTitle="Sourcing & Sustainability — Ancient Volcanic Minerals"
            seoDescription="Discover the source of Andara Ionic minerals. Harvested from a protected ancient volcanic triad deposit, ensuring purity from modern ocean pollutants and sustainable extraction."
            extraHead={
                <>
                    {schemas.map((schema, i) => (
                        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
                    ))}
                </>
            }
        >

            <div ref={containerRef} className="bg-[#020617] text-white selection:bg-red-500/30">

                {/* THE ORIGIN STORY */}
                <section className="relative z-10 py-24 bg-[#020617]">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-display text-white mb-6">Not Fishermen. Geologists.</h2>
                                <p className="text-white/70 leading-relaxed mb-6">
                                    Most "sea minerals" are concentrated ocean water. The problem? Modern oceans are efficient sponges for microplastics and industrial runoff.
                                </p>
                                <p className="text-white/70 leading-relaxed mb-8">
                                    We go <strong>back in time.</strong> We source from a pristine ancient inland sea deposit, sealed by volcanic ash layers millions of years ago. It’s an ocean before pollution existed.
                                </p>
                                <div className="flex gap-4">
                                    <div className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-bold flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4" /> Zero Microplastics
                                    </div>
                                    <div className="px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm font-bold flex items-center gap-2">
                                        <Mountain className="w-4 h-4" /> Volcanic Seal
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-orange-500/20 blur-[60px] rounded-full" />
                                <div className="relative z-10 bg-[#0b1020] rounded-2xl border border-white/10 p-8">
                                    <h3 className="text-xl font-bold text-white mb-4">The Volcanic Triad</h3>
                                    <ul className="space-y-4">
                                        <li className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">1</div>
                                            <div>
                                                <h4 className="font-bold text-white text-sm">Active Volcanic Source</h4>
                                                <p className="text-xs text-white/50">High sulfate & sulfur contribution.</p>
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">2</div>
                                            <div>
                                                <h4 className="font-bold text-white text-sm">Geothermal Pressure</h4>
                                                <p className="text-xs text-white/50">Natural concentration & digestion.</p>
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">3</div>
                                            <div>
                                                <h4 className="font-bold text-white text-sm">Crystalline Sealing</h4>
                                                <p className="text-xs text-white/50">Protected from surface contamination.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SUSTAINABILITY METRICS */}
                <section className="py-24 bg-[#05060b] border-t border-white/5">
                    <div className="container px-4 max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl font-display text-white mb-16">Sustainability Metrics</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-[#0b1020] p-8 rounded-2xl border border-white/10 hover:border-green-500/30 transition-colors group">
                                <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Globe2 className="w-8 h-8 text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Minimal Footprint</h3>
                                <p className="text-white/60 text-sm">
                                    Our harvest is less than 0.0001% of the proven reserve annually. It is strictly regulated to prevent depletion.
                                </p>
                            </div>

                            <div className="bg-[#0b1020] p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-colors group">
                                <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Droplets className="w-8 h-8 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Solar Concentration</h3>
                                <p className="text-white/60 text-sm">
                                    We use solar evaporation ponds for final concentration, minimizing energy usage compared to boilers.
                                </p>
                            </div>

                            <div className="bg-[#0b1020] p-8 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-colors group">
                                <div className="w-16 h-16 mx-auto bg-orange-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <FlaskConical className="w-8 h-8 text-orange-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">3rd Party Purity</h3>
                                <p className="text-white/60 text-sm">
                                    Every batch is tested for heavy metals and biological contaminants to USP/FCC standards.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CALL TO ACTION */}
                <section className="py-20 bg-gradient-to-t from-[#020617] to-[#05060b] text-center">
                    <div className="container px-4">
                        <Link href="/trust/faq-safety-quality">
                            <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-all border border-white/10 shadow-lg backdrop-blur-sm group">
                                Read About Toxicity Boundaries
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </section>

            </div>
        </StandardPageLayout>
    );
}
