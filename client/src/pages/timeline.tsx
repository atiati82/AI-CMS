
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";

export default function TimelinePage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Andara Milestones"
      subtitle="Evolution of a Concept"
      vibeKeywords={['History', 'Development', 'Phases']}
      seoTitle="Andara Ionic Timeline – Key Milestones & Evolution"
      seoDescription="Explore the evolution of Andara Ionic from early experiments with mineral water clarification to a structured science library and global product concept."
      seoKeywords={["andara ionic timeline", "andara milestones", "andara history", "mineral water project evolution", "structured water development", "ionic sulfate project"]}
    >
      <div className="container mx-auto px-4 py-12 max-w-4xl">

        {/* Intro */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl text-emerald-400 font-light mb-4">The Journey So Far</h2>
          <p className="text-slate-400">From early curiosity about spring water to a global structured science library.</p>
        </div>

        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-[20px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent md:left-1/2 md:-ml-px" />

          {/* Early Curiosity */}
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 flex justify-start md:justify-end text-left md:text-right">
              <div className="space-y-2">
                <span className="text-emerald-500 font-mono text-xs">PRE-ANDARA</span>
                <h3 className="text-xl text-white font-medium">Early Curiosity</h3>
                <p className="text-slate-400 text-sm">Exploration of spring waters, sulfur baths, and mineral spas. First exposure to EZ water and bioelectric terrain concepts. Realising modern water is electrically poor.</p>
              </div>
            </div>
            <div className="relative z-10 w-10 h-10 rounded-full bg-slate-950 border border-emerald-500 flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="w-full md:w-1/2 hidden md:block" />
          </div>

          {/* Phase 1 */}
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:flex-row-reverse">
            <div className="w-full md:w-1/2 flex justify-start text-left">
              <div className="space-y-2">
                <span className="text-emerald-500 font-mono text-xs">PHASE 1</span>
                <h3 className="text-xl text-white font-medium">Prototypes & Experiments</h3>
                <p className="text-slate-400 text-sm">Testing different mineral sources. Observing visible changes in turbidity and taste. Moving from crude mixes to refined ionic sulfate solutions.</p>
              </div>
            </div>
            <div className="relative z-10 w-10 h-10 rounded-full bg-slate-950 border border-emerald-500/50 flex items-center justify-center shrink-0">
              <span className="text-xs text-emerald-500">1</span>
            </div>
            <div className="w-full md:w-1/2 hidden md:block" />
          </div>

          {/* Phase 2 */}
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 flex justify-start md:justify-end text-left md:text-right">
              <div className="space-y-2">
                <span className="text-emerald-500 font-mono text-xs">PHASE 2</span>
                <h3 className="text-xl text-white font-medium">Defining the Sulfate Range</h3>
                <p className="text-slate-400 text-sm">Identifying the "working range" where small sulfate additions support clarity and structural order, inspired by biological fluids and mineral springs.</p>
              </div>
            </div>
            <div className="relative z-10 w-10 h-10 rounded-full bg-slate-950 border border-emerald-500/50 flex items-center justify-center shrink-0">
              <span className="text-xs text-emerald-500">2</span>
            </div>
            <div className="w-full md:w-1/2 hidden md:block" />
          </div>

          {/* Phase 3 */}
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:flex-row-reverse">
            <div className="w-full md:w-1/2 flex justify-start text-left">
              <div className="space-y-2">
                <span className="text-emerald-500 font-mono text-xs">PHASE 3</span>
                <h3 className="text-xl text-white font-medium">Building the Library Structure</h3>
                <p className="text-slate-400 text-sm">Designing the clusters: Water Science, Mineral Science, Crystalline Matrix. Creating the firewall concept to separate education from product claims.</p>
              </div>
            </div>
            <div className="relative z-10 w-10 h-10 rounded-full bg-slate-950 border border-emerald-500/50 flex items-center justify-center shrink-0">
              <span className="text-xs text-emerald-500">3</span>
            </div>
            <div className="w-full md:w-1/2 hidden md:block" />
          </div>

          {/* Phase 4 */}
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 flex justify-start md:justify-end text-left md:text-right">
              <div className="space-y-2">
                <span className="text-emerald-500 font-mono text-xs">PHASE 4</span>
                <h3 className="text-xl text-white font-medium">Product Forms & Bundles</h3>
                <p className="text-slate-400 text-sm">Finalising 100ml and 1L formats. Building bundle logic for families and practitioners. Launching the Dilution Calculator.</p>
              </div>
            </div>
            <div className="relative z-10 w-10 h-10 rounded-full bg-slate-950 border border-emerald-500/50 flex items-center justify-center shrink-0">
              <span className="text-xs text-emerald-500">4</span>
            </div>
            <div className="w-full md:w-1/2 hidden md:block" />
          </div>

          {/* Phase 5 */}
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:flex-row-reverse">
            <div className="w-full md:w-1/2 flex justify-start text-left">
              <div className="space-y-2">
                <span className="text-emerald-500 font-mono text-xs">PHASE 5</span>
                <h3 className="text-xl text-white font-medium">Global Sharing & Refinement</h3>
                <p className="text-slate-400 text-sm">Continuous refinement based on user feedback, water tests, and new scientific publications. Andara remains a living project: structured, but always learning.</p>
              </div>
            </div>
            <div className="relative z-10 w-10 h-10 rounded-full bg-slate-950 border border-emerald-500/50 flex items-center justify-center shrink-0">
              <span className="text-xs text-emerald-500">5</span>
            </div>
            <div className="w-full md:w-1/2 hidden md:block" />
          </div>

        </div>

      </div>
    </StandardPageLayout>
  );
}
