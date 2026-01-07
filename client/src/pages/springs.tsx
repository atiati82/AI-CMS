import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { Droplets, Mountain, Layers, Thermometer, ArrowRight, Waves, TestTube, Scale, ShieldCheck } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";

export default function SpringsPage() {
    useScrollTop();

    return (
        <StandardPageLayout
            title={<>Natural Springs: <span className="text-emerald-400">Templates for Living Water</span></>}
            subtitle="Underground Journeys, Minerals & Flow"
            seoTitle="Natural Springs – Templates for Living Water"
            seoDescription="Discover how natural springs shape water through geology, minerals, flow and time. Learn why springs are living templates for water quality and design."
            vibeKeywords={['Template', 'Journey', 'Emergence']}
            seoKeywords={[
                "natural springs water",
                "living spring water",
                "natural spring template",
                "spring water geology minerals",
                "structured spring water",
                "spring emergence and flow",
                "volcanic and mineral springs",
                "sulfur springs tradition"
            ]}
        >
            <div className="container mx-auto px-4 py-12 space-y-20">

                {/* 1. HERO CONTEXT: THE UNDERGROUND STORY */}
                <section className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl text-emerald-400 font-display tracking-tight leading-tight">
                            Not Just a Hole, But a <br /> <span className="text-white">Living Template</span>
                        </h2>
                        <p className="text-xl text-slate-300 leading-relaxed font-light">
                            Before water ever meets a pipe or bottle, it has lived an entire story in the Earth. Natural springs are where this story becomes visible: a convergence of rock layers, minerals, pressure, and time. We study them not to copy them blindly, but to understand the principles of living water.
                        </p>
                    </div>

                    {/* Features of Healthy Springs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl group hover:border-emerald-500/20 transition-colors">
                            <Layers className="w-8 h-8 text-emerald-400 mx-auto mb-4 group-hover:text-emerald-300 transition-colors" />
                            <h3 className="text-lg text-white font-medium mb-2">Filtration</h3>
                            <p className="text-sm text-slate-400">Slow percolation through soil and rock layers.</p>
                        </div>
                        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl group hover:border-emerald-500/20 transition-colors">
                            <Mountain className="w-8 h-8 text-stone-400 mx-auto mb-4 group-hover:text-stone-300 transition-colors" />
                            <h3 className="text-lg text-white font-medium mb-2">Mineral Contact</h3>
                            <p className="text-sm text-slate-400">Picking up tailored fingerprints of the terrain.</p>
                        </div>
                        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl group hover:border-emerald-500/20 transition-colors">
                            <Waves className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover:text-cyan-300 transition-colors" />
                            <h3 className="text-lg text-white font-medium mb-2">Emergence</h3>
                            <p className="text-sm text-slate-400">Movement, oxygenation, and vortex flow at the exit.</p>
                        </div>
                    </div>
                </section>

                <Separator className="bg-slate-800/50" />

                {/* 2. THE UNDERGROUND JOURNEY */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 relative h-96 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 group">
                        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 to-emerald-950/20" />

                        {/* Abstract Geological Layers Visual */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                            <div className="space-y-1">
                                <div className="h-4 w-full bg-stone-800/30 rounded-full mb-8 blur-sm" />
                                <div className="text-xs text-stone-500 font-mono mb-1">SOIL (FILTRATION)</div>
                                <div className="h-12 w-full bg-stone-800/50 rounded-lg border-t border-stone-700/50" />
                                <div className="text-xs text-stone-500 font-mono mb-1 mt-4">ROCK (MINERAL EXCHANGE)</div>
                                <div className="h-24 w-full bg-stone-900/80 rounded-lg border-t border-stone-700/50 relative overflow-hidden">
                                    {/* <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10" /> */}
                                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-500/20 blur-md transform -skew-y-3" />
                                </div>
                                <div className="text-xs text-stone-500 font-mono mb-1 mt-4">AQUIFER (RESIDENCE TIME)</div>
                            </div>
                        </div>
                        <div className="absolute bottom-4 right-4 text-xs font-mono text-emerald-500/50">FIG 7.1 // GEO-FILTRATION</div>
                    </div>

                    <div className="order-1 md:order-2 space-y-8">
                        <h2 className="text-2xl text-white font-light">The Earth's Treatment Plant</h2>
                        <p className="text-slate-300 leading-relaxed">
                            No human machine matches the complexity of Earth's own process. Inside the crust, water undergoes a slow sequence of conditioning:
                        </p>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="text-emerald-500 font-bold font-mono text-lg">01</div>
                                <div>
                                    <h4 className="text-white font-medium">Infiltration</h4>
                                    <p className="text-sm text-slate-400 mt-1">Rain enters the soil, losing surface turbulence and beginning mechanical filtration.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-emerald-500 font-bold font-mono text-lg">02</div>
                                <div>
                                    <h4 className="text-white font-medium">Residence Time</h4>
                                    <p className="text-sm text-slate-400 mt-1">Deep percolation creates pressure and temperature gradients, balancing gases and structure.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-emerald-500 font-bold font-mono text-lg">03</div>
                                <div>
                                    <h4 className="text-white font-medium">Mineral Exchange</h4>
                                    <p className="text-sm text-slate-400 mt-1">Water dissolves what it touches—calcium, silica, sulfates—creating a unique mineral fingerprint.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. TYPES OF SPRINGS (INFOGRAPHIC) */}
                <section className="bg-slate-900/30 rounded-3xl p-8 md:p-12 border border-slate-800/50 space-y-12">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl text-white font-light mb-4">Every Spring Has a Character</h2>
                        <p className="text-slate-400">Springs are like mineral languages: each one speaks a different dialect of Earth chemistry.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="p-6 bg-slate-900 border-slate-800 hover:border-blue-500/30 transition-colors">
                            <Mountain className="w-6 h-6 text-blue-400 mb-4" />
                            <h4 className="text-white font-medium mb-2">Mountain Spring</h4>
                            <p className="text-xs text-slate-400 mb-4">Low TDS, oxygen-rich, cold.</p>
                            <ul className="text-xs text-slate-500 space-y-1">
                                <li>• High Resistivity</li>
                                <li>• "Light" Feeling</li>
                                <li>• Silica presence common</li>
                            </ul>
                        </Card>
                        <Card className="p-6 bg-slate-900 border-slate-800 hover:border-amber-500/30 transition-colors relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-5"><Layers className="w-24 h-24" /></div>
                            <Scale className="w-6 h-6 text-amber-400 mb-4" />
                            <h4 className="text-white font-medium mb-2">Mineral Spring</h4>
                            <p className="text-xs text-slate-400 mb-4">High TDS, heavily buffered.</p>
                            <ul className="text-xs text-slate-500 space-y-1">
                                <li>• Specific Therapeutic uses</li>
                                <li>• Calcium/Magnesium Rich</li>
                                <li>• Complex taste profiles</li>
                            </ul>
                        </Card>
                        <Card className="p-6 bg-gradient-to-br from-indigo-950/20 to-slate-900 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                            <Thermometer className="w-6 h-6 text-indigo-400 mb-4" />
                            <h4 className="text-white font-medium mb-2">Sulfur / Thermal</h4>
                            <p className="text-xs text-slate-400 mb-4">Warm, distinct aroma, bioactive.</p>
                            <ul className="text-xs text-indigo-300/60 space-y-1">
                                <li>• Volcanic origins</li>
                                <li>• Sulfate-rich (detox/transport)</li>
                                <li>• Deep Earth sources</li>
                            </ul>
                        </Card>
                    </div>
                </section>

                {/* 4. ANDARA TRANSLATION */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                    {/* Concept */}
                    <div className="space-y-6">
                        <h2 className="text-2xl text-emerald-300 font-light">Translating Spring Logic</h2>
                        <p className="text-slate-300 leading-relaxed">
                            We don't need to romanticize "pristine" water that few can access. We just need to understand the physics.
                            Andara Ionic is inspired by <strong>Volcanic Sulfate Springs</strong>. We use primordial minerals to help water perform the same functions nature intends:
                        </p>
                        <div className="space-y-4 pt-4">
                            <div className="p-4 bg-slate-800/50 rounded-lg border-l-2 border-emerald-500">
                                <h4 className="text-white text-sm font-medium">1. Clarification</h4>
                                <p className="text-xs text-slate-400 mt-1">Using minerals to bind and drop particulates (sedimentation/flocculation).</p>
                            </div>
                            <div className="p-4 bg-slate-800/50 rounded-lg border-l-2 border-emerald-500">
                                <h4 className="text-white text-sm font-medium">2. Conditioning</h4>
                                <p className="text-xs text-slate-400 mt-1">Adding ionic sulfates to establish a clean, structured baseline.</p>
                            </div>
                            <div className="p-4 bg-slate-800/50 rounded-lg border-l-2 border-emerald-500">
                                <h4 className="text-white text-sm font-medium">3. Movement</h4>
                                <p className="text-xs text-slate-400 mt-1">Encouraging spiral flow to wake up the conditioned water.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual/Design Principles */}
                    <Card className="p-8 bg-slate-900/50 border-slate-800 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                                <h3 className="text-lg text-white font-medium">Design Principles for Home</h3>
                            </div>
                            <ul className="space-y-4 text-sm text-slate-300">
                                <li className="flex gap-3 items-start">
                                    <span className="text-emerald-500">✓</span>
                                    <span><strong>Layered Filtration:</strong> Mimic soil/rock depth, don't rely on one stage.</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-emerald-500">✓</span>
                                    <span><strong>Remineralize:</strong> Don't leave water empty (0 TDS). Give it character.</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-emerald-500">✓</span>
                                    <span><strong>Vortex & Flow:</strong> Let it breathe and spin, even with a simple spoon.</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-emerald-500">✓</span>
                                    <span><strong>Terrain Thinking:</strong> Match the water to the body's needs.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                            <p className="text-xs text-slate-500 italic">
                                "The goal isn't to copy a spring perfectly, but to bring its logic into daily life."
                            </p>
                        </div>
                    </Card>
                </section>


                {/* 5. INTERNAL LINKS */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                    <Link href="/science/water-phases-structure-activation">
                        <a className="group flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-emerald-500/40 transition-all">
                            <span className="text-sm text-slate-300 group-hover:text-emerald-300">Structure & Phases</span>
                            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400" />
                        </a>
                    </Link>
                    <Link href="/science/vortexing-spirals-flow-coherence">
                        <a className="group flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500/40 transition-all">
                            <span className="text-sm text-slate-300 group-hover:text-cyan-300">Vortexing & Flow</span>
                            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400" />
                        </a>
                    </Link>
                    <Link href="/science/hydration-clusters">
                        <a className="group flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-indigo-500/40 transition-all">
                            <span className="text-sm text-slate-300 group-hover:text-indigo-300">Hydration Clusters</span>
                            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400" />
                        </a>
                    </Link>
                </section>

            </div>
        </StandardPageLayout>
    );
}
