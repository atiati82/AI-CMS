import 'dotenv/config';
import { db } from '../server/db';
import { pages } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function auditPaths() {
    console.log('🔍 Auditing Database Paths...');
    const allPages = await db.select().from(pages);

    const magneticPages = allPages.filter(p => p.path?.includes('magnetic') || p.path?.includes('water'));

    console.log('\n--- Magnetic/Water Pages ---');
    magneticPages.forEach(p => {
        console.log(`[${p.id}] ${p.title}: ${p.path} (Key: ${p.key})`);
    });

    console.log('\n--- All Paths ---');
    allPages.forEach(p => {
        console.log(`${p.path}`);
    });

    process.exit(0);
}

auditPaths();
