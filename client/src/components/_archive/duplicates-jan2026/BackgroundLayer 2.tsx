import React from "react";
import { IMAGE_REGISTRY } from "@/data/image-registry";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

interface BackgroundLayerProps {
    registryId?: string;
    opacity?: number;      // Default 40 (0.4)
    hoverOpacity?: number; // Default 60 (0.6)
    className?: string;
    overlayGradient?: string; // Optional custom gradient override
}

export function BackgroundLayer({
    registryId,
    opacity = 40,
    hoverOpacity = 60,
    className = "",
    overlayGradient
}: BackgroundLayerProps) {

    const image = registryId ? IMAGE_REGISTRY[registryId] : undefined;

    // If no image found, return null or a fallback color
    if (!image) {
        console.warn(`BackgroundLayer: Image ID "${registryId}" not found in registry.`);
        return <div className="absolute inset-0 bg-slate-900/50" />;
    }

    // Default gradients based on archetype if not provided
    // These match the "Mineral Gateway" pattern
    // Default gradients based on archetype if not provided
    // These match the "Mineral Gateway" pattern
    const blendMode = image.overlayBlendMode || 'multiply';
    const blendClass = {
        'multiply': 'mix-blend-multiply',
        'screen': 'mix-blend-screen',
        'overlay': 'mix-blend-overlay',
        'normal': 'mix-blend-normal',
        'soft-light': 'mix-blend-soft-light'
    }[blendMode];

    const defaultGradient = `bg-gradient-to-b from-[#020617] via-[${image.domColors[0]}]/20 to-[#020617] ${blendClass}`;

    return (
        <div
            className={cn(
                "absolute inset-0 transition-opacity duration-700",
                className
            )}
            style={{ opacity: opacity / 100 }}
        >
            <SmartImage
                registryId={registryId}
                className="w-full h-full object-cover"
                interaction="zoom-hover"
            />
            {overlayGradient !== 'none' && (
                <div className={`absolute inset-0 ${overlayGradient || defaultGradient}`} />
            )}
        </div>
    );
}
