/**
 * ION Pillar Page - "Ions — The Invisible Technology of Nature"
 * /ion
 * 
 * The foundational page of the ION educational cluster.
 * Uses custom IONLayout with maximum animated particle effects.
 */

import React from 'react';
import { motion } from 'framer-motion';
// SEO handled by IONLayout
import { IONLayout } from '@/templates/gpt/IONLayout';
import { SmartImage } from '@/components/ui/SmartImage';
import { Link } from 'wouter';
import { ArrowRight, Zap, Droplets, Wind, Mountain, Activity, Sparkles, Atom } from 'lucide-react';
import { IONParticleField } from '@/components/visuals/IONParticleField';
import { IONFieldLines } from '@/components/visuals/IONFieldLines';
import { VideoBackground } from '@/components/SmartVideoEmbed';

// Animated ion badge component
function IonBadge({ charge, label, color }: { charge: '+' | '-'; label: string; color: string }) {
    return (
        <motion.div
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm ${charge === '+'
                ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300'
                }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${charge === '+' ? 'bg-amber-500 text-black' : 'bg-cyan-500 text-black'
                    }`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                {charge}
            </motion.span>
            {label}
        </motion.div>
    );
}

// Animated path card for ion exploration
function IonPathCard({
    icon: Icon,
    title,
    href,
    description,
    delay = 0
}: {
    icon: React.ElementType;
    title: string;
    href: string;
    description: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        >
            <Link href={href}>
                <div className="group rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 p-6 hover:border-cyan-500/40 hover:bg-cyan-500/15 transition-all cursor-pointer">
                    <div className="flex items-start gap-4">
                        <div className="rounded-xl bg-cyan-500/20 p-3 group-hover:bg-cyan-500/30 transition-colors">
                            <Icon className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                                {title}
                                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </h3>
                            <p className="mt-1 text-sm text-white/60">{description}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

function VideoHeroBackground() {
    return (
        <VideoBackground
            keywords={["ion", "hero", "charge"]}
            overlayOpacity={0.6}
            className="rounded-3xl"
        />
    );
}

export default function IonPillarPage() {
    const sections = [
        {
            id: 'what-is-ion',
            headline: 'What Is an Ion?',
            content: (
                <div className="space-y-4">
                    <p>
                        An ion is a particle with an <strong className="text-cyan-300">electric imbalance</strong>:
                    </p>
                    <div className="flex flex-wrap gap-3 my-6">
                        <IonBadge charge="+" label="Cation: positive ion (lost electrons)" color="amber" />
                        <IonBadge charge="-" label="Anion: negative ion (gained electrons)" color="cyan" />
                    </div>
                    <p>
                        This charge makes ions "social." They don't float randomly. They <strong className="text-cyan-300">attract</strong>, <strong className="text-purple-300">repel</strong>, <strong className="text-amber-300">bind</strong>, <strong className="text-green-300">exchange</strong>, and <strong className="text-blue-300">organize</strong>.
                    </p>
                    <p className="text-white/70">
                        That's why ions are not only "minerals in water."<br />
                        They are <strong className="text-cyan-300">behavioral instructions</strong> for matter.
                    </p>
                </div>
            ),
            visual: (
                <div className="relative h-64 rounded-xl overflow-hidden">
                    <IONParticleField particleCount={60} interactive />
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Atom className="w-16 h-16 text-cyan-400/30" />
                    </motion.div>
                </div>
            )
        },
        {
            id: 'two-hands',
            headline: 'The Two Hands of Nature: Positive + Negative',
            content: (
                <div className="space-y-6">
                    <p className="text-white/80">
                        Think of nature's purification like two hands working together:
                    </p>

                    {/* Cations */}
                    <motion.div
                        className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5"
                        whileHover={{ scale: 1.01 }}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <motion.span
                                className="w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold"
                                animate={{ boxShadow: ['0 0 0 0 rgba(251,191,36,0)', '0 0 0 8px rgba(251,191,36,0.3)', '0 0 0 0 rgba(251,191,36,0)'] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                +
                            </motion.span>
                            <h4 className="font-semibold text-amber-300">Cations (Positive) — The Binding Hand</h4>
                        </div>
                        <ul className="text-white/70 text-sm space-y-1 ml-11">
                            <li>• Pull particles together (flocculation)</li>
                            <li>• Bind to surfaces (adsorption)</li>
                            <li>• Exchange places (ion exchange)</li>
                            <li>• Stabilize structure (mineral matrix)</li>
                        </ul>
                        <p className="text-xs text-amber-300/60 mt-3 ml-11">Examples: Ca²⁺, Mg²⁺, Na⁺, K⁺, Fe²⁺/Fe³⁺</p>
                    </motion.div>

                    {/* Anions */}
                    <motion.div
                        className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5"
                        whileHover={{ scale: 1.01 }}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <motion.span
                                className="w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold"
                                animate={{ boxShadow: ['0 0 0 0 rgba(6,182,212,0)', '0 0 0 8px rgba(6,182,212,0.3)', '0 0 0 0 rgba(6,182,212,0)'] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                −
                            </motion.span>
                            <h4 className="font-semibold text-cyan-300">Anions (Negative) — The Clearing Hand</h4>
                        </div>
                        <ul className="text-white/70 text-sm space-y-1 ml-11">
                            <li>• Acid/alkaline buffering</li>
                            <li>• Complexing metals (binding into new forms)</li>
                            <li>• Charge separation in water</li>
                            <li>• Atmospheric freshness (negative air ions)</li>
                        </ul>
                        <p className="text-xs text-cyan-300/60 mt-3 ml-11">Examples: Cl⁻, SO₄²⁻, HCO₃⁻, OH⁻</p>
                    </motion.div>

                    <p className="text-center text-white/60 italic">
                        Nature needs both. A living system is not "positive or negative."<br />
                        It is <strong className="text-purple-300">dynamic balance</strong>.
                    </p>
                </div>
            )
        },
        {
            id: 'ions-in-nature',
            headline: 'Where Ions Live in Nature',
            layout: 'full-width' as const,
            content: (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
                    <IonPathCard
                        icon={Droplets}
                        title="Ions in Water"
                        href="/ion/water"
                        description="Clarity, conductivity, buffering, and micro-structuring"
                        delay={0}
                    />
                    <IonPathCard
                        icon={Wind}
                        title="Ions in the Ocean"
                        href="/ion/sea"
                        description="Earth's mineral battery and coastal reset energy"
                        delay={0.1}
                    />
                    <IonPathCard
                        icon={Sparkles}
                        title="Ions in Air"
                        href="/ion/air-negative-ions"
                        description="Waterfalls, storms, and why air feels fresh"
                        delay={0.2}
                    />
                    <IonPathCard
                        icon={Mountain}
                        title="Ions in Soil"
                        href="/ion/soil"
                        description="Fertility, nutrient holding, and nature's ion bank"
                        delay={0.3}
                    />
                </div>
            )
        },
        {
            id: 'ion-mechanisms',
            headline: 'How Ions "Clean" and Transform Matter',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Nature uses charge to transform matter through core mechanisms:
                    </p>

                    <div className="grid gap-3 mt-6">
                        {[
                            { num: '1', title: 'Ion Exchange', desc: 'Charged surfaces swap ions — nature\'s "swap-and-lock" pathway', href: '/ion/ion-exchange' },
                            { num: '2', title: 'Adsorption + Binding', desc: 'Toxins and metals get bound to charged surfaces', href: null },
                            { num: '3', title: 'Flocculation', desc: 'Charge balance shifts → particles clump → water clears', href: null },
                            { num: '4', title: 'Redox (ORP)', desc: 'Electron flow changes how water behaves', href: '/ion/orp-redox' },
                            { num: '5', title: 'Interface Structuring', desc: 'Ordered water zones at mineral/membrane surfaces', href: null }
                        ].map((item, i) => (
                            <motion.div
                                key={item.num}
                                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-sm">
                                    {item.num}
                                </span>
                                <div className="flex-1">
                                    <div className="font-semibold text-white flex items-center gap-2">
                                        {item.title}
                                        {item.href && (
                                            <Link href={item.href}>
                                                <span className="text-xs text-cyan-400 hover:underline">Learn more →</span>
                                            </Link>
                                        )}
                                    </div>
                                    <p className="text-sm text-white/60">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ),
            visual: (
                <div className="relative h-80 rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-cyan-900/30">
                    <IONFieldLines variant="vortex" centerX={50} centerY={50} />
                    <SmartImage
                        registryId="ion-flow-circuit"
                        className="absolute inset-0 w-full h-full object-contain opacity-80"
                        interaction="reveal"
                    />
                </div>
            )
        },
        {
            id: 'andara-bridge',
            headline: 'Why This Matters for Andara Ionic Sulfates',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Andara Ionic is built on a simple nature principle:
                    </p>
                    <motion.blockquote
                        className="border-l-4 border-amber-500 pl-4 py-2 text-lg text-amber-200 italic"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        "Nature restores systems through mineral charge + spectrum + balance."
                    </motion.blockquote>
                    <p className="text-white/70">
                        Ionic sulfate minerals are not presented as "magic." They are presented as <strong className="text-cyan-300">nature's ionic logic</strong> — supporting water behavior through charge-based mechanisms: binding, settling, exchange, and mineral-spectrum coherence.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                        <Link href="/ion/ionic-sulfates">
                            <motion.span
                                className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/30 px-4 py-2 text-sm text-amber-300 hover:bg-amber-500/30 transition-colors cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Zap className="w-4 h-4" />
                                Ionic Sulfates
                                <ArrowRight className="w-3 h-3" />
                            </motion.span>
                        </Link>
                        <Link href="/ion/microdose-logic">
                            <motion.span
                                className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 border border-purple-500/30 px-4 py-2 text-sm text-purple-300 hover:bg-purple-500/30 transition-colors cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Activity className="w-4 h-4" />
                                Microdose Logic
                                <ArrowRight className="w-3 h-3" />
                            </motion.span>
                        </Link>
                    </div>
                </div>
            )
        },
        {
            id: 'choose-path',
            headline: 'Quick Start: Choose Your Path',
            layout: 'centered' as const,
            content: (
                <div className="space-y-6 text-center">
                    <p className="text-white/70">Select your learning journey:</p>

                    <div className="grid gap-4 md:grid-cols-3 text-left">
                        <motion.div
                            className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5"
                            whileHover={{ scale: 1.02, borderColor: 'rgba(6,182,212,0.4)' }}
                        >
                            <Droplets className="w-8 h-8 text-cyan-400 mb-3" />
                            <h4 className="font-semibold text-cyan-300 mb-2">For Water</h4>
                            <div className="text-sm text-white/60 space-y-1">
                                <Link href="/ion/water" className="block hover:text-cyan-300">→ Ions in Water</Link>
                                <Link href="/ion/ion-exchange" className="block hover:text-cyan-300">→ Ion Exchange</Link>
                                <Link href="/ion/conductivity-ec-tds" className="block hover:text-cyan-300">→ Conductivity</Link>
                            </div>
                        </motion.div>

                        <motion.div
                            className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5"
                            whileHover={{ scale: 1.02, borderColor: 'rgba(59,130,246,0.4)' }}
                        >
                            <Wind className="w-8 h-8 text-blue-400 mb-3" />
                            <h4 className="font-semibold text-blue-300 mb-2">For Ocean Reset</h4>
                            <div className="text-sm text-white/60 space-y-1">
                                <Link href="/ion/sea" className="block hover:text-blue-300">→ Sea Ions</Link>
                                <Link href="/ion/waves-cleaning" className="block hover:text-blue-300">→ Waves & Cleansing</Link>
                                <Link href="/ion/air-negative-ions" className="block hover:text-blue-300">→ Negative Ions</Link>
                            </div>
                        </motion.div>

                        <motion.div
                            className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5"
                            whileHover={{ scale: 1.02, borderColor: 'rgba(139,92,246,0.4)' }}
                        >
                            <Activity className="w-8 h-8 text-purple-400 mb-3" />
                            <h4 className="font-semibold text-purple-300 mb-2">For Bioelectric</h4>
                            <div className="text-sm text-white/60 space-y-1">
                                <Link href="/ion/bioelectric" className="block hover:text-purple-300">→ Bioelectricity</Link>
                                <Link href="/ion/electrolytes-vs-ionic-minerals" className="block hover:text-purple-300">→ Electrolytes vs Ionic</Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <IONLayout
            title="Ions — The Invisible Technology of Nature"
            subtitle="Nature doesn't 'clean' with chemicals first. Nature cleans with charge. An ion is simply an atom or molecule that carries an electrical charge — positive or negative. That one detail changes everything."
            heroVisual={<VideoHeroBackground />}
            sections={sections}
            showParticles={true}
            particleVariant="full-page"
            cta={{
                headline: "Ready to apply ion intelligence to your water?",
                body: "Explore Ionic Sulfates and how charge-based mineral behavior can contribute to cleaner, more stable water systems.",
                buttonLabel: "Explore Ionic Sulfates",
                buttonHref: "/ion/ionic-sulfates"
            }}
            relatedPages={[
                { title: "Ions in Water", href: "/ion/water", description: "Conductivity, clarity & exchange" },
                { title: "Ion Exchange", href: "/ion/ion-exchange", description: "Nature's filter mechanism" },
                { title: "Conductivity (EC/TDS)", href: "/ion/conductivity-ec-tds", description: "What it measures" },
                { title: "ORP & Redox", href: "/ion/orp-redox", description: "Electron flow explained" },
                { title: "Sea Ions", href: "/ion/sea", description: "Ocean reset energy" },
                { title: "FAQ: Ions", href: "/ion/faq", description: "Common questions" }
            ]}
        />
    );
}
