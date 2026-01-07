import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { BackgroundLayer } from "@/components/visuals/BackgroundLayer";
import { EzGeometryLayers } from "@/components/visuals/EzGeometryLayers";
import { Separator } from "@/components/ui/separator";

export default function EzGeometryMapPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="EZ Geometry Map"
      subtitle="Layers, Angles & Interfaces"
      vibeKeywords={['Structure', 'Interfaces', 'Layers']}
      seoTitle="EZ Geometry Map – Layers, Angles & Interfaces in Structured Water"
      seoDescription="Explore how Exclusion Zone (EZ) water forms layers, angles and interfaces at hydrophilic surfaces. A visual map of structured water geometry."
      seoKeywords={["EZ geometry map", "exclusion zone water", "EZ layers", "water interfaces", "hydrophilic surfaces", "structured water geometry", "EZ angles"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Intro */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl text-emerald-400 font-light">A Map of Water's Skin</h2>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            EZ water isn't a mysterious substance hidden in the glass. It is a very real, measurable layer that forms at surfaces. Like a "soft crystal shell," it hugs hydrophilic materials, shaped by geometry, charge, and flow.
          </p>
        </section>

        {/* Concept Grid: Surface -> Shell -> Transition */}
        <section className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
          <div className="text-center mb-8">
            <span className="text-emerald-500 font-mono text-xs tracking-widest uppercase">The Basic Geometry</span>
            <h2 className="text-2xl text-white mt-2">Surface → Shell → Transition</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-items-center relative">

            {/* Visual Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent -translate-y-1/2 z-0" />

            <div className="relative z-10 bg-slate-950 p-6 rounded-xl border border-slate-800 w-full text-center">
              <h3 className="text-white mb-2">1. Surface</h3>
              <p className="text-slate-500 text-xs text-center">Hydrophilic gel, mineral, glass, membrane.</p>
            </div>

            <div className="relative z-10 bg-emerald-950/30 p-6 rounded-xl border border-emerald-500/30 w-full text-center shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]">
              <h3 className="text-emerald-300 mb-2">2. EZ Shell</h3>
              <p className="text-emerald-400/70 text-xs">Ordered, negatively charged, exclusion zone.</p>
            </div>

            <div className="relative z-10 bg-blue-950/10 p-6 rounded-xl border border-blue-500/10 w-full text-center">
              <h3 className="text-blue-200 mb-2">3. Bulk Water</h3>
              <p className="text-slate-500 text-xs">Disordered, positive charge accumulation.</p>
            </div>
          </div>
        </section>

        {/* 2. LAYERS VS EDGES */}
        <section className="container px-4 max-w-5xl mx-auto mb-24">
          <div className="bg-[#0b1020] rounded-2xl border border-white/5 p-8 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-display text-white mb-4">Geometry is Adaptive</h2>
              <p className="text-white/60 mb-6 leading-relaxed">
                In textbooks, EZ water is often drawn as infinite flat sheets. In reality, it must <strong>curve around proteins, organelles, and minerals</strong>. This curvature creates "edge tension," which is where the energy storage potential becomes dynamic.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-white/70"><div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" /> Flat = Max Stability (Ice-like)</li>
                <li className="flex items-center gap-3 text-sm text-white/70"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Curved = Max Reactivity (Life-like)</li>
              </ul>
            </div>
            <div className="flex-1 w-full">
              <EzGeometryLayers />
            </div>
          </div>
        </section>
        <section className="text-center space-y-6">
          <span className="text-blue-500 font-mono text-xs tracking-widest uppercase">Flow Geometry</span>
          <h2 className="text-2xl text-white">Inside Tubes & Chambers</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            When water flows through a hydrophilic tube, the wall forms a cylindrical EZ sheath. In vortex chambers, rotating flow + minerals + hydrophilic curves create "geometry-guided structuring." Water moves differently when the boundaries are orderly.
          </p>
        </section>

        {/* Sulfate Role */}
        <section className="bg-emerald-950/10 rounded-2xl p-8 border border-emerald-500/20 text-center space-y-4">
          <h2 className="text-2xl text-emerald-300">Sulfate: The Anchor</h2>
          <p className="text-slate-300 max-w-3xl mx-auto">
            Sulfate ions (SO₄²⁻) are strongly hydrated and help define the charge landscape at interfaces. They don't just float; they support the "thickness" and robustness of these layers.
          </p>
          <div className="inline-block mt-4 px-4 py-2 rounded-full border border-emerald-500/30 text-emerald-400 text-xs">
            Surface + Ions + Field = Stable EZ
          </div>
        </section>

        <Separator className="bg-slate-800" />

        {/* Practical Design Tool */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl text-white">The EZ Map as a Design Tool</h2>
            <p className="text-slate-400 text-sm">
              When designing water systems (or thinking about your own), ask:
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex gap-2 text-emerald-400"><span>1.</span> <span className="text-slate-300">Where are the surfaces? (Glass, mineral, membrane)</span></li>
              <li className="flex gap-2 text-emerald-400"><span>2.</span> <span className="text-slate-300">How hydrophilic are they?</span></li>
              <li className="flex gap-2 text-emerald-400"><span>3.</span> <span className="text-slate-300">Are sulfate/mineral ions present?</span></li>
              <li className="flex gap-2 text-emerald-400"><span>4.</span> <span className="text-slate-300">Is there energy flow? (Light, vortex)</span></li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col justify-center text-center space-y-4">
            <h3 className="text-white font-medium">Andara's Role</h3>
            <p className="text-slate-400 text-sm">
              Andara Ionic provides the <span className="text-emerald-400">mineral signal</span> (Item 3). We clarify the medium so that when water meets a surface, it has the ionic intelligence to organize.
            </p>
          </div>
        </section>

        {/* Footer Note */}
        <section className="text-center text-xs text-slate-600 pt-8 border-t border-slate-800">
          We use EZ geometry as an educational map. We describe physical interactions between water, ions, and surfaces. We do not make medical claims about treating disease.
        </section>

      </div>
    </StandardPageLayout>
  );
}
