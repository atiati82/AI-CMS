/**
 * ORP & Redox Page
 * /ion/orp-redox
 * 
 * Electron Flow, Not "Good vs Bad" - Myth-busting educational page
 * Features: Electron flow animations, ORP meter visualization, FAQ section
 */

import React from 'react';
import { motion, useInView, type Easing } from 'framer-motion';
import { IONLayout } from '@/templates/gpt/IONLayout';
import { SmartVideoEmbed, VideoBackground } from '@/components/SmartVideoEmbed';
import { SmartImage } from '@/components/ui/SmartImage';
import { Link } from 'wouter';
import {
    ArrowRight,
    Zap,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Activity,
    Droplets,
    Wind,
    Waves,
    ThermometerSun,
    CircleDot,
    Info,
    HelpCircle,
    type LucideIcon
} from 'lucide-react';
import { IONParticleField } from '@/components/visuals/IONParticleField';
import { IONFieldLines } from '@/components/visuals/IONFieldLines';
import { useRef } from 'react';

// Animated Electron Flow Visualization
function ElectronFlowAnimation() {
    return (
        <div className="relative h-72 rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-cyan-900/40 border border-purple-500/20">
            <IONFieldLines variant="radial" centerX={50} centerY={50} />

            {/* Electron particles flowing */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Oxidation side (left) */}
                <motion.div
                    className="absolute left-1/4 flex flex-col items-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl font-bold text-black shadow-lg shadow-green-500/30"
                        animate={{ boxShadow: ['0 0 0 0 rgba(34,197,94,0)', '0 0 20px 10px rgba(34,197,94,0.3)', '0 0 0 0 rgba(34,197,94,0)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        A
                    </motion.div>
                    <p className="text-green-300 text-xs mt-2">Oxidation</p>
                    <p className="text-green-400/60 text-xs">-e (loses electron)</p>
                </motion.div>

                {/* Electron transfer arrows */}
                <motion.div className="flex items-center gap-2">
                    <motion.div
                        className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-sm"
                        animate={{ x: [-30, 30, -30] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as Easing }}
                    >
                        e⁻
                    </motion.div>
                </motion.div>

                {/* Reduction side (right) */}
                <motion.div
                    className="absolute right-1/4 flex flex-col items-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                    <motion.div
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-2xl font-bold text-black shadow-lg shadow-cyan-500/30"
                        animate={{ boxShadow: ['0 0 0 0 rgba(6,182,212,0)', '0 0 20px 10px rgba(6,182,212,0.3)', '0 0 0 0 rgba(6,182,212,0)'] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                        B
                    </motion.div>
                    <p className="text-cyan-300 text-xs mt-2">Reduction</p>
                    <p className="text-cyan-400/60 text-xs">+e (gains electron)</p>
                </motion.div>
            </div>
        </div>
    );
}

// ORP Meter Visualization
function ORPMeterVisualization() {
    return (
        <motion.div
            className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-cyan-500/20 p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <div className="flex items-center justify-center h-full gap-8">
                {/* Meter Display */}
                <motion.div
                    className="relative w-32 h-32 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-4 border-cyan-500/30 flex items-center justify-center"
                >
                    <motion.div
                        className="absolute w-1 h-12 bg-gradient-to-b from-cyan-400 to-transparent origin-bottom rounded-full"
                        animate={{ rotate: [-45, 45, -45] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as Easing }}
                        style={{ transformOrigin: 'bottom center' }}
                    />
                    <div className="absolute bottom-4 text-center">
                        <motion.span
                            className="text-xl font-mono text-cyan-300"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            +250
                        </motion.span>
                        <p className="text-xs text-cyan-400/60">mV</p>
                    </div>
                    <p className="absolute top-4 text-xs text-white/40 uppercase tracking-wider">ORP</p>
                </motion.div>

                {/* Scale labels */}
                <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-white/60">+400 to +800 mV (Oxidizing)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <span className="text-white/60">0 to +400 mV (Neutral)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-cyan-500" />
                        <span className="text-white/60">-400 to 0 mV (Reducing)</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Myth vs Reality Card
function MythRealityCard({
    myth,
    reality,
    delay = 0
}: {
    myth: string;
    reality: string;
    delay?: number;
}) {
    return (
        <motion.div
            className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <div className="p-4 bg-red-500/10 border-b border-red-500/20">
                <div className="flex items-center gap-2 text-red-400 mb-1">
                    <XCircle className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold">Myth</span>
                </div>
                <p className="text-white/80 text-sm">{myth}</p>
            </div>
            <div className="p-4 bg-green-500/10">
                <div className="flex items-center gap-2 text-green-400 mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold">Reality</span>
                </div>
                <p className="text-white/80 text-sm">{reality}</p>
            </div>
        </motion.div>
    );
}

// Natural Water ORP Example
function WaterORPCard({
    icon: Icon,
    title,
    orp,
    description,
    color,
    delay = 0
}: {
    icon: LucideIcon;
    title: string;
    orp: string;
    description: string;
    color: string;
    delay?: number;
}) {
    const colorClasses: Record<string, string> = {
        cyan: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400',
        blue: 'border-blue-500/20 bg-blue-500/5 text-blue-400',
        amber: 'border-amber-500/20 bg-amber-500/5 text-amber-400',
        slate: 'border-slate-500/20 bg-slate-500/5 text-slate-400'
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
            <h4 className="font-semibold text-white mb-1">{title}</h4>
            <p className="text-xs mb-2">{orp}</p>
            <p className="text-white/60 text-sm">{description}</p>
        </motion.div>
    );
}

// Comparison Table Row
function ComparisonRow({
    measurement,
    shows,
    doesNotShow,
    delay = 0
}: {
    measurement: string;
    shows: string;
    doesNotShow: string;
    delay?: number;
}) {
    return (
        <motion.tr
            className="border-b border-white/10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <td className="py-3 px-4 font-semibold text-cyan-300">{measurement}</td>
            <td className="py-3 px-4 text-white/70">{shows}</td>
            <td className="py-3 px-4 text-white/50">{doesNotShow}</td>
        </motion.tr>
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

export default function ORPRedoxPage() {
    const sections = [
        {
            id: 'what-is-orp',
            headline: 'What Is ORP?',
            content: (
                <div className="space-y-4">
                    <motion.div
                        className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-5"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-purple-200 text-lg mb-2">
                            <strong>ORP (Oxidation–Reduction Potential)</strong> measures the tendency of water to:
                        </p>
                        <div className="grid gap-3 mt-4 md:grid-cols-2">
                            <div className="flex items-center gap-3 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3">
                                <span className="text-red-400 font-bold">+mV</span>
                                <span className="text-white/70">Accept electrons (oxidizing)</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-4 py-3">
                                <span className="text-cyan-400 font-bold">-mV</span>
                                <span className="text-white/70">Donate electrons (reducing)</span>
                            </div>
                        </div>
                    </motion.div>
                    <motion.blockquote
                        className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-500/5 rounded-r-lg"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-amber-200 italic">
                            "ORP shows the <strong>direction</strong> electrons want to move."
                        </p>
                    </motion.blockquote>
                </div>
            ),
            visual: <ORPMeterVisualization />
        },
        {
            id: 'oxidation-reduction',
            headline: 'Oxidation vs Reduction (Plain Language)',
            content: (
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <motion.div
                            className="rounded-xl border border-green-500/20 bg-green-500/5 p-5"
                            whileHover={{ scale: 1.02 }}
                        >
                            <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                                <Activity className="w-5 h-5" />
                                Oxidation
                            </h4>
                            <p className="text-white/70 text-sm">
                                Loss of electrons. The molecule <strong className="text-green-300">gives away</strong> an electron.
                            </p>
                            <p className="text-green-400/60 text-xs mt-2">Example: Rust forming, fruit browning</p>
                        </motion.div>

                        <motion.div
                            className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5"
                            whileHover={{ scale: 1.02 }}
                        >
                            <h4 className="font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                                <Zap className="w-5 h-5" />
                                Reduction
                            </h4>
                            <p className="text-white/70 text-sm">
                                Gain of electrons. The molecule <strong className="text-cyan-300">receives</strong> an electron.
                            </p>
                            <p className="text-cyan-400/60 text-xs mt-2">Example: Charging a battery, photosynthesis</p>
                        </motion.div>
                    </div>

                    <motion.div
                        className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                            <p className="text-amber-200 text-sm">
                                <strong>Both processes are essential in nature.</strong> Nature does not aim for "always reducing." Nature aims for <strong className="text-cyan-300">situational balance</strong>.
                            </p>
                        </div>
                    </motion.div>
                </div>
            ),
            visual: <ElectronFlowAnimation />
        },
        {
            id: 'myth-busting',
            headline: 'Myth Busting: ORP Is Not "Good vs Bad"',
            layout: 'full-width' as const,
            content: (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
                    <MythRealityCard
                        myth="Low ORP = good water"
                        reality="Low ORP means reducing tendency. Context matters—stagnant swamp water also has low ORP."
                        delay={0}
                    />
                    <MythRealityCard
                        myth="High ORP = bad water"
                        reality="High ORP means oxidizing tendency. Rain, ocean, and oxygenated streams have high ORP—and sustain life."
                        delay={0.1}
                    />
                    <MythRealityCard
                        myth="ORP measures water quality"
                        reality="ORP measures electron availability, not contamination levels or mineral content."
                        delay={0.2}
                    />
                </div>
            )
        },
        {
            id: 'context-dependent',
            headline: 'Why ORP Is Context-Dependent',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        ORP changes constantly based on:
                    </p>
                    <motion.div
                        className="grid gap-2 mt-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.08 } },
                            hidden: {}
                        }}
                    >
                        {[
                            { icon: Droplets, text: 'Dissolved oxygen levels', color: 'text-cyan-400' },
                            { icon: CircleDot, text: 'Mineral ion concentration', color: 'text-purple-400' },
                            { icon: Activity, text: 'pH of the water', color: 'text-green-400' },
                            { icon: ThermometerSun, text: 'Temperature', color: 'text-amber-400' },
                            { icon: Waves, text: 'Biological activity', color: 'text-blue-400' },
                            { icon: Wind, text: 'Turbulence and flow', color: 'text-cyan-400' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3"
                                variants={{
                                    hidden: { opacity: 0, x: -10 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                            >
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                                <span className="text-white/70">{item.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm italic mt-4">
                        The same water can show different ORP at different moments. ORP alone cannot define water behavior.
                    </p>
                </div>
            ),
            visual: (
                <div className="relative h-64 rounded-xl overflow-hidden">
                    <SmartImage
                        registryId="ion-orp-cell-schematic"
                        className="w-full h-full object-contain"
                        interaction="reveal"
                    />
                </div>
            )
        },
        {
            id: 'natural-examples',
            headline: 'ORP in Natural Waters',
            layout: 'full-width' as const,
            content: (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
                    <WaterORPCard
                        icon={Droplets}
                        title="Rainwater"
                        orp="Often +200 to +400 mV"
                        description="Highly oxygenated. Rain cleans the air precisely because it is oxidizing."
                        color="cyan"
                        delay={0}
                    />
                    <WaterORPCard
                        icon={Waves}
                        title="Rivers & Streams"
                        orp="Fluctuates widely"
                        description="Changes with flow, rocks, biology. Alternates oxidation and reduction zones."
                        color="blue"
                        delay={0.1}
                    />
                    <WaterORPCard
                        icon={Wind}
                        title="Ocean Water"
                        orp="+100 to +350 mV"
                        description="Moderately positive. Despite positive ORP, oceans sustain massive life."
                        color="cyan"
                        delay={0.2}
                    />
                    <WaterORPCard
                        icon={AlertTriangle}
                        title="Stagnant Water"
                        orp="Often low or negative"
                        description="Low oxygen, can become biologically unstable. Low ORP ≠ healthy."
                        color="slate"
                        delay={0.3}
                    />
                </div>
            )
        },
        {
            id: 'comparison-table',
            headline: 'ORP vs Conductivity vs pH',
            content: (
                <div className="space-y-4">
                    <p className="text-white/70">
                        These are <strong className="text-cyan-300">three different lenses</strong>:
                    </p>
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-cyan-500/30">
                                    <th className="py-3 px-4 text-left text-cyan-400">Measurement</th>
                                    <th className="py-3 px-4 text-left text-green-400">What It Shows</th>
                                    <th className="py-3 px-4 text-left text-red-400/60">Does NOT Show</th>
                                </tr>
                            </thead>
                            <tbody>
                                <ComparisonRow
                                    measurement="EC / TDS"
                                    shows="Ion quantity"
                                    doesNotShow="Ion quality or balance"
                                    delay={0}
                                />
                                <ComparisonRow
                                    measurement="pH"
                                    shows="Acid–base activity"
                                    doesNotShow="Electron availability"
                                    delay={0.1}
                                />
                                <ComparisonRow
                                    measurement="ORP"
                                    shows="Electron tendency"
                                    doesNotShow="Mineral spectrum"
                                    delay={0.2}
                                />
                            </tbody>
                        </table>
                    </div>
                    <p className="text-white/60 text-sm italic">
                        They must be read <strong className="text-cyan-300">together</strong>.
                    </p>
                    <Link href="/ion/conductivity-ec-tds">
                        <motion.span
                            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm cursor-pointer"
                            whileHover={{ x: 5 }}
                        >
                            Learn more about Conductivity <ArrowRight className="w-3 h-3" />
                        </motion.span>
                    </Link>
                </div>
            ),
            visual: (
                <div className="relative h-64 rounded-xl overflow-hidden">
                    <SmartImage
                        registryId="ion-redox-electron-flow"
                        className="w-full h-full object-contain bg-white/5 rounded-xl"
                        interaction="reveal"
                    />
                </div>
            )
        },
        {
            id: 'process-reading',
            headline: 'ORP Is a Process Reading, Not a Score',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80 mb-4">Important reframe:</p>
                    <div className="grid gap-3">
                        <motion.div
                            className="flex items-center gap-3 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <XCircle className="w-5 h-5 text-red-400" />
                            <span className="text-white/70">ORP is not a rating</span>
                        </motion.div>
                        <motion.div
                            className="flex items-center gap-3 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <XCircle className="w-5 h-5 text-red-400" />
                            <span className="text-white/70">ORP is not a goal</span>
                        </motion.div>
                        <motion.div
                            className="flex items-center gap-3 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="text-white/70">ORP is a <strong className="text-green-300">snapshot of ongoing reactions</strong></span>
                        </motion.div>
                    </div>
                    <p className="text-white/60 text-sm mt-4">
                        Trying to "force" ORP into a narrow range often destabilizes water systems. Nature prefers <strong className="text-cyan-300">adaptive redox flexibility</strong>.
                    </p>
                </div>
            ),
            visual: (
                <div className="relative h-64 rounded-xl overflow-hidden">
                    <SmartImage
                        registryId="ion-ph-orp-sensor"
                        className="w-full h-full object-contain bg-white/5 rounded-xl"
                        interaction="reveal"
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
                        Andara Ionic Sulfates are positioned to:
                    </p>
                    <motion.div
                        className="grid gap-2 mt-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } },
                            hidden: {}
                        }}
                    >
                        {[
                            'Interact with redox dynamics',
                            'Support balanced electron exchange',
                            'Avoid forcing extreme ORP states'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3"
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <Zap className="w-4 h-4 text-amber-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4">
                        The focus is <strong className="text-cyan-300">system coherence</strong>, not chasing numbers.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-6">
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
                        question="What does ORP measure in water?"
                        answer="ORP measures the tendency of water to accept or donate electrons. It's expressed in millivolts (mV) and indicates the electron activity, not water quality."
                        delay={0}
                    />
                    <FAQItem
                        question="Is negative ORP always better?"
                        answer="No. ORP must be interpreted in context. Many healthy natural waters have positive ORP. Stagnant, anaerobic water often has negative ORP and is biologically unstable."
                        delay={0.1}
                    />
                    <FAQItem
                        question="Why does ORP change quickly?"
                        answer="Because redox reactions respond instantly to oxygen, minerals, temperature, and flow. ORP is a snapshot of dynamic processes, not a fixed property."
                        delay={0.2}
                    />
                    <FAQItem
                        question="Does ORP measure purity?"
                        answer="No. ORP measures electron activity, not contamination levels. Clean water can have positive or negative ORP depending on its chemistry."
                        delay={0.3}
                    />
                </div>
            )
        }
    ];

    return (
        <IONLayout
            title="ORP & Redox — Reading Electron Movement, Not Water 'Quality'"
            subtitle="ORP is one of the most misunderstood measurements in water science. It doesn't measure cleanliness, safety, or life force. It measures electron tendency — whether a system prefers to give or take electrons."
            heroVisual={<VideoBackground keywords={["orp", "redox", "potential"]} overlayOpacity={0.4} className="max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/20" />}
            sections={sections}
            showParticles={true}
            particleVariant="hero-only"
            cta={{
                headline: "Ready to explore ionic sulfates?",
                body: "Learn how ionic minerals interact with water chemistry and redox dynamics.",
                buttonLabel: "Explore Ionic Sulfates",
                buttonHref: "/ion/ionic-sulfates"
            }}
            relatedPages={[
                { title: "Ions in Water", href: "/ion/water", description: "Water behavior fundamentals" },
                { title: "Conductivity (EC/TDS)", href: "/ion/conductivity-ec-tds", description: "What measurements reveal" },
                { title: "Ion Exchange", href: "/ion/ion-exchange", description: "Nature's binding mechanism" },
                { title: "Ionic Sulfates", href: "/ion/ionic-sulfates", description: "Product education" }
            ]}
        />
    );
}
