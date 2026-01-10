/**
 * Video Gallery Demo
 * 
 * Showcase of all 8 Ionic Minerals videos with GSAP scroll animations.
 * Route: /demos/video-gallery
 */

import React, { useRef } from 'react';
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize2, ArrowRight, Zap, Mountain, Activity, Network, Brain, Droplets, Hexagon, Gauge } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import MegaMenu from "@/components/mega-menu";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface VideoItem {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    icon: React.ComponentType<{ className?: string }>;
    colorTheme: string;
    tags: string[];
    duration: string;
    mood: string;
}

const IONIC_MINERALS_VIDEOS: VideoItem[] = [
    {
        id: "ionic-minerals-hero-charge",
        title: "The Charge That Powers Life",
        description: "Ions organizing water into crystalline patterns. The invisible architecture of biological electricity.",
        videoUrl: "/videos/ionic_minerals_hero_charge.mp4",
        icon: Zap,
        colorTheme: "amber",
        tags: ["ionic", "minerals", "charge", "hero", "crystalline"],
        duration: "8s loop",
        mood: "Ethereal"
    },
    {
        id: "ionic-minerals-volcanic-genesis",
        title: "Volcanic Genesis",
        description: "Magma cooling into crystalline black mica with golden sulfate veins. The primordial origin.",
        videoUrl: "/videos/ionic_minerals_volcanic_genesis.mp4",
        icon: Mountain,
        colorTheme: "orange",
        tags: ["volcanic", "origin", "genesis", "sulfate", "mica"],
        duration: "8s loop",
        mood: "Primordial"
    },
    {
        id: "ionic-minerals-conductivity",
        title: "Ionic Conductivity",
        description: "Current flow visualization through ionic water. The electrical signature of living systems.",
        videoUrl: "/videos/ionic_minerals_conductivity.mp4",
        icon: Activity,
        colorTheme: "cyan",
        tags: ["conductivity", "ionic", "current", "flow", "electric"],
        duration: "8s loop",
        mood: "Energetic"
    },
    {
        id: "ionic-minerals-cation-exchange",
        title: "Cation Exchange",
        description: "CEC mechanism with ions swapping on soil particles. Nature's mineral banking system.",
        videoUrl: "/videos/ionic_minerals_cation_exchange.mp4",
        icon: Network,
        colorTheme: "emerald",
        tags: ["cation", "exchange", "cec", "soil", "mineral"],
        duration: "8s loop",
        mood: "Scientific"
    },
    {
        id: "ionic-minerals-bioelectric-membrane",
        title: "Bioelectric Membrane",
        description: "Ion channels opening in cell membranes. The gatekeepers of cellular intelligence.",
        videoUrl: "/videos/ionic_minerals_bioelectric_membrane.mp4",
        icon: Brain,
        colorTheme: "indigo",
        tags: ["bioelectric", "membrane", "cell", "sodium", "channel"],
        duration: "8s loop",
        mood: "Living"
    },
    {
        id: "ionic-minerals-hydration",
        title: "Mineral Hydration",
        description: "Drop structuring water into hexagonal coherence. Liquid alchemy in action.",
        videoUrl: "/videos/ionic_minerals_hydration.mp4",
        icon: Droplets,
        colorTheme: "cyan",
        tags: ["hydration", "structure", "water", "hex", "mineral"],
        duration: "8s loop",
        mood: "Alchemical"
    },
    {
        id: "ionic-minerals-network",
        title: "Charged Particle Network",
        description: "Mineral intelligence mesh forming like a cosmic nervous system. Emergent order.",
        videoUrl: "/videos/ionic_minerals_network.mp4",
        icon: Hexagon,
        colorTheme: "purple",
        tags: ["network", "particle", "intelligence", "mesh", "mineral"],
        duration: "8s loop",
        mood: "Cosmic"
    },
    {
        id: "ionic-minerals-orp-redox",
        title: "ORP Potential Shift",
        description: "Meter visualization showing redox transformation. From oxidized to antioxidant.",
        videoUrl: "/videos/ionic_minerals_orp_redox.mp4",
        icon: Gauge,
        colorTheme: "emerald",
        tags: ["orp", "redox", "antioxidant", "potential", "meter"],
        duration: "8s loop",
        mood: "Scientific"
    }
];

const getColorClasses = (theme: string) => {
    const maps: Record<string, { bg: string; text: string; border: string; glow: string }> = {
        amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", glow: "shadow-amber-500/20" },
        orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30", glow: "shadow-orange-500/20" },
        cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30", glow: "shadow-cyan-500/20" },
        emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", glow: "shadow-emerald-500/20" },
        indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/30", glow: "shadow-indigo-500/20" },
        purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30", glow: "shadow-purple-500/20" },
    };
    return maps[theme] || maps.emerald;
};

function VideoCard({ video, index }: { video: VideoItem; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [isMuted, setIsMuted] = React.useState(true);
    const colors = getColorClasses(video.colorTheme);
    const Icon = video.icon;

    useGSAP(() => {
        if (!cardRef.current) return;

        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 60, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, { scope: cardRef });

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div
            ref={cardRef}
            className={cn(
                "group relative rounded-2xl overflow-hidden border transition-all duration-500",
                "hover:scale-[1.02] hover:shadow-2xl",
                colors.border,
                colors.glow
            )}
        >
            {/* Video Container */}
            <div className="relative aspect-video bg-black overflow-hidden">
                <video
                    ref={videoRef}
                    src={video.videoUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                />

                {/* Video Controls Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <div className="flex gap-2">
                            <button
                                onClick={togglePlay}
                                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                            </button>
                            <button
                                onClick={toggleMute}
                                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                            </button>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
                            <Maximize2 className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>

                {/* Index Badge */}
                <div className="absolute top-4 left-4">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-display text-lg", colors.bg, colors.text)}>
                        {String(index + 1).padStart(2, '0')}
                    </div>
                </div>

                {/* Mood Badge */}
                <div className="absolute top-4 right-4">
                    <div className={cn("px-3 py-1 rounded-full text-xs uppercase tracking-wider backdrop-blur-sm", colors.bg, colors.text)}>
                        {video.mood}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 bg-slate-950/80 backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-4">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colors.bg)}>
                        <Icon className={cn("w-6 h-6", colors.text)} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-display text-white mb-1">{video.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{video.description}</p>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {video.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded bg-white/5 text-slate-500 border border-white/5"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-slate-500">
                    <span>Duration: {video.duration}</span>
                    <span className="font-mono">{video.id}</span>
                </div>
            </div>
        </div>
    );
}

export default function VideoGalleryPage() {
    const headerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!headerRef.current) return;

        gsap.fromTo(headerRef.current.querySelectorAll('.animate-in'),
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            }
        );
    }, { scope: headerRef });

    return (
        <div className="bg-black min-h-screen">
            <Helmet>
                <title>Video Gallery | Ionic Minerals GSAP Collection | Andara</title>
                <meta name="description" content="Explore the complete collection of 8 cinematic Ionic Minerals videos with GSAP scroll animations." />
            </Helmet>

            {/* HEADER */}
            <div className="fixed top-0 left-0 right-0 z-[60]">
                <MegaMenu />
            </div>

            {/* BACKGROUND */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-slate-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 pt-32 pb-24">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">

                    {/* Header */}
                    <div ref={headerRef} className="text-center mb-16">
                        <div className="animate-in inline-flex items-center gap-2 px-4 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-xs tracking-widest uppercase mb-6">
                            <Play className="w-3 h-3" />
                            Video Collection
                        </div>
                        <h1 className="animate-in text-5xl md:text-7xl font-display text-white tracking-tighter mb-6">
                            Ionic Minerals <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">Gallery</span>
                        </h1>
                        <p className="animate-in text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            A curated collection of 8 cinematic visualizations exploring the science of ionic minerals,
                            from volcanic genesis to cellular integration.
                        </p>
                        <div className="animate-in mt-8 flex justify-center gap-4">
                            <Link href="/demos/ionic-minerals">
                                <Button className="bg-white hover:bg-amber-50 text-black px-8 py-3 text-sm uppercase tracking-widest">
                                    View SuperPage <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                            <Link href="/ion">
                                <Button variant="ghost" className="text-slate-400 hover:text-white border border-white/10 px-8 py-3 text-sm uppercase tracking-widest">
                                    ION Science Hub
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        {[
                            { label: "Videos", value: "8" },
                            { label: "Total Duration", value: "~64s" },
                            { label: "Resolution", value: "1080p" },
                            { label: "Format", value: "MP4" }
                        ].map((stat) => (
                            <GlassCard key={stat.label} className="p-6 text-center bg-white/5 border-white/10">
                                <div className="text-3xl font-display text-white mb-1">{stat.value}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                            </GlassCard>
                        ))}
                    </div>

                    {/* Video Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {IONIC_MINERALS_VIDEOS.map((video, index) => (
                            <VideoCard key={video.id} video={video} index={index} />
                        ))}
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-24 text-center">
                        <GlassCard className="inline-block p-8 md:p-12 bg-white/5 border-white/10">
                            <h3 className="text-2xl md:text-3xl font-display text-white mb-4">
                                Ready to experience the full journey?
                            </h3>
                            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                                Watch all 8 videos in an immersive GSAP-powered scroll experience.
                            </p>
                            <Link href="/demos/ionic-minerals">
                                <Button className="bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-black px-12 py-4 text-sm uppercase tracking-widest font-semibold">
                                    Launch SuperPage Experience
                                </Button>
                            </Link>
                        </GlassCard>
                    </div>

                </div>
            </div>
        </div>
    );
}
