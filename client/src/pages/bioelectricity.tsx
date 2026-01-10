import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Easing, type Variants } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";

export default function BioelectricityPage() {
  const containerRef = useRef<HTMLDivElement>(null);
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
        data-tree="bioelectricity"
        style={{ backgroundColor: "#020617" }}
      >
        {/* --- SCROLL PROGRESS BAR --- */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#2cff9a] z-50 origin-left"
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
            <div className="absolute top-0 inset-x-0 h-[500px] bg-[#2cff9a]/5 blur-[100px] rounded-full" />
            {/* Floating Particles Background */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#2cff9a]/20"
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
              transition={{ duration: 0.8, ease: "easeOut" as Easing }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2cff9a]/10 border border-[#2cff9a]/20 text-[#2cff9a] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#2cff9a] animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase">Science Library · Bioelectric Terrain</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                Bioelectricity: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2cff9a] via-[#38ffd1] to-[#2cff9a] bg-[length:200%_auto] animate-gradient">
                  The Invisible Voltage System
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-8 max-w-xl">
                Underneath chemistry, hormones, and lab values, every living system runs on a quiet,
                continuous flow of <strong>bioelectric charge</strong>. It is the <strong>voltage architecture</strong> that
                shapes regeneration and terrain.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-[#2cff9a] text-[#020617] font-bold rounded-lg hover:bg-[#2cff9a]/90 transition-all shadow-[0_0_20px_rgba(44,255,154,0.3)]"
                >
                  Explore the Voltage System
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
                keywords={["electric", "voltage", "field", "terrain"]}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                aspectRatio="video"
              />
              <p className="text-center text-white/30 text-xs mt-4 font-mono">
                Life is not only biochemical – it is also electrical.
              </p>
            </motion.div>
          </div>
        </motion.section>


        {/* --- SECTION 1: WHAT IS BIOELECTRICITY --- */}
        <section id="section-1" className="section relative z-10 py-24">
          <div className="container">
            <motion.header
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                1. What Is Bioelectricity – <br />in Simple Language?
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Bioelectricity is the <strong>flow of charged particles</strong> – mainly ions and electrons –
                through <strong>living tissues</strong>. It shows up as <strong>membrane potentials</strong>, <strong>voltage gradients</strong>,
                and <strong>field patterns</strong> that quietly instruct cells how to behave.
              </p>
            </motion.header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {[
                { title: "The Body as a Living Circuit", desc: "Every cell membrane is a tiny capacitor, storing charge. Tissues link these into circuits and networks: nerves, fascia, collagen matrices, and structured water form pathways for current." },
                { title: "Voltage as a Hidden Map", desc: "Between tissues, there are voltage gradients – tiny differences in electric potential. These act like navigation beacons, telling cells where to move, where to grow, where to stop." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="panel facet pad p-8 bg-[#0b1020]/50 border border-white/5 rounded-2xl backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <h3 className="text-xl font-display text-[#2cff9a] mb-3">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* --- SECTION 2: CELL VOLTAGE & PROTON GRADIENTS --- */}
        <section className="section bg-[#05060b]/50 border-y border-white/5 relative z-10 py-24">
          <div className="container">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                2. Cell Voltage, Proton Gradients & the Bioelectric Engine
              </h2>
              <p className="text-white/60 max-w-2xl text-lg">
                At the cellular level, bioelectricity shows up as <strong>membrane potential</strong> and
                <strong> proton gradients</strong>. These determine how much energy, communication, and repair cells can sustain.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Membrane Potential – The Cell's Battery", desc: "Each cell maintains a difference in charge between inside and outside – like a tiny charged capacitor. This voltage is shaped by ions (Na⁺, K⁺, Ca²⁺, Cl⁻) and determines the cell's excitability and resilience.", icon: "⚡" },
                { title: "Proton Gradients – The Inner Turbines", desc: "Inside mitochondria, proton gradients drive the synthesis of ATP – the cell's currency of energy. These electrochemical slopes push protons through nano-turbines, turning electrical potential into biochemical work.", icon: "🔋" },
                { title: "Tissues as Bioelectric Landscapes", desc: "When you zoom out, clusters of cells form bioelectric landscapes – regions of relative high and low voltage. These landscapes influence how tissues grow, regenerate, and coordinate.", icon: "🌐" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="panel facet pad p-8 bg-[#0b1020]/50 border border-white/5 rounded-2xl backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-display text-[#38ffd1] mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* --- SECTION 3: WATER & MINERALS AS WIRING --- */}
        <section className="section relative z-10 py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-display text-white mb-8">
                  3. Water & Minerals – The Wiring That Carries the Signal
                </h2>
                <div className="prose prose-invert prose-lg text-white/70">
                  <p className="mb-6">
                    Bioelectricity needs <strong>conductors</strong>. In the body, the main conductors are <strong>structured water</strong> and
                    <strong> ionic minerals</strong>. Together they create a <strong>liquid crystal wiring system</strong>.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <span className="text-[#38ffd1] mt-1">⬡</span>
                      <span><strong>Structured Water:</strong> Liquid crystalline layers around proteins and membranes that conduct and store charge.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#f2c76c] mt-1">⬢</span>
                      <span><strong>Ionic Sulfate Minerals:</strong> Charged building blocks that support conductivity, buffering, and charge separation.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#9b7bff] mt-1">◎</span>
                      <span><strong>Living Conductor:</strong> This is not copper cables – it is a dynamic, shape-shifting liquid crystal circuit.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-[#2cff9a]/10 to-transparent border border-[#2cff9a]/20"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🔬</div>
                  <h4 className="text-xl font-bold text-white mb-4">The Andara Perspective</h4>
                  <p className="text-white/60">
                    In the Andara universe, ionic sulfate minerals are the <strong>primordial language</strong> we use to
                    speak to water and its bioelectric functions.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* --- SECTION 4: BIOELECTRIC TERRAIN VS BIOCHEMICAL VIEW --- */}
        <section className="section bg-gradient-to-b from-[#020617] to-[#070a12] py-24 border-t border-white/5">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                4. Bioelectric Terrain vs. Purely Biochemical Thinking
              </h2>
              <p className="text-lg text-white/70">
                Conventional thinking often starts with <strong>molecules and reactions</strong>.
                The bioelectric terrain view asks: <strong>what field are these molecules moving in?</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="panel pad bg-white/5 rounded-xl border border-white/10 p-6">
                <h4 className="text-xl font-display text-white/50 mb-2">The Biochemical Lens</h4>
                <p className="text-white/60">
                  Focuses on <strong>hormones, enzymes, receptors, nutrients, and pathways</strong>.
                  This view is precise and useful, but often <strong>localised</strong> – it sees reactions in isolation.
                </p>
              </div>
              <div className="panel pad bg-white/5 rounded-xl border border-[#2cff9a]/30 p-6">
                <h4 className="text-xl font-display text-[#2cff9a] mb-2">The Bioelectric Terrain Lens</h4>
                <p className="text-white/60">
                  Asks: <strong>what is the charge environment these molecules live in?</strong>
                  It looks at voltage, gradients, and field coherence, seeing the body as a <strong>self-organising electrical ecosystem</strong>.
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto mt-12">
              <div className="bg-[#2cff9a]/10 border border-[#2cff9a]/30 p-8 rounded-2xl text-center">
                <p className="text-xl text-white italic font-light">
                  "Both lenses matter. The Andara project chooses to start from the <strong>field-first perspective</strong>:
                  cleaning and informing water, supporting ionic balance, and honouring the bioelectric architecture beneath the biochemical noise."
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* --- SECTION 5: USE CASE SCENARIOS --- */}
        <section className="section py-24 relative z-10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                5. How a Bioelectric Perspective Can Be Applied
              </h2>
              <p className="text-lg text-white/70">
                Looking through a voltage-first lens doesn't mean treating anything – it means
                <strong> changing how we organise our decisions</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: "Water Environments", desc: "Creating daily water that is clean, structured, and mineral-informed so the terrain has a more coherent medium to work with.", color: "#1aa7ff" },
                { title: "Spaces & Architecture", desc: "Designing homes, studios, and retreats around light, EMF, grounding, and water placement to support a stable field environment.", color: "#2cff9a" },
                { title: "Practices & Protocols", desc: "Linking movement, breath, and rest with attention to hydration quality, mineral intake, and field exposure.", color: "#f2c76c" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-xl bg-[#020617] border border-white/10 hover:border-opacity-50 transition-all"
                  style={{ borderColor: `${item.color}30` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h4 className="font-bold mb-2" style={{ color: item.color }}>{item.title}</h4>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-12">
              <div className="p-6 border-l-4 border-amber-500 bg-amber-500/5 rounded-r-xl">
                <p className="text-white/80 text-sm">
                  <strong>Note:</strong> The ideas described here are <strong>educational and exploratory</strong>.
                  They are not medical advice, not a diagnosis, and not a treatment plan.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* --- SECTION 6: FROM NOISE TO COHERENCE TIMELINE --- */}
        <section className="section py-20 bg-[#0f172a] border-y border-white/5">
          <div className="container text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display text-white mb-8">
              6. From Noise to Coherence
            </h2>
            <p className="text-xl text-white/80 font-light mb-12">
              A simple bioelectric storyboard – from <strong>noisy, fragmented signals</strong> toward <strong>clear, stable patterns</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
              {[
                { step: 1, title: "Fragmented Signals", desc: "Water is chemically burdened, minerals are scattered or missing, and fields are full of noise.", color: "#ff6b6b" },
                { step: 2, title: "Clearing the Medium", desc: "Filtration, clarification, and grounding begin. Water becomes clearer.", color: "#ffd93d" },
                { step: 3, title: "Structured & Informed Water", desc: "Structured water and ionic minerals bring charge separation, buffering, and organisation.", color: "#38ffd1" },
                { step: 4, title: "Coherent Bioelectric Field", desc: "Signals travel with clarity, gradients are stable, and the terrain behaves as a coordinated whole.", color: "#2cff9a" }
              ].map((item) => (
                <motion.div
                  key={item.step}
                  className="p-6 rounded-xl bg-[#020617] border border-white/10"
                  whileHover={{ y: -5 }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[#020617] font-bold mb-4"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.step}
                  </div>
                  <h4 className="text-white font-bold mb-2">{item.title}</h4>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* --- SECTION 7: ANDARA IONIC LINK --- */}
        <section className="section py-24 relative z-10 text-center">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-display text-white mb-8">
              7. Where Andara Ionic Fits Into This Picture
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12">
              <div className="panel pad p-8 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-[#2cff9a] mb-4">Clarifying & Conditioning Water</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  A micro-dose of Andara Ionic, within a defined sulfate band, can <strong>clarify and condition water</strong>,
                  reorganising impurities and supporting a more <strong>ordered charge environment</strong>.
                </p>
              </div>
              <div className="panel pad p-8 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-[#38ffd1] mb-4">Supporting the Terrain Medium</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  In a bioelectric view, this means tending to the <strong>medium</strong> that carries signals, rather than
                  chasing each signal separately. Clearer, better-organised water is one ingredient in a <strong>more coherent bioelectric terrain</strong>.
                </p>
              </div>
            </div>

            <div className="bg-[#2cff9a]/10 border border-[#2cff9a]/30 p-8 rounded-2xl">
              <p className="text-lg text-white mb-6">
                To see how Andara Ionic is described as a product – with full disclaimers, dosing examples, and pricing:
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/shop/andara-ionic-100ml">
                  <button className="px-6 py-3 bg-[#2cff9a] text-[#020617] font-bold rounded-lg hover:bg-[#2cff9a]/90 transition-all">
                    100 ml Product Page
                  </button>
                </Link>
                <Link href="/shop/andara-ionic-1l">
                  <button className="px-6 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all border border-white/20">
                    1 L Product Page
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* --- FAQ SECTION --- */}
        <section className="section py-20 bg-[#05060b]/50 border-t border-white/5">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display text-white mb-12 text-center">
              Bioelectric Terrain – Gentle Clarifications
            </h2>
            <div className="space-y-6">
              {[
                { q: "Is bioelectricity the same as the nervous system?", a: "The nervous system is one expression of bioelectricity, but not the only one. Voltage gradients exist around wounds, organs, fascia, and entire body regions – even beyond classical nerves." },
                { q: "Does this replace conventional medical care?", a: "No. A bioelectric view is a complementary map, not a substitute for care, diagnosis, or treatment. It offers language and models for understanding terrain – not prescriptions." },
                { q: "Can I measure my own bioelectric terrain at home?", a: "Certain aspects can be explored – e.g. tracking pH/ORP/EC of water, experimenting with grounding and light exposure. Other aspects require specialised equipment or research contexts." }
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  className="p-6 bg-white/5 rounded-xl border border-white/10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h4 className="text-white font-bold mb-2">{faq.q}</h4>
                  <p className="text-white/60 text-sm">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* --- FOOTER NAVIGATION --- */}
        <section className="section py-16 bg-[#020617]">
          <div className="container">
            <h2 className="text-center text-white/40 font-display text-2xl mb-12">Continue the Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/science/water">
                <a className="block p-8 rounded-2xl bg-[#0b1020] border border-white/5 hover:border-[#1aa7ff]/50 transition-all group">
                  <span className="text-xs font-bold text-[#1aa7ff] uppercase tracking-widest mb-2 block">Related Pillar</span>
                  <h3 className="text-xl text-white font-display mb-2 group-hover:text-[#1aa7ff] transition-colors">Water Science</h3>
                  <p className="text-white/50 text-sm">The hidden architecture of water &rarr;</p>
                </a>
              </Link>
              <Link href="/science/mineral-science">
                <a className="block p-8 rounded-2xl bg-[#0b1020] border border-white/5 hover:border-[#f2c76c]/50 transition-all group">
                  <span className="text-xs font-bold text-[#f2c76c] uppercase tracking-widest mb-2 block">Next Pillar</span>
                  <h3 className="text-xl text-white font-display mb-2 group-hover:text-[#f2c76c] transition-colors">Mineral Science</h3>
                  <p className="text-white/50 text-sm">Ionic codes & elemental pathways &rarr;</p>
                </a>
              </Link>
              <Link href="/science/crystalline-matrix">
                <a className="block p-8 rounded-2xl bg-[#0b1020] border border-white/5 hover:border-[#9b7bff]/50 transition-all group">
                  <span className="text-xs font-bold text-[#9b7bff] uppercase tracking-widest mb-2 block">Deep Dive</span>
                  <h3 className="text-xl text-white font-display mb-2 group-hover:text-[#9b7bff] transition-colors">Crystalline Matrix</h3>
                  <p className="text-white/50 text-sm">Geometry & fields &rarr;</p>
                </a>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
