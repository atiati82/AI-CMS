// @ts-nocheck

import React, { useRef, useEffect } from 'react';
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mountain, Zap, Activity, Hexagon, ShoppingCart, Droplets, Stars } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
// import { useGSAP } from '@gsap/react'; // Temporarily disabled - package not installed
import MegaMenu from "@/components/mega-menu";
import { SmartImage } from "@/components/ui/SmartImage";
import { VideoBackground, SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Link } from "wouter";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const portalsRef = useRef<(HTMLDivElement | null)[]>([]);
    const heroRef = useRef<HTMLDivElement>(null);

    const portals = [
        {
            title: "Primordial Source",
            description: "Harvested from ancient volcanic vents.",
            icon: Mountain,
            render: () => (
                <div className="w-full h-full relative overflow-hidden bg-black">
                    <SmartVideoEmbed
                        keywords={["volcanic", "origin", "mica", "genesis"]}
                        className="w-full h-full object-cover opacity-90 scale-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>
            )
        },
        {
            title: "Ionic Clarity",
            description: "Structured for molecular coherence.",
            icon: Hexagon,
            render: () => (
                <div className="w-full h-full relative overflow-hidden bg-black">
                    <SmartVideoEmbed
                        keywords={["ionic", "clarity", "hexagonal", "structure"]}
                        className="w-full h-full object-cover opacity-90 scale-75"
                    />
                    <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay pointer-events-none" />
                </div>
            )
        },
        {
            title: "Bioelectric Potential",
            description: "Waking up the water.",
            icon: Zap,
            render: () => (
                <div className="w-full h-full relative overflow-hidden bg-black">
                    <SmartVideoEmbed
                        keywords={["electric", "activation", "charge", "bioelectric"]}
                        className="w-full h-full object-cover opacity-90 scale-90"
                    />
                    <div className="absolute inset-0 bg-blue-500/10 mix-blend-color-dodge pointer-events-none" />
                </div>
            )
        },
        {
            title: "Cellular Resonance",
            description: "Minerals that speak your code.",
            icon: Activity,
            render: () => (
                <div className="w-full h-full relative overflow-hidden bg-black">
                    <SmartVideoEmbed
                        keywords={["resonance", "dna", "cell", "frequency"]}
                        className="w-full h-full object-cover opacity-90 scale-75"
                    />
                    <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay pointer-events-none" />
                </div>
            )
        },
        {
            title: "The Ritual",
            description: "100ml of pure potential.",
            icon: Droplets,
            render: () => (
                <div className="w-full h-full bg-slate-900 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 to-black" />
                    <SmartImage
                        registryId="product-100ml-nature"
                        className="h-[80%] w-auto object-contain drop-shadow-[0_0_50px_rgba(56,255,209,0.3)]"
                        interaction="zoom-hover"
                    />
                </div>
            )
        }
    ];

    useEffect(() => {
        if (!containerRef.current) return;
        const total = portals.length;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        // Hero Exit Animation - fades out IMMEDIATELY on any scroll
        if (heroRef.current) {
            gsap.to(heroRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top-=1",
                    end: "top top+=50",
                    scrub: 0.2
                },
                opacity: 0,
                y: -30,
                scale: 0.98,
                pointerEvents: "none"
            });
        }

        portalsRef.current.forEach((portal, i) => {
            if (!portal) return;

            const duration = 1 / total;
            const start = i * duration;

            gsap.set(portal, { scale: 0.1, opacity: 0, zIndex: i });

            // Animate IN
            tl.to(portal, {
                scale: 1,
                opacity: 1,
                duration: duration * 0.4,
                ease: "power2.in"
            }, start);

            // Animate OUT (fly past)
            tl.to(portal, {
                scale: 5,
                opacity: 0,
                duration: duration * 0.6,
                ease: "power2.in"
            }, start + duration * 0.4);
        });

    }, []);

    return (
        <div ref={containerRef} className="relative min-h-[600vh] bg-black">

            {/* 1. HEADER / NAVIGATION */}
            <div className="fixed top-0 left-0 right-0 z-[60]">
                <MegaMenu />
            </div>

            {/* HIGH-FIDELITY BACKGROUND */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <VideoBackground keywords={["home", "hero", "primordial", "drop"]} overlayOpacity={0.4} />
            </div>

            {/* 2. INTRO HERO CARD (Animates Out) */}
            <div ref={heroRef} className="fixed top-32 left-0 right-0 z-50 flex justify-center px-4 mix-blend-screen origin-top">
                <GlassCard className="text-center py-12 px-8 md:px-16 bg-black/40 backdrop-blur-sm border-none shadow-2xl flex flex-col items-center animate-in fade-in zoom-in duration-1000 max-w-4xl w-full">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(52,211,153,0.1)]">
                        <Stars className="w-3 h-3" />
                        The Portable Ritual
                    </div>
                    <h1 className="text-6xl md:text-9xl font-display text-white tracking-tighter mb-6 drop-shadow-2xl">
                        Andara <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-200 to-cyan-500">Ionic</span>
                    </h1>
                    <p className="text-slate-300 text-lg md:text-2xl font-light leading-relaxed max-w-2xl tracking-wide">
                        Journey from the primordial source to the bottle in your hand.
                    </p>
                </GlassCard>
            </div>

            {/* THE TUNNEL */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
                {portals.map((portal, i) => (
                    <div
                        key={i}
                        ref={(el) => { portalsRef.current[i] = el }}
                        className="absolute inset-0 flex items-center justify-center opacity-0"
                    >
                        <div className="relative w-[85vw] h-[60vh] md:w-[900px] md:h-[650px] flex items-center justify-center transform-gpu perspective-1000">
                            {/* THE "PORTAL" FRAME */}
                            <div className="absolute inset-0 rounded-[2rem] shadow-[0_0_150px_rgba(52,211,153,0.05)] overflow-hidden ring-1 ring-white/10">
                                {/* RENDER THE DYNAMIC IMAGE */}
                                {portal.render()}
                            </div>

                            {/* CONTENT OVERLAY */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-auto">
                                {/* Vignette */}
                                <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/90 pointer-events-none" />

                                <div className="relative z-10 p-8 flex flex-col items-center transform transition-transform duration-500 hover:scale-105">
                                    <h2 className="text-5xl md:text-8xl font-display text-white tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] mb-6">
                                        {portal.title}
                                    </h2>
                                    <p className="text-xl md:text-3xl text-emerald-50 font-light tracking-wide max-w-2xl leading-relaxed drop-shadow-lg">
                                        {portal.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* SCROLL INDICATOR */}
            <div className="fixed bottom-12 left-0 right-0 text-center z-50 pointer-events-none animate-bounce opacity-60 mix-blend-screen">
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-sans">
                    Scroll To Explore
                </p>
            </div>

            {/* FINAL LANDING - HIGH FIDELITY PRODUCT CARD */}
            <div className="absolute bottom-0 w-full h-screen flex items-center justify-center z-50 pointer-events-auto px-4">
                <GlassCard className="w-full max-w-5xl bg-black/60 backdrop-blur-3xl border-white/5 overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-[0_0_150px_rgba(0,0,0,0.5)] ring-1 ring-white/10">

                    {/* Left: Product Viz */}
                    <div className="relative p-12 flex items-center justify-center bg-gradient-to-br from-slate-950 to-black border-r border-white/5">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
                        <SmartImage
                            registryId="product-100ml-nature"
                            className="w-full max-w-[300px] object-contain drop-shadow-[0_0_80px_rgba(52,211,153,0.3)] hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-8 left-0 right-0 text-center">
                            <span className="text-[10px] font-mono text-emerald-500/40 uppercase tracking-[0.3em]">Scientific Grade • Ionic Sulfate</span>
                        </div>
                    </div>

                    {/* Right: Product Details & Action */}
                    <div className="p-12 pl-16 flex flex-col justify-center">
                        <div className="mb-8">
                            <h2 className="text-4xl md:text-5xl font-display text-white mb-2 tracking-tight">Andara Ionic</h2>
                            <p className="text-lg text-emerald-400 font-light tracking-widest uppercase mb-8 opacity-80">100ml Ritual Concentrate</p>
                            <p className="text-slate-400 leading-loose text-sm md:text-base mb-8 font-light">
                                The foundation of a coherent water routine. Sourced from primordial vents, purified through crystalline lattices, and activated for bioelectric resonance.
                            </p>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-10">
                                {["Travel Friendly", "~2 Months Supply", "Glass Dropper", "Lab Certified"].map((feature) => (
                                    <div key={feature} className="flex items-center gap-3 text-sm text-slate-300 font-light">
                                        <div className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-white/5 pt-10 mt-auto">
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <span className="text-4xl font-light text-white">€19.90</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-bold uppercase tracking-widest bg-emerald-900/20 px-3 py-1.5 rounded text-emerald-200/80">
                                        In Stock
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button className="w-full bg-white hover:bg-emerald-50 text-black rounded-sm h-14 text-sm uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3 font-semibold">
                                    <ShoppingCart className="w-4 h-4" />
                                    Add to Cart
                                </Button>
                                <Link href="/products/andara-ionic-1l-bundles">
                                    <Button variant="ghost" className="w-full text-slate-500 hover:text-white hover:bg-white/5 h-12 text-xs uppercase tracking-widest">
                                        View Quantity Bundles (3+1 Free) <ArrowRight className="ml-2 w-3 h-3" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}

// @ts-nocheck
