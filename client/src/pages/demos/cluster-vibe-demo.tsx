/**
 * Cluster Vibe Demo Page
 * ------------------------------------------------------------------
 * Shows BEFORE vs AFTER: How cluster visual vibes transform page design.
 * 
 * This demonstrates the difference between:
 * - Generic styling (no cluster vibe applied)
 * - Cluster-aware styling (using visualVibe from Water Science cluster)
 */

import React, { useState, useEffect } from "react";
import { Waves, Zap, Droplets, ArrowRight, Sparkles, Eye, EyeOff, ToggleLeft, ToggleRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


// The cluster vibe data (from database - water-science cluster)
const WATER_SCIENCE_VIBE = {
    color: "#1aa7ff",
    vibeKeywords: ["water structure", "liquid architecture", "lightboard teaching", "diagrams", "clarity"],
    emotionalTone: ["playful learning", "wonder", "simplicity"],
    animationIdeas: ["ocean-blue and turquoise gradients", "wave geometry", "diagram-like overlays"],
    aiImagePromptPattern: "16:9 water science header. Dark void with ocean-blue and turquoise gradients, subtle wave geometry and clean diagram-like overlays, modern educational style, 8k.",
    designerNotes: "Encourage diagrams + simple animations. Keep it bright and friendly."
};

// Generic design (no cluster vibe)
const GenericSection = () => (
    <div className="space-y-8 p-8 bg-slate-900/50 rounded-2xl border border-white/10">
        {/* Generic Hero */}
        <div className="text-center py-12">
            <h2 className="text-4xl font-bold text-white mb-4">Water Science</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
                Learn about water structure and how it affects health.
            </p>
        </div>

        {/* Generic Cards */}
        <div className="grid gap-4 md:grid-cols-2">
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <Waves className="w-8 h-8 text-slate-400 mb-3" />
                <h3 className="text-lg font-medium text-white mb-2">EZ Water</h3>
                <p className="text-sm text-slate-500">
                    The fourth phase of water. A gel-like exclusion zone.
                </p>
            </div>
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <Droplets className="w-8 h-8 text-slate-400 mb-3" />
                <h3 className="text-lg font-medium text-white mb-2">Structure</h3>
                <p className="text-sm text-slate-500">
                    Molecular clustering and geometry in water.
                </p>
            </div>
        </div>

        {/* Generic CTA */}
        <div className="text-center pt-8">
            <Button variant="outline" className="border-slate-600">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
    </div>
);

// Vibe-enhanced design (using cluster visual vibe)
const VibeEnhancedSection = () => (
    <div
        className="space-y-8 p-8 rounded-2xl relative overflow-hidden"
        style={{
            background: `linear-gradient(135deg, ${WATER_SCIENCE_VIBE.color}10 0%, transparent 50%, ${WATER_SCIENCE_VIBE.color}05 100%)`,
            borderColor: `${WATER_SCIENCE_VIBE.color}30`,
            borderWidth: 1,
            borderStyle: 'solid'
        }}
    >
        {/* Animated background waves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
                className="absolute -bottom-20 left-0 right-0 h-40 opacity-10"
                style={{
                    background: `repeating-linear-gradient(
                        90deg,
                        ${WATER_SCIENCE_VIBE.color}00 0px,
                        ${WATER_SCIENCE_VIBE.color}40 50px,
                        ${WATER_SCIENCE_VIBE.color}00 100px
                    )`,
                    animation: 'wave 10s ease-in-out infinite'
                }}
            />
            {/* Diagram-like overlay grid */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `
                        linear-gradient(${WATER_SCIENCE_VIBE.color}20 1px, transparent 1px),
                        linear-gradient(90deg, ${WATER_SCIENCE_VIBE.color}20 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            />
        </div>

        {/* Vibe-enhanced Hero */}
        <div className="text-center py-12 relative z-10">
            {/* Vibe keyword badges */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {WATER_SCIENCE_VIBE.vibeKeywords.slice(0, 3).map((keyword, i) => (
                    <Badge
                        key={i}
                        variant="outline"
                        className="text-xs font-medium px-3 py-1 animate-pulse"
                        style={{
                            borderColor: `${WATER_SCIENCE_VIBE.color}50`,
                            color: WATER_SCIENCE_VIBE.color,
                            animationDelay: `${i * 0.3}s`
                        }}
                    >
                        {keyword}
                    </Badge>
                ))}
            </div>

            <h2
                className="text-5xl font-display font-light tracking-tight mb-4"
                style={{
                    background: `linear-gradient(135deg, ${WATER_SCIENCE_VIBE.color} 0%, #00d4ff 50%, ${WATER_SCIENCE_VIBE.color} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% 200%',
                    animation: 'shimmer 3s ease-in-out infinite'
                }}
            >
                Water Science
            </h2>

            {/* Emotional tone subtitle */}
            <p className="text-lg mb-4" style={{ color: `${WATER_SCIENCE_VIBE.color}cc` }}>
                <span className="italic">{WATER_SCIENCE_VIBE.emotionalTone[0]}</span> • <span className="italic">{WATER_SCIENCE_VIBE.emotionalTone[1]}</span>
            </p>

            <p className="text-slate-300 max-w-xl mx-auto leading-relaxed">
                Discover the <strong style={{ color: WATER_SCIENCE_VIBE.color }}>liquid architecture</strong> that underlies all life.
                From molecular geometry to coherent domains.
            </p>
        </div>

        {/* Vibe-enhanced Cards with cluster color theming */}
        <div className="grid gap-6 md:grid-cols-2 relative z-10">
            <div
                className="group p-8 rounded-2xl relative overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                style={{
                    background: `linear-gradient(135deg, ${WATER_SCIENCE_VIBE.color}15 0%, transparent 100%)`,
                    border: `1px solid ${WATER_SCIENCE_VIBE.color}30`
                }}
            >
                {/* Glow effect on hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${WATER_SCIENCE_VIBE.color}20 0%, transparent 70%)`
                    }}
                />
                <Waves
                    className="w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: WATER_SCIENCE_VIBE.color }}
                />
                <h3 className="text-2xl font-display text-white mb-3">
                    EZ Water <span style={{ color: WATER_SCIENCE_VIBE.color }}>Zone</span>
                </h3>
                <p className="text-slate-400 leading-relaxed">
                    The fourth phase of water—a <strong className="text-slate-200">gel-like exclusion zone</strong> that acts as a battery, holding charge and excluding solutes.
                </p>
                {/* Animation idea indicator */}
                <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: `${WATER_SCIENCE_VIBE.color}80` }}>
                    <Sparkles className="w-3 h-3" />
                    <span>{WATER_SCIENCE_VIBE.animationIdeas[0]}</span>
                </div>
            </div>

            <div
                className="group p-8 rounded-2xl relative overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                style={{
                    background: `linear-gradient(135deg, transparent 0%, ${WATER_SCIENCE_VIBE.color}15 100%)`,
                    border: `1px solid ${WATER_SCIENCE_VIBE.color}30`
                }}
            >
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${WATER_SCIENCE_VIBE.color}20 0%, transparent 70%)`
                    }}
                />
                <Droplets
                    className="w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: WATER_SCIENCE_VIBE.color }}
                />
                <h3 className="text-2xl font-display text-white mb-3">
                    Liquid <span style={{ color: WATER_SCIENCE_VIBE.color }}>Architecture</span>
                </h3>
                <p className="text-slate-400 leading-relaxed">
                    Molecular clustering creates <strong className="text-slate-200">coherent geometry</strong>—the hidden structure that determines hydration efficiency.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: `${WATER_SCIENCE_VIBE.color}80` }}>
                    <Sparkles className="w-3 h-3" />
                    <span>{WATER_SCIENCE_VIBE.animationIdeas[1]}</span>
                </div>
            </div>
        </div>

        {/* Vibe-enhanced CTA */}
        <div className="text-center pt-8 relative z-10">
            <button
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                    background: `linear-gradient(135deg, ${WATER_SCIENCE_VIBE.color} 0%, #00d4ff 100%)`,
                    color: '#000',
                    boxShadow: `0 0 30px ${WATER_SCIENCE_VIBE.color}40`
                }}
            >
                <Zap className="w-5 h-5" />
                Explore Water Science
                <ArrowRight className="w-5 h-5" />
            </button>
        </div>

        {/* Designer notes indicator */}
        <div className="mt-8 p-4 rounded-lg bg-black/30 border border-white/5 relative z-10">
            <p className="text-xs text-slate-500 italic">
                <strong className="text-slate-400">Designer Notes:</strong> {WATER_SCIENCE_VIBE.designerNotes}
            </p>
        </div>
    </div>
);

export default function ClusterVibeDemo() {
    const [showVibe, setShowVibe] = useState(false);
    const [splitView, setSplitView] = useState(true);

    useEffect(() => {
        document.title = "Cluster Vibe Demo – Before & After";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", "See how cluster visual vibes transform page design from generic to emotionally resonant.");
        }
    }, []);

    return (
        <>


            {/* CSS Animations */}
            <style>{`
                @keyframes shimmer {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes wave {
                    0%, 100% { transform: translateX(-20px) translateY(0); }
                    50% { transform: translateX(20px) translateY(-10px); }
                }
            `}</style>

            <div className="min-h-screen bg-slate-950 text-white">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-amber-400" />
                                Cluster Vibe Demo
                            </h1>
                            <p className="text-sm text-slate-400">Before & After comparison</p>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* View Toggle */}
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-slate-400">Split View</span>
                                <button
                                    onClick={() => setSplitView(!splitView)}
                                    className={`p-1 rounded transition-colors ${splitView ? 'text-emerald-400' : 'text-slate-500'}`}
                                >
                                    {splitView ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                                </button>
                            </div>

                            {!splitView && (
                                <Button
                                    variant={showVibe ? "default" : "outline"}
                                    onClick={() => setShowVibe(!showVibe)}
                                    className="transition-all"
                                >
                                    {showVibe ? (
                                        <><Eye className="w-4 h-4 mr-2" /> Vibe Applied</>
                                    ) : (
                                        <><EyeOff className="w-4 h-4 mr-2" /> Generic Mode</>
                                    )}
                                </Button>
                            )}

                            <Link href="/admin">
                                <Button variant="ghost" size="sm">← Admin</Button>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Cluster Vibe Data Panel */}
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-white/10 mb-8">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-medium text-white flex items-center gap-2">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: WATER_SCIENCE_VIBE.color }}
                                    />
                                    Cluster: Water Science
                                </h3>
                                <p className="text-xs text-slate-500 mt-1">
                                    Visual vibe from database → applied to page design
                                </p>
                            </div>
                            <div className="text-right">
                                <Badge style={{ backgroundColor: `${WATER_SCIENCE_VIBE.color}20`, color: WATER_SCIENCE_VIBE.color }}>
                                    {WATER_SCIENCE_VIBE.color}
                                </Badge>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-xs">
                            <div>
                                <span className="text-slate-500 block mb-1">Vibe Keywords</span>
                                <div className="flex flex-wrap gap-1">
                                    {WATER_SCIENCE_VIBE.vibeKeywords.map((k, i) => (
                                        <Badge key={i} variant="outline" className="text-[10px]">{k}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="text-slate-500 block mb-1">Emotional Tone</span>
                                <div className="flex flex-wrap gap-1">
                                    {WATER_SCIENCE_VIBE.emotionalTone.map((t, i) => (
                                        <Badge key={i} variant="outline" className="text-[10px] border-purple-500/30 text-purple-300">{t}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="text-slate-500 block mb-1">Animation Ideas</span>
                                <div className="flex flex-wrap gap-1">
                                    {WATER_SCIENCE_VIBE.animationIdeas.map((a, i) => (
                                        <Badge key={i} variant="outline" className="text-[10px] border-amber-500/30 text-amber-300">{a}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="text-slate-500 block mb-1">AI Image Prompt</span>
                                <p className="text-slate-400 line-clamp-2">{WATER_SCIENCE_VIBE.aiImagePromptPattern}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comparison */}
                <div className="max-w-7xl mx-auto px-6 pb-20">
                    {splitView ? (
                        /* Side-by-side view */
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-slate-600" />
                                    <h2 className="text-lg font-medium text-slate-400">BEFORE: Generic Styling</h2>
                                </div>
                                <GenericSection />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div
                                        className="w-3 h-3 rounded-full animate-pulse"
                                        style={{ backgroundColor: WATER_SCIENCE_VIBE.color }}
                                    />
                                    <h2 className="text-lg font-medium" style={{ color: WATER_SCIENCE_VIBE.color }}>
                                        AFTER: Cluster Vibe Applied
                                    </h2>
                                </div>
                                <VibeEnhancedSection />
                            </div>
                        </div>
                    ) : (
                        /* Toggle view */
                        <div className="transition-all duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                {showVibe ? (
                                    <>
                                        <div
                                            className="w-3 h-3 rounded-full animate-pulse"
                                            style={{ backgroundColor: WATER_SCIENCE_VIBE.color }}
                                        />
                                        <h2 className="text-lg font-medium" style={{ color: WATER_SCIENCE_VIBE.color }}>
                                            AFTER: Cluster Vibe Applied
                                        </h2>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-3 h-3 rounded-full bg-slate-600" />
                                        <h2 className="text-lg font-medium text-slate-400">BEFORE: Generic Styling</h2>
                                    </>
                                )}
                            </div>
                            {showVibe ? <VibeEnhancedSection /> : <GenericSection />}
                        </div>
                    )}
                </div>

                {/* What Changed Summary */}
                <div className="bg-slate-900/80 border-t border-white/10 py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-2xl font-display text-white mb-8 text-center">What the Cluster Vibe Changed</h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: WATER_SCIENCE_VIBE.color }} />
                                    Color System
                                </h3>
                                <ul className="text-sm text-slate-400 space-y-2">
                                    <li>• Cluster color <code className="text-xs bg-black/30 px-1 rounded">{WATER_SCIENCE_VIBE.color}</code> applied to gradients</li>
                                    <li>• Icon colors themed to cluster</li>
                                    <li>• Border and glow effects use cluster color</li>
                                    <li>• CTA button uses cluster gradient</li>
                                </ul>
                            </div>

                            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                    Emotional Resonance
                                </h3>
                                <ul className="text-sm text-slate-400 space-y-2">
                                    <li>• Vibe keywords shown as badges</li>
                                    <li>• Emotional tone words in subtitle</li>
                                    <li>• Copy uses vibe vocabulary ("liquid architecture")</li>
                                    <li>• Animation hints from cluster data</li>
                                </ul>
                            </div>

                            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-amber-400" />
                                    Visual Effects
                                </h3>
                                <ul className="text-sm text-slate-400 space-y-2">
                                    <li>• Wave animation in background</li>
                                    <li>• Diagram-like grid overlay</li>
                                    <li>• Shimmer gradient on title</li>
                                    <li>• Glow effects on hover</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
