import React, { useState, useEffect, Suspense, lazy } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Palette, Sparkles, PlayCircle, ImageIcon, Layers, Zap, X, CheckCircle2, Type, LayoutGrid, Droplets, Component, Cuboid, ChevronDown, ChevronRight, FlaskConical, Library } from "lucide-react";
import { MotionLibraryShowcase } from "@/components/admin/MotionLibraryShowcase";
import { MotionLibraryPreview } from "@/components/motion-library-preview";
import DesignTokensTab from "./DesignTokensTab";
import { ContentBlockShowcase } from "@/components/admin/design/ContentBlockShowcase";
import { LayoutLibraryBrowser } from "@/components/admin/LayoutLibraryBrowser";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

const HexagonalLatticeDraw = lazy(() => import("@/components/visuals/motion-lab/HexagonalLatticeDraw").then(m => ({ default: m.HexagonalLatticeDraw })));
const FlipCard3D = lazy(() => import("@/components/visuals/motion-lab/FlipCard3D").then(m => ({ default: m.FlipCard3D })));
const SacredGeoDraw = lazy(() => import("@/components/visuals/motion-lab/SacredGeoDraw").then(m => ({ default: m.SacredGeoDraw })));
const ElasticVelocity = lazy(() => import("@/components/visuals/motion-lab/ElasticVelocity").then(m => ({ default: m.ElasticVelocity })));
const LivingGrid = lazy(() => import("@/components/visuals/motion-lab/LivingGrid").then(m => ({ default: m.LivingGrid })));

// Simple loading component
const LoadingTab = () => (
    <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
    </div>
);

interface DesignSystemTabProps {
    pages: any[];
}

export default function DesignSystemTab({ pages }: DesignSystemTabProps) {
    const [designSubTab, setDesignSubTab] = useState<'layouts' | 'typography' | 'palette' | 'components' | 'motion' | 'showcase' | 'themes' | 'assets' | 'blocks' | 'lab' | 'library'>('layouts');
    const [selectedMotion, setSelectedMotion] = useState<string | null>(null);
    const [selectedPageForMotion, setSelectedPageForMotion] = useState<string>("");
    const queryClient = useQueryClient();
    const { toast } = useToast();

    // Auto-select first page if none selected
    useEffect(() => {
        if (!selectedPageForMotion && pages.length > 0) {
            setSelectedPageForMotion(pages[0].id?.toString() || "");
        }
    }, [pages, selectedPageForMotion]);

    const ELEMENT_SLOTS = [
        { key: 'hero', label: 'Hero Section', description: 'Main hero area at top of page' },
        { key: 'content', label: 'Content Sections', description: 'Body content blocks' },
        { key: 'cards', label: 'Cards/Boxes', description: 'Feature cards and info boxes' },
        { key: 'ctas', label: 'Buttons/CTAs', description: 'Call-to-action buttons' },
        { key: 'background', label: 'Background', description: 'Background layers and effects' },
        { key: 'images', label: 'Images', description: 'Image elements and galleries' },
    ];

    // Always get fresh page data from the query
    const selectedPage = pages.find(p => p.id?.toString() === selectedPageForMotion);
    const pageMotions = selectedPage?.visualConfig?.elementMotions || {};

    const handleAssignMotion = async (elementKey: string) => {
        if (!selectedPageForMotion || !selectedMotion) {
            toast({ title: "Select a page and motion first", variant: "destructive" });
            return;
        }

        try {
            const currentConfig = selectedPage?.visualConfig || {};
            const newElementMotions = {
                ...(currentConfig.elementMotions || {}),
                [elementKey]: selectedMotion,
            };

            await apiRequest('PUT', `/api/pages/${selectedPageForMotion}`, {
                visualConfig: {
                    ...currentConfig,
                    elementMotions: newElementMotions,
                },
            });

            queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
            toast({ title: "Motion Assigned", description: `${selectedMotion} applied to ${elementKey}` });
        } catch (error) {
            toast({ title: "Error", description: "Failed to assign motion", variant: "destructive" });
        }
    };

    const handleRemoveMotion = async (elementKey: string) => {
        if (!selectedPageForMotion) return;

        try {
            const currentConfig = selectedPage?.visualConfig || {};
            const newElementMotions = { ...(currentConfig.elementMotions || {}) };
            delete newElementMotions[elementKey];

            await apiRequest('PUT', `/api/pages/${selectedPageForMotion}`, {
                visualConfig: {
                    ...currentConfig,
                    elementMotions: newElementMotions,
                },
            });

            queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
            toast({ title: "Motion Removed", description: `Motion removed from ${elementKey}` });
        } catch (error) {
            toast({ title: "Error", description: "Failed to remove motion", variant: "destructive" });
        }
    };

    const handleAutoAssign = async () => {
        if (!selectedPageForMotion) {
            toast({ title: "Select a page first", variant: "destructive" });
            return;
        }

        const defaultMotions: Record<string, string> = {
            hero: 'liquid-crystal-float',
            content: 'scalar-slide',
            cards: 'krystal-bloom',
            ctas: 'energetic-pulse',
            background: 'parallax-depth',
            images: 'vortex-reveal',
        };

        try {
            const currentConfig = selectedPage?.visualConfig || {};
            const existingMotions = currentConfig.elementMotions || {};

            // Merge: only apply defaults to unassigned slots
            const mergedMotions = { ...defaultMotions };
            for (const key of Object.keys(existingMotions)) {
                if (existingMotions[key]) {
                    mergedMotions[key] = existingMotions[key]; // Preserve existing
                }
            }

            await apiRequest('PUT', `/api/pages/${selectedPageForMotion}`, {
                visualConfig: {
                    ...currentConfig,
                    elementMotions: mergedMotions,
                },
            });

            queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
            const newCount = Object.keys(mergedMotions).length - Object.keys(existingMotions).length;
            toast({ title: "Auto-Assigned", description: `${newCount > 0 ? newCount + ' new motions applied' : 'All slots already assigned'}` });
        } catch (error) {
            toast({ title: "Error", description: "Failed to auto-assign", variant: "destructive" });
        }
    };

    const handleClearAll = async () => {
        if (!selectedPageForMotion) return;

        try {
            const currentConfig = selectedPage?.visualConfig || {};
            await apiRequest('PUT', `/api/pages/${selectedPageForMotion}`, {
                visualConfig: {
                    ...currentConfig,
                    elementMotions: {},
                },
            });

            queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
            toast({ title: "Cleared", description: "All motion assignments removed" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to clear motions", variant: "destructive" });
        }
    };

    const LAYOUT_LINKS = [
        { path: "/vortex-spin-experiments", label: "Vortex Spin", icon: "🌀" },
        { path: "/water-crystal-geometry-map", label: "Water Crystal", icon: "❄️" },
        { path: "/tetrahedral-sulfate-geometry", label: "Tetrahedral", icon: "💎" },
        { path: "/cell-membrane-electric-model", label: "Bio-Electric", icon: "⚡" },
        { path: "/ionic-drops", label: "Ionic Drops", icon: "💧" },
        { path: "/design-simulation", label: "Design Sim", icon: "🎨" },
        { path: "/gold-loader-preview", label: "Gold Loader", icon: "⏳" },
        { path: "/torus-preview", label: "Torus Geometry", icon: "🍩" },

        { path: "/gold-icons-preview", label: "Gold Icons", icon: "✨" },
        { path: "/motion-lab", label: "Motion Lab", icon: "🔬" },
        { path: "/bioelectric-conductivity-tissues", label: "Conductivity", icon: "🌐" },
        { path: "/crystalline-matrix-hub", label: "Crystalline Matrix", icon: "💠" },
        { path: "/spiritual-electricity-ion-intelligence", label: "Ion Intelligence", icon: "🧠" },
        { path: "/bioelectric-water", label: "Bioelectric Water", icon: "💧" },
        { path: "/bioelectricity-invisible-voltage", label: "Bioelectricity Hub", icon: "⚡" },
        { path: "/product-hub", label: "Product Hub", icon: "🛍️" },
        { path: "/what-is-andara-ionic", label: "What Is Andara?", icon: "❓" },
        { path: "/how-andara-works-clarification-conditioning", label: "How It Works", icon: "⚙️" },
        { path: "/getting-started-first-7-days", label: "First 7 Days", icon: "📅" },
        { path: "/bundle-savings-overview", label: "Bundle Savings", icon: "📦" },
        { path: "/structured-water-basics", label: "Structured Water Basics", icon: "📐" },
        { path: "/sulfate-chemistry", label: "Sulfate Chemistry", icon: "⚗️" },
    ];

    return (
        <div className="space-y-6" data-testid="design-system-tab">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">Liquid Alchemy Design System</h2>
                    <p className="text-sm text-muted-foreground">Version 2.0 • The foundation of Andara's digital presence</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button variant={designSubTab === 'layouts' ? 'default' : 'outline'} size="sm" onClick={() => setDesignSubTab('layouts')}>
                        <LayoutGrid className="w-4 h-4 mr-2" />
                        Layouts
                    </Button>
                    <Button variant={designSubTab === 'typography' ? 'default' : 'outline'} size="sm" onClick={() => setDesignSubTab('typography')}>
                        <Type className="w-4 h-4 mr-2" />
                        Type
                    </Button>
                    <Button variant={designSubTab === 'palette' ? 'default' : 'outline'} size="sm" onClick={() => setDesignSubTab('palette')}>
                        <Droplets className="w-4 h-4 mr-2" />
                        Colors
                    </Button>
                    <Button variant={designSubTab === 'components' ? 'default' : 'outline'} size="sm" onClick={() => setDesignSubTab('components')}>
                        <Component className="w-4 h-4 mr-2" />
                        Components
                    </Button>
                    <Button variant={designSubTab === 'blocks' ? 'default' : 'outline'} size="sm" onClick={() => setDesignSubTab('blocks')}>
                        <Cuboid className="w-4 h-4 mr-2" />
                        Blocks
                    </Button>
                    <Button variant={designSubTab === 'motion' ? 'default' : 'outline'} size="sm" onClick={() => setDesignSubTab('motion')}>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Motion
                    </Button>
                    <Button variant={designSubTab === 'themes' ? 'default' : 'outline'} size="sm" onClick={() => setDesignSubTab('themes')}>
                        <Palette className="w-4 h-4 mr-2" />
                        Themes
                    </Button>
                    <Button variant={designSubTab === 'showcase' ? 'default' : 'outline'} size="sm" onClick={() => setDesignSubTab('showcase')}>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Showcase
                    </Button>
                    <Button variant={designSubTab === 'lab' ? 'default' : 'outline'} size="sm" onClick={() => setDesignSubTab('lab')}>
                        <FlaskConical className="w-4 h-4 mr-2" />
                        Motion Lab
                    </Button>
                    <Button variant={designSubTab === 'library' ? 'default' : 'outline'} size="sm" onClick={() => setDesignSubTab('library')}>
                        <Library className="w-4 h-4 mr-2" />
                        Library
                    </Button>
                </div>
            </div>

            {/* --- LAYOUTS TAB --- */}
            {designSubTab === 'layouts' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm">
                        <h3 className="text-xl font-bold mb-2">Experimental Layout Archive</h3>
                        <p className="text-muted-foreground mb-6">
                            A comprehensive index of all geometry simulations, scroll-physics experiments, and layout prototypes.
                            Use these as reference for future "Proton" level designs.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {LAYOUT_LINKS.map((link, i) => (
                                <Link key={i} href={link.path}>
                                    <div className="group relative aspect-square p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-500/50 cursor-pointer flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20">
                                        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                                        <span className="text-sm font-medium text-slate-300 group-hover:text-emerald-400">{link.label}</span>
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* --- TYPOGRAPHY TAB --- */}
            {designSubTab === 'typography' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-card border rounded-xl p-8 space-y-8">
                        <div>
                            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2 block">Display Font</span>
                            <h1 className="text-6xl md:text-8xl font-display font-light text-foreground tracking-tighter">
                                Surrounding
                            </h1>
                            <p className="text-muted-foreground mt-2">Used for Hero headings and major statements. Feeling: Ethereal, Scientific, Premium.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
                            <div>
                                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2 block">Headings (Inter)</span>
                                <div className="space-y-4">
                                    <h2 className="text-4xl font-bold">Heading 1</h2>
                                    <h3 className="text-3xl font-bold">Heading 2</h3>
                                    <h4 className="text-2xl font-bold">Heading 3</h4>
                                    <h5 className="text-xl font-bold">Heading 4</h5>
                                </div>
                            </div>
                            <div>
                                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2 block">Body (Inter)</span>
                                <div className="space-y-4 text-slate-400">
                                    <p className="text-lg">Large Body - The mineral kingdom communicates through light and frequency. Ionic minerals serve as the bridge between voltage and biology.</p>
                                    <p className="text-base">Regular Body - This is the standard text size for reading. It provides optimal legibility for long-form content, scientific explanations, and product descriptions.</p>
                                    <p className="text-sm">Small Body - Used for captions, metadata, and UI elements where space is limited but readability is still important.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- COMPONENTS TAB --- */}
            {designSubTab === 'components' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* 01. Buttons & Interactions */}
                        <div className="bg-card border rounded-xl p-6 space-y-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <span className="bg-primary/10 p-1 rounded text-primary text-xs font-mono">01</span>
                                Interactive Elements
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">Ingot Buttons</h4>
                                    <div className="flex flex-col gap-3">
                                        <button className="andara-btn-gold w-full text-center">
                                            Gold Ingot Action
                                        </button>
                                        <div className="flex gap-2">
                                            <Button variant="outline" className="flex-1 border-amber-500/30 text-amber-400 hover:bg-amber-500/10">Outline</Button>
                                            <Button variant="ghost" className="flex-1 text-amber-400 hover:text-amber-300 hover:bg-amber-500/5">Ghost</Button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">Badges & Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="andara-badge-crystal">
                                            <Sparkles className="w-3 h-3 text-emerald-400" />
                                            Crystal Badge
                                        </span>
                                        <span className="andara-card-tag">Tag</span>
                                        <Badge variant="outline" className="border-amber-500/30 text-amber-500">v2.0 Beta</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 02. Navigation & Structure */}
                        <div className="bg-card border rounded-xl p-6 space-y-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <span className="bg-primary/10 p-1 rounded text-primary text-xs font-mono">02</span>
                                Navigation Structure
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <h4 className="text-xs font-mono text-muted-foreground mb-1">.andara-glass-header</h4>
                                    <div className="h-12 w-full andara-glass-header rounded-lg flex items-center px-4 justify-between">
                                        <div className="w-20 h-2 bg-white/10 rounded-full" />
                                        <div className="flex gap-2">
                                            <div className="w-8 h-2 bg-white/5 rounded-full" />
                                            <div className="w-8 h-2 bg-white/5 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xs font-mono text-muted-foreground mb-1">.andara-glass-menu</h4>
                                    <div className="andara-glass-menu p-3 rounded-lg space-y-2">
                                        <div className="andara-menu-item">
                                            <div className="andara-menu-item-icon">
                                                <LayoutGrid className="w-4 h-4" />
                                            </div>
                                            <span>Menu Item</span>
                                        </div>
                                        <div className="andara-menu-divider" />
                                        <div className="andara-menu-item--compact">Sub Item</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 03. Inputs & Forms */}
                        <div className="bg-card border rounded-xl p-6 space-y-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <span className="bg-primary/10 p-1 rounded text-primary text-xs font-mono">03</span>
                                Glass Inputs
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Standard Input</Label>
                                    <input
                                        className="andara-input-glass w-full px-3 py-2 rounded-lg"
                                        placeholder="Type something..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Select Input</Label>
                                    <div className="relative">
                                        <select className="andara-input-glass w-full px-3 py-2 rounded-lg appearance-none cursor-pointer">
                                            <option>Select option...</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 04. Liquid Alchemy Glass */}
                        <div className="bg-card border rounded-xl p-6 space-y-4 md:col-span-2 lg:col-span-3">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <span className="bg-primary/10 p-1 rounded text-primary text-xs font-mono">04</span>
                                Liquid Alchemy Glass
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-slate-900 rounded-xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80')] bg-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700" />

                                <div className="andara-glass-card p-8 min-h-[200px] flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="p-2 bg-white/10 rounded-lg text-white backdrop-blur-md border border-white/10"><Sparkles className="w-5 h-5 text-amber-200" /></div>
                                            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-2 py-1 rounded">.andara-glass-card</span>
                                        </div>
                                        <h4 className="andara-card-title text-xl">Glass Card</h4>
                                        <p className="andara-card-desc">
                                            The signature component of the Liquid Alchemy system. Uses backdrop-blur, subtle borders, and noise texture overlays.
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <span className="andara-card-link cursor-pointer">
                                            Explore Features <ChevronRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </div>

                                <div className="andara-glass-panel p-8 relative flex flex-col items-center justify-center text-center space-y-6">
                                    <div>
                                        <h4 className="font-family-surrounding text-2xl text-white mb-2">Glass Panel</h4>
                                        <p className="text-slate-400 text-sm max-w-xs mx-auto">
                                            A flatter variant for dashboard widgets or content sections.
                                        </p>
                                    </div>
                                    <button className="andara-btn-gold">
                                        Action Button
                                    </button>
                                    <span className="text-xs font-mono text-amber-500 mt-2 block">.andara-glass-panel</span>
                                </div>
                            </div>
                        </div>

                        {/* 05. Typography Context */}
                        <div className="bg-card border rounded-xl p-6 space-y-4 md:col-span-2 lg:col-span-3">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <span className="bg-primary/10 p-1 rounded text-primary text-xs font-mono">05</span>
                                Typography & Content
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="p-6 bg-slate-950 rounded-xl border border-white/5">
                                        <h1 className="andara-h1">Heading 1</h1>
                                        <p className="text-sm font-mono text-muted-foreground mb-4">.andara-h1 (Gold Gradient)</p>

                                        <h2 className="andara-h2">Heading 2</h2>
                                        <p className="text-sm font-mono text-muted-foreground mb-4">.andara-h2 (White Display)</p>

                                        <h3 className="andara-h3--gold">Heading 3</h3>
                                        <p className="text-sm font-mono text-muted-foreground mb-4">.andara-h3--gold (Soft Gold)</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="andara-hero__bullets p-6 bg-slate-900/50 rounded-xl">
                                        <h4 className="text-white font-semibold mb-4">Bullet Lists (.andara-hero__bullets)</h4>
                                        <li className="mb-2">Bullet item with custom glow accent</li>
                                        <li className="mb-2">Uses --andara-accent-emerald</li>
                                        <li>Perfect for feature lists and specs</li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- PALETTE TAB --- */}
            {designSubTab === 'palette' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="font-bold">Liquid Alchemy Gradients</h3>
                            <div className="h-32 rounded-xl bg-gradient-to-r from-emerald-900 via-emerald-600 to-emerald-400 flex items-end p-4">
                                <span className="text-white font-mono text-xs shadow-black drop-shadow-md">Emerald (Healing/Life)</span>
                            </div>
                            <div className="h-32 rounded-xl bg-gradient-to-r from-amber-900 via-amber-600 to-amber-400 flex items-end p-4">
                                <span className="text-white font-mono text-xs shadow-black drop-shadow-md">Gold (Conductivity/Wealth)</span>
                            </div>
                            <div className="h-32 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-black border border-white/10 flex items-end p-4">
                                <span className="text-white font-mono text-xs">Void (Depth/Mystery)</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-emerald-500 rounded-xl text-white flex flex-col justify-between h-32">
                                <span className="font-bold">Emerald 500</span>
                                <span className="font-mono text-xs text-white/80">#10b981</span>
                            </div>
                            <div className="p-4 bg-amber-500 rounded-xl text-white flex flex-col justify-between h-32">
                                <span className="font-bold">Amber 500</span>
                                <span className="font-mono text-xs text-white/80">#f59e0b</span>
                            </div>
                            <div className="p-4 bg-cyan-500 rounded-xl text-white flex flex-col justify-between h-32">
                                <span className="font-bold">Cyan 500</span>
                                <span className="font-mono text-xs text-white/80">#06b6d4</span>
                            </div>
                            <div className="p-4 bg-purple-500 rounded-xl text-white flex flex-col justify-between h-32">
                                <span className="font-bold">Purple 500</span>
                                <span className="font-mono text-xs text-white/80">#a855f7</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MOTION TAB (Existing Logic) --- */}
            {designSubTab === 'motion' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-card border rounded-xl p-6">
                            <MotionLibraryPreview
                                onSelectArchetype={setSelectedMotion}
                                selectedArchetype={selectedMotion || undefined}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-card border rounded-xl p-4">
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <Layers className="w-4 h-4" />
                                Element Motion Linker
                            </h3>

                            <div className="space-y-3">
                                <div>
                                    <Label htmlFor="pageSelect" className="text-sm">Select Page</Label>
                                    <Select value={selectedPageForMotion} onValueChange={setSelectedPageForMotion}>
                                        <SelectTrigger className="mt-1" data-testid="select-page-for-motion">
                                            <SelectValue placeholder="Choose a page..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {pages.map(p => (
                                                <SelectItem key={p.id} value={p.id?.toString() || ''}>
                                                    {p.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {selectedPageForMotion && (
                                    <>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={handleAutoAssign}
                                                className="flex-1"
                                                data-testid="btn-auto-assign"
                                            >
                                                <Zap className="w-3 h-3 mr-1" />
                                                Auto-Link
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={handleClearAll}
                                                className="flex-1"
                                                data-testid="btn-clear-all"
                                            >
                                                <X className="w-3 h-3 mr-1" />
                                                Clear All
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            {ELEMENT_SLOTS.map(slot => {
                                                const assignedMotion = pageMotions[slot.key];
                                                return (
                                                    <div
                                                        key={slot.key}
                                                        className={`p-2 rounded-lg border cursor-pointer transition-all group ${assignedMotion
                                                            ? 'border-primary/50 bg-primary/10'
                                                            : 'border-border hover:border-primary/30'
                                                            }`}
                                                        onClick={() => {
                                                            if (selectedMotion) {
                                                                handleAssignMotion(slot.key);
                                                            } else if (assignedMotion) {
                                                                handleRemoveMotion(slot.key);
                                                            } else {
                                                                toast({ title: "Select a motion first", description: "Choose a motion archetype from the library" });
                                                            }
                                                        }}
                                                        data-testid={`element-slot-${slot.key}`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="text-xs font-medium">{slot.label}</div>
                                                            {assignedMotion && (
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); handleRemoveMotion(slot.key); }}
                                                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                                    data-testid={`remove-motion-${slot.key}`}
                                                                >
                                                                    <X className="w-3 h-3 text-muted-foreground hover:text-destructive" />
                                                                </button>
                                                            )}
                                                        </div>
                                                        {assignedMotion ? (
                                                            <div className="text-[10px] text-primary mt-0.5 flex items-center gap-1">
                                                                <CheckCircle2 className="w-2.5 h-2.5" />
                                                                {assignedMotion}
                                                            </div>
                                                        ) : (
                                                            <div className="text-[10px] text-muted-foreground mt-0.5">
                                                                {selectedMotion ? 'Click to assign' : 'Select motion first'}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {selectedMotion && (
                                            <div className="text-xs text-center text-muted-foreground p-2 bg-muted/50 rounded">
                                                Selected: <span className="font-medium text-primary">{selectedMotion}</span>
                                                <br />Click an element slot to assign
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {selectedPage && (
                            <div className="bg-card border rounded-xl p-4">
                                <h4 className="font-medium text-sm mb-2">Page Motion Config</h4>
                                <div className="text-xs space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Preset:</span>
                                        <span>{selectedPage.visualConfig?.motionPreset || 'None'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Entrance:</span>
                                        <span>{selectedPage.visualConfig?.entranceMotion || 'Default'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Hover:</span>
                                        <span>{selectedPage.visualConfig?.hoverMotion || 'Default'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Elements linked:</span>
                                        <span className="font-medium text-primary">
                                            {Object.keys(pageMotions).length} / {ELEMENT_SLOTS.length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- BLOCKS TAB --- */}
            {designSubTab === 'blocks' && (
                <ContentBlockShowcase />
            )}

            {/* --- THEMES TAB --- */}
            {designSubTab === 'themes' && (
                <DesignTokensTab />
            )}

            {/* --- SHOWCASE TAB --- */}
            {designSubTab === 'showcase' && (
                <Suspense fallback={<LoadingTab />}>
                    <MotionLibraryShowcase />
                </Suspense>
            )}

            {/* --- MOTION LAB TAB --- */}
            {designSubTab === 'lab' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* 3D Flip Card */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">3D Flip Card</h3>
                            <p className="text-sm text-muted-foreground">Scroll-linked 3D rotation reveals hidden content.</p>
                            <div className="bg-slate-950 p-8 rounded-xl border border-white/10">
                                <Suspense fallback={<div className="h-96 w-full bg-slate-900 animate-pulse rounded-xl" />}>
                                    <FlipCard3D />
                                </Suspense>
                            </div>
                        </div>

                        {/* Sacred Geometry */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">Sacred Geometry Draw</h3>
                            <p className="text-sm text-muted-foreground">SVG path animation driven by scroll progress.</p>
                            <div className="bg-slate-950 p-8 rounded-xl border border-white/10 flex items-center justify-center min-h-[400px]">
                                <Suspense fallback={<div className="h-64 w-64 bg-slate-900 animate-pulse rounded-full" />}>
                                    <SacredGeoDraw />
                                </Suspense>
                            </div>
                        </div>

                        {/* Hexagonal Lattice */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">Hexagonal Lattice Draw</h3>
                            <p className="text-sm text-muted-foreground">SVG path animation driven by scroll progress.</p>
                            <div className="bg-slate-950 p-8 rounded-xl border border-white/10 flex items-center justify-center min-h-[400px]">
                                <Suspense fallback={<div className="h-64 w-64 bg-slate-900 animate-pulse rounded-full" />}>
                                    <HexagonalLatticeDraw />
                                </Suspense>
                            </div>
                        </div>

                        {/* Elastic Velocity */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">Elastic Velocity</h3>
                            <p className="text-sm text-muted-foreground">Elements that skew and stretch based on scroll speed.</p>
                            <div className="bg-slate-950 p-8 rounded-xl border border-white/10 min-h-[400px] flex items-center justify-center">
                                <Suspense fallback={<div className="h-64 w-64 bg-slate-900 animate-pulse rounded-xl" />}>
                                    <ElasticVelocity />
                                </Suspense>
                            </div>
                        </div>

                        {/* Living Grid */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">Living Grid</h3>
                            <p className="text-sm text-muted-foreground">Interactive background field that responds to presence.</p>
                            <div className="bg-slate-950 p-8 rounded-xl border border-white/10 min-h-[400px]">
                                <Suspense fallback={<div className="h-full w-full bg-slate-900 animate-pulse rounded-xl" />}>
                                    <LivingGrid />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- ASSETS TAB --- */}
            {designSubTab === 'assets' && (
                <div className="bg-card border rounded-xl p-8 text-center">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="font-semibold text-lg mb-2">Asset Library</h3>
                    <p className="text-sm text-muted-foreground">Coming soon - manage images, icons, and media assets</p>
                </div>
            )}

            {/* --- LIBRARY TAB --- */}
            {designSubTab === 'library' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm">
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                            <Library className="w-5 h-5 text-emerald-400" />
                            Layout & Animation Library
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Browse all layouts, animations, scroll effects, and visual components. Search by tag, filter by category, or match by vibe.
                        </p>
                        <LayoutLibraryBrowser />
                    </div>
                </div>
            )}
        </div>
    );
}
