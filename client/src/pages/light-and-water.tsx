import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function LightAndWaterPage() {
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
                <title>Light & Water – How Photons Shape H₂O | Andara</title>
                <meta name="description" content="Explore the relationship between light and water – how infrared radiation builds EZ water, how UV affects structure, and why sunlight may be essential for healthy hydration." />
                <meta name="keywords" content="light and water, infrared water, photonic water, sunlight hydration, water photobiology, EZ water light" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="water" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f0a05] to-[#020617]" />
                        <div className="absolute top-1/4 left-1/3 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}20` }} />
                        {/* Light rays */}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div key={i} className="absolute origin-top" style={{ left: `${20 + i * 8}%`, top: 0, width: 2, height: "60%", background: `linear-gradient(to bottom, ${accentColor}30, transparent)` }}
                                animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }} />
                        ))}
                    </div>

                    <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Water Science</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Light &<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b]">Water</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-xl">How Photons Shape H₂O</p>
                            <p className="text-lg text-white/60 mb-8 max-w-xl">Light is not just for seeing – it's for structuring. Infrared light builds EZ water, UV can disrupt bonds, and the full spectrum of sunlight may be essential for optimal hydration.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>Explore the Connection</button>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
                            <SmartVideoEmbed keywords={["light", "water", "infrared", "sunlight", "photon"]} className="w-full rounded-2xl shadow-2xl" aspectRatio="video" />
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1 */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Infrared: The EZ Builder</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border-2 text-center" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <p className="text-white/80 text-lg leading-relaxed mb-6">Dr. Gerald Pollack's experiments show that infrared light (3000nm wavelength) dramatically expands the Exclusion Zone in water. This suggests that <strong className="text-white">water can harvest light energy</strong> to build structure and separate charge.</p>
                                <p className="text-lg" style={{ color: accentColor }}>Sunlight is approximately 50% infrared – we are bathed in EZ-building radiation.</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2 */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">The Spectrum of Influence</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-red-500/30 bg-red-950/10 text-center">
                                <h3 className="text-lg text-red-400 font-medium mb-3">🔴 Infrared</h3>
                                <p className="text-white/60 text-sm">Builds EZ water, penetrates tissue, warms without burning. The "structure builder".</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-amber-500/30 bg-amber-950/10 text-center">
                                <h3 className="text-lg text-amber-400 font-medium mb-3">🟡 Visible</h3>
                                <p className="text-white/60 text-sm">Less studied in water. May influence coherent domains and biophoton emission.</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-violet-500/30 bg-violet-950/10 text-center">
                                <h3 className="text-lg text-violet-400 font-medium mb-3">🟣 UV</h3>
                                <p className="text-white/60 text-sm">High energy, can break bonds. Disinfects but may disrupt delicate structure.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3 */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Practical Implications</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "☀️", title: "Sunlight Exposure", desc: "Water in sunlight may develop more structure than water stored in darkness." },
                                { icon: "🌅", title: "Morning Light", desc: "Red/infrared rich morning light may be particularly beneficial for structuring water." },
                                { icon: "🏠", title: "Indoor Lighting", desc: "LED and fluorescent lights lack infrared. Consider incandescent or natural light." },
                                { icon: "🧊", title: "Glass Storage", desc: "Blue or violet glass may protect water from structure-disrupting frequencies." }
                            ].map((item) => (
                                <motion.div key={item.title} variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                                    <div className="text-2xl mb-3">{item.icon}</div>
                                    <h3 className="text-white font-medium mb-2">{item.title}</h3>
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
                                <Link href="/science/ez-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                                    <span className="text-white group-hover:text-amber-400">EZ Water →</span>
                                    <p className="text-white/50 text-sm mt-2">The fourth phase of water</p>
                                </a></Link>
                                <Link href="/light-lattices-photonic-flow"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                                    <span className="text-white group-hover:text-amber-400">Light Lattices →</span>
                                    <p className="text-white/50 text-sm mt-2">Photonic flow patterns</p>
                                </a></Link>
                                <Link href="/science/structured-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                                    <span className="text-white group-hover:text-amber-400">Structured Water →</span>
                                    <p className="text-white/50 text-sm mt-2">How water organizes</p>
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
