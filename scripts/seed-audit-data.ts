import dotenv from 'dotenv';
dotenv.config();

async function seed() {
    const { pool } = await import('../server/db');
    console.log('🌱 Seeding AI Audit & Memory data...');

    // 1. Recreate agent_audit_log table to match new schema
    console.log('Recreating agent_audit_log table...');
    await pool.query(`DROP TABLE IF EXISTS agent_audit_log`);
    await pool.query(`
    CREATE TABLE agent_audit_log (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      run_id VARCHAR(100) NOT NULL,
      agent_name VARCHAR(100) NOT NULL,
      action_type VARCHAR(50) NOT NULL, 
      content TEXT,
      metadata JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    );
    CREATE INDEX idx_agent_audit_run ON agent_audit_log(run_id);
    CREATE INDEX idx_agent_audit_created ON agent_audit_log(created_at);
  `);

    // 2. Clear existing memories? No, just add if empty.
    // Actually, let's truncate for a clean state or just check count.
    const memCount = await pool.query('SELECT count(*) FROM rag_memory_objects');
    if (parseInt(memCount.rows[0].count) === 0) {
        console.log('Seeding rag_memory_objects...');

        const memories = [
            {
                lesson_id: 'lesson-001',
                title: 'User Preference: Dark Mode Default',
                do_not_repeat_policy: 'Always default to dark mode for new admin users unless specified otherwise.',
                tags: ['preference', 'visual-style'],
                severity: 'info',
                context: JSON.stringify({ confidence: 0.98, visualVibe: 'Midnight', theme: 'Dark' }),
                root_cause: {}, fix_steps: {}, prevention_rule: {}
            },
            {
                lesson_id: 'lesson-002',
                title: 'Fix: Hexagonal Grid Overflow',
                do_not_repeat_policy: 'Ensure the hexagonal grid background has overflow-hidden on the parent container.',
                tags: ['fix', 'code', 'css'],
                severity: 'warning',
                context: JSON.stringify({ confidence: 0.95, component: 'HexGrid' }),
                root_cause: {}, fix_steps: {}, prevention_rule: {}
            },
            {
                lesson_id: 'lesson-003',
                title: 'User Pattern: Concise Summaries',
                do_not_repeat_policy: 'User prefers concise, bulleted summaries for SEO reports.',
                tags: ['user-pattern', 'content'],
                severity: 'info',
                context: JSON.stringify({ confidence: 0.88 }),
                root_cause: {}, fix_steps: {}, prevention_rule: {}
            }
        ];

        for (const mem of memories) {
            await pool.query(`
              INSERT INTO rag_memory_objects 
              (lesson_id, title, do_not_repeat_policy, tags, severity, context, root_cause, fix_steps, prevention_rule)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          `, [mem.lesson_id, mem.title, mem.do_not_repeat_policy, mem.tags, mem.severity, mem.context, mem.root_cause, mem.fix_steps, mem.prevention_rule]);
        }
    }

    // 3. Seed Agent Logs
    console.log('Seeding agent_audit_log...');
    await pool.query('DELETE FROM agent_audit_log'); // Clear old/empty

    const runId1 = 'run-seo-audit-123';
    const runId2 = 'run-magic-page-456';

    const logs = [
        // Run 1: SEO Audit
        { run_id: runId1, agent_name: 'SEO Brain', action_type: 'thinking', content: 'Analyzing latest search console data for "ionic minerals"...', metadata: { source: 'gsc' }, timeOffset: 60000 },
        { run_id: runId1, agent_name: 'SEO Brain', action_type: 'tool_use', content: 'Calling tool: fetch_keyword_rankings', metadata: { keyword: 'ionic minerals' }, timeOffset: 55000 },
        { run_id: runId1, agent_name: 'SEO Brain', action_type: 'thinking', content: 'Identified opportunity for new cluster page.', metadata: { confidence: 0.85 }, timeOffset: 50000 },
        { run_id: runId1, agent_name: 'SEO Brain', action_type: 'response', content: 'Recommendation: Create "Bio-Available Ionic Minerals" cluster.', metadata: {}, timeOffset: 45000 },

        // Run 2: Magic Page
        { run_id: runId2, agent_name: 'Magic Architect', action_type: 'thinking', content: 'Receiving request for "Water Structure" landing page.', metadata: { intent: 'educational' }, timeOffset: 30000 },
        { run_id: runId2, agent_name: 'Magic Architect', action_type: 'function_call', content: 'Generating component structure...', metadata: { components: ['Hero', 'FeatureGrid', 'FAQ'] }, timeOffset: 25000 },
        { run_id: runId2, agent_name: 'Magic Architect', action_type: 'response', content: 'Page draft created.', metadata: { page_id: 'pg-789' }, timeOffset: 10000 },
    ];

    for (const log of logs) {
        // Adjust timestamp to be recent
        const date = new Date(Date.now() - log.timeOffset);
        await pool.query(`
          INSERT INTO agent_audit_log (run_id, agent_name, action_type, content, metadata, created_at)
          VALUES ($1, $2, $3, $4, $5, $6)
      `, [log.run_id, log.agent_name, log.action_type, log.content, JSON.stringify(log.metadata), date]);
    }

    console.log('✅ Seeding complete.');
    process.exit(0);
}

seed().catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
