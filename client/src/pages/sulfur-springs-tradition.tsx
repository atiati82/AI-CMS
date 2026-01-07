
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SulfurSpringsTraditionPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Sulfur Springs"
      subtitle="Tradition & Measurement"
      vibeKeywords={['Ancient', 'Thermal', 'Balneology']}
      seoTitle="Sulfur Springs – Traditional Uses & Modern Mineral Measurements"
      seoDescription="Journey from ancient sulfur baths to modern lab reports: how sulfur springs have been used, how they are analyzed today, and what their mineral patterns reveal about water and terrain."
      seoKeywords={["sulfur springs", "sulfur spring tradition", "balneology sulfur water", "sulfur water analysis", "thermal sulfur baths history", "sulfate mineral springs"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Intro */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl text-emerald-400 font-light">Ancient Waters, Modern Eyes</h2>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            For thousands of years, people have walked to waters that smelled different, tasted mineral-rich, and left a film on the skin. This page connects traditional sulfur spring culture with modern mineral analysis—seeing what is actually in those waters without making medical promises.
          </p>
        </section>

        {/* History */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl text-white">A Short Journey Through History</h2>
            <p className="text-slate-400">
              From European spas to Japanese onsen and Indigenous sacred waters. Before lab chemistry, people navigated by sensation: the strong odor ("rotten egg" H₂S), the soft feel on skin, and the warmth.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-center">
                <span className="block text-emerald-400 font-bold mb-1">Bathing</span>
                <span className="text-xs text-slate-500">Long soaks, thermal pools, muds.</span>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-center">
                <span className="block text-emerald-400 font-bold mb-1">Drinking</span>
                <span className="text-xs text-slate-500">Small cups, regulated by balneologists.</span>
              </div>
            </div>
          </div>
          <div className="relative h-72 rounded-2xl overflow-hidden border border-slate-800">
            {/* Abstract Thermal Visual */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 to-slate-950" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-emerald-900/20 to-transparent animate-pulse-slow" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-emerald-500/20 font-serif italic text-4xl">Thermae</span>
            </div>
          </div>
        </section>

        {/* What Defines a Sulfur Spring */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl text-emerald-300">What Makes a Sulfur Spring?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mt-2">
              It is a complex mineral orchestra. Sulfur plays a Lead role, but not a solitary one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-slate-900 border-slate-800">
              <h3 className="text-lg text-emerald-200 mb-2">The Gases</h3>
              <p className="text-slate-400 text-sm">Hydrogen sulfide (H₂S) gives the distinct smell. Carbon dioxide (CO₂) often adds fizz.</p>
            </Card>
            <Card className="p-6 bg-slate-900 border-slate-800">
              <h3 className="text-lg text-emerald-200 mb-2">The Salts</h3>
              <p className="text-slate-400 text-sm">Sulfate (SO₄²⁻), Bicarbonate, Chloride. Often hard waters with Calcium and Magnesium.</p>
            </Card>
            <Card className="p-6 bg-slate-900 border-slate-800">
              <h3 className="text-lg text-emerald-200 mb-2">The Experience</h3>
              <p className="text-slate-400 text-sm">Warmth, "slippery" skin feel, visible deposits or biofilms.</p>
            </Card>
          </div>
        </section>

        {/* Sulfate Signature */}
        <section className="bg-emerald-950/20 rounded-3xl p-8 md:p-12 border border-emerald-500/30 text-center space-y-6">
          <h2 className="text-2xl text-emerald-300">Sulfate as the Silent Connector</h2>
          <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
            If there is one parameter connecting springs, water treatment, and blood plasma, it is Sulfate. In springs, it contributes to ionic strength and structuring hydration layers.
          </p>
          <p className="text-emerald-400 font-medium">
            "Sulfur springs are natural case studies of what happens when water spends time with rock and geothermal energy."
          </p>
        </section>

        {/* Contrast with Tap Water */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl text-slate-200">Everyday Tap Water</h3>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li className="flex gap-2"><span>•</span> Prioritises safety limits & disinfection.</li>
              <li className="flex gap-2"><span>•</span> Often stripped of mineral complexity.</li>
              <li className="flex gap-2"><span>•</span> Loses the deep structural narrative of the earth.</li>
            </ul>
          </div>
          <div className="text-right space-y-4">
            <h3 className="text-xl text-emerald-200">Sulfur Spring Water</h3>
            <ul className="space-y-2 text-emerald-500/80 text-sm flex flex-col items-end">
              <li className="flex gap-2">Travels slowly through rock layers. <span>•</span></li>
              <li className="flex gap-2">Interacts with gas & mineral interfaces. <span>•</span></li>
              <li className="flex gap-2">Settles into mineral-coherent profiles. <span>•</span></li>
            </ul>
          </div>
        </section>

        <Separator className="bg-slate-800" />

        {/* Andara Relation */}
        <section className="text-center space-y-6">
          <h2 className="text-2xl text-white">How Andara Relates</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Andara is not bottled spring water or a spa treatment. Instead, we listen to the teachers (the springs) and apply their core mineral logic—sulfate enrichment and clarification—to modern water conditioning.
          </p>
          <div className="flex justify-center gap-4 text-xs font-mono text-slate-600 uppercase tracking-widest">
            <span>Respect Tradition</span>
            <span>•</span>
            <span>Apply Principles</span>
            <span>•</span>
            <span>Avoid Claims</span>
          </div>
        </section>

      </div>
    </StandardPageLayout>
  );
}
