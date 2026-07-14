#!/usr/bin/env node

/**
 * prepare-dist.js — Post-build script for npm distribution
 *
 * After `next build` with `output: "standalone"`, Next.js produces:
 *   .next/standalone/    → self-contained server + minimal node_modules
 *   .next/static/        → static JS/CSS assets (NOT included in standalone)
 *   public/              → public assets like fonts, images (NOT included)
 *
 * This script assembles everything into a `dist/` directory ready for
 * npm packaging:
 *
 *   dist/
 *   ├── server/               → The standalone Next.js server
 *   │   ├── server.js         → Entry point
 *   │   ├── .next/
 *   │   │   └── static/       → Copied from .next/static
 *   │   ├── node_modules/     → Minimal deps (only what's needed to run)
 *   │   └── package.json      → Minimal package.json
 *   ├── prisma/
 *   │   ├── schema.sqlite.prisma  → SQLite schema
 *   │   └── migrations.sqlite/    → SQLite migrations
 *   ├── public/               → Static assets (fonts, images)
 *   └── seed/                 → Pre-compiled seed script
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DIST = path.join(ROOT, "dist");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Recursively copy a directory, handling symlinks and special files */
function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`⚠️  Source directory not found: ${src}`);
    return;
  }

  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isSymbolicLink()) {
      // Copy symlink as-is
      const linkTarget = fs.readlinkSync(srcPath);
      fs.symlinkSync(linkTarget, destPath);
    } else if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
    // Skip other types (block devices, sockets, etc.)
  }
}

/** Copy a single file, creating parent directories as needed */
function copyFile(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`⚠️  Source file not found: ${src}`);
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

/** Remove a directory recursively */
function rmDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

/** Get the size of a directory in MB */
function getDirSizeMB(dir) {
  if (!fs.existsSync(dir)) return 0;
  let totalSize = 0;
  function walk(d) {
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
  return (totalSize / 1024 / 1024).toFixed(1);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log("\n📦 Preparing dist/ for npm distribution...\n");

  // ── Clean previous dist ──────────────────────────────────────────────
  rmDir(DIST);
  fs.mkdirSync(DIST, { recursive: true });

  // ── 1. Copy standalone server ────────────────────────────────────────
  const standaloneDir = path.join(ROOT, ".next", "standalone");

  if (!fs.existsSync(standaloneDir)) {
    console.error(
      "❌ .next/standalone/ not found. Run `next build` first."
    );
    console.error(
      "   Make sure next.config.ts has `output: 'standalone'`."
    );
    process.exit(1);
  }

  console.log("  → Copying standalone server...");
  copyDir(standaloneDir, path.join(DIST, "server"));

  // ── 2. Copy .next/static into standalone ─────────────────────────────
  // Next.js standalone does NOT include static assets — a known quirk.
  // We must copy them manually.
  console.log("  → Copying .next/static/...");
  const staticSrc = path.join(ROOT, ".next", "static");
  const staticDest = path.join(DIST, "server", ".next", "static");
  copyDir(staticSrc, staticDest);

  // ── 3. Copy public/ assets ──────────────────────────────────────────
  console.log("  → Copying public/ assets...");
  copyDir(path.join(ROOT, "public"), path.join(DIST, "server", "public"));

  // ── 4. Copy Prisma SQLite schema + migrations ───────────────────────
  console.log("  → Copying Prisma SQLite schema...");
  copyFile(
    path.join(ROOT, "prisma", "schema.sqlite.prisma"),
    path.join(DIST, "prisma", "schema.sqlite.prisma")
  );

  if (fs.existsSync(path.join(ROOT, "prisma", "migrations.sqlite"))) {
    copyDir(
      path.join(ROOT, "prisma", "migrations.sqlite"),
      path.join(DIST, "prisma", "migrations.sqlite")
    );
  }

  // ── 5. Copy seed script ─────────────────────────────────────────────
  // The seed script is written in TS; for the npm package we need the
  // compiled version. We'll create a small JS wrapper that uses tsx.
  console.log("  → Creating seed wrapper...");
  const seedWrapper = `#!/usr/bin/env node
/**
 * Seed wrapper for npm distribution.
 * Uses tsx to run the TypeScript seed script at runtime.
 */
const { execSync } = require("child_process");
const path = require("path");

const seedPath = path.join(__dirname, "..", "prisma", "seed.ts");
const projectRoot = path.join(__dirname, "..");

try {
  execSync(\`npx tsx "\${seedPath}"\`, {
    cwd: projectRoot,
    stdio: "inherit",
    env: { ...process.env },
  });
} catch (error) {
  console.error("❌ Seeding failed:", error.message);
  process.exit(1);
}
`;
  fs.mkdirSync(path.join(DIST, "seed"), { recursive: true });
  fs.writeFileSync(path.join(DIST, "seed", "seed.js"), seedWrapper);

  // Also copy the actual seed.ts so it can be compiled/run
  copyFile(
    path.join(ROOT, "prisma", "seed.ts"),
    path.join(DIST, "prisma", "seed.ts")
  );

  // ── 6. Copy curriculum data (notes) that the seed imports ────────────
  console.log("  → Copying curriculum notes data...");
  copyDir(
    path.join(ROOT, "prisma", "notes"),
    path.join(DIST, "prisma", "notes")
  );

  // ── 7. Create a minimal package.json for the dist server ─────────────
  // The standalone server already has one, but we ensure it's correct.
  const serverPkgPath = path.join(DIST, "server", "package.json");
  if (fs.existsSync(serverPkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(serverPkgPath, "utf-8"));
    // Ensure the start command is correct
    pkg.scripts = pkg.scripts || {};
    pkg.scripts.start = "node server.js";
    fs.writeFileSync(serverPkgPath, JSON.stringify(pkg, null, 2));
  }

  // ── 8. Copy bin/ (CLI entry point) ───────────────────────────────────
  console.log("  → Copying bin/ CLI...");
  if (fs.existsSync(path.join(ROOT, "bin"))) {
    copyDir(path.join(ROOT, "bin"), path.join(DIST, "bin"));
  }

  // ── 9. Create dist package.json for npm publishing ───────────────────
  console.log("  → Creating dist package.json...");
  const distPkg = {
    name: "pymentor",
    version: "1.0.0",
    description: "Learn Python by Building Logic — an interactive, offline-capable Python tutor that runs on your machine",
    bin: {
      pymentor: "./bin/cli.js",
    },
    files: [
      "bin/",
      "dist/",
      "prisma/",
      "public/",
    ],
    scripts: {
      start: "node dist/server/server.js",
      seed: "node dist/seed/seed.js",
    },
    dependencies: {
      // These are needed at runtime for the CLI and Prisma
      // The server's own node_modules are already in standalone output
    },
    keywords: [
      "python",
      "mentor",
      "learn",
      "tutorial",
      "offline",
      "programming",
      "education",
    ],
    license: "MIT",
    engines: {
      node: ">=18.0.0",
    },
  };
  fs.writeFileSync(
    path.join(DIST, "package.json"),
    JSON.stringify(distPkg, null, 2)
  );

  // ── Summary ──────────────────────────────────────────────────────────
  console.log("\n✅ dist/ prepared successfully!\n");
  console.log("  📊 Size breakdown:");
  console.log(`     Server:     ${getDirSizeMB(path.join(DIST, "server"))} MB`);
  console.log(`     Prisma:     ${getDirSizeMB(path.join(DIST, "prisma"))} MB`);
  console.log(`     Seed:       ${getDirSizeMB(path.join(DIST, "seed"))} MB`);
  console.log(`     Total:      ${getDirSizeMB(DIST)} MB`);
  console.log("\n  Next steps:");
  console.log("     1. Test: node dist/server/server.js");
  console.log("     2. Test CLI: node bin/cli.js doctor");
  console.log("     3. Publish: npm publish --access public\n");
}

main();
