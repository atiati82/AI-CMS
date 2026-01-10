import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function IonicVsColloidalPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#8b5cf6";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>Ionic vs Colloidal Minerals – Understanding the Difference | Andara</title>
                <meta name="description" content="Learn the key differences between ionic and colloidal minerals – size, charge, solubility, and bioavailability. Understand why Andara Ionic uses fully dissolved ionic minerals." />
                <meta name="keywords" content="ionic minerals, colloidal minerals, ionic vs colloidal, mineral absorption, mineral bioavailability, dissolved minerals" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="minerals" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO with Video */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a0818] to-[#020617]" />
                        <div className="absolute top-1/3 left-1/4 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}15` }} />
                    </div>

                    <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Mineral Science</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Ionic vs<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#a78bfa] to-[#8b5cf6]">Colloidal</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-xl">Understanding Mineral Differences</p>
                            <p className="text-lg text-white/60 mb-8 max-w-xl">Not all mineral supplements are the same. The difference between ionic and colloidal forms affects size, charge, solubility, and how minerals interact with water and living systems.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "white" }}>Explore the Difference</button>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
                            <SmartVideoEmbed keywords={["ionic", "minerals", "colloidal", "particles", "dissolved"]} className="w-full rounded-2xl shadow-2xl" aspectRatio="video" />
                            <p className="text-center text-white/30 text-xs mt-4 font-mono">Ionic minerals dissolve completely; colloidal particles remain suspended</p>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: Side by Side */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">The Key Differences</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border-2" style={{ borderColor: `${accentColor}40`, backgroundColor: `${accentColor}08` }}>
                                <h3 className="text-2xl font-medium mb-6" style={{ color: accentColor }}>⚡ Ionic Minerals</h3>
                                <ul className="space-y-4 text-white/70">
                                    <li className="flex items-start gap-3"><span style={{ color: accentColor }}>●</span>Individual atoms or molecules with charge</li>
                                    <li className="flex items-start gap-3"><span style={{ color: accentColor }}>●</span>Fully dissolved in solution (invisible)</li>
                                    <li className="flex items-start gap-3"><span style={{ color: accentColor }}>●</span>Size: 0.1-1 nanometers</li>
                                    <li className="flex items-start gap-3"><span style={{ color: accentColor }}>●</span>Conduct electricity (increase EC/TDS)</li>
                                    <li className="flex items-start gap-3"><span style={{ color: accentColor }}>●</span>Biologically active form</li>
                                </ul>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-amber-500/30 bg-amber-950/10">
                                <h3 className="text-2xl text-amber-400 font-medium mb-6">🔵 Colloidal Minerals</h3>
                                <ul className="space-y-4 text-white/70">
                                    <li className="flex items-start gap-3"><span className="text-amber-400">●</span>Clusters of many atoms/molecules</li>
                                    <li className="flex items-start gap-3"><span className="text-amber-400">●</span>Suspended particles (may scatter light)</li>
                                    <li className="flex items-start gap-3"><span className="text-amber-400">●</span>Size: 1-1000 nanometers</li>
                                    <li className="flex items-start gap-3"><span className="text-amber-400">●</span>Do not conduct electricity directly</li>
                                    <li className="flex items-start gap-3"><span className="text-amber-400">●</span>May need conversion to ionic form</li>
                                </ul>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Visual Comparison */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Size Comparison</h2>
                        </motion.header>
                        <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border border-white/20 bg-white/5">
                                <div className="flex items-end justify-center gap-8 h-48">
                                    <div className="text-center">
                                        <div className="w-2 h-2 rounded-full mx-auto mb-4" style={{ backgroundColor: accentColor }} />
                                        <p className="text-white/60 text-sm">Ionic</p>
                                        <p className="text-white/40 text-xs">~0.5 nm</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-8 h-8 rounded-full mx-auto mb-4 bg-amber-500/60" />
                                        <p className="text-white/60 text-sm">Colloidal</p>
                                        <p className="text-white/40 text-xs">10-100 nm</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-red-500/30 flex items-center justify-center text-4xl">🦠</div>
                                        <p className="text-white/60 text-sm">Bacteria</p>
                                        <p className="text-white/40 text-xs">1000 nm</p>
                                    </div>
                                </div>
                                <p className="text-center text-white/50 text-sm mt-8">Ionic minerals are 100-1000x smaller than colloidal particles</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: Why Andara Uses Ionic */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Why Andara Uses Ionic Form</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "💧", title: "True Solution", desc: "Ionic minerals fully dissolve – no separation, no settling, uniform distribution." },
                                { icon: "⚡", title: "Electrically Active", desc: "Ions carry charge and can participate in bioelectric processes immediately." },
                                { icon: "📐", title: "Water Structuring", desc: "Dissolved ions interact with water molecules, potentially supporting structure formation." }
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

                {/* NEXT STEPS */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">Continue Exploring</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/ionic-sulfates"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/50 transition-all group">
                                    <span className="text-white group-hover:text-purple-400">Ionic Sulfates →</span>
                                    <p className="text-white/50 text-sm mt-2">The sulfate difference</p>
                                </a></Link>
                                <Link href="/sulfate-chemistry"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/50 transition-all group">
                                    <span className="text-white group-hover:text-purple-400">Sulfate Chemistry →</span>
                                    <p className="text-white/50 text-sm mt-2">Deep dive into SO₄²⁻</p>
                                </a></Link>
                                <Link href="/conductivity-tds-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/50 transition-all group">
                                    <span className="text-white group-hover:text-purple-400">EC/TDS →</span>
                                    <p className="text-white/50 text-sm mt-2">Measuring ionic content</p>
                                </a></Link>
                                <Link href="/science-library"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/50 transition-all group">
                                    <span className="text-white group-hover:text-purple-400">Science Library →</span>
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
