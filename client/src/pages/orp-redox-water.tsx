import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Helmet } from "@/lib/react-helmet-stub";

export default function OrpRedoxWaterPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#10b981";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>ORP & Redox in Water – Oxidation-Reduction Potential | Andara</title>
                <meta name="description" content="Understand ORP (Oxidation-Reduction Potential) in water – what it measures, why negative ORP is valued, and how minerals and structure affect water's electron-donating capacity." />
                <meta name="keywords" content="ORP water, redox potential, oxidation reduction, negative ORP, antioxidant water, electron water" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="water" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#041410] to-[#020617]" />
                        <div className="absolute top-1/3 left-1/4 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}15` }} />
                    </div>

                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Water Parameters</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                ORP &<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#10b981]">Redox</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Oxidation-Reduction Potential</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">ORP measures water's tendency to gain or lose electrons – a key indicator of its oxidizing or reducing capacity. Lower (negative) values suggest electron-donating potential.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>Explore ORP</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: What is ORP */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What is ORP?</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-red-500/30 bg-red-950/10">
                                <h3 className="text-lg text-red-400 font-medium mb-3">⊕ Positive ORP</h3>
                                <p className="text-white/60 text-sm mb-3">+200 to +800 mV</p>
                                <p className="text-white/50 text-xs">Oxidizing. Tends to accept electrons. Associated with chlorinated tap water, stale water.</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border-2" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}08` }}>
                                <h3 className="text-lg font-medium mb-3" style={{ color: accentColor }}>⊖ Negative ORP</h3>
                                <p className="text-white/60 text-sm mb-3">-50 to -400 mV</p>
                                <p className="text-white/50 text-xs">Reducing. Tends to donate electrons. Associated with fresh spring water, hydrogen-rich water.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Why ORP Matters */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Why ORP Matters</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "⚡", title: "Electron Availability", desc: "Negative ORP suggests more available electrons – the currency of biochemical reactions." },
                                { icon: "🛡️", title: "Antioxidant Potential", desc: "Water with negative ORP may have reducing capacity, similar to antioxidants." },
                                { icon: "🌊", title: "Water Freshness", desc: "Fresh spring water typically has lower ORP than stagnant or treated water." }
                            ].map((item) => (
                                <motion.div key={item.title} variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="text-xl text-white font-medium mb-3">{item.title}</h3>
                                    <p className="text-white/60 text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: What Affects ORP */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What Affects ORP?</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "💎", title: "Minerals", desc: "Certain minerals lower ORP" },
                                { icon: "🫧", title: "Dissolved Gases", desc: "Hydrogen lowers, chlorine raises" },
                                { icon: "🌡️", title: "Temperature", desc: "Affects reaction rates" },
                                { icon: "⏰", title: "Time", desc: "ORP rises as water sits" }
                            ].map((item) => (
                                <motion.div key={item.title} variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="text-white font-medium mb-2">{item.title}</h3>
                                    <p className="text-white/60 text-xs">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* NEXT STEPS */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">Continue Exploring</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/ph-balance-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/50 transition-all group">
                                    <span className="text-white group-hover:text-emerald-400">pH Balance →</span>
                                    <p className="text-white/50 text-sm mt-2">Acidity and alkalinity</p>
                                </a></Link>
                                <Link href="/conductivity-tds-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/50 transition-all group">
                                    <span className="text-white group-hover:text-emerald-400">EC/TDS →</span>
                                    <p className="text-white/50 text-sm mt-2">Conductivity and dissolved solids</p>
                                </a></Link>
                                <Link href="/parameter-tracking"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/50 transition-all group">
                                    <span className="text-white group-hover:text-emerald-400">Parameter Tracking →</span>
                                    <p className="text-white/50 text-sm mt-2">How to measure water</p>
                                </a></Link>
                                <Link href="/science-library"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/50 transition-all group">
                                    <span className="text-white group-hover:text-emerald-400">Science Library →</span>
                                    <p className="text-white/50 text-sm mt-2">Return to library</p>
                                </a></Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
