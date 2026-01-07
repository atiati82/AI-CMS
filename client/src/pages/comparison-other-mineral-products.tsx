import { Link, useRoute } from "wouter";
import { useState, useRef } from "react";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/data";
import { Minus, Plus, ShoppingBag, CheckCircle2, Star, Zap, Droplets, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/cart-context";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { fadeUp, stagger, ambient } from "@/lib/motion";
import { CosmicPulse } from "@/components/motion/CosmicPulse";

// Import generated assets
import productBottle from "@/assets/generated_images/amber_glass_dropper_bottle_for_andara_ionic_product.png";

export default function ProductPage() {
  const [match, params] = useRoute("/shop/:slug");
  const slug = params?.slug || "andara-ionic-100ml";

  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);
  const [selectedBundle, setSelectedBundle] = useState<number | null>(null);
  const { addItem } = useCart();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleAddToCart = () => {
    addItem(product, selectedBundle !== null ? 1 : quantity, selectedBundle);
  };

  const otherSize = PRODUCTS.find(p => p.id !== product.id);

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white selection:bg-amber-500/30 overflow-hidden font-sans">

        {/* ATMOSPHERIC BACKGROUND */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[#02040a]" /> {/* Deep Void */}
          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10s]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[100px] mix-blend-screen" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 scale-150">
            <CosmicPulse />
          </div>
        </div>

        {/* Product Hero */}
        <section ref={heroRef} className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image Side - ALCHEMICAL FLOAT */}
            <motion.div
              className="relative flex items-center justify-center perspective-1000"
              style={{ y: imageY, scale: imageScale, opacity }}
            >
              {/* Back Glow */}
              <div className="absolute inset-0 bg-gradient-radial from-amber-500/20 to-transparent blur-3xl opacity-60 scale-110" />

              <motion.div
                className="relative z-10"
                {...ambient.float}
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
              >
                <img
                  src={productBottle}
                  alt={product.name}
                  className="w-full max-w-lg h-auto drop-shadow-2xl relative z-10"
                />
                {/* Reflection/Grounding Shadow */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-4 bg-black/50 blur-xl rounded-full" />
              </motion.div>

              {/* Floating Particles/Ingredients (Decorative) */}
              <motion.div
                animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute top-20 right-10 w-4 h-4 rounded-full bg-amber-400/40 blur-sm"
              />
              <motion.div
                animate={{ y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-20 left-10 w-6 h-6 rounded-full bg-indigo-400/20 blur-md"
              />
            </motion.div>

            {/* Info Side - OBSIDIAN GLASS INTERFACE */}
            <motion.div
              className="relative"
              style={{ y: textY }}
            >
              <div className="andara-glass-obsidian p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="andara-badge-crystal bg-amber-500/10 text-amber-400 border-amber-500/20">
                      <Star className="w-3 h-3 mr-1 fill-amber-400" />
                      Master Mineral
                    </span>
                    <span className="andara-badge-crystal bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                      High Conductivity
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-display font-medium mb-4 tracking-tight leading-tight">
                    <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-lg">
                      {product.name}
                    </span>
                  </h1>

                  <div className="flex items-baseline gap-4 text-slate-400 mb-6 font-mono text-sm">
                    <span className="text-lg text-white font-sans">{product.sizeMl} ml / {(product.sizeMl / 1000).toFixed(1)} L</span>
                    <span className="hidden sm:inline">|</span>
                    {otherSize && (
                      <Link
                        href={`/shop/${otherSize.slug}`}
                        className="hover:text-amber-400 transition-colors border-b border-dashed border-slate-600 hover:border-amber-400"
                      >
                        Switch to {otherSize.sizeMl >= 1000 ? `${otherSize.sizeMl / 1000}L` : `${otherSize.sizeMl}ml`}
                      </Link>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  className="prose prose-invert prose-lg text-slate-300 leading-relaxed mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <p>{product.descriptionShort}</p>
                </motion.div>

                {/* Highlights */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                  {...stagger.container}
                >
                  {product.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 text-sm font-medium text-slate-200"
                      variants={stagger.item}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      {highlight}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pricing Panel - LIQUID CARDS */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4 pt-6 border-t border-white/10"
                >
                  {/* Bundle Options */}
                  {product.bundles.length > 0 && (
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      {product.bundles.map((bundle, idx) => (
                        <div
                          key={idx}
                          onClick={() => { setSelectedBundle(idx); setQuantity(1); }}
                          className={cn(
                            "cursor-pointer relative overflow-hidden p-4 rounded-xl border transition-all duration-300 group",
                            selectedBundle === idx
                              ? "bg-amber-500/10 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                              : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                          )}
                        >
                          <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3">
                              <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", selectedBundle === idx ? "border-amber-400" : "border-slate-500")}>
                                {selectedBundle === idx && <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />}
                              </div>
                              <div>
                                <span className={cn("font-bold block", selectedBundle === idx ? "text-amber-400" : "text-white")}>{bundle.name} ({bundle.units}x)</span>
                                <span className="text-xs text-slate-400">{bundle.save}</span>
                              </div>
                            </div>
                            <span className="font-display font-bold text-xl">${bundle.price.toFixed(2)}</span>
                          </div>
                          {/* Inner Sheen */}
                          {selectedBundle === idx && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent skew-x-12" />
                          )}
                        </div>
                      ))}
                      {/* Single Unit */}
                      <div
                        onClick={() => { setSelectedBundle(null); setQuantity(1); }}
                        className={cn(
                          "cursor-pointer p-4 rounded-xl border transition-all duration-300",
                          selectedBundle === null
                            ? "bg-amber-500/10 border-amber-500/50"
                            : "bg-white/5 border-white/5 hover:border-white/20"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", selectedBundle === null ? "border-amber-400" : "border-slate-500")}>
                              {selectedBundle === null && <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />}
                            </div>
                            <span className={cn("font-bold block", selectedBundle === null ? "text-amber-400" : "text-white")}>Single Bottle</span>
                          </div>
                          <span className="font-display font-bold text-xl">${product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <div className="flex items-center bg-black/40 border border-white/10 rounded-xl h-14 w-fit px-2 gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:text-amber-400 transition-colors disabled:opacity-50"
                        disabled={selectedBundle !== null}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-mono font-medium w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:text-amber-400 transition-colors disabled:opacity-50"
                        disabled={selectedBundle !== null}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <Button
                      onClick={handleAddToCart}
                      className="flex-1 h-14 rounded-xl text-lg gap-2 shadow-lg shadow-amber-500/20 bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold border-none transition-all hover:scale-[1.02]"
                      data-testid="add-to-cart-button"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Add to Cart - ${(selectedBundle !== null ? product.bundles[selectedBundle].price : product.price * quantity).toFixed(2)}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Detailed Info Sections (Vortex Styled) */}
        <section className="relative z-10 container mx-auto px-4 max-w-4xl py-24 pb-48">
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-24" />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
              <div className="w-12 h-12 mx-auto bg-amber-500/20 rounded-full flex items-center justify-center mb-4 text-amber-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">High Voltage</h3>
              <p className="text-sm text-slate-400">Ionic potential maximized for optimal cellular hydration and signaling.</p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
              <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-blue-400">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Structured Water</h3>
              <p className="text-sm text-slate-400">Promotes hexagonal structuring of water molecules for better absorption.</p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
              <div className="w-12 h-12 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Pure Origins</h3>
              <p className="text-sm text-slate-400">Sourced from primordial mineral deposits, free from modern pollutants.</p>
            </div>
          </motion.div>

          <motion.div
            className="prose prose-invert prose-lg mx-auto"
            {...fadeUp}
          >
            <div className="p-8 md:p-12 rounded-3xl bg-slate-900/50 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px]" />

              <h2 className="font-display text-4xl mb-8 relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">The Science of Andara</h2>

              <div className="relative z-10 text-slate-300 whitespace-pre-line leading-relaxed">
                {product.descriptionLong}
              </div>

              <h3 className="font-display text-2xl text-amber-500 mt-12 mb-6 relative z-10">Application Protocol</h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-xs font-bold mt-1">1</span>
                  <span>Add 1ml (approx. 20 drops) per liter of filtered water.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-xs font-bold mt-1">2</span>
                  <span>Stir or shake vigorously to create a vortex and encourage structuring.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-xs font-bold mt-1">3</span>
                  <span>Allow to sit for 5 minutes for optimal flocculation of suspended impurities.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-xs font-bold mt-1">4</span>
                  <span>Consume daily. Listen to your body's hydration signals.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </section>

      </div>
    </Layout>
  );
}
