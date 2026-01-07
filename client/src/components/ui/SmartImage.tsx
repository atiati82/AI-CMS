import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { IMAGE_REGISTRY } from "@/data/image-registry";
import { motion, HTMLMotionProps } from "framer-motion";

// Type derived from the registry keys for strict type safety
export type ImageRegistryKey = keyof typeof IMAGE_REGISTRY;

interface SmartImageProps extends Omit<HTMLMotionProps<"img">, 'src' | 'alt' | 'ref'> {
    /**
     * The ID of the image in the centralized IMAGE_REGISTRY.
     * This is the single source of truth for the image URL and metadata.
     */
    registryId?: ImageRegistryKey | string;

    /**
     * Optional override for the alt text. 
     * Defaults to the SEO-optimized alt text in the registry.
     */
    alt?: string;

    /**
     * Optional object-fit style. Defaults to 'cover' for box-filling behavior.
     */
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";

    /**
     * If true, applies 'eager' loading and potentially preloads (browser heuristic).
     * Use for LCP images (Above the Fold).
     */
    priority?: boolean;

    /**
     * Container aspect ratio class if needed (e.g. 'aspect-video', 'aspect-square').
     * Useful when wrapping in a box.
     */
    aspectRatio?: string;

    /**
     * Interaction preset.
     * - 'zoom-hover': Scales up slightly on hover.
     * - 'reveal': Fades in when brought into view.
     * - 'none': Standard static image.
     */
    interaction?: 'zoom-hover' | 'reveal' | 'none' | string;

    /**
     * Optional gradient or color overlay to apply on top of the image.
     * Useful for text readability.
     */
    overlay?: string;
}

/**
 * SmartImage Component
 * 
 * The standard way to render images in the Andara CMS.
 * Links directly to the `IMAGE_REGISTRY` to ensure consistent usage of assets,
 * SEO-optimized alt text, and centralized management.
 * 
 * Now enhanced with Framer Motion for standard interactions.
 */
export function SmartImage({
    registryId,
    alt,
    className,
    objectFit = "cover",
    priority = false,
    style,
    aspectRatio,
    interaction = 'none',
    overlay,
    ...props
}: SmartImageProps) {
    const [error, setError] = useState(false);
    const imageAsset = registryId ? IMAGE_REGISTRY[registryId as ImageRegistryKey] : undefined;

    // Dev warning if ID is missing (should be caught by Typescript though)
    if (!imageAsset && registryId && process.env.NODE_ENV === 'development') {
        console.warn(`SmartImage: ID "${registryId}" not found in registry.`);
    }

    // Interaction Variants
    const variants: Record<string, any> = {
        'zoom-hover': {
            initial: { scale: 1 },
            hover: { scale: 1.05, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } }
        },
        'reveal': {
            initial: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
        },
        'none': {}
    };

    const isHover = interaction === 'zoom-hover';
    const isReveal = interaction === 'reveal';

    // Fallback Logic
    if (!imageAsset || error) {
        return (
            <div
                className={cn(
                    "bg-slate-800 flex items-center justify-center text-slate-500 text-xs p-2 overflow-hidden",
                    aspectRatio,
                    className
                )}
                role="img"
                aria-label={alt || "Image placeholder"}
            >
                <span className="text-center">
                    {error ? "Image Load Error" : "Image Not Found"}
                    <br />
                    <span className="opacity-50 font-mono text-[10px]">{registryId}</span>
                </span>
            </div>
        );
    }

    const ImageElement = (
        <motion.img
            src={imageAsset.url}
            alt={alt || imageAsset.alt}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            className={cn(
                "transition-opacity duration-300",
                objectFit === "cover" && "object-cover",
                objectFit === "contain" && "object-contain",
                objectFit === "fill" && "object-fill",
                objectFit === "scale-down" && "object-scale-down",
                objectFit === "none" && "object-none",
                aspectRatio, // Note: standard img tag might not respect this without a wrapper in some cases, but keeping for compatibility
                className
            )}
            onError={() => setError(true)}
            style={style}

            // Motion Props
            variants={variants[interaction]}
            initial={isHover ? "initial" : isReveal ? "initial" : undefined}
            whileHover={isHover ? "hover" : undefined}
            whileInView={isReveal ? "visible" : undefined}
            viewport={isReveal ? { once: true, margin: "-10%" } : undefined}

            {...props}
        />
    );

    if (overlay) {
        return (
            <div className={cn("relative overflow-hidden", aspectRatio, className)}>
                {/* We remove aspect ratio/classname from img because wrapper handles it */}
                {React.cloneElement(ImageElement, {
                    className: cn(
                        "w-full h-full",
                        objectFit === "cover" && "object-cover",
                        objectFit === "contain" && "object-contain",
                        objectFit === "fill" && "object-fill",
                    )
                })}
                <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{ background: overlay }}
                />
            </div>
        );
    }

    return ImageElement;
}
