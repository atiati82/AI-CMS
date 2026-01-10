/**
 * Ion Exchange Page
 * /ion/ion-exchange
 * 
 * Nature's swap-and-lock filter mechanism explained.
 */

import React from 'react';
import { motion } from 'framer-motion';
// SEO handled by IONLayout
import { IONLayout } from '@/templates/gpt/IONLayout';
import { SmartVideoEmbed, VideoBackground } from '@/components/SmartVideoEmbed';
import { SmartImage } from '@/components/ui/SmartImage';
import { Link } from 'wouter';
import { ArrowRight, RotateCcw, Filter, Layers, Droplets, Mountain, Leaf, Zap, RefreshCw } from 'lucide-react';
import { IONFieldLines } from '@/components/visuals/IONFieldLines';
import { IONParticleField } from '@/components/visuals/IONParticleField';

// Animated exchange step
function ExchangeStep({
    num,
    title,
    description,
    delay = 0
}: {
    num: string;
    title: string;
    description: string;
    delay?: number;
}) {
    return (
        <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-500/40 flex items-center justify-center shrink-0"
                animate={{
                    boxShadow: ['0 0 0 0 rgba(6,182,212,0)', '0 0 0 8px rgba(6,182,212,0.2)', '0 0 0 0 rgba(6,182,212,0)']
                }}
                transition={{ duration: 3, repeat: Infinity, delay: delay * 2 }}
            >
                <span className="text-cyan-300 font-bold text-sm">{num}</span>
            </motion.div>
            <div>
                <h4 className="font-semibold text-white mb-1">{title}</h4>
                <p className="text-white/60 text-sm">{description}</p>
            </div>
        </motion.div>
    );
}

// Nature example card
function NatureExampleCard({
    icon: Icon,
    title,
    description,
    color,
    delay = 0
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
    delay?: number;
}) {
    const colorClasses: Record<string, string> = {
        cyan: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400',
        amber: 'border-amber-500/20 bg-amber-500/5 text-amber-400',
        green: 'border-green-500/20 bg-green-500/5 text-green-400',
        purple: 'border-purple-500/20 bg-purple-500/5 text-purple-400'
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
            <h4 className="font-semibold text-white mb-2">{title}</h4>
            <p className="text-white/60 text-sm">{description}</p>
        </motion.div>
    );
}

// Ion exchange animation
function IonExchangeAnimation() {
    return (
        <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-cyan-900/30">
            <IONParticleField particleCount={60} interactive />
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="flex items-center gap-4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <motion.span
                        className="w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold text-xl"
                        animate={{ x: [0, 30, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        +
                    </motion.span>
                    <RefreshCw className="w-6 h-6 text-white/40" />
                    <motion.span
                        className="w-10 h-10 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold text-xl"
                        animate={{ x: [0, -30, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        −
                    </motion.span>
                </motion.div>
            </div>
        </div>
    );
}

export default function IonExchangePage() {
    const sections = [
        {
            id: 'what-is-exchange',
            headline: 'What Is Ion Exchange?',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Ion exchange is one of nature's most powerful purification tools:
                    </p>
                    <motion.blockquote
                        className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-500/5 rounded-r-lg"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-amber-200 italic">
                            "A charged surface swaps one ion for another — same charge, different species."
                        </p>
                    </motion.blockquote>
                    <p className="text-white/70">
                        It's how clays clean rivers. How zeolites purify. How soil holds nutrients. How the body filters toxins.
                    </p>
                    <p className="text-white/60 text-sm mt-4">
                        The key principle: <strong className="text-cyan-300">Like charges replace like charges</strong>.
                    </p>
                </div>
            ),
            visual: <IonExchangeAnimation />
        },
        {
            id: 'how-it-works',
            headline: 'How Ion Exchange Works',
            content: (
                <div className="space-y-6">
                    <ExchangeStep
                        num="1"
                        title="Surface Has Fixed Charge Sites"
                        description="Clay, zeolite, resin, or mineral surface holds cations or anions at fixed locations."
                        delay={0}
                    />
                    <ExchangeStep
                        num="2"
                        title="Water Carries Competing Ions"
                        description="Water containing unwanted ions (e.g., heavy metals) passes by."
                        delay={0.1}
                    />
                    <ExchangeStep
                        num="3"
                        title="Swap Occurs"
                        description="A stronger-binding ion displaces a weaker one. E.g., Ca²⁺ bumps Na⁺ off."
                        delay={0.2}
                    />
                    <ExchangeStep
                        num="4"
                        title="Lock In Place"
                        description="The new ion is held at the surface. The old one goes into solution."
                        delay={0.3}
                    />
                    <p className="text-white/60 text-sm mt-4 pl-14 italic">
                        This is not "filtration" in the mechanical sense. It's <strong className="text-cyan-300">chemical swapping</strong>.
                    </p>
                </div>
            )
        },
        {
            id: 'selectivity',
            headline: 'Selectivity: Not All Ions Are Equal',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Ion exchange surfaces have <strong className="text-purple-300">preferences</strong>:
                    </p>
                    <motion.div
                        className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-5 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-purple-300 font-semibold mb-3">General Selectivity Series (Cations):</p>
                        <div className="flex flex-wrap gap-2 text-sm">
                            {['Fe³⁺ > Al³⁺', '> Ca²⁺ > Mg²⁺', '> K⁺ > Na⁺', '> H⁺'].map((item, i) => (
                                <motion.span
                                    key={i}
                                    className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    {item}
                                </motion.span>
                            ))}
                        </div>
                        <p className="text-white/60 text-xs mt-3">
                            Higher charge and larger size generally mean stronger binding.
                        </p>
                    </motion.div>
                    <p className="text-white/70 mt-4">
                        This explains why iron can displace calcium, why heavy metals can accumulate, and why multi-ion systems compete dynamically.
                    </p>
                </div>
            ),
            visual: (
                <div className="relative h-64 rounded-xl overflow-hidden">
                    <IONFieldLines variant="radial" centerX={50} centerY={50} />
                </div>
            )
        },
        {
            id: 'where-it-happens',
            headline: 'Where Ion Exchange Happens in Nature',
            layout: 'full-width' as const,
            content: (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
                    <NatureExampleCard
                        icon={Mountain}
                        title="Clay Soils"
                        description="Hold nutrients via cation exchange capacity (CEC). Release to plant roots."
                        color="amber"
                        delay={0}
                    />
                    <NatureExampleCard
                        icon={Filter}
                        title="Zeolites"
                        description="Natural microporous minerals used for water softening and toxin binding."
                        color="cyan"
                        delay={0.1}
                    />
                    <NatureExampleCard
                        icon={Layers}
                        title="Riverbeds"
                        description="Sediments exchange ions with passing water, naturally clarifying flow."
                        color="green"
                        delay={0.2}
                    />
                    <NatureExampleCard
                        icon={Leaf}
                        title="Root Systems"
                        description="Plants exchange H⁺ for nutrient cations (K⁺, Ca²⁺, Mg²⁺) at root surfaces."
                        color="purple"
                        delay={0.3}
                    />
                </div>
            )
        },
        {
            id: 'water-treatment',
            headline: 'Ion Exchange in Water Treatment',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Many modern water systems use synthetic ion exchange resins:
                    </p>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                        <motion.div
                            className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5"
                            whileHover={{ scale: 1.02 }}
                        >
                            <h4 className="font-semibold text-cyan-300 mb-2">Cation Exchange</h4>
                            <p className="text-white/60 text-sm">
                                Removes Ca²⁺, Mg²⁺ (hardness), heavy metals.<br />
                                Releases Na⁺ or H⁺ in return.
                            </p>
                        </motion.div>
                        <motion.div
                            className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-5"
                            whileHover={{ scale: 1.02 }}
                        >
                            <h4 className="font-semibold text-purple-300 mb-2">Anion Exchange</h4>
                            <p className="text-white/60 text-sm">
                                Removes NO₃⁻, SO₄²⁻, arsenate, chromate.<br />
                                Releases Cl⁻ or OH⁻ in return.
                            </p>
                        </motion.div>
                    </div>
                    <motion.div
                        className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-amber-200 text-sm">
                            <strong>Note:</strong> These resins eventually "fill up" and require regeneration (usually with salt or acid).
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            id: 'andara-context',
            headline: 'How This Relates to Ionic Minerals',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        When you add ionic minerals to water:
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
                            { icon: Zap, text: 'Ions become available for exchange reactions', color: 'text-cyan-400' },
                            { icon: RotateCcw, text: 'Existing charge balance shifts', color: 'text-purple-400' },
                            { icon: Droplets, text: 'Flocculation/settling may occur (visible result)', color: 'text-amber-400' }
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
                    <p className="text-white/60 text-sm mt-4">
                        This is why a "clear" treated water may show visible change after ionic minerals are added — you are witnessing <strong className="text-cyan-300">charge chemistry in action</strong>.
                    </p>
                    <div className="flex gap-4 mt-6">
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
            ),
            visual: (
                <div className="relative h-64 rounded-xl overflow-hidden">
                    <SmartImage
                        registryId="ion-flow-circuit"
                        className="w-full h-full object-contain"
                        interaction="reveal"
                    />
                </div>
            )
        },
        {
            id: 'key-takeaways',
            headline: 'Key Takeaways',
            layout: 'centered' as const,
            content: (
                <div className="space-y-4">
                    <motion.div
                        className="grid gap-3 max-w-2xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } },
                            hidden: {}
                        }}
                    >
                        {[
                            'Ion exchange is a swap — not a filter in the mechanical sense',
                            'Selectivity determines which ions "win" the binding competition',
                            'Nature uses this to clean water, feed plants, and maintain balance',
                            'Ionic minerals participate in these reactions when added to water',
                            'Visible changes (color, floc, settling) can indicate exchange activity'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-start gap-3 rounded-lg bg-white/5 px-4 py-3"
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                                    {i + 1}
                                </span>
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            )
        }
    ];

    return (
        <IONLayout
            title="Ion Exchange — Nature's Swap-and-Lock Filtration"
            subtitle="How charged surfaces selectively exchange minerals, capture toxins, and reorganize molecular structures through the simplest force in physics: attraction."
            heroVisual={<VideoBackground keywords={["cation", "exchange", "surface"]} overlayOpacity={0.4} className="max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20" />}
            sections={sections}
            showParticles={true}
            particleVariant="hero-only"
            cta={{
                headline: "Ready to explore conductivity?",
                body: "Understand what EC and TDS really measure — and what they miss.",
                buttonLabel: "Learn About Conductivity",
                buttonHref: "/ion/conductivity-ec-tds"
            }}
            relatedPages={[
                { title: "Ions in Water", href: "/ion/water", description: "Water behavior fundamentals" },
                { title: "Conductivity (EC/TDS)", href: "/ion/conductivity-ec-tds", description: "Measurement explained" },
                { title: "ORP & Redox", href: "/ion/orp-redox", description: "Electron flow explained" },
                { title: "Ionic Sulfates", href: "/ion/ionic-sulfates", description: "Product education" }
            ]}
        />
    );
}
