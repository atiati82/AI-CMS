import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function HowItWorksPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#0ea5e9";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>How Andara Ionic Works – Mineral Clarification Explained | Andara</title>
                <meta name="description" content="Understand how Andara Ionic minerals work to clarify and condition water. Learn about ionic sulfate chemistry, mineral dispersion, and the clarification process." />
                <meta name="keywords" content="how Andara works, ionic mineral clarification, sulfate minerals, water conditioning, mineral drops" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="brand" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO with Video */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <SmartVideoEmbed keywords={["mechanics", "engineering", "system", "process", "flow"]} className="absolute inset-0 w-full h-full object-cover opacity-10" aspectRatio="video" autoPlay muted loop />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#051520]/90 to-[#020617]" />
                    </div>

                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Brand · Understanding Andara</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                How Andara<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] via-[#38bdf8] to-[#0ea5e9]">Ionic Works</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Mineral Clarification Explained</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">A few drops of primordial ionic sulfate minerals in water – but what actually happens? Let's break down the process.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "white" }}>See the Process</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: The Ingredients */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What's In Andara Ionic</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border-2" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <div className="grid md:grid-cols-3 gap-6 mb-6">
                                    <div className="p-4 rounded-lg bg-white/5 text-center">
                                        <p className="text-2xl mb-2">💎</p>
                                        <p className="text-white font-medium">Sulfate Minerals</p>
                                        <p className="text-white/40 text-xs mt-1">SO₄²⁻ in ionic form</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5 text-center">
                                        <p className="text-2xl mb-2">🌋</p>
                                        <p className="text-white font-medium">Trace Elements</p>
                                        <p className="text-white/40 text-xs mt-1">Volcanic origin minerals</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5 text-center">
                                        <p className="text-2xl mb-2">💧</p>
                                        <p className="text-white font-medium">Pure Water</p>
                                        <p className="text-white/40 text-xs mt-1">Carrier medium</p>
                                    </div>
                                </div>
                                <p className="text-white/80 text-center">A concentrate of primordial ionic sulfate minerals extracted from ancient volcanic deposits.</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: The Process */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">The Clarification Process</h2>
                        </motion.header>
                        <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    { step: "1", title: "Add Drops", desc: "Ionic minerals disperse instantly throughout the water", icon: "💧" },
                                    { step: "2", title: "Wait", desc: "Particles aggregate and settle over 15-30 minutes", icon: "⏳" },
                                    { step: "3", title: "Observe", desc: "Water clarifies; sediment visible at bottom", icon: "✨" }
                                ].map((item) => (
                                    <motion.div key={item.step} variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-display mx-auto mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>{item.step}</div>
                                        <div className="text-3xl mb-3">{item.icon}</div>
                                        <h3 className="text-white font-medium mb-2">{item.title}</h3>
                                        <p className="text-white/60 text-sm">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: What We Observe */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What We Observe</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <h3 className="text-xl text-white font-medium mb-4">Physical Changes</h3>
                                <ul className="space-y-2">
                                    {["Visible clarification", "Particles settling", "Improved taste (reported)", "Different pour behavior"].map((item) => (
                                        <li key={item} className="text-white/60 text-sm flex items-center gap-2"><span style={{ color: accentColor }}>→</span>{item}</li>
                                    ))}
                                </ul>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <h3 className="text-xl text-white font-medium mb-4">Measurable Changes</h3>
                                <ul className="space-y-2">
                                    {["pH may shift", "EC/TDS increases", "ORP often improves", "Turbidity decreases"].map((item) => (
                                        <li key={item} className="text-white/60 text-sm flex items-center gap-2"><span style={{ color: accentColor }}>→</span>{item}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">Ready to Try It?</h2>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                                <Link href="/shop"><a className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "white" }}>Shop Now</a></Link>
                                <Link href="/how-to-use"><a className="px-8 py-4 font-bold rounded-lg border border-white/20 text-white hover:border-cyan-500/50 transition-all">Usage Guide</a></Link>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/science-library"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">Science Library →</span>
                                    <p className="text-white/50 text-sm mt-2">Understand the science</p>
                                </a></Link>
                                <Link href="/trust-faq-safety"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                                    <span className="text-white group-hover:text-cyan-400">FAQ & Safety →</span>
                                    <p className="text-white/50 text-sm mt-2">Common questions answered</p>
                                </a></Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
