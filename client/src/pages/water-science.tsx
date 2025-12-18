import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";

// Diagram Imports
import { WaterMolecularDiagram } from "@/components/diagrams/WaterMolecularDiagram";
import { WaterJobsVisualization } from "@/components/diagrams/WaterJobsVisualization";
import { WaterGeometryCanvas } from "@/components/diagrams/WaterGeometryCanvas";
import { InterfacialWaterDiagram } from "@/components/diagrams/InterfacialWaterDiagram";
import { MineralWaterInteraction } from "@/components/diagrams/MineralWaterInteraction";
import { WaterScienceAIDemo } from "@/components/demos/WaterScienceAIDemo";

export default function WaterSciencePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <Layout>
      <div
        ref={containerRef}
        className="andara-page"
        data-tree="water"
        style={{ backgroundColor: "#020617" }}
      >
        {/* --- SCROLL PROGRESS BAR --- */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        {/* --- HERO SECTION --- */}
        <motion.section
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          {/* Ambient Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#070a12] to-[#020617]" />
            <div className="absolute top-0 inset-x-0 h-[500px] bg-accent/5 blur-[100px] rounded-full" />
            {/* Floating Particles Background */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-accent/20"
                style={{
                  width: Math.random() * 4 + 1,
                  height: Math.random() * 4 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase">Science Library · Pillar I</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                Water Science: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#38ffd1] to-accent bg-[length:200%_auto] animate-gradient">
                  The Hidden Architecture
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-8 max-w-xl">
                Most people meet water as a flat idea: H₂O. <br />
                In reality, water is an active architect — a dynamic,
                shape-shifting medium that builds, coordinates, and sustains life.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-accent text-[#020617] font-bold rounded-lg hover:bg-accent/90 transition-all shadow-[0_0_20px_rgba(26,167,255,0.3)]"
                >
                  Explore the Architecture
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <WaterMolecularDiagram />
              <p className="text-center text-white/30 text-xs mt-4 font-mono">
                Interactive Visualization: 3 States of Water Reality
              </p>
            </motion.div>
          </div>
        </motion.section>


        {/* --- SECTION 1: NOT JUST H2O --- */}
        <section id="section-1" className="section relative z-10">
          <div className="container">
            <motion.header
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                1. Water is not "just H₂O"<br /> It is a living network
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                If water is everywhere in life... how exactly is it organizing everything?
                Every cell, every organ is immersed in water that is not randomly liquid,
                but arranged in layers, phases, and fields.
              </p>
            </motion.header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { title: "Molecular Water", desc: "Single H₂O molecules moving and rotating rapidly.", icon: "header-molecular" },
                { title: "Structured Water", desc: "H₂O organised into clusters, layers, and interfaces.", icon: "header-structured" },
                { title: "Field-Active Water", desc: "Interacting with fields, behaving like a liquid crystal.", icon: "header-field" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="panel facet pad p-8 bg-[#0b1020]/50 border border-white/5 rounded-2xl backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <h3 className="text-xl font-display text-accent mb-3">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* --- SECTION 2: FOUR INVISIBLE JOBS --- */}
        <section className="section bg-[#05060b]/50 border-y border-white/5 relative z-10 py-24">
          <div className="container">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                2. The Four Invisible Jobs
              </h2>
              <p className="text-white/60 max-w-2xl text-lg">
                To understand water's deeper role, we look at four core functions that appear in every living system.
              </p>
            </motion.div>

            <WaterJobsVisualization />

            <p className="text-center text-white/30 text-xs mt-6 font-mono">
              Hover over roles to explore function details
            </p>
          </div>
        </section>


        {/* --- SECTION 3: HIDDEN GEOMETRY --- */}
        <section className="section relative z-10 py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-display text-white mb-8">
                  3. The Hidden Geometry
                </h2>
                <div className="prose prose-invert prose-lg text-white/70">
                  <p className="mb-6">
                    When we say "architecture," we mean geometry. Water is constantly forming and dissolving shapes:
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <span className="text-[#f2c76c] mt-1">⬡</span>
                      <span><strong>Tetrahedral Networks:</strong> 4 hydrogen bonds creating clusters.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#38ffd1] mt-1">⬢</span>
                      <span><strong>Hexagonal Patterns:</strong> Lattices appearing in ice and EZ water.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#9b7bff] mt-1">◎</span>
                      <span><strong>Vortices & Waves:</strong> Spirals that mix and structure.</span>
                    </li>
                  </ul>
                  <p>
                    Life uses this geometry to arrange nutrients and orchestrate long-range order without rigid skeletons.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <WaterGeometryCanvas />
              </motion.div>
            </div>
          </div>
        </section>


        {/* --- SECTION 4: INTERFACES & EZ --- */}
        <section className="section bg-gradient-to-b from-[#020617] to-[#070a12] py-24 border-t border-white/5">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                4. Interfaces: Where Water Becomes Different
              </h2>
              <p className="text-lg text-white/70">
                The most important water is not in the middle of the glass — it's the water right next to surfaces.
                This is the "Operating Table" of biology.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <InterfacialWaterDiagram />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="panel pad bg-white/5 rounded-xl border border-white/10 p-6">
                <h4 className="text-xl font-display text-[#38ffd1] mb-2">In Biology</h4>
                <p className="text-white/60">
                  Around proteins and membranes, interfacial water helps define shape, guide binding, and
                  filter what can approach.
                </p>
              </div>
              <div className="panel pad bg-white/5 rounded-xl border border-white/10 p-6">
                <h4 className="text-xl font-display text-[#38ffd1] mb-2">In Soil</h4>
                <p className="text-white/60">
                  Around clay and roots, it controls nutrient availability and microbial colonization.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* --- SECTION 5: PHASES --- */}
        <section className="section py-20 relative z-10">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                  5. Phases Beyond Solid-Liquid-Gas
                </h2>
                <p className="text-lg text-white/70 mb-6">
                  School books say three phases. Nature uses many "micro-phases":
                  <strong> Bulk Liquid</strong> (fast/fluid), <strong>Gel-Like</strong> (elastic tissues),
                  and <strong>Structured Interfacial</strong> (ordered).
                </p>
                <div className="p-6 border-l-4 border-accent bg-accent/5 rounded-r-xl">
                  <p className="italic text-white/80">
                    "Life doesn't use one kind of water. It tunes specific water states for specific tasks."
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 grid grid-cols-1 gap-4">
                {/* Simple text cards for phases */}
                {['Bulk Liquid: Fast & Fluid', 'Gel-Like: Elastic & Structured', 'Interfacial: Highly Ordered'].map((phase, i) => (
                  <motion.div
                    key={i}
                    className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between"
                    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.1)" }}
                  >
                    <span className="text-white/90 font-medium">{phase.split(':')[0]}</span>
                    <span className="text-white/50 text-sm">{phase.split(':')[1]}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* --- SECTION 6: TERRAIN MODEL --- */}
        <section className="section py-20 bg-[#0f172a] border-y border-white/5">
          <div className="container text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display text-white mb-8">
              6. Water as the Terrain for Life
            </h2>
            <p className="text-xl text-white/80 font-light mb-12">
              If the body is an "inner landscape", water is the river system, electric grid, and atmosphere.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-6 rounded-xl bg-[#020617] border border-accent/20">
                <h4 className="text-accent font-bold mb-2">Clear</h4>
                <p className="text-white/60 text-sm">Enough for signals to travel without noise.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#020617] border border-[#38ffd1]/20">
                <h4 className="text-[#38ffd1] font-bold mb-2">Mineralised</h4>
                <p className="text-white/60 text-sm">Enough to conduct and structure.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#020617] border border-[#2cff9a]/20">
                <h4 className="text-[#2cff9a] font-bold mb-2">Coherent</h4>
                <p className="text-white/60 text-sm">Enough to support long-range order.</p>
              </div>
            </div>

            <p className="mt-12 text-lg text-white/70">
              Restoring terrain = Restoring the water architecture.
            </p>
          </div>
        </section>


        {/* --- SECTION 7: MINERALS AS BUILDERS --- */}
        <section className="section py-24 relative z-10">
          <div className="container">
            <h2 className="text-3xl md:text-5xl font-display text-white mb-6 text-center">
              7. Minerals: The Builders Inside Water
            </h2>
            <p className="text-center text-white/60 max-w-2xl mx-auto mb-12">
              Water alone is powerful — but water with minerals is architectural.
              Minerals are the building instructions; water is the builder.
            </p>

            <MineralWaterInteraction />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
              <div className="text-center p-4">
                <div className="w-3 h-3 rounded-full bg-[#1aa7ff] mx-auto mb-3" />
                <h5 className="text-white font-bold">Ocean Water</h5>
                <p className="text-xs text-white/50">Chloride-dominant, high charge.</p>
              </div>
              <div className="text-center p-4">
                <div className="w-3 h-3 rounded-full bg-[#38ffd1] mx-auto mb-3" />
                <h5 className="text-white font-bold">Spring Water</h5>
                <p className="text-xs text-white/50">Balanced, specific structure.</p>
              </div>
              <div className="text-center p-4">
                <div className="w-3 h-3 rounded-full bg-[#f2c76c] mx-auto mb-3" />
                <h5 className="text-white font-bold">Sulfate-Rich</h5>
                <p className="text-xs text-white/50">Binding, clarifying, structural.</p>
              </div>
              <div className="text-center p-4">
                <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-4" />
                <h5 className="text-white font-bold">Ultra-Pure</h5>
                <p className="text-xs text-white/50">Empty, aggressive solvent.</p>
              </div>
            </div>
          </div>
        </section>


        {/* --- SECTION 8: MODERN WATER ARCHITECTURE --- */}
        <section className="section py-20 bg-[#0f172a]/50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#020617] rounded-3xl p-8 md:p-12 border border-white/5">
              <div>
                <h3 className="text-2xl font-display text-[#2cff9a] mb-6">Natural Context</h3>
                <ul className="space-y-4 text-white/70">
                  <li className="flex gap-3"><CheckIcon color="#2cff9a" /> Flows through rock layers</li>
                  <li className="flex gap-3"><CheckIcon color="#2cff9a" /> Spirals, vortices, cascades</li>
                  <li className="flex gap-3"><CheckIcon color="#2cff9a" /> Gains minerals & energetic fields</li>
                </ul>
              </div>
              <div className="opacity-70">
                <h3 className="text-2xl font-display text-white/50 mb-6">Modern Infrastructure</h3>
                <ul className="space-y-4 text-white/50">
                  <li className="flex gap-3"><CrossIcon /> Straight pipes & stagnant tanks</li>
                  <li className="flex gap-3"><CrossIcon /> Chemically disinfected</li>
                  <li className="flex gap-3"><CrossIcon /> Stripped of mineral structure</li>
                </ul>
              </div>
              <div className="col-span-1 md:col-span-2 text-center pt-6 border-t border-white/5">
                <p className="text-lg text-white font-medium">
                  The result: Water that is safe, but structurally impoverished.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* --- SECTION 9: ANDARA CONTEXT --- */}
        <section className="section py-24 relative z-10 text-center">
          <div className="container max-w-4xl">
            <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-8">
              <img src="/assets/andara-logo-small.png" alt="Andara" className="h-12 w-auto opacity-80 grayscale hover:grayscale-0 transition-all" />
              {/* Placeholder for small logo if exists, or remove img tag and use text */}
            </div>

            <h2 className="text-3xl md:text-5xl font-display text-white mb-8">
              The Intention Behind Water Science
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12">
              <div className="panel pad p-8">
                <h3 className="text-xl font-bold text-white mb-4">Education First</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Understanding water as a multidimensional medium (chemistry + structure + field).
                  This is the real terrain behind any idea of vitality.
                </p>
              </div>
              <div className="panel pad p-8">
                <h3 className="text-xl font-bold text-white mb-4">Framework for All Pillars</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  This page connects Mineral Science, Bioelectricity, and Crystalline Matrix.
                  When you understand water, all other pillars feel like natural branches.
                </p>
              </div>
            </div>

            <div className="bg-[#1aa7ff]/10 border border-[#1aa7ff]/30 p-8 rounded-2xl">
              <h4 className="text-[#1aa7ff] font-bold mb-2 uppercase tracking-widest text-sm">Andara's Promise</h4>
              <p className="text-xl text-white italic font-light">
                "This helps water itself become clearer, more organised, and more mineral-intelligent —
                the way natural waters often are before we disturb them."
              </p>
            </div>
          </div>
        </section>


        {/* --- AI AGENT DEMO SECTION --- */}
        <section id="ai-demo" className="section py-24 bg-gradient-to-b from-[#020617] to-[#0f172a] border-t border-white/10">
          <WaterScienceAIDemo />
        </section>


        {/* --- FOOTER NAVIGATION --- */}
        <section className="section py-16 bg-[#020617]">
          <div className="container">
            <h2 className="text-center text-white/40 font-display text-2xl mb-12">Continue the Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/science/mineral-science">
                <a className="block p-8 rounded-2xl bg-[#0b1020] border border-white/5 hover:border-[#1aa7ff]/50 transition-all group">
                  <span className="text-xs font-bold text-accent uppercase tracking-widest mb-2 block">Next Pillar</span>
                  <h3 className="text-xl text-white font-display mb-2 group-hover:text-accent transition-colors">Mineral Science</h3>
                  <p className="text-white/50 text-sm">Ionic codes & elemental pathways &rarr; </p>
                </a>
              </Link>
              <Link href="/science/bioelectricity">
                <a className="block p-8 rounded-2xl bg-[#0b1020] border border-white/5 hover:border-[#2cff9a]/50 transition-all group">
                  <span className="text-xs font-bold text-[#2cff9a] uppercase tracking-widest mb-2 block">Related Pillar</span>
                  <h3 className="text-xl text-white font-display mb-2 group-hover:text-[#2cff9a] transition-colors">Bioelectricity</h3>
                  <p className="text-white/50 text-sm">The invisible voltage system &rarr; </p>
                </a>
              </Link>
              <Link href="/science/crystalline-matrix">
                <a className="block p-8 rounded-2xl bg-[#0b1020] border border-white/5 hover:border-[#f2c76c]/50 transition-all group">
                  <span className="text-xs font-bold text-[#f2c76c] uppercase tracking-widest mb-2 block">Deep Dive</span>
                  <h3 className="text-xl text-white font-display mb-2 group-hover:text-[#f2c76c] transition-colors">Crystalline Matrix</h3>
                  <p className="text-white/50 text-sm">Geometry & fields &rarr; </p>
                </a>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}

function CheckIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  )
}
