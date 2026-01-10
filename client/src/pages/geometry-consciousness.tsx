
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { VideoBackground } from "@/components/SmartVideoEmbed";

export default function GeometryConsciousnessPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Geometry, Fields & Consciousness"
      subtitle="Pattern, Relation & Form"
      backgroundElement={<VideoBackground keywords={["geometry", "sacred", "patterns", "mandala", "purple", "consciousness"]} overlayOpacity={0.35} />}
      vibeKeywords={['Pattern', 'Field', 'Awareness']}
      seoTitle="Geometry, Fields & Consciousness Maps"
      seoDescription="Explore how geometry, fields and consciousness may be connected through patterns, symmetry and subtle organization. An educational map of inner perception."
      seoKeywords={["geometry and consciousness", "sacred geometry", "fields and consciousness", "energy fields", "symbolic geometry", "geometry of life", "consciousness maps"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Intro */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl text-emerald-400 font-light">The Language of Connection</h2>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            Before body, water, or minerals, there is pattern. Geometry is the language of relationships in space. Consciousness is the capacity to recognize those patterns. When they meet, we find that the shapes we move through may be mirrors of how awareness organizes itself.
          </p>
        </section>

        {/* Geometry as Language */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl text-white">More Than Triangles</h2>
            <p className="text-slate-400 text-sm">
              Geometry isn't just about shapes on a board. It's about how points relate and angles define flow.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="block text-emerald-400 font-mono text-xs mb-1">Point</span>
                <span className="text-slate-500 text-sm">Focus, Origin</span>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="block text-emerald-400 font-mono text-xs mb-1">Circle</span>
                <span className="text-slate-500 text-sm">Wholeness, Cycles</span>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="block text-emerald-400 font-mono text-xs mb-1">Triangle</span>
                <span className="text-slate-500 text-sm">Stability, Tension</span>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="block text-emerald-400 font-mono text-xs mb-1">Spiral</span>
                <span className="text-slate-500 text-sm">Growth, Unfolding</span>
              </div>
            </div>
          </div>

          <div className="relative h-64 bg-slate-950/50 rounded-2xl border border-slate-800 flex items-center justify-center p-8 text-center">
            <p className="text-slate-600 text-sm italic">
              "We feel different in a cathedral vs. a square office. Geometry defines how we focus and breathe."
            </p>
            {/* Abstract geometric background elements could go here */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent" />
          </div>
        </section>

        {/* Fields & Consciousness */}
        <section className="space-y-8">
          <div className="text-center md:text-left md:flex justify-between items-end">
            <div>
              <h2 className="text-2xl text-white">Fields: The Invisible Context</h2>
              <p className="text-slate-400 text-sm mt-2">Geometry is shape. Field is the atmosphere it sits in.</p>
            </div>
            <Badge variant="outline" className="mt-4 md:mt-0 text-purple-400 border-purple-500/30">Pattern Recognition</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-slate-900 border-slate-800">
              <h3 className="text-white mb-2">The Field</h3>
              <p className="text-slate-500 text-xs">Electromagnetic, gravitational, morphogenic. The invisible tone we live inside.</p>
            </Card>
            <Card className="p-6 bg-emerald-950/20 border-emerald-500/30">
              <h3 className="text-emerald-300 mb-2">The Mirror</h3>
              <p className="text-emerald-400/70 text-xs">Consciousness sees a cloud and finds a face. It is a meaning-maker that links inner and outer worlds.</p>
            </Card>
            <Card className="p-6 bg-slate-900 border-slate-800">
              <h3 className="text-white mb-2">The Bridge</h3>
              <p className="text-slate-500 text-xs">Geometry provides the symbols. Fields provide the tone. Consciousness provides the interpretation.</p>
            </Card>
          </div>
        </section>

        {/* Sacred Geometry Note */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6">
          <h2 className="text-2xl text-white">Sacred Geometry: Maps, Not Laws</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Labels like "Flower of Life" or "Metatron's Cube" refer to recurring patterns in nature and art. We approach them as visual maps—tools to contemplate order and harmony, not as rigid dogma.
          </p>
        </section>

        {/* Andara Integration */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl text-emerald-300">Geometry & Andara</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our Science Library speaks of water, minerals, and bioelectricity. Geometry bridges them:
            </p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2"><span className="text-emerald-500">•</span> <strong>Water</strong> organizes in hexagonal lattices at interfaces.</li>
              <li className="flex gap-2"><span className="text-emerald-500">•</span> <strong>Minerals</strong> are literal geometries in matter.</li>
              <li className="flex gap-2"><span className="text-emerald-500">•</span> <strong>Fields</strong> form loops and toroids—geometric patterns invisible to the eye.</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl text-white">Inner Cartography</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Just as we map cities, we map inner states. Mandalas, spirals, and charts are tools to orient personal exploration. They help visualize calm vs. chaos, tension vs. release.
            </p>
            <div className="p-4 bg-slate-950 rounded border border-slate-800 text-center text-xs text-slate-500">
              "No medical claims. Just visual metaphors to explore inner life."
            </div>
          </div>
        </section>

        <Separator className="bg-slate-800" />

        {/* Practical Use */}
        <section className="text-center space-y-6">
          <h2 className="text-xl text-white">Practical Exploration</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            Observe how different spaces feel. Sketch simple shapes. Use geometry (circles for wholeness, spirals for growth) to reflect on life situations. There is no correct interpretation—only your own felt sense.
          </p>
        </section>

        {/* Footer */}
        <div className="text-center text-xs text-slate-600 pt-8 border-t border-slate-800">
          We respect both symbolic traditions and scientific rigor. We keep a clear firewall: no health or disease claims, no diagnostic promises. This is a thinking space.
        </div>

      </div>
    </StandardPageLayout>
  );
}
