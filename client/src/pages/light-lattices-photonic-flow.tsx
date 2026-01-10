import React, { useRef } from "react";
import { motion, useScroll, type Variants, type Easing, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function LightLatticesPhotonicFlowPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

    const accentColor = "#eab308";
    const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

    return (
        <Layout>
            <Helmet>
                <title>Light Lattices & Photonic Flow – Water & Light Interactions | Andara</title>
                <meta name="description" content="Explore how light interacts with structured water to form photonic patterns. Understand light absorption, coherent domains, and the role of biophotons in living systems." />
                <meta name="keywords" content="light lattices, biophotons, water photonics, coherent light, structured water light, photonic water" />
            </Helmet>

            <div ref={containerRef} className="andara-page" data-tree="light" style={{ backgroundColor: "#020617" }}>
                <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 origin-left" style={{ scaleX: scrollYProgress, backgroundColor: accentColor }} />

                {/* HERO with Video */}
                <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ opacity: heroOpacity, scale: heroScale }}>
                    <div className="absolute inset-0 z-0">
                        <SmartVideoEmbed keywords={["light", "photon", "fiber", "optics", "cellular"]} className="absolute inset-0 w-full h-full object-cover opacity-20" aspectRatio="video" autoPlay muted loop />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#0c0a05]/90 to-[#020617]" />
                    </div>

                    <div className="container relative z-10 text-center px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                                <span>Science Library · Advanced Technology</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                                Light Lattices<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eab308] via-[#fcd34d] to-[#eab308]">& Photonic Flow</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">Where Light Meets Water</p>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">Water interacts with light in profound ways. From infrared absorption that builds EZ layers to biophoton emission in living systems, light and water are deeply connected.</p>
                            <button onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor, color: "#020617" }}>Explore Light & Water</button>
                        </motion.div>
                    </div>
                </motion.section>

                {/* SECTION 1: Light Absorption */}
                <section id="section-1" className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">How Water Absorbs Light</h2>
                        </motion.header>
                        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="p-8 rounded-2xl border-2" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                                <p className="text-white/80 text-lg leading-relaxed text-center mb-6">Water strongly absorbs <strong className="text-white">infrared (IR)</strong> light, especially around 3100nm. This energy drives the formation of EZ layers. Water also absorbs UV while allowing visible light to pass through.</p>
                                <div className="flex justify-center gap-4">
                                    {[
                                        { wave: "UV", status: "Absorbed", color: "violet-500" },
                                        { wave: "Visible", status: "Transmitted", color: "cyan-500" },
                                        { wave: "IR", status: "Strongly Absorbed", color: "orange-500" }
                                    ].map((item) => (
                                        <div key={item.wave} className={`p-4 rounded-lg bg-${item.color}/10 border border-${item.color}/30 text-center`}>
                                            <p className={`text-${item.color} font-medium`}>{item.wave}</p>
                                            <p className="text-white/40 text-xs mt-1">{item.status}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Coherent Domains */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Coherent Domains</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <h3 className="text-xl text-white font-medium mb-4">Del Giudice Theory</h3>
                                <p className="text-white/60 text-sm mb-4">Italian physicist Emilio Del Giudice proposed that water contains "coherent domains" – regions where water molecules oscillate in phase with electromagnetic fields, storing energy and information.</p>
                                <p className="text-amber-400/80 text-sm">Size: ~100nm diameter</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                                <h3 className="text-xl text-white font-medium mb-4">Biophoton Emission</h3>
                                <p className="text-white/60 text-sm mb-4">Living cells emit ultra-weak light called biophotons. Water's coherent domains may play a role in storing, transmitting, and organizing these photonic signals.</p>
                                <p className="text-amber-400/80 text-sm">Discovery: Fritz-Albert Popp</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: Implications */}
                <section className="section relative z-10 py-24">
                    <div className="container px-4">
                        <motion.header className="max-w-3xl mx-auto text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Why It Matters</h2>
                        </motion.header>
                        <motion.div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            {[
                                { icon: "☀️", title: "Sunlight & Water", desc: "Natural sunlight exposure may enhance water's coherent properties" },
                                { icon: "🌿", title: "Plant Communication", desc: "Biophotons may mediate plant-to-plant signaling via water" },
                                { icon: "🧬", title: "Cellular Order", desc: "Coherent domains may help organize intracellular processes" }
                            ].map((item) => (
                                <motion.div key={item.title} variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="text-xl text-white font-medium mb-3">{item.title}</h3>
                                    <p className="text-white/60 text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                        <motion.div className="max-w-3xl mx-auto mt-12 p-6 rounded-xl border border-amber-500/30 bg-amber-950/10 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <p className="text-amber-400/80 text-sm">Note: Coherent domain theory is emerging science. We share these concepts for exploration, not as established fact.</p>
                        </motion.div>
                    </div>
                </section>

                {/* NEXT STEPS */}
                <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
                    <div className="container px-4">
                        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-8">Continue Exploring</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link href="/light-and-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-yellow-500/50 transition-all group">
                                    <span className="text-white group-hover:text-yellow-400">Light & Water →</span>
                                    <p className="text-white/50 text-sm mt-2">IR, UV, and visible light effects</p>
                                </a></Link>
                                <Link href="/three-six-nine-harmonics"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-yellow-500/50 transition-all group">
                                    <span className="text-white group-hover:text-yellow-400">3-6-9 Harmonics →</span>
                                    <p className="text-white/50 text-sm mt-2">Resonance and sacred geometry</p>
                                </a></Link>
                                <Link href="/science/ez-water"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-yellow-500/50 transition-all group">
                                    <span className="text-white group-hover:text-yellow-400">EZ Water →</span>
                                    <p className="text-white/50 text-sm mt-2">Light-built exclusion zones</p>
                                </a></Link>
                                <Link href="/science-library"><a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-yellow-500/50 transition-all group">
                                    <span className="text-white group-hover:text-yellow-400">Science Library →</span>
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
