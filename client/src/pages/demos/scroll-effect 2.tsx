// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlassCard } from "@/components/ui/glass-card";
import { SmartImage } from "@/components/ui/SmartImage";
import {
    ScrollParallax, ScrollScale, ScrollHorizontal, ScrollRotate3D,
    ScrollBlur, ScrollColorShift, ScrollTextSplit, StickyStackItem,
    ScrollProgressBar, PinZoom
} from "@/lib/scroll-effects-registry";

export default function DemoScrollEffect() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // Background shift for the whole page
    const bg = useTransform(scrollYProgress, [0, 1], ["#0f172a", "#000000"]);

    return (
        <motion.div ref={containerRef} style={{ background: bg }} className="min-h-screen text-white relative pb-96">
            <ScrollProgressBar containerRef={containerRef} />

            {/* INTRO SECTION */}
            <section className="h-screen flex items-center justify-center relative z-10">
                <div className="text-center">
                    <h1 className="text-6xl font-display mb-6">Scroll Effects Museum</h1>
                    <p className="text-xl text-slate-400">10 Reactive Interactions</p>
                    <p className="text-xs mt-8 animate-bounce text-emerald-500">SCROLL DOWN ↓</p>
                </div>
            </section>

            {/* 1. PARALLAX REVEAL */}
            <section className="min-h-screen flex items-center justify-center py-24 border-t border-white/5 relative z-10 bg-slate-900/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl px-6 items-center">
                    <div>
                        <h2 className="text-4xl font-display mb-4 text-emerald-400">1. Parallax Reveal</h2>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            The image container masks the content, but the image inside moves at a different speed (slower) than your scroll.
                            This creates a "window" effect into depth.
                        </p>
                    </div>
                    <ScrollParallax offset={100} className="h-[400px] w-full rounded-3xl border border-white/10 shadow-2xl bg-black">
                        <SmartImage keyword="crystal-cave" className="w-full h-[140%] object-cover -mt-[20%] opacity-80" />
                    </ScrollParallax>
                </div>
            </section>

            {/* 2. SCALE DOWN (FOCUS OUT) */}
            <section className="min-h-screen flex items-center justify-center py-24 relative z-10">
                <div className="text-center max-w-2xl px-6">
                    <h2 className="text-4xl font-display mb-12">2. Scale Down</h2>
                    <ScrollScale>
                        <GlassCard className="p-12 bg-indigo-950/30">
                            <h3 className="text-2xl font-bold mb-4">Focus Item</h3>
                            <p className="text-slate-300">
                                As you scroll past me, I will shrink and fade away,
                                keeping the focus on what comes next.
                            </p>
                        </GlassCard>
                    </ScrollScale>
                </div>
            </section>

            {/* 3. HORIZONTAL DRIFT */}
            <section className="min-h-[50vh] flex flex-col justify-center py-24 overflow-hidden relative z-10 bg-black/40">
                <h2 className="text-2xl font-display text-center mb-12 text-slate-500 uppercase tracking-widest">3. Horizontal Drift</h2>
                <ScrollHorizontal direction="left">
                    <div className="text-[10vw] font-display whitespace-nowrap text-white/5 font-bold leading-none">
                        IONIC STRUCTURE VORTEX FLOW
                    </div>
                </ScrollHorizontal>
                <ScrollHorizontal direction="right">
                    <div className="text-[10vw] font-display whitespace-nowrap text-emerald-500/20 font-bold leading-none">
                        ENERGY FREQUENCY VIBRATION
                    </div>
                </ScrollHorizontal>
            </section>

            {/* 4. 3D CARD FLIP */}
            <section className="min-h-screen flex items-center justify-center py-24 perspective-1000 relative z-10">
                <div className="bg-transparent">
                    <h2 className="text-2xl font-display text-center mb-12 text-slate-500 uppercase tracking-widest">4. 3D Rotation</h2>
                    <ScrollRotate3D>
                        <GlassCard variant="gold" className="w-[300px] h-[400px] flex flex-col justify-center items-center text-center p-8 bg-gradient-to-br from-amber-900/40 to-black">
                            <div className="text-6xl mb-6">💠</div>
                            <h3 className="text-2xl font-display mb-4 text-amber-200">The Monolith</h3>
                            <p className="text-amber-100/60">I rotate on the X-axis. Perfect for showcasing products or "cards" in a deck.</p>
                        </GlassCard>
                    </ScrollRotate3D>
                </div>
            </section>

            {/* 5. BLUR OUT */}
            <section className="min-h-screen flex items-center justify-center py-24 relative z-10">
                <div className="text-center w-full max-w-4xl px-6">
                    <h2 className="text-4xl font-display mb-12">5. Blur Out</h2>
                    <ScrollBlur>
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <SmartImage keyword="nebula" className="w-full h-[500px] object-cover" />
                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                                <p className="text-white text-lg">I will turn into a blur as I leave.</p>
                            </div>
                        </div>
                    </ScrollBlur>
                </div>
            </section>

            {/* 6. COLOR SHIFT */}
            <section className="min-h-screen flex items-center justify-center py-24 bg-white/5 relative z-10">
                <div className="text-center">
                    <p className="text-sm uppercase tracking-widest mb-4">6. Reactive Colors</p>
                    <ScrollColorShift from="#64748b" to="#fbbf24">
                        <h2 className="text-[12vw] font-display transition-colors duration-500 leading-tight">
                            GOLD<br />STANDARD
                        </h2>
                    </ScrollColorShift>
                </div>
            </section>

            {/* 7. TEXT SPLIT */}
            <section className="min-h-screen flex items-center justify-center py-24 relative z-10">
                <div className="text-center px-6">
                    <h2 className="text-2xl font-display mb-12 text-slate-500 uppercase tracking-widest">7. Staggered Entrance</h2>
                    <ScrollTextSplit
                        text="The text rises from the depths, character by character, line by line. It feels authoritative and cinematic."
                        className="text-4xl md:text-6xl font-light leading-tight max-w-4xl mx-auto text-slate-200"
                    />
                </div>
            </section>

            {/* 8. STICKY STACK */}
            <section className="py-24 px-6 max-w-3xl mx-auto relative z-10">
                <h2 className="text-4xl font-display mb-24 text-center">8. Sticky Stack</h2>
                <div className="relative min-h-[150vh]">
                    {[
                        { title: "Layer 01. Foundation", color: "bg-blue-900/80" },
                        { title: "Layer 02. Structure", color: "bg-purple-900/80" },
                        { title: "Layer 03. Finish", color: "bg-emerald-900/80" }
                    ].map((card, i) => (
                        <StickyStackItem key={i} index={i}>
                            <div className={`h-[400px] flex items-center justify-center rounded-3xl border border-white/20 backdrop-blur-xl shadow-2xl ${card.color}`}>
                                <h3 className="text-4xl font-bold text-white/90">{card.title}</h3>
                            </div>
                        </StickyStackItem>
                    ))}
                </div>
            </section>

            {/* 9. PROGRESS BAR (Already at top) */}

            {/* 10. PIN ZOOM (Redesigned Deep Dive) */}
            <section className="relative z-20">
                <PinZoom imageUrl="/images/demo-v6/matrix.png">
                    <div className="w-full max-w-4xl px-6">
                        <GlassCard className="text-center p-16 bg-black/40 backdrop-blur-md border-emerald-500/30 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs tracking-widest uppercase mb-8">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Deep Immersion Protocol
                            </div>
                            <h2 className="text-7xl md:text-9xl font-display text-white mb-8 tracking-tighter mix-blend-overlay">THE SOURCE</h2>
                            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                                We don't just sell water. <br />
                                <span className="text-emerald-400 font-normal">We structure reality.</span>
                            </p>

                            <div className="grid grid-cols-3 gap-8 mt-16 border-t border-white/10 pt-8">
                                <div>
                                    <div className="text-4xl font-light text-white mb-2">100%</div>
                                    <div className="text-xs uppercase tracking-widest text-slate-500">Ionic Bio-Availability</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-light text-white mb-2">-50mV</div>
                                    <div className="text-xs uppercase tracking-widest text-slate-500">Zeta Potential</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-light text-white mb-2">∞</div>
                                    <div className="text-xs uppercase tracking-widest text-slate-500">Shelf Life</div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </PinZoom>
            </section>

        </motion.div>
    );
}
// @ts-nocheck
