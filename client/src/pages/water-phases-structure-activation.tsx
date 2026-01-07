import React, { useEffect } from "react";
import { m } from "framer-motion";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { FadeIn, StaggerContainer } from "@/components/animations";
import {
    Hexagon,
    Zap,
    Shield,
    Battery,
    ArrowRight,
    HelpCircle,
    Activity,
    Layers,
    Anchor,
    Box
} from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { BackgroundLayer } from "@/components/visuals/BackgroundLayer";
import { OrderChaosComparison } from "@/components/visuals/OrderChaosComparison";

export function HexagonalWaterStructuresPage() {
    return (
        <StandardPageLayout
            title={<>Hexagonal <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-400">Water Structures</span></>}
            subtitle={<>The Grid. The Exclusion Zone. The Treasury.<br />Why nature organizes water into honeycomb geometries.</>}
            heroVariant="emerald"
            heroIcon={Hexagon}
            badges={[{ text: "Structural Geometry", icon: Hexagon }]}

            seoTitle="Hexagonal Water Structures: The Grid, EZ Water & Electron Treasuries"
            seoDescription="Understand hexagonal water structures: the honeycomb grid, exclusion zone (EZ) layers, and how water acts as a battery/electron treasury."
        >
            {/* FEATURE VISUAL: THE GRID (Moved from Hero) */}
            <section className="relative -mt-12 md:-mt-20 z-20 pb-24">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn delay={0.2}>
                        <div className="bg-[#05060b]/80 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-8 md:p-12 shadow-2xl shadow-emerald-500/5">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full mb-6">
                                        <Activity className="w-3 h-3" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Live Simulation</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-display text-white mb-6">Order vs. Chaos</h2>
                                    <p className="text-white/70 mb-6 leading-relaxed">
                                        Bulk water is chaotic and random. <strong>Hexagonal water</strong> is organized, forming a stable honeycomb lattice usually near surfaces.
                                    </p>
                                    <p className="text-white/70 mb-8 leading-relaxed">
                                        This structure excludes solutes (cleaning itself) and separates charge (acting as a battery).
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-3 text-sm text-white/50">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" /> Organized (Ice-like, protective)
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-white/50">
                                            <div className="w-2 h-2 rounded-full bg-slate-500" /> Chaotic (Bulk liquid, responsive)
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-full bg-[#020617] rounded-xl overflow-hidden relative group">
                                    <OrderChaosComparison />
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* THREE CORE CONCEPTS */}
            <section className="py-24 bg-[#05060b]">
                <div className="container px-4 max-w-6xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">3 Pillars of Hexagonal Structure</h2>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 1. The Grid */}
                        <m.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="p-8 rounded-xl bg-[#0b1020] border border-white/5 group hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20 relative overflow-hidden z-10"
                        >
                            <BackgroundLayer registryId="geo-hex-holographic" opacity={30} />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Hexagon className="w-6 h-6" />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-3">1. The Grid</h3>
                                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                                    Water molecules link into hexagonal sheets (H3O2) instead of random H2O. This geometry is tighter and more stable.
                                </p>
                                <Link href="/science/water-phases" className="text-xs font-bold text-emerald-500/60 hover:text-emerald-400 flex items-center gap-1 transition-colors">
                                    See Phases <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </m.div>

                        {/* 2. Exclusion Zone */}
                        <m.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="p-8 rounded-xl bg-[#0b1020] border border-white/5 group hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 relative overflow-hidden z-10"
                        >
                            <BackgroundLayer registryId="water-exclusion-holographic" opacity={30} />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-3">2. Exclusion Zone</h3>
                                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                                    The tight grid pushes out ("excludes") dissolved particles, creating a naturally pure zone next to hydration interfaces.
                                </p>
                                <Link href="/science/ez-water-overview" className="text-xs font-bold text-cyan-500/60 hover:text-cyan-400 flex items-center gap-1 transition-colors">
                                    EZ Overview <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </m.div>

                        {/* 3. Electron Treasury */}
                        <m.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="p-8 rounded-xl bg-[#0b1020] border border-white/5 group hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/20 relative overflow-hidden z-10"
                        >
                            <BackgroundLayer registryId="cell-battery-diagram" opacity={30} />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Battery className="w-6 h-6" />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-3">3. Electron Treasury</h3>
                                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                                    Hexagonal layers typically carry a negative charge, acting as a donor of electrons (energy) to the surrounding environment.
                                </p>
                                <Link href="/orp-redox-water" className="text-xs font-bold text-amber-500/60 hover:text-amber-400 flex items-center gap-1 transition-colors">
                                    See ORP/Redox <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </m.div>
                    </StaggerContainer>
                </div>
            </section>

            {/* ANDARA CONNECTION */}
            <section className="py-24 bg-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-3xl font-display text-white mb-6">Interfaces make the Hexagon.</h2>
                        <p className="text-white/60 mb-6 italic text-lg">
                            "You don't pour hexagons out of a bottle. You pour water into a context that encourages hexagons."
                        </p>
                        <p className="text-white/70 mb-8 text-sm leading-relaxed">
                            Andara Ionic provides the <strong>mineral interfaces (sulfates/silicates)</strong> that act as anchors for water to structure itself against.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/how-to-use-andara" className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-bold transition-colors">
                                How it Works
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="relative w-64 h-64 border border-white/10 rounded-full flex items-center justify-center">
                            <div className="absolute inset-4 border border-emerald-500/20 rounded-full animate-pulse" />
                            <Box className="w-16 h-16 text-emerald-500" />
                            <div className="absolute -bottom-8 text-center w-full text-xs text-white/40">Mineral Anchor Point</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#05060b]">
                <div className="container px-4 max-w-3xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-display text-white mb-12 text-center">Hexagonal FAQ</h2>
                        <div className="space-y-6">
                            {[
                                { name: "Can I drink hexagonal water?", text: "Structured water forms naturally in the body and in nature. The goal is to provide the raw materials (minerals) for your body to create this structure, not necessarily to 'buy it in a bottle'." },
                                { name: "Is this the same as 'Cluster' water?", text: "Similar concepts. Hexagonal water refers effectively to smaller, organized clusters that are theoretically more bioavailable because they fit biological interfaces better." },
                                { name: "Does Andara utilize magnets?", text: "Andara Bio-Active Ionic Minerals provide chemical/mineral interfaces. We also educate on magnetic vortexing as a complementary physical method to encourage structure." }
                            ].map((item, i) => (
                                <div key={i} className="border-b border-white/10 pb-6">
                                    <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                        <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                        {item.name}
                                    </h3>
                                    <p className="text-white/60 pl-8 leading-relaxed text-sm">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

        </StandardPageLayout>
    );
}

export default HexagonalWaterStructuresPage;
