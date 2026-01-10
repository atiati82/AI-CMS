/**
 * Electrolytes vs Ionic Minerals Page
 * /ion/electrolytes-vs-ionic-minerals
 * 
 * Clarification & Comparison - Same Ions, Different Roles
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
    Clock,
    TrendingUp,
    Sparkles,
    RefreshCw,
    HelpCircle,
    type LucideIcon
} from 'lucide-react';

// Comparison Table Row
function ComparisonRow({
    aspect,
    electrolytes,
    ionicMinerals,
    delay = 0
}: {
    aspect: string;
    electrolytes: string;
    ionicMinerals: string;
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
            <span className="text-white/60 text-sm">{electrolytes}</span>
            <span className="text-white/60 text-sm">{ionicMinerals}</span>
        </motion.div>
    );
}

// Ion List Badge
function IonBadge({ symbol, color }: { symbol: string; color: string }) {
    const colorClasses: Record<string, string> = {
        blue: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
        purple: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
        green: 'border-green-500/30 bg-green-500/10 text-green-300',
        amber: 'border-amber-500/30 bg-amber-500/10 text-amber-300'
    };

    return (
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-mono ${colorClasses[color]}`}>
            {symbol}
        </span>
    );
}

// Category Card
function CategoryCard({
    title,
    icon: Icon,
    items,
    color
}: {
    title: string;
    icon: LucideIcon;
    items: string[];
    color: string;
}) {
    const colorClasses: Record<string, string> = {
        blue: 'border-blue-500/20 bg-blue-500/5 text-blue-400',
        amber: 'border-amber-500/20 bg-amber-500/5 text-amber-400'
    };

    return (
        <motion.div
            className={`rounded-xl border p-5 ${colorClasses[color]}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
        >
            <div className="flex items-center gap-2 mb-3">
                <Icon className="w-5 h-5" />
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

export default function ElectrolytesVsIonicMineralsPage() {
    const sections = [
        {
            id: 'what-are-electrolytes',
            headline: 'What Are Electrolytes?',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        <strong className="text-blue-300">Electrolytes</strong> are ions used primarily for <strong className="text-cyan-300">rapid electrical signaling and fluid balance</strong>.
                    </p>
                    <div className="flex flex-wrap gap-2 my-4">
                        <IonBadge symbol="Na⁺" color="blue" />
                        <IonBadge symbol="K⁺" color="purple" />
                        <IonBadge symbol="Ca²⁺" color="green" />
                        <IonBadge symbol="Mg²⁺" color="green" />
                        <IonBadge symbol="Cl⁻" color="amber" />
                    </div>
                    <p className="text-white/70">They are essential for:</p>
                    <motion.div className="grid gap-2 mt-2">
                        {[
                            { text: 'Nerve impulses', icon: Zap },
                            { text: 'Muscle contraction', icon: TrendingUp },
                            { text: 'Acute hydration', icon: Droplets },
                            { text: 'Short-term performance', icon: Clock }
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
                        Electrolytes are often used <strong>quickly and actively</strong>.
                    </p>
                </div>
            )
        },
        {
            id: 'what-are-ionic-minerals',
            headline: 'What Are Ionic Minerals?',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        <strong className="text-amber-300">Ionic minerals</strong> refer to minerals present in <strong className="text-cyan-300">charged (ionic) form</strong> that participate in broader system behavior.
                    </p>
                    <p className="text-white/70 mt-4">They often include:</p>
                    <motion.div className="grid gap-2 md:grid-cols-2 mt-2">
                        {[
                            'Macro minerals',
                            'Trace minerals',
                            'Transition elements',
                            'Complex anions (e.g., sulfate)'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Sparkles className="w-4 h-4 text-amber-400" />
                                <span className="text-white/70 text-sm">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/70 mt-4">Their role is often:</p>
                    <motion.ul className="space-y-1 mt-2 text-white/60 text-sm">
                        {['Structural', 'Buffering', 'Catalytic', 'Regulatory'].map((item, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                            >
                                • {item}
                            </motion.li>
                        ))}
                    </motion.ul>
                    <p className="text-white/60 text-sm mt-4 italic">
                        Ionic minerals act more <strong>slowly and systemically</strong>.
                    </p>
                </div>
            )
        },
        {
            id: 'comparison',
            headline: 'Key Differences at a Glance',
            layout: 'full-width' as const,
            content: (
                <div className="space-y-4 mt-6">
                    <div className="grid grid-cols-3 gap-4 text-sm font-medium mb-2">
                        <span className="text-cyan-300">Aspect</span>
                        <span className="text-blue-400">Electrolytes</span>
                        <span className="text-amber-400">Ionic Minerals</span>
                    </div>
                    <ComparisonRow aspect="Primary role" electrolytes="Electrical signaling" ionicMinerals="System balance & interaction" delay={0} />
                    <ComparisonRow aspect="Time scale" electrolytes="Immediate / short-term" ionicMinerals="Gradual / long-term" delay={0.1} />
                    <ComparisonRow aspect="Typical use" electrolytes="Exercise, dehydration" ionicMinerals="Water quality, terrain support" delay={0.2} />
                    <ComparisonRow aspect="Spectrum" electrolytes="Narrow" ionicMinerals="Broad" delay={0.3} />
                    <ComparisonRow aspect="Focus" electrolytes="Quantity" ionicMinerals="Context & balance" delay={0.4} />
                    <motion.div
                        className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 mt-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-green-200 text-sm">
                            They <strong className="text-cyan-300">complement</strong>, not replace, each other.
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            id: 'hydration',
            headline: 'Hydration: Why Both Matter',
            content: (
                <div className="grid gap-4 md:grid-cols-2">
                    <CategoryCard
                        title="Electrolytes help"
                        icon={Zap}
                        items={['Move water into cells', 'Maintain blood volume', 'Prevent acute imbalance']}
                        color="blue"
                    />
                    <CategoryCard
                        title="Ionic Minerals help"
                        icon={Sparkles}
                        items={['Stabilize the medium', 'Buffer pH and charge', 'Support long-term coherence']}
                        color="amber"
                    />
                </div>
            )
        },
        {
            id: 'processed-drinks',
            headline: 'Why Processed Electrolyte Drinks Feel Different',
            content: (
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <motion.div
                            className="rounded-xl border border-slate-500/20 bg-slate-500/5 p-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="font-semibold text-slate-300 mb-2">Commercial Products</h4>
                            <ul className="space-y-1 text-white/60 text-sm">
                                <li>• Focus on a few ions</li>
                                <li>• Use refined salts</li>
                                <li>• Aim for fast uptake</li>
                            </ul>
                            <p className="text-white/50 text-xs mt-3">Feel: stimulating, immediate, short-lived</p>
                        </motion.div>
                        <motion.div
                            className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <h4 className="font-semibold text-cyan-300 mb-2">Natural Mineral Waters</h4>
                            <ul className="space-y-1 text-white/60 text-sm">
                                <li>• Deliver broader spectra</li>
                                <li>• Interact with water structure</li>
                                <li>• Work synergistically</li>
                            </ul>
                            <p className="text-white/50 text-xs mt-3">Feel: subtler but longer-lasting</p>
                        </motion.div>
                    </div>
                    <p className="text-white/60 text-sm mt-4 italic">
                        Different tools for different needs.
                    </p>
                </div>
            )
        },
        {
            id: 'not-complete',
            headline: 'Electrolytes Are Not a Complete Mineral Strategy',
            content: (
                <div className="space-y-4">
                    <motion.div
                        className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-amber-200 text-sm mb-2"><strong>Important clarity:</strong></p>
                        <ul className="space-y-1 text-white/70 text-sm">
                            <li>• Electrolytes do not supply trace mineral diversity</li>
                            <li>• They do not replace geological mineral sources</li>
                            <li>• They are not designed for terrain restoration</li>
                        </ul>
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4">
                        They solve <strong className="text-cyan-300">acute electrical needs</strong>, not foundational balance.
                    </p>
                </div>
            )
        },
        {
            id: 'sulfate-bridge',
            headline: 'Sulfates as a Bridge Ion',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">Sulfate (SO₄²⁻):</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Is not an electrolyte in the classic sense',
                            'Plays a major role in mineral cycling',
                            'Interacts strongly with metals',
                            'Supports buffering and balance'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-purple-500/10 border border-purple-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <RefreshCw className="w-4 h-4 text-purple-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4">
                        This makes sulfate-based mineral systems distinct from simple electrolyte mixes.
                    </p>
                    <Link href="/ion/ionic-sulfates">
                        <motion.span
                            className="inline-flex items-center gap-2 rounded-xl bg-purple-500/20 border border-purple-500/30 px-5 py-3 text-purple-300 hover:bg-purple-500/30 transition-colors cursor-pointer mt-4"
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
                        question="Are electrolytes and ionic minerals the same?"
                        answer="No. Electrolytes are a subset of ions used for fast electrical functions. Ionic minerals have broader, long-term roles."
                        delay={0}
                    />
                    <FAQItem
                        question="Can I use electrolytes instead of minerals?"
                        answer="Electrolytes support short-term needs but do not replace full mineral spectra."
                        delay={0.1}
                    />
                    <FAQItem
                        question="Do ionic minerals hydrate better?"
                        answer="They support the medium of hydration rather than forcing rapid fluid shifts."
                        delay={0.2}
                    />
                    <FAQItem
                        question="Is sulfate an electrolyte?"
                        answer="Sulfate is an anion involved in mineral balance and cycling, not a primary signaling electrolyte."
                        delay={0.3}
                    />
                </div>
            )
        }
    ];

    return (
        <IONLayout
            title="Electrolytes vs. Ionic Minerals — Understanding the Spectrum of Charge"
            subtitle="Are all ions the same? Not exactly. While all electrolytes are ions, their behavior changes based on concentration, mineral source, and their role in a system."
            heroVisual={<SmartVideoEmbed keywords={["electrolytes", "minerals", "hydration", "energy", "blue"]} className="max-w-2xl mx-auto shadow-2xl shadow-blue-500/20" />}
            sections={sections}
            showParticles={true}
            particleVariant="hero-only"
            cta={{
                headline: "Want to understand how ionic sulfates fit into this picture?",
                body: "Learn why sulfate minerals behave differently in water and biological systems.",
                buttonLabel: "Explore Ionic Sulfates",
                buttonHref: "/ion/ionic-sulfates"
            }}
            relatedPages={[
                { title: "Bioelectric", href: "/ion/bioelectric", description: "Bioelectric context" },
                { title: "Ions in Water", href: "/ion/water", description: "Water behavior" },
                { title: "Conductivity", href: "/ion/conductivity-ec-tds", description: "Measurements" },
                { title: "Volcanic Minerals", href: "/ion/volcanic-minerals", description: "Mineral origin" }
            ]}
        />
    );
}
