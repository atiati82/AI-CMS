import React from 'react';
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

interface SourceDataCardProps {
    className?: string;
    title?: string;
    subtitle?: string;
    highlight?: string;
    stats?: {
        label: string;
        value: string;
    }[];
}

export function SourceDataCard({
    className,
    title = "THE SOURCE",
    subtitle = "We don't just sell water.",
    highlight = "We structure reality.",
    stats = [
        { value: "100%", label: "Ionic Bio-Availability" },
        { value: "-50mV", label: "Zeta Potential" },
        { value: "∞", label: "Shelf Life" }
    ]
}: SourceDataCardProps) {
    return (
        <GlassCard className={cn("text-center p-12 md:p-16 bg-black/40 backdrop-blur-md border-emerald-500/30 shadow-[0_0_100px_rgba(0,0,0,0.5)]", className)}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs tracking-widest uppercase mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Deep Immersion Protocol
            </div>

            <h2 className="text-7xl md:text-9xl font-display text-white mb-8 tracking-tighter mix-blend-overlay">
                {title}
            </h2>

            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                {subtitle} <br />
                <span className="text-emerald-400 font-normal">{highlight}</span>
            </p>

            <div className={`grid grid-cols-1 md:grid-cols-${stats.length} gap-8 mt-16 border-t border-white/10 pt-8`}>
                {stats.map((stat, i) => (
                    <div key={i}>
                        <div className="text-4xl font-light text-white mb-2">{stat.value}</div>
                        <div className="text-xs uppercase tracking-widest text-slate-500">{stat.label}</div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}
