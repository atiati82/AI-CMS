
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CompareBundlesPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Compare Bundles"
      subtitle="Liter Pricing & Savings"
      vibeKeywords={['Value', 'Volume', 'Community']}
      seoTitle="Compare Andara Ionic Bundles – Liter Pricing & Savings"
      seoDescription="Compare 100 ml and 1 L Andara Ionic bundles, see price per liter, bonus bottles and best value offers for families, practitioners and resellers."
      seoKeywords={["andara bundles comparison", "andara liter price", "andara 100ml vs 1l", "andara bundle savings", "mineral water bundle", "practitioner family pack"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Intro */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl text-emerald-300 font-light">Why Bundles Exist</h2>
          <p className="text-slate-400">
            Andara bundles are designed to lower the effective price per liter, make professional use accessible, and give a clear view of true value.
          </p>
        </section>

        {/* Comparison Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* 100ml Line */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px bg-slate-800 flex-1" />
              <h3 className="text-xl text-emerald-400 font-mono tracking-widest">100ml LINE</h3>
              <div className="h-px bg-slate-800 flex-1" />
            </div>
            <p className="text-center text-slate-500 text-sm">Personal & Starter Use</p>

            <div className="space-y-4">
              <Card className="p-6 bg-slate-900 border-slate-800 hover:border-emerald-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg text-white">Single 100ml</h4>
                  <Badge variant="outline">Flexible</Badge>
                </div>
                <p className="text-slate-400 text-sm">Maximum flexibility. Good for travel and gifting.</p>
              </Card>

              <Card className="p-6 bg-slate-900 border-slate-800 hover:border-emerald-500/30 transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-600 text-xs px-2 py-1 text-white">BEST SELLER</div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg text-white">Quad Pack (3+1)</h4>
                  <span className="text-emerald-400 font-bold">Pay 3, Get 4</span>
                </div>
                <p className="text-slate-400 text-sm">Price per liter drops significantly. Great for starters.</p>
              </Card>

              <Card className="p-6 bg-slate-900 border-slate-800 hover:border-emerald-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg text-white">Infinity Pack (6+2)</h4>
                  <span className="text-emerald-400 font-bold">Pay 6, Get 8</span>
                </div>
                <p className="text-slate-400 text-sm">Stable, lower liter price for ongoing use or sharing.</p>
              </Card>
            </div>
          </div>

          {/* 1L Line */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px bg-slate-800 flex-1" />
              <h3 className="text-xl text-emerald-400 font-mono tracking-widest">1 LITER LINE</h3>
              <div className="h-px bg-slate-800 flex-1" />
            </div>
            <p className="text-center text-slate-500 text-sm">Family & Professional Use</p>

            <div className="space-y-4">
              <Card className="p-6 bg-slate-900 border-slate-800 hover:border-emerald-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg text-white">Single 1L</h4>
                  <Badge variant="outline">Bulk</Badge>
                </div>
                <p className="text-slate-400 text-sm">Standard entry point for families, laboratories, and small practices.</p>
              </Card>

              <Card className="p-6 bg-slate-900 border-slate-800 hover:border-emerald-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg text-white">Family Pack (3+1)</h4>
                  <span className="text-emerald-400 font-bold">Pay 3, Get 4</span>
                </div>
                <p className="text-slate-400 text-sm">More glasses, better liter price. Ideal for home supply.</p>
              </Card>

              <Card className="p-6 bg-emerald-950/20 border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg text-white">Practitioner Pack (6+3)</h4>
                  <span className="text-emerald-400 font-bold">Pay 6, Get 9</span>
                </div>
                <p className="text-slate-400 text-sm">Optimal for practices, small spas, and retreats. Best value.</p>
              </Card>
            </div>
          </div>

        </section>

        {/* Guidance */}
        <section className="bg-black/40 rounded-2xl p-8 border border-slate-800 text-center space-y-4">
          <h3 className="text-xl text-emerald-200">Choosing the Right Bundle</h3>
          <div className="flex flex-col md:flex-row justify-center gap-8 text-sm text-slate-400">
            <p><strong className="text-white block mb-1">Exploring?</strong> Start with 100ml Single or Quad Pack.</p>
            <p><strong className="text-white block mb-1">Family?</strong> 1L+ bundles make the most sense.</p>
            <p><strong className="text-white block mb-1">Practitioner?</strong> Go straight to 1L bundles for stable pricing.</p>
          </div>
        </section>

      </div>
    </StandardPageLayout>
  );
}
