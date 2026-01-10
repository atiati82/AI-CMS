import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { VideoBackground } from "@/components/SmartVideoEmbed";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { CellVoltageScrollAnimation } from "@/components/visuals/CellVoltageScrollAnimation";
import { Link } from "wouter";
import {
    Activity,
    Battery,
    Zap,
    ArrowRight,
    TrendingUp,
    CircleMinus,
    CirclePlus,
    MoveRight
} from "lucide-react";

export default function CellVoltagePage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Cell Voltage: The Language of Life | Andara Science",
        "description": "Discover how cellular voltage (-25mV to -50mV) drives health. Learn about the 'Body as a Battery' and the role of minerals.",
    };

    return (
        <StandardPageLayout
            title={<>The Body is a <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300">Living Battery</span></>}
            subtitle={<>The Battery of Life.<br />Why -25mV is the Tipping Point.</>}
            backgroundElement={<VideoBackground keywords={["cell", "voltage", "membrane", "electric", "battery"]} overlayOpacity={0.3} />}

            heroVariant="blue"
            heroIcon={Zap}
            badges={[{ text: "Bioelectric Health", icon: Activity }]}
            seoTitle="Cell Voltage: The Language of Life | Andara Science"
            seoDescription="Discover how cellular voltage (-25mV to -50mV) drives health. Learn about the 'Body as a Battery' and the role of minerals."
            extraHead={
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            }
        >
            {/* SCROLL ANIMATION: CELL VOLTAGE GATE */}
            <div className="relative z-0">
                <CellVoltageScrollAnimation />
            </div>

            {/* THE VOLTAGE SCALE - LESSON STYLE STRUCTURE */}
            <section className="py-24 bg-[#03081c]">
                <div className="container mx-auto px-6 max-w-6xl">

                    {/* INTRO */}
                    <div className="text-center mb-20">
                        <FadeIn>
                            <h2 className="text-3xl font-display text-white mb-4">The Voltage of Life</h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full" />
                        </FadeIn>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* LOW VOLTAGE */}
                        <StaggerContainer delay={0.1}>
                            <div className="bg-[#0b1020] h-full p-8 border border-red-500/20 rounded-2xl hover:border-red-500/40 group transition-all">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-red-400 font-mono text-sm uppercase tracking-wider">Sick / Tired</span>
                                    <Battery className="w-6 h-6 text-red-500 rotate-90" />
                                </div>
                                <div className="text-4xl font-bold text-white mb-2 group-hover:text-red-300 transition-colors">
                                    &lt; -15mV
                                </div>
                                <p className="text-slate-400">
                                    <strong>Low Charge.</strong> Cells lack the energy to repair. Chronic fatigue and dysfunction set in. The "battery" is draining.
                                </p>
                            </div>
                        </StaggerContainer>

                        {/* HEALTHY VOLTAGE */}
                        <StaggerContainer delay={0.2}>
                            <div className="bg-[#0b1020] h-full p-8 border border-emerald-500/30 rounded-2xl hover:border-emerald-400/60 group relative overflow-hidden shadow-lg shadow-emerald-500/5 transition-all transform hover:-translate-y-1">
                                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-emerald-400 font-mono text-sm uppercase tracking-wider">Optimal Health</span>
                                        <Zap className="w-6 h-6 text-emerald-400 fill-emerald-400 animate-pulse" />
                                    </div>
                                    <div className="text-4xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                                        -20mV to -25mV
                                    </div>
                                    <p className="text-emerald-100/80">
                                        <strong>Operating Mode.</strong> Putting in enough energy to run the day. Cells function efficiently, waste is removed, and energy is high.
                                    </p>
                                </div>
                            </div>
                        </StaggerContainer>

                        {/* REPAIR VOLTAGE */}
                        <StaggerContainer delay={0.3}>
                            <div className="bg-[#0b1020] h-full p-8 border border-cyan-500/20 rounded-2xl hover:border-cyan-500/40 group transition-all">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-cyan-400 font-mono text-sm uppercase tracking-wider">Repair Mode</span>
                                    <TrendingUp className="w-6 h-6 text-cyan-500" />
                                </div>
                                <div className="text-4xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                                    -50mV
                                </div>
                                <p className="text-slate-400">
                                    <strong>Regeneration.</strong> To make new cells, the body needs a voltage surge. This is the "healing state" required to fix damage.
                                </p>
                            </div>
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            {/* HOW MINERALS CHARGE THE BATTERY - SPLIT SECTION */}
            <section className="py-24 bg-[#020617] border-t border-emerald-500/10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        <FadeIn>
                            {/* Simplified Cell Membrane Diagram */}
                            <div className="relative aspect-square rounded-3xl bg-[#0b1221] border border-white/5 p-8 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#0b1221] to-[#0b1221]" />

                                {/* Abstract Cell */}
                                <div className="relative w-64 h-64 border-4 border-dashed border-white/10 rounded-full flex items-center justify-center">
                                    <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-xl" />
                                    {/* Nucleus */}
                                    <div className="w-20 h-20 bg-emerald-900/50 rounded-full border border-emerald-500/30 flex items-center justify-center">
                                        <span className="text-emerald-500 font-mono text-xs">Nucleus</span>
                                    </div>

                                    {/* Ions */}
                                    <div className="absolute -top-4 left-1/2 p-2 bg-[#020617] border border-emerald-500/50 rounded-full text-emerald-400 text-xs font-bold shadow-lg shadow-emerald-500/20 animate-bounce">
                                        K+
                                    </div>
                                    <div className="absolute -bottom-4 left-1/2 p-2 bg-[#020617] border border-cyan-500/50 rounded-full text-cyan-400 text-xs font-bold shadow-lg shadow-cyan-500/20 animate-bounce delay-75">
                                        Na+
                                    </div>
                                    <div className="absolute top-1/2 -right-4 p-2 bg-[#020617] border border-white/20 rounded-full text-white text-xs font-bold">-</div>
                                    <div className="absolute top-1/2 -left-4 p-2 bg-[#020617] border border-white/20 rounded-full text-white text-xs font-bold">+</div>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn>
                            <div>
                                <div className="inline-flex items-center gap-2 mb-6 text-emerald-400">
                                    <span className="font-mono text-sm">THE MECHANISM</span>
                                    <div className="h-px w-8 bg-emerald-500/30"></div>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Role of Electrolytes</h2>
                                <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                                    <p>
                                        How does a battery hold a charge? By keeping positive and negative charges separated until needed.
                                    </p>
                                    <p>
                                        In your body, this is done by <strong>electrolytes</strong> (minerals). Potassium inside the cell, sodium outside. Magnesium acts as the "switch" that controls the pump.
                                    </p>
                                    <p>
                                        Without abundant, soluble minerals, the cell membrane cannot maintain this potential difference. The voltage drops, and the "battery" dies. Andara minerals provide the <strong>raw ionic material</strong> to keep these pumps running.
                                    </p>
                                </div>

                                <div className="mt-10 grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                        <CirclePlus className="w-5 h-5 text-emerald-400" />
                                        <span className="text-white font-medium">Charge Donor</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                        <CircleMinus className="w-5 h-5 text-cyan-400" />
                                        <span className="text-white font-medium">Charge Receiver</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 bg-[#0a0f1e]">
                <div className="container mx-auto px-6 text-center max-w-3xl">
                    <FadeIn>
                        <h2 className="text-3xl font-bold text-white mb-6">Recharge Your Terrain</h2>
                        <p className="text-lg text-slate-400 mb-10">
                            Hydration isn't just about water volume. It's about conductivity. Charge your water with ions to support your cellular voltage.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/science/redox-buffers">
                                <button className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors shadow-lg shadow-emerald-900/20 flex items-center gap-2">
                                    Redox Buffers <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                            <Link href="/shop">
                                <button className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-medium hover:bg-white/5 transition-colors">
                                    Get Ionic Minerals
                                </button>
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </StandardPageLayout>
    );
}
