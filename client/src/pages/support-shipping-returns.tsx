
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

export default function SupportShippingReturnsPage() {
    useScrollTop();

    return (
        <StandardPageLayout
            title="Shipping, Returns & Packaging"
            subtitle="How Your Bottle Travels"
            vibeKeywords={['Logistics', 'Protection', 'Transparency']}
            seoTitle="Shipping, Returns & Packaging – Andara Ionic Glass, Safety & Global Delivery"
            seoDescription="Learn how Andara Ionic ships worldwide, protects glass bottles, and handles returns. Clear policies for EU one-liter line and Bali-based 100 ml line."
            seoKeywords={["Andara shipping and returns", "Andara Ionic shipping", "glass bottle protection", "Andara returns policy", "international shipping Andara"]}
        >
            <div className="container mx-auto px-4 py-12 space-y-16">

                {/* Intro */}
                <section className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl text-emerald-400 font-light">From Volcano to Glass</h2>
                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                        Andara Ionic is energetic information held in glass. That means we prioritize safety and stability. This page explains how we protect the bottles and ensure they reach you intact.
                    </p>
                </section>

                {/* Two Lines */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="p-8 bg-slate-900 border-slate-800 space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 bg-blue-900/20 text-blue-400 text-xs font-bold rounded-bl-xl border-l border-b border-blue-900/30">EUROPE</div>
                        <h3 className="text-xl text-white font-medium">EU Line (1 Liter)</h3>
                        <ul className="space-y-2 text-slate-400 text-sm list-inside list-disc">
                            <li>Shipped from inside the EU</li>
                            <li>Brown/Blue glass bottles</li>
                            <li>No extra import fees for EU customers</li>
                            <li>Delivery: ~3-7 business days</li>
                        </ul>
                    </Card>

                    <Card className="p-8 bg-slate-900 border-slate-800 space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 bg-emerald-900/20 text-emerald-400 text-xs font-bold rounded-bl-xl border-l border-b border-emerald-900/30">GLOBAL</div>
                        <h3 className="text-xl text-white font-medium">Bali Line (100 ml)</h3>
                        <ul className="space-y-2 text-slate-400 text-sm list-inside list-disc">
                            <li>Shipped from Bali, Indonesia</li>
                            <li>Blue glass bottles</li>
                            <li>International shipping rates apply</li>
                            <li>Delivery: ~7-21 business days</li>
                        </ul>
                    </Card>
                </section>

                {/* Packaging */}
                <section className="bg-slate-950/50 rounded-2xl p-8 border border-slate-800 flex flex-col md:flex-row items-center gap-8">
                    <div className="text-5xl">📦</div>
                    <div className="space-y-2">
                        <h3 className="text-white font-medium text-lg">Protective Packaging</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            We use shock-absorbing internal packaging to prevent glass-to-glass contact. Our goal is minimal plastic, maximum protection, and recyclability. Please reuse boxes where possible.
                        </p>
                    </div>
                </section>

                {/* FAQ Accordion */}
                <section className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-2xl text-white text-center">Common Questions</h2>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        <AccordionItem value="processing" className="border border-slate-800 rounded-lg bg-slate-900 px-4">
                            <AccordionTrigger className="text-white hover:text-emerald-400">Order Processing Times</AccordionTrigger>
                            <AccordionContent className="text-slate-400 space-y-2 pt-2">
                                <p>Orders are typically processed within 1-3 business days after payment confirmation.</p>
                                <p>You will receive a tracking number via email once dispatched.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="damaged" className="border border-slate-800 rounded-lg bg-slate-900 px-4">
                            <AccordionTrigger className="text-white hover:text-emerald-400">Damaged or Broken Items</AccordionTrigger>
                            <AccordionContent className="text-slate-400 space-y-2 pt-2">
                                <p>If your parcel arrives wet or with broken glass: <strong>Do not consume the contents.</strong></p>
                                <p>Take photos of the box and damage, and contact support immediately. We will arrange a replacement or refund.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="returns" className="border border-slate-800 rounded-lg bg-slate-900 px-4">
                            <AccordionTrigger className="text-white hover:text-emerald-400">Return Policy</AccordionTrigger>
                            <AccordionContent className="text-slate-400 space-y-2 pt-2">
                                <p>We cannot accept returns of opened or used bottles due to hygiene and safety reasons.</p>
                                <p>Unopened bottles may be returned within 14 days (or per local law), provided they arrive intact. Return shipping is typically covered by the customer unless otherwise stated.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="missing" className="border border-slate-800 rounded-lg bg-slate-900 px-4">
                            <AccordionTrigger className="text-white hover:text-emerald-400">Missing Items</AccordionTrigger>
                            <AccordionContent className="text-slate-400 space-y-2 pt-2">
                                <p>If items are missing from your intact box, take a photo of the contents and packing slip. Contact us with your order number so we can verify packing records and correct the mistake.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="delayed" className="border border-slate-800 rounded-lg bg-slate-900 px-4">
                            <AccordionTrigger className="text-white hover:text-emerald-400">Delayed or Lost Parcels</AccordionTrigger>
                            <AccordionContent className="text-slate-400 space-y-2 pt-2">
                                <p>International tracking often pauses ("In Transit") during customs clearance. This is normal.</p>
                                <p>If a parcel is marked "Delivered" but not received, check with neighbors first, then contact us and the carrier immediately to open a trace.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>

                <Separator className="bg-slate-800" />

                {/* Footer */}
                <div className="text-center text-xs text-slate-600 pt-8 border-t border-slate-800">
                    By ordering, you agree to our full Terms & Conditions regarding shipping and returns. We thank you for treating this mineral concentrate with respect.
                </div>

            </div>
        </StandardPageLayout>
    );
}
