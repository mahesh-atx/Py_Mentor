/**
 * setup-env.js — Switch the project between Python and JavaScript environments.
 *
 * Usage:
 *   node scripts/setup-env.js python
 *   node scripts/setup-env.js javascript
 *
 * This script:
 *   1. Updates .env (SEED_LANG + NEXT_PUBLIC_SEED_LANG)
 *   2. Copies prisma/schema.sqlite.prisma → prisma/schema.prisma
 *   3. Resets the database (prisma db push --force-reset)
 *   4. Re-seeds with the target curriculum
 *   5. Cleans the .next build cache
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const ENV_FILE = path.join(ROOT, ".env");
const SCHEMA_SRC = path.join(ROOT, "prisma", "schema.sqlite.prisma");
const SCHEMA_DEST = path.join(ROOT, "prisma", "schema.prisma");
const NEXT_DIR = path.join(ROOT, ".next");

// ── Parse argument ──────────────────────────────────────────────────────
const lang = (process.argv[2] || "").toLowerCase();

if (!["python", "javascript"].includes(lang)) {
  console.error(
    "\x1b[31m✖ Please specify a language: python or javascript\x1b[0m"
  );
  console.error("  Usage: node scripts/setup-env.js python");
  console.error("         node scripts/setup-env.js javascript");
  process.exit(1);
}

console.log(`\n\x1b[36m🔧 Setting up environment for \x1b[1m${lang}\x1b[0m\n`);

// ── Step 1: Update .env ─────────────────────────────────────────────────
console.log("\x1b[33m[1/5]\x1b[0m Updating .env ...");
try {
  let env = fs.readFileSync(ENV_FILE, "utf-8");
  env = env.replace(
    /NEXT_PUBLIC_SEED_LANG\s*=\s*"[^"]*"/,
    `NEXT_PUBLIC_SEED_LANG="${lang}"`
  );
  env = env.replace(/SEED_LANG\s*=\s*"[^"]*"/, `SEED_LANG="${lang}"`);
  fs.writeFileSync(ENV_FILE, env, "utf-8");
  console.log(`      ✔ SEED_LANG="${lang}", NEXT_PUBLIC_SEED_LANG="${lang}"`);
} catch (err) {
  console.error("      ✖ Failed to update .env:", err.message);
  process.exit(1);
}

// ── Step 2: Copy SQLite schema ──────────────────────────────────────────
console.log("\x1b[33m[2/5]\x1b[0m Activating SQLite schema ...");
try {
  fs.copyFileSync(SCHEMA_SRC, SCHEMA_DEST);
  console.log("      ✔ prisma/schema.sqlite.prisma → prisma/schema.prisma");
} catch (err) {
  console.error("      ✖ Failed to copy schema:", err.message);
  process.exit(1);
}

// ── Step 3: Reset database ──────────────────────────────────────────────
console.log("\x1b[33m[3/5]\x1b[0m Resetting database ...");
try {
  execSync("npx prisma db push --force-reset", {
    cwd: ROOT,
    stdio: "inherit",
  });
  console.log("      ✔ Database reset complete");
} catch (err) {
  console.error("      ✖ Database reset failed");
  process.exit(1);
}

// ── Step 4: Seed database ───────────────────────────────────────────────
console.log(`\x1b[33m[4/5]\x1b[0m Seeding ${lang} curriculum ...`);
try {
  execSync("npx prisma db seed", { cwd: ROOT, stdio: "inherit" });
  console.log("      ✔ Seed complete");
} catch (err) {
  console.error("      ✖ Seed failed");
  process.exit(1);
}

// ── Step 5: Clean .next cache ───────────────────────────────────────────
console.log("\x1b[33m[5/5]\x1b[0m Cleaning .next build cache ...");
try {
  if (fs.existsSync(NEXT_DIR)) {
    fs.rmSync(NEXT_DIR, { recursive: true, force: true });
  }
  console.log("      ✔ .next cache removed");
} catch (err) {
  // Non-fatal — the build will just regenerate it
  console.warn("      ⚠ Could not fully clean .next:", err.message);
}

// ── Done ────────────────────────────────────────────────────────────────
console.log(
  `\n\x1b[32m✔ Setup complete!\x1b[0m Run \x1b[1mnpm run dev\x1b[0m to start the ${lang} environment.\n`
);
