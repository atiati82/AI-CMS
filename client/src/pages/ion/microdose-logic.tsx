/**
 * Microdose Logic Page
 * /ion/microdose-logic
 * 
 * Systems & Scale - Why Less Can Do More
 */

import React from 'react';
import { motion } from 'framer-motion';
import { IONLayout } from '@/templates/gpt/IONLayout';
import { SmartVideoEmbed } from '@/components/SmartVideoEmbed';
import { Link } from 'wouter';
import {
    ArrowRight,
    Zap,
    Droplets,
    Sparkles,
    TrendingUp,
    RefreshCw,
    Scale,
    Activity,
    Target,
    HelpCircle,
    type LucideIcon
} from 'lucide-react';

// Signal Wave Animation
function SignalWaveAnimation() {
    return (
        <div className="relative h-72 rounded-xl overflow-hidden bg-gradient-to-b from-purple-900/40 via-slate-900 to-slate-900">
            {/* Wave visualization */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Small input signal */}
                <motion.circle
                    cx="40"
                    cy="100"
                    r="6"
                    fill="#a855f7"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Expanding waves */}
                {[1, 2, 3, 4].map((i) => (
                    <motion.circle
                        key={i}
                        cx="200"
                        cy="100"
                        r={20 + i * 30}
                        fill="none"
                        stroke={`rgba(168,85,247,${0.4 - i * 0.08})`}
                        strokeWidth="1"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: [0, 1.5],
                            opacity: [0.6, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                    />
                ))}

                {/* Arrow from small to large */}
                <motion.path
                    d="M50,100 C100,100 150,100 180,100"
                    stroke="#a855f7"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </svg>

            {/* Labels */}
            <motion.div
                className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-purple-300/70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                Small Input
            </motion.div>
            <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-purple-300/70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                System Response
            </motion.div>

            {/* Label */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                <motion.div
                    className="bg-black/50 backdrop-blur-sm rounded-xl px-4 py-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-purple-300/80 text-sm flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Signals, Not Saturation
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

// Approach Comparison Card
function ApproachCard({
    title,
    items,
    force,
    delay = 0
}: {
    title: string;
    items: string[];
    force: boolean;
    delay?: number;
}) {
    return (
        <motion.div
            className={`rounded-xl border p-5 ${force
                ? 'border-red-500/20 bg-red-500/5'
                : 'border-green-500/20 bg-green-500/5'
                }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <div className="flex items-center gap-2 mb-3">
                {force ? (
                    <TrendingUp className="w-5 h-5 text-red-400" />
                ) : (
                    <Sparkles className="w-5 h-5 text-green-400" />
                )}
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

// Nature Example Card
function NatureExampleCard({
    title,
    description,
    icon: Icon,
    delay = 0
}: {
    title: string;
    description: string;
    icon: LucideIcon;
    delay?: number;
}) {
    return (
        <motion.div
            className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-purple-400" />
                <h4 className="font-semibold text-white text-sm">{title}</h4>
            </div>
            <p className="text-white/60 text-xs">{description}</p>
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
            className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-semibold text-white mb-2">{question}</h4>
                    <p className="text-white/60 text-sm">{answer}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default function MicrodoseLogicPage() {
    const sections = [
        {
            id: 'why-more-breaks',
            headline: 'Why "More" Often Breaks Systems',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">In natural systems:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Excess minerals precipitate',
                            'Overload creates antagonism',
                            'High concentration locks reactions',
                            'Balance collapses into force'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <TrendingUp className="w-4 h-4 text-red-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div
                        className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-amber-200 text-sm">
                            Examples: Salinity kills soil life. Too much fertilizer damages roots. Over-mineralized water becomes harsh. <strong className="text-cyan-300">Nature avoids saturation.</strong>
                        </p>
                    </motion.div>
                </div>
            ),
            visual: <SignalWaveAnimation />
        },
        {
            id: 'force-vs-influence',
            headline: 'Force vs Influence',
            content: (
                <div className="grid gap-4 md:grid-cols-2">
                    <ApproachCard
                        title="Force-based approach"
                        items={['High concentration', 'Direct chemical pressure', 'Short-term results', 'Long-term instability']}
                        force={true}
                        delay={0}
                    />
                    <ApproachCard
                        title="Influence-based approach"
                        items={['Low concentration', 'Catalytic interaction', 'System-wide response', 'Long-term coherence']}
                        force={false}
                        delay={0.1}
                    />
                </div>
            )
        },
        {
            id: 'catalysis',
            headline: 'Catalysis — The Core Principle',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">A <strong className="text-purple-300">catalyst</strong>:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Participates in reactions',
                            'Changes system behavior',
                            'Is not consumed',
                            'Works in small amounts'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-purple-500/10 border border-purple-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4">
                        Many ions behave catalytically: they enable exchange, shift equilibria, unlock reactions, and guide structure. <strong className="text-cyan-300">This is why trace minerals matter.</strong>
                    </p>
                </div>
            )
        },
        {
            id: 'charge-fields',
            headline: 'Charge Fields & Signal Amplification',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Ions don't act alone. They act inside <strong className="text-cyan-300">fields</strong>.
                    </p>
                    <p className="text-white/70 mt-4">When a charged ion enters water:</p>
                    <motion.div className="grid gap-2 mt-2">
                        {[
                            'It alters local charge distribution',
                            'Neighboring ions reorganize',
                            'Clusters shift',
                            'Interfaces respond'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Zap className="w-4 h-4 text-cyan-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div
                        className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-amber-200 text-sm">
                            Small inputs can trigger <strong className="text-cyan-300">large rearrangements</strong>.
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            id: 'dilution-paradox',
            headline: 'Dilution Paradox (Why It\'s Counterintuitive)',
            content: (
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <motion.div
                            className="rounded-xl border border-red-500/20 bg-red-500/5 p-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="font-semibold text-red-300 mb-2">At High Concentration:</h4>
                            <ul className="space-y-1 text-white/60 text-sm">
                                <li>• Ions crowd each other</li>
                                <li>• Reactions compete</li>
                                <li>• Mobility decreases</li>
                            </ul>
                        </motion.div>
                        <motion.div
                            className="rounded-xl border border-green-500/20 bg-green-500/5 p-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <h4 className="font-semibold text-green-300 mb-2">At Appropriate Dilution:</h4>
                            <ul className="space-y-1 text-white/60 text-sm">
                                <li>• Ions move freely</li>
                                <li>• Interactions increase</li>
                                <li>• Binding sites open</li>
                                <li>• System becomes responsive</li>
                            </ul>
                        </motion.div>
                    </div>
                    <p className="text-white/60 text-sm mt-4 italic">
                        This is why rivers purify better than tanks, oceans stay stable despite minerals, and springs feel softer than brines.
                    </p>
                </div>
            )
        },
        {
            id: 'nature-examples',
            headline: 'Nature Examples of Microdose Logic',
            layout: 'full-width' as const,
            content: (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
                    <NatureExampleCard
                        title="Oceans"
                        description="Trace elements regulate vast ecosystems."
                        icon={Droplets}
                        delay={0}
                    />
                    <NatureExampleCard
                        title="Soil"
                        description="Micronutrients control plant health more than bulk inputs."
                        icon={Scale}
                        delay={0.1}
                    />
                    <NatureExampleCard
                        title="Atmosphere"
                        description="Tiny ion concentrations affect particle behavior."
                        icon={Activity}
                        delay={0.2}
                    />
                    <NatureExampleCard
                        title="Biology"
                        description="Hormones and neurotransmitters act at micro levels."
                        icon={Zap}
                        delay={0.3}
                    />
                </div>
            )
        },
        {
            id: 'real-goal',
            headline: 'The Real Goal: Coherence, Not Control',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Microdose logic aims for:</p>
                    <motion.div className="grid gap-2 md:grid-cols-2 mt-4">
                        {[
                            { label: 'Coherence', icon: RefreshCw },
                            { label: 'Adaptability', icon: Activity },
                            { label: 'Resilience', icon: Scale },
                            { label: 'Self-correction', icon: Target }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <item.icon className="w-4 h-4 text-green-400" />
                                <span className="text-white/70 text-sm">{item.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div
                        className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-cyan-200 text-sm">
                            When systems are coherent: less input is required, stability increases, extremes fade naturally. <strong className="text-amber-300">This is how nature scales.</strong>
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            id: 'ionic-sulfates-synergy',
            headline: 'Ionic Sulfates & Microdose Synergy',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Ionic sulfates are well-suited for microdose logic because they:
                    </p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Are stable in low concentration',
                            'Interact predictably with metals',
                            'Influence charge balance',
                            'Rarely overshoot reactions'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Sparkles className="w-4 h-4 text-amber-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4 italic">
                        This makes them ideal <strong className="text-cyan-300">system modulators</strong>, not blunt tools.
                    </p>
                    <Link href="/ion/ionic-sulfates">
                        <motion.span
                            className="inline-flex items-center gap-2 rounded-xl bg-amber-500/20 border border-amber-500/30 px-5 py-3 text-amber-300 hover:bg-amber-500/30 transition-colors cursor-pointer mt-4"
                            whileHover={{ scale: 1.05 }}
                        >
                            Explore Ionic Sulfates <ArrowRight className="w-4 h-4" />
                        </motion.span>
                    </Link>
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
                        question="What is microdose logic?"
                        answer="It's the principle that small inputs can influence whole systems through catalytic and field effects."
                        delay={0}
                    />
                    <FAQItem
                        question="Why does dilution sometimes increase effectiveness?"
                        answer="Because it increases mobility, interaction, and system responsiveness."
                        delay={0.1}
                    />
                    <FAQItem
                        question="Is microdosing safer than high dosing?"
                        answer="It aligns better with natural system behavior and avoids overload."
                        delay={0.2}
                    />
                    <FAQItem
                        question="Does microdose mean weak?"
                        answer="No. It means precise."
                        delay={0.3}
                    />
                </div>
            )
        }
    ];

    return (
        <IONLayout
            title="Microdose Logic — Nature Works Through Signals, Not Saturation"
            subtitle="Modern thinking assumes if it works, more must work better. Nature disagrees. Nature rarely uses excess — it uses signals. This explains why trace minerals shape ecosystems and small ionic inputs alter water behavior."
            heroVisual={<SmartVideoEmbed keywords={["microdose", "signals", "patterns", "frequency"]} className="max-w-2xl mx-auto shadow-2xl shadow-purple-500/20" />}
            sections={sections}
            showParticles={true}
            particleVariant="hero-only"
            cta={{
                headline: "Want all ion knowledge in one place?",
                body: "Visit the complete ION FAQ for quick answers to common questions.",
                buttonLabel: "ION FAQ",
                buttonHref: "/ion/faq"
            }}
            relatedPages={[
                { title: "Ionic Sulfates", href: "/ion/ionic-sulfates", description: "Product education" },
                { title: "Ions in Water", href: "/ion/water", description: "Water behavior" },
                { title: "Ion Exchange", href: "/ion/ion-exchange", description: "Exchange mechanics" },
                { title: "ORP & Redox", href: "/ion/orp-redox", description: "Measurements" }
            ]}
        />
    );
}
