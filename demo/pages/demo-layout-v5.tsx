import React from 'react';
import { AdvancedPageLayout } from "@/components/layout/AdvancedPageLayout_Proposal";
import { SmartImage } from "@/components/ui/SmartImage";
import { BundleCTA } from "@/components/shop/BundleCTA";

export default function DemoLayoutV5() {
    return (
        <AdvancedPageLayout
            title=""
            subtitle=""
            vibeKeywords={["Minimal", "Zen", "Void"]}
        >
            {/* FORCE HIDE DEFAULT HERO CONTENT IN CSS OR JUST IGNORE IT VIA EMPTY PROPS */}

            <div className="max-w-3xl mx-auto px-6">

                {/* 1. THE STATEMENT */}
                <div className="min-h-[60vh] flex flex-col justify-center">
                    <h1 className="text-6xl md:text-8xl font-display text-white tracking-tight leading-[0.9] mb-12">
                        Less.<br />
                        But <span className="text-gray-500">Better.</span>
                    </h1>
                    <div className="w-12 h-1 bg-white mb-12"></div>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                        Layout v5 strips away all containers, borders, and glows.
                        It relies purely on <strong>Typography</strong> and <strong>Negative Space</strong> to command authority.
                    </p>
                </div>

                {/* 2. THE ARTIFACT */}
                <div className="my-32 -mx-6 md:-mx-32">
                    <SmartImage keyword="crystal-macro" className="w-full aspect-[21/9] object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                    <p className="text-xs text-center text-gray-600 mt-4 tracking-widest uppercase">Fig 1.0 — The Foundation</p>
                </div>

                {/* 3. THE NARRATIVE */}
                <div className="space-y-16 py-12 border-l border-white/10 pl-8 md:pl-16">
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">The Concept</h3>
                        <p className="text-2xl text-gray-300 font-light leading-relaxed">
                            Simplicity is the ultimate sophistication. When you remove the noise,
                            the signal becomes deafening.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">The Application</h3>
                        <p className="text-lg text-gray-400 leading-relaxed font-serif italic">
                            "This layout is perfect for the 'About' page or high-level 'Brand Manifesto'.
                            It feels like a luxury magazine, not a website."
                        </p>
                    </div>
                </div>

                {/* 4. THE FOOTER CTA */}
                <div className="mt-48 mb-24 text-center">
                    <BundleCTA />
                </div>

            </div>
        </AdvancedPageLayout>
    );
}
