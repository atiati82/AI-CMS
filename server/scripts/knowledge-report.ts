
import { db } from '../db';
import fs from 'fs';
import path from 'path';

async function generateReport() {
    try {
        console.log('📊 Generating Knowledge Base Report...');

        // 1. Total Counts
        const totalResult = await db.query('SELECT COUNT(*) as count FROM knowledge_base');
        const totalDocs = parseInt(totalResult.rows[0].count);

        // 2. By Data Type
        const typeResult = await db.query(`
            SELECT data_type, COUNT(*) as count 
            FROM knowledge_base 
            GROUP BY data_type
            ORDER BY count DESC
        `);

        // 3. By Zone (Need to extract from JSONB)
        const zoneResult = await db.query(`
            SELECT content->>'zone' as zone, COUNT(*) as count 
            FROM knowledge_base 
            GROUP BY content->>'zone'
            ORDER BY count DESC
        `);

        // 4. Recent Ingestions (Last 10)
        const recentResult = await db.query(`
            SELECT id, data_type, source, processed_at
            FROM knowledge_base 
            ORDER BY processed_at DESC 
            LIMIT 10
        `);

        // 5. Unique Sources Count (Approximate docs count)
        const sourceResult = await db.query(`
            SELECT COUNT(DISTINCT source) as count FROM knowledge_base
        `);
        const uniqueSources = parseInt(sourceResult.rows[0].count);

        // Construct Report Markdown
        let report = `# Knowledge Base Report (${new Date().toISOString().split('T')[0]})\n\n`;

        report += `## Overview\n`;
        report += `- **Total Chunks**: ${totalDocs}\n`;
        report += `- **Unique Documents/Sources**: ${uniqueSources}\n`;
        report += `- **Last Updated**: ${new Date().toISOString()}\n\n`;

        report += `## Distribution by Zone\n`;
        report += `| Zone | Count | Percentage |\n|---|---|---|\n`;
        zoneResult.rows.forEach((row: any) => {
            const pct = ((parseInt(row.count) / totalDocs) * 100).toFixed(1);
            report += `| ${row.zone || 'unknown'} | ${row.count} | ${pct}% |\n`;
        });
        report += `\n`;

        report += `## Distribution by Type\n`;
        report += `| Type | Count |\n|---|---|\n`;
        typeResult.rows.forEach((row: any) => {
            report += `| ${row.data_type} | ${row.count} |\n`;
        });
        report += `\n`;

        report += `## Recent Ingestions\n`;
        recentResult.rows.forEach((row: any) => {
            report += `- [${row.processed_at.toISOString().split('T')[0]}] **${row.data_type}**: \`${row.source}\`\n`;
        });

        console.log(report);

        // Save to file
        const reportPath = path.resolve(process.cwd(), 'KNOWLEDGE_BASE_REPORT.md');
        fs.writeFileSync(reportPath, report);
        console.log(`✅ Report saved to ${reportPath}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Failed to generate report:', error);
        process.exit(1);
    }
}

generateReport();
