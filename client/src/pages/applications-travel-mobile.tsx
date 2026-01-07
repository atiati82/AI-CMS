import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { BundleCTA } from "@/components/shop/BundleCTA";
import { Plane, Train, MapPin, Globe, CheckCircle2, Droplets, Activity } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";

export default function TravelMobilePage() {
    return (
        <StandardPageLayout
            title="Travel & Mobile Use"
            subtitle="Micro-Dose Mineral Intelligence On the Go"
            seoTitle="Travel & Mobile Use – Andara Ionic On the Go"
            seoDescription="Discover how to use Andara Ionic as a compact travel ally. Micro-dose into bottled, hotel or filtered water to support clarification, taste and coherent mineral structure wherever you go."
            heroVariant="blue"
            badges={[{ text: "Global Hydration", icon: Globe }]}
            seoKeywords={[
                "andara ionic travel use",
                "micro dose minerals on the go",
                "improve hotel & bottled water",
                "travel water clarification drops",
                "structured water while traveling",
                "sulfate minerals travel kit",
                "mobile hydration ritual",
                "safe travel water conditioning"
            ]}
        >
            <div className="bg-[#020617] text-white selection:bg-blue-500/30">

                {/* 1. HERO CONTEXT: PORTABLE FIELD */}
                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
                    <div className="container px-4 max-w-4xl mx-auto text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-8">
                            <Plane className="w-3 h-3" />
                            Carry Your Standard
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display text-white mb-6 leading-tight">
                            One Bottle to Tune <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Any Water Source</span>
                        </h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto mb-12">
                            When you travel, water becomes the unknown variable. Tap, plastic bottles, airport fountains...
                            <br className="hidden md:block" />
                            Andara Ionic travels in your pocket, turning random water into a coherent mineral field.
                        </p>

                        {/* Visual Visual Anchor - 100ml bottle context */}
                        <div className="relative h-64 w-full max-w-md mx-auto mb-12">
                            <div className="absolute inset-0 bg-blue-500/20 blur-3xl opacity-30 rounded-full" />
                            <SmartImage
                                registryId="product-100ml-transparent"
                                className="h-full w-full object-contain relative z-10 drop-shadow-2xl opacity-90"
                            />
                        </div>
                    </div>
                </section>

                {/* 2. TRAVEL SCENARIOS */}
                <section className="py-20 bg-[#05060b] border-y border-white/5">
                    <div className="container px-4 max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-display text-white mb-6">The "Hotel Water" Problem</h3>
                                <p className="text-white/60 mb-6">
                                    You arrive tired. The tap water smells unfamiliar. The bottled water feels lifeless in plastic. Your body instinctively holds back from hydrating fully.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="p-2 rounded bg-white/5 text-slate-400 mt-1">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">Unknown Terrain</h4>
                                            <p className="text-white/50 text-xs">Foreign mineral profiles and treatment chemicals.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="p-2 rounded bg-white/5 text-slate-400 mt-1">
                                            <Droplets className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">Hydration Gap</h4>
                                            <p className="text-white/50 text-xs">Flying and AC dehydrate you fast.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="andara-glass-card p-8 bg-blue-900/5 border-blue-500/10">
                                <h3 className="text-xl font-bold text-white mb-4">The Pocket Spring</h3>
                                <p className="text-white/70 text-sm mb-6">
                                    With a micro-dose, you lift the water's structure and taste back to a level your body recognizes.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded bg-white/5 border border-white/5 text-center">
                                        <div className="text-2xl font-bold text-blue-400 mb-1">TSA</div>
                                        <div className="text-xs text-white/40">100ml Friendly</div>
                                    </div>
                                    <div className="p-4 rounded bg-white/5 border border-white/5 text-center">
                                        <div className="text-2xl font-bold text-blue-400 mb-1">Easy</div>
                                        <div className="text-xs text-white/40">3-5 Drops/Bottle</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. PROTOCOLS ON THE MOVE */}
                <section className="py-24 bg-[#020617]">
                    <div className="container px-4 max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-display text-white mb-4">Mobile Rituals</h2>
                            <p className="text-white/60">How to maintain your standard anywhere.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Card 1: Hotel Tap */}
                            <div className="andara-glass-card p-6 border-b-4 border-b-cyan-500/50">
                                <MapPin className="w-8 h-8 text-cyan-400 mb-4" />
                                <h4 className="text-lg font-bold text-white mb-2">Hotel / Airbnb</h4>
                                <div className="text-xs font-mono text-cyan-300 mb-4">Safe Tap Areas</div>
                                <p className="text-white/60 text-sm mb-4">
                                    If tap is safe but harsh.
                                </p>
                                <div className="text-xs bg-cyan-900/20 text-cyan-200 p-3 rounded border border-cyan-500/20 space-y-2">
                                    <p>Fill glass or bottle.</p>
                                    <p>Add <strong>5-10 drops</strong> per Liter.</p>
                                    <p>Let sit 1-2 mins to clarify taste.</p>
                                </div>
                            </div>

                            {/* Card 2: Plastic Bottles */}
                            <div className="andara-glass-card p-6 border-b-4 border-b-blue-500/50">
                                <Globe className="w-8 h-8 text-blue-400 mb-4" />
                                <h4 className="text-lg font-bold text-white mb-2">Plastic Bottles</h4>
                                <div className="text-xs font-mono text-blue-300 mb-4">Airport / Road</div>
                                <p className="text-white/60 text-sm mb-4">
                                    Reviving dead water.
                                </p>
                                <div className="text-xs bg-blue-900/20 text-blue-200 p-3 rounded border border-blue-500/20 space-y-2">
                                    <p>Open bottle.</p>
                                    <p>Drop in <strong>3-5 drops</strong> (500ml).</p>
                                    <p>Invert gently to mix.</p>
                                </div>
                            </div>

                            {/* Card 3: Mobile Vortex */}
                            <div className="andara-glass-card p-6 border-b-4 border-b-purple-500/50">
                                <Activity className="w-8 h-8 text-purple-400 mb-4" />
                                <h4 className="text-lg font-bold text-white mb-2">Manual Vortex</h4>
                                <div className="text-xs font-mono text-purple-300 mb-4">Hand Motion</div>
                                <p className="text-white/60 text-sm mb-4">
                                    Structure without devices.
                                </p>
                                <div className="text-xs bg-purple-900/20 text-purple-200 p-3 rounded border border-purple-500/20 space-y-2">
                                    <p>Add drops to bottle.</p>
                                    <p>Move in <strong>figure-8s</strong> or swirl.</p>
                                    <p>Combine minerals + motion.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. EMOTIONAL TERRAIN */}
                <section className="py-24 bg-[#05060b] relative z-10 text-center">
                    <div className="container px-4 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-display text-white mb-6">A Piece of Your Spring</h2>
                        <div className="prose prose-invert prose-lg mx-auto text-slate-300">
                            <p>
                                No matter which city you wake up in, a single Andara bottle in your pocket is a reminder that you can bring a piece of your own spring with you.
                            </p>
                            <p className="text-lg text-blue-200/80 font-medium">
                                "The ritual doesn't stop just because you moved."
                            </p>
                        </div>
                    </div>
                </section>

                {/* 5. BOUNDARY BOX */}
                <section className="py-12 bg-[#2a0a0a]/20 border-y border-red-900/20">
                    <div className="container px-4 max-w-3xl mx-auto text-center">
                        <h3 className="text-red-300 font-bold mb-3 uppercase text-xs tracking-widest">Water Safety First</h3>
                        <p className="text-sm text-red-200/70 leading-relaxed">
                            Andara Ionic clarifies taste and structure, but it is <strong>not a filtration or disinfection system</strong>. Only use Andara with water you would otherwise consider safe to drink (potable tap, bottled, or filtered). Do not act as a substitute for boiling or filtering in unsafe regions.
                        </p>
                    </div>
                </section>

                {/* 6. SHOP CTA */}
                <BundleCTA />

            </div>
        </StandardPageLayout>
    );
}
