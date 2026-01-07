import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { Link } from "wouter";
import {
    Mountain,
    ArrowRight,
    HelpCircle,
    FlaskConical,
    Hexagon,
    Shield,
    Sprout
} from "lucide-react";

export default function TerrainConceptsPage() {
    return (
        <StandardPageLayout
            title={<>Terrain <span className="text-cyan-400">Concepts</span></>}
            subtitle={<>The Ecosystem is Everything.<br />Pasteur vs Béchamp.</>}
            
            heroVariant="emerald"
            heroIcon={Sprout}
            badges={[{ text: "The Environment Model", icon: Mountain }]}
            seoTitle="Terrain Concepts: Water, Minerals, Charge & Coherence — Andara Environment Model"
            seoDescription="Learn Andara’s terrain concepts: the body and life systems as environments shaped by water context, ionic minerals, interfaces, gradients, and coherence. Understand why consistency matters."
            relatedLinks={[
                { title: "Inner Ecosystem", url: "/terrain-concepts-inner-ecosystem", type: "internal" },
                { title: "Bioelectric Water", url: "/bioelectric-water", type: "internal" }
            ]}
        >
            {/* DEFINITION & COMPARISON */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-6">What "Terrain" Means</h2>
                        <p className="text-white/70 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
                            Terrain is the total environment context (water, mineral, electrical) in which life expresses.
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="bg-[#0b1020] p-8 rounded-2xl border border-white/5 opacity-70 hover:opacity-100 transition-opacity">
                            <span className="text-red-400 text-xs font-bold uppercase tracking-widest block mb-4">Old Thinking</span>
                            <h3 className="text-white font-bold mb-4">Single-Cause Thinking</h3>
                            <ul className="space-y-3 text-white/50 text-sm">
                                <li className="flex gap-2"><span className="text-red-400/50">•</span> "What is the one magic ingredient?"</li>
                                <li className="flex gap-2"><span className="text-red-400/50">•</span> Chasing symptoms individually.</li>
                                <li className="flex gap-2"><span className="text-red-400/50">•</span> Changing variables constantly.</li>
                            </ul>
                        </div>

                        <div className="bg-[#0b1020] p-8 rounded-2xl border border-cyan-500/20 relative overflow-hidden shadow-lg shadow-cyan-500/5">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
                            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-4">Andara Method</span>
                            <h3 className="text-white font-bold mb-4">Terrain Thinking</h3>
                            <ul className="space-y-3 text-white/70 text-sm">
                                <li className="flex gap-2"><span className="text-cyan-400">•</span> "What is the environment pattern?"</li>
                                <li className="flex gap-2"><span className="text-cyan-400">•</span> Stabilizing the whole context.</li>
                                <li className="flex gap-2"><span className="text-cyan-400">•</span> Consistency improves interpretation.</li>
                            </ul>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* THE 5 LAYERS STACK */}
            <section className="py-24 bg-[#020617] relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-12 text-center">The Andara Terrain Stack</h2>
                    </FadeIn>

                    <StaggerContainer className="space-y-4">
                        {/* Layer 1 */}
                        <div className="bg-[#0b1020] rounded-xl border border-white/5 flex flex-col md:flex-row gap-6 p-6 items-center md:items-start group hover:border-cyan-500/30 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20 text-cyan-400 font-bold">1</div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-white font-bold text-lg mb-1">Water <span className="text-white/30 text-xs font-normal uppercase ml-2">Carrier Medium</span></h3>
                                <p className="text-white/60 text-sm mb-3">The stage on which everything moves.</p>
                                <Link href="/science/bioelectric-water" className="text-xs text-cyan-400 hover:text-white inline-flex items-center gap-1">
                                    Explore Water <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>

                        {/* Layer 2 */}
                        <div className="bg-[#0b1020] rounded-xl border border-white/5 flex flex-col md:flex-row gap-6 p-6 items-center md:items-start group hover:border-cyan-500/30 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20 text-cyan-400 font-bold">2</div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-white font-bold text-lg mb-1">Minerals <span className="text-white/30 text-xs font-normal uppercase ml-2">Ionic Context</span></h3>
                                <p className="text-white/60 text-sm mb-3">Ions participate in the charge environment.</p>
                                <Link href="/science/ionic-vs-colloidal-vs-solid" className="text-xs text-cyan-400 hover:text-white inline-flex items-center gap-1">
                                    Explore Minerals <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>

                        {/* Layer 3 */}
                        <div className="bg-[#0b1020] rounded-xl border border-white/5 flex flex-col md:flex-row gap-6 p-6 items-center md:items-start group hover:border-cyan-500/30 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20 text-cyan-400 font-bold">3</div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-white font-bold text-lg mb-1">Interfaces <span className="text-white/30 text-xs font-normal uppercase ml-2">Structure</span></h3>
                                <p className="text-white/60 text-sm mb-3">Boundaries stabilize gradients and organize hydration.</p>
                                <Link href="/science/water-structure" className="text-xs text-cyan-400 hover:text-white inline-flex items-center gap-1">
                                    Explore Interfaces <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>

                        {/* Layer 4 */}
                        <div className="bg-[#0b1020] rounded-xl border border-white/5 flex flex-col md:flex-row gap-6 p-6 items-center md:items-start group hover:border-cyan-500/30 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20 text-cyan-400 font-bold">4</div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-white font-bold text-lg mb-1">Gradients <span className="text-white/30 text-xs font-normal uppercase ml-2">Direction</span></h3>
                                <p className="text-white/60 text-sm mb-3">The "where and why" of movement.</p>
                                <Link href="/science/proton-gradients-energy-transfer" className="text-xs text-cyan-400 hover:text-white inline-flex items-center gap-1">
                                    Explore Gradients <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>

                        {/* Coherence Overlay */}
                        <div className="p-8 mt-8 border border-cyan-500/30 bg-cyan-500/5 rounded-2xl flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                            <div className="w-12 h-12 rounded-full bg-cyan-500 text-[#020617] flex items-center justify-center shrink-0 font-bold shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                                <Hexagon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-cyan-400 font-bold text-lg mb-2">The Goal: Coherence</h3>
                                <p className="text-white/70 text-sm mb-4">
                                    Can the system maintain a stable pattern long enough to be meaningful? Without coherence, interpretation is just noise.
                                </p>
                                <Link href="/getting-started-first-7-days" className="text-xs font-bold text-white bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 rounded-lg transition-colors border border-cyan-500/20">
                                    7-Day Stability Protocol
                                </Link>
                            </div>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* ANDARA CONNECTION */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <FadeIn className="flex-1">
                        <h2 className="text-3xl font-display text-white mb-6">Structuring the Terrain</h2>
                        <p className="text-white/60 mb-6">
                            Andara Ionic acts as the <span className="text-cyan-400">Layer 2 (Mineral)</span> context. It provides ionic consistency so the rest of the terrain (water, gradients) can stabilize.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/andara-dilution-calculator" className="px-5 py-2.5 bg-white/10 rounded-lg text-white text-sm font-bold hover:bg-white/20 transition-colors flex items-center gap-2">
                                <FlaskConical className="w-4 h-4" /> Use Calculator
                            </Link>
                            <Link href="/concepts/terrain-maps" className="px-5 py-2.5 border border-white/10 rounded-lg text-white text-sm font-bold hover:border-white/30 transition-colors">
                                See Bioelectric Maps
                            </Link>
                        </div>
                    </FadeIn>
                    <FadeIn className="flex-1">
                        <div className="bg-[#0b1020] p-8 rounded-2xl border border-white/5">
                            <h3 className="text-white font-bold mb-4">The Andara Method</h3>
                            <ol className="space-y-4 text-sm text-white/70 mb-6">
                                <li className="flex gap-3"><span className="text-cyan-400 font-bold">1.</span> <span className="text-white">Lock Bassline.</span> Pick one water source.</li>
                                <li className="flex gap-3"><span className="text-cyan-400 font-bold">2.</span> <span className="text-white">Use Recipe.</span> Don't guess.</li>
                                <li className="flex gap-3"><span className="text-cyan-400 font-bold">3.</span> <span className="text-white">Observe.</span> Watch for stability first.</li>
                            </ol>
                            <Link href="/getting-started-first-7-days" className="text-xs font-bold text-cyan-400 hover:text-white underline decoration-dashed">
                                Start Here
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#020617] relative z-10">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Terrain FAQ</h2>
                    <div className="space-y-6">
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                Is terrain a medical theory?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">Andara uses terrain as an education-first environment framework and does not present it as medical advice.</p>
                        </div>
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                Why does Andara talk about ions so much?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">Because ions act as charge carriers and help define conductivity and gradient context in water environments.</p>
                        </div>
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                Where should I go next?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">Read Voltage & Detox Pathways for a conceptual map, and the Bioelectricity hub for the full pillar overview.</p>
                        </div>
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                How do I apply terrain thinking to Andara Ionic?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">Use consistency: calculator-based dosing and a stable 7-day window before refining gently.</p>
                        </div>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
