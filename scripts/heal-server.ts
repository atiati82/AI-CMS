
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function findProcess(port: number) {
    try {
        const { stdout } = await execAsync(`lsof -t -i :${port}`);
        return stdout.trim().split('\n').filter(Boolean);
    } catch (error) {
        return [];
    }
}

async function killProcess(pid: string) {
    try {
        await execAsync(`kill -9 ${pid}`);
        console.log(`✅ Killed process ${pid}`);
    } catch (error) {
        console.error(`❌ Failed to kill ${pid}:`, error);
    }
}

async function main() {
    console.log('🔍 Scanning for stuck server processes...');

    const ports = [3000, 5001, 5173, 5174];
    let killed = 0;

    for (const port of ports) {
        const pids = await findProcess(port);
        if (pids.length > 0) {
            console.log(`Found ${pids.length} process(es) on port ${port}`);
            for (const pid of pids) {
                await killProcess(pid);
                killed++;
            }
        }
    }

    if (killed === 0) {
        console.log('✨ No stuck processes found. Ports are clear.');
    } else {
        console.log(`🧹 Cleanup complete. ${killed} process(es) terminated.`);
    }
}

main().catch(console.error);
