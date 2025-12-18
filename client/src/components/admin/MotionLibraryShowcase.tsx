
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CosmicPulse } from "@/components/motion/CosmicPulse";
import { WaterRipple } from "@/components/motion/WaterRipple";
import { ParticleFlow } from "@/components/motion/ParticleFlow";
import { HexagonalGrid } from "@/components/visuals/HexagonalGrid";
import { PlayCircle, PauseCircle, RefreshCw, Zap, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MotionLibraryShowcase() {
    const [activeTheme, setActiveTheme] = useState('water');
    const [isPlaying, setIsPlaying] = useState(true);

    const themes = ['water', 'mineral', 'matrix', 'bioelectric', 'sulfur', 'liquid', 'dna', 'earth'];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold">Motion Component Library</h2>
                    <p className="text-muted-foreground text-sm">Live preview of core motion archetypes across tree themes</p>
                </div>
                <div className="flex gap-2">
                    {themes.map(theme => (
                        <button
                            key={theme}
                            onClick={() => setActiveTheme(theme)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${activeTheme === theme
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background hover:bg-muted'
                                }`}
                        >
                            {theme}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Cosmic Pulse */}
                <Card className="overflow-hidden bg-black/5 dark:bg-black/40 border-primary/10">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-purple-500" />
                                    Cosmic Pulse
                                </CardTitle>
                                <CardDescription> concentric rings with breathing animation</CardDescription>
                            </div>
                            <Badge variant="outline">Background / Hero</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[300px] relative flex items-center justify-center overflow-hidden" data-tree={activeTheme}>
                        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/20 z-10 pointer-events-none" />
                        <CosmicPulse />
                        <div className="z-20 text-center relative">
                            <h3 className="text-2xl font-bold tracking-tighter mb-2">Pulsing Energy</h3>
                            <p className="text-sm opacity-70">Ripples through the {activeTheme} field</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Hexagonal Grid */}
                <Card className="overflow-hidden bg-black/5 dark:bg-black/40 border-primary/10">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Grid className="w-4 h-4 text-cyan-500" />
                                    Hexagonal Grid
                                </CardTitle>
                                <CardDescription>3D structured water visualization</CardDescription>
                            </div>
                            <Badge variant="outline">Background / Hero</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[300px] relative flex items-center justify-center overflow-hidden" data-tree={activeTheme}>
                        <HexagonalGrid className="absolute inset-0 opacity-60" />
                        <div className="z-20 text-center relative bg-background/20 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                            <h3 className="text-lg font-bold">Structured Water</h3>
                            <p className="text-xs opacity-70">Interactive Parallax</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Water Ripple */}
                <Card className="overflow-hidden bg-black/5 dark:bg-black/40 border-primary/10">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <RefreshCw className="w-4 h-4 text-blue-500" />
                                    Water Ripple
                                </CardTitle>
                                <CardDescription>Interaction-based surface distortion</CardDescription>
                            </div>
                            <Badge variant="outline">Interactive / Button</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[300px] relative flex items-center justify-center" data-tree={activeTheme}>
                        <WaterRipple className="w-full h-full absolute inset-0 opacity-50" />
                        <div className="z-10 bg-card/80 backdrop-blur px-6 py-3 rounded-xl border shadow-lg">
                            Hover Me
                        </div>
                    </CardContent>
                </Card>

                {/* Particle Flow */}
                <Card className="overflow-hidden bg-black/5 dark:bg-black/40 border-primary/10 col-span-1 lg:col-span-2">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <PlayCircle className="w-4 h-4 text-green-500" />
                                    Particle Flow
                                </CardTitle>
                                <CardDescription>Directional particle systems for sections</CardDescription>
                            </div>
                            <Badge variant="outline">Section Transition</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[300px] relative overflow-hidden" data-tree={activeTheme}>
                        <ParticleFlow count={30} />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold opacity-20">{activeTheme.toUpperCase()} FLOW</h2>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-center pt-8">
                <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline" size="lg">
                    {isPlaying ? <PauseCircle className="mr-2 w-4 h-4" /> : <PlayCircle className="mr-2 w-4 h-4" />}
                    {isPlaying ? 'Pause Animations' : 'Resume Animations'}
                </Button>
            </div>
        </div>
    );
}
