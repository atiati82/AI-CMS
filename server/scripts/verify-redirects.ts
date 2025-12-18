
import { db } from "../db";
import { redirects } from "@shared/schema";
import { eq } from "drizzle-orm";

async function verifyRedirects() {
    console.log("Starting Redirect Verification...");
    const testSource = "/test-redirect-source";
    const testTarget = "/test-redirect-target";

    try {
        // 1. Cleanup previous test data
        await db.delete(redirects).where(eq(redirects.sourcePath, testSource));

        // 2. Create Redirect via DB (simulation of API)
        console.log("Creating test redirect...");
        const [redirect] = await db.insert(redirects).values({
            sourcePath: testSource,
            targetPath: testTarget,
            type: '302',
            description: 'Automated Test Redirect'
        }).returning();
        console.log("Redirect created with ID:", redirect.id);

        // 3. Test Redirect Logic (Simulate Middleware)
        console.log("Testing middleware query...");
        const [found] = await db.select().from(redirects).where(eq(redirects.sourcePath, testSource)).limit(1);

        if (!found) {
            throw new Error("Middleware query failed to find the redirect!");
        }
        console.log("Middleware query successful.");
        if (found.targetPath !== testTarget) {
            throw new Error(`Target path mismatch. Expected ${testTarget}, got ${found.targetPath}`);
        }

        // 4. Cleanup
        await db.delete(redirects).where(eq(redirects.id, redirect.id));
        console.log("Cleanup complete.");

        console.log("✅ Redirect System Verification Passed (Backend Logic)");
        process.exit(0);
    } catch (error) {
        console.error("❌ Verification Failed:", error);
        process.exit(1);
    }
}

verifyRedirects();
