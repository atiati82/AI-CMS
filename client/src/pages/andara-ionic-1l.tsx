import React, { useRef, useState } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
// import Layout from "@/components/layout";
import StandardPageLayout from "@/components/StandardPageLayout";
import {
    ShoppingCart, Check, Droplets, Zap, Hexagon,
    ArrowRight, ChevronDown, Package, Sparkles,
    Mountain, Calculator, Info, ShieldCheck, Layers,
    Repeat, ClipboardCheck, Scale
} from "lucide-react";
// import { HeroGlass } from "@/components/visuals/HeroGlass";
import { SmartImage } from "@/components/ui/SmartImage";
import { useCart } from "@/contexts/cart-context";
import { PRODUCTS } from "@/lib/data";
import { Button } from "@/components/ui/button";

/**
 * FAQ Item Component
 */
function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-white/10">
            <button
                className="w-full py-5 flex items-center justify-between text-left group"
                onClick={() => setOpen(!open)}
            >
                <span className="font-semibold text-white group-hover:text-accent transition-colors">{question}</span>
                <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pb-5 text-white/60 leading-relaxed"
                >
                    {answer}
                </motion.div>
            )}
        </div>
    );
}

export default function AndaraIonic1L() {
    const containerRef = useRef(null);
    const { addItem } = useCart();
    const product = PRODUCTS.find(p => p.id === "p2");

    if (!product) return null;

    const handleAddToCart = () => {
        addItem(product, 1, null);
    };

    const snapshotItems = [
        { icon: <Package className="w-6 h-6 text-accent" />, label: "Format", value: "1 Liter Bulk Line" },
        { icon: <Zap className="w-6 h-6 text-accent" />, label: "Type", value: "Ionic Concentrate" },
        { icon: <Repeat className="w-6 h-6 text-accent" />, label: "Best For", value: "Cafés, Spas, Routines" },
        { icon: <ClipboardCheck className="w-6 h-6 text-accent" />, label: "Workflow", value: "Recipe-Based" }
    ];

    const schemaProduct = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Andara Ionic 1L",
        "image": "/assets/andara-ionic-100ml-nature.jpg",
        "description": "High-value ionic minerals concentrate for water conditioning and clarity support. Best for active use.",
        "brand": {
            "@type": "Brand",
            "name": "Andara Ionic"
        },
        "offers": {
            "@type": "Offer",
            "price": "350.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        }
    };

    const schemaFAQ = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is the 1L the same formula as the 100ml?",
                "acceptedAnswer": { "@type": "Answer", "text": "It follows the same Andara ionic minerals concept. Differences may exist in packaging and distribution lines (EU vs Bali)." }
            },
            {
                "@type": "Question",
                "name": "How do I standardize dosing for a café?",
                "acceptedAnswer": { "@type": "Answer", "text": "Use the dilution calculator to set a target range, then lock a single drops-per-liters recipe and replicate it consistently (SOP)." }
            },
            {
                "@type": "Question",
                "name": "Is this for water purification?",
                "acceptedAnswer": { "@type": "Answer", "text": "It is positioned for water conditioning / clarity support. Use appropriate filtration for purification needs. No miracle claims." }
            },
            {
                "@type": "Question",
                "name": "Why choose 1L?",
                "acceptedAnswer": { "@type": "Answer", "text": "The 1L format offers best value per use and is easiest to standardize for daily and professional workflows." }
            }
        ]
    };

    return (
        <StandardPageLayout
            title="Andara Ionic 1L"
            subtitle="Bulk Ionic Trace Minerals Concentrate for Consistent Water Conditioning"
            seoTitle="Andara Ionic 1L | Bulk Minerals for Professional Use"
            seoDescription="The 1 Liter Andara Ionic format is designed for cafés, spas, and high-volume homes. Standardize your water conditioning with our most economical daily concentrate."
            heroVariant="gold"
            heroContent={
                <div className="max-w-2xl mt-6">
                    <p className="text-lg text-white/80 leading-relaxed mb-8">
                        The high-volume format for consistent daily use and professional environments. Lowest cost per use, easiest to standardize, best for teams and routines.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button
                            size="lg"
                            onClick={handleAddToCart}
                            className="rounded-full bg-accent hover:bg-accent/90 text-white px-8 h-14 gap-2 shadow-[0_10px_30px_-5px_rgba(var(--accent-rgb),0.5)]"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart — $350.00
                        </Button>

                        <Link href="/andara-dilution-calculator">
                            <Button variant="outline" size="lg" className="rounded-full border-white/20 text-white hover:bg-white/10 h-14 px-8">
                                <Calculator className="w-5 h-5 mr-2" />
                                Calculators
                            </Button>
                        </Link>
                    </div>

                    <div className="flex items-center gap-6 mt-10">
                        <Link href="/products/andara-ionic-1l-bundles">
                            <span className="text-sm font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-1 cursor-pointer">
                                View Bulk Bundles <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                        <Link href="/products/andara-ionic-1l">
                            <span className="text-sm font-medium text-white/50 hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                                EU vs Bali Lines <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                    </div>
                </div>
            }
            extraHead={
                <>
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
                </>
            }
        >
            <div className="bg-background min-h-screen">
                {/* QUICK SNAPSHOT */}
                <section className="py-20 container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {snapshotItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="andara-glass-panel p-6 border-white/5 text-center"
                            >
                                <div className="flex flex-col items-center gap-3">
                                    {item.icon}
                                    <div>
                                        <div className="text-xs text-white/40 uppercase tracking-widest mb-1">{item.label}</div>
                                        <div className="text-white font-medium">{item.value}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* WHY THIS EXISTS (The Operational Bottle) */}
                <section className="py-24 relative overflow-hidden bg-slate-900/40">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-8">
                                    Why The 1L Exists
                                </h2>
                                <div className="prose prose-invert prose-lg mx-auto text-white/70 leading-relaxed">
                                    <p className="text-xl text-white font-medium">
                                        The 100ml is the ritual bottle. The 1L is the operational bottle.
                                    </p>
                                    <p>
                                        If you’re running a café, water bar, retreat, or busy home, you want one thing above all: <strong className="text-accent">Repeatability</strong>.
                                    </p>
                                    <p className="italic text-white/60">
                                        "Coherence comes from consistency. The 1L makes consistency effortless."
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS (Andara System Logic) */}
                <section className="py-24">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "1. Carrier Environment",
                                    desc: "Ionic minerals create the electrolyte context that shapes conductivity behavior.",
                                    icon: <Zap className="w-8 h-8 text-violet-400" />
                                },
                                {
                                    title: "2. Interface Structure",
                                    desc: "Structure is strongest at boundaries. The ionic environment optimizes these hydration layers.",
                                    icon: <Layers className="w-8 h-8 text-cyan-400" />
                                },
                                {
                                    title: "3. Terrain Model",
                                    desc: "Water is an environment: Carriers + Boundaries + Gradients + Flow.",
                                    icon: <Mountain className="w-8 h-8 text-gold-400" />
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="andara-glass-panel p-8 border-white/5"
                                >
                                    <div className="mb-6">{item.icon}</div>
                                    <h3 className="text-xl font-display font-medium text-white mb-3">{item.title}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* HOW TO USE (Options A/B) */}
                <section className="py-24 bg-accent/5">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-16 text-center">Professional Workflows</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Option A: Batch */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-accent text-xl">A</div>
                                    <h3 className="text-2xl font-display font-medium text-white">Daily Batch Recipe <span className="text-sm font-normal text-white/40 block">Best for Cafés & Spas</span></h3>
                                </div>

                                <div className="space-y-6 border-l border-white/10 pl-6">
                                    <div>
                                        <h4 className="text-white font-medium mb-1">1. Lock your base water</h4>
                                        <p className="text-white/50 text-sm">Filtered, RO+Remineralized, or Spring. Consistency matters most.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">2. Decide target range</h4>
                                        <p className="text-white/50 text-sm">Use the calculator to find your window.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">3. Build Master Recipe</h4>
                                        <p className="text-white/50 text-sm">"X drops per Y liters". Record it.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">4. Serve 'House Water'</h4>
                                        <p className="text-white/50 text-sm">Your water becomes a signature, not a random variation.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Option B: Refill */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-accent text-xl">B</div>
                                    <h3 className="text-2xl font-display font-medium text-white">Home Refill Workflow <span className="text-sm font-normal text-white/40 block">Best for High-Volume Homes</span></h3>
                                </div>

                                <div className="space-y-6 border-l border-white/10 pl-6">
                                    <div>
                                        <h4 className="text-white font-medium mb-1">1. Keep at water point</h4>
                                        <p className="text-white/50 text-sm">Keep the 1L bottle where you fill your glass or carafe.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">2. Dose lightly, then adjust</h4>
                                        <p className="text-white/50 text-sm">Start low, stabilize, then dial in your preference.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">3. Keep consistent for 7 days</h4>
                                        <p className="text-white/50 text-sm">Terrain responds to stability better than constant change.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 1L vs 100ml COMPARISON */}
                <section className="py-24">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="andara-glass-panel p-10 border-accent/20">
                            <h2 className="text-2xl font-display font-medium text-white mb-8 text-center">1L vs 100ml — The Clear Choice</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-accent font-bold mb-4 uppercase tracking-widest text-sm">Choose 1L If</h3>
                                    <ul className="space-y-3 text-white/70">
                                        <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Best price per use</li>
                                        <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Daily high-volume use</li>
                                        <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Consistent recipe workflows</li>
                                        <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Professional standardization</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-cyan-400 font-bold mb-4 uppercase tracking-widest text-sm">Choose 100ml If</h3>
                                    <ul className="space-y-3 text-white/70">
                                        <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Travel size needed</li>
                                        <li className="flex items-center gap-2"><Check className="w-4 h-4" /> First-time trial</li>
                                        <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Personal ritual bottle</li>
                                        <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Easy portability</li>
                                    </ul>
                                    <div className="mt-6">
                                        <Link href="/andara-ionic-100ml">
                                            <Button variant="link" className="text-cyan-400 p-0 h-auto">View 100ml Page &rarr;</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 border-t border-white/5">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h2 className="text-3xl font-display font-medium text-white mb-12 text-center">FAQ</h2>
                        <div className="space-y-4">
                            <FAQItem
                                question="Is the 1L the same formula as the 100ml?"
                                answer="It follows the same Andara ionic minerals concept. Differences may exist in packaging and distribution lines (EU vs Bali)."
                            />
                            <FAQItem
                                question="How do I standardize dosing for a café?"
                                answer="Use the dilution calculator to set a target range, then lock a single drops-per-liters recipe and replicate it consistently (SOP)."
                            />
                            <FAQItem
                                question="Is this for water purification?"
                                answer="It is positioned for water conditioning / clarity support. Use appropriate filtration for purification needs. No miracle claims."
                            />
                            <FAQItem
                                question="Why choose 1L?"
                                answer="The 1L format offers best value per use and is easiest to standardize for daily and professional workflows."
                            />
                        </div>
                    </div>
                </section>

                {/* CLOSING CTA */}
                <section className="py-32 bg-background relative overflow-hidden">
                    {/* Background Assets */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-block relative mb-12">
                                <SmartImage
                                    registryId="product-1l-placeholder"
                                    interaction="zoom-hover"
                                    className="w-64 sm:w-80 h-auto rounded-3xl shadow-2xl border border-white/10"
                                />
                            </div>

                            <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-8">
                                Standardize Your Coherence
                            </h2>
                            <p className="text-white/60 mb-12 max-w-xl mx-auto">
                                The professional choice for consistent water conditioning.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Button
                                    size="lg"
                                    onClick={handleAddToCart}
                                    className="w-full sm:w-auto rounded-full bg-accent hover:bg-accent/90 text-white px-12 h-16 text-lg font-medium shadow-[0_15px_35px_-5px_rgba(var(--accent-rgb),0.6)]"
                                >
                                    Add to Cart — $350
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </StandardPageLayout>
    );
}
