import React, { useRef, useState } from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { Plus, Maximize, Activity, Box, Zap, ScanLine, FileBarChart, Microscope, Thermometer, ShieldCheck } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface Hotspot {
    id: string;
    x: number; // Percent
    y: number; // Percent
    label: string;
    value: string;
    detail: string;
}

const hotspots: Hotspot[] = [
    { id: '1', x: 50, y: 15, label: 'SEAL', value: 'Hermetic', detail: 'Pressure-sealed cap ensures zero oxidation during transit.' },
    { id: '2', x: 50, y: 45, label: 'GLASS', value: 'Miron Violet', detail: 'Biophotonic glass blocks visible light, extending shelf life.' },
    { id: '3', x: 50, y: 65, label: 'SOLUTE', value: 'Sulfate Complex', detail: 'High-concentration ionic minerals sourced from volcanic earth.' },
    { id: '4', x: 50, y: 88, label: 'VOLUME', value: '100ml / 3.4oz', detail: 'Compact flagship vessel. 3-month supply at standard dosage.' },
];

const spectralData = [
    { el: "Sulfur (S)", val: "High", color: "bg-yellow-400" },
    { el: "Iron (Fe)", val: "Trace", color: "bg-red-400" },
    { el: "Magnesium (Mg)", val: "Mod", color: "bg-emerald-400" },
    { el: "Zinc (Zn)", val: "Low", color: "bg-blue-400" },
    { el: "Selenium (Se)", val: "Trace", color: "bg-purple-400" },
]

export default function ConceptLaboratory() {
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

    return (
        <StandardPageLayout
            title="The Laboratory | Andara"
            seoTitle="The Laboratory - Technical Analysis"
            seoDescription="Technical specifications and deep analysis of Andara Ionic 100ml."
        >
            <div className="bg-slate-950 min-h-screen text-cyan-500 font-mono relative overflow-x-hidden selection:bg-cyan-900/50 selection:text-white pb-32">

                {/* --- GLOBAL GRID BACKGROUND --- */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)]" />
                </div>

                {/* --- HEADER UI (Sticky) --- */}
                <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-between items-start pointer-events-none mix-blend-screen border-b border-cyan-900/30 backdrop-blur-[2px]">
                    <div className="pointer-events-auto">
                        <h1 className="text-sm tracking-widest uppercase text-white/90 font-bold flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            [ CLASSIFIED : PUBLIC ]
                        </h1>
                        <p className="text-[10px] text-cyan-600 mt-1">SECURE CONNECTION: ESTABLISHED (TLS 1.3)</p>
                    </div>
                    <div className="text-right pointer-events-auto hidden md:block">
                        <p className="text-[10px] text-cyan-600">SYS.VER.4.0.2 // NODE-A1</p>
                        <div className="flex items-center gap-2 justify-end mt-1">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-[10px] text-emerald-500">LIVE MONITORING</span>
                        </div>
                    </div>
                </header>

                {/* --- SECTION 1: VISUAL ANALYSIS (The Bottle) --- */}
                <section className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col items-center justify-center pt-24">

                    {/* STAGE TITLE */}
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center gap-2 border border-cyan-900/50 px-4 py-1 rounded bg-cyan-950/20 mb-4">
                            <ScanLine className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs tracking-[0.2em] text-cyan-300">SUBJECT: ANDARA-100</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl text-white font-display font-bold tracking-tighter uppercase mb-2">Technical Analysis</h2>
                        <div className="h-px w-24 bg-cyan-500 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-6xl items-center">

                        {/* LEFT: SPECS LIST */}
                        <div className="hidden lg:flex col-span-3 flex-col gap-4 text-right">
                            {[
                                { k: "PH", v: "1.2 - 1.5", l: "ACIDIC" },
                                { k: "ORP", v: "+450mV", l: "OXIDATIVE" },
                                { k: "TDS", v: ">5000ppm", l: "SATURATED" }
                            ].map((s, i) => (
                                <div key={i} className="border-r-2 border-cyan-900 pr-4 py-2">
                                    <div className="text-[10px] text-cyan-600 tracking-widest">{s.k}</div>
                                    <div className="text-2xl text-white font-bold">{s.v}</div>
                                    <div className="text-[10px] text-emerald-500">{s.l}</div>
                                </div>
                            ))}
                        </div>

                        {/* CENTER: INTERACTIVE BOTTLE */}
                        <div className="col-span-1 lg:col-span-6 relative w-full aspect-[3/4] flex items-center justify-center">
                            {/* Central Glow */}
                            <div className="absolute inset-0 bg-cyan-500/5 blur-[80px] rounded-full" />

                            {/* Rotating Rings */}
                            <div className="absolute inset-0 border border-cyan-800/20 rounded-full animate-[spin_30s_linear_infinite]" />
                            <div className="absolute inset-12 border border-cyan-900/20 rounded-full border-dashed animate-[spin_20s_linear_infinite_reverse]" />
                            <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-900/30" />
                            <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-900/30" />

                            <img
                                src="/assets/generated_images/andara-ionic-100ml-transparent.png"
                                alt="Analysis Subject"
                                className="relative z-20 h-5/6 object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.2)] grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                            />

                            {/* HOTSPOTS */}
                            <div className="absolute inset-0 z-30 pointer-events-none h-full w-full">
                                {hotspots.map((hs) => (
                                    <div
                                        key={hs.id}
                                        className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                                        style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                                        onMouseEnter={() => setActiveHotspot(hs.id)}
                                        onMouseLeave={() => setActiveHotspot(null)}
                                    >
                                        <button className="relative group p-2">
                                            <div className="w-4 h-4 bg-cyan-950 border border-cyan-500 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform">
                                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping absolute" />
                                                <div className="w-1.5 h-1.5 bg-white rounded-full relative z-10" />
                                            </div>
                                            <div className={cn(
                                                "absolute top-1/2 left-full h-px bg-cyan-500 transition-all duration-300 origin-left ml-2",
                                                activeHotspot === hs.id ? "w-12 opacity-100" : "w-0 opacity-0"
                                            )} />
                                        </button>
                                        <AnimatePresence>
                                            {activeHotspot === hs.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 60 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    className="absolute top-1/2 -translate-y-1/2 left-0 w-64 bg-slate-900/95 border border-cyan-500/50 p-4 rounded backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.2)] z-50 pointer-events-none"
                                                >
                                                    <div className="flex justify-between items-start mb-2 border-b border-cyan-900 pb-1">
                                                        <span className="text-xs font-bold text-white tracking-widest">{hs.label}</span>
                                                        <Activity className="w-3 h-3 text-emerald-400" />
                                                    </div>
                                                    <div className="text-lg text-cyan-300 font-bold mb-1">{hs.value}</div>
                                                    <p className="text-[10px] text-slate-400 leading-snug">{hs.detail}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: COMPOSITION MINI */}
                        <div className="hidden lg:flex col-span-3 flex-col gap-2">
                            <h3 className="text-xs text-cyan-500 mb-4 border-b border-cyan-900 pb-2">SPECTRAL SIGNATURE</h3>
                            {spectralData.map((d, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs">
                                    <div className={`w-1 h-3 ${d.color}`} />
                                    <span className="w-24 text-slate-400 font-mono">{d.el}</span>
                                    <div className="flex-grow h-1 bg-cyan-900/30 rounded-full overflow-hidden">
                                        <div className="h-full bg-cyan-500/50 w-3/4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- SECTION 2: BIO-ELECTRIC IMPACT --- */}
                <section className="relative py-24 border-t border-cyan-900/30 bg-slate-900/20">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div className="order-2 md:order-1 relative aspect-video bg-black border border-cyan-900/50 rounded-lg overflow-hidden group">
                                {/* Background Image Area */}
                                <div className="absolute inset-0 bg-[url('/images/bioelectric/cell-voltage-bg.png')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-[2000ms]" />
                                <div className="absolute inset-0 bg-cyan-900/20 mix-blend-color" />

                                {/* Overlay Data */}
                                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur p-4 border border-white/10 flex justify-between items-center rounded">
                                    <div>
                                        <div className="text-[10px] text-emerald-400 uppercase tracking-widest mb-1">Cellular Potential</div>
                                        <div className="text-2xl text-white font-mono font-bold">-20mV <span className="text-slate-500 text-sm">to</span> -50mV</div>
                                    </div>
                                    <Activity className="w-8 h-8 text-emerald-500 animate-pulse" />
                                </div>
                            </div>

                            <div className="order-1 md:order-2">
                                <div className="flex items-center gap-2 mb-4">
                                    <Zap className="w-5 h-5 text-yellow-400" />
                                    <h3 className="text-lg font-bold text-white tracking-wider">VOLTAGE RESTORATION</h3>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
                                    Analysis indicates Andara Ionic minerals act as effective semi-conductors within the extracellular matrix. By increasing the conductivity of the aqueous medium, cellular voltage potential is optimized, allowing for enhanced transmembrane transport.
                                </p>
                                <ul className="space-y-3 text-xs text-cyan-300 font-sans">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500" /> OPTIMIZED MEMBRANE POTENTIAL</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500" /> ENHANCED ATP PRODUCTION</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500" /> IMPROVED OSMOTIC EQUILIBRIUM</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 3: PROTOCOL & CALCULATOR --- */}
                <section className="relative py-24 bg-slate-950">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <div className="mb-12">
                            <Thermometer className="w-8 h-8 text-cyan-500 mx-auto mb-4" />
                            <h2 className="text-3xl text-white font-bold uppercase tracking-tighter">Usage Protocol</h2>
                            <p className="text-xs text-cyan-600 mt-2 font-mono">CALIBRATION FOR 70KG ADULT HUMAN</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { phase: "INITIATION", dosage: "2.5ml", freq: "Once Daily", note: "System acclimation. 7 days." },
                                { phase: "SATURATION", dosage: "5.0ml", freq: "Twice Daily", note: "Optimal loading phase. 14 days." },
                                { phase: "MAINTENANCE", dosage: "5.0ml", freq: "Once Daily", note: "Long-term support." },
                            ].map((card, i) => (
                                <div key={i} className="border border-cyan-900/30 bg-cyan-950/10 p-6 rounded hover:border-cyan-500/50 transition-colors text-left group">
                                    <div className="text-[10px] text-cyan-400 tracking-widest mb-2 border-b border-cyan-900/50 pb-2 flex justify-between">
                                        PHASE 0{i + 1}
                                        {i === 1 && <span className="text-emerald-500 animate-pulse">RECOMMENDED</span>}
                                    </div>
                                    <div className="text-3xl text-white font-bold mb-1">{card.dosage}</div>
                                    <div className="text-sm text-slate-300 mb-4">{card.freq}</div>
                                    <div className="text-[10px] text-slate-500 font-mono bg-black/30 p-2 rounded">
                                         // {card.note}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- FOOTER CTA --- */}
                <section className="py-24 border-t border-cyan-900/20 text-center">
                    <p className="text-xs text-cyan-700 mb-6 font-mono">ANALYSIS COMPLETE. STATUS: APPROVED.</p>
                    <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-black font-bold font-mono rounded text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105">
                        Initiate Order Sequence [$65.00]
                    </button>
                </section>

            </div>
        </StandardPageLayout>
    );
}

// Icon Helper
function Droplet(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22a7 7 0 0 0 7-7c0-2-2-5-7-13-5 8-7 11-7 13a7 7 0 0 0 7 7z" />
        </svg>
    )
}
