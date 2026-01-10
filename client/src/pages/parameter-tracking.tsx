import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Helmet } from "@/lib/react-helmet-stub";

export default function ParameterTrackingPage() {
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
                <title>Parameter Tracking – Measure Water Quality Over Time | Andara</title>
                <meta name="description" content="Learn to track water parameters like pH, ORP, EC/TDS over time. Establish baselines, document changes, and build a personal water quality database." />
                <meta name="keywords" content="water parameter tracking, pH measurement, ORP tracking, TDS monitoring, water quality data" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="experiments" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#051815]/90 to-[#020617]" />
                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Experiments · Advanced</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Parameter<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#10b981]">Tracking</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Measure Water Quality Over Time</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">Move beyond qualitative observation to quantitative measurement. Track pH, ORP, and conductivity to understand water changes objectively.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>Start Tracking</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: Equipment */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Equipment Needed</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "📊", title: "pH Meter", desc: "Digital pH meter with 0.01 resolution. Calibrate before each use.", price: "$15-50" },
                                { icon: "⚡", title: "ORP Meter", desc: "Measures oxidation-reduction potential in mV.", price: "$20-60" },
                                { icon: "🔌", title: "EC/TDS Meter", desc: "Conductivity or Total Dissolved Solids meter.", price: "$10-30" }
                            ].map((item) => (
                                <motion.div key={item.title} variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="text-xl text-white font-medium mb-2">{item.title}</h3>
                                    <p className="text-white/60 text-sm mb-3">{item.desc}</p>
                                    <span className="inline-block px-3 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-300">{item.price}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Protocol */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Tracking Protocol</h2>
                        </motion.header>
                        <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border-2" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl text-white font-medium mb-4">Before Adding Andara</h3>
                                        <ul className="space-y-2">
                                            {["Measure baseline pH", "Record ORP value", "Note EC/TDS reading", "Write down water source", "Record temperature"].map((item) => (
                                                <li key={item} className="text-white/60 text-sm flex items-center gap-2"><span style={{ color: accentColor }}>1.</span>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-xl text-white font-medium mb-4">After Adding Andara</h3>
                                        <ul className="space-y-2">
                                            {["Immediate reading (T+0)", "After 15 minutes", "After 30 minutes", "After 1 hour", "After 24 hours (optional)"].map((item, i) => (
                                                <li key={item} className="text-white/60 text-sm flex items-center gap-2"><span style={{ color: accentColor }}>→</span>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: Recording */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Sample Data Sheet</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="py-3 px-4 text-left text-white/50">Time</th>
                                            <th className="py-3 px-4 text-left text-white/50">pH</th>
                                            <th className="py-3 px-4 text-left text-white/50">ORP (mV)</th>
                                            <th className="py-3 px-4 text-left text-white/50">TDS (ppm)</th>
                                            <th className="py-3 px-4 text-left text-white/50">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-white/5"><td className="py-3 px-4 text-white/60">Baseline</td><td className="py-3 px-4 text-white/60">7.2</td><td className="py-3 px-4 text-white/60">+180</td><td className="py-3 px-4 text-white/60">220</td><td className="py-3 px-4 text-white/60">Tap water</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-3 px-4 text-white/60">T+0</td><td className="py-3 px-4 text-white/60">7.4</td><td className="py-3 px-4 text-white/60">+165</td><td className="py-3 px-4 text-white/60">235</td><td className="py-3 px-4 text-white/60">5 drops added</td></tr>
                                        <tr className="border-b border-white/5"><td className="py-3 px-4 text-white/60">T+15</td><td className="py-3 px-4 text-white/60">7.5</td><td className="py-3 px-4 text-white/60">+140</td><td className="py-3 px-4 text-white/60">240</td><td className="py-3 px-4 text-white/60">Slight clouding</td></tr>
                                        <tr><td className="py-3 px-4 text-white/60">T+30</td><td className="py-3 px-4 text-white/60">7.6</td><td className="py-3 px-4 text-white/60">+120</td><td className="py-3 px-4 text-white/60">245</td><td className="py-3 px-4 text-white/60">Sediment visible</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-center text-white/40 text-xs mt-4">Example data – your results will vary based on source water</p>
                        </motion.div>
                    </div>
                </section>

                {/* NEXT STEPS */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">Continue Learning</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/ph-balance-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/50 transition-all group">
                                    <span className="text-white group-hover:text-emerald-400">pH in Water →</span>
                                    <p className="text-white/50 text-sm mt-2">Understanding pH</p>
                                </a></Link>
                                <Link href="/orp-redox-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/50 transition-all group">
                                    <span className="text-white group-hover:text-emerald-400">ORP & Redox →</span>
                                    <p className="text-white/50 text-sm mt-2">What ORP means</p>
                                </a></Link>
                                <Link href="/conductivity-tds-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/50 transition-all group">
                                    <span className="text-white group-hover:text-emerald-400">EC & TDS →</span>
                                    <p className="text-white/50 text-sm mt-2">Conductivity explained</p>
                                </a></Link>
                                <Link href="/experiments-index"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/50 transition-all group">
                                    <span className="text-white group-hover:text-emerald-400">All Experiments →</span>
                                    <p className="text-white/50 text-sm mt-2">Return to hub</p>
                                </a></Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
