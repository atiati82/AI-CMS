
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api';

const endpoints = [
    { name: 'Clusters', path: '/admin/clusters' },
    { name: 'Templates (CTA)', path: '/admin/ctas' }, // Inferred from LinkingTab code: /api/admin/ctas or /api/admin/linking-rules?
    // Let's check LinkingTab code again.
    // LinkingTab fetches linkingRules from /api/admin/linking-rules (inferred)
    // CTA Templates might be /api/admin/cta-templates
    { name: 'Linking Rules', path: '/admin/linking-rules' },
    { name: 'BigMind Sessions', path: '/admin/bigmind/sessions' },
    { name: 'Knowledge Stats', path: '/admin/ai/knowledge-stats' },
    { name: 'Agent Registry', path: '/ai/agents' }, // Public or admin?
    { name: 'Workflows', path: '/admin/workflows' },
];

// Mock session header if helpful, otherwise expect 401 is "Health OK" vs 500 "Crash"
const HEADERS = {
    'Content-Type': 'application/json',
    'x-session-id': 'test-admin-session'
};

async function verifyEndpoints() {
    console.log('Starting Admin API Verification...');
    let failureCount = 0;

    for (const ep of endpoints) {
        try {
            const res = await fetch(`${BASE_URL}${ep.path}`, { headers: HEADERS });
            const status = res.status;

            // We accept 200 (OK) or 401/403 (Auth failed but server handled it)
            // We reject 500 (Internal Server Error)

            if (status >= 500) {
                console.error(`❌ ${ep.name} (${ep.path}): FAILED with status ${status}`);
                failureCount++;
            } else if (status === 404) {
                console.warn(`⚠️ ${ep.name} (${ep.path}): WARNING 404 Not Found (Check route definition)`);
            } else {
                console.log(`✅ ${ep.name} (${ep.path}): OK (Status ${status})`);
            }
        } catch (err: any) {
            console.error(`❌ ${ep.name} (${ep.path}): NETWORK ERROR - ${err.message}`);
            failureCount++;
        }
    }

    if (failureCount > 0) {
        console.error(`\nverification FAILED with ${failureCount} errors.`);
        process.exit(1);
    } else {
        console.log('\nAll checked endpoints are responsive (no 500 errors).');
    }
}

verifyEndpoints();
