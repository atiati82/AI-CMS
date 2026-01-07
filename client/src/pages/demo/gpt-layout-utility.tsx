// Demo: GPT Utility Layout
// Route: /demo/gpt-layout-utility

import React, { useState } from "react";
import { UtilityLayout } from "@/templates/gpt";
import { Calculator, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

// Simple dilution calculator for the tool slot demo
function DilutionCalculator() {
    const [liters, setLiters] = useState(1);
    const [drops, setDrops] = useState(10);

    const concentration = liters > 0 ? (drops / liters).toFixed(1) : "0";

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-indigo-400">
                <Calculator className="w-5 h-5" />
                Dilution Calculator
            </div>
            <p className="text-sm text-white/60">
                Calculate the optimal drops per liter for your water volume.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="block text-sm text-white/60 mb-1">Water Volume (Liters)</label>
                    <input
                        type="number"
                        value={liters}
                        onChange={(e) => setLiters(Number(e.target.value))}
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
                        min={0.5}
                        step={0.5}
                    />
                </div>
                <div>
                    <label className="block text-sm text-white/60 mb-1">Drops to Add</label>
                    <input
                        type="number"
                        value={drops}
                        onChange={(e) => setDrops(Number(e.target.value))}
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
                        min={5}
                        step={5}
                    />
                </div>
            </div>
            <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">
                <div className="text-sm text-white/60">Result</div>
                <div className="text-2xl font-bold text-indigo-400">
                    {concentration} drops per liter
                </div>
                <div className="text-sm text-white/50 mt-1">
                    {Number(concentration) >= 8 && Number(concentration) <= 15
                        ? "✓ Optimal range"
                        : Number(concentration) < 8
                            ? "Consider adding more drops"
                            : "Consider using more water"}
                </div>
            </div>
        </div>
    );
}

export default function GptLayoutUtilityDemo() {
    return (
        <UtilityLayout
            title="Support & Tools"
            intro="Find quick answers, use our calculators, and get help with any questions about Andara Ionic products."
            mode="index"
            toolSlot={<DilutionCalculator />}
            faqs={[
                {
                    q: "How many drops should I use per liter?",
                    a: "We recommend 10-15 drops per liter for drinking water. For larger volumes like a bath, use 30-50 drops. Our calculator above can help you find the right ratio.",
                },
                {
                    q: "How long does one bottle last?",
                    a: "A 100ml bottle makes approximately 200+ liters of structured water at the recommended dilution. For most users, this lasts 2-3 months with daily use.",
                },
                {
                    q: "Is Andara Ionic safe for cooking?",
                    a: "Yes! Many customers add drops to cooking water for pasta, rice, and tea. The minerals are heat-stable and safe for all culinary uses.",
                },
                {
                    q: "Can I use it for plants and pets?",
                    a: "Absolutely. Use the same dilution (10-15 drops per liter) for plant watering and pet drinking water. Many gardeners report healthier plants with structured water.",
                },
                {
                    q: "What's your return policy?",
                    a: "We offer a 30-day money-back guarantee. If you're not satisfied for any reason, contact support@andara.io for a full refund.",
                },
            ]}
            mainHtml={`
        <h2>Contact Us</h2>
        <p>Our support team is available Monday-Friday, 9am-5pm CET.</p>
        <ul>
          <li><strong>Email:</strong> support@andara.io</li>
          <li><strong>Response time:</strong> Within 24 hours</li>
        </ul>

        <h2>Shipping Information</h2>
        <p>We ship to all EU countries with free shipping on orders over €50.</p>
        <ul>
          <li><strong>EU Delivery:</strong> 3-5 business days</li>
          <li><strong>Express option:</strong> 1-2 business days (additional fee)</li>
          <li><strong>Tracking:</strong> Provided for all orders</li>
        </ul>

        <h2>Product Storage</h2>
        <p>Store your Andara Ionic in a cool, dark place away from direct sunlight. The concentrate has a 2+ year shelf life when unopened, and 12 months after opening.</p>
      `}
            rightRail={
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                            <Droplets className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <div className="font-semibold text-white">Lab Tested</div>
                            <div className="text-xs text-white/50">Independent verification</div>
                        </div>
                    </div>
                    <div className="text-sm text-white/60 leading-relaxed">
                        Every batch is tested for purity, mineral content, and safety. View our lab reports in the Trust Center.
                    </div>
                    <Button
                        variant="outline"
                        className="w-full rounded-xl border-white/20 text-white hover:bg-white/10"
                        onClick={() => alert("Navigate to Trust Center")}
                    >
                        View Lab Reports
                    </Button>
                </div>
            }
            cta={{
                label: "Ready to try Andara Ionic?",
                href: "/shop",
            }}
        />
    );
}
