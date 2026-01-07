import { GoogleAuth } from 'google-auth-library';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';

// Config
const project = process.env.GOOGLE_CLOUD_PROJECT || 'gen-lang-client-0164744400';
const location = 'us-central1';
const model = 'veo-3.0-generate-preview'; // Use preview model

export interface VideoGenerationResult {
    success: boolean;
    videoUrl?: string;
    error?: string;
    operationId?: string;
}

export const videoGeneratorService = {

    /**
     * Generates a video from a text prompt using Google Veo REST API.
     * @param prompt The descriptive text prompt for the video.
     * @param imageRef Optional path to a public image to use as a style reference.
     */
    async generateVideo(prompt: string, imageRef?: string): Promise<VideoGenerationResult> {
        try {
            console.log(`[Veo] Starting generation request. Prompt: "${prompt.substring(0, 50)}..."`);

            // Check for credentials
            if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
                console.warn("[Veo] Missing GOOGLE_APPLICATION_CREDENTIALS. Functioning in DEMO MODE.");
                await new Promise(resolve => setTimeout(resolve, 2000));
                return {
                    success: true,
                    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                };
            }

            // Get access token
            const auth = new GoogleAuth({
                scopes: ['https://www.googleapis.com/auth/cloud-platform']
            });
            const client = await auth.getClient();
            const accessToken = (await client.getAccessToken()).token;

            // Veo REST API endpoint
            const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${model}:predictLongRunning`;

            // Request payload
            const requestBody = {
                instances: [{
                    prompt: prompt
                }],
                parameters: {
                    aspectRatio: "16:9",
                    sampleCount: 1,
                    durationSeconds: 6,
                    personGeneration: "allow_adult"
                }
            };

            console.log(`[Veo] Calling endpoint: ${endpoint}`);

            // Make the request
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const result = await response.json();

            if (!response.ok) {
                console.error('[Veo] API Error:', result);
                return {
                    success: false,
                    error: result.error?.message || `API Error: ${response.status}`
                };
            }

            console.log('[Veo] Response:', JSON.stringify(result, null, 2));

            // For long-running operations, we get an operation ID to poll
            if (result.name) {
                const operationName = result.name;
                console.log(`[Veo] Long-running operation started: ${operationName}`);

                // Poll for completion (max 5 minutes)
                const maxWaitTime = 5 * 60 * 1000; // 5 minutes
                const pollInterval = 10000; // 10 seconds
                const startTime = Date.now();

                while (Date.now() - startTime < maxWaitTime) {
                    await new Promise(resolve => setTimeout(resolve, pollInterval));

                    // Use fetchPredictOperation endpoint
                    const fetchEndpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${model}:fetchPredictOperation`;

                    const statusResponse = await fetch(
                        fetchEndpoint,
                        {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${accessToken}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ operationName })
                        }
                    );

                    const statusText = await statusResponse.text();
                    let statusResult;
                    try {
                        statusResult = JSON.parse(statusText);
                    } catch {
                        console.error('[Veo] Polling got non-JSON:', statusText.substring(0, 100));
                        continue;
                    }

                    console.log(`[Veo] Operation status:`, statusResult.done ? 'DONE' : 'IN_PROGRESS');

                    if (statusResult.done) {
                        if (statusResult.error) {
                            return {
                                success: false,
                                error: statusResult.error.message || 'Operation failed'
                            };
                        }

                        // Debug: log full response structure
                        console.log('[Veo] Full response:', JSON.stringify(statusResult, null, 2));

                        // Also write to file for debugging
                        fs.writeFileSync('/tmp/veo_response.json', JSON.stringify(statusResult, null, 2));

                        // Extract video from response - Veo returns videos in .response.videos array
                        const videos = statusResult.response?.videos;

                        // Check for video data
                        let videoData: string | null = null;
                        let videoUri: string | null = null;

                        if (videos && videos.length > 0) {
                            const video = videos[0];
                            console.log('[Veo] Video keys:', Object.keys(video));

                            // Get base64 video data
                            videoData = video.bytesBase64Encoded || null;
                            // Check for GCS URI fallback
                            videoUri = video.gcsUri || null;
                        }

                        if (videoData) {
                            // Save the video from base64
                            const filename = `veo_gen_${randomUUID()}.mp4`;
                            const publicPath = `/videos/veo/${filename}`;
                            const localPath = path.join(process.cwd(), 'client', 'public', 'videos', 'veo', filename);

                            // Ensure directory exists
                            const dir = path.dirname(localPath);
                            if (!fs.existsSync(dir)) {
                                fs.mkdirSync(dir, { recursive: true });
                            }

                            // Decode and save video
                            const videoBuffer = Buffer.from(videoData, 'base64');
                            fs.writeFileSync(localPath, videoBuffer);
                            console.log(`[Veo] Video saved to: ${localPath} (${videoBuffer.length} bytes)`);

                            return {
                                success: true,
                                videoUrl: publicPath,
                                operationId: operationName
                            };
                        } else if (videoUri) {
                            // Video stored in GCS
                            console.log(`[Veo] Video available at GCS: ${videoUri}`);
                            return {
                                success: true,
                                videoUrl: videoUri,
                                operationId: operationName
                            };
                        }

                        return {
                            success: false,
                            error: 'No video data in response'
                        };
                    }
                }

                // Timeout - return operation for manual polling
                return {
                    success: false,
                    error: 'Generation timeout (>5min). Operation still running.',
                    operationId: operationName
                };
            }

            return {
                success: false,
                error: 'Unexpected response format from API'
            };

        } catch (error: any) {
            console.error("[Veo] Generation Failed:", error);
            return {
                success: false,
                error: error.message || "Unknown Vertex AI error"
            };
        }
    }
};
