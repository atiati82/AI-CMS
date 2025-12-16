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

export default function WaterSciencePage() {
  return (
    <Layout>
      <MotionConfig transition={{ duration: 0.7, ease: "easeOut" }}>
        <main
          id="andara-water-science"
          className="andara-page andara-page--science"
          aria-label="Water Science – The Liquid Architecture That Runs Your Life"
        >
          {/* HERO – WATER SCIENCE */}
          <motion.section
            id="water-science-hero"
            className="andara-hero andara-hero--primary"
            aria-label="Water Science main introduction"
            initial="hidden"
            animate="visible"
            variants={fadeUpContainer}
          >
            <div className="andara-hero__inner">
              <header className="andara-hero__content">
                <motion.p className="andara-hero__label" variants={fadeChild}>
                  Science Library · Water · Liquid Architecture &amp; Terrain
                </motion.p>

                <motion.h1 className="andara-hero__headline" variants={fadeChild}>
                  Water Science: Understand the Liquid Architecture That Runs Your Life
                </motion.h1>

                <motion.p className="andara-hero__subline" variants={fadeChild}>
                  <span className="andara-text-lead">
                    Before nutrients, hormones, or protocols, there is one silent architect behind every terrain:
                    <strong> water</strong>.
                  </span>{" "}
                  Not just "H₂O in a glass", but a <strong>liquid crystal medium</strong> that holds charge, structure,
                  and information – shaping how life can flow, organise, and regenerate.
                </motion.p>

                <motion.ul className="andara-hero__bullets" variants={fadeUpContainer}>
                  <motion.li variants={fadeChild}>
                    <strong>Liquid architecture:</strong> how water <strong>structures, layers, and interfaces</strong> with tissues.
                  </motion.li>
                  <motion.li variants={fadeChild}>
                    <strong>Charge &amp; structure:</strong> why pH, ORP, EC, and EZ-water matter for <strong>terrain clarity</strong>.
                  </motion.li>
                  <motion.li variants={fadeChild}>
                    <strong>Water as a medium:</strong> how filtration, structuring, and minerals shape the
                    <strong> quality of your internal river</strong>.
                  </motion.li>
                </motion.ul>
              </header>

              <motion.figure className="andara-hero__media" variants={fadeChild}>
                <motion.div
                  className="andara-hero__media-placeholder"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: [1, 1.02, 1] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                >
                  <p>
                    [Hero visual: luminous water droplet with hexagonal patterns and a gentle vortex inside, floating in
                    deep indigo space. Aqua-turquoise light flows through it, connecting to a larger network of liquid
                    crystal structures in the background.]
                  </p>
                </motion.div>
                <motion.figcaption className="andara-hero__media-caption" variants={fadeChild}>
                  Water is not just a fluid you drink – it is the liquid architecture that carries charge, light, and
                  information through the entire terrain.
                </motion.figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/* SECTION – WHAT IS "LIVING" WATER? */}
          <motion.section
            id="water-science-what-is-living-water"
            className="andara-section andara-section--what-it-is"
            aria-label="What is living water"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  What Do We Mean by "Living" Water?
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    In this library, "living water" doesn't mean magic – it means water that is
                    <strong> clean, structured, and charged</strong>.
                  </span>{" "}
                  Water that behaves like a <strong>coherent, responsive medium</strong>, not a stagnant liquid.
                </p>
              </header>

              <motion.div
                className="andara-grid andara-grid--03 andara-section__items"
                variants={fadeUpContainer}
              >
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    1. Clean – Free from Burden
                  </h3>
                  <p className="andara-grid__text">
                    Water that has had its <strong>physical and chemical burdens</strong> reduced:
                    sediments, heavy metals, chlorine, microplastics, and excess by-products are
                    <strong> filtered or bound</strong>.
                  </p>
                  <p className="andara-grid__text">
                    Clarity here is about giving the terrain a <strong>neutral canvas</strong>, not a cocktail of
                    hidden stressors.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    2. Structured – Organised at the Interface
                  </h3>
                  <p className="andara-grid__text">
                    Around proteins, membranes, and surfaces, water can form more ordered,
                    <strong> liquid crystalline layers</strong>. These interfacial zones support
                    <strong> charge separation, information storage, and flow</strong>.
                  </p>
                  <p className="andara-grid__text">
                    Structured water is not a brand – it is a <strong>behaviour</strong> water can show under the right
                    conditions.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    3. Charged – Able to Carry Potential
                  </h3>
                  <p className="andara-grid__text">
                    Water that can <strong>hold and move electrons, protons, and ions</strong> behaves differently from
                    chemically identical water that is depleted.
                  </p>
                  <p className="andara-grid__text">
                    Here, we look at <strong>pH, ORP, EC, and light exposure</strong> as simple windows into how "awake"
                    the medium might be.
                  </p>
                </motion.article>
              </motion.div>

              <motion.figure className="andara-figure andara-figure--living-water" variants={fadeChild}>
                <div className="andara-figure__visual">
                  <p>
                    [Infographic: three overlapping circles labelled "Clean", "Structured", "Charged".
                    The overlap region labelled "Living Water Behaviour". Small icons: filter, hexagon, lightning.]
                  </p>
                </div>
                <figcaption className="andara-figure__caption">
                  "Living water" in this library means a combination of cleanliness, structure, and electrical potential.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/* SECTION – EZ-WATER & LIQUID CRYSTAL BEHAVIOUR */}
          <motion.section
            id="water-science-ez"
            className="andara-section andara-section--ez-water"
            aria-label="EZ-water and liquid crystal behaviour"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  EZ-Water: The Liquid Crystal Layers that Power Terrain
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    At hydrophilic surfaces, water can form an "Exclusion Zone" (EZ) – a region with
                    <strong> altered structure and charge</strong>.
                  </span>{" "}
                  Think of it as a <strong>liquid crystal battery</strong> that emerges right where life happens:
                  at interfaces.
                </p>
              </header>

              <motion.div
                className="andara-grid andara-grid--02 andara-section__items"
                variants={fadeUpContainer}
              >
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    Exclusion Zones – Ordered Water at Surfaces
                  </h3>
                  <p className="andara-grid__text">
                    In the EZ region, water molecules arrange in more ordered patterns, often visualised as
                    <strong> hexagonal layers</strong>. This region tends to exclude certain solutes and carry a
                    <strong> net negative charge</strong>.
                  </p>
                  <p className="andara-grid__text">
                    EZ-water acts like a <strong>charge reservoir</strong>, influenced by light, surfaces, and solutes.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    Light, Minerals &amp; Flow as EZ Catalysts
                  </h3>
                  <p className="andara-grid__text">
                    Studies suggest that <strong>infrared light</strong>, certain <strong>minerals</strong>, and
                    <strong> gentle flow</strong> can expand these structured zones.
                  </p>
                  <p className="andara-grid__text">
                    This connects water science directly to <strong>sunlight exposure, mineral composition, and vortex-like
                    movements</strong> in the terrain.
                  </p>
                </motion.article>
              </motion.div>

              <motion.figure className="andara-figure andara-figure--ez-diagram" variants={fadeChild}>
                <div className="andara-figure__visual">
                  <p>
                    [Diagram: a surface on the left, layers of hexagonal water extending from it labelled "EZ Region (–)",
                    and bulk water further out labelled "Bulk Water". An arrow from IR light indicates EZ expansion.]
                  </p>
                </div>
                <figcaption className="andara-figure__caption">
                  EZ-water can be seen as a structured, negatively charged zone next to surfaces – a tiny liquid crystal
                  power bank.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/* SECTION – pH, ORP, EC: SIMPLE WINDOWS INTO WATER BEHAVIOUR */}
          <motion.section
            id="water-science-metrics"
            className="andara-section andara-section--metrics"
            aria-label="Water metrics – pH, ORP, EC"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  pH, ORP, and EC – Three Simple Windows into Water's Inner State
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    No single number defines water quality.
                  </span>{" "}
                  But three simple measures – <strong>pH</strong>, <strong>ORP</strong>, and
                  <strong> EC</strong> – can give a practical sense of how water might behave as a medium.
                </p>
              </header>

              <motion.div
                className="andara-grid andara-grid--03 andara-section__items"
                variants={fadeUpContainer}
              >
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">pH – Potential of Hydrogen</h3>
                  <p className="andara-grid__text">
                    pH reflects the <strong>balance of hydrogen ions</strong>. It is essentially a measure of
                    <strong> electrical potential of hydrogen</strong>.
                  </p>
                  <p className="andara-grid__text">
                    Terrain-wise, we care less about chasing exact numbers and more about <strong>stability and context</strong>:
                    source, minerals, and use case.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">ORP – Oxidation-Reduction Potential</h3>
                  <p className="andara-grid__text">
                    ORP indicates whether water tends to <strong>accept or donate electrons</strong>. Negative values can
                    suggest more <strong>electron-rich environments</strong>, while positive values can indicate oxidising
                    tendencies.
                  </p>
                  <p className="andara-grid__text">
                    In a terrain context, ORP is one lens on how water might <strong>interact with redox processes</strong>.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">EC – Electrical Conductivity</h3>
                  <p className="andara-grid__text">
                    EC measures how easily water <strong>conducts electrical current</strong>, which depends largely on
                    <strong> dissolved ions</strong>.
                  </p>
                  <p className="andara-grid__text">
                    This is a practical proxy for <strong>mineral content</strong> and the potential of water to
                    <strong> carry bioelectric signals</strong>.
                  </p>
                </motion.article>
              </motion.div>

              <motion.figure className="andara-figure andara-figure--metrics-chart" variants={fadeChild}>
                <div className="andara-figure__visual">
                  <p>
                    [Chart idea: three vertical bands labelled "pH", "ORP", "EC" with example ranges and tiny icons:
                    proton symbol, electron arrow, conductivity waves. Use soft gradients, not harsh lines.]
                  </p>
                </div>
                <figcaption className="andara-figure__caption">
                  pH, ORP, and EC don't tell the whole story – but together they offer a simple, practical window into
                  how water might behave as a medium.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/* SECTION – SOURCES OF WATER & TERRAIN CONTEXT */}
          <motion.section
            id="water-science-sources"
            className="andara-section andara-section--sources"
            aria-label="Water sources and terrain context"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  Source Matters: Tap, Well, Spring, Bottled – Different Stories, Different Terrain
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    Water is not just a product – it is a story of geology, treatment, and infrastructure.
                  </span>{" "}
                  Each source carries its own <strong>mineral fingerprint, structural history, and energetic context</strong>.
                </p>
              </header>

              <motion.div
                className="andara-grid andara-grid--04 andara-section__items"
                variants={fadeUpContainer}
              >
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Municipal / Tap</h3>
                  <p className="andara-grid__text">
                    Treated for safety and distribution, often carrying <strong>chlorine, residues, and pressure history</strong>.
                    A good candidate for <strong>filtration and restructuring</strong>.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Well / Bore</h3>
                  <p className="andara-grid__text">
                    Deep contact with geology offers <strong>mineral richness</strong>, but also the possibility of
                    <strong> local contaminants</strong>. Testing, filtration, and mineral context are key.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Spring / Gravity-Fed</h3>
                  <p className="andara-grid__text">
                    Naturally filtered and <strong>geo-structured</strong> over time, sometimes with a strong
                    <strong> energetic signature</strong>. Still benefits from awareness of <strong>source and route</strong>.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Bottled / Processed</h3>
                  <p className="andara-grid__text">
                    Can range from <strong>high-quality spring captures</strong> to <strong>reprocessed tap</strong>.
                    Plastic contact, storage time, and unknown treatment all shape the final terrain impact.
                  </p>
                </motion.article>
              </motion.div>

              <motion.figure className="andara-figure andara-figure--map" variants={fadeChild}>
                <div className="andara-figure__visual">
                  <p>
                    [Visual idea: simple map-like illustration with icons for tap, well, spring, and bottled,
                    each connected to a central "Terrain Water" node.]
                  </p>
                </div>
                <figcaption className="andara-figure__caption">
                  Different sources bring different stories. The goal is not perfection, but <strong>conscious curation</strong>
                  of the water that feeds your terrain.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>

          {/* SECTION – ANDARA IONIC & WATER SCIENCE */}
          <motion.section
            id="water-science-andara-link"
            className="andara-section andara-section--product-link"
            aria-label="Linking Andara Ionic to water science perspective"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  Where Andara Ionic Fits into the Water Science Story
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    Andara Ionic is not a water "treatment plant".
                  </span>{" "}
                  It is a <strong>primordial ionic sulfate mineral code</strong> designed to work
                  <strong> after core filtration</strong>, in the realm of <strong>conditioning and structuring</strong>.
                </p>
              </header>

              <motion.div
                className="andara-grid andara-grid--02 andara-section__items"
                variants={fadeUpContainer}
              >
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    From Clean to Informed Water
                  </h3>
                  <p className="andara-grid__text">
                    Once water is physically and chemically clarified, a micro-dose of Andara Ionic can
                    <strong> introduce a balanced ionic sulfate field</strong>.
                  </p>
                  <p className="andara-grid__text">
                    In the Andara view, this supports water in behaving more like a
                    <strong> structured, mineral-informed medium</strong> instead of a neutral solvent.
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">
                    Terrain-First, Non-Medical Perspective
                  </h3>
                  <p className="andara-grid__text">
                    The intention is <strong>not to treat or diagnose</strong> anything, but to
                    <strong> tend to the medium</strong> that underlies terrain:
                    the water that touches tissues, fascia, and fields every day.
                  </p>
                  <p className="andara-grid__text">
                    Clearer, better-organised water is one element in a
                    <strong> more coherent terrain architecture</strong>.
                  </p>
                </motion.article>
              </motion.div>

              <motion.div className="andara-highlight-box andara-highlight-box--cta" variants={fadeChild}>
                <p className="andara-highlight-box__text">
                  For concrete details – dilution examples, sulfate bands, and logistics – visit the{" "}
                  <Link href="/shop/andara-ionic-100ml">Andara Ionic 100&nbsp;ml</Link> and{" "}
                  <Link href="/shop/andara-ionic-1l">1&nbsp;L</Link> product pages. This Science Library page stays focused on
                  <strong> understanding water as a medium</strong>.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* SECTION – FAQ (WATER SCIENCE CLARIFICATIONS) */}
          <motion.section
            id="water-science-faq"
            className="andara-section andara-section--faq"
            aria-label="Water Science frequently asked questions"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeUp}
          >
            <div className="andara-section__inner">
              <header className="andara-section__header">
                <h2 className="andara-section__headline">
                  Water Science – Gentle Clarifications
                </h2>
                <p className="andara-section__subline">
                  A few common questions, answered from a <strong>terrain-first, non-medical</strong> viewpoint.
                </p>
              </header>

              <motion.div className="andara-faq" variants={fadeUpContainer}>
                <motion.article className="andara-faq__item" variants={fadeChild}>
                  <h3 className="andara-faq__question">
                    Does "structured water" mean I need a specific device?
                  </h3>
                  <p className="andara-faq__answer">
                    No single tool owns the concept.{" "}
                    Structure can emerge from <strong>surfaces, light, minerals, vortex flow, and biological interfaces</strong>.{" "}
                    Devices can be one way of working with these principles, but the concept itself is
                    <strong> broader than any product</strong>.
                  </p>
                </motion.article>

                <motion.article className="andara-faq__item" variants={fadeChild}>
                  <h3 className="andara-faq__question">
                    Is high pH water automatically "better"?
                  </h3>
                  <p className="andara-faq__answer">
                    Not necessarily.{" "}
                    pH is one parameter, and very high values may not match the needs of all terrains or contexts.{" "}
                    This library looks at <strong>overall behaviour</strong> – source, minerals, structure, and
                    <strong> how water is used</strong> – rather than chasing a single pH target.
                  </p>
                </motion.article>

                <motion.article className="andara-faq__item" variants={fadeChild}>
                  <h3 className="andara-faq__question">
                    Is this page medical advice?
                  </h3>
                  <p className="andara-faq__answer">
                    No.{" "}
                    These ideas are <strong>educational and exploratory</strong>. They do not replace medical care,
                    diagnosis, or treatment.{" "}
                    The goal is to offer a <strong>field-first way to think about water</strong> in your terrain.
                  </p>
                </motion.article>
              </motion.div>
            </div>
          </motion.section>

          {/* SECTION – SCIENCE LIBRARY FOOTER (CROSS-LINKS) */}
          <motion.section
            id="water-science-science-footer"
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
                  Water Is One Pillar in the Andara Science Library
                </h2>
                <p className="andara-section__subline">
                  <span className="andara-text-lead">
                    To see the full architecture, explore the other pillars.
                  </span>{" "}
                  Water, minerals, bioelectricity, and crystalline geometry interlock like a
                  <strong> living circuit</strong>.
                </p>
              </header>

              <motion.div
                className="andara-grid andara-grid--04 andara-grid--library-footer andara-section__items"
                aria-label="Science Library pillars"
                variants={fadeUpContainer}
              >
                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Bioelectricity</h3>
                  <p className="andara-grid__text">
                    Voltage, gradients, and fields: the electrical side of the terrain.
                  </p>
                  <p className="andara-grid__link">
                    <Link href="/science/bioelectricity">Go to Bioelectricity →</Link>
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Mineral Science</h3>
                  <p className="andara-grid__text">
                    How different mineral forms speak to water and tissues.
                  </p>
                  <p className="andara-grid__link">
                    <Link href="/science/minerals">Go to Mineral Science →</Link>
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Crystalline Matrix</h3>
                  <p className="andara-grid__text">
                    Lattices, geometry, and mineral-light coherence.
                  </p>
                  <p className="andara-grid__link">
                    <Link href="/science/crystalline-matrix">Go to Crystalline Matrix →</Link>
                  </p>
                </motion.article>

                <motion.article className="andara-grid__item" variants={fadeChild}>
                  <h3 className="andara-grid__title">Terrain &amp; Regeneration</h3>
                  <p className="andara-grid__text">
                    How all pillars interact when we look at regeneration as a field phenomenon.
                  </p>
                  <p className="andara-grid__link">
                    <Link href="/science/terrain-regeneration">Go to Terrain &amp; Regeneration →</Link>
                  </p>
                </motion.article>
              </motion.div>

              <motion.div className="andara-highlight-box andara-highlight-box--neural-footer" variants={fadeChild}>
                <p className="andara-highlight-box__text">
                  The <strong>Andara Library Engine</strong> is designed so you can start anywhere – water, minerals,
                  bioelectricity – and still find your way back to the <strong>whole circuit</strong>.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* FINAL CTA */}
          <motion.section
            id="water-science-final-cta"
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
                  Change the water, and you change the way the terrain can speak.
                </h2>
                <p className="andara-final-cta__text">
                  If this way of seeing water <strong>resonates</strong> with you, begin with what is closest:{" "}
                  <strong>the sources you choose, the filtration you use, and the way you inform your daily water</strong>.{" "}
                  The terrain listens to the <strong>quality of its liquid architecture</strong>.
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
                    Or keep exploring the Science Library
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
