import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Helmet } from "@/lib/react-helmet-stub";

export default function WaterCaseStudiesWorldPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#06b6d4";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    const caseStudies = [
        { location: "Germany", source: "City Tap Water", finding: "Visible sediment after 20 min, pH shifted from 7.2 to 7.8", icon: "🇩🇪" },
        { location: "California, USA", source: "Filtered Tap", finding: "Less dramatic clarification, ORP improved by 40mV", icon: "🇺🇸" },
        { location: "Thailand", source: "Bottled Water", finding: "Minimal visible change but taste reported as \"softer\"", icon: "🇹🇭" },
        { location: "Australia", source: "Rainwater Tank", finding: "Strong clarification, visible particles settling rapidly", icon: "🇦🇺" },
        { location: "UK", source: "Hard Well Water", finding: "Significant sediment, water felt different", icon: "🇬🇧" },
        { location: "Japan", source: "Spring Water", finding: "Already high quality water, subtle changes only", icon: "🇯🇵" }
    ];

    return (
        <Layout>
            <Helmet>
                <title>Water Case Studies from Around the World | Andara</title>
                <meta name="description" content="Real observations from Andara users worldwide. See how different water sources respond to ionic mineral treatment across various locations and conditions." />
                <meta name="keywords" content="water case studies, Andara results, water quality worldwide, user observations, water experiences" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="community" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#051520]/90 to-[#020617]" />
                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Community · Case Studies</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Water Case Studies<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] via-[#22d3ee] to-[#06b6d4]">Worldwide</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Real Observations from Real Users</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">Every water source is different. See how users around the world have observed Andara's effects on their local water.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>View Cases</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: Case Studies Grid */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">User Observations</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {caseStudies.map((study) => (
                                <motion.div key={study.location} variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-2xl">{study.icon}</span>
                                        <div>
                                            <h3 className="text-white font-medium">{study.location}</h3>
                                            <p className="text-white/40 text-xs">{study.source}</p>
                                        </div>
                                    </div>
                                    <p className="text-white/60 text-sm">{study.finding}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                        <motion.div className="max-w-3xl mx-auto mt-12 p-6 rounded-xl border border-amber-500/30 bg-amber-950/10 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <p className="text-amber-400/80 text-sm">Note: These are user-reported observations, not controlled scientific studies. Your results may vary based on your local water source.</p>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Patterns */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Common Patterns</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "🏭", title: "Hard Water = More Visible", desc: "Waters with higher mineral content tend to show more dramatic clarification" },
                                { icon: "🌿", title: "Clean Water = Subtle", desc: "Already-filtered or spring waters show less visible change" },
                                { icon: "⏰", title: "Time Matters", desc: "Some effects take 30+ minutes to fully develop" }
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

                {/* CTA */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-6">Share Your Observations</h2>
                            <p className="text-white/60 mb-8">Have you tested Andara on your local water? Join our community and share your findings.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                                <Link href="/citizen-science-hub"><a className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>Join Citizen Science</a></Link>
                                <Link href="/andara-vs-baseline-water-protocol"><a className="px-8 py-4 font-bold rounded-lg border border-white/20 text-white hover:border-cyan-500/50 transition-all">Test Protocol</a></Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
