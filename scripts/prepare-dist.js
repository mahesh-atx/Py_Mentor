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
 *   │   ├── migrations.sqlite/    → SQLite migrations
 *   │   ├── seed.ts               → Curriculum seeder (TS)
 *   │   └── notes/                → Curriculum content modules
 *   ├── public/               → Static assets (fonts, pyodide)
 *   ├── bin/                  → CLI entry point
 *   └── seed/                 → Seed wrapper script
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
      try {
        const linkTarget = fs.realpathSync(srcPath);
        if (fs.statSync(linkTarget).isDirectory()) {
          copyDir(linkTarget, destPath);
        } else {
          fs.copyFileSync(linkTarget, destPath);
        }
      } catch (e) {
        console.warn(`⚠️  Failed to resolve symlink: ${srcPath}`);
      }
    } else if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
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
  console.log("  → Copying .next/static/...");
  const staticSrc = path.join(ROOT, ".next", "static");
  const staticDest = path.join(DIST, "server", ".next", "static");
  copyDir(staticSrc, staticDest);

  // ── 3. Copy public/ assets (fonts, pyodide, etc.) ────────────────────
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

  // ── 5. Copy seed script + curriculum data ────────────────────────────
  console.log("  → Copying seed script and curriculum data...");
  copyFile(
    path.join(ROOT, "prisma", "seed.ts"),
    path.join(DIST, "prisma", "seed.ts")
  );
  if (fs.existsSync(path.join(ROOT, "prisma", "seed.js"))) {
    copyFile(
      path.join(ROOT, "prisma", "seed.js"),
      path.join(DIST, "prisma", "seed.js")
    );
  }

  if (fs.existsSync(path.join(ROOT, "prisma", "notes"))) {
    copyDir(
      path.join(ROOT, "prisma", "notes"),
      path.join(DIST, "prisma", "notes")
    );
  }

  // ── 6. Create seed wrapper ──────────────────────────────────────────
  // The seed script is TypeScript and imports from ../src/lib/db/prisma.
  // The wrapper uses tsx to run it, resolving paths relative to the
  // project root (where node_modules and src/ are available).
  console.log("  → Creating seed wrapper...");
  const seedWrapper = `#!/usr/bin/env node
/**
 * Seed wrapper for npm distribution.
 * Uses tsx to run the TypeScript seed script at runtime.
 * Resolves paths relative to the installed package root.
 */
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// The seed.ts is at dist/prisma/seed.ts — find the package root from here
const seedDir = path.join(__dirname, "..", "prisma");
const seedPath = path.join(seedDir, "seed.ts");

// The package root is where node_modules, src/ etc. live
// When installed globally, __dirname is inside dist/seed/
let projectRoot = path.join(__dirname, "..");

// Walk up to find the root (has node_modules or package.json)
while (!fs.existsSync(path.join(projectRoot, "node_modules")) && projectRoot !== "/") {
  projectRoot = path.dirname(projectRoot);
}

const seedPathJs = path.join(seedDir, "seed.js");

if (!fs.existsSync(seedPathJs)) {
  console.error("❌ Seed script not found at:", seedPathJs);
  process.exit(1);
}

try {
  execSync(\`node "\${seedPathJs}"\`, {
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

  // ── 7. Create a minimal package.json for the dist server ─────────────
  const serverPkgPath = path.join(DIST, "server", "package.json");
  if (fs.existsSync(serverPkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(serverPkgPath, "utf-8"));
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

  // Read the root package.json for version, description etc.
  const rootPkg = JSON.parse(
    fs.readFileSync(path.join(ROOT, "package.json"), "utf-8")
  );

  const distPkg = {
    name: rootPkg.name,
    version: rootPkg.version,
    description: rootPkg.description,
    license: rootPkg.license,
    author: rootPkg.author,
    repository: rootPkg.repository,
    homepage: rootPkg.homepage,
    bugs: rootPkg.bugs,
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
      postinstall: "prisma generate --schema=prisma/schema.sqlite.prisma"
    },
    dependencies: {
      "prisma": rootPkg.dependencies.prisma || "^7.8.0",
      "@prisma/client": rootPkg.dependencies["@prisma/client"] || "^7.8.0",
      "@prisma/adapter-better-sqlite3": rootPkg.dependencies["@prisma/adapter-better-sqlite3"] || "^7.8.0",
      "better-sqlite3": "^12.11.1",
      "sql.js": rootPkg.dependencies["sql.js"] || "^1.14.1"
    },
    keywords: rootPkg.keywords,
    engines: rootPkg.engines,
  };
  fs.writeFileSync(
    path.join(DIST, "package.json"),
    JSON.stringify(distPkg, null, 2)
  );

  // ── 9.5 Delete bundled native modules to force cross-platform resolution ──
  console.log("  → Cleaning bundled native modules...");
  const modulesToRemove = [
    "better-sqlite3",
    "@prisma",
    ".prisma"
  ];
  for (const mod of modulesToRemove) {
    const modPath = path.join(DIST, "server", "node_modules", mod);
    if (fs.existsSync(modPath)) {
      fs.rmSync(modPath, { recursive: true, force: true });
    }
  }

  // ── 10. Copy src/lib/db/ for seed dependencies ───────────────────────
  // The seed.ts imports from ../src/lib/db/prisma and ../src/lib/db/json-helper
  // These need to be available in the dist for tsx to resolve them.
  console.log("  → Copying src/lib/db/ for seed dependencies...");
  copyDir(
    path.join(ROOT, "src", "lib", "db"),
    path.join(DIST, "src", "lib", "db")
  );

  // ── 11. Copy sql.js WASM binary for CLI migration support ────────────
  console.log("  → Ensuring sql.js WASM is available...");
  try {
    const sqlJsDir = path.dirname(
      require.resolve("sql.js/package.json", { paths: [ROOT] })
    );
    const wasmSrc = path.join(sqlJsDir, "dist", "sql-wasm.wasm");
    if (fs.existsSync(wasmSrc)) {
      // Copy into the server's node_modules so it's available at runtime
      const wasmDest = path.join(
        DIST, "server", "node_modules", "sql.js", "dist", "sql-wasm.wasm"
      );
      copyFile(wasmSrc, wasmDest);
    }
  } catch {
    console.warn("  ⚠️  Could not locate sql.js WASM binary");
  }

  // ── Summary ──────────────────────────────────────────────────────────
  console.log("\n✅ dist/ prepared successfully!\n");
  console.log("  📊 Size breakdown:");
  console.log(`     Server:     ${getDirSizeMB(path.join(DIST, "server"))} MB`);
  console.log(`     Prisma:     ${getDirSizeMB(path.join(DIST, "prisma"))} MB`);
  console.log(`     Seed:       ${getDirSizeMB(path.join(DIST, "seed"))} MB`);
  console.log(`     Src/DB:     ${getDirSizeMB(path.join(DIST, "src"))} MB`);
  console.log(`     Total:      ${getDirSizeMB(DIST)} MB`);
  console.log("\n  Next steps:");
  console.log("     1. Test: node dist/server/server.js");
  console.log("     2. Test CLI: node bin/cli.js doctor");
  console.log("     3. Publish: npm publish --access public\n");
}

main();
