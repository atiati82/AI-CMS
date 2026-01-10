import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function DiyClarityTestsPage() {
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
                <title>DIY Clarity Tests – Simple At-Home Water Experiments | Andara</title>
                <meta name="description" content="Learn simple DIY clarity tests you can perform at home. Observe water clarification, sediment formation, and visual changes with Andara Ionic minerals." />
                <meta name="keywords" content="DIY water test, clarity test, home water experiment, water clarification, Andara test" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="experiments" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <SmartVideoEmbed keywords={["clarity", "test", "experiment", "jar", "purification"]} className="absolute inset-0 w-full h-full object-cover opacity-20" aspectRatio="video" autoPlay muted loop />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#0c0818]/90 to-[#020617]" />
                    </div>

                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Experiments · DIY</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                DIY Clarity<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#a78bfa] to-[#8b5cf6]">Tests</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Simple At-Home Water Experiments</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">See Andara's clarifying action with your own eyes. These simple experiments require only water, Andara drops, and clear containers.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "white" }}>Start Testing</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: Materials */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What You'll Need</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "🥛", title: "Clear Glasses", desc: "2 identical clear containers" },
                                { icon: "💧", title: "Andara Ionic", desc: "Your mineral concentrate" },
                                { icon: "🚰", title: "Tap Water", desc: "Or water you want to test" },
                                { icon: "📱", title: "Camera", desc: "To document changes" }
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

                {/* SECTION 2: The Protocol */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">The Protocol</h2>
                        </motion.header>
                        <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    { step: "1", title: "Prepare", desc: "Fill both glasses with identical water. Let settle 5 min. Take photo.", time: "5 min" },
                                    { step: "2", title: "Treat", desc: "Add 5-10 drops Andara to ONE glass. The other is your control.", time: "1 min" },
                                    { step: "3", title: "Wait", desc: "Don't disturb. Document at 5, 15, 30 min intervals.", time: "30 min" },
                                    { step: "4", title: "Compare", desc: "Compare clarity, any sediment, color differences between glasses.", time: "Review" }
                                ].map((item) => (
                                    <motion.div key={item.step} variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-display flex-shrink-0" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>{item.step}</div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-white font-medium">{item.title}</h3>
                                                    <span className="px-2 py-0.5 rounded text-xs bg-white/10 text-white/50">{item.time}</span>
                                                </div>
                                                <p className="text-white/60 text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: What to Observe */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">What to Observe</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "✨", title: "Clarity", desc: "Look for increased transparency in treated water vs. control" },
                                { icon: "⬇️", title: "Sediment", desc: "Watch for particles settling to the bottom" },
                                { icon: "🌈", title: "Color", desc: "Note any changes in color or light refraction" }
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
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">More Experiments</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/vortex-spin-experiments"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-violet-500/50 transition-all group">
                                    <span className="text-white group-hover:text-violet-400">Vortex Experiments →</span>
                                    <p className="text-white/50 text-sm mt-2">Create spiral flow</p>
                                </a></Link>
                                <Link href="/parameter-tracking"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-violet-500/50 transition-all group">
                                    <span className="text-white group-hover:text-violet-400">Parameter Tracking →</span>
                                    <p className="text-white/50 text-sm mt-2">Measure pH, ORP, EC</p>
                                </a></Link>
                                <Link href="/experiments-index"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-violet-500/50 transition-all group">
                                    <span className="text-white group-hover:text-violet-400">All Experiments →</span>
                                    <p className="text-white/50 text-sm mt-2">See the full list</p>
                                </a></Link>
                                <Link href="/citizen-science-hub"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-violet-500/50 transition-all group">
                                    <span className="text-white group-hover:text-violet-400">Share Results →</span>
                                    <p className="text-white/50 text-sm mt-2">Join citizen science</p>
                                </a></Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
