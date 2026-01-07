/**
 * SmartVideoEmbed Component
 * Automatically selects the best matching video from the registry based on keywords
 */
import React, { useMemo } from 'react';
import { findMatchingVideos, getRandomVideo } from '@/lib/video-matcher';
import { cn } from '@/lib/utils';

interface SmartVideoEmbedProps {
    /** Keywords to match against video tags, descriptions, and sources */
    keywords: string[];
    /** Fallback video URL if no match is found */
    fallback?: string;
    /** Additional CSS classes */
    className?: string;
    /** Whether to autoplay the video (muted) */
    autoPlay?: boolean;
    /** Whether to loop the video */
    loop?: boolean;
    /** Whether to show video controls */
    controls?: boolean;
    /** Video aspect ratio class */
    aspectRatio?: 'video' | 'square' | 'portrait';
    /** Optional caption/overlay text */
    caption?: string;
}

export const SmartVideoEmbed: React.FC<SmartVideoEmbedProps> = ({
    keywords,
    fallback,
    className,
    autoPlay = true,
    loop = true,
    controls = false,
    aspectRatio = 'video',
    caption
}) => {
    const matchedVideo = useMemo(() => {
        const matches = findMatchingVideos(keywords, 1);
        if (matches.length > 0) return matches[0];

        // Fallback to random video if no match
        return getRandomVideo();
    }, [keywords]);

    const videoUrl = matchedVideo?.url || fallback;

    if (!videoUrl) {
        return null; // No video available
    }

    const aspectClasses = {
        video: 'aspect-video',
        square: 'aspect-square',
        portrait: 'aspect-[9/16]'
    };

    return (
        <div className={cn(
            'relative overflow-hidden rounded-xl bg-black/30',
            aspectClasses[aspectRatio],
            className
        )}>
            <video
                src={videoUrl}
                autoPlay={autoPlay}
                loop={loop}
                muted={autoPlay} // Must be muted for autoplay
                controls={controls}
                playsInline
                className="w-full h-full object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Caption */}
            {caption && (
                <div className="absolute bottom-4 left-4 right-4 text-white/90 text-sm font-light tracking-wide">
                    {caption}
                </div>
            )}

            {/* Debug info (only in dev) */}
            {import.meta.env.DEV && matchedVideo && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur text-xs rounded-full border border-white/10 text-white/50">
                    {matchedVideo.tags.slice(0, 3).join(', ')}
                </div>
            )}
        </div>
    );
};

/**
 * VideoBackground Component
 * Full-screen background video for hero sections
 */
interface VideoBackgroundProps {
    keywords: string[];
    fallback?: string;
    className?: string;
    overlayOpacity?: number;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
    keywords,
    fallback,
    className,
    overlayOpacity = 0.5
}) => {
    const matchedVideo = useMemo(() => {
        const matches = findMatchingVideos(keywords, 1);
        return matches.length > 0 ? matches[0] : getRandomVideo();
    }, [keywords]);

    const videoUrl = matchedVideo?.url || fallback;

    if (!videoUrl) return null;

    return (
        <div className={cn('absolute inset-0 -z-10 overflow-hidden', className)}>
            <video
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
            />
            <div
                className="absolute inset-0 bg-[#020617]"
                style={{ opacity: overlayOpacity }}
            />
        </div>
    );
};

export default SmartVideoEmbed;
