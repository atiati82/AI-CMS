
import React from 'react';
import SuperPageLayout, { SuperPageConfig } from "@/components/layouts/SuperPageLayout";
import { Zap, Mountain, Gem, Stars, ShieldCheck } from "lucide-react";

export default function SuperPageExample() {
    const config: SuperPageConfig = {
        theme: "hyperspace",
        hero: {
            badge: "Components V2.0",
            title: <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400">Cinematic<br />Engine</span>,
            subtitle: "Define your style. Just pass data. We handle the physics."
        },
        portals: [
            {
                id: "portal-1",
                title: "Deep Space",
                description: "Journey into the void where potential is limitless.",
                icon: Stars,
                registryId: "glass-origin",
                colorTheme: "purple"
            },
            {
                id: "portal-2",
                title: "Energy Vortex",
                description: "Spinning coherency fields that restructure reality.",
                icon: Zap,
                registryId: "glass-activation",
                colorTheme: "cyan"
            },
            {
                id: "portal-3",
                title: "Golden Matrix",
                description: "The crystalline lattice of higher dimensionality.",
                icon: Gem,
                registryId: "glass-clarity",
                colorTheme: "gold"
            },
            {
                id: "portal-4",
                title: "Verified Source",
                description: "Pure, potent, and proven by science.",
                icon: ShieldCheck,
                registryId: "glass-resonance",
                colorTheme: "emerald"
            }
        ],
        product: {
            registryId: "product-100ml-nature",
            title: "Superpage Core",
            subtitle: "Layout Engine V1",
            description: "A fully reusable, data-driven cinematic scroll engine. Simply define your portals and product data, and the engine handles the 3D transforms, timeline sequencing, and responsive behavior.",
            price: "Open Source",
            features: [
                "GSAP 3D Tunnel",
                "Responsive Scaling",
                "Data-Driven Config",
                "Smart Image Integration"
            ]
        }
    };

    return <SuperPageLayout config={config} />;
}
