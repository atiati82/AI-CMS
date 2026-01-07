import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import { path as ffprobePath } from 'ffprobe-static';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

// Set the ffmpeg and ffprobe paths
if (ffmpegPath) {
    ffmpeg.setFfmpegPath(ffmpegPath);
} else {
    console.warn('ffmpeg-static not found, expecting system ffmpeg');
}

if (ffprobePath) {
    ffmpeg.setFfprobePath(ffprobePath);
} else {
    console.warn('ffprobe-static not found, expecting system ffprobe');
}

export interface Scene {
    startTime: number;
    endTime: number;
    duration: number;
}

export const videoProcessor = {
    /**
     * Detects scene changes in a video.
     * Returns an array of timestamps (in seconds) where scene changes occur.
     * Note: This operation can be slow as it analyzes the entire video.
     */
    async detectScenes(inputPath: string, threshold: number = 0.3): Promise<number[]> {
        return new Promise((resolve, reject) => {
            const sceneTimestamps: number[] = [0]; // Always start at 0

            console.log(`[VideoProcessor] Detecting scenes in ${path.basename(inputPath)}...`);

            ffmpeg(inputPath)
                .videoFilters(`select='gt(scene,${threshold})',showinfo`)
                .output('NUL') // Do not generate an output file, just analyze
                .format('null')
                .on('stderr', (stdLine: string) => {
                    // ffmpeg outputs info to stderr. We look for "pts_time:X.XXXXXX" in lines containing "showinfo"
                    // Example: [Parsed_showinfo_1 @ 0x...] n:   0 pts:  7200 pts_time:0.08    pos:    23146 ...
                    if (stdLine.includes('showinfo')) {
                        const match = stdLine.match(/pts_time:([\d.]+)/);
                        if (match && match[1]) {
                            const time = parseFloat(match[1]);
                            // Avoid duplicates or extremely close scene changes
                            if (time > sceneTimestamps[sceneTimestamps.length - 1] + 1.0) {
                                sceneTimestamps.push(time);
                            }
                        }
                    }
                })
                .on('end', () => {
                    console.log(`[VideoProcessor] Scene detection complete. Found ${sceneTimestamps.length} scenes.`);
                    resolve(sceneTimestamps);
                })
                .on('error', (err) => {
                    console.error('[VideoProcessor] Scene detection failed:', err);
                    reject(err);
                })
                .run();
        });
    },

    /**
     * Splits a video into multiple clips based on cut timestamps.
     */
    async splitVideo(inputPath: string, outputDir: string, timestamps: number[]): Promise<string[]> {
        const outputFiles: string[] = [];

        // Ensure output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Get video duration to set the end of the last clip
        const duration = await this.getVideoDuration(inputPath);
        const cuts = [...timestamps, duration];

        console.log(`[VideoProcessor] Splitting video into ${cuts.length - 1} chunks...`);

        // Process sequentially to avoid resource contention
        for (let i = 0; i < cuts.length - 1; i++) {
            const startTime = cuts[i];
            const endTime = cuts[i + 1];
            const clipDuration = endTime - startTime;

            if (clipDuration < 0.5) continue; // Skip extremely short clips

            const outputFilename = `scene_${i + 1}_${Math.floor(startTime)}s.mp4`;
            const outputPath = path.join(outputDir, outputFilename);

            await new Promise<void>((resolve, reject) => {
                ffmpeg(inputPath)
                    .setStartTime(startTime)
                    .setDuration(clipDuration)
                    .output(outputPath)
                    .on('end', () => {
                        console.log(`[VideoProcessor] Created clip: ${outputFilename}`);
                        outputFiles.push(outputPath);
                        resolve();
                    })
                    .on('error', (err: Error) => {
                        console.error(`[VideoProcessor] Failed to create clip ${i}:`, err);
                        reject(err);
                    })
                    .run();
            });
        }

        return outputFiles;
    },

    /**
     * Helper to get video duration
     */
    getVideoDuration(inputPath: string): Promise<number> {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(inputPath, (err: Error | null, metadata: any) => {
                if (err) return reject(err);
                if (metadata && metadata.format && metadata.format.duration) {
                    resolve(metadata.format.duration);
                } else {
                    reject(new Error('Could not determine video duration'));
                }
            });
        });
    }
};
