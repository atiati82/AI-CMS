#!/usr/bin/env tsx
import 'dotenv/config';
import { storage } from './server/storage';

async function testPageTree() {
    try {
        console.log('Testing getPageTree...');
        const tree = await storage.getPageTree();
        console.log(`✅ Success! Got ${tree.length} root pages`);
        console.log(JSON.stringify(tree, null, 2));
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

testPageTree();
