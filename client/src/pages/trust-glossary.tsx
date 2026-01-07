
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default function TrustGlossaryPage() {
    useScrollTop();

    // Section Interface
    interface GlossarySection {
        letter: string;
        items: {
            term: string;
            definition: string | React.ReactNode;
            bullets?: string[];
            note?: string;
        }[];
    }

    const glossaryData: GlossarySection[] = [
        {
            letter: "A",
            items: [
                {
                    term: "Andara Ionic",
                    definition: "A primordial ionic sulfate mineral concentrate used in tiny amounts to support water clarification and conditioning. It is derived from mineral and volcanic sources, refined into a clear ionic solution, and designed to be used in high dilution.",
                    note: "Not marketed as a food, supplement or medicine."
                },
                {
                    term: "Activation Range",
                    definition: "The sulfate concentration window usually ~17–30 mg sulfate per liter where water tends to show improved clarity, flocculation, and ordered charge behavior.",
                }
            ]
        },
        {
            letter: "B",
            items: [
                {
                    term: "Bioelectric Terrain",
                    definition: "A way of seeing the body and environment as an electrical and ionic landscape: voltage differences, ionic currents, and structured water layers.",
                },
                {
                    term: "Bundles",
                    definition: "Product combinations (e.g. 3+1, 6+2) offering economic value and practical supply for long-term use.",
                }
            ]
        },
        {
            letter: "C",
            items: [
                {
                    term: "Charge Coherence",
                    definition: "A state where charges and fields are aligned and synchronized (less 'noise'), supporting smooth information flow.",
                },
                {
                    term: "Clarification",
                    definition: "The process by which cloudy water becomes clearer through binding of particles, flocculation, and sedimentation.",
                },
                {
                    term: "Colloidal Minerals",
                    definition: "Minerals suspended as tiny particles. Andara Ionic contrasts with these by being fully dissolved (ionic).",
                },
                {
                    term: "Conductivity (EC)",
                    definition: "Electrical Conductivity. A measure of total ionic content in water. Higher EC = more ions.",
                }
            ]
        },
        {
            letter: "E",
            items: [
                {
                    term: "Exclusion Zone (EZ) Water",
                    definition: "The 'fourth phase' of water (Dr. Gerald Pollack). Ordered water layers at hydrophilic surfaces that exclude solutes and store charge.",
                }
            ]
        },
        {
            letter: "F",
            items: [
                {
                    term: "Flocculation",
                    definition: "The process where fine particles cluster ('flocs') and settle out of water. A key behavior of sulfate ionic minerals.",
                },
                {
                    term: "Fulvic Minerals",
                    definition: "Complex organic-mineral compounds from plant matter. Distinct from Andara's primordial volcanic sulfate origin.",
                }
            ]
        },
        {
            letter: "I",
            items: [
                {
                    term: "Ionic Minerals",
                    definition: "Minerals fully dissolved as charged particles (ions) like SO4--, Mg++, Ca++, Fe++. These interact strongly with electric fields.",
                }
            ]
        },
        {
            letter: "L",
            items: [
                {
                    term: "Liquid Crystal",
                    definition: "A state of matter between solid and liquid. Molecules have ordered patterns but retain fluidity. Biological tissues and structured water are often liquid crystalline.",
                }
            ]
        },
        {
            letter: "M",
            items: [
                {
                    term: "Magnetics",
                    definition: "Refers to interactions between magnetic fields and water structure/minerals. Andara explores the 'myths vs measured reality' of this.",
                },
                {
                    term: "Mineral Blueprint",
                    definition: "The conceptual map of how minerals participate in water behavior, enzymes, and terrain.",
                },
                {
                    term: "Mineral Springs",
                    definition: "Natural water sources with specific mineral signatures. Andara Ionic is a compressed, modern format inspired by these.",
                }
            ]
        },
        {
            letter: "O",
            items: [
                {
                    term: "ORP (Oxidation-Reduction Potential)",
                    definition: "Measured in mV. Indicates the tendency of water to oxidize (take electrons) or reduce (give electrons). A key terrain signal.",
                }
            ]
        },
        {
            letter: "P",
            items: [
                {
                    term: "pH",
                    definition: "Scale (0-14) of acidity/alkalinity. Part of the signal set (with ORP, EC) to understand water behavior.",
                },
                {
                    term: "Primordial Minerals",
                    definition: "Refers to very old, deep-origin sources (volcanic/geological) used in Andara Ionic.",
                }
            ]
        },
        {
            letter: "S",
            items: [
                {
                    term: "Scalar / Field Coherence",
                    definition: "Metaphor used to describe subtle field interactions and pattern information beyond ordinary EM models.",
                },
                {
                    term: "Structured Water",
                    definition: "Water with more molecular order and distinct electrical properties (EZ). Andara uses this as a conceptual lens.",
                },
                {
                    term: "Sulfate (SO4)",
                    definition: "Negatively charged ion essential for clarification, flocculation, and activating structured water behavior.",
                },
                {
                    term: "Sulfate Interfaces",
                    definition: "Points where sulfate-rich layers and structured water zones meet and interact.",
                }
            ]
        },
        {
            letter: "T",
            items: [
                {
                    term: "Terrain Model",
                    definition: "A perspective prioritizing the environment ('terrain') over isolated symptoms. 'What is the state of the water?'",
                },
                {
                    term: "Terrain vs Symptom Thinking",
                    definition: "Contrasts fighting individual manifestations (symptom) vs working on background conditions (terrain).",
                }
            ]
        },
        {
            letter: "W",
            items: [
                {
                    term: "Water Activity",
                    definition: "Seeing water not just as a liquid, but as a dynamic architecture shaping bioelectric terrain.",
                }
            ]
        }
    ];

    return (
        <StandardPageLayout
            title="Glossary"
            subtitle="Terms in Water, Mineral & Terrain Science"
            vibeKeywords={['Definition', 'Clarity', 'Vocabulary']}
            seoTitle="Glossary – Water, Mineral & Terrain Science Terms (Andara Library)"
            seoDescription="A clear glossary for the Andara Library: key terms in water science, ionic minerals, sulfate chemistry, bioelectric terrain and structured water."
            seoKeywords={["water mineral terrain glossary", "Andara Ionic glossary", "water science terms", "ionic sulfate glossary", "terrain model vocabulary"]}
        >
            <div className="container mx-auto px-4 py-12 space-y-16">

                {/* Intro */}
                <section className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl text-emerald-400 font-light">From Lab to Living Language</h2>
                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                        The Andara universe uses words that don’t always show up in everyday conversation. This glossary is your translation bridge—from terrain theory to grounded understanding.
                    </p>

                    <div className="flex justify-center max-w-sm mx-auto">
                        <Input placeholder="Filter terms... (Coming Soon)" disabled className="bg-slate-900 border-slate-700 text-center" />
                    </div>
                </section>

                {/* Glossary Grid */}
                <div className="space-y-12">
                    {glossaryData.map((section) => (
                        <div key={section.letter} className="relative">
                            <div className="sticky top-24 z-10 bg-slate-950/80 backdrop-blur pb-4 border-b border-slate-800 mb-8">
                                <h2 className="text-4xl font-bold text-emerald-900/40 select-none">{section.letter}</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                                {section.items.map((item, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <h3 className="text-xl text-emerald-400 font-medium">{item.term}</h3>
                                        <p className="text-slate-300 text-sm leading-relaxed">{item.definition}</p>
                                        {item.note && (
                                            <p className="text-slate-500 text-xs italic border-l-2 border-slate-800 pl-3">
                                                {item.note}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <Separator className="bg-slate-800" />

                {/* Footer */}
                <div className="text-center space-y-4">
                    <h2 className="text-xl text-white">Keep Decoding</h2>
                    <p className="text-slate-400 text-sm max-w-lg mx-auto">
                        This glossary grows with the Library. Whenever you feel lost, return here, decode the word, and dive back in.
                    </p>
                    <div className="flex justify-center gap-2">
                        <Badge variant="outline" className="border-slate-700 text-slate-500">Water Activity</Badge>
                        <Badge variant="outline" className="border-slate-700 text-slate-500">pH / ORP</Badge>
                        <Badge variant="outline" className="border-slate-700 text-slate-500">Sulfate</Badge>
                    </div>
                </div>

            </div>
        </StandardPageLayout>
    );
}
