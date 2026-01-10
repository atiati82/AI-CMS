import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { VideoBackground } from "@/components/SmartVideoEmbed";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { Link } from "wouter";
import {
    Globe,
    Compass,
    Activity,
    Wind,
    Droplets,
    Zap,
    Layers,
    HeartPulse,
    ArrowRight
} from "lucide-react";

export default function TerrainConceptsInnerEcosystemPage() {
    return (
        <StandardPageLayout
            title={<>Terrain Concepts: <span className="text-emerald-400">Inner Ecosystem</span></>}
            subtitle={<>Beyond Symptom Thinking.<br /><span className="text-emerald-400/80">Treat the soil, not the plant.</span></>}
            backgroundElement={<VideoBackground keywords={["sulfur", "terrain", "yellow", "mineral", "detox"]} overlayOpacity={0.3} />}

            heroVariant="emerald"
            heroIcon={Globe}
            badges={[{ text: "Holistic Systems", icon: Globe }]}
            seoTitle="Terrain Concepts: Understanding Your Inner Ecosystem"
            seoDescription="Shift from organ-based thinking to terrain-based thinking. Understand how hydration, minerals, redox, and flow create the environment for health."
            relatedLinks={[
                { title: "Terrain Hub", url: "/terrain-concepts", type: "internal" },
                { title: "Sulfate Pathways", url: "/sulfate-pathways-terrain-model", type: "internal" }
            ]}
        >
            {/* INTRO SECTION */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-2xl font-display text-white mb-8">The Stage vs. The Actors</h2>
                        <p className="text-slate-300 leading-relaxed mb-12 max-w-2xl mx-auto">
                            Terrain thinking says: "Don’t chase symptoms first. Look at the environment everything lives in."
                            Your inner world – fluids, tissues, fields – acts like an ecosystem. Things thrive or struggle depending on the soil of the body.
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
                        <div className="p-6 rounded-xl border border-white/5 opacity-50 hover:opacity-100 transition-opacity bg-[#0b1020]">
                            <h3 className="text-slate-400 font-bold mb-2 text-sm uppercase tracking-wider">Old View</h3>
                            <p className="text-white">"You have a liver problem, a gut problem, a brain problem."</p>
                        </div>
                        <div className="p-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors">
                            <h3 className="text-emerald-400 font-bold mb-2 text-sm uppercase tracking-wider">Terrain View</h3>
                            <p className="text-white">"You have a field and environment that all organs live in. Is it stagnant or flowing?"</p>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* 7.2 DIMENSIONS */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-display text-white mb-12 text-center">Dimensions of the Terrain</h2>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {[
                            { icon: Droplets, title: "Hydration", desc: "Is water chaotic or organized?" },
                            { icon: Layers, title: "Minerals", desc: "Are building blocks in balance?" },
                            { icon: Activity, title: "Redox/pH", desc: "Enough reducing power?" },
                            { icon: Wind, title: "Flow", desc: "Can fluids move and clear?" },
                            { icon: Zap, title: "Field", desc: "Are signals coherent or noisy?" }
                        ].map((item, i) => (
                            <div key={i} className="bg-[#0b1020] p-6 rounded-xl border border-white/5 text-center group hover:border-emerald-500/30 transition-colors">
                                <item.icon className="w-8 h-8 text-emerald-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
                                <p className="text-xs text-slate-400 leading-tight">{item.desc}</p>
                            </div>
                        ))}
                    </StaggerContainer>
                    <FadeIn>
                        <p className="text-center text-slate-400 mt-12 text-sm">
                            Each dimension is adjustable. You don’t need perfection; you need movement toward coherence.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* 7.3 LIBRARY SUMMARY */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-display text-white mb-8 text-center">The Terrain Lens</h2>
                        <p className="text-center text-slate-300 mb-12">
                            Every pillar in the Andara Science Library is a lens for understanding your inner terrain.
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/science/bioelectric-water" className="p-4 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-between border border-transparent hover:border-white/20 transition-all">
                            <span className="text-slate-300 text-sm">Water Science</span>
                            <span className="text-emerald-400 text-xs text-right">Structure & Phases</span>
                        </Link>
                        <Link href="/science/crystalline-matrix-overview" className="p-4 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-between border border-transparent hover:border-white/20 transition-all">
                            <span className="text-slate-300 text-sm">Crystalline Matrix</span>
                            <span className="text-emerald-400 text-xs text-right">Geometry & Fields</span>
                        </Link>
                        <Link href="/bioelectricity" className="p-4 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-between border border-transparent hover:border-white/20 transition-all">
                            <span className="text-slate-300 text-sm">Bioelectricity</span>
                            <span className="text-emerald-400 text-xs text-right">Charge & Voltage</span>
                        </Link>
                        <Link href="/science/sulfate-pathways-water-body" className="p-4 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-between border border-transparent hover:border-white/20 transition-all">
                            <span className="text-slate-300 text-sm">Sulfate Pathways</span>
                            <span className="text-emerald-400 text-xs text-right">Interface & Detox</span>
                        </Link>
                        <Link href="/science/liquid-crystal-biology-overview" className="p-4 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-between border border-transparent hover:border-white/20 transition-all">
                            <span className="text-slate-300 text-sm">Liquid Crystal</span>
                            <span className="text-emerald-400 text-xs text-right">Soft Crystal Body</span>
                        </Link>
                        <Link href="/science/minerals-microbiome-research-hub" className="p-4 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-between border border-transparent hover:border-white/20 transition-all">
                            <span className="text-slate-300 text-sm">Microbiome</span>
                            <span className="text-emerald-400 text-xs text-right">Ecosystem & Logic</span>
                        </Link>
                    </StaggerContainer>
                </div>
            </section>

            {/* 7.4 WHY IT MATTERS */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <FadeIn>
                        <HeartPulse className="w-12 h-12 text-emerald-500 mx-auto mb-6" />
                        <h2 className="text-2xl font-display text-white mb-6">A Powerful, Safe Frame</h2>
                        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                            Terrain-first language focuses on supportive conditions, not medical claims. It respects body intelligence.
                            <br /><br />
                            <span className="text-emerald-400 font-bold italic text-lg">"If I want anything to change, I must first change the field it lives in."</span>
                        </p>

                        <Link href="/science-library" className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-emerald-500/20">
                            Explore Full Library <ArrowRight className="w-4 h-4" />
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </StandardPageLayout>
    );
}
