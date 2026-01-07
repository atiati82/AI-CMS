
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function LiquidCrystalMemoryPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Liquid Crystal Memory"
      subtitle="Storing Patterns in Soft Matter"
      vibeKeywords={['Imprint', 'History', 'Pattern']}
      seoTitle="Liquid Crystal Memory – Storing Patterns in Soft Matter"
      seoDescription="Explore how liquid crystalline structures in water, membranes and soft tissues can store and transmit patterns over time. Explains pattern retention and field-based information."
      seoKeywords={["liquid crystal memory", "soft matter memory", "water memory concepts", "pattern storage in liquid crystals", "field-based information", "structured soft matter"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Intro */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl text-emerald-400 font-light">History in the Medium</h2>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            Memory isn't just thoughts in a brain. In materials science, memory means a system's present state carries imprints of past influences. Liquid crystals—because they combine order and flow—are uniquely capable of "remembering" patterns of fields, stresses, and structures.
          </p>
        </section>

        {/* Material Memory Examples */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl text-white">Not Psychology, Physics.</h2>
            <p className="text-slate-400 text-sm">
              Materials remember shapes (elasticity), magnetism (hysteresis), and orientation. Liquid crystals hold <span className="text-emerald-400">pattern memory</span>.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <Card className="p-4 bg-slate-900 border-slate-800 flex gap-4 items-center">
                <div className="h-10 w-10 bg-slate-800 rounded flex items-center justify-center text-slate-500 text-lg">🧲</div>
                <div>
                  <h3 className="text-white text-sm font-medium">Magnetic Memory</h3>
                  <p className="text-slate-500 text-xs">Iron stays magnetized after the field is gone.</p>
                </div>
              </Card>
              <Card className="p-4 bg-emerald-950/20 border-emerald-500/30 flex gap-4 items-center">
                <div className="h-10 w-10 bg-emerald-900/30 rounded flex items-center justify-center text-emerald-400 text-lg">💠</div>
                <div>
                  <h3 className="text-emerald-300 text-sm font-medium">Liquid Crystal Memory</h3>
                  <p className="text-emerald-400/70 text-xs">Soft matter retains alignment and domain patterns.</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Domain Viz Placeholder */}
          <div className="h-64 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-8 space-y-6 relative overflow-hidden">
            {/* Abstract visualization of domains */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute inset-0 border border-slate-600 rounded-full" style={{
                  transform: `scale(${i * 0.5 + 0.5}) rotate(${i * 30}deg)`,
                }} />
              ))}
            </div>
            <div className="z-10 text-center space-y-2">
              <p className="text-slate-300 text-sm">External Influence Applied →</p>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-8 bg-emerald-500 rounded-full transform rotate-12" />)}
              </div>
              <p className="text-slate-500 text-xs">Pattern Remains</p>
            </div>
          </div>
        </section>

        {/* 3 Levels of Pattern */}
        <section className="bg-slate-900 rounded-3xl p-8 border border-slate-800 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl text-white">Three Levels of Imprint</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-black/20 rounded-xl border border-slate-800">
              <h3 className="text-blue-300 mb-2">1. Structural</h3>
              <p className="text-slate-400 text-xs">Orientation of molecules. Domain lattice structures.</p>
            </div>
            <div className="p-6 bg-black/20 rounded-xl border border-slate-800">
              <h3 className="text-purple-300 mb-2">2. Charge & Field</h3>
              <p className="text-slate-400 text-xs">Who is positive? Who is negative? Polarization maps.</p>
            </div>
            <div className="p-6 bg-black/20 rounded-xl border border-slate-800">
              <h3 className="text-emerald-300 mb-2">3. Flow & Gradient</h3>
              <p className="text-slate-400 text-xs">Preferred pathways. Ion concentration history.</p>
            </div>
          </div>
        </section>

        {/* Terrain Thinking */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-emerald-950/10 border border-emerald-500/20 p-8 rounded-2xl space-y-4 text-center">
            <h3 className="text-xl text-white">Andara: A Clear Page</h3>
            <p className="text-slate-300 text-sm">
              Andara Ionic focuses on the medium. clarifying impurities and conditioning the mineral environment. Conceptually, a clearer, well-structured water is a more neutral "page" for new patterns, rather than one full of leftover noise.
            </p>
          </div>

          <div className="order-1 md:order-2 space-y-6 text-center md:text-left">
            <h2 className="text-2xl text-white">Terrain Memory</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              From a terrain view, we ask: "What history is the medium holding?" Is the water structure stiff and locked, or flexible and responsive? We don't diagnose illness; we look at the capacity of the terrain to update its patterns.
            </p>
          </div>
        </section>

        <Separator className="bg-slate-800" />

        {/* Footer */}
        <div className="text-center text-xs text-slate-600 pt-8 border-t border-slate-800 max-w-2xl mx-auto">
          This page discusses "memory" as a material science concept (hysteresis, pattern retention). It is an educational terrain model, not a medical claim about healing or psychology.
        </div>

      </div>
    </StandardPageLayout>
  );
}
