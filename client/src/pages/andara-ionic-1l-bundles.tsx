import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
    ArrowRight,
    Users,
    Home,
    Building2,
    Sparkles,
    Coffee,
    Heart,
    Shield,
    Calculator,
    BookOpen,
    CheckCircle2,
    Layers,
    Droplets,
    Clock,
    Scale
} from 'lucide-react';
import StandardPageLayout from '@/components/StandardPageLayout';
import { Card } from '@/components/ui/card';
import { FadeIn, StaggerContainer } from '@/components/animations';

export default function AndaraIonic1lBundlesPage() {
    return (
        <StandardPageLayout
            title="Andara Ionic 1 L Bundles"
            subtitle="For Families, Studios & Pro Setups"
            heroVariant="amber"
            seoTitle="Andara Ionic 1 L Bundles – Family & Pro Water Conditioning"
            seoDescription="Discover Andara Ionic 1 L bundles for homes, practitioners and retreats. Scale your water clarification and conditioning with bundle pricing, predictable sulfate ranges and flexible use."
        >

            {/* SECTION 1: HERO - WHY BUNDLES EXIST */}
            <section className="py-20 bg-gradient-to-b from-[#0a0c14] to-[#05060b] relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-light text-white mb-6 text-center">
                            One Water Philosophy – <span className="andara-text-gold-gradient">Enough Volume for Everyone</span>
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-32 mx-auto mb-10" />
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="max-w-3xl mx-auto text-center">
                            <p className="text-lg text-slate-300 leading-relaxed mb-8">
                                Andara Ionic 1 L Bundles are for people who say:<br />
                                <span className="italic text-amber-200">"This is the water I want around me – not just once, but every day, for everyone."</span>
                            </p>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                Instead of treating Andara as a one-time experiment, the bundles turn your bottle into a <strong className="text-white">central water system</strong> for:
                            </p>
                        </div>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
                        <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/40 transition-all duration-300 shadow-lg text-center">
                            <Home className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                            <h3 className="font-medium text-white mb-2">Families</h3>
                            <p className="text-sm text-slate-400">Who drink from the same daily water station</p>
                        </Card>
                        <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-cyan-500/40 transition-all duration-300 shadow-lg text-center">
                            <Users className="w-8 h-8 text-cyan-500 mx-auto mb-4" />
                            <h3 className="font-medium text-white mb-2">Studios</h3>
                            <p className="text-sm text-slate-400">Who offer sessions and classes</p>
                        </Card>
                        <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-violet-500/40 transition-all duration-300 shadow-lg text-center">
                            <Building2 className="w-8 h-8 text-violet-500 mx-auto mb-4" />
                            <h3 className="font-medium text-white mb-2">Retreats</h3>
                            <p className="text-sm text-slate-400">That host many guests over many days</p>
                        </Card>
                    </StaggerContainer>

                    <FadeIn delay={0.3}>
                        <p className="text-center text-slate-400 mt-10 max-w-2xl mx-auto">
                            You pick the bundle that matches your life, flow and volume – from a simple home setup to a full professional water bar.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 2: BUNDLE TYPES - CLEAR OVERVIEW */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="absolute inset-0 bg-[url('/hex-grid-bg.svg')] opacity-[0.03] bg-repeat pointer-events-none" />
                <div className="container px-4 max-w-6xl mx-auto relative">
                    <FadeIn>
                        <h2 className="text-3xl font-light text-white mb-4 text-center">Choose Your 1 L Bundle</h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                    </FadeIn>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* HOME & STARTER */}
                        <motion.div
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-1 rounded-2xl bg-gradient-to-br from-emerald-500/30 via-slate-800/50 to-emerald-500/30 shadow-lg shadow-emerald-900/20"
                        >
                            <div className="p-8 rounded-xl bg-[#080a14]/95 backdrop-blur-xl h-full flex flex-col border border-white/5">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-xs text-emerald-400 font-bold uppercase tracking-wider mb-4 self-start">
                                    <Sparkles className="w-3 h-3" /> Starter
                                </div>
                                <h3 className="text-2xl font-light text-white mb-2">Home & Starter</h3>
                                <p className="text-emerald-400 font-mono text-sm mb-6">2 × 1 L</p>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                    For conscious homes and small teams. One bottle can be "live in use", the other as backup. Great for testing different dilution styles.
                                </p>
                                <div className="border-t border-white/5 pt-6 mb-6">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Use this if you:</p>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start gap-2 text-slate-300"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Are just starting with Andara</li>
                                        <li className="flex items-start gap-2 text-slate-300"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Want enough volume to feel relaxed</li>
                                        <li className="flex items-start gap-2 text-slate-300"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Prefer a second bottle ready to go</li>
                                    </ul>
                                </div>
                                <Link href="/products/andara-ionic-1l">
                                    <button className="w-full px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm transition-colors font-bold flex items-center justify-center gap-2">
                                        View Starter Bundle <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* FAMILY BUNDLE */}
                        <motion.div
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-1 rounded-2xl bg-gradient-to-br from-amber-500/40 via-slate-800/50 to-amber-500/40 shadow-lg shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-500/40"
                        >
                            <div className="p-8 rounded-xl bg-[#080a14]/95 backdrop-blur-xl h-full flex flex-col border border-white/5">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/30 border border-amber-500/40 text-xs text-amber-400 font-bold uppercase tracking-wider mb-4 self-start animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                                    <Layers className="w-3 h-3" /> Recommended
                                </div>
                                <h3 className="text-2xl font-light text-white mb-2">Family Bundle</h3>
                                <p className="text-amber-400 font-mono text-sm mb-6">4 × 1 L <span className="text-slate-500">(3+1 feeling)</span></p>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                    For families, co-living, or small studios. One central idea: everyone drinks from a coherent water system. Economical per liter.
                                </p>
                                <div className="border-t border-white/5 pt-6 mb-6">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Use this if you:</p>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start gap-2 text-slate-300"><CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" /> Have multiple people in one home</li>
                                        <li className="flex items-start gap-2 text-slate-300"><CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" /> Keep one bottle at the main station</li>
                                        <li className="flex items-start gap-2 text-slate-300"><CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" /> Cover weeks or months without reordering</li>
                                    </ul>
                                </div>
                                <Link href="/products/andara-ionic-1l">
                                    <button className="w-full px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm transition-colors font-bold flex items-center justify-center gap-2">
                                        View Family Bundle <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* PRO BUNDLE */}
                        <motion.div
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-1 rounded-2xl bg-gradient-to-br from-cyan-500/40 via-slate-800/50 to-cyan-500/40 shadow-lg shadow-cyan-900/30 hover:shadow-xl hover:shadow-cyan-500/40"
                        >
                            <div className="p-8 rounded-xl bg-[#080a14]/95 backdrop-blur-xl h-full flex flex-col border border-white/5">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/40 text-xs text-cyan-400 font-bold uppercase tracking-wider mb-4 self-start animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                                    <Building2 className="w-3 h-3" /> Professional
                                </div>
                                <h3 className="text-2xl font-light text-white mb-2">Pro Bundle</h3>
                                <p className="text-cyan-400 font-mono text-sm mb-6">9 × 1 L <span className="text-slate-500">(Retreat & Practice)</span></p>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                    For professionals who hold space for many people. Retreat centers, yoga studios, healing spaces, spas. Turns Andara into part of your infrastructure.
                                </p>
                                <div className="border-t border-white/5 pt-6 mb-6">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Use this if you:</p>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start gap-2 text-slate-300"><CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" /> Host people regularly</li>
                                        <li className="flex items-start gap-2 text-slate-300"><CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" /> Need volume that feels abundant</li>
                                        <li className="flex items-start gap-2 text-slate-300"><CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" /> Want bundle value for long-term ops</li>
                                    </ul>
                                </div>
                                <Link href="/products/andara-ionic-1l">
                                    <button className="w-full px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm transition-colors font-bold flex items-center justify-center gap-2">
                                        View Pro Bundle <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: WHY BUNDLES ARE MORE THAN "MORE BOTTLES" */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-light text-white mb-4 text-center">
                            Bundles = <span className="andara-text-gold-gradient">Stability, Rhythm & Per-Liter Clarity</span>
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-12" />
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="prose prose-invert prose-slate max-w-none text-center mb-12">
                            <p className="text-lg text-slate-300 leading-relaxed">
                                The point of the 1 L Bundles is not only "more product".<br />
                                It is about <strong className="text-white">stability</strong>:
                            </p>
                        </div>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/30 transition-all shadow-lg text-center">
                            <Droplets className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                            <h3 className="font-medium text-white mb-2">Define Once</h3>
                            <p className="text-sm text-slate-400">You set your dilution logic once and use the same sulfate logic day after day</p>
                        </Card>
                        <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/30 transition-all shadow-lg text-center">
                            <Clock className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                            <h3 className="font-medium text-white mb-2">Predictable Routines</h3>
                            <p className="text-sm text-slate-400">Always the same method, less confusion, consistent water feel</p>
                        </Card>
                        <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/30 transition-all shadow-lg text-center">
                            <Scale className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                            <h3 className="font-medium text-white mb-2">Per-Liter Thinking</h3>
                            <p className="text-sm text-slate-400">You understand what each glass costs and carries</p>
                        </Card>
                    </StaggerContainer>

                    <FadeIn delay={0.2}>
                        <p className="text-center text-slate-400 max-w-2xl mx-auto">
                            Your bundle savings and per-liter price labels in the shop can show the exact numbers – this page explains the philosophy behind it.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 4: USE SCENARIOS */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-light text-white mb-4 text-center">Real-Life Use Cases for 1 L Bundles</h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                    </FadeIn>

                    <div className="space-y-8">
                        {/* Conscious Family Kitchen */}
                        <FadeIn>
                            <Card className="p-8 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/30 transition-all shadow-lg">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0">
                                        <Home className="w-8 h-8 text-amber-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-white mb-3">Conscious Family Kitchen</h3>
                                        <ul className="space-y-2 text-slate-400 text-sm">
                                            <li>• 10 L glass dispenser on the counter</li>
                                            <li>• One daily mixing ritual in the morning</li>
                                            <li>• Everyone drinks from the same clarified, structured water</li>
                                            <li>• The bundle ensures there is always another bottle ready when one runs low</li>
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        </FadeIn>

                        {/* Studio or Practice Space */}
                        <FadeIn delay={0.1}>
                            <Card className="p-8 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-cyan-500/30 transition-all shadow-lg">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                                        <Users className="w-8 h-8 text-cyan-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-white mb-3">Studio or Practice Space</h3>
                                        <ul className="space-y-2 text-slate-400 text-sm">
                                            <li>• Water station in the waiting area</li>
                                            <li>• Clients drink before or after their session</li>
                                            <li>• You can host small groups, circles or classes</li>
                                            <li>• Andara becomes part of the space signature – how the place feels</li>
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        </FadeIn>

                        {/* Retreat & Seminar Center */}
                        <FadeIn delay={0.2}>
                            <Card className="p-8 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-violet-500/30 transition-all shadow-lg">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center shrink-0">
                                        <Building2 className="w-8 h-8 text-violet-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-white mb-3">Retreat & Seminar Center</h3>
                                        <ul className="space-y-2 text-slate-400 text-sm">
                                            <li>• Large containers in the kitchen for food and drinks</li>
                                            <li>• Separate containers for guest room refills</li>
                                            <li>• Water stays coherent across the whole property</li>
                                            <li>• The Pro Bundle gives you the volume to hold many guests over multiple retreats</li>
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* SECTION 5: CLARIFICATION */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    <FadeIn>
                        <h2 className="text-3xl font-light text-white mb-4">We Keep the Bundle Logic Simple</h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-10" />
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <p className="text-lg text-slate-300 leading-relaxed mb-8">
                            Even though you can calculate every last drop in the <Link href="/andara-dilution-calculator" className="text-amber-400 hover:underline">Andara Dilution Calculator</Link>, the emotional logic is simple:
                        </p>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <Card className="p-6 bg-slate-900/50 border border-white/5 text-center">
                            <Heart className="w-6 h-6 text-amber-500 mx-auto mb-3" />
                            <p className="text-sm text-slate-300">One water philosophy across all rooms</p>
                        </Card>
                        <Card className="p-6 bg-slate-900/50 border border-white/5 text-center">
                            <Droplets className="w-6 h-6 text-amber-500 mx-auto mb-3" />
                            <p className="text-sm text-slate-300">Enough volume to live that philosophy every day</p>
                        </Card>
                        <Card className="p-6 bg-slate-900/50 border border-white/5 text-center">
                            <Scale className="w-6 h-6 text-amber-500 mx-auto mb-3" />
                            <p className="text-sm text-slate-300">Bundle value so it feels natural to stay long-term</p>
                        </Card>
                    </StaggerContainer>

                    <FadeIn delay={0.2}>
                        <p className="text-slate-400">
                            You don't need to juggle different brands, bottles or promises. You commit to one clear mineral logic – and the bundles support that.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 6: SAFETY FIREWALL */}
            <section className="py-16 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-3xl mx-auto">
                    <FadeIn>
                        <Card className="p-8 bg-slate-900/40 border border-amber-500/20 rounded-xl">
                            <div className="flex items-start gap-4">
                                <Shield className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-xl font-medium text-white mb-4">Always Within the Water & Terrain Framework</h3>
                                    <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
                                        <p>As with all Andara pages:</p>
                                        <ul className="list-disc list-inside space-y-1 ml-2">
                                            <li>We speak about water behaviour, structure and terrain logic</li>
                                            <li>We don't promise medical outcomes</li>
                                            <li>We encourage you to think in terms of whole terrain: water, minerals, light, movement, rest</li>
                                        </ul>
                                        <p className="pt-2">
                                            The bundles do not change that principle; they only give you enough concentrate to live this terrain view in a continuous way.
                                        </p>
                                        <p className="text-amber-200/80 pt-2">
                                            For any questions about health, diagnosis or treatment, always refer to trusted professionals. Andara stays in the water & mineral domain.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 7: CROSS-LINKS & CTAs */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-light text-white mb-4 text-center">Choose Your Bundle & Explore the Library</h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Compare the Numbers */}
                        <FadeIn>
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/30 transition-all">
                                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                                    <Calculator className="w-5 h-5 text-amber-500" />
                                    Compare the Numbers
                                </h3>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/compare-bundles" className="text-amber-400 hover:underline text-sm flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4" /> Compare Bundles – Liter Pricing & Savings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/andara-dilution-calculator" className="text-amber-400 hover:underline text-sm flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4" /> Andara Dilution Calculator
                                        </Link>
                                    </li>
                                </ul>
                            </Card>
                        </FadeIn>

                        {/* Understand the Product */}
                        <FadeIn delay={0.1}>
                            <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-cyan-500/30 transition-all">
                                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                                    <Droplets className="w-5 h-5 text-cyan-500" />
                                    Understand the Product
                                </h3>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/products/andara-ionic-1l" className="text-cyan-400 hover:underline text-sm flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4" /> Andara Ionic Pure – 1 L Product Page
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/how-to-use-andara" className="text-cyan-400 hover:underline text-sm flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4" /> How to Use Andara
                                        </Link>
                                    </li>
                                </ul>
                            </Card>
                        </FadeIn>
                    </div>

                    {/* Deepen the Science */}
                    <FadeIn delay={0.2}>
                        <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-violet-500/30 transition-all mb-12">
                            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-violet-500" />
                                Deepen the Science
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link href="/science/water-science-master" className="text-violet-400 hover:underline text-sm flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4" /> Structured Water Basics
                                </Link>
                                <Link href="/science/sulfate-chemistry" className="text-violet-400 hover:underline text-sm flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4" /> Sulfate Chemistry – Why Sulfate Matters
                                </Link>
                            </div>
                        </Card>
                    </FadeIn>

                    {/* Primary CTA */}
                    <FadeIn delay={0.3}>
                        <div className="text-center">
                            <Link href="/shop">
                                <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold text-lg transition-all shadow-lg shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-500/30 flex items-center gap-3 mx-auto">
                                    Choose Your 1 L Bundle <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </StandardPageLayout>
    );
}

