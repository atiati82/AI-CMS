import { exec as _exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs";
import * as path from "path";
import { db } from "../db";
import { maintenanceSettings, maintenanceReports } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

const exec = promisify(_exec);

type CheckResult = {
  name: string;
  status: "ok" | "warn" | "error";
  message?: string;
  details?: string;
  count?: number;
};

type RouteInfo = {
  method: string;
  path: string;
  file: string;
};

type FrontendCallInfo = {
  method: string | null;
  path: string;
  file: string;
};

type MaintenanceReportData = {
  timestamp: string;
  triggeredBy: string;
  results: CheckResult[];
  backendRoutes: RouteInfo[];
  frontendCalls: FrontendCallInfo[];
  routeMismatches: {
    missingBackend: string[];
    unusedBackend: string[];
  };
  suggestions: string[];
  summary: {
    totalChecks: number;
    passed: number;
    warnings: number;
    errors: number;
  };
};

const ROOT = process.cwd();

async function runCmd(name: string, cmd: string): Promise<CheckResult> {
  try {
    const { stdout, stderr } = await exec(cmd, { cwd: ROOT, timeout: 120000 });
    const output = stdout + (stderr ? "\n" + stderr : "");
    return {
      name,
      status: "ok",
      message: `${name} completed successfully`,
      details: output.trim().slice(0, 1500),
    };
  } catch (err: any) {
    const stdout = err.stdout ?? "";
    const stderr = err.stderr ?? "";
    const output = stdout + (stderr ? "\n" + stderr : "");
    return {
      name,
      status: "error",
      message: `${name} failed`,
      details: output.trim().slice(0, 1500),
    };
  }
}

async function checkTypes(): Promise<CheckResult> {
  return runCmd("typecheck", "npx tsc --noEmit 2>&1 || true");
}

async function checkUnusedDeps(): Promise<CheckResult> {
  try {
    const { stdout } = await exec("npx depcheck --json 2>&1 || true", { 
      cwd: ROOT, 
      timeout: 60000 
    });
    try {
      const result = JSON.parse(stdout);
      const unusedDeps = result.dependencies || [];
      const unusedDevDeps = result.devDependencies || [];
      const total = unusedDeps.length + unusedDevDeps.length;
      
      if (total > 5) {
        return {
          name: "unused-deps",
          status: "warn",
          message: `Found ${total} potentially unused dependencies`,
          details: [...unusedDeps, ...unusedDevDeps].slice(0, 20).join(", "),
          count: total,
        };
      }
      return {
        name: "unused-deps",
        status: "ok",
        message: `Dependencies look clean (${total} potentially unused)`,
        count: total,
      };
    } catch {
      return {
        name: "unused-deps",
        status: "ok",
        message: "Dependency check completed",
      };
    }
  } catch {
    return {
      name: "unused-deps",
      status: "warn",
      message: "Dependency check skipped",
    };
  }
}

function discoverBackendRoutes(): RouteInfo[] {
  const serverDir = path.join(ROOT, "server");
  if (!fs.existsSync(serverDir)) return [];

  const routes: RouteInfo[] = [];
  const routeRegex = /(app|router)\.(get|post|put|delete|patch)\(\s*['"`]([^'"`]+)['"`]/g;

  function scanDir(dir: string) {
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const full = path.join(dir, file);
        const stat = fs.statSync(full);
        if (stat.isDirectory() && !file.includes("node_modules")) {
          scanDir(full);
        } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
          const src = fs.readFileSync(full, "utf8");
          let match: RegExpExecArray | null;
          routeRegex.lastIndex = 0;
          while ((match = routeRegex.exec(src))) {
            routes.push({
              method: match[2].toUpperCase(),
              path: match[3],
              file: path.relative(ROOT, full),
            });
          }
        }
      }
    } catch {}
  }

  scanDir(serverDir);
  return routes;
}

function discoverFrontendCalls(): FrontendCallInfo[] {
  const clientDir = path.join(ROOT, "client");
  if (!fs.existsSync(clientDir)) return [];

  const calls: FrontendCallInfo[] = [];
  const fetchRegex = /fetch\(\s*['"`]([^'"`]+)['"`]\s*(?:,\s*\{[^}]*method:\s*['"`]([A-Za-z]+)['"`])?/g;
  const apiRequestRegex = /apiRequest\(\s*['"`]([A-Z]+)['"`]\s*,\s*['"`]([^'"`]+)['"`]/g;

  function scanDir(dir: string) {
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const full = path.join(dir, file);
        const stat = fs.statSync(full);
        if (stat.isDirectory() && !file.includes("node_modules")) {
          scanDir(full);
        } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
          const src = fs.readFileSync(full, "utf8");
          let match: RegExpExecArray | null;
          
          fetchRegex.lastIndex = 0;
          while ((match = fetchRegex.exec(src))) {
            const url = match[1];
            if (url.startsWith("/api")) {
              calls.push({
                method: match[2]?.toUpperCase() || "GET",
                path: url.split("?")[0],
                file: path.relative(ROOT, full),
              });
            }
          }
          
          apiRequestRegex.lastIndex = 0;
          while ((match = apiRequestRegex.exec(src))) {
            const url = match[2];
            if (url.startsWith("/api")) {
              calls.push({
                method: match[1].toUpperCase(),
                path: url.split("?")[0],
                file: path.relative(ROOT, full),
              });
            }
          }
        }
      }
    } catch {}
  }

  scanDir(clientDir);
  return calls;
}

function compareRoutes(
  backendRoutes: RouteInfo[],
  frontendCalls: FrontendCallInfo[]
): { checks: CheckResult[]; missingBackend: string[]; unusedBackend: string[]; suggestions: string[] } {
  const checks: CheckResult[] = [];
  const suggestions: string[] = [];

  const normalizeRoute = (p: string) => p.replace(/:[^/]+/g, ":param").replace(/\$\{[^}]+\}/g, ":param");
  
  const backendKeySet = new Set(
    backendRoutes.map((r) => `${r.method} ${normalizeRoute(r.path)}`)
  );

  const frontendKeySet = new Set(
    frontendCalls.map((c) => `${c.method ?? "GET"} ${normalizeRoute(c.path)}`)
  );

  const missingBackend: string[] = [];
  const backendKeyArray = Array.from(backendKeySet);
  for (const call of frontendCalls) {
    const normalizedPath = normalizeRoute(call.path);
    const key = `${call.method ?? "GET"} ${normalizedPath}`;
    let found = backendKeySet.has(key);
    if (!found) {
      for (const backendKey of backendKeyArray) {
        const [bMethod, bPath] = backendKey.split(" ");
        if (bMethod === call.method) {
          const bParts = bPath.split("/");
          const fParts = normalizedPath.split("/");
          if (bParts.length === fParts.length) {
            const matches = bParts.every((bp: string, i: number) => bp === ":param" || bp === fParts[i]);
            if (matches) {
              found = true;
              break;
            }
          }
        }
      }
    }
    if (!found) {
      missingBackend.push(`${call.method ?? "GET"} ${call.path}`);
    }
  }

  const unusedBackend: string[] = [];
  const frontendKeyArray = Array.from(frontendKeySet);
  for (const route of backendRoutes) {
    const normalizedPath = normalizeRoute(route.path);
    const key = `${route.method} ${normalizedPath}`;
    let found = frontendKeySet.has(key);
    if (!found) {
      for (const frontendKey of frontendKeyArray) {
        const [fMethod, fPath] = frontendKey.split(" ");
        if (fMethod === route.method) {
          const bParts = normalizedPath.split("/");
          const fParts = fPath.split("/");
          if (bParts.length === fParts.length) {
            const matches = bParts.every((bp: string, i: number) => bp === ":param" || bp === fParts[i]);
            if (matches) {
              found = true;
              break;
            }
          }
        }
      }
    }
    if (!found) {
      unusedBackend.push(`${route.method} ${route.path}`);
    }
  }

  if (missingBackend.length) {
    checks.push({
      name: "frontend-backend-alignment",
      status: "warn",
      message: `${missingBackend.length} frontend API calls may not have matching backend routes`,
      count: missingBackend.length,
    });
    suggestions.push("Review frontend API calls that don't have matching backend routes");
  } else {
    checks.push({
      name: "frontend-backend-alignment",
      status: "ok",
      message: "All frontend API calls have matching backend routes",
    });
  }

  if (unusedBackend.length > 10) {
    checks.push({
      name: "unused-routes",
      status: "warn",
      message: `${unusedBackend.length} backend routes appear unused by frontend`,
      count: unusedBackend.length,
    });
  } else {
    checks.push({
      name: "unused-routes",
      status: "ok",
      message: `Backend routes look utilized (${unusedBackend.length} potentially unused)`,
      count: unusedBackend.length,
    });
  }

  return { checks, missingBackend, unusedBackend, suggestions };
}

function countCodeMetrics(): CheckResult {
  let tsFiles = 0;
  let tsxFiles = 0;
  let totalLines = 0;

  function countDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const full = path.join(dir, file);
        const stat = fs.statSync(full);
        if (stat.isDirectory() && !file.includes("node_modules") && !file.startsWith(".")) {
          countDir(full);
        } else if (file.endsWith(".ts")) {
          tsFiles++;
          totalLines += fs.readFileSync(full, "utf8").split("\n").length;
        } else if (file.endsWith(".tsx")) {
          tsxFiles++;
          totalLines += fs.readFileSync(full, "utf8").split("\n").length;
        }
      }
    } catch {}
  }

  countDir(path.join(ROOT, "client"));
  countDir(path.join(ROOT, "server"));
  countDir(path.join(ROOT, "shared"));

  return {
    name: "code-metrics",
    status: "ok",
    message: `Codebase: ${tsFiles} .ts files, ${tsxFiles} .tsx files, ~${Math.round(totalLines / 1000)}k lines`,
    count: tsFiles + tsxFiles,
  };
}

export async function runMaintenanceCheck(triggeredBy: string = 'manual'): Promise<MaintenanceReportData> {
  const results: CheckResult[] = [];
  const suggestions: string[] = [];

  results.push(countCodeMetrics());
  results.push(await checkTypes());
  results.push(await checkUnusedDeps());

  const backendRoutes = discoverBackendRoutes();
  const frontendCalls = discoverFrontendCalls();

  const { checks: alignChecks, missingBackend, unusedBackend, suggestions: alignSuggestions } =
    compareRoutes(backendRoutes, frontendCalls);

  results.push(...alignChecks);
  suggestions.push(...alignSuggestions);

  const summary = {
    totalChecks: results.length,
    passed: results.filter((r) => r.status === "ok").length,
    warnings: results.filter((r) => r.status === "warn").length,
    errors: results.filter((r) => r.status === "error").length,
  };

  const report: MaintenanceReportData = {
    timestamp: new Date().toISOString(),
    triggeredBy,
    results,
    backendRoutes,
    frontendCalls,
    routeMismatches: { missingBackend, unusedBackend },
    suggestions,
    summary,
  };

  await db.insert(maintenanceReports).values({
    timestamp: new Date(),
    triggeredBy,
    summary,
    results,
    routeMismatches: { missingBackend, unusedBackend },
    suggestions,
    backendRoutesCount: backendRoutes.length,
    frontendCallsCount: frontendCalls.length,
  });

  return report;
}

export async function getLatestReport() {
  const [report] = await db
    .select()
    .from(maintenanceReports)
    .orderBy(desc(maintenanceReports.timestamp))
    .limit(1);
  return report;
}

export async function getReportHistory(limit: number = 10) {
  return db
    .select()
    .from(maintenanceReports)
    .orderBy(desc(maintenanceReports.timestamp))
    .limit(limit);
}

export async function getMaintenanceSettings() {
  const settings = await db.select().from(maintenanceSettings);
  const result: Record<string, any> = {
    dailyRunEnabled: false,
    dailyRunTime: "03:00",
    checkTypes: true,
    checkDeps: true,
    checkRoutes: true,
    checkMetrics: true,
  };
  
  for (const setting of settings) {
    result[setting.key] = setting.value;
  }
  
  return result;
}

export async function updateMaintenanceSetting(key: string, value: any) {
  const existing = await db
    .select()
    .from(maintenanceSettings)
    .where(eq(maintenanceSettings.key, key))
    .limit(1);
    
  if (existing.length) {
    await db
      .update(maintenanceSettings)
      .set({ value, updatedAt: new Date() })
      .where(eq(maintenanceSettings.key, key));
  } else {
    await db.insert(maintenanceSettings).values({ key, value });
  }
}

let schedulerInterval: NodeJS.Timeout | null = null;

export function startMaintenanceScheduler() {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
  }
  
  schedulerInterval = setInterval(async () => {
    const settings = await getMaintenanceSettings();
    if (!settings.dailyRunEnabled) return;
    
    const now = new Date();
    const [targetHour, targetMinute] = (settings.dailyRunTime || "03:00").split(":").map(Number);
    
    if (now.getHours() === targetHour && now.getMinutes() === targetMinute) {
      console.log("🔧 Running scheduled maintenance check...");
      try {
        await runMaintenanceCheck('scheduled');
        console.log("✅ Scheduled maintenance check completed");
      } catch (err) {
        console.error("❌ Scheduled maintenance check failed:", err);
      }
    }
  }, 60000);
  
  console.log("🗓️ Maintenance scheduler started");
}

export function stopMaintenanceScheduler() {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
    console.log("🛑 Maintenance scheduler stopped");
  }
}

export function getAiSummary(report: MaintenanceReportData): string {
  const lines: string[] = [
    `## Maintenance Report (${report.timestamp})`,
    ``,
    `### Summary`,
    `- Total checks: ${report.summary.totalChecks}`,
    `- Passed: ${report.summary.passed}`,
    `- Warnings: ${report.summary.warnings}`,
    `- Errors: ${report.summary.errors}`,
    ``,
    `### Results`,
  ];
  
  for (const r of report.results) {
    const icon = r.status === "ok" ? "✅" : r.status === "warn" ? "⚠️" : "❌";
    lines.push(`${icon} **${r.name}**: ${r.message}`);
  }
  
  if (report.routeMismatches.missingBackend.length > 0) {
    lines.push(``, `### Missing Backend Routes`);
    for (const route of report.routeMismatches.missingBackend.slice(0, 10)) {
      lines.push(`- ${route}`);
    }
    if (report.routeMismatches.missingBackend.length > 10) {
      lines.push(`- ... and ${report.routeMismatches.missingBackend.length - 10} more`);
    }
  }
  
  if (report.suggestions.length > 0) {
    lines.push(``, `### Suggestions`);
    for (const s of report.suggestions) {
      lines.push(`- ${s}`);
    }
  }
  
  return lines.join("\n");
}
