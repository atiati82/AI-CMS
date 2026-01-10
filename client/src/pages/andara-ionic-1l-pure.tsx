import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
    ArrowRight,
    Droplets,
    Beaker,
    Home,
    Users,
    Building2,
    Hexagon,
    Waves,
    Sparkles,
    Shield,
    HelpCircle,
    CheckCircle2,
    XCircle,
    Calculator,
    BookOpen,
    Layers,
    Clock,
    FlaskConical,
    Pipette,
    Sun,
    Package
} from 'lucide-react';
import StandardPageLayout from '@/components/StandardPageLayout';
import { Card } from '@/components/ui/card';
import { FadeIn, StaggerContainer } from '@/components/animations';
import { VideoBackground, SmartVideoEmbed } from '@/components/SmartVideoEmbed';

export default function AndaraIonic1lPurePage() {
    return (
        <StandardPageLayout
            title="Andara Ionic Pure – 1 Liter"
            subtitle="Primordial Ionic Sulfate Mineral Concentrate"
            heroVariant="amber"
            backgroundElement={<VideoBackground keywords={["product", "ionic", "gold", "activation"]} overlayOpacity={0.4} />}
            seoTitle="Andara Ionic Pure 1 L – Primordial Ionic Sulfate Minerals for Water Conditioning"
            seoDescription="Andara Ionic Pure 1 L is a primordial ionic sulfate mineral concentrate to clarify, condition and structure your drinking water. Designed for whole-house use, families and practitioners."
        >

            {/* SECTION 1: HERO - WHAT THIS BOTTLE REALLY IS */}
            <section className="py-20 bg-gradient-to-b from-[#0a0c14] to-[#05060b] relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-light text-white mb-6 text-center">
                            One Liter of <span className="andara-text-gold-gradient">Source Code</span> for Your Water
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-32 mx-auto mb-10" />
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="max-w-3xl mx-auto text-center">
                            <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                Andara Ionic Pure (1 L) is not just "another mineral product".<br />
                                It is a <strong className="text-amber-200">primordial ionic sulfate concentrate</strong> designed to act as a water code:
                            </p>
                        </div>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8 mb-10">
                        <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/40 transition-all duration-300 shadow-lg text-center">
                            <Droplets className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                            <p className="text-sm text-slate-300">You add <strong className="text-white">a few drops</strong> to a liter, not liters of product to your life</p>
                        </Card>
                        <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/40 transition-all duration-300 shadow-lg text-center">
                            <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                            <p className="text-sm text-slate-300">The minerals stay in <strong className="text-white">ionic, bioavailable form</strong>, not as heavy particles</p>
                        </Card>
                        <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/40 transition-all duration-300 shadow-lg text-center">
                            <Hexagon className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                            <p className="text-sm text-slate-300">The <strong className="text-white">sulfate geometry</strong> helps water clarify, organize and hold charge</p>
                        </Card>
                    </StaggerContainer>

                    <FadeIn delay={0.2}>
                        <div className="max-w-2xl mx-auto text-center">
                            <p className="text-slate-400 leading-relaxed mb-4">
                                This bottle is made for people who want to take responsibility for the water field in their home, practice, or retreat space – with one clear logic instead of many fragmented solutions.
                            </p>
                            <p className="text-amber-200/80 italic">
                                You're not buying "a drink". You're choosing a central mineral key for the water you already drink.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 2: WHAT IT IS / WHAT IT ISN'T */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-light text-white mb-4 text-center">
                            Clarification & Conditioning – <span className="text-amber-400">Not Medication</span>
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* What It Is */}
                        <FadeIn>
                            <Card className="p-8 bg-emerald-900/10 border border-emerald-500/20 rounded-xl h-full">
                                <h3 className="text-xl font-medium text-emerald-400 mb-6 flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6" /> What It Is
                                </h3>
                                <ul className="space-y-4 text-slate-300">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                                        <span>A concentrated ionic sulfate mineral solution, derived from volcanic black mica lineage</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                                        <span>A tool to help clarify, condition and structure neutral water</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                                        <span>A way to bring your water into a controlled sulfate activation range</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                                        <span>A modular element in your terrain-thinking system: water, minerals, light, movement, rest</span>
                                    </li>
                                </ul>
                            </Card>
                        </FadeIn>

                        {/* What It Is Not */}
                        <FadeIn delay={0.1}>
                            <Card className="p-8 bg-rose-900/10 border border-rose-500/20 rounded-xl h-full">
                                <h3 className="text-xl font-medium text-rose-400 mb-6 flex items-center gap-3">
                                    <XCircle className="w-6 h-6" /> What It Is Not
                                </h3>
                                <ul className="space-y-4 text-slate-300">
                                    <li className="flex items-start gap-3">
                                        <XCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                                        <span>Not a medicine, supplement or cure</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <XCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                                        <span>Not a product that replaces any professional diagnosis or therapy</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <XCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                                        <span>Not a promise of specific outcomes in the body</span>
                                    </li>
                                </ul>
                                <p className="mt-6 text-sm text-slate-500 border-t border-white/5 pt-4">
                                    This page stays fully in Zone 1 / Water & Application: we talk about water quality, structure, usage logic and practical handling.
                                </p>
                            </Card>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* SECTION 3: WHO THIS FORMAT IS FOR */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-light text-white mb-4 text-center">
                            Made for People Who Think in <span className="andara-text-gold-gradient">Systems</span>, Not Just Bottles
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Households */}
                        <FadeIn>
                            <motion.div
                                whileHover={{ y: -6 }}
                                className="p-1 rounded-2xl bg-gradient-to-br from-amber-500/30 via-slate-800/50 to-amber-500/30 shadow-lg"
                            >
                                <div className="p-8 rounded-xl bg-[#080a14]/95 backdrop-blur-xl h-full">
                                    <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                                        <Home className="w-7 h-7 text-amber-500" />
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-4">Run a Household</h3>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li>• All drinking and cooking water follows the same logic</li>
                                        <li>• One central mixing ritual for your family's water</li>
                                        <li>• A permanent water station at home</li>
                                    </ul>
                                </div>
                            </motion.div>
                        </FadeIn>

                        {/* Practice/Studio */}
                        <FadeIn delay={0.1}>
                            <motion.div
                                whileHover={{ y: -6 }}
                                className="p-1 rounded-2xl bg-gradient-to-br from-cyan-500/30 via-slate-800/50 to-cyan-500/30 shadow-lg"
                            >
                                <div className="p-8 rounded-xl bg-[#080a14]/95 backdrop-blur-xl h-full">
                                    <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                                        <Users className="w-7 h-7 text-cyan-500" />
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-4">Operate a Practice or Studio</h3>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li>• Clients, guests or team members drink on-site</li>
                                        <li>• Your space to be felt as "different" in its water field</li>
                                        <li>• A bottle format that is logistical, not fragile</li>
                                    </ul>
                                </div>
                            </motion.div>
                        </FadeIn>

                        {/* Retreats */}
                        <FadeIn delay={0.2}>
                            <motion.div
                                whileHover={{ y: -6 }}
                                className="p-1 rounded-2xl bg-gradient-to-br from-violet-500/30 via-slate-800/50 to-violet-500/30 shadow-lg"
                            >
                                <div className="p-8 rounded-xl bg-[#080a14]/95 backdrop-blur-xl h-full">
                                    <div className="w-14 h-14 rounded-full bg-violet-500/10 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                                        <Building2 className="w-7 h-7 text-violet-500" />
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-4">Host Retreats & Training</h3>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li>• Many people drink daily over many days</li>
                                        <li>• Use for tea, elixirs, shares, ceremonies</li>
                                        <li>• A mineral logic that works reliably in higher volume</li>
                                    </ul>
                                </div>
                            </motion.div>
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.3}>
                        <div className="mt-12 text-center p-6 bg-slate-900/40 border border-white/5 rounded-xl max-w-2xl mx-auto">
                            <p className="text-slate-400 text-sm">
                                <strong className="text-white">Just want to test?</strong> Start with <Link href="/products/andara-ionic-100ml" className="text-amber-400 hover:underline">100 ml</Link>.<br />
                                If you already know this logic belongs in your space, the 1 L format is your infrastructure choice.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 4: HOW IT WORKS */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="absolute inset-0 bg-[url('/hex-grid-bg.svg')] opacity-[0.03] bg-repeat pointer-events-none" />
                <div className="container px-4 max-w-5xl mx-auto relative">
                    <FadeIn>
                        <h2 className="text-3xl font-light text-white mb-4 text-center">
                            From Concentrate to <span className="andara-text-gold-gradient">Clarified & Conditioned Water</span>
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-6" />
                        <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
                            When you add Andara Ionic Pure to water, three core processes begin:
                        </p>
                    </FadeIn>

                    <div className="space-y-8">
                        {/* Phase 1 */}
                        <FadeIn>
                            <Card className="p-8 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/30 transition-all shadow-lg">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0">
                                        <span className="text-2xl font-bold text-amber-500">1</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-medium text-amber-400 mb-3">Clarification Phase</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <ul className="space-y-2 text-slate-400 text-sm">
                                                <li>• Suspended particles and certain dissolved contaminants flocculate and settle</li>
                                                <li>• The water becomes visibly clearer over time</li>
                                                <li>• This phase is linked to the sulfate and mineral charge acting in the water</li>
                                            </ul>
                                            <div className="rounded-lg overflow-hidden border border-white/10 aspect-video">
                                                <SmartVideoEmbed keywords={["drop", "clarify", "settle", "flocculation"]} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </FadeIn>

                        {/* Phase 2 */}
                        <FadeIn delay={0.1}>
                            <Card className="p-8 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-cyan-500/30 transition-all shadow-lg">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                                        <span className="text-2xl font-bold text-cyan-500">2</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-cyan-400 mb-3">Conditioning & Structuring Phase</h3>
                                        <ul className="space-y-2 text-slate-400 text-sm">
                                            <li>• Charged ions and sulfate tetrahedra support the formation of finer hydration clusters</li>
                                            <li>• Water tends to feel softer, smoother, less "flat" when drinking</li>
                                            <li>• This echoes the logic of natural mineral springs and volcanic aquifers</li>
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        </FadeIn>

                        {/* Phase 3 */}
                        <FadeIn delay={0.2}>
                            <Card className="p-8 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-violet-500/30 transition-all shadow-lg">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center shrink-0">
                                        <span className="text-2xl font-bold text-violet-500">3</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-violet-400 mb-3">Stabilization & Terrain Logic</h3>
                                        <ul className="space-y-2 text-slate-400 text-sm">
                                            <li>• Once clarified and conditioned, your water becomes a more stable base</li>
                                            <li>• It can be combined with other elements: vortexing, magnetics, structured light, Andara devices</li>
                                            <li>• You're building a terrain, not a one-time trick</li>
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.3}>
                        <div className="mt-12 flex flex-wrap justify-center gap-4">
                            <Link href="/science/sulfate-chemistry" className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition-colors border border-white/5 flex items-center gap-2">
                                <Hexagon className="w-4 h-4 text-amber-400" /> Sulfate Chemistry
                            </Link>
                            <Link href="/science/water-science-master" className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition-colors border border-white/5 flex items-center gap-2">
                                <Waves className="w-4 h-4 text-cyan-400" /> Water Phases
                            </Link>
                            <Link href="/science/bioelectric-water" className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition-colors border border-white/5 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-violet-400" /> Bioelectricity
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 5: SUGGESTED USE */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-light text-white mb-4 text-center">
                            Practical Use – <span className="andara-text-gold-gradient">How Much Do I Add?</span>
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-6" />
                        <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto text-sm">
                            These are educational ranges for water conditioning and clarification. Always start lower, observe your water, and adjust gradually.
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FadeIn>
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/30 transition-all h-full">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                                    <Droplets className="w-6 h-6 text-amber-500" />
                                </div>
                                <h3 className="text-lg font-medium text-white mb-3">Basic Household</h3>
                                <p className="text-amber-400 font-mono text-sm mb-4">~1 ml per 1 L</p>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Start with neutral, filtered water. Let it stand and clarify. Use in jugs, dispensers or carafes as daily drinking base.
                                </p>
                            </Card>
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-cyan-500/30 transition-all h-full">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                                    <FlaskConical className="w-6 h-6 text-cyan-500" />
                                </div>
                                <h3 className="text-lg font-medium text-white mb-3">Intensive Clarification</h3>
                                <p className="text-cyan-400 font-mono text-sm mb-4">~1.5–2 ml per L</p>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    For initial batches where visible flocculation is desired. This is about clarification speed, not "stronger is better".
                                </p>
                            </Card>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-violet-500/30 transition-all h-full">
                                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                                    <Layers className="w-6 h-6 text-violet-500" />
                                </div>
                                <h3 className="text-lg font-medium text-white mb-3">System Integration</h3>
                                <p className="text-violet-400 font-mono text-sm mb-4">Consistent Logic</p>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Combine with vortex devices, magnetic activators, or Andara structuring units. Keep dilution logic consistent day to day.
                                </p>
                            </Card>
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.3}>
                        <div className="mt-12 text-center">
                            <Link href="/andara-dilution-calculator">
                                <button className="px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm transition-colors font-bold flex items-center gap-2 mx-auto">
                                    <Calculator className="w-4 h-4" /> Open Dilution Calculator
                                </button>
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 6: FORMAT & HANDLING */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-light text-white mb-4 text-center">
                            Bottle, Handling & <span className="andara-text-gold-gradient">Daily Ritual</span>
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Specs */}
                        <FadeIn>
                            <Card className="p-8 bg-slate-900/60 backdrop-blur-xl border border-white/5">
                                <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                                    <Package className="w-5 h-5 text-amber-500" /> Product Specifications
                                </h3>
                                <ul className="space-y-4 text-slate-300 text-sm">
                                    <li className="flex items-center gap-3">
                                        <span className="text-amber-400 font-mono">Volume:</span> 1 Liter
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-amber-400 font-mono">Form:</span> Concentrated ionic sulfate mineral solution
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-amber-400 font-mono">Cap:</span> Secure closure suitable for daily handling
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-amber-400 font-mono">Storage:</span> Cool, dark, away from direct sunlight and EMF
                                    </li>
                                </ul>
                            </Card>
                        </FadeIn>

                        {/* Ritual */}
                        <FadeIn delay={0.1}>
                            <Card className="p-8 bg-slate-900/60 backdrop-blur-xl border border-white/5">
                                <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-cyan-500" /> Suggested Ritual
                                </h3>
                                <ol className="space-y-3 text-slate-300 text-sm">
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0">1</span>
                                        Choose your main water container (glass dispenser, carafe, jug)
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0">2</span>
                                        Decide your standard dilution range (e.g. 1 ml per 1 L)
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0">3</span>
                                        Use a pipette, pump or dosing cap for repeatable dosing
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0">4</span>
                                        Refill your water station at the same time each day – turn it into a rhythm
                                    </li>
                                </ol>
                            </Card>
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.2}>
                        <p className="text-center text-slate-400 mt-10 max-w-2xl mx-auto text-sm italic">
                            The 1 L bottle becomes a quiet anchor: always there, always the same logic, quietly updating the water field in your space.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 7: BUNDLES & UPGRADES */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-light text-white mb-4 text-center">
                            Go from Single Bottle to <span className="andara-text-gold-gradient">System</span>
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FadeIn>
                            <Link href="/shop/andara-1l-bundles">
                                <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/40 transition-all cursor-pointer group h-full">
                                    <Layers className="w-8 h-8 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-lg font-medium text-white mb-2">1L Bundles</h3>
                                    <p className="text-sm text-slate-400 mb-4">Family & Pro Use – when you're ready to treat water for more people</p>
                                    <span className="text-amber-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                        View Bundles <ArrowRight className="w-4 h-4" />
                                    </span>
                                </Card>
                            </Link>
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <Link href="/compare-bundles">
                                <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-cyan-500/40 transition-all cursor-pointer group h-full">
                                    <Calculator className="w-8 h-8 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-lg font-medium text-white mb-2">Bundle Savings</h3>
                                    <p className="text-sm text-slate-400 mb-4">Understand per-liter savings when buying 4L or 9L</p>
                                    <span className="text-cyan-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Compare Savings <ArrowRight className="w-4 h-4" />
                                    </span>
                                </Card>
                            </Link>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <Link href="/how-to-use-andara">
                                <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-violet-500/40 transition-all cursor-pointer group h-full">
                                    <BookOpen className="w-8 h-8 text-violet-500 mb-4 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-lg font-medium text-white mb-2">How Andara Works</h3>
                                    <p className="text-sm text-slate-400 mb-4">The full water conditioning explanation</p>
                                    <span className="text-violet-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Learn More <ArrowRight className="w-4 h-4" />
                                    </span>
                                </Card>
                            </Link>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* SECTION 8: SAFETY FIREWALL */}
            <section className="py-16 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-3xl mx-auto">
                    <FadeIn>
                        <Card className="p-8 bg-slate-900/40 border border-amber-500/20 rounded-xl">
                            <div className="flex items-start gap-4">
                                <Shield className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-xl font-medium text-white mb-4">Clear Boundaries – What We Do and Don't Promise</h3>
                                    <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
                                        <p>
                                            Andara Ionic Pure is designed for <strong className="text-white">water clarification and conditioning</strong>.
                                            It is not a medical product, and it does not replace personal responsibility, professional diagnosis or treatment.
                                        </p>
                                        <ul className="list-disc list-inside space-y-1 ml-2">
                                            <li>We talk exclusively about water quality, clarification, conditioning and structure</li>
                                            <li>We do not claim that Andara treats, cures or prevents any disease</li>
                                            <li>All descriptions remain in the domain of terrain thinking and water behaviour</li>
                                        </ul>
                                        <p className="text-amber-200/80 pt-2">
                                            For any health questions, please consult qualified practitioners.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 9: FAQ */}
            <section className="py-20 bg-[#05060b] border-t border-white/5">
                <div className="container px-4 max-w-3xl mx-auto">
                    <FadeIn>
                        <h2 className="text-2xl font-light text-white mb-10 text-center">Frequently Asked Questions</h2>
                    </FadeIn>

                    <div className="space-y-4">
                        {[
                            {
                                q: "Can I drink Andara concentrate directly?",
                                a: "No. Always dilute Andara Ionic Pure into neutral water as described."
                            },
                            {
                                q: "Do I need a filter before using Andara?",
                                a: "We recommend starting with neutral, good-quality water (filtered or spring), so Andara supports clarification and structuring on a clear base."
                            },
                            {
                                q: "How long does 1 L last?",
                                a: "Depends on your dilution and household size. At 1 ml per 1 L, 1 L can theoretically condition up to 1,000 liters of water. For families or studios, this can cover weeks or months of daily use."
                            },
                            {
                                q: "Is this a supplement?",
                                a: "No, Andara Ionic Pure is intended as a water clarification and conditioning concentrate, not as a nutritional supplement or therapy."
                            }
                        ].map((item, i) => (
                            <FadeIn key={i} delay={i * 0.05}>
                                <Card className="p-6 bg-slate-900/50 border border-white/5 hover:bg-slate-900 transition-colors">
                                    <h3 className="font-medium text-amber-50 text-sm mb-2 flex items-center gap-2">
                                        <HelpCircle className="w-4 h-4 text-amber-500/50" /> {item.q}
                                    </h3>
                                    <p className="text-slate-400 text-sm pl-6 leading-relaxed">{item.a}</p>
                                </Card>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-16 bg-gradient-to-b from-[#05060b] to-[#020617] border-t border-white/5">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <FadeIn>
                        <Link href="/shop">
                            <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold text-lg transition-all shadow-lg shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-500/30 flex items-center gap-3 mx-auto">
                                Shop Andara Ionic <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </StandardPageLayout>
    );
}
