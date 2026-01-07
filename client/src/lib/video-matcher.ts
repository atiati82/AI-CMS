/**
 * Video Matcher Service
 * Matches videos from the registry to page content based on keywords and metadata
 */
import { getAllVideos, getVideoAsset, VideoAsset } from '@/data/video-registry';

/**
 * Find videos matching given keywords
 * Uses tag matching, description search, and original filename matching
 */
export function findMatchingVideos(keywords: string[], limit: number = 3): VideoAsset[] {
    const allVideos = getAllVideos();
    const normalizedKeywords = keywords.map(k => k.toLowerCase().trim());

    // Score each video based on keyword matches
    const scoredVideos = allVideos.map(video => {
        let score = 0;

        // Tag matching (highest weight)
        video.tags.forEach(tag => {
            if (normalizedKeywords.some(k => tag.toLowerCase().includes(k) || k.includes(tag.toLowerCase()))) {
                score += 10;
            }
        });

        // Description matching
        const descLower = video.description.toLowerCase();
        normalizedKeywords.forEach(k => {
            if (descLower.includes(k)) {
                score += 5;
            }
        });

        // Original source filename matching
        const sourceLower = video.originalSource.toLowerCase();
        normalizedKeywords.forEach(k => {
            if (sourceLower.includes(k)) {
                score += 3;
            }
        });

        // Mood matching
        if (normalizedKeywords.includes(video.mood.toLowerCase())) {
            score += 7;
        }

        return { video, score };
    });

    // Filter out zero scores and sort by score descending
    return scoredVideos
        .filter(sv => sv.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(sv => sv.video);
}

/**
 * Get videos by mood
 */
export function getVideosByMood(mood: string): VideoAsset[] {
    const allVideos = getAllVideos();
    return allVideos.filter(v =>
        v.mood.toLowerCase() === mood.toLowerCase()
    );
}

/**
 * Get videos by specific tags
 */
export function getVideosByTags(tags: string[]): VideoAsset[] {
    const allVideos = getAllVideos();
    const normalizedTags = tags.map(t => t.toLowerCase());

    return allVideos.filter(video =>
        video.tags.some(tag =>
            normalizedTags.includes(tag.toLowerCase())
        )
    );
}

/**
 * Get a random video from the registry
 */
export function getRandomVideo(): VideoAsset | undefined {
    const allVideos = getAllVideos();
    if (allVideos.length === 0) return undefined;
    return allVideos[Math.floor(Math.random() * allVideos.length)];
}

/**
 * Get videos from a specific source file
 */
export function getVideosBySource(sourceFilename: string): VideoAsset[] {
    const allVideos = getAllVideos();
    return allVideos.filter(v =>
        v.originalSource.toLowerCase().includes(sourceFilename.toLowerCase())
    );
}
