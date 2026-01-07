
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function TrustCertificationsPage() {
    useScrollTop();

    return (
        <StandardPageLayout
            title="Certifications & Compliance"
            subtitle="How Andara Ionic Stays Aligned with Regulations"
            vibeKeywords={['Compliance', 'Documentation', 'Safety']}
            seoTitle="Certifications & Compliance – How Andara Ionic Stays Aligned with Regulations"
            seoDescription="Explore the certifications, lab reports and compliance frameworks behind Andara Ionic. Discover how mineral origin, sulfate levels, and safety are documented without medical claims."
            seoKeywords={["Andara Ionic certifications", "water clarification compliance", "mineral concentrate certifications", "lab reports Andara Ionic", "quality and safety documentation", "regulatory alignment"]}
        >
            <div className="container mx-auto px-4 py-12 space-y-16">

                {/* Intro */}
                <section className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl text-emerald-400 font-light">Trust is Documents, Not Slogans</h2>
                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                        You don't need to "believe" in Andara. You can read what is measured, certified, and declared. This page outlines the specific documents and compliance frameworks that support our transparency.
                    </p>
                </section>

                {/* Definition */}
                <section className="bg-slate-900 rounded-2xl p-8 border border-slate-800 text-center space-y-4">
                    <h2 className="text-xl text-white">What is Andara Ionic?</h2>
                    <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                        In regulatory language, Andara Ionic is a <strong>primordial ionic mineral concentrate</strong> used for <span className="text-emerald-400">water clarification and conditioning</span>. It is <span className="text-red-400">not</span> a medicine, drug, or diagnostic tool.
                    </p>
                </section>

                {/* Core Documents Grid */}
                <section className="space-y-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl text-white">Three Core Documents</h2>
                        <p className="text-slate-400 mt-2 text-sm">The pillars of our technical file.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="p-6 bg-slate-900 border-slate-800 flex flex-col h-full hover:border-emerald-500/30 transition-colors">
                            <div className="mb-4 text-3xl">📄</div>
                            <h3 className="text-white font-medium mb-2">Certificate of Analysis (COA)</h3>
                            <p className="text-slate-500 text-xs flex-grow">
                                Summarizes lab measurements for a specific batch: Elemental profile, Sulfate concentration, Heavy metal limits. Answers: "What is in this lot?"
                            </p>
                        </Card>

                        <Card className="p-6 bg-slate-900 border-slate-800 flex flex-col h-full hover:border-blue-500/30 transition-colors">
                            <div className="mb-4 text-3xl">⚠️</div>
                            <h3 className="text-white font-medium mb-2">Safety Data Sheet (SDS)</h3>
                            <p className="text-slate-500 text-xs flex-grow">
                                Hazard classification, handling, storage, and disposal guidance. Crucial for logistics and bulk handling.
                            </p>
                        </Card>

                        <Card className="p-6 bg-slate-900 border-slate-800 flex flex-col h-full hover:border-purple-500/30 transition-colors">
                            <div className="mb-4 text-3xl">📈</div>
                            <h3 className="text-white font-medium mb-2">Lab Reports</h3>
                            <p className="text-slate-500 text-xs flex-grow">
                                Detailed raw data: Full spectra ICP-MS, turbidity curves, pH/ORP shifts. The raw material of trust behind the summary COA.
                            </p>
                        </Card>
                    </div>
                </section>

                {/* Upstream Chain */}
                <section className="bg-emerald-950/10 border border-emerald-500/20 rounded-3xl p-8 space-y-6">
                    <h2 className="text-2xl text-white text-center">The Quality Chain</h2>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 max-w-4xl mx-auto">
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-xl">⛰️</div>
                            <p>Sourcing</p>
                        </div>
                        <div className="hidden md:block text-slate-600">➔</div>
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-xl">🏭</div>
                            <p>Processing</p>
                        </div>
                        <div className="hidden md:block text-slate-600">➔</div>
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-xl">🔬</div>
                            <p>3rd Party Lab</p>
                        </div>
                        <div className="hidden md:block text-slate-600">➔</div>
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 rounded-full bg-emerald-900/40 flex items-center justify-center mx-auto text-xl text-emerald-400">💧</div>
                            <p>Andara QC</p>
                        </div>
                    </div>
                </section>

                {/* Compliance Dimensions */}
                <section className="space-y-6">
                    <h2 className="text-2xl text-white">Compliance Dimensions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-900/50">
                            <div className="mt-1 text-emerald-500">✅</div>
                            <div>
                                <h3 className="text-white text-sm font-medium">Heavy Metal Control</h3>
                                <p className="text-slate-500 text-xs">Strict limits for Pb, Cd, Hg, As, aligned with water/fertilizer standards.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-900/50">
                            <div className="mt-1 text-emerald-500">✅</div>
                            <div>
                                <h3 className="text-white text-sm font-medium">Water Application</h3>
                                <p className="text-slate-500 text-xs">Guidance aligned with local drinking water laws (filtration/disinfection where required).</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-900/50">
                            <div className="mt-1 text-emerald-500">✅</div>
                            <div>
                                <h3 className="text-white text-sm font-medium">Traceability</h3>
                                <p className="text-slate-500 text-xs">Batch numbers, date codes, and clear document trails.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-900/50">
                            <div className="mt-1 text-emerald-500">✅</div>
                            <div>
                                <h3 className="text-white text-sm font-medium">Labeling</h3>
                                <p className="text-slate-500 text-xs">Correct hazard pictograms (if applicable) and usage instructions.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Separator className="bg-slate-800" />

                {/* B2B Note */}
                <section className="text-center space-y-4 max-w-2xl mx-auto">
                    <h2 className="text-xl text-white">For Practitioners & Resellers</h2>
                    <p className="text-sm text-slate-400">
                        This page is your safety anchor. It defines the "firewall" between science language and cleared product claims, helping you integrate Andara Ionic responsibly without regulatory risk.
                    </p>
                </section>

                {/* Footer */}
                <div className="text-center text-xs text-slate-600 pt-8 border-t border-slate-800">
                    Compliance is an active process. We continuously monitor regulatory updates to ensure Andara Ionic remains a trustworthy standard in water clarification.
                </div>

            </div>
        </StandardPageLayout>
    );
}
