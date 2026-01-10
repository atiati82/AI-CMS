import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BundleCTAProps {
    variant?: 'compact' | 'full';
    className?: string;
}

/**
 * Bundle CTA component for promoting product bundles.
 * Used across science and product pages.
 */
export function BundleCTA({ variant = 'compact', className = '' }: BundleCTAProps) {
    if (variant === 'compact') {
        return (
            <motion.div
                className={`rounded-2xl border border-amber-500/20 bg-linear-to-r from-amber-500/10 to-emerald-500/10 p-4 ${className}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
            >
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-amber-400" />
                        <div>
                            <div className="font-semibold text-white">Save with Bundles</div>
                            <div className="text-sm text-white/60">Up to 20% off family packs</div>
                        </div>
                    </div>
                    <Link href="/shop">
                        <Button className="rounded-xl bg-linear-to-r from-amber-500 to-amber-600 text-black font-semibold hover:opacity-90">
                            View Bundles
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.section
            className={`rounded-3xl border border-amber-500/20 bg-linear-to-br from-amber-500/10 via-transparent to-emerald-500/10 p-8 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-center">
                <Package className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white">Ready to Transform Your Water?</h3>
                <p className="mt-2 text-white/70 max-w-xl mx-auto">
                    Start with our signature 4oz bottle or save big with family bundles.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <Link href="/shop/4oz-classic">
                        <Button className="rounded-xl bg-linear-to-r from-amber-500 to-amber-600 px-6 py-6 text-black font-semibold hover:opacity-90 shadow-lg shadow-amber-500/20">
                            Shop 4oz Classic
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                    <Link href="/shop">
                        <Button variant="outline" className="rounded-xl border-white/20 text-white hover:bg-white/10 px-6 py-6">
                            View All Bundles
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.section>
    );
}

export default BundleCTA;
