
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "../db";
import { documents, documentChunks } from "@shared/schema";
import { generateEmbedding } from "../services/embedding";
// Use the existing knowledge base service logic, but simplified for script execution
// to avoid complex dependency injection issues in script mode

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// IMPORTANT: Define the specific design system files we want to maximize
// These are the "Truth" files for the Visual Interpreter
const DESIGN_FILES = [
    {
        path: "client/src/index.css",
        title: "Andara Ionic 1.0 CSS System",
        category: "Design System",
        sourceType: "code",
        tags: ["css", "design", "tokens", "ionic", "colors"]
    },
    {
        path: "DESIGN_SYSTEM.md", // Assuming this exists or will be created/located
        title: "Mineral Network of Light Philosophy",
        category: "Design System",
        sourceType: "documentation",
        tags: ["philosophy", "design", "principles", "mineral"]
    },
    {
        path: "client/src/components/visuals/HexagonalGrid.tsx",
        title: "Component: HexagonalGrid (Structured Water)",
        category: "Component Library",
        sourceType: "code",
        tags: ["react", "component", "visual", "water", "hexagonal"]
    },
    {
        path: "client/src/components/motion/CosmicPulse.tsx",
        title: "Component: CosmicPulse (Bioelectricity)",
        category: "Component Library",
        sourceType: "code",
        tags: ["react", "component", "motion", "energy", "pulse"]
    },
    {
        path: "client/src/components/motion/WaterRipple.tsx",
        title: "Component: WaterRipple (Interactive)",
        category: "Component Library",
        sourceType: "code",
        tags: ["react", "component", "motion", "water", "ripple"]
    }
];

async function ingestDesignKnowledge() {
    console.log("🎨 Starting Design Knowledge Ingestion...");
    console.log(`Phase 1: Targeting ${DESIGN_FILES.length} core files...`);

    const projectRoot = path.resolve(__dirname, "../../");

    for (const fileDef of DESIGN_FILES) {
        const absolutePath = path.join(projectRoot, fileDef.path);

        console.log(`\nProcessing: ${fileDef.path}`);

        try {
            // 1. Check if file exists
            try {
                await fs.access(absolutePath);
            } catch (e) {
                console.warn(`[WARN] File not found: ${absolutePath}. Skipping.`);
                continue;
            }

            // 2. Read content
            const content = await fs.readFile(absolutePath, "utf-8");
            if (!content) {
                console.warn(`[WARN] File empty: ${absolutePath}. Skipping.`);
                continue;
            }

            console.log(`   - Read ${content.length} bytes`);

            // 3. Generate Embedding (Vector)
            // We use the "summary" as the core topic + a chunk of content for context
            // effectively treating the whole file as one actionable "tool" for the LLM
            console.log(`   - Generating embedding...`);
            const embeddingResult = await generateEmbedding(`Title: ${fileDef.title}\nCategory: ${fileDef.category}\n\n${content.substring(0, 8000)}`); // Limit to ~2k tokens for embedding relevance

            if (!embeddingResult || !embeddingResult.embedding) {
                console.error(`[ERROR] Failed to generate embedding for ${fileDef.title}`);
                continue;
            }

            // 4. Save to Database
            // Step A: Create Document Record
            const [doc] = await db.insert(documents).values({
                title: fileDef.title,
                rawText: content,
                cleanText: content, // For code files, they are same
                sourceType: "upload", // Enum constraint
                sourceUrl: fileDef.path,
                tags: fileDef.tags,
                status: "indexed",
                metadata: {
                    ingestedAt: new Date().toISOString(),
                    type: "design_system_core",
                    category: fileDef.category
                }
            }).returning();

            console.log(`   - 📄 Created Document ID: ${doc.id}`);

            // Step B: Create Chunk Record (Single chunk for these small files)
            await db.insert(documentChunks).values({
                documentId: doc.id,
                chunkIndex: 0,
                content: content.substring(0, 8000), // Postgres limit safety
                tokenCount: Math.ceil(content.length / 4), // Rough estimate
                embedding: embeddingResult.embedding
            });

            console.log(`   - 🧩 Created Chunk with Embedding`);
            console.log(`   - ✅ Successfully indexed: ${fileDef.title}`);

        } catch (error) {
            console.error(`[ERROR] Processing ${fileDef.path}:`, error);
        }
    }

    console.log("\n✨ Design Knowledge Ingestion Complete!");
    process.exit(0);
}

// Run the script
ingestDesignKnowledge().catch(err => {
    console.error("Fatal Error:", err);
    process.exit(1);
});
