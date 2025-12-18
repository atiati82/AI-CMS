import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Droplets, Zap, Layers, Sparkles, FlaskConical, Eye, Beaker, ArrowRight, ArrowDown } from "lucide-react";

/**
 * Zone 1: How Andara Ionic Works
 * 
 * Product-focused explanation of water clarification & conditioning.
 * No health claims — water chemistry only.
 */
export default function HowAndaraWorks() {
    return (
        <Layout>
            <div className="andara-page" data-tree="water" style={{ backgroundColor: "#020617" }}>
                {/* ============================================ */}
                {/* HERO SECTION */}
                {/* ============================================ */}
                <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
                    {/* Background */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a1628] to-[#020617]" />
                        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#1aa7ff]/8 blur-[150px]" />
                        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-[#38ffd1]/5 blur-[120px]" />
                    </div>

                    <div className="container relative z-10 px-4 text-center max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1aa7ff]/10 border border-[#1aa7ff]/20 text-[#1aa7ff] mb-8">
                                <FlaskConical className="w-4 h-4" />
                                <span className="text-sm font-semibold tracking-wide">Water Clarification & Conditioning</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white leading-[1.1] mb-8">
                                How Andara Ionic
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1aa7ff] to-[#38ffd1]">
                                    Works
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto mb-8">
                                A highly concentrated ionic sulfate mineral solution designed to clarify, clean and organise water using micro-dosed charged minerals.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/50">
                                <span className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1aa7ff]" />
                                    Volcanic mineral source
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#38ffd1]" />
                                    ~1 ml per liter
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#f6d56a]" />
                                    Sulfate-based chemistry
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="mt-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <ArrowDown className="w-6 h-6 text-white/30 mx-auto animate-bounce" />
                        </motion.div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* THE 4 STAGES */}
                {/* ============================================ */}
                <section className="py-24 relative">
                    <div className="container px-4">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-20"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                Four Stages in Your Glass of Water
                            </h2>
                            <p className="text-lg text-white/60">
                                When you add Andara Ionic to water, a sequence of chemical and physical transformations begins.
                            </p>
                        </motion.header>

                        {/* Stage Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {/* Stage 1 */}
                            <motion.div
                                className="relative p-8 rounded-2xl border border-[#1aa7ff]/20 bg-gradient-to-b from-[#1aa7ff]/5 to-transparent"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[#1aa7ff]/15 flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-6 h-6 text-[#1aa7ff]" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-[#1aa7ff] tracking-widest uppercase">Stage 1</span>
                                        <h3 className="text-xl font-display font-semibold text-white">Charge Contact</h3>
                                    </div>
                                </div>
                                <p className="text-white/60 leading-relaxed mb-4">
                                    Highly charged ionic minerals (Fe³⁺, Al³⁺, Mg²⁺, SO₄²⁻) spread instantly through the water, meeting fine particles, colloids, dissolved metals and organic residues.
                                </p>
                                <p className="text-sm text-[#1aa7ff]/80 font-medium">
                                    → The electrical balance of the water changes in seconds.
                                </p>
                            </motion.div>

                            {/* Stage 2 */}
                            <motion.div
                                className="relative p-8 rounded-2xl border border-[#38ffd1]/20 bg-gradient-to-b from-[#38ffd1]/5 to-transparent"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[#38ffd1]/15 flex items-center justify-center flex-shrink-0">
                                        <Layers className="w-6 h-6 text-[#38ffd1]" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-[#38ffd1] tracking-widest uppercase">Stage 2</span>
                                        <h3 className="text-xl font-display font-semibold text-white">Coagulation</h3>
                                    </div>
                                </div>
                                <p className="text-white/60 leading-relaxed mb-4">
                                    The charged ions neutralise the surface charge of tiny suspended particles. Once charges soften, particles stop repelling and begin coming together.
                                </p>
                                <p className="text-sm text-[#38ffd1]/80 font-medium">
                                    → Invisible at first, but the chemical "glue" is switched on.
                                </p>
                            </motion.div>

                            {/* Stage 3 */}
                            <motion.div
                                className="relative p-8 rounded-2xl border border-[#63b4ff]/20 bg-gradient-to-b from-[#63b4ff]/5 to-transparent"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[#63b4ff]/15 flex items-center justify-center flex-shrink-0">
                                        <Droplets className="w-6 h-6 text-[#63b4ff]" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-[#63b4ff] tracking-widest uppercase">Stage 3</span>
                                        <h3 className="text-xl font-display font-semibold text-white">Flocculation & Settling</h3>
                                    </div>
                                </div>
                                <p className="text-white/60 leading-relaxed mb-4">
                                    Small particles gather into visible clusters ("flocs"), trapping dirt, turbidity and bound metals. Flocs sink to the bottom — water becomes visibly clearer.
                                </p>
                                <p className="text-sm text-[#63b4ff]/80 font-medium">
                                    → Invisible impurities become visible, removable sediment.
                                </p>
                            </motion.div>

                            {/* Stage 4 */}
                            <motion.div
                                className="relative p-8 rounded-2xl border border-[#f6d56a]/20 bg-gradient-to-b from-[#f6d56a]/5 to-transparent"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[#f6d56a]/15 flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-6 h-6 text-[#f6d56a]" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-[#f6d56a] tracking-widest uppercase">Stage 4</span>
                                        <h3 className="text-xl font-display font-semibold text-white">Conditioning</h3>
                                    </div>
                                </div>
                                <p className="text-white/60 leading-relaxed mb-4">
                                    The remaining water carries a stable sulfate-mineral background (~17–30 mg/L). Ions help form more stable hydration structures — less chaotic, more organised.
                                </p>
                                <p className="text-sm text-[#f6d56a]/80 font-medium">
                                    → Clarified, ionically balanced, closer to natural mineral water.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* OBSERVABLE EFFECTS */}
                {/* ============================================ */}
                <section className="py-24 bg-[#05060b]/50 border-y border-white/5">
                    <div className="container px-4">
                        <motion.header
                            className="text-center max-w-3xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                                What You Can Observe
                            </h2>
                            <p className="text-lg text-white/60">
                                The process reveals itself through visible, sensory and measurable changes.
                            </p>
                        </motion.header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {/* Visual */}
                            <motion.div
                                className="p-6 rounded-2xl border border-white/10 bg-[#0b1020]/50"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                                    <Eye className="w-6 h-6 text-white/60" />
                                </div>
                                <h3 className="text-lg font-display font-semibold text-white mb-4">Visual Changes</h3>
                                <ul className="space-y-3 text-sm text-white/60">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[#1aa7ff] mt-2 flex-shrink-0" />
                                        Initial cloudiness, then floc formation
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[#1aa7ff] mt-2 flex-shrink-0" />
                                        Small clouds or flakes moving downward
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[#1aa7ff] mt-2 flex-shrink-0" />
                                        Fine sediment layer at bottom after settling
                                    </li>
                                </ul>
                            </motion.div>

                            {/* Sensory */}
                            <motion.div
                                className="p-6 rounded-2xl border border-white/10 bg-[#0b1020]/50"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                                    <Droplets className="w-6 h-6 text-white/60" />
                                </div>
                                <h3 className="text-lg font-display font-semibold text-white mb-4">Taste & Smell</h3>
                                <ul className="space-y-3 text-sm text-white/60">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[#38ffd1] mt-2 flex-shrink-0" />
                                        Smell often becomes cleaner, more neutral
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[#38ffd1] mt-2 flex-shrink-0" />
                                        Taste shifts from flat to softer, more rounded
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[#38ffd1] mt-2 flex-shrink-0" />
                                        Mild mineral note depending on source water
                                    </li>
                                </ul>
                            </motion.div>

                            {/* Measurable */}
                            <motion.div
                                className="p-6 rounded-2xl border border-white/10 bg-[#0b1020]/50"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                                    <Beaker className="w-6 h-6 text-white/60" />
                                </div>
                                <h3 className="text-lg font-display font-semibold text-white mb-4">Measurable Parameters</h3>
                                <ul className="space-y-3 text-sm text-white/60">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[#f6d56a] mt-2 flex-shrink-0" />
                                        <span><strong className="text-white/80">Turbidity</strong> — drops (clearer water)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[#f6d56a] mt-2 flex-shrink-0" />
                                        <span><strong className="text-white/80">EC</strong> — often increases (ionic profile)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[#f6d56a] mt-2 flex-shrink-0" />
                                        <span><strong className="text-white/80">ORP</strong> — shifts toward order</span>
                                    </li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* WHY SULFATE */}
                {/* ============================================ */}
                <section className="py-24">
                    <div className="container px-4 max-w-4xl mx-auto">
                        <motion.div
                            className="p-10 rounded-3xl border border-[#f6d56a]/20 bg-gradient-to-b from-[#f6d56a]/5 to-transparent"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-xl bg-[#f6d56a]/15 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-[#f6d56a]">SO₄²⁻</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-display font-semibold text-white">
                                    Why Sulfate Is Central
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="p-4 rounded-xl bg-white/5">
                                    <h4 className="text-sm font-bold text-[#f6d56a] mb-2">Bridge Ion</h4>
                                    <p className="text-sm text-white/60">
                                        Linked to flocculation, natural springs, and geological water cycles.
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5">
                                    <h4 className="text-sm font-bold text-[#f6d56a] mb-2">Works With Cations</h4>
                                    <p className="text-sm text-white/60">
                                        Fe³⁺, Al³⁺ + SO₄²⁻ effectively bind solids and neutralise colloids.
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5">
                                    <h4 className="text-sm font-bold text-[#f6d56a] mb-2">Reference Band</h4>
                                    <p className="text-sm text-white/60">
                                        17–30 mg/L sulfate shows efficient clarification and stable behaviour.
                                    </p>
                                </div>
                            </div>

                            <p className="text-white/70 leading-relaxed text-center">
                                Andara Ionic uses minimal dosing to bring water into an effective sulfate zone, where it self-organises more easily.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* CTA */}
                {/* ============================================ */}
                <section className="py-24 bg-gradient-to-b from-[#020617] to-[#05060b]">
                    <div className="container px-4 text-center max-w-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-display text-white mb-6">
                                Ready to Experience It?
                            </h2>
                            <p className="text-lg text-white/60 mb-8">
                                Try Andara Ionic on your water and observe the transformation yourself.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/shop">
                                    <button className="px-8 py-4 bg-gradient-to-r from-[#1aa7ff] to-[#38ffd1] text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-[0_0_30px_rgba(26,167,255,0.3)]">
                                        Shop Andara Ionic
                                    </button>
                                </Link>
                                <Link href="/science-library">
                                    <button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:border-white/40 transition-all flex items-center gap-2">
                                        Explore the Science <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
