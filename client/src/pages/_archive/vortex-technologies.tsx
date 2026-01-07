import React from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { BackgroundLayer } from "@/components/visuals/BackgroundLayer";
import { SmartImage } from "@/components/ui/SmartImage";
import {
    RotateCw,
    HelpCircle,
    Wind,
    Waves,
    Activity,
    Thermometer,
    Droplets,
    Zap,
    Layers,
    Cpu
} from "lucide-react";

export default function VortexTechnologiesPage() {

    // --- JSON-LD Call ---
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is a water vortex?",
                "acceptedAnswer": { "@type": "Answer", "text": "A rotational flow pattern where water spins around a central axis, creating shear layers and strong interface dynamics." }
            },
            {
                "@type": "Question",
                "name": "Does vortexing change EC/TDS?",
                "acceptedAnswer": { "@type": "Answer", "text": "Usually EC/TDS stays similar unless evaporation, contamination, or measurement artifacts occur." }
            },
            {
                "@type": "Question",
                "name": "Why does vortexing change ORP?",
                "acceptedAnswer": { "@type": "Answer", "text": "Because vortexing changes dissolved gas exchange and can shift temperature slightly, both of which affect ORP readings." }
            },
            {
                "@type": "Question",
                "name": "Why does vortexed water sometimes look cloudy?",
                "acceptedAnswer": { "@type": "Answer", "text": "Micro-bubbles and suspended particles scatter light; the water can look hazy and then clear as bubbles escape and particles settle." }
            }
        ]
    };

    return (
        <StandardPageLayout
            title={<>Vortex <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-500">Technologies</span></>}
            subtitle={<>Spin, Flow & Velocity Gradients.<br />Mechanics of the Vortex Interface.</>}
            
            heroVariant="blue"
            heroIcon={RotateCw}
            badges={[{ text: "Spin Dynamics", icon: Wind }]}
            seoTitle="Water Vortex: Technologies & Spin Dynamics"
            seoDescription="Learn about vortex technologies and how spin and flow change water interfaces, gas exchange, and suspension dynamics."
            extraHead={
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            }
        >

            {/* SECTION 1: DEFINITIONS & MECHANISMS */}
            <section className="py-24 bg-[#05060b] relative overflow-hidden">
                <BackgroundLayer  opacity={10} />
                <div className="container px-4 max-w-4xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-display text-white mb-6">The Nature of Spin</h2>
                            <p className="text-white/70 mb-8 leading-relaxed">
                                A water vortex is one of the simplest ways to introduce a strong, repeatable flow boundary. It's an organized rotational pattern that creates velocity gradients and shear layers—changing how water interacts with its container and the air.
                            </p>

                            <div className="space-y-4">
                                <div className="andara-glass-panel p-5 border-l-2 border-emerald-500 flex items-start gap-4">
                                    <Layers className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <strong className="block text-white text-sm mb-1">Interface Reorganization</strong>
                                        <p className="text-white/60 text-xs">Strong flow boundaries form at the wall and center.</p>
                                    </div>
                                </div>

                                <div className="andara-glass-panel p-5 border-l-2 border-amber-500 flex items-start gap-4">
                                    <Wind className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <strong className="block text-white text-sm mb-1">Gas Exchange</strong>
                                        <p className="text-white/60 text-xs">Accelerates CO₂/O₂ exchange, driving pH & ORP drift.</p>
                                    </div>
                                </div>

                                <div className="andara-glass-panel p-5 border-l-2 border-cyan-500 flex items-start gap-4">
                                    <Waves className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <strong className="block text-white text-sm mb-1">Suspension Dynamics</strong>
                                        <p className="text-white/60 text-xs">Suspends particles or releases bubbles, changing clarity.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square rounded-full relative overflow-hidden border border-white/10 bg-[#0b1020]/50 flex items-center justify-center group">
                                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-50" />
                                <SmartImage  className="w-[80%] h-[80%] opacity-80 mix-blend-screen animate-[spin_60s_linear_infinite]" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-12 pointer-events-none z-10">
                                    <div className="text-center">
                                        <span className="text-cyan-300 text-[10px] font-bold uppercase tracking-widest block mb-1">Top</span>
                                        <span className="text-white/60 text-xs">Max Air Interface</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-blue-300 text-[10px] font-bold uppercase tracking-widest block mb-1">Center</span>
                                        <span className="text-white/60 text-xs">Velocity Gradient</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-purple-300 text-[10px] font-bold uppercase tracking-widest block mb-1">Bottom</span>
                                        <span className="text-white/60 text-xs">Shear Point</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: MEASURABLE LENS */}
            <section className="py-24 bg-[#020617]">
                <div className="container px-4 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-4 text-center">What Changes?</h2>
                    <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
                        Understanding the "spin signature".
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Link href="/conductivity-tds-water">
                            <div className="p-6 bg-[#0b1020] rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all h-full group cursor-pointer text-center md:text-left">
                                <Activity className="w-8 h-8 text-cyan-400 mb-4 mx-auto md:mx-0 group-hover:scale-110 transition-transform" />
                                <h3 className="text-white font-bold mb-2">EC/TDS</h3>
                                <p className="text-white/60 text-xs mb-4">Usually stable. If it creates foam, readings might jump.</p>
                            </div>
                        </Link>
                        <Link href="/ph-balance-water">
                            <div className="p-6 bg-[#0b1020] rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all h-full group cursor-pointer text-center md:text-left">
                                <Thermometer className="w-8 h-8 text-amber-400 mb-4 mx-auto md:mx-0 group-hover:scale-110 transition-transform" />
                                <h3 className="text-white font-bold mb-2">pH Shift</h3>
                                <p className="text-white/60 text-xs mb-4">Sensitive to CO₂ exchange. Vortexing often drives off CO₂.</p>
                            </div>
                        </Link>
                        <Link href="/orp-redox-water">
                            <div className="p-6 bg-[#0b1020] rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all h-full group cursor-pointer text-center md:text-left">
                                <Zap className="w-8 h-8 text-purple-400 mb-4 mx-auto md:mx-0 group-hover:scale-110 transition-transform" />
                                <h3 className="text-white font-bold mb-2">ORP Context</h3>
                                <p className="text-white/60 text-xs mb-4">Highly sensitive to oxygenation. Expect drift vs still water.</p>
                            </div>
                        </Link>
                        <Link href="/science/turbidity-clarity-flocculation">
                            <div className="p-6 bg-[#0b1020] rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all h-full group cursor-pointer text-center md:text-left">
                                <Droplets className="w-8 h-8 text-blue-400 mb-4 mx-auto md:mx-0 group-hover:scale-110 transition-transform" />
                                <h3 className="text-white font-bold mb-2">Clarity</h3>
                                <p className="text-white/60 text-xs mb-4">Micro-bubbles often mimic haze. Watch the clearing time.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* PRACTICAL APPLICATION */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative overflow-hidden">
                <BackgroundLayer  opacity={20} />
                <div className="container px-4 max-w-4xl mx-auto relative z-10">
                    <div className="andara-glass-card p-8 md:p-12 relative">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl md:text-3xl font-display text-white">Practical Integration</h2>
                            <div className="px-3 py-1 rounded bg-white/10 border border-white/10 text-xs font-mono text-white/70">
                                Daily Use
                            </div>
                        </div>

                        <p className="text-white/70 mb-8 max-w-2xl">
                            Vortexing prepares water for optimal biology. Here is why we do it.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <Cpu className="w-4 h-4 text-cyan-400" /> The Core Shift
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <div className="w-6 h-6 rounded bg-[#222] flex items-center justify-center text-[10px] text-white font-bold border border-white/10 shrink-0">1</div>
                                        <div>
                                            <strong className="block text-white text-sm">Degassing & Volatiles</strong>
                                            <span className="text-white/50 text-xs">Vortexing drives off standard chlorine and dissolved CO₂, stabilizing pH.</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold shrink-0">2</div>
                                        <div>
                                            <strong className="block text-white text-sm">Coherent Structure</strong>
                                            <span className="text-white/50 text-xs">Shear forces align molecules, improving hydration efficiency (EZ layers).</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-[10px] text-black font-bold shrink-0">3</div>
                                        <div>
                                            <strong className="block text-white text-sm">Texture & Palatability</strong>
                                            <span className="text-white/50 text-xs">The "silky" mouthfeel is measurable surface tension change.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                                <h3 className="font-bold text-white mb-4">Immediate Signs</h3>
                                <div className="space-y-3">
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between">
                                        <div>
                                            <span className="text-cyan-400 text-xs uppercase font-bold block">Aeration Haze</span>
                                            <span className="text-white/50 text-[10px]">Micro-bubbles (not dirt)</span>
                                        </div>
                                        <span className="text-white/30 text-[10px] font-mono">0-30s</span>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between">
                                        <div>
                                            <span className="text-blue-400 text-xs uppercase font-bold block">Cooling Effect</span>
                                            <span className="text-white/50 text-[10px]">Implosion physics</span>
                                        </div>
                                        <span className="text-white/30 text-[10px] font-mono">-1°C</span>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between">
                                        <div>
                                            <span className="text-amber-400 text-xs uppercase font-bold block">Mineral Lift</span>
                                            <span className="text-white/50 text-[10px]">Even distrubution</span>
                                        </div>
                                        <span className="text-white/30 text-[10px] font-mono">Stable</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Common Questions</h2>
                    <div className="space-y-4">
                        {faqSchema.mainEntity.map((item, i) => (
                            <div key={i} className="andara-glass-panel p-6">
                                <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                    <HelpCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
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
