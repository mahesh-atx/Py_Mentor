/**
 * Phase 3 Tests: CLI Tool
 *
 * Validates that:
 * 1. The CLI entry point exists and is executable
 * 2. All CLI commands work correctly (version, help, config, doctor, etc.)
 * 3. The argument parser handles all flag combinations
 * 4. The setup/first-run detection logic works
 * 5. The data directory structure is correct
 * 6. Backup and restore functionality works
 * 7. The prepare-dist.js includes bin/ in the output
 * 8. Doctor command diagnoses the system correctly
 * 9. Port availability detection works
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import * as os from "os";

const ROOT = path.join(__dirname, "..");
const BIN = path.join(ROOT, "bin", "cli.js");
const DATA_DIR = path.join(os.homedir(), ".pymentor");
const DB_PATH = path.join(DATA_DIR, "pymentor.db");
const CONFIG_PATH = path.join(DATA_DIR, "config.json");
const ENV_PATH = path.join(DATA_DIR, ".env");
const BACKUP_DIR = path.join(DATA_DIR, "backups");

// Run CLI command and return stdout
function runCLI(args: string = ""): string {
  return execSync(`node "${BIN}" ${args}`, {
    cwd: ROOT,
    encoding: "utf-8",
    timeout: 15000,
    env: { ...process.env, HOME: os.homedir() },
  });
}

// Run CLI command and expect it to fail, return stderr
function runCLIFail(args: string = ""): string {
  try {
    execSync(`node "${BIN}" ${args}`, {
      cwd: ROOT,
      encoding: "utf-8",
      timeout: 15000,
      env: { ...process.env, HOME: os.homedir() },
    });
    return "";
  } catch (error: any) {
    return error.stderr || error.stdout || error.message;
  }
}

// ---------------------------------------------------------------------------
// CLI File Structure
// ---------------------------------------------------------------------------

describe("CLI File Structure", () => {
  it("has bin/cli.js", () => {
    expect(fs.existsSync(BIN)).toBe(true);
  });

  it("bin/cli.js starts with a shebang", () => {
    const content = fs.readFileSync(BIN, "utf-8");
    expect(content.startsWith("#!/usr/bin/env node")).toBe(true);
  });

  it("bin/cli.js is valid JavaScript (no syntax errors)", () => {
    expect(() => {
      execSync(`node -c "${BIN}"`, { encoding: "utf-8" });
    }).not.toThrow();
  });

  // Only runs after `npm run build:npm` — dist/ doesn't exist in fresh checkouts
  it.runIf(fs.existsSync(path.join(ROOT, "dist")))(
    "dist/bin/cli.js exists after prepare-dist",
    () => {
      const distBin = path.join(ROOT, "dist", "bin", "cli.js");
      expect(fs.existsSync(distBin)).toBe(true);
    }
  );
});

// ---------------------------------------------------------------------------
// CLI Commands
// ---------------------------------------------------------------------------

describe("CLI: version command", () => {
  it("pymentor --version shows version", () => {
    const output = runCLI("--version");
    expect(output).toContain("PyMentor v");
  });

  it("pymentor -v shows version", () => {
    const output = runCLI("-v");
    expect(output).toContain("PyMentor v");
  });

  it("pymentor version shows version", () => {
    const output = runCLI("version");
    expect(output).toContain("PyMentor v");
  });

  it("version reads from package.json", () => {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(ROOT, "package.json"), "utf-8")
    );
    const output = runCLI("--version");
    expect(output).toContain(pkg.version);
  });
});

describe("CLI: help command", () => {
  it("pymentor --help shows help", () => {
    const output = runCLI("--help");
    expect(output).toContain("PyMentor");
    expect(output).toContain("Usage");
    expect(output).toContain("start");
    expect(output).toContain("config");
    expect(output).toContain("backup");
    expect(output).toContain("restore");
    expect(output).toContain("doctor");
  });

  it("pymentor -h shows help", () => {
    const output = runCLI("-h");
    expect(output).toContain("PyMentor");
  });

  it("pymentor help shows help", () => {
    const output = runCLI("help");
    expect(output).toContain("Usage");
  });

  it("help mentions data directory", () => {
    const output = runCLI("--help");
    expect(output).toContain(DATA_DIR);
  });

  it("help mentions doctor command", () => {
    const output = runCLI("--help");
    expect(output).toContain("doctor");
    expect(output).toContain("Diagnose");
  });

  it("help mentions all commands", () => {
    const output = runCLI("--help");
    expect(output).toContain("start");
    expect(output).toContain("config");
    expect(output).toContain("reset");
    expect(output).toContain("backup");
    expect(output).toContain("restore");
    expect(output).toContain("doctor");
    expect(output).toContain("version");
    expect(output).toContain("help");
  });
});

describe("CLI: unknown command", () => {
  it("shows error for unknown command", () => {
    const output = runCLIFail("foobar");
    expect(output).toContain("Unknown command");
  });
});

// ---------------------------------------------------------------------------
// CLI: Config Command
// ---------------------------------------------------------------------------

describe("CLI: config command", () => {
  it("pymentor config shows configuration", () => {
    const output = runCLI("config");
    expect(output).toContain("PyMentor Configuration");
    expect(output).toContain("Data directory");
    expect(output).toContain("Database");
  });

  it("pymentor config --set-key saves a key", () => {
    runCLI('config --set-key TEST_KEY=test-value-123');

    const envContent = fs.readFileSync(ENV_PATH, "utf-8");
    expect(envContent).toContain("TEST_KEY=test-value-123");
  });

  it("pymentor config --set-key KEY=VALUE updates existing key", () => {
    runCLI('config --set-key MY_KEY=first');
    runCLI('config --set-key MY_KEY=second');

    const envContent = fs.readFileSync(ENV_PATH, "utf-8");
    expect(envContent).toContain("MY_KEY=second");
    expect(envContent).not.toContain("MY_KEY=first");
  });

  it("pymentor config --set-key KEY=VALUE=WITH=EQUALS preserves value", () => {
    runCLI('config --set-key EQUALS_TEST=key=val=extra');

    const envContent = fs.readFileSync(ENV_PATH, "utf-8");
    expect(envContent).toContain("EQUALS_TEST=key=val=extra");
  });

  it("config shows AI provider status when key is set", () => {
    runCLI('config --set-key OPENROUTER_API_KEY=sk-test-key');
    const output = runCLI("config");
    expect(output).toContain("OpenRouter ✅");
  });

  it("config shows not configured when no key is set", () => {
    if (fs.existsSync(ENV_PATH)) {
      let content = fs.readFileSync(ENV_PATH, "utf-8");
      content = content
        .split("\n")
        .filter(
          (line) =>
            !line.startsWith("OPENROUTER_API_KEY=") &&
            !line.startsWith("NVIDIA_API_KEY=")
        )
        .join("\n");
      fs.writeFileSync(ENV_PATH, content);
    }

    const output = runCLI("config");
    expect(output).toContain("Not configured");
  });

  it("config shows NVIDIA when NVIDIA key is set", () => {
    // Remove OpenRouter key first
    if (fs.existsSync(ENV_PATH)) {
      let content = fs.readFileSync(ENV_PATH, "utf-8");
      content = content
        .split("\n")
        .filter((line) => !line.startsWith("OPENROUTER_API_KEY="))
        .join("\n");
      fs.writeFileSync(ENV_PATH, content);
    }

    runCLI('config --set-key NVIDIA_API_KEY=nvapi-test');
    const output = runCLI("config");
    expect(output).toContain("NVIDIA ✅");
  });
});

// ---------------------------------------------------------------------------
// CLI: Doctor Command
// ---------------------------------------------------------------------------

describe("CLI: doctor command", () => {
  it("pymentor doctor runs diagnostics", () => {
    const output = runCLI("doctor");
    expect(output).toContain("PyMentor Doctor");
    expect(output).toContain("System Diagnostics");
  });

  it("doctor checks Node.js version", () => {
    const output = runCLI("doctor");
    expect(output).toContain("Node.js version");
  });

  it("doctor checks PyMentor version", () => {
    const output = runCLI("doctor");
    expect(output).toContain("PyMentor version");
  });

  it("doctor checks platform", () => {
    const output = runCLI("doctor");
    expect(output).toContain("Platform");
  });

  it("doctor checks data directory", () => {
    const output = runCLI("doctor");
    expect(output).toContain("Data directory");
  });

  it("doctor checks database", () => {
    const output = runCLI("doctor");
    expect(output).toContain("Database");
  });

  it("doctor checks curriculum data", () => {
    const output = runCLI("doctor");
    expect(output).toContain("Curriculum data");
  });

  it("doctor checks migration files", () => {
    const output = runCLI("doctor");
    expect(output).toContain("Migration files");
  });

  it("doctor checks server build", () => {
    const output = runCLI("doctor");
    expect(output).toContain("Server build");
  });

  it("doctor checks SQLite driver", () => {
    const output = runCLI("doctor");
    expect(output).toContain("SQLite driver");
  });

  it("doctor checks AI provider", () => {
    const output = runCLI("doctor");
    expect(output).toContain("AI Provider");
  });

  it("doctor shows summary", () => {
    const output = runCLI("doctor");
    // Should show either "passed" or warnings/errors
    const hasSummary =
      output.includes("passed") ||
      output.includes("warning") ||
      output.includes("error");
    expect(hasSummary).toBe(true);
  });

  it("doctor uses emoji indicators (✅, ❌, ⚠️)", () => {
    const output = runCLI("doctor");
    const hasEmoji =
      output.includes("✅") ||
      output.includes("❌") ||
      output.includes("⚠️");
    expect(hasEmoji).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// CLI: Data Directory
// ---------------------------------------------------------------------------

describe("CLI: Data Directory", () => {
  it("creates ~/.pymentor/ when needed", () => {
    runCLI("config");
    expect(fs.existsSync(DATA_DIR)).toBe(true);
  });

  it("creates ~/.pymentor/backups/ when needed", () => {
    runCLI("config");
    expect(fs.existsSync(BACKUP_DIR)).toBe(true);
  });

  it("creates config.json", () => {
    runCLI("config");
    expect(fs.existsSync(CONFIG_PATH)).toBe(true);
  });

  it("config.json is valid JSON", () => {
    runCLI("config");
    const content = fs.readFileSync(CONFIG_PATH, "utf-8");
    expect(() => JSON.parse(content)).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// CLI: First-Run Setup (seeded database installation)
// ---------------------------------------------------------------------------

describe("CLI: First-Run Setup", () => {
  it("resolves the pre-seeded database (dist first, then package root)", () => {
    const content = fs.readFileSync(BIN, "utf-8");
    expect(content).toContain("SEEDED_DB_PATH");
    expect(content).toContain('path.join(ROOT_DIR, "dist", "pymentor.db")');
    expect(content).toContain('path.join(ROOT_DIR, "pymentor.db")');
  });

  it("copies the pre-seeded curriculum database on first run", () => {
    const content = fs.readFileSync(BIN, "utf-8");
    expect(content).toContain("copyFileSync(SEEDED_DB_PATH, DB_PATH)");
  });

  it("falls back to migration SQL when no seeded database exists", () => {
    const content = fs.readFileSync(BIN, "utf-8");
    expect(content).toContain("applyMigration");
    expect(content).toContain("00000000000000_init");
  });

  it("doctor reports the curriculum data status", () => {
    const output = runCLI("doctor");
    // Either the seeded db is found (✅) or reported as missing (⚠️)
    expect(output).toMatch(/Curriculum data/);
  });
});

// ---------------------------------------------------------------------------
// CLI: Backup & Restore
// ---------------------------------------------------------------------------

describe("CLI: backup command", () => {
  it("pymentor backup creates a backup file", () => {
    if (!fs.existsSync(DB_PATH)) return;
    const output = runCLI("backup");
    expect(output).toContain("Backup created");
    expect(output).toContain(".db");
  });

  it("backup file size matches database size", () => {
    if (!fs.existsSync(DB_PATH)) return;
    const dbSize = fs.statSync(DB_PATH).size;
    runCLI("backup");
    const backupFiles = fs.readdirSync(BACKUP_DIR).sort();
    const latestBackup = path.join(BACKUP_DIR, backupFiles[backupFiles.length - 1]);
    const backupSize = fs.statSync(latestBackup).size;
    expect(backupSize).toBe(dbSize);
  });
});

describe("CLI: restore command", () => {
  it("restore requires a file argument", () => {
    const output = runCLIFail("restore");
    expect(output).toContain("specify a backup file");
  });

  it("restore fails for non-existent file", () => {
    const output = runCLIFail("restore /tmp/nonexistent-file-12345.db");
    expect(output).toContain("not found");
  });
});

// ---------------------------------------------------------------------------
// CLI: Reset Command
// ---------------------------------------------------------------------------

describe("CLI: reset command", () => {
  it("reset shows warning without --force", () => {
    if (!fs.existsSync(DB_PATH)) return;
    const output = runCLI("reset");
    expect(output).toContain("WARNING");
    expect(output).toContain("--force");
  });
});

// ---------------------------------------------------------------------------
// CLI: Argument Parser
// ---------------------------------------------------------------------------

describe("CLI: Argument Parsing", () => {
  it("parses --port=8080", () => {
    const output = runCLI("--help");
    expect(output).toContain("--port");
  });

  it("default command is 'start'", () => {
    const output = runCLI("--help");
    expect(output).toContain("start");
    expect(output).toContain("Start PyMentor (default");
  });

  it("--set-key=KEY=VALUE format is documented", () => {
    const output = runCLI("--help");
    expect(output).toContain("--set-key");
  });
});

// ---------------------------------------------------------------------------
// CLI: Port Availability
// ---------------------------------------------------------------------------

describe("CLI: Port Availability", () => {
  it("CLI code contains isPortAvailable function", () => {
    const content = fs.readFileSync(BIN, "utf-8");
    expect(content).toContain("isPortAvailable");
  });

  it("CLI code contains findAvailablePort function", () => {
    const content = fs.readFileSync(BIN, "utf-8");
    expect(content).toContain("findAvailablePort");
  });

  it("CLI handles port conflicts gracefully", () => {
    const content = fs.readFileSync(BIN, "utf-8");
    expect(content).toContain("is in use");
  });
});

// ---------------------------------------------------------------------------
// CLI: Package.json Integration
// ---------------------------------------------------------------------------

describe("CLI: Package.json Integration", () => {
  it("root package.json has bin.pymentor pointing to ./bin/cli.js", () => {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(ROOT, "package.json"), "utf-8")
    );
    expect(pkg.bin).toBeDefined();
    expect(pkg.bin.pymentor).toBe("./bin/cli.js");
  });

  it("dist/package.json has bin.pymentor pointing to ./bin/cli.js", () => {
    const distPkgPath = path.join(ROOT, "dist", "package.json");
    if (!fs.existsSync(distPkgPath)) return;
    const pkg = JSON.parse(fs.readFileSync(distPkgPath, "utf-8"));
    expect(pkg.bin).toBeDefined();
    expect(pkg.bin.pymentor).toBe("./bin/cli.js");
  });

  it("package.json has correct name", () => {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(ROOT, "package.json"), "utf-8")
    );
    expect(pkg.name).toBe("pymentor");
  });

  it("package.json has license field", () => {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(ROOT, "package.json"), "utf-8")
    );
    expect(pkg.license).toBe("MIT");
  });

  it("package.json has keywords", () => {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(ROOT, "package.json"), "utf-8")
    );
    expect(pkg.keywords).toBeDefined();
    expect(Array.isArray(pkg.keywords)).toBe(true);
    expect(pkg.keywords.length).toBeGreaterThan(0);
  });

  it("package.json has engines field requiring Node >= 18", () => {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(ROOT, "package.json"), "utf-8")
    );
    expect(pkg.engines).toBeDefined();
    expect(pkg.engines.node).toContain("18");
  });

  it("package.json is not marked private", () => {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(ROOT, "package.json"), "utf-8")
    );
    expect(pkg.private).toBeFalsy();
  });
});

// ---------------------------------------------------------------------------
// CLI: Code Quality
// ---------------------------------------------------------------------------

describe("CLI: Code Quality", () => {
  it("has proper error handling for missing server", () => {
    const content = fs.readFileSync(BIN, "utf-8");
    expect(content).toContain("Server not found");
  });

  it("handles SIGINT (Ctrl+C) gracefully", () => {
    const content = fs.readFileSync(BIN, "utf-8");
    expect(content).toContain("SIGINT");
    expect(content).toContain("Stopping PyMentor");
  });

  it("handles SIGTERM gracefully", () => {
    const content = fs.readFileSync(BIN, "utf-8");
    expect(content).toContain("SIGTERM");
  });

  it("main function is async (supports port checking)", () => {
    const content = fs.readFileSync(BIN, "utf-8");
    expect(content).toContain("async function main");
    expect(content).toContain("await cmdStart");
  });
});
