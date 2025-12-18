
import { visualInterpreterAgent } from "../server/agents/visual-interpreter";

async function verifyVisualInterpreter() {
    console.log("🧪 Verifying Visual Interpreter Agent...");

    try {
        // Test 1: Interpret Page
        console.log("\n1. Testing 'interpret_page'...");
        const interpretation = await visualInterpreterAgent.execute({
            id: "test-1",
            type: "interpret_page",
            input: {
                content: "A page about EZ Water (Fourth Phase) and its structured hexagonal lattice.",
                context: "Scientific deep dive"
            }
        });

        if (interpretation.success) {
            console.log("✅ Interpretation Success!");
            console.log("   Theme Detected:", interpretation.output.colorWorld.treeTheme);
            console.log("   Visual Vibe:", interpretation.output.design.visualVibe);
        } else {
            console.error("❌ Interpretation Failed:", interpretation.error);
        }

        // Test 2: Map Color World
        console.log("\n2. Testing 'map_color_world'...");
        const mapping = await visualInterpreterAgent.execute({
            id: "test-2",
            type: "map_color_world",
            input: {
                topic: "Bio-electric fields and cellular voltage"
            }
        });

        if (mapping.success) {
            console.log("✅ Mapping Success!");
            console.log("   Detected World:", mapping.output.colorWorld.name);
            console.log("   Tree Theme:", mapping.output.colorWorld.treeTheme);
        } else {
            console.error("❌ Mapping Failed:", mapping.error);
        }

    } catch (error) {
        console.error("Create failed: ", error);
    }
}

// Check imports/exports of API route
import designRouter from "../server/routes/admin/design";
console.log("\n✅ Design Router imported successfully");

verifyVisualInterpreter().catch(console.error);
