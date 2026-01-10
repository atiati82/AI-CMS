import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Helmet } from "@/lib/react-helmet-stub";

export default function HomeWaterTestKitPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#22c55e";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>Home Water Test Kit – Everything You Need to Test Your Water | Andara</title>
                <meta name="description" content="Build your own home water testing kit. Learn which meters, strips, and tools you need to measure pH, ORP, TDS, and observe water quality changes." />
                <meta name="keywords" content="water test kit, home water testing, pH meter, ORP meter, TDS meter, water quality testing" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="tools" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#051815]/90 to-[#020617]" />
                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Tools · Testing</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Home Water<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-[#22c55e]">Test Kit</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Build Your Testing Arsenal</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">What equipment do you need to test water at home? Here's a guide to building your own water testing kit.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>See the Kit</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: Essential Tools */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Essential Tools</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "📊", title: "pH Meter", desc: "Measures acidity/alkalinity. Look for 0.01 resolution.", price: "$15-50", priority: "Essential" },
                                { icon: "⚡", title: "ORP Meter", desc: "Measures oxidation-reduction potential in mV.", price: "$20-60", priority: "Essential" },
                                { icon: "🔌", title: "TDS Meter", desc: "Total Dissolved Solids, shows mineral content.", price: "$10-30", priority: "Essential" }
                            ].map((item) => (
                                <motion.div key={item.title} variants={fadeUp} className="p-8 rounded-2xl border-2" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <span className="inline-block px-2 py-1 rounded text-xs bg-green-500/20 text-green-300 mb-3">{item.priority}</span>
                                    <h3 className="text-xl text-white font-medium mb-2">{item.title}</h3>
                                    <p className="text-white/60 text-sm mb-3">{item.desc}</p>
                                    <p className="text-green-400/80 text-sm font-medium">{item.price}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Nice to Have */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Nice to Have</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "🔬", title: "USB Microscope", desc: "See water structure up close" },
                                { icon: "🌡️", title: "Thermometer", desc: "Track temperature effects" },
                                { icon: "📱", title: "Camera/Phone", desc: "Document visual changes" },
                                { icon: "📓", title: "Lab Notebook", desc: "Record all observations" }
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

                {/* SECTION 3: Where to Buy */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Where to Buy</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <p className="text-white/80 text-lg leading-relaxed text-center mb-6">These tools are widely available from:</p>
                                <ul className="space-y-3 max-w-md mx-auto">
                                    {["Amazon (search \"digital pH meter pen\")", "eBay", "AliExpress (budget options)", "Specialty water testing suppliers", "Local aquarium/pool supply stores"].map((item) => (
                                        <li key={item} className="text-white/60 text-sm flex items-center gap-2"><span style={{ color: accentColor }}>→</span>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* NEXT STEPS */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">Start Testing</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/parameter-tracking"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-green-500/50 transition-all group">
                                    <span className="text-white group-hover:text-green-400">Parameter Tracking →</span>
                                    <p className="text-white/50 text-sm mt-2">How to use your meters</p>
                                </a></Link>
                                <Link href="/diy-clarity-tests"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-green-500/50 transition-all group">
                                    <span className="text-white group-hover:text-green-400">DIY Clarity Tests →</span>
                                    <p className="text-white/50 text-sm mt-2">Simple visual tests</p>
                                </a></Link>
                                <Link href="/experiments-index"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-green-500/50 transition-all group">
                                    <span className="text-white group-hover:text-green-400">All Experiments →</span>
                                    <p className="text-white/50 text-sm mt-2">Browse experiments</p>
                                </a></Link>
                                <Link href="/shop"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-green-500/50 transition-all group">
                                    <span className="text-white group-hover:text-green-400">Shop Andara →</span>
                                    <p className="text-white/50 text-sm mt-2">Get your minerals</p>
                                </a></Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
