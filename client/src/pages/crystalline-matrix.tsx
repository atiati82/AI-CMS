import { motion, type Easing, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Hexagon, Sparkles, Droplet, Leaf, Heart, Zap, Grid3X3, Atom } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoBackground, SmartVideoEmbed } from "@/components/SmartVideoEmbed";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Layout from "@/components/layout";

const easeOut = [0.23, 0.82, 0.35, 1] as const;

const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const crystalFacets = [
  { icon: Droplet, label: "Water", desc: "Hexagonal layers & structured hydrogen-bond networks" },
  { icon: Atom, label: "Minerals", desc: "Lattice patterns, ionic clusters & nano-structures" },
  { icon: Heart, label: "Body", desc: "Collagen, fascia, bone, cytoskeleton & connective tissues" },
  { icon: Leaf, label: "Soil", desc: "Clay lattices, silicates & carbon frameworks" },
];

const matrixProperties = [
  { title: "Holds Charge", desc: "Distributes electrical potential across the matrix" },
  { title: "Light Responsive", desc: "Responds to light and electromagnetic fields" },
  { title: "Information Transfer", desc: "Supports coherent data flow through structure" },
  { title: "Ion Movement", desc: "Enables coordinated movement of ions and electrons" },
];

const applications = [
  {
    icon: Droplet,
    label: "Structured Drinking Water",
    description: "Water with restored geometry supports better hydration, charge movement and clarity."
  },
  {
    icon: Zap,
    label: "Mineralized Terrain Support",
    description: "Balanced ionic crystalline fields can support detox processes and cellular voltage."
  },
  {
    icon: Leaf,
    label: "Soil Remineralization",
    description: "Crystal-aligned mineral additions help rebuild soil lattice structure."
  },
  {
    icon: Sparkles,
    label: "Spa & Wellness Hydrotherapies",
    description: "Structured mineral water enhances sensory, energetic and relaxation qualities."
  },
  {
    icon: Grid3X3,
    label: "Energetic Coherence Enhancement",
    description: "Crystalline fields make systems more receptive to coherent frequencies."
  },
];

const faqs = [
  {
    question: "Is crystalline structure the same as structured water?",
    answer: "Structured water is one form of crystalline ordering — specifically in the liquid phase. The crystalline matrix concept is broader and includes minerals, biological tissues and soil structures."
  },
  {
    question: "Are crystals the same as crystal healing?",
    answer: "This page refers to scientific crystalline structures (geometry, charge, ordering). These principles may overlap with metaphysical interpretations but focus on measurable structure and coherence."
  },
  {
    question: "Does Andara Ionic create crystals in water?",
    answer: "No. It does not crystallize the water. Instead, it shapes the ionic and electrochemical environment so that water can naturally assume more ordered, coherent structures."
  },
  {
    question: "Is crystalline order visible to the naked eye?",
    answer: "Most crystalline behavior in water and biology occurs at micro- or nano-scales, but its effects — clarity, smoothness, taste, conductivity — can be felt or measured indirectly."
  },
];

const relatedPages = [
  { slug: "water-science", title: "Water Science", reason: "Water forms hexagonal and EZ-water crystalline structures" },
  { slug: "mineral-science", title: "Mineral Science", reason: "Minerals provide the ionic lattices that guide crystalline order" },
  { slug: "bioelectric-health", title: "Bioelectric Health", reason: "Crystalline fascia networks conduct bioelectric currents" },
];

export default function CrystallineMatrixPage() {
  return (
    <Layout>
      <article className="min-h-screen">
        <section className="relative overflow-hidden bg-slate-950 py-24 md:py-32">
          <VideoBackground keywords={["crystal", "lattice", "geometry", "indigo", "structure"]} overlayOpacity={0.4} />

          <div className="container mx-auto px-4 max-w-5xl relative z-10">
            <motion.div variants={fadeUp} initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6, ease: easeOut }}>
              <Link
                href="/science"
                className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-emerald-400 mb-8 transition-colors"
                data-testid="link-back-to-science"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Science Library
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" as Easing }}
              className="text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <motion.div
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut" as Easing,
                  }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/25"
                >
                  <Hexagon className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-xs uppercase tracking-[0.25em] text-indigo-400 font-medium">
                  Crystalline Matrix
                </span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-6 leading-tight tracking-tight"
                data-testid="text-page-title"
              >
                Where Geometry, Water, and Minerals
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
                  Become Living Structure
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-10">
                Beyond chemistry lies an ordered, geometric architecture that shapes water, minerals and biological life.
                Discover how crystalline fields create coherence, charge and vitality.
              </p>

              <motion.div
                className="bg-slate-900/60 border border-indigo-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm mb-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                data-testid="text-tldr"
              >
                <p className="text-base md:text-lg text-slate-200 leading-relaxed">
                  <span className="text-emerald-400 font-semibold">TL;DR:</span>{" "}
                  This page reveals the multidimensional science of crystalline structure: how water, minerals and living tissues
                  form geometric order that supports bioelectricity, detox, vitality and resonance.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Link href="/shop/andara-ionic-100ml">
                  <Button
                    size="lg"
                    className="rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25"
                    data-testid="button-hero-cta"
                  >
                    Explore Andara Ionic Minerals
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="bg-slate-950 py-20 border-t border-slate-800/50">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4 tracking-tight">
                What Is a Crystalline Matrix?
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                A geometric arrangement of molecules or ions that produces order, stability and information flow.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
            >
              {crystalFacets.map((facet, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 text-center group hover:border-indigo-500/30 transition-all duration-300"
                  data-testid={`card-facet-${i}`}
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600/20 transition-colors">
                    <facet.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{facet.label}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{facet.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-slate-700/50 rounded-3xl p-8 md:p-10"
            >
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                A Dynamic Order-Field That...
              </h3>
              <div className="mb-8 rounded-2xl overflow-hidden border border-indigo-500/30">
                <SmartVideoEmbed
                  keywords={["crystal", "lattice", "molecular", "order"]}
                  className="w-full aspect-video object-cover"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matrixProperties.map((prop, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">{prop.title}</h4>
                      <p className="text-sm text-slate-400">{prop.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-6 tracking-tight text-center">
                The Hidden Problem
              </h2>
              <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
                Modern environments often degrade or distort natural crystalline patterns.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="space-y-4"
            >
              {[
                { problem: "High-pressure, dead-angle plumbing", effect: "Disrupts water's natural micro-crystalline hydrogen-bond networks" },
                { problem: "Chemical treatments", effect: "Chlorine, residues, and pollutants break structural coherence" },
                { problem: "Electro-smog and chaotic EM fields", effect: "Reduce biological resonance and charge separation" },
                { problem: "Over-farmed, mineral-poor soils", effect: "Lose clay-lattice order and microbial intelligence" },
                { problem: "Ultra-processed food and water", effect: "Remove the crystalline structuring cues found in living systems" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-slate-900/60 border border-red-900/20 rounded-xl p-5 hover:border-red-500/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 text-sm font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">{item.problem}</h4>
                    <p className="text-sm text-slate-400">{item.effect}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="mt-12 bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 text-center"
            >
              <p className="text-slate-300">
                The result: water may be chemically clean but <span className="text-amber-400 font-medium">structurally incoherent</span>,
                soil may exist but <span className="text-amber-400 font-medium">lacks mineral geometry</span>,
                and the body may be hydrated but <span className="text-amber-400 font-medium">not ordered</span>.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-slate-900 py-20 border-y border-slate-800/50">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4 tracking-tight">
                The Andara Perspective
              </h2>
              <p className="text-emerald-400 text-lg font-medium">
                Life Thrives in Ordered Geometry
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                variants={fadeUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-white mb-4">When Structure Is Present</h3>
                {[
                  "Water organizes into hexagonal, tetrahedral clusters",
                  "Minerals display highly structured ionic lattices",
                  "Biological tissues contain liquid crystal phases",
                  "Soil holds clay-mineral crystalline sheets",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                      <Hexagon className="w-3 h-3 text-indigo-400" />
                    </div>
                    <p className="text-slate-300">{item}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-white mb-4">The System Becomes</h3>
                {[
                  { label: "Conductive", desc: "More efficient at electron flow" },
                  { label: "Detoxifying", desc: "More efficient at cleansing" },
                  { label: "Resonant", desc: "Aligned with natural EM fields" },
                  { label: "Regenerative", desc: "Capable of self-repair and adaptation" },
                ].map((item, i) => (
                  <div key={i} className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-4">
                    <h4 className="text-emerald-400 font-semibold mb-1">{item.label}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div {...fadeUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4 tracking-tight">
                Applications of Crystalline Matrix Science
              </h2>
            </motion.div>

            <motion.div
              {...staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {applications.map((app, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300"
                  data-testid={`card-application-${i}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/20 to-indigo-600/20 flex items-center justify-center mb-4">
                    <app.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{app.label}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{app.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-slate-900 py-20 border-y border-slate-800/50">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div {...fadeUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4 tracking-tight">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border border-slate-800 rounded-xl px-6 bg-slate-900/50 data-[state=open]:border-indigo-500/30 transition-colors"
                  >
                    <AccordionTrigger className="text-left text-white font-medium hover:no-underline py-5 hover:text-indigo-400 transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-400 pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <div className="bg-gradient-to-br from-indigo-900/40 via-slate-900 to-emerald-900/30 border border-indigo-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/30 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/30 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-6">
                    Begin Working With Crystalline Coherence
                  </h2>
                  <p className="text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                    The crystalline matrix is the invisible architecture behind life, charge, structure and vitality.
                    When water, minerals and tissues return to geometric coherence, the terrain becomes more resilient, energized and harmonious.
                  </p>
                  <Link href="/shop/andara-ionic-100ml">
                    <Button
                      size="lg"
                      className="rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25"
                      data-testid="button-cta-section"
                    >
                      Explore Andara Ionic Minerals
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-slate-950 py-16 border-t border-slate-800/50">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-4">
                Continue Exploring the Science
              </h2>
              <p className="text-slate-400 mb-8">
                This topic connects to other foundational pillars in the Andara Ionic Science Library.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {relatedPages.map((related, i) => (
                <Link key={i} href={`/science/${related.slug}`}>
                  <motion.div
                    variants={staggerItem}
                    whileHover={{ y: -4 }}
                    className="group bg-slate-900/70 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/30 transition-all cursor-pointer h-full"
                    data-testid={`link-related-${related.slug}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {related.title}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors flex-shrink-0 mt-1" />
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {related.reason}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>
      </article>
    </Layout>
  );
}
