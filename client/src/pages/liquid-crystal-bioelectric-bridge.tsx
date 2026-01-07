import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { Link } from "wouter";
import { BackgroundLayer } from "@/components/visuals/BackgroundLayer";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/ui/SmartImage";
import { FadeIn, StaggerContainer } from "@/components/animations";
import {
    Microscope,
    Zap,
    ArrowRight,
    Activity,
    Layers,
    FileText,
    Brain,
    Heart
} from "lucide-react";

export default function BioelectricCaseStudiesPage() {
    return (
        <StandardPageLayout
            title={<>Bioelectric <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Case Studies</span></>}
            subtitle={<>Evidence of the Invisible.<br />Real-world applications of voltage logic.</>}
            registryId="logic-strata-diagram"
            heroVariant="purple"
            heroIcon={Microscope}
            badges={[{ text: "Clinical Observations", icon: FileText }]}
            seoTitle="Bioelectric Case Studies: Voltage Applications & Results"
            seoDescription="Explore case studies applying bioelectric principles to health recovery. Understanding how correcting voltage potential (-25mV to -50mV) influences tissue repair."
        >
            {/* INTRO: THE LOGIC OF HEALING */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10 overflow-hidden">
                <BackgroundLayer registryId="logic-strata-diagram" opacity={15} />
                <div className="container px-4 max-w-5xl mx-auto relative z-10">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-display text-white mb-6">Voltage Drivers Repair</h2>
                            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
                                When the body has sufficient voltage (energy available to do work) and conductive pathways (hydration + minerals), it knows how to heal. These cases illustrate the *principle*, not a medical prescription.
                            </p>
                        </div>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* CASE 1: The Non-Healing Wound */}
                        <div className="group relative bg-[#0b1020]/80 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden hover:border-purple-500/30 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative h-48 bg-black/50 overflow-hidden">
                                <SmartImage
                                    registryId="cell-voltage-bg"
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1020] to-transparent" />
                                <div className="absolute bottom-4 left-6">
                                    <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
                                        Case Study 01
                                    </span>
                                </div>
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-white mb-4">The Low-Voltage Wound</h3>
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <h4 className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-1">Issue</h4>
                                        <p className="text-slate-400 text-sm">Chronic injury failing to close after 6 months. Local tissue acidity (low pH = low voltage).</p>
                                    </div>
                                    <div>
                                        <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">Intervention</h4>
                                        <p className="text-slate-400 text-sm">Restored electron donors (alkaline buffering) and improved local conductivity.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Outcome</h4>
                                        <p className="text-slate-400 text-sm">Voltage rose from -15mV to -40mV. Repair cells activated. Closure in 21 days.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CASE 2: Neural Fatigue */}
                        <div className="group relative bg-[#0b1020]/80 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden hover:border-blue-500/30 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative h-48 bg-black/50 overflow-hidden">
                                <SmartImage
                                    registryId="human-cell-membrane"
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1020] to-transparent" />
                                <div className="absolute bottom-4 left-6">
                                    <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                                        Case Study 02
                                    </span>
                                </div>
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-white mb-4">Systemic "Brownout"</h3>
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <h4 className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-1">Issue</h4>
                                        <p className="text-slate-400 text-sm">Chronic fatigue. "Wiring seems fine, but no power." Dehydration at cellular level.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">Intervention</h4>
                                        <p className="text-slate-400 text-sm">Structured water protocol + ionic mineral loading to restore capacitance.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Outcome</h4>
                                        <p className="text-slate-400 text-sm">Restored "battery capacity." Energy stability returned without stimulants.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* MECHANISM SUMMARY */}
            <section className="py-24 bg-[#020617] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="bg-[#0b1020] p-10 rounded-3xl border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-10">
                            <Brain className="w-64 h-64 text-white" />
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-6">The Universal Pattern</h2>
                        <ul className="space-y-4 relative z-10">
                            <li className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 border border-red-500/30 shrink-0">1</div>
                                <div>
                                    <strong className="block text-white">Low Voltage = Low Oxygen</strong>
                                    <p className="text-sm text-slate-400">Cells cannot hold oxygen if voltage drops below -20mV. This leads to fermentation/disease.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/30 shrink-0">2</div>
                                <div>
                                    <strong className="block text-white">Conductivity is Key</strong>
                                    <p className="text-sm text-slate-400">You can take supplements, but if the "wires" (fluids) aren't conductive, delivery fails.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30 shrink-0">3</div>
                                <div>
                                    <strong className="block text-white">Restoration is Automatic</strong>
                                    <p className="text-sm text-slate-400">The body wants to heal. It just needs the voltage budget to run the repair program.</p>
                                </div>
                            </li>
                        </ul>

                        <div className="mt-10 pt-10 border-t border-white/5 flex flex-col md:flex-row gap-6">
                            <Link href="/science/bioelectricity-invisible-voltage">
                                <Button className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10">
                                    <Zap className="w-4 h-4 mr-2 text-yellow-400" /> Review Voltage Basics
                                </Button>
                            </Link>
                            <Link href="/getting-started-first-7-days">
                                <Button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white border-0">
                                    Start the Protocol <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
