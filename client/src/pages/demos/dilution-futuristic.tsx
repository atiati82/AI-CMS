import React, { useState } from "react";
import StandardPageLayout from "@/components/StandardPageLayout"; // Using Standard for consistent nav/footer
import { motion } from "framer-motion";
import {
    Droplets, Sprout, Bath, RefreshCw, Beaker,
    Waves, ShieldCheck, Sparkles, Zap, Flower2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// --- VISUAL INTERPRETATION OF "SmartImageGlas1.0" ---
// This component encapsulates the "Glass Glowing Futuristic Style"
// Definition: Deep dark glass, cyan/amber bi-color gradients, sacred geometry hints.

const SmartImageGlass = ({ children, className, variant = "cyan" }: { children: React.ReactNode, className?: string, variant?: "cyan" | "amber" | "mixed" }) => {
    return (
        <div className={cn("relative group", className)}>
            {/* 1. Outer Glow/Border Gradient (Animated) */}
            <div className={cn(
                "absolute -inset-[1px] rounded-2xl opacity-70 blur-sm transition-all duration-1000 group-hover:opacity-100 group-hover:blur-md",
                variant === "cyan" && "bg-gradient-to-br from-cyan-500/50 via-transparent to-cyan-500/30",
                variant === "amber" && "bg-gradient-to-br from-amber-500/50 via-transparent to-amber-500/30",
                variant === "mixed" && "bg-gradient-to-br from-cyan-400 via-purple-500 to-amber-400"
            )} />

            {/* 2. Glass Container */}
            <div className="relative rounded-2xl bg-[#030712]/80 backdrop-blur-xl border border-white/5 overflow-hidden h-full">
                {/* 3. Inner Specular Highlight (Top) */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* 4. Sacred Geometry Overlay (Faint) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />

                {/* Content */}
                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- DATA ---
const DILUTION_ROWS = [
    {
        id: "drinking",
        icon: Droplets,
        title: "Drinking Water",
        stock: "2ml",
        ritual: "20ml",
        target: "2 Liters",
        accent: "text-cyan-400",
        glow: "shadow-cyan-500/20"
    },
    {
        id: "bath",
        icon: Bath,
        title: "Mineral Bath",
        stock: "20ml",
        ritual: "200ml",
        target: "200 Liters",
        accent: "text-purple-400",
        glow: "shadow-purple-500/20"
    },
    {
        id: "agri",
        icon: Sprout,
        title: "Agriculture",
        stock: "1L",
        ritual: "10L",
        target: "2500 Liters",
        accent: "text-emerald-400",
        glow: "shadow-emerald-500/20"
    },
    {
        id: "waste",
        icon: RefreshCw,
        title: "Wastewater",
        stock: "100ml",
        ritual: "1L",
        target: "100 Liters",
        accent: "text-blue-400",
        glow: "shadow-blue-500/20"
    }
];

export default function DilutionFuturisticPage() {
    return (
        <StandardPageLayout
            title={<>Ionic <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">Alchemy</span></>}
            subtitle="SmartImageGlas1.0 Interpretation • 2026 Design System"
            heroVariant="cyan"
            heroIcon={Sparkles}
            seoTitle="Andara SmartImageGlas Demo"
            seoDescription="Visual interpretation of the Andara Ionic Master Dilution Table in high-fidelity futuristic glass style."
        >
            <div className="fixed inset-0 bg-[#020617] -z-20" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#020617] to-[#020617] -z-10" />

            <section className="py-24 px-4 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-5xl mx-auto space-y-12">

                    {/* SYSTEM TAG */}
                    <div className="flex justify-center">
                        <div className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-xs font-mono tracking-widest uppercase backdrop-blur-md">
                            System: SmartImageGlas1.0 // Render_Mode: Ultra
                        </div>
                    </div>

                    {/* THE "DILUTION BOX" SNIPPET */}
                    <SmartImageGlass variant="mixed" className="w-full shadow-2xl shadow-cyan-900/20">
                        {/* Header Area */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 pb-6 border-b border-white/5">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-display text-white mb-2">
                                    Master <span className="text-cyan-400">Dilution</span> Table
                                </h2>
                                <p className="text-white/50 text-sm md:text-base max-w-xl">
                                    Optimized for <span className="text-amber-400 font-medium">Andara 1:10 Ritual Solution</span> & Themarox Stock.
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0 flex gap-3">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs font-bold uppercase tracking-wider">
                                    <Zap className="w-3 h-3" /> Ionic
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 text-xs font-bold uppercase tracking-wider">
                                    <Waves className="w-3 h-3" /> Structured
                                </div>
                            </div>
                        </div>

                        {/* Column Headers (Desktop) */}
                        <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-bold text-white/30 uppercase tracking-widest mb-4 px-4">
                            <div className="col-span-4 pl-2">Application</div>
                            <div className="col-span-2 text-center text-amber-500/50">Undiluted Stock</div>
                            <div className="col-span-3 text-center text-cyan-500/70">1:10 Ritual Solution</div>
                            <div className="col-span-3 text-right pr-2">Target Volume</div>
                        </div>

                        {/* Rows */}
                        <div className="space-y-3">
                            {DILUTION_ROWS.map((row, idx) => (
                                <motion.div
                                    key={row.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group/row relative rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                                >
                                    {/* Hover Glow Effect */}
                                    <div className={`absolute inset-0 opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-${row.accent.split('-')[1]}-500/5 to-transparent`} />

                                    <div className="relative p-4 md:p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

                                        {/* Application Name */}
                                        <div className="col-span-4 flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center ${row.accent} shadow-lg shadow-black/50`}>
                                                <row.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-white font-medium text-lg">{row.title}</div>
                                                <div className="text-white/30 text-xs md:hidden">Application</div>
                                            </div>
                                        </div>

                                        {/* Undiluted */}
                                        <div className="col-span-2 flex flex-col items-start md:items-center">
                                            <div className="text-amber-500 font-mono font-bold text-lg md:text-xl filter drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                                                {row.stock}
                                            </div>
                                            <div className="text-amber-500/30 text-[10px] uppercase font-bold tracking-wider md:hidden">Stock</div>
                                        </div>

                                        {/* 1:10 Solution (Highlighted) */}
                                        <div className="col-span-3 flex flex-col items-start md:items-center relative">
                                            <div className="absolute inset-0 bg-cyan-500/10 blur-xl rounded-full opacity-0 group-hover/row:opacity-100 transition-opacity" />
                                            <div className="text-cyan-400 font-mono font-bold text-xl md:text-2xl filter drop-shadow-[0_0_12px_rgba(6,182,212,0.4)] relative z-10">
                                                {row.ritual}
                                            </div>
                                            <div className="text-cyan-500/30 text-[10px] uppercase font-bold tracking-wider md:hidden">1:10 Ritual</div>
                                        </div>

                                        {/* Target */}
                                        <div className="col-span-3 flex flex-col items-start md:items-end">
                                            <div className="text-white/80 font-bold text-lg">
                                                {row.target}
                                            </div>
                                            <div className="text-white/30 text-[10px] uppercase font-bold tracking-wider">Water Volume</div>
                                        </div>

                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between opacity-60">
                            <div className="text-xs font-mono text-cyan-200/50 flex items-center gap-2">
                                <Sparkles className="w-3 h-3" />
                                OPTIMIZED FOR 100ML BOTTLES
                            </div>
                            <div className="text-xs font-mono text-white/30">
                                ANDARA IONIC RESEARCH © 2026
                            </div>
                        </div>

                    </SmartImageGlass>

                </div>
            </section>
        </StandardPageLayout>
    );
}
