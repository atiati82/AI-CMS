import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { Link } from "wouter";
import { BackgroundLayer } from "@/components/visuals/BackgroundLayer";
import { Button } from "@/components/ui/button";
import {
    FlaskConical,
    Thermometer,
    Activity,
    Droplets,
    RotateCw,
    Magnet,
    Sun,
    ClipboardCheck,
    Scale,
    HelpCircle,
    ArrowRight,
    TestTubes,
    FileCheck
} from "lucide-react";

export default function ExperimentsIndexPage() {
    return (
        <StandardPageLayout
            title={<>Experiments <span className="text-[#38ffd1]">Index</span></>}
            subtitle={<>Protocols, Controls & Time Curves.<br />If it can't be repeated with controls, it's not a protocol—it's a story.</>}
            
            heroVariant="cyan"
            heroIcon={FlaskConical}
            badges={[{ text: "Master Protocols", icon: FlaskConical }]}
            seoTitle="Water Experiments Index: All Protocols for pH, ORP, EC/TDS & Structure"
            seoDescription="The Master Hub for repeatable water tests: baseline stability, clarity/turbidity, EC/TDS tracking, pH/ORP drift curves, vortex, magnets, and citizen science logging."
            relatedLinks={[
                { title: "Submit Data", url: "/citizen-science-hub", type: "internal" },
                { title: "Home Kit", url: "/home-water-test-kit", type: "internal" }
            ]}
        >
            {/* RULES SECTION */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10 overflow-hidden">
                <BackgroundLayer  opacity={20} />
                <div className="container px-4 max-w-6xl mx-auto relative z-10">
                    <h2 className="text-3xl font-display text-white mb-16 text-center">Universal Rules of Engagement</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[
                            { num: "1", title: "Temp is Mandatory", desc: "No temp, no data." },
                            { num: "2", title: "One Variable", desc: "Don't mix vortex + magnets." },
                            { num: "3", title: "Time Curves", desc: "T0, T60m, T24h > snapshots." },
                            { num: "4", title: "Baseline First", desc: "Controls must match." },
                            { num: "5", title: "Repeat Twice", desc: "Run 1 = Observation. Run 2 = Pattern." }
                        ].map((rule, i) => (
                            <div key={i} className="group relative bg-[#0b1020]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center hover:border-[#38ffd1]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,255,209,0.1)]">
                                <div className="absolute inset-0 bg-gradient-to-b from-[#38ffd1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative z-10">
                                    <div className="w-10 h-10 rounded-full bg-[#38ffd1]/10 text-[#38ffd1] font-bold flex items-center justify-center mx-auto mb-4 border border-[#38ffd1]/20 group-hover:scale-110 transition-transform">{rule.num}</div>
                                    <h3 className="font-bold text-white text-sm mb-2 group-hover:text-[#38ffd1] transition-colors">{rule.title}</h3>
                                    <p className="text-white/50 text-xs leading-relaxed">{rule.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MASTER PROTOCOLS */}
            <section className="py-24 bg-[#020617] relative z-10">
                <div className="container px-4 max-w-6xl mx-auto">

                    {/* SECTION: GETTING CREDIBLE */}
                    <div className="mb-24">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 rounded-xl bg-[#f6d56a]/10 border border-[#f6d56a]/20">
                                <ClipboardCheck className="w-8 h-8 text-[#f6d56a]" />
                            </div>
                            <h2 className="text-3xl font-display text-white">Getting Credible</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link href="/magnet-placement-experiments" className="group block bg-[#0b1020] rounded-3xl border border-white/10 p-8 hover:border-[#f6d56a]/30 transition-all shadow-xl hover:shadow-[#f6d56a]/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 px-4 py-1 bg-[#f6d56a] text-black text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">Mandatory</div>
                                <h3 className="text-xl font-bold text-white group-hover:text-[#f6d56a] transition-colors mb-3">Baseline Stability</h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed">The mandatory first step. Prove your controls drift identically before testing.</p>
                                <Button variant="ghost" className="text-[#f6d56a] hover:text-[#f6d56a] hover:bg-[#f6d56a]/10 p-0 h-auto font-bold uppercase tracking-widest text-xs">
                                    View Protocol <ArrowRight className="ml-2 w-3 h-3" />
                                </Button>
                            </Link>

                            <Link href="/parameter-tracking" className="group block bg-[#0b1020] rounded-3xl border border-white/10 p-8 hover:border-[#f6d56a]/30 transition-all shadow-xl hover:shadow-[#f6d56a]/5">
                                <h3 className="text-xl font-bold text-white group-hover:text-[#f6d56a] transition-colors mb-3">Master Log Template</h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed">Standardize observations, variable tracking, and interpretation tags.</p>
                                <Button variant="ghost" className="text-white/40 group-hover:text-[#f6d56a] hover:bg-transparent p-0 h-auto font-bold uppercase tracking-widest text-xs transition-colors">
                                    Get Template <ArrowRight className="ml-2 w-3 h-3" />
                                </Button>
                            </Link>

                            <Link href="/home-water-test-kit" className="group block bg-[#0b1020] rounded-3xl border border-white/10 p-8 hover:border-[#f6d56a]/30 transition-all shadow-xl hover:shadow-[#f6d56a]/5">
                                <h3 className="text-xl font-bold text-white group-hover:text-[#f6d56a] transition-colors mb-3">Home Research Kit</h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed">Defining minimal equipment: Meters, glass, camera setup.</p>
                                <Button variant="ghost" className="text-white/40 group-hover:text-[#f6d56a] hover:bg-transparent p-0 h-auto font-bold uppercase tracking-widest text-xs transition-colors">
                                    View Equipment <ArrowRight className="ml-2 w-3 h-3" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* SECTION: MEASUREMENT FAMILIES */}
                    <div className="mb-24">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 rounded-xl bg-[#38ffd1]/10 border border-[#38ffd1]/20">
                                <TestTubes className="w-8 h-8 text-[#38ffd1]" />
                            </div>
                            <h2 className="text-3xl font-display text-white">Measurement Families</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Family A: Visual */}
                            <div className="bg-[#0b1020]/50 rounded-2xl border border-white/5 p-8 flex flex-col md:flex-row gap-8 items-start md:items-center hover:border-[#38ffd1]/20 transition-colors">
                                <div className="min-w-[240px]">
                                    <h3 className="font-bold text-white text-xl flex items-center gap-3 mb-2"><Droplets className="w-5 h-5 text-[#38ffd1]" /> Visual / Clarity</h3>
                                    <p className="text-white/40 text-sm">Settling, Haze, Bubble Layers</p>
                                </div>
                                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                    <Link href="/diy-clarity-tests">
                                        <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors border border-white/5 hover:border-[#38ffd1]/30 cursor-pointer group h-full">
                                            <strong className="block text-[#38ffd1] text-base mb-2 group-hover:text-white transition-colors">DIY Clarity Test</strong>
                                            <span className="text-xs text-white/60">Fixed photo method (T0-T24h).</span>
                                        </div>
                                    </Link>
                                    <Link href="/before-after-gallery-water">
                                        <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors border border-white/5 hover:border-[#38ffd1]/30 cursor-pointer group h-full">
                                            <strong className="block text-[#38ffd1] text-base mb-2 group-hover:text-white transition-colors">Gallery Protocol</strong>
                                            <span className="text-xs text-white/60">Comparable visual reporting.</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Family B: Ion Field */}
                            <div className="bg-[#0b1020]/50 rounded-2xl border border-white/5 p-8 flex flex-col md:flex-row gap-8 items-start md:items-center hover:border-[#f6d56a]/20 transition-colors">
                                <div className="min-w-[240px]">
                                    <h3 className="font-bold text-white text-xl flex items-center gap-3 mb-2"><Activity className="w-5 h-5 text-[#f6d56a]" /> Ion Field</h3>
                                    <p className="text-white/40 text-sm">Conductivity, TDS, Minerals</p>
                                </div>
                                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                    <Link href="/conductivity-tds-water">
                                        <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors border border-white/5 hover:border-[#f6d56a]/30 cursor-pointer group h-full">
                                            <strong className="block text-[#f6d56a] text-base mb-2 group-hover:text-white transition-colors">EC/TDS Fingerprint</strong>
                                            <span className="text-xs text-white/60">Baseline ionic profiling.</span>
                                        </div>
                                    </Link>
                                    <Link href="/parameter-tracking">
                                        <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors border border-white/5 hover:border-[#f6d56a]/30 cursor-pointer group h-full">
                                            <strong className="block text-[#f6d56a] text-base mb-2 group-hover:text-white transition-colors">Ion Drift Control</strong>
                                            <span className="text-xs text-white/60">Detecting contamination artifacts.</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Family C: Gradient Field */}
                            <div className="bg-[#0b1020]/50 rounded-2xl border border-white/5 p-8 flex flex-col md:flex-row gap-8 items-start md:items-center hover:border-[#a855f7]/20 transition-colors">
                                <div className="min-w-[240px]">
                                    <h3 className="font-bold text-white text-xl flex items-center gap-3 mb-2"><Activity className="w-5 h-5 text-[#a855f7]" /> Gradient Field</h3>
                                    <p className="text-white/40 text-sm">pH, ORP, Redox Potential</p>
                                </div>
                                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                    <Link href="/ph-balance-water">
                                        <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors border border-white/5 hover:border-[#a855f7]/30 cursor-pointer group h-full">
                                            <strong className="block text-[#a855f7] text-base mb-2 group-hover:text-white transition-colors">pH Drift Curve</strong>
                                            <span className="text-xs text-white/60">Isolating interface/air exchange.</span>
                                        </div>
                                    </Link>
                                    <Link href="/orp-redox-water">
                                        <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors border border-white/5 hover:border-[#a855f7]/30 cursor-pointer group h-full">
                                            <strong className="block text-[#a855f7] text-base mb-2 group-hover:text-white transition-colors">ORP Drift Curve</strong>
                                            <span className="text-xs text-white/60">Redox context mapping (Advanced).</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION: FIELD VARIABLE PROTOCOLS */}
                    <div>
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 rounded-xl bg-[#1aa7ff]/10 border border-[#1aa7ff]/20">
                                <Scale className="w-8 h-8 text-[#1aa7ff]" />
                            </div>
                            <h2 className="text-3xl font-display text-white">Field Variables</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link href="/vortex-spin-experiments" className="group block bg-[#0b1020] rounded-3xl border border-white/10 p-8 hover:border-[#1aa7ff]/30 transition-all shadow-xl hover:shadow-[#1aa7ff]/5">
                                <div className="mb-6 w-12 h-12 bg-[#1aa7ff]/10 rounded-full flex items-center justify-center text-[#1aa7ff] group-hover:scale-110 transition-transform"><RotateCw className="w-6 h-6" /></div>
                                <h3 className="text-xl font-bold text-white group-hover:text-[#1aa7ff] transition-colors mb-3">Vortex & Spin</h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed">Flow-path effects, duration curves, settlement patterns.</p>
                                <Link href="/vortex-technologies" className="text-white/40 group-hover:text-[#1aa7ff] hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1 transition-colors mt-2">
                                    Global Tech Review &rarr;
                                </Link>
                                <Button variant="ghost" className="text-white/40 group-hover:text-[#1aa7ff] hover:bg-transparent p-0 h-auto font-bold uppercase tracking-widest text-xs transition-colors">
                                    Explore <ArrowRight className="ml-2 w-3 h-3" />
                                </Button>
                            </Link>

                            <Link href="/magnet-placement-experiments" className="group block bg-[#0b1020] rounded-3xl border border-white/10 p-8 hover:border-[#1aa7ff]/30 transition-all shadow-xl hover:shadow-[#1aa7ff]/5">
                                <div className="mb-6 w-12 h-12 bg-[#1aa7ff]/10 rounded-full flex items-center justify-center text-[#1aa7ff] group-hover:scale-110 transition-transform"><Magnet className="w-6 h-6" /></div>
                                <h3 className="text-xl font-bold text-white group-hover:text-[#1aa7ff] transition-colors mb-3">Magnetics</h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed">Polarity swap, placement distance, and exposure time.</p>
                                <Button variant="ghost" className="text-white/40 group-hover:text-[#1aa7ff] hover:bg-transparent p-0 h-auto font-bold uppercase tracking-widest text-xs transition-colors">
                                    Explore <ArrowRight className="ml-2 w-3 h-3" />
                                </Button>
                            </Link>

                            <Link href="/science/light-sound-water" className="group block bg-[#0b1020] rounded-3xl border border-white/10 p-8 hover:border-[#1aa7ff]/30 transition-all shadow-xl hover:shadow-[#1aa7ff]/5">
                                <div className="mb-6 w-12 h-12 bg-[#1aa7ff]/10 rounded-full flex items-center justify-center text-[#1aa7ff] group-hover:scale-110 transition-transform"><Sun className="w-6 h-6" /></div>
                                <h3 className="text-xl font-bold text-white group-hover:text-[#1aa7ff] transition-colors mb-3">Light Exposure</h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed">Light vs Dark boundary conditions testing.</p>
                                <Button variant="ghost" className="text-white/40 group-hover:text-[#1aa7ff] hover:bg-transparent p-0 h-auto font-bold uppercase tracking-widest text-xs transition-colors">
                                    Explore <ArrowRight className="ml-2 w-3 h-3" />
                                </Button>
                            </Link>

                            <Link href="/ez-water-experiments" className="group block bg-[#0b1020] rounded-3xl border border-white/10 p-8 hover:border-[#1aa7ff]/30 transition-all shadow-xl hover:shadow-[#1aa7ff]/5">
                                <div className="mb-6 w-12 h-12 bg-[#1aa7ff]/10 rounded-full flex items-center justify-center text-[#1aa7ff] group-hover:scale-110 transition-transform"><FlaskConical className="w-6 h-6" /></div>
                                <h3 className="text-xl font-bold text-white group-hover:text-[#1aa7ff] transition-colors mb-3">EZ Water</h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed">Exclusion Zone formation protocols.</p>
                                <Button variant="ghost" className="text-white/40 group-hover:text-[#1aa7ff] hover:bg-transparent p-0 h-auto font-bold uppercase tracking-widest text-xs transition-colors">
                                    View Protocol <ArrowRight className="ml-2 w-3 h-3" />
                                </Button>
                            </Link>

                            <Link href="/design-simulation" className="group block bg-[#0b1020] rounded-3xl border border-white/10 p-8 hover:border-[#1aa7ff]/30 transition-all shadow-xl hover:shadow-[#1aa7ff]/5">
                                <div className="mb-6 w-12 h-12 bg-[#1aa7ff]/10 rounded-full flex items-center justify-center text-[#1aa7ff] group-hover:scale-110 transition-transform"><Activity className="w-6 h-6" /></div>
                                <h3 className="text-xl font-bold text-white group-hover:text-[#1aa7ff] transition-colors mb-3">Design Sim</h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed">Interactive simulation tools.</p>
                                <Button variant="ghost" className="text-white/40 group-hover:text-[#1aa7ff] hover:bg-transparent p-0 h-auto font-bold uppercase tracking-widest text-xs transition-colors">
                                    Launch Sim <ArrowRight className="ml-2 w-3 h-3" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            {/* CITIZEN SCIENCE HUB */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10 overflow-hidden">
                <BackgroundLayer  opacity={10} />
                <div className="container px-4 max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl font-display text-white mb-6">Ready to contribute?</h2>
                    <p className="text-white/60 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
                        Standardized reports build the library. Submit your baseline-controlled experiment using the master template.
                    </p>
                    <Link href="/citizen-science-hub">
                        <Button size="lg" className="bg-[#38ffd1] hover:bg-[#38ffd1]/80 text-[#020617] font-bold rounded-full h-14 px-8 text-base shadow-[0_0_20px_rgba(56,255,209,0.3)]">
                            <FileCheck className="w-5 h-5 mr-2" /> Go to Submission Hub
                        </Button>
                    </Link>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#0b1020] relative z-10">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Common Questions</h2>
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-[#0b1020]/50 border border-white/5 hover:border-white/10 transition-colors">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                What’s the most important experiment to start with?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">Baseline stability. If your controls drift inconsistently, nothing else is interpretable.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#0b1020]/50 border border-white/5 hover:border-white/10 transition-colors">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                What should I measure if I only have one meter?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">EC/TDS plus temperature and standardized clarity photos. This combination is highly informative for disciplined comparisons.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#0b1020]/50 border border-white/5 hover:border-white/10 transition-colors">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                Why do you use time curves?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">Because water systems drift. A single reading can be noise; a curve can reveal repeatable patterns under controlled conditions.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#0b1020]/50 border border-white/5 hover:border-white/10 transition-colors">
                            <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                Are these experiments proving health claims?
                            </h3>
                            <p className="text-white/60 pl-8 leading-relaxed text-sm">No. These protocols focus on water behavior and measurable parameters under controlled conditions.</p>
                        </div>
                    </div>
                </div>
            </section>
        </StandardPageLayout>
    );
}
