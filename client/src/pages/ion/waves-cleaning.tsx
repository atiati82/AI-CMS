/**
 * Waves & Cleaning Page
 * /ion/waves-cleaning
 * 
 * How Motion, Charge & Oxygen Renew Water - Nature's Self-Cleaning Engine
 * Features: Wave animations, turbulence visualization, 4 cleansing actions
 */

import React from 'react';
import { motion, type Easing } from 'framer-motion';
import { IONLayout } from '@/templates/gpt/IONLayout';
import { SmartImage } from '@/components/ui/SmartImage';
import { SmartVideoEmbed } from '@/components/SmartVideoEmbed';
import { Link } from 'wouter';
import {
    ArrowRight,
    Waves,
    Wind,
    Zap,
    Droplets,
    RefreshCw,
    Sparkles,
    CircleDot,
    Activity,
    Filter,
    Shuffle,
    TrendingUp,
    XCircle,
    CheckCircle,
    HelpCircle
} from 'lucide-react';
import { IONParticleField } from '@/components/visuals/IONParticleField';
import { IONFieldLines } from '@/components/visuals/IONFieldLines';

// Dynamic Turbulence Animation
function TurbulenceAnimation() {
    return (
        <div className="relative h-72 rounded-xl overflow-hidden bg-gradient-to-b from-cyan-900/40 via-blue-900/50 to-indigo-900/40">
            <IONFieldLines variant="vortex" />

            {/* Animated turbulence particles */}
            <div className="absolute inset-0">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full ${i % 4 === 0 ? 'w-4 h-4 bg-white/30' :
                            i % 4 === 1 ? 'w-2 h-2 bg-cyan-400/50' :
                                i % 4 === 2 ? 'w-3 h-3 bg-blue-400/40' : 'w-2 h-2 bg-white/20'
                            }`}
                        style={{
                            left: `${10 + Math.random() * 80}%`,
                            top: `${10 + Math.random() * 80}%`
                        }}
                        animate={{
                            x: [0, (Math.random() - 0.5) * 80, 0],
                            y: [0, (Math.random() - 0.5) * 60, 0],
                            opacity: [0.2, 0.8, 0.2],
                            scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="text-center bg-black/30 backdrop-blur-sm rounded-xl px-6 py-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <Shuffle className="w-10 h-10 text-cyan-400/80 mx-auto mb-2" />
                    <p className="text-cyan-300/80 text-sm">Continuous Mixing</p>
                </motion.div>
            </div>
        </div>
    );
}

// Wave Animation with flowing bars
function WaveFlowAnimation() {
    return (
        <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-b from-blue-900/40 to-cyan-900/50">
            <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                {[0, 1, 2, 3].map((i) => (
                    <motion.path
                        key={i}
                        d={`M0,${140 - i * 20} Q100,${120 - i * 20} 200,${140 - i * 20} T400,${140 - i * 20} L400,200 L0,200 Z`}
                        fill={`rgba(6,182,212,${0.15 + i * 0.05})`}
                        animate={{
                            d: [
                                `M0,${140 - i * 20} Q100,${120 - i * 20} 200,${140 - i * 20} T400,${140 - i * 20} L400,200 L0,200 Z`,
                                `M0,${120 - i * 20} Q100,${160 - i * 20} 200,${120 - i * 20} T400,${120 - i * 20} L400,200 L0,200 Z`,
                                `M0,${140 - i * 20} Q100,${120 - i * 20} 200,${140 - i * 20} T400,${140 - i * 20} L400,200 L0,200 Z`
                            ]
                        }}
                        transition={{ duration: 4 - i * 0.5, repeat: Infinity, ease: "easeInOut" as Easing, delay: i * 0.2 }}
                    />
                ))}
            </svg>

            {/* Oxygen bubbles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-white/40"
                    style={{ left: `${15 + i * 10}%`, bottom: '20%' }}
                    animate={{
                        y: [-20, -80, -20],
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.4
                    }}
                />
            ))}
        </div>
    );
}

// Cleansing Action Card
function CleansingActionCard({
    number,
    title,
    icon: Icon,
    description,
    bullets,
    color,
    delay = 0
}: {
    number: number;
    title: string;
    icon: React.ElementType;
    description: string;
    bullets: string[];
    color: string;
    delay?: number;
}) {
    const colorClasses: Record<string, { border: string; bg: string; text: string; badge: string }> = {
        cyan: { border: 'border-cyan-500/30', bg: 'bg-cyan-500/5', text: 'text-cyan-400', badge: 'bg-cyan-500' },
        blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/5', text: 'text-blue-400', badge: 'bg-blue-500' },
        purple: { border: 'border-purple-500/30', bg: 'bg-purple-500/5', text: 'text-purple-400', badge: 'bg-purple-500' },
        amber: { border: 'border-amber-500/30', bg: 'bg-amber-500/5', text: 'text-amber-400', badge: 'bg-amber-500' }
    };

    const c = colorClasses[color];

    return (
        <motion.div
            className={`rounded-xl border ${c.border} ${c.bg} p-5`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            whileHover={{ scale: 1.02 }}
        >
            <div className="flex items-center gap-3 mb-3">
                <span className={`w-8 h-8 rounded-full ${c.badge} text-black font-bold flex items-center justify-center text-sm`}>
                    {number}
                </span>
                <Icon className={`w-5 h-5 ${c.text}`} />
                <h4 className="font-semibold text-white">{title}</h4>
            </div>
            <p className="text-white/70 text-sm mb-3">{description}</p>
            <ul className="space-y-1">
                {bullets.map((bullet, i) => (
                    <li key={i} className="text-white/50 text-xs flex items-center gap-2">
                        <CircleDot className={`w-3 h-3 ${c.text}`} />
                        {bullet}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

// Comparison Row
function ComparisonRow({
    label,
    stagnant,
    moving,
    delay = 0
}: {
    label: string;
    stagnant: string;
    moving: string;
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
            <span className="text-cyan-300 font-medium">{label}</span>
            <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-400/60" />
                <span className="text-white/60 text-sm">{stagnant}</span>
            </div>
            <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400/60" />
                <span className="text-white/60 text-sm">{moving}</span>
            </div>
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
            className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-semibold text-white mb-2">{question}</h4>
                    <p className="text-white/60 text-sm">{answer}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default function WavesCleaningPage() {
    const sections = [
        {
            id: 'why-motion',
            headline: 'Why Motion Changes Water Behavior',
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm font-medium mb-2">
                        <span></span>
                        <span className="text-red-400/80">Stagnant Water</span>
                        <span className="text-green-400/80">Moving Water</span>
                    </div>
                    <ComparisonRow
                        label="Ions"
                        stagnant="Settle into local equilibrium"
                        moving="Constantly re-encounter new partners"
                        delay={0}
                    />
                    <ComparisonRow
                        label="Oxygen"
                        stagnant="Gradients collapse"
                        moving="Continuously renewed"
                        delay={0.1}
                    />
                    <ComparisonRow
                        label="Particles"
                        stagnant="Remain suspended or decay"
                        moving="Collide, bind, and settle"
                        delay={0.2}
                    />
                    <ComparisonRow
                        label="Redox"
                        stagnant="Zones become extreme"
                        moving="States oscillate (balance)"
                        delay={0.3}
                    />
                    <motion.div
                        className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-amber-200 text-sm">
                            Movement prevents <strong className="text-cyan-300">energetic stagnation</strong>.
                        </p>
                    </motion.div>
                </div>
            ),
            visual: (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-cyan-500/20 shadow-xl">
                    <SmartVideoEmbed
                        keywords={["water", "mixing", "turbulence", "flow"]}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-xs text-cyan-300/80">Continuous Mixing Engine</p>
                    </div>
                </div>
            )
        },
        {
            id: 'four-actions',
            headline: 'The Four Cleansing Actions of Waves',
            layout: 'full-width' as const,
            content: (
                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <CleansingActionCard
                        number={1}
                        title="Mixing & Redistribution"
                        icon={Shuffle}
                        description="Waves force fresh contact between ions"
                        bullets={['Even distribution of minerals', 'Breakup of localized imbalances', 'Prevents pockets of instability']}
                        color="cyan"
                        delay={0}
                    />
                    <CleansingActionCard
                        number={2}
                        title="Oxygenation"
                        icon={Wind}
                        description="When water moves, surface area increases"
                        bullets={['Gas exchange accelerates', 'Dissolved oxygen rises', 'Unstable compounds oxidize']}
                        color="blue"
                        delay={0.1}
                    />
                    <CleansingActionCard
                        number={3}
                        title="Charge Separation"
                        icon={Zap}
                        description="Turbulence causes momentary charge separation"
                        bullets={['Rapid recombination', 'Micro-redox cycling', 'Water stays electrically alive']}
                        color="purple"
                        delay={0.2}
                    />
                    <CleansingActionCard
                        number={4}
                        title="Particle Flocculation"
                        icon={CircleDot}
                        description="Movement increases collision frequency"
                        bullets={['Small particles meet', 'Charges neutralize, clusters form', 'Gravity can act']}
                        color="amber"
                        delay={0.3}
                    />
                </div>
            )
        },
        {
            id: 'ocean-waves',
            headline: 'Ocean Waves: The Master Example',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Breaking waves combine all four actions:
                    </p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            { text: 'Extreme mixing', icon: Shuffle },
                            { text: 'Intense oxygenation', icon: Wind },
                            { text: 'Aerosol formation', icon: Sparkles },
                            { text: 'Constant renewal', icon: RefreshCw }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <item.icon className="w-4 h-4 text-cyan-400" />
                                <span className="text-white/70">{item.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4">
                        That's why coastal waters resist stagnation, odors dissipate quickly, and biological balance persists.
                    </p>
                </div>
            ),
            visual: (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-cyan-500/20 shadow-lg">
                    <SmartVideoEmbed
                        keywords={["ocean", "waves", "shore", "mist"]}
                        className="w-full h-full object-cover"
                    />
                </div>
            )
        },
        {
            id: 'rivers-rapids',
            headline: 'Rivers, Rapids & Waterfalls',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Fast-moving freshwater systems show similar effects:
                    </p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Mineral contact with rocks',
                            'Turbulent aeration',
                            'Ion exchange at surfaces',
                            'Settling zones downstream'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-blue-500/10 border border-blue-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Waves className="w-4 h-4 text-blue-400" />
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
                            This is <strong className="text-cyan-300">sequential purification</strong>: movement → interaction → settling → clarity.
                        </p>
                    </motion.div>
                </div>
            ),
            visual: (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-blue-500/20 shadow-lg">
                    <SmartVideoEmbed
                        keywords={["river", "rapids", "mountain", "clean"]}
                        className="w-full h-full object-cover"
                    />
                </div>
            )
        },
        {
            id: 'ocean-chemistry',
            headline: 'Ocean Chemistry in Motion',
            layout: 'full-width' as const,
            content: (
                <div className="grid gap-6 md:grid-cols-2 mt-6">
                    <motion.div
                        className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="font-semibold text-white mb-3">Carbon Calcium Cycle</h4>
                        <SmartImage
                            registryId="ion-ocean-carbon-calcium-cycle"
                            className="w-full h-48 object-contain rounded-lg"
                            interaction="reveal"
                        />
                        <p className="text-white/60 text-xs mt-2">
                            CO₂ absorption, carbonate equilibrium, and mineral formation on calcifying plankton.
                        </p>
                    </motion.div>
                    <motion.div
                        className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="font-semibold text-white mb-3">Ocean Chemistry Balance</h4>
                        <SmartImage
                            registryId="ion-ocean-acidification-chemistry"
                            className="w-full h-48 object-contain rounded-lg"
                            interaction="reveal"
                        />
                        <p className="text-white/60 text-xs mt-2">
                            CO₂ + H₂O + CO₃²⁻ → 2HCO₃⁻ reaction and carbonate ion dynamics.
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            id: 'waves-vs-filtration',
            headline: 'Waves vs Mechanical Filtration',
            content: (
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <motion.div
                            className="rounded-xl border border-slate-500/20 bg-slate-500/5 p-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <Filter className="w-5 h-5 text-slate-400" />
                                <h4 className="font-semibold text-white">Mechanical Filters</h4>
                            </div>
                            <ul className="space-y-1 text-white/60 text-sm">
                                <li>• Remove particles</li>
                                <li>• Require maintenance</li>
                                <li>• Operate statically</li>
                            </ul>
                        </motion.div>
                        <motion.div
                            className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <Waves className="w-5 h-5 text-cyan-400" />
                                <h4 className="font-semibold text-white">Wave-Based Cleaning</h4>
                            </div>
                            <ul className="space-y-1 text-white/60 text-sm">
                                <li>• Prevents buildup</li>
                                <li>• Renews continuously</li>
                                <li>• Integrates chemistry, physics, biology</li>
                            </ul>
                        </motion.div>
                    </div>
                    <motion.div
                        className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-green-200 text-sm">
                            The most resilient systems <strong className="text-cyan-300">combine both</strong>.
                        </p>
                    </motion.div>
                </div>
            ),
            visual: (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-cyan-500/20 shadow-xl">
                    <SmartVideoEmbed
                        keywords={["water", "clarify", "clean", "purity"]}
                        className="w-full h-full object-cover"
                    />
                </div>
            )
        },
        {
            id: 'design-wisdom',
            headline: 'Designing With Wave Intelligence',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Nature teaches that effective water systems benefit from:
                    </p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            { text: 'Flow variation (not constant speed)', icon: TrendingUp },
                            { text: 'Turbulence zones', icon: Shuffle },
                            { text: 'Mineral contact', icon: Droplets },
                            { text: 'Rest zones for settling', icon: Activity }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-purple-500/10 border border-purple-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <item.icon className="w-4 h-4 text-purple-400" />
                                <span className="text-white/70">{item.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4 italic">
                        Pure stillness is not natural. Pure force is not sustainable.
                    </p>
                </div>
            )
        },
        {
            id: 'ionic-synergy',
            headline: 'Ionic Minerals & Motion Synergy',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Ionic minerals interact more effectively when water moves:
                    </p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Exchange sites refresh',
                            'Binding reactions accelerate',
                            'Charge balance stays dynamic'
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
                    <p className="text-white/60 text-sm mt-4">
                        This is why dilution + motion often outperforms concentration, and small inputs can have large system effects.
                    </p>
                    <Link href="/ion/microdose-logic">
                        <motion.span
                            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm cursor-pointer mt-2"
                            whileHover={{ x: 5 }}
                        >
                            Learn about Microdose Logic <ArrowRight className="w-3 h-3" />
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
                        question="Do waves really clean water?"
                        answer="Yes. Waves promote mixing, oxygenation, charge balance, and particle settling."
                        delay={0}
                    />
                    <FAQItem
                        question="Why does stagnant water smell?"
                        answer="Because low oxygen and locked redox conditions allow unstable compounds to accumulate."
                        delay={0.1}
                    />
                    <FAQItem
                        question="Is turbulence better than stillness?"
                        answer="Natural systems alternate between turbulence and calm zones for optimal balance."
                        delay={0.2}
                    />
                    <FAQItem
                        question="Can movement replace filtration?"
                        answer="Movement prevents buildup but works best alongside filtration and settling."
                        delay={0.3}
                    />
                </div>
            )
        }
    ];

    return (
        <IONLayout
            title="Waves & Cleaning — Nature's Self-Cleaning Engine"
            subtitle="Still water and moving water are not the same substance. The moment water moves—through waves, rapids, waterfalls, tides—it enters a different behavioral state. Motion activates ion interaction, oxygen exchange, charge redistribution, and continuous mixing."
            heroVisual={
                <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.15)]">
                    <SmartVideoEmbed
                        keywords={["waves", "clarify", "clean", "water"]}
                        className="w-full aspect-video object-cover"
                    />
                </div>
            }
            sections={sections}
            showParticles={true}
            particleVariant="hero-only"
            cta={{
                headline: "Curious how moving water influences the air above it?",
                body: "Discover the connection between water motion and atmospheric ion balance.",
                buttonLabel: "Explore Air Negative Ions",
                buttonHref: "/ion/air-negative-ions"
            }}
            relatedPages={[
                { title: "Sea Ions", href: "/ion/sea", description: "Ocean dynamics" },
                { title: "ORP & Redox", href: "/ion/orp-redox", description: "Electron dynamics" },
                { title: "Ion Exchange", href: "/ion/ion-exchange", description: "Binding mechanics" },
                { title: "Ionic Sulfates", href: "/ion/ionic-sulfates", description: "Product bridge" }
            ]}
        />
    );
}
