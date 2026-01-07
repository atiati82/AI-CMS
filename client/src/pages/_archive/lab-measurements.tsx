import React, { useRef } from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { ScrollProgress } from "@/components/plugins/ScrollProgress";
import { BackgroundLayer } from "@/components/visuals/BackgroundLayer";
import {
    Activity,
    Droplet,
    Zap,
    Scale,
    FlaskConical,
    ArrowRight,
    HelpCircle,
    Microscope,
    TestTube,
    CheckCircle2
} from "lucide-react";

export default function LabMeasurementsPage() {
    // --- JSON-LD ---
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Lab Measurements: pH, ORP, EC & TDS",
        "description": "Understand the language of water metrics. Learn how Andara Ionic minerals influence pH, ORP, Electrical Conductivity (EC), and TDS."
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Why did my TDS go up?",
                "acceptedAnswer": { "@type": "Answer", "text": "Because you added minerals. TDS meters read dissolved solids. If you add sulfate minerals, TDS must go up. It confirms the dose." }
            },
            {
                "@type": "Question",
                "name": "Why is the pH slightly acidic?",
                "acceptedAnswer": { "@type": "Answer", "text": "Sulfate minerals are naturally acidic salts. This mimics natural rainwater or mountain spring profiles and is often beneficial for gut terrain." }
            },
            {
                "@type": "Question",
                "name": "My ORP didn't change much.",
                "acceptedAnswer": { "@type": "Answer", "text": "ORP is sensitive to temperature and DO (Dissolved Oxygen). Andara sets the potential, but aeration or vortexing is often needed to fully express the redox shift." }
            }
        ]
    };

    return (
        <StandardPageLayout
            title={<>Lab <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-blue-500">Measurements</span></>}
            subtitle={<>The Language of Water Metrics.<br />Quantifying the Invisible.</>}
             // Fallback to 'water-molecular' if not found, but implies science context
            heroVariant="slate"
            heroIcon={FlaskConical}
            badges={[{ text: "Metrology", icon: Microscope }]}
            seoTitle="Lab Measurements: pH, ORP, EC & TDS | Andara Science"
            seoDescription="Understand water metrics: pH (Proton Window), EC (Conductivity), ORP (Redox), and TDS (Total Dissolved Solids). Learn how Andara Ionic affects these numbers."
            extraHead={
                <>
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
                </>
            }
        >
            <ScrollProgress />

            <div className="bg-[#020617]">

                {/* INTRO */}
                <section className="py-24 bg-[#05060b] relative overflow-hidden">
                    <BackgroundLayer  opacity={10} />
                    <div className="container px-4 max-w-4xl mx-auto relative z-10 text-center">
                        <h2 className="text-3xl font-display text-white mb-6">Beyond Taste & Clarity</h2>
                        <p className="text-white/70 max-w-2xl mx-auto leading-relaxed mb-6">
                            Water speaks through data. We track the fundamental shifts in electrical and chemical potential that occur when Andara Ionic minerals are introduced.
                        </p>
                    </div>
                </section>

                {/* METRICS GRID */}
                <section className="py-24 bg-[#020617]">
                    <div className="container px-4 max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* pH */}
                            <Link href="/ph-balance-water">
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-pink-500/30 transition-all group cursor-pointer h-full relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-bl-full pointer-events-none" />
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="p-4 rounded-2xl bg-pink-500/10 text-pink-400">
                                            <Activity className="w-8 h-8" />
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-4xl font-bold text-white mb-1">pH</span>
                                            <span className="text-sm text-slate-400 uppercase tracking-wider">Proton Window</span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-pink-400 transition-colors">The Acid/Base Balance</h3>
                                    <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                                        Expect a slight drop (acidification) with sulfates. This mimics natural rain/spring profiles.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-pink-400 uppercase tracking-wider">
                                        View Protocol <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>

                            {/* EC */}
                            <Link href="/conductivity-tds-water">
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-yellow-500/30 transition-all group cursor-pointer h-full relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-bl-full pointer-events-none" />
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="p-4 rounded-2xl bg-yellow-500/10 text-yellow-400">
                                            <Zap className="w-8 h-8" />
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-4xl font-bold text-white mb-1">EC</span>
                                            <span className="text-sm text-slate-400 uppercase tracking-wider">Conductivity</span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">The Spark</h3>
                                    <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                                        Measures ion density and charge carrying capacity. Essential for bio-availability.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 uppercase tracking-wider">
                                        View Protocol <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>

                            {/* ORP */}
                            <Link href="/orp-redox-water">
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all group cursor-pointer h-full relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full pointer-events-none" />
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400">
                                            <Scale className="w-8 h-8" />
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-4xl font-bold text-white mb-1">ORP</span>
                                            <span className="text-sm text-slate-400 uppercase tracking-wider">Redox Potential</span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">Electron Flow</h3>
                                    <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                                        The potential to donate or accept electrons. A drift window, not a static score.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                                        View Protocol <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>

                            {/* TDS */}
                            <Link href="/conductivity-tds-water">
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-emerald-500/30 transition-all group cursor-pointer h-full relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400">
                                            <Droplet className="w-8 h-8" />
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-4xl font-bold text-white mb-1">TDS</span>
                                            <span className="text-sm text-slate-400 uppercase tracking-wider">Dissolved Solids</span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">Mineral Content</h3>
                                    <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                                        Not "contamination"—mineralization. Adding minerals raises TDS. This confirms presence.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                                        View Protocol <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>

                        </div>
                    </div>
                </section>

                {/* ADVANCED LINK */}
                <section className="py-24 bg-[#05060b] border-t border-white/5">
                    <div className="container px-4 max-w-4xl mx-auto">
                        <div className="rounded-3xl bg-gradient-to-br from-[#0b1020] to-[#020617] border border-white/10 p-12 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-grid-white/[0.05]" />
                            <div className="relative z-10">
                                <Microscope className="w-16 h-16 text-indigo-400 mx-auto mb-6 opacity-80" />
                                <h2 className="text-3xl font-display text-white mb-6">Beyond Standard Meters</h2>
                                <p className="text-white/60 mb-10 max-w-2xl mx-auto">
                                    Standard tools measure bulk properties. To see biological structure, we look to the Exclusion Zone (EZ).
                                </p>
                                <Link href="/science/ez-water-overview">
                                    <button className="px-8 py-4 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-all hover:scale-105 shadow-xl shadow-indigo-500/20">
                                        Explore EZ Water Physics
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 bg-[#0b1020]">
                    <div className="container px-4 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-display text-white mb-12 text-center">Common Questions</h2>
                        <div className="space-y-4">
                            {faqSchema.mainEntity.map((item, i) => (
                                <div key={i} className="andara-glass-panel p-6">
                                    <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                        <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                        {item.name}
                                    </h3>
                                    <p className="text-white/60 pl-8 leading-relaxed text-sm">{item.acceptedAnswer.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </StandardPageLayout>
    );
}
