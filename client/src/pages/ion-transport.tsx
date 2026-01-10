import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants, type Easing } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function IonTransportPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

  // Cyan/Electric accent for Bioelectric Science
  const accentColor = "#06b6d4";
  const accentGradient = "from-[#06b6d4] via-[#22d3ee] to-[#06b6d4]";

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as Easing } }
  };

  const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <Layout>
      <Helmet>
        <title>Ion Transport – Channels, Pumps & Fields | Andara</title>
        <meta name="description" content="Learn how ions move through water, membranes and tissues via channels, pumps and electric fields – and why mineral balance and structured water shape the flow of bioelectric life." />
        <meta name="keywords" content="ion transport, ion channels, ion pumps, bioelectric gradients, membrane transport, mineral ion movement" />
      </Helmet>

      <div
        ref={containerRef}
        className="andara-page"
        data-tree="bioelectric"
        style={{ backgroundColor: "#020617" }}
      >
        {/* Scroll Progress */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
          style={{ scaleX: scrollYProgress, backgroundColor: accentColor }}
        />

        {/* --- HERO SECTION --- */}
        <motion.section
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#051515] to-[#020617]" />
            <div className="absolute top-1/3 left-1/4 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}15` }} />
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 blur-[120px] rounded-full" style={{ backgroundColor: "#f59e0b12" }} />
            {/* Ion particles flowing */}
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 6 + 3,
                  height: Math.random() * 6 + 3,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: i % 2 === 0 ? `${accentColor}60` : "#f59e0b60",
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>

          <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" as Easing }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6"
                style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                <span>Science Library · Bioelectricity</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                Ion <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${accentGradient} bg-[length:200%_auto] animate-gradient`}>
                  Transport
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-4 max-w-xl">
                <strong className="text-white">How Minerals Learn to Move</strong>
              </p>
              <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
                Wherever there is life, there is movement of ions. Tiny charged particles drift, jump,
                slip through microscopic gates, ride on voltage gradients, and respond to fields we never see
                but constantly feel as <strong className="text-white/80">energy, clarity or fatigue</strong> in the terrain.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {["Channels", "Pumps", "Gradients", "Fields"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full text-sm font-medium border"
                    style={{ backgroundColor: `${accentColor}10`, borderColor: `${accentColor}30`, color: accentColor }}>
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105"
                style={{ backgroundColor: accentColor, color: "#020617", boxShadow: `0 0 30px ${accentColor}50` }}
              >
                Explore the Flow
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <SmartVideoEmbed
                keywords={["ion", "transport", "channel", "membrane", "current"]}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                aspectRatio="video"
              />
              <p className="text-center text-white/30 text-xs mt-4 font-mono">
                Millions of tiny, charged travellers in a fluid city.
              </p>
            </motion.div>
          </div>
        </motion.section>


        {/* --- SECTION 1: WHAT IS ION TRANSPORT --- */}
        <section id="section-1" className="section relative z-10 py-24">
          <div className="container px-4">
            <motion.header
              className="max-w-3xl mx-auto text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                1. What Is Ion Transport?
              </h2>
              <p className="text-lg text-white/70">
                From still water to moving charge.
              </p>
            </motion.header>

            <motion.div
              className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-amber-500/30 bg-amber-950/10">
                <h3 className="text-xl text-amber-400 font-medium mb-4">⊕ Cations (Positive)</h3>
                <div className="flex flex-wrap gap-2">
                  {["Na⁺", "K⁺", "Ca²⁺", "Mg²⁺", "H⁺"].map((ion) => (
                    <span key={ion} className="px-3 py-1 rounded-full text-sm bg-amber-500/20 text-amber-300">{ion}</span>
                  ))}
                </div>
                <p className="text-white/60 text-sm mt-4">
                  Carry positive charge. Attracted to negative regions.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-cyan-500/30 bg-cyan-950/10">
                <h3 className="text-xl text-cyan-400 font-medium mb-4">⊖ Anions (Negative)</h3>
                <div className="flex flex-wrap gap-2">
                  {["Cl⁻", "SO₄²⁻", "HCO₃⁻", "PO₄³⁻"].map((ion) => (
                    <span key={ion} className="px-3 py-1 rounded-full text-sm bg-cyan-500/20 text-cyan-300">{ion}</span>
                  ))}
                </div>
                <p className="text-white/60 text-sm mt-4">
                  Carry negative charge. Attracted to positive regions.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto mt-12 p-8 rounded-2xl border border-white/10 bg-white/5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-white/80 text-lg text-center leading-relaxed">
                <strong className="text-white">Ion transport</strong> = ions moving from one place to another,
                through bulk water, narrow channels, membranes and tissues, driven by
                <span style={{ color: accentColor }}> concentration gradients</span>,
                <span className="text-amber-400"> electrical gradients</span>,
                and <span className="text-purple-400">pressure, flows and fields</span>.
              </p>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 2: GRADIENTS --- */}
        <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
          <div className="container px-4">
            <motion.header
              className="max-w-3xl mx-auto text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                2. Gradients – The Invisible Maps Ions Follow
              </h2>
            </motion.header>

            <motion.div
              className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
                <div className="text-4xl mb-4">🌊</div>
                <h3 className="text-lg text-white font-medium mb-3">Diffusion</h3>
                <p className="text-white/60 text-sm">
                  Ions naturally move from high to low concentration. Like smell spreading through a room. No energy needed.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg text-white font-medium mb-3">Concentration Gradient</h3>
                <p className="text-white/60 text-sm">
                  Difference in ion concentration between two areas. Steeper gradient = stronger pull.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg text-white font-medium mb-3">Electrical Gradient</h3>
                <p className="text-white/60 text-sm">
                  Difference in charge between two areas. Opposites attract, like charges repel.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="max-w-3xl mx-auto mt-12 p-8 rounded-2xl border-2 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}
            >
              <p className="text-white text-lg font-medium">
                Electrochemical Gradient
              </p>
              <p className="text-white/70 mt-2">
                The combined push/pull of concentration + electrical potential differences.
              </p>
              <p className="text-sm mt-4" style={{ color: accentColor }}>
                Ions don't think – they simply respond to gradients.
              </p>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 3: CHANNELS --- */}
        <section className="section relative z-10 py-24">
          <div className="container px-4">
            <motion.header
              className="max-w-3xl mx-auto text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                3. Ion Channels – Selective Doorways
              </h2>
              <p className="text-lg text-white/70">
                Protein-based tunnels that cross the membrane.
              </p>
            </motion.header>

            <motion.div
              className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-purple-500/30 bg-purple-950/10">
                <h3 className="text-lg text-purple-400 font-medium mb-3">⚡ Voltage-Gated</h3>
                <p className="text-white/60 text-sm">
                  Open/close depending on local voltage. Respond to electrical changes.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-green-500/30 bg-green-950/10">
                <h3 className="text-lg text-green-400 font-medium mb-3">🔑 Ligand-Gated</h3>
                <p className="text-white/60 text-sm">
                  Open when a specific molecule binds. Chemical keys unlock the gate.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-amber-500/30 bg-amber-950/10">
                <h3 className="text-lg text-amber-400 font-medium mb-3">🔧 Mechanically-Gated</h3>
                <p className="text-white/60 text-sm">
                  Respond to stretch, pressure, flow. Physical forces open the door.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="max-w-3xl mx-auto mt-12 p-6 rounded-xl border border-white/10 bg-white/5 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-white/80 italic">
                "Think of ion channels like security doors in a dam – they decide when water flows,
                and in which direction, based on the pressure difference & the control signals."
              </p>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 4: PUMPS --- */}
        <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
          <div className="container px-4">
            <motion.header
              className="max-w-3xl mx-auto text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                4. Ion Pumps – The Workers That Build Gradients
              </h2>
            </motion.header>

            <motion.div
              className="max-w-4xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-xl text-white font-medium mb-4">Active Transport</h3>
                    <p className="text-white/70 leading-relaxed">
                      Pumps use energy (often from ATP) to push ions <strong className="text-white">against</strong> their natural gradient.
                      They build and maintain electrochemical gradients.
                    </p>
                    <p className="text-white/60 mt-4 text-sm">
                      Famous example: Sodium-Potassium pump moves Na⁺ out, K⁺ in – keeping inside vs outside conditions different.
                    </p>
                  </div>
                  <div className="p-6 rounded-xl bg-white/5 text-center">
                    <p className="text-4xl mb-4">⛏️</p>
                    <p className="text-white text-lg font-medium">Pumps = Terrain Engineers</p>
                    <p className="text-white/60 text-sm mt-2">
                      They stack charges, build potential differences, keep the system in a prepared state.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-xl border border-white/10 bg-white/5 text-center">
                <p className="text-white/80 italic">
                  "If channels are doors that let things flow, pumps are workers that carry buckets uphill to keep the reservoir full."
                </p>
              </div>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 5: FIELDS --- */}
        <section className="section relative z-10 py-24">
          <div className="container px-4">
            <motion.header
              className="max-w-3xl mx-auto text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                5. Fields – The Invisible Geometry
              </h2>
            </motion.header>

            <motion.div
              className="max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="p-8 rounded-2xl border-2 text-center"
                style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  Wherever charges separate, <strong className="text-white">fields appear</strong>.
                  Electric fields gently influence how ions move, guide flows along preferred paths,
                  create zones where certain ions cluster.
                </p>
                <p className="text-lg" style={{ color: accentColor }}>
                  Fields are like invisible riverbeds in the fluid – they don't force ions,
                  but they make some paths easier than others.
                </p>
              </div>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 6: WATER + MINERALS --- */}
        <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
          <div className="container px-4">
            <motion.header
              className="max-w-3xl mx-auto text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                6. Why the Medium Changes Everything
              </h2>
            </motion.header>

            <motion.div
              className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-cyan-500/30 bg-cyan-950/10">
                <h3 className="text-lg text-cyan-400 font-medium mb-3">💧 Water Quality</h3>
                <p className="text-white/60 text-sm">
                  Clarity, pH, contaminant load, structure. Affects how easily ions can move.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-amber-500/30 bg-amber-950/10">
                <h3 className="text-lg text-amber-400 font-medium mb-3">💎 Mineral Profile</h3>
                <p className="text-white/60 text-sm">
                  Which ions are present, in which ratios. Determines what gradients are possible.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="p-6 rounded-2xl border-2"
                style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                <h3 className="text-lg font-medium mb-3" style={{ color: accentColor }}>🔷 Structured Interfaces</h3>
                <p className="text-white/60 text-sm">
                  EZ-like layers stabilize gradients along surfaces. Support coherent, laminar flows.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 7: NEXT STEPS --- */}
        <section className="section relative z-10 py-24">
          <div className="container px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-4xl font-display text-white mb-8">
                Continue Exploring
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/bioelectric-water">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                    <span className="text-white group-hover:text-cyan-400 transition-colors">Bioelectric Water →</span>
                    <p className="text-white/50 text-sm mt-2">The bigger bioelectric picture</p>
                  </a>
                </Link>
                <Link href="/voltage-detox-pathways">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                    <span className="text-white group-hover:text-cyan-400 transition-colors">Voltage & Detox →</span>
                    <p className="text-white/50 text-sm mt-2">How gradients map to waste flows</p>
                  </a>
                </Link>
                <Link href="/charge-coherence">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                    <span className="text-white group-hover:text-cyan-400 transition-colors">Charge Coherence →</span>
                    <p className="text-white/50 text-sm mt-2">When charges harmonize</p>
                  </a>
                </Link>
                <Link href="/science-library">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all group">
                    <span className="text-white group-hover:text-cyan-400 transition-colors">Science Library →</span>
                    <p className="text-white/50 text-sm mt-2">Return to library gate</p>
                  </a>
                </Link>
              </div>

              <p className="text-white/50 text-sm mt-12 max-w-xl mx-auto">
                This page describes ion transport as an educational terrain model.
                It is not a medical protocol or treatment claim.
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
