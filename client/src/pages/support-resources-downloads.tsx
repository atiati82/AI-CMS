
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SupportResourcesDownloadsPage() {
    useScrollTop();

    // Downloads Data Structure
    const sections = [
        {
            title: "Quick Start Guides",
            items: [
                { label: "Andara Ionic - 100ml Quick Start", desc: "Visual guide for new users. Shake, dose, stir, observe.", file: "Andara_100ml_QuickStart.pdf" },
                { label: "Andara Ionic - 1 Liter Quick Start", desc: "For households and practitioners. Bulk format intro.", file: "Andara_1L_QuickStart.pdf" }
            ]
        },
        {
            title: "Dilution Tables",
            items: [
                { label: "Sulfate Activation Range Table", desc: "Printable table for 17-30 mg/L target across all bottle sizes.", file: "Andara_Dilution_Table.pdf" },
                { label: "How to Read the Calculator", desc: "One-page explainer for the online dilution tool.", file: "Andara_Calculator_Guide.pdf" }
            ]
        },
        {
            title: "Science Visuals",
            items: [
                { label: "Mineral Sources Comparison", desc: "Ocean vs Plant vs Fulvic vs Ionic Sulfate. The mineral story.", file: "Mineral_Comparison_Chart.pdf" },
                { label: "Water Phases & Structure Map", desc: "Visual overview of Bulk vs Structured vs Interfacial water.", file: "Water_Phases_Map.pdf" },
                { label: "Bioelectricity Poster", desc: "Voltage, ion gradients, and terrain overview.", file: "Bioelectricity_Terrain_Poster.pdf" }
            ]
        },
        {
            title: "Terrain Concept Sheets",
            items: [
                { label: "Terrain Model Principles", desc: "5-7 core principles of field-based thinking.", file: "Terrain_Model_Principles.pdf" },
                { label: "Terrain Signals Observation", desc: "Gentle prompts for self-observation (no medical claims).", file: "Terrain_Signals_Sheet.pdf" }
            ]
        }
    ];

    return (
        <StandardPageLayout
            title="Downloads & Resources"
            subtitle="Guides, Tables & Visual PDFs"
            vibeKeywords={['Library', 'Tools', 'Clarity']}
            seoTitle="Downloads – Guides, Dilution Tables & Visual PDFs for Andara Ionic"
            seoDescription="All Andara Ionic downloads in one place: dilution tables, quick-start guides, mineral comparison charts, and visual PDFs for water science."
            seoKeywords={["Andara Ionic downloads", "Andara dilution table PDF", "Andara guides", "Andara visual PDFs", "Andara ionic sulfate resources"]}
        >
            <div className="container mx-auto px-4 py-12 space-y-16">

                {/* Intro */}
                <section className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl text-emerald-400 font-light">Your Quiet Download Hub</h2>
                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                        Everything you need to work with Andara—in one structured place. From quick-start guides to visual terrain maps, these tools are designed to be printed, shared, and lived with.
                    </p>
                </section>

                {/* Sections */}
                <div className="space-y-12">
                    {sections.map((section, idx) => (
                        <section key={idx} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-px bg-slate-800 flex-grow"></div>
                                <h2 className="text-2xl text-white whitespace-nowrap">{section.title}</h2>
                                <div className="h-px bg-slate-800 flex-grow"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {section.items.map((item, i) => (
                                    <Card key={i} className="bg-slate-900 border-slate-800 p-6 flex items-start gap-4 hover:border-emerald-500/30 transition-all group">
                                        <div className="text-4xl group-hover:scale-110 transition-transform duration-300">📄</div>
                                        <div className="space-y-2 flex-grow">
                                            <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">{item.label}</h3>
                                            <p className="text-slate-500 text-sm">{item.desc}</p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-950/30">
                                            Download
                                        </Button>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Evolution Note */}
                <section className="bg-slate-950/50 rounded-xl p-8 border border-slate-800 text-center space-y-4 max-w-2xl mx-auto">
                    <h3 className="text-white font-medium">A Living Library</h3>
                    <p className="text-slate-400 text-sm">
                        This page grows with the Andara Library. As new lab insights and visual maps emerge (EZ water, Crystalline Geometry), they will appear here.
                    </p>
                </section>

                <Separator className="bg-slate-800" />

                {/* Footer Usage */}
                <div className="text-center space-y-4">
                    <h2 className="text-xl text-white">Share & Annotate</h2>
                    <p className="text-slate-400 text-sm max-w-lg mx-auto">
                        You are welcome to use these materials for personal orientation, family education, or client communication. Please keep Andara Ionic credited and do not alter content to imply medical promises.
                    </p>
                </div>

            </div>
        </StandardPageLayout>
    );
}
