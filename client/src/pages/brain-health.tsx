import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { Brain, Activity, Zap, Cpu } from "lucide-react";
import { motionPresets } from "@/lib/motionPresets";

export default function BrainHealthPage() {
    return (
        <StandardPageLayout
            title="Brain Health & Cognitive Function"
            subtitle="The role of ionic minerals in neural bioelectricity"
            seoTitle="Brain Health | Andara Ionic Minerals"
            seoDescription="Explore how ionic sulfate minerals support cognitive performance, neural signaling, and brain detoxification."
            heroVariant="indigo"
            heroIcon={Brain}
            badges={[
                { text: "Cognitive Science", icon: Brain },
                { text: "Bioelectricity", icon: Zap }
            ]}
            intro={
                <>
                    The human brain is an electrical organ, relying on precise ionic gradients to transmit
                    thoughts, signals, and consciousness itself. Andara Ionic minerals provide the fundamental
                    conductive medium required for optimal neural processing and clearing metabolic waste.
                </>
            }
            sections={[
                {
                    id: "neural-conductivity",
                    title: "Neural Conductivity",
                    content: (
                        <>
                            <p>
                                Every thought you have is an electrical event. Neurons communicate via action potentials,
                                which are driven by the movement of ions—specifically sodium, potassium, calcium, and magnesium—across
                                cell membranes. Without adequate mineral ions in the correct structure, this signaling becomes
                                sluggish or chaotic (brain fog).
                            </p>
                            <p className="mt-4">
                                Structured water acts as the highly conductive "wire" for these signals, ensuring fast and
                                accurate transmission of information across the neural network.
                            </p>
                        </>
                    )
                },
                {
                    id: "glymphatic-clearance",
                    title: "Glymphatic Detoxification",
                    content: (
                        <>
                            <p>
                                The brain has its own waste clearance system called the Glymphatic System, which is most active
                                during sleep. This system washes away metabolic waste products like amyloid-beta.
                            </p>
                            <p className="mt-4">
                                This cleansing process is heavily dependent on the fluidity of the cerebrospinal fluid (CSF) and
                                the presence of sulfur-based molecules (sulfates) to maintain the exclusion zone (EZ) water
                                barrier that facilitates flow.
                            </p>
                        </>
                    ),
                    variant: "glass"
                }
            ]}
            relatedLinks={[
                { title: "Bioelectric Water", url: "/science/bioelectric-water", type: "internal" },
                { title: "Sulfur & Detox", url: "/science/sulfur-detox-transport", type: "internal" }
            ]}
        />
    );
}
