import React from "react";
import { Link } from "wouter";
import StandardPageLayout from "@/components/StandardPageLayout";
import { ParticleFlow } from "@/components/motion/ParticleFlow";
import {
    Atom,
    Droplets,
    ArrowRight,
    HelpCircle,
    Activity,
    FlaskConical,
    Zap,
    AlertTriangle
} from "lucide-react";

export default function IronSulfurSynergyPage() {
    return (
        <StandardPageLayout
            title={<>Iron & Sulfur <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Synergy</span></>}
            subtitle={<>Redox Context & Ionic Structure.<br />Why they appear together in water clarity conversations.</>}
            heroVariant="amber"
            heroIcon={Zap}

            badges={[{ text: "Redox & Chemistry Bridge", icon: Zap }]}
            seoTitle="Iron & Sulfur Synergy: Redox Context, Water Clarity + What to Measure"
            seoDescription="Explore iron and sulfur synergy in water systems: how iron states relate to redox (ORP), how sulfate connects mineral chemistry to clarity concepts, and how to compare water changes using EC/TDS + turbidity protocols."
            backgroundElement={
                <div className="absolute inset-0 overflow-hidden">
                    <ParticleFlow color="#f59e0b" count={20} direction="up" className="opacity-30" />
                    <ParticleFlow color="#0ea5e9" count={15} direction="down" className="opacity-25" />
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-[#020617]" />
                </div>
            }
        >

            {/* SECTION 1: WHAT IT MEANS */}
            <section className="py-20 bg-[#05060b] border-y border-white/5">
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-display text-white mb-6">What "Synergy" Means Here</h2>
                            <p className="text-white/70 mb-6 leading-relaxed">
                                It simply means that <strong className="text-[#f6d56a]">Iron</strong> (Redox Context) and <strong className="text-[#1aa7ff]">Sulfate</strong> (Ionic Structure) are often linked in the same water-system map.
                            </p>
                            <p className="text-white/60 text-sm mb-6">
                                Together, they drive conversations about:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                    <Zap className="w-5 h-5 text-[#f6d56a]" />
                                    <span className="text-white text-sm">Particle Behavior (Redox)</span>
                                </li>
                                <li className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                    <Atom className="w-5 h-5 text-[#1aa7ff]" />
                                    <span className="text-white text-sm">Ionic Composition (Sulfate)</span>
                                </li>
                                <li className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                    <Droplets className="w-5 h-5 text-[#38ffd1]" />
                                    <span className="text-white text-sm">Water Clarity (Turbidity)</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#0b1020] p-8 rounded-2xl border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f6d56a]/10 rounded-full blur-3xl pointer-events-none" />
                            <h3 className="text-xl font-bold text-white mb-6">Key Connections</h3>
                            <div className="space-y-4">
                                <Link href="/science/sulfate-chemistry" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 hover:border-[#f6d56a]/30 border border-transparent transition-all group">
                                    <div>
                                        <strong className="block text-white text-sm group-hover:text-[#f6d56a] transition-colors">Ferrous Iron Sulphate</strong>
                                        <span className="text-white/40 text-xs">The compound bridge</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-[#f6d56a]" />
                                </Link>
                                <Link href="/sulfate-chemistry" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 hover:border-[#1aa7ff]/30 border border-transparent transition-all group">
                                    <div>
                                        <strong className="block text-white text-sm group-hover:text-[#1aa7ff] transition-colors">Sulfate Chemistry</strong>
                                        <span className="text-white/40 text-xs">The stability anchor</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-[#1aa7ff]" />
                                </Link>
                                <Link href="/science/turbidity-clarity-flocculation" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 hover:border-[#38ffd1]/30 border border-transparent transition-all group">
                                    <div>
                                        <strong className="block text-white text-sm group-hover:text-[#38ffd1] transition-colors">Turbidity / Clarity</strong>
                                        <span className="text-white/40 text-xs">The visual result</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-[#38ffd1]" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION: THE HERITAGE OF HEALING (Lourdes & Science) */}
            <section className="py-24 bg-[#020617] relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[#f6d56a]/5 blur-3xl" />
                <div className="container px-4 max-w-5xl mx-auto relative">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-400 font-bold uppercase tracking-wider mb-6">
                            <span className="text-[#f6d56a]">●</span> History & Evidence
                        </div>
                        <h2 className="text-3xl font-display text-white mb-6">Miracle or Mineral?</h2>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            History is full of stories about "healing springs"—from the onsens of Japan to the mineral waters of <strong className="text-[#f6d56a]">Lourdes, France</strong>. For centuries, visitors have traveled to these sites seeking restoration suitable for their terrain. But was it magic?
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="bg-[#0b1020] p-8 rounded-3xl border border-white/10 relative group hover:border-[#f6d56a]/30 transition-colors">
                            <div className="absolute top-6 right-6 text-slate-700 group-hover:text-[#f6d56a]/50 transition-colors">
                                <FlaskConical className="w-8 h-8 opacity-50" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">The Science of 70+ Miracles</h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                The Catholic Church has recognized over 70 "miracles" at Lourdes. When scientists analyzed the water, they didn't find magic. They found specific geological signatures: <strong className="text-white">High Sulfates, Iron, and Trace Minerals</strong>.
                            </p>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                It turns out this "legendary water" has a chemical formula. It is a specific electrolyte soup that provides the mineral context the body uses to maintain balance.
                            </p>
                        </div>

                        <div className="bg-[#0b1020] p-8 rounded-3xl border border-white/10 relative group hover:border-[#1aa7ff]/30 transition-colors">
                            <div className="absolute top-6 right-6 text-slate-700 group-hover:text-[#1aa7ff]/50 transition-colors">
                                <Activity className="w-8 h-8 opacity-50" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">The 1,300 Person Study</h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                The connection isn't just anecdotal. A clinical study in Africa took 1,300 people suffering from chronic arthritic pain and bathed them in these sulfate-rich waters.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="text-4xl font-bold text-[#1aa7ff]">80%</div>
                                <p className="text-xs text-slate-300">
                                    Reported <strong className="text-white">significant improvements</strong> in mobility. This suggests that local sulfate absorption is a potent mechanism for supporting the body's natural flow and joint comfort.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: IRON STATES & SULFATE BRIDGE */}
            <section className="py-24 bg-[#020617]">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Iron Column */}
                        <div>
                            <h3 className="text-2xl font-display text-white mb-6 flex items-center gap-3">
                                <Zap className="w-6 h-6 text-[#f6d56a]" />
                                Iron States (Redox)
                            </h3>
                            <p className="text-white/60 mb-6">
                                Simplicity first. The state of iron (Ferrous Fe²⁺ vs Ferric Fe³⁺) depends on the environment.
                            </p>
                            <div className="p-6 bg-[#0b1020] rounded-2xl border border-[#f6d56a]/10 mb-6">
                                <h4 className="font-bold text-white mb-2">Context Drivers</h4>
                                <p className="text-sm text-white/60 mb-4">
                                    Oxygen exposure, pH, and time all shift the balance. This is why we measure ORP (Oxidation-Reduction Potential).
                                </p>
                                <Link href="/orp-redox-water" className="text-xs font-bold text-[#f6d56a] hover:underline uppercase tracking-wider">
                                    Understand ORP →
                                </Link>
                            </div>
                        </div>

                        {/* Sulfate Column */}
                        <div>
                            <h3 className="text-2xl font-display text-white mb-6 flex items-center gap-3">
                                <Atom className="w-6 h-6 text-[#1aa7ff]" />
                                Sulfate (Structure)
                            </h3>
                            <p className="text-white/60 mb-6">
                                Sulfate (SO₄²⁻) is the stable, oxygen-rich anchor. It connects mineral origins to dissolved ionic chemistry.
                            </p>
                            <div className="p-6 bg-[#0b1020] rounded-2xl border border-[#1aa7ff]/10 mb-6">
                                <h4 className="font-bold text-white mb-2">The Geometric Link</h4>
                                <p className="text-sm text-white/60 mb-4">
                                    The structure of the sulfate ion is a tetrahedron. This geometry is a key pattern in our mineral library.
                                </p>
                                <Link href="/science/tetrahedral-sulfate-geometry" className="text-xs font-bold text-[#1aa7ff] hover:underline uppercase tracking-wider">
                                    See Geometry →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: PROTOCOL */}
            <section className="py-24 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-display text-white mb-4">The Comparison Protocol</h2>
                        <p className="text-white/60">How to measure ionic shifts and clarity changes responsibly.</p>
                    </div>

                    <div className="bg-[#0b1020] rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#38ffd1]/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-6">What to Measure</h3>
                                <ul className="space-y-6">
                                    <li className="flex gap-4">
                                        <Activity className="w-6 h-6 text-[#1aa7ff] flex-shrink-0" />
                                        <div>
                                            <strong className="block text-white text-sm">1. EC/TDS (Ionic Fingerprint)</strong>
                                            <span className="text-white/50 text-xs">Measures the dissolved ionic load.</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <Droplets className="w-6 h-6 text-[#38ffd1] flex-shrink-0" />
                                        <div>
                                            <strong className="block text-white text-sm">2. Turbidity (Clarity)</strong>
                                            <span className="text-white/50 text-xs">Observes suspended particles and settling.</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <FlaskConical className="w-6 h-6 text-[#f6d56a] flex-shrink-0" />
                                        <div>
                                            <strong className="block text-white text-sm">3. ORP/pH (Context)</strong>
                                            <span className="text-white/50 text-xs">Tracks environmental drift (Temp/Gas sensitive).</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-4">Experiment Set</h3>
                                <div className="space-y-4 text-sm text-white/70">
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#38ffd1]/20 text-[#38ffd1] font-bold text-xs flex items-center justify-center flex-shrink-0">1</div>
                                        <p>Fill 2 identical glass jars with baseline water. Label A (Control) and B (Test).</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#38ffd1]/20 text-[#38ffd1] font-bold text-xs flex items-center justify-center flex-shrink-0">2</div>
                                        <p>Measure Temp, EC, and note Clarity at <strong>T0 (Start)</strong>.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#38ffd1]/20 text-[#38ffd1] font-bold text-xs flex items-center justify-center flex-shrink-0">3</div>
                                        <p>Repeat measurements at <strong>T30, T2h, and T24h</strong>.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#38ffd1]/20 text-[#38ffd1] font-bold text-xs flex items-center justify-center flex-shrink-0">4</div>
                                        <p>Compare the curves. If EC changes but clarity doesn't → Ionic shift.</p>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <Link href="/citizen-science-hub" className="text-xs font-bold text-white hover:text-[#38ffd1] flex items-center gap-1">
                                        Submit Results <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMMON MISTAKES */}
            <section className="py-20 bg-[#020617]">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-display text-white mb-8 text-center">Measurement Mistakes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                            <h4 className="flex items-center gap-2 text-red-300 font-bold text-sm mb-2">
                                <AlertTriangle className="w-4 h-4" /> Fixed ORP Truth
                            </h4>
                            <p className="text-red-200/60 text-xs">ORP drifts with temperature. Always log temp/time.</p>
                        </div>
                        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                            <h4 className="flex items-center gap-2 text-red-300 font-bold text-sm mb-2">
                                <AlertTriangle className="w-4 h-4" /> Turbidity ≠ Minerals
                            </h4>
                            <p className="text-red-200/60 text-xs">Turbidity describes particles, not the mineral identity itself.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#05060b]">
                <div className="container px-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display text-white mb-12 text-center">Common Questions</h2>
                    <div className="space-y-6">
                        {[
                            { name: "What does iron and sulfur synergy mean in water discussions?", text: "It refers to how iron chemistry (redox context) and sulfate chemistry (ionic composition) often appear together in water-system conversations, especially around clarity and measurements." },
                            { name: "Is sulfate the same as sulfide?", text: "No. Sulfate (SO₄²⁻) is oxygen-rich; sulfide (S²⁻) is a different chemistry family." },
                            { name: "Can I measure iron and sulfate directly with home meters?", text: "Not directly. EC/TDS and turbidity help compare fingerprints; ORP/pH provide context but do not identify specific compounds." },
                            { name: "Why should I measure both EC/TDS and turbidity?", text: "EC/TDS reflects ionic composition, while turbidity reflects particle behavior. They describe different layers of the same water system." }
                        ].map((item, i) => (
                            <div key={i} className="border-b border-white/10 pb-6">
                                <h3 className="font-bold text-white text-lg mb-2 flex items-start gap-3">
                                    <HelpCircle className="w-5 h-5 text-white/40 mt-1 flex-shrink-0" />
                                    {item.name}
                                </h3>
                                <p className="text-white/60 pl-8 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </StandardPageLayout>
    );
}
