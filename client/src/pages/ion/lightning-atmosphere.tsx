/**
 * Lightning & Atmosphere Page
 * /ion/lightning-atmosphere
 * 
 * Earth's High-Voltage Reset Button - Nature's Electrical Reset
 * Features: Lightning bolt animations, charge separation visualization, petrichor chemistry
 */

import React from 'react';
import { motion } from 'framer-motion';
import { IONLayout } from '@/templates/gpt/IONLayout';
import { SmartImage } from '@/components/ui/SmartImage';
import { SmartVideoEmbed } from '@/components/SmartVideoEmbed';
import { Link } from 'wouter';
import {
    ArrowRight,
    Zap,
    Cloud,
    CloudRain,
    Wind,
    Sparkles,
    RefreshCw,
    TreePine,
    Building,
    Activity,
    ThermometerSun,
    TrendingUp,
    HelpCircle,
    type LucideIcon
} from 'lucide-react';
import { IONParticleField } from '@/components/visuals/IONParticleField';
import { IONFieldLines } from '@/components/visuals/IONFieldLines';

// Lightning Bolt Animation
function LightningAnimation() {
    return (
        <div className="relative h-72 rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900/40 to-slate-900">
            {/* Background clouds */}
            <div className="absolute inset-0 opacity-30">
                <motion.div
                    className="absolute top-10 left-10 w-40 h-16 bg-slate-600/50 rounded-full blur-xl"
                    animate={{ x: [0, 20, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-5 right-20 w-32 h-14 bg-slate-600/50 rounded-full blur-xl"
                    animate={{ x: [0, -15, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            {/* Lightning bolt SVG */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                {/* Main lightning bolt */}
                <motion.path
                    d="M100,10 L85,60 L105,60 L80,100 L100,100 L70,180 L95,110 L75,110 L100,70 L80,70 Z"
                    fill="none"
                    stroke="#f5d742"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 1, 0],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                />
                {/* Lightning glow */}
                <motion.path
                    d="M100,10 L85,60 L105,60 L80,100 L100,100 L70,180 L95,110 L75,110 L100,70 L80,70 Z"
                    fill="rgba(245,215,66,0.3)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.8, 0] }}
                    transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3.2 }}
                />
            </svg>

            {/* Flash effect */}
            <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3.3 }}
            />

            {/* Label */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <motion.div
                    className="bg-black/50 backdrop-blur-sm rounded-xl px-4 py-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-amber-300/80 text-sm flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Planetary Electrical Reset
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

// Charge Separation Animation
function ChargeSeparationAnimation() {
    return (
        <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-b from-blue-400/20 via-slate-800 to-slate-900">
            {/* Cloud top (positive) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-slate-600/60 rounded-3xl flex items-center justify-center gap-2">
                {[...Array(8)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="text-red-400 font-bold text-lg"
                        animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                    >
                        +
                    </motion.span>
                ))}
            </div>

            {/* Cloud middle (negative) */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-2/3 h-12 bg-slate-700/60 rounded-2xl flex items-center justify-center gap-2">
                {[...Array(6)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="text-blue-400 font-bold text-lg"
                        animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 + i * 0.15 }}
                    >
                        −
                    </motion.span>
                ))}
            </div>

            {/* Ground (positive) */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-900/40 to-transparent flex items-center justify-center gap-3">
                {[...Array(10)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="text-red-300/60 font-bold text-sm"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
                    >
                        +
                    </motion.span>
                ))}
            </div>

            {/* Labels */}
            <div className="absolute top-2 right-4 text-xs text-red-300/60">−40°C</div>
            <div className="absolute top-24 right-4 text-xs text-blue-300/60">−15°C</div>
        </div>
    );
}

// Effect Card
function EffectCard({
    icon: Icon,
    title,
    items,
    color,
    delay = 0
}: {
    icon: LucideIcon;
    title: string;
    items: string[];
    color: string;
    delay?: number;
}) {
    const colorClasses: Record<string, string> = {
        amber: 'border-amber-500/20 bg-amber-500/5 text-amber-400',
        blue: 'border-blue-500/20 bg-blue-500/5 text-blue-400',
        purple: 'border-purple-500/20 bg-purple-500/5 text-purple-400',
        cyan: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400'
    };

    return (
        <motion.div
            className={`rounded-xl border p-5 ${colorClasses[color]}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            whileHover={{ scale: 1.02 }}
        >
            <Icon className="w-6 h-6 mb-3" />
            <h4 className="font-semibold text-white mb-3">{title}</h4>
            <ul className="space-y-1">
                {items.map((item, i) => (
                    <li key={i} className="text-white/60 text-sm flex items-center gap-2">
                        <Sparkles className="w-3 h-3" />
                        {item}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

// Comparison Card
function EnvironmentCard({
    icon: Icon,
    title,
    items,
    positive,
    delay = 0
}: {
    icon: LucideIcon;
    title: string;
    items: string[];
    positive: boolean;
    delay?: number;
}) {
    return (
        <motion.div
            className={`rounded-xl border p-5 ${positive
                ? 'border-green-500/20 bg-green-500/5'
                : 'border-slate-500/20 bg-slate-500/5'
                }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-5 h-5 ${positive ? 'text-green-400' : 'text-slate-400'}`} />
                <h4 className="font-semibold text-white">{title}</h4>
            </div>
            <ul className="space-y-1">
                {items.map((item, i) => (
                    <li key={i} className="text-white/60 text-sm">• {item}</li>
                ))}
            </ul>
        </motion.div>
    );
}

// FAQ Item
function FAQItem({
    question,
    answer,
    delay = 0
}: {
    question: string;
    answer: string;
    delay?: number;
}) {
    return (
        <motion.div
            className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-semibold text-white mb-2">{question}</h4>
                    <p className="text-white/60 text-sm">{answer}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default function LightningAtmospherePage() {
    const sections = [
        {
            id: 'what-lightning-is',
            headline: 'What Lightning Actually Is',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Lightning is a <strong className="text-amber-300">rapid electrical discharge</strong> between:
                    </p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Cloud and cloud',
                            'Cloud and ground',
                            'Ground and atmosphere'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Zap className="w-4 h-4 text-amber-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/70 mt-4">
                        This discharge occurs when charge separation becomes extreme and nature seeks <strong className="text-cyan-300">equilibrium</strong>.
                    </p>
                    <motion.div
                        className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-purple-200 text-sm">
                            In that moment: temperatures spike, molecules break apart, electrons redistribute, new ions form instantly.
                        </p>
                    </motion.div>
                </div>
            ),
            visual: <LightningAnimation />
        },
        {
            id: 'charge-separation',
            headline: 'How Storms Create Ions',
            content: (
                <div className="space-y-4">
                    <h4 className="text-cyan-300 font-semibold">Charge Separation in Clouds</h4>
                    <p className="text-white/70">Inside storm clouds:</p>
                    <motion.div className="grid gap-2 mt-2">
                        {[
                            'Ice, water droplets, and dust collide',
                            'Charges separate (top positive, bottom negative)',
                            'Electrical tension builds'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-blue-500/10 border border-blue-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Cloud className="w-4 h-4 text-blue-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4 italic">
                        This separation is the <strong className="text-amber-300">battery</strong> of the storm.
                    </p>
                    <h4 className="text-amber-300 font-semibold mt-6">When Discharge Happens</h4>
                    <motion.div className="grid gap-2 mt-2">
                        {[
                            'Electrons surge through air',
                            'Molecules ionize',
                            'Nitrogen and oxygen react',
                            'Short-lived reactive species form'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                            >
                                <Zap className="w-4 h-4 text-amber-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            ),
            visual: <ChargeSeparationAnimation />
        },
        {
            id: 'clean-air-effect',
            headline: 'The "Clean Air After Rain" Effect',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        After storms, people notice:
                    </p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            { text: 'Sharper smells', icon: Wind },
                            { text: 'Easier breathing', icon: Activity },
                            { text: 'Clearer skies', icon: Sparkles }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <item.icon className="w-4 h-4 text-cyan-400" />
                                <span className="text-white/70">{item.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4">
                        Contributing factors: particle aggregation, ion balance restoration, trace oxidant formation (ozone), and removal of stagnant air layers. This is <strong className="text-cyan-300">large-scale air hygiene</strong>.
                    </p>
                </div>
            ),
            visual: (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-cyan-500/20 shadow-2xl">
                    <SmartVideoEmbed
                        keywords={["clean", "rain", "atmosphere", "fresh"]}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-xs text-white/60">Atmospheric Ion Reset</p>
                    </div>
                </div>
            )
        },
        {
            id: 'scientific-diagrams',
            headline: 'Lightning Science Visualized',
            layout: 'full-width' as const,
            content: (
                <div className="grid gap-6 md:grid-cols-2 mt-6">
                    <motion.div
                        className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="font-semibold text-white mb-3">Molecular Formation</h4>
                        <SmartImage
                            registryId="ion-lightning-molecular-formation"
                            className="w-full h-48 object-contain rounded-lg"
                            interaction="reveal"
                        />
                        <p className="text-white/60 text-xs mt-2">
                            Lightning breaks apart N₂, O₂, and H₂O to form NO, ozone, and hydrogen oxides.
                        </p>
                    </motion.div>
                    <motion.div
                        className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="font-semibold text-white mb-3">Charge Distribution</h4>
                        <SmartImage
                            registryId="ion-thundercloud-charge-distribution"
                            className="w-full h-48 object-contain rounded-lg"
                            interaction="reveal"
                        />
                        <p className="text-white/60 text-xs mt-2">
                            Positive (+) at cloud tops, negative (−) in middle, with discharge paths to ground, cloud, and air.
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            id: 'ozone-balance',
            headline: 'Lightning, Ozone & Balance',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Lightning can produce <strong className="text-amber-300">ozone</strong>.
                    </p>
                    <motion.div
                        className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-amber-200 text-sm mb-2"><strong>Key nuance:</strong></p>
                        <ul className="space-y-1 text-white/70 text-sm">
                            <li>• In small, transient amounts → oxidation of pollutants</li>
                            <li>• In high, persistent concentrations → harmful</li>
                        </ul>
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4">
                        Nature creates <strong className="text-cyan-300">brief pulses</strong>, not chronic exposure. Balance, again, is the rule.
                    </p>
                </div>
            )
        },
        {
            id: 'chemical-catalyst',
            headline: 'Lightning as a Chemical Catalyst',
            layout: 'full-width' as const,
            content: (
                <div className="grid gap-4 md:grid-cols-3 mt-6">
                    <EffectCard
                        icon={TrendingUp}
                        title="Nitrogen Fixation"
                        items={['Forms nitrates', 'Fertilizes soil', 'Enables plant growth']}
                        color="amber"
                        delay={0}
                    />
                    <EffectCard
                        icon={Wind}
                        title="VOC Breakdown"
                        items={['Volatile organic compounds', 'Atmospheric pollutants', 'Reactive species']}
                        color="blue"
                        delay={0.1}
                    />
                    <EffectCard
                        icon={RefreshCw}
                        title="System Mixing"
                        items={['Air chemistry', 'Soil fertility', 'Water quality']}
                        color="purple"
                        delay={0.2}
                    />
                </div>
            )
        },
        {
            id: 'why-essential',
            headline: 'Why Storms Prevent Atmospheric Stagnation',
            content: (
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <motion.div
                            className="rounded-xl border border-red-500/20 bg-red-500/5 p-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="font-semibold text-red-300 mb-2">Without Storms:</h4>
                            <ul className="space-y-1 text-white/60 text-sm">
                                <li>• Charges would accumulate</li>
                                <li>• Pollutants would linger</li>
                                <li>• Air layers would stratify</li>
                            </ul>
                        </motion.div>
                        <motion.div
                            className="rounded-xl border border-green-500/20 bg-green-500/5 p-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <h4 className="font-semibold text-green-300 mb-2">With Storms:</h4>
                            <ul className="space-y-1 text-white/60 text-sm">
                                <li>• Mix air vertically</li>
                                <li>• Neutralize extremes</li>
                                <li>• Reset electrical gradients</li>
                            </ul>
                        </motion.div>
                    </div>
                    <motion.div
                        className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-cyan-200 text-sm">
                            Storms are <strong className="text-amber-300">essential</strong>, not disruptive.
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            id: 'urban-vs-natural',
            headline: 'Urban vs Natural Storm Environments',
            content: (
                <div className="grid gap-4 md:grid-cols-2">
                    <EnvironmentCard
                        icon={TreePine}
                        title="Natural Landscapes"
                        items={['Water bodies absorb charge', 'Soil conducts and grounds', 'Vegetation distributes ions']}
                        positive={true}
                        delay={0}
                    />
                    <EnvironmentCard
                        icon={Building}
                        title="Cities"
                        items={['Sealed surfaces disrupt grounding', 'Pollution loads are higher', 'Airflow is restricted']}
                        positive={false}
                        delay={0.1}
                    />
                </div>
            )
        },
        {
            id: 'andara-context',
            headline: 'Andara Ionic Context',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Andara Ionic follows the same principle:
                    </p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Gentle charge interaction',
                            'System-level adjustment',
                            'No forced extremes'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Zap className="w-4 h-4 text-amber-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4 italic">
                        Storms show us that <strong className="text-cyan-300">reset ≠ destruction</strong>.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <Link href="/ion/ionic-sulfates">
                            <motion.span
                                className="inline-flex items-center gap-2 rounded-xl bg-amber-500/20 border border-amber-500/30 px-5 py-3 text-amber-300 hover:bg-amber-500/30 transition-colors cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                            >
                                Ionic Sulfates <ArrowRight className="w-4 h-4" />
                            </motion.span>
                        </Link>
                        <Link href="/ion/microdose-logic">
                            <motion.span
                                className="inline-flex items-center gap-2 rounded-xl bg-purple-500/20 border border-purple-500/30 px-5 py-3 text-purple-300 hover:bg-purple-500/30 transition-colors cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                            >
                                Microdose Logic <ArrowRight className="w-4 h-4" />
                            </motion.span>
                        </Link>
                    </div>
                </div>
            )
        },
        {
            id: 'faq',
            headline: 'Frequently Asked Questions',
            layout: 'full-width' as const,
            content: (
                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <FAQItem
                        question="Does lightning clean the air?"
                        answer="Yes. Storms ionize air, aggregate particles, and wash pollutants out through rain."
                        delay={0}
                    />
                    <FAQItem
                        question="Why does air smell different after rain?"
                        answer="Because of ion balance changes, particle removal, and trace oxidant formation (petrichor includes plant oils, bacterial compounds, and ozone)."
                        delay={0.1}
                    />
                    <FAQItem
                        question="Is ozone from lightning dangerous?"
                        answer="Only in high, persistent concentrations. Natural storms create brief, low-level pulses that help break down pollutants."
                        delay={0.2}
                    />
                    <FAQItem
                        question="Are storms necessary for Earth?"
                        answer="Yes. They prevent atmospheric stagnation and maintain chemical balance across air, soil, and water systems."
                        delay={0.3}
                    />
                </div>
            )
        }
    ];

    return (
        <IONLayout
            title="Lightning & Atmosphere — Earth's High-Voltage Reset Button"
            subtitle="Lightning is not random chaos. It is planetary maintenance — releasing enormous electrical energy that rebalances atmospheric charge, breaks down pollutants, resets ion gradients, and restores air freshness."
            heroVisual={
                <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_0_50px_rgba(245,166,35,0.2)]">
                    <SmartVideoEmbed
                        keywords={["lightning", "thunder", "energy", "power"]}
                        className="w-full aspect-video object-cover"
                    />
                </div>
            }
            sections={sections}
            showParticles={true}
            particleVariant="hero-only"
            cta={{
                headline: "Curious how soil and Earth store ions long-term?",
                body: "Discover how ground systems exchange and stabilize ionic minerals.",
                buttonLabel: "Explore Soil Ions",
                buttonHref: "/ion/soil"
            }}
            relatedPages={[
                { title: "Air Negative Ions", href: "/ion/air-negative-ions", description: "Atmospheric ions" },
                { title: "Wave Cleaning", href: "/ion/waves-cleaning", description: "Water motion" },
                { title: "Ions in Water", href: "/ion/water", description: "Water chemistry" },
                { title: "ORP & Redox", href: "/ion/orp-redox", description: "Electron dynamics" }
            ]}
        />
    );
}
