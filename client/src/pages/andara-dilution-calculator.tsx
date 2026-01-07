import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import {
    Calculator,
    Droplets,
    FlaskConical,
    Sprout,
    Waves,
    Bath,
    ArrowRight,
    RefreshCw,
    Check,
    ShoppingCart,
    Copy,
    ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AndaraDilutionCalculator() {
    // --- STATE ---
    const [volume, setVolume] = useState<string>("1");
    const [unit, setUnit] = useState<"L" | "Gal">("L");
    const [appType, setAppType] = useState<string>("house");
    const [solutionMode, setSolutionMode] = useState<"1:10" | "Stock">("1:10");

    // --- SEO ---
    const calculatorSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Andara Ionic Dilution Calculator",
        "description": "Interactive calculator for exact mineral dosing of 1:10 Adya solution and Undiluted stock.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "All"
    };

    // --- CONSTANTS ---
    const APPLICATIONS = [
        { id: "house", label: "House Water (1:1,000)", ratio: 1000, icon: Droplets },
        { id: "drinking_light", label: "Drinking - Light (1:1,000 ratio)", ratio: 1000, icon: FlaskConical },
        { id: "drinking_strong", label: "Drinking - Strong (1:100 ratio)", ratio: 100, icon: FlaskConical },
        { id: "bath", label: "Mineral Bath (1:1,000 ratio)", ratio: 1000, icon: Bath },
        { id: "aquaculture", label: "Aquaculture (1:1,000 ratio)", ratio: 1000, icon: Waves },
        { id: "waste", label: "Wastewater (1:500 ratio)", ratio: 500, icon: RefreshCw },
        { id: "agri", label: "Agriculture (1:2,500 ratio)", ratio: 2500, icon: Sprout },
        { id: "odor_strong", label: "Anti-Bacterial (1:50-500 ratio)", ratio: 500, icon: ShieldCheck },
    ];

    // --- CALCULATION ---
    const selectedApp = APPLICATIONS.find(a => a.id === appType) || APPLICATIONS[0];

    const calculateDose = () => {
        const volNum = parseFloat(volume);
        if (isNaN(volNum) || volNum <= 0) return { ml: 0, drops: 0 };

        // 1. Convert to Liters
        const volLiters = unit === "Gal" ? volNum * 3.78541 : volNum;

        // 2. Base Dose in mL (of Undiluted Stock)
        const baseDoseMl = (volLiters * 1000) / selectedApp.ratio;

        // 3. Adjust for solution mode
        // If 1:10 mode, we need 10x more volume
        const finalMl = solutionMode === "1:10" ? baseDoseMl * 10 : baseDoseMl;

        return {
            ml: finalMl,
            drops: finalMl * 20
        };
    };

    const result = calculateDose();

    return (
        <StandardPageLayout
            title="Dilution Calculator"
            subtitle="Precision Dosing for Your 1:10 Working Concentrate"

            heroVariant="cyan"
            heroIcon={Calculator}
            badges={[{ text: "Interactive Tool", icon: Calculator }]}
            seoTitle="Andara Ionic Dilution Calculator | 1:10 Working Concentrate"
            seoDescription="Calculate precise dosing for Andara Ionic 1:10 Working Concentrate applications. Interactive tool for house water, drinking, agriculture, and more."
            extraHead={<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }} />}
        >
            <section className="py-12 md:py-24 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* INPUT CARD */}
                        <div className="andara-glass-panel p-8 border-cyan-500/20 h-fit bg-[#0b1020]/50 backdrop-blur-sm rounded-xl">
                            <h2 className="text-xl font-display font-medium text-white mb-6 flex items-center gap-2">
                                <Calculator className="w-5 h-5 text-cyan-400" />
                                Calculate Dose
                            </h2>

                            <div className="space-y-6">
                                {/* Volume Input */}
                                <div className="space-y-2">
                                    <label className="text-sm text-white/60">Water Volume</label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="number"
                                            value={volume}
                                            onChange={(e) => setVolume(e.target.value)}
                                            className="bg-black/20 border-white/10 text-white text-lg h-12 flex-1"
                                            placeholder="e.g. 10"
                                        />
                                        <div className="flex bg-black/20 rounded-md border border-white/10 p-1">
                                            <button
                                                onClick={() => setUnit("L")}
                                                className={`px-4 rounded transition-all ${unit === "L" ? "bg-white/10 text-white font-bold" : "text-white/40 hover:text-white/60"}`}
                                            >
                                                L
                                            </button>
                                            <button
                                                onClick={() => setUnit("Gal")}
                                                className={`px-4 rounded transition-all ${unit === "Gal" ? "bg-white/10 text-white font-bold" : "text-white/40 hover:text-white/60"}`}
                                            >
                                                Gal
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Application Select */}
                                <div className="space-y-2">
                                    <label className="text-sm text-white/60">Application Target</label>
                                    <Select value={appType} onValueChange={setAppType}>
                                        <SelectTrigger className="bg-black/20 border-white/10 text-white h-12 w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#0b1020] border-white/10 text-white">
                                            {APPLICATIONS.map(app => (
                                                <SelectItem key={app.id} value={app.id}>
                                                    <div className="flex items-center gap-2">
                                                        {React.createElement((app as any).icon || Droplets, { className: "w-4 h-4 opacity-50" })}
                                                        {app.label}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Solution Mode Selection */}
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <label className="text-sm text-white/60">Solution Type (What bottle do you have?)</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setSolutionMode("1:10")}
                                            className={`p-3 rounded-lg border text-sm transition-all ${solutionMode === "1:10" ? "border-cyan-500 bg-cyan-500/10 text-white font-bold" : "border-white/10 bg-black/20 text-white/40"}`}
                                        >
                                            Andara 1:10 (Ritual)
                                        </button>
                                        <button
                                            onClick={() => setSolutionMode("Stock")}
                                            className={`p-3 rounded-lg border text-sm transition-all ${solutionMode === "Stock" ? "border-amber-500 bg-amber-500/10 text-white font-bold" : "border-white/10 bg-black/20 text-white/40"}`}
                                        >
                                            Undiluted Stock
                                        </button>
                                    </div>
                                </div>

                                {/* Info Box */}
                                <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-100/80">
                                    {solutionMode === "1:10"
                                        ? "Dose calculated for the Adya-type 1:10 solution. (10x multiplier applied)"
                                        : "Dose calculated for the pure Undiluted Stock minerals."}
                                </div>

                            </div>
                        </div>

                        {/* RESULT CARD */}
                        <div className="flex flex-col justify-center">
                            <div className="relative">
                                {/* Glowing Effect */}
                                <div className="absolute inset-0 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none" />

                                <div className="relative z-10 text-center space-y-2 mb-12">
                                    <div className="text-white/50 text-sm uppercase tracking-widest font-medium">You Need</div>
                                    <div className="text-7xl md:text-8xl font-display font-bold text-white tabular-nums tracking-tighter drop-shadow-xl">
                                        {result.ml.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                                        <span className="text-3xl lg:text-4xl text-white/30 ml-2 font-normal">mL</span>
                                    </div>
                                    <div className="text-xl text-cyan-400 font-medium">
                                        ≈ {result.drops.toLocaleString(undefined, { maximumFractionDigits: 0 })} drops
                                    </div>
                                    <div className="text-white/40 text-sm mt-4 mb-6">
                                        of {solutionMode === "1:10" ? "Andara 1:10 Ritual Solution" : "Undiluted Stock Minerals"}
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            const text = `${volume} ${unit} target for ${selectedApp.label} needs ${result.ml.toFixed(1)}mL (${result.drops.toFixed(0)} drops) of ${solutionMode === "1:10" ? "Andara 1:10 Solution" : "Undiluted Stock"}.`;
                                            navigator.clipboard.writeText(text);
                                        }}
                                        className="text-white/40 hover:text-white"
                                    >
                                        <Copy className="w-4 h-4 mr-2" />
                                        Copy Result
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Link href="/andara-ionic-dilution-table">
                                        <Button variant="outline" className="w-full h-14 border-white/10 hover:bg-white/5 text-white">
                                            View Full Table
                                        </Button>
                                    </Link>
                                    <Link href="/products/andara-ionic-1l">
                                        <Button className="w-full h-14 bg-cyan-500 hover:bg-cyan-600 text-black font-bold">
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            Get 1L Bottle
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
