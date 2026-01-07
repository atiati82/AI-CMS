import React from 'react';
import { AdvancedPageLayout } from "@/components/layout/AdvancedPageLayout_Proposal";
import { GlassCard } from "@/components/ui/glass-card";
import { SmartImage } from "@/components/ui/SmartImage";
import { BundleCTA } from "@/components/shop/BundleCTA";
import { Activity, Microscope, Zap, FileText } from "lucide-react";

export default function DemoLayoutV4() {
    return (
        <AdvancedPageLayout
            title="Scientific Grid"
            subtitle="Layout v4: Technical Density"
            vibeKeywords={["Grid", "Data", "Tech"]}
        >
            <div className="max-w-6xl mx-auto">

                {/* HERO STATS BAR */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-t-lg overflow-hidden mb-12">
                    {[
                        { label: "IONIC POTENTIAL", val: "-50mV" },
                        { label: "CRYSTAL STRUCTURE", val: "Hexagonal" },
                        { label: "PURITY RATING", val: "99.9%" },
                        { label: "SOURCE", val: "Primordial" }
                    ].map((stat, i) => (
                        <div key={i} className="p-4 bg-black/40 backdrop-blur-sm text-center">
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{stat.label}</div>
                            <div className="text-xl font-mono text-emerald-400">{stat.val}</div>
                        </div>
                    ))}
                </div>

                {/* THE BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 gap-4 h-[1200px] md:h-[800px]">

                    {/* 1. Main Visual (Span 2x2) */}
                    <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-lg border border-white/10">
                        <SmartImage keyword="laboratory-glass" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent w-full">
                            <h3 className="text-2xl font-display text-white mb-1"><Microscope className="inline w-5 h-5 mr-2 text-emerald-500" /> Lab Data</h3>
                            <p className="text-xs text-emerald-400 font-mono">SPECTROSCOPY ANALYSIS COMPLETED</p>
                        </div>
                    </div>

                    {/* 2. Key Metric (Span 1x1) */}
                    <div className="bg-black/40 border border-white/10 rounded-lg p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
                        <Zap className="w-8 h-8 text-amber-500" />
                        <div>
                            <div className="text-4xl font-mono text-white mb-2">4th</div>
                            <div className="text-xs text-slate-400 uppercase">Phase of Water</div>
                        </div>
                    </div>

                    {/* 3. Text Block (Span 1x1) */}
                    <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-lg p-6">
                        <p className="text-sm text-emerald-100/80 leading-relaxed font-mono">
                            "The grid layout maximizes information density without clutter. Ideal for Research pages."
                        </p>
                    </div>

                    {/* 4. Chart Area (Span 2x1) */}
                    <div className="md:col-span-2 bg-black/40 border border-white/10 rounded-lg p-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]"></div>
                        <h3 className="relative font-bold text-white mb-2"><Activity className="inline w-4 h-4 mr-2" /> Bio-Conductivity</h3>
                        <div className="relative h-24 flex items-end gap-1 mt-4">
                            {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                                <div key={i} className="flex-1 bg-emerald-500/20 hover:bg-emerald-500 transition-colors rounded-t-sm" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </div>

                    {/* 5. Tall Text (Span 1x2) */}
                    <div className="md:row-span-2 bg-black/40 border border-white/10 rounded-lg p-8">
                        <h3 className="text-xl font-display text-white mb-6">Methodology</h3>
                        <ul className="space-y-6">
                            {[1, 2, 3].map((n) => (
                                <li key={n} className="flex gap-4">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full border border-emerald-500/50 text-emerald-500 flex items-center justify-center text-xs font-mono">{n}</span>
                                    <p className="text-xs text-slate-300 leading-normal">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Precision is key.
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 6. CTA Block (Span 3x1) */}
                    <div className="md:col-span-3 bg-gradient-to-r from-emerald-900/40 to-blue-900/40 border border-white/10 rounded-lg p-8 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Download Technical Papers</h3>
                            <p className="text-sm text-slate-300">Full spectral analysis and peer-review data available.</p>
                        </div>
                        <button className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm tracking-uppercase rounded">
                            ACCESS DATA
                        </button>
                    </div>

                </div>
            </div>
        </AdvancedPageLayout>
    );
}
