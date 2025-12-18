/**
 * Script to ingest the Replit-Mode Methodology into RAG Knowledge Base
 * 
 * Run: npx tsx scripts/ingest-replit-mode.ts
 */

import { pool } from '../server/db';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

interface RagMemoryObject {
    lessonId: string;
    title: string;
    rootCause: object;
    fixSteps: object[];
    preventionRule: object;
    doNotRepeatPolicy: string;
    tags: string[];
    severity: 'info' | 'warning' | 'error' | 'critical';
    context: object;
    examples?: object;
}

async function ingestMethodology() {
    console.log('📚 Ingesting Replit-Mode Methodology into RAG...\n');

    // Read the methodology file
    const methodologyPath = path.join(process.cwd(), 'AI_REPLIT_MODE_METHODOLOGY.md');
    const content = fs.readFileSync(methodologyPath, 'utf-8');

    // Split into chunks (by section)
    const chunks = splitIntoChunks(content);

    console.log(`📄 Found ${chunks.length} sections to ingest\n`);

    // Ingest each chunk into knowledge_base
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const chunkId = `methodology-replit-mode-${i}`;

        await pool.query(`
            INSERT INTO knowledge_base (id, data_type, content, source)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (id) DO UPDATE SET content = $3, processed_at = CURRENT_TIMESTAMP
        `, [
            chunkId,
            'methodology',
            JSON.stringify({
                title: `Replit-Mode Methodology - Section ${i + 1}`,
                chunk: chunk,
                chunkIndex: i,
                totalChunks: chunks.length,
                source: 'AI_REPLIT_MODE_METHODOLOGY.md',
                tags: ['methodology', 'operating-loop', 'agent-behavior']
            }),
            'AI_REPLIT_MODE_METHODOLOGY.md'
        ]);

        console.log(`  ✅ Ingested section ${i + 1}: ${chunk.substring(0, 50)}...`);
    }

    // Create RAG memory objects for key lessons
    const lessons: RagMemoryObject[] = [
        {
            lessonId: 'lesson-replit-mode-inspect-first',
            title: 'Never Guess File Paths - Inspect First',
            rootCause: {
                category: 'methodology',
                description: 'Guessing file paths leads to errors and wasted time'
            },
            fixSteps: [
                { step: 1, action: 'List directory structure first' },
                { step: 2, action: 'Find relevant files using search' },
                { step: 3, action: 'View file contents before editing' }
            ],
            preventionRule: {
                rule: 'Always run /scan or list directories before making changes'
            },
            doNotRepeatPolicy: 'Never assume file paths exist - ALWAYS verify first',
            tags: ['methodology', 'replit-mode', 'file-operations'],
            severity: 'warning',
            context: { source: 'Replit-Mode v1.0' }
        },
        {
            lessonId: 'lesson-replit-mode-plan-first',
            title: 'Plan Before Coding - 2-5 Bullets',
            rootCause: {
                category: 'methodology',
                description: 'Jumping directly into code without planning leads to rework'
            },
            fixSteps: [
                { step: 1, action: 'Restate the goal in one sentence' },
                { step: 2, action: 'Identify affected layers (UI/API/DB/Auth)' },
                { step: 3, action: 'Create 2-5 bullet plan of smallest path to success' }
            ],
            preventionRule: {
                rule: 'Always create a plan before writing any code'
            },
            doNotRepeatPolicy: 'Never start coding without a clear 2-5 bullet plan',
            tags: ['methodology', 'replit-mode', 'planning'],
            severity: 'info',
            context: { source: 'Replit-Mode v1.0' }
        },
        {
            lessonId: 'lesson-replit-mode-verify-after',
            title: 'Verify After Changes - Every Change is Testable',
            rootCause: {
                category: 'methodology',
                description: 'Unverified changes lead to broken features in production'
            },
            fixSteps: [
                { step: 1, action: 'Run lint check' },
                { step: 2, action: 'Run build' },
                { step: 3, action: 'Start dev server' },
                { step: 4, action: 'Provide exact verification steps to user' }
            ],
            preventionRule: {
                rule: 'Always verify changes with build/lint/test commands'
            },
            doNotRepeatPolicy: 'Never claim a feature works without verification steps',
            tags: ['methodology', 'replit-mode', 'verification'],
            severity: 'warning',
            context: { source: 'Replit-Mode v1.0' }
        },
        {
            lessonId: 'lesson-replit-mode-admin-registry',
            title: 'Admin Features Must Use Registry Contract',
            rootCause: {
                category: 'architecture',
                description: 'Admin features without proper registry lead to broken navigation and permissions'
            },
            fixSteps: [
                { step: 1, action: 'Define feature_key' },
                { step: 2, action: 'Define route and navPath' },
                { step: 3, action: 'Define slot and order' },
                { step: 4, action: 'Define permission and api_binding' },
                { step: 5, action: 'Define audit_event and tests' }
            ],
            preventionRule: {
                rule: 'Every admin feature must have complete registry entry'
            },
            doNotRepeatPolicy: 'Never add admin UI without feature_key, route, navPath, slot, order, permission, api_binding, audit_event, tests',
            tags: ['methodology', 'replit-mode', 'admin-registry', 'ui'],
            severity: 'error',
            context: { source: 'Replit-Mode v1.0' }
        },
        {
            lessonId: 'lesson-replit-mode-debugging',
            title: 'Debugging Discipline - Show Error, Identify Root Cause, Prevent Recurrence',
            rootCause: {
                category: 'debugging',
                description: 'Fixing errors without understanding prevents learning'
            },
            fixSteps: [
                { step: 1, action: 'Show exact error text' },
                { step: 2, action: 'Identify root cause category: config/env, dependency, runtime, type, DB, auth, routing, rendering' },
                { step: 3, action: 'Provide fix and prevention (add guard, validation, test, or doc note)' }
            ],
            preventionRule: {
                rule: 'Every fix must include prevention measure'
            },
            doNotRepeatPolicy: 'Never fix an error without documenting root cause and prevention',
            tags: ['methodology', 'replit-mode', 'debugging', 'error-handling'],
            severity: 'info',
            context: { source: 'Replit-Mode v1.0' }
        }
    ];

    console.log('\n📝 Creating RAG Memory Objects for key lessons...\n');

    for (const lesson of lessons) {
        await pool.query(`
            INSERT INTO rag_memory_objects (
                lesson_id, title, root_cause, fix_steps, prevention_rule,
                do_not_repeat_policy, tags, severity, context, examples
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (lesson_id) DO UPDATE SET
                title = $2,
                root_cause = $3,
                fix_steps = $4,
                prevention_rule = $5,
                do_not_repeat_policy = $6,
                tags = $7,
                severity = $8,
                context = $9,
                last_triggered = CURRENT_TIMESTAMP
        `, [
            lesson.lessonId,
            lesson.title,
            JSON.stringify(lesson.rootCause),
            JSON.stringify(lesson.fixSteps),
            JSON.stringify(lesson.preventionRule),
            lesson.doNotRepeatPolicy,
            lesson.tags,
            lesson.severity,
            JSON.stringify(lesson.context),
            JSON.stringify(lesson.examples || {})
        ]);

        console.log(`  ✅ Created lesson: ${lesson.title}`);
    }

    console.log('\n✨ Methodology ingestion complete!\n');
    console.log('The AI agent will now follow Replit-Mode v1.0 operating protocol.\n');

    await pool.end();
}

function splitIntoChunks(content: string): string[] {
    // Split by major sections (## headers)
    const sections = content.split(/\n---\n/).filter(s => s.trim().length > 0);
    return sections;
}

ingestMethodology().catch(err => {
    console.error('❌ Ingestion failed:', err);
    process.exit(1);
});
