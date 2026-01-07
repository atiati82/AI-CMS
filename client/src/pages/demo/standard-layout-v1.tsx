import React from "react";
import StandardPageLayout from "@/components/StandardPageLayout";
import { Atom, Droplets, FileText, FlaskConical, Microscope } from "lucide-react";
import { useDesignSettings } from "@/lib/design-settings";

// Dummy Content Components
const MolecularFoundation = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
            <h3 className="text-2xl font-display text-white mb-4">The Molecular Web</h3>
            <p className="mb-4">
                Sulfates are not merely chemical compounds; they are the <strong>architectural lattice</strong> of biology.
                In the human body, cholesterol sulfate serves as a ubiquitous battery, storing solar energy in the skin
                and transporting it to every cell via the bloodstream.
            </p>
            <p>
                When sulfate deficiency occurs, the exclusion zone (EZ) of water collapses, leading to cellular dehydration
                and loss of energetic potential.
            </p>
            <blockquote className="border-l-4 border-amber-500/50 pl-4 italic text-slate-400 my-6">
                "Without sulfur, life as we know it would cease to exist. It is the bridge between the sun and the cell."
            </blockquote>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
            <h4 className="text-amber-400 font-bold uppercase tracking-wider text-xs mb-4">Key Functions</h4>
            <ul className="space-y-3">
                {[
                    "Maintains Exclusion Zone (EZ) Water",
                    "Detoxifies Xenobiotics",
                    "Regulates Cell Signaling",
                    "Synthesizes Neurotransmitters"
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const ApplicationProtocol = () => (
    <div>
        <p className="mb-6">
            For optimal bioavailability, consume Andara Ionic Sulfates in a <strong>diluted state</strong>.
            This mimics the natural mineral concentrations found in pristine mountain springs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { title: "Prepare", text: "Add 5ml to 1L of structured water." },
                { title: "Charge", text: "Allow to sit for 5 mins to integrate." },
                { title: "Consume", text: "Drink 30 mins before meals." }
            ].map((step, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-lg text-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mx-auto mb-4">
                        {i + 1}
                    </div>
                    <h4 className="text-white font-medium mb-2">{step.title}</h4>
                    <p className="text-sm text-slate-400">{step.text}</p>
                </div>
            ))}
        </div>
    </div>
);

export default function StandardLayoutDemo() {
    return (
        <StandardPageLayout
            title="Sulfate Chemistry"
            subtitle="The Foundation of Biological Architecture"
            // Using 'mineral-volcanic' for gold/sulfate theme from registry
            registryId="mineral-volcanic"
            // Assuming StandardPageLayout passes variant down to HeroGlass
            heroVariant="gold"
            badges={[{ text: "Mineral Science", icon: Atom }]}
            intro="Sulfates provide the essential negative charge that maintains the structure of biological water. They are the 'glue' of the matrix, ensuring that cellular communication remains coherent and robust."
            sections={[
                {
                    id: "foundation",
                    title: "The Molecular Foundation",
                    content: <MolecularFoundation />,
                    variant: "glass"
                },
                {
                    id: "protocol",
                    title: "Application Protocol",
                    content: <ApplicationProtocol />,
                    variant: "transparent"
                }
            ]}
            relatedLinks={[
                { title: "Sulfate Pathways", url: "#", type: "internal" },
                { title: "Clinical Study 2024", url: "#", type: "external" },
                { title: "Download PDF Guide", url: "#", type: "download" }
            ]}
        />
    );
}
