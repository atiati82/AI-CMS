import React, { useState } from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
    Droplets,
    Zap,
    Hexagon,
    Waves,
    Beaker,
    FlaskConical,
    Sparkles,
    ChevronDown,
    ChevronRight,
    Heart,
    Clock,
    Eye,
    ArrowRight,
    TestTube,
    Scale,
    RotateCcw,
    HelpCircle,
    ShoppingCart,
    Calculator
} from "lucide-react";

// ============================================================================
// ANIMATED DROP VISUAL COMPONENT
// ============================================================================
function AnimatedDropHero() {
    return (
        <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
            {/* Radiating circles */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-cyan-500/20"
                    initial={{ scale: 0.3, opacity: 0.8 }}
                    animate={{
                        scale: [0.3 + i * 0.2, 1.2 + i * 0.2],
                        opacity: [0.6, 0]
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                />
            ))}

            {/* Central glowing drop */}
            <motion.div
                className="relative z-10"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute inset-0 blur-3xl bg-cyan-400/30 rounded-full scale-150" />

                    {/* Drop shape */}
                    <motion.div
                        className="relative w-24 h-32 bg-gradient-to-b from-cyan-300 via-cyan-500 to-cyan-700 rounded-full"
                        style={{
                            borderTopLeftRadius: "50%",
                            borderTopRightRadius: "50%",
                            borderBottomLeftRadius: "50%",
                            borderBottomRightRadius: "50%",
                            clipPath: "polygon(50% 0%, 100% 60%, 50% 100%, 0% 60%)"
                        }}
                        animate={{
                            boxShadow: [
                                "0 0 20px rgba(6, 182, 212, 0.5)",
                                "0 0 60px rgba(6, 182, 212, 0.8)",
                                "0 0 20px rgba(6, 182, 212, 0.5)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {/* Inner highlight */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-6 bg-white/40 rounded-full blur-sm" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Crystalline pattern lines radiating */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`line-${i}`}
                    className="absolute w-px h-20 bg-gradient-to-b from-cyan-400/60 to-transparent origin-top"
                    style={{
                        top: "55%",
                        left: "50%",
                        transform: `rotate(${i * 45}deg)`
                    }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: [0, 0.8, 0] }}
                    transition={{
                        duration: 2,
                        delay: 1 + i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 2
                    }}
                />
            ))}

            {/* Glass of water below */}
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                <div className="relative w-full h-full">
                    {/* Glass shape */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-cyan-500/10 rounded-b-xl border border-white/10 backdrop-blur-sm" />
                    {/* Water level */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-600/30 to-cyan-400/10 rounded-b-xl"
                        initial={{ height: "60%" }}
                        animate={{ height: ["60%", "65%", "60%"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </div>
    );
}

// ============================================================================
// IONIC VS SOLID COMPARISON VISUAL
// ============================================================================
function IonicVsSolidVisual() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Solid minerals struggling to dissolve */}
            <div className="relative p-6 rounded-2xl bg-slate-900/50 border border-white/5">
                <div className="text-center mb-4">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Traditional</span>
                    <h4 className="text-lg font-medium text-slate-300">Solid → Dissolve</h4>
                </div>
                <div className="relative h-32 flex items-end justify-center gap-2">
                    {/* Chunks */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-6 h-6 bg-slate-600 rounded-sm"
                            animate={{
                                y: [0, -5, 0],
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{
                                duration: 2,
                                delay: i * 0.2,
                                repeat: Infinity
                            }}
                        />
                    ))}
                </div>
                <p className="text-xs text-slate-500 text-center mt-4">
                    Rocks & powders need time to break down
                </p>
            </div>

            {/* Ionic drop dispersing instantly */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-slate-900/50 border border-cyan-500/20">
                <div className="text-center mb-4">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Ionic</span>
                    <h4 className="text-lg font-medium text-cyan-300">Instant Dispersion</h4>
                </div>
                <div className="relative h-32 flex items-center justify-center">
                    <motion.div
                        className="w-8 h-8 rounded-full bg-cyan-400"
                        animate={{
                            scale: [1, 1.5, 2, 2.5],
                            opacity: [1, 0.6, 0.3, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut"
                        }}
                    />
                    <motion.div
                        className="absolute w-3 h-3 rounded-full bg-cyan-300"
                        animate={{ scale: [0.8, 1, 0.8] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                </div>
                <p className="text-xs text-cyan-400/70 text-center mt-4">
                    Already charged & water-ready
                </p>
            </div>
        </div>
    );
}

// ============================================================================
// DROP JOURNEY VISUALIZATION
// ============================================================================
function DropJourneyVisual() {
    const stages = [
        { label: "Before", desc: "Chaotic particles", color: "slate" },
        { label: "Drop Added", desc: "Charge shift begins", color: "cyan" },
        { label: "During", desc: "Particles clustering", color: "blue" },
        { label: "After", desc: "Settled & clear", color: "emerald" }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stages.map((stage, i) => (
                <motion.div
                    key={stage.label}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    viewport={{ once: true }}
                >
                    <div className={`
            aspect-[3/4] rounded-xl border overflow-hidden
            ${stage.color === 'slate' ? 'bg-slate-800/50 border-slate-700' : ''}
            ${stage.color === 'cyan' ? 'bg-cyan-900/20 border-cyan-500/30' : ''}
            ${stage.color === 'blue' ? 'bg-blue-900/20 border-blue-500/30' : ''}
            ${stage.color === 'emerald' ? 'bg-emerald-900/20 border-emerald-500/30' : ''}
          `}>
                        {/* Glass visualization */}
                        <div className="relative h-full flex flex-col">
                            {/* Upper portion */}
                            <div className={`flex-1 relative overflow-hidden ${i >= 3 ? 'bg-cyan-400/5' : ''}`}>
                                {/* Floating particles - more chaotic in early stages */}
                                {i < 3 && [...Array(8 - i * 2)].map((_, j) => (
                                    <motion.div
                                        key={j}
                                        className={`absolute w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-slate-500' : 'bg-amber-500/60'
                                            }`}
                                        style={{
                                            left: `${20 + Math.random() * 60}%`,
                                            top: `${20 + Math.random() * 60}%`
                                        }}
                                        animate={i === 0 ? {
                                            x: [-5, 5, -5],
                                            y: [-3, 3, -3]
                                        } : {
                                            y: [0, 50, 60],
                                            opacity: [1, 0.5, 0.3]
                                        }}
                                        transition={{
                                            duration: i === 0 ? 2 : 3,
                                            delay: j * 0.2,
                                            repeat: Infinity
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Sediment layer */}
                            {i >= 2 && (
                                <motion.div
                                    className="h-6 bg-gradient-to-t from-amber-900/40 to-transparent"
                                    initial={{ height: 0 }}
                                    animate={{ height: i === 2 ? 12 : 24 }}
                                    transition={{ duration: 1 }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Label */}
                    <div className="mt-3 text-center">
                        <div className={`text-sm font-medium ${stage.color === 'cyan' ? 'text-cyan-400' :
                                stage.color === 'emerald' ? 'text-emerald-400' :
                                    'text-slate-300'
                            }`}>
                            {stage.label}
                        </div>
                        <div className="text-xs text-slate-500">{stage.desc}</div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

// ============================================================================
// VOLUME IMPACT CHART
// ============================================================================
function VolumeImpactChart() {
    const data = [
        { volume: "Small Glass", label: "0.2–0.3L", impact: 25, desc: "Subtle, symbolic" },
        { volume: "1L Bottle", label: "1L", impact: 70, desc: "Functional activation" },
        { volume: "Carafe", label: "5L", impact: 50, desc: "Test signal" },
        { volume: "Tank", label: "20L", impact: 30, desc: "Exploration mode" }
    ];

    return (
        <div className="space-y-4">
            {data.map((item, i) => (
                <motion.div
                    key={item.volume}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                >
                    <div className="w-24 text-right">
                        <div className="text-sm font-medium text-slate-300">{item.volume}</div>
                        <div className="text-xs text-slate-500">{item.label}</div>
                    </div>
                    <div className="flex-1 h-8 bg-slate-800/50 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.impact}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            viewport={{ once: true }}
                        />
                    </div>
                    <div className="w-32 text-xs text-slate-400">{item.desc}</div>
                </motion.div>
            ))}
        </div>
    );
}

// ============================================================================
// TIME LAPSE VISUAL
// ============================================================================
function TimeLapseVisual() {
    const [activeFrame, setActiveFrame] = useState(0);
    const frames = [
        { time: "T=0", label: "Drop added", desc: "Initial swirl visible" },
        { time: "T=10min", label: "Forming", desc: "Flakes starting to appear" },
        { time: "T=2h", label: "Settling", desc: "Particles drifting down" },
        { time: "T=24h", label: "Complete", desc: "Clear top, settled sediment" }
    ];

    return (
        <div className="space-y-6">
            {/* Glass visualization */}
            <div className="relative h-64 max-w-xs mx-auto">
                <div className="absolute inset-0 rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/50 to-slate-800/50 overflow-hidden">
                    {/* Water with varying clarity */}
                    <motion.div
                        className="absolute inset-0 transition-all duration-500"
                        style={{
                            background: activeFrame === 0
                                ? 'linear-gradient(to bottom, rgba(100,116,139,0.1), rgba(100,116,139,0.3))'
                                : activeFrame === 1
                                    ? 'linear-gradient(to bottom, rgba(6,182,212,0.05), rgba(100,116,139,0.4))'
                                    : activeFrame === 2
                                        ? 'linear-gradient(to bottom, rgba(6,182,212,0.02), rgba(180,140,80,0.3))'
                                        : 'linear-gradient(to bottom, rgba(6,182,212,0.01), rgba(180,140,80,0.5))'
                        }}
                    />

                    {/* Particles */}
                    {activeFrame < 3 && [...Array(12 - activeFrame * 3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-amber-500/50"
                            style={{
                                left: `${10 + Math.random() * 80}%`,
                                top: activeFrame === 0
                                    ? `${20 + Math.random() * 60}%`
                                    : activeFrame === 1
                                        ? `${30 + Math.random() * 50}%`
                                        : `${60 + Math.random() * 30}%`
                            }}
                            animate={{
                                y: activeFrame === 0 ? [-2, 2, -2] : [0, 5, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        />
                    ))}

                    {/* Sediment layer */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900/60 via-amber-800/30 to-transparent"
                        animate={{
                            height: activeFrame === 0 ? 0 : activeFrame === 1 ? 20 : activeFrame === 2 ? 40 : 60
                        }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Timeline controls */}
            <div className="flex justify-center gap-2">
                {frames.map((frame, i) => (
                    <button
                        key={frame.time}
                        onClick={() => setActiveFrame(i)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${activeFrame === i
                                ? 'bg-cyan-500 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                    >
                        {frame.time}
                    </button>
                ))}
            </div>

            {/* Description */}
            <div className="text-center">
                <div className="text-lg font-medium text-cyan-400">{frames[activeFrame].label}</div>
                <div className="text-sm text-slate-400">{frames[activeFrame].desc}</div>
            </div>
        </div>
    );
}

// ============================================================================
// FAQ ACCORDION
// ============================================================================
function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: "Can I feel a difference from just one drop?",
            a: "Some people report differences in taste and 'feel' of the water even with one drop, especially in sensitive water. Others notice more when they use activation-level dilutions. Treat one drop as a signal and a test, not as a full protocol."
        },
        {
            q: "Why does the water sometimes change color or produce flakes?",
            a: "That's usually the precipitation or aggregation of existing substances in the water (like metals, organic residues, or treatment remnants). The ionic drop changes charge relationships, making hidden things visible."
        },
        {
            q: "Is more always better?",
            a: "No. The point of ionic drops is precision, not flooding. There are recommended ranges for different applications. One drop is perfect for exploration. For daily use, follow the dilution charts and Andara guidelines."
        },
        {
            q: "Can I just keep adding drops until it tastes 'strong'?",
            a: "It's better to respect the activation ranges and not turn water into a heavy mineral soup. Andara works as a fine instrument, not as a brute-force additive."
        }
    ];

    return (
        <div className="space-y-3">
            {faqs.map((faq, i) => (
                <motion.div
                    key={i}
                    className="border border-white/5 rounded-xl overflow-hidden"
                    initial={false}
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
                    >
                        <span className="flex items-center gap-3">
                            <HelpCircle className="w-5 h-5 text-cyan-500/60" />
                            <span className="text-slate-200">{faq.q}</span>
                        </span>
                        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {openIndex === i && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="px-6 py-4 bg-slate-900/30 text-slate-400 text-sm leading-relaxed pl-14">
                                    {faq.a}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
}

// ============================================================================
// EXPERIMENT CARDS
// ============================================================================
function ExperimentCards() {
    const experiments = [
        {
            icon: <Beaker className="w-6 h-6" />,
            title: "Tap vs. Filtered",
            steps: ["Two glasses: tap (A) and filtered (B)", "Add 1 drop to each, stir same way", "Observe over 1–24 hours"],
            observe: "Which creates more sediment? Which clarifies faster?"
        },
        {
            icon: <FlaskConical className="w-6 h-6" />,
            title: "Water Brand Comparison",
            steps: ["Use different bottled waters", "One drop in each, same time", "Watch yellowing / flocculation"],
            observe: "A live demonstration of what each brand carries"
        },
        {
            icon: <RotateCcw className="w-6 h-6" />,
            title: "Vortex vs No Vortex",
            steps: ["Two identical glasses", "A: Drop + gentle stir", "B: Create vortex, then drop"],
            observe: "Feel/taste difference – vortexed often feels softer"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiments.map((exp, i) => (
                <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    viewport={{ once: true }}
                >
                    <Card className="h-full p-6 bg-slate-900/50 border-white/5 hover:border-cyan-500/30 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                            {exp.icon}
                        </div>
                        <h4 className="font-semibold text-slate-200 mb-3">{exp.title}</h4>
                        <ul className="space-y-2 mb-4">
                            {exp.steps.map((step, j) => (
                                <li key={j} className="text-sm text-slate-400 flex items-start gap-2">
                                    <span className="text-cyan-500/60 mt-0.5">{j + 1}.</span>
                                    {step}
                                </li>
                            ))}
                        </ul>
                        <div className="pt-3 border-t border-white/5">
                            <div className="flex items-start gap-2">
                                <Eye className="w-4 h-4 text-cyan-500/60 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-cyan-400/80">{exp.observe}</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function IonicDropsPage() {
    return (
        <StandardPageLayout
            title={<>Ionic Drops – <span className="text-cyan-400">The Power of a Single Drop</span></>}
            subtitle={<>"One drop is not just volume. <em className="text-cyan-300/80">It's a pattern.</em>"</>}
            heroVariant="cyan"
            heroIcon={Droplets}
            clusterKey="ion"
            badges={[{ text: "Micro-Dose", icon: Droplets }, { text: "Macro-Effect", icon: Sparkles }]}
            seoTitle="Ionic Drops – The Power of a Single Andara Drop in Water"
            seoDescription="Discover how a single Andara Ionic drop can clarify, condition, and energize your water. Micro-dose, macro-effect: learn the science, visuals, and use cases behind ionic sulfate mineral drops."
            backgroundElement={
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/50 via-cyan-950/30 to-[#020617]" />
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
                </div>
            }
        >
            {/* Hero Visual */}
            <section className="py-16 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <AnimatedDropHero />
                </div>
            </section>

            {/* Section 1: What Is an Ionic Drop? */}
            <section className="py-24 bg-[#05060b] relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-light text-white mb-6">Not Just a Drop – A Concentrated Pattern of Order</h2>
                            <p className="text-xl text-cyan-300 max-w-3xl mx-auto leading-relaxed">
                                One Andara ionic drop is a micro-dose of primordial sulfate minerals that carries{" "}
                                <strong className="text-white">information, not just matter.</strong>
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                        <FadeIn delay={0.1}>
                            <div className="space-y-6">
                                <p className="text-slate-300 leading-relaxed">
                                    It's not a flavor drop or a syrup. It's a highly concentrated ionic mineral solution designed to be diluted into water.
                                </p>
                                <div className="p-6 rounded-xl bg-slate-900/50 border border-white/5">
                                    <h4 className="font-semibold text-slate-200 mb-4">Each drop contains:</h4>
                                    <ul className="space-y-3">
                                        {[
                                            "Sulfate ions",
                                            "Trace minerals",
                                            "A specific ionic \"signature\" that influences how water organizes itself"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-400">
                                                <Hexagon className="w-4 h-4 text-cyan-500 mt-1 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="space-y-4">
                                <p className="text-sm text-slate-500 uppercase tracking-wider mb-4">Key Properties</p>
                                {[
                                    { icon: <Zap className="w-5 h-5" />, text: "Ionic means minerals are already in charged, water-ready form" },
                                    { icon: <Waves className="w-5 h-5" />, text: "Clarification: flocculation & settling of impurities" },
                                    { icon: <Sparkles className="w-5 h-5" />, text: "Charge rebalancing: redox / ORP changes" },
                                    { icon: <Hexagon className="w-5 h-5" />, text: "Micro-structuring: more ordered hydration patterns" }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-start gap-4 p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/10"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="text-cyan-400">{item.icon}</div>
                                        <p className="text-sm text-slate-300">{item.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.3}>
                        <IonicVsSolidVisual />
                    </FadeIn>
                </div>
            </section>

            {/* Section 2: Micro-Dose, Macro-Effect */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <h2 className="text-3xl font-light text-white mb-6">Why So Little Can Do So Much</h2>
                            <p className="text-slate-300 leading-relaxed">
                                A drop is small, but your water responds like a <span className="text-cyan-400">sensitive field</span>, not a dead liquid.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {[
                            { step: "1", title: "Distributes", desc: "Charge and minerals spread through the whole volume" },
                            { step: "2", title: "Shifts", desc: "Changes the electrical 'mood' of the water" },
                            { step: "3", title: "Triggers", desc: "Impurities aggregate; coherent domains form" }
                        ].map((item, i) => (
                            <FadeIn key={item.step} delay={i * 0.1}>
                                <Card className="p-6 bg-slate-900/50 border-white/5 text-center">
                                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-cyan-400">{item.step}</span>
                                    </div>
                                    <h4 className="text-lg font-medium text-slate-200 mb-2">{item.title}</h4>
                                    <p className="text-sm text-slate-400">{item.desc}</p>
                                </Card>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn delay={0.4}>
                        <div className="p-8 rounded-2xl bg-gradient-to-r from-cyan-900/20 via-slate-900/50 to-cyan-900/20 border border-cyan-500/10 text-center">
                            <div className="flex flex-wrap justify-center gap-6 text-lg">
                                <span className="text-cyan-400 font-medium">"Micro-dose, macro-effect."</span>
                                <span className="text-slate-500">•</span>
                                <span className="text-cyan-400 font-medium">"Charge, not quantity, is the key."</span>
                                <span className="text-slate-500">•</span>
                                <span className="text-cyan-400 font-medium">"One drop talks to the whole glass."</span>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Section 3: The Journey of a Single Drop */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-light text-white mb-6">The Journey of a Single Drop in Your Glass</h2>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                icon: <Waves className="w-7 h-7" />,
                                title: "Clarification",
                                color: "cyan",
                                points: [
                                    "Binds and influences suspended particles",
                                    "Tiny impurities form micro-flocs",
                                    "Sediment forms at the bottom over time"
                                ]
                            },
                            {
                                icon: <Zap className="w-7 h-7" />,
                                title: "Charge Reset",
                                color: "amber",
                                points: [
                                    "Adjusts redox balance (ORP trend)",
                                    "Helps water release harsh oxidizing patterns",
                                    "Creates a more stable electric profile"
                                ]
                            },
                            {
                                icon: <Hexagon className="w-7 h-7" />,
                                title: "Structural Hints",
                                color: "emerald",
                                points: [
                                    "Water forms hydration shells and layers",
                                    "Sulfate's tetrahedral shape guides micro-layers",
                                    "One drop = seed point for ordered clusters"
                                ]
                            }
                        ].map((item, i) => (
                            <FadeIn key={item.title} delay={i * 0.15}>
                                <Card className={`h-full p-6 bg-slate-900/50 border-${item.color}-500/20 hover:border-${item.color}-500/40 transition-colors`}>
                                    <div className={`w-14 h-14 rounded-xl bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-400 mb-4`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-medium text-slate-200 mb-4">{item.title}</h3>
                                    <ul className="space-y-3">
                                        {item.points.map((point, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                                                <div className={`w-1.5 h-1.5 rounded-full bg-${item.color}-500 mt-1.5`} />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn delay={0.5}>
                        <DropJourneyVisual />
                    </FadeIn>
                </div>
            </section>

            {/* Section 4: One Drop in Different Contexts */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-light text-white mb-6">One Drop, Many Scales</h2>
                            <p className="text-slate-400">How one drop manifests differently across volumes</p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <VolumeImpactChart />
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        {[
                            { size: "Small Glass", volume: "0.2–0.3L", desc: "Subtle & symbolic. Perfect for ritual, daily micro-tuning, or first contact." },
                            { size: "1 Liter Bottle", volume: "1L", desc: "Functional activation. Changes in taste, clarity, and sediment become noticeable." },
                            { size: "Larger Volumes", volume: "5–20L", desc: "Test signal mode. Learn how your water reacts before full treatment." }
                        ].map((item, i) => (
                            <FadeIn key={item.size} delay={0.3 + i * 0.1}>
                                <Card className="p-5 bg-slate-900/30 border-white/5">
                                    <h4 className="font-medium text-cyan-400 mb-1">{item.size}</h4>
                                    <div className="text-xs text-slate-500 mb-3">{item.volume}</div>
                                    <p className="text-sm text-slate-400">{item.desc}</p>
                                </Card>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 5: Ritual & Intention */}
            <section className="py-24 bg-gradient-to-b from-[#05060b] to-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm mb-6">
                                <Heart className="w-4 h-4" />
                                Ritual & Intention
                            </div>
                            <h2 className="text-3xl font-light text-white mb-6">A Ritual of Intention in Water</h2>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FadeIn delay={0.1}>
                            <div className="space-y-6">
                                <p className="text-slate-300 leading-relaxed text-lg">
                                    A single drop is a moment of intention. You are saying to your water:
                                </p>
                                <div className="p-6 rounded-xl bg-gradient-to-r from-rose-900/10 to-cyan-900/10 border border-white/5">
                                    <p className="text-xl text-cyan-300 italic text-center">
                                        "I want you more ordered, more clear, more alive."
                                    </p>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "Connects you to volcanic origin, deep-earth mineral memory",
                                        "Small, consistent actions change the whole field",
                                        "Pause → Drop → Stir → Give thanks"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-400">
                                            <Sparkles className="w-5 h-5 text-rose-400/60 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5">
                                <h4 className="text-lg font-medium text-slate-200 mb-4">Optional Practice</h4>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-slate-800/50">
                                        <div className="text-sm font-medium text-cyan-400 mb-2">Before adding the drop:</div>
                                        <p className="text-sm text-slate-400">Hold the bottle for a moment, take one conscious breath.</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-slate-800/50">
                                        <div className="text-sm font-medium text-cyan-400 mb-2">After adding:</div>
                                        <p className="text-sm text-slate-400">Slightly swirl in a vortex motion (clockwise or counterclockwise) to marry mechanics + ion intelligence.</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Section 6: Visual Changes */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
                                <Eye className="w-4 h-4" />
                                Observable Changes
                            </div>
                            <h2 className="text-3xl font-light text-white mb-6">What You Can Actually See in the Glass</h2>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <TimeLapseVisual />
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <div className="mt-12 p-6 rounded-xl bg-slate-900/30 border border-amber-500/20">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                    <Eye className="w-5 h-5 text-amber-400" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-amber-300 mb-2">Important</h4>
                                    <p className="text-sm text-slate-400">
                                        You are watching the rearrangement of charges and particles, not "magic sludge".
                                        This is educational: you see what was invisibly distributed before.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Section 7: Experiments */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-5xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
                                <TestTube className="w-4 h-4" />
                                Home Experiments
                            </div>
                            <h2 className="text-3xl font-light text-white mb-6">Simple Home Experiments With One Drop</h2>
                        </div>
                    </FadeIn>

                    <ExperimentCards />
                </div>
            </section>

            {/* Section 8: When One Drop Is Enough */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-light text-white mb-6">One Drop as Signal vs. Full Treatment</h2>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FadeIn delay={0.1}>
                            <Card className="h-full p-6 bg-cyan-900/10 border-cyan-500/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <Scale className="w-6 h-6 text-cyan-400" />
                                    <h3 className="text-lg font-medium text-cyan-300">One Drop as Signal</h3>
                                </div>
                                <ul className="space-y-3 text-sm text-slate-400">
                                    <li>• Perfect for demonstrations & tests</li>
                                    <li>• Great for rituals & "meeting Andara"</li>
                                    <li>• See how your water responds</li>
                                    <li>• Symbolic / experimental use</li>
                                </ul>
                            </Card>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <Card className="h-full p-6 bg-amber-900/10 border-amber-500/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <Beaker className="w-6 h-6 text-amber-400" />
                                    <h3 className="text-lg font-medium text-amber-300">Beyond One Drop</h3>
                                </div>
                                <ul className="space-y-3 text-sm text-slate-400">
                                    <li>• Functional clarification in larger volumes</li>
                                    <li>• Protocols involve more drops per liter</li>
                                    <li>• Sometimes includes waiting & filtering</li>
                                    <li>• Full clarification / conditioning protocols</li>
                                </ul>
                            </Card>
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.3}>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link href="/andara-dilution-calculator">
                                <Button variant="outline" className="gap-2">
                                    <Calculator className="w-4 h-4" />
                                    Dilution Calculator
                                </Button>
                            </Link>
                            <Link href="/how-andara-works">
                                <Button variant="outline" className="gap-2">
                                    <Waves className="w-4 h-4" />
                                    How Andara Works
                                </Button>
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Section 9: FAQ */}
            <section className="py-24 bg-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-3xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-light text-white mb-6">Questions People Ask About a Single Drop</h2>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <FAQAccordion />
                    </FadeIn>
                </div>
            </section>

            {/* Section 10: Call to Action */}
            <section className="py-24 bg-gradient-to-b from-[#020617] to-[#05060b] border-t border-white/5 relative z-10">
                <div className="container px-4 max-w-4xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-light text-white mb-6">Start With a Single Drop</h2>
                            <p className="text-xl text-cyan-300/80 max-w-2xl mx-auto">
                                "If one drop can reveal so much, imagine what an aligned protocol can do for your water."
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <Card className="p-6 bg-slate-900/50 border-white/10">
                                <h4 className="font-medium text-slate-200 mb-4">Try:</h4>
                                <ul className="space-y-3 text-sm text-slate-400">
                                    <li className="flex items-start gap-2">
                                        <Droplets className="w-4 h-4 text-cyan-500 mt-0.5" />
                                        One drop experiment in a glass
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Beaker className="w-4 h-4 text-cyan-500 mt-0.5" />
                                        One drop in different waters you already drink
                                    </li>
                                </ul>
                            </Card>

                            <Card className="p-6 bg-slate-900/50 border-white/10">
                                <h4 className="font-medium text-slate-200 mb-4">Then move to:</h4>
                                <ul className="space-y-3 text-sm text-slate-400">
                                    <li className="flex items-start gap-2">
                                        <ShoppingCart className="w-4 h-4 text-cyan-500 mt-0.5" />
                                        100ml Andara Ionic Blue for personal daily use
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ShoppingCart className="w-4 h-4 text-cyan-500 mt-0.5" />
                                        1L Andara Ionic Pure for family, spa, or pro environments
                                    </li>
                                </ul>
                            </Card>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/products/andara-ionic-100ml">
                                <Button size="lg" className="gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8">
                                    <ShoppingCart className="w-5 h-5" />
                                    Explore Andara Ionic Drops
                                </Button>
                            </Link>
                            <Link href="/andara-dilution-calculator">
                                <Button size="lg" variant="outline" className="gap-2 px-8">
                                    <Calculator className="w-5 h-5" />
                                    See Dilution Guide
                                </Button>
                            </Link>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.5}>
                        <div className="mt-16 text-center">
                            <p className="text-lg text-slate-400 italic">
                                "From one drop to a whole new relationship with water."
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </StandardPageLayout>
    );
}
