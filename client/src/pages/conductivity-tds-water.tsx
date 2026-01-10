import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function ConductivityTdsWaterPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#f59e0b";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>EC/TDS in Water – Conductivity & Dissolved Solids | Andara</title>
                <meta name="description" content="Understand electrical conductivity (EC) and total dissolved solids (TDS) in water – what they measure, how minerals affect readings, and what these parameters tell us about water quality." />
                <meta name="keywords" content="EC water, TDS water, electrical conductivity, total dissolved solids, water conductivity, mineral water TDS" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="water" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO with Video */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a0805] to-[#020617]" />
                        <div className="absolute top-1/3 left-1/4 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}15` }} />
                    </div>

                    <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Water Parameters</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                EC/TDS<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b]">in Water</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-xl">Conductivity & Dissolved Solids</p>
                            <p className="text-lg text-white/60 mb-8 max-w-xl">EC measures how well water conducts electricity. TDS estimates total dissolved minerals. Together they reveal the ionic character of your water.</p>
                            <div className="flex flex-wrap gap-3 mb-8">
                                {["EC (µS/cm)", "TDS (ppm)", "Ion Content"].map((tag) => (
                                    <span key={tag} className="px-4 py-2 rounded-full text-sm font-medium border" style={{ backgroundColor: `${accentColor}10`, borderColor: `${accentColor}30`, color: accentColor }}>{tag}</span>
                                ))}
                            </div>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>Explore EC/TDS</button>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
                            <SmartVideoEmbed keywords={["conductivity", "TDS", "water testing", "EC meter", "minerals"]} className="w-full rounded-2xl shadow-2xl" aspectRatio="video" />
                            <p className="text-center text-white/30 text-xs mt-4 font-mono">EC meter measuring ionic mineral content</p>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1 */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">EC vs TDS</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-cyan-500/30 bg-cyan-950/10">
                                <h3 className="text-xl text-cyan-400 font-medium mb-4">⚡ EC (Electrical Conductivity)</h3>
                                <p className="text-white/60 text-sm mb-4">Measured in µS/cm (microsiemens per centimeter)</p>
                                <p className="text-white/50 text-xs">Directly measures how well water conducts electrical current. Higher EC = more dissolved ions.</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-amber-500/30 bg-amber-950/10">
                                <h3 className="text-xl text-amber-400 font-medium mb-4">💎 TDS (Total Dissolved Solids)</h3>
                                <p className="text-white/60 text-sm mb-4">Measured in ppm (parts per million) or mg/L</p>
                                <p className="text-white/50 text-xs">Estimated from EC using a conversion factor. Represents total mineral content.</p>
                            </motion.div>
                        </motion.div>
                        <motion.div className="max-w-3xl mx-auto mt-8 p-6 rounded-xl border border-white/10 bg-white/5 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <p className="text-white/70 text-sm">TDS ≈ EC × 0.5 to 0.7 (depending on mineral composition)</p>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Ranges */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Common TDS Ranges</h2>
                        </motion.header>
                        <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border border-white/20 bg-white/5">
                                <div className="space-y-4">
                                    {[
                                        { range: "0-50 ppm", type: "Distilled/RO", color: "#94a3b8" },
                                        { range: "50-150 ppm", type: "Light mineral water", color: "#22d3ee" },
                                        { range: "150-300 ppm", type: "Spring water typical", color: "#22c55e" },
                                        { range: "300-500 ppm", type: "Mineral-rich water", color: "#f59e0b" },
                                        { range: "500+ ppm", type: "High mineral / hard water", color: "#ef4444" }
                                    ].map((item) => (
                                        <div key={item.range} className="flex items-center gap-4 p-3 rounded-lg" style={{ backgroundColor: `${item.color}08` }}>
                                            <div className="w-24 text-sm font-mono" style={{ color: item.color }}>{item.range}</div>
                                            <div className="flex-1 h-2 rounded-full bg-white/10">
                                                <div className="h-full rounded-full" style={{ width: `${parseInt(item.range) / 6}%`, backgroundColor: item.color }} />
                                            </div>
                                            <div className="text-white/60 text-sm">{item.type}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: Andara Effect */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Andara Ionic & TDS</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border-2 text-center" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <p className="text-white/80 text-lg leading-relaxed mb-6">Adding Andara Ionic to water increases TDS/EC readings because it adds ionic minerals (primarily sulfates). This is expected and measurable – a sign that minerals have entered solution.</p>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="p-4 rounded-lg bg-white/5">
                                        <p className="text-white/50 text-xs">Before</p>
                                        <p className="text-amber-400 font-medium">~150 ppm</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5">
                                        <p className="text-2xl">→</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5">
                                        <p className="text-white/50 text-xs">After 2-3 drops/L</p>
                                        <p className="text-amber-400 font-medium">~200-250 ppm</p>
                                    </div>
                                </div>
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
                                <Link href="/ph-balance-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                                    <span className="text-white group-hover:text-amber-400">pH Balance →</span>
                                    <p className="text-white/50 text-sm mt-2">Acidity and alkalinity</p>
                                </a></Link>
                                <Link href="/orp-redox-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                                    <span className="text-white group-hover:text-amber-400">ORP & Redox →</span>
                                    <p className="text-white/50 text-sm mt-2">Oxidation-reduction potential</p>
                                </a></Link>
                                <Link href="/home-water-test-kit"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                                    <span className="text-white group-hover:text-amber-400">Home Test Kit →</span>
                                    <p className="text-white/50 text-sm mt-2">DIY water testing</p>
                                </a></Link>
                                <Link href="/science-library"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                                    <span className="text-white group-hover:text-amber-400">Science Library →</span>
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
