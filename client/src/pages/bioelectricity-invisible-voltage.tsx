
import React from "react";
import { motion, MotionConfig, type Easing, type Variants } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";

/*
ANDARA VISUAL CONFIG:
pageId: "bioelectricity-invisible-voltage"
cluster: "Science Library · Bioelectric Terrain"
priority: "P1"
vibeKeywords: [
  "bioelectric grid",
  "auric field",
  "ion currents",
  "liquid crystal body",
  "cosmic nervous system",
  "deep indigo",
  "electric turquoise",
  "soft gold accents"
]
emotionalTone: [
  "revelation",
  "awe",
  "inner-recognition",
  "calm power",
  "precision",
  "future-organic"
]
animationIdeas: [
  "slowly pulsing field lines around a human silhouette",
  "glowing pathways along fascia-like lines when scrolling",
  "subtle particle flows moving along gradient lines",
  "hover: cards reveal tiny sparks along edges",
  "timeline: voltage pulses moving from left to right",
  "background: faint moving field geometry"
]
aiImagePromptHero: "A stylized human silhouette made of soft light lines, surrounded by gently glowing field lines and ion streams, standing in a dark indigo space. Fine turquoise currents flow along meridian-like paths, with golden nodes marking voltage hubs. In the background: hexagonal and wave-like geometry, hinting at liquid crystal water and minerals. Mood: calm, powerful, scientific yet mystical."
aiVideoPromptHero: "Looped animation of a human outline, viewed from front, with slow-moving electric currents flowing along meridian-like lines and around the body as a softly pulsing field. The surrounding space shows faint, moving hexagonal patterns and waves, representing structured water and bioelectric flow. Motion is slow and meditative, not aggressive."
designerNotes: "This page should feel like opening the 'wiring diagram' behind life. Show voltage, ion flow, and fields in a non-medical, terrain-focused way. Combine scientific diagrams (graphs, gradients, vector flows) with subtle spiritual-electric aesthetics. Use motion to make invisible fields intuitive, not overwhelming."
*/

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeUpContainer = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06 },
  },
};

const fadeChild = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function BioelectricityInvisibleVoltagePage() {
  return (
    <Layout>
      <MotionConfig transition={{ duration: 0.7, ease: "easeOut" as Easing }}>
        <main
          id="andara-bioelectricity"
          className="andara-page andara-page--science"
          aria-label="Bioelectricity – The Invisible Voltage System"
        >
          {/* =========================
               HERO – BIOELECTRICITY
          ========================== */}
          <motion.section
            id="bioelectricity-hero"
            className="andara-hero andara-hero--primary"
            aria-label="Bioelectricity main introduction"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpContainer}
          >
            <div className="andara-hero__inner">
              <header className="andara-hero__content">
                <motion.p className="andara-hero__label" variants={fadeChild}>
                  Science Library · Bioelectric Terrain · Voltage & Regeneration
                </motion.p>
                <motion.h1 className="andara-hero__headline" variants={fadeChild}>
                  Bioelectricity: The Invisible Voltage System That Shapes Regeneration, Terrain, and Life
                </motion.h1>
                <motion.p className="andara-hero__subline" variants={fadeChild}>
                  <span className="andara-text-lead">
                    Underneath chemistry, hormones, and lab values, every living system runs on a quiet,
                    continuous flow of <strong>bioelectric charge</strong>.
                  </span>
                  It is the <strong>voltage architecture</strong> that tells cells where they belong, how they repair,
                  and when to organise into a coherent whole.
                  When we talk about terrain, we’re really talking about the <strong>quality of this invisible field</strong>.
                </motion.p>

                <motion.ul className="andara-hero__bullets" variants={fadeChild}>
                  <li>
                    <strong>Voltage as a blueprint:</strong> patterns of charge that guide <strong>growth, orientation, and repair</strong>.
                  </li>
                  <li>
                    <strong>Ion currents & proton gradients:</strong> the micro-currents that <strong>feed mitochondria and cell voltage</strong>.
                  </li>
                  <li>
                    <strong>Water & minerals as wiring:</strong> structured water and ionic minerals acting as
                    <strong>the living conductor of the bioelectric field</strong>.
                  </li>
                </motion.ul>
              </header>

              <motion.figure className="andara-hero__media" variants={fadeChild}>
                <div className="andara-hero__media-placeholder">
                  <p>
                    [Hero visual: luminous human silhouette in deep indigo space, surrounded by soft turquoise and gold
                    field lines. Currents flow along fascia-like lines and meridian-like paths, with hexagonal light
                    patterns around the heart and brain, hinting at structured water and mineral matrices.]
                  </p>
                </div>
                <figcaption className="andara-hero__media-caption">
                  Life is not only biochemical – it is also electrical. Voltage, ions, and fields form an invisible map
                  that shapes regeneration and terrain.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/*
          REPLIT / MOTION LAYOUT PROMPT – HERO
          - Layout:
            - Two-column hero: text left (~60%), visual right (~40%).
            - Mobile: stack with text first, image second.
          - Motion:
            - Apply `ambient - bioelectric - field` to background: faint moving field lines, very subtle.
            - Text elements use `scroll - fade - up - stagger`.
            - Hero image uses `crystalline - shimmer - slow` + soft breathing scale (1.0 → 1.03).
          - Visual:
            - Colors: deep indigo background, turquoise field lines, soft gold node accents.
            - No medical equipment – purely field, geometry, and living body silhouette.
          */}

          {/* =========================
               SECTION – WHAT IS BIOELECTRICITY?
          ========================== */}
          <motion.section
            id="bioelectricity-what-is-it"
            className="andara-section andara-section--what-it-is"
            aria-label="What is bioelectricity"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpContainer}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <motion.h2 className="andara-section__headline" variants={fadeChild}>
                  What Is Bioelectricity – in Simple Language?
                </motion.h2>
                <motion.p className="andara-section__subline" variants={fadeChild}>
                  <span className="andara-text-lead">
                    Bioelectricity is the <strong>flow of charged particles</strong> – mainly ions and electrons –
                    through <strong>living tissues</strong>.
                  </span>
                  It shows up as <strong>membrane potentials</strong>, <strong>voltage gradients</strong>,
                  and <strong>field patterns</strong> that quietly instruct cells how to behave, long before symptoms appear.
                </motion.p>
              </header>

              <div className="andara-grid andara-grid--02 andara-section__items">
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    The Body as a Living Circuit
                  </h3>
                  <p className="andara-grid__text">
                    Every cell membrane is a tiny <strong>capacitor</strong>, storing charge across a thin lipid layer.
                    Tissues link these micro-capacitors into <strong>circuits and networks</strong>:
                    nerves, fascia, collagen matrices, and structured water form <strong>pathways for current</strong>.
                  </p>
                  <p className="andara-grid__text">
                    When we talk about a <strong>healthy terrain</strong>, we’re talking about a
                    <strong>well-ordered electrical environment</strong> where signals are clear,
                    voltages are stable, and flows are coherent.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    Voltage as a Hidden Map
                  </h3>
                  <p className="andara-grid__text">
                    Between tissues, there are <strong>voltage gradients</strong> – tiny differences in electric potential.
                    These gradients act like <strong>navigation beacons</strong>, telling cells where “north” is:
                    where to move, where to grow, where to stop.
                  </p>
                  <p className="andara-grid__text">
                    It’s less like a static blueprint and more like a <strong>dynamic, flowing map</strong> that updates constantly
                    with <strong>minerals, water, and movement</strong>.
                  </p>
                </motion.article>
              </div>

              <motion.figure className="andara-figure andara-figure--diagram" variants={fadeChild}>
                <div className="andara-figure__visual">
                  <p>
                    [Infographic idea: a simple diagram showing:
                    (1) individual cell with membrane potential,
                    (2) cluster of cells forming a tissue with a voltage gradient arrow,
                    (3) a larger outline of a body with field lines around it.
                    Each level labelled “Cell Voltage”, “Tissue Gradient”, “Whole-Body Field”.]
                  </p>
                </div>
                <figcaption className="andara-figure__caption">
                  From micro-capacitors in the cell membrane to whole-body fields – bioelectricity scales up through the
                  entire terrain.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/*
          REPLIT / MOTION LAYOUT PROMPT – WHAT IS IT
          - Layout:
            - Two-column text explaining circuit + map.
            - Diagram below as a centered figure.
          - Motion:
            - Columns: `scroll - fade - up - stagger`.
            - Diagram: `scroll - fade - up` with soft glow around it.
          - Visual:
            - Use simple vector-like icons and arrows to keep the concept clear.
          */}

          {/* =========================
               SECTION – CELL VOLTAGE & PROTON GRADIENTS
          ========================== */}
          <motion.section
            id="bioelectricity-cell-voltage"
            className="andara-section andara-section--cell-voltage"
            aria-label="Cell voltage and proton gradients"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpContainer}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <motion.h2 className="andara-section__headline" variants={fadeChild}>
                  Cell Voltage, Proton Gradients & the Bioelectric Engine
                </motion.h2>
                <motion.p className="andara-section__subline" variants={fadeChild}>
                  <span className="andara-text-lead">
                    At the cellular level, bioelectricity shows up as <strong>membrane potential</strong> and
                    <strong>proton gradients</strong>.
                  </span>
                  These are not abstract physics ideas – they’re the way cells decide how much
                  <strong>energy, communication, and repair</strong> they can sustain.
                </motion.p>
              </header>

              <div className="andara-grid andara-grid--03 andara-section__items">
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    Membrane Potential – The Cell’s Battery
                  </h3>
                  <p className="andara-grid__text">
                    Each cell maintains a difference in charge between inside and outside – like a tiny
                    <strong>charged capacitor</strong>.
                    This voltage is shaped by ions (Na⁺, K⁺, Ca²⁺, Cl⁻, etc.) and determines the cell’s
                    <strong>excitability, signalling, and resilience</strong>.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    Proton Gradients – The Inner Turbines
                  </h3>
                  <p className="andara-grid__text">
                    Inside mitochondria, <strong>proton gradients</strong> drive the synthesis of ATP – the cell’s currency of energy.
                    These gradients are <strong>electrochemical slopes</strong> that push protons through nano-turbines, turning
                    electrical potential into biochemical work.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    Tissues as Bioelectric Landscapes
                  </h3>
                  <p className="andara-grid__text">
                    When you zoom out, clusters of cells form <strong>bioelectric landscapes</strong> – regions of relative
                    high and low voltage.
                    These landscapes influence how tissues <strong>grow, regenerate, and coordinate</strong>.
                  </p>
                </motion.article>
              </div>

              <motion.figure className="andara-figure andara-figure--graph" variants={fadeChild}>
                <div className="andara-figure__visual">
                  <p>
                    [Graph idea: gentle curve showing “Membrane Potential” on the vertical axis vs “Cell State” on the
                    horizontal axis. Different zones labelled “Undercharged”, “Balanced”, “Over-excited” to visualise
                    that both extremes can disturb terrain coherence.]
                  </p>
                </div>
                <figcaption className="andara-figure__caption">
                  Cell voltage behaves like a tuning range – too low or too chaotic, and communication becomes noisy.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/*
          REPLIT / MOTION LAYOUT PROMPT – CELL VOLTAGE
          - Layout:
            - 3 horizontal cards, then a simple graph figure.
          - Motion:
            - Cards: `scroll - fade - up - stagger`.
            - Graph: `scroll - fade - up` with small dot moving along curve on scroll (optional).
          - Visual:
            - Use clean line art / vector icons: battery, turbine, landscape.
          */}

          {/* =========================
               SECTION – WATER, MINERALS & THE WIRING OF LIFE
          ========================== */}
          <motion.section
            id="bioelectricity-water-minerals"
            className="andara-section andara-section--water-minerals"
            aria-label="Water and minerals as bioelectric wiring"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpContainer}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <motion.h2 className="andara-section__headline" variants={fadeChild}>
                  Water & Minerals – The Wiring That Carries the Signal
                </motion.h2>
                <motion.p className="andara-section__subline" variants={fadeChild}>
                  <span className="andara-text-lead">
                    Bioelectricity needs <strong>conductors</strong>.
                  </span>
                  In the body, the main conductors are <strong>structured water</strong> and
                  <strong>ionic minerals</strong>. Together they create a <strong>liquid crystal wiring system</strong> that
                  conducts charge, stores information, and shapes the field.
                </motion.p>
              </header>

              <div className="andara-grid andara-grid--02 andara-section__items">
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    Structured Water – The Liquid Crystal Medium
                  </h3>
                  <p className="andara-grid__text">
                    When water forms more ordered, <strong>liquid crystalline layers</strong> around proteins and membranes,
                    it becomes a better <strong>conductor and memory medium</strong>.
                    These interfacial layers can hold charge, respond to light, and behave like a
                    <strong>dynamic storage buffer</strong> for bioelectric patterns.
                  </p>
                  <p className="andara-grid__text">
                    This is one reason why the <strong>quality and structure of water</strong> in the terrain matters,
                    not just its purity.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    Ionic Sulfate Minerals – The Conductive Code
                  </h3>
                  <p className="andara-grid__text">
                    Minerals in <strong>ionic sulfate form</strong> provide charged building blocks that
                    <strong>support conductivity, buffering, and charge separation</strong>.
                    Sulfate bridges, multivalent ions, and trace elements help shape how water
                    <strong>organises, clarifies, and carries current</strong>.
                  </p>
                  <p className="andara-grid__text">
                    In the Andara universe, these ionic sulfate minerals are the <strong>primordial language</strong> we use to
                    speak to water and its bioelectric functions.
                  </p>
                </motion.article>
              </div>

              <motion.figure className="andara-figure andara-figure--wiring" variants={fadeChild}>
                <div className="andara-figure__visual">
                  <p>
                    [Infographic idea: layered illustration:
                    (1) hexagonal water layers around a protein,
                    (2) ions (sulfate, magnesium, etc.) interspersed as nodes,
                    (3) arrows showing current flowing along this hydrated matrix.
                    Caption labels: “Structured Water”, “Ionic Sulfate Minerals”, “Charge Flow”.]
                  </p>
                </div>
                <figcaption className="andara-figure__caption">
                  Structured water plus ionic minerals form a living wiring system – not copper cables, but a liquid crystal circuit.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/*
          REPLIT / MOTION LAYOUT PROMPT – WATER & MINERALS
          - Layout:
            - Two explanatory columns + one central wiring infographic.
          - Motion:
            - `scroll - fade - up - stagger` for text.
            - Infographic uses `ambient - crystalline - shimmer` with subtle line pulses following the arrows.
          - Visual:
            - Show water layers, ions as nodes, and arrows for current – keep it simple, not cluttered.
          */}

          {/* =========================
               SECTION – BIOELECTRIC TERRAIN VS BIOCHEMICAL VIEW
          ========================== */}
          <motion.section
            id="bioelectricity-terrain"
            className="andara-section andara-section--terrain"
            aria-label="Bioelectric terrain perspective"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpContainer}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <motion.h2 className="andara-section__headline" variants={fadeChild}>
                  Bioelectric Terrain vs. Purely Biochemical Thinking
                </motion.h2>
                <motion.p className="andara-section__subline" variants={fadeChild}>
                  <span className="andara-text-lead">
                    Conventional thinking often starts with <strong>molecules and reactions</strong>.
                  </span>
                  The bioelectric terrain view asks: <strong>what field are these molecules moving in?</strong>
                  Is the underlying voltage system <strong>coherent, fragmented, or suffocated</strong>?
                </motion.p>
              </header>

              <div className="andara-grid andara-grid--02 andara-section__items">
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    The Biochemical Lens
                  </h3>
                  <p className="andara-grid__text">
                    Focuses on <strong>hormones, enzymes, receptors, nutrients, and pathways</strong>.
                    This view is precise and useful, but often <strong>localised</strong> – it sees
                    reactions in isolation.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    The Bioelectric Terrain Lens
                  </h3>
                  <p className="andara-grid__text">
                    Asks: <strong>what is the charge environment these molecules live in?</strong>
                    It looks at voltage, gradients, and field coherence, seeing the body more like
                    a <strong>self-organising electrical ecosystem</strong>.
                  </p>
                </motion.article>
              </div>

              <motion.div className="andara-highlight-box andara-highlight-box--compare" variants={fadeChild}>
                <p className="andara-highlight-box__text">
                  In practice, <strong>both lenses matter</strong>.
                  The Andara project chooses to start from the <strong>field-first perspective</strong>:
                  cleaning and informing water, supporting ionic balance, and honouring the
                  <strong>bioelectric architecture</strong> beneath the biochemical noise.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/*
          REPLIT / MOTION LAYOUT PROMPT – TERRAIN VS BIOCHEMICAL
          - Layout:
            - Two comparison cards + one highlight box.
          - Motion:
            - `scroll - fade - up - stagger` on the two cards.
            - Highlight box uses `scroll - fade - up` + subtle glow border.
          - Visual:
            - Icons: beaker/chemical vs field/gradient to show two perspectives.
          */}

          {/* =========================
               SECTION – USE CASE SCENARIOS (NON-MEDICAL, TERRAIN FOCUSED)
          ========================== */}
          <motion.section
            id="bioelectricity-use-cases"
            className="andara-section andara-section--use-cases"
            aria-label="Bioelectric perspective – use scenarios"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpContainer}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <motion.h2 className="andara-section__headline" variants={fadeChild}>
                  How a Bioelectric Perspective Can Be Applied – Without Making Claims
                </motion.h2>
                <motion.p className="andara-section__subline" variants={fadeChild}>
                  <span className="andara-text-lead">
                    Looking through a voltage-first lens doesn’t mean treating anything – it means
                    <strong>changing how we organise our decisions</strong>.
                  </span>
                  Below are examples of how people and spaces can <strong>work with bioelectric principles</strong> in a
                  <strong>non-medical, terrain-focused way</strong>.
                </motion.p>
              </header>

              <div className="andara-grid andara-grid--03 andara-section__items">
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    1. Water Environments
                  </h3>
                  <p className="andara-grid__text">
                    Creating daily water that is <strong>clean, structured, and mineral-informed</strong> so the terrain
                    has a more <strong>coherent medium</strong> to work with.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    2. Spaces & Architecture
                  </h3>
                  <p className="andara-grid__text">
                    Designing homes, studios, and retreats around <strong>light, EMF, grounding, and water placement</strong>
                    to support a <strong>stable field environment</strong>.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    3. Practices & Protocols
                  </h3>
                  <p className="andara-grid__text">
                    Linking movement, breath, and rest with attention to <strong>hydration quality, mineral intake, and
                    field exposure</strong>, viewing them as inputs to the <strong>bioelectric terrain</strong>.
                  </p>
                </motion.article>
              </div>

              <motion.div className="andara-highlight-box andara-highlight-box--disclaimer" variants={fadeChild}>
                <p className="andara-highlight-box__text">
                  The ideas described here are <strong>educational and exploratory</strong>.
                  They are not medical advice, not a diagnosis, and not a treatment plan.
                  They simply offer a <strong>different way to think about terrain, water, and minerals</strong> in daily life.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/*
          REPLIT / MOTION LAYOUT PROMPT – USE CASES
          - Layout:
            - 3 cards showing different application zones.
          - Motion:
            - `scroll - fade - up - stagger`.
          - Visual:
            - Illustrations: water glass, house/temple, person in practice/meditation pose.
          */}

          {/* =========================
               SECTION – SIMPLE TIMELINE: FROM VOLTAGE CHAOS TO COHERENCE
          ========================== */}
          <motion.section
            id="bioelectricity-coherence-timeline"
            className="andara-section andara-section--timeline"
            aria-label="Bioelectric coherence timeline"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpContainer}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <motion.h2 className="andara-section__headline" variants={fadeChild}>
                  From Noise to Coherence – A Simple Bioelectric Storyboard
                </motion.h2>
                <motion.p className="andara-section__subline" variants={fadeChild}>
                  <span className="andara-text-lead">
                    You can imagine bioelectric health as a journey from <strong>noisy, fragmented signals</strong>
                    toward <strong>clear, stable patterns</strong>.
                  </span>
                  This storyboard is not a diagnosis – it’s a visual metaphor for how terrain can feel when its
                  <strong>water, minerals, and fields</strong> become more organised.
                </motion.p>
              </header>

              <div className="andara-grid andara-grid--timeline andara-section__items">
                <motion.article className="andara-grid__item andara-grid__item--step" variants={fadeChild}>
                  <div className="andara-grid__step-number">1</div>
                  <h3 className="andara-grid__title">
                    Fragmented Signals
                  </h3>
                  <p className="andara-grid__text">
                    Water is <strong>chemically burdened</strong>, minerals are <strong>scattered or missing</strong>,
                    and fields are full of <strong>noise</strong>.
                    Bioelectric patterns feel <strong>chaotic and reactive</strong>.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item andara-grid__item--step" variants={fadeChild}>
                  <div className="andara-grid__step-number">2</div>
                  <h3 className="andara-grid__title">
                    Clearing the Medium
                  </h3>
                  <p className="andara-grid__text">
                    Filtration, clarification, and grounding begin.
                    Water becomes <strong>clearer</strong>, and the background noise in the field <strong>softens</strong>.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item andara-grid__item--step" variants={fadeChild}>
                  <div className="andara-grid__step-number">3</div>
                  <h3 className="andara-grid__title">
                    Structured & Informed Water
                  </h3>
                  <p className="andara-grid__text">
                    Structured water and <strong>ionic minerals</strong> bring <strong>charge separation,
                    buffering, and organisation</strong> into the terrain.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item andara-grid__item--step" variants={fadeChild}>
                  <div className="andara-grid__step-number">4</div>
                  <h3 className="andara-grid__title">
                    Coherent Bioelectric Field
                  </h3>
                  <p className="andara-grid__text">
                    Signals travel with more <strong>clarity</strong>, gradients are <strong>stable</strong>,
                    and the terrain behaves more like a <strong>coordinated whole</strong> than a collection of parts.
                  </p>
                </motion.article>
              </div>

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

          {/*
          REPLIT / MOTION LAYOUT PROMPT – COHERENCE TIMELINE
          - Layout:
            - 4-step horizontal timeline (vertical on mobile).
          - Motion:
            - `scroll - fade - up - stagger`.
            - Apply `timeline - glow - progress`: as the user scrolls, a soft light travels along the line from step 1 → 4.
          - Visual:
            - Use waveforms and field lines to feel “noisy vs coherent”.
          */}

          {/* =========================
               SECTION – CROSS-LINK: ANDARA IONIC & BIOELECTRIC VIEW
          ========================== */}
          <motion.section
            id="bioelectricity-andara-link"
            className="andara-section andara-section--product-link"
            aria-label="Linking Andara Ionic to bioelectric terrain perspective"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpContainer}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <motion.h2 className="andara-section__headline" variants={fadeChild}>
                  Where Andara Ionic Fits Into This Bioelectric Picture
                </motion.h2>
                <motion.p className="andara-section__subline" variants={fadeChild}>
                  <span className="andara-text-lead">
                    Andara Ionic does not “treat” anything.
                  </span>
                  Its role in the Andara universe is simple:
                  <strong>provide a precise, volcanic ionic sulfate mineral code</strong> that helps water become a more
                  <strong>clear, structured, and conductive medium</strong>.
                </motion.p>
              </header>

              <div className="andara-grid andara-grid--02 andara-section__items">
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    Clarifying & Conditioning Water
                  </h3>
                  <p className="andara-grid__text">
                    A micro-dose of Andara Ionic, within a defined sulfate band, can <strong>clarify and condition water</strong>,
                    reorganising impurities and supporting a more <strong>ordered charge environment</strong>.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    Supporting the Terrain Medium
                  </h3>
                  <p className="andara-grid__text">
                    In a bioelectric view, this means tending to the <strong>medium</strong> that carries signals, rather than
                    chasing each signal separately.
                    Clearer, better-organised water is one ingredient in a <strong>more coherent bioelectric terrain</strong>.
                  </p>
                </motion.article>
              </div>

              <motion.div className="andara-highlight-box andara-highlight-box--cta" variants={fadeChild}>
                <p className="andara-highlight-box__text">
                  To see how Andara Ionic is described as a product – with full disclaimers, dosing examples, and pricing –
                  visit the <Link href="/shop/andara-ionic-100ml">100{"\u00A0"}ml</Link> or
                  <Link href="/shop/andara-ionic-1l">1{"\u00A0"}L</Link> product pages.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/*
          REPLIT / MOTION LAYOUT PROMPT – ANDARA LINK
          - Layout:
            - 2 explanatory cards + one CTA highlight box.
          - Motion:
            - `scroll - fade - up - stagger`.
          - Visual:
            - Small product silhouette to hint connection, but keep focus on terrain logic, not sales.
          */}

          {/* =========================
               SECTION – FAQ (NON-MEDICAL CLARIFICATIONS)
          ========================== */}
          <motion.section
            id="bioelectricity-faq"
            className="andara-section andara-section--faq"
            aria-label="Bioelectricity frequently asked questions"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpContainer}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <motion.h2 className="andara-section__headline" variants={fadeChild}>
                  Bioelectric Terrain – Gentle Clarifications
                </motion.h2>
                <motion.p className="andara-section__subline" variants={fadeChild}>
                  A few common questions – answered from a <strong>terrain-first, non-medical</strong> viewpoint.
                </motion.p>
              </header>

              <div className="andara-faq">
                <motion.article className="andara-faq__item" variants={fadeChild}>
                  <h3 className="andara-faq__question">
                    Is bioelectricity the same as the nervous system?
                  </h3>
                  <p className="andara-faq__answer">
                    The nervous system is one <strong>expression</strong> of bioelectricity, but not the only one.
                    Voltage gradients exist around <strong>wounds, organs, fascia, and entire body regions</strong> – even beyond
                    classical nerves.
                    The terrain perspective looks at all of these <strong>field expressions together</strong>.
                  </p>
                </motion.article>

                <motion.article className="andara-faq__item" variants={fadeChild}>
                  <h3 className="andara-faq__question">
                    Does this replace conventional medical care?
                  </h3>
                  <p className="andara-faq__answer">
                    No.
                    A bioelectric view is a <strong>complementary map</strong>, not a substitute for care, diagnosis, or treatment.
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
                    grounding and light exposure, or observing responses to environment.
                    Other aspects require <strong>specialised equipment or research contexts</strong>.
                    The Andara Library focuses on <strong>education, not devices</strong>.
                  </p>
                </motion.article>
              </div>
            </div>
          </motion.section>

          {/*
          REPLIT / MOTION LAYOUT PROMPT – FAQ
          - Layout:
            - Simple vertical FAQ accordion or stacked cards.
          - Motion:
            - `scroll - fade - up - stagger`.
          - Visual:
            - Use calm layout, lots of whitespace, emphasize clarity and safety.
          */}

          {/* =========================
               SECTION – SCIENCE LIBRARY FOOTER
          ========================== */}
          <motion.section
            id="bioelectricity-science-footer"
            className="andara-section andara-section--library-footer"
            aria-label="Science Library navigation footer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpContainer}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <motion.h2 className="andara-section__headline" variants={fadeChild}>
                  Continue Exploring the Andara Science Library
                </motion.h2>
                <motion.p className="andara-section__subline" variants={fadeChild}>
                  <span className="andara-text-lead">
                    Bioelectricity is one pillar in a bigger architecture.
                  </span>
                  Water, minerals, crystalline geometry, and terrain all <strong>interlock like a living circuit</strong>.
                  Follow whichever thread is calling you next.
                </motion.p>
              </header>

              <div
                className="andara-grid andara-grid--04 andara-grid--library-footer andara-section__items"
                aria-label="Science Library pillars"
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
                  <h3 className="andara-grid__title">Terrain & Regeneration</h3>
                  <p className="andara-grid__text">
                    How these pillars interact when we look at regeneration as a field phenomenon.
                  </p>
                  <p className="andara-grid__link">
                    <Link href="/science/terrain-regeneration">Go to Terrain & Regeneration →</Link>
                  </p>
                </motion.article>
              </div>

              <motion.div className="andara-highlight-box andara-highlight-box--neural-footer" variants={fadeChild}>
                <p className="andara-highlight-box__text">
                  The <strong>Andara Library Engine</strong> links all these pages through
                  <strong>deep, semantic connections</strong> – so whichever pillar you choose, you can always
                  find your way back to the full circuit.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/*
          REPLIT / MOTION LAYOUT PROMPT – SCIENCE LIBRARY FOOTER
          - Layout:
            - 4 pillar cards + one highlight box explaining the neural linking.
          - Motion:
            - `scroll - fade - up - stagger`.
            - Subtle `ambient - cosmic - field` background behind entire footer.
          */}

          {/* =========================
               FINAL CTA
          ========================== */}
          <motion.section
            id="bioelectricity-final-cta"
            className="andara-section andara-section--final-cta"
            aria-label="Final call to action"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpContainer}
          >
            <div className="andara-section__inner">
              <div className="andara-final-cta__content">
                <motion.h2 className="andara-final-cta__headline" variants={fadeChild}>
                  When you change the field, you change the conversation inside the body.
                </motion.h2>
                <motion.p className="andara-final-cta__text" variants={fadeChild}>
                  If this way of seeing life <strong>resonates</strong> with you, begin with something simple:
                  <strong>the water you drink, the minerals you use, and the spaces you create</strong>.
                  The bioelectric terrain responds to the <strong>quality of its medium</strong>.
                </motion.p>
                <motion.div className="andara-final-cta__cta-group" variants={fadeChild}>
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
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/*
          REPLIT / MOTION LAYOUT PROMPT – FINAL CTA
          - Layout:
            - Centered, wide CTA band.
          - Motion:
            - `scroll - fade - up` + very soft `ambient - bioelectric - field` behind headline.
          */}

        </main>
      </MotionConfig>
    </Layout>
  );
}