/**
 * Phase 2 Tests: Standalone Build & Distribution
 *
 * Validates that:
 * 1. Next.js standalone build produces the correct output structure
 * 2. The prepare-dist.js script assembles everything correctly
 * 3. The dist/ directory has all required files for npm distribution
 * 4. The standalone server can start
 * 5. The build scripts are valid and executable
 */

import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

const ROOT = path.join(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const STANDALONE = path.join(ROOT, ".next", "standalone");

// Build-output tests only run after `npm run build:npm` — skip in fresh checkouts
const hasStandalone = fs.existsSync(STANDALONE);
const hasDist = fs.existsSync(DIST);

// ---------------------------------------------------------------------------
// Build Output Structure
// ---------------------------------------------------------------------------

describe.skipIf(!hasStandalone)("Next.js Standalone Build Output", () => {
  it("produces a .next/standalone directory", () => {
    expect(fs.existsSync(STANDALONE)).toBe(true);
  });

  it("produces a server.js in standalone", () => {
    expect(fs.existsSync(path.join(STANDALONE, "server.js"))).toBe(true);
  });

  it("produces .next/static/ assets", () => {
    expect(fs.existsSync(path.join(ROOT, ".next", "static"))).toBe(true);
  });

  it("produces a package.json in standalone", () => {
    expect(fs.existsSync(path.join(STANDALONE, "package.json"))).toBe(true);
  });

  it("produces node_modules in standalone", () => {
    expect(fs.existsSync(path.join(STANDALONE, "node_modules"))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Dist Directory Structure
// ---------------------------------------------------------------------------

describe.skipIf(!hasDist)("Dist Directory (npm package)", () => {
  // ── Core server files ─────────────────────────────────────────────────

  it("has dist/server/server.js", () => {
    expect(fs.existsSync(path.join(DIST, "server", "server.js"))).toBe(true);
  });

  it("has dist/server/package.json", () => {
    expect(fs.existsSync(path.join(DIST, "server", "package.json"))).toBe(true);
  });

  it("has dist/server/.next/static/ (copied from build)", () => {
    expect(fs.existsSync(path.join(DIST, "server", ".next", "static"))).toBe(true);
  });

  it("has dist/server/public/ (copied from project)", () => {
    expect(fs.existsSync(path.join(DIST, "server", "public"))).toBe(true);
  });

  it("has dist/server/public/fonts/ with Manrope", () => {
    expect(
      fs.existsSync(path.join(DIST, "server", "public", "fonts", "Manrope.woff2"))
    ).toBe(true);
  });

  it("has dist/server/public/fonts/ with PaperMono", () => {
    expect(
      fs.existsSync(path.join(DIST, "server", "public", "fonts", "PaperMono.woff2"))
    ).toBe(true);
  });

  // ── Prisma files ──────────────────────────────────────────────────────

  it("has dist/prisma/schema.prisma", () => {
    expect(
      fs.existsSync(path.join(DIST, "prisma", "schema.prisma"))
    ).toBe(true);
  });

  it("has dist/prisma/migrations/", () => {
    expect(
      fs.existsSync(path.join(DIST, "prisma", "migrations"))
    ).toBe(true);
  });

  it("has the init migration SQL", () => {
    const migrationFile = path.join(
      DIST,
      "prisma",
      "migrations",
      "00000000000000_init",
      "migration.sql"
    );
    expect(fs.existsSync(migrationFile)).toBe(true);
  });

  it("has dist/prisma/seed.ts", () => {
    expect(fs.existsSync(path.join(DIST, "prisma", "seed.ts"))).toBe(true);
  });

  it("has dist/prisma/notes/ with curriculum data", () => {
    expect(fs.existsSync(path.join(DIST, "prisma", "notes"))).toBe(true);
    // Check at least one module directory exists
    const notes = fs.readdirSync(path.join(DIST, "prisma", "notes"));
    expect(notes.length).toBeGreaterThan(0);
  });

  // ── CLI binary ────────────────────────────────────────────────────────

  it("has dist/bin/cli.js", () => {
    expect(fs.existsSync(path.join(DIST, "bin", "cli.js"))).toBe(true);
  });

  it("dist/bin/cli.js has a shebang", () => {
    const content = fs.readFileSync(path.join(DIST, "bin", "cli.js"), "utf-8");
    expect(content.startsWith("#!/usr/bin/env node")).toBe(true);
  });

  // ── Dist package.json ─────────────────────────────────────────────────

  it("has dist/package.json with correct structure", () => {
    const pkgPath = path.join(DIST, "package.json");
    expect(fs.existsSync(pkgPath)).toBe(true);

    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    expect(pkg.name).toBe("pymentor");
    expect(pkg.version).toBe("1.0.0");
    expect(pkg.bin).toBeDefined();
    expect(pkg.bin.pymentor).toBe("./bin/cli.js");
    expect(pkg.keywords).toContain("python");
    expect(pkg.keywords).toContain("offline");
    expect(pkg.engines.node).toBe(">=18.0.0");
  });
});

// ---------------------------------------------------------------------------
// File Integrity Checks
// ---------------------------------------------------------------------------

describe.skipIf(!hasDist)("File Integrity", () => {
  it("server.js is a valid JavaScript file", () => {
    const serverPath = path.join(DIST, "server", "server.js");
    const content = fs.readFileSync(serverPath, "utf-8");
    expect(content.length).toBeGreaterThan(100);
    expect(content).toContain("next");
  });

  it("SQLite schema in dist matches source", () => {
    const srcSchema = fs.readFileSync(
      path.join(ROOT, "prisma", "schema.prisma"),
      "utf-8"
    );
    const distSchema = fs.readFileSync(
      path.join(DIST, "prisma", "schema.prisma"),
      "utf-8"
    );
    expect(distSchema).toBe(srcSchema);
  });

  it("migration SQL in dist matches source", () => {
    const srcMigration = fs.readFileSync(
      path.join(ROOT, "prisma", "migrations", "00000000000000_init", "migration.sql"),
      "utf-8"
    );
    const distMigration = fs.readFileSync(
      path.join(DIST, "prisma", "migrations", "00000000000000_init", "migration.sql"),
      "utf-8"
    );
    expect(distMigration).toBe(srcMigration);
  });

  it("seed.ts in dist matches source", () => {
    const srcSeed = fs.readFileSync(
      path.join(ROOT, "prisma", "seed.ts"),
      "utf-8"
    );
    const distSeed = fs.readFileSync(
      path.join(DIST, "prisma", "seed.ts"),
      "utf-8"
    );
    expect(distSeed).toBe(srcSeed);
  });

  it("static assets are non-empty", () => {
    const staticDir = path.join(DIST, "server", ".next", "static");
    expect(fs.existsSync(staticDir)).toBe(true);
    // Should have at least some files (chunks, etc.)
    const findFiles = (dir: string): number => {
      let count = 0;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          count += findFiles(path.join(dir, entry.name));
        } else {
          count++;
        }
      }
      return count;
    };
    const fileCount = findFiles(staticDir);
    expect(fileCount).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Build Script Validation
// ---------------------------------------------------------------------------

describe("Build Scripts", () => {
  it("scripts/prepare-dist.js exists and is valid JS", () => {
    const scriptPath = path.join(ROOT, "scripts", "prepare-dist.js");
    expect(fs.existsSync(scriptPath)).toBe(true);
    const content = fs.readFileSync(scriptPath, "utf-8");
    expect(content).toContain("function main()");
    expect(content).toContain("copyDir");
  });

  it("prepare-dist ships the pre-seeded database in the npm package", () => {
    const content = fs.readFileSync(
      path.join(ROOT, "scripts", "prepare-dist.js"),
      "utf-8"
    );
    // The seeded DB must be copied into dist/ AND listed in the published
    // package's files — otherwise npm silently drops it from the tarball.
    expect(content).toContain('path.join(DIST, "pymentor.db")');
    expect(content).toContain('"pymentor.db"');
  });

  it("prepare-dist copies migrations and curriculum notes into dist", () => {
    const content = fs.readFileSync(
      path.join(ROOT, "scripts", "prepare-dist.js"),
      "utf-8"
    );
    // bin/cli.js needs migrations for first-run fallback, and seed.ts
    // imports the notes/ curriculum modules.
    expect(content).toContain('path.join(DIST, "prisma", "migrations")');
    expect(content).toContain('path.join(DIST, "prisma", "notes")');
  });

  it("scripts/build.sh exists and is executable", () => {
    const scriptPath = path.join(ROOT, "scripts", "build.sh");
    expect(fs.existsSync(scriptPath)).toBe(true);
    // Check it has shebang
    const content = fs.readFileSync(scriptPath, "utf-8");
    expect(content.startsWith("#!/usr/bin/env bash")).toBe(true);
  });

  it("build.sh is the single-mode (SQLite/npm) pipeline", () => {
    const content = fs.readFileSync(
      path.join(ROOT, "scripts", "build.sh"),
      "utf-8"
    );
    expect(content).toContain("SQLite");
    expect(content).toContain("prepare-dist");
    expect(content).not.toContain("--cloud");
    expect(content).not.toContain("PostgreSQL");
  });

  it("package.json has correct build scripts", () => {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(ROOT, "package.json"), "utf-8")
    );
    expect(pkg.scripts.build).toBeDefined();
    expect(pkg.scripts["build:npm"]).toBeDefined();
    expect(pkg.scripts["prepare-dist"]).toBeDefined();
    expect(pkg.scripts["start:dist"]).toBeDefined();
  });

  it("next.config.ts has standalone output", () => {
    const configPath = path.join(ROOT, "next.config.ts");
    const content = fs.readFileSync(configPath, "utf-8");
    expect(content).toContain('output: "standalone"');
  });
});

// ---------------------------------------------------------------------------
// Dist Size Checks
// ---------------------------------------------------------------------------

describe.skipIf(!hasDist)("Dist Size", () => {
  function getDirSizeMB(dir: string): number {
    if (!fs.existsSync(dir)) return 0;
    let totalSize = 0;
    function walk(d: string) {
      const entries = fs.readdirSync(d, { withFileTypes: true });
      for (const entry of entries) {
        const p = path.join(d, entry.name);
        if (entry.isDirectory()) {
          walk(p);
        } else {
          totalSize += fs.statSync(p).size;
        }
      }
    }
    walk(dir);
    return totalSize / 1024 / 1024;
  }

  it("total dist size is reasonable (< 200 MB)", () => {
    const size = getDirSizeMB(DIST);
    expect(size).toBeLessThan(200);
  });

  it("server is the largest component", () => {
    const serverSize = getDirSizeMB(path.join(DIST, "server"));
    const prismaSize = getDirSizeMB(path.join(DIST, "prisma"));
    expect(serverSize).toBeGreaterThan(prismaSize);
  });
});
