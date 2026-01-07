// @ts-nocheck
import React from 'react';
import { AdvancedPageLayout } from "@/components/layout/AdvancedPageLayout_Proposal";
import { GlassCard } from "@/components/ui/glass-card";
import { SmartImage } from "@/components/ui/SmartImage";
import { BundleCTA } from "@/components/shop/BundleCTA";
import { Accordion } from "@/components/ui/accordion"; // Assuming this exists or using a mock
import { ArrowRight, BookOpen, Share2 } from "lucide-react";

// MOCK: Dynamic Cluster Links Component
const MockDynamicLinks = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
            { title: "Structured Water Basics", href: "/science/structured-water" },
            { title: "The Fourth Phase (EZ)", href: "/science/ez-water" },
            { title: "Hydration Angles", href: "/science/hydration-angles" },
            { title: "Bio-Availability", href: "/science/bio-availability" }
        ].map((link, i) => (
            <a key={i} href={link.href} className="group flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <span className="text-slate-200 group-hover:text-amber-400 transition-colors">{link.title}</span>
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-amber-400" />
            </a>
        ))}
    </div>
);

// MOCK: Glossary Strip
const MockGlossaryStrip = () => (
    <div className="py-8 border-y border-white/5 my-12 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-4">
            <h3 className="text-xs uppercase tracking-widest text-amber-500/80 mb-4 font-bold">Core Entities</h3>
            <div className="flex flex-wrap gap-4">
                {["H3O2", "Exclusion Zone", "Hydrophilic", "Coherence"].map((term) => (
                    <span key={term} className="px-3 py-1 rounded-full text-xs bg-amber-500/10 text-amber-200 border border-amber-500/20 cursor-help" title="Definition would appear here">
                        {term}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

export default function DemoLayoutV2() {
    return (
        <AdvancedPageLayout
            title="Water Science"
            subtitle="The Fourth Phase of Matter"
            vibeKeywords={["Structured", "EZ-Water", "Life"]}
        >
            {/* 1. CRYSTALLINE HERO: Topic + Promise */}
            <div className="max-w-3xl mx-auto text-center mb-16">
                <p className="text-xl text-slate-200 font-light leading-relaxed">
                    Water is not just H2O. Discover the <strong>fourth phase</strong> of water that powers cellular life, acts as a battery, and defines your hydration health.
                </p>
            </div>

            {/* 2. STRUCTURE: What You'll Learn */}
            <GlassCard variant="gold" className="mb-24">
                <div className="flex items-start gap-4">
                    <BookOpen className="w-6 h-6 text-amber-400 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-amber-100 mb-2">In this Pillar</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-300">
                            <li>• The discovery of EZ Water</li>
                            <li>• How water stores information</li>
                            <li>• The link between light and hydration</li>
                            <li>• Practical structuring methods</li>
                        </ul>
                    </div>
                </div>
            </GlassCard>

            {/* 3. DEPTH: Core Concept Sections (Interlinked) */}
            <div className="grid gap-24">

                {/* Section A */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-display text-white mb-6">1. Beyond Liquid</h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Most biology textbooks treat water as a passive solvent.
                            New research reveals water organizes into a liquid-crystalline lattice at
                            hydrophilic surfaces—like your cell membranes.
                        </p>
                        <MockDynamicLinks />
                    </div>
                    <SmartImage keyword="water-structure" className="aspect-square rounded-2xl shadow-2xl shadow-amber-900/10" />
                </section>

                {/* Section B */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <SmartImage keyword="cell-voltage" className="aspect-video rounded-2xl shadow-2xl order-2 md:order-1" />
                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl font-display text-white mb-6">2. The Battery of Life</h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            This structured zone excludes protons, creating a net negative charge.
                            This charge separation effectively turns every cell into a battery.
                        </p>
                        <GlassCard variant="default" className="mt-6">
                            <strong>Key Insight:</strong> Hydration is about charge, not just volume.
                        </GlassCard>
                    </div>
                </section>

            </div>

            {/* 4. ENTITY RICHNESS: Glossary Strip */}
            <MockGlossaryStrip />

            {/* 5. FAQ */}
            <div className="max-w-2xl mx-auto mb-24">
                <h2 className="text-2xl font-display text-white mb-8 text-center">Common Questions</h2>
                <div className="space-y-4">
                    <GlassCard variant="light">
                        <h4 className="font-bold text-slate-100">Is this distinct from alkaline water?</h4>
                        <p className="text-sm text-slate-400 mt-2">Yes. Alkalinity refers to pH. Structure refers to molecular arrangement.</p>
                    </GlassCard>
                    <GlassCard variant="light">
                        <h4 className="font-bold text-slate-100">How do I make it?</h4>
                        <p className="text-sm text-slate-400 mt-2">Vortexing, light exposure, and mineral presence all contribute to structure.</p>
                    </GlassCard>
                </div>
            </div>

            {/* 6. ACTION: Next Step */}
            <BundleCTA />

        </AdvancedPageLayout>
    );
}
// @ts-nocheck
