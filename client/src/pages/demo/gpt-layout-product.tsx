// Demo: GPT Product Layout
// Route: /demo/gpt-layout-product

import React from "react";
import { ProductLayout } from "@/templates/gpt";
import { Star, Check, Droplets } from "lucide-react";

export default function GptLayoutProductDemo() {
    return (
        <ProductLayout
            title="Andara Ionic 100ml Concentrate"
            subtitle="Best for: Starting your structured water journey • Daily use • Travel-friendly"
            gallery={
                <div className="space-y-4">
                    {/* Main product image placeholder */}
                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-500/20 via-transparent to-amber-500/20 border border-white/10 flex items-center justify-center">
                        <div className="text-center">
                            <Droplets className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                            <div className="text-lg font-semibold text-white">Product Image</div>
                            <div className="text-sm text-white/50">100ml Bottle</div>
                        </div>
                    </div>
                    {/* Thumbnail strip */}
                    <div className="flex gap-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs text-white/40"
                            >
                                {i}
                            </div>
                        ))}
                    </div>
                </div>
            }
            priceLabel="€89"
            priceSubline="Includes VAT • Makes 200+ liters"
            onAddToCart={() => alert("Demo: Add to Cart clicked!")}
            bundleCards={[
                { label: "Family Pack (3x)", price: "€229", saveText: "Save €38", href: "/shop/bundles" },
                { label: "Pro Pack (6x)", price: "€419", saveText: "Save €115", href: "/shop/bundles" },
            ]}
            fudLine="30-Day Money-Back Guarantee | Free EU Shipping"
            trustBadges={["Lab Tested", "Secure Checkout", "Fast Shipping", "Verified Buyers"]}
            keyBenefits={[
                {
                    title: "Instant Clarity",
                    body: "Add drops to any water and watch structure emerge within minutes.",
                },
                {
                    title: "All-Day Hydration",
                    body: "Support cellular hydration at the terrain level, not just volume.",
                },
                {
                    title: "Travel Ready",
                    body: "100ml concentrate fits anywhere — home, office, gym, travel.",
                },
                {
                    title: "200+ Liters Per Bottle",
                    body: "Just 10-15 drops per liter makes this incredibly economical.",
                },
            ]}
            detailsHtml={`
        <h3>What's Inside</h3>
        <p>Andara Ionic 100ml contains a proprietary blend of ionic sulfates, silicates, and trace minerals sourced from pristine volcanic springs.</p>
        <ul>
          <li>Ferrous sulfate (ionic form)</li>
          <li>Magnesium silicate</li>
          <li>Trace elements (70+ minerals)</li>
        </ul>
        <h3>How to Use</h3>
        <p>Add 10-15 drops per liter of water. Allow 2-5 minutes for structure to form. Observe the clarity transformation.</p>
        <h3>Storage</h3>
        <p>Store in a cool, dark place. Lasts 2+ years unopened. Use within 12 months after opening.</p>
      `}
            ratingLine="★★★★★ 4.9/5 • 1,203 Verified Reviews"
            reviews={
                <div className="space-y-4">
                    {[
                        { name: "Maria K.", text: "I can actually taste the difference. Water feels alive now.", rating: 5 },
                        { name: "Thomas B.", text: "Using it for my whole family. Kids love the smooth taste.", rating: 5 },
                        { name: "Lisa M.", text: "Great for travel. One bottle lasts months.", rating: 5 },
                    ].map((review, i) => (
                        <div key={i} className="p-4 rounded-xl bg-black/30 border border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                                {[...Array(review.rating)].map((_, j) => (
                                    <Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400" />
                                ))}
                            </div>
                            <p className="text-sm text-white/70 mb-2">"{review.text}"</p>
                            <div className="text-xs text-white/50 flex items-center gap-1">
                                <Check className="w-3 h-3 text-emerald-400" />
                                {review.name} • Verified Buyer
                            </div>
                        </div>
                    ))}
                </div>
            }
            sidebarCta={
                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <div className="text-sm text-cyan-400 font-medium mb-1">Need help choosing?</div>
                    <div className="text-xs text-white/60">Contact our support team for personalized recommendations.</div>
                </div>
            }
        />
    );
}
