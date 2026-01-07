
import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';

const execAsync = promisify(exec);

async function runCheck(name: string, command: string): Promise<boolean> {
    console.log(chalk.blue(`\n🔍 Checking ${name}...`));
    try {
        await execAsync(command);
        console.log(chalk.green(`✅ ${name} passed`));
        return true;
    } catch (error: any) {
        console.log(chalk.red(`❌ ${name} failed`));
        // Show a snippet of error if useful, but keep it clean
        if (error.stdout) console.log(chalk.gray(error.stdout.slice(0, 200) + '...'));
        if (error.stderr) console.log(chalk.red(error.stderr.slice(0, 200) + '...'));
        return false;
    }
}

async function checkTypes(): Promise<boolean> {
    console.log(chalk.blue(`\n🔍 Checking Types (TSC)...`));
    try {
        await execAsync('tsc --noEmit');
        console.log(chalk.green(`✅ Types passed`));
        return true;
    } catch (error: any) {
        console.log(chalk.yellow(`⚠️ Type check found issues (Total: ${error.stdout.split('\n').length} lines)`));
        // We don't fail health check on types yet, just warn
        return true;
    }
}

async function main() {
    console.log(chalk.bold('🏥 Andara System Health Check'));
    console.log('================================');

    // 1. Heal Server (Port cleanup)
    const heal = await runCheck('Server Ports & Cache', 'npx tsx scripts/heal-server.ts');

    // 2. Check Routes
    const routes = await runCheck('Route Configuration', 'npm run check:routes');

    // 3. Check Types (Non-blocking for now)
    await checkTypes();

    // 4. Check Linting (Non-blocking for legacy reasons)
    console.log(chalk.blue(`\n🔍 Checking Critical Lint Errors...`));
    try {
        await execAsync('eslint . --quiet');
        console.log(chalk.green(`✅ Linting passed`));
    } catch (error: any) {
        console.log(chalk.yellow(`⚠️ Linting found errors (Run 'npm run lint' to see details)`));
        // Non-blocking for now
    }

    if (!heal || !routes) {
        console.log(chalk.red('\n❌ System health check failed. Fix issues above.'));
        process.exit(1);
    }

    console.log(chalk.green('\n✨ System is healthy and ready for development!'));
}

main().catch(console.error);
