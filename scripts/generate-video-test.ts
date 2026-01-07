/**
 * Test Script: Generate Video with Veo
 * Run with: npx tsx scripts/generate-video-test.ts
 */
import 'dotenv/config';
import { videoGeneratorService } from '../server/services/video-generator';

const LEAD_GEN_PROMPT = `(Cinematic Widescreen 16:9) (0:00) Wide shot of a dull, grey, lifeless glass of water sitting on a cold concrete design table, negative space on the right. (0:03) A single glowing GOLDEN DROP falls from above and hits the water surface. (0:04) IMPACT. The water instantly phases into a vibrant, glowing NEON CYAN LIQUID CRYSTAL structure. The glass container shatters in slow motion, but the water magically holds a perfect wide hexagonal shape, defying gravity. (0:07) The camera flies THROUGH the glowing water lattice, transitioning into a wider, lush, sunlit rainforest panoramic. (0:10) Reveal the Cobalt Blue Andara Bottle resting on a vibrant green mossy rock in the center of the stream. (0:12) Text 'WAKE UP YOUR WATER' floats in 3D golden letters. 8k, unreal engine 5 style, bioluminescent, high energy transformation, commercial luxury aesthetic.`;

async function main() {
    console.log('🎬 Starting Veo Video Generation Test...');
    console.log('📍 Project:', process.env.GOOGLE_CLOUD_PROJECT || '(not set)');
    console.log('🔑 Credentials:', process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'Set' : 'NOT SET');
    console.log('---');

    try {
        const result = await videoGeneratorService.generateVideo(LEAD_GEN_PROMPT);

        if (result.success) {
            console.log('✅ Video generation successful!');
            console.log('📹 Video URL:', result.videoUrl);
        } else {
            console.log('❌ Video generation failed:', result.error);
        }
    } catch (error) {
        console.error('💥 Exception during generation:', error);
    }
}

main();
