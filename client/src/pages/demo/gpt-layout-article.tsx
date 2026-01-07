// Demo: GPT Article Layout
// Route: /demo/gpt-layout-article

import React from "react";
import { ArticleLayout } from "@/templates/gpt";
import { Droplets, Sparkles } from "lucide-react";

export default function GptLayoutArticleDemo() {
    return (
        <ArticleLayout
            title="What is EZ Water? The Fourth Phase of Water Explained"
            introHookSentence="Most people think water only exists as liquid, ice, or steam — but pioneering research has revealed a fourth phase that may be the key to understanding biological water."
            definition40to60Words="EZ water (Exclusion Zone water) is a structured, gel-like phase of water discovered by Dr. Gerald Pollack at the University of Washington. It forms naturally at hydrophilic surfaces, excludes solutes and particles, and carries a negative charge. This organized water layer may explain many unexplained properties of biological water systems."
            updatedAtLabel="Updated: January 5, 2026"
            authorLine="Andara Science Team"
            sidebarCta={{
                imageOrVisual: (
                    <div className="aspect-video rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center">
                        <Droplets className="w-12 h-12 text-cyan-400" />
                    </div>
                ),
                headline: "Experience structured water at home",
                buttonLabel: "Shop Andara Ionic",
                buttonHref: "/shop",
                microCopy: "Add mineral intelligence to any water source and support EZ formation naturally.",
            }}
            fanOutQuestions={[
                { q: "How does EZ water form?", anchor: "formation" },
                { q: "Is EZ water real science?", anchor: "science" },
                { q: "Can I make EZ water at home?", anchor: "home" },
                { q: "What are the health benefits?", anchor: "benefits" },
                { q: "EZ water vs structured water?", anchor: "comparison" },
            ]}
            factBlock={
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                        Quick Facts: EZ Water Properties
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {[
                            { label: "Charge", value: "Negative (-100 to -200 mV)" },
                            { label: "Structure", value: "Hexagonal layers" },
                            { label: "Viscosity", value: "More gel-like than bulk water" },
                            { label: "Formation", value: "At hydrophilic surfaces" },
                            { label: "Energy source", value: "IR light (from sun, body heat)" },
                            { label: "Discoverer", value: "Dr. Gerald Pollack, 2001" },
                        ].map((fact, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-white/10"
                            >
                                <span className="text-sm text-white/60">{fact.label}</span>
                                <span className="text-sm font-medium text-white">{fact.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            }
            contentHtml={`
        <h2 id="formation">How Does EZ Water Form?</h2>
        <p>EZ water forms spontaneously when ordinary water comes into contact with hydrophilic (water-loving) surfaces. Think of:</p>
        <ul>
          <li>Cell membranes and proteins</li>
          <li>Collagen and connective tissue</li>
          <li>Certain minerals and silicates</li>
        </ul>
        <p>The key driver is <strong>infrared light energy</strong>. When IR radiation (from sunlight or body heat) hits water near a hydrophilic surface, it provides the energy needed to organize water molecules into structured layers.</p>

        <h2 id="science">Is EZ Water Real Science?</h2>
        <p>Yes. Dr. Gerald Pollack's research at the University of Washington has been published in peer-reviewed journals and replicated by independent labs. The key findings:</p>
        <ul>
          <li>EZ water excludes particles and solutes (hence "exclusion zone")</li>
          <li>It carries a measurable negative charge</li>
          <li>It has different optical properties than bulk water</li>
          <li>It grows when exposed to infrared light</li>
        </ul>

        <h2 id="home">Can I Make EZ Water at Home?</h2>
        <p>Yes, but indirectly. You can support EZ formation by:</p>
        <ol>
          <li><strong>Adding ionic minerals</strong> — They provide hydrophilic surfaces for EZ to form</li>
          <li><strong>Exposing water to natural light</strong> — Especially morning sunlight</li>
          <li><strong>Using vortexing motion</strong> — Mimics natural water movement</li>
        </ol>
        <p>Andara Ionic provides the mineral substrate that supports these natural structuring processes.</p>

        <h2 id="benefits">What Are the Potential Benefits?</h2>
        <p>Research suggests structured water may support:</p>
        <ul>
          <li>Improved cellular hydration</li>
          <li>Better charge separation and energy storage</li>
          <li>Enhanced protein folding and enzyme function</li>
          <li>Natural detoxification processes</li>
        </ul>

        <h2 id="comparison">EZ Water vs "Structured Water"</h2>
        <p>EZ water is a <em>specific, measurable</em> phenomenon documented in peer-reviewed research. "Structured water" is a broader, sometimes vague term used in wellness marketing.</p>
        <p>When we talk about structured water at Andara, we're referring to the scientific principles behind EZ formation — not mystical claims.</p>
      `}
            bottomCta={{
                headline: "Ready to support water structure naturally?",
                body: "Andara Ionic provides the mineral intelligence that helps water organize itself. Simple drops, profound difference.",
                buttonLabel: "Explore Andara Ionic Products",
                buttonHref: "/shop",
            }}
        />
    );
}
