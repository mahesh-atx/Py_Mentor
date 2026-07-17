#!/usr/bin/env node

/**
 * PyMentor CLI — Main entry point
 *
 * Usage:
 *   pymentor                  Start the app (opens browser)
 *   pymentor start            Same as above
 *   pymentor start --port 8080   Use a custom port
 *   pymentor config           Show current configuration
 *   pymentor config --set-key KEY=VALUE   Set an API key or env var
 *   pymentor reset            Reset all user data (with confirmation)
 *   pymentor backup           Create a backup of your data
 *   pymentor restore [file]   Restore from a backup file
 *   pymentor doctor           Diagnose setup issues
 *   pymentor --version        Show version
 *   pymentor --help           Show help
 *
 * On first run, it automatically:
 *   1. Creates ~/.pymentor/ data directory
 *   2. Installs the pre-seeded curriculum database (lessons, exercises,
 *      quizzes, projects, achievements) — or creates an empty one from
 *      the migration SQL as a fallback
 *   3. Starts the server and opens the browser
 */

const path = require("path");
const os = require("os");
const fs = require("fs");
const net = require("net");
const { execSync, spawn } = require("child_process");

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DATA_DIR = path.join(os.homedir(), ".pymentor");
const DB_PATH = path.join(DATA_DIR, "pymentor.db");
const ENV_PATH = path.join(DATA_DIR, ".env");
const CONFIG_PATH = path.join(DATA_DIR, "config.json");
const BACKUP_DIR = path.join(DATA_DIR, "backups");

// Resolve paths relative to where this script lives
const BIN_DIR = path.dirname(__filename);
const ROOT_DIR = path.dirname(BIN_DIR);

// The standalone server can be in either dist/server/ or directly in the project
const SERVER_DIR = fs.existsSync(path.join(ROOT_DIR, "dist", "server", "server.js"))
  ? path.join(ROOT_DIR, "dist", "server")
  : fs.existsSync(path.join(ROOT_DIR, "server", "server.js"))
    ? path.join(ROOT_DIR, "server")
    : ROOT_DIR;

const SERVER_PATH = path.join(SERVER_DIR, "server.js");
const PRISMA_DIR = fs.existsSync(path.join(ROOT_DIR, "dist", "prisma"))
  ? path.join(ROOT_DIR, "dist", "prisma")
  : path.join(ROOT_DIR, "prisma");

const MIGRATION_DIR = path.join(PRISMA_DIR, "migrations");

// Pre-seeded curriculum database shipped with the package (produced by
// `npm run db:push` + `npm run db:seed` and copied by prepare-dist.js).
// Resolution order mirrors SERVER_DIR/PRISMA_DIR above:
//   1. dist/pymentor.db — development checkout after `npm run build:npm`
//   2. ./pymentor.db    — installed npm package root (or dev checkout root)
const SEEDED_DB_PATH = fs.existsSync(path.join(ROOT_DIR, "dist", "pymentor.db"))
  ? path.join(ROOT_DIR, "dist", "pymentor.db")
  : path.join(ROOT_DIR, "pymentor.db");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  // Ensure config.json exists so other commands can rely on it
  if (!fs.existsSync(CONFIG_PATH)) {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({}, null, 2));
  }
}

function isFirstRun() {
  return !fs.existsSync(DB_PATH);
}

function loadEnv() {
  if (fs.existsSync(ENV_PATH)) {
    const content = fs.readFileSync(ENV_PATH, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex > 0) {
        const key = trimmed.slice(0, eqIndex).trim();
        const value = trimmed.slice(eqIndex + 1).trim();
        process.env[key] = value;
      }
    }
  }
}

function loadConfig() {
  if (fs.existsSync(CONFIG_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
    } catch {
      return {};
    }
  }
  return {};
}

function saveConfig(config) {
  ensureDataDir();
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

function saveEnv(key, value) {
  ensureDataDir();
  let content = "";
  if (fs.existsSync(ENV_PATH)) {
    content = fs.readFileSync(ENV_PATH, "utf-8");
  }

  const lines = content.split("\n").filter((l) => {
    const trimmed = l.trim();
    return !trimmed.startsWith(`${key}=`) && trimmed !== "";
  });

  lines.push(`${key}=${value}`);
  fs.writeFileSync(ENV_PATH, lines.join("\n") + "\n");

  // Update process.env so it's immediately available to the server
  process.env[key] = value;
}

function getDBSizeMB() {
  if (!fs.existsSync(DB_PATH)) return "0";
  const stats = fs.statSync(DB_PATH);
  return (stats.size / 1024 / 1024).toFixed(1);
}

/**
 * Check if a port is available.
 * @param {number} port
 * @returns {Promise<boolean>}
 */
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close();
      resolve(true);
    });
    server.listen(port, "0.0.0.0");
  });
}

/**
 * Find the next available port starting from the given port.
 * @param {number} startPort
 * @param {number} maxAttempts
 * @returns {Promise<number>}
 */
async function findAvailablePort(startPort, maxAttempts = 10) {
  for (let port = startPort; port < startPort + maxAttempts; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  return startPort; // fallback
}

function openBrowser(url) {
  const platform = os.platform();
  let command;

  if (platform === "darwin") {
    command = `open "${url}"`;
  } else if (platform === "win32") {
    command = `start "" "${url}"`;
  } else {
    // Linux — try xdg-open, then sensible-browser
    command = `xdg-open "${url}" 2>/dev/null || sensible-browser "${url}" 2>/dev/null || echo "Please open ${url} in your browser"`;
  }

  try {
    execSync(command, { stdio: "ignore" });
  } catch {
    // Browser might not be available in headless environments
  }
}

/**
 * Get the version from package.json
 */
function getVersion() {
  const pkgPaths = [
    path.join(ROOT_DIR, "package.json"),
    path.join(ROOT_DIR, "dist", "package.json"),
  ];

  for (const pkgPath of pkgPaths) {
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
        return pkg.version || "0.1.0";
      } catch {
        continue;
      }
    }
  }

  return "0.1.0";
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

async function cmdSetup() {
  ensureDataDir();

  console.log(`\x1b[36m│\x1b[0m  \x1b[36mℹ Initializing PyMentor Database...\x1b[0m\n\x1b[36m│\x1b[0m`);

  // Step 1: Install the SQLite database
  if (!fs.existsSync(DB_PATH)) {
    console.log("\x1b[36m├─\x1b[0m Database");

    if (fs.existsSync(SEEDED_DB_PATH)) {
      // ── Fast path (normal case) ──────────────────────────────────────
      // Copy the pre-seeded curriculum database shipped with the package.
      // Same first-run behavior as the Electron app (see electron/main.js).
      // The shipped DB always matches the shipped code, so no migration is
      // needed on install.
      try {
        fs.copyFileSync(SEEDED_DB_PATH, DB_PATH);
        console.log(
          "\x1b[36m│  └─\x1b[0m \x1b[32m✔ Installed curriculum database\x1b[0m\n\x1b[36m│\x1b[0m"
        );
      } catch (error) {
        console.error(
          "  ❌ Failed to copy the curriculum database:",
          error.message
        );
        process.exit(1);
      }
    } else {
      // ── Fallback (dev checkouts without a built database) ────────────
      // Create an empty database from the migration SQL. The curriculum
      // must be seeded separately afterwards.
      const initMigration = path.join(
        MIGRATION_DIR,
        "00000000000000_init",
        "migration.sql"
      );

      if (!fs.existsSync(initMigration)) {
        console.error("  ❌ No curriculum database or migration SQL found.");
        console.error("     Expected one of:");
        console.error("       -", SEEDED_DB_PATH);
        console.error("       -", initMigration);
        process.exit(1);
      }

      try {
        applyMigration(initMigration);
        console.log(
          "\x1b[36m│  └─\x1b[0m \x1b[32m✔ Created empty SQLite database\x1b[0m\n\x1b[36m│\x1b[0m"
        );
        console.log(
          "\x1b[36m│  \x1b[33m⚠ No pre-seeded curriculum found — the app will be empty.\x1b[0m"
        );
        console.log(
          "\x1b[36m│\x1b[0m    From a git checkout, run: npm run db:push && npm run db:seed"
        );
        console.log(
          "\x1b[36m│\x1b[0m    From an npm install, please reinstall or report this issue.\n\x1b[36m│\x1b[0m"
        );
      } catch (error) {
        console.error("  ❌ Failed to create database:", error.message);
        console.error("     Try installing better-sqlite3: npm install better-sqlite3");
        console.error("     Or install sqlite3 CLI: apt install sqlite3");
        process.exit(1);
      }
    }
  }

  // Step 2: Save first-run flag
  const config = loadConfig();
  config.firstRunCompleted = true;
  config.installedAt = new Date().toISOString();
  saveConfig(config);

  console.log("\x1b[36m└─\x1b[0m \x1b[32m✔ Setup finished successfully\x1b[0m\n");
}

/**
 * Apply a migration SQL file to the SQLite database.
 * Tries better-sqlite3 first, then sql.js, then sqlite3 CLI.
 */
function applyMigration(migrationPath) {
  const sql = fs.readFileSync(migrationPath, "utf-8");

  // Try better-sqlite3 (fastest, synchronous)
  try {
    const Database = require("better-sqlite3");
    const db = new Database(DB_PATH);
    db.exec(sql);
    db.close();
    return;
  } catch {
    // better-sqlite3 not available, try next
  }

  // Try sql.js (pure JS, works everywhere)
  try {
    let sqlJsPath;
    try {
      sqlJsPath = require.resolve("sql.js", { paths: [ROOT_DIR] });
    } catch {
      sqlJsPath = null;
    }

    let wasmPath;
    try {
      const sqlJsDir = path.dirname(require.resolve("sql.js/package.json", { paths: [ROOT_DIR] }));
      wasmPath = path.join(sqlJsDir, "dist", "sql-wasm.wasm");
    } catch {
      wasmPath = null;
    }

    const helperScript = `
const initSqlJs = require("${(sqlJsPath || "sql.js").replace(/\\/g, "\\\\")}");
const fs = require("fs");
const path = require("path");

async function run() {
  const SQL = await initSqlJs(${wasmPath ? `locateFile: file => path.join("${wasmPath.replace(/\\/g, "\\\\")}", path.basename(file))` : ""});
  const db = new SQL.Database();
  const sql = fs.readFileSync(process.argv[2], "utf-8");
  db.run(sql);
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(process.argv[3], buffer);
  db.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
`;
    const helperPath = path.join(os.tmpdir(), "pymentor-sqljs-helper.js");
    fs.writeFileSync(helperPath, helperScript);

    execSync(`node "${helperPath}" "${migrationPath}" "${DB_PATH}"`, {
      cwd: ROOT_DIR,
      stdio: "pipe",
      timeout: 30000,
    });

    try { fs.unlinkSync(helperPath); } catch {}
    return;
  } catch (error) {
    const helperPath = path.join(os.tmpdir(), "pymentor-sqljs-helper.js");
    try { fs.unlinkSync(helperPath); } catch {}
  }

  // Try sqlite3 CLI
  try {
    execSync(`sqlite3 "${DB_PATH}" < "${migrationPath}"`, {
      stdio: "pipe",
    });
    return;
  } catch {
    // sqlite3 CLI not available
  }

  throw new Error(
    "No SQLite driver available. Install one of:\n" +
    "  - better-sqlite3: npm install better-sqlite3\n" +
    "  - sql.js: npm install sql.js (included in PyMentor)\n" +
    "  - sqlite3 CLI: apt install sqlite3 (or brew install sqlite3)"
  );
}

async function cmdStart(port = 3000) {
  // First-run auto-setup
  if (isFirstRun()) {
    await cmdSetup();
  }

  ensureDataDir();
  loadEnv();

  // Check if port is available, suggest alternative if not
  const portAvailable = await isPortAvailable(port);
  if (!portAvailable) {
    const newPort = await findAvailablePort(port + 1);
    console.log(`\n\x1b[33mℹ Port ${port} is in use. Using ${newPort} instead.\x1b[0m\n`);
    port = newPort;
  }

  // Set environment. Prisma file: URLs need forward slashes — convert
  // Windows backslashes (same handling as electron/main.js).
  const prismaDbPath = DB_PATH.replace(/\\/g, "/");
  process.env.DATABASE_URL = `file:${prismaDbPath}`;
  process.env.PORT = String(port);
  // Bind localhost only: the app has no auth, so listening on all
  // interfaces would expose it to the whole network.
  process.env.HOSTNAME = "127.0.0.1";

  if (!fs.existsSync(SERVER_PATH)) {
    console.error(`❌ Server not found at: ${SERVER_PATH}`);
    console.error("   Run 'npm run build:npm' first to create the distribution.");
    process.exit(1);
  }

  console.log(`\x1b[36m┌─\x1b[0m Server`);
  console.log(`\x1b[36m│  ►\x1b[0m Starting PyMentor...`);

  // process.execPath guarantees the same Node binary that's running the CLI
  // (relying on PATH lookup for "node" breaks in some Windows setups).
  const server = spawn(process.execPath, [SERVER_PATH], {
    cwd: SERVER_DIR,
    env: {
      ...process.env,
      DATABASE_URL: `file:${prismaDbPath}`,
      PORT: String(port),
      HOSTNAME: "127.0.0.1",
    },
    stdio: "inherit",
  });

  // Open browser after a short delay to let the server start
  setTimeout(() => {
    openBrowser(`http://localhost:${port}`);
    console.log(`\x1b[36m│  \x1b[32m✔\x1b[0m Ready on http://localhost:${port}`);
    console.log(`\x1b[36m│  ►\x1b[0m Data directory: ${DATA_DIR}`);
    console.log(`\x1b[36m└─ \x1b[33mℹ\x1b[0m Press Ctrl+C to stop\n`);
  }, 2000);

  // Handle server exit
  server.on("exit", (code) => {
    if (code !== 0 && code !== null) {
      console.error(`\n❌ Server exited with code ${code}`);
    }
    process.exit(code ?? 0);
  });

  // Handle Ctrl+C gracefully
  process.on("SIGINT", () => {
    console.log("\n\n\x1b[36m└─ \x1b[33mℹ\x1b[0m Stopping PyMentor...");
    server.kill("SIGTERM");
    setTimeout(() => process.exit(0), 1000);
  });

  process.on("SIGTERM", () => {
    server.kill("SIGTERM");
  });
}

function cmdConfig(setKeyArg) {
  ensureDataDir();

  if (setKeyArg) {
    const eqIndex = setKeyArg.indexOf("=");
    if (eqIndex <= 0) {
      console.error("❌ Invalid format. Use: pymentor config --set-key KEY=VALUE");
      process.exit(1);
    }
    const key = setKeyArg.slice(0, eqIndex);
    const value = setKeyArg.slice(eqIndex + 1);

    saveEnv(key, value);
    console.log(`\n✅ Saved ${key} to ${ENV_PATH}\n`);
    return;
  }

  // Show current config
  const config = loadConfig();
  const dbExists = fs.existsSync(DB_PATH);

  console.log("\n📋 PyMentor Configuration");
  console.log("───────────────────────────");
  console.log(`  Data directory: ${DATA_DIR}`);
  console.log(`  Database:       ${dbExists ? DB_PATH : "Not created yet"} (${dbExists ? getDBSizeMB() + " MB" : "N/A"})`);
  console.log(`  Config file:    ${CONFIG_PATH}`);
  console.log(`  Env file:       ${fs.existsSync(ENV_PATH) ? ENV_PATH : "Not created yet"}`);
  console.log(`  Installed:      ${config.installedAt || "Not yet"}`);
  console.log();

  // Check AI provider status
  loadEnv();
  const hasOpenRouter = !!process.env.OPENROUTER_API_KEY;
  const hasNvidia = !!process.env.NVIDIA_API_KEY;
  const aiProvider = hasOpenRouter
    ? "OpenRouter ✅"
    : hasNvidia
      ? "NVIDIA ✅"
      : "Not configured ❌";

  console.log(`  AI Provider:    ${aiProvider}`);
  console.log();

  if (!hasOpenRouter && !hasNvidia) {
    console.log("  💡 To enable the AI Mentor, set an API key:");
    console.log("     pymentor config --set-key OPENROUTER_API_KEY=sk-or-xxx");
    console.log();
    console.log("  Or edit the env file directly:");
    console.log(`     ${ENV_PATH}`);
  }

  console.log();
}

function cmdReset() {
  if (!fs.existsSync(DB_PATH)) {
    console.log("\n\x1b[33mℹ No database found. Nothing to reset.\x1b[0m\n");
    return;
  }

  console.log("\n\x1b[36m┌─\x1b[0m Factory Reset");
  console.log("\x1b[36m│  \x1b[31m⚠️ WARNING: This will delete ALL your data!\x1b[0m");
  console.log(`\x1b[36m│  ►\x1b[0m Database: ${DB_PATH}`);
  console.log(`\x1b[36m│  ►\x1b[0m Size: ${getDBSizeMB()} MB`);

  if (!process.argv.includes("--force")) {
    console.log("\x1b[36m└─ \x1b[33mℹ\x1b[0m To proceed, run: pymentor reset --force\n");
    return;
  }

  // Create backup before deleting
  const backupName = `pymentor-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.db`;
  const backupPath = path.join(BACKUP_DIR, backupName);

  try {
    cmdBackup(backupPath);
    console.log(`\x1b[36m│  \x1b[32m✔\x1b[0m Backup created: ${backupPath}`);
  } catch {
    console.log("\x1b[36m│  \x1b[31m⚠️ Could not create backup\x1b[0m");
  }

  // Delete the database
  fs.unlinkSync(DB_PATH);
  console.log("\x1b[36m│  \x1b[32m✔\x1b[0m Database deleted");

  // Clear Next.js cache so it doesn't serve stale curriculum
  const cacheDirs = [
    path.join(ROOT_DIR, ".next", "cache"),
    path.join(SERVER_DIR, ".next", "cache"),
    path.join(ROOT_DIR, "dist", "server", ".next", "cache")
  ];
  for (const dir of cacheDirs) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }
  console.log("\x1b[36m│  \x1b[32m✔\x1b[0m Cache cleared");

  // Reset config
  const config = loadConfig();
  delete config.firstRunCompleted;
  saveConfig(config);

  console.log("\x1b[36m└─ \x1b[32m✔\x1b[0m PyMentor reset. Run 'pymentor' to setup again.\n");
}

function cmdBackup(outputPath) {
  if (!fs.existsSync(DB_PATH)) {
    console.error("\n❌ No database found. Run 'pymentor' first.\n");
    process.exit(1);
  }

  ensureDataDir();

  const backupPath =
    outputPath ||
    path.join(
      BACKUP_DIR,
      `pymentor-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.db`
    );

  // Simple file copy backup (SQLite databases are single files)
  fs.copyFileSync(DB_PATH, backupPath);

  const sizeMB = (fs.statSync(backupPath).size / 1024 / 1024).toFixed(1);
  console.log(`\n✅ Backup created: ${backupPath}`);
  console.log(`   Size: ${sizeMB} MB\n`);
}

function cmdRestore(backupFile) {
  if (!backupFile) {
    console.error("\n❌ Please specify a backup file: pymentor restore <file>\n");
    process.exit(1);
  }

  const resolvedPath = path.resolve(backupFile);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`\n❌ Backup file not found: ${resolvedPath}\n`);
    process.exit(1);
  }

  ensureDataDir();

  // Copy backup to database location
  fs.copyFileSync(resolvedPath, DB_PATH);

  console.log(`\n✅ Restored from: ${resolvedPath}`);
  console.log(`   Database: ${DB_PATH} (${getDBSizeMB()} MB)\n`);
}

/**
 * Doctor command — diagnose setup issues and show system health.
 */
function cmdDoctor() {
  const version = getVersion();
  const nodeVersion = process.version;
  const platform = `${os.type()} ${os.release()} (${os.arch()})`;
  const checks = [];

  console.log("\n🐍 PyMentor Doctor — System Diagnostics\n");
  console.log("─────────────────────────────────────────\n");

  // ── Check 1: Node.js version ──────────────────────────────────────────
  const nodeMajor = parseInt(nodeVersion.slice(1).split(".")[0], 10);
  const nodeOk = nodeMajor >= 18;
  checks.push({
    label: "Node.js version",
    status: nodeOk ? "✅" : "❌",
    detail: `${nodeVersion} ${nodeOk ? "(>= 18)" : "(requires >= 18)"}`,
  });

  // ── Check 2: PyMentor version ─────────────────────────────────────────
  checks.push({
    label: "PyMentor version",
    status: "✅",
    detail: `v${version}`,
  });

  // ── Check 3: Platform ─────────────────────────────────────────────────
  checks.push({
    label: "Platform",
    status: "✅",
    detail: platform,
  });

  // ── Check 4: Data directory ───────────────────────────────────────────
  const dataDirExists = fs.existsSync(DATA_DIR);
  checks.push({
    label: "Data directory",
    status: dataDirExists ? "✅" : "⚠️ ",
    detail: `${DATA_DIR} ${dataDirExists ? "" : "(will be created on first run)"}`,
  });

  // ── Check 5: Database ─────────────────────────────────────────────────
  const dbExists = fs.existsSync(DB_PATH);
  checks.push({
    label: "Database",
    status: dbExists ? "✅" : "⚠️ ",
    detail: dbExists ? `${DB_PATH} (${getDBSizeMB()} MB)` : "Not created yet (run 'pymentor' to create)",
  });

  // ── Check 6: Curriculum database (pre-seeded, shipped with the app) ────
  const seededDbExists = fs.existsSync(SEEDED_DB_PATH);
  checks.push({
    label: "Curriculum data",
    status: seededDbExists ? "✅" : "⚠️ ",
    detail: seededDbExists
      ? "Pre-seeded database found"
      : "Not found (first run will create an empty database)",
  });

  // ── Check 7: Migration files ──────────────────────────────────────────
  const migrationFile = path.join(MIGRATION_DIR, "00000000000000_init", "migration.sql");
  const migrationExists = fs.existsSync(migrationFile);
  checks.push({
    label: "Migration files",
    status: migrationExists ? "✅" : "❌",
    detail: migrationExists ? "Found" : `Not found at ${MIGRATION_DIR}`,
  });

  // ── Check 8: Server build ─────────────────────────────────────────────
  const serverExists = fs.existsSync(SERVER_PATH);
  checks.push({
    label: "Server build",
    status: serverExists ? "✅" : "❌",
    detail: serverExists ? "Found" : `Not found (run 'npm run build:npm' first)`,
  });

  // ── Check 9: SQLite driver ────────────────────────────────────────────
  let sqliteDriver = "none";
  let sqliteStatus = "❌";
  try {
    require.resolve("better-sqlite3");
    sqliteDriver = "better-sqlite3";
    sqliteStatus = "✅";
  } catch {
    try {
      require.resolve("sql.js", { paths: [ROOT_DIR] });
      sqliteDriver = "sql.js";
      sqliteStatus = "✅";
    } catch {
      try {
        execSync("which sqlite3", { stdio: "pipe" });
        sqliteDriver = "sqlite3 CLI";
        sqliteStatus = "✅";
      } catch {
        // No driver available
      }
    }
  }
  checks.push({
    label: "SQLite driver",
    status: sqliteStatus,
    detail: sqliteDriver === "none" ? "Not found (install better-sqlite3, sql.js, or sqlite3 CLI)" : sqliteDriver,
  });

  // ── Check 10: AI Provider ──────────────────────────────────────────────
  loadEnv();
  const hasOpenRouter = !!process.env.OPENROUTER_API_KEY;
  const hasNvidia = !!process.env.NVIDIA_API_KEY;
  const aiProvider = hasOpenRouter
    ? "OpenRouter"
    : hasNvidia
      ? "NVIDIA"
      : null;
  checks.push({
    label: "AI Provider",
    status: aiProvider ? "✅" : "⚠️ ",
    detail: aiProvider || "Not configured (optional — run 'pymentor config --set-key OPENROUTER_API_KEY=...')",
  });

  // ── Check 11: Env file ────────────────────────────────────────────────
  const envExists = fs.existsSync(ENV_PATH);
  checks.push({
    label: "Env file",
    status: envExists ? "✅" : "⚠️ ",
    detail: envExists ? ENV_PATH : "Not created yet",
  });

  // ── Check 12: Backups directory ───────────────────────────────────────
  const backupsExist = fs.existsSync(BACKUP_DIR);
  const backupCount = backupsExist
    ? fs.readdirSync(BACKUP_DIR).filter((f) => f.endsWith(".db")).length
    : 0;
  checks.push({
    label: "Backups",
    status: backupsExist ? "✅" : "⚠️ ",
    detail: backupCount > 0 ? `${backupCount} backup(s) in ${BACKUP_DIR}` : `No backups yet`,
  });

  // ── Print results ─────────────────────────────────────────────────────
  for (const check of checks) {
    console.log(`  ${check.status}  ${check.label.padEnd(18)} ${check.detail}`);
  }

  // ── Summary ───────────────────────────────────────────────────────────
  const errors = checks.filter((c) => c.status === "❌").length;
  const warnings = checks.filter((c) => c.status === "⚠️ ").length;

  console.log("\n─────────────────────────────────────────");
  if (errors === 0 && warnings === 0) {
    console.log("\n  🎉 All checks passed! PyMentor is ready to use.\n");
  } else if (errors === 0) {
    console.log(`\n  ⚡ ${warnings} warning(s). PyMentor should work, but some features may be limited.\n`);
  } else {
    console.log(`\n  ❌ ${errors} error(s), ${warnings} warning(s). Please fix the errors above before running PyMentor.\n`);
  }
}

function cmdVersion() {
  console.log(`PyMentor v${getVersion()}`);
}

function cmdHelp() {
  console.log(`
  🐍 PyMentor — Learn Python by Building Logic

  Usage:
    pymentor [command] [options]

  Commands:
    start               Start PyMentor (default command)
    config              Show current configuration
    config --set-key K=V  Set an environment variable (e.g., API key)
    reset               Reset all user data (requires --force)
    backup              Create a backup of your data
    restore <file>      Restore from a backup file
    doctor              Diagnose setup issues
    version             Show version
    help                Show this help message

  Options:
    --port <number>     Use a custom port (default: 3000)
    --force             Skip confirmation prompts
    --version           Show version
    --help              Show help

  Data Location:
    All your data is stored in: ${DATA_DIR}
    • Database:  ${DB_PATH}
    • Config:    ${CONFIG_PATH}
    • Env/Keys:  ${ENV_PATH}
    • Backups:   ${BACKUP_DIR}

  Examples:
    pymentor                        # Start on port 3000
    pymentor start --port=8080      # Start on port 8080
    pymentor config                 # View configuration
    pymentor config --set-key OPENROUTER_API_KEY=sk-xxx  # Set AI key
    pymentor backup                 # Create a backup
    pymentor restore ./backup.db    # Restore from backup
    pymentor doctor                 # Check for issues
    pymentor reset --force          # Delete all data
`);
}

// ---------------------------------------------------------------------------
// CLI Argument Parser & Router
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = argv.slice(2);

  // Handle --version and --help as first args (even before command)
  if (args.includes("--version") || args.includes("-v")) {
    return { command: "version", flags: {} };
  }
  if (args.includes("--help") || args.includes("-h")) {
    return { command: "help", flags: {} };
  }

  const command = args[0] || "start";
  const flags = {};

  for (let i = 1; i < args.length; i++) {
    if (args[i].startsWith("--port=")) {
      flags.port = parseInt(args[i].split("=")[1], 10);
    } else if (args[i] === "--port" && args[i + 1]) {
      flags.port = parseInt(args[++i], 10);
    } else if (args[i].startsWith("--set-key=")) {
      flags.setKey = args[i].split("=").slice(1).join("=");
    } else if (args[i] === "--set-key" && args[i + 1]) {
      flags.setKey = args[++i];
    } else if (args[i] === "--force") {
      flags.force = true;
    } else if (args[i] === "--version" || args[i] === "-v") {
      flags.version = true;
    } else if (args[i] === "--help" || args[i] === "-h") {
      flags.help = true;
    } else if (!args[i].startsWith("-")) {
      flags.positional = args[i];
    }
  }

  return { command, flags };
}

async function main() {
  const { command, flags } = parseArgs(process.argv);

  // Handle --version and --help as early exits
  if (flags.version) {
    cmdVersion();
    return;
  }

  if (flags.help) {
    cmdHelp();
    return;
  }

  // Route to command
  switch (command) {
    case "start":
      await cmdStart(flags.port || 3000);
      break;

    case "config":
      cmdConfig(flags.setKey);
      break;

    case "reset":
      cmdReset();
      break;

    case "backup":
      cmdBackup(flags.positional);
      break;

    case "restore":
      cmdRestore(flags.positional);
      break;

    case "doctor":
      cmdDoctor();
      break;

    case "version":
      cmdVersion();
      break;

    case "help":
      cmdHelp();
      break;

    default:
      console.error(`\n❌ Unknown command: ${command}`);
      console.error("   Run 'pymentor --help' for usage information.\n");
      process.exit(1);
  }
}

main();
