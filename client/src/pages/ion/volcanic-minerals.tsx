/**
 * Volcanic Minerals Page
 * /ion/volcanic-minerals
 * 
 * Fresh Earth Charge & Ionic Power - Earth's Renewal Portals
 * Features: Crystal formation animation, mineral lattice visualization
 */

import React from 'react';
import { motion } from 'framer-motion';
import { IONLayout } from '@/templates/gpt/IONLayout';
import { SmartImage } from '@/components/ui/SmartImage';
import { SmartVideoEmbed, VideoBackground } from '@/components/SmartVideoEmbed';
import { Link } from 'wouter';
import {
    ArrowRight,
    Mountain,
    Sparkles,
    Droplets,
    Leaf,
    Zap,
    RefreshCw,
    TrendingUp,
    Clock,
    HelpCircle
} from 'lucide-react';

// Volcanic Crystal Formation Animation
function CrystalFormationAnimation() {
    return (
        <div className="relative h-72 rounded-xl overflow-hidden bg-gradient-to-b from-orange-900/40 via-red-900/50 to-slate-900">
            {/* Magma glow */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-orange-600/40 to-transparent"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Rising crystals */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${15 + i * 14}%`,
                        bottom: '20%'
                    }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{
                        y: [50, -20 - i * 10, -20 - i * 10],
                        opacity: [0, 1, 1],
                        rotate: [0, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20]
                    }}
                    transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, repeatDelay: 2 }}
                >
                    {/* Crystal shape */}
                    <svg width="24" height="40" viewBox="0 0 24 40">
                        <polygon
                            points="12,0 24,15 18,40 6,40 0,15"
                            fill={`url(#crystal-gradient-${i})`}
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth="1"
                        />
                        <defs>
                            <linearGradient id={`crystal-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={i % 2 === 0 ? '#e040fb' : '#f5a623'} />
                                <stop offset="100%" stopColor={i % 2 === 0 ? '#9b59b6' : '#e67e22'} />
                            </linearGradient>
                        </defs>
                    </svg>
                </motion.div>
            ))}

            {/* Volcanic particles */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={`p-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-orange-400"
                    style={{ left: `${10 + Math.random() * 80}%`, bottom: '10%' }}
                    animate={{
                        y: [0, -100 - Math.random() * 100],
                        opacity: [1, 0],
                        scale: [1, 0.5]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: Math.random() * 2 }}
                />
            ))}

            {/* Label */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                <motion.div
                    className="bg-black/50 backdrop-blur-sm rounded-xl px-4 py-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-orange-300/80 text-sm flex items-center gap-2">
                        <Mountain className="w-4 h-4" />
                        Earth's Renewal Portals
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

// Comparison Card
function FreshVsAgedCard({
    title,
    items,
    fresh,
    delay = 0
}: {
    title: string;
    items: string[];
    fresh: boolean;
    delay?: number;
}) {
    return (
        <motion.div
            className={`rounded-xl border p-5 ${fresh
                ? 'border-green-500/20 bg-green-500/5'
                : 'border-slate-500/20 bg-slate-500/5'
                }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <div className="flex items-center gap-2 mb-3">
                {fresh ? (
                    <Sparkles className="w-5 h-5 text-green-400" />
                ) : (
                    <Clock className="w-5 h-5 text-slate-400" />
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
            className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
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
            videoId="volcanic-flow-bg"
            keywords={["volcanic", "genesis", "origin"]}
            overlayOpacity={0.4}
            className="rounded-3xl"
        />
    );
}

export default function VolcanicMineralsPage() {
    const sections = [
        {
            id: 'why-fresh-matters',
            headline: 'Why "Fresh" Minerals Matter',
            content: (
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <FreshVsAgedCard
                            title="As Minerals Age"
                            items={['Surfaces weather', 'Charge sites degrade', 'Exchange capacity declines', 'Trace elements leach away']}
                            fresh={false}
                            delay={0}
                        />
                        <FreshVsAgedCard
                            title="Fresh Volcanic Minerals"
                            items={['Sharp crystal edges', 'Active charge sites', 'Complex lattice structures', 'High ion-exchange potential']}
                            fresh={true}
                            delay={0.1}
                        />
                    </div>
                    <p className="text-white/70 mt-4">
                        This is why volcanic regions often become the most fertile soils, sources of legendary springs, and centers of biological abundance.
                    </p>
                </div>
            ),
            visual: (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-orange-500/20 shadow-xl">
                    <SmartVideoEmbed
                        keywords={["volcanic", "lava", "crystal", "formation"]}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-xs text-orange-300/80">Crystalline Genesis</p>
                    </div>
                </div>
            )
        },
        {
            id: 'how-formed',
            headline: 'How Volcanic Minerals Are Formed',
            content: (
                <div className="space-y-4">
                    <h4 className="text-orange-300 font-semibold">Inside Earth:</h4>
                    <motion.div className="grid gap-2">
                        {[
                            'Intense heat melts rock',
                            'Minerals dissolve into magma',
                            'Pressure builds',
                            'Elements reorganize at atomic scale'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-orange-500/10 border border-orange-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Mountain className="w-4 h-4 text-orange-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <h4 className="text-purple-300 font-semibold mt-6">When Magma Reaches Surface:</h4>
                    <motion.div className="grid gap-2">
                        {[
                            'Rapid cooling "locks in" structures',
                            'Minerals crystallize in complex forms',
                            'Charge distributions are preserved'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-purple-500/10 border border-purple-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                            >
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                <span className="text-white/70">{item}</span>
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
                            This process creates <strong className="text-amber-300">highly active mineral matrices</strong>.
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            id: 'ionic-behavior',
            headline: 'Ionic Behavior of Volcanic Minerals',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Volcanic minerals often:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            { text: 'Release ions gradually', icon: Clock },
                            { text: 'Interact strongly with water', icon: Droplets },
                            { text: 'Provide broad mineral spectra', icon: Sparkles },
                            { text: 'Support ion exchange processes', icon: RefreshCw }
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
                        This slow, structured release is why they are favored in soil regeneration, water filtration, and natural spring systems.
                    </p>
                </div>
            ),
            visual: (
                <div className="relative aspect-square rounded-xl overflow-hidden border border-purple-500/20 shadow-lg">
                    <SmartVideoEmbed
                        keywords={["crystal", "lattice", "volcanic", "structure"]}
                        aspectRatio="square"
                        className="w-full h-full object-cover"
                    />
                </div>
            )
        },
        {
            id: 'water-interaction',
            headline: 'Volcanic Minerals & Water',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">When water contacts volcanic rock:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Mineral ions dissolve into solution',
                            'Exchange sites interact with dissolved ions',
                            'Water gains buffering capacity',
                            'Clarity and stability increase over time'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-blue-500/10 border border-blue-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Droplets className="w-4 h-4 text-blue-400" />
                                <span className="text-white/70">{item}</span>
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
                            Many famous mineral waters originate from <strong className="text-amber-300">volcanic aquifers</strong> for this reason.
                        </p>
                    </motion.div>
                    <Link href="/ion/water">
                        <motion.span
                            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm cursor-pointer mt-2"
                            whileHover={{ x: 5 }}
                        >
                            Explore Water Behavior <ArrowRight className="w-3 h-3" />
                        </motion.span>
                    </Link>
                </div>
            )
        },
        {
            id: 'soil-fertility',
            headline: 'Volcanic Minerals & Soil Fertility',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Volcanic soils (Andisols) are known for:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'High cation exchange capacity',
                            'Exceptional trace mineral content',
                            'Strong organic matter binding',
                            'Long-term fertility'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Leaf className="w-4 h-4 text-green-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4 italic">
                        These soils feed civilizations without synthetic inputs when managed correctly.
                    </p>
                    <Link href="/ion/soil">
                        <motion.span
                            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm cursor-pointer mt-2"
                            whileHover={{ x: 5 }}
                        >
                            Explore Soil Intelligence <ArrowRight className="w-3 h-3" />
                        </motion.span>
                    </Link>
                </div>
            )
        },
        {
            id: 'catalyst-role',
            headline: 'Volcanic Minerals as Ionic Catalysts',
            content: (
                <div className="space-y-4">
                    <motion.div
                        className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-amber-200 text-sm mb-2"><strong>Important distinction:</strong></p>
                        <p className="text-white/70 text-sm">
                            Volcanic minerals don't "force" reactions. They <strong className="text-cyan-300">facilitate</strong> exchange and balance.
                        </p>
                    </motion.div>
                    <p className="text-white/80 mt-4">They act as:</p>
                    <motion.div className="grid gap-2 md:grid-cols-3 mt-2">
                        {[
                            { label: 'Ionic catalysts', icon: Zap },
                            { label: 'Mineral mediators', icon: RefreshCw },
                            { label: 'Long-term stabilizers', icon: TrendingUp }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-2 rounded-lg bg-purple-500/10 border border-purple-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <item.icon className="w-4 h-4 text-purple-400" />
                                <span className="text-white/70 text-sm">{item.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4 italic">
                        This is nature's preferred strategy.
                    </p>
                </div>
            )
        },
        {
            id: 'andara-context',
            headline: 'Andara Ionic Origin Logic',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Andara Ionic Sulfates follow volcanic logic:
                    </p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Earth-derived mineral matrices',
                            'Ionic availability without overload',
                            'Spectrum over single-element focus',
                            'Slow interaction, not aggressive chemistry'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Mountain className="w-4 h-4 text-amber-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <Link href="/ion/ionic-sulfates">
                            <motion.span
                                className="inline-flex items-center gap-2 rounded-xl bg-amber-500/20 border border-amber-500/30 px-5 py-3 text-amber-300 hover:bg-amber-500/30 transition-colors cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                            >
                                Ionic Sulfates <ArrowRight className="w-4 h-4" />
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
                        question="Why are volcanic minerals special?"
                        answer="They are freshly formed, highly structured, and retain strong ionic activity."
                        delay={0}
                    />
                    <FAQItem
                        question="Are volcanic minerals better than synthetic ones?"
                        answer="They provide broader mineral spectra and interact more naturally with biological and water systems."
                        delay={0.1}
                    />
                    <FAQItem
                        question="Why are volcanic soils so fertile?"
                        answer="Because of high ion exchange capacity and trace mineral diversity."
                        delay={0.2}
                    />
                    <FAQItem
                        question="Do volcanic minerals dissolve quickly?"
                        answer="No. They release ions gradually, supporting long-term balance."
                        delay={0.3}
                    />
                </div>
            )
        }
    ];

    return (
        <IONLayout
            title="Volcanic Minerals — Earth's Freshest Mineral Intelligence"
            subtitle="Volcanoes are not destruction machines. They are Earth's renewal portals — bringing new minerals, fresh crystal structures, high-energy lattices, and untapped ionic potential to the surface."
            heroVisual={<VideoBackground keywords={["volcanic", "genesis", "origin"]} overlayOpacity={0.4} className="max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/20" />}
            sections={sections}
            showParticles={true}
            particleVariant="hero-only"
            cta={{
                headline: "Curious how ions power life inside the body?",
                body: "Discover how bioelectricity drives nerves, muscles, and cellular communication.",
                buttonLabel: "Explore Bioelectricity",
                buttonHref: "/ion/bioelectric"
            }}
            relatedPages={[
                { title: "Soil Ions", href: "/ion/soil", description: "Soil systems" },
                { title: "Ions in Water", href: "/ion/water", description: "Water interaction" },
                { title: "Ion Exchange", href: "/ion/ion-exchange", description: "Exchange mechanics" },
                { title: "Ionic Sulfates", href: "/ion/ionic-sulfates", description: "Product education" }
            ]}
        />
    );
}
