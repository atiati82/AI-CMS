import React, { useRef } from "react";
import { FadeIn } from "@/components/animations";
import { motion, useScroll, useTransform } from "framer-motion";
import { Magnet } from "lucide-react";

import { BackgroundLayer } from "@/components/visuals/BackgroundLayer";

interface HeroGlassProps {
    title: React.ReactNode;
    subtitle: React.ReactNode;
    badgeText?: string;

    backgroundImage?: string;
    registryId?: string; // New Smart Registry support
    altText?: string; // New SEO Field
    backgroundElement?: React.ReactNode; // Custom background component
    BadgeIcon?: React.ComponentType<any>;
    children?: React.ReactNode;
    variant?: string; // "cyan", "living-field", etc.
    liteMode?: boolean; // New Lite Mode support
}

import { LivingGrid } from "@/components/visuals/LivingGrid";

export function HeroGlass({
    title,
    subtitle,
    badgeText = "Andara Physics",

    backgroundImage,
    registryId,
    altText = "Scientific visualization of water structure", // SEO-safe default
    backgroundElement,
    BadgeIcon = Magnet,
    children,
    variant = "cyan",
    liteMode = false
}: HeroGlassProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax background opacity
    const bgOpacityRaw = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const contentYRaw = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    // In logic, we can't conditionally skip hooks, but we can ignore their results
    const bgOpacity = liteMode ? 1 : bgOpacityRaw;
    const contentY = liteMode ? 0 : contentYRaw;

    const colorStyles = {
        cyan: { badgeBg: "bg-cyan-500/20", badgeBorder: "border-cyan-500/30", badgeText: "text-cyan-300", selection: "selection:bg-cyan-500/30", gradient: "from-cyan-900/10 to-cyan-900/40" },
        emerald: { badgeBg: "bg-emerald-500/20", badgeBorder: "border-emerald-500/30", badgeText: "text-emerald-300", selection: "selection:bg-emerald-500/30", gradient: "from-emerald-900/10 to-emerald-900/40" },
        amber: { badgeBg: "bg-amber-500/20", badgeBorder: "border-amber-500/30", badgeText: "text-amber-300", selection: "selection:bg-amber-500/30", gradient: "from-amber-900/10 to-amber-900/40" },
        purple: { badgeBg: "bg-purple-500/20", badgeBorder: "border-purple-500/30", badgeText: "text-purple-300", selection: "selection:bg-purple-500/30", gradient: "from-purple-900/10 to-purple-900/40" },
        blue: { badgeBg: "bg-blue-500/20", badgeBorder: "border-blue-500/30", badgeText: "text-blue-300", selection: "selection:bg-blue-500/30", gradient: "from-blue-900/10 to-blue-900/40" },
        red: { badgeBg: "bg-red-500/20", badgeBorder: "border-red-500/30", badgeText: "text-red-300", selection: "selection:bg-red-500/30", gradient: "from-red-900/10 to-red-900/40" },
        indigo: { badgeBg: "bg-indigo-500/20", badgeBorder: "border-indigo-500/30", badgeText: "text-indigo-300", selection: "selection:bg-indigo-500/30", gradient: "from-indigo-900/10 to-indigo-900/40" },
        gold: { badgeBg: "bg-[#f6d56a]/20", badgeBorder: "border-[#f6d56a]/30", badgeText: "text-[#f6d56a]", selection: "selection:bg-[#f6d56a]/30", gradient: "from-[#f6d56a]/10 to-[#f6d56a]/40" },
        dark: { badgeBg: "bg-white/10", badgeBorder: "border-white/20", badgeText: "text-white/60", selection: "selection:bg-white/20", gradient: "from-slate-900/50 to-black" },
    };

    const styles = colorStyles[variant as keyof typeof colorStyles] || colorStyles.cyan;

    return (
        <section ref={containerRef} className={`relative h-screen flex items-center justify-center overflow-hidden bg-[#020617] text-white ${styles.selection}`}>

            {/* Custom Pulse Animation - Disabled in Lite Mode */}
            {!liteMode && (
                <style>{`
                    @keyframes hero-pulse {
                        0%, 100% { opacity: 0.5; transform: scale(1.0); }
                        50% { opacity: 0.8; transform: scale(1.05); filter: contrast(1.1); }
                    }
                    .animate-hero-pulse {
                        animation: hero-pulse 12s ease-in-out infinite;
                    }
                `}</style>
            )}

            {/* Background Layer */}
            <motion.div
                style={{ opacity: bgOpacity }}
                className="absolute inset-0 z-0"
            >
                {/* Fallback Gradient (Visible if image fails) */}
                <div className={`absolute inset-0 bg-gradient-to-br from-[#020617] ${styles.gradient}`} />

                {/* Custom Background Element */}
                {backgroundElement && (
                    <div className="absolute inset-0 z-0">
                        {backgroundElement}
                    </div>
                )}

                {/* Background Image: Smart Registry or Legacy URL */}
                {registryId ? (
                    <BackgroundLayer
                        registryId={registryId}
                        opacity={100}
                        hoverOpacity={100}
                        className={liteMode ? "" : "animate-hero-pulse"}
                        overlayGradient="none"
                    />
                ) : backgroundImage ? (
                    <img
                        src={backgroundImage}
                        alt={altText}
                        className={`relative z-10 w-full h-full object-cover transition-opacity duration-700 ${liteMode ? "" : "animate-hero-pulse"}`}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/30 via-[#020617]/10 to-[#020617]" />

                {/* Variant: Living Field Mesh - Hide in Lite Mode for performance */}
                {variant === 'living-field' && !liteMode && (
                    <LivingGrid variant="bioelectric" className="z-0 opacity-60" />
                )}
            </motion.div>

            {/* Content Container */}
            <motion.div style={{ y: contentY }} className="container relative z-10 px-4 text-center">
                <FadeIn>
                    <div className="inline-block p-8 md:p-12 rounded-[3rem] bg-black/30 backdrop-blur-2xl border border-white/10 shadow-2xl max-w-5xl mx-auto">

                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md mb-8 ${styles.badgeBg} ${styles.badgeBorder} ${styles.badgeText}`}>
                            <BadgeIcon className="w-4 h-4" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">{badgeText}</span>
                        </div>

                        <h1 className="text-5xl lg:text-8xl font-display font-bold leading-tight mb-8 tracking-tight drop-shadow-lg">
                            {title}
                        </h1>

                        <div className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light mb-8">
                            {subtitle}
                        </div>
                        {children}
                    </div>
                </FadeIn>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white/30 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
                <div className="w-px h-12 bg-gradient-to-b from-cyan-500 to-transparent" />
            </motion.div>
        </section>
    );
}
