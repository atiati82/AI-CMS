import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { FadeIn, StaggerContainer } from "@/components/animations";
import {
    Magnet,
    Sparkles,
    ArrowRight,
    ArrowDown
} from "lucide-react";
import { AndaraDynamicIcon } from "@/components/visuals/svg/AndaraIconRegistry";

export default function MineralFlocculationPage() {
    return (
        <StandardPageLayout
            title="Nature's Magnetic Broom"
            subtitle="How do you clean water without harsh chemicals? You use physics. Mineral ions act as tiny magnets, gathering impurities and returning them to the earth."
            
            heroIcon={Magnet}
            badges={[{ text: "Physics of Clarity", icon: Magnet }]}
            seoTitle="Mineral Flocculation: Science of Water Clarity | Andara Science"
            seoDescription="Understand how natural sulfate minerals clarify water through flocculation. The physics of charge attraction and sedimentation."
        >
            {/* THE PROCESS */}
            <section className="py-24 bg-slate-900">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        <FadeIn>
                            {/* Visual Animation Placeholder: Particles condensing */}
                            <div className="relative aspect-square rounded-3xl bg-slate-900 border border-white/5 flex items-center justify-center p-8 group overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/50 via-slate-900 to-slate-950" />

                                {/* Centered Mineral Icon */}
                                <div className="relative z-10">
                                    <AndaraDynamicIcon topic="mineral" size={80} className="text-sky-500 animate-pulse-slow mx-auto mb-12" />

                                    {/* Floating "dirt" particles moving inward */}
                                    <div className="absolute top-0 left-0 w-full h-full animate-spin-slower opacity-50">
                                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-slate-600 rounded-full" />
                                        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-slate-500 rounded-full" />
                                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-slate-700 rounded-full" />
                                    </div>

                                    <div className="text-center">
                                        <ArrowDown className="w-8 h-8 text-sky-400 mx-auto animate-bounce" />
                                        <span className="text-sm font-mono text-sky-400 uppercase tracking-wider mt-2 block">Sedimentation</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        <StaggerContainer>
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">What is Flocculation?</h2>
                                <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                                    <p>
                                        Most suspended impurities in water (dirt, bacteria, organic matter) carry a <strong>negative electrical charge</strong>. Like magnets with the same polarity, they repel each other, staying suspended in a cloud of turbidity.
                                    </p>
                                    <p>
                                        Andara minerals (like iron and aluminum sulfates) introduce <strong>positive charges</strong>.
                                    </p>
                                    <p>
                                        <strong>The Result:</strong> The positive mineral ions attract the negative dirt particles. They neutralize the repulsion, allowing the particles to clump together ("floc") and become heavy enough to sink.
                                    </p>
                                </div>

                                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <Sparkles className="w-8 h-8 text-sky-400 mb-4" />
                                        <h3 className="text-lg font-bold text-white">Clarification</h3>
                                        <p className="text-sm text-slate-400">Turning cloudy water crystal clear.</p>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <Magnet className="w-8 h-8 text-indigo-400 mb-4" />
                                        <h3 className="text-lg font-bold text-white">Charge Balance</h3>
                                        <p className="text-sm text-slate-400">Neutralizing electrostatic repulsion.</p>
                                    </div>
                                </div>

                            </div>
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            {/* WHY IT MATTERS */}
            <section className="py-24 bg-slate-950 border-t border-white/5">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Why This Matters</h2>
                    <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                        Flocculation is nature's way of cleaning rivers. When mineral-rich mountain streams meet muddy valleys, the water clarifies. We simply replicate this geological process in your glass.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/science/turbidity-clarity-flocculation" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-medium transition-colors shadow-lg shadow-sky-600/20">
                            Understand Turbidity <ArrowRight className="w-5 h-5 ml-2" />
                        </a>
                        <a href="/how-to-use-andara" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-medium hover:bg-white/10 transition-colors">
                            See It In Action
                        </a>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
