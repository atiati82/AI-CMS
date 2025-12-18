
import { db } from "../db";
import { adminUsers } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function resetAdmin() {
    console.log("Checking for admin user...");

    const username = "admin";
    const password = "admin123";
    const passwordHash = await bcrypt.hash(password, 10);

    try {
        const existingUser = await db.select().from(adminUsers).where(eq(adminUsers.username, username));

        if (existingUser.length > 0) {
            console.log("Admin user exists. Updating password...");
            await db.update(adminUsers)
                .set({ passwordHash })
                .where(eq(adminUsers.username, username));
            console.log("Password updated successfully.");
        } else {
            console.log("Admin user does not exist. Creating...");
            await db.insert(adminUsers).values({
                username,
                passwordHash,
            });
            console.log("Admin user created successfully.");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error resetting admin:", error);
        process.exit(1);
    }
}

resetAdmin();
