import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function VoltageDetoxPathwaysPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    // Teal/Aqua accent for Bioelectric + Terrain
    const accentColor = "#14b8a6";
    const accentGradient = "from-[#14b8a6] via-[#2dd4bf] to-[#14b8a6]";

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as Easing } }
    };

    const staggerContainer: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
    };

    const fourLayers = [
        { icon: "💧", title: "Water Layer", desc: "Quality, structure, pH. Enough free, mobile water to carry ions and wastes.", color: "#06b6d4" },
        { icon: "💎", title: "Mineral Layer", desc: "Ionic minerals present. Proper ratios, not just amounts. Buffers and sulfates.", color: "#f59e0b" },
        { icon: "⚡", title: "Charge Layer", desc: "Differences in charge between regions. Stable potentials and dynamic pulses.", color: "#6366f1" },
        { icon: "🌊", title: "Flow Layer", desc: "Actual pathways and exits. Rhythmic movement, pressure changes, elimination.", color: "#22c55e" }
    ];

    return (
        <Layout>
            <Helmet>
                <title>Voltage Detox Pathways – How Charge Moves Waste Through Terrain | Andara</title>
                <meta name="description" content="Discover how voltage, ion gradients and structured water create natural detox pathways in the body's terrain. An educational map of flows, not a protocol." />
                <meta name="keywords" content="voltage detox pathways, bioelectric detox, terrain-based detox, ion gradients, electrical potential drainage, structured water detox" />
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
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#041512] to-[#020617]" />
                        <div className="absolute top-1/4 left-1/3 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}12` }} />
                        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 blur-[120px] rounded-full" style={{ backgroundColor: "#6366f115" }} />
                        {/* Flowing particles downward */}
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    width: Math.random() * 4 + 2,
                                    height: Math.random() * 4 + 2,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 30}%`,
                                    backgroundColor: `${accentColor}50`,
                                }}
                                animate={{
                                    y: [0, 500],
                                    opacity: [0.5, 0],
                                }}
                                transition={{
                                    duration: Math.random() * 8 + 6,
                                    repeat: Infinity,
                                    delay: Math.random() * 5
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
                                <span>Science Library · Bioelectric + Terrain</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Voltage Detox <br />
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${accentGradient} bg-[length:200%_auto] animate-gradient`}>
                                    Pathways
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-4 max-w-xl">
                                <strong className="text-white">How Charge and Gradients Help Terrain Let Go</strong>
                            </p>
                            <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
                                When we say "detox", we often imagine war. In a terrain view, detox looks different:
                                <strong className="text-white/80"> movement of water, ions and waste guided by voltage and gradients</strong>
                                rather than brute force.
                            </p>

                            <div className="flex flex-wrap gap-3 mb-8">
                                {["Flows", "Gradients", "Pathways", "Release"].map((tag) => (
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
                                Explore the Map
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative"
                        >
                            <SmartVideoEmbed
                                keywords={["detox", "flow", "drainage", "terrain", "voltage"]}
                                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                                aspectRatio="video"
                            />
                            <p className="text-center text-white/30 text-xs mt-4 font-mono">
                                Detox is movement – not war.
                            </p>
                        </motion.div>
                    </div>
                </motion.section>


                {/* --- SECTION 1: REFRAME --- */}
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
                                1. From War on Toxins to Curated Flows
                            </h2>
                        </motion.header>

                        <motion.div
                            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <h3 className="text-xl text-white font-medium mb-4">⚡ "Voltage" means:</h3>
                                <p className="text-white/60 leading-relaxed">
                                    Differences in electric potential between regions. Charge separation that can do work –
                                    like a water tank at height can drive a fountain.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <h3 className="text-xl text-white font-medium mb-4">🌊 "Detox pathways" means:</h3>
                                <p className="text-white/60 leading-relaxed">
                                    All the routes through which water, dissolved ions, metabolic by-products, and environmental residues
                                    can move from one compartment to another and ultimately exit.
                                </p>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="max-w-3xl mx-auto mt-12 p-8 rounded-2xl border-2 text-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}
                        >
                            <p className="text-xl font-medium" style={{ color: accentColor }}>
                                Voltage detox pathways
                            </p>
                            <p className="text-white/80 mt-2">
                                = where charge differences and structured water work together
                                to help terrain move things from "inside and stuck" to "flowing and out".
                            </p>
                        </motion.div>
                    </div>
                </section>


                {/* --- SECTION 2: FOUR LAYERS --- */}
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
                                2. The Four Layers of Detox Terrain
                            </h2>
                            <p className="text-lg text-white/70">
                                An educational model for how voltage and detox pathways interact.
                            </p>
                        </motion.header>

                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {fourLayers.map((layer, index) => (
                                <motion.div
                                    key={layer.title}
                                    variants={fadeUp}
                                    className="p-6 rounded-2xl border text-center relative overflow-hidden"
                                    style={{ borderColor: `${layer.color}30`, backgroundColor: `${layer.color}08` }}
                                >
                                    <div className="absolute top-2 right-2 text-3xl font-bold opacity-20" style={{ color: layer.color }}>
                                        {index + 1}
                                    </div>
                                    <div className="text-4xl mb-4">{layer.icon}</div>
                                    <h3 className="text-lg font-medium mb-3" style={{ color: layer.color }}>{layer.title}</h3>
                                    <p className="text-white/60 text-sm">{layer.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            className="max-w-3xl mx-auto mt-12 p-6 rounded-xl border border-white/10 bg-white/5 text-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <p className="text-white/80">
                                When these four layers cooperate, terrain has what it needs to
                                <strong className="text-white"> loosen, dissolve, transport and release</strong> without drama.
                            </p>
                            <p className="text-white/60 text-sm mt-2">
                                When one layer is very weak, flows slow down – even if the others are strong.
                            </p>
                        </motion.div>
                    </div>
                </section>


                {/* --- SECTION 3: CONCEPTUAL PATHWAYS --- */}
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
                                3. How Charge Helps Clear the Field
                            </h2>
                        </motion.header>

                        <motion.div
                            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                                <h3 className="text-lg text-cyan-400 font-medium mb-3">💧 Osmotic Flows</h3>
                                <p className="text-white/60 text-sm">
                                    Water follows charge. Higher ion concentration = water moves there.
                                    This can dilute stored waste, then redistribute it for elimination.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                                <h3 className="text-lg text-amber-400 font-medium mb-3">🚌 Co-Transport</h3>
                                <p className="text-white/60 text-sm">
                                    Some carriers move an ion and a neutral substance together.
                                    Strong gradients = more efficient carriers = wastes hitch a ride.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                                <h3 className="text-lg text-green-400 font-medium mb-3">⚖️ pH Gradients</h3>
                                <p className="text-white/60 text-sm">
                                    Local acidity can be neutralized and transported when buffers are present.
                                    Sulfate & bicarbonate systems help with acid loads.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                                <h3 className="text-lg text-purple-400 font-medium mb-3">⚡ Redox Flows</h3>
                                <p className="text-white/60 text-sm">
                                    Electron transfer reactions are part of how the system handles reactive species
                                    and spent molecules. Directed electron flow = cleanup.
                                </p>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="max-w-3xl mx-auto mt-12 p-6 rounded-xl border border-white/20 bg-white/5 text-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <p className="text-white/70 text-sm">
                                These are conceptual models, not treatment suggestions. They exist to help you see
                                how terrain and charge might work together, so you can think in flows rather than fear.
                            </p>
                        </motion.div>
                    </div>
                </section>


                {/* --- SECTION 4: STRUCTURED WATER --- */}
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
                                4. Why Structure Makes Flows Less Chaotic
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
                                    At hydrophilic surfaces, water can form more ordered zones. These zones exclude certain solutes,
                                    support charge separation, and act as interfaces where ions arrange and flows become more laminar.
                                </p>
                                <p className="text-lg" style={{ color: accentColor }}>
                                    Where water is structurally coherent, voltage and gradients can be maintained with less chaos.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>


                {/* --- SECTION 5: ANDARA POSITIONING --- */}
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
                                5. Andara Ionic in Context
                            </h2>
                        </motion.header>

                        <motion.div
                            className="max-w-3xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <div className="p-8 rounded-2xl border border-white/20 bg-white/5">
                                <p className="text-white/80 text-lg leading-relaxed text-center mb-6">
                                    Andara Ionic is presented as part of the <strong className="text-white">water + mineral layer</strong> in the 4-layer model.
                                    Its main role is shaping the medium, not acting as a "detox agent".
                                </p>
                                <div className="flex flex-wrap justify-center gap-4 mb-6">
                                    {["Clarification", "Conditioning", "Ionic Sulfate Range"].map((item) => (
                                        <span key={item} className="px-4 py-2 rounded-full text-sm border"
                                            style={{ borderColor: `${accentColor}50`, color: accentColor }}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-white/60 text-center text-sm">
                                    We see Andara Ionic as one way to clarify water and re-introduce mineral ions.
                                    What terrain does with that water depends on many other factors.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>


                {/* --- SECTION 6: NEXT STEPS --- */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
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
                                    <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-teal-500/50 transition-all group">
                                        <span className="text-white group-hover:text-teal-400 transition-colors">Terrain Model Overview →</span>
                                        <p className="text-white/50 text-sm mt-2">Full terrain framework</p>
                                    </a>
                                </Link>
                                <Link href="/terrain-principles-everyday">
                                    <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-teal-500/50 transition-all group">
                                        <span className="text-white group-hover:text-teal-400 transition-colors">Everyday Principles →</span>
                                        <p className="text-white/50 text-sm mt-2">Daily-life terrain examples</p>
                                    </a>
                                </Link>
                                <Link href="/science/ez-water">
                                    <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-teal-500/50 transition-all group">
                                        <span className="text-white group-hover:text-teal-400 transition-colors">EZ Water →</span>
                                        <p className="text-white/50 text-sm mt-2">Structured water science</p>
                                    </a>
                                </Link>
                                <Link href="/science-library">
                                    <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-teal-500/50 transition-all group">
                                        <span className="text-white group-hover:text-teal-400 transition-colors">Science Library →</span>
                                        <p className="text-white/50 text-sm mt-2">Return to library gate</p>
                                    </a>
                                </Link>
                            </div>

                            <p className="text-white/50 text-sm mt-12 max-w-xl mx-auto">
                                This page is educational only. It does not describe treatment,
                                diagnose, cure, or prevent disease. Always consult qualified professionals.
                            </p>
                        </motion.div>
                    </div>
                </section>

            </div>
        </Layout>
    );
}
