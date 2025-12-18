#!/usr/bin/env tsx
import 'dotenv/config';
import { generateFallbackResponse } from './server/services/fallback-ai';

async function testResponseFormatter() {
    console.log('🧪 Testing State-of-the-Art Response Formatter\n');
    console.log('='.repeat(60));

    const testQueries = [
        'test',
        'API routes',
        'how to create a page',
        'BigMind capabilities'
    ];

    for (const query of testQueries) {
        console.log(`\n\n📝 Query: "${query}"`);
        console.log('-'.repeat(60));

        try {
            const response = await generateFallbackResponse(query);
            console.log('\n✅ Response:\n');
            console.log(response.response);
            console.log('\n📚 Sources:', response.sources.length);
        } catch (error) {
            console.error('❌ Error:', error);
        }

        console.log('\n' + '='.repeat(60));
    }
}

testResponseFormatter().then(() => {
    console.log('\n✅ Test completed!');
    process.exit(0);
}).catch(error => {
    console.error('❌ Test failed:', error);
    process.exit(1);
});
