import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
    ShoppingCart, Check, Droplets, Plus, Minus,
    ArrowRight, ChevronDown, Package
} from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { PRODUCTS, type Product } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

interface ProductBoxProps {
    variant?: "compact" | "standard" | "featured";
    showPricing?: boolean;
    showCTA?: boolean;
    showAddToCart?: boolean;
    productSlug?: string; // Allow specifying which product to display
    className?: string;
}

/**
 * Reusable ProductBox Component
 * 
 * For embedding Andara Ionic product info on content pages with full cart functionality.
 * Three variants: compact (inline), standard (card), featured (full width)
 */
export function ProductBox({
    variant = "standard",
    showPricing = true,
    showCTA = true,
    showAddToCart = true,
    productSlug = "andara-ionic-100ml",
    className = ""
}: ProductBoxProps) {
    const { addItem, openCart } = useCart();
    const { toast } = useToast();
    const [quantity, setQuantity] = useState(1);
    const [selectedBundle, setSelectedBundle] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // Get product from data
    const product = PRODUCTS.find(p => p.slug === productSlug) || PRODUCTS[0];

    const handleAddToCart = () => {
        setIsAdding(true);

        // Create a Product compatible with cart context
        const cartProduct: Product = {
            ...product,
            bundles: product.bundles || []
        };

        addItem(cartProduct, quantity, selectedBundle);

        const itemName = selectedBundle !== null
            ? `${product.name} - ${product.bundles[selectedBundle].name}`
            : product.name;

        toast({
            title: "Added to Cart",
            description: `${quantity}x ${itemName}`,
        });

        setTimeout(() => {
            setIsAdding(false);
            setQuantity(1);
        }, 500);
    };

    const currentPrice = selectedBundle !== null
        ? product.bundles[selectedBundle].price
        : product.price;

    // Compact: Small inline mention with quick add
    if (variant === "compact") {
        return (
            <div className={`inline-flex items-center gap-3 p-3 rounded-xl bg-[#f6d56a]/10 border border-[#f6d56a]/20 hover:border-[#f6d56a]/40 transition-all ${className}`}>
                <Link href={`/shop/${product.slug}`}>
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-[#f6d56a]/15 flex items-center justify-center flex-shrink-0">
                            <Droplets className="w-5 h-5 text-[#f6d56a]" />
                        </div>
                        <div>
                            <span className="text-sm font-semibold text-white">{product.name}</span>
                            {showPricing && <span className="text-xs text-white/50 ml-2">€{product.price.toFixed(2)}</span>}
                        </div>
                    </div>
                </Link>
                {showAddToCart && (
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="p-2 rounded-lg bg-[#f6d56a] text-black hover:bg-[#e8b923] transition-all disabled:opacity-50"
                    >
                        {isAdding ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                    </button>
                )}
            </div>
        );
    }

    // Featured: Full-width callout with bundle selection
    if (variant === "featured") {
        return (
            <motion.div
                className={`p-8 rounded-3xl border border-[#f6d56a]/20 bg-gradient-to-r from-[#f6d56a]/10 via-[#f6d56a]/5 to-transparent ${className}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Product visual */}
                    <Link href={`/shop/${product.slug}`}>
                        <div className="w-32 h-44 rounded-2xl bg-gradient-to-b from-[#1a2744] to-[#0a1628] border border-white/10 flex items-center justify-center relative flex-shrink-0 cursor-pointer hover:border-[#f6d56a]/30 transition-all">
                            <div className="absolute inset-0 rounded-2xl bg-[#1aa7ff]/10 blur-xl" />
                            <div className="relative text-center">
                                <Droplets className="w-12 h-12 text-[#1aa7ff] mx-auto mb-2" />
                                <span className="text-[10px] font-bold text-white/60 tracking-wider uppercase">{product.sizeMl} ml</span>
                            </div>
                        </div>
                    </Link>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-display font-semibold text-white mb-3">
                            {product.name}
                        </h3>
                        <p className="text-white/60 mb-4 max-w-lg">
                            {product.descriptionShort}
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-white/50 mb-6">
                            {product.highlights.slice(0, 3).map((highlight, i) => (
                                <span key={i} className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-[#38ffd1]" />
                                    {highlight}
                                </span>
                            ))}
                        </div>

                        {/* Bundle Selection */}
                        {product.bundles.length > 0 && showAddToCart && (
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                                <button
                                    onClick={() => setSelectedBundle(null)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedBundle === null
                                            ? 'bg-[#f6d56a] text-black'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    Single (€{product.price.toFixed(2)})
                                </button>
                                {product.bundles.map((bundle, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedBundle(idx)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedBundle === idx
                                                ? 'bg-[#f6d56a] text-black'
                                                : 'bg-white/10 text-white hover:bg-white/20'
                                            }`}
                                    >
                                        {bundle.name} ({bundle.units}x) €{bundle.price.toFixed(2)}
                                        {bundle.save && <span className="ml-1 text-xs text-[#38ffd1]">{bundle.save}</span>}
                                    </button>
                                ))}
                            </div>
                        )}

                        {showCTA && (
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center">
                                {showAddToCart && (
                                    <>
                                        {/* Quantity Selector */}
                                        <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
                                            <button
                                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                                className="p-2 hover:bg-white/10 rounded transition-all"
                                            >
                                                <Minus className="w-4 h-4 text-white" />
                                            </button>
                                            <span className="w-8 text-center text-white font-medium">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(q => q + 1)}
                                                className="p-2 hover:bg-white/10 rounded transition-all"
                                            >
                                                <Plus className="w-4 h-4 text-white" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={handleAddToCart}
                                            disabled={isAdding}
                                            className="px-6 py-3 bg-gradient-to-r from-[#f6d56a] to-[#e8b923] text-black font-bold rounded-lg hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
                                        >
                                            {isAdding ? (
                                                <>
                                                    <Check className="w-4 h-4" />
                                                    Added!
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="w-4 h-4" />
                                                    Add to Cart - €{(currentPrice * quantity).toFixed(2)}
                                                </>
                                            )}
                                        </button>
                                    </>
                                )}

                                <Link href={`/shop/${product.slug}`}>
                                    <button className="px-6 py-3 border border-white/20 text-white font-semibold rounded-lg hover:border-white/40 transition-all">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    }

    // Standard: Card format (default)
    return (
        <motion.div
            className={`p-6 rounded-2xl border border-white/10 bg-[#0b1020]/80 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, borderColor: "rgba(246,213,106,0.3)" }}
        >
            <Link href={`/shop/${product.slug}`}>
                <div className="flex items-start gap-4 mb-4 cursor-pointer">
                    <div className="w-14 h-20 rounded-xl bg-gradient-to-b from-[#1a2744] to-[#0a1628] border border-white/10 flex items-center justify-center flex-shrink-0">
                        <Droplets className="w-6 h-6 text-[#1aa7ff]" />
                    </div>
                    <div>
                        <h4 className="text-lg font-display font-semibold text-white mb-1">{product.name}</h4>
                        <p className="text-sm text-white/50">{product.sizeMl}ml • Ionic sulfate minerals</p>
                    </div>
                </div>
            </Link>

            <ul className="space-y-2 text-sm text-white/60 mb-4">
                {product.highlights.slice(0, 3).map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#f6d56a]" />
                        {highlight}
                    </li>
                ))}
            </ul>

            {showPricing && (
                <div className="text-lg font-bold text-white mb-4">
                    €{product.price.toFixed(2)} <span className="text-sm font-normal text-white/40">/ {product.sizeMl} ml</span>
                </div>
            )}

            {showCTA && showAddToCart && (
                <div className="flex gap-2">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="flex-1 px-4 py-3 bg-[#f6d56a]/10 border border-[#f6d56a]/30 text-[#f6d56a] font-semibold rounded-lg hover:bg-[#f6d56a]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isAdding ? (
                            <>
                                <Check className="w-4 h-4" />
                                Added!
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                            </>
                        )}
                    </button>
                    <Link href={`/shop/${product.slug}`}>
                        <button className="px-4 py-3 border border-white/20 text-white rounded-lg hover:border-white/40 transition-all">
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            )}

            {showCTA && !showAddToCart && (
                <Link href={`/shop/${product.slug}`}>
                    <button className="w-full px-4 py-3 bg-[#f6d56a]/10 border border-[#f6d56a]/30 text-[#f6d56a] font-semibold rounded-lg hover:bg-[#f6d56a]/20 transition-all flex items-center justify-center gap-2">
                        View Product <ArrowRight className="w-4 h-4" />
                    </button>
                </Link>
            )}
        </motion.div>
    );
}

/**
 * Pricing Card Component
 */
interface PricingCardProps {
    name: string;
    subtitle: string;
    volume: string;
    price: string;
    perLiter: string;
    savings?: string;
    bullets: string[];
    featured?: boolean;
    ctaText: string;
    onAddToCart?: () => void;
}

export function PricingCard({ name, subtitle, volume, price, perLiter, savings, bullets, featured, ctaText, onAddToCart }: PricingCardProps) {
    return (
        <motion.div
            className={`p-6 rounded-2xl border ${featured ? "border-[#f6d56a]/40 bg-gradient-to-b from-[#f6d56a]/10 to-transparent" : "border-white/10 bg-[#0b1020]/50"}`}
            whileHover={{ y: -4 }}
        >
            {featured && (
                <div className="text-xs font-bold text-[#f6d56a] tracking-widest uppercase mb-4">Most Popular</div>
            )}
            <h4 className="text-lg font-display font-semibold text-white mb-1">{name}</h4>
            <p className="text-sm text-white/50 mb-4">{subtitle}</p>

            <div className="mb-4">
                <span className="text-3xl font-bold text-white">{price}</span>
                <span className="text-sm text-white/40 ml-2">for {volume}</span>
            </div>

            <div className="flex items-center gap-3 mb-4 text-sm">
                <span className="text-white/60">{perLiter} per liter</span>
                {savings && <span className="px-2 py-0.5 rounded bg-[#38ffd1]/20 text-[#38ffd1] text-xs font-bold">{savings}</span>}
            </div>

            <ul className="space-y-2 mb-6">
                {bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                        <Check className="w-4 h-4 text-[#38ffd1] mt-0.5 flex-shrink-0" />
                        {bullet}
                    </li>
                ))}
            </ul>

            <button
                onClick={onAddToCart}
                className={`w-full px-4 py-3 font-bold rounded-lg transition-all ${featured
                    ? "bg-gradient-to-r from-[#f6d56a] to-[#e8b923] text-black hover:opacity-90"
                    : "bg-white/10 text-white hover:bg-white/20"
                    }`}
            >
                {ctaText}
            </button>
        </motion.div>
    );
}

/**
 * FAQ Item Component
 */
export function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="border-b border-white/10">
            <button
                className="w-full py-5 flex items-center justify-between text-left"
                onClick={() => setOpen(!open)}
            >
                <span className="font-semibold text-white">{question}</span>
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

export default ProductBox;
