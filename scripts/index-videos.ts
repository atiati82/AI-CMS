/**
 * Video Indexing Script - Fallback Mode (Filename-based tags)
 * Usage: npx tsx scripts/index-videos.ts
 */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { videoProcessor } from '../server/services/video-processor';

// Config
const UPLOADS_DIR = path.join(process.cwd(), 'uploads', 'Videos');
const PROCESSED_DIR = path.join(process.cwd(), 'client', 'public', 'videos', 'processed');
const REGISTRY_FILE = path.join(process.cwd(), 'client', 'src', 'data', 'video-registry.ts');

interface VideoAnalysis {
    description: string;
    tags: string[];
    mood: string;
    colorPalette: string[];
}

interface RegistryEntry {
    id: string;
    url: string;
    originalSource: string;
    analysis: VideoAnalysis;
}

/**
 * Extract tags from filename using common keywords
 */
function extractTagsFromFilename(filename: string): VideoAnalysis {
    const name = filename.toLowerCase();
    const keywords: string[] = [];

    // Common video content keywords
    const keywordMap: Record<string, string[]> = {
        'water': ['water', 'aqua', 'liquid', 'hydration'],
        'ionic': ['ionic', 'ion', 'mineral'],
        'electric': ['electric', 'voltage', 'energy', 'charge'],
        'structure': ['structure', 'structured', 'molecular'],
        'drop': ['drop', 'droplet', 'ripple'],
        'dna': ['dna', 'helix', 'genetic'],
        'mica': ['mica', 'mineral', 'volcanic'],
        'volcanic': ['volcanic', 'volcano', 'origin'],
        'genesis': ['genesis', 'origin', 'source'],
        'andara': ['andara', 'ionic', 'premium'],
        'black': ['black', 'dark', 'deep'],
        'frop': ['drop', 'splash'], // typo correction
        'nature': ['nature', 'natural', 'organic']
    };

    // Check for each keyword
    for (const [key, tags] of Object.entries(keywordMap)) {
        if (name.includes(key)) {
            keywords.push(...tags.filter(t => !keywords.includes(t)));
        }
    }

    // Default tags if none found
    if (keywords.length === 0) {
        keywords.push('video', 'media', 'content');
    }

    // Determine mood based on keywords
    let mood = 'Neutral';
    if (keywords.includes('electric') || keywords.includes('energy')) mood = 'Energetic';
    else if (keywords.includes('water') || keywords.includes('liquid')) mood = 'Fluid';
    else if (keywords.includes('volcanic') || keywords.includes('origin')) mood = 'Primordial';

    // Generate description from filename
    const cleanName = filename
        .replace(/\.(mp4|mov|webm)$/i, '')
        .replace(/[_-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    return {
        description: `Video content: ${cleanName}`,
        tags: keywords.slice(0, 8),
        mood,
        colorPalette: ['#1a1a2e', '#16213e', '#0f3460'] // Default dark palette
    };
}

const TAGS_FILE = path.join(process.cwd(), 'client', 'src', 'data', 'video-tags.json');

async function main() {
    console.log('🎬 Starting Video Indexing (with Manual Tags support)...');

    if (!fs.existsSync(UPLOADS_DIR)) {
        console.error(`❌ Uploads directory not found: ${UPLOADS_DIR}`);
        process.exit(1);
    }

    // Load manual tags
    let manualTags: Record<string, any> = {};
    if (fs.existsSync(TAGS_FILE)) {
        try {
            manualTags = JSON.parse(fs.readFileSync(TAGS_FILE, 'utf-8'));
            console.log(`✅ Loaded manual tags for ${Object.keys(manualTags).length} videos.`);
        } catch (e) {
            console.error('⚠️ Error reading video-tags.json, skipping manual tags.', e);
        }
    }

    const files = fs.readdirSync(UPLOADS_DIR).filter(f => f.toLowerCase().endsWith('.mp4'));
    console.log(`Found ${files.length} video(s) to process.`);

    const registryData: RegistryEntry[] = [];

    for (const file of files) {
        console.log(`\n--- Processing: ${file} ---`);
        const inputPath = path.join(UPLOADS_DIR, file);
        const fileBasename = path.basename(file, path.extname(file));

        const safeDirName = fileBasename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const videoOutputDir = path.join(PROCESSED_DIR, safeDirName);

        // Check for manual override
        // logic: check if basename exists in manualTags keys (partial match or exact?)
        // Let's use the 'safeDirName' or just basename as key. The JSON I created uses safeDirName style keys initially.
        // Actually, let's normalize the key to match what we generated in JSON: "andara_ionic_drop__water__ionic__dna"
        const manualEntry = manualTags[safeDirName] || manualTags[fileBasename];

        let clipPaths: string[] = [];
        if (fs.existsSync(videoOutputDir) && fs.readdirSync(videoOutputDir).length > 0) {
            console.log(`Dir exists. Using existing clips.`);
            clipPaths = fs.readdirSync(videoOutputDir)
                .filter(f => f.endsWith('.mp4'))
                .map(f => path.join(videoOutputDir, f));
        } else {
            const timestamps = await videoProcessor.detectScenes(inputPath, 0.25);
            clipPaths = await videoProcessor.splitVideo(inputPath, videoOutputDir, timestamps);
        }

        // Extract tags (Manual OR Auto)
        let analysis: VideoAnalysis;
        if (manualEntry) {
            console.log(`   ✨ Using MANUAL metadata for ${file}`);
            analysis = {
                description: manualEntry.description || `Video content: ${fileBasename}`,
                tags: manualEntry.tags || [],
                mood: manualEntry.mood || 'Neutral',
                colorPalette: manualEntry.colorPalette || ['#1a1a2e', '#16213e', '#0f3460']
            };
        } else {
            console.log(`   🤖 Using AUTO-GENERATED metadata for ${file}`);
            analysis = extractTagsFromFilename(file);
        }

        for (const clipPath of clipPaths) {
            const clipName = path.basename(clipPath);
            const relativeUrl = `/videos/processed/${safeDirName}/${clipName}`;
            const id = `${safeDirName}-${clipName.replace('.mp4', '')}`;

            registryData.push({
                id,
                url: relativeUrl,
                originalSource: file,
                analysis
            });
            console.log(`   ✅ Indexed: ${clipName} with tags: [${analysis.tags.slice(0, 4).join(', ')}...]`);
        }
    }

    console.log('\n📝 Generating Registry File...');
    const fileContent = generateRegistryFileContent(registryData);
    fs.writeFileSync(REGISTRY_FILE, fileContent);
    console.log(`✅ Registry saved to: ${REGISTRY_FILE}`);
    console.log(`   Total clips indexed: ${registryData.length}`);
}

function generateRegistryFileContent(entries: RegistryEntry[]): string {
    const today = new Date().toISOString().split('T')[0];

    return `/**
 * Video Registry
 * Auto-generated by scripts/index-videos.ts on ${today}
 */

export interface VideoAsset {
    id: string;
    url: string;
    originalSource: string;
    description: string;
    tags: string[];
    mood: string;
    colorPalette: string[];
}

export const VIDEO_REGISTRY: Record<string, VideoAsset> = {
${entries.map(entry => `    '${entry.id}': {
        id: '${entry.id}',
        url: '${entry.url}',
        originalSource: "${entry.originalSource}",
        description: "${entry.analysis.description.replace(/"/g, '\\"')}",
        tags: ${JSON.stringify(entry.analysis.tags)},
        mood: "${entry.analysis.mood}",
        colorPalette: ${JSON.stringify(entry.analysis.colorPalette)}
    }`).join(',\n\n')}
};

export function getVideoAsset(id: string): VideoAsset | undefined {
    return VIDEO_REGISTRY[id];
}

export function getAllVideos(): VideoAsset[] {
    return Object.values(VIDEO_REGISTRY);
}
`;
}

main();
