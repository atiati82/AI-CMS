import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import os from 'os';

// Setup ffmpeg paths
if (ffmpegStatic) {
    ffmpeg.setFfmpegPath(ffmpegStatic);
}
ffmpeg.setFfprobePath(ffprobeStatic.path);

const GEMINI_API_KEY = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

export interface VideoAnalysisResult {
    description: string;
    tags: string[];
    mood: string;
    colorPalette: string[];
}

export class VideoAnalysisService {
    private model: any;

    constructor() {
        if (genAI) {
            this.model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        }
    }

    /**
     * Extracts a frame from the video and analyzes it with Gemini
     */
    async analyzeVideo(videoPath: string): Promise<VideoAnalysisResult> {
        if (!this.model) {
            throw new Error("Gemini API not configured. Set GEMINI_API_KEY.");
        }

        const tempDirPath = fs.mkdtempSync(path.join(os.tmpdir(), 'video-analysis-'));
        const framePath = path.join(tempDirPath, 'frame-001.jpg');

        try {
            // 1. Extract frame at 1 second mark
            await new Promise((resolve, reject) => {
                ffmpeg(videoPath)
                    .screenshots({
                        timestamps: ['1'],
                        filename: 'frame-001.jpg',
                        folder: tempDirPath,
                        size: '1280x720'
                    })
                    .on('end', resolve)
                    .on('error', reject);
            });

            // 2. Read frame data
            const frameData = fs.readFileSync(framePath);
            const base64Frame = frameData.toString('base64');

            // 3. Prompt Gemini
            const prompt = `Analyze this video frame from a high-fidelity cinematic background for a mineral science website called Andara Ionic.
            Provide:
            1. A 1nd-person descriptive sentence of the visual.
            2. A list of 5-8 semantic tags (e.g., 'cellular', 'molecular', 'ethereal', 'blue').
            3. A one-word mood (e.g., 'Primordial', 'Analytical', 'Fluid').
            4. A color palette of 3 hex codes representing the primary colors.

            Return ONLY a JSON object in this format:
            {
                "description": "...",
                "tags": ["...", "..."],
                "mood": "...",
                "colorPalette": ["#...", "#...", "#..."]
            }`;

            const result = await this.model.generateContent([
                prompt,
                {
                    inlineData: {
                        data: base64Frame,
                        mimeType: "image/jpeg"
                    }
                }
            ]);

            const response = await result.response;
            const text = response.text();

            // Parse JSON from response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error("Failed to parse AI response as JSON");

            return JSON.parse(jsonMatch[0]) as VideoAnalysisResult;

        } finally {
            // Clean up temp files
            if (fs.existsSync(framePath)) fs.unlinkSync(framePath);
            if (fs.existsSync(tempDirPath)) fs.rmdirSync(tempDirPath);
        }
    }
}

export const videoAnalysisService = new VideoAnalysisService();
