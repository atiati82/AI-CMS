
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SulfurDetoxTransportPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Sulfur, Transport & Clarification"
      subtitle="How Sulfate Guides Flow"
      vibeKeywords={['Flow', 'Transport', 'Clarification']}
      seoTitle="Sulfur, Transport & Clarification Principles – How Sulfate Guides Flow"
      seoDescription="Explore how sulfur and sulfate participate in transport, clarification and terrain support – in water, in nature and in the body’s own flow systems, without medical claims."
      seoKeywords={["sulfur transport clarification", "sulfate detox principles", "sulfur in water", "sulfate transport model", "clarification chemistry", "mineral-based detox support", "sulfur terrain concept"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Intro */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl text-emerald-400 font-light">The Quiet Element Behind Flow</h2>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            Sulfur is the quiet element behind many “detox stories”. It appears in sulfur springs, in traditional cleansing rituals, in bile, and in classical water treatment. This page is not about protocols or cure—it is about the principles of how sulfur and sulfate help things move, bind, and clarify.
          </p>
        </section>

        {/* History of Cleansing */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl text-white">Why Sulfur Shows Up in Cleansing Traditions</h2>
            <p className="text-slate-400">
              Wherever humans met strong smells and warm waters, sulfur was usually close. Even before chemistry existed, people sensed that "where sulfur is present, something about stagnation and density can shift."
            </p>
            <Card className="p-6 bg-slate-900 border-slate-800">
              <h3 className="text-emerald-400 mb-2 font-medium">Modern Translation</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• Binds, transforms, or carries other substances.</li>
                <li>• Participates in redox reactions (shifting charge).</li>
                <li>• Helps build flexible structures in water and tissue.</li>
              </ul>
            </Card>
          </div>
          <div className="relative h-64 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            <div className="absolute inset-0 bg-yellow-900/10 mix-blend-color-dodge" />
            <div className="text-center">
              <span className="block text-4xl text-yellow-500/50 font-bold mb-2">S</span>
              <span className="text-xs text-yellow-500/50 font-mono tracking-widest">ELEMENTAL_SHIFT</span>
            </div>
          </div>
        </section>

        {/* Distinctions */}
        <section className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800">
          <div className="text-center mb-8">
            <h2 className="text-2xl text-white">Sulfur vs Sulfate: Knowing the Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="p-4 bg-black/20 rounded-lg border border-slate-800">
              <span className="text-yellow-400 font-bold block mb-1">Elemental Sulfur (S)</span>
              <span className="text-slate-500">Solid, yellow. Agriculture & industrial use.</span>
            </div>
            <div className="p-4 bg-black/20 rounded-lg border border-slate-800">
              <span className="text-orange-400 font-bold block mb-1">Sulfide (S²⁻)</span>
              <span className="text-slate-500">Rotten egg smell (H₂S). Anaerobic environments.</span>
            </div>
            <div className="p-4 bg-black/20 rounded-lg border border-slate-800">
              <span className="text-red-400 font-bold block mb-1">Sulfite (SO₃²⁻)</span>
              <span className="text-slate-500">Preservative. Reactive. Often allergenic.</span>
            </div>
            <div className="p-4 bg-emerald-950/40 rounded-lg border border-emerald-500/30 ring-1 ring-emerald-500/20">
              <span className="text-emerald-400 font-bold block mb-1">Sulfate (SO₄²⁻)</span>
              <span className="text-emerald-200/80">Oxygen-rich. Stable. Found in springs & ocean. Central to clarification.</span>
            </div>
          </div>
        </section>

        {/* Roles in Water */}
        <section className="space-y-8">
          <h2 className="text-2xl text-emerald-300 text-center">Sulfate in Water: A Transport Companion</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-slate-900 border-slate-800">
              <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400">1. Charge & Binding</Badge>
              <p className="text-slate-400 text-sm">Associates with calcium, magnesium, and iron to influence how particles attract or repel. A "traffic organiser" for ions.</p>
            </Card>
            <Card className="p-6 bg-slate-900 border-slate-800">
              <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400">2. Clarification</Badge>
              <p className="text-slate-400 text-sm">Helps gather suspended particles into flocs that settle or filter out. Taking what floats everywhere and helping it exit.</p>
            </Card>
            <Card className="p-6 bg-slate-900 border-slate-800">
              <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400">3. Structure</Badge>
              <p className="text-slate-400 text-sm">Contributes to conductivity and ordered hydration layers around surfaces. Negative charges create spacing and glide.</p>
            </Card>
          </div>
        </section>

        {/* Biology & Terrain */}
        <section className="bg-emerald-950/10 rounded-3xl p-8 md:p-12 border border-emerald-500/20">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <h2 className="text-2xl text-emerald-200">Biology: Transport & Terrain</h2>
            <p className="text-slate-300 leading-relaxed">
              In terrain language, sulfate often helps things move, separate, glide, and be washed through rather than stagnate. It appears in connective tissue, mucosal matrices, and bile salts.
            </p>
            <p className="text-emerald-400 italic">
              "Not a detox miracle, but a recognition that flow requires a charged, structured architecture."
            </p>
          </div>
        </section>

        {/* Andara Concept */}
        <section className="text-center space-y-6">
          <h2 className="text-2xl text-white">How This Informs Andara</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Andara uses sulfate as a structural and transport guiding element—not as a drug. We design small, controlled ranges that support clarification and a more ordered ionic environment.
          </p>
          <div className="p-4 bg-slate-900 inline-block rounded-lg text-sm text-slate-500 border border-slate-800">
            The goal is better water terrain. What you do on top of that terrain is your sovereign journey.
          </div>
        </section>

        {/* Disclaimer */}
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-xs text-slate-600 max-w-2xl mx-auto">
            This page explains principles of sulfate chemistry and transport. It does not describe treatments for diseases or replace professional medical advice.
          </p>
        </div>

      </div>
    </StandardPageLayout>
  );
}
