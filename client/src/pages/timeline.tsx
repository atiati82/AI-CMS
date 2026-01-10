import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants, type Easing } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import { Helmet } from "@/lib/react-helmet-stub";

export default function TimelinePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

  // Brand gold accent for History/Timeline
  const accentColor = "#f59e0b";
  const accentGradient = "from-[#f59e0b] via-[#fbbf24] to-[#f59e0b]";

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as Easing } }
  };

  // Timeline milestone data
  const milestones = [
    {
      phase: "PRE-ANDARA",
      title: "Before a Brand, There Was Just Curiosity",
      content: "Years of exploring natural springs, sulfur baths, and mineral spas. Reading about volcanic origin minerals, traditional sulfur springs, structured water, EZ water, and vortex flows. Noticing that people travel to springs not just for 'minerals', but for the way the water feels.",
      icon: "🌋",
      side: "left"
    },
    {
      phase: "DISCOVERY",
      title: "Finding the Volcanic Mineral Source",
      content: "Encounter with a Japanese volcanic mineral technology – a concentrated, ionic sulfate mineral solution produced from black mica / volcanic-origin rock. Realizing this isn't 'just another salt' but a structured cluster of ionic minerals with strong clarifying effects.",
      icon: "💎",
      side: "right"
    },
    {
      phase: "EXPERIMENTS",
      title: "The First Jars – Watching Water Respond",
      content: "Kitchen table experiments begin. Testing tap water, filtered water, bottled mineral water. Observing visible flocculation, sediment formation, clarification over time. Noting dosage ranges and building photo documentation.",
      icon: "🔬",
      side: "left"
    },
    {
      phase: "INTENTION",
      title: "Defining What Andara Should Be",
      content: "The ethical firewall crystallizes: not medicine, not detox cure, not disease solution – but a water clarification & conditioning mineral system. Three pillars emerge: Product, Science Library, and AI-assisted Knowledge Base.",
      icon: "🎯",
      side: "right"
    },
    {
      phase: "PRODUCT",
      title: "Giving the Mineral a Bottle",
      content: "Creating the 100ml 'Blue' bottle for personal use and the 1L 'Pure' bottle for families and practitioners. Developing clear dilution tables, usage guides, and transparent per-liter cost displays.",
      icon: "💧",
      side: "left"
    },
    {
      phase: "LIBRARY",
      title: "Building the Science Library",
      content: "Constructing a comprehensive educational resource: Water Science (structured water, EZ water, pH, ORP), Mineral Science (ionic vs colloidal, sulfate chemistry), Terrain & Bioelectricity (voltage, detox pathways, liquid crystal resonance).",
      icon: "📚",
      side: "right"
    },
    {
      phase: "AI CMS",
      title: "Andara Library – Living Knowledge System",
      content: "Building an AI-assisted CMS that understands the sitemap, science pillars, visual language, and content zones. A RAG brain connecting PDFs, notes, science, and usage guides. Generating consistent, terrain-oriented explanations.",
      icon: "🧠",
      side: "left"
    },
    {
      phase: "TRUST",
      title: "Making It Real – Bottles, Labs & Shipping",
      content: "Setting up EU production & logistics, Bali/Indonesia base. Protective packaging for glass and light-sensitive contents. Lab methods, certificates, quality documentation. Transparent sulfate ranges and heavy metal standards.",
      icon: "✅",
      side: "right"
    },
    {
      phase: "NOW",
      title: "A Living Project, Not a Finished Story",
      content: "Today Andara Ionic stands as: a concentrated ionic sulfate mineral product line, a growing Science Library, and an AI-powered knowledge base that keeps evolving. No promises, no silver bullets – just focus on water quality, mineral intelligence, and terrain-based thinking.",
      icon: "🌊",
      side: "left"
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Andara Ionic Timeline – From First Drops to a Living Water Library</title>
        <meta name="description" content="Follow the Andara Ionic timeline from volcanic mineral discovery and water experiments to a modern science library and AI-supported knowledge system – all built around one core question: how can we give water a smarter mineral environment?" />
        <meta name="keywords" content="andara ionic timeline, andara history, andara milestones, volcanic mineral water story, structured water journey, brand timeline" />
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
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#041410] to-[#020617]" />
            <div className="absolute top-1/4 left-1/3 w-96 h-96 blur-[150px] rounded-full" style={{ backgroundColor: `${accentColor}12` }} />
            <div className="absolute bottom-1/3 right-1/4 w-72 h-72 blur-[100px] rounded-full" style={{ backgroundColor: "#f59e0b15" }} />
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
                <span>Brand Story · Timeline</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] mb-6">
                The Andara <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${accentGradient} bg-[length:200%_auto] animate-gradient`}>
                  Timeline
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-4 max-w-2xl mx-auto">
                <strong className="text-white">From First Drops to a Living Water Library</strong>
              </p>
              <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-2xl mx-auto">
                Andara Ionic did not start as a "product idea". It started as a question:
                <em className="text-white/80"> What happens when you bring volcanic ionic sulfate minerals and modern water science together?</em>
              </p>

              <button
                onClick={() => document.getElementById('timeline-start')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 font-bold rounded-lg transition-all hover:scale-105"
                style={{ backgroundColor: accentColor, color: "#020617", boxShadow: `0 0 30px ${accentColor}40` }}
              >
                Explore the Journey
              </button>
            </motion.div>
          </div>

          {/* Video Background */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#020617] to-transparent z-10" />
        </motion.section>


        {/* --- TIMELINE SECTION --- */}
        <section id="timeline-start" className="section relative z-10 py-24">
          <div className="container px-4 max-w-5xl mx-auto">
            {/* Central Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent hidden md:block" />

            <div className="space-y-16 md:space-y-24">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.phase}
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${milestone.side === 'right' ? 'md:flex-row-reverse' : ''}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUp}
                >
                  {/* Content */}
                  <div className={`${milestone.side === 'right' ? 'md:col-start-2' : 'md:col-start-1'} ${milestone.side === 'right' ? 'md:text-left' : 'md:text-right'}`}>
                    <div className={`p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm ${milestone.side === 'right' ? '' : 'md:ml-auto'} max-w-lg`}>
                      <div className="flex items-center gap-3 mb-4" style={{ flexDirection: milestone.side === 'right' ? 'row' : 'row-reverse' }}>
                        <span className="text-3xl">{milestone.icon}</span>
                        <span className="font-mono text-xs tracking-widest" style={{ color: accentColor }}>{milestone.phase}</span>
                      </div>
                      <h3 className="text-xl text-white font-medium mb-3">{milestone.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{milestone.content}</p>
                    </div>
                  </div>

                  {/* Center Node - Desktop */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-2 items-center justify-center z-10"
                    style={{ backgroundColor: "#020617", borderColor: accentColor }}>
                    <span className="text-sm font-bold" style={{ color: accentColor }}>{index + 1}</span>
                  </div>

                  {/* Spacer for grid alignment */}
                  <div className={`hidden md:block ${milestone.side === 'right' ? 'md:col-start-1' : 'md:col-start-2'}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* --- CLOSING SECTION --- */}
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
                The Journey Continues
              </h2>

              <p className="text-white/70 text-lg leading-relaxed mb-12">
                If you want to continue along this timeline with us, the next steps are simple:
                <strong className="text-white"> learn, observe your water, and – if it resonates –
                  experiment carefully with clarified, mineral-informed water in your own life.</strong>
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/what-is-andara-ionic">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/50 transition-all group">
                    <span className="text-white group-hover:text-emerald-400 transition-colors">Learn the Core Concept →</span>
                    <p className="text-white/50 text-sm mt-2">What is Andara Ionic?</p>
                  </a>
                </Link>
                <Link href="/vision-mission">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/50 transition-all group">
                    <span className="text-white group-hover:text-emerald-400 transition-colors">Vision & Mission →</span>
                    <p className="text-white/50 text-sm mt-2">Why Andara exists</p>
                  </a>
                </Link>
                <Link href="/science-library">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/50 transition-all group">
                    <span className="text-white group-hover:text-emerald-400 transition-colors">Science Library →</span>
                    <p className="text-white/50 text-sm mt-2">Water, minerals & crystalline fields</p>
                  </a>
                </Link>
                <Link href="/andara-ionic-100ml">
                  <a className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/50 transition-all group">
                    <span className="text-white group-hover:text-emerald-400 transition-colors">Start with 100ml →</span>
                    <p className="text-white/50 text-sm mt-2">Your first bottle</p>
                  </a>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
