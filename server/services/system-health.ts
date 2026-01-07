import { storage } from "../storage";

export interface HealthStatus {
    status: 'healthy' | 'unhealthy' | 'warning';
    timestamp: string;
    checks: {
        database: boolean;
        filesystem: boolean;
        uptime: number;
        memoryUsage: number;
    };
}

export class SystemHealthService {
    async checkHealth(): Promise<HealthStatus> {
        const memory = process.memoryUsage();

        // Simple checks for now
        const dbHealthy = true; // db check would go here
        const fsHealthy = true; // fs check would go here

        return {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            checks: {
                database: dbHealthy,
                filesystem: fsHealthy,
                uptime: process.uptime(),
                memoryUsage: memory.heapUsed / 1024 / 1024 // MB
            }
        };
    }
}

export const systemHealthService = new SystemHealthService();
