import React from "react";
import { motion, MotionConfig, type Easing, type Variants } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { SmartVideoEmbed } from "@/components/SmartVideoEmbed";

/*
ANDARA VISUAL CONFIG:
pageId: "dna-mineral-codes"
cluster: "Science Library · DNA & Minerals"
priority: "P1"
vibeKeywords: [
  "structural memory",
  "crystalline code",
  "helix geometry",
  "mineral lattice",
  "liquid crystal biology",
  "deep indigo",
  "soft violet",
  "aqua-turquoise",
  "golden code nodes"
]
emotionalTone: [
  "inner-recognition",
  "precision",
  "wonder",
  "calm authority",
  "future-organic",
  "sacred-scientific"
]
animationIdeas: [
  "dna helix made of light slowly rotating",
  "mineral lattice morphing into double helix segments",
  "hover: cards reveal small hex/helix motifs in the background",
  "timeline: code pulses traveling along a strand",
  "background: faint matrix of dots and lines connecting like a graph",
  "section dividers with gently scrolling wave/helix line"
]
aiImagePromptHero: "A luminous DNA double helix composed of light-lines and crystal facets, woven together with mineral lattice nodes. The helix floats in deep indigo space with aqua and soft gold highlights, surrounded by subtle geometric patterns hinting at liquid crystal water and crystalline matrices. Mood: precise, mystical, scientific yet sacred."
designerNotes: "DNA & Mineral Codes should feel like zooming into the structural language of life. Show helix, lattices, and light as one system: not just genetics, but field-informed geometry. Keep language non-medical, terrain-focused, emphasizing structure, memory, and potential rather than disease or diagnosis."
*/

// shared animation tokens
const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const fadeUpContainer: Record<string, any> = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const fadeChild: Record<string, any> = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export default function DnaMineralCodesPage() {
  return (
    <Layout>
      <MotionConfig transition={{ duration: 0.7, ease: "easeOut" as Easing }}>
        <main
          id="andara-dna-mineral-codes"
          className="andara-page andara-page--science"
          aria-label="DNA & Mineral Codes – The Structural Memory of Life"
        >
          {/* =========================
             HERO – DNA & MINERAL CODES
        ========================== */}
          <motion.section
            id="dna-codes-hero"
            className="andara-hero andara-hero--primary"
            aria-label="DNA and Mineral Codes main introduction"
            initial="hidden"
            animate="visible"
            variants={fadeUpContainer}
          >
            <div className="andara-hero__inner">
              <header className="andara-hero__content">
                <motion.p
                  className="andara-hero__label"
                  variants={fadeChild}
                >
                  Science Library · DNA &amp; Minerals · Structural Memory
                </motion.p>

                <motion.h1
                  className="andara-hero__headline"
                  variants={fadeChild}
                >
                  DNA &amp; Mineral Codes: The Structural Memory of Life
                </motion.h1>

                <motion.p
                  className="andara-hero__subline"
                  variants={fadeChild}
                >
                  <span className="andara-text-lead">
                    DNA is more than a static string of letters – it is a{" "}
                    <strong>living antenna</strong> woven into a{" "}
                    <strong>mineral-supported, liquid crystal matrix</strong>.
                  </span>{" "}
                  Minerals, water, and fields together create the{" "}
                  <strong>structural context</strong> that allows DNA to{" "}
                  <strong>store, read, and express</strong> its codes in real terrains.
                </motion.p>

                <motion.ul
                  className="andara-hero__bullets"
                  variants={fadeUpContainer}
                >
                  <motion.li variants={fadeChild}>
                    <strong>DNA as geometry:</strong> a{" "}
                    <strong>double helix antenna</strong> embedded in water and minerals.
                  </motion.li>
                  <motion.li variants={fadeChild}>
                    <strong>Minerals as co-coders:</strong> ions and lattices that{" "}
                    <strong>stabilise, tune, and modulate</strong> the helix.
                  </motion.li>
                  <motion.li variants={fadeChild}>
                    <strong>Terrain as a memory field:</strong> how water, minerals and fields{" "}
                    <strong>shape the structural memory</strong> of life over time.
                  </motion.li>
                </motion.ul>
              </header>

              <motion.figure
                className="andara-hero__media"
                variants={fadeChild}
              >
                <motion.div
                  className="andara-hero__media-video rounded-2xl overflow-hidden shadow-2xl border border-indigo-500/30"
                  variants={fadeChild}
                >
                  <SmartVideoEmbed
                    keywords={["dna", "helix", "resonance", "frequency"]}
                    className="w-full aspect-video object-cover"
                  />
                </motion.div>
                <motion.figcaption
                  className="andara-hero__media-caption"
                  variants={fadeChild}
                >
                  DNA &amp; mineral codes form a structural language: geometry, charge, and lattice working together
                  as the memory system of life.
                </motion.figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/* =========================
             SECTION – WHAT ARE DNA & MINERAL CODES?
        ========================== */}
          <motion.section
            id="dna-codes-what-is-it"
            className="andara-section andara-section--what-it-is"
            aria-label="What are DNA and mineral codes"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  What Do We Mean by “DNA &amp; Mineral Codes”?
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    In the Andara language,{" "}
                    <strong>DNA &amp; mineral codes</strong> describe the{" "}
                    <strong>structural patterns</strong> that allow life to{" "}
                    <strong>remember, adapt, and organise</strong> itself.
                  </span>{" "}
                  DNA is the <strong>information carrier</strong>; minerals and water are the{" "}
                  <strong>structural and electrical context</strong> that make its expression possible.
                </p>
              </header>

              <motion.div
                className="andara-grid andara-grid--03 andara-section__items"
                variants={fadeUpContainer}
              >
                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    DNA as a Geometric Script
                  </h3>
                  <p className="andara-grid__text">
                    DNA carries sequences of bases, but also{" "}
                    <strong>3D geometry</strong>: coiling, supercoiling, and
                    higher-order folding. This geometry turns DNA into a{" "}
                    <strong>living script</strong> that can be folded, read, and
                    tuned by its surroundings.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    Minerals as Structural Co-Factors
                  </h3>
                  <p className="andara-grid__text">
                    Minerals like <strong>magnesium, zinc, manganese, iron,
                      calcium and phosphate</strong> help stabilise DNA, support
                    repair enzymes, and shape chromatin structure. They act as{" "}
                    <strong>co-coders</strong>, tuning how DNA behaves in real terrains.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    Water &amp; Fields as Carriers
                  </h3>
                  <p className="andara-grid__text">
                    Structured water and bioelectric fields surround DNA, forming
                    a <strong>liquid crystal environment</strong>. In this view,
                    DNA doesn’t float alone – it is embedded in{" "}
                    <strong>a dynamic, field-sensitive matrix</strong>.
                  </p>
                </motion.article>
              </motion.div>

              <motion.figure
                className="andara-figure andara-figure--diagram"
                variants={fadeChild}
              >
                <div className="andara-figure__visual rounded-xl overflow-hidden border border-indigo-500/20 shadow-lg">
                  <SmartVideoEmbed
                    keywords={["dna", "lattice", "biocrystal", "liquid crystal"]}
                    className="w-full aspect-video object-cover"
                  />
                </div>
                <figcaption className="andara-figure__caption">
                  DNA, minerals, and water form a single structural memory system – code, lattice, and field
                  working as one.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/* =========================
             SECTION – DNA AS ANTENNA & STRUCTURAL MEMORY
        ========================== */}
          <motion.section
            id="dna-codes-dna-antenna"
            className="andara-section andara-section--dna-antenna"
            aria-label="DNA as antenna and structural memory"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  DNA as an Antenna and Structural Memory Device
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    DNA is shaped like a <strong>helical antenna</strong> – a coiled conductor embedded in water.
                  </span>{" "}
                  This geometry allows DNA to interact not only with chemicals, but with{" "}
                  <strong>charge, fields, and mechanical forces</strong>.
                </p>
              </header>

              <motion.div
                className="andara-grid andara-grid--03 andara-section__items"
                variants={fadeUpContainer}
              >
                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    Helix as Field Antenna
                  </h3>
                  <p className="andara-grid__text">
                    Coiled structures naturally{" "}
                    <strong>receive and emit patterns</strong> of energy.
                    DNA’s double-helix and higher-order coils can be imagined
                    as a <strong>field-responsive antenna</strong>, tuned by its
                    mineral and water context.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    Chromatin Folding as Memory
                  </h3>
                  <p className="andara-grid__text">
                    DNA wraps around proteins and folds into{" "}
                    <strong>fractal structures</strong>. This folding is not
                    random – it reflects a <strong>history of signals</strong>:
                    what the cell has experienced, practiced, and stored as
                    structural habits.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    Terrain as a Storyteller
                  </h3>
                  <p className="andara-grid__text">
                    Over time, water quality, mineral context, light, and
                    fields shape how DNA is{" "}
                    <strong>packed, unpacked, and repaired</strong>. The terrain
                    becomes a <strong>storyteller</strong>, writing its
                    experiences into DNA’s structural memory.
                  </p>
                </motion.article>
              </motion.div>

              <motion.figure
                className="andara-figure andara-figure--helix"
                variants={fadeChild}
              >
                <div className="andara-figure__visual rounded-xl overflow-hidden border border-indigo-500/20 shadow-lg">
                  <SmartVideoEmbed
                    keywords={["dna", "frequency", "field", "signals"]}
                    className="w-full aspect-video object-cover"
                  />
                </div>
                <figcaption className="andara-figure__caption">
                  DNA is not a static blueprint; it is a flexible, field-sensitive memory device
                  shaped by the terrain it lives in.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/* =========================
             SECTION – MINERALS AS CO-CODERS & LATTICES
        ========================== */}
          <motion.section
            id="dna-codes-minerals"
            className="andara-section andara-section--minerals"
            aria-label="Minerals as DNA co-coders and lattices"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  Minerals as Co-Coders: Lattices, Ions &amp; Repair Allies
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    Minerals do more than “support metabolism”.
                  </span>{" "}
                  In a structural view, they <strong>stabilise DNA</strong>, guide{" "}
                  <strong>repair processes</strong>, and help create{" "}
                  <strong>crystalline scaffolds</strong> that DNA can inhabit.
                </p>
              </header>

              <motion.div
                className="andara-grid andara-grid--04 andara-section__items"
                variants={fadeUpContainer}
              >
                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    Magnesium – The Silent Helix Guardian
                  </h3>
                  <p className="andara-grid__text">
                    <strong>Magnesium</strong> helps stabilise the DNA backbone
                    and participates in <strong>repair enzymes</strong>. Without
                    it, the helix becomes harder to maintain and copy with
                    precision.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    Zinc &amp; Trace Elements – Fine-Tuning Structure
                  </h3>
                  <p className="andara-grid__text">
                    <strong>Zinc, manganese, selenium, iron</strong> and other
                    trace elements appear in <strong>enzymes, binding proteins,
                      and chromatin remodelers</strong>, helping DNA respond to
                    signals and maintain integrity.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    Phosphate &amp; Mineral Lattices
                  </h3>
                  <p className="andara-grid__text">
                    DNA’s backbone is <strong>phosphate-based</strong>, linking
                    it to the broader world of <strong>ionic crystals and
                      lattices</strong>. Minerals in the terrain influence how
                    these phosphate structures form and interact.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    Sulphate as a Structural Organizer
                  </h3>
                  <p className="andara-grid__text">
                    <strong>Sulfate (SO₄²⁻)</strong> shapes hydration shells,
                    contributes to <strong>glycocalyx and matrix structures</strong>,
                    and supports <strong>charge distribution</strong> in the terrain –
                    indirectly influencing the environment DNA lives in.
                  </p>
                </motion.article>
              </motion.div>

              <motion.figure
                className="andara-figure andara-figure--lattice"
                variants={fadeChild}
              >
                <div className="andara-figure__visual rounded-xl overflow-hidden border border-indigo-500/20 shadow-lg">
                  <SmartVideoEmbed
                    keywords={["minerals", "magnesium", "repair", "lattice"]}
                    className="w-full aspect-video object-cover"
                  />
                </div>
                <figcaption className="andara-figure__caption">
                  Minerals form a supportive lattice around DNA – a quiet co-coding layer that helps geometry stay
                  coherent over time.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/* =========================
             SECTION – DNA, WATER & LIQUID CRYSTAL BIOLOGY
        ========================== */}
          <motion.section
            id="dna-codes-liquid-crystal"
            className="andara-section andara-section--liquid-crystal"
            aria-label="DNA, water and liquid crystal biology"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  DNA in a Liquid Crystal Body: Water as a Memory Field
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    The body is not just bags of fluid; it behaves like a{" "}
                    <strong>liquid crystal</strong> – ordered water and molecules
                    forming structured, field-sensitive phases.
                  </span>{" "}
                  DNA lives inside this <strong>liquid crystal body</strong>.
                </p>
              </header>

              <motion.div
                className="andara-grid andara-grid--02 andara-section__items"
                variants={fadeUpContainer}
              >
                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    Structured Water Around DNA
                  </h3>
                  <p className="andara-grid__text">
                    Interfacial water forms{" "}
                    <strong>ordered layers</strong> around DNA, proteins,
                    and membranes. These layers support{" "}
                    <strong>charge separation, signal propagation, and
                      mechanical stability</strong>.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    Fields, Frequencies &amp; Expression
                  </h3>
                  <p className="andara-grid__text">
                    When we talk about “epigenetics” in an energetic language,
                    we’re really talking about how{" "}
                    <strong>fields, flows, and structural context</strong>
                    guide which parts of the DNA script are more likely to be{" "}
                    <strong>read, bookmarked, or silenced</strong>.
                  </p>
                </motion.article>
              </motion.div>

              <motion.figure
                className="andara-figure andara-figure--liquid-crystal"
                variants={fadeChild}
              >
                <div className="andara-figure__visual rounded-xl overflow-hidden border border-indigo-500/20 shadow-lg">
                  <SmartVideoEmbed
                    keywords={["water", "liquid crystal", "ez water", "ordered water"]}
                    className="w-full aspect-video object-cover"
                  />
                </div>
                <figcaption className="andara-figure__caption">
                  DNA is part of a larger liquid crystal system: water and fields help decide how its structural memory
                  becomes active in real time.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/* =========================
             SECTION – FROM HARD GENETICS TO FIELD-INFORMED TERRAIN
        ========================== */}
          <motion.section
            id="dna-codes-perspective"
            className="andara-section andara-section--terrain"
            aria-label="DNA and mineral codes terrain perspective"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  From “Hard Genetics” to Field-Informed Terrain
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    A purely genetic view focuses on <strong>fixed sequences</strong>.
                  </span>{" "}
                  The terrain view asks:{" "}
                  <strong>What shapes the environment that DNA lives in?</strong>{" "}
                  How do <strong>water, minerals, and fields</strong> influence
                  its structural memory over time?
                </p>
              </header>

              <motion.div
                className="andara-grid andara-grid--02 andara-section__items"
                variants={fadeUpContainer}
              >
                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    The Hard-Genetic Lens
                  </h3>
                  <p className="andara-grid__text">
                    Sees DNA mostly as <strong>fixed code</strong> – mutations
                    and sequences that determine outcomes. Useful, but often{" "}
                    <strong>static and fatalistic</strong> when misinterpreted.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    The Terrain &amp; Field Lens
                  </h3>
                  <p className="andara-grid__text">
                    Sees DNA as <strong>responsive structure</strong> inside a
                    changing medium. Water quality, mineral stories, light, and
                    fields can <strong>support or burden</strong> the structural
                    memory, without promising any specific outcomes.
                  </p>
                </motion.article>
              </motion.div>

              <motion.div
                className="andara-highlight-box andara-highlight-box--compare"
                variants={fadeChild}
              >
                <p className="andara-highlight-box__text">
                  The Andara project does not offer genetics services or medical advice.
                  {" "}
                  It simply chooses to{" "}
                  <strong>start from the field and terrain</strong> – tending to
                  water, minerals, and spaces as a way of{" "}
                  supporting the structural context DNA lives in.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* =========================
             SECTION – NON-MEDICAL USE CASES
        ========================== */}
          <motion.section
            id="dna-codes-use-cases"
            className="andara-section andara-section--use-cases"
            aria-label="DNA and mineral codes non-medical use cases"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  Working with DNA &amp; Mineral Codes – Without Making Claims
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    A DNA &amp; mineral perspective doesn’t tell you what to
                    treat – it changes <strong>how you think about inputs</strong>.
                  </span>{" "}
                  Below are <strong>terrain-focused examples</strong>, not prescriptions.
                </p>
              </header>

              <motion.div
                className="andara-grid andara-grid--03 andara-section__items"
                variants={fadeUpContainer}
              >
                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    1. Water &amp; Mineral Context
                  </h3>
                  <p className="andara-grid__text">
                    Viewing daily water and minerals as part of the{" "}
                    <strong>structural setting</strong> for DNA – not as “magic
                    bullets”, but as{" "}
                    <strong>background signals</strong> the structural memory
                    responds to over time.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    2. Light, Rhythm &amp; Spaces
                  </h3>
                  <p className="andara-grid__text">
                    Designing rhythms and spaces around{" "}
                    <strong>natural light, grounding, and reduced noise</strong>{" "}
                    in fields – as gentle inputs into the terrain that hosts DNA.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    3. Education &amp; Language
                  </h3>
                  <p className="andara-grid__text">
                    Using DNA &amp; mineral codes as{" "}
                    <strong>educational metaphors</strong> – helping people see
                    the body as a{" "}
                    <strong>field-informed, structural memory system</strong>{" "}
                    rather than a collection of isolated defects.
                  </p>
                </motion.article>
              </motion.div>

              <motion.div
                className="andara-highlight-box andara-highlight-box--disclaimer"
                variants={fadeChild}
              >
                <p className="andara-highlight-box__text">
                  Everything on this page is{" "}
                  <strong>educational and exploratory</strong>. It is not a
                  diagnosis, not a treatment, and not a genetic service.
                  {" "}
                  It simply offers a{" "}
                  <strong>different way of imagining DNA, minerals, and terrain</strong>.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* =========================
             SECTION – STORYBOARD: FROM STATIC CODE TO LIVING MATRIX
        ========================== */}
          <motion.section
            id="dna-codes-storyboard"
            className="andara-section andara-section--timeline"
            aria-label="DNA and mineral codes storyboard"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  A Simple Storyboard: From Static Code to Living Matrix
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    This storyboard is not about health outcomes – it’s a{" "}
                    <strong>visual metaphor</strong> for how our view of DNA can
                    evolve.
                  </span>
                </p>
              </header>

              <motion.div
                className="andara-grid andara-grid--timeline andara-section__items"
                variants={fadeUpContainer}
              >
                <motion.article
                  className="andara-grid__item andara-grid__item--step"
                  variants={fadeChild}
                >
                  <div className="andara-grid__step-number">1</div>
                  <h3 className="andara-grid__title">Static Code Story</h3>
                  <p className="andara-grid__text">
                    DNA is seen as a{" "}
                    <strong>fixed blueprint</strong> – mostly about inherited
                    strengths and weaknesses, hard to influence.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item andara-grid__item--step"
                  variants={fadeChild}
                >
                  <div className="andara-grid__step-number">2</div>
                  <h3 className="andara-grid__title">Context Emerges</h3>
                  <p className="andara-grid__text">
                    We notice that <strong>water, minerals, rhythm, and fields</strong>{" "}
                    seem to influence how structures behave, hinting at a{" "}
                    <strong>larger matrix story</strong>.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item andara-grid__item--step"
                  variants={fadeChild}
                >
                  <div className="andara-grid__step-number">3</div>
                  <h3 className="andara-grid__title">Structural Memory View</h3>
                  <p className="andara-grid__text">
                    DNA, minerals, water, and fields are seen as{" "}
                    <strong>one integrated memory system</strong> – responsive,
                    rhythmic, and field-informed.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item andara-grid__item--step"
                  variants={fadeChild}
                >
                  <div className="andara-grid__step-number">4</div>
                  <h3 className="andara-grid__title">Living Matrix Practice</h3>
                  <p className="andara-grid__text">
                    Daily choices around{" "}
                    <strong>water, minerals, spaces, and rhythms</strong> are
                    treated as ways of <strong>tending the matrix</strong> –
                    without promises, but with a deeper sense of participation.
                  </p>
                </motion.article>
              </motion.div>

              <motion.figure
                className="andara-figure andara-figure--timeline"
                variants={fadeChild}
              >
                <div className="andara-figure__visual">
                  <p>
                    [Timeline visual: left – flat DNA code strip; next – code in a droplet; next – DNA in crystal-water
                    matrix; finally – entire body/terrain with helix and lattice interwoven.]
                  </p>
                </div>
                <figcaption className="andara-figure__caption">
                  DNA &amp; mineral codes invite us to move from a flat code story to a{" "}
                  <strong>living matrix story</strong>.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/* =========================
             SECTION – ANDARA IONIC LINK
        ========================== */}
          <motion.section
            id="dna-codes-andara-link"
            className="andara-section andara-section--product-link"
            aria-label="Andara Ionic in the DNA and mineral codes context"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  Where Andara Ionic Fits in This Picture (Without Claims)
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    Andara Ionic is not a genetic tool and does not “fix DNA”.
                  </span>{" "}
                  Its role is simpler: to offer a{" "}
                  <strong>primordial ionic sulfate mineral code</strong> that can
                  become part of{" "}
                  <strong>the water and mineral context</strong> DNA lives in.
                </p>
              </header>

              <motion.div
                className="andara-grid andara-grid--02 andara-section__items"
                variants={fadeUpContainer}
              >
                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    Clarifying &amp; Mineral-Informing Water
                  </h3>
                  <p className="andara-grid__text">
                    In micro-doses and within defined sulfate bands, Andara Ionic
                    can be used to{" "}
                    <strong>clarify and mineral-inform filtered water</strong>,
                    offering one more layer of <strong>context</strong> to the
                    terrain’s liquid architecture.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">
                    Tending the Medium, Not the Code
                  </h3>
                  <p className="andara-grid__text">
                    The Andara perspective is to{" "}
                    <strong>tend the medium</strong> – water, minerals, spaces –
                    without promising specific changes in DNA. The goal is{" "}
                    <strong>coherence in context</strong>, not genetic outcomes.
                  </p>
                </motion.article>
              </motion.div>

              <motion.div
                className="andara-highlight-box andara-highlight-box--cta"
                variants={fadeChild}
              >
                <p className="andara-highlight-box__text">
                  Full product descriptions, disclaimers, and dilution examples
                  live on the{" "}
                  <a href="/shop/andara-ionic-100ml">Andara Ionic 100&nbsp;ml</a>{" "}
                  and <a href="/shop/andara-ionic-1l">1&nbsp;L</a> pages. This
                  DNA &amp; Mineral Codes page stays focused on{" "}
                  <strong>concepts and terrain language</strong>, not promises.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* =========================
             SECTION – FAQ
        ========================== */}
          <motion.section
            id="dna-codes-faq"
            className="andara-section andara-section--faq"
            aria-label="DNA and mineral codes frequently asked questions"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  DNA &amp; Mineral Codes – Gentle Clarifications
                </h2>
                <p className="andara-section__subline">
                  A few common questions, answered from a{" "}
                  <strong>terrain-first, non-medical</strong> perspective.
                </p>
              </header>

              <motion.div
                className="andara-faq"
                variants={fadeUpContainer}
              >
                <motion.article
                  className="andara-faq__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-faq__question">
                    Does this mean I can “change my DNA” with minerals or water?
                  </h3>
                  <p className="andara-faq__answer">
                    No.{" "}
                    This page does not claim that any substance changes DNA.{" "}
                    It simply points out that{" "}
                    <strong>DNA is structurally context-sensitive</strong> –
                    meaning its geometry and expression can be influenced by
                    the <strong>terrain it lives in</strong>.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-faq__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-faq__question">
                    Is this a replacement for genetic testing or medical advice?
                  </h3>
                  <p className="andara-faq__answer">
                    No.
                    {" "}
                    DNA &amp; mineral codes are presented as{" "}
                    <strong>educational concepts</strong> and metaphors.{" "}
                    They do not replace diagnostics, genetic services, or any
                    form of medical care.
                  </p>
                </motion.article>

                <motion.article
                  className="andara-faq__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-faq__question">
                    Why talk about DNA at all if we’re not treating it?
                  </h3>
                  <p className="andara-faq__answer">
                    Because seeing DNA as a{" "}
                    <strong>field-informed, structural memory system</strong>{" "}
                    can soften fear and fatalism. It invites a more{" "}
                    <strong>participatory relationship</strong> with water,
                    minerals, and spaces – without promising specific outcomes.
                  </p>
                </motion.article>
              </motion.div>
            </div>
          </motion.section>

          {/* =========================
             SECTION – SCIENCE LIBRARY FOOTER
        ========================== */}
          <motion.section
            id="dna-codes-science-footer"
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
                    DNA &amp; Mineral Codes sit at the crossroads of{" "}
                    <strong>structure, field, and memory</strong>.
                  </span>{" "}
                  To feel the full picture, explore the other pillars as well.
                </p>
              </header>

              <motion.div
                className="andara-grid andara-grid--04 andara-grid--library-footer andara-section__items"
                aria-label="Science Library pillars"
                variants={fadeUpContainer}
              >
                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">Bioelectricity</h3>
                  <p className="andara-grid__text">
                    The voltage architecture that informs cellular communication and terrain.
                  </p>
                  <p className="andara-grid__link">
                    <a href="/science/bioelectricity">Go to Bioelectricity →</a>
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">Water Science</h3>
                  <p className="andara-grid__text">
                    The liquid architecture – pH, ORP, structured water, and fourth phase behaviour.
                  </p>
                  <p className="andara-grid__link">
                    <a href="/science/water">Go to Water Science →</a>
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">Mineral Science</h3>
                  <p className="andara-grid__text">
                    How ionic forms, sulfate codes, and trace elements shape the terrain.
                  </p>
                  <p className="andara-grid__link">
                    <a href="/science/minerals">Go to Mineral Science →</a>
                  </p>
                </motion.article>

                <motion.article
                  className="andara-grid__item"
                  variants={fadeChild}
                >
                  <h3 className="andara-grid__title">Crystalline Matrix</h3>
                  <p className="andara-grid__text">
                    Geometry, lattices, and light – the deeper matrix behind structural coherence.
                  </p>
                  <p className="andara-grid__link">
                    <a href="/science/crystalline-matrix">Go to Crystalline Matrix →</a>
                  </p>
                </motion.article>
              </motion.div>

              <motion.div
                className="andara-highlight-box andara-highlight-box--neural-footer"
                variants={fadeChild}
              >
                <p className="andara-highlight-box__text">
                  The <strong>Andara Library Engine</strong> is designed like a{" "}
                  <strong>living graph</strong> – whatever page you enter through,
                  you can always trace the connections back to the whole circuit.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* =========================
             FINAL CTA
        ========================== */}
          <motion.section
            id="dna-codes-final-cta"
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
                  When you tend the terrain, you speak softly to the codes of life.
                </h2>
                <p className="andara-final-cta__text">
                  If this way of seeing DNA &amp; minerals <strong>resonates</strong> with you, begin where your hands
                  can actually touch the story:
                  {" "}
                  <strong>the water you drink, the minerals you invite, and the spaces you inhabit</strong>.{" "}
                  The structural memory of life listens to the{" "}
                  <strong>quality of its medium</strong>.
                </p>
                <div className="andara-final-cta__cta-group">
                  <a
                    href="/shop"
                    className="andara-final-cta__cta andara-final-cta__cta--primary"
                  >
                    Explore Andara Ionic Formats
                  </a>
                  <a
                    href="/science"
                    className="andara-final-cta__cta andara-final-cta__cta--ghost"
                  >
                    Or keep exploring the Science Library
                  </a>
                </div>
              </div>
            </div>
          </motion.section>
        </main>
      </MotionConfig>
    </Layout>
  );
}