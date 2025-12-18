#!/usr/bin/env tsx
/**
 * Script to upload chat history to the knowledge base
 * Usage: tsx upload-chat-history.ts
 */

import 'dotenv/config';
import { pool } from './server/db';
import { ingestDocument } from './server/services/knowledge-base';
import * as fs from 'fs';
import * as path from 'path';

async function uploadChatHistory() {
    try {
        console.log('📚 Uploading chat history to knowledge base...');

        // Read the markdown document
        const docPath = path.join(process.cwd(), 'chat-history-admin-tsx-fix.md');
        const content = fs.readFileSync(docPath, 'utf-8');

        // Ingest into knowledge base
        const documentId = await ingestDocument({
            title: 'Admin.tsx Return Error Fix - Chat Session 2025-12-17',
            content,
            source: 'chat-session-eab5aef4-cd2c-4ae2-85b5-c4386990891e',
            type: 'text',
            metadata: {
                session_id: 'eab5aef4-cd2c-4ae2-85b5-c4386990891e',
                date: '2025-12-17',
                topic: 'debugging-typescript-react',
                tags: ['typescript', 'react', 'debugging', 'admin-ui', 'bigmind', 'compilation-error', 'hooks']
            }
        });

        console.log(`✅ Chat history uploaded successfully!`);
        console.log(`   Document ID: ${documentId}`);
        console.log(`   Content length: ${content.length} characters`);

        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error uploading chat history:', error);
        await pool.end();
        process.exit(1);
    }
}

uploadChatHistory();
