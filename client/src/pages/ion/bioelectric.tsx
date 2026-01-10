/**
 * Bioelectric Page
 * /ion/bioelectric
 * 
 * How Ions Power Life - Cells, Nerves & Biological Electricity
 * Features: Action potential animation, membrane visualization
 */

import React from 'react';
import { motion } from 'framer-motion';
import { IONLayout } from '@/templates/gpt/IONLayout';
import { SmartImage } from '@/components/ui/SmartImage';
import { Link } from 'wouter';
import {
    ArrowRight,
    Zap,
    Activity,
    Heart,
    Droplets,
    Brain,
    Sparkles,
    RefreshCw,
    HelpCircle
} from 'lucide-react';
import { VideoBackground } from '@/components/SmartVideoEmbed';

// Action Potential Animation
function ActionPotentialAnimation() {
    return (
        <div className="relative h-72 rounded-xl overflow-hidden bg-gradient-to-b from-purple-900/40 via-blue-900/50 to-slate-900">
            {/* Cell membrane line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/40 via-amber-500/60 to-amber-500/40" />

            {/* Extracellular label */}
            <motion.div
                className="absolute top-4 left-4 text-xs text-blue-300/70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                Extracellular (Na⁺ rich)
            </motion.div>

            {/* Intracellular label */}
            <motion.div
                className="absolute bottom-4 left-4 text-xs text-purple-300/70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                Intracellular (K⁺ rich)
            </motion.div>

            {/* Na+ ions (outside) */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`na-${i}`}
                    className="absolute w-4 h-4 rounded-full bg-blue-500/60 flex items-center justify-center text-[8px] text-white font-bold"
                    style={{ left: `${10 + i * 11}%`, top: '25%' }}
                    animate={{
                        y: [0, 20, 0],
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                    Na⁺
                </motion.div>
            ))}

            {/* K+ ions (inside) */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`k-${i}`}
                    className="absolute w-4 h-4 rounded-full bg-purple-500/60 flex items-center justify-center text-[8px] text-white font-bold"
                    style={{ left: `${10 + i * 11}%`, top: '65%' }}
                    animate={{
                        y: [0, -15, 0],
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 + i * 0.2 }}
                >
                    K⁺
                </motion.div>
            ))}

            {/* Traveling signal wave */}
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-400/50 blur-md"
                animate={{ x: ['-10%', '110%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Voltage indicator */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <motion.div
                    className="text-center bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <motion.span
                        className="block text-lg font-mono text-cyan-400"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        -70mV
                    </motion.span>
                    <span className="text-[10px] text-white/50">resting</span>
                </motion.div>
            </div>

            {/* Label */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                <motion.div
                    className="bg-black/50 backdrop-blur-sm rounded-xl px-4 py-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-purple-300/80 text-sm flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Ion Gradient = Cellular Battery
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

// Ion Badge
function IonBadge({ symbol, name, color }: { symbol: string; name: string; color: string }) {
    const colorClasses: Record<string, string> = {
        blue: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
        purple: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
        green: 'border-green-500/30 bg-green-500/10 text-green-300',
        cyan: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300'
    };

    return (
        <motion.span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${colorClasses[color]}`}
            whileHover={{ scale: 1.05 }}
        >
            <span className="font-mono font-bold">{symbol}</span>
            <span className="text-white/60">{name}</span>
        </motion.span>
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

// Video Hero Background Component
function VideoHeroBackground() {
    return (
        <VideoBackground
            videoId="bioelectric-circuit-bg"
            keywords={["bioelectric", "cells", "energy", "membrane", "blue", "purple"]}
            overlayOpacity={0.6}
            className="rounded-3xl"
        />
    );
}

export default function BioelectricPage() {
    const sections = [
        {
            id: 'what-is-bioelectricity',
            headline: 'What Is Bioelectricity?',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Bioelectricity is the electrical activity generated by <strong className="text-purple-300">ion gradients</strong> across membranes.
                    </p>
                    <p className="text-white/70">Cells separate charge by:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Pumping ions in and out',
                            'Maintaining voltage differences',
                            'Opening and closing ion channels'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-purple-500/10 border border-purple-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Zap className="w-4 h-4 text-purple-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4">
                        This creates membrane potential, signaling capacity, and responsiveness to environment.
                    </p>
                </div>
            ),
            visual: <ActionPotentialAnimation />
        },
        {
            id: 'cell-membrane-battery',
            headline: 'The Cell Membrane — A Living Battery',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Every cell membrane functions like:</p>
                    <motion.div className="grid gap-2 md:grid-cols-3 mt-4">
                        {[
                            { label: 'A capacitor', icon: Zap },
                            { label: 'A gatekeeper', icon: Activity },
                            { label: 'A sensor', icon: Sparkles }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <item.icon className="w-4 h-4 text-cyan-400" />
                                <span className="text-white/70 text-sm">{item.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/70 mt-4">Key ions involved:</p>
                    <div className="flex flex-wrap gap-2 my-4">
                        <IonBadge symbol="Na⁺" name="Sodium" color="blue" />
                        <IonBadge symbol="K⁺" name="Potassium" color="purple" />
                        <IonBadge symbol="Ca²⁺" name="Calcium" color="green" />
                        <IonBadge symbol="Cl⁻" name="Chloride" color="cyan" />
                    </div>
                    <motion.div
                        className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-amber-200 text-sm">
                            The <strong className="text-cyan-300">difference</strong> in ion concentration inside vs outside the cell creates voltage. No gradient → no signal.
                        </p>
                    </motion.div>
                </div>
            ),
            visual: (
                <div className="relative h-64 rounded-xl overflow-hidden">
                    <SmartImage
                        registryId="ion-action-potential-membrane"
                        className="w-full h-full object-contain bg-white/5 rounded-xl"
                        interaction="reveal"
                    />
                </div>
            )
        },
        {
            id: 'nerves',
            headline: 'Nerves: Information as Ion Waves',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Nerve impulses are not electricity flowing like a wire. They are <strong className="text-purple-300">traveling ion waves</strong>.
                    </p>
                    <h4 className="text-cyan-300 font-semibold mt-4">Sequence:</h4>
                    <motion.div className="grid gap-2 mt-2">
                        {[
                            { num: 1, text: 'Ion channels open' },
                            { num: 2, text: 'Ions rush across membrane' },
                            { num: 3, text: 'Voltage changes locally' },
                            { num: 4, text: 'Signal propagates' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-blue-500/10 border border-blue-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <span className="w-6 h-6 rounded-full bg-blue-500 text-black font-bold flex items-center justify-center text-sm">
                                    {item.num}
                                </span>
                                <span className="text-white/70">{item.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4">
                        This allows speed, precision, and adaptability.
                    </p>
                </div>
            ),
            visual: (
                <div className="relative h-64 rounded-xl overflow-hidden">
                    <SmartImage
                        registryId="ion-channels-membrane"
                        className="w-full h-full object-contain bg-white/5 rounded-xl"
                        interaction="reveal"
                    />
                </div>
            )
        },
        {
            id: 'muscles',
            headline: 'Muscles & Movement',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Muscle contraction depends on:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            { text: 'Calcium ion release', icon: Sparkles },
                            { text: 'Membrane depolarization', icon: Zap },
                            { text: 'Coordinated electrical timing', icon: Activity }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <item.icon className="w-4 h-4 text-green-400" />
                                <span className="text-white/70">{item.text}</span>
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
                            No calcium signaling → no contraction. Movement is an <strong className="text-cyan-300">ionic choreography</strong>.
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            id: 'hydration-electrical',
            headline: 'Hydration Is Electrical',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Hydration is not just water intake. It is <strong className="text-cyan-300">water + ions</strong>.
                    </p>
                    <p className="text-white/70 mt-4">Ions allow:</p>
                    <motion.div className="grid gap-2 mt-2">
                        {[
                            'Water to move across membranes',
                            'Nutrients to be transported',
                            'Waste to be removed'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-blue-500/10 border border-blue-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Droplets className="w-4 h-4 text-blue-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4 italic">
                        Pure, de-ionized water lacks this transport intelligence.
                    </p>
                </div>
            )
        },
        {
            id: 'beyond-humans',
            headline: 'Bioelectricity Exists Beyond Humans',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Bioelectric fields guide:</p>
                    <motion.div className="grid gap-2 md:grid-cols-2 mt-4">
                        {[
                            'Plant root growth',
                            'Embryonic development',
                            'Wound repair signaling',
                            'Organism-level patterning'
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
                                <span className="text-white/70 text-sm">{item}</span>
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
                            Life uses electricity as an <strong className="text-amber-300">organizing language</strong>, not just a power source.
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            id: 'water-earth-link',
            headline: 'Linking Bioelectricity to Water & Earth',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Water and minerals provide:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            { text: 'The ionic medium', icon: Droplets },
                            { text: 'Buffering capacity', icon: RefreshCw },
                            { text: 'Charge carriers', icon: Zap }
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
                        This links: volcanic minerals → water behavior → cellular signaling. Nature keeps the chain intact.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <Link href="/ion/water">
                            <motion.span
                                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm cursor-pointer"
                                whileHover={{ x: 5 }}
                            >
                                Water Foundation <ArrowRight className="w-3 h-3" />
                            </motion.span>
                        </Link>
                        <Link href="/ion/volcanic-minerals">
                            <motion.span
                                className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm cursor-pointer"
                                whileHover={{ x: 5 }}
                            >
                                Volcanic Origin <ArrowRight className="w-3 h-3" />
                            </motion.span>
                        </Link>
                    </div>
                </div>
            )
        },
        {
            id: 'andara-context',
            headline: 'Andara Ionic Context',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Andara Ionic Sulfates are positioned within this logic as:
                    </p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Mineral contributors to ionic environments',
                            'Supporters of water\'s role as a carrier',
                            'Part of terrain-level coherence'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-purple-500/10 border border-purple-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Heart className="w-4 h-4 text-purple-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4 italic">
                        No forcing. No overstimulation. Only <strong className="text-cyan-300">supporting the medium life already uses</strong>.
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
                        question="What is bioelectricity?"
                        answer="Bioelectricity is electrical activity created by ion movement in living cells."
                        delay={0}
                    />
                    <FAQItem
                        question="Do ions really control nerve signals?"
                        answer="Yes. Nerve impulses are driven by controlled ion flow across membranes."
                        delay={0.1}
                    />
                    <FAQItem
                        question="Is hydration electrical?"
                        answer="Yes. Water needs ions to move efficiently through biological systems."
                        delay={0.2}
                    />
                    <FAQItem
                        question="Can minerals influence bioelectric balance?"
                        answer="Minerals contribute ions that support membrane potential and signaling environments."
                        delay={0.3}
                    />
                </div>
            )
        }
    ];

    return (
        <IONLayout
            title="Bioelectricity — Life Runs on Ions, Not Calories Alone"
            subtitle="Life is electrical before it is chemical. Every living cell maintains an electrical charge, communicates through ion movement, and responds to voltage differences. Without ions, there is no nerve signal, no muscle contraction, no cellular coordination."
            heroVisual={<VideoHeroBackground />}
            sections={sections}
            showParticles={true}
            particleVariant="hero-only"
            cta={{
                headline: "Confused about electrolytes vs ionic minerals?",
                body: "Learn the key differences and why both matter for hydration and health.",
                buttonLabel: "Electrolytes vs Ionic Minerals",
                buttonHref: "/ion/electrolytes-vs-ionic-minerals"
            }}
            relatedPages={[
                { title: "Ion Fundamentals", href: "/ion", description: "Start here" },
                { title: "Ions in Water", href: "/ion/water", description: "Water behavior" },
                { title: "ORP & Redox", href: "/ion/orp-redox", description: "Measurements" },
                { title: "Volcanic Minerals", href: "/ion/volcanic-minerals", description: "Mineral origin" }
            ]}
        />
    );
}
