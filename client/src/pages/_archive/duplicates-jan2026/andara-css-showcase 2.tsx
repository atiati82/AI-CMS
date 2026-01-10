// @ts-nocheck
import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { HeroGlass } from "@/components/visuals/HeroGlass";
import { FlowSection, ActiveGlassCard } from "@/components/design/LiquidAlchemyExpansion";
import { Link } from "wouter";
import {
    LayoutGrid, Type, Droplets, Component, Palette, Sparkles,
    PlayCircle, FlaskConical, ChevronRight, Zap, Layers
} from "lucide-react";

export default function AndaraCssShowcase() {

    // --- Data ---
    const LAYOUT_LINKS = [
        // { path: "/demo/liquid-expansion", label: "Liquid Alchemy V2", icon: "🔮" }, // TODO: Locate this page
        // { path: "/demo/layout-v6", label: "Hyperspace (V6)", icon: "🚀" }, // TODO: Locate v6 demo
        { path: "/science/ez-water-overview", label: "EZ Water Scrolly", icon: "💧" },
        { path: "/science/cell-voltage", label: "Cell Voltage", icon: "⚡" },
        { path: "/science/magnetics-water", label: "Magnetics Flow", icon: "🧲" },
        { path: "/science/crystalline-matrix-overview", label: "Crystalline Matrix", icon: "💠" },
        { path: "/science/vortexing-spirals-flow-coherence", label: "Vortex Spin", icon: "🌀" },
        { path: "/science/ez-geometry-map", label: "Water Crystal", icon: "❄️" },
        { path: "/science/tetrahedral-sulfate-geometry", label: "Tetrahedral", icon: "💎" },
        // { path: "/demo/motion-lab", label: "Motion Lab", icon: "🔬" }, // TODO: Locate Motion Lab
        { path: "/demo/gold-loader", label: "Gold Loader", icon: "⏳" },
        { path: "/demo/icons", label: "Gold Icons", icon: "✨" },
    ];

    return (
        <StandardPageLayout>
            <HeroGlass
                title="Design System Showcase"
                subtitle="A living archive of the Liquid Alchemy visual language, component library, and layout experiments."
                badgeText="Style Guide"
                variant="gold"
            />

            {/* --- 1. Layout Archive --- */}
            <FlowSection variant="obsidian">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
                            <LayoutGrid className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-display text-white">Layout Archive</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {LAYOUT_LINKS.map((link, i) => (
                            <Link key={i} href={link.path}>
                                <ActiveGlassCard className="p-6 flex flex-col items-center justify-center gap-4 text-center cursor-pointer h-full group/card hover:bg-white/5">
                                    <span className="text-4xl filter drop-shadow-lg group-hover/card:scale-110 transition-transform duration-300">
                                        {link.icon}
                                    </span>
                                    <span className="text-sm font-bold text-slate-300 uppercase tracking-wide group-hover/card:text-emerald-400 transition-colors">
                                        {link.label}
                                    </span>
                                </ActiveGlassCard>
                            </Link>
                        ))}
                    </div>
                </div>
            </FlowSection>

            {/* --- 2. Typography --- */}
            <FlowSection variant="aurora" className="border-t border-white/5">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
                            <Type className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-display text-white">Typography</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Display */}
                        <div className="space-y-8">
                            <div className="p-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm">
                                <span className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-4 block">Display Font (Surrounding)</span>
                                <h1 className="text-6xl md:text-7xl font-display font-light text-white mb-2">
                                    Liquid Alchemy
                                </h1>
                                <h1 className="text-6xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-600">
                                    Golden Ratio
                                </h1>
                            </div>
                            <div className="p-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm">
                                <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest mb-4 block">Standard Headings (Inter)</span>
                                <div className="space-y-4">
                                    <h1 className="text-4xl font-bold text-white">Heading Level 1</h1>
                                    <h2 className="text-3xl font-bold text-white">Heading Level 2</h2>
                                    <h3 className="text-2xl font-bold text-white">Heading Level 3</h3>
                                    <h4 className="text-xl font-bold text-white">Heading Level 4</h4>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="space-y-8">
                            <div className="p-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm h-full">
                                <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-4 block">Body Content</span>
                                <div className="space-y-6 text-slate-300">
                                    <p className="text-lg leading-relaxed">
                                        <strong className="text-white">Large Body:</strong> The mineral kingdom communicates through light and frequency.
                                        Ionic minerals serve as the bridge between voltage and biology.
                                    </p>
                                    <p className="leading-relaxed">
                                        <strong className="text-white">Regular Body:</strong> Water is not merely a solvent; it is a liquid crystal capacitor
                                        capable of storing information, energy, and intention. The fourth phase of water (EZ)
                                        demonstrates this structural capacity.
                                    </p>
                                    <p className="text-sm leading-relaxed text-slate-400">
                                        <strong className="text-white">Small / Caption:</strong> Used for metadata, technical specifications, and
                                        footnote references in scientific documentation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FlowSection>

            {/* --- 3. Color System --- */}
            <FlowSection variant="obsidian" className="border-t border-white/5">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
                            <Palette className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-display text-white">Color Worlds</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Emerald */}
                        <ActiveGlassCard className="p-6 space-y-4" spotlightColor="rgba(16, 185, 129, 0.2)" borderColor="rgba(16, 185, 129, 0.3)">
                            <div className="h-24 w-full rounded-lg bg-gradient-to-r from-emerald-900 via-emerald-600 to-emerald-400" />
                            <div>
                                <h3 className="text-lg font-bold text-white">Emerald Life</h3>
                                <p className="text-sm text-slate-400">Healing, Biology, Nature</p>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <div className="h-8 rounded bg-emerald-400" />
                                <div className="h-8 rounded bg-emerald-500" />
                                <div className="h-8 rounded bg-emerald-600" />
                                <div className="h-8 rounded bg-emerald-900" />
                            </div>
                        </ActiveGlassCard>

                        {/* Amber */}
                        <ActiveGlassCard className="p-6 space-y-4" spotlightColor="rgba(245, 158, 11, 0.2)" borderColor="rgba(245, 158, 11, 0.3)">
                            <div className="h-24 w-full rounded-lg bg-gradient-to-r from-amber-900 via-amber-600 to-amber-400" />
                            <div>
                                <h3 className="text-lg font-bold text-white">Amber Gold</h3>
                                <p className="text-sm text-slate-400">Conductivity, Wealth, Energy</p>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <div className="h-8 rounded bg-amber-400" />
                                <div className="h-8 rounded bg-amber-500" />
                                <div className="h-8 rounded bg-amber-600" />
                                <div className="h-8 rounded bg-amber-900" />
                            </div>
                        </ActiveGlassCard>

                        {/* Cyan */}
                        <ActiveGlassCard className="p-6 space-y-4" spotlightColor="rgba(6, 182, 212, 0.2)" borderColor="rgba(6, 182, 212, 0.3)">
                            <div className="h-24 w-full rounded-lg bg-gradient-to-r from-cyan-900 via-cyan-600 to-cyan-400" />
                            <div>
                                <h3 className="text-lg font-bold text-white">Crystalline Cyan</h3>
                                <p className="text-sm text-slate-400">Water, Structure, Ice</p>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <div className="h-8 rounded bg-cyan-400" />
                                <div className="h-8 rounded bg-cyan-500" />
                                <div className="h-8 rounded bg-cyan-600" />
                                <div className="h-8 rounded bg-cyan-900" />
                            </div>
                        </ActiveGlassCard>
                    </div>
                </div>
            </FlowSection>

            {/* --- 4. Component Zoo --- */}
            <FlowSection variant="aurora" className="border-t border-white/5">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                            <Component className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-display text-white">Component Zoo</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Buttons */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white/50 uppercase tracking-widest text-sm">Interactive Elements</h3>
                            <div className="p-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm space-y-8">
                                <div>
                                    <label className="text-xs text-slate-500 uppercase block mb-3">.andara-btn-gold</label>
                                    <button className="andara-btn-gold w-full text-center">
                                        Gold Ingot Button
                                    </button>
                                </div>
                                <div className="flex gap-4">
                                    <button className="px-6 py-3 rounded-full bg-slate-800 border border-white/10 text-white font-bold text-sm hover:bg-slate-700 transition-colors flex-1">
                                        Secondary
                                    </button>
                                    <button className="px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-sm hover:bg-emerald-500/30 transition-colors flex-1">
                                        Accent
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Badges & Inputs */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white/50 uppercase tracking-widest text-sm">Badges & Inputs</h3>
                            <div className="p-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm space-y-8">
                                <div>
                                    <label className="text-xs text-slate-500 uppercase block mb-3">Badges</label>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="andara-badge-crystal">
                                            <Sparkles className="w-3 h-3 text-emerald-400" />
                                            Crystal Badge
                                        </span>
                                        <span className="andara-card-tag">Tag</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500 uppercase block mb-3">Glass Input</label>
                                    <input
                                        type="text"
                                        className="andara-input-glass w-full px-4 py-3 rounded-lg"
                                        placeholder="Type something here..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FlowSection>

        </StandardPageLayout>
    );
}
// @ts-nocheck
