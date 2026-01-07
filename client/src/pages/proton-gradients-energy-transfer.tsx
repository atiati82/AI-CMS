import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { Link } from "wouter";
import {
    TrendingUp,
    Zap,
    ArrowRight,
    HelpCircle,
    Activity,
    Layers,
    Battery,
    FlaskConical,
    MoveRight
} from "lucide-react";

export default function ProtonGradientsPage() {
    return (
        <StandardPageLayout
            title={<>Proton <span className="text-red-400">Gradients</span></>}
            subtitle={<>Direction comes from difference.<br />How bioelectric potential creates the hidden "pressure" for life.</>}

            heroVariant="red"
            heroIcon={TrendingUp}
            badges={[{ text: "The Engine of Life", icon: TrendingUp }]}
            seoTitle="Proton Gradients: The Hidden Engine of Energy Transfer"
            seoDescription="Learn how proton gradients create directionality and energy transfer across interfaces. This Andara education page explains gradients, membranes, and ions as context."
            relatedLinks={[
                { title: "Ion Channels", url: "/ion-channels-gradients", type: "internal" },
                { title: "Water as Carrier", url: "/bioelectric-water", type: "internal" }
            ]}
            extraHead={
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": "Proton Gradients: The Hidden Engine of Energy Transfer",
                        "description": "Learn how proton gradients create directionality and energy transfer across interfaces."
                    })
                }} />
            }
        >
            {/* DEFINITION SECTION */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-8">What Is a Proton Gradient?</h2>
                        <p className="text-white/70 text-lg leading-relaxed mb-8">
                            A gradient is not "energy" by itself—it's the structure that lets transfer happen.<br />
                            It is a <span className="text-red-400">difference in concentration</span> across an interface.
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto mt-12">
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 relative overflow-hidden group hover:border-red-500/30 transition-colors">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full pointer-events-none" />
                            <MoveRight className="w-6 h-6 text-red-400 mb-4" />
                            <h3 className="text-white font-bold mb-2 text-sm">Direction</h3>
                            <p className="text-white/50 text-xs">Without a difference (gradient), there is no flow. Gradients create the "arrow" of biological time.</p>
                        </div>

                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 relative overflow-hidden group hover:border-red-500/30 transition-colors">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full pointer-events-none" />
                            <Zap className="w-6 h-6 text-red-400 mb-4" />
                            <h3 className="text-white font-bold mb-2 text-sm">Potential</h3>
                            <p className="text-white/50 text-xs">A gradient acts like a battery. It stores potential energy that can be "tapped" for work.</p>
                        </div>

                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5 relative overflow-hidden group hover:border-red-500/30 transition-colors">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full pointer-events-none" />
                            <Activity className="w-6 h-6 text-red-400 mb-4" />
                            <h3 className="text-white font-bold mb-2 text-sm">Pressure</h3>
                            <p className="text-white/50 text-xs">Think of it as "electrical pressure." It pushes ions to move to restore balance.</p>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* INTERFACES & WATER */}
            <section className="py-24 bg-[#020617] relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <FadeIn className="flex-1">
                            <div>
                                <h2 className="text-2xl font-display text-white mb-6">Interfaces: Where Gradients Become Real</h2>
                                <p className="text-white/60 mb-6">
                                    Gradients need a boundary to exist. No interface = no separation = no gradient. This is why bioelectric water emphasizes structure at boundaries.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3 text-white/80 text-sm">
                                        <Layers className="w-4 h-4 text-red-400" /> Cell Membranes (The Gatekeepers)
                                    </li>
                                    <li className="flex items-center gap-3 text-white/80 text-sm">
                                        <Layers className="w-4 h-4 text-red-400" /> Hydration Layers (Surface Tension)
                                    </li>
                                    <li className="flex items-center gap-3 text-white/80 text-sm">
                                        <Layers className="w-4 h-4 text-red-400" /> Mineral Interfaces (Ionic Context)
                                    </li>
                                </ul>
                                <Link href="/science/water-structure" className="text-red-400 text-sm font-bold hover:text-white flex items-center gap-2">
                                    Explore Interfaces <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </FadeIn>
                        <FadeIn className="flex-1">
                            <div className="bg-[#0b1020] p-8 rounded-2xl border border-white/5">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <Battery className="w-4 h-4 text-red-400" /> The Andara Frame
                                </h3>
                                <p className="text-white/60 text-sm italic mb-6">
                                    "Life runs on relationships between states, not just substances. The proton gradient is the primary relationship of bio-energy."
                                </p>
                                <div className="space-y-3">
                                    <Link href="/bioelectricity" className="block p-3 bg-white/5 rounded-lg text-xs text-white/70 hover:bg-white/10 transition-colors">
                                        <span className="text-red-400 font-bold block mb-1">Hub Link</span>
                                        Back to Bioelectricity Overview
                                    </Link>
                                    <Link href="/science/bioelectric-water" className="block p-3 bg-white/5 rounded-lg text-xs text-white/70 hover:bg-white/10 transition-colors">
                                        <span className="text-red-400 font-bold block mb-1">Medium Link</span>
                                        Water as the Gradient Carrier
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* THE GRADIENT MAP */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-12">The Andara Gradient Map</h2>
                    </FadeIn>
                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[20px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500/0 via-red-500/50 to-red-500/0 md:left-1/2 md:-ml-px" />

                        <StaggerContainer className="space-y-12 relative z-10">

                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                                <div className="hidden md:block w-1/2 text-right text-white/50 text-sm">Step 1</div>
                                <div className="w-10 h-10 rounded-full bg-[#0b1020] border border-red-500 text-red-500 flex items-center justify-center font-bold shrink-0 z-10">1</div>
                                <div className="w-full md:w-1/2 text-left">
                                    <h3 className="text-white font-bold">Interfaces Create Boundaries</h3>
                                    <p className="text-white/50 text-xs">Without a wall, everything mixes. Separation is the first step of order.</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                                <div className="hidden md:block w-1/2 text-right text-white/50 text-sm">Step 2</div>
                                <div className="w-10 h-10 rounded-full bg-[#0b1020] border border-red-500 text-red-500 flex items-center justify-center font-bold shrink-0 z-10">2</div>
                                <div className="w-full md:w-1/2 text-left">
                                    <h3 className="text-white font-bold">Boundaries Allow Gradients</h3>
                                    <p className="text-white/50 text-xs">Once separated, you can build a difference (e.g., more protons outside than inside).</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                                <div className="hidden md:block w-1/2 text-right text-white/50 text-sm">Step 3</div>
                                <div className="w-10 h-10 rounded-full bg-[#0b1020] border border-red-500 text-red-500 flex items-center justify-center font-bold shrink-0 z-10">3</div>
                                <div className="w-full md:w-1/2 text-left">
                                    <h3 className="text-white font-bold">Gradients Create Direction</h3>
                                    <p className="text-white/50 text-xs">The difference creates a "push." This is where potential energy lives.</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                                <div className="hidden md:block w-1/2 text-right text-white/50 text-sm">Step 4</div>
                                <div className="w-10 h-10 rounded-full bg-[#0b1020] border border-red-500 text-red-500 flex items-center justify-center font-bold shrink-0 z-10">4</div>
                                <div className="w-full md:w-1/2 text-left">
                                    <h3 className="text-white font-bold">Consistency Stabilizes Context</h3>
                                    <p className="text-white/50 text-xs">A chaotic routine disrupts the map. Stability (7 days) allows coherence to emerge.</p>
                                </div>
                            </div>

                        </StaggerContainer>
                    </div>
                </div>
            </section>

            {/* CONNECTION TO ANDARA */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <FadeIn className="flex-1">
                        <div>
                            <h2 className="text-3xl font-display text-white mb-6">Supporting the Context</h2>
                            <p className="text-white/60 mb-6">
                                Andara Ionic provides the <span className="text-red-400">mineral context layer</span>. Consistent dosing supports the environment where gradients can flourish.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/science/ionic-vs-colloidal-vs-solid" className="px-5 py-2.5 bg-white/10 rounded-lg text-white text-sm font-bold hover:bg-white/20 transition-colors">
                                    Why Ionic Form?
                                </Link>
                                <Link href="/andara-dilution-calculator" className="px-5 py-2.5 border border-white/10 rounded-lg text-white text-sm font-bold hover:border-white/30 transition-colors flex items-center gap-2">
                                    <FlaskConical className="w-4 h-4" /> Dosing Calc
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn className="flex-1">
                        <div className="bg-[#0b1020] p-8 rounded-2xl border border-red-500/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-bl-full pointer-events-none" />
                            <h3 className="text-red-400 font-bold mb-4">The Discipline</h3>
                            <p className="text-white/70 text-sm mb-4">
                                "A stable routine = stable context. Don't chase intensity. Chase coherence. Use the calculator to lock your numbers."
                            </p>
                            <Link href="/getting-started-first-7-days" className="text-xs font-bold underline decoration-dashed text-red-400 hover:text-white">
                                View 7-Day Protocol
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Gradient FAQ</h2>
                    <div className="space-y-6">
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                Is this page claiming a health effect?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">No. It is an educational model explaining how gradients create directionality in biological systems.</p>
                        </div>
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                Why are proton gradients important in bioelectricity?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">They are a clear way to understand how potential differences and directionality emerge across interfaces.</p>
                        </div>
                        <div className="bg-[#0b1020] p-6 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                Where do I go next to learn the practical pieces?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">Read Ion Channels & Gradients, Bioelectric Water, and Hydration Layers & Interfaces.</p>
                        </div>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
