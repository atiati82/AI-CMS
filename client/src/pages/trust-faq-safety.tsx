
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function TrustFaqSafetyPage() {
    useScrollTop();

    return (
        <StandardPageLayout
            title="Safety, Quality & Boundaries"
            subtitle="FAQ: Clarity in Water, Clarity in Communication"
            vibeKeywords={['Safety', 'Boundaries', 'Quality']}
            seoTitle="FAQ – Safety, Quality & Boundaries of Andara Ionic"
            seoDescription="Find clear answers about safety, dilution, handling, and the boundaries of Andara Ionic. We clarify what Andara is (a mineral concentrate) and what it is not (a medicine)."
            seoKeywords={["Andara Ionic safety FAQ", "is Andara Ionic safe", "how to dilute Andara Ionic", "heavy metal tested mineral solution", "Andara usage boundaries", "non medical water conditioning"]}
        >
            <div className="container mx-auto px-4 py-12 space-y-16">

                {/* Intro */}
                <section className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl text-emerald-400 font-light">Questions & Boundaries</h2>
                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                        This page replaces hype with clarity. Here are honest answers about how Andara Ionic is handled, tested, and used—and where we draw the line on what it can do.
                    </p>
                </section>

                {/* Main FAQ Accordion */}
                <section className="max-w-4xl mx-auto space-y-8">
                    <Accordion type="single" collapsible className="w-full space-y-4">

                        <AccordionItem value="what-is-it" className="border border-slate-800 rounded-lg bg-slate-900 px-4">
                            <AccordionTrigger className="text-white hover:text-emerald-400">What is Andara Ionic, in simple terms?</AccordionTrigger>
                            <AccordionContent className="text-slate-400 space-y-4 pt-2">
                                <p>
                                    Andara Ionic is a <strong>primordial ionic sulfate mineral concentrate</strong>. It is produced from volcanically sourced raw materials and refined into a clear solution used to clarify and condition water.
                                </p>
                                <p>
                                    It is <span className="text-red-400">not</span> a food, not a dietary supplement, and not a medicine. We treat it as a technical mineral solution for water treatment.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="is-it-safe" className="border border-slate-800 rounded-lg bg-slate-900 px-4">
                            <AccordionTrigger className="text-white hover:text-emerald-400">Is Andara Ionic safe when used as directed?</AccordionTrigger>
                            <AccordionContent className="text-slate-400 space-y-4 pt-2">
                                <p>
                                    Yes. Safety relies on <strong>Quality</strong> (each batch is lab-tested for heavy metals and elemental profile) and <strong>Dosage</strong>.
                                </p>
                                <p>
                                    It is designed to be dosed in the tiny mg/L activation range (typically 17–30 mg sulfate per liter). When diluted as directed, the mineral content in your water is very low and safe for consumption.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="handling" className="border border-slate-800 rounded-lg bg-slate-900 px-4">
                            <AccordionTrigger className="text-white hover:text-emerald-400">How is the concentrate handled safely?</AccordionTrigger>
                            <AccordionContent className="text-slate-400 space-y-4 pt-2">
                                <p>
                                    The concentrate in the bottle is strong. Do not drink it directly. Avoid eye contact. Store in a cool, dark place away from children. If spilled, wipe up with water.
                                </p>
                                <p className="text-xs text-slate-500">
                                    Detailed handling advice is available in the Safety Data Sheet (SDS).
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="heavy-metals" className="border border-slate-800 rounded-lg bg-slate-900 px-4">
                            <AccordionTrigger className="text-white hover:text-emerald-400">Does Andara Ionic contain heavy metals?</AccordionTrigger>
                            <AccordionContent className="text-slate-400 space-y-4 pt-2">
                                <p>
                                    All natural mineral sources contain trace elements. We test every batch for heavy metals (Lead, Cadmium, Mercury, Arsenic) and only release batches that meet strict safety specifications. The COA documents these levels.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="drink-direct" className="border border-slate-800 rounded-lg bg-slate-900 px-4">
                            <AccordionTrigger className="text-white hover:text-emerald-400">Can I drink Andara Ionic directly from the bottle?</AccordionTrigger>
                            <AccordionContent className="text-slate-400 space-y-4 pt-2">
                                <p className="text-red-400 font-semibold">No.</p>
                                <p>
                                    Andara Ionic is a water treatment concentrate, not a beverage. It must always be diluted into water to clarify and condition it before consumption.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="dosage" className="border border-slate-800 rounded-lg bg-slate-900 px-4">
                            <AccordionTrigger className="text-white hover:text-emerald-400">What is the typical dosage?</AccordionTrigger>
                            <AccordionContent className="text-slate-400 space-y-4 pt-2">
                                <div className="bg-black/20 p-4 rounded text-center">
                                    <p className="text-emerald-300 font-mono text-lg">1 ml Concentrate : 1 Liter Water</p>
                                    <p className="text-xs text-slate-500 mt-1">Typical yield: ~17–18 mg/L Sulfate</p>
                                </div>
                                <p>
                                    This aligns with our "Sulfate Activation Range" and classical water clarification dosages.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="filtration" className="border border-slate-800 rounded-lg bg-slate-900 px-4">
                            <AccordionTrigger className="text-white hover:text-emerald-400">Does it replace filters or disinfection?</AccordionTrigger>
                            <AccordionContent className="text-slate-400 space-y-4 pt-2">
                                <p>
                                    Andara Ionic is a powerful module for clarification and conditioning, but it is not a complete treatment plant. Depending on your source water, you may still need filtration (sediment/carbon) and disinfection (if biological contamination is a risk).
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="health-claims" className="border border-emerald-900/30 rounded-lg bg-emerald-950/10 px-4 border-l-4 border-l-emerald-500">
                            <AccordionTrigger className="text-emerald-100 hover:text-emerald-300">Why don't you make health promises?</AccordionTrigger>
                            <AccordionContent className="text-slate-300 space-y-4 pt-2">
                                <p>
                                    Two reasons: <strong>Regulatory Compliance</strong> (we are not a medicine) and <strong>Intellectual Honesty</strong> (water and biology are complex).
                                </p>
                                <p>
                                    We promise measurable physical effects in water (clarity, structure). We do NOT promise to cure diseases.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>

                {/* Footer/Links */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-800">
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-center space-y-4">
                        <h3 className="text-white font-medium">See the Proof</h3>
                        <p className="text-slate-500 text-sm">Where do these answers come from?</p>
                        <div className="flex flex-col gap-2">
                            <span className="text-emerald-400 text-sm hover:underline cursor-pointer">/trust/lab-methods</span>
                            <span className="text-emerald-400 text-sm hover:underline cursor-pointer">/trust/certifications</span>
                        </div>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-center space-y-4">
                        <h3 className="text-white font-medium">Explore the Science</h3>
                        <p className="text-slate-500 text-sm">Why sulfated minerals matter.</p>
                        <div className="flex flex-col gap-2">
                            <span className="text-blue-400 text-sm hover:underline cursor-pointer">/science/mineral-science-blueprint</span>
                            <span className="text-blue-400 text-sm hover:underline cursor-pointer">/science/sulfur-detox-transport</span>
                        </div>
                    </div>
                </section>

                <div className="text-center text-xs text-slate-600">
                    Quality is not an accident. It is a documented choice.
                </div>

            </div>
        </StandardPageLayout>
    );
}
