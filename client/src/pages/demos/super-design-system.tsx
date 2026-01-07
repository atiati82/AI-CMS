

import React, { useState } from 'react';
import SuperPageLayout, { SuperPageConfig } from "@/components/layouts/SuperPageLayout";
import { Zap, Mountain, Gem, Stars, ShieldCheck, Box, Atom, Fingerprint, Layers, ArrowRight, Wand2, Sparkles, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { VisualIntelligencePanel } from "@/components/admin/panels/VisualIntelligencePanel";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Initial Configuration
const INITIAL_CONFIG: SuperPageConfig = {
    theme: "hyperspace",
    hero: {
        badge: "Official Store",
        title: <span className="text-6xl md:text-8xl font-display font-medium text-white tracking-tight drop-shadow-2xl">
            One Mineral Intelligence.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">Two Formats.</span>
        </span>,
        subtitle: "Choose the format that fits your lifestyle. Same primordial formula, different scale."
    },
    portals: [
        {
            id: "style-nebula",
            title: "Style: Nebula",
            description: "Deep purples, cosmic dust, and infinite void.",
            icon: Stars,
            colorTheme: "purple"
        },
        {
            id: "style-coherence",
            title: "Style: Coherence",
            description: "Structured cyan grids and liquid data flow.",
            icon: Zap,
            colorTheme: "cyan"
        },
        {
            id: "style-alchemy",
            title: "Style: Alchemy",
            description: "Golden transmutation and ancient earth.",
            icon: Gem,
            colorTheme: "gold"
        }
    ],
    showcaseSections: [
        {
            id: "typography",
            title: "Typography & Hierarchy",
            description: "Our font pairing strategy: 'Outfit' for headers, 'Inter' for body.",
            columns: 2,
            items: [
                {
                    title: "Big Headings (Display)",
                    description: "Used for Hero sections and major impact.",
                    content: (
                        <div className="text-center">
                            <h1 className="text-5xl font-display text-white mb-2">Impact</h1>
                            <h2 className="text-4xl font-display text-white/50">Secondary</h2>
                        </div>
                    )
                },
                {
                    title: "Data & Labels (Mono)",
                    description: "Used for scientific data, specs, and labels.",
                    content: (
                        <div className="font-mono text-emerald-400 text-xs tracking-[0.2em] uppercase border border-emerald-500/30 px-3 py-1 rounded bg-emerald-500/10">
                            Ionic_Sulfate_V2
                        </div>
                    )
                }
            ]
        },
        {
            id: "card-styles",
            title: "Card Architectures",
            description: "Variations of the GlassCard component for different contexts.",
            columns: 3,
            items: [
                {
                    title: "Glass (Standard)",
                    description: "Blur background, delicate border.",
                    content: (
                        <div className="w-full h-24 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
                            <span className="text-white/50 text-xs">Glass</span>
                        </div>
                    )
                },
                {
                    title: "Holographic",
                    description: "Active state with inner glow and gradient.",
                    content: (
                        <div className="w-full h-24 rounded-lg bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/images/water/noise.png')] opacity-20 mix-blend-overlay" />
                            <span className="text-emerald-400 text-xs font-medium relative">Holo</span>
                        </div>
                    )
                },
                {
                    title: "Void (Minimal)",
                    description: "No background, just structural border.",
                    content: (
                        <div className="w-full h-24 rounded-lg border border-dashed border-white/20 flex items-center justify-center">
                            <span className="text-slate-500 text-xs">Void</span>
                        </div>
                    )
                }
            ]
        },
        {
            id: "interactive",
            title: "Interactive Elements",
            description: "Buttons, badges, and triggers.",
            columns: 4,
            items: [
                {
                    title: "Primary Button",
                    content: <Button className="bg-white text-black hover:bg-emerald-50 rounded-full px-6">Explore</Button>
                },
                {
                    title: "Outline Button",
                    content: <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-6">Details</Button>
                },
                {
                    title: "Icon Button",
                    content: <Button size="icon" className="rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/50"><Zap className="w-4 h-4" /></Button>
                },
                {
                    title: "Tech Badge",
                    content: <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] tracking-widest uppercase border border-blue-500/20 flex gap-2 items-center"><Atom className="w-3 h-3" /> Science</span>
                }
            ]
        },
        {
            id: "visual-dna",
            title: "Visual DNA Modules",
            description: "Themed sections used in smart layouts.",
            columns: 3,
            items: [
                {
                    title: "Water (Cyan)",
                    description: "Flow, purity, structure.",
                    content: <div className="w-12 h-12 rounded-full bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.6)] animate-pulse" />
                },
                {
                    title: "Mineral (Blue)",
                    description: "Crystalline, solid, foundational.",
                    content: <div className="w-12 h-12 rounded-none rotate-45 bg-blue-500 border-2 border-white/50 shadow-[0_0_20px_rgba(59,130,246,0.4)]" />
                },
                {
                    title: "Bioelectric (Emerald)",
                    description: "Voltage, life, energy.",
                    content: <div className="w-12 h-12 rounded-full border-4 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center"><Zap className="w-6 h-6 text-emerald-500" /></div>
                }
            ]
        }
    ],
    product: {
        registryId: "product-100ml-nature",
        title: "The Design System",
        subtitle: "Global Configuration",
        description: "A centralized, data-driven system that powers every page of the Andara ecosystem. Modify once, propagate everywhere.",
        price: "V2.0",
        features: [
            "Atomic Components",
            "Visual DNA Mapping",
            "Responsive Grid",
            "Motion Primitives"
        ]
    }
};

export default function SuperDesignSystem() {
    const [config, setConfig] = useState<SuperPageConfig>(INITIAL_CONFIG);
    const [prompt, setPrompt] = useState("Volcanic obsidian fire with golden magma cracks"); // Default interesting prompt
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [activePrompt, setActivePrompt] = useState("");

    const handleApplyTheme = (aiOutput: any) => {
        const { colorField, hero } = aiOutput;

        // Map AI colors to partial config override
        const newTheme: Partial<SuperPageConfig> = {
            // In a real implementation we would have dynamic CSS variable injection here
            // For now we simulate by updating content text to reflect the new "State"
            hero: {
                ...config.hero,
                badge: `AI Theme: ${colorField.world}`,
                title: <span className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r" style={{
                    backgroundImage: `linear-gradient(to right, ${colorField.primaryColor}, ${colorField.accentColor}, ${colorField.glowColor})`
                }}>{hero.headline || "Visual Intelligence"}</span>,
                subtitle: `Generated from: "${prompt}"`
            }
        };

        setConfig(prev => ({
            ...prev,
            ...newTheme
        }));

        setIsPanelOpen(false);
    };

    const runSimulation = () => {
        setActivePrompt(prompt);
        setIsPanelOpen(true);
    };

    return (
        <div className="relative">
            {/* AI Control Floating Panel */}
            <div className="fixed top-24 right-6 z-50 w-80 animate-in fade-in slide-in-from-right-10 duration-700">
                <Card className="andara-glass-card border-l-4 border-l-purple-500 shadow-2xl backdrop-blur-xl bg-black/40">
                    <CardContent className="p-4 space-y-4">
                        <div className="flex items-center gap-2 text-purple-300 font-medium">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span>AI Design Studio</span>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-slate-400">Describe a visual vibe:</label>
                            <div className="flex gap-2">
                                <Input
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="bg-black/30 border-white/10 text-xs h-8"
                                    placeholder="e.g. Deep ocean bioluminescence..."
                                />
                                <Button size="sm" onClick={runSimulation} className="bg-purple-600 hover:bg-purple-500 h-8 px-3">
                                    <Wand2 className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>

                        {/* {activePrompt && (
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <VisualIntelligencePanel
                                    pageTitle={activePrompt}
                                    pageContent={`Generate a visual design system for: ${activePrompt}`}
                                    onApply={handleApplyTheme}
                                />
                            </div>
                        )} */}
                    </CardContent>
                </Card>
            </div>

            <SuperPageLayout config={config} />
        </div>
    );
}
