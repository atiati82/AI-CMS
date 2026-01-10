
import React, { useRef, ReactNode } from 'react';
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Stars, LucideIcon, Box } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import MegaMenu from "@/components/mega-menu";
import { SmartImage } from "@/components/ui/SmartImage";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet";

gsap.registerPlugin(ScrollTrigger);

export interface SuperPagePortal {
    id: string;
    title: string;
    description: string;
    icon?: LucideIcon;
    registryId?: string;
    renderContent?: () => ReactNode;
    colorTheme?: "emerald" | "cyan" | "indigo" | "purple" | "gold";
}

export interface ShowcaseItem {
    title: string;
    description?: string;
    content?: ReactNode; // Pre-rendered preview
    code?: string; // Optional code snippet
    variant?: string;
}

export interface ShowcaseSection {
    id: string;
    title: string;
    description?: string;
    items: ShowcaseItem[];
    columns?: 2 | 3 | 4;
}

export interface SuperPageConfig {
    hero: {
        badge?: string;
        title: ReactNode;
        subtitle: string;
    };
    portals: SuperPagePortal[];
    showcaseSections?: ShowcaseSection[];
    product: {
        registryId: string;
        title: string;
        subtitle: string;
        description: string;
        price: string;
        features: string[];
    };
    seo?: {
        title: string;
        description: string;
        keywords?: string[];
    };
    theme?: "hyperspace";
}

interface SuperPageLayoutProps {
    config: SuperPageConfig;
}

export default function SuperPageLayout({ config }: SuperPageLayoutProps) {
    const tunnelRef = useRef<HTMLDivElement>(null);
    const portalsRef = useRef<(HTMLDivElement | null)[]>([]);
    const heroRef = useRef<HTMLDivElement>(null);

    const { hero, portals, product, showcaseSections, seo } = config;

    useGSAP(() => {
        if (!tunnelRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: tunnelRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
            }
        });

        // 1. Hero Exit
        if (heroRef.current) {
            tl.to(heroRef.current, {
                opacity: 0,
                y: -100,
                scale: 0.9,
                duration: 0.5,
                ease: "power2.inOut"
            }, 0);
        }

        // 2. Portal Sequence
        const startOffset = 0.6;
        const portalDuration = 2.5;

        portalsRef.current.forEach((portal, i) => {
            if (!portal) return;

            const startTime = startOffset + (i * portalDuration);

            gsap.set(portal, { scale: 0.1, opacity: 0, zIndex: 10 + i, autoAlpha: 0 });

            tl.to(portal, {
                autoAlpha: 1,
                scale: 1,
                opacity: 1,
                duration: portalDuration * 0.4,
                ease: "power2.out"
            }, startTime);

            tl.to(portal, {
                scale: 4,
                opacity: 0,
                autoAlpha: 0,
                duration: portalDuration * 0.4,
                ease: "power1.in"
            }, startTime + (portalDuration * 0.6));
        });

        tl.to({}, { duration: 1 });

    }, { scope: tunnelRef, dependencies: [config] });

    const getColorClasses = (theme: SuperPagePortal['colorTheme'] = 'emerald') => {
        const maps = {
            emerald: { glow: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
            cyan: { glow: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20" },
            indigo: { glow: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20" },
            purple: { glow: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
            gold: { glow: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
        };
        return maps[theme] || maps.emerald;
    };

    return (
        <div className="bg-black min-h-screen">
            <Helmet>
                <title>{seo?.title || hero.title}</title>
                <meta name="description" content={seo?.description || hero.subtitle} />
                {seo?.keywords && <meta name="keywords" content={seo.keywords.join(", ")} />}
            </Helmet>

            {/* HEADER */}
            <div className="fixed top-0 left-0 right-0 z-60">
                <MegaMenu />
            </div>

            {/* BACKGROUND */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <img
                    src="/images/visuals/star-beam-bg.png"
                    alt="Cosmic Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/80" />
            </div>

            {/* 1. TUNNEL SEQUENCE (Height determines scroll duration) */}
            <div ref={tunnelRef} className="relative h-[400vh] z-10">
                {/* HERO */}
                <div ref={heroRef} className="fixed top-32 left-0 right-0 z-50 flex justify-center px-4 mix-blend-screen origin-top pointer-events-none">
                    <GlassCard className="text-center py-12 px-8 md:px-16 bg-black/40 backdrop-blur-sm border-none shadow-2xl flex flex-col items-center max-w-4xl w-full">
                        {hero.badge && (
                            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(52,211,153,0.1)]">
                                <Stars className="w-3 h-3" />
                                {hero.badge}
                            </div>
                        )}
                        <h1 className="text-6xl md:text-9xl font-display text-white tracking-tighter mb-6 drop-shadow-2xl">
                            {hero.title}
                        </h1>
                        <p className="text-slate-300 text-lg md:text-2xl font-light leading-relaxed max-w-2xl tracking-wide">
                            {hero.subtitle}
                        </p>
                    </GlassCard>
                </div>

                {/* PORTALS */}
                <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
                    {portals.map((portal, i) => {
                        const colors = getColorClasses(portal.colorTheme);
                        return (
                            <div
                                key={i}
                                ref={(el) => { portalsRef.current[i] = el }}
                                className="absolute inset-0 flex items-center justify-center opacity-0"
                            >
                                <div className="relative w-[85vw] h-[60vh] md:w-[900px] md:h-[650px] flex items-center justify-center transform-gpu perspective-1000">
                                    <div className="absolute inset-0 rounded-4xl shadow-[0_0_150px_rgba(52,211,153,0.05)] overflow-hidden ring-1 ring-white/10">
                                        <div className="w-full h-full relative overflow-hidden bg-black">
                                            {portal.registryId && (
                                                <SmartImage
                                                    registryId={portal.registryId}
                                                    className="w-full h-full object-cover opacity-90 scale-90"
                                                    interaction="none"
                                                />
                                            )}
                                            {portal.renderContent && portal.renderContent()}
                                            <div className={cn("absolute inset-0 mix-blend-overlay", colors.glow)} />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-auto">
                                        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/90 pointer-events-none" />
                                        <div className="relative z-10 p-8 flex flex-col items-center">
                                            {portal.icon && (
                                                <portal.icon className={cn("w-12 h-12 mb-6 opacity-80", colors.text)} />
                                            )}
                                            <h2 className="text-5xl md:text-8xl font-display text-white tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] mb-6">
                                                {portal.title}
                                            </h2>
                                            <p className={cn("text-xl md:text-3xl font-light tracking-wide max-w-2xl leading-relaxed drop-shadow-lg", colors.text)}>
                                                {portal.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Scroll Hint */}
                <div className="fixed bottom-12 left-0 right-0 text-center z-50 pointer-events-none animate-bounce opacity-60 mix-blend-screen">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-sans">Scroll To Explore</p>
                </div>
            </div>

            {/* 2. SHOWCASE SECTIONS (Static Content) */}
            {/* SPACING: py-16/24, mb-24 sections, mb-10 headers, gap-8 grids */}
            <div className="relative z-50 bg-black border-t border-white/10 shadow-[0_-50px_100px_rgba(0,0,0,1)]">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
                    {showcaseSections?.map((section, idx) => (
                        <div key={section.id} className="mb-24 last:mb-0">
                            <div className="flex items-end gap-6 mb-10 border-b border-white/10 pb-4">
                                <span className="text-6xl md:text-8xl font-display text-white/10 font-bold -mb-4 block numbers">0{idx + 1}</span>
                                <div className="mb-2">
                                    <h3 className="text-3xl md:text-4xl font-display text-white mb-2">{section.title}</h3>
                                    {section.description && <p className="text-slate-400 font-light">{section.description}</p>}
                                </div>
                            </div>

                            <div className={cn("grid gap-8", {
                                "grid-cols-1 md:grid-cols-2": section.columns === 2,
                                "grid-cols-1 md:grid-cols-3": section.columns === 3 || !section.columns,
                                "grid-cols-1 md:grid-cols-4": section.columns === 4,
                            })}>
                                {section.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="group relative">
                                        {/* Box Preview */}
                                        <div className="relative rounded-xl border border-white/10 bg-white/5 overflow-hidden transition-all hover:border-emerald-500/40 hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl min-h-[200px] flex flex-col">
                                            <div className="flex-1 p-8 flex items-center justify-center bg-black/20">
                                                {item.content || <Box className="w-12 h-12 text-slate-700" />}
                                            </div>
                                            <div className="p-4 border-t border-white/5 bg-black/40">
                                                <h4 className="text-white font-medium mb-1 font-display tracking-wide">{item.title}</h4>
                                                {item.description && <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-wider">{item.description}</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* FINAL PRODUCT CARD */}
                    {/* SPACING: mt-24, p-10/12, gap-8, mb-6/8, pt-8 */}
                    <div className="mt-24">
                        <GlassCard className="w-full bg-black/60 backdrop-blur-3xl border-white/5 overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-[0_0_150px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
                            <div className="relative p-10 flex items-center justify-center bg-linear-to-br from-slate-950 to-black border-r border-white/5">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
                                <SmartImage
                                    registryId={product.registryId}
                                    className="w-full max-w-[300px] object-contain drop-shadow-[0_0_80px_rgba(52,211,153,0.3)] hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-10 md:p-12 flex flex-col justify-center">
                                <div className="mb-6">
                                    <h2 className="text-4xl md:text-5xl font-display text-white mb-2 tracking-tight">{product.title}</h2>
                                    <p className="text-lg text-emerald-400 font-light tracking-widest uppercase mb-6 opacity-80">{product.subtitle}</p>
                                    <p className="text-slate-400 leading-loose text-sm md:text-base mb-6 font-light">{product.description}</p>
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
                                        {product.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-3 text-sm text-slate-300 font-light">
                                                <div className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="border-t border-white/5 pt-8 mt-auto">
                                    <div className="flex items-end justify-between mb-6">
                                        <span className="text-4xl font-light text-white">{product.price}</span>
                                        <div className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest bg-emerald-900/20 px-3 py-1 rounded">In Stock</div>
                                    </div>
                                    <Button className="w-full bg-white hover:bg-emerald-50 text-black rounded-sm h-14 text-sm uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3 font-semibold">
                                        <ShoppingCart className="w-4 h-4" />
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
