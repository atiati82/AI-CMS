
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

export default function PhilosophyPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Philosophy & Principles"
      subtitle="Ethics, Transparency & Terrain"
      vibeKeywords={['Integrity', 'Boundaries', 'Respect']}
      seoTitle="Andara Philosophy – Ethics, Principles & Terrain Perspective"
      seoDescription="Learn the philosophical and ethical foundations of Andara Ionic: terrain-first thinking, radical transparency, and respectful use of mineral water clarification."
      seoKeywords={["andara philosophy", "andara ethics", "terrain-based philosophy", "water clarification principles", "structured water ethics", "mineral product responsibility"]}
    >
      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-16">

        {/* Central Philosophy */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl text-white font-light">Terrain Before Symptom</h2>
          <Card className="p-8 bg-emerald-950/20 border-emerald-500/30 backdrop-blur-sm">
            <p className="text-xl md:text-2xl text-emerald-300 italic font-light mb-4">
              “Support the terrain, don’t chase symptoms.”
            </p>
            <p className="text-slate-400">
              Instead of promising to “fix” something, Andara focuses on foundation layers: water structure, mineral availability, charge distribution, and environmental fields. What you do with that terrain is your sovereign journey.
            </p>
          </Card>
        </section>

        {/* Principles Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl text-emerald-200">Radical Transparency</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We explain what the product does (clarification, conditioning) and what it does not do (no medical treatment, no cures). We share measurement logic where available. No hidden tricks, no fear-based framing, no “miracle water” claims.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl text-emerald-200">Respect for Nature & Source</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We choose mineral sources with geological integrity and use small doses instead of overloading water. We encourage glass over plastic and conscious, moderate use.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl text-emerald-200">Education Over Dependency</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              The Andara Library is not designed to create dependency. Instead it aims to teach principles, support self-responsibility, and offer language to describe subtle experiences with water and terrain.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl text-emerald-200">Ethical Boundaries</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Andara Ionic is presented as water clarification support. It is not marketed as medicine. Educational content uses language like “can support” or “may contribute,” never “heals” or “cures.”
            </p>
          </div>
        </section>

        {/* Community */}
        <section className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800 text-center space-y-4">
          <h3 className="text-xl text-white">Community & Dialogue</h3>
          <p className="text-slate-400">
            The philosophy is alive, not carved in stone. Feedback from users, practitioners and scientists is welcome. The Library grows as a shared field of exploration.
          </p>
        </section>

      </div>
    </StandardPageLayout>
  );
}
