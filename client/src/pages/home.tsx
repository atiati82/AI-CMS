import { Link } from "wouter";
import { ArrowRight, Check, Droplet, Star } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout";
import { motionPresets } from "@/lib/motionPresets";

import productBottle from "@assets/generated_images/amber_glass_dropper_bottle_for_andara_ionic_product.png";
import waterBg from "@assets/generated_images/abstract_water_structure_background.png";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section - Template v0.8 */}
      <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Gradient Overlay (cosmic multi-color glow) */}
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_0%_0%,#4b0082_0,#020617_50%),radial-gradient(circle_at_100%_100%,#22c55e_0,transparent_45%),radial-gradient(circle_at_50%_120%,#38bdf8_0,transparent_55%)]" />
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={waterBg} 
            alt="" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        {/* Hero Content Container */}
        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-center lg:py-28">
          {/* Text Content */}
          <motion.div 
            className="flex-1 space-y-8 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={motionPresets["scroll-fade-up-stagger"]}
          >
            {/* Top Badge */}
            <motion.span 
              className="inline rounded-full border border-indigo-400/40 bg-indigo-900/20 px-3 py-1 text-xs uppercase tracking-[0.25em] text-indigo-200"
              variants={motionPresets["scroll-fade-up"]}
            >
              Primordial Mineral Science
            </motion.span>

            {/* H1 - Main Hero Title */}
            <motion.h1 
              className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl"
              variants={motionPresets["scroll-fade-up"]}
            >
              Structure Your <br />
              <span className="text-indigo-300">Living Water</span>
            </motion.h1>

            {/* Lead Paragraph */}
            <motion.p 
              className="text-balance text-lg leading-relaxed text-slate-200 sm:text-xl max-w-lg mx-auto lg:mx-0"
              variants={motionPresets["scroll-fade-up"]}
            >
              A concentrated ionic sulfate mineral solution designed to restore the natural crystalline phase of water for optimal cellular hydration.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={motionPresets["scroll-fade-up"]}
            >
              <Link href="/shop/andara-ionic-100ml">
                <button className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300">
                  Discover Andara Ionic
                </button>
              </Link>
              <Link href="/science">
                <button className="text-sm font-medium text-slate-200 underline-offset-4 hover:text-emerald-200 hover:underline flex items-center gap-2">
                  Explore Science <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Product Image */}
          <motion.div 
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative w-[280px] sm:w-[350px] lg:w-[450px] aspect-square">
              <div className="absolute inset-0 bg-emerald-400/10 rounded-full blur-[100px]" />
              <img 
                src={productBottle} 
                alt="Andara Ionic Bottle" 
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Props Section - Template v0.8 */}
      <section className="border-b border-slate-800 bg-slate-950/90 py-20">
        <div className="mx-auto max-w-6xl space-y-10 px-6">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={motionPresets["scroll-fade-up-stagger"]}
          >
            {[
              {
                icon: Droplet,
                title: "Ionic Bioavailability",
                desc: "Dissolved minerals in their ionic state for immediate cellular absorption."
              },
              {
                icon: Star,
                title: "Crystalline Structure",
                desc: "Promotes the alignment of water molecules into a coherent, liquid crystal phase."
              },
              {
                icon: Check,
                title: "Impurity Flocculation",
                desc: "Naturally binds to and precipitates contaminants out of solution."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                className="group rounded-2xl border border-slate-700/70 bg-slate-900/60 p-5 shadow-sm shadow-black/40 transition hover:border-emerald-300/60"
                variants={motionPresets["scroll-fade-up"]}
              >
                {/* Icon Container */}
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800">
                  <feature.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-50 mb-2">{feature.title}</h3>
                <p className="text-xs leading-relaxed text-slate-300">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Science Teaser Section - Template v0.8 */}
      <section className="border-b border-slate-800 bg-slate-950/95 py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-start">
          {/* Image Card */}
          <motion.div 
            className="relative flex max-w-sm flex-col items-center gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <img src={waterBg} className="w-full h-48 object-cover rounded-xl opacity-50" />
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-300 mb-2">EZ</div>
              <div className="text-sm font-medium uppercase tracking-[0.25em] text-slate-400">Exclusion Zone Water</div>
            </div>
          </motion.div>
          
          {/* Text Content */}
          <motion.div 
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* H2 - Section Title */}
            <h2 className="text-3xl font-semibold tracking-tight text-slate-50">
              Beyond Simple <span className="text-emerald-300">Hydration</span>
            </h2>
            
            {/* Lead Paragraph */}
            <p className="text-balance text-lg leading-relaxed text-slate-200">
              Water is not just a solvent; it is a medium for information and energy. 
              Our Science Library explores the cutting-edge research into structured water, 
              bioelectricity, and the role of primordial minerals in biology.
            </p>
            
            {/* Bullet List */}
            <ul className="space-y-3">
              {["The Fourth Phase of Water", "Sulfate Chemistry", "Bioelectric Potentials"].map((item, i) => (
                <motion.li 
                  key={item} 
                  className="flex gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                  <span className="text-base leading-relaxed text-slate-200">{item}</span>
                </motion.li>
              ))}
            </ul>
            
            <Link href="/science">
              <motion.button 
                className="text-sm font-medium text-slate-200 underline-offset-4 hover:text-emerald-200 hover:underline"
                whileHover={{ x: 4 }}
              >
                Enter the Science Library →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
