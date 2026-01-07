import React, { useRef } from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { BackgroundLayer } from "@/components/visuals/BackgroundLayer";
import { ScrollProgress } from "@/components/plugins/ScrollProgress";
import {
    Shield,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    HelpCircle,
    ArrowRight,
    Calculator,
    Droplets
} from "lucide-react";

export default function SafetyBoundariesPage() {
    // --- JSON-LD ---
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Safety, Boundaries & Legal Use",
        "description": "Education-First Guidelines for Responsible Use of Andara Ionic. Safety boundaries, dosing protocols, and compliance standards."
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is Andara Ionic a medical product?",
                "acceptedAnswer": { "@type": "Answer", "text": "No. It is a water-conditioning mineral concentrate. It is not intended to treat, cure, or prevent disease." }
            },
            {
                "@type": "Question",
                "name": "Can it replace filtration?",
                "acceptedAnswer": { "@type": "Answer", "text": "No. If your water source usually requires filtration (e.g., river water, unknown well), you must still filter it. Andara is a conditioning additive, not a primary purifier." }
            },
            {
                "@type": "Question",
                "name": "What if I use too much?",
                "acceptedAnswer": { "@type": "Answer", "text": "The minerals are potent sulfates. Overdosing usually results in a very strong, sour/bitter taste (astringency). Simply dilute with more water or discard and remix." }
            }
        ]
    };

    return (
        <StandardPageLayout
            title={<>Safety, Boundaries <br /><span className="text-red-400">& Legal Use</span></>}
            subtitle={<>Education-First Guidelines.<br />Safety is Coherence.</>}
            
            heroVariant="red"
            heroIcon={Shield}
            badges={[{ text: "Compliance", icon: Shield }]}
            seoTitle="Safety, Boundaries & Legal Use | Andara Ionic"
            seoDescription="Safety guidelines for Andara Ionic. Responsible use, water source boundaries, and legal positioning. Not a medical product."
            extraHead={
                <>
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
                </>
            }
        >
            <ScrollProgress />

            <div className="bg-[#020617]">

                {/* POSITIONING (IS vs IS NOT) */}
                <section className="py-24 bg-[#05060b] relative overflow-hidden">
                    <BackgroundLayer  opacity={20} />
                    <div className="container px-4 max-w-6xl mx-auto relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                            {/* What It Is */}
                            <div className="andara-glass-panel p-8 border-t-4 border-t-emerald-500">
                                <h2 className="text-2xl font-display text-white mb-6 flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-400" /> What It Is
                                </h2>
                                <p className="text-white/80 mb-4">Andara Ionic is a water-conditioning mineral concentrate designed for:</p>
                                <ul className="space-y-3 text-sm text-white/60 list-disc list-inside mb-8">
                                    <li>Consistent water conditioning routines</li>
                                    <li>Clarity & Structure support</li>
                                    <li>Repeatable dosing workflows</li>
                                </ul>
                                <Link href="/what-is-andara-ionic">
                                    <span className="text-emerald-400 font-bold text-sm hover:underline cursor-pointer flex items-center gap-2">
                                        The Full Definition <ArrowRight className="w-3 h-3" />
                                    </span>
                                </Link>
                            </div>

                            {/* What It Is Not */}
                            <div className="andara-glass-panel p-8 border-t-4 border-t-red-500">
                                <h2 className="text-2xl font-display text-white mb-6 flex items-center gap-3">
                                    <XCircle className="w-6 h-6 text-red-400" /> What It Is Not
                                </h2>
                                <p className="text-white/80 mb-4">To avoid confusion, Andara Ionic is <strong className="text-red-400">NOT</strong>:</p>
                                <ul className="space-y-3 text-sm text-white/60 list-disc list-inside mb-8">
                                    <li>A medical product or drug</li>
                                    <li>A guaranteed "purifier" for unsafe sources</li>
                                    <li>A replacement for filtration standards</li>
                                </ul>
                                <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-lg">
                                    <p className="text-xs text-red-200">
                                        <AlertTriangle className="w-3 h-3 inline mr-1" />
                                        If your source needs filtration, filter it first.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* CRITICAL BOUNDARIES */}
                <section className="py-24 bg-[#020617] border-t border-white/5">
                    <div className="container px-4 max-w-4xl mx-auto">

                        {/* 1. Source */}
                        <div className="mb-16">
                            <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" /> 1. Water Source Boundaries
                            </h3>
                            <div className="bg-[#0b1020] p-8 rounded-2xl border border-red-900/20 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <strong className="block text-white mb-2">Do NOT rely on additives for:</strong>
                                    <ul className="text-sm text-white/60 space-y-1 list-disc list-inside">
                                        <li>Unknown wells/rivers</li>
                                        <li>Flood-affected sources</li>
                                        <li>Industrial runoff zones</li>
                                    </ul>
                                </div>
                                <div className="border-l border-white/5 pl-8">
                                    <strong className="block text-white mb-2">Protocol:</strong>
                                    <p className="text-sm text-white/60">
                                        Use appropriate filtration (RO, Carbon, Distillation) to remove bulk contaminants first. Then use Andara to re-mineralize and structure.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Dosing */}
                        <div className="mb-16">
                            <h3 className="text-xl font-bold text-[#f6d56a] mb-6 flex items-center gap-2">
                                <Calculator className="w-5 h-5" /> 2. Dosing Boundaries
                            </h3>
                            <div className="bg-[#0b1020] p-8 rounded-2xl border border-white/10">
                                <p className="text-white/80 mb-6">
                                    Precision matters for repeatability.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Link href="/andara-dilution-calculator">
                                        <div className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-amber-500/30 cursor-pointer transition-colors">
                                            <strong className="text-amber-400 block mb-1">Use the Calculator</strong>
                                            <span className="text-xs text-white/50">For exact mL measurements.</span>
                                        </div>
                                    </Link>
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                                        <strong className="text-white block mb-1">The 7-Day Rule</strong>
                                        <span className="text-xs text-white/50">Keep one dose stable for 7 days before changing.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Handling */}
                        <div>
                            <h3 className="text-xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                                <Droplets className="w-5 h-5" /> 3. Handling Boundaries
                            </h3>
                            <div className="bg-[#0b1020] p-8 rounded-2xl border border-white/10">
                                <ul className="space-y-4">
                                    <li className="flex gap-3 text-sm text-white/70">
                                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                                        <span>Keep bottle closed and stored in a cool place.</span>
                                    </li>
                                    <li className="flex gap-3 text-sm text-white/70">
                                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                                        <span>Label your working concentrates (e.g., "1:10 Mix").</span>
                                    </li>
                                    <li className="flex gap-3 text-sm text-white/70">
                                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                                        <span>Avoid dipping used tools back into the master bottle.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 bg-[#0b1020] border-t border-white/5">
                    <div className="container px-4 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-display text-white mb-12 text-center">Safety FAQ</h2>
                        <div className="space-y-4">
                            {faqSchema.mainEntity.map((item, i) => (
                                <div key={i} className="andara-glass-panel p-6">
                                    <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                        <HelpCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                                        {item.name}
                                    </h3>
                                    <p className="text-white/60 pl-8 leading-relaxed text-sm">{item.acceptedAnswer.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-[#020617] text-center">
                    <div className="container px-4">
                        <p className="text-white/50 mb-6">Need full legal details?</p>
                        <Link href="/terms">
                            <span className="inline-block px-8 py-4 border border-white/10 rounded-full text-white font-bold hover:bg-white/5 transition-colors cursor-pointer">
                                Read Legal Disclaimers
                            </span>
                        </Link>
                    </div>
                </section>

            </div>
        </StandardPageLayout>
    );
}
