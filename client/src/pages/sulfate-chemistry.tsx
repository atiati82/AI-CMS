import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { ScrollProgress } from "@/components/plugins/ScrollProgress";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { Link } from "wouter";
import { SmartImage } from "@/components/ui/SmartImage";
import { Card } from "@/components/ui/card";
import { ParticleFlow } from "@/components/motion/ParticleFlow";
import {
    Hexagon,
    Zap,
    Droplets,
    Activity,
    ShieldCheck,
    HelpCircle,
    ArrowRight,
    Beaker,
    CheckCircle2,
    Waves,
    Filter,
    Layers,
    Atom
} from "lucide-react";
import { motion } from "framer-motion";

export default function SulfateChemistryPage() {
    return (
        <StandardPageLayout
            title={<>Sulfate Chemistry: <span className="text-amber-400">The Architect</span></>}
            subtitle={<>Why a small sulfate window changes how water<br /><span className="text-amber-200/60">looks, feels, and conducts energy.</span></>}
            registryId="geo-tetrahedral"
            heroVariant="amber"
            heroIcon={Hexagon}
            clusterKey="mineral-science"
            badges={[{ text: "Structural Geometry", icon: Hexagon }]}
            seoTitle="Sulfate Chemistry: The Architect of Water Structure | Andara Science"
            seoDescription="Discover why sulfate (SO4) is the hidden architect of water quality. Learn about flocculation, charge management (ORP), and the critical 17-30mg/L activation window."
            backgroundElement={
                <div className="absolute inset-0 overflow-hidden">
                    <ParticleFlow color="#f59e0b" count={30} direction="up" className="opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-[#020617]" />
                </div>
            }
        >


            {/* INTRO: WHAT IS SULFATE? */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="absolute inset-0 bg-amber-900/5 blur-3xl -z-10" />
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <h2 className="text-3xl font-light text-white mb-6">What is Sulfate, Really?</h2>
                            <p className="text-slate-300 leading-relaxed text-lg">
                                It usually stays in the background, overshadowed by "alkaline" or "antioxidant" buzzwords. Yet quietly, in springs and oceans, sulfate is running the architecture. Chemically, it is <span className="text-amber-400 font-mono">SO₄²⁻</span>: one sulfur atom, four oxygen wings, carrying a double negative charge.
                            </p>
                            <p className="text-slate-300 leading-relaxed text-lg mt-4">
                                But its role goes deeper than chemistry. In the body, inflammation often correlates with areas where water cannot flow or communicate efficiently. Sulfate acts as a solvent that supports flow, allowing hydration and bio-electrical signals to reconnect.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Visual: The Molecule (Upgraded to SmartImage) */}
                        <FadeIn delay={0.1}>
                            <div className="relative aspect-square rounded-2xl bg-[#0b1020] border border-amber-500/20 overflow-hidden shadow-2xl shadow-amber-900/10 group">
                                <div className="absolute inset-0 bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-colors duration-700" />
                                <SmartImage
                                    registryId="geo-tetrahedral"
                                    className="w-full h-full object-cover p-8 opacity-90 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-6 left-0 right-0 text-center">
                                    <div className="inline-block px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30">
                                        <div className="text-2xl font-bold text-amber-500 mb-1">SO₄²⁻</div>
                                        <div className="text-[10px] font-mono text-amber-200/60 uppercase tracking-widest">Tetrahedral Anion</div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Stats List */}
                        <StaggerContainer className="space-y-4">
                            <Card className="p-6 bg-slate-900/50 border-white/5 hover:border-amber-500/30 transition-colors flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                    <Atom className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-amber-100 mb-1">Geometry</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">Four-winged tetrahedral structure. A highly interactive shape that acts as a connector.</p>
                                </div>
                            </Card>
                            <Card className="p-6 bg-slate-900/50 border-white/5 hover:border-amber-500/30 transition-colors flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-amber-100 mb-1">Charge (2-)</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">Double Negative. This strong charge makes it a powerful binder of impurities.</p>
                                </div>
                            </Card>
                            <Card className="p-6 bg-slate-900/50 border-white/5 hover:border-amber-500/30 transition-colors flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-amber-100 mb-1">The Architect</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">It tells water how to arrange itself, influencing surface tension and structure.</p>
                                </div>
                            </Card>
                        </StaggerContainer>
                    </div>
                </div>
            </section >

            {/* NEW SECTION: THE BIOLOGICAL MECHANIC (Metalloenzymes) */}
            < section className="py-24 bg-[#05060b] relative z-10 border-t border-white/5" >
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-500/20 text-xs text-emerald-400 font-bold uppercase tracking-wider mb-6">
                                <Activity className="w-3 h-3" /> The Enzymatic Key
                            </div>
                            <h2 className="text-3xl font-light text-white mb-6">Metalloenzymes & DNA</h2>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                Science is now finding that trace minerals are absolutely essential in every single enzymatic and protein function in the body. These are known as <strong className="text-emerald-300">metalloenzymes</strong>.
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                Without these specific mineral keys, the body's repair mechanisms stall. This extends even to the <strong className="text-white">transcription of DNA</strong>. Your DNA will literally not propagate its code effectively without the presence of these ionic trace mineral co-factors.
                            </p>
                            <div className="p-4 bg-slate-900/50 border border-white/5 rounded-xl">
                                <p className="text-xs text-slate-500 italic">
                                    "The pharmaceutical industry is actively researching metalloproteins, realizing they are the key to fundamental cellular maintenance and enzymatic signaling."
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />
                            <SmartImage
                                registryId="dna-mineral-helix"
                                className="relative rounded-2xl border border-white/10 shadow-2xl z-10"
                                alt="DNA Helix interacting with mineral ions"
                            />
                        </div>
                    </div>
                </div>
            </section >

            {/* NEW SECTION: THE BIO-PHOTON CONNECTION */}
            < section className="py-24 bg-[#020617] relative z-10" >
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-row-reverse">
                        <div className="relative md:order-2">
                            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
                            <SmartImage
                                registryId="bio-photon-field" // engaging visual
                                className="relative rounded-2xl border border-white/10 shadow-2xl z-10"
                                alt="Cells communicating via light"
                            />
                        </div>
                        <div className="md:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-500/20 text-xs text-blue-400 font-bold uppercase tracking-wider mb-6">
                                <Zap className="w-3 h-3" /> Light Communication
                            </div>
                            <h2 className="text-3xl font-light text-white mb-6">The Liquid Crystal Antenna</h2>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                We are electric beings. Every one of your 100 trillion cells sends and receives signals millions of times per second. But they don't just use electricity—they use <strong className="text-blue-300">Bio-Photons</strong> (particles of light).
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                The medium for this light exchange is water. But not just any water—it must be <strong className="text-white">Structured (Exclusion Zone) Water</strong>.
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Ionic sulfate minerals are what allow bulk water to organize into this liquid crystalline state. Without this structure, signal coherence drops: information fails to transmit, and the cellular internet goes largely offline. Andara Ionic supports this conductive medium.
                            </p>
                        </div>
                    </div>
                </div>
            </section >

            {/* THE ARCHITECT: FLOCCULATION */}
            < section className="py-24 bg-[#020617] border-t border-white/5 relative z-10 overflow-hidden" >
                <div className="container px-4 max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                        <div className="w-full md:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/20 border border-amber-500/20 text-xs text-amber-400 font-bold uppercase tracking-wider mb-6">
                                <Filter className="w-3 h-3" /> Step 1: Clarification
                            </div>
                            <h2 className="text-4xl font-light text-white mb-6">The Water Architect</h2>
                            <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                                Before we talk about subtle energy, water must be clean. Sulfate's most visible role is <span className="text-amber-400 font-medium">Flocculation</span>.
                            </p>
                            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                                When sulfate-rich ionic minerals enter water, they bind tiny suspended particles and pull impurities together into visible "flocs" that settle out. This transforms murky, chaotic water into clear, organized liquid.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-lg bg-[#0b1020] border border-white/5 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                                    <span className="text-sm text-slate-300">Binds Impurities</span>
                                </div>
                                <div className="p-4 rounded-lg bg-[#0b1020] border border-white/5 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                                    <span className="text-sm text-slate-300">Reduces Turbidity</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual: Clarification Process (Upgraded) */}
                        <div className="w-full md:w-1/2 relative">
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                <SmartImage
                                    registryId="ionic-colloidal-bg"
                                    alt="Comparison of murky colloidal water vs clear ionic water"
                                    className="w-full max-h-[400px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                                    <div className="text-xs text-slate-500 font-mono border-l-2 border-slate-700 pl-3">
                                        BEFORE<br />COLLOIDAL CHAOS
                                    </div>
                                    <ArrowRight className="text-amber-500/50 w-6 h-6 mb-1" />
                                    <div className="text-xs text-amber-400 font-mono text-right border-r-2 border-amber-500 pr-3">
                                        AFTER<br />IONIC ACCORD
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* CHARGE MANAGEMENT: ORP & EC */}
            < section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10 text-center" >
                <div className="absolute inset-0 bg-[url('/hex-grid-bg.svg')] opacity-[0.03] bg-repeat pointer-events-none" />
                <div className="container px-4 max-w-6xl mx-auto relative">
                    <div className="mb-16 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-light text-white mb-6">Charge Management</h2>
                        <Hdivider className="bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-6" />
                        <p className="text-slate-400">It's not just about settling dirt. It's about organizing electricity. Sulfate helps manage the <span className="text-amber-200">flow of electrons</span>.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {/* Conductivity */}
                        <Card className="p-8 bg-slate-900 border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1">
                            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                                <Zap className="w-7 h-7 text-blue-500" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-4">Conductivity (EC)</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Sulfate's 2- charge contributes strongly to electrical conductivity. It turns dead water into a "living electrolyte" capable of transmitting biological signals.
                            </p>
                        </Card>
                        {/* Redox */}
                        <Card className="p-8 bg-slate-900 border-white/5 hover:border-amber-500/30 transition-all hover:-translate-y-1">
                            <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mb-6">
                                <Activity className="w-7 h-7 text-amber-500" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-4">Redox (ORP)</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Sulfate cycles help buffer the redox environment. A balanced sulfate presence supports a stable ORP (Oxidation-Reduction Potential) range compatible with life.
                            </p>
                        </Card>
                        {/* Interface */}
                        <Card className="p-8 bg-slate-900 border-white/5 hover:border-cyan-500/30 transition-all hover:-translate-y-1">
                            <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6">
                                <Layers className="w-7 h-7 text-cyan-500" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-4">Interface Layer</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Sulfate charges the surfaces it touches (glass, membranes), drawing positive ions close and helping to build ordered "EZ" water layers that protect cells.
                            </p>
                        </Card>
                    </div>
                </div>
            </section >

            {/* THE ACTIVATION BAND */}
            < section className="py-24 bg-[#020617] relative z-10 border-t border-white/5" >
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <div className="mb-12">
                        <h2 className="text-3xl font-light text-white mb-4">The "Activation Window"</h2>
                        <p className="text-slate-300">Why dose precision matters.</p>
                    </div>

                    {/* Gauge Visual (Enhanced) */}
                    <div className="relative h-32 md:h-40 max-w-lg mx-auto mb-8 bg-slate-900/50 rounded-t-full overflow-hidden border-t border-x border-white/10 backdrop-blur-sm">
                        {/* Zones */}
                        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-slate-800/30 border-r border-white/5 flex items-end justify-center pb-4 text-[10px] tracking-wider text-slate-500 font-mono">TOO LOW</div>
                        <div className="absolute bottom-0 left-1/3 w-1/3 h-full bg-amber-500/10 border-r border-white/5 flex items-end justify-center pb-4 text-[10px] tracking-wider text-amber-400 font-bold font-mono shadow-[0_0_30px_rgba(245,158,11,0.1)_inset]">OPTIMAL</div>
                        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-red-900/10 flex items-end justify-center pb-4 text-[10px] tracking-wider text-red-900/50 font-mono">TOO HIGH</div>

                        {/* Needle */}
                        <motion.div
                            initial={{ rotate: -45 }}
                            whileInView={{ rotate: 0 }}
                            transition={{ duration: 1.5, type: "spring", stiffness: 50 }}
                            className="absolute bottom-0 left-1/2 w-1 h-28 bg-amber-500 origin-bottom shadow-[0_0_15px_rgba(245,158,11,0.8)] z-20"
                        />
                        <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 translate-y-2 z-30 shadow-lg" />
                    </div>

                    <h3 className="text-4xl font-mono text-amber-400 font-bold mb-4">~17 - 30 mg/L</h3>
                    <p className="text-slate-300 max-w-lg mx-auto leading-relaxed mb-8">
                        In this specific range, flocculation is efficient, water clarifies, and charge stabilizes. Below this, the effect is weak. Above this, it can feel harsh. Andara is calibrated to land exactly here.
                    </p>
                </div>
            </section >

            {/* ANDARA & NATURE */}
            < section className="py-24 bg-gradient-to-b from-[#020617] to-[#05060b] border-t border-white/5 relative z-10" >
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="p-1 rounded-2xl bg-gradient-to-r from-amber-900/20 via-slate-800/50 to-amber-900/20">
                        <div className="p-10 rounded-xl bg-[#080a14] backdrop-blur-xl text-center">
                            <h2 className="text-2xl font-light text-white mb-6">Nature's Template</h2>
                            <p className="text-slate-300 leading-relaxed mb-8 text-lg font-light">
                                You feel this pattern in natural mineral springs, deep aquifers, and volcanic waters. They are not "pure H2O"—they are complex electrolyte soups held in balance by sulfate geometry.
                                <br /><br />
                                <strong className="text-amber-100">Andara Ionic</strong> is simply a way to restore this lost architectural code to daily water.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/trust/comparison-other-mineral-products" className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition-colors border border-white/5 flex items-center gap-2">
                                    <Waves className="w-4 h-4 text-amber-400" /> Compare Sources
                                </Link>
                                <Link href="/trust/faq-safety-quality" className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition-colors border border-white/5 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Safety Boundaries
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* FAQ */}
            < section className="py-20 bg-[#020617] border-t border-white/5" >
                <div className="container px-4 max-w-3xl mx-auto">
                    <div className="space-y-4">
                        {[
                            { name: "Is Sulfate the same as Sulfur?", text: "No. Sulfur (S) is the raw element. Sulfate (SO4) is the stable, oxygen-rich ion form found in mineral water." },
                            { name: "Does Sulfate taste bad?", text: "In high amounts, yes. In the optimal range (17-30mg/L), it gives water a crisp, structured 'body' or mouthfeel. It is the 'bite' of a good mineral water." },
                            { name: "Is Sulfate safe?", text: "Sulfate is a natural part of drinking water. High levels (>500mg/L) can have a laxative effect, but Andara's dilution protocols keep levels far, far below that threshold." }
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-xl bg-slate-900/50 border border-white/5 hover:bg-slate-900 transition-colors">
                                <h3 className="font-bold text-amber-50 text-sm mb-2 flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4 text-amber-500/50" /> {item.name}
                                </h3>
                                <p className="text-slate-400 text-sm pl-6 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

        </StandardPageLayout >
    );
}

function Hdivider({ className }: { className?: string }) {
    return <div className={`h-px ${className}`} />;
}
