import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Box, Layout, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageLayoutSettings() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold">Page Layout Engine</h3>
                    <p className="text-sm text-muted-foreground">
                        Configure the default visual system for dynamic pages.
                    </p>
                </div>
                <Badge variant="outline" className="border-amber-500/50 text-amber-500 bg-amber-500/10">
                    <Zap className="w-3 h-3 mr-1 fill-current" />
                    Advanced Layout Proposed
                </Badge>
            </div>

            {/* Layout Systems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Standard System */}
                <Card className="border-2 border-transparent hover:border-slate-800 transition-colors cursor-pointer group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Layout className="w-5 h-5 text-slate-400" />
                            Standard Layout
                        </CardTitle>
                        <CardDescription>Current Default</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                        <p>The clean, glassmorphic foundation used across most pages.</p>
                        <ul className="list-disc list-inside space-y-1 mt-2">
                            <li>Static Header</li>
                            <li>Emerald/Slate Palette</li>
                            <li>Standard Animations</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Advanced System (Proposed) */}
                <Card className="border-2 border-amber-500/20 bg-amber-950/5 cursor-pointer relative overflow-hidden group">
                    <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-5 h-5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-500">
                            <Layers className="w-5 h-5" />
                            Advanced Layout (v2)
                        </CardTitle>
                        <CardDescription className="text-amber-500/70">Cinematic & Dynamic</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                        <p>A richer experience with Gold styling and parallax effects.</p>
                        <ul className="list-disc list-inside space-y-1 mt-2 text-slate-400">
                            <li>Sticky Glass Navigation</li>
                            <li>Cinematic Scroll-Fade</li>
                            <li><strong>Gold</strong> Variant Enabled</li>
                        </ul>
                        <Button size="sm" variant="outline" className="mt-4 w-full border-amber-500/20 hover:bg-amber-500/10 hover:text-amber-400" asChild>
                            <a href="/demo/layout-v2" target="_blank">Preview Demo <ArrowRight className="w-3 h-3 ml-2" /></a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Components Inventory (Lego Blocks) */}
            <div className="bg-muted/30 border rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                        <Box className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Registered Components (Lego Blocks)</h3>
                        <p className="text-sm text-muted-foreground">
                            These blocks are available for use in the CMS "AI Startup HTML" field.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: "<andara-hero>", desc: "Page Title & Badge" },
                        { name: "<glass-card>", desc: "Content Box (Default/Gold)" },
                        { name: "<smart-image>", desc: "AI-Resolved Visual" },
                        { name: "<bundle-cta>", desc: "Shop Integration" },
                        { name: "<accordion>", desc: "Collapsible FAQ Details" },
                        { name: "<info-tooltip>", desc: "Rich Text Definitions" }
                    ].map((comp) => (
                        <div key={comp.name} className="p-3 bg-card border rounded-md text-center">
                            <code className="text-xs font-mono font-bold text-primary block mb-1">{comp.name}</code>
                            <span className="text-[10px] text-muted-foreground">{comp.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Scroll Effects Inventory */}
            <div className="bg-muted/30 border rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                        <Box className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Interactive Scroll Effects</h3>
                        <p className="text-sm text-muted-foreground">
                            High-fidelity Motion Primitives (Framer Motion).
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { name: "Parallax Reveal", desc: "Depth masking effect", icon: "🎭" },
                        { name: "Scale Down", desc: "Focus out transition", icon: "🔍" },
                        { name: "Horizontal Drift", desc: "Sideways text movement", icon: "↔️" },
                        { name: "3D Card Flip", desc: "X-Axis rotation", icon: "🔄" },
                        { name: "Blur Out", desc: "Gaussian blur exit", icon: "🌫️" },
                        { name: "Color Shift", desc: "Reactive background/text", icon: "🎨" },
                        { name: "Staggered Text", desc: "Character reveal", icon: "📝" },
                        { name: "Sticky Stack", desc: "Overlapping cards", icon: "📚" },
                        { name: "Pin & Zoom", desc: "Cinematic deep dive", icon: "📍" },
                        { name: "Progress Bar", desc: "Reading indicator", icon: "📏" }
                    ].map((effect) => (
                        <div key={effect.name} className="flex items-center gap-3 p-3 bg-card border rounded-md hover:border-purple-500/50 hover:bg-purple-500/5 transition-all cursor-pointer group">
                            <span className="text-xl group-hover:scale-110 transition-transform">{effect.icon}</span>
                            <div>
                                <div className="text-xs font-bold text-slate-200">{effect.name}</div>
                                <div className="text-[10px] text-muted-foreground">{effect.desc}</div>
                            </div>
                            <CheckCircle2 className="w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 ml-auto" />
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-between items-center bg-black/20 p-4 rounded-lg">
                    <div className="text-xs text-slate-400">
                        * These effects are available in the <code className="text-purple-400">@/lib/scroll-effects-registry</code>
                    </div>
                    <Button size="sm" variant="default" className="bg-purple-600 hover:bg-purple-500 text-white" asChild>
                        <a href="/demo/scroll-effect" target="_blank">Launch Effects Museum <ArrowRight className="w-3 h-3 ml-2" /></a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
