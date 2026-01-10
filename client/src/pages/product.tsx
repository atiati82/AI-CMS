import { Link, useRoute } from "wouter";
import { useState, useRef } from "react";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/data";
import { Minus, Plus, ShoppingBag, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/cart-context";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, stagger, parallax, ambient, hover as hoverMotion } from "@/lib/motion";
import { VideoBackground } from "@/components/SmartVideoEmbed";

// Import generated assets
import productBottle from "@assets/generated_images/amber_glass_dropper_bottle_for_andara_ionic_product.png";

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
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const handleAddToCart = () => {
    addItem(product, selectedBundle !== null ? 1 : quantity, selectedBundle);
  };

  // Switch between sizes if needed
  const otherSize = PRODUCTS.find(p => p.id !== product.id);

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-24">
        {/* Product Hero with Parallax */}
        <section ref={heroRef} className="relative container mx-auto px-4 py-12 lg:py-20 overflow-hidden min-h-[80vh] flex items-center">
          {/* Background Video */}
          <VideoBackground
            keywords={product.tags}
            videoId={product.slug === 'andara-ionic-1l' ? 'premium-liquid-gold' : undefined}
            overlayOpacity={0.7}
          />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start w-full">

            {/* Image Side with Parallax */}
            <motion.div
              className="relative bg-muted/10 rounded-[3rem] p-12 flex items-center justify-center border border-border/50"
              style={{ y: imageY, scale: imageScale }}
              {...fadeUp}
            >
              <motion.div
                className="absolute top-8 left-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Original Formula
                </span>
              </motion.div>
              <motion.img
                src={productBottle}
                alt={product.name}
                className="w-full max-w-md h-auto drop-shadow-2xl"
                {...ambient.float}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
            </motion.div>

            {/* Info Side with Parallax Text */}
            <motion.div
              className="space-y-8"
              style={{ y: textY }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="text-4xl md:text-5xl font-display font-medium text-primary mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="text-lg">{product.sizeMl} ml / {(product.sizeMl / 1000).toFixed(1)} L</span>
                  {otherSize && (
                    <Link
                      href={`/shop/${otherSize.slug}`}
                      className="text-sm text-accent hover:underline decoration-accent underline-offset-4"
                    >
                      Switch to {otherSize.sizeMl >= 1000 ? `${otherSize.sizeMl / 1000}L` : `${otherSize.sizeMl}ml`}
                    </Link>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="prose prose-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p>{product.descriptionShort}</p>
              </motion.div>

              {/* Highlights with Stagger Animation */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                {...stagger.container}
              >
                {product.highlights.map((highlight, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 text-sm font-medium text-foreground/80"
                    variants={stagger.item}
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    {highlight}
                  </motion.div>
                ))}
              </motion.div>

              {/* Pricing & Bundles */}
              <div className="space-y-4 pt-6 border-t border-border">
                {product.bundles.length > 0 && (
                  <div className="grid grid-cols-1 gap-3 mb-6">
                    {product.bundles.map((bundle, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedBundle(idx);
                          setQuantity(1);
                        }}
                        className={cn(
                          "cursor-pointer border rounded-xl p-4 flex items-center justify-between transition-all",
                          selectedBundle === idx
                            ? "border-accent bg-accent/5 ring-1 ring-accent"
                            : "border-border hover:border-accent/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", selectedBundle === idx ? "border-accent" : "border-muted-foreground")}>
                            {selectedBundle === idx && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                          </div>
                          <div>
                            <span className="font-bold text-primary block">{bundle.name} ({bundle.units}x)</span>
                            <span className="text-xs text-muted-foreground">{bundle.save}</span>
                          </div>
                        </div>
                        <span className="font-display font-bold text-lg">${bundle.price.toFixed(2)}</span>
                      </div>
                    ))}
                    {/* Single Unit Option */}
                    <div
                      onClick={() => {
                        setSelectedBundle(null);
                        setQuantity(1);
                      }}
                      className={cn(
                        "cursor-pointer border rounded-xl p-4 flex items-center justify-between transition-all",
                        selectedBundle === null
                          ? "border-accent bg-accent/5 ring-1 ring-accent"
                          : "border-border hover:border-accent/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", selectedBundle === null ? "border-accent" : "border-muted-foreground")}>
                          {selectedBundle === null && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                        </div>
                        <span className="font-bold text-primary block">Single Bottle</span>
                      </div>
                      <span className="font-display font-bold text-lg">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* Add to Cart Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="flex items-center border border-border rounded-full h-14 w-fit px-4 gap-4 bg-background">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:text-accent transition-colors"
                      disabled={selectedBundle !== null} // Disable if bundle selected
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:text-accent transition-colors"
                      disabled={selectedBundle !== null}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 h-14 rounded-full text-lg gap-2 shadow-lg shadow-primary/20"
                    data-testid="add-to-cart-button"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart - ${(selectedBundle !== null ? product.bundles[selectedBundle].price : product.price * quantity).toFixed(2)}
                  </Button>
                </div>
                <p className="text-xs text-center sm:text-left text-muted-foreground mt-2">
                  Free shipping on orders over $100. 30-day money-back guarantee.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Detailed Description with Scroll Animation */}
        <motion.section
          className="container mx-auto px-4 max-w-3xl py-16 border-t border-border"
          {...fadeUp}
        >
          <div className="prose prose-slate lg:prose-xl mx-auto">
            <motion.h2
              className="font-display text-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              The Science of Andara
            </motion.h2>
            <motion.div
              className="whitespace-pre-line text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {product.descriptionLong}
            </motion.div>

            <motion.h3
              className="font-display text-primary mt-12"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              How to Use
            </motion.h3>
            <motion.ul
              className="list-disc pl-5 space-y-2 text-muted-foreground text-base"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <li>Add 1ml (approx. 20 drops) per liter of water.</li>
              <li>Stir or shake vigorously to encourage structuring.</li>
              <li>Allow to sit for 5 minutes for optimal flocculation of impurities.</li>
              <li>Consume daily for hydration and mineral support.</li>
            </motion.ul>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}
