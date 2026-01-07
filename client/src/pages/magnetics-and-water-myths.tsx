import React, { useEffect } from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { Link } from "wouter";
import { BackgroundLayer } from "@/components/visuals/BackgroundLayer";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/ui/SmartImage";
import {
    ClipboardList,
    ArrowRight,
    HelpCircle,
    Activity,
    Layers,
    Clock,
    Thermometer,
    Magnet,
    AlertTriangle,
    Move,
    RotateCw,
    Scale
} from "lucide-react";

export default function MagnetPlacementExperimentsPage() {

    // --- JSON-LD Call ---
    const schemas = [
        {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Magnet Placement Experiment Protocol",
            "step": [
                {
                    "@type": "HowToStep",
                    "name": "Establish Baseline",
                    "text": "Run a 24h stability test with two identical jars and no magnets to prove setup consistency."
                },
                {
                    "@type": "HowToStep",
                    "name": "Setup Control vs Variable",
                    "text": "Place Magnet at fixed distance from Jar B. Keep Jar A as control."
                },
                {
                    "@type": "HowToStep",
                    "name": "Log Time Curves",
                    "text": "Measure Temp, EC, and Clarity at T0, T30, T2h, and T24h."
                }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What is the best magnet placement for water experiments?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Start with magnet vs control at a fixed distance (about 1–2 cm) using time curves. Placement consistency matters more than theory."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do I need ORP to do this?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No. Temperature, EC/TDS, and clarity photos are enough for a clean first dataset. ORP is advanced because it is very sensitive."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Why do I need a baseline stability test?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Because most apparent effects are caused by uncontrolled variables like temperature, location differences, and measurement technique."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What if I see no difference?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "That is a valid result. A clean protocol protects credibility and helps the community learn."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What should I read next?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Read three-six-nine-harmonics for pattern language or hexagonal-water-structures for symmetry."
                    }
                }
            ]
        }
    ];

    return (
        <StandardPageLayout
            title={<>Magnet <span className="text-[#f6d56a]">Placement</span></>}
            subtitle={<>Experiments & Data Logs.<br />Make it real. Run controlled baseline tests, isolate variables, and log repeatable data.</>}

            heroVariant="amber"
            heroIcon={Magnet}
            badges={[{ text: "Field Protocols", icon: ClipboardList }]}
            seoTitle="Magnet Placement Experiments: Protocols + Data Log"
            seoDescription="Run magnet placement experiments the right way: baseline stability test, magnet vs control, polarity swap, and time-point logging. Measure temperature, EC/TDS, and clarity with repeatable rules."
            extraHead={schemas.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}
        >
            {/* SECTION 1: CREDIBILITY RULES */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10 overflow-hidden">
                <BackgroundLayer opacity={20} />
                <div className="container px-4 max-w-6xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-display text-white mb-8">Experiment Rules</h2>
                            <p className="text-white/70 mb-8 leading-relaxed text-lg font-light">
                                Most "magnetized water" claims fail because there is no baseline. To protect your credibility, follow these non-negotiable rules.
                            </p>

                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-[#38ffd1]/10 flex items-center justify-center border border-[#38ffd1]/20 text-[#38ffd1] font-bold text-sm">1</div>
                                    <span className="text-white/80 text-base"><strong>One Variable Only.</strong> Never test "Magnet + Vortex" at once. Isolate the field effect.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-[#f6d56a]/10 flex items-center justify-center border border-[#f6d56a]/20 text-[#f6d56a] font-bold text-sm">2</div>
                                    <span className="text-white/80 text-base"><strong>Same Location.</strong> 1°C temp difference ruins the data. Jars must be side-by-side but out of magnetic interference range (check with compass).</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-white font-bold text-sm">3</div>
                                    <span className="text-white/80 text-base"><strong>Repeat 2x.</strong> One result is an anomaly. Two is a signal. Three is a pattern.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="relative">
                            {/* Equipment Checklist */}
                            <div className="bg-[#0b1020]/90 backdrop-blur-md rounded-3xl p-10 border border-[#f6d56a]/20 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f6d56a]/5 rounded-bl-full pointer-events-none" />
                                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                                    <Layers className="w-6 h-6 text-[#f6d56a]" /> Setup Checklist
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                        <div className="w-5 h-5 rounded-full border-2 border-[#f6d56a] flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#f6d56a]" />
                                        </div>
                                        <span className="text-white/80 font-medium">2 Identical Glass Jars</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                        <div className="w-5 h-5 rounded-full border-2 border-[#f6d56a] flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#f6d56a]" />
                                        </div>
                                        <span className="text-white/80 font-medium">Thermometer (Mandatory)</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                        <div className="w-5 h-5 rounded-full border-2 border-[#f6d56a] flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#f6d56a]" />
                                        </div>
                                        <span className="text-white/80 font-medium">Camera (Fixed position)</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 opacity-60">
                                        <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                                        <span className="text-white/60">EC/TDS Meter (Recommended)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: PROTOCOLS */}
            <section className="py-24 bg-[#020617] relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-16">
                        <div className="h-px w-12 bg-white/10" />
                        <h2 className="text-3xl font-display text-white text-center">Protocol Library</h2>
                        <div className="h-px w-12 bg-white/10" />
                    </div>

                    <div className="space-y-8">
                        {/* BASELINE */}
                        <div className="group relative p-10 bg-[#0b1020] rounded-3xl border border-[#f6d56a]/30 overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(246,213,106,0.1)]">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#f6d56a]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-0 right-0 px-6 py-2 bg-[#f6d56a] text-black text-xs font-bold rounded-bl-2xl uppercase tracking-widest shadow-lg">Mandatory First Step</div>

                            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
                                <div className="md:w-1/3">
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#f6d56a] transition-colors">Baseline Stability</h3>
                                    <p className="text-white/60 text-sm mb-6 leading-relaxed">Prove your setup works without magnets. If jars drift differently here, your future data is garbage.</p>
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f6d56a]/10 text-xs text-[#f6d56a] font-mono border border-[#f6d56a]/20">
                                        <Clock className="w-4 h-4" /> 24 Hours Duration
                                    </div>
                                </div>
                                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                                    <div className="bg-[#020617] p-6 rounded-2xl border border-white/5">
                                        <strong className="block text-white text-sm mb-2 uppercase tracking-wide opacity-80">Setup</strong>
                                        <p className="text-white/50 text-sm leading-relaxed">Jar A & Jar B side-by-side. Lids closed. No magnets. Same light exposure.</p>
                                    </div>
                                    <div className="bg-[#020617] p-6 rounded-2xl border border-white/5">
                                        <strong className="block text-white text-sm mb-2 uppercase tracking-wide opacity-80">Pass Condition</strong>
                                        <p className="text-white/50 text-sm leading-relaxed">Drift curves must match. Delta between jars less than 5%.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* EXPERIMENT 1 */}
                        <div className="group p-10 bg-[#0b1020] rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300">
                            <div className="flex flex-col md:flex-row gap-12 items-start">
                                <div className="md:w-1/3">
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#38ffd1] transition-colors">Exp 1: Magnet vs Control</h3>
                                    <p className="text-white/60 text-sm mb-6 leading-relaxed">The core test. Does proximity correlate with pattern shift? Isolate the variable.</p>
                                </div>
                                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                                    <div className="bg-[#020617] p-6 rounded-2xl border border-white/5 group-hover:border-[#38ffd1]/20 transition-colors">
                                        <strong className="block text-white text-sm mb-2 uppercase tracking-wide opacity-80">Setup</strong>
                                        <p className="text-white/50 text-sm leading-relaxed">Jar A (Control). Jar B (Magnet at 1cm). Same shelf.</p>
                                    </div>
                                    <div className="bg-[#020617] p-6 rounded-2xl border border-white/5 group-hover:border-[#38ffd1]/20 transition-colors">
                                        <strong className="block text-white text-sm mb-2 uppercase tracking-wide opacity-80">Time Points</strong>
                                        <p className="text-white/50 text-sm leading-relaxed">T0 (Start) / T30 / T2h / T24h (End)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* EXPERIMENT 2 & 3 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group p-8 bg-[#0b1020] rounded-3xl border border-white/10 hover:border-[#a855f7]/30 transition-all duration-300">
                                <div className="w-12 h-12 rounded-full bg-[#a855f7]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <RotateCw className="w-6 h-6 text-[#a855f7]" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#a855f7] transition-colors">Exp 2: Polarity Swap</h3>
                                <p className="text-white/60 text-sm leading-relaxed">Jar A (North-facing) vs Jar B (South-facing). Must rely on known magnet poles. Label clearly.</p>
                            </div>
                            <div className="group p-8 bg-[#0b1020] rounded-3xl border border-white/10 hover:border-[#38ffd1]/30 transition-all duration-300">
                                <div className="w-12 h-12 rounded-full bg-[#38ffd1]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Scale className="w-6 h-6 text-[#38ffd1]" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#38ffd1] transition-colors">Exp 3: Distance Curve</h3>
                                <p className="text-white/60 text-sm leading-relaxed">Jar A (1cm) vs Jar B (5cm). Tests field strength drop-off effect. Use identical magnets.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* LOGGING TEMPLATE */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10 overflow-hidden">
                <BackgroundLayer opacity={10} />
                <div className="container px-4 max-w-4xl mx-auto relative z-10">
                    <div className="bg-[#0b1020] rounded-3xl p-8 md:p-12 border border-white/10 font-mono text-sm leading-relaxed text-white/70 relative shadow-2xl">
                        <div className="absolute top-6 right-6 flex gap-3">
                            <Button size="sm" variant="outline" className="h-8 text-[10px] uppercase tracking-wider text-white/50 border-white/10 hover:bg-white/5 hover:text-white">Copy</Button>
                            <Button size="sm" variant="outline" className="h-8 text-[10px] uppercase tracking-wider text-white/50 border-white/10 hover:bg-white/5 hover:text-white">Print</Button>
                        </div>

                        <h3 className="text-white font-bold font-display text-2xl mb-8 flex items-center gap-3">
                            <ClipboardList className="w-6 h-6 text-[#f6d56a]" /> Citizen Science Log
                        </h3>

                        <div className="space-y-6 select-all p-6 bg-[#020617] rounded-xl border border-white/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                <p>Experiment ID: __________</p>
                                <p>Date: __________</p>
                                <p>Location: __________ (City/Room)</p>
                                <p>Water Source: __________</p>
                                <p>Container: __________ (Glass/Plastic)</p>
                            </div>

                            <div className="border-t border-white/10"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                <p>Magnet Type: __________</p>
                                <p>Polarity: __________</p>
                                <p>Distance: ____ cm</p>
                            </div>

                            <div className="border-t border-white/10"></div>

                            <div className="space-y-4">
                                <p><strong className="text-[#38ffd1]">T0 (Baseline):</strong><br />
                                    Temp: ____°C | EC: ____ | pH: ____ | Clarity: ____</p>

                                <p><strong className="text-white/80">T30:</strong><br />
                                    Temp: ____°C | EC: ____ | pH: ____ | Clarity: ____</p>

                                <p><strong className="text-white/80">T2h:</strong><br />
                                    Temp: ____°C | EC: ____ | pH: ____ | Clarity: ____</p>

                                <p><strong className="text-[#f6d56a]">T24h (Final):</strong><br />
                                    Temp: ____°C | EC: ____ | pH: ____ | Clarity: ____</p>
                            </div>

                            <div className="border-t border-white/10"></div>

                            <p><strong>Qualitative:</strong> (Bubbles, Haziness, Sediment, Flavor)<br />
                                __________________________________________________<br />
                                __________________________________________________</p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/citizen-science-hub">
                            <Button size="lg" className="bg-[#1aa7ff] hover:bg-[#1aa7ff]/80 text-white font-bold rounded-full h-14 px-8 text-base shadow-[0_0_20px_rgba(26,167,255,0.3)]">
                                Submit Data to Hub <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* INTERPRETATION */}
            <section className="py-24 bg-[#020617] relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-display text-white mb-12 text-center">Interpreting Results</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl">
                            <h4 className="flex items-center gap-3 text-red-300 font-bold text-base mb-3">
                                <AlertTriangle className="w-5 h-5" /> Baseline Fail?
                            </h4>
                            <p className="text-red-200/60 text-sm leading-relaxed">If control jars drifted apart differently without magnets, discard the data. Fix temperature/location variables before re-testing.</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <h4 className="flex items-center gap-3 text-[#38ffd1] font-bold text-base mb-3">
                                <Activity className="w-5 h-5" /> Temp Sensitivity
                            </h4>
                            <p className="text-white/60 text-sm leading-relaxed">ORP shifts with temperature. If jars are 2°C apart, an ORP difference is just a thermometer reading, not a field effect.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEXT STEPS */}
            <section className="py-20 bg-[#05060b] text-center border-t border-white/5">
                <div className="container px-4">
                    <h2 className="text-xl font-display text-white mb-8">Explore the Cluster</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/science/triangular-harmonics">
                            <Button variant="ghost" className="rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50 hover:text-white hover:bg-white/10 h-8">
                                /three-six-nine-harmonics
                            </Button>
                        </Link>
                        <Link href="/science/hexagonal-structures">
                            <Button variant="ghost" className="rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50 hover:text-white hover:bg-white/10 h-8">
                                /hexagonal-water-structures
                            </Button>
                        </Link>
                        <Link href="/magnetics-water">
                            <Button variant="ghost" className="rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50 hover:text-white hover:bg-white/10 h-8">
                                /magnetics-water
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
