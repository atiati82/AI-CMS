/**
 * Video Splitter Script
 * Usage: npx tsx scripts/split-video.ts <path-to-video> [threshold]
 */
import 'dotenv/config';
import { videoProcessor } from '../server/services/video-processor';
import path from 'path';
import fs from 'fs';

async function main() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.error('Usage: npx tsx scripts/split-video.ts <path-to-video> [threshold]');
        process.exit(1);
    }

    const inputPath = args[0];
    // Default threshold 0.3 (30% change). Higher = fewer scenes.
    const threshold = args[1] ? parseFloat(args[1]) : 0.3;

    if (!fs.existsSync(inputPath)) {
        console.error(`Error: File not found: ${inputPath}`);
        process.exit(1);
    }

    console.log(`🎬 Processing video: ${inputPath}`);
    console.log(`POptions: threshold=${threshold}`);

    try {
        // 1. Detect Scenes
        console.log('\n--- Phase 1: Scene Detection ---');
        const timestamps = await videoProcessor.detectScenes(inputPath, threshold);

        if (timestamps.length === 0) {
            console.log('No scene changes detected. Video might be a single shot.');
        } else {
            console.log(`Found ${timestamps.length} cuts at:`, timestamps.map(t => t.toFixed(2)).join(', '));
        }

        // 2. Split Video
        console.log('\n--- Phase 2: Splitting Video ---');
        const fileDir = path.dirname(inputPath);
        const fileName = path.basename(inputPath, path.extname(inputPath));
        const outputDir = path.join(fileDir, `${fileName}_scenes`);

        const outputFiles = await videoProcessor.splitVideo(inputPath, outputDir, timestamps);

        console.log('\n✅ Done!');
        console.log(`Generated ${outputFiles.length} clips in: ${outputDir}`);
        outputFiles.forEach(f => console.log(` - ${path.basename(f)}`));

    } catch (error) {
        console.error('💥 Error processing video:', error);
        process.exit(1);
    }
}

main();
