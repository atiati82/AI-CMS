// client/src/templates/gpt/ProductLayout.tsx
// Product Layout - "The Cash Register" | Spacing System v1.0 (8px grid)
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ShoppingCart, Shield, Check } from "lucide-react";

type Props = {
    title: string;
    subtitle: string;
    gallery: React.ReactNode;
    priceLabel: string;
    priceSubline?: string;
    onAddToCart?: () => void;
    bundleCards: { label: string; price: string; saveText: string; href: string }[];
    fudLine?: string;
    trustBadges?: string[];
    keyBenefits: { title: string; body: string }[];
    detailsHtml: string;
    ratingLine?: string;
    reviews: React.ReactNode;
    sidebarCta?: React.ReactNode;
};

export function ProductLayout({
    title,
    subtitle,
    gallery,
    priceLabel,
    priceSubline,
    onAddToCart,
    bundleCards,
    fudLine = "30-Day Money-Back Guarantee | Free Shipping",
    trustBadges = ["Secure Checkout", "Fast Shipping", "Verified Buyers"],
    keyBenefits,
    detailsHtml,
    ratingLine = "★★★★★ 4.9/5 • Verified Reviews",
    reviews,
    sidebarCta,
}: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header: py-3 = 12px, responsive gutters */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6 lg:px-8 py-3">
                    <Link href="/" className="font-semibold tracking-wide text-white">Andara Ionic</Link>
                    <div className="flex items-center gap-4">
                        <Link href="/science" className="text-sm text-white/70 hover:text-white transition-colors">Science</Link>
                        <Link href="/shop">
                            <Button className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:opacity-90 shadow-lg shadow-amber-500/20">
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Shop
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main: py-10 = 40px */}
            <main className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-10">
                {/* Product grid: gap-8 = 32px */}
                <section className="grid gap-8 lg:grid-cols-12">
                    {/* Gallery: lg:col-span-7, p-6 = 24px */}
                    <motion.div
                        className="lg:col-span-7"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-2xl">
                            {gallery}
                        </div>
                    </motion.div>

                    {/* Buy box: lg:col-span-5, p-6 = 24px */}
                    <div className="lg:col-span-5">
                        <motion.div
                            className="lg:sticky lg:top-24"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-2xl space-y-6">
                                {/* Title block */}
                                <div>
                                    <div className="text-sm text-amber-400">{ratingLine}</div>
                                    <h1 className="mt-2 text-3xl font-bold">{title}</h1>
                                    <p className="mt-2 text-white/70">{subtitle}</p>
                                </div>

                                {/* Price card: p-5 = 20px */}
                                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-4">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <div className="text-sm text-white/50">Price</div>
                                            <div className="text-3xl font-bold text-emerald-400">{priceLabel}</div>
                                            {priceSubline && <div className="text-xs text-white/50">{priceSubline}</div>}
                                        </div>
                                        <Button
                                            onClick={onAddToCart}
                                            className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-6 text-black font-semibold hover:opacity-90 shadow-lg shadow-amber-500/20"
                                        >
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            Add to Cart
                                        </Button>
                                    </div>

                                    {/* FUD line: gap-2 = 8px */}
                                    <div className="flex items-center gap-2 text-sm text-white/60">
                                        <Shield className="w-4 h-4 text-emerald-400" />
                                        {fudLine}
                                    </div>

                                    {/* Trust badges: gap-2 = 8px */}
                                    <div className="flex flex-wrap gap-2">
                                        {trustBadges.map((b, i) => (
                                            <span
                                                key={i}
                                                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                                            >
                                                <Check className="w-3 h-3 text-emerald-400" />
                                                {b}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Bundles: space-y-3 = 12px */}
                                <div className="space-y-3">
                                    <div className="text-sm font-semibold text-white/80">Save with Bundles</div>
                                    {bundleCards.map((b, i) => (
                                        <Link
                                            key={i}
                                            href={b.href}
                                            className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 hover:border-amber-500/30 transition-all"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-semibold">{b.label}</div>
                                                    <div className="text-sm text-emerald-400">{b.saveText}</div>
                                                </div>
                                                <div className="text-lg font-bold">{b.price}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {sidebarCta && <div>{sidebarCta}</div>}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Benefits + Details: mt-12 = 48px, gap-8 = 32px */}
                <section className="mt-12 grid gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-7 space-y-6">
                        <h2 className="text-2xl font-semibold">What you'll notice</h2>
                        {/* Benefits grid: gap-4 = 16px */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            {keyBenefits.map((k, i) => (
                                <motion.div
                                    key={i}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: i * 0.1 }}
                                >
                                    <div className="font-semibold text-emerald-400">{k.title}</div>
                                    <div className="mt-2 text-white/70">{k.body}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Details prose: p-6 = 24px */}
                        <div
                            className="prose prose-invert max-w-none rounded-2xl border border-white/10 bg-white/5 p-6"
                            dangerouslySetInnerHTML={{ __html: detailsHtml }}
                        />
                    </div>

                    {/* Reviews: p-6 = 24px */}
                    <div className="lg:col-span-5">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <h3 className="text-xl font-semibold">Reviews</h3>
                            <div className="mt-4">{reviews}</div>
                        </div>
                    </div>
                </section>

                {/* Mobile sticky: p-4 = 16px */}
                <div className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:hidden">
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl px-4 py-3 shadow-2xl">
                        <div>
                            <div className="text-xs text-white/50">Quick buy</div>
                            <div className="text-lg font-bold text-emerald-400">{priceLabel}</div>
                        </div>
                        <Button
                            onClick={onAddToCart}
                            className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:opacity-90"
                        >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Buy Now
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProductLayout;
