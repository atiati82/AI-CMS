import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Helmet } from "@/lib/react-helmet-stub";

export default function AndaraVsBaselineWaterProtocolPage() {
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
                <title>Andara vs Baseline Water Protocol – Controlled Comparison | Andara</title>
                <meta name="description" content="A structured protocol for comparing Andara-treated water against untreated baseline water. Scientific approach to observing clarification effects." />
                <meta name="keywords" content="water comparison protocol, Andara test, baseline water, control experiment, water study" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="experiments" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#0c0a05]/90 to-[#020617]" />
                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Experiments · Protocol</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Andara vs Baseline<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b]">Protocol</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Controlled Comparison Method</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">A structured approach to comparing treated vs. untreated water with proper controls.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>View Protocol</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: Why Control Matters */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Why Controls Matter</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border-2" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <p className="text-white/80 text-lg leading-relaxed text-center mb-6">Without a control sample, you can't know if changes are due to Andara or simply due to time, temperature, or other factors. A proper comparison needs:</p>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-4 rounded-lg bg-white/5 text-center border border-white/10">
                                        <p className="text-white font-medium mb-2">Control (A)</p>
                                        <p className="text-white/50 text-sm">Same water, NO Andara added</p>
                                    </div>
                                    <div className="p-4 rounded-lg text-center" style={{ borderWidth: 2, borderColor: `${accentColor}50`, backgroundColor: `${accentColor}10` }}>
                                        <p className="font-medium mb-2" style={{ color: accentColor }}>Treatment (B)</p>
                                        <p className="text-white/50 text-sm">Same water, Andara added</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Protocol Steps */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Protocol Steps</h2>
                        </motion.header>
                        <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <div className="space-y-6">
                                {[
                                    { step: "1", title: "Prepare Identical Samples", desc: "Fill two identical clear containers with equal amounts of the same water source. Label A (control) and B (treatment)." },
                                    { step: "2", title: "Document Baseline", desc: "Photograph both. Measure and record pH, ORP, TDS for both containers before treatment." },
                                    { step: "3", title: "Treat Sample B Only", desc: "Add your standard Andara dose (e.g., 5 drops per liter) to container B only. Stir briefly." },
                                    { step: "4", title: "Wait & Observe", desc: "Let both sit undisturbed in same location (same light, temperature). Document at 15, 30, 60 min." },
                                    { step: "5", title: "Compare Results", desc: "Compare final clarity, sediment, measurements. Photo documentation is key." }
                                ].map((item) => (
                                    <motion.div key={item.step} variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5 flex gap-6">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-display flex-shrink-0" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>{item.step}</div>
                                        <div>
                                            <h3 className="text-white font-medium mb-2">{item.title}</h3>
                                            <p className="text-white/60 text-sm">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: Tips */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Tips for Better Results</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "🏷️", title: "Label Clearly", desc: "Mark A and B so you can't mix them up" },
                                { icon: "📸", title: "Same Angle", desc: "Photograph from identical position each time" },
                                { icon: "🌡️", title: "Same Conditions", desc: "Keep both in identical environment" }
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
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">Related</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/parameter-tracking"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                                    <span className="text-white group-hover:text-amber-400">Parameter Tracking →</span>
                                    <p className="text-white/50 text-sm mt-2">Measure pH, ORP, EC</p>
                                </a></Link>
                                <Link href="/water-case-studies-world"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                                    <span className="text-white group-hover:text-amber-400">Case Studies →</span>
                                    <p className="text-white/50 text-sm mt-2">Results from others</p>
                                </a></Link>
                                <Link href="/diy-clarity-tests"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                                    <span className="text-white group-hover:text-amber-400">DIY Clarity Tests →</span>
                                    <p className="text-white/50 text-sm mt-2">Simple observations</p>
                                </a></Link>
                                <Link href="/experiments-index"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                                    <span className="text-white group-hover:text-amber-400">All Experiments →</span>
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
