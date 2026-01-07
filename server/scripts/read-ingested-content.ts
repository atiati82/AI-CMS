
import dotenv from 'dotenv';
dotenv.config();
import { storage } from '../storage';

async function readContent() {
    try {
        const titles = [
            "What is Adya Clarity",
            "Functions of Adya Clarity",
            "Adya Clarity Water Purification Technology - How It Works",
            "ADYA_CLARITY_EZ_WATER_TEST",
            "adya water book"
        ];

        for (const title of titles) {
            console.log(`\n\n--- DOCUMENT: ${title} ---`);


            // Re-implementing simplified finding since findDocuments might be RAG search
            const allDocs = await storage.getAllDocuments();
            const doc = allDocs.find(d => d.title === title || d.title.includes(title));

            if (doc) {
                // Fetch full content
                const fullDoc = await storage.getDocument(doc.id);
                if (fullDoc) {
                    const text = fullDoc.cleanText || "";
                    console.log(text.substring(0, 3000)); // First 3000 chars
                }
            } else {
                console.log("Document not found via listDocuments");
            }
        }
    } catch (e) {
        console.error(e);
    }
}
readContent();
