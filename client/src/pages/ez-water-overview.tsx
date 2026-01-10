import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { EzWaterScrollAnimation } from "@/components/visuals/EzWaterScrollAnimation";
import { BundleCTA } from "@/components/shop/BundleCTA";
import {
    Droplets,
    Hexagon,
    Zap,
    Battery,
    ArrowRight,
    CircleCheck,
    Mountain
} from "lucide-react";
import { motion, type Easing, type Variants } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SmartVideoEmbed, VideoBackground } from "@/components/SmartVideoEmbed";

// --- VISUAL COMPONENTS ---

const CrowdVsDancersVisual = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-[300px]">
            {/* The Crowd (Random) */}
            <div className="relative bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden p-6 flex flex-col items-center justify-center group">
                <div className="absolute inset-0 opacity-20">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-slate-400 rounded-full"
                            style={{
                                left: `${Math.random() * 80 + 10}%`,
                                top: `${Math.random() * 80 + 10}%`,
                            }}
                            animate={{
                                x: [0, Math.random() * 20 - 10],
                                y: [0, Math.random() * 20 - 10],
                            }}
                            transition={{
                                duration: 2 + Math.random(),
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut" as Easing
                            }}
                        />
                    ))}
                </div>
                <div className="z-10 text-center">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Droplets className="w-6 h-6 text-slate-400" />
                    </div>
                    <h4 className="text-slate-200 font-bold">Bulk Water</h4>
                    <p className="text-slate-500 text-xs mt-1">"Chaotic & Random"</p>
                </div>
            </div>

            {/* The Dancers (Structured) */}
            <div className="relative bg-cyan-900/10 rounded-xl border border-cyan-500/20 overflow-hidden p-6 flex flex-col items-center justify-center group">
                <div className="absolute inset-0 opacity-50">
                    <div className="grid grid-cols-5 gap-4 p-8">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-cyan-400 rounded-full"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: "easeInOut" as Easing
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div className="z-10 text-center text-cyan-200">
                    <div className="w-12 h-12 bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-3 border border-cyan-500/30">
                        <Hexagon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h4 className="font-bold">EZ Water</h4>
                    <p className="text-cyan-400/60 text-xs mt-1">"Coherent & Structured"</p>
                </div>
            </div>
        </div>
    );
};

const BatteryVisual = () => {
    return (
        <div className="relative h-48 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-900/20 rounded-2xl border border-white/10 flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('/hex-grid-bg.svg')] opacity-10" />

            <div className="flex w-full px-8 items-center justify-between z-10">
                {/* Bulk Side (Positive) */}
                <div className="flex flex-col items-center">
                    <div className="text-rose-400 font-bold text-xl mb-2">H+ Zone</div>
                    <div className="flex gap-1">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full border border-rose-500/50 flex items-center justify-center text-rose-500 text-xs">+</div>
                        ))}
                    </div>
                    <div className="text-rose-500/50 text-[10px] uppercase mt-2 tracking-widest">Positive Charge</div>
                </div>

                {/* Flow Arrow */}
                <div className="flex-1 px-4 flex justify-center opacity-30">
                    <div className="h-px w-full bg-gradient-to-r from-rose-500/50 to-cyan-400/50" />
                </div>

                {/* EZ Side (Negative) */}
                <div className="flex flex-col items-center">
                    <div className="text-cyan-400 font-bold text-xl mb-2">EZ Layer</div>
                    <div className="flex gap-1">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 text-xs">-</div>
                        ))}
                    </div>
                    <div className="text-cyan-500/50 text-[10px] uppercase mt-2 tracking-widest">Negative Charge</div>
                </div>
            </div>
            {/* Battery Body Outline Hint */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-16 bg-white/5 rounded-r-md border-y border-r border-white/10" />
        </div>
    );
};


export default function EZWaterPage() {
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "EZ Water – The Fourth Phase of Water",
        "description": "EZ Water is a structured, gel-like layer of water acts as a natural battery.",
        "author": { "@type": "Organization", "name": "Andara Ionic" }
    };

    return (
        <StandardPageLayout
            title="EZ Water: The Fourth Phase"
            subtitle="Most people learn water has three states. Research suggests a fourth."
            seoTitle="EZ Water – The Fourth Phase of Water | Andara Science"
            seoDescription="Discover EZ Water (Exclusion Zone), the hidden fourth phase of water. A structured, gel-like layer formed by light and surfaces that acts like a natural battery."
            heroVariant="cyan"
            heroIcon={Droplets}
            backgroundElement={<VideoBackground keywords={["ez water", "structure", "hexagonal", "blue", "pure"]} overlayOpacity={0.3} />}
            badges={[{ text: "Advanced Water Physics" }]}
            extraHead={<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />}
        >
            {/* SCROLL ANIMATION: EZ GROWTH */}
            <div className="relative z-0">
                <EzWaterScrollAnimation />
            </div>

            {/* INTRO: The Conflict */}
            <section className="py-20 bg-[#020617] text-white">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <FadeIn>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-slate-300 mb-8">
                            Solid, Liquid, Vapor... and <span className="text-cyan-400 font-medium">Liquid Crystal.</span>
                        </p>
                        <div className="py-6 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                            </div>
                            <span className="relative bg-[#020617] px-4 text-cyan-400 font-display italic text-lg">The "Exclusion Zone" (EZ)</span>
                        </div>
                        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            It forms next to hydrophilic surfaces. It pushes out toxins ("excludes" them). It holds a negative charge. It is the battery of life.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* 1. WHAT IS EZ WATER? */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-6xl mx-auto">
                    <StaggerContainer>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="text-cyan-500 font-mono text-sm mb-4">01. DEFINITION</div>
                                <h2 className="text-3xl md:text-4xl font-display text-white mb-6">Order from Chaos</h2>
                                <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                                    EZ Water is water that has organized itself into sheets of hexagons, similar to a honeycomb.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    {[
                                        "Structured: Repeating hexagonal geometry.",
                                        "Charged: Carries a net negative charge.",
                                        "Pure: Pushes out (excludes) solutes and dirt.",
                                        "Viscous: Behaves like a gel, not a liquid."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-400">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <CrowdVsDancersVisual />
                            </div>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* 2. THE RECIPE */}
            <section className="py-24 bg-[#020617] relative overflow-hidden">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <StaggerContainer>
                        <h2 className="text-3xl md:text-5xl font-display text-white mb-12">How It Forms</h2>

                        <div className="flex flex-wrap justify-center items-center gap-4 text-white font-mono text-lg md:text-xl mb-16">
                            <span className="px-6 py-3 rounded-xl bg-white/5 border border-white/10">Hydrophilic Surface</span>
                            <span className="text-slate-500">+</span>
                            <span className="px-6 py-3 rounded-xl bg-white/5 border border-white/10">Water</span>
                            <span className="text-slate-500">+</span>
                            <span className="px-6 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-200">Light (IR)</span>
                            <span className="text-cyan-500">=</span>
                            <span className="px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]">EZ Layer</span>
                        </div>

                        <div className="text-left w-full max-w-3xl mx-auto">
                            <h3 className="text-xl font-bold text-white mb-6 text-center">Result: A Water Battery</h3>
                            <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-cyan-500/20">
                                <SmartVideoEmbed
                                    keywords={['ez water', 'fourth phase', 'hexagonal', 'exclusion zone']}
                                    className="w-full aspect-video"
                                    caption="Visualizing the charge separation of EZ water layers."
                                />
                            </div>
                            <p className="text-center text-slate-400 text-sm mt-6">
                                This charge separation (Negative EZ vs Positive Bulk) creates a proton gradient—potential energy available for work.
                            </p>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* 3. NATURE & MINERALS */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-display text-white mb-6">Nature's Technology</h2>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                Nature uses EZ water everywhere. The water inside your cells is largely EZ. Blood flow is aided by EZ layers lining blood vessels.
                            </p>
                            <div className="p-6 bg-emerald-900/10 border border-emerald-500/20 rounded-xl">
                                <Mountain className="w-6 h-6 text-emerald-400 mb-3" />
                                <h4 className="font-bold text-white mb-2">Natural Springs</h4>
                                <p className="text-xs text-slate-400">
                                    Deep underground, water is squeezed through mineral layers under pressure. This is a massive EZ-generating machine.
                                </p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-display text-white mb-6">The Mineral Key</h2>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                You cannot build a stable structure without a scaffold. <span className="text-cyan-400 font-bold">Ionic minerals</span> provide the electrostatic anchor points that allow water to organize.
                            </p>
                            <div className="p-6 bg-indigo-900/10 border border-indigo-500/20 rounded-xl">
                                <Zap className="w-6 h-6 text-indigo-400 mb-3" />
                                <h4 className="font-bold text-white mb-2">Sulfate's Role</h4>
                                <p className="text-xs text-slate-400">
                                    Sulfate is a particularly powerful "structure maker" (kosmotrope) in water, helping to stabilize these ordered layers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3.5 RELATED SCIENCE LINKS */}
            <section className="py-20 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-display text-white mb-4">Deep Dive: EZ Mechanics</h2>
                        <p className="text-slate-400">Related topics in the Andara Science Library.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { title: "Hydration Clusters", url: "/hydration-clusters-microstructure", desc: "Microstructure" },
                            { title: "Proton Gradients", url: "/proton-gradients-energy-transfer", desc: "Energy Flow" },
                            { title: "Sulfate Chemistry", url: "/sulfate-chemistry", desc: "The Architect" },
                        ].map((link, i) => (
                            <Link key={i} href={link.url}>
                                <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-900/10 transition-all cursor-pointer group">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors">{link.title}</span>
                                        <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                                    </div>
                                    <span className="text-xs text-slate-500">{link.desc}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. SHOP CTA */}
            <BundleCTA className="border-t border-white/5 bg-[#020617]" />

            {/* Links */}
            <section className="py-20 bg-[#05060b] border-t border-white/5 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-2xl font-display text-white mb-8">Continuing the Science</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/science/water-science">
                            <Button variant="outline" className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-950">
                                Water Science Index
                            </Button>
                        </Link>
                        <Link href="/bioelectricity">
                            <Button variant="outline" className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-950">
                                Bioelectricity & EZ
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

        </StandardPageLayout>
    );
}
