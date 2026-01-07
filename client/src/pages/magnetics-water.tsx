import React, { useRef } from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { ScrollProgress } from "@/components/plugins/ScrollProgress";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { MagneticFlowDiagram } from "@/components/diagrams/MagneticFlowDiagram";
import { MagneticScrollAnimation } from "@/components/visuals/MagneticScrollAnimation";
import { FlipCard3D } from "@/components/visuals/motion-lab/FlipCard3D";
import { BundleCTA } from "@/components/shop/BundleCTA";
import { Link } from "wouter";
import {
    Magnet,
    Zap,
    Waves,
    Activity,
    Layers,
    ArrowRight,
    HelpCircle,
    Music,
    Train
} from "lucide-react";

export default function MagneticsWaterPage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Magnetics & Water: How Fields Nudge Structure",
        "description": "Understand how magnetic fields influence water structure, flow, and mineral organization without the mystical claims."
    };

    return (
        <StandardPageLayout
            title={<>Magnetics & <span className="text-purple-400">Water</span></>}
            subtitle={<>How invisible fields gently nudge structure and flow.<br /><span className="text-purple-400/80">Ions in motion respond to lines of force.</span></>}
            registryId="magnetic-flux"
            heroVariant="purple"
            heroIcon={Magnet}
            badges={[{ text: "Field Dynamics", icon: Magnet }]}
            seoTitle="Magnetics & Water: How Fields Nudge Structure | Andara Ionic"
            seoDescription="Understand how magnetic fields influence water structure, flow, and mineral organization without the mystical claims. A grounded look at ions in motion."
            extraHead={
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            }
        >
            <ScrollProgress />

            {/* SCROLL ANIMATION: MAGNETIC ALIGNMENT */}
            <div className="relative z-0">
                <MagneticScrollAnimation />
            </div>

            {/* INTRO SECTION */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-8">Water Flows through Fields</h2>
                        <p className="text-slate-300 leading-relaxed mb-12 max-w-2xl mx-auto">
                            Most people think of magnets pulling metal across a table. But water also lives inside fields—magnetic, electric, gravitational.
                            <br /><br />
                            Water isn't a metal bar, but it carries <strong>dissolved ions</strong> (charged particles) that dance when they move through these invisible lines of force.
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <FlipCard3D
                            title="Myth: Magic Cure"
                            subtitle="Magnets don't erase matter."
                            backTitle="Physics: Alignment"
                            backContent="Magnetic fields don't remove minerals. They align the charge distribution (dipole) of ions, changing how they interact and crystallize."
                        />
                        <FlipCard3D
                            title="Myth: Infinite Energy"
                            subtitle="It doesn't add free energy."
                            backTitle="Physics: Coherence"
                            backContent="The field organizes the existing energy (thermal motion) into coherent vectors. It's about order, not adding 'new' energy."
                        />
                    </StaggerContainer>
                </div>
            </section>

            {/* 1. VISUALIZATION & ANALOGY */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-6xl mx-auto">

                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* LEFT: CONCEPTUAL */}
                        <FadeIn>
                            <h2 className="text-4xl font-display text-white mb-6">Visualizing the Effect</h2>
                            <div className="prose prose-invert text-slate-300 mb-8">
                                <p className="text-lg leading-relaxed">
                                    You don't need a lab to understand this. In a normal pipe, ions tumble chaotically like a crowd rushing for a door.
                                </p>
                                <p>
                                    When a magnetic field is applied, the <strong>"Lorentz Force"</strong> acts on these moving charges, nudging them into specific paths—turning the crowd into a marching line.
                                </p>
                            </div>

                            {/* TRAIN ANALOGY CARD */}
                            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#0f172a] border border-white/10 p-1">
                                <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="relative bg-[#05060b]/80 backdrop-blur-sm p-8 rounded-xl h-full">
                                    <div className="flex items-start gap-6">
                                        <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-purple-500/30 group-hover:bg-purple-900/10 transition-colors">
                                            <Train className="w-7 h-7 text-slate-400 group-hover:text-purple-400 transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-200 transition-colors">The Train Track Analogy</h3>
                                            <p className="text-sm text-slate-400 leading-relaxed mb-4">
                                                Imagine water ions as tiny trains carrying charge. The water pipe is the track.
                                            </p>
                                            <p className="text-sm text-purple-200/80 border-l-2 border-purple-500/30 pl-4 py-1">
                                                Magnetic fields act like <strong>force fields along the rails</strong>, keeping the trains moving smoothly instead of derailing (forming scale).
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* RIGHT: INTERACTIVE DIAGRAM */}
                        <FadeIn delay={0.2}>
                            <div className="relative">
                                {/* Decorative Glow */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-20" />
                                <MagneticFlowDiagram />
                            </div>
                        </FadeIn>

                    </div>
                </div>
            </section>

            {/* 3. MICROSTRUCTURE & SCALE */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-display text-white mb-6">What We Can Really Say</h2>
                    <p className="text-slate-300 mb-12 max-w-2xl mx-auto">
                        Magnetic fields don't remove minerals or cure diseases. But in engineering, they are a valid tool for influencing <strong>crystal formation</strong> and <strong>flow patterns</strong>.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        {/* Limescale Logic */}
                        <div className="p-8 bg-[#0b1020] rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
                                <Layers className="w-5 h-5 text-purple-400" />
                                Scale Control
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Hard water minerals (Ca, Mg) want to crystallize into hard scale. Magnetic treatment can influence crystal shape, often making deposits softer and less adherent, effectively reducing "scale build-up" without removing the healthy minerals.
                            </p>
                        </div>

                        {/* Microstructure Logic */}
                        <div className="p-8 bg-[#0b1020] rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
                                <Activity className="w-5 h-5 text-purple-400" />
                                Coherence Support
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                While not a "magic wand," magnetic fields add another layer of order. Combined with surfaces and minerals, they help support the conditions where stable, structured water domains are more likely to form.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. INTEGRATED PROTOCOL */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10 overflow-hidden">
                {/* Background Context */}
                <div className="absolute inset-0 bg-purple-900/5" />

                <div className="container px-4 max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-display text-white mb-4">The Andara Integration</h2>
                        <p className="text-lg text-purple-200/60 max-w-xl mx-auto">
                            "Andara provides the chemistry (the instrument). Flows and fields provide the rhythm and acoustics."
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-slate-800 via-purple-500/50 to-cyan-500/50 -translate-y-1/2 z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            {/* Step 1 */}
                            <div className="relative group">
                                <div className="bg-[#0b1020] border border-white/10 rounded-2xl p-8 relative z-10 h-full hover:border-white/20 transition-all shadow-2xl">
                                    <div className="text-xs font-mono text-slate-500 mb-4 bg-slate-900/50 inline-block px-2 py-1 rounded">STEP 01</div>
                                    <h3 className="text-xl font-bold text-white mb-2">Condition</h3>
                                    <div className="h-1 w-12 bg-slate-700 mb-4" />
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        Add <strong>Ionic Minerals</strong> to chaotic bulk water. This provides the raw conductive material (electrolytes) needed for the field to act upon.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-b from-purple-500/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="bg-[#0f172a] border border-purple-500/30 rounded-2xl p-8 relative z-10 h-full shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="text-xs font-mono text-purple-400 bg-purple-900/20 inline-block px-2 py-1 rounded">STEP 02</div>
                                        <Magnet className="text-purple-400 w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Field Shape</h3>
                                    <div className="h-1 w-12 bg-purple-500 mb-4" />
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        Pass the mineralized water through a <strong>Magnetic or PEMF field</strong>. The ions align ("Lorentz Force"), breaking up clumps and softening the texture.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative group">
                                <div className="bg-[#0b1020] border border-white/10 rounded-2xl p-8 relative z-10 h-full hover:border-cyan-500/20 transition-all shadow-2xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="text-xs font-mono text-cyan-500 bg-cyan-900/20 inline-block px-2 py-1 rounded">STEP 03</div>
                                        <Music className="text-cyan-500 w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Coherence</h3>
                                    <div className="h-1 w-12 bg-cyan-500 mb-4" />
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        The result is ordered, structured, and <strong>bio-available</strong> hydration. Ready to drink, with a smoothness you can taste.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ / HONESTY */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                What We Can Say
                            </h3>
                            <ul className="space-y-4 text-sm text-slate-300">
                                <li className="flex gap-3">
                                    <ArrowRight className="w-4 h-4 text-slate-500 mt-0.5" />
                                    <span>Fields influence how ions move and settle (scale control).</span>
                                </li>
                                <li className="flex gap-3">
                                    <ArrowRight className="w-4 h-4 text-slate-500 mt-0.5" />
                                    <span>Magnetic forces can nudge the formation of water clusters.</span>
                                </li>
                                <li className="flex gap-3">
                                    <ArrowRight className="w-4 h-4 text-slate-500 mt-0.5" />
                                    <span>It is a standard engineering tool in fluid dynamics.</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                What We Do Not Say
                            </h3>
                            <ul className="space-y-4 text-sm text-slate-300">
                                <li className="flex gap-3">
                                    <ArrowRight className="w-4 h-4 text-slate-500 mt-0.5" />
                                    <span>"Magnets cure disease."</span>
                                </li>
                                <li className="flex gap-3">
                                    <ArrowRight className="w-4 h-4 text-slate-500 mt-0.5" />
                                    <span>"Magnetized water changes your DNA instantly."</span>
                                </li>
                                <li className="flex gap-3">
                                    <ArrowRight className="w-4 h-4 text-slate-500 mt-0.5" />
                                    <span>"It replaces the need for filtration or minerals."</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. SHOP INTEGRATION */}
            <BundleCTA className="border-t border-white/5 bg-[#0b1020]" />

            {/* SUMMARY NAVIGATION */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-display text-white mb-6">Explore the Science</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/science/vortexing-spirals-flow-coherence" className="p-4 rounded-xl border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-left">
                            <span className="block text-xs text-slate-500 mb-1">Previous Topic</span>
                            <span className="block text-white font-bold">&larr; Vortexing & Flow</span>
                        </Link>
                        <Link href="/science/sulfur-springs-tradition" className="p-4 rounded-xl border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all text-left group cursor-not-allowed opacity-50">
                            <span className="block text-xs text-slate-500 mb-1 group-hover:text-purple-400">Coming Soon</span>
                            <span className="block text-white font-bold">Natural Springs & Earth</span>
                        </Link>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
