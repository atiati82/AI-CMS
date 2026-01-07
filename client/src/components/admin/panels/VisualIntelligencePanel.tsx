
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Palette, Type, Move, Zap, RefreshCw } from 'lucide-react';
import { cn } from "@/lib/utils";

interface VisualIntelligencePanelProps {
    pageTitle: string;
    pageContent: string;
    onApply?: (config: any) => void;
}

export function VisualIntelligencePanel({ pageTitle, pageContent, onApply }: VisualIntelligencePanelProps) {
    const { data: analysis, isLoading, refetch, isError } = useQuery({
        queryKey: ['visual-interpretation', pageTitle],
        queryFn: async () => {
            const res = await apiRequest('POST', '/api/admin/interpret', {
                brief: pageContent || pageTitle,
                pageSlug: pageTitle,
            });
            return res.json();
        },
        enabled: !!pageTitle,
        staleTime: 1000 * 60 * 60, // Cache for 1 hour unless manually refreshed
    });

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-full blur-xl opacity-30 animate-pulse" />
                    <Loader2 className="w-8 h-8 animate-spin text-white relative z-10" />
                </div>
                <p className="text-sm text-muted-foreground animate-pulse">Consulting Visual Intelligence...</p>
            </div>
        );
    }

    if (isError || !analysis) {
        return (
            <div className="p-6 text-center space-y-4">
                <p className="text-sm text-red-400">Failed to analyze visual context.</p>
                <Button variant="outline" size="sm" onClick={() => refetch()}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Retry
                </Button>
            </div>
        );
    }

    const { output } = analysis;
    if (!output) return null;

    const { colorField, typography, motion, hero, signature } = output;

    return (
        <div className="space-y-6 p-1">
            {/* Header / Context */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        Andara Design AI
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Detected visual world: <span className="text-amber-300 font-medium">{colorField.world}</span>
                    </p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => refetch()}>Refresh</Button>
            </div>

            {/* 1. Color World */}
            <Card className="andara-glass-card border-l-4" style={{ borderLeftColor: colorField.primaryColor }}>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Palette className="w-4 h-4 opacity-70" /> Color System
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Primary</span>
                        <div className="flex items-center gap-2">
                            <code className="bg-black/20 px-1 rounded">{colorField.primaryColor}</code>
                            <div className="w-4 h-4 rounded-full border border-white/20 shadow-[0_0_10px_currentColor]" style={{ backgroundColor: colorField.primaryColor, color: colorField.glowColor }} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Accent</span>
                        <div className="flex items-center gap-2">
                            <code className="bg-black/20 px-1 rounded">{colorField.accentColor}</code>
                            <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: colorField.accentColor }} />
                        </div>
                    </div>
                    <div className="p-2 bg-white/5 rounded-md border border-white/5 italic text-white/70">
                        "{colorField.emotion}"
                    </div>
                </CardContent>
            </Card>

            {/* 2. Typography & Motion */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="andara-glass-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Type className="w-4 h-4 opacity-70" /> Typography
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2 text-muted-foreground">
                        <p><strong className="text-white/80">Headline:</strong> {typography.headlines.split(',')[0]}</p>
                        <p><strong className="text-white/80">Body:</strong> {typography.body.split(',')[0]}</p>
                    </CardContent>
                </Card>

                <Card className="andara-glass-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Move className="w-4 h-4 opacity-70" /> Motion Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2 text-muted-foreground">
                        <p className="line-clamp-3">{signature.motionStyle}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                            {Object.keys(motion.advancedEffects || {}).map(k => (
                                <Badge key={k} variant="secondary" className="text-[10px] px-1 h-5">{k}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 3. Hero Concept */}
            <Card className="andara-glass-card border-violet-500/20">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Zap className="w-4 h-4 text-violet-400" /> Hero Visualization
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-3">
                    <p className="text-white/80 leading-relaxed">
                        {hero.description}
                    </p>
                    <div className="flex gap-2">
                        <Button size="sm" className="w-full h-7 text-xs bg-violet-600/30 hover:bg-violet-600/50 text-violet-100 border border-violet-500/30">
                            Apply Hero Style
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {onApply && (
                <Button onClick={() => onApply(output)} className="w-full andara-btn-shine">
                    Apply Design System to Page
                </Button>
            )}
        </div>
    );
}


