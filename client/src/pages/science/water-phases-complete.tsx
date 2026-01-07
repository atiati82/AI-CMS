import { Link } from 'wouter';
import {
    Snowflake,
    Droplets,
    Wind,
    Sparkles,
    ArrowRight,
    ArrowDown,
    Hexagon,
    Zap,
    Waves,
    Layers,
    Sun,
    Activity,
    Leaf,
    Users,
    BookOpen
} from 'lucide-react';
import StandardPageLayout from '@/components/StandardPageLayout';
import { Card } from '@/components/ui/card';
import { FadeIn, StaggerContainer } from '@/components/animations';
import { motion } from 'framer-motion';

export default function WaterPhasesCompletePage() {
    return (
        <StandardPageLayout
            title={<>Water Phases – Solid, Liquid, Gas & <span className="text-cyan-400">the Fourth Phase</span></>}
            subtitle="Understanding the operating system of life through water's states"
            heroVariant="cyan"
            heroIcon={Waves}
            seoTitle="Water Phases – Solid, Liquid, Gas & the Fourth Phase | Andara Science"
            seoDescription="Explore water's phases beyond the basics: solid ice, liquid water, gaseous steam, and the mysterious Fourth Phase (EZ water) that forms at interfaces and powers life."
        >

            {/* SECTION 1: WHY PHASES MATTER */}
            <section className="py-20 bg-gradient-to-b from-[#0a0c14] to-[#05060b] relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-light text-white mb-6 text-center">
                            Why Water's Phases Matter <span className="andara-text-gold-gradient">More Than We Learned in School</span>
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent w-32 mx-auto mb-10" />
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="max-w-3xl mx-auto">
                            <p className="text-lg text-slate-300 leading-relaxed mb-6 text-center">
                                Most of us learned a very simple story in school:<br />
                                <span className="text-cyan-400 font-mono">Ice = solid | Water = liquid | Steam = gas</span><br />
                                <span className="italic text-slate-400">End of story.</span>
                            </p>
                            <p className="text-slate-400 leading-relaxed mb-8 text-center">
                                In reality, water behaves far more mysteriously.
                            </p>
                        </div>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
                        <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-cyan-500/40 transition-all duration-300 shadow-lg">
                            <Layers className="w-8 h-8 text-cyan-500 mb-4" />
                            <p className="text-sm text-slate-300">It can <strong className="text-white">store information</strong> in its structure</p>
                        </Card>
                        <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-violet-500/40 transition-all duration-300 shadow-lg">
                            <Zap className="w-8 h-8 text-violet-500 mb-4" />
                            <p className="text-sm text-slate-300">It changes its inner order when it meets a <strong className="text-white">surface, charge, or light</strong></p>
                        </Card>
                        <Card className="p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-amber-500/40 transition-all duration-300 shadow-lg">
                            <Hexagon className="w-8 h-8 text-amber-500 mb-4" />
                            <p className="text-sm text-slate-300">A <strong className="text-white">Fourth Phase</strong> appears: a gel-like state called EZ water</p>
                        </Card>
                    </StaggerContainer>

                    <FadeIn delay={0.3}>
                        <p className="text-center text-amber-200/80 mt-10 max-w-2xl mx-auto italic">
                            Understanding these phases is like opening the operating system of life.<br />
                            Your cells, plants, soil, and atmosphere all depend on how water moves between these states.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 2: THREE CLASSICAL PHASES */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-6xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-light text-white mb-4 text-center">
                            The Three Classical Phases
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent w-24 mx-auto mb-16" />
                    </FadeIn>

                    <div className="space-y-16">
                        {/* SOLID */}
                        <FadeIn>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-500/20 text-xs text-blue-400 font-bold uppercase tracking-wider mb-6">
                                        <Snowflake className="w-3 h-3" /> Solid Phase
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-4">Ice: Frozen Geometry</h3>
                                    <p className="text-slate-300 leading-relaxed mb-6">
                                        When water turns to ice, molecules lock into a <strong className="text-blue-300">crystalline lattice</strong>. They arrange in a hexagonal pattern, creating open space between molecules. This is why ice floats – it's less dense than liquid water.
                                    </p>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li className="flex items-start gap-2">
                                            <Snowflake className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                                            <span>Stabilizes climate (polar ice caps, glaciers)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Snowflake className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                                            <span>Acts as a memory layer (ice cores store history)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Snowflake className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                                            <span>Protects life in lakes by forming insulating cover</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="relative">
                                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-900/30 via-slate-900 to-blue-900/20 border border-blue-500/20 flex items-center justify-center">
                                        <Snowflake className="w-32 h-32 text-blue-400/30" />
                                        <div className="absolute bottom-6 left-6 right-6 text-center">
                                            <span className="text-xs font-mono text-blue-400 bg-black/60 px-3 py-1 rounded-full">HEXAGONAL LATTICE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* LIQUID */}
                        <FadeIn delay={0.1}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                                <div className="md:order-2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/20 border border-cyan-500/20 text-xs text-cyan-400 font-bold uppercase tracking-wider mb-6">
                                        <Droplets className="w-3 h-3" /> Liquid Phase
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-4">The Everyday Mystery</h3>
                                    <p className="text-slate-300 leading-relaxed mb-6">
                                        Liquid water is where most of life happens. Molecules are close together, but constantly moving. Hydrogen bonds form, break, and reform <strong className="text-cyan-300">trillions of times per second</strong>.
                                    </p>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li className="flex items-start gap-2">
                                            <Droplets className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                                            <span><strong className="text-white">Cohesion</strong> – water sticks to itself (drops, surface tension)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Droplets className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                                            <span><strong className="text-white">Adhesion</strong> – water sticks to surfaces (capillary action)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Droplets className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                                            <span><strong className="text-white">Solvent power</strong> – dissolves minerals, gases, organics</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="md:order-1 relative">
                                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-cyan-900/30 via-slate-900 to-cyan-900/20 border border-cyan-500/20 flex items-center justify-center">
                                        <Droplets className="w-32 h-32 text-cyan-400/30" />
                                        <div className="absolute bottom-6 left-6 right-6 text-center">
                                            <span className="text-xs font-mono text-cyan-400 bg-black/60 px-3 py-1 rounded-full">DYNAMIC CLUSTERS</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* GAS */}
                        <FadeIn delay={0.2}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-900/20 border border-violet-500/20 text-xs text-violet-400 font-bold uppercase tracking-wider mb-6">
                                        <Wind className="w-3 h-3" /> Gas Phase
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-4">Invisible but Powerful</h3>
                                    <p className="text-slate-300 leading-relaxed mb-6">
                                        When water becomes steam or vapor, molecules move far apart with high kinetic energy. This phase carries <strong className="text-violet-300">huge amounts of latent heat</strong> and shapes clouds, weather, storms and climate.
                                    </p>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li className="flex items-start gap-2">
                                            <Wind className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                                            <span><strong className="text-white">Heat transport</strong> – moves energy around the planet</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Wind className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                                            <span><strong className="text-white">Temperature buffering</strong> – humid air cools more slowly</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Wind className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                                            <span><strong className="text-white">Information carrier</strong> – carries particles and aerosols</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="relative">
                                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-violet-900/30 via-slate-900 to-violet-900/20 border border-violet-500/20 flex items-center justify-center">
                                        <Wind className="w-32 h-32 text-violet-400/30" />
                                        <div className="absolute bottom-6 left-6 right-6 text-center">
                                            <span className="text-xs font-mono text-violet-400 bg-black/60 px-3 py-1 rounded-full">HIGH ENERGY DISPERSION</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* SECTION 3: PHASE TRANSITIONS */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-light text-white mb-4 text-center">
                            Phase Transitions – <span className="andara-text-gold-gradient">Where the Magic Happens</span>
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-6" />
                        <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
                            Transitions between phases are not just on/off switches; they are thresholds where water reorders its internal structure.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <Card className="p-8 bg-slate-900/60 backdrop-blur-xl border border-white/5 mb-10">
                            <h3 className="text-lg font-medium text-white mb-6 text-center">Water Reacts Strongly To:</h3>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                                {[
                                    { label: 'Pressure', icon: Activity },
                                    { label: 'Temperature', icon: Sun },
                                    { label: 'EM Fields', icon: Zap },
                                    { label: 'Solutes', icon: Droplets },
                                    { label: 'Surfaces', icon: Layers }
                                ].map((item, i) => (
                                    <div key={i} className="p-4 rounded-lg bg-slate-800/50 border border-white/5">
                                        <item.icon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                                        <span className="text-xs text-slate-300">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { from: 'Solid', to: 'Liquid', name: 'Melting', color: 'blue' },
                            { from: 'Liquid', to: 'Solid', name: 'Freezing', color: 'cyan' },
                            { from: 'Liquid', to: 'Gas', name: 'Evaporation', color: 'violet' },
                            { from: 'Gas', to: 'Liquid', name: 'Condensation', color: 'purple' },
                            { from: 'Solid', to: 'Gas', name: 'Sublimation', color: 'indigo' },
                            { from: 'Gas', to: 'Solid', name: 'Deposition', color: 'blue' }
                        ].map((t, i) => (
                            <Card key={i} className="p-4 bg-slate-900/40 border border-white/5 text-center">
                                <div className="text-xs text-slate-500 mb-2">{t.from} → {t.to}</div>
                                <div className={`font-medium text-${t.color}-400`}>{t.name}</div>
                            </Card>
                        ))}
                    </StaggerContainer>

                    <FadeIn delay={0.3}>
                        <p className="text-center text-slate-400 mt-10 max-w-2xl mx-auto text-sm italic">
                            Every transition is a re-coding of structure: the distances between molecules, their angles, and their collective behavior all shift.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 4: THE FOURTH PHASE */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="absolute inset-0 bg-[url('/hex-grid-bg.svg')] opacity-[0.03] bg-repeat pointer-events-none" />
                <div className="container px-4 max-w-5xl mx-auto relative">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-900/20 border border-amber-500/20 text-sm text-amber-400 font-bold uppercase tracking-wider mb-6 mx-auto block w-fit">
                            <Sparkles className="w-4 h-4" /> The Fourth Phase
                        </div>
                        <h2 className="text-3xl font-light text-white mb-4 text-center">
                            EZ Water at <span className="andara-text-gold-gradient">Interfaces</span>
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-6" />
                        <p className="text-center text-slate-300 mb-16 max-w-2xl mx-auto">
                            Between ordinary liquid water and ice, researchers like <strong className="text-white">Dr. Gerald Pollack</strong> describe a Fourth Phase – often called <span className="text-amber-400">EZ Water</span> (Exclusion Zone water).
                        </p>
                    </FadeIn>

                    {/* Key Properties */}
                    <FadeIn delay={0.1}>
                        <h3 className="text-xl font-medium text-white mb-6 text-center">Key Properties of EZ Water</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                            {[
                                { title: 'More Ordered', desc: 'Molecules arrange in quasi-crystalline layers', icon: Hexagon, color: 'amber' },
                                { title: 'Negative Charge', desc: 'EZ water tends to hold more electrons', icon: Zap, color: 'cyan' },
                                { title: 'Excludes Solutes', desc: 'Particles are pushed out of the zone', icon: Layers, color: 'violet' },
                                { title: 'Creates Voltage', desc: 'Forms a voltage difference with bulk water', icon: Activity, color: 'emerald' }
                            ].map((prop, i) => (
                                <Card key={i} className={`p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-${prop.color}-500/40 transition-all`}>
                                    <prop.icon className={`w-8 h-8 text-${prop.color}-500 mb-4`} />
                                    <h4 className="font-medium text-white mb-2">{prop.title}</h4>
                                    <p className="text-sm text-slate-400">{prop.desc}</p>
                                </Card>
                            ))}
                        </div>
                    </FadeIn>

                    {/* How EZ Forms */}
                    <FadeIn delay={0.2}>
                        <Card className="p-8 bg-gradient-to-br from-amber-900/10 via-slate-900 to-amber-900/10 border border-amber-500/20 mb-16">
                            <h3 className="text-xl font-medium text-amber-400 mb-6 text-center">How EZ Water Forms</h3>
                            <p className="text-center text-slate-400 mb-8">EZ water tends to arise when three conditions meet:</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                                        <span className="text-xl font-bold text-amber-500">1</span>
                                    </div>
                                    <h4 className="font-medium text-white mb-2">Hydrophilic Surface</h4>
                                    <p className="text-sm text-slate-400">Collagen, cell membranes, certain minerals, glass, gels</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                                        <span className="text-xl font-bold text-amber-500">2</span>
                                    </div>
                                    <h4 className="font-medium text-white mb-2">Energy Input</h4>
                                    <p className="text-sm text-slate-400">Infrared light, visible light, mechanical or electrical fields</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                                        <span className="text-xl font-bold text-amber-500">3</span>
                                    </div>
                                    <h4 className="font-medium text-white mb-2">Water to Reorganize</h4>
                                    <p className="text-sm text-slate-400">Relatively clean water with space to restructure</p>
                                </div>
                            </div>
                            <p className="text-center text-amber-200/80 mt-8 italic">
                                Light + Surface + Water = a local region where order and charge separation increase.
                            </p>
                        </Card>
                    </FadeIn>

                    {/* Why It Matters */}
                    <FadeIn delay={0.3}>
                        <div className="max-w-3xl mx-auto text-center">
                            <h3 className="text-xl font-medium text-white mb-6">Why the Fourth Phase Matters for Life</h3>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                In biological systems, EZ-like water layers coat cell membranes and proteins, help create charge separation (a kind of tiny battery), and influence nutrient transport, waste removal, signal transmission, and mechanical flexibility of tissues.
                            </p>
                            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-xl">
                                <p className="text-lg text-amber-200 italic">
                                    "Where life organizes, water organizes."
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 5: MINERALS & INTERFACES */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-light text-white mb-4 text-center">
                            Phases, Minerals & Interfaces
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent w-24 mx-auto mb-10" />
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="prose prose-invert prose-slate max-w-none text-center mb-12">
                            <p className="text-slate-300 leading-relaxed">
                                Water rarely exists alone. It's almost always carrying minerals and ions, in contact with proteins, membranes, gels, soil, rock, and exposed to light and electromagnetic fields.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FadeIn>
                            <Card className="p-8 bg-slate-900/60 backdrop-blur-xl border border-white/5 h-full">
                                <h3 className="text-lg font-medium text-cyan-400 mb-4">Classical Phases</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Solid, liquid, and gas are the <strong className="text-white">framework</strong> – the large-scale states we can see and measure easily.
                                </p>
                            </Card>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <Card className="p-8 bg-slate-900/60 backdrop-blur-xl border border-white/5 h-full">
                                <h3 className="text-lg font-medium text-amber-400 mb-4">Fourth Phase</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    EZ water is the <strong className="text-white">fine-tuning</strong> – water reorganizing itself at surfaces to support life, flow and information.
                                </p>
                            </Card>
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.2}>
                        <p className="text-center text-slate-400 mt-10 max-w-2xl mx-auto text-sm">
                            Minerals (especially charged ions like sulfates, magnesium, etc.) change how water organizes around them, how easily EZ layers form, and how charges and proton gradients build up.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 6: EVERYDAY EXAMPLES */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-light text-white mb-4 text-center">
                            Everyday Examples of <span className="andara-text-gold-gradient">Water Phase Intelligence</span>
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: 'Snow & Frost Patterns', desc: 'Show how ice captures fields and conditions in visible geometry', icon: Snowflake, color: 'blue' },
                            { title: 'Fog & Clouds', desc: 'Gas-phase water showing how it holds light, color, and temperature', icon: Wind, color: 'violet' },
                            { title: 'Gel-like Tissues', desc: 'Cartilage, fascia, cytoplasm all behave as soft, water-rich gels', icon: Users, color: 'cyan' },
                            { title: 'Dew on Leaves', desc: 'Thin films of water at interfaces where Fourth Phase may appear', icon: Leaf, color: 'emerald' }
                        ].map((ex, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <Card className={`p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-${ex.color}-500/40 transition-all flex gap-4`}>
                                    <div className={`w-12 h-12 rounded-xl bg-${ex.color}-500/10 flex items-center justify-center shrink-0`}>
                                        <ex.icon className={`w-6 h-6 text-${ex.color}-500`} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white mb-2">{ex.title}</h3>
                                        <p className="text-sm text-slate-400">{ex.desc}</p>
                                    </div>
                                </Card>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn delay={0.4}>
                        <div className="mt-12 p-6 bg-slate-900/50 border border-white/5 rounded-xl text-center max-w-2xl mx-auto">
                            <p className="text-slate-300 leading-relaxed">
                                <strong className="text-amber-200">Water is not just "wet".</strong><br />
                                It is a dynamic architect, switching between phases and sub-phases to keep energy, information and structure moving.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 7: CROSS-LINKS */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <h2 className="text-3xl font-light text-white mb-4 text-center">
                            Explore the <span className="andara-text-gold-gradient">Science Library</span>
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-24 mx-auto mb-16" />
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: 'Structured Water Basics', desc: 'A deeper look at ordering in the liquid phase', href: '/science/water-science-master', icon: Waves, color: 'cyan' },
                            { title: 'EZ Water – The Fourth Phase', desc: 'Extended dive into Pollack-style structured water', href: '/science/ez-water-overview', icon: Sparkles, color: 'amber' },
                            { title: 'Hexagonal Water Structures', desc: 'Geometry and symmetry in frozen and near-frozen states', href: '/science/hexagonal-water', icon: Hexagon, color: 'violet' },
                            { title: 'Magnetics & Water', desc: 'How fields interact with phases and structuring', href: '/science/magnetics-fields', icon: Zap, color: 'emerald' }
                        ].map((link, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <Link href={link.href}>
                                    <Card className={`p-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 hover:border-${link.color}-500/40 transition-all cursor-pointer group`}>
                                        <div className="flex items-center gap-4">
                                            <link.icon className={`w-8 h-8 text-${link.color}-500 group-hover:scale-110 transition-transform`} />
                                            <div>
                                                <h3 className="font-medium text-white mb-1">{link.title}</h3>
                                                <p className="text-sm text-slate-400">{link.desc}</p>
                                            </div>
                                            <ArrowRight className={`w-5 h-5 text-${link.color}-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity`} />
                                        </div>
                                    </Card>
                                </Link>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn delay={0.4}>
                        <p className="text-center text-slate-500 mt-12 max-w-2xl mx-auto text-sm">
                            Some minerals and surfaces appear to support more stable interfaces and EZ-like layers. The Science Library explores this in water, minerals and crystalline matrices, without making any medical promises—only observing how water behaves.
                        </p>
                    </FadeIn>
                </div>
            </section>
        </StandardPageLayout>
    );
}
