
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ChargeCoherencePage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Charge Coherence"
      subtitle="When Currents Start to Sing"
      vibeKeywords={['Phase', 'Alignment', 'Resonance']}
      seoTitle="Charge Coherence – When Currents Start to Sing"
      seoDescription="Explore how charge coherence turns scattered ions and random motion into ordered electrical patterns. Explains bioelectric fields and phase alignment in clear language."
      seoKeywords={["charge coherence", "coherent charge", "bioelectric fields", "electrical patterns in water", "ion currents", "phase alignment", "structured charge"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Intro */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl text-emerald-400 font-light">From Noise to Choir</h2>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            Everywhere in life, charges are moving. The difference between a noisy crowd and a coherent current is alignment. When ions oscillate together and phases lock in, the terrain begins to "sing."
          </p>
        </section>

        {/* Coherence Definition Visual */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl text-white">What is Coherence?</h2>
            <p className="text-slate-400 text-sm">
              It's not just "more energy." It's better alignment.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg opacity-70">
                <h3 className="text-slate-500 text-xs uppercase tracking-widest mb-2">Incoherent (Noise)</h3>
                <div className="flex gap-1 h-8 items-center overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-1 bg-slate-600 rounded-full" style={{
                      height: `${Math.random() * 100}%`,
                      opacity: 0.5
                    }} />
                  ))}
                </div>
              </div>

              <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-lg">
                <h3 className="text-emerald-400 text-xs uppercase tracking-widest mb-2">Coherent (Signal)</h3>
                <div className="flex gap-1 h-8 items-end justify-center">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-1 bg-emerald-400 rounded-full animate-pulse" style={{
                      height: `${Math.sin(i * 0.5) * 40 + 50}%`,
                      animationDelay: `${i * 0.1}s`
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Card className="p-8 bg-black/40 border-slate-800 flex flex-col justify-center space-y-4 text-center">
            <h3 className="text-xl text-white">The Difference</h3>
            <p className="text-slate-400 text-sm">
              "Many drums beaten at random vs. a rhythm section locked into a groove."
            </p>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          </Card>
        </section>

        {/* Water & Medium */}
        <section className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center space-y-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl text-white mb-4">Water: The Conductor</h2>
            <p className="text-slate-400 text-sm">
              Water molecules are tiny electric dipoles. When fields are chaotic, they jiggle. When fields are structured, they align. This alignment creates a smoother road for ions to travel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <div className="p-4 border-l-2 border-emerald-500 bg-black/20">
              <h4 className="text-white font-medium mb-1">Dipole Alignment</h4>
              <p className="text-slate-500 text-xs">Modifies how ions move and how charge distributes.</p>
            </div>
            <div className="p-4 border-l-2 border-blue-500 bg-black/20">
              <h4 className="text-white font-medium mb-1">Surfaces & Layers</h4>
              <p className="text-slate-500 text-xs">Near membranes, water organizes into layers, channeling charge motion.</p>
            </div>
            <div className="p-4 border-l-2 border-purple-500 bg-black/20">
              <h4 className="text-white font-medium mb-1">Pathways</h4>
              <p className="text-slate-500 text-xs">Structured water allows currents to flow with less resistance (noise).</p>
            </div>
          </div>
        </section>

        {/* Terrain Thinking */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl text-emerald-300">Terrain: Clear vs. Foggy</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              From a terrain perspective, we don't diagnose "disease." We look at the quality of the field.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Badge className="bg-emerald-900 text-emerald-300 mt-1">Coherent</Badge>
                <span className="text-slate-400 text-sm">Gradients are clear. Signals travel recognizable paths. The "music" is distinct.</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="text-slate-500 border-slate-700 mt-1">Noisy</Badge>
                <span className="text-slate-400 text-sm">Overlapping, conflicting gradients. Signals have to "shout" to be heard through the fog.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/10 border border-emerald-500/20 p-8 rounded-2xl flex flex-col justify-center space-y-6">
            <h3 className="text-xl text-white">Andara's Fit</h3>
            <p className="text-slate-300 text-sm">
              Andara Ionic conditions the water itself. By providing ionic minerals and clarifying the medium, we help support a stable background for charge coherence.
            </p>
            <div className="text-xs text-emerald-400/60 uppercase tracking-widest font-mono">
              Clear Medium → Better Signal
            </div>
          </div>
        </section>

        <Separator className="bg-slate-800" />

        {/* Footer */}
        <div className="text-center text-xs text-slate-600 pt-8 border-t border-slate-800 max-w-2xl mx-auto">
          Charge coherence is a quality of the terrain, not a medical diagnosis. We use these models to explain the physics of bioelectricity, not to treat conditions.
        </div>

      </div>
    </StandardPageLayout>
  );
}
