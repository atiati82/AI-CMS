import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { FadeIn, StaggerContainer } from "@/components/animations";
import {
    Battery,
    Shield,
    RefreshCcw,
    Zap,
    Scale
} from "lucide-react";
import { AndaraDynamicIcon } from "@/components/visuals/svg/AndaraIconRegistry";

export default function RedoxBuffersPage() {
    return (
        <StandardPageLayout
            title="The Electron Reservoir"
            subtitle="Life is a flow of electrons. Health involves maintaining the potential for that flow. Minerals act as redox buffers, stabilizing the system against chaos."
            heroIcon={Battery}
            badges={[{ text: "Energy Dynamics", icon: Battery }]}
            seoTitle="Redox Buffers: Stabilizing Cellular Charge | Andara Science"
            seoDescription="Learn how mineral redox buffers protect cellular stability. Beyond antioxidants, understanding the capacity to hold and release electrons."
        >
            {/* EXPLANATION GRID */}
            <section className="py-24 bg-slate-900">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        <FadeIn>
                            <div className="relative aspect-square rounded-3xl bg-slate-900 border border-white/5 flex items-center justify-center p-8 group hover:border-cyan-500/30 transition-all">
                                {/* Visual Metaphor: A Balanced Scale or Battery */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-slate-900 opacity-50" />
                                <div className="relative z-10 text-center">
                                    <AndaraDynamicIcon topic="structure" size={96} className="mx-auto text-cyan-500/50 mb-4 animate-pulse-slow" />
                                    <div className="flex items-center justify-center gap-8 mt-8">
                                        <div className="text-center">
                                            <span className="block text-2xl font-bold text-slate-300">-e⁻</span>
                                            <span className="text-xs text-slate-500 uppercase">Donation</span>
                                        </div>
                                        <RefreshCcw className="w-8 h-8 text-cyan-400 animate-spin-slow" />
                                        <div className="text-center">
                                            <span className="block text-2xl font-bold text-slate-300">+e⁻</span>
                                            <span className="text-xs text-slate-500 uppercase">Acceptance</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        <StaggerContainer>
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">What is a Redox Buffer?</h2>
                                <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                                    <p>
                                        <strong>Redox</strong> stands for Reduction-Oxidation. It describes the movement of electrons.
                                    </p>
                                    <p>
                                        A <strong>Buffer</strong> is a substance that resists drastic changes in environment. Just as a pH buffer prevents dangerous acidity swings, a <em>Redox Buffer</em> prevents dangerous voltage swings.
                                    </p>
                                    <p>
                                        Minerals, particularly sulfates of iron and magnesium, can reversibly accept or donate electrons. They act like a "shock absorber" for cellular energy, preventing oxidative stress from burning out the cell or reductive stress from stalling it.
                                    </p>
                                </div>

                                <div className="mt-12 p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
                                    <div className="flex items-start gap-4">
                                        <Shield className="w-8 h-8 text-cyan-400 mt-1" />
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">Defense vs. Capacity</h3>
                                            <p className="text-slate-400">
                                                Antioxidants are like "one-time use" defense missiles. A mineral redox buffer is like a <strong>rechargeable battery</strong>—it provides the ongoing capacity to handle electron flow continuously.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            {/* RELEVANCE TO WATER */}
            <section className="py-24 bg-slate-950 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">Buffered Water</h2>
                        <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                            When you add Andara Ionic minerals to water, you are essentially increasing its <strong>Redox Buffering Capacity</strong>. You act to stabilize the electrical potential of the water, making it a more resilient terrain for biological function.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/trust/lab-methods" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-colors">
                                Compare ORP Metrics <Scale className="w-5 h-5 ml-2" />
                            </a>
                            <a href="/science/bioelectricity-invisible-voltage" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium transition-colors shadow-lg shadow-cyan-600/20">
                                Understand Bioelectricity <Zap className="w-5 h-5 ml-2" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
