import React, { useEffect } from "react";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { HeroGlass } from "@/components/visuals/HeroGlass";
import {
    Layers,
    Droplets,
    Zap,
    Repeat,
    ArrowRight,
    HelpCircle,
    Eye,
    Sliders
} from "lucide-react";

export default function HowAndaraWorksPage() {
    // --- SEO & Rank Math Fields ---
    useEffect(() => {
        document.title = "How Andara Ionic Works: Water Conditioning, Clarity & Coherent Mineral Context";

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', "Learn how Andara Ionic works as a system: ionic minerals + sulfate chemistry + coherent dilution. Understand clarity vs purity, ions vs particles, and why stable baseline routines make water behavior readable. Education-first, claim-clean.");
    }, []);

    // --- JSON-LD Call ---
    // --- JSON-LD Call ---
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "How Andara Ionic Works",
        "description": "The 3-layer model of Andara Ionic: Mineral, Particle, and Coherence Contexts."
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is Andara Ionic a water filter?",
                "acceptedAnswer": { "@type": "Answer", "text": "No. Andara Ionic is positioned for water conditioning routines and coherence-based preparation, not as a replacement for filtration systems." }
            },
            {
                "@type": "Question",
                "name": "Why do I need the calculator?",
                "acceptedAnswer": { "@type": "Answer", "text": "The calculator keeps dilution consistent and removes guesswork, which supports repeatability and baseline readability." }
            },
            {
                "@type": "Question",
                "name": "What is the main advantage?",
                "acceptedAnswer": { "@type": "Answer", "text": "A stable, repeatable routine: baseline water + consistent dilution + a 7-day coherence window." }
            }
        ]
    };

    const schemas = [articleSchema, faqSchema];

    return (
        <Layout>
            {schemas.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}

            <div className="bg-[#020617] text-white selection:bg-blue-500/30">

                {/* HERO */}
                <HeroGlass
                    title={<>How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-500">Andara Works</span></>}
                    subtitle={<>Conditioning. Clarity. Coherence.<br />The 3-Layer Model.</>}
                    
                    badgeText="System Mechanics"
                />

                {/* THE 3-LAYER MODEL INTRO */}
                <section className="relative z-10 py-20 bg-[#020617]">
                    <div className="container px-4 max-w-4xl mx-auto text-center">
                        <p className="text-xl text-white/80 leading-relaxed mb-12">
                            Andara's "how it works" is not a single miracle mechanism. It is a <span className="text-cyan-400 font-bold">three-layer system</span> designed to create a readable water routine.
                        </p>
                    </div>
                </section>

                {/* LAYER 1: MINERAL CONTEXT */}
                <section className="py-20 bg-[#05060b] border-t border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none" />
                    <div className="container px-4 max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-2 block">Layer 1</span>
                                <h2 className="text-3xl font-display text-white mb-6">Mineral Context</h2>
                                <h3 className="text-lg text-white/50 mb-6">Ions as Participation</h3>
                                <p className="text-white/70 mb-6 leading-relaxed">
                                    Ions are charge carriers. When you add a consistent ionic mineral context, you influence the conductivity context (how many carriers participate) and the "terrain readability" (less randomness).
                                </p>
                                <div className="flex gap-4">
                                    <Link href="/science/ionic-vs-colloidal-vs-solid" className="text-sm font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-2">
                                        Ionic vs Colloidal <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link href="/conductivity-tds-water" className="text-sm font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-2">
                                        Conductivity <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                            <div className="order-1 md:order-2 flex justify-center">
                                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 flex items-center justify-center relative">
                                    <Zap className="w-24 h-24 text-yellow-400/50" />
                                    <div className="absolute inset-0 border-2 border-yellow-500/10 rounded-full animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* LAYER 2: PARTICLE CONTEXT */}
                <section className="py-20 bg-[#020617] border-t border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
                    <div className="container px-4 max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="flex justify-center">
                                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 flex items-center justify-center relative">
                                    <Eye className="w-24 h-24 text-cyan-400/50" />
                                </div>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-2 block">Layer 2</span>
                                <h2 className="text-3xl font-display text-white mb-6">Particle Context</h2>
                                <h3 className="text-lg text-white/50 mb-6">Clarity vs Purity</h3>
                                <p className="text-white/70 mb-6 leading-relaxed">
                                    Clarity describes suspended matter. Andara supports conditioning routines where water appearance may become more consistent, aiding baseline observation.
                                </p>
                                <div className="p-4 bg-cyan-900/10 border border-cyan-500/10 rounded-lg mb-6">
                                    <p className="text-xs text-cyan-200">
                                        <strong>Important:</strong> Clarity ≠ Purity. We distinguish visual behavior from filtration metrics.
                                    </p>
                                </div>
                                <Link href="/science/turbidity-clarity-flocculation" className="text-sm font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
                                    Understanding Turbidity <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* LAYER 3: COHERENCE CONTEXT */}
                <section className="py-20 bg-[#05060b] border-t border-white/5 relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
                    <div className="container px-4 max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2 block">Layer 3</span>
                                <h2 className="text-3xl font-display text-white mb-6">Coherence Context</h2>
                                <h3 className="text-lg text-white/50 mb-6">The Real Differentiator</h3>
                                <p className="text-white/70 mb-6 leading-relaxed">
                                    Most routines fail because variables change daily (source, container, dose). Andara's core differentiator is <span className="text-white font-bold">stability</span>. A calculator + a protocol ensures the routine remains readable over time.
                                </p>
                                <div className="flex gap-4">
                                    <Link href="/andara-dilution-calculator" className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-2">
                                        Use Calculator <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link href="/getting-started-first-7-days" className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-2">
                                        The Protocol <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                            <div className="order-1 md:order-2 flex justify-center">
                                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 flex items-center justify-center relative">
                                    <Repeat className="w-24 h-24 text-blue-400/50" />
                                    <div className="absolute inset-x-0 h-px bg-blue-500/30 top-1/2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* NO CONFUSION WORKFLOW */}
                <section className="py-24 bg-[#020617]">
                    <div className="container px-4 max-w-5xl mx-auto text-center">
                        <h2 className="text-2xl font-display text-white mb-12">The "No-Confusion" Workflow</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="andara-glass-card p-8">
                                <div className="text-4xl text-white/10 font-display mb-4">01</div>
                                <h4 className="text-white font-bold mb-2">Baseline Water</h4>
                                <p className="text-white/50 text-sm mb-4">Choose one source. Don't switch.</p>
                                <Link href="/natural-vs-treated-water" className="text-xs text-blue-400 hover:text-blue-300 underline">Select Source</Link>
                            </div>
                            <div className="andara-glass-card p-8">
                                <div className="text-4xl text-white/10 font-display mb-4">02</div>
                                <h4 className="text-white font-bold mb-2">Stable Dilution</h4>
                                <p className="text-white/50 text-sm mb-4">Use the calculator. Match volume.</p>
                                <Link href="/andara-dilution-calculator" className="text-xs text-blue-400 hover:text-blue-300 underline">Calculate Dose</Link>
                            </div>
                            <div className="andara-glass-card p-8">
                                <div className="text-4xl text-white/10 font-display mb-4">03</div>
                                <h4 className="text-white font-bold mb-2">7-Day Window</h4>
                                <p className="text-white/50 text-sm mb-4">Run it stable. Observe patterns.</p>
                                <Link href="/getting-started-first-7-days" className="text-xs text-blue-400 hover:text-blue-300 underline">Start Protocol</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 bg-[#05060b] border-t border-white/5">
                    <div className="container px-4 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-display text-white mb-8 text-center">Questions</h2>
                        <div className="space-y-4">
                            {faqSchema.mainEntity.map((item, i) => (
                                <div key={i} className="andara-glass-panel p-6">
                                    <h3 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                                        <HelpCircle className="w-4 h-4 text-white/30" /> {item.name}
                                    </h3>
                                    <p className="text-white/60 text-sm pl-6">{item.acceptedAnswer?.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </Layout>
    );
}
