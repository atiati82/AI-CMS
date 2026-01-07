import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { LiquidBentoGrid, FlowSection, ActiveGlassCard } from "@/components/design/LiquidAlchemyExpansion";
import { HeroGlass } from "@/components/visuals/HeroGlass";
import { Droplets, Hexagon, Zap, ShoppingBag, ArrowRight, Flame } from 'lucide-react';

export default function ProductHighlightV2() {
    // Bento Data
    const features = [
        {
            id: "minerals",
            title: "Primordial Sulfate Minerals",
            description: "Sourced from ancient volcanic deposits, providing the essential conductive foundation for biological life.",
            className: "md:col-span-2",
            icon: Flame, // Changed to Flame for Volcanic
            header: (
                <div className="w-full h-full relative overflow-hidden group">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700"
                        style={{ backgroundImage: "url('/images/minerals/volcanic.png')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-900/40 to-red-900/40" />
                </div>
            )
        },
        {
            id: "structure",
            title: "Hyper-Structured Water",
            description: "Magnetically aligned water molecules forming a hexagonal liquid crystal lattice.",
            className: "md:col-span-1",
            icon: Hexagon,
            header: (
                <div className="w-full h-full relative overflow-hidden group">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                        style={{ backgroundImage: "url('/images/water/geometry.png')" }}
                    />
                    <div className="absolute inset-0 bg-cyan-900/30" />
                </div>
            )
        },
        {
            id: "energy",
            title: "Ionic Bioavailability",
            description: "Instantly absorbed at the cellular level due to angstrom-sized particles.",
            className: "md:col-span-1",
            icon: Zap,
            header: (
                <div className="w-full h-full relative overflow-hidden group">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                        style={{ backgroundImage: "url('/images/bioelectric/cell-voltage-bg.png')" }}
                    />
                    <div className="absolute inset-0 bg-indigo-900/30" />
                </div>
            )
        },
        {
            id: "bundle",
            title: "The 3-Month Ritual",
            description: "Commit to a full cellular regeneration cycle with the 3+1 Bundle.",
            className: "md:col-span-2 md:row-span-1",
            icon: ShoppingBag,
            header: (
                <div className="w-full h-full relative overflow-hidden group flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                        style={{ backgroundImage: "url('/assets/generated_images/andara-ionic-100ml-quad-bundle.png')" }}
                    />
                    <div className="absolute inset-0 bg-emerald-900/40" />
                    <button className="relative z-10 px-6 py-3 bg-emerald-500 text-white rounded-full font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-105 transition-all flex items-center gap-2">
                        Shop Bundles <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            )
        },
    ];

    return (
        <StandardPageLayout
            title="Andara Ionic 100ml"
            seoTitle="Andara Ionic 100ml - Product Highlight"
            seoDescription="Experience the primordial power of Andara Ionic 100ml minerals in a state-of-the-art interactive showcase."
            heroImage="/images/water/geometry.png" // Fallback/Base
        >
            <HeroGlass
                title="Andara Ionic 100ml"
                subtitle="The Primordial Architect of Biological Life."
                badgeText="Flagship Product"
                variant="cyan"
                registryId="water-geometry" // Background
            >
                {/* Product Float */}
                <div className="relative z-10 mt-12 mb-8 group">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-1000" />
                    <img
                        src="/assets/generated_images/andara-ionic-100ml-transparent.png"
                        alt="Andara Ionic 100ml Bottle"
                        className="relative w-64 md:w-80 mx-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                </div>

                <div className="flex gap-4 justify-center">
                    <button className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold tracking-wider uppercase text-sm shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] hover:scale-105 transition-all">
                        Add to Cart - $65.00
                    </button>
                </div>

            </HeroGlass>

            <FlowSection variant="obsidian">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-light text-white mb-6">
                        Liquid <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Architecture</span>
                    </h2>
                    <p className="text-xl text-slate-300 font-light leading-relaxed">
                        More than a supplement. A comprehensive mineral delivery system designed to restructure your internal terrain.
                    </p>
                </div>

                <LiquidBentoGrid items={features} />
            </FlowSection>

            {/* Sticky/Floating CTA for mobile if needed, or just bottom section */}
            <FlowSection variant="aurora" className="border-t border-white/5 py-24">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-display text-white mb-8">Ready to elevate your hydration?</h2>
                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <ActiveGlassCard className="p-6 w-full md:w-auto bg-slate-900/80 hover:bg-slate-800/80 cursor-pointer group">
                            <div className="text-emerald-400 font-bold text-xl mb-1">$65.00</div>
                            <div className="text-slate-400 text-sm">Single Bottle (100ml)</div>
                        </ActiveGlassCard>
                        <ActiveGlassCard className="p-6 w-full md:w-auto bg-gradient-to-br from-emerald-900/50 to-slate-900/50 border-emerald-500/30 hover:border-emerald-500/60 cursor-pointer group scale-110 shadow-2xl">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Best Value</div>
                            <div className="text-emerald-300 font-bold text-xl mb-1">$195.00</div>
                            <div className="text-slate-300 text-sm">3+1 Ritual Bundle (Buy 3 Get 1 Free)</div>
                        </ActiveGlassCard>
                    </div>
                </div>
            </FlowSection>

        </StandardPageLayout>
    );
}
