'use server';

import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { revalidatePath } from 'next/cache';

const execAsync = promisify(exec);

function getScriptsCwd() {
    return path.resolve(process.cwd(), '../Reachout/scripts');
}

export async function runPythonCommand(command: string) {
    try {
        // Only allow python commands for security in this POC
        if (!command.startsWith('python ')) {
            throw new Error('Only python commands are allowed');
        }

        const cwd = getScriptsCwd();
        console.log(`[Admin Action] Executing: ${command} in ${cwd}`);

        const { stdout, stderr } = await execAsync(command, {
            cwd,
            env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
        });

        // Auto-refresh the dashboard data source and revalidate the page
        let finalOutput = stdout || stderr || 'Command completed with no output.';
        if (!command.includes('export_for_dashboard.py')) {
            try {
                await execAsync('python export_for_dashboard.py', {
                    cwd,
                    env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
                });
                finalOutput += '\n\n🔄 Auto-refreshed dashboard data.';
            } catch (e: any) {
                console.error('Failed to auto-refresh data:', e);
                finalOutput += '\n\n⚠️ Failed to auto-refresh dashboard data: ' + e.message;
            }
        }

        revalidatePath('/admin/campaigns', 'page');
        revalidatePath('/[locale]/admin/campaigns', 'page');

        return {
            success: true,
            output: finalOutput,
        };
    } catch (error: any) {
        console.error(`[Admin Action] Failed to execute ${command}:`, error);
        return {
            success: false,
            error: error.message || String(error),
            output: error.stdout || error.stderr || '',
        };
    }
}

export async function runPythonBackground(command: string) {
    try {
        if (!command.startsWith('python ')) {
            throw new Error('Only python commands are allowed');
        }

        const cwd = getScriptsCwd();
        console.log(`[Admin Action] Spawning background task: ${command} in ${cwd}`);

        // Use exec with a fire-and-forget pattern instead of spawn
        // The "start /B" prefix on Windows launches the process detached
        const bgCommand = process.platform === 'win32'
            ? `start /B ${command}`
            : `nohup ${command} &`;

        const child = exec(bgCommand, {
            cwd,
            env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
        });

        const pid = child.pid;

        // Detach — don't wait for the process to finish
        child.unref();

        return {
            success: true,
            output: `✅ Started background task: ${command}\n(PID: ${pid})\nThis will run silently in the background for ~20 hours.\nCheck Task Manager to verify the process is running.`,
        };
    } catch (error: any) {
        console.error(`[Admin Action] Failed to spawn background task ${command}:`, error);
        return {
            success: false,
            error: error.message || String(error),
            output: '',
        };
    }
}
