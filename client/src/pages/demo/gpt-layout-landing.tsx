// Demo: GPT Landing Layout
// Route: /demo/gpt-layout-landing

import React from "react";
import { LandingLayout } from "@/templates/gpt";
import { Droplets, Sparkles, Zap } from "lucide-react";

export default function GptLayoutLandingDemo() {
    return (
        <LandingLayout
            brandName="Andara Ionic"
            headline="Stop Drinking Dead Water. Start Building Living Structure."
            subheadline="A focused mineral intelligence system that transforms your daily water into a coherent, structured medium — at home, work, or anywhere."
            primaryCtaLabel="Shop Andara Ionic →"
            primaryCtaHref="/shop"
            proofLine="★★★★★ 4.9/5 • 12,000+ Happy Customers • 30-Day Money-Back"
            heroRightVisual={
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/30 border border-white/10">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                            <Droplets className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                            <div className="font-semibold text-white">Living Water</div>
                            <div className="text-sm text-white/60">Structured at home in seconds</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/30 border border-white/10">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <div className="font-semibold text-white">Mineral Intelligence</div>
                            <div className="text-sm text-white/60">Ionic sulfates, silicates, and trace elements</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/30 border border-white/10">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                            <div className="font-semibold text-white">Bioelectric Support</div>
                            <div className="text-sm text-white/60">Charge, coherence, and cellular voltage</div>
                        </div>
                    </div>
                </div>
            }
            painPoints={[
                {
                    title: "Tap water is chemically treated",
                    body: "Chlorine, fluoride, and heavy metals disrupt natural water structure and biological processes.",
                },
                {
                    title: "Bottled water is often dead",
                    body: "Months of storage in plastic, stripped of minerals, lacking any energetic coherence.",
                },
                {
                    title: "Modern filtration removes everything",
                    body: "RO and distillation create empty water — no minerals, no structure, no life.",
                },
            ]}
            proofCards={[
                {
                    title: "Clarity returns in minutes",
                    body: "Watch turbid water clarify as minerals organize and structure emerges.",
                },
                {
                    title: "Taste transforms naturally",
                    body: "Smooth, silky mouthfeel that customers describe as 'alive' and 'clean'.",
                },
                {
                    title: "Energy without stimulants",
                    body: "Support cellular voltage and hydration at the terrain level.",
                },
            ]}
            finalCtaLabel="Get Your First Bottle →"
            finalCtaHref="/shop/andara-ionic-100ml"
        />
    );
}
