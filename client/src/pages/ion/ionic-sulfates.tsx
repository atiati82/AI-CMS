/**
 * Ionic Sulfates Page
 * /ion/ionic-sulfates
 * 
 * Core Product Education - Nature's Quiet Balancing Mineral Form
 */

import React from 'react';
import { motion } from 'framer-motion';
import { IONLayout } from '@/templates/gpt/IONLayout';
import { Link } from 'wouter';
import { SmartVideoEmbed } from '@/components/SmartVideoEmbed';
import {
    ArrowRight,
    Droplets,
    Mountain,
    RefreshCw,
    Sparkles,
    CheckCircle,
    XCircle,
    Zap,
    Shield,
    HelpCircle
} from 'lucide-react';

// Sulfate Structure Visualization
function SulfateStructureAnimation() {
    return (
        <div className="relative h-72 rounded-xl overflow-hidden bg-gradient-to-b from-amber-900/30 via-slate-900 to-slate-900">
            {/* Central sulfate ion */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {/* Central sulfur */}
                    <motion.div
                        className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-amber-500/50"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        S
                    </motion.div>

                    {/* Oxygen atoms */}
                    {[0, 90, 180, 270].map((angle, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-red-500/40"
                            style={{
                                left: `calc(50% - 16px + ${Math.cos((angle * Math.PI) / 180) * 40}px)`,
                                top: `calc(50% - 16px + ${Math.sin((angle * Math.PI) / 180) * 40}px)`
                            }}
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
                        >
                            O
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Charge indicator */}
            <motion.div
                className="absolute top-1/2 right-12 -translate-y-1/2 text-2xl font-mono text-cyan-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                2−
            </motion.div>

            {/* Label */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                <motion.div
                    className="bg-black/50 backdrop-blur-sm rounded-xl px-4 py-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-amber-300/80 text-sm flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        SO₄²⁻ — Stable, Negatively Charged
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

// Comparison Table Row
function ComparisonRow({
    aspect,
    sulfates,
    chlorides,
    delay = 0
}: {
    aspect: string;
    sulfates: string;
    chlorides: string;
    delay?: number;
}) {
    return (
        <motion.div
            className="grid grid-cols-3 gap-4 py-3 border-b border-white/10"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <span className="text-cyan-300 font-medium">{aspect}</span>
            <span className="text-white/60 text-sm">{sulfates}</span>
            <span className="text-white/60 text-sm">{chlorides}</span>
        </motion.div>
    );
}

// Use/Don't Use Cards
function UsageCard({
    do: isDo,
    items,
    delay = 0
}: {
    do: boolean;
    items: string[];
    delay?: number;
}) {
    return (
        <motion.div
            className={`rounded-xl border p-5 ${isDo
                ? 'border-green-500/20 bg-green-500/5'
                : 'border-red-500/20 bg-red-500/5'
                }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <div className="flex items-center gap-2 mb-3">
                {isDo ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                )}
                <h4 className="font-semibold text-white">{isDo ? 'Think of as' : 'Not as'}</h4>
            </div>
            <ul className="space-y-1">
                {items.map((item, i) => (
                    <li key={i} className="text-white/60 text-sm flex items-center gap-2">
                        {isDo ? '✅' : '❌'} {item}
                    </li>
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

export default function IonicSulfatesPage() {
    const sections = [
        {
            id: 'what-is-sulfate',
            headline: 'What Is a Sulfate?',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        A <strong className="text-amber-300">sulfate</strong> is a mineral form where sulfur is bonded with oxygen as <strong className="text-cyan-300">SO₄²⁻</strong>.
                    </p>
                    <p className="text-white/70 mt-4">This structure makes sulfate:</p>
                    <motion.div className="grid gap-2 mt-2">
                        {[
                            { text: 'Highly stable', icon: Shield },
                            { text: 'Negatively charged', icon: Zap },
                            { text: 'Strongly interactive with metals', icon: RefreshCw },
                            { text: 'Central to natural mineral cycles', icon: Sparkles }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <item.icon className="w-4 h-4 text-amber-400" />
                                <span className="text-white/70">{item.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4">
                        Sulfates are found naturally in oceans, volcanic regions, mineral springs, soils, and biological systems.
                    </p>
                </div>
            ),
            visual: <SulfateStructureAnimation />
        },
        {
            id: 'connector-ion',
            headline: 'Why Sulfate Is a "Connector Ion"',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Sulfate plays a special role because it:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Binds predictably with many metals',
                            'Remains soluble across wide conditions',
                            'Participates in buffering reactions',
                            'Rarely causes aggressive precipitation'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <RefreshCw className="w-4 h-4 text-cyan-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div
                        className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-green-200 text-sm">
                            In nature, sulfate often acts as a <strong className="text-cyan-300">mediator</strong>, not a disruptor.
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            id: 'ionic-vs-solid',
            headline: 'Ionic vs Solid Sulfate Minerals',
            content: (
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <motion.div
                            className="rounded-xl border border-slate-500/20 bg-slate-500/5 p-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="font-semibold text-slate-300 mb-2">Solid Sulfate Minerals</h4>
                            <ul className="space-y-1 text-white/60 text-sm">
                                <li>• Crystalline</li>
                                <li>• Slow dissolution</li>
                                <li>• Limited interaction surface</li>
                            </ul>
                        </motion.div>
                        <motion.div
                            className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <h4 className="font-semibold text-cyan-300 mb-2">Ionic Sulfates (in solution)</h4>
                            <ul className="space-y-1 text-white/60 text-sm">
                                <li>• Electrically active</li>
                                <li>• Mobile</li>
                                <li>• Immediately interactive</li>
                                <li>• Capable of exchange and binding</li>
                            </ul>
                        </motion.div>
                    </div>
                    <motion.div
                        className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-amber-200 text-sm">
                            Once ionic, sulfate participates in <strong className="text-cyan-300">water behavior</strong>, not just mineral presence.
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            id: 'water-interaction',
            headline: 'How Ionic Sulfates Interact with Water',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Ionic sulfates can contribute to:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            { text: 'Charge balance', icon: Zap },
                            { text: 'Mineral coherence', icon: Sparkles },
                            { text: 'Binding of certain metal ions', icon: RefreshCw },
                            { text: 'Stabilization of dissolved systems', icon: Shield }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-blue-500/10 border border-blue-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <item.icon className="w-4 h-4 text-blue-400" />
                                <span className="text-white/70">{item.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4">
                        They do this <strong>without forcing reactions</strong>. This is why sulfate-rich natural waters often feel smooth, stable, balanced, and long-lasting.
                    </p>
                </div>
            )
        },
        {
            id: 'comparison',
            headline: 'Ionic Sulfates vs Chlorides',
            layout: 'full-width' as const,
            content: (
                <div className="space-y-4 mt-6">
                    <div className="grid grid-cols-3 gap-4 text-sm font-medium mb-2">
                        <span className="text-cyan-300">Aspect</span>
                        <span className="text-amber-400">Sulfates</span>
                        <span className="text-blue-400">Chlorides</span>
                    </div>
                    <ComparisonRow aspect="Reactivity" sulfates="Moderate, stabilizing" chlorides="Often aggressive" delay={0} />
                    <ComparisonRow aspect="Metal interaction" sulfates="Complexing & buffering" chlorides="Can increase corrosion" delay={0.1} />
                    <ComparisonRow aspect="Natural role" sulfates="Cycling & mediation" chlorides="Transport & salinity" delay={0.2} />
                    <ComparisonRow aspect="Long-term balance" sulfates="High" chlorides="Lower" delay={0.3} />
                    <p className="text-white/60 text-sm mt-4 italic">
                        Nature uses <strong>both</strong>, but for different purposes.
                    </p>
                </div>
            )
        },
        {
            id: 'microdose-synergy',
            headline: 'Why Micro-Amounts Matter with Ionic Sulfates',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Because sulfate ions:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Influence charge fields',
                            'Interact catalytically',
                            'Organize surrounding ions'
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
                        Small amounts can produce <strong className="text-cyan-300">system-wide effects</strong> when water is moving, mineral spectrum is present, and charge balance is receptive.
                    </p>
                    <Link href="/ion/microdose-logic">
                        <motion.span
                            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm cursor-pointer mt-2"
                            whileHover={{ x: 5 }}
                        >
                            Deep Logic: Microdose Principles <ArrowRight className="w-3 h-3" />
                        </motion.span>
                    </Link>
                </div>
            )
        },
        {
            id: 'how-to-think',
            headline: 'How to Think About Using Ionic Sulfates',
            content: (
                <div className="grid gap-4 md:grid-cols-2">
                    <UsageCard
                        do={false}
                        items={['A drug', 'A disinfectant', 'A magic remover']}
                        delay={0}
                    />
                    <UsageCard
                        do={true}
                        items={['A mineral field contributor', 'A charge mediator', 'A water-behavior modulator']}
                        delay={0.1}
                    />
                </div>
            )
        },
        {
            id: 'andara-design',
            headline: 'Andara Ionic Sulfates — Design Philosophy',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Andara Ionic Sulfates are designed to:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Work with water behavior',
                            'Contribute mineral spectrum',
                            'Support exchange and binding',
                            'Avoid forced chemistry'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Shield className="w-4 h-4 text-amber-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4 italic">
                        They are <strong className="text-cyan-300">terrain-supportive</strong>, not interventionist.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <Link href="/shop">
                            <motion.span
                                className="inline-flex items-center gap-2 rounded-xl bg-amber-500/20 border border-amber-500/30 px-5 py-3 text-amber-300 hover:bg-amber-500/30 transition-colors cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                            >
                                View Products <ArrowRight className="w-4 h-4" />
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
                        question="What are ionic sulfates?"
                        answer="They are sulfate minerals present in charged, dissolved form that interact actively with water and other ions."
                        delay={0}
                    />
                    <FAQItem
                        question="Are sulfates natural?"
                        answer="Yes. Sulfates are abundant in oceans, volcanic regions, soils, and biological systems."
                        delay={0.1}
                    />
                    <FAQItem
                        question="Do ionic sulfates react aggressively?"
                        answer="No. They tend to stabilize and mediate rather than force reactions."
                        delay={0.2}
                    />
                    <FAQItem
                        question="Why use sulfate minerals in water systems?"
                        answer="Because they support balance, metal interaction, and long-term stability."
                        delay={0.3}
                    />
                </div>
            )
        }
    ];

    return (
        <IONLayout
            title="Ionic Sulfates — Nature's Quiet Balancing Mineral Form"
            subtitle="Not all minerals behave the same in water. Some react aggressively. Some remain inert. Ionic sulfates mediate, buffer, and organize — acting as system balancers rather than force-agents."
            heroVisual={<SmartVideoEmbed keywords={["minerals", "sulfates", "crystals", "amber", "golden"]} className="max-w-2xl mx-auto shadow-2xl shadow-amber-500/20" />}
            sections={sections}
            showParticles={true}
            particleVariant="hero-only"
            cta={{
                headline: "Want to understand why dilution often increases effectiveness?",
                body: "Discover the science behind microdosing and catalytic mineral behavior.",
                buttonLabel: "Explore Microdose Logic",
                buttonHref: "/ion/microdose-logic"
            }}
            relatedPages={[
                { title: "Ion Fundamentals", href: "/ion", description: "Start here" },
                { title: "Ions in Water", href: "/ion/water", description: "Water behavior" },
                { title: "Ion Exchange", href: "/ion/ion-exchange", description: "Exchange mechanics" },
                { title: "Volcanic Minerals", href: "/ion/volcanic-minerals", description: "Mineral origin" }
            ]}
        />
    );
}
