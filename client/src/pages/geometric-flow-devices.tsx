
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function GeometricFlowDevicesPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Geometric Flow Devices"
      subtitle="Vortex Shapes, Chambers & Coils"
      vibeKeywords={['Vortex', 'Spiral', 'Coherence']}
      seoTitle="Geometric Flow Devices – Vortex Shapes, Chambers & Coils"
      seoDescription="Discover how vortex shapes, flow chambers and coils guide water into more ordered, coherent states. Plain language explanation of geometric flow."
      seoKeywords={["geometric flow devices", "vortex water device", "vortex chamber", "spiral flow", "toroidal flow", "structured water flow", "geometric flow"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Intro */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl text-emerald-400 font-light">Inviting Water to Move</h2>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            Water doesn't love straight lines. Left alone, it spirals and folds. Geometric flow devices are designed to respect this intelligence—using spirals, toroids, and chambers to nudge water toward clarity and coherence simply through shape and motion.
          </p>
        </section>

        {/* Core Shapes Grid */}
        <section className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
          <div className="text-center mb-10">
            <h2 className="text-2xl text-white">Three Archetypal Shapes</h2>
            <p className="text-slate-500 text-sm">Recurring forms in nature and flow design.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 mx-auto bg-emerald-900/20 rounded-full flex items-center justify-center border border-emerald-500/30 text-2xl">🌀</div>
              <h3 className="text-white font-medium">1. Spiral / Helix</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Like a spiral staircase. Induces centripetal force and layers velocities. Breaks monotony and redistributes charge.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 mx-auto bg-blue-900/20 rounded-full flex items-center justify-center border border-blue-500/30 text-2xl">🍩</div>
              <h3 className="text-white font-medium">2. Toroid / Vortex</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Donut-shaped flow. Water curls inward and rolls back out. Creates intense internal mixing and charge separation (like a heart valve).
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 mx-auto bg-purple-900/20 rounded-full flex items-center justify-center border border-purple-500/30 text-2xl">⏳</div>
              <h3 className="text-white font-medium">3. Hyperbolic Funnel</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Wide to narrow curves. Smoothly accelerates water without pressure shocks. Sets up stable vortex cores.
              </p>
            </div>
          </div>
        </section>

        {/* Surface & Contact Time */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl text-white">More Than Just Shape</h2>
            <p className="text-slate-400 text-sm">
              A good device creates a "short, intense journey." Three things matter:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-emerald-500 font-mono">01</span>
                <span className="text-slate-300 text-sm">Surface Type: Is it hydrophilic? Mineral vs plastic?</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-mono">02</span>
                <span className="text-slate-300 text-sm">Flow Profile: Laminar vs turbulent? Pulsing?</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-mono">03</span>
                <span className="text-slate-300 text-sm">Contact Time: How long does water fold over itself?</span>
              </li>
            </ul>
            <div className="p-4 bg-emerald-950/10 border border-emerald-500/20 rounded text-emerald-400 text-sm italic">
              "Water leaves with more order than it entered."
            </div>
          </div>

          <Card className="p-8 bg-black/40 border-slate-800 flex items-center justify-center text-center">
            <div>
              <Badge variant="outline" className="mb-4 text-slate-500 border-slate-700">The Equation</Badge>
              <h3 className="text-xl text-white">Flow + Geometry + Surface<br />= Coherence</h3>
            </div>
          </Card>
        </section>

        <Separator className="bg-slate-800" />

        {/* Andara's Role */}
        <section className="bg-emerald-950/20 rounded-2xl p-8 border border-emerald-500/20 text-center space-y-6">
          <h2 className="text-2xl text-white">Andara & Geometric Flow</h2>
          <p className="text-slate-400 max-w-3xl mx-auto">
            Andara Ionic is not a mechanical device—it is the mineral signal that preconditions the water. By adding charged sulfate centers and clarifying the medium, we create a more conductive fluid that responds better to any vortex or flow shape.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
            <span className="px-4 py-2 bg-slate-900 rounded-full text-emerald-400 border border-emerald-500/30">1. Mineral Pre-Conditioning</span>
            <span className="text-slate-600 self-center">→</span>
            <span className="px-4 py-2 bg-slate-900 rounded-full text-blue-400 border border-blue-500/30">2. Geometric Structuring</span>
            <span className="text-slate-600 self-center">→</span>
            <span className="px-4 py-2 bg-slate-900 rounded-full text-purple-400 border border-purple-500/30">3. Coherent Output</span>
          </div>
        </section>

        {/* Boundaries Note */}
        <section className="text-center text-xs text-slate-600 pt-8 border-t border-slate-800 max-w-2xl mx-auto">
          A geometric flow device is first a hydrodynamic tool for clarification and order. Energetic interpretations belong to the realm of concepts, not medical diagnoses.
        </section>

      </div>
    </StandardPageLayout>
  );
}
