import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Helmet } from "@/lib/react-helmet-stub";

export default function PhBalanceWaterPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#14b8a6";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>pH Balance in Water – Understanding Acidity & Alkalinity | Andara</title>
                <meta name="description" content="Learn about pH in water – what it measures, why it matters, and how minerals affect the acid-alkaline balance. Understand the pH scale and its relevance to water quality." />
                <meta name="keywords" content="pH water, water pH, alkaline water, acid water, pH scale, water acidity, water alkalinity" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="water" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#041512] to-[#020617]" />
                        <div className="absolute top-1/3 left-1/4 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}15` }} />
                    </div>

                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Water Parameters</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                pH<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] via-[#2dd4bf] to-[#14b8a6]">Balance</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Understanding Acidity & Alkalinity</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">pH measures the concentration of hydrogen ions – a fundamental property that affects how water interacts with minerals, organisms, and your body.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>Explore pH</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: The pH Scale */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">The pH Scale</h2>
                        </motion.header>
                        <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border border-white/20 bg-white/5">
                                {/* pH Scale Visual */}
                                <div className="flex items-center justify-between mb-8 relative">
                                    <div className="absolute inset-x-0 top-1/2 h-4 rounded-full" style={{ background: "linear-gradient(to right, #ef4444, #f59e0b, #84cc16, #22c55e, #06b6d4, #6366f1, #8b5cf6)" }} />
                                    {[0, 7, 14].map((n) => (
                                        <div key={n} className="relative z-10 flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm">{n}</div>
                                            <p className="text-white/50 text-xs mt-2">{n === 0 ? "Acidic" : n === 7 ? "Neutral" : "Alkaline"}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid md:grid-cols-3 gap-6 text-center">
                                    <div className="p-4 rounded-lg" style={{ backgroundColor: "#ef444410" }}>
                                        <p className="text-red-400 font-medium mb-1">0-6.9</p>
                                        <p className="text-white/60 text-sm">Acidic</p>
                                        <p className="text-white/40 text-xs mt-2">More H⁺ ions. Lemon juice, vinegar, stomach acid.</p>
                                    </div>
                                    <div className="p-4 rounded-lg" style={{ backgroundColor: "#22c55510" }}>
                                        <p className="text-green-400 font-medium mb-1">7</p>
                                        <p className="text-white/60 text-sm">Neutral</p>
                                        <p className="text-white/40 text-xs mt-2">Pure water. Equal H⁺ and OH⁻.</p>
                                    </div>
                                    <div className="p-4 rounded-lg" style={{ backgroundColor: "#6366f110" }}>
                                        <p className="text-indigo-400 font-medium mb-1">7.1-14</p>
                                        <p className="text-white/60 text-sm">Alkaline</p>
                                        <p className="text-white/40 text-xs mt-2">More OH⁻ ions. Baking soda, seawater, some mineral waters.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Why pH Matters */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Why pH Matters</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "💎", title: "Mineral Solubility", desc: "pH affects which minerals dissolve and which precipitate out of water." },
                                { icon: "🦠", title: "Microbial Life", desc: "Different organisms thrive at different pH levels." },
                                { icon: "⚗️", title: "Chemical Reactions", desc: "Many biological processes are pH-dependent." }
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

                {/* SECTION 3: Minerals & pH */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">How Minerals Affect pH</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border-2 text-center" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <p className="text-white/80 text-lg leading-relaxed mb-6">Adding ionic minerals to water changes its pH. Sulfate minerals like those in Andara Ionic tend to create slightly alkaline conditions, while some minerals can make water more acidic.</p>
                                <p className="text-lg" style={{ color: accentColor }}>The key is not just "alkaline" or "acidic" – it's the right balance for the system.</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* NEXT STEPS */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">Continue Exploring</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/orp-redox-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-teal-500/50 transition-all group">
                                    <span className="text-white group-hover:text-teal-400">ORP & Redox →</span>
                                    <p className="text-white/50 text-sm mt-2">Oxidation-reduction potential</p>
                                </a></Link>
                                <Link href="/conductivity-tds-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-teal-500/50 transition-all group">
                                    <span className="text-white group-hover:text-teal-400">EC/TDS →</span>
                                    <p className="text-white/50 text-sm mt-2">Conductivity and dissolved solids</p>
                                </a></Link>
                                <Link href="/turbidity-clarity"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-teal-500/50 transition-all group">
                                    <span className="text-white group-hover:text-teal-400">Turbidity & Clarity →</span>
                                    <p className="text-white/50 text-sm mt-2">Visual water quality</p>
                                </a></Link>
                                <Link href="/science-library"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-teal-500/50 transition-all group">
                                    <span className="text-white group-hover:text-teal-400">Science Library →</span>
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
