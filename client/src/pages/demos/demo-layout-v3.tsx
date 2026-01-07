import React from 'react';
import { AdvancedPageLayout } from "@/components/layout/AdvancedPageLayout_Proposal";
import { GlassCard } from "@/components/ui/glass-card";
import { SmartImage } from "@/components/ui/SmartImage";
import { BundleCTA } from "@/components/shop/BundleCTA";
import { motion } from "framer-motion";

export default function DemoLayoutV3() {
    return (
        <AdvancedPageLayout
            title="Liquid Alchemy"
            subtitle="Layout v3: Organic Flow"
            vibeKeywords={["Fluid", "Organic", "Soft"]}
        >
            {/* AMBIENT BACKGROUND OVERRIDES */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/40 via-purple-900/20 to-transparent blur-3xl rounded-full scale-150 animate-pulse duration-[10s]" />
            </div>

            {/* 1. HERO: Centered, Soft */}
            <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
                <p className="text-2xl text-blue-100 font-light leading-relaxed drop-shadow-lg">
                    A layout that flows like water. <br />
                    <strong>Soft Edges. Deep Blurs. Overlapping Layers.</strong>
                </p>
            </div>

            {/* 2. THE FLOW: Overlapping Cards Strategy */}
            <div className="relative max-w-5xl mx-auto mb-32 space-y-[-4rem]"> {/* Negative margin for overlap */}

                {/* Card 1: Left */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="md:w-3/4 mr-auto relative z-10"
                >
                    <GlassCard variant="default" className="!rounded-[3rem] !border-white/10 !bg-white/5 backdrop-blur-xl p-10">
                        <div className="flex gap-6 items-center">
                            <SmartImage keyword="water-structure" className="w-32 h-32 rounded-full object-cover border-4 border-white/10" />
                            <div>
                                <h2 className="text-3xl font-display text-white mb-2">Organic Shapes</h2>
                                <p className="text-blue-200">
                                    We break the grid. Everything is rounded, softened, and fluid.
                                    The eye glides from one element to the next without hard stops.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Card 2: Right */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="md:w-3/4 ml-auto relative z-20"
                >
                    <GlassCard variant="gold" className="!rounded-[3rem] !border-amber-500/20 !bg-amber-900/20 backdrop-blur-xl p-10">
                        <div className="flex gap-6 items-center flex-row-reverse text-right">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-4xl shadow-lg shadow-amber-500/20">
                                Au
                            </div>
                            <div>
                                <h2 className="text-3xl font-display text-amber-100 mb-2">Deep Immersion</h2>
                                <p className="text-amber-200/80">
                                    Using heavy backdrop filters and "Liquid" gradients creates a sense of depth.
                                    The user feels submerged in the content.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Card 3: Center */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="md:w-2/3 mx-auto relative z-30"
                >
                    <div className="p-1 rounded-[3rem] bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500">
                        <GlassCard variant="default" className="!rounded-[2.8rem] !bg-[#050b1c] text-center p-12 h-full">
                            <h2 className="text-5xl font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white mb-6">
                                The Source
                            </h2>
                            <p className="text-slate-400 mb-8">
                                This layout is best for "Storytelling" pages where the emotional connection
                                is more important than raw data density.
                            </p>
                            <BundleCTA />
                        </GlassCard>
                    </div>
                </motion.div>

            </div>

        </AdvancedPageLayout>
    );
}
