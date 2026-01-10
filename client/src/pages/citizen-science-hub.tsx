import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Helmet } from "@/lib/react-helmet-stub";

export default function CitizenScienceHubPage() {
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
                <title>Citizen Science Hub – Community Water Research | Andara</title>
                <meta name="description" content="Join our citizen science community. Share water observations, participate in experiments, and contribute to our collective understanding of water quality and behavior." />
                <meta name="keywords" content="citizen science, water research, community science, water testing, water experiments, volunteer research" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="community" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#051815]/90 to-[#020617]" />
                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Community · Citizen Science</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Citizen Science<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#10b981]">Hub</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Community Water Research</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">Science happens everywhere – not just in labs. Join a global community of curious minds observing, testing, and learning about water together.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>Get Involved</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: How to Participate */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">How to Participate</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { step: "1", title: "Get Testing Tools", desc: "Basic pH, ORP, and TDS meters. Optional: microscope, camera.", icon: "🧪", href: "/home-water-test-kit" },
                                { step: "2", title: "Run Experiments", desc: "Follow our protocols or design your own observations.", icon: "📊", href: "/experiments-index" },
                                { step: "3", title: "Share Results", desc: "Document findings and contribute to community knowledge.", icon: "🌐", href: "/community-join" }
                            ].map((item) => (
                                <motion.div key={item.step} variants={fadeUp}>
                                    <Link href={item.href}>
                                        <a className="block p-8 rounded-2xl border border-white/10 bg-white/5 text-center h-full hover:border-emerald-500/50 transition-all group">
                                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-display mx-auto mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>{item.step}</div>
                                            <div className="text-3xl mb-3">{item.icon}</div>
                                            <h3 className="text-white font-medium mb-2 group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                                            <p className="text-white/60 text-sm">{item.desc}</p>
                                        </a>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Research Topics */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Current Research Topics</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "💧", title: "Clarification Time", desc: "How long until visible clarity with Andara?" },
                                { icon: "🌱", title: "Plant Response", desc: "Germination and growth with treated water" },
                                { icon: "⚡", title: "ORP Changes", desc: "Measuring electron availability over time" },
                                { icon: "🌡️", title: "Temperature Effects", desc: "Does temperature affect clarification?" },
                                { icon: "🔬", title: "Microscopy", desc: "Observing water structure changes" },
                                { icon: "🗺️", title: "Regional Mapping", desc: "Water quality across different locations" }
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

                {/* CTA */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-6">Ready to Contribute?</h2>
                            <p className="text-white/60 mb-8">Join our community of researchers, curious minds, and water enthusiasts.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                                <Link href="/community-join"><a className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>Join Community</a></Link>
                                <Link href="/experiments-index"><a className="px-8 py-4 font-bold rounded-lg border border-white/20 text-white hover:border-emerald-500/50 transition-all">Browse Experiments</a></Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
