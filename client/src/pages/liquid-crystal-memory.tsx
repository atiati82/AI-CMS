import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants, type Easing } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function LiquidCrystalMemoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

  // Gold/Amber accent for Crystalline Matrix cluster
  const accentColor = "#f59e0b";
  const accentGradient = "from-[#f59e0b] via-[#fbbf24] to-[#f59e0b]";

  // Animation variants
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
        <title>Liquid Crystal Memory – How Soft Matter Stores Patterns | Andara</title>
        <meta name="description" content="Discover what 'liquid crystal memory' really means. Learn how water, gels and biological tissues behave like liquid crystals that store structural patterns, fields and history – without magical thinking or fear." />
        <meta name="keywords" content="liquid crystal memory, soft matter memory, water memory concepts, biological liquid crystals, crystalline matrix in the body, structured soft matter" />
      </Helmet>

      <div
        ref={containerRef}
        className="andara-page"
        data-tree="crystalline"
        style={{ backgroundColor: "#020617" }}
      >
        {/* --- SCROLL PROGRESS BAR --- */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
          style={{ scaleX: scrollYProgress, backgroundColor: accentColor }}
        />

        {/* --- HERO SECTION --- */}
        <motion.section
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          {/* Ambient Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a0f1a] to-[#020617]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}15` }} />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 blur-[120px] rounded-full" style={{ backgroundColor: "#06b6d420" }} />
            {/* Floating Crystal Particles */}
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: Math.random() * 6 + 2,
                  height: Math.random() * 6 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: `${accentColor}40`,
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" // Diamond shape
                }}
                animate={{
                  y: [0, -80, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  duration: Math.random() * 15 + 10,
                  repeat: Infinity,
                  ease: "linear"
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
                <span>Science Library · Liquid Crystal Biology</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                Liquid Crystal <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${accentGradient} bg-[length:200%_auto] animate-gradient`}>
                  Memory
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-4 max-w-xl">
                <strong className="text-white">How Soft Matter Remembers Patterns</strong>
              </p>
              <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
                When we say that water and tissues have memory, we don't mean they store your childhood like a hard drive.
                We mean something more subtle: <strong className="text-white/80">soft matter can hold patterns</strong>,
                and those patterns can guide how energy, ions and information move.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {["Pattern Retention", "Structural Memory", "Field Imprinting"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full text-sm font-medium border"
                    style={{ backgroundColor: `${accentColor}10`, borderColor: `${accentColor}30`, color: accentColor }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105"
                  style={{ backgroundColor: accentColor, color: "#020617", boxShadow: `0 0 30px ${accentColor}50` }}
                >
                  Explore the Concept
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <SmartVideoEmbed
                keywords={["liquid crystal", "crystalline", "memory", "structure", "hexagonal"]}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                aspectRatio="video"
              />
              <p className="text-center text-white/30 text-xs mt-4 font-mono">
                Memory is structure. Structure is pattern.
              </p>
            </motion.div>
          </div>
        </motion.section>


        {/* --- SECTION 1: WHAT IS A LIQUID CRYSTAL --- */}
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
                1. What Is a Liquid Crystal, Really?
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Neither solid, nor ordinary liquid – a state of matter that combines
                <strong className="text-white"> order with flow</strong>.
              </p>
            </motion.header>

            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* Solid Crystal */}
              <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-1">
                    {[...Array(9)].map((_, i) => <div key={i} className="w-2 h-2 bg-white/60 rounded-sm" />)}
                  </div>
                </div>
                <h3 className="text-xl text-white font-medium mb-3">Solid Crystal</h3>
                <p className="text-white/60 text-sm">
                  Atoms arranged in a rigid, repeating lattice. Like a geometric city grid – predictable, fixed.
                </p>
              </motion.div>

              {/* Normal Liquid */}
              <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br from-cyan-600/30 to-cyan-800/30 flex items-center justify-center overflow-hidden">
                  <motion.div
                    className="flex flex-wrap gap-1 justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {[...Array(9)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-cyan-400/60 rounded-full"
                        animate={{ x: Math.sin(i) * 3, y: Math.cos(i) * 3 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      />
                    ))}
                  </motion.div>
                </div>
                <h3 className="text-xl text-white font-medium mb-3">Normal Liquid</h3>
                <p className="text-white/60 text-sm">
                  Molecules move freely, constantly rearranging. Like people wandering in a busy square – chaotic.
                </p>
              </motion.div>

              {/* Liquid Crystal */}
              <motion.div variants={fadeUp} className="p-8 rounded-2xl border-2 bg-gradient-to-br from-amber-900/20 to-amber-950/10 text-center relative overflow-hidden"
                style={{ borderColor: `${accentColor}40` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                    <motion.div
                      className="flex gap-1"
                      animate={{ rotate: [0, 15, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-8 rounded-full"
                          style={{ backgroundColor: accentColor }}
                          animate={{ rotate: [12, 12, 12] }}
                        />
                      ))}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-medium mb-3" style={{ color: accentColor }}>Liquid Crystal</h3>
                  <p className="text-white/60 text-sm">
                    In-between: molecules can flow like a liquid but still <strong className="text-white">align in shared directions</strong>.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="max-w-3xl mx-auto mt-16 p-8 rounded-2xl border border-white/10 bg-white/5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-white/80 text-lg leading-relaxed text-center">
                Think of a crowd all turning their heads the same way.
                Think of grass bending in the same direction in wind.
                <strong className="text-white block mt-4">
                  When many molecules agree on a direction or pattern, the material becomes a liquid crystal –
                  fluid, but with directional order.
                </strong>
              </p>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 2: HOW LIQUID CRYSTALS REMEMBER --- */}
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
                2. How Can Something Soft "Remember"?
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Here, <strong className="text-white">memory ≠ narrative</strong>.
                Memory = the tendency of a system to keep or return to a pattern after disturbance.
              </p>
            </motion.header>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="space-y-6"
              >
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h4 className="text-white font-medium mb-2">🏖️ Footsteps in Sand</h4>
                  <p className="text-white/60 text-sm">
                    Sand is soft, yet once pressed, it keeps the shape for a while.
                    The structure "remembers" the force.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h4 className="text-white font-medium mb-2">💇 Hair Pattern After Sleep</h4>
                  <p className="text-white/60 text-sm">
                    Your hair can be shaped by pressure and holds that "memory"
                    until moisture or heat reorganizes it.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h4 className="text-white font-medium mb-2">🧲 Magnetic Memory</h4>
                  <p className="text-white/60 text-sm">
                    Iron stays magnetized after the magnetic field is removed.
                    The material remembers its orientation.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-8 rounded-2xl border-2 text-center"
                style={{ borderColor: `${accentColor}40`, backgroundColor: `${accentColor}08` }}
              >
                <h3 className="text-2xl font-display text-white mb-4">
                  Liquid Crystal Memory
                </h3>
                <p className="text-white/70 leading-relaxed mb-6">
                  Alignment that persists even when the external field (electric, magnetic, mechanical) is removed.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["Orientation", "Charge Distribution", "Density", "Viscosity"].map((item) => (
                    <span key={item} className="px-3 py-1 rounded-full text-xs border"
                      style={{ borderColor: `${accentColor}50`, color: accentColor }}>
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-white/80 font-medium mt-6 text-lg">
                  Pattern persistence in soft, ordered media.
                </p>
              </motion.div>
            </div>
          </div>
        </section>


        {/* --- SECTION 3: WATER AS LIQUID CRYSTAL --- */}
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
                3. When Water Behaves Like a Liquid Crystal
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Bulk water is not a rigid crystal. But under certain conditions, water forms
                <strong className="text-white"> more ordered layers</strong>.
              </p>
            </motion.header>

            <motion.div
              className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-cyan-500/20 bg-cyan-950/10">
                <h3 className="text-xl text-cyan-400 font-medium mb-4">Near Surfaces</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex gap-3"><span className="text-cyan-400">→</span> Cell membranes</li>
                  <li className="flex gap-3"><span className="text-cyan-400">→</span> Gels, collagen, microtubules</li>
                  <li className="flex gap-3"><span className="text-cyan-400">→</span> Mineral surfaces, glass, resins</li>
                </ul>
              </motion.div>

              <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-purple-500/20 bg-purple-950/10">
                <h3 className="text-xl text-purple-400 font-medium mb-4">Under Fields</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex gap-3"><span className="text-purple-400">→</span> Electric fields</li>
                  <li className="flex gap-3"><span className="text-purple-400">→</span> Light exposure</li>
                  <li className="flex gap-3"><span className="text-purple-400">→</span> Mechanical flow (shear, vortex)</li>
                </ul>
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
              <p className="text-white/80 text-lg leading-relaxed">
                These ordered layers – often called <strong className="text-white">"Exclusion Zone (EZ) water"</strong> or
                <strong className="text-white"> structured hydration layers</strong> – exclude some solutes,
                have different charge distribution, and behave more like a soft, semi-ordered phase.
              </p>
              <p className="text-white font-medium mt-6" style={{ color: accentColor }}>
                Around surfaces and under fields, water stops behaving like "random liquid"
                and starts behaving more like a shapeable, responsive liquid crystal.
              </p>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 4: BIOLOGICAL LIQUID CRYSTALS --- */}
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
                4. Biological Tissues as Liquid Crystal Memory Fields
              </h2>
            </motion.header>

            <motion.div
              className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: `${accentColor}20` }}>
                  🔬
                </div>
                <h3 className="text-lg text-white font-medium mb-3">Cell Membranes</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Lipid bilayers behave like 2D liquid crystals. They align, phase-separate,
                  form domains – and fields can change their ordering, which persists.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: `${accentColor}20` }}>
                  🦴
                </div>
                <h3 className="text-lg text-white font-medium mb-3">Collagen & Fascia</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Collagen fibers align in bundles. Hydration layers around them are structured.
                  Mechanical stress and posture shape these patterns over time.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: `${accentColor}20` }}>
                  ⚡
                </div>
                <h3 className="text-lg text-white font-medium mb-3">Nervous System</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Myelin is a structured soft matter environment. Conduction velocity and
                  electrical properties relate to ordered layers.
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
              <p className="text-white/90 text-lg leading-relaxed">
                The body is full of soft, aligned structures bathed in ordered water.
                Together, they form a <strong className="text-white">giant liquid crystal network</strong> that can hold patterns of:
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {["Tension", "Hydration", "Electrical Properties"].map((item) => (
                  <span key={item} className="px-5 py-2 rounded-full font-medium"
                    style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 5: CLEARING MISUNDERSTANDINGS --- */}
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
                5. What This Is <span className="text-red-400">Not</span>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Clearing the line between science and fantasy.
              </p>
            </motion.header>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-8 rounded-2xl border border-red-500/30 bg-red-950/10"
              >
                <h3 className="text-xl text-red-400 font-medium mb-4">❌ NOT This</h3>
                <ul className="space-y-3 text-white/70">
                  <li>"Water records every word spoken near it"</li>
                  <li>"Bad thoughts will punish you through water"</li>
                  <li>Water as a literal hard drive</li>
                  <li>Magical or supernatural claims</li>
                </ul>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-8 rounded-2xl border-2"
                style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}08` }}
              >
                <h3 className="text-xl font-medium mb-4" style={{ color: accentColor }}>✓ Instead</h3>
                <ul className="space-y-3 text-white/70">
                  <li>Water and soft tissues respond to environments and fields</li>
                  <li>Once structured, they can keep patterns for a while</li>
                  <li>This affects how ions move and how charge distributes</li>
                  <li>Physical, measurable, subtle</li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              className="max-w-3xl mx-auto mt-12 p-6 rounded-xl border border-white/10 bg-white/5 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-white/80 italic">
                "At Andara, when we speak about liquid crystal memory, we mean patterned structure in soft matter –
                not supernatural recording devices. It's already profound that terrain holds patterns;
                we don't need to add fear or superstition on top."
              </p>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 6: MINERALS & SULFATE --- */}
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
                6. How Minerals Help Memory Hold Shape
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
                <p className="text-white/70 leading-relaxed mb-6">
                  Charged ions like <strong className="text-white">sulfate, magnesium, and calcium</strong> interact with water, proteins, and gels.
                  Sulfate is often linked to glycosaminoglycans, mucopolysaccharides, and structured gels in the body.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <span className="text-2xl mb-2 block">💎</span>
                    <p className="text-white/60 text-sm">Stable hydration layers</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <span className="text-2xl mb-2 block">⚡</span>
                    <p className="text-white/60 text-sm">Coherent charge distributions</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <span className="text-2xl mb-2 block">🔷</span>
                    <p className="text-white/60 text-sm">Stable liquid crystal ordering</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-8 rounded-2xl border-2 text-center"
                style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}08` }}>
                <h3 className="text-xl text-white font-medium mb-4">Where Andara Fits</h3>
                <p className="text-white/70 leading-relaxed">
                  Andara Ionic does not "program your memories". Its intention is to support
                  <strong className="text-white"> cleaner, more coherent water environments</strong> –
                  inspired by how mineralized, sulfate-bearing waters in nature often show clarity, stability and structured behavior.
                </p>
              </div>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 7: TERRAIN & REGENERATION --- */}
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
                7. Terrain as a Living Memory Field
              </h2>
            </motion.header>

            <motion.div
              className="max-w-3xl mx-auto space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="text-center">
                <p className="text-xl text-white/80 leading-relaxed">
                  Your terrain (water, minerals, structure, bioelectric state) is not static.
                  It is a <strong className="text-white">moving memory</strong> of:
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  {["What you drink", "How you move", "What fields you live in", "What shaped you"].map((item) => (
                    <span key={item} className="px-4 py-2 rounded-full text-sm border border-white/20 text-white/60">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-white/10 bg-white/5">
                <h3 className="text-xl text-white font-medium mb-4 text-center">A Different Question</h3>
                <p className="text-center text-white/80 text-lg">
                  Instead of thinking <span className="text-red-400">"my body is broken"</span>,
                  terrain thinking asks:
                </p>
                <p className="text-center text-2xl text-white font-medium mt-4">
                  "What patterns is my terrain currently holding?"
                </p>
                <p className="text-center text-lg mt-2" style={{ color: accentColor }}>
                  "What inputs could invite a more coherent pattern?"
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 8: SUMMARY & NEXT --- */}
        <section className="section relative z-10 py-24" style={{ backgroundColor: "#030712" }}>
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
                <Link href="/science/liquid-crystal-resonance">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                    <span className="text-white group-hover:text-amber-400 transition-colors">Resonance & Coherence →</span>
                    <p className="text-white/50 text-sm mt-2">How liquid crystals tune into fields</p>
                  </a>
                </Link>
                <Link href="/crystalline-matrix-overview">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                    <span className="text-white group-hover:text-amber-400 transition-colors">Crystalline Matrix →</span>
                    <p className="text-white/50 text-sm mt-2">Water, minerals & fields as one system</p>
                  </a>
                </Link>
                <Link href="/charge-coherence">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                    <span className="text-white group-hover:text-amber-400 transition-colors">Charge Coherence →</span>
                    <p className="text-white/50 text-sm mt-2">When currents start to sing</p>
                  </a>
                </Link>
                <Link href="/terrain-vs-symptom">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                    <span className="text-white group-hover:text-amber-400 transition-colors">Terrain vs Symptom →</span>
                    <p className="text-white/50 text-sm mt-2">Changing the question you ask</p>
                  </a>
                </Link>
              </div>

              <p className="text-white/50 text-sm mt-12 max-w-xl mx-auto">
                This page discusses liquid crystal memory as a materials science and biophysics concept.
                It is an educational terrain model, not a medical claim.
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
