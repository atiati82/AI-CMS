/**
 * Soil Ions Page
 * /ion/soil
 * 
 * Earth's Living Ion Bank - Mineral Storage & Exchange
 * Features: CEC visualization, root exchange animation, soil layer graphics
 */

import React from 'react';
import { motion } from 'framer-motion';
import { IONLayout } from '@/templates/gpt/IONLayout';
import { SmartImage } from '@/components/ui/SmartImage';
import { SmartVideoEmbed } from '@/components/SmartVideoEmbed';
import { Link } from 'wouter';
import {
    ArrowRight,
    Leaf,
    Droplets,
    Mountain,
    RefreshCw,
    Sparkles,
    TrendingUp,
    TrendingDown,
    Filter,
    AlertTriangle,
    CheckCircle,
    Layers,
    HelpCircle
} from 'lucide-react';
import { IONParticleField } from '@/components/visuals/IONParticleField';

// Soil Layer Animation
function SoilLayerAnimation() {
    return (
        <div className="relative h-72 rounded-xl overflow-hidden">
            {/* Sky */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-blue-400/30 to-transparent" />

            {/* Soil layers */}
            <div className="absolute bottom-0 left-0 right-0 h-56">
                {/* Organic layer */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-amber-800/60 to-amber-900/70">
                    <motion.div
                        className="absolute top-2 left-1/4 text-xs text-amber-200/60"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Humus Layer
                    </motion.div>
                </div>

                {/* Top soil with ion exchange */}
                <div className="absolute top-12 left-0 right-0 h-20 bg-gradient-to-b from-amber-900/70 to-amber-950/80 overflow-hidden">
                    {/* Floating cation symbols */}
                    {[
                        { symbol: 'Ca²⁺', color: 'text-blue-400', x: 20, delay: 0 },
                        { symbol: 'Mg²⁺', color: 'text-green-400', x: 40, delay: 0.3 },
                        { symbol: 'K⁺', color: 'text-purple-400', x: 60, delay: 0.6 },
                        { symbol: 'Na⁺', color: 'text-cyan-400', x: 80, delay: 0.9 }
                    ].map((ion, i) => (
                        <motion.span
                            key={i}
                            className={`absolute font-mono text-xs ${ion.color}`}
                            style={{ left: `${ion.x}%`, top: '30%' }}
                            animate={{
                                y: [0, -10, 0, 10, 0],
                                opacity: [0.5, 1, 0.5, 1, 0.5]
                            }}
                            transition={{ duration: 4, repeat: Infinity, delay: ion.delay }}
                        >
                            {ion.symbol}
                        </motion.span>
                    ))}
                    <motion.div
                        className="absolute top-2 right-4 text-xs text-amber-200/60"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Ion Exchange Zone
                    </motion.div>
                </div>

                {/* Subsoil */}
                <div className="absolute top-32 left-0 right-0 h-12 bg-gradient-to-b from-amber-950/80 to-stone-800/70" />

                {/* Bedrock */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-stone-800/70 to-stone-900/80" />
            </div>

            {/* Root illustration */}
            <svg className="absolute left-1/2 -translate-x-1/2 top-8 w-32 h-48" viewBox="0 0 100 150" fill="none">
                {/* Plant stem */}
                <motion.path
                    d="M50,0 L50,40"
                    stroke="#22c55e"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                />
                {/* Leaves */}
                <motion.ellipse cx="35" cy="10" rx="12" ry="6" fill="#22c55e"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                />
                <motion.ellipse cx="65" cy="15" rx="12" ry="6" fill="#22c55e"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                />
                {/* Root system */}
                <motion.path
                    d="M50,40 L50,100 M50,60 L30,90 M50,60 L70,95 M50,80 L35,120 M50,80 L65,115"
                    stroke="#a16207"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                />
            </svg>

            {/* Label */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                <motion.div
                    className="bg-black/50 backdrop-blur-sm rounded-xl px-4 py-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-amber-300/80 text-sm flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        Living Ion Exchange System
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

// Ion Badge Component
function IonBadge({ symbol, name, color }: { symbol: string; name: string; color: string }) {
    const colorClasses: Record<string, string> = {
        blue: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
        green: 'border-green-500/30 bg-green-500/10 text-green-300',
        purple: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
        cyan: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
        amber: 'border-amber-500/30 bg-amber-500/10 text-amber-300'
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

// CEC Comparison Card
function CECComparisonCard({
    title,
    icon: Icon,
    items,
    positive,
    delay = 0
}: {
    title: string;
    icon: React.ElementType;
    items: string[];
    positive: boolean;
    delay?: number;
}) {
    return (
        <motion.div
            className={`rounded-xl border p-5 ${positive
                ? 'border-green-500/20 bg-green-500/5'
                : 'border-red-500/20 bg-red-500/5'
                }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-5 h-5 ${positive ? 'text-green-400' : 'text-red-400'}`} />
                <h4 className="font-semibold text-white">{title}</h4>
            </div>
            <ul className="space-y-1">
                {items.map((item, i) => (
                    <li key={i} className="text-white/60 text-sm flex items-center gap-2">
                        {positive ? (
                            <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                            <AlertTriangle className="w-3 h-3 text-red-400" />
                        )}
                        {item}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

// Problem Card
function ProblemCard({
    problem,
    consequence,
    delay = 0
}: {
    problem: string;
    consequence: string;
    delay?: number;
}) {
    return (
        <motion.div
            className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="font-medium text-amber-300">{problem}</span>
            </div>
            <p className="text-white/60 text-sm pl-6">→ {consequence}</p>
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

export default function SoilIonsPage() {
    const sections = [
        {
            id: 'what-makes-soil-alive',
            headline: 'What Makes Soil "Alive"?',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Living soil contains:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            { text: 'Mineral particles (sand, silt, clay)', icon: Mountain },
                            { text: 'Organic matter (humus)', icon: Leaf },
                            { text: 'Microorganisms', icon: Sparkles },
                            { text: 'Water and air', icon: Droplets }
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
                    <motion.div
                        className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-amber-200 text-sm">
                            What connects all of these is <strong className="text-cyan-300">charge</strong>. Clay and humus carry negative electrical charge, making them magnets for positive mineral ions.
                        </p>
                    </motion.div>
                </div>
            ),
            visual: (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-amber-500/20 shadow-xl">
                    <SmartVideoEmbed
                        keywords={["earth", "soil", "roots", "grounding", "charge"]}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-xs text-amber-300/80">Biological Ion Exchange</p>
                    </div>
                </div>
            )
        },
        {
            id: 'cec',
            headline: 'Cation Exchange Capacity (CEC) — Soil\'s Storage Power',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        CEC describes how many <strong className="text-amber-300">positively charged ions</strong> soil can hold:
                    </p>
                    <div className="flex flex-wrap gap-2 my-4">
                        <IonBadge symbol="Ca²⁺" name="Calcium" color="blue" />
                        <IonBadge symbol="Mg²⁺" name="Magnesium" color="green" />
                        <IonBadge symbol="K⁺" name="Potassium" color="purple" />
                        <IonBadge symbol="Na⁺" name="Sodium" color="cyan" />
                        <IonBadge symbol="NH₄⁺" name="Ammonium" color="amber" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                        <CECComparisonCard
                            title="High CEC Soils"
                            icon={TrendingUp}
                            items={['Resist nutrient loss', 'Feed plants steadily', 'Buffer pH swings']}
                            positive={true}
                            delay={0}
                        />
                        <CECComparisonCard
                            title="Low CEC Soils"
                            icon={TrendingDown}
                            items={['Leach nutrients', 'Fluctuate rapidly', 'Require constant input']}
                            positive={false}
                            delay={0.1}
                        />
                    </div>
                    <p className="text-white/60 text-sm mt-4 italic">
                        CEC is <strong className="text-cyan-300">charge-based fertility</strong>.
                    </p>
                </div>
            ),
            visual: (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-blue-500/20 shadow-lg">
                    <SmartVideoEmbed
                        keywords={["soil", "minerals", "storage", "cec"]}
                        className="w-full h-full object-cover"
                    />
                </div>
            )
        },
        {
            id: 'how-exchange-works',
            headline: 'How Soil Exchanges Ions Naturally',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">When roots grow:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'They release organic acids',
                            'They change local charge',
                            'Bound ions are released',
                            'Nutrients become available'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Leaf className="w-4 h-4 text-green-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4">
                        This is not "uptake by force." It is <strong className="text-cyan-300">ion negotiation</strong>.
                    </p>
                    <Link href="/ion/ion-exchange">
                        <motion.span
                            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm cursor-pointer mt-2"
                            whileHover={{ x: 5 }}
                        >
                            Learn about Ion Exchange Mechanics <ArrowRight className="w-3 h-3" />
                        </motion.span>
                    </Link>
                </div>
            ),
            visual: (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-green-500/20 shadow-lg">
                    <SmartVideoEmbed
                        keywords={["roots", "growth", "life", "exchange"]}
                        className="w-full h-full object-cover"
                    />
                </div>
            )
        },
        {
            id: 'soil-water-filter',
            headline: 'Soil as a Water Filter',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">As water passes through soil:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            { text: 'Unwanted ions bind to surfaces', icon: Filter },
                            { text: 'Organic toxins adsorb to humus', icon: Leaf },
                            { text: 'Minerals exchange and stabilize', icon: RefreshCw },
                            { text: 'Microbes metabolize residues', icon: Sparkles }
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
                    <p className="text-white/60 text-sm mt-4 italic">
                        This is why groundwater improves with depth—until soil is damaged or overloaded.
                    </p>
                </div>
            )
        },
        {
            id: 'volcanic-soils',
            headline: 'Volcanic Soils — A Special Case',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Volcanic soils are often:</p>
                    <motion.div className="grid gap-2 mt-4 md:grid-cols-3">
                        {[
                            'Highly mineralized',
                            'Structurally complex',
                            'Ionically active'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-2 rounded-lg bg-purple-500/10 border border-purple-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Mountain className="w-4 h-4 text-purple-400" />
                                <span className="text-white/70 text-sm">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/70 mt-4">Fresh volcanic minerals provide:</p>
                    <motion.ul className="space-y-1 mt-2 text-white/60 text-sm">
                        {['Trace elements', 'High exchange capacity', 'Long-term fertility'].map((item, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                            >
                                • {item}
                            </motion.li>
                        ))}
                    </motion.ul>
                    <Link href="/ion/volcanic-minerals">
                        <motion.span
                            className="inline-flex items-center gap-2 rounded-xl bg-purple-500/20 border border-purple-500/30 px-5 py-3 text-purple-300 hover:bg-purple-500/30 transition-colors cursor-pointer mt-4"
                            whileHover={{ scale: 1.05 }}
                        >
                            Explore Volcanic Minerals <ArrowRight className="w-4 h-4" />
                        </motion.span>
                    </Link>
                </div>
            )
        },
        {
            id: 'one-system',
            headline: 'Soil, Air & Water — One Ionic System',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Soil links all domains:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Rain delivers atmospheric ions',
                            'Soil stores and transforms them',
                            'Plants redistribute ions to air',
                            'Water carries ions onward'
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
                        className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-amber-200 text-sm">
                            Remove one part, and the cycle weakens.
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            id: 'modern-problems',
            headline: 'Modern Soil Problems (Ionic View)',
            layout: 'full-width' as const,
            content: (
                <div className="space-y-4 mt-6">
                    <p className="text-white/80 mb-4">Many soil issues are <strong className="text-amber-300">charge problems</strong>:</p>
                    <div className="grid gap-4 md:grid-cols-3">
                        <ProblemCard problem="Compaction" consequence="Reduced exchange" delay={0} />
                        <ProblemCard problem="Chemical overload" consequence="Charge saturation" delay={0.1} />
                        <ProblemCard problem="Loss of organic matter" consequence="Lost binding sites" delay={0.2} />
                    </div>
                    <motion.div
                        className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-green-200 text-sm">
                            Fixing soil often means restoring <strong className="text-cyan-300">ionic capacity</strong>, not adding more inputs.
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            id: 'lessons',
            headline: 'Lessons from Soil for System Design',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Soil teaches:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Storage without stagnation',
                            'Exchange without depletion',
                            'Buffering instead of extremes'
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
                        Healthy systems don't dump minerals. They <strong className="text-cyan-300">hold and release intelligently</strong>.
                    </p>
                </div>
            )
        },
        {
            id: 'andara-context',
            headline: 'Andara Ionic Context',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Ionic sulfate minerals align with soil logic because:
                    </p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Sulfates interact predictably with metals',
                            'They participate in mineral cycling',
                            'They support exchange rather than force reactions'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Leaf className="w-4 h-4 text-green-400" />
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
                        question="What are soil ions?"
                        answer="They are charged mineral nutrients held on soil particles and organic matter."
                        delay={0}
                    />
                    <FAQItem
                        question="Why is CEC important?"
                        answer="It determines how well soil can store and supply nutrients without leaching."
                        delay={0.1}
                    />
                    <FAQItem
                        question="Can soil clean water?"
                        answer="Yes. Soil filters water through ion exchange, adsorption, and biological processing."
                        delay={0.2}
                    />
                    <FAQItem
                        question="Why are volcanic soils fertile?"
                        answer="Because fresh minerals provide high ion exchange capacity and trace elements."
                        delay={0.3}
                    />
                </div>
            )
        }
    ];

    return (
        <IONLayout
            title="Soil Ions — Earth's Living Ion Bank"
            subtitle="Soil is not dirt. Soil is a charged, living interface between rock, water, air, and life — functioning as a mineral reservoir, ion exchange system, biological amplifier, and long-term stabilizer."
            heroVisual={
                <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden border border-amber-900/30 shadow-[0_0_60px_rgba(161,98,7,0.15)]">
                    <SmartVideoEmbed
                        keywords={["earth", "soil", "roots", "grounding"]}
                        className="w-full aspect-video object-cover"
                    />
                </div>
            }
            sections={sections}
            showParticles={true}
            particleVariant="hero-only"
            cta={{
                headline: "Want to understand why volcanic minerals are so powerful?",
                body: "Discover how volcanic origin creates unique ionic properties.",
                buttonLabel: "Explore Volcanic Minerals",
                buttonHref: "/ion/volcanic-minerals"
            }}
            relatedPages={[
                { title: "Ion Fundamentals", href: "/ion", description: "Start here" },
                { title: "Ion Exchange", href: "/ion/ion-exchange", description: "Mechanics" },
                { title: "Ions in Water", href: "/ion/water", description: "Water chemistry" },
                { title: "Lightning", href: "/ion/lightning-atmosphere", description: "Storm input" }
            ]}
        />
    );
}
