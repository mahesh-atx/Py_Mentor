# 🚀 PyMentor NPM Distribution & Offline Plan

## Overview

Transform PyMentor from a cloud-hosted web app into an **installable CLI tool** that users can run locally with a single command. All user data (notes, progress, bookmarks, achievements) persists on the user's machine and works **completely offline** (except the AI Mentor chat which needs an API key + internet).

---

## 🎯 Target User Experience

```bash
# Step 1: Install globally
npm install -g pymentor

# Step 2: Launch — that's it!
pymentor
```

**What happens on first run:**
1. Creates `~/.pymentor/` data directory
2. Initializes local SQLite database
3. Seeds curriculum (lessons, exercises, quizzes, projects, achievements)
4. Starts a local Next.js server on `localhost:3000`
5. Opens the browser automatically

**What happens on subsequent runs:**
1. Starts the server instantly (DB already exists, curriculum already seeded)
2. Opens the browser
3. **All your notes, progress, bookmarks, streaks — everything is preserved!**

### Additional CLI Commands

```bash
pymentor              # Start the app (opens browser)
pymentor start        # Same as above
pymentor --port 8080  # Use a custom port
pymentor config       # Show/edit configuration (API keys, etc.)
pymentor config --set-key OPENROUTER_API_KEY=sk-xxx  # Set AI API key
pymentor reset        # Reset all user data (with confirmation prompt)
pymentor backup       # Export all data as JSON to ~/pymentor-backup.json
pymentor restore      # Restore from a backup file
pymentor --version    # Show version
pymentor --help       # Show help
```

---

## 🏗️ Architecture Changes Required

### 1. 🔄 Database Migration: PostgreSQL → SQLite

**This is the single most important change.**

| Aspect | PostgreSQL (Current) | SQLite (Target) |
|--------|---------------------|-----------------|
| Install | Need Postgres server | Zero-config, bundled with Node |
| Data location | Remote/server | `~/.pymentor/pymentor.db` |
| Offline | ❌ Needs running server | ✅ Single file, always works |
| Setup | Complex (env vars, connection) | Automatic on first run |
| Backup | pg_dump | Copy the `.db` file |
| Performance | Great for multi-user | Perfect for single-user |

**Changes needed:**

#### a) `prisma/schema.prisma`
```prisma
datasource db {
  provider = "sqlite"        // Changed from "postgresql"
  url      = env("DATABASE_URL")
}

// All @unique constraints with composite keys stay the same
// JSON fields → String (SQLite doesn't have native JSON type, but Prisma handles it)
// DateTime fields → work as-is in Prisma + SQLite
```

**Specific schema changes for SQLite compatibility:**
- `Json` type → `String` (Prisma stores JSON as text in SQLite; we parse on read)
- `@unique` composite constraints → use `@@unique` (already done)
- Remove `@prisma/adapter-pg` and `pg` pool (not needed for SQLite)

#### b) `src/lib/db/prisma.ts`
```typescript
// BEFORE (PostgreSQL with pg Pool):
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// AFTER (SQLite — much simpler):
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
```

#### c) `package.json` — remove PG deps, add SQLite
```diff
- "@prisma/adapter-pg": "^7.8.0",
- "@types/pg": "^8.20.0",
- "pg": "^8.22.0",
```

#### d) Schema: `Json` → `String` migration
Every model field that uses `Json` type needs to change to `String`, and the
read/write code needs to `JSON.parse()`/`JSON.stringify()`:

| Model | Field | Current Type | New Type |
|-------|-------|-------------|----------|
| Lesson | objectives | Json | String |
| Exercise | testCases | Json | String |
| Exercise | hints | Json | String |
| QuizQuestion | options | Json | String |
| Project | requirements | Json | String |
| Project | milestones | Json | String |
| Achievement | condition | Json | String |
| Submission | testResults | String | String (already String) |

**Affected service files** (need `JSON.parse` on read):
- `curriculum.service.ts` — reads lesson.objectives, exercise.testCases, etc.
- `gamification.service.ts` — reads achievement.condition
- `progress.service.ts` — reads submission.testResults
- `prisma/seed.ts` — writes all the above

#### e) `DATABASE_URL` environment variable
```
# BEFORE (PostgreSQL):
DATABASE_URL=postgresql://user:pass@host:5432/db

# AFTER (SQLite):
DATABASE_URL=file:/home/username/.pymentor/pymentor.db
```
The CLI script will set this dynamically based on OS:
```javascript
const path = require('path');
const os = require('os');
const dbPath = path.join(os.homedir(), '.pymentor', 'pymentor.db');
process.env.DATABASE_URL = `file:${dbPath}`;
```

---

### 2. 📦 Next.js Standalone Build for Distribution

Next.js supports a `standalone` output mode that bundles the server + all
dependencies into a single directory. This is **perfect** for npm distribution.

#### `next.config.ts` changes:
```typescript
const nextConfig: NextConfig = {
  output: 'standalone',  // ← ADD THIS
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};
```

This produces `.next/standalone/` containing:
- `server.js` — the production server
- `.next/static/` — static assets
- `node_modules/` — only the deps needed to run
- `public/` — copied automatically
- `package.json` — minimal

**We also need to copy `public/` and `.next/static/` manually** (Next.js standalone
doesn't copy them automatically — a known quirk).

---

### 3. 🖥️ CLI Entry Point

Create `bin/cli.js` — the heart of the npm package:

```
pymentor/
├── bin/
│   └── cli.js          # CLI entry point (#!/usr/bin/env node)
├── dist/
│   ├── server/         # Pre-built standalone Next.js server
│   │   ├── server.js
│   │   ├── .next/
│   │   └── node_modules/
│   ├── public/         # Static assets
│   └── prisma/
│       ├── schema.prisma
│       └── seed.js     # Pre-compiled seed script
├── scripts/
│   ├── setup.js        # First-run setup (create dirs, init DB, seed)
│   └── start.js        # Start the server
├── package.json
└── README.md
```

**`bin/cli.js` logic:**

```javascript
#!/usr/bin/env node
const path = require('path');
const os = require('os');
const fs = require('fs');
const { execSync, spawn } = require('child_process');

const DATA_DIR = path.join(os.homedir(), '.pymentor');
const DB_PATH = path.join(DATA_DIR, 'pymentor.db');
const ENV_PATH = path.join(DATA_DIR, '.env');

// Parse CLI args
const args = process.argv.slice(2);
const command = args[0];

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function isFirstRun() {
  return !fs.existsSync(DB_PATH);
}

function runSetup() {
  ensureDataDir();
  process.env.DATABASE_URL = `file:${DB_PATH}`;

  // Run Prisma migrations (creates the SQLite DB + tables)
  execSync('npx prisma migrate deploy', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: `file:${DB_PATH}` },
  });

  // Seed curriculum data
  execSync('node dist/prisma/seed.js', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: `file:${DB_PATH}` },
  });

  console.log('✅ Setup complete!');
}

function startServer(port = 3000) {
  process.env.DATABASE_URL = `file:${DB_PATH}`;
  process.env.PORT = port;

  // Load user's .env if exists (for API keys)
  if (fs.existsSync(ENV_PATH)) {
    require('dotenv').config({ path: ENV_PATH });
  }

  const serverPath = path.join(__dirname, '..', 'dist', 'server', 'server.js');
  const child = spawn('node', [serverPath], {
    env: { ...process.env, DATABASE_URL: `file:${DB_PATH}`, PORT: String(port) },
    stdio: 'inherit',
  });

  // Open browser after a short delay
  setTimeout(() => {
    const url = `http://localhost:${port}`;
    const opener =
      process.platform === 'darwin' ? 'open' :
      process.platform === 'win32' ? 'start' : 'xdg-open';
    execSync(`${opener} ${url}`).catch(() => {});
    console.log(`\n🚀 PyMentor is running at ${url}`);
  }, 2000);

  child.on('exit', () => process.exit());
}

// Command routing
if (command === 'config') { /* ... */ }
else if (command === 'reset') { /* ... */ }
else if (command === 'backup') { /* ... */ }
else if (command === 'restore') { /* ... */ }
else {
  // Default: start
  if (isFirstRun()) {
    console.log('🎯 First run detected — setting up PyMentor...');
    runSetup();
  }
  const port = parseInt(args.find(a => a.startsWith('--port='))?.split('=')[1]) || 3000;
  startServer(port);
}
```

---

### 4. 📝 Package.json for NPM Distribution

```json
{
  "name": "pymentor",
  "version": "1.0.0",
  "description": "Learn Python by Building Logic — an interactive, offline-capable Python tutor",
  "bin": {
    "pymentor": "./bin/cli.js"
  },
  "files": [
    "bin/",
    "dist/",
    "prisma/",
    "public/"
  ],
  "scripts": {
    "build": "next build && node scripts/prepare-dist.js",
    "prepublishOnly": "npm run build"
  },
  "dependencies": {
    "@prisma/client": "^7.8.0",
    "better-sqlite3": "^11.0.0",
    "dotenv": "^17.4.2",
    "open": "^10.0.0"
  },
  "prisma": {
    "schema": "prisma/schema.prisma"
  },
  "keywords": ["python", "mentor", "learn", "tutorial", "offline"],
  "license": "MIT"
}
```

**Key points:**
- `bin.pymentor` — registers the `pymentor` command globally
- `files` — only ship what's needed (not source code)
- `prepublishOnly` — auto-builds before npm publish
- `better-sqlite3` — the native SQLite driver Prisma uses for SQLite

---

### 5. 🔄 Pyodide: Handling Offline Code Execution

**Current state:** Pyodide (~15MB WASM) is loaded from `cdn.jsdelivr.net` at runtime.

**Options for offline support:**

| Option | Pros | Cons |
|--------|------|------|
| **A. Bundle Pyodide in npm package** | True offline from day 1 | +15MB package size |
| **B. Cache after first online load** | Small package size | Needs internet once |
| **C. Service Worker caching** | Auto-caches after first visit | Complex setup |

**Recommended: Option A — Bundle Pyodide**

The npm package will include Pyodide in `public/pyodide/`:
```
public/pyodide/
├── pyodide.mjs
├── pyodide.wasm
├── python_stdlib.zip
└── packages/         # Pre-loaded packages
```

Then update `usePyodide.ts`:
```typescript
// BEFORE: Load from CDN
const pyodideModule = await import(
  "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.mjs"
);

// AFTER: Load from local server
const pyodideModule = await import("/pyodide/pyodide.mjs");
const pyodide = await pyodideModule.loadPyodide({
  indexURL: "/pyodide/",
});
```

This makes code execution **100% offline** from the first run.

**Alternative (smaller package):** Option B — Fallback approach:
```typescript
try {
  // Try local first (available after npm install)
  const pyodideModule = await import("/pyodide/pyodide.mjs");
  return await pyodideModule.loadPyodide({ indexURL: "/pyodide/" });
} catch {
  // Fallback to CDN (first run before cache, or if not bundled)
  const pyodideModule = await import("https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.mjs");
  return await pyodideModule.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/",
  });
}
```

---

### 6. 🤖 AI Mentor: Graceful Offline Handling

The AI Mentor is the **only feature that requires internet**. Everything else works offline.

**Strategy:**

1. **Detect offline state** — check if API key is configured
2. **Show friendly UI** — "AI Mentor requires an API key" / "You're offline"
3. **Allow optional API key setup** — via `pymentor config`

**Changes to `src/components/floating-ai-mentor.tsx`:**
```typescript
// Before sending a message, check if AI is available
const aiAvailable = await fetch('/api/ai-mentor', { method: 'GET' })
  .then(r => r.json())
  .then(d => d.configured)
  .catch(() => false);

if (!aiAvailable) {
  // Show a helpful message instead of trying to call the API
  addMessage({
    role: 'assistant',
    content: '🔒 AI Mentor requires an API key to work. Run `pymentor config` to set one up, or add OPENROUTER_API_KEY to ~/.pymentor/.env'
  });
  return;
}
```

**`pymentor config` command:**
```bash
$ pymentor config

PyMentor Configuration
──────────────────────
Data directory: ~/.pymentor
Database: ~/.pymentor/pymentor.db (42 MB)
AI Provider: Not configured

To enable AI Mentor, set an API key:
  pymentor config --set-key OPENROUTER_API_KEY=sk-or-xxx

Or edit directly: ~/.pymentor/.env
```

---

### 7. 📂 Data Directory Structure on User's Machine

```
~/.pymentor/
├── pymentor.db          # SQLite database (all data — notes, progress, etc.)
├── .env                 # User's API keys & config
├── config.json          # App settings (theme, preferences, etc.)
└── logs/                # Optional: server logs
    └── server.log
```

**Data stored in SQLite (`pymentor.db`):**
- ✅ User profile (auto-created local user)
- ✅ Lesson progress (which lessons completed, time spent)
- ✅ Exercise submissions (code, scores, test results)
- ✅ Quiz submissions (scores)
- ✅ Notes & Bookmarks
- ✅ AI Chat history
- ✅ Achievements & streaks
- ✅ User memory (weak topics, explanation style)
- ✅ Full curriculum (lessons, exercises, quizzes, projects)

**This means:** Users can literally back up their entire learning history by
copying one file (`pymentor.db`). They can transfer it between machines!

---

### 8. 🔧 Build & Publish Pipeline

#### `scripts/prepare-dist.js` — Run after `next build`

```javascript
// Copies everything needed into dist/ for npm packaging
const fs = require('fs');
const path = require('path');

// 1. Copy standalone server
copyDir('.next/standalone', 'dist/server');

// 2. Copy static assets (Next.js standalone doesn't include these)
copyDir('.next/static', 'dist/server/.next/static');
copyDir('public', 'dist/server/public');

// 3. Copy Prisma schema & seed
copyFile('prisma/schema.prisma', 'dist/prisma/schema.prisma');
// Seed script should be pre-compiled to JS

// 4. Copy migrations
copyDir('prisma/migrations', 'dist/prisma/migrations');

console.log('✅ dist/ prepared for npm packaging');
```

#### `scripts/build.sh` — Full build pipeline
```bash
#!/bin/bash
set -e

echo "🔨 Building PyMentor for npm distribution..."

# 1. Generate Prisma client for SQLite
npx prisma generate

# 2. Build Next.js with standalone output
npm run build

# 3. Prepare dist directory
node scripts/prepare-dist.js

# 4. Compile seed script
npx tsx prisma/seed.ts --compile  # or npx tsc

echo "✅ Build complete! Ready for npm publish."
```

#### Publishing:
```bash
npm publish --access public
```

---

## 📋 Step-by-Step Implementation Order

### Phase 1: SQLite Migration (Critical Path)
1. ✅ Change `prisma/schema.prisma` → `provider = "sqlite"`
2. ✅ Convert all `Json` fields to `String` in schema
3. ✅ Update `src/lib/db/prisma.ts` — remove pg/PrismaPg, use plain PrismaClient
4. ✅ Update all service files to `JSON.parse()` on read for former-Json fields
5. ✅ Update `prisma/seed.ts` — `JSON.stringify()` all complex data going into String fields
6. ✅ Remove `@prisma/adapter-pg`, `pg`, `@types/pg` from package.json
7. ✅ Create Prisma migration for SQLite
8. ✅ Test: App runs with SQLite locally

### Phase 2: Standalone Build
9. ✅ Add `output: 'standalone'` to `next.config.ts`
10. ✅ Create `scripts/prepare-dist.js`
11. ✅ Create `scripts/build.sh`
12. ✅ Test: `next build` produces working standalone output

### Phase 3: CLI Tool
13. ✅ Create `bin/cli.js` with all commands
14. ✅ Create `scripts/setup.js` (first-run initialization)
15. ✅ Create `scripts/start.js` (server launcher)
16. ✅ Test: `node bin/cli.js` works end-to-end

### Phase 4: Pyodide Bundling
17. ✅ Download Pyodide assets to `public/pyodide/`
18. ✅ Update `usePyodide.ts` to load from local path
19. ✅ Test: Code execution works offline

### Phase 5: AI Mentor Graceful Degradation
20. ✅ Update AI mentor UI for offline/no-key state
21. ✅ Add `pymentor config` command
22. ✅ Add helpful messages when AI is unavailable

### Phase 6: Polish & Publish
23. ✅ Update `package.json` for npm distribution
24. ✅ Add `pymentor backup` / `pymentor restore` commands
25. ✅ Write user-facing README with installation instructions
26. ✅ Test on fresh machine (simulate `npm install -g pymentor`)
27. ✅ Publish to npm

---

## 🧮 Estimated Package Size

| Component | Size |
|-----------|------|
| Next.js standalone server | ~50 MB |
| Prisma engine (SQLite) | ~5 MB |
| Pyodide WASM + stdlib | ~15 MB |
| Curriculum data (seeded, not in package) | 0 (generated on first run) |
| Public assets (fonts, icons) | ~1 MB |
| **Total npm package** | **~70 MB** |

> 💡 **Optimization:** If we skip bundling Pyodide (Option B — CDN fallback),
> the package drops to ~55 MB. Pyodide gets cached by the browser after the
> first online session, so it's effectively offline after first use.

---

## 🛡️ Offline Feature Matrix

| Feature | Works Offline? | Notes |
|---------|---------------|-------|
| 📖 Lessons & Curriculum | ✅ | Seeded into local SQLite |
| 💻 Code Editor & Execution | ✅ | Pyodide runs in browser |
| 🏋️ Exercises | ✅ | Starter code + test cases in DB |
| 📝 Quizzes | ✅ | Questions stored in DB |
| 📊 Progress Tracking | ✅ | All stored in SQLite |
| 📓 Notes & Bookmarks | ✅ | Stored in SQLite |
| 🏆 Achievements & Streaks | ✅ | Stored in SQLite |
| 🗂️ Projects | ✅ | Descriptions in DB |
| 🤖 AI Mentor Chat | ❌ | Needs API key + internet |
| 🔄 Daily Challenge | ✅ | Can be pre-generated |

> **Bottom line:** 9 out of 10 features work fully offline. The AI Mentor is
> the only feature requiring internet, and users can opt-in by providing their
> own API key.

---

## 🔄 Migration: What Changes for Existing Users

If someone has been using the cloud-hosted version:

1. **Data export from cloud**: The existing `user-data-export.json` can be used
   to migrate data from the PostgreSQL cloud instance.
2. **New local install**: `npm install -g pymentor` → fresh start with empty DB
3. **Import old data**: `pymentor restore --file user-data-export.json`

---

## ⚠️ Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| SQLite performance with large datasets | Low | Low | Single-user app; SQLite handles this fine |
| Pyodide WASM compatibility issues | Low | Medium | Fallback to CDN; test on major OSes |
| npm package size too large | Medium | Low | Skip Pyodide bundling; use CDN fallback |
| Prisma SQLite migration issues | Medium | High | Thorough testing; keep migration path clean |
| `better-sqlite3` native module build issues | Medium | High | Use `@prisma/client` SQLite provider which handles this; prebuild binaries |
| Next.js standalone quirks | Low | Medium | Document known issues; test thoroughly |

---

## 📅 Timeline Estimate

| Phase | Duration | Description |
|-------|----------|-------------|
| Phase 1: SQLite Migration | 2-3 days | Core database change + service file updates |
| Phase 2: Standalone Build | 1 day | Next.js output config + dist script |
| Phase 3: CLI Tool | 1-2 days | CLI commands + setup/start scripts |
| Phase 4: Pyodide Bundling | 0.5 day | Download + path changes |
| Phase 5: AI Graceful Degradation | 0.5 day | Offline UI + config command |
| Phase 6: Polish & Publish | 1-2 days | README, testing, npm publish |
| **Total** | **6-9 days** | |

---

## 🎉 Summary

**Yes, this is absolutely possible and a great idea!** Here's why:

1. **SQLite makes it offline**: Replacing PostgreSQL with SQLite means the entire
   database lives in a single file on the user's machine. No server, no config,
   no network needed.

2. **Pyodide already runs in the browser**: Code execution doesn't need a server.
   We just need to bundle the WASM files instead of loading from CDN.

3. **Next.js standalone bundles everything**: The `output: 'standalone'` mode
   creates a self-contained server that only needs Node.js to run.

4. **npm CLI is the perfect UX**: `npm install -g pymentor` + `pymentor` is as
   simple as it gets. No git clone, no env setup, no database config.

5. **Data persistence is automatic**: All notes, progress, bookmarks, and
   achievements are saved to `~/.pymentor/pymentor.db` automatically. Users
   don't do anything special — it just works.

6. **Offline-first**: 90% of features work without internet. Only the AI Mentor
   needs an API key + internet, and users can opt-in at any time.

**The one thing to accept:** The AI Mentor will never work fully offline
(because LLMs are server-side). But that's OK — the core learning experience
(lessons, exercises, quizzes, projects, code execution, notes, progress)
works 100% offline.
