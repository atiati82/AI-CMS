import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function ChargeCoherencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

  // Indigo/Electric accent for Bioelectric Science cluster
  const accentColor = "#6366f1";
  const accentGradient = "from-[#6366f1] via-[#818cf8] to-[#6366f1]";

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
        <title>Charge Coherence – When Bioelectric Currents Start to Sing | Andara</title>
        <meta name="description" content="Discover what charge coherence is, why it matters for water, cells and terrain, and how mineral-rich, structured water can support a more ordered bioelectric environment without making health claims." />
        <meta name="keywords" content="charge coherence, bioelectric coherence, coherent charge fields, water and charge, mineral-supported bioelectricity, terrain and electrical balance" />
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
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a0a1a] to-[#020617]" />
            <div className="absolute top-1/3 left-1/4 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}15` }} />
            <div className="absolute bottom-1/4 right-1/3 w-72 h-72 blur-[120px] rounded-full" style={{ backgroundColor: "#06b6d415" }} />
            {/* Electric particle field */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 2,
                  height: 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: accentColor,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  delay: Math.random() * 2
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
                Charge <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${accentGradient} bg-[length:200%_auto] animate-gradient`}>
                  Coherence
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-4 max-w-xl">
                <strong className="text-white">When Currents Start to Sing Instead of Shouting</strong>
              </p>
              <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
                Inside water, cells and tissues, electricity appears as distributed charges that move in patterns.
                When they move chaotically, we get noise. When they move in ordered patterns,
                we get <strong className="text-white/80">charge coherence</strong>.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {["Bioelectric Order", "Field Harmony", "Terrain Balance"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full text-sm font-medium border"
                    style={{ backgroundColor: `${accentColor}10`, borderColor: `${accentColor}30`, color: accentColor }}>
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105"
                style={{ backgroundColor: accentColor, color: "white", boxShadow: `0 0 30px ${accentColor}50` }}
              >
                Explore the Science
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <SmartVideoEmbed
                keywords={["coherence", "charge", "alignment"]}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                aspectRatio="video"
              />
              <p className="text-center text-white/30 text-xs mt-4 font-mono">
                Coherence is not more electricity – it is better organized electricity.
              </p>
            </motion.div>
          </div>
        </motion.section>


        {/* --- SECTION 1: WHAT IS CHARGE COHERENCE --- */}
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
                1. From Random Sparks to Organized Fields
              </h2>
            </motion.header>

            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* Charge Carriers */}
              <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl text-white font-medium mb-3">Charge</h3>
                <p className="text-white/60 text-sm">
                  Tiny units of electrical potential carried by ions (Na⁺, K⁺, Ca²⁺, SO₄²⁻),
                  protons, electrons, and charged surfaces.
                </p>
              </motion.div>

              {/* Incoherent */}
              <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-red-500/30 bg-red-950/10 text-center">
                <div className="text-4xl mb-4">📢</div>
                <h3 className="text-xl text-red-400 font-medium mb-3">Incoherent</h3>
                <p className="text-white/60 text-sm">
                  Currents flowing in many directions at once. Lots of micro-conflicts, friction, noise.
                  Like a room where everybody speaks at the same time.
                </p>
              </motion.div>

              {/* Coherent */}
              <motion.div variants={fadeUp} className="p-8 rounded-2xl border-2 text-center"
                style={{ borderColor: `${accentColor}40`, backgroundColor: `${accentColor}08` }}>
                <div className="text-4xl mb-4">🎵</div>
                <h3 className="text-xl font-medium mb-3" style={{ color: accentColor }}>Coherent</h3>
                <p className="text-white/60 text-sm">
                  Flows that self-organize into patterns. Waves, rhythms, resonance.
                  Like an orchestra tuning into the same key.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="max-w-3xl mx-auto mt-16 p-8 rounded-2xl border border-white/20 bg-white/5 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-white text-xl font-medium">
                Charge coherence is not "more electricity".
              </p>
              <p className="text-lg mt-4" style={{ color: accentColor }}>
                It is better organized electricity in a water–mineral–tissue environment.
              </p>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 2: THE MEDIUM MATTERS --- */}
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
                2. The Medium Matters
              </h2>
              <p className="text-lg text-white/70">
                Water + Minerals = Wiring + Tuning
              </p>
            </motion.header>

            <motion.div
              className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-cyan-500/30 bg-cyan-950/10">
                <h3 className="text-lg text-cyan-400 font-medium mb-3">💧 Water Alone</h3>
                <p className="text-white/60 text-sm">
                  Good medium for charge, but pure water has very low conductivity. Needs ions to carry charge.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-amber-500/30 bg-amber-950/10">
                <h3 className="text-lg text-amber-400 font-medium mb-3">💎 Minerals as Ions</h3>
                <p className="text-white/60 text-sm">
                  Convert water into an electrolyte. Provide mobile charge carriers. Allow currents to exist.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="p-6 rounded-2xl border-2"
                style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                <h3 className="text-lg font-medium mb-3" style={{ color: accentColor }}>🔷 Structured Water</h3>
                <p className="text-white/60 text-sm">
                  Near surfaces, water forms organized layers. This stabilizes charges, reduces collisions, helps patterns persist.
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
              <p className="text-white/80 italic text-lg">
                "Charge coherence is always a story of the medium:
                water that is structured, minerally informed, and not overloaded with random noise."
              </p>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 3: INTERFACES --- */}
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
                3. Where Coherence Lives – At the Interfaces
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
                <p className="text-white/80 text-lg leading-relaxed mb-6 text-center">
                  Most bioelectric action happens at <strong className="text-white">interfaces</strong>:
                </p>
                <div className="grid md:grid-cols-4 gap-4">
                  {["Cell membranes", "Protein surfaces", "Sulfated sugar chains", "Mineral-rich matrices"].map((item) => (
                    <div key={item} className="p-4 rounded-xl bg-white/5 text-center">
                      <p className="text-white/70 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-white/60 text-center mt-8 text-sm leading-relaxed">
                  At these interfaces, charges line up along surfaces. Water orders itself into layers.
                  Ions distribute themselves to maintain electrical balance.
                </p>
              </div>

              <div className="mt-8 p-8 rounded-2xl border-2 text-center"
                style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                <p className="text-white/80 text-lg leading-relaxed">
                  Imagine millions of tiny shorelines inside your body – every membrane, every protein surface
                  is a place where water and charges negotiate.
                </p>
                <p className="text-lg mt-4" style={{ color: accentColor }}>
                  In a coherent terrain, these shorelines host organized tides, not electrical storms.
                </p>
              </div>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 4: NOISE VS HARMONY --- */}
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
                4. When Charges Clash vs When They Sing
              </h2>
            </motion.header>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-8 rounded-2xl border border-red-500/30 bg-red-950/10"
              >
                <h3 className="text-xl text-red-400 font-medium mb-6">📢 Noise in the Field</h3>
                <ul className="space-y-3 text-white/70 text-sm">
                  <li>• Excessive metabolic waste</li>
                  <li>• Heavy metals and disruptive ions</li>
                  <li>• Chronic low-grade inflammation</li>
                  <li>• EMF noise + low mineral resilience</li>
                </ul>
                <p className="text-white/50 text-sm mt-6">
                  Signals compete. Timing becomes unstable. The terrain feels overwhelmed.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-8 rounded-2xl border-2"
                style={{ borderColor: `${accentColor}40`, backgroundColor: `${accentColor}08` }}
              >
                <h3 className="text-xl font-medium mb-6" style={{ color: accentColor }}>🎵 Harmony in the Field</h3>
                <ul className="space-y-3 text-white/70 text-sm">
                  <li>• Enough conductivity (minerals present)</li>
                  <li>• Water moving and renewing</li>
                  <li>• Charges can distribute naturally</li>
                  <li>• Natural discharge pathways open</li>
                </ul>
                <p className="text-white/50 text-sm mt-6">
                  Signals can be heard. Background noise isn't screaming.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="max-w-3xl mx-auto mt-12 p-6 rounded-xl border border-white/10 bg-white/5 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-white text-lg font-medium">
                A coherent terrain is not "perfect".
              </p>
              <p className="text-white/70 mt-2">
                It is a terrain where signals can be heard because the background noise is not screaming.
              </p>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 5: EVERYDAY PRACTICES --- */}
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
                5. Everyday Practices That May Support Coherence
              </h2>
            </motion.header>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { icon: "💧", title: "Water Quality", desc: "Well-filtered, low in contaminants, with measured mineral additions" },
                { icon: "💎", title: "Intelligent Mineralization", desc: "Ionic minerals in reasonable ranges, not maximum load" },
                { icon: "🚶", title: "Movement & Flow", desc: "Gentle movement supports fluid circulation and charge redistribution" },
                { icon: "🌳", title: "Contact with Nature", desc: "Bare feet on ground, time near water, trees, natural fields" },
                { icon: "📱", title: "Digital Hygiene", desc: "Create times where devices are off, simpler electrical landscape" },
              ].map((item) => (
                <motion.div key={item.title} variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-lg text-white font-medium mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="max-w-3xl mx-auto mt-12 p-6 rounded-xl border border-white/10 bg-white/5 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-white/80 text-sm">
                None of these are "fixes". Think of them as ways to reduce noise and improve the medium,
                so your own bioelectric intelligence can organize itself more easily.
              </p>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 6: ANDARA POSITIONING --- */}
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
                6. Where Andara Ionic Fits
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
                  Andara Ionic is a <strong className="text-white">primordial ionic sulfate mineral solution</strong>
                  designed for small, measured dilutions in water – focusing on clarification and conditioning.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                    Water Quality
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                    Mineral Profile
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                    Conductivity
                  </span>
                </div>
                <p className="text-white/60 text-sm">
                  We speak about charge coherence as an educational model.
                  Andara Ionic is introduced as a water clarification & conditioning agent, not as a health treatment.
                </p>
              </div>
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
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-indigo-500/50 transition-all group">
                    <span className="text-white group-hover:text-indigo-400 transition-colors">Bioelectric Water →</span>
                    <p className="text-white/50 text-sm mt-2">The wider bioelectric map</p>
                  </a>
                </Link>
                <Link href="/voltage-detox-pathways">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-indigo-500/50 transition-all group">
                    <span className="text-white group-hover:text-indigo-400 transition-colors">Voltage Detox Pathways →</span>
                    <p className="text-white/50 text-sm mt-2">Charge maps into detox flows</p>
                  </a>
                </Link>
                <Link href="/ion-transport">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-indigo-500/50 transition-all group">
                    <span className="text-white group-hover:text-indigo-400 transition-colors">Ion Transport →</span>
                    <p className="text-white/50 text-sm mt-2">Channels, pumps & fields</p>
                  </a>
                </Link>
                <Link href="/science-library">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-indigo-500/50 transition-all group">
                    <span className="text-white group-hover:text-indigo-400 transition-colors">Science Library →</span>
                    <p className="text-white/50 text-sm mt-2">Explore all topics</p>
                  </a>
                </Link>
              </div>

              <p className="text-white/50 text-sm mt-12 max-w-xl mx-auto">
                This page discusses charge coherence as an educational model for understanding water, minerals and terrain.
                It is not a protocol or medical claim.
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
