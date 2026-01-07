
import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

// Check API Key existence
const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("❌ No GEMINI API KEY found (checked AI_INTEGRATIONS_GEMINI_API_KEY and GEMINI_API_KEY).");
    process.exit(1);
}

const ai = new GoogleGenAI({
    apiKey: apiKey,
    //    httpOptions: {
    //         apiVersion: 'v1beta', 
    //    }
});

async function testModel(modelName: string) {
    console.log(`Testing model: ${modelName}...`);
    try {
        // New SDK syntax?
        const result = await ai.models.generateContent({
            model: modelName,
            contents: [
                {
                    parts: [
                        { text: "Hello, are you online? Reply with 'Yes'" }
                    ]
                }
            ]
        });

        // Result structure
        console.log(`✅ ${modelName} SUCCESS:`, JSON.stringify((result as any)?.response || result, null, 2));
        return true;
    } catch (error: any) {
        // console.error(error); // Debug full error if needed
        console.error(`❌ ${modelName} FAILED:`, error.message?.split('\n')[0] || error.statusText || error);
        if (error.status) console.error(`   Status: ${error.status}`);
        return false;
    }
}

async function run() {
    console.log("--- AI Connection Diagnostic ---");
    console.log("Using SDK: @google/genai (v1.x)");

    // Test common model names
    const models = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro",
        "gemini-2.0-flash-exp"
    ];

    for (const m of models) {
        await testModel(m);
    }
}

run();
