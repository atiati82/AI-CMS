
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TerrainVsSymptomThinkingPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Terrain vs Symptom Thinking"
      subtitle="A New Lens on Body Signals"
      vibeKeywords={['Perspective', 'Listening', 'Context']}
      seoTitle="Terrain vs Symptom Thinking – A New Lens on What the Body Expresses"
      seoDescription="Explore the difference between symptom-focused thinking and terrain-based thinking. Learn how water, minerals, charge and lifestyle shape your inner landscape."
      seoKeywords={["terrain vs symptom", "terrain-based thinking", "symptom-based model", "inner terrain", "holistic terrain", "body signals vs terrain", "terrain perspective"]}
    >
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Intro */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl text-emerald-400 font-light">Two Ways of Seeing</h2>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            Most of us operate in a symptom-centered story: "This hurts, how do I stop it?" Terrain thinking opens the frame: "What kind of landscape is this symptom emerging from?" This page is about two lenses—and how the terrain lens reduces fear.
          </p>
        </section>

        {/* Comparison Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <Card className="p-8 bg-slate-900 border-slate-800 opacity-80 hover:opacity-100 transition-opacity">
            <Badge variant="outline" className="mb-4 text-slate-500 border-slate-700">The Symptom Lens</Badge>
            <h3 className="text-2xl text-white mb-4">Zoomed-In & Fast</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex gap-2"><span>•</span> Focuses on one spot, one number, one label.</li>
              <li className="flex gap-2"><span>•</span> Good for acute danger & crisis.</li>
              <li className="flex gap-2"><span>•</span> Risk: Fear loops, identifying with diagnosis.</li>
            </ul>
            <div className="mt-6 p-4 bg-black/20 rounded text-center text-slate-500 italic">
              "How do I get rid of this?"
            </div>
          </Card>

          <Card className="p-8 bg-emerald-950/20 border-emerald-500/30 hover:bg-emerald-950/30 transition-colors">
            <Badge variant="outline" className="mb-4 text-emerald-400 border-emerald-500/30">The Terrain Lens</Badge>
            <h3 className="text-2xl text-white mb-4">Zoomed-Out & Contextual</h3>
            <ul className="space-y-4 text-slate-300 text-sm">
              <li className="flex gap-2"><span>•</span> Asks about water, minerals, charge, rhythm.</li>
              <li className="flex gap-2"><span>•</span> Sees symptom as communication, not enemy.</li>
              <li className="flex gap-2"><span>•</span> Connects you to process & agency.</li>
            </ul>
            <div className="mt-6 p-4 bg-emerald-900/20 rounded text-center text-emerald-300 italic">
              "What is my landscape expressing?"
            </div>
          </Card>

        </section>

        {/* Examples */}
        <section className="space-y-12">
          <h2 className="text-2xl text-center text-white">Reading the Signals</h2>

          <div className="space-y-6">
            {/* Example 1 */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-right">
                <h4 className="text-lg text-slate-300 mb-2">Skin Flare</h4>
                <p className="text-slate-500 text-sm">"What cream fixes this fastest?"</p>
              </div>
              <div className="flex justify-center text-emerald-500 font-bold">VS</div>
              <div className="bg-emerald-950/10 p-6 rounded-xl border border-emerald-500/20">
                <h4 className="text-lg text-emerald-200 mb-2">Excretion Pathway</h4>
                <p className="text-slate-400 text-sm">"Which layer is under pressure? How is my water & elimination?"</p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-right">
                <h4 className="text-lg text-slate-300 mb-2">Fatigue</h4>
                <p className="text-slate-500 text-sm">"What stimulant gives me energy?"</p>
              </div>
              <div className="flex justify-center text-emerald-500 font-bold">VS</div>
              <div className="bg-emerald-950/10 p-6 rounded-xl border border-emerald-500/20">
                <h4 className="text-lg text-emerald-200 mb-2">Charge & Repair</h4>
                <p className="text-slate-400 text-sm">"Message about overload. How is my sleep, light, and recovery?"</p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-right">
                <h4 className="text-lg text-slate-300 mb-2">Digestive Bloat</h4>
                <p className="text-slate-500 text-sm">"What kills this symptom?"</p>
              </div>
              <div className="flex justify-center text-emerald-500 font-bold">VS</div>
              <div className="bg-emerald-950/10 p-6 rounded-xl border border-emerald-500/20">
                <h4 className="text-lg text-emerald-200 mb-2">Ecosystem</h4>
                <p className="text-slate-400 text-sm">"Gut is a waterway. What is happening in the medium and rhythm?"</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Layer Check-in */}
        <section className="bg-slate-900 rounded-3xl p-8 border border-slate-800 max-w-4xl mx-auto">
          <h2 className="text-2xl text-center text-white mb-8">The 5-Layer Terrain Check-In</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-blue-900/40 rounded-full flex items-center justify-center mx-auto text-blue-400 text-lg">💧</div>
              <h3 className="text-sm font-medium text-slate-300">Water</h3>
              <p className="text-xs text-slate-500">Quality & Hydration</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-amber-900/40 rounded-full flex items-center justify-center mx-auto text-amber-400 text-lg">🧱</div>
              <h3 className="text-sm font-medium text-slate-300">Minerals</h3>
              <p className="text-xs text-slate-500">Diversity & Buffering</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-purple-900/40 rounded-full flex items-center justify-center mx-auto text-purple-400 text-lg">⚡</div>
              <h3 className="text-sm font-medium text-slate-300">Charge</h3>
              <p className="text-xs text-slate-500">Rhythm & Rest</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-green-900/40 rounded-full flex items-center justify-center mx-auto text-green-400 text-lg">🌲</div>
              <h3 className="text-sm font-medium text-slate-300">Environment</h3>
              <p className="text-xs text-slate-500">Exposures & Stress</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-pink-900/40 rounded-full flex items-center justify-center mx-auto text-pink-400 text-lg">📢</div>
              <h3 className="text-sm font-medium text-slate-300">Expression</h3>
              <p className="text-xs text-slate-500">Moving out?</p>
            </div>
          </div>
        </section>

        {/* Andara Note */}
        <section className="text-center space-y-6">
          <p className="text-slate-400 max-w-2xl mx-auto">
            Andara Ionic lives in the terrain story. It’s not a magic bullet, but a consistent, loving gesture toward the water quality of your inner landscape.
          </p>
          <p className="text-xs text-slate-600">
            This does not replace professional care. It adds a layer of self-inquiry.
          </p>
        </section>

      </div>
    </StandardPageLayout>
  );
}
