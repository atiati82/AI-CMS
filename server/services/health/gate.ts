import { storage } from "../../storage";

export class HealthGateService {
    async runChecks(source: string = 'system') {
        const startTime = Date.now();

        const run = await storage.createHealthRun({
            status: 'running',
            triggerSource: source,
            summary: {},
            metadata: {}
        });

        // Mock checks
        const issues = [];

        // End run
        const duration = Date.now() - startTime;
        await storage.updateHealthRun(run.id, {
            status: 'success',
            completedAt: new Date(),
            durationMs: duration,
            overallScore: 100,
            summary: { issuesFound: issues.length }
        });

        return {
            runId: run.id,
            status: 'success',
            duration,
            issuesFound: issues.length
        };
    }
}

export const healthGateService = new HealthGateService();
