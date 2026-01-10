import { useEffect } from "react";
import { Link } from "wouter";
import { motion, type Variants } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function PrimordialPage() {
  useEffect(() => {
    const originalTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');

    const originalMeta = {
      description: metaDescription?.getAttribute('content') ?? null,
      ogTitle: ogTitle?.getAttribute('content') ?? null,
      ogDescription: ogDescription?.getAttribute('content') ?? null,
    };

    document.title = "Andara Ionic – Primordial Ionic Sulfate Minerals | Andara Ionic";

    const pageDescription = 'Volcanic mineral intelligence transformed into a precise ionic sulfate complex that clarifies and structures water at micro-doses.';
    if (metaDescription) metaDescription.setAttribute('content', pageDescription);
    if (ogTitle) ogTitle.setAttribute('content', 'Andara Ionic – Primordial Ionic Sulfate Minerals');
    if (ogDescription) ogDescription.setAttribute('content', pageDescription);

    return () => {
      document.title = originalTitle;
      if (metaDescription && originalMeta.description !== null) {
        metaDescription.setAttribute('content', originalMeta.description);
      }
      if (ogTitle && originalMeta.ogTitle !== null) {
        ogTitle.setAttribute('content', originalMeta.ogTitle);
      }
      if (ogDescription && originalMeta.ogDescription !== null) {
        ogDescription.setAttribute('content', originalMeta.ogDescription);
      }
    };
  }, []);

  return (
    <main
      id="andara-ionic-primordial"
      className="andara-page andara-page--product andara-page--science-trust"
      aria-label="Andara Ionic – Primordial Ionic Sulfate Minerals"
      data-testid="primordial-page"
    >
      {/* HERO SECTION */}
      <section
        id="andara-ionic-hero"
        className="andara-hero andara-hero--product"
        aria-label="Andara Ionic Primordial Ionic Sulfate Minerals overview"
      >
        <motion.div
          className="andara-hero__inner"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <header className="andara-hero__content">
            <motion.p
              className="andara-hero__label"
              variants={fadeUpVariant}
            >
              Core Product · Primordial Ionic Sulfate Minerals
            </motion.p>
            <motion.h1
              className="andara-hero__headline"
              variants={fadeUpVariant}
              data-testid="hero-headline"
            >
              Andara Ionic – Primordial Ionic Sulfate Minerals
            </motion.h1>
            <motion.p
              className="andara-hero__subline"
              variants={fadeUpVariant}
            >
              <span className="andara-text-lead">
                Volcanic mineral intelligence, transformed into a precise ionic sulfate complex that clarifies and structures water at micro-doses.
              </span>
              Andara Ionic works in the same <strong>sulfate concentration band</strong> seen in
              <strong> biology, classical water treatment, and lab studies</strong> – turning ordinary water into a
              <strong> clearer, more coherent medium</strong>, without saturating it with salt or heavy additives.
            </motion.p>

            <motion.ul
              className="andara-hero__bullets"
              variants={staggerContainer}
            >
              <motion.li variants={fadeUpVariant}>
                <strong>Volcanic origin:</strong> derived from deep-crust mica and allied minerals with a rich elemental fingerprint.
              </motion.li>
              <motion.li variants={fadeUpVariant}>
                <strong>Fully ionic &amp; sulfated:</strong> all key elements dissolved as <strong>sulfate complexes</strong>, ready to interact with water.
              </motion.li>
              <motion.li variants={fadeUpVariant}>
                <strong>Micro-dose, macro-effect:</strong> typical use in the <strong>17–30 mg/L sulfate band</strong> – small amounts, big shift in clarity and charge behaviour.
              </motion.li>
            </motion.ul>

            <motion.div
              className="andara-hero__cta-group"
              variants={fadeUpVariant}
            >
              <a
                href="#andara-ionic-activation"
                className="andara-hero__cta andara-hero__cta--primary"
                data-testid="cta-how-it-works"
              >
                See how it works in water
              </a>
            </motion.div>

            <motion.p
              className="andara-hero__support-text"
              variants={fadeUpVariant}
            >
              Or go directly to the{" "}
              <Link href="/tools/dilution-calculator" className="andara-hero__support-link">
                Andara Dilution Calculator
              </Link>
              {" "}and{" "}
              <Link href="/shop" className="andara-hero__support-link">
                product formats
              </Link>.
            </motion.p>
          </header>
        </motion.div>
      </section>

      {/* WHAT IT IS SECTION */}
      <section
        id="andara-ionic-what-it-is"
        className="andara-section andara-section--what-it-is"
        aria-label="What Andara Ionic is"
      >
        <div className="andara-section__inner">
          <motion.header
            className="andara-section__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="andara-section__headline">
              What Andara Ionic Actually Is – Beyond "Just Minerals"
            </h2>
            <p className="andara-section__subline">
              <span className="andara-text-lead">
                Andara Ionic is not a salt, not a fulvic concentrate, and not a simple plant extract.
              </span>
              It is a <strong>volcanic sulfate-based ionic mineral complex</strong> crafted from
              deep-crust mineral sources, where each element is brought into a <strong>fully dissolved, sulfated state</strong>
              so it can interact directly with water's charge and structure.
            </p>
          </motion.header>

          <motion.div
            className="andara-grid andara-grid--03 andara-section__items"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.article className="andara-grid__item" variants={fadeUpVariant}>
              <h3 className="andara-grid__title">1. Volcanic Origin</h3>
              <p className="andara-grid__text">
                The story starts in <strong>volcanic strata</strong>, with minerals such as
                <strong> biotite/mica and allied rocks</strong> that carry iron, magnesium, calcium, aluminum,
                silica and rare-earth elements. These deep-crust matrices encode a <strong>rich elemental fingerprint</strong>
                that is very different from standard sea salt.
              </p>
            </motion.article>

            <motion.article className="andara-grid__item" variants={fadeUpVariant}>
              <h3 className="andara-grid__title">2. Ionic Sulfate Transformation</h3>
              <p className="andara-grid__text">
                Through a controlled process, these solids are transformed into <strong>ionic sulfates</strong> –
                all key minerals dissolve into <strong>clear liquid form</strong>. This is not a suspension or colloid:
                the elements are present as <strong>charged ionic pairs</strong>, especially sulfate complexes (SO₄²⁻),
                ready to drive <strong>flocculation and charge re-ordering</strong> in water.
              </p>
            </motion.article>

            <motion.article className="andara-grid__item" variants={fadeUpVariant}>
              <h3 className="andara-grid__title">3. Primordial Concentrate for Micro-Dosing</h3>
              <p className="andara-grid__text">
                The result is a <strong>primordial concentrate</strong> used at very small doses, typically around
                <strong> 1 ml per liter</strong> of water, bringing the sulfate content into the
                <strong> 17–30 mg/L activation band</strong>. Within that range, the water often becomes
                <strong> visibly clearer</strong> and more <strong>electrically coherent</strong>, with a softer, more organized feel.
              </p>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* FROM VOLCANO TO GLASS SECTION */}
      <section
        id="andara-ionic-journey"
        className="andara-section andara-section--journey"
        aria-label="From volcano to glass journey"
      >
        <div className="andara-section__inner">
          <motion.header
            className="andara-section__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="andara-section__headline">
              From Volcano to Glass – The Andara Journey
            </h2>
            <p className="andara-section__subline">
              <span className="andara-text-lead">
                To understand Andara Ionic, it helps to see its path as a simple, clear chain of transformations.
              </span>
              From <strong>rock</strong> to <strong>ionic sulfate concentrate</strong> to
              <strong> activated drinking water</strong>, each step is designed to preserve the
              <strong> elemental richness</strong> while refining the <strong>form</strong>.
            </p>
          </motion.header>

          <motion.div
            className="andara-grid andara-grid--steps andara-section__items"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.article className="andara-grid__item andara-grid__item--step" variants={fadeUpVariant}>
              <div className="andara-grid__step-number">1</div>
              <h3 className="andara-grid__title">Volcanic Mineral Selection</h3>
              <p className="andara-grid__text">
                Start with carefully selected <strong>volcanic mineral sources</strong> carrying deep-crust signatures –
                high in <strong>iron, magnesium, calcium, aluminum, silica</strong> and trace elements.
                Origin, purity, and consistency are key.
              </p>
            </motion.article>

            <motion.article className="andara-grid__item andara-grid__item--step" variants={fadeUpVariant}>
              <div className="andara-grid__step-number">2</div>
              <h3 className="andara-grid__title">Conversion into Ionic Sulfates</h3>
              <p className="andara-grid__text">
                These minerals are processed into a <strong>clear ionic sulfate solution</strong>.
                Solid lattice structures are broken down and reorganized as <strong>dissolved ions</strong> that remain stable
                in liquid form and can directly interact with water's charge system.
              </p>
            </motion.article>

            <motion.article className="andara-grid__item andara-grid__item--step" variants={fadeUpVariant}>
              <div className="andara-grid__step-number">3</div>
              <h3 className="andara-grid__title">Micro-Dose into Your Water</h3>
              <p className="andara-grid__text">
                A small dose (for example <strong>1 ml per 1 L</strong>) is added to your water source,
                calibrated to <strong>17–30 mg/L sulfate</strong>. In this range, the water typically
                <strong> clarifies, reorganizes, and stabilizes</strong> in its charge behaviour.
              </p>
            </motion.article>

            <motion.article className="andara-grid__item andara-grid__item--step" variants={fadeUpVariant}>
              <div className="andara-grid__step-number">4</div>
              <h3 className="andara-grid__title">Clarified &amp; Structured Water</h3>
              <p className="andara-grid__text">
                Suspended particles flocculate and settle, <strong>metals and impurities precipitate</strong>, and the
                remaining water moves toward a <strong>cleaner, more structured state</strong>, often perceived
                as smoother, softer, and more vital.
              </p>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS IN WATER SECTION */}
      <section
        id="andara-ionic-activation"
        className="andara-section andara-section--activation"
        aria-label="How Andara Ionic works in water"
      >
        <div className="andara-section__inner">
          <motion.header
            className="andara-section__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="andara-section__headline">
              What Happens When Andara Ionic Meets Water
            </h2>
            <p className="andara-section__subline">
              <span className="andara-text-lead">
                When the ionic sulfates enter water, they don't just "add minerals" – they reorganize the water environment itself.
              </span>
              In the <strong>Andara activation range</strong> of roughly <strong>17–30 mg/L sulfate</strong>,
              three key processes come into focus: <strong>flocculation, charge re-balancing, and structured hydration layers</strong>.
            </p>
          </motion.header>

          <motion.div
            className="andara-grid andara-grid--02 andara-section__content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.article className="andara-grid__item" variants={fadeUpVariant}>
              <h3 className="andara-grid__title">1. Flocculation &amp; Clarification</h3>
              <p className="andara-grid__text">
                Multivalent ions like <strong>Fe³⁺, Al³⁺, Mg²⁺, Ca²⁺</strong> in sulfate form act as
                <strong> bridges</strong> between suspended particles, organic fragments, and colloids.
                These tiny debris fields begin to <strong>clump together (flocculate)</strong>, becoming heavier and
                easier to remove or settle out, thus <strong>clarifying the water</strong>.
              </p>

              <h3 className="andara-grid__title">2. Charge &amp; Redox Re-Balancing</h3>
              <p className="andara-grid__text">
                As the ionic sulfate complex spreads through the water, it reshapes the
                <strong> charge landscape</strong> – influencing <strong>ORP, conductivity, and local proton gradients</strong>.
                The water tends to move away from chaotic, unstable charge patterns toward a more
                <strong> coherent redox environment</strong>.
              </p>

              <h3 className="andara-grid__title">3. Structured / EZ-Like Zones</h3>
              <p className="andara-grid__text">
                At specific concentration windows, lab observations (UV-range absorbance, turbidity changes) indicate
                the emergence of <strong>ordered hydration domains</strong> – water organizing into more
                <strong> stable, structured layers</strong> around surfaces and solutes, reminiscent of
                <strong> EZ-like water</strong> described in structured water research.
              </p>
            </motion.article>

            <motion.aside className="andara-grid__item" variants={fadeUpVariant}>
              <div className="andara-highlight-box andara-highlight-box--activation">
                <h4 className="andara-highlight-box__title">
                  Andara Activation Snapshot
                </h4>
                <p className="andara-highlight-box__text">
                  <strong>Typical reference dose:</strong><br />
                  1 ml Andara Ionic per 1 L water
                  → ~<strong>17–18 mg/L sulfate</strong>
                  → within the Andara <strong>17–30 mg/L activation band</strong>.
                </p>
                <ul className="andara-highlight-box__list">
                  <li>Water clarity often improves.</li>
                  <li>Suspended solids become easier to filter or settle.</li>
                  <li>Charge and redox behaviour move toward coherence.</li>
                </ul>
                <p className="andara-highlight-box__note">
                  Always follow your local guidelines and the{" "}
                  <Link href="/tools/dilution-calculator">Andara Dilution Calculator</Link>
                  {" "}for specific applications.
                </p>
              </div>
            </motion.aside>
          </motion.div>
        </div>
      </section>

      {/* WHY SULFATE & RARE ELEMENTS SECTION */}
      <section
        id="andara-ionic-sulfate-rare"
        className="andara-section andara-section--science-detail"
        aria-label="Why sulfate and rare elements matter"
      >
        <div className="andara-section__inner">
          <motion.header
            className="andara-section__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="andara-section__headline">
              Why Sulfate &amp; Rare Elements Are at the Heart of Andara Ionic
            </h2>
            <p className="andara-section__subline">
              <span className="andara-text-lead">
                Sulfate is the quiet architect behind many of water's structural and biological behaviours.
              </span>
              When paired with <strong>iron, magnesium, calcium, aluminum, silica, and rare-earth elements</strong>,
              it becomes a powerful driver of <strong>clarification, structuring, and redox management</strong>.
            </p>
          </motion.header>

          <motion.div
            className="andara-grid andara-grid--03 andara-section__items"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.article className="andara-grid__item" variants={fadeUpVariant}>
              <h3 className="andara-grid__title">Sulfate – The Structural Anion</h3>
              <p className="andara-grid__text">
                Sulfate (SO₄²⁻) interacts strongly with water and charged surfaces. In both
                <strong> drinking water treatment</strong> and <strong>biology</strong>, sulfate-rich regimes are repeatedly
                associated with <strong>stable gels, hydration layers, and flocculation</strong>.
                Andara Ionic places sulfate at the center of its design.
              </p>
            </motion.article>

            <motion.article className="andara-grid__item" variants={fadeUpVariant}>
              <h3 className="andara-grid__title">Multivalent Cations – Bridges &amp; Anchors</h3>
              <p className="andara-grid__text">
                Ions like <strong>Fe³⁺, Al³⁺, Mg²⁺, Ca²⁺</strong> form <strong>bridges</strong> between particles and surfaces.
                They bind to colloids, organic residues, and charged interfaces, helping
                <strong> organize and condense</strong> what would otherwise remain diffuse and cloudy.
              </p>
            </motion.article>

            <motion.article className="andara-grid__item" variants={fadeUpVariant}>
              <h3 className="andara-grid__title">Rare &amp; Ultra-Trace Elements – The Fine Tuning</h3>
              <p className="andara-grid__text">
                Volcanic mineral matrices also carry <strong>rare and ultra-trace elements</strong> in minute amounts.
                While tiny, these can <strong>modulate redox chemistry, enzyme environments, and field behaviour</strong>,
                acting like fine-tuning knobs in both water and biology.
              </p>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* USE SCENARIOS SECTION */}
      <section
        id="andara-ionic-scenarios"
        className="andara-section andara-section--scenarios"
        aria-label="Use scenarios for Andara Ionic"
      >
        <div className="andara-section__inner">
          <motion.header
            className="andara-section__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="andara-section__headline">
              Where Andara Ionic Fits – Use Scenarios
            </h2>
            <p className="andara-section__subline">
              <span className="andara-text-lead">
                Andara Ionic is a precision tool for water and fields, not a generic "add some minerals" product.
              </span>
              Its primary role is to <strong>clarify, condition, and structure water</strong>
              within carefully defined micro-dose ranges.
            </p>
          </motion.header>

          <motion.div
            className="andara-grid andara-grid--04 andara-section__items"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.article className="andara-grid__item" variants={fadeUpVariant}>
              <h3 className="andara-grid__title">Home &amp; Personal Water</h3>
              <p className="andara-grid__text">
                Use as a <strong>water conditioning agent</strong> in combination with filtration,
                to support clearer, smoother drinking water tuned to the Andara activation range.
              </p>
            </motion.article>

            <motion.article className="andara-grid__item" variants={fadeUpVariant}>
              <h3 className="andara-grid__title">Spa, Wellness &amp; Retreats</h3>
              <p className="andara-grid__text">
                Integrate Andara Ionic into <strong>structured water bars, spa rituals, or retreat offerings</strong>,
                where users can experience the difference between untreated and Andara-conditioned water.
              </p>
            </motion.article>

            <motion.article className="andara-grid__item" variants={fadeUpVariant}>
              <h3 className="andara-grid__title">Research &amp; Lab Use</h3>
              <p className="andara-grid__text">
                Apply Andara Ionic in <strong>experimental setups</strong> exploring
                turbidity, flocculation, ORP shifts, or structured water phenomena in controlled conditions.
              </p>
            </motion.article>

            <motion.article className="andara-grid__item" variants={fadeUpVariant}>
              <h3 className="andara-grid__title">Soil &amp; Irrigation (Advanced)</h3>
              <p className="andara-grid__text">
                In advanced projects, explore Andara Ionic as a <strong>water-conditioning step</strong> in irrigation streams
                where clarification, mineral codes, and bioelectric properties of water matter.
              </p>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="andara-section andara-section--cta" style={{ textAlign: 'center', paddingBottom: '80px' }}>
        <div className="andara-section__inner">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUpVariant}
          >
            <h2 className="andara-section__headline">Ready to Experience Andara Ionic?</h2>
            <p className="andara-section__subline" style={{ marginBottom: '32px' }}>
              Explore our product range and start your journey with primordial ionic sulfate minerals.
            </p>
            <div className="andara-hero__cta-group">
              <Link href="/shop" className="andara-hero__cta andara-hero__cta--primary" data-testid="cta-shop">
                Shop Now
              </Link>
              <Link href="/science" className="andara-cta andara-cta--secondary" data-testid="cta-science">
                Explore the Science
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
