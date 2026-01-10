import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants, type Easing } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function VisionMissionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

  // Brand gold/amber accent
  const accentColor = "#f59e0b";
  const accentGradient = "from-[#f59e0b] via-[#fbbf24] to-[#f59e0b]";

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
        <title>Vision & Mission – Why Andara Ionic Exists | Andara</title>
        <meta name="description" content="Andara Ionic exists to offer one clear contribution to the mineral and water space: a concentrated ionic sulfate solution with visible water clarification effects, documented mineral ranges, and a living knowledge library for terrain-based thinking." />
        <meta name="keywords" content="andara ionic vision, andara mission, why andara exists, ionic mineral brand, water mineral company, terrain thinking brand" />
      </Helmet>

      <div
        ref={containerRef}
        className="andara-page"
        data-tree="brand"
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
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a0805] to-[#020617]" />
            <div className="absolute top-1/3 left-1/4 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}15` }} />
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 blur-[120px] rounded-full" style={{ backgroundColor: "#3b82f612" }} />
          </div>

          <div className="container relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-6"
                style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                <span>About · Brand Story</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                Vision & <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${accentGradient} bg-[length:200%_auto] animate-gradient`}>
                  Mission
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-4 max-w-2xl mx-auto">
                <strong className="text-white">Why Andara Ionic Exists</strong>
              </p>
              <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-2xl mx-auto">
                We do not exist to save anyone. We exist to offer clarity –
                in water, in minerals, in how we speak about both.
              </p>

              <button
                onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105"
                style={{ backgroundColor: accentColor, color: "#020617", boxShadow: `0 0 30px ${accentColor}40` }}
              >
                Read Our Why
              </button>
            </motion.div>
          </div>
        </motion.section>


        {/* --- SECTION 1: VISION --- */}
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
                1. Vision
              </h2>
            </motion.header>

            <motion.div
              className="max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="p-10 rounded-3xl border-2 text-center"
                style={{ borderColor: `${accentColor}40`, backgroundColor: `${accentColor}08` }}>
                <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed">
                  A world where people reconnect with the foundational elements of life –
                </p>
                <p className="text-xl md:text-2xl mt-4" style={{ color: accentColor }}>
                  water and minerals –
                </p>
                <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed mt-4">
                  not as commodities to buy, but as terrain to understand and care for.
                </p>
              </div>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 2: MISSION --- */}
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
                2. Mission
              </h2>
            </motion.header>

            <motion.div
              className="max-w-4xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="p-8 rounded-2xl border border-white/20 bg-white/5">
                <p className="text-white/80 text-xl leading-relaxed text-center mb-8">
                  Andara Ionic exists to offer one <strong className="text-white">clear, bounded contribution</strong>
                  to the mineral and water space:
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl bg-white/5 text-center">
                    <span className="text-3xl mb-3 block">💧</span>
                    <h4 className="text-white font-medium mb-2">A Product</h4>
                    <p className="text-white/60 text-sm">
                      A primordial ionic sulfate mineral concentrate with visible clarification effects and documented ranges
                    </p>
                  </div>
                  <div className="p-6 rounded-xl bg-white/5 text-center">
                    <span className="text-3xl mb-3 block">📚</span>
                    <h4 className="text-white font-medium mb-2">A Library</h4>
                    <p className="text-white/60 text-sm">
                      An educational space covering water science, mineral physics, terrain thinking, and crystalline dynamics
                    </p>
                  </div>
                  <div className="p-6 rounded-xl bg-white/5 text-center">
                    <span className="text-3xl mb-3 block">🧠</span>
                    <h4 className="text-white font-medium mb-2">A Knowledge System</h4>
                    <p className="text-white/60 text-sm">
                      AI-assisted tools for navigating the body of research and language around water, minerals and terrain
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 3: WHAT WE DO NOT DO --- */}
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
                3. What We Do Not Do
              </h2>
              <p className="text-lg text-white/70">
                Clarity includes knowing what we are not.
              </p>
            </motion.header>

            <motion.div
              className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { icon: "🏥", text: "We do not diagnose, treat, cure or prevent disease" },
                { icon: "🔮", text: "We do not promise energy, vibrations or miracle transformations" },
                { icon: "📣", text: "We do not use fear-based marketing or 'detox your body now' language" },
                { icon: "🧪", text: "We do not sell supplements, protocols, or medical advice" },
              ].map((item) => (
                <motion.div key={item.text} variants={fadeUp}
                  className="p-6 rounded-xl border border-red-500/20 bg-red-950/10 flex items-start gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-white/70">{item.text}</p>
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
              <p className="text-white/80">
                We stay in our lane: <strong className="text-white">water quality, mineral profiles,
                  and terrain-based education</strong>.
              </p>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 4: THREE PILLARS --- */}
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
                4. The Three Pillars
              </h2>
            </motion.header>

            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-cyan-500/30 bg-cyan-950/10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl"
                  style={{ backgroundColor: "rgba(6, 182, 212, 0.2)" }}>💧</div>
                <h3 className="text-xl text-cyan-400 font-medium mb-4">Product</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  One product line. Concentrated ionic sulfate mineral drops.
                  Clear dilution guides. Visible clarification effects.
                  Simple, documentable, not over-promised.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-purple-500/30 bg-purple-950/10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl"
                  style={{ backgroundColor: "rgba(168, 85, 247, 0.2)" }}>📖</div>
                <h3 className="text-xl text-purple-400 font-medium mb-4">Science Library</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Water science (EZ water, pH, ORP). Mineral science (ionic vs colloidal, sulfate chemistry).
                  Terrain, bioelectricity, resonance – all presented as educational maps.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="p-8 rounded-2xl border-2 text-center"
                style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}08` }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl"
                  style={{ backgroundColor: `${accentColor}20` }}>🤖</div>
                <h3 className="text-xl font-medium mb-4" style={{ color: accentColor }}>AI Knowledge Base</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  An AI-assisted CMS that understands the sitemap, pillars, visual language, and content zones.
                  Connecting PDFs, research notes, videos and guides into consistent, terrain-oriented explanations.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 5: CORE VALUES --- */}
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
                5. Core Values
              </h2>
            </motion.header>

            <motion.div
              className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { title: "Transparency", desc: "Show what the product is, what ranges it operates in, and what it does not claim." },
                { title: "Terrain Thinking", desc: "Focus on the medium, not symptoms. Support the environment, not the panic." },
                { title: "Documentation", desc: "Real images, measured values, reproducible tests. We photograph what water actually does with our minerals." },
                { title: "Slow Growth", desc: "No viral hype. Build trust one documented page at a time." },
                { title: "Non-Violence Against Language", desc: "No war metaphors by default. Flows, not fights. Terrain, not enemies." },
                { title: "One Contribution", desc: "We are a mineral + water project. Not a health brand, not a lifestyle guru, not a protocol seller." },
              ].map((value) => (
                <motion.div key={value.title} variants={fadeUp}
                  className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h3 className="text-lg text-white font-medium mb-2">{value.title}</h3>
                  <p className="text-white/60 text-sm">{value.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 6: NEXT STEPS --- */}
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
                Where to Go Next
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/timeline">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                    <span className="text-white group-hover:text-amber-400 transition-colors">Timeline →</span>
                    <p className="text-white/50 text-sm mt-2">From first drops to today</p>
                  </a>
                </Link>
                <Link href="/community-join">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                    <span className="text-white group-hover:text-amber-400 transition-colors">Join the Community →</span>
                    <p className="text-white/50 text-sm mt-2">Onboarding & connection</p>
                  </a>
                </Link>
                <Link href="/science-library">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                    <span className="text-white group-hover:text-amber-400 transition-colors">Science Library →</span>
                    <p className="text-white/50 text-sm mt-2">Water, minerals, terrain</p>
                  </a>
                </Link>
                <Link href="/shop">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all group">
                    <span className="text-white group-hover:text-amber-400 transition-colors">Shop →</span>
                    <p className="text-white/50 text-sm mt-2">Explore our products</p>
                  </a>
                </Link>
              </div>

              <p className="text-white/50 text-sm mt-12 max-w-xl mx-auto">
                We don't ask you to believe anything. We ask you to look, observe,
                and decide whether this lens on water and minerals makes sense for you.
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
