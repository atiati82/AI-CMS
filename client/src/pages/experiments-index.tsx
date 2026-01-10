import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Helmet } from "@/lib/react-helmet-stub";

export default function ExperimentsIndexPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#8b5cf6";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    const experiments = [
        { title: "DIY Clarity Tests", desc: "Simple at-home water clarity experiments", icon: "🧪", href: "/diy-clarity-tests", difficulty: "Easy" },
        { title: "Vortex Spin Experiments", desc: "Create vortex flow and observe effects", icon: "🌀", href: "/vortex-spin-experiments", difficulty: "Medium" },
        { title: "Magnet Placement", desc: "Explore magnetic field effects on water", icon: "🧲", href: "/magnet-placement-experiments", difficulty: "Medium" },
        { title: "Parameter Tracking", desc: "Track pH, ORP, EC over time", icon: "📊", href: "/parameter-tracking", difficulty: "Advanced" },
        { title: "Andara vs Baseline", desc: "Compare treated vs untreated water", icon: "⚖️", href: "/andara-vs-baseline-water-protocol", difficulty: "Advanced" },
        { title: "Water Case Studies", desc: "Real-world observations from users", icon: "🌍", href: "/water-case-studies-world", difficulty: "Reference" }
    ];

    return (
        <Layout>
            <Helmet>
                <title>Experiments Index – Hands-On Water Science | Andara</title>
                <meta name="description" content="Explore hands-on water experiments you can try at home or in the field. DIY clarity tests, vortex experiments, magnetic effects, and more." />
                <meta name="keywords" content="water experiments, DIY water tests, vortex experiment, water clarity, home water testing, citizen science" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="experiments" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#0c0818]/90 to-[#020617]" />
                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Experiments</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Experiments<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#a78bfa] to-[#8b5cf6]">Index</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Hands-On Water Science</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">Theory is one thing – direct observation is another. Explore experiments you can try yourself to learn about water's remarkable properties.</p>
                        </motion.div>
                    </div>
                </motion.section>

                {/* EXPERIMENTS GRID */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {experiments.map((exp) => (
                                <motion.div key={exp.title} variants={fadeUp}>
                                    <Link href={exp.href}>
                                        <a className="block p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-violet-500/50 transition-all group h-full">
                                            <div className="text-4xl mb-4">{exp.icon}</div>
                                            <h3 className="text-xl text-white font-medium mb-2 group-hover:text-violet-400 transition-colors">{exp.title}</h3>
                                            <p className="text-white/60 text-sm mb-4">{exp.desc}</p>
                                            <span className="inline-block px-2 py-1 rounded text-xs bg-white/10 text-white/50">{exp.difficulty}</span>
                                        </a>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CITIZEN SCIENCE CTA */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-6">Join the Citizen Science Movement</h2>
                            <p className="text-white/60 mb-8">Share your observations and contribute to our collective understanding of water behavior.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/citizen-science-hub"><a className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "white" }}>Join the Hub</a></Link>
                                <Link href="/home-water-test-kit"><a className="px-8 py-4 font-bold rounded-lg border border-white/20 text-white hover:border-violet-500/50 transition-all">Get Test Kit</a></Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* NEXT STEPS */}
                <section className="section relative z-10 py-16">
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/how-to-use"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-violet-500/50 transition-all group">
                                    <span className="text-white group-hover:text-violet-400">How to Use Andara →</span>
                                    <p className="text-white/50 text-sm mt-2">Start experimenting</p>
                                </a></Link>
                                <Link href="/science-library"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-violet-500/50 transition-all group">
                                    <span className="text-white group-hover:text-violet-400">Science Library →</span>
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
