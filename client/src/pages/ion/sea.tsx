/**
 * Sea Ions Page
 * /ion/sea
 * 
 * Earth's Largest Natural Ion System - Educational + experiential page
 * Features: Wave animations, ocean particle field, marine aerosol visualization
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
    Droplets,
    Wind,
    Sun,
    Cloud,
    Heart,
    Zap,
    RefreshCw,
    ThermometerSun,
    Shield,
    Sparkles,
    HelpCircle
} from 'lucide-react';
import { IONParticleField } from '@/components/visuals/IONParticleField';
import { IONFieldLines } from '@/components/visuals/IONFieldLines';

// Animated Wave Background
function WaveAnimation() {
    return (
        <div className="relative h-72 rounded-xl overflow-hidden bg-gradient-to-b from-blue-900/40 via-cyan-900/50 to-teal-900/40">
            <IONFieldLines variant="flow" />

            {/* Animated wave layers */}
            <svg className="absolute bottom-0 left-0 w-full h-32" viewBox="0 0 1440 200" preserveAspectRatio="none">
                <motion.path
                    d="M0,160 C320,220 420,60 720,100 C1020,140 1380,60 1440,80 L1440,200 L0,200 Z"
                    fill="rgba(6,182,212,0.2)"
                    animate={{
                        d: [
                            "M0,160 C320,220 420,60 720,100 C1020,140 1380,60 1440,80 L1440,200 L0,200 Z",
                            "M0,100 C320,60 420,180 720,140 C1020,100 1380,180 1440,160 L1440,200 L0,200 Z",
                            "M0,160 C320,220 420,60 720,100 C1020,140 1380,60 1440,80 L1440,200 L0,200 Z"
                        ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as Easing }}
                />
                <motion.path
                    d="M0,180 C320,140 420,200 720,170 C1020,140 1380,200 1440,190 L1440,200 L0,200 Z"
                    fill="rgba(6,182,212,0.3)"
                    animate={{
                        d: [
                            "M0,180 C320,140 420,200 720,170 C1020,140 1380,200 1440,190 L1440,200 L0,200 Z",
                            "M0,150 C320,200 420,140 720,180 C1020,200 1380,140 1440,160 L1440,200 L0,200 Z",
                            "M0,180 C320,140 420,200 720,170 C1020,140 1380,200 1440,190 L1440,200 L0,200 Z"
                        ]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as Easing, delay: 0.5 }}
                />
            </svg>

            {/* Floating sea ion particles */}
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-3 h-3 rounded-full ${i % 3 === 0 ? 'bg-cyan-400/60' : i % 3 === 1 ? 'bg-blue-400/60' : 'bg-teal-400/60'
                            }`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 70}%`
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Waves className="w-16 h-16 text-cyan-400/60 mx-auto mb-2" />
                    <p className="text-cyan-300/80 text-sm">Earth's Ionic Engine</p>
                </motion.div>
            </div>
        </div>
    );
}

// Ion Badge Component
function IonBadge({ symbol, name, color }: { symbol: string; name: string; color: string }) {
    const colorClasses: Record<string, string> = {
        cyan: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
        blue: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
        purple: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
        amber: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
        green: 'border-green-500/30 bg-green-500/10 text-green-300'
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

// Sea Feature Card
function SeaFeatureCard({
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
        blue: 'border-blue-500/20 bg-blue-500/5 text-blue-400',
        amber: 'border-amber-500/20 bg-amber-500/5 text-amber-400',
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

// Reset Effect Card
function ResetEffectCard({
    icon: Icon,
    effect,
    delay = 0
}: {
    icon: React.ElementType;
    effect: string;
    delay?: number;
}) {
    return (
        <motion.div
            className="flex items-center gap-3 rounded-lg bg-blue-500/10 border border-blue-500/20 px-4 py-3"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <Icon className="w-5 h-5 text-blue-400" />
            <span className="text-white/70">{effect}</span>
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
            className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-semibold text-white mb-2">{question}</h4>
                    <p className="text-white/60 text-sm">{answer}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default function SeaIonsPage() {
    const sections = [
        {
            id: 'seawater-different',
            headline: 'What Makes Seawater Different?',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Seawater contains a <strong className="text-cyan-300">highly stable, highly diverse ionic matrix</strong>.
                    </p>
                    <div className="flex flex-wrap gap-2 my-4">
                        <IonBadge symbol="Na⁺" name="Sodium" color="cyan" />
                        <IonBadge symbol="Cl⁻" name="Chloride" color="blue" />
                        <IonBadge symbol="Mg²⁺" name="Magnesium" color="purple" />
                        <IonBadge symbol="Ca²⁺" name="Calcium" color="amber" />
                        <IonBadge symbol="K⁺" name="Potassium" color="green" />
                        <IonBadge symbol="SO₄²⁻" name="Sulfate" color="purple" />
                    </div>
                    <p className="text-white/70">Together, these ions create:</p>
                    <motion.ul className="space-y-2 mt-4">
                        {[
                            'High conductivity',
                            'Strong buffering capacity',
                            'Predictable chemical behavior'
                        ].map((item, i) => (
                            <motion.li
                                key={i}
                                className="flex items-center gap-2 text-white/60"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Sparkles className="w-4 h-4 text-cyan-400" />
                                {item}
                            </motion.li>
                        ))}
                    </motion.ul>
                    <p className="text-white/60 text-sm mt-4 italic">
                        This stability is why the ocean doesn't "go bad" despite constant inputs from rivers, volcanoes, and biology.
                    </p>
                </div>
            ),
            visual: (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-cyan-500/20">
                    <SmartVideoEmbed keywords={["waves", "ocean", "current"]} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
                </div>
            )
        },
        {
            id: 'planetary-buffer',
            headline: 'The Ocean as a Planetary Buffer',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        The sea absorbs and redistributes:
                    </p>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                        {[
                            { icon: Droplets, text: 'Minerals from land erosion', color: 'text-cyan-400' },
                            { icon: Wind, text: 'Atmospheric gases', color: 'text-blue-400' },
                            { icon: ThermometerSun, text: 'Heat and electrical energy', color: 'text-amber-400' },
                            { icon: RefreshCw, text: 'Biological waste products', color: 'text-green-400' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                                <span className="text-white/70">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                    <motion.div
                        className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-cyan-200 text-sm">
                            <strong>Without ionic buffering</strong>, Earth's climate and ecosystems would swing violently.
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            id: 'self-stabilizes',
            headline: 'Why Ocean Water Self-Stabilizes',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">In the ocean:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Excess ions are diluted',
                            'Reactions are spread over vast volume',
                            'Opposing charges continuously recombine'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-blue-500/10 border border-blue-500/20 px-4 py-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Shield className="w-4 h-4 text-blue-400" />
                                <span className="text-white/70">{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/70 mt-4">
                        This creates a <strong className="text-cyan-300">self-correcting system</strong>.
                    </p>
                    <motion.div
                        className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-amber-200 text-sm">
                            Unlike closed systems (tanks, pipes, bottles), the ocean never stagnates, never polarizes permanently, never "locks" into imbalance.
                        </p>
                    </motion.div>
                </div>
            ),
            visual: (
                <div className="relative h-64 rounded-xl overflow-hidden">
                    <IONParticleField particleCount={80} interactive />
                </div>
            )
        },
        {
            id: 'sea-air',
            headline: 'Sea Air — Where Water Meets Atmosphere',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        When waves break, millions of microscopic droplets are launched into the air.
                    </p>
                    <p className="text-white/70 mt-2">These droplets:</p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            { text: 'Evaporate partially', icon: Sun },
                            { text: 'Leave behind charged salt particles (aerosols)', icon: Sparkles },
                            { text: 'Influence local air ion balance', icon: Zap }
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
                        This contributes to fresher-feeling air, reduced airborne particle persistence, and subtle mood and respiratory effects.
                    </p>
                    <Link href="/ion/air-negative-ions">
                        <motion.span
                            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm cursor-pointer mt-2"
                            whileHover={{ x: 5 }}
                        >
                            Learn about Air Negative Ions <ArrowRight className="w-3 h-3" />
                        </motion.span>
                    </Link>
                </div>
            ),
            visual: (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-blue-500/20 shadow-2xl">
                    <SmartVideoEmbed
                        keywords={["sea", "air", "mist", "negative ions"]}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent pointer-events-none" />
                </div>
            )
        },
        {
            id: 'waves-engine',
            headline: 'Waves: Nature\'s Mixing & Charging Engine',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Waves are not just movement. They are <strong className="text-cyan-300">ionic activators</strong>.
                    </p>
                    <p className="text-white/70 mt-2">Wave action causes:</p>
                    <motion.div className="grid gap-2 mt-4 md:grid-cols-2">
                        {[
                            { text: 'Intense mixing', icon: RefreshCw },
                            { text: 'Oxygenation', icon: Wind },
                            { text: 'Charge separation', icon: Zap },
                            { text: 'Continuous renewal of interfaces', icon: Sparkles }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 rounded-lg bg-blue-500/10 border border-blue-500/20 px-4 py-3"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <item.icon className="w-4 h-4 text-blue-400" />
                                <span className="text-white/70">{item.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <p className="text-white/60 text-sm mt-4 italic">
                        This is why still saltwater behaves very differently from moving seawater.
                    </p>
                </div>
            )
        },
        {
            id: 'sea-reset',
            headline: 'The "Sea Reset" Effect (Explained Simply)',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        People often report:
                    </p>
                    <div className="grid gap-2 mt-4">
                        <ResetEffectCard icon={Sparkles} effect="Mental clarity" delay={0} />
                        <ResetEffectCard icon={Heart} effect="Relaxed nervous system" delay={0.1} />
                        <ResetEffectCard icon={Wind} effect="Deeper breathing" delay={0.2} />
                        <ResetEffectCard icon={Sun} effect="Improved sleep" delay={0.3} />
                    </div>
                    <p className="text-white/70 mt-4">Contributing ionic factors include:</p>
                    <motion.ul className="space-y-1 mt-2 text-sm text-white/60">
                        {[
                            'Mineral-rich aerosols',
                            'Dynamic air ion balance',
                            'Rhythmic wave sound (entrainment)',
                            'Electromagnetic grounding near large water bodies'
                        ].map((item, i) => (
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
                    <motion.div
                        className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-4 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-purple-200 text-sm">
                            No single factor acts alone. The ocean works as a <strong className="text-cyan-300">multi-layer coherence field</strong>.
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            id: 'lessons',
            headline: 'Lessons from the Sea for Water Systems',
            layout: 'full-width' as const,
            content: (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
                    <SeaFeatureCard
                        icon={Droplets}
                        title="Mineral Diversity"
                        description="Not just purity — a spectrum of ions working together."
                        color="cyan"
                        delay={0}
                    />
                    <SeaFeatureCard
                        icon={Waves}
                        title="Movement & Mixing"
                        description="Continuous flow prevents stagnation and imbalance."
                        color="blue"
                        delay={0.1}
                    />
                    <SeaFeatureCard
                        icon={Shield}
                        title="Buffering Capacity"
                        description="Ability to absorb changes without extreme swings."
                        color="amber"
                        delay={0.2}
                    />
                    <SeaFeatureCard
                        icon={RefreshCw}
                        title="Ionic Balance"
                        description="Not extremes — dynamic equilibrium through abundance."
                        color="purple"
                        delay={0.3}
                    />
                </div>
            )
        },
        {
            id: 'ionic-sulfates',
            headline: 'Ionic Sulfates & Ocean Logic',
            content: (
                <div className="space-y-4">
                    <p className="text-white/80">
                        Sulfate is one of the ocean's key stabilizing anions.
                    </p>
                    <motion.div className="grid gap-2 mt-4">
                        {[
                            'Sulfates participate in buffering',
                            'Interact predictably with metals',
                            'Support long-term mineral balance'
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
                        This is one reason sulfate-based mineral systems are used in nature-inspired water approaches.
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
                        question="Why does the ocean feel cleansing?"
                        answer="Because moving seawater and sea air create a dynamic ionic environment that supports balance and renewal."
                        delay={0}
                    />
                    <FAQItem
                        question="Are sea ions different from freshwater ions?"
                        answer="Yes. Seawater has much higher ionic concentration and buffering capacity, with a stable mineral matrix."
                        delay={0.1}
                    />
                    <FAQItem
                        question="Does sea air contain negative ions?"
                        answer="Sea air contains a mix of charged particles and aerosols formed by wave action, which can influence air quality."
                        delay={0.2}
                    />
                    <FAQItem
                        question="Why doesn't seawater stagnate?"
                        answer="Because continuous movement, ion diversity, and volume prevent long-term imbalance."
                        delay={0.3}
                    />
                </div>
            )
        }
    ];

    return (
        <IONLayout
            title="Sea Ions — Earth's Largest Natural Ion System"
            subtitle="The ocean is not just water. It is Earth's primary ionic engine — covering over 70% of the planet, acting as a mineral reservoir, electrical buffer, atmospheric cleaner, and biological stabilizer."
            heroVisual={
                <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.15)]">
                    <SmartVideoEmbed
                        keywords={["sea", "ocean", "waves", "blue"]}
                        className="w-full aspect-[21/9] object-cover"
                    />
                </div>
            }
            sections={sections}
            showParticles={true}
            particleVariant="hero-only"
            cta={{
                headline: "Want to understand how waves actively clean water?",
                body: "Discover the mechanics behind wave-driven purification.",
                buttonLabel: "Explore Wave Cleaning",
                buttonHref: "/ion/waves-cleaning"
            }}
            relatedPages={[
                { title: "Ion Fundamentals", href: "/ion", description: "Start with the basics" },
                { title: "Ions in Water", href: "/ion/water", description: "Water behavior" },
                { title: "Air Negative Ions", href: "/ion/air-negative-ions", description: "Atmospheric ions" },
                { title: "Ionic Sulfates", href: "/ion/ionic-sulfates", description: "Product education" }
            ]}
        />
    );
}
