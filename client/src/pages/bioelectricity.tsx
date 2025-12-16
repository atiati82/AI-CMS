import React from "react";
import { motion, MotionConfig } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeUpContainer = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const fadeChild = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function BioelectricityPage() {
  return (
    <Layout>
      <MotionConfig transition={{ duration: 0.7, ease: "easeOut" }}>
        <main
          id="andara-bioelectricity"
          className="andara-page andara-page--science"
          aria-label="Bioelectricity – The Invisible Voltage System"
        >
          {/* HERO – BIOELECTRICITY */}
          <motion.section
            id="bioelectricity-hero"
            className="andara-hero andara-hero--primary"
            aria-label="Bioelectricity main introduction"
            initial="hidden"
            animate="visible"
            variants={fadeUpContainer}
          >
            <div className="andara-hero__inner">
              <header className="andara-hero__content">
                <motion.p className="andara-hero__label" variants={fadeChild}>
                  Science Library · Bioelectric Terrain · Voltage &amp; Regeneration
                </motion.p>

                <motion.h1 className="andara-hero__headline" variants={fadeChild}>
                  Bioelectricity: The Invisible Voltage System That Shapes Regeneration, Terrain, and Life
                </motion.h1>

                <motion.p className="andara-hero__subline" variants={fadeChild}>
                  <span className="andara-text-lead">
                    Underneath chemistry, hormones, and lab values, every living system runs on a quiet,
                    continuous flow of <strong>bioelectric charge</strong>.
                  </span>{" "}
                  It is the <strong>voltage architecture</strong> that tells cells where they belong, how they repair,
                  and when to organise into a coherent whole.{" "}
                  When we talk about terrain, we're really talking about the <strong>quality of this invisible field</strong>.
                </motion.p>

                <motion.ul className="andara-hero__bullets" variants={fadeUpContainer}>
                  <motion.li variants={fadeChild}>
                    <strong>Voltage as a blueprint:</strong> patterns of charge that guide <strong>growth, orientation, and repair</strong>.
                  </motion.li>
                  <motion.li variants={fadeChild}>
                    <strong>Ion currents &amp; proton gradients:</strong> the micro-currents that <strong>feed mitochondria and cell voltage</strong>.
                  </motion.li>
                  <motion.li variants={fadeChild}>
                    <strong>Water &amp; minerals as wiring:</strong> structured water and ionic minerals acting as{" "}
                    <strong>the living conductor of the bioelectric field</strong>.
                  </motion.li>
                </motion.ul>
              </header>

              <motion.figure className="andara-hero__media" variants={fadeChild}>
                <motion.div
                  className="andara-hero__media-placeholder"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: [1, 1.03, 1] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                >
                  <p>
                    [Hero visual: luminous human silhouette in deep indigo space, surrounded by soft turquoise and gold
                    field lines. Currents flow along fascia-like lines and meridian-like paths, with hexagonal light
                    patterns around the heart and brain, hinting at structured water and mineral matrices.]
                  </p>
                </motion.div>
                <motion.figcaption className="andara-hero__media-caption" variants={fadeChild}>
                  Life is not only biochemical – it is also electrical. Voltage, ions, and fields form an invisible map
                  that shapes regeneration and terrain.
                </motion.figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/* SECTION – WHAT IS BIOELECTRICITY? */}
          <motion.section
            id="bioelectricity-what-is-it"
            className="andara-section andara-section--what-it-is"
            aria-label="What is bioelectricity"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  What Is Bioelectricity – in Simple Language?
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    Bioelectricity is the <strong>flow of charged particles</strong> – mainly ions and electrons –
                    through <strong>living tissues</strong>.
                  </span>{" "}
                  It shows up as <strong>membrane potentials</strong>, <strong>voltage gradients</strong>,
                  and <strong>field patterns</strong> that quietly instruct cells how to behave, long before symptoms appear.
                </p>
              </header>

              <motion.div className="andara-grid andara-grid--02 andara-section__items" variants={fadeUpContainer}>
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">The Body as a Living Circuit</h3>
                  <p className="andara-grid__text">
                    Every cell membrane is a tiny <strong>capacitor</strong>, storing charge across a thin lipid layer.{" "}
                    Tissues link these micro-capacitors into <strong>circuits and networks</strong>:
                    nerves, fascia, collagen matrices, and structured water form <strong>pathways for current</strong>.
                  </p>
                  <p className="andara-grid__text">
                    When we talk about a <strong>healthy terrain</strong>, we're talking about a
                    <strong> well-ordered electrical environment</strong> where signals are clear,
                    voltages are stable, and flows are coherent.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Voltage as a Hidden Map</h3>
                  <p className="andara-grid__text">
                    Between tissues, there are <strong>voltage gradients</strong> – tiny differences in electric potential.{" "}
                    These gradients act like <strong>navigation beacons</strong>, telling cells where "north" is:
                    where to move, where to grow, where to stop.
                  </p>
                  <p className="andara-grid__text">
                    It's less like a static blueprint and more like a <strong>dynamic, flowing map</strong> that updates constantly
                    with <strong>minerals, water, and movement</strong>.
                  </p>
                </motion.article>
              </motion.div>

              <motion.figure className="andara-figure andara-figure--diagram" variants={fadeChild}>
                <div className="andara-figure__visual">
                  <p>
                    [Infographic idea: a simple diagram showing:
                    (1) individual cell with membrane potential,
                    (2) cluster of cells forming a tissue with a voltage gradient arrow,
                    (3) a larger outline of a body with field lines around it.
                    Each level labelled "Cell Voltage", "Tissue Gradient", "Whole-Body Field".]
                  </p>
                </div>
                <figcaption className="andara-figure__caption">
                  From micro-capacitors in the cell membrane to whole-body fields – bioelectricity scales up through the
                  entire terrain.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/* SECTION – CELL VOLTAGE & PROTON GRADIENTS */}
          <motion.section
            id="bioelectricity-cell-voltage"
            className="andara-section andara-section--cell-voltage"
            aria-label="Cell voltage and proton gradients"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  Cell Voltage, Proton Gradients &amp; the Bioelectric Engine
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    At the cellular level, bioelectricity shows up as <strong>membrane potential</strong> and
                    <strong> proton gradients</strong>.
                  </span>{" "}
                  These are not abstract physics ideas – they're the way cells decide how much
                  <strong> energy, communication, and repair</strong> they can sustain.
                </p>
              </header>

              <motion.div className="andara-grid andara-grid--03 andara-section__items" variants={fadeUpContainer}>
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Membrane Potential – The Cell's Battery</h3>
                  <p className="andara-grid__text">
                    Each cell maintains a difference in charge between inside and outside – like a tiny
                    <strong> charged capacitor</strong>.{" "}
                    This voltage is shaped by ions (Na⁺, K⁺, Ca²⁺, Cl⁻, etc.) and determines the cell's
                    <strong> excitability, signalling, and resilience</strong>.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Proton Gradients – The Inner Turbines</h3>
                  <p className="andara-grid__text">
                    Inside mitochondria, <strong>proton gradients</strong> drive the synthesis of ATP – the cell's currency of energy.{" "}
                    These gradients are <strong>electrochemical slopes</strong> that push protons through nano-turbines, turning
                    electrical potential into biochemical work.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Tissues as Bioelectric Landscapes</h3>
                  <p className="andara-grid__text">
                    When you zoom out, clusters of cells form <strong>bioelectric landscapes</strong> – regions of relative
                    high and low voltage.{" "}
                    These landscapes influence how tissues <strong>grow, regenerate, and coordinate</strong>.
                  </p>
                </motion.article>
              </motion.div>

              <motion.figure className="andara-figure andara-figure--graph" variants={fadeChild}>
                <div className="andara-figure__visual">
                  <p>
                    [Graph idea: gentle curve showing "Membrane Potential" on the vertical axis vs "Cell State" on the
                    horizontal axis. Different zones labelled "Undercharged", "Balanced", "Over-excited" to visualise
                    that both extremes can disturb terrain coherence.]
                  </p>
                </div>
                <figcaption className="andara-figure__caption">
                  Cell voltage behaves like a tuning range – too low or too chaotic, and communication becomes noisy.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/* SECTION – WATER, MINERALS & THE WIRING OF LIFE */}
          <motion.section
            id="bioelectricity-water-minerals"
            className="andara-section andara-section--water-minerals"
            aria-label="Water and minerals as bioelectric wiring"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  Water &amp; Minerals – The Wiring That Carries the Signal
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    Bioelectricity needs <strong>conductors</strong>.
                  </span>{" "}
                  In the body, the main conductors are <strong>structured water</strong> and
                  <strong> ionic minerals</strong>. Together they create a <strong>liquid crystal wiring system</strong> that
                  conducts charge, stores information, and shapes the field.
                </p>
              </header>

              <motion.div className="andara-grid andara-grid--02 andara-section__items" variants={fadeUpContainer}>
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Structured Water – The Liquid Crystal Medium</h3>
                  <p className="andara-grid__text">
                    When water forms more ordered, <strong>liquid crystalline layers</strong> around proteins and membranes,
                    it becomes a better <strong>conductor and memory medium</strong>.{" "}
                    These interfacial layers can hold charge, respond to light, and behave like a
                    <strong> dynamic storage buffer</strong> for bioelectric patterns.
                  </p>
                  <p className="andara-grid__text">
                    This is one reason why the <strong>quality and structure of water</strong> in the terrain matters,
                    not just its purity.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Ionic Sulfate Minerals – The Conductive Code</h3>
                  <p className="andara-grid__text">
                    Minerals in <strong>ionic sulfate form</strong> provide charged building blocks that
                    <strong> support conductivity, buffering, and charge separation</strong>.{" "}
                    Sulfate bridges, multivalent ions, and trace elements help shape how water
                    <strong> organises, clarifies, and carries current</strong>.
                  </p>
                  <p className="andara-grid__text">
                    In the Andara universe, these ionic sulfate minerals are the <strong>primordial language</strong> we use to
                    speak to water and its bioelectric functions.
                  </p>
                </motion.article>
              </motion.div>

              <motion.figure className="andara-figure andara-figure--wiring" variants={fadeChild}>
                <div className="andara-figure__visual">
                  <p>
                    [Infographic idea: layered illustration:
                    (1) hexagonal water layers around a protein,
                    (2) ions (sulfate, magnesium, etc.) interspersed as nodes,
                    (3) arrows showing current flowing along this hydrated matrix.
                    Caption labels: "Structured Water", "Ionic Sulfate Minerals", "Charge Flow".]
                  </p>
                </div>
                <figcaption className="andara-figure__caption">
                  Structured water plus ionic minerals form a living wiring system – not copper cables, but a liquid crystal circuit.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/* SECTION – BIOELECTRIC TERRAIN VS BIOCHEMICAL VIEW */}
          <motion.section
            id="bioelectricity-terrain"
            className="andara-section andara-section--terrain"
            aria-label="Bioelectric terrain perspective"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  Bioelectric Terrain vs. Purely Biochemical Thinking
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    Conventional thinking often starts with <strong>molecules and reactions</strong>.
                  </span>{" "}
                  The bioelectric terrain view asks: <strong>what field are these molecules moving in?</strong>{" "}
                  Is the underlying voltage system <strong>coherent, fragmented, or suffocated</strong>?
                </p>
              </header>

              <motion.div className="andara-grid andara-grid--02 andara-section__items" variants={fadeUpContainer}>
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">The Biochemical Lens</h3>
                  <p className="andara-grid__text">
                    Focuses on <strong>hormones, enzymes, receptors, nutrients, and pathways</strong>.{" "}
                    This view is precise and useful, but often <strong>localised</strong> – it sees
                    reactions in isolation.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">The Bioelectric Terrain Lens</h3>
                  <p className="andara-grid__text">
                    Asks: <strong>what is the charge environment these molecules live in?</strong>{" "}
                    It looks at voltage, gradients, and field coherence, seeing the body more like
                    a <strong>self-organising electrical ecosystem</strong>.
                  </p>
                </motion.article>
              </motion.div>

              <motion.div className="andara-highlight-box andara-highlight-box--compare" variants={fadeChild}>
                <p className="andara-highlight-box__text">
                  In practice, <strong>both lenses matter</strong>.{" "}
                  The Andara project chooses to start from the <strong>field-first perspective</strong>:
                  cleaning and informing water, supporting ionic balance, and honouring the
                  <strong> bioelectric architecture</strong> beneath the biochemical noise.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* SECTION – USE CASE SCENARIOS */}
          <motion.section
            id="bioelectricity-use-cases"
            className="andara-section andara-section--use-cases"
            aria-label="Bioelectric perspective – use scenarios"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  How a Bioelectric Perspective Can Be Applied – Without Making Claims
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    Looking through a voltage-first lens doesn't mean treating anything – it means
                    <strong> changing how we organise our decisions</strong>.
                  </span>{" "}
                  Below are examples of how people and spaces can <strong>work with bioelectric principles</strong> in a
                  <strong> non-medical, terrain-focused way</strong>.
                </p>
              </header>

              <motion.div className="andara-grid andara-grid--03 andara-section__items" variants={fadeUpContainer}>
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">1. Water Environments</h3>
                  <p className="andara-grid__text">
                    Creating daily water that is <strong>clean, structured, and mineral-informed</strong> so the terrain
                    has a more <strong>coherent medium</strong> to work with.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">2. Spaces &amp; Architecture</h3>
                  <p className="andara-grid__text">
                    Designing homes, studios, and retreats around <strong>light, EMF, grounding, and water placement</strong>
                    to support a <strong>stable field environment</strong>.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">3. Practices &amp; Protocols</h3>
                  <p className="andara-grid__text">
                    Linking movement, breath, and rest with attention to <strong>hydration quality, mineral intake, and
                      field exposure</strong>, viewing them as inputs to the <strong>bioelectric terrain</strong>.
                  </p>
                </motion.article>
              </motion.div>

              <motion.div className="andara-highlight-box andara-highlight-box--disclaimer" variants={fadeChild}>
                <p className="andara-highlight-box__text">
                  The ideas described here are <strong>educational and exploratory</strong>.{" "}
                  They are not medical advice, not a diagnosis, and not a treatment plan.{" "}
                  They simply offer a <strong>different way to think about terrain, water, and minerals</strong> in daily life.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* SECTION – SIMPLE TIMELINE: FROM VOLTAGE CHAOS TO COHERENCE */}
          <motion.section
            id="bioelectricity-coherence-timeline"
            className="andara-section andara-section--timeline"
            aria-label="Bioelectric coherence timeline"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  From Noise to Coherence – A Simple Bioelectric Storyboard
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    You can imagine bioelectric health as a journey from <strong>noisy, fragmented signals</strong>
                    toward <strong>clear, stable patterns</strong>.
                  </span>{" "}
                  This storyboard is not a diagnosis – it's a visual metaphor for how terrain can feel when its
                  <strong> water, minerals, and fields</strong> become more organised.
                </p>
              </header>

              <motion.div className="andara-grid andara-grid--timeline andara-section__items" variants={fadeUpContainer}>
                <motion.article className="andara-grid__item andara-grid__item--step" variants={fadeChild}>
                  <div className="andara-grid__step-number">1</div>
                  <h3 className="andara-grid__title">Fragmented Signals</h3>
                  <p className="andara-grid__text">
                    Water is <strong>chemically burdened</strong>, minerals are <strong>scattered or missing</strong>,
                    and fields are full of <strong>noise</strong>.{" "}
                    Bioelectric patterns feel <strong>chaotic and reactive</strong>.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item andara-grid__item--step" variants={fadeChild}>
                  <div className="andara-grid__step-number">2</div>
                  <h3 className="andara-grid__title">Clearing the Medium</h3>
                  <p className="andara-grid__text">
                    Filtration, clarification, and grounding begin.{" "}
                    Water becomes <strong>clearer</strong>, and the background noise in the field <strong>softens</strong>.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item andara-grid__item--step" variants={fadeChild}>
                  <div className="andara-grid__step-number">3</div>
                  <h3 className="andara-grid__title">Structured &amp; Informed Water</h3>
                  <p className="andara-grid__text">
                    Structured water and <strong>ionic minerals</strong> bring <strong>charge separation,
                      buffering, and organisation</strong> into the terrain.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item andara-grid__item--step" variants={fadeChild}>
                  <div className="andara-grid__step-number">4</div>
                  <h3 className="andara-grid__title">Coherent Bioelectric Field</h3>
                  <p className="andara-grid__text">
                    Signals travel with more <strong>clarity</strong>, gradients are <strong>stable</strong>,
                    and the terrain behaves more like a <strong>coordinated whole</strong> than a collection of parts.
                  </p>
                </motion.article>
              </motion.div>

              <motion.figure className="andara-figure andara-figure--timeline" variants={fadeChild}>
                <div className="andara-figure__visual">
                  <p>
                    [Timeline visual: 4 panels from left to right:
                    (1) chaotic waveforms and noisy fields,
                    (2) water droplet + filter icon,
                    (3) hexagonal water + ionic nodes,
                    (4) smooth field lines around a human silhouette.
                    A gentle glowing line connects them all.]
                  </p>
                </div>
                <figcaption className="andara-figure__caption">
                  A metaphorical journey: from noisy, chaotic terrain toward a more coherent bioelectric field.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/* SECTION – CROSS-LINK: ANDARA IONIC & BIOELECTRIC VIEW */}
          <motion.section
            id="bioelectricity-andara-link"
            className="andara-section andara-section--product-link"
            aria-label="Linking Andara Ionic to bioelectric terrain perspective"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  Where Andara Ionic Fits Into This Bioelectric Picture
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    Andara Ionic does not "treat" anything.
                  </span>{" "}
                  Its role in the Andara universe is simple:
                  <strong> provide a precise, volcanic ionic sulfate mineral code</strong> that helps water become a more
                  <strong> clear, structured, and conductive medium</strong>.
                </p>
              </header>

              <motion.div className="andara-grid andara-grid--02 andara-section__items" variants={fadeUpContainer}>
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Clarifying &amp; Conditioning Water</h3>
                  <p className="andara-grid__text">
                    A micro-dose of Andara Ionic, within a defined sulfate band, can <strong>clarify and condition water</strong>,
                    reorganising impurities and supporting a more <strong>ordered charge environment</strong>.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Supporting the Terrain Medium</h3>
                  <p className="andara-grid__text">
                    In a bioelectric view, this means tending to the <strong>medium</strong> that carries signals, rather than
                    chasing each signal separately.{" "}
                    Clearer, better-organised water is one ingredient in a <strong>more coherent bioelectric terrain</strong>.
                  </p>
                </motion.article>
              </motion.div>

              <motion.div className="andara-highlight-box andara-highlight-box--cta" variants={fadeChild}>
                <p className="andara-highlight-box__text">
                  To see how Andara Ionic is described as a product – with full disclaimers, dosing examples, and pricing –
                  visit the <Link href="/shop/andara-ionic-100ml">100&nbsp;ml</Link> or{" "}
                  <Link href="/shop/andara-ionic-1l">1&nbsp;L</Link> product pages.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* SECTION – FAQ */}
          <motion.section
            id="bioelectricity-faq"
            className="andara-section andara-section--faq"
            aria-label="Bioelectricity frequently asked questions"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  Bioelectric Terrain – Gentle Clarifications
                </h2>
                <p className="andara-section__subline">
                  A few common questions – answered from a <strong>terrain-first, non-medical</strong> viewpoint.
                </p>
              </header>

              <motion.div className="andara-faq" variants={fadeUpContainer}>
                <motion.article className="andara-faq__item" variants={fadeChild}>
                  <h3 className="andara-faq__question">
                    Is bioelectricity the same as the nervous system?
                  </h3>
                  <p className="andara-faq__answer">
                    The nervous system is one <strong>expression</strong> of bioelectricity, but not the only one.{" "}
                    Voltage gradients exist around <strong>wounds, organs, fascia, and entire body regions</strong> – even beyond
                    classical nerves.{" "}
                    The terrain perspective looks at all of these <strong>field expressions together</strong>.
                  </p>
                </motion.article>

                <motion.article className="andara-faq__item" variants={fadeChild}>
                  <h3 className="andara-faq__question">
                    Does this replace conventional medical care?
                  </h3>
                  <p className="andara-faq__answer">
                    No.{" "}
                    A bioelectric view is a <strong>complementary map</strong>, not a substitute for care, diagnosis, or treatment.{" "}
                    It offers <strong>language and models</strong> for understanding the role of water, minerals, and fields
                    in terrain – not prescriptions.
                  </p>
                </motion.article>

                <motion.article className="andara-faq__item" variants={fadeChild}>
                  <h3 className="andara-faq__question">
                    Can I measure my own bioelectric terrain at home?
                  </h3>
                  <p className="andara-faq__answer">
                    Certain aspects <strong>can be explored</strong> – e.g. tracking pH/ORP/EC of water, experimenting with
                    grounding and light exposure, or observing responses to environment.{" "}
                    Other aspects require <strong>specialised equipment or research contexts</strong>.{" "}
                    The Andara Library focuses on <strong>education, not devices</strong>.
                  </p>
                </motion.article>
              </motion.div>
            </div>
          </motion.section>

          {/* SECTION – SCIENCE LIBRARY FOOTER */}
          <motion.section
            id="bioelectricity-science-footer"
            className="andara-section andara-section--library-footer"
            aria-label="Science Library navigation footer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  Continue Exploring the Andara Science Library
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    Bioelectricity is one pillar in a bigger architecture.
                  </span>{" "}
                  Water, minerals, crystalline geometry, and terrain all <strong>interlock like a living circuit</strong>.{" "}
                  Follow whichever thread is calling you next.
                </p>
              </header>

              <motion.div
                className="andara-grid andara-grid--04 andara-grid--library-footer andara-section__items"
                aria-label="Science Library pillars"
                variants={fadeUpContainer}
              >
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Water Science</h3>
                  <p className="andara-grid__text">
                    Structured water, EZ layers, pH/ORP/EC – the liquid crystal side of the terrain.
                  </p>
                  <p className="andara-grid__link">
                    <Link href="/science/water">Go to Water Science →</Link>
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Mineral Science</h3>
                  <p className="andara-grid__text">
                    Ocean vs plant vs fulvic vs salt vs mica – and why ionic sulfate minerals are unique.
                  </p>
                  <p className="andara-grid__link">
                    <Link href="/science/minerals">Go to Mineral Science →</Link>
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Crystalline Matrix</h3>
                  <p className="andara-grid__text">
                    Geometry, lattices, and the mineral-light matrix behind coherence.
                  </p>
                  <p className="andara-grid__link">
                    <Link href="/science/crystalline-matrix">Go to Crystalline Matrix →</Link>
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Terrain &amp; Regeneration</h3>
                  <p className="andara-grid__text">
                    How these pillars interact when we look at regeneration as a field phenomenon.
                  </p>
                  <p className="andara-grid__link">
                    <Link href="/science/terrain-regeneration">Go to Terrain &amp; Regeneration →</Link>
                  </p>
                </motion.article>
              </motion.div>

              <motion.div className="andara-highlight-box andara-highlight-box--neural-footer" variants={fadeChild}>
                <p className="andara-highlight-box__text">
                  The <strong>Andara Library Engine</strong> links all these pages through
                  <strong> deep, semantic connections</strong> – so whichever pillar you choose, you can always
                  find your way back to the full circuit.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* FINAL CTA */}
          <motion.section
            id="bioelectricity-final-cta"
            className="andara-section andara-section--final-cta"
            aria-label="Final call to action"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <div className="andara-final-cta__content">
                <h2 className="andara-final-cta__headline">
                  When you change the field, you change the conversation inside the body.
                </h2>
                <p className="andara-final-cta__text">
                  If this way of seeing life <strong>resonates</strong> with you, begin with something simple:
                  <strong> the water you drink, the minerals you use, and the spaces you create</strong>.{" "}
                  The bioelectric terrain responds to the <strong>quality of its medium</strong>.
                </p>
                <div className="andara-final-cta__cta-group">
                  <Link
                    href="/shop"
                    className="andara-final-cta__cta andara-final-cta__cta--primary"
                  >
                    Explore Andara Ionic Formats
                  </Link>
                  <Link
                    href="/science"
                    className="andara-final-cta__cta andara-final-cta__cta--ghost"
                  >
                    Or keep exploring the science
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        </main>
      </MotionConfig>
    </Layout>
  );
}
