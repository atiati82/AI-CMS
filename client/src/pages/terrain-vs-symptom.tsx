import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants, type Easing } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function TerrainVsSymptomPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    // Green accent for Terrain Model cluster
    const accentColor = "#22c55e";
    const accentGradient = "from-[#22c55e] via-[#4ade80] to-[#22c55e]";

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as Easing } }
    };

    const staggerContainer: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
    };

    return (
        <Layout>
            <Helmet>
                <title>Terrain vs Symptom – A New Way to Understand the Body | Andara</title>
                <meta name="description" content="Discover the difference between chasing symptoms and caring for the terrain – the underlying environment of water, minerals, charge and structure that shapes how the body responds." />
                <meta name="keywords" content="terrain vs symptom, terrain model, terrain-based thinking, body environment, internal terrain, symptom-focused medicine" />
            </Helmet>

            <div
                ref={containerRef}
                className="andara-page"
                data-tree="terrain"
                style={{ backgroundColor: "#020617" }}
            >
                {/* Scroll Progress */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
                    style={{ scaleX: scrollYProgress, backgroundColor: accentColor }}
                />

                {/* --- HERO SECTION --- */}
                <motion.section
                    className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
                    style={{ opacity: heroOpacity, scale: heroScale }}
                >
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#051010] to-[#020617]" />
                        <div className="absolute top-1/3 left-1/4 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}12` }} />
                        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 blur-[120px] rounded-full" style={{ backgroundColor: "#16a34a15" }} />
                        {/* Organic floating particles */}
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    width: Math.random() * 8 + 3,
                                    height: Math.random() * 8 + 3,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    backgroundColor: `${accentColor}25`,
                                }}
                                animate={{
                                    y: [0, -60, 0],
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{
                                    duration: Math.random() * 12 + 8,
                                    repeat: Infinity,
                                    ease: "easeInOut" as Easing
                                }}
                            />
                        ))}
                    </div>

                    <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" as Easing }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6"
                                style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Terrain Model</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Terrain vs <br />
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${accentGradient} bg-[length:200%_auto] animate-gradient`}>
                                    Symptom
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-4 max-w-xl">
                                <strong className="text-white">Changing the Question You Ask</strong>
                            </p>
                            <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
                                Most of us were trained to ask: "How do I get rid of this symptom?"
                                <br />
                                Terrain thinking asks something different: <strong className="text-white/80">"What kind of environment would no longer need to express this?"</strong>
                            </p>

                            <div className="flex flex-wrap gap-3 mb-8">
                                {["Holistic Model", "Paradigm Shift", "Education"].map((tag) => (
                                    <span key={tag} className="px-4 py-2 rounded-full text-sm font-medium border"
                                        style={{ backgroundColor: `${accentColor}10`, borderColor: `${accentColor}30`, color: accentColor }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <button
                                onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105"
                                style={{ backgroundColor: accentColor, color: "#020617", boxShadow: `0 0 30px ${accentColor}40` }}
                            >
                                Explore the Shift
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative"
                        >
                            <SmartVideoEmbed
                                keywords={["terrain", "ecosystem", "garden", "landscape", "organic"]}
                                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                                aspectRatio="video"
                            />
                            <p className="text-center text-white/30 text-xs mt-4 font-mono">
                                Same body. Same signals. Different relationship.
                            </p>
                        </motion.div>
                    </div>
                </motion.section>


                {/* --- SECTION 1: SYMPTOM HUNTING --- */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header
                            className="max-w-3xl mx-auto text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                1. The Symptom Lens
                            </h2>
                            <p className="text-lg text-white/70 leading-relaxed">
                                Zooming in too close – focusing on isolated complaints instead of the whole picture.
                            </p>
                        </motion.header>

                        <motion.div
                            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {/* Car Analogy */}
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <div className="text-4xl mb-4">🚗</div>
                                <h3 className="text-xl text-white font-medium mb-3">The Engine Knocks</h3>
                                <div className="space-y-3 text-sm">
                                    <p className="text-red-400/80">Symptom: Turn up the music to hide it</p>
                                    <p className="text-white/60" style={{ color: accentColor }}>Terrain: Check fuel, oil, filters, temperature</p>
                                </div>
                            </motion.div>

                            {/* House Analogy */}
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <div className="text-4xl mb-4">🏠</div>
                                <h3 className="text-xl text-white font-medium mb-3">Cracks in the Wall</h3>
                                <div className="space-y-3 text-sm">
                                    <p className="text-red-400/80">Symptom: Paint over the crack</p>
                                    <p className="text-white/60" style={{ color: accentColor }}>Terrain: Check foundation, moisture, soil</p>
                                </div>
                            </motion.div>

                            {/* Phone Analogy */}
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <div className="text-4xl mb-4">📱</div>
                                <h3 className="text-xl text-white font-medium mb-3">Battery Draining</h3>
                                <div className="space-y-3 text-sm">
                                    <p className="text-red-400/80">Symptom: Close one app, complain</p>
                                    <p className="text-white/60" style={{ color: accentColor }}>Terrain: Check brightness, processes, battery health</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="max-w-3xl mx-auto mt-16 p-8 rounded-2xl border-2 text-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}
                        >
                            <p className="text-white text-xl font-medium">
                                Symptom thinking focuses on what shouts the loudest.
                            </p>
                            <p className="text-lg mt-4" style={{ color: accentColor }}>
                                Terrain thinking asks: "What kind of ecosystem would not need to shout?"
                            </p>
                        </motion.div>
                    </div>
                </section>


                {/* --- SECTION 2: WHAT IS TERRAIN --- */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header
                            className="max-w-3xl mx-auto text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                2. What Do We Mean by "Terrain"?
                            </h2>
                            <p className="text-lg text-white/70">
                                The overall environment in which cells, microbes and signals live.
                            </p>
                        </motion.header>

                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-cyan-500/30 bg-cyan-950/10 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl" style={{ backgroundColor: "rgba(6, 182, 212, 0.2)" }}>
                                    💧
                                </div>
                                <h3 className="text-lg text-cyan-400 font-medium mb-2">Water</h3>
                                <p className="text-white/60 text-sm">
                                    How clean or polluted. pH, redox, mineral content. Structured vs chaotic.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-amber-500/30 bg-amber-950/10 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl" style={{ backgroundColor: "rgba(245, 158, 11, 0.2)" }}>
                                    💎
                                </div>
                                <h3 className="text-lg text-amber-400 font-medium mb-2">Minerals</h3>
                                <p className="text-white/60 text-sm">
                                    Foundational ions. Trace minerals. Ability to buffer, conduct, drive enzymes.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-purple-500/30 bg-purple-950/10 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl" style={{ backgroundColor: "rgba(168, 85, 247, 0.2)" }}>
                                    ⚡
                                </div>
                                <h3 className="text-lg text-purple-400 font-medium mb-2">Charge</h3>
                                <p className="text-white/60 text-sm">
                                    Cell membrane potentials. Proton/electron gradients. Electric weather in tissues.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-green-500/30 bg-green-950/10 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl" style={{ backgroundColor: "rgba(34, 197, 94, 0.2)" }}>
                                    🌊
                                </div>
                                <h3 className="text-lg text-green-400 font-medium mb-2">Structure & Flow</h3>
                                <p className="text-white/60 text-sm">
                                    Fascia tension. Lymph, blood, interstitial flow. Space or stagnation.
                                </p>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="max-w-3xl mx-auto mt-16 p-8 rounded-2xl border border-white/20 bg-white/5 text-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <p className="text-2xl text-white font-medium">
                                Terrain = Water + Minerals + Charge + Flow
                            </p>
                            <p className="text-white/60 mt-4">
                                What we call a "symptom" is one way this terrain tries to report about itself.
                            </p>
                        </motion.div>
                    </div>
                </section>


                {/* --- SECTION 3: TWO MINDSETS --- */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header
                            className="max-w-3xl mx-auto text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                3. Two Different Conversations
                            </h2>
                        </motion.header>

                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="p-8 rounded-2xl border border-red-500/30 bg-red-950/10"
                            >
                                <h3 className="text-xl text-red-400 font-medium mb-6">Symptom Mindset Asks:</h3>
                                <ul className="space-y-4 text-white/70">
                                    <li className="flex gap-3"><span className="text-red-400">→</span> How do I silence this signal?</li>
                                    <li className="flex gap-3"><span className="text-red-400">→</span> What can I take so this goes away fast?</li>
                                    <li className="flex gap-3"><span className="text-red-400">→</span> What label explains this one issue?</li>
                                </ul>
                            </motion.div>

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="p-8 rounded-2xl border-2"
                                style={{ borderColor: `${accentColor}40`, backgroundColor: `${accentColor}08` }}
                            >
                                <h3 className="text-xl font-medium mb-6" style={{ color: accentColor }}>Terrain Mindset Asks:</h3>
                                <ul className="space-y-4 text-white/70">
                                    <li className="flex gap-3"><span style={{ color: accentColor }}>→</span> What is this signal showing about my environment?</li>
                                    <li className="flex gap-3"><span style={{ color: accentColor }}>→</span> What looks overloaded, stagnant, or starved?</li>
                                    <li className="flex gap-3"><span style={{ color: accentColor }}>→</span> Which 1–2 terrain levers could I gently support?</li>
                                </ul>
                            </motion.div>
                        </div>

                        <motion.div
                            className="max-w-3xl mx-auto mt-12 p-6 rounded-xl border border-white/10 bg-white/5 text-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <p className="text-white/80 italic text-lg">
                                "The terrain question is slower, more curious, and it treats you as a living ecosystem, not a broken machine."
                            </p>
                        </motion.div>
                    </div>
                </section>


                {/* --- SECTION 4: WATER & MINERALS --- */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header
                            className="max-w-3xl mx-auto text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                4. Why Water & Minerals Are Terrain Fundamentals
                            </h2>
                        </motion.header>

                        <motion.div
                            className="max-w-4xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <p className="text-white/80 text-lg leading-relaxed text-center mb-8">
                                    If terrain = environment, then <strong className="text-white">water is the main medium</strong> of that environment.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="p-6 rounded-xl bg-white/5 text-center">
                                        <span className="text-3xl mb-3 block">💧</span>
                                        <h4 className="text-white font-medium mb-2">Water as Carrier</h4>
                                        <p className="text-white/60 text-sm">Every cell, matrix and fascia layer lives in water</p>
                                    </div>
                                    <div className="p-6 rounded-xl bg-white/5 text-center">
                                        <span className="text-3xl mb-3 block">💎</span>
                                        <h4 className="text-white font-medium mb-2">Minerals as Organizers</h4>
                                        <p className="text-white/60 text-sm">Shape pH, carry charge, activate enzymes, stabilize layers</p>
                                    </div>
                                    <div className="p-6 rounded-xl bg-white/5 text-center">
                                        <span className="text-3xl mb-3 block">🔷</span>
                                        <h4 className="text-white font-medium mb-2">Sulfate as Architect</h4>
                                        <p className="text-white/60 text-sm">Supports connective tissue, hydration layers, detox pathways</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>


                {/* --- SECTION 5: WHERE ANDARA FITS --- */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header
                            className="max-w-3xl mx-auto text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                5. Where Andara Ionic Fits
                            </h2>
                        </motion.header>

                        <motion.div
                            className="max-w-3xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <div className="p-8 rounded-2xl border-2 text-center"
                                style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <p className="text-white/80 text-lg leading-relaxed mb-6">
                                    Andara Ionic is <strong className="text-white">not a cure, fix or treatment</strong>.
                                    It is one terrain lever on one layer:
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <span className="px-5 py-2 rounded-full font-medium" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                                        Water Clarification
                                    </span>
                                    <span className="px-5 py-2 rounded-full font-medium" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                                        Ionic Sulfate Minerals
                                    </span>
                                    <span className="px-5 py-2 rounded-full font-medium" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                                        Spring-like Ranges
                                    </span>
                                </div>
                                <p className="text-white/60 mt-8 text-sm">
                                    In the Andara universe, symptoms are never the hero of the story.
                                    The focus is the terrain: the water you drink, the minerals you restore, the structure and signals you cultivate over time.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>


                {/* --- SECTION 6: EMOTIONAL REFRAME --- */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header
                            className="max-w-3xl mx-auto text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                6. From Fear to Dialogue
                            </h2>
                            <p className="text-lg text-white/70">
                                Moving from "What's wrong with me?" to "What is my terrain showing me?"
                            </p>
                        </motion.header>

                        <motion.div
                            className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeUp} className="p-6 rounded-xl border border-white/10 bg-white/5">
                                <p className="text-red-400/80 text-sm mb-2">Instead of:</p>
                                <p className="text-white text-lg">"Why is my body like this?"</p>
                                <p className="mt-4 text-sm" style={{ color: accentColor }}>Try:</p>
                                <p className="text-white/80">"What has my water, minerals and rest looked like this week?"</p>
                            </motion.div>

                            <motion.div variants={fadeUp} className="p-6 rounded-xl border border-white/10 bg-white/5">
                                <p className="text-red-400/80 text-sm mb-2">Instead of:</p>
                                <p className="text-white text-lg">"How do I make this stop?"</p>
                                <p className="mt-4 text-sm" style={{ color: accentColor }}>Try:</p>
                                <p className="text-white/80">"What is this asking me to notice and adjust in my terrain?"</p>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="max-w-3xl mx-auto mt-12 p-8 rounded-2xl border border-white/20 bg-white/5 text-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <p className="text-white text-xl font-medium">
                                Terrain thinking does not ignore distress.
                            </p>
                            <p className="text-white/70 mt-4">
                                It simply refuses to reduce you to it. It treats you as a living landscape
                                that can be observed, supported, and slowly re-patterned.
                            </p>
                        </motion.div>
                    </div>
                </section>


                {/* --- SECTION 7: NEXT STEPS --- */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.div
                            className="max-w-3xl mx-auto text-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">
                                Continue Exploring
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/terrain-model-overview">
                                    <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-green-500/50 transition-all group">
                                        <span className="text-white group-hover:text-green-400 transition-colors">Terrain Model Overview →</span>
                                        <p className="text-white/50 text-sm mt-2">Full map of terrain components</p>
                                    </a>
                                </Link>
                                <Link href="/terrain-principles-everyday">
                                    <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-green-500/50 transition-all group">
                                        <span className="text-white group-hover:text-green-400 transition-colors">Everyday Principles →</span>
                                        <p className="text-white/50 text-sm mt-2">Daily-life terrain examples</p>
                                    </a>
                                </Link>
                                <Link href="/voltage-detox-pathways">
                                    <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-green-500/50 transition-all group">
                                        <span className="text-white group-hover:text-green-400 transition-colors">Voltage & Detox →</span>
                                        <p className="text-white/50 text-sm mt-2">How charge relates to waste removal</p>
                                    </a>
                                </Link>
                                <Link href="/science/bioelectric-maps">
                                    <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-green-500/50 transition-all group">
                                        <span className="text-white group-hover:text-green-400 transition-colors">Bioelectric Maps →</span>
                                        <p className="text-white/50 text-sm mt-2">Water, body and soil compared</p>
                                    </a>
                                </Link>
                            </div>

                            <p className="text-white/50 text-sm mt-12 max-w-xl mx-auto">
                                When you start seeing terrain instead of only symptoms,
                                you are no longer at war with your body – you are in conversation with the landscape you live in.
                            </p>
                        </motion.div>
                    </div>
                </section>

            </div>
        </Layout>
    );
}
