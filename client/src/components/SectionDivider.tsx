import React from 'react';
import { motion } from 'framer-motion';
import { getImageByKeywords, getRandomImageByArchetype, ImageAsset } from '@/data/image-registry';
import { useDesignSettings } from '@/lib/design-settings';

interface SectionDividerProps {
    /** Image ID from registry */
    imageId?: string;
    /** Keywords to auto-match an image */
    keywords?: string[];
    /** Archetype for random selection */
    archetype?: string;
    /** Direct image URL (bypasses registry) */
    imageUrl?: string;
    /** Height of the divider */
    height?: string;
    /** Apply blur effect */
    blur?: boolean;
    /** Opacity of the image */
    opacity?: number;
    /** Gradient overlay direction */
    gradientDirection?: 'top' | 'bottom' | 'both';
    /** Custom class name */
    className?: string;
}

/**
 * SectionDivider - A visual break between content sections
 * Displays a blurred/styled image background with gradient overlays
 */
export function SectionDivider({
    imageId,
    keywords,
    archetype,
    imageUrl,
    height = '200px',
    blur = true,
    opacity = 0.4,
    gradientDirection = 'both',
    className = ''
}: SectionDividerProps) {
    const { isLiteMode } = useDesignSettings();

    // Resolve image URL
    let resolvedUrl = imageUrl;
    let resolvedAsset: ImageAsset | undefined;

    if (!resolvedUrl && imageId) {
        // Direct ID lookup would need a getImageById function, using keywords for now
        resolvedAsset = getImageByKeywords([imageId]);
        resolvedUrl = resolvedAsset?.url;
    }

    if (!resolvedUrl && keywords && keywords.length > 0) {
        resolvedAsset = getImageByKeywords(keywords);
        resolvedUrl = resolvedAsset?.url;
    }

    if (!resolvedUrl && archetype) {
        resolvedAsset = getRandomImageByArchetype(archetype);
        resolvedUrl = resolvedAsset?.url;
    }

    // Fallback to a subtle gradient if no image found
    if (!resolvedUrl) {
        return (
            <div
                className={`relative w-full ${className}`}
                style={{ height }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
            </div>
        );
    }

    // Gradient overlays
    const topGradient = gradientDirection === 'top' || gradientDirection === 'both';
    const bottomGradient = gradientDirection === 'bottom' || gradientDirection === 'both';

    return (
        <motion.div
            className={`relative w-full overflow-hidden ${className}`}
            style={{ height }}
            initial={isLiteMode ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${resolvedUrl})`,
                    filter: blur ? 'blur(4px)' : 'none',
                    opacity,
                    transform: 'scale(1.1)' // Prevent blur edge artifacts
                }}
            />

            {/* Top Gradient Fade */}
            {topGradient && (
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-slate-950 to-transparent" />
            )}

            {/* Bottom Gradient Fade */}
            {bottomGradient && (
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 to-transparent" />
            )}

            {/* Optional color overlay from asset */}
            {resolvedAsset?.domColors?.[0] && (
                <div
                    className="absolute inset-0 mix-blend-overlay"
                    style={{
                        backgroundColor: resolvedAsset.domColors[0],
                        opacity: 0.1
                    }}
                />
            )}
        </motion.div>
    );
}

export default SectionDivider;
