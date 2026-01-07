
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function B2BResellerPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="B2B & Reseller"
      subtitle="Practitioners, Spas & Retailers"
      vibeKeywords={['Partnership', 'Professional', 'Integration']}
      seoTitle="B2B & Reseller – Andara Ionic for Practitioners, Spas & Retailers"
      seoDescription="Learn how to work with Andara Ionic as a practitioner, spa, retreat host or retailer. Explore liter pricing, bundle options and science-backed educational support."
      seoKeywords={["andara ionic b2b", "andara reseller", "practitioner mineral water", "spa structured water", "b2b sulfate mineral", "wholesale andara"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Intro */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl text-white font-light">Who This Is For</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 py-1 px-3">Holistic Practitioners</Badge>
            <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 py-1 px-3">Spas & Wellness Centers</Badge>
            <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 py-1 px-3">Retreats</Badge>
            <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 py-1 px-3">Concept Stores</Badge>
          </div>
          <p className="text-slate-400 text-lg">
            For anyone who wants to offer clarified, conditioned, mineral-intelligent water to clients and guests.
          </p>
        </section>

        {/* Value Prop */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 bg-black/40 border-emerald-500/20">
            <h3 className="text-xl text-emerald-300 mb-4">Why Andara for Professionals?</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex gap-2"><span className="text-emerald-500">✓</span> Flexible dosing with 1L formats and bundles</li>
              <li className="flex gap-2"><span className="text-emerald-500">✓</span> Clear dilution logic with calculator & tables</li>
              <li className="flex gap-2"><span className="text-emerald-500">✓</span> A science library you can link to—you aren't left alone with "just a bottle"</li>
            </ul>
          </Card>
          <Card className="p-8 bg-black/40 border-emerald-500/20">
            <h3 className="text-xl text-emerald-300 mb-4">Use Cases</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex gap-2"><span className="text-emerald-500">→</span> <strong>Spas:</strong> Welcome water with a clear "what's in your glass" story.</li>
              <li className="flex gap-2"><span className="text-emerald-500">→</span> <strong>Practitioners:</strong> Integrating Andara into terrain-focused consultations.</li>
              <li className="flex gap-2"><span className="text-emerald-500">→</span> <strong>Retail:</strong> Placing "primordial mineral concepts" next to structured water devices.</li>
            </ul>
          </Card>
        </section>

        {/* Formats */}
        <section className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800 text-center">
          <h2 className="text-2xl text-white mb-6">Formats & Pricing Logic</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="w-16 h-32 bg-emerald-500/20 mx-auto rounded-lg border border-emerald-500/30" />
              <h3 className="text-lg text-emerald-200">1 Liter Professional</h3>
              <p className="text-slate-400 text-sm">Optimized for refill stations, glass bottle service, and reception water.</p>
            </div>
            <div className="space-y-2">
              <div className="w-24 h-24 bg-emerald-500/20 mx-auto rounded-lg border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-bold text-xl">4x</div>
              <h3 className="text-lg text-emerald-200">Practitioner Bundles</h3>
              <p className="text-slate-400 text-sm">3+1, 6+3 etc. Reduced price per liter and transparent savings.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-6">
          <h2 className="text-2xl text-white">Partner with Andara</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Describe your space, concept and intention. We can then discuss individual conditions.
          </p>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Apply for Partnership
          </Button>
          <p className="text-xs text-slate-500">Contact us directly for more details.</p>
        </section>

      </div>
    </StandardPageLayout>
  );
}
