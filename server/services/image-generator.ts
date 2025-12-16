import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "fs";
import * as path from "path";
import { randomBytes } from "crypto";

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
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

export async function generateImage(prompt: string): Promise<GeneratedImage> {
  try {
    const enhancedPrompt = `High quality professional image: ${prompt}. Style: modern, clean, high-end product photography or scientific visualization. No text overlays, no watermarks.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [{ role: "user", parts: [{ text: enhancedPrompt }] }],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const candidate = response.candidates?.[0];
    const imagePart = candidate?.content?.parts?.find((part: any) => part.inlineData);

    if (!imagePart?.inlineData?.data) {
      return {
        success: false,
        error: "No image data in response from AI",
      };
    }

    const mimeType = imagePart.inlineData.mimeType || "image/png";
    const base64Data = imagePart.inlineData.data;
    
    const filename = generateFilename(prompt);
    const filePath = path.join(IMAGES_DIR, filename);
    
    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(filePath, buffer);
    
    const publicUrl = `/attached_assets/generated_images/${filename}`;

    return {
      success: true,
      filePath,
      publicUrl,
      base64Data,
      mimeType,
    };
  } catch (error: any) {
    console.error("Image generation error:", error);
    return {
      success: false,
      error: error.message || "Failed to generate image",
    };
  }
}

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
