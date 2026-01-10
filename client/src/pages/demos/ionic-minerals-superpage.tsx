/**
 * Ionic Minerals SuperPage
 * 
 * A cinematic GSAP ScrollTrigger experience showcasing the 
 * 8 Ionic Minerals videos through a Z-axis tunnel effect.
 * 
 * Route: /demos/ionic-minerals-superpage
 */

import React, { useRef } from 'react';
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Stars, Zap, Mountain, Hexagon, Activity, Droplets, Brain, Gauge, Network } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import MegaMenu from "@/components/mega-menu";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

gsap.registerPlugin(ScrollTrigger);

interface VideoPortal {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    icon: React.ComponentType<{ className?: string }>;
    colorTheme: "emerald" | "cyan" | "indigo" | "purple" | "gold" | "amber";
    link?: string;
}

const IONIC_MINERALS_PORTALS: VideoPortal[] = [
    {
        id: "hero-charge",
        title: "The Invisible Charge",
        description: "Ions are the architects of life's electrical language.",
        videoUrl: "/videos/ionic_minerals_hero_charge.mp4",
        icon: Zap,
        colorTheme: "gold",
        link: "/ion"
    },
    {
        id: "volcanic-genesis",
        title: "Volcanic Genesis",
        description: "Born from fire. Crystallized by time.",
        videoUrl: "/videos/ionic_minerals_volcanic_genesis.mp4",
        icon: Mountain,
        colorTheme: "amber",
        link: "/ion/volcanic-minerals"
    },
    {
        id: "conductivity",
        title: "Ionic Conductivity",
        description: "The electrical signature of living water.",
        videoUrl: "/videos/ionic_minerals_conductivity.mp4",
        icon: Activity,
        colorTheme: "cyan",
        link: "/ion/conductivity-ec-tds"
    },
    {
        id: "cation-exchange",
        title: "Cation Exchange",
        description: "Nature's mineral banking system.",
        videoUrl: "/videos/ionic_minerals_cation_exchange.mp4",
        icon: Network,
        colorTheme: "emerald",
        link: "/ion/ion-exchange"
    },
    {
        id: "bioelectric-membrane",
        title: "Bioelectric Membrane",
        description: "The gatekeepers of cellular intelligence.",
        videoUrl: "/videos/ionic_minerals_bioelectric_membrane.mp4",
        icon: Brain,
        colorTheme: "indigo",
        link: "/ion/bioelectric"
    },
    {
        id: "hydration",
        title: "Mineral Hydration",
        description: "Structuring water at the molecular level.",
        videoUrl: "/videos/ionic_minerals_hydration.mp4",
        icon: Droplets,
        colorTheme: "cyan",
        link: "/ion/water"
    },
    {
        id: "network",
        title: "The Mineral Network",
        description: "An intelligent mesh of charged particles.",
        videoUrl: "/videos/ionic_minerals_network.mp4",
        icon: Hexagon,
        colorTheme: "purple",
        link: "/science/mineral-intelligence"
    },
    {
        id: "orp-redox",
        title: "Redox Potential",
        description: "The oxidation-reduction balance of life.",
        videoUrl: "/videos/ionic_minerals_orp_redox.mp4",
        icon: Gauge,
        colorTheme: "emerald",
        link: "/ion/orp-redox"
    }
];

const getColorClasses = (theme: VideoPortal['colorTheme']) => {
    const maps = {
        emerald: { glow: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", shadow: "shadow-emerald-500/20" },
        cyan: { glow: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", shadow: "shadow-cyan-500/20" },
        indigo: { glow: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20", shadow: "shadow-indigo-500/20" },
        purple: { glow: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", shadow: "shadow-purple-500/20" },
        gold: { glow: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", shadow: "shadow-amber-500/20" },
        amber: { glow: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20", shadow: "shadow-orange-500/20" },
    };
    return maps[theme] || maps.emerald;
};

export default function IonicMineralsSuperPage() {
    const tunnelRef = useRef<HTMLDivElement>(null);
    const portalsRef = useRef<(HTMLDivElement | null)[]>([]);
    const heroRef = useRef<HTMLDivElement>(null);

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

        // Hero Exit Animation
        if (heroRef.current) {
            tl.to(heroRef.current, {
                opacity: 0,
                y: -100,
                scale: 0.9,
                duration: 0.5,
                ease: "power2.inOut"
            }, 0);
        }

        // Portal Sequence - Z-axis tunnel effect
        const startOffset = 0.6;
        const portalDuration = 2.5;

        portalsRef.current.forEach((portal, i) => {
            if (!portal) return;

            const startTime = startOffset + (i * portalDuration);

            gsap.set(portal, { scale: 0.1, opacity: 0, zIndex: 10 + i, autoAlpha: 0 });

            // Animate IN (emerge from depth)
            tl.to(portal, {
                autoAlpha: 1,
                scale: 1,
                opacity: 1,
                duration: portalDuration * 0.4,
                ease: "power2.out"
            }, startTime);

            // Animate OUT (fly past camera)
            tl.to(portal, {
                scale: 4,
                opacity: 0,
                autoAlpha: 0,
                duration: portalDuration * 0.4,
                ease: "power1.in"
            }, startTime + (portalDuration * 0.6));
        });

        tl.to({}, { duration: 1 });

    }, { scope: tunnelRef, dependencies: [] });

    return (
        <div className="bg-black min-h-screen">
            <Helmet>
                <title>Ionic Minerals | The Science of Charge | Andara</title>
                <meta name="description" content="Explore the science of ionic minerals through a cinematic visual journey. From volcanic origins to cellular bioelectricity." />
            </Helmet>

            {/* HEADER */}
            <div className="fixed top-0 left-0 right-0 z-[60]">
                <MegaMenu />
            </div>

            {/* BACKGROUND - Cosmic Void */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-black" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
                {/* Subtle particle texture */}
                <div className="absolute inset-0 opacity-30">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* TUNNEL SEQUENCE (Height = scroll duration) */}
            <div ref={tunnelRef} className="relative h-[500vh] z-10">

                {/* HERO */}
                <div ref={heroRef} className="fixed top-32 left-0 right-0 z-50 flex justify-center px-4 mix-blend-screen origin-top pointer-events-none">
                    <GlassCard className="text-center py-12 px-8 md:px-16 bg-black/40 backdrop-blur-sm border-none shadow-2xl flex flex-col items-center max-w-4xl w-full">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-xs tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(245,166,35,0.1)]">
                            <Stars className="w-3 h-3" />
                            The Science of Charge
                        </div>
                        <h1 className="text-6xl md:text-9xl font-display text-white tracking-tighter mb-6 drop-shadow-2xl">
                            Ionic <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-cyan-400">Minerals</span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-2xl font-light leading-relaxed max-w-2xl tracking-wide">
                            Journey through the invisible architecture that powers every living cell.
                        </p>
                    </GlassCard>
                </div>

                {/* VIDEO PORTALS */}
                <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
                    {IONIC_MINERALS_PORTALS.map((portal, i) => {
                        const colors = getColorClasses(portal.colorTheme);
                        const Icon = portal.icon;

                        return (
                            <div
                                key={portal.id}
                                ref={(el) => { portalsRef.current[i] = el }}
                                className="absolute inset-0 flex items-center justify-center opacity-0"
                            >
                                <div className="relative w-[85vw] h-[60vh] md:w-[900px] md:h-[650px] flex items-center justify-center transform-gpu perspective-1000">
                                    {/* Portal Frame */}
                                    <div className={`absolute inset-0 rounded-[2rem] shadow-[0_0_150px_rgba(52,211,153,0.05)] overflow-hidden ring-1 ring-white/10 ${colors.border}`}>
                                        {/* VIDEO BACKGROUND */}
                                        <video
                                            src={portal.videoUrl}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                                        />
                                        {/* Color Overlay */}
                                        <div className={`absolute inset-0 ${colors.glow} mix-blend-overlay`} />
                                        {/* Gradient Vignette */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-auto">
                                        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/90 pointer-events-none" />

                                        <div className="relative z-10 p-8 flex flex-col items-center">
                                            <Icon className={`w-12 h-12 mb-6 opacity-80 ${colors.text}`} />
                                            <h2 className="text-5xl md:text-8xl font-display text-white tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] mb-6">
                                                {portal.title}
                                            </h2>
                                            <p className={`text-xl md:text-3xl font-light tracking-wide max-w-2xl leading-relaxed drop-shadow-lg ${colors.text}`}>
                                                {portal.description}
                                            </p>
                                            {portal.link && (
                                                <Link href={portal.link}>
                                                    <Button
                                                        variant="ghost"
                                                        className={`mt-8 ${colors.text} hover:bg-white/10 border ${colors.border} px-8 py-3 text-sm uppercase tracking-widest`}
                                                    >
                                                        Explore <ArrowRight className="ml-2 w-4 h-4" />
                                                    </Button>
                                                </Link>
                                            )}
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

            {/* FINAL LANDING - Product CTA */}
            <div className="relative z-50 bg-black border-t border-white/10 shadow-[0_-50px_100px_rgba(0,0,0,1)]">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24">

                    {/* ION Cluster Quick Links */}
                    <div className="mb-24">
                        <h3 className="text-3xl md:text-4xl font-display text-white mb-10 text-center">
                            Continue Your Journey
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {IONIC_MINERALS_PORTALS.slice(0, 8).map((portal) => {
                                const colors = getColorClasses(portal.colorTheme);
                                const Icon = portal.icon;
                                return (
                                    <Link key={portal.id} href={portal.link || "#"}>
                                        <div className={`group p-6 rounded-xl border ${colors.border} bg-white/5 hover:bg-white/10 transition-all hover:-translate-y-1 cursor-pointer`}>
                                            <Icon className={`w-8 h-8 mb-4 ${colors.text} group-hover:scale-110 transition-transform`} />
                                            <h4 className="text-white font-display text-lg mb-2">{portal.title}</h4>
                                            <p className="text-slate-500 text-xs leading-relaxed">{portal.description}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Product CTA Card */}
                    <GlassCard className="w-full bg-black/60 backdrop-blur-3xl border-white/5 overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-[0_0_150px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
                        {/* Left: Video Background */}
                        <div className="relative p-10 flex items-center justify-center bg-gradient-to-br from-slate-950 to-black border-r border-white/5 min-h-[400px]">
                            <video
                                src="/videos/ionic_minerals_hero_charge.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover opacity-40"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                            <div className="relative z-10 text-center">
                                <h2 className="text-5xl md:text-7xl font-display text-white tracking-tighter mb-4">
                                    Andara
                                </h2>
                                <p className="text-amber-400 text-sm uppercase tracking-[0.3em]">Ionic Sulfate Minerals</p>
                            </div>
                        </div>

                        {/* Right: Product Details */}
                        <div className="p-10 md:p-12 flex flex-col justify-center">
                            <div className="mb-6">
                                <h2 className="text-4xl md:text-5xl font-display text-white mb-2 tracking-tight">Experience The Charge</h2>
                                <p className="text-lg text-emerald-400 font-light tracking-widest uppercase mb-6 opacity-80">Premium Ionic Concentrate</p>
                                <p className="text-slate-400 leading-loose text-sm md:text-base mb-6 font-light">
                                    The complete ionic mineral solution. Sourced from volcanic origins, structured for bioelectric resonance, and designed for cellular integration.
                                </p>
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
                                    {["Volcanic Origin", "Ionic Sulfates", "Bioelectric Charge", "Cellular Integration"].map((feature) => (
                                        <div key={feature} className="flex items-center gap-3 text-sm text-slate-300 font-light">
                                            <div className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="border-t border-white/5 pt-8 mt-auto">
                                <div className="flex flex-col gap-3">
                                    <Link href="/products/andara-ionic-1l-pure">
                                        <Button className="w-full bg-white hover:bg-emerald-50 text-black rounded-sm h-14 text-sm uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3 font-semibold">
                                            <ShoppingCart className="w-4 h-4" />
                                            Shop Now
                                        </Button>
                                    </Link>
                                    <Link href="/ion">
                                        <Button variant="ghost" className="w-full text-slate-500 hover:text-white hover:bg-white/5 h-12 text-xs uppercase tracking-widest">
                                            Explore All Science <ArrowRight className="ml-2 w-3 h-3" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
