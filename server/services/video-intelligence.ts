import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import path from 'path';
import 'dotenv/config';

// Ensure ffmpeg path is set
if (ffmpegPath) {
    ffmpeg.setFfmpegPath(ffmpegPath);
}

export interface VideoAnalysis {
    description: string;
    tags: string[];
    mood: string;
    colorPalette: string[];
}

// Use Google AI Studio API (generativelanguage.googleapis.com)
// This requires GOOGLE_API_KEY in .env
const API_KEY = process.env.GOOGLE_API_KEY || '';
const MODEL_ID = 'gemini-1.5-flash';

export const videoIntelligenceService = {
    /**
     * Extracts a frame from the middle of the video clip.
     */
    async extractFrame(videoPath: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const filename = `frame_${Date.now()}.jpg`;
            const outputDir = path.join('/tmp', 'video_frames');
            const outputPath = path.join(outputDir, filename);

            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            ffmpeg(videoPath)
                .screenshots({
                    timestamps: ['50%'],
                    filename: filename,
                    folder: outputDir,
                    size: '640x?'
                })
                .on('end', () => {
                    resolve(outputPath);
                })
                .on('error', (err) => {
                    reject(err);
                })
        });
    },

    /**
     * Analyzes a video frame using Google AI Studio (generativelanguage.googleapis.com).
     */
    async analyzeScene(videoPath: string): Promise<VideoAnalysis> {
        let framePath = '';
        try {
            console.log(`[VideoIntel] Extracting frame from ${path.basename(videoPath)}...`);
            framePath = await this.extractFrame(videoPath);
            const imageBuffer = fs.readFileSync(framePath);
            const imageBase64 = imageBuffer.toString('base64');

            if (!API_KEY) {
                throw new Error('GOOGLE_API_KEY not set in environment');
            }

            // Google AI Studio endpoint (NOT Vertex AI)
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${API_KEY}`;

            const prompt = `
            Analyze this video frame. Provide the output in strictly valid JSON format WITHOUT markdown code blocks.
            I need:
            1. description: A clear, cinematic description of the visual content (max 2 sentences).
            2. tags: A list of 5-8 relevant keywords (e.g., "water", "nature", "microscopic", "blue").
            3. mood: One or two words describing the atmosphere (e.g., "Serene", "Energetic").
            4. colorPalette: A list of 3 dominant color hex codes.
            
            Example: {"description": "...", "tags": [], "mood": "...", "colorPalette": []}
            `;

            console.log(`[VideoIntel] Calling Google AI Studio: ${MODEL_ID}`);

            // Call API
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: prompt },
                            { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } }
                        ]
                    }],
                    generationConfig: {
                        temperature: 0.4,
                        maxOutputTokens: 1024
                    }
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Google AI API Error ${response.status}: ${errText}`);
            }

            const data = await response.json();

            // Parse Response - Google AI Studio format
            const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!rawText) throw new Error('No text in response');

            const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson) as VideoAnalysis;

        } catch (error) {
            console.error('[VideoIntel] Analysis failed:', error);
            // Return fallback data
            return {
                description: `Analysis failed: ${error instanceof Error ? error.message : 'Unknown'}`,
                tags: ["error"],
                mood: "unknown",
                colorPalette: []
            };
        } finally {
            if (framePath && fs.existsSync(framePath)) {
                try { fs.unlinkSync(framePath); } catch { }
            }
        }
    }
};
