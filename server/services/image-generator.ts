import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "fs";
import * as path from "path";
import { randomBytes } from "crypto";

// Initialize Gemini with the correct image generation model
const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY,
});

const IMAGES_DIR = path.resolve(process.cwd(), "attached_assets/generated_images");

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

function generateFilename(prompt: string): string {
  const slug = prompt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const hash = randomBytes(4).toString("hex");
  return `${slug}_${hash}.png`;
}

export interface GeneratedImage {
  success: boolean;
  filePath?: string;
  publicUrl?: string;
  base64Data?: string;
  mimeType?: string;
  error?: string;
}

/**
 * Generate image using Gemini 2.0 Flash (Nano Banana)
 * Uses gemini-2.0-flash-exp-image-generation model
 */
export async function generateImage(prompt: string): Promise<GeneratedImage> {
  console.log('[Image Generator] Starting image generation...');

  // Check API key
  const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[Image Generator] No Gemini API key found');
    return {
      success: false,
      error: "Gemini API key not configured",
    };
  }

  try {
    // Build enhanced Andara-style prompt
    const enhancedPrompt = buildAndaraPrompt(prompt);

    console.log('[Image Generator] Creating image with Gemini (Nano Banana)');
    console.log('[Image Generator] Prompt:', enhancedPrompt.slice(0, 150) + '...');

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: [{ role: "user", parts: [{ text: enhancedPrompt }] }],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    console.log('[Image Generator] Got response from Gemini');

    const candidate = response.candidates?.[0];
    if (!candidate) {
      console.error('[Image Generator] No candidates in response');
      return {
        success: false,
        error: "No candidates in Gemini response",
      };
    }

    const imagePart = candidate.content?.parts?.find((part: any) => part.inlineData);

    if (!imagePart?.inlineData?.data) {
      // Log what we got instead
      const textPart = candidate.content?.parts?.find((part: any) => part.text);
      console.error('[Image Generator] No image in response. Text response:', textPart?.text?.slice(0, 200));

      // Retry with a simplified prompt (some prompts may be too complex)
      console.log('[Image Generator] Retrying with simplified prompt...');
      try {
        const simplifiedPrompt = `Abstract premium background image with water science theme. Deep blue and teal colors. Dark mode compatible. Subtle particles and light effects. No text, no watermarks.`;

        const retryResponse = await ai.models.generateContent({
          model: "gemini-2.0-flash-exp-image-generation",
          contents: [{ role: "user", parts: [{ text: simplifiedPrompt }] }],
          config: {
            responseModalities: [Modality.TEXT, Modality.IMAGE],
          },
        });

        const retryImagePart = retryResponse.candidates?.[0]?.content?.parts?.find((part: any) => part.inlineData);
        if (retryImagePart?.inlineData?.data) {
          console.log('[Image Generator] Retry succeeded!');
          const mimeType = retryImagePart.inlineData.mimeType || "image/png";
          const base64Data = retryImagePart.inlineData.data;

          const filename = generateFilename(prompt);
          const filePath = path.join(IMAGES_DIR, filename);
          const buffer = Buffer.from(base64Data, "base64");
          fs.writeFileSync(filePath, buffer);

          const publicUrl = `/attached_assets/generated_images/${filename}`;
          console.log('[Image Generator] ✅ Retry image saved:', publicUrl);

          return {
            success: true,
            filePath,
            publicUrl,
            base64Data,
            mimeType,
          };
        }
      } catch (retryError) {
        console.error('[Image Generator] Retry also failed:', retryError);
      }

      return {
        success: false,
        error: "Gemini returned text instead of image. The model may be at capacity or the prompt was blocked. Please try again.",
      };
    }

    const mimeType = imagePart.inlineData.mimeType || "image/png";
    const base64Data = imagePart.inlineData.data;

    console.log('[Image Generator] Image data received, size:', base64Data.length, ' bytes');

    const filename = generateFilename(prompt);
    const filePath = path.join(IMAGES_DIR, filename);

    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/attached_assets/generated_images/${filename}`;

    console.log('[Image Generator] ✅ Image saved:', publicUrl);

    return {
      success: true,
      filePath,
      publicUrl,
      base64Data,
      mimeType,
    };
  } catch (error: any) {
    console.error("[Image Generator] ❌ Error:", error?.message || error);
    console.error("[Image Generator] Full error:", JSON.stringify(error, null, 2));

    // Provide more specific error messages
    if (error?.message?.includes('404') || error?.code === 404) {
      return {
        success: false,
        error: "Gemini image model not available. The model may require special access.",
      };
    }

    if (error?.message?.includes('quota') || error?.message?.includes('limit')) {
      return {
        success: false,
        error: "API quota exceeded. Please try again later.",
      };
    }

    return {
      success: false,
      error: error.message || "Failed to generate image",
    };
  }
}

/**
 * Build Andara-style prompt for image generation
 * Follows the Andara Ionic design language
 */
function buildAndaraPrompt(userPrompt: string): string {
  const lowerPrompt = userPrompt.toLowerCase();

  const styleElements: string[] = [];

  // Detect themes and add appropriate style modifiers
  if (lowerPrompt.includes('water') || lowerPrompt.includes('liquid') || lowerPrompt.includes('living')) {
    styleElements.push('crystalline water science visualization');
    styleElements.push('deep blue and cyan hues with golden light reflections');
    styleElements.push('molecular or cellular water structures');
    styleElements.push('ethereal flowing patterns');
  }

  if (lowerPrompt.includes('mineral') || lowerPrompt.includes('earth') || lowerPrompt.includes('primordial')) {
    styleElements.push('ancient mineral formations');
    styleElements.push('earthy brown and gold tones');
    styleElements.push('geological textures with metallic accents');
  }

  if (lowerPrompt.includes('gold') || lowerPrompt.includes('premium') || lowerPrompt.includes('luxury')) {
    styleElements.push('luxurious dark background with gold metallic accents');
    styleElements.push('high-end aesthetic');
  }

  if (lowerPrompt.includes('science') || lowerPrompt.includes('scientific')) {
    styleElements.push('scientific visualization style');
    styleElements.push('clean modern aesthetic');
  }

  if (lowerPrompt.includes('organic') || lowerPrompt.includes('nature') || lowerPrompt.includes('natural')) {
    styleElements.push('organic flowing patterns');
    styleElements.push('bioluminescent qualities');
  }

  // Default Andara style elements
  const defaultStyles = [
    'dark background (#0a0f1a to #0f172a)',
    'subtle golden rim lighting',
    'high-end product photography aesthetic',
    'no text overlays or watermarks',
    'ultra high resolution',
    'premium quality',
  ];

  // Combine user prompt with style elements
  const allStyles = [...styleElements, ...defaultStyles].join('. ');

  return `${userPrompt}. Style: ${allStyles}`;
}

/**
 * Regenerate image (delete old one first)
 */
export async function regenerateImage(prompt: string, oldFilePath?: string): Promise<GeneratedImage> {
  if (oldFilePath && fs.existsSync(oldFilePath)) {
    try {
      fs.unlinkSync(oldFilePath);
    } catch (e) {
      console.warn("Could not delete old image:", e);
    }
  }

  return generateImage(prompt);
}

/**
 * Delete an image
 */
export function deleteImage(filePath: string): boolean {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (e) {
    console.error("Error deleting image:", e);
    return false;
  }
}
