# PyMentor — Learn Python by Building Logic

**PyMentor** is a full-stack, open-source learning platform that teaches Python through interactive lessons, hands-on exercises, quizzes, projects, and an AI mentor that tutors you in real time. It runs entirely in your browser with a live code editor powered by [Pyodide](https://pyodide.org) and [Monaco](https://microsoft.github.io/monaco-editor/).

---

## 🚀 Quick Start (npm CLI)

The fastest way to use PyMentor — no database setup, no git clone:

```bash
# Install globally
npm install -g pymentor

# Launch — that's it!
pymentor
```

**What happens on first run:**
1. Creates `~/.pymentor/` data directory
2. Initializes local SQLite database
3. Seeds curriculum (lessons, exercises, quizzes, projects, achievements)
4. Starts a local server on `localhost:3000`
5. Opens the browser automatically

**All your data persists** in `~/.pymentor/pymentor.db` — notes, progress, bookmarks, streaks, achievements. Everything works offline except the AI Mentor chat (which needs an API key).

### CLI Commands

```bash
pymentor                              # Start the app (opens browser)
pymentor start --port 8080            # Use a custom port
pymentor config                       # Show current configuration
pymentor config --set-key OPENROUTER_API_KEY=sk-xxx  # Set AI API key
pymentor backup                       # Create a backup of your data
pymentor restore ./backup.db          # Restore from a backup file
pymentor reset --force                # Reset all user data
pymentor --version                    # Show version
pymentor --help                       # Show help
```

### Data Location

All user data is stored in `~/.pymentor/`:

```
~/.pymentor/
├── pymentor.db          # SQLite database (all data — notes, progress, etc.)
├── .env                 # API keys & config
├── config.json          # App settings
└── backups/             # Auto-created backups
```

### Offline Feature Matrix

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

---

## ☁️ Cloud Deployment (PostgreSQL)

For multi-user or hosted deployments, PyMentor supports PostgreSQL as the database backend:

### Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** ≥ 14 (local or cloud)
- An AI provider API key for the mentor (optional):
  - [OpenRouter](https://openrouter.ai/keys) or [NVIDIA](https://build.nvidia.com/explore/discover)

### 1. Clone & Install

```bash
git clone https://github.com/mahesh-atx/Py_Mentor.git
cd Py_Mentor
npm install
```

### 2. Configure Environment

Create a `.env` file in the project root:

```env
# Database (required — PostgreSQL for cloud mode)
DATABASE_URL="postgresql://user:password@localhost:5432/pymentor"

# Auth secret (generate with: openssl rand -base64 32)
AUTH_SECRET="your-secret-here"

# AI Mentor (optional — skip to use the app without AI)
OPENROUTER_API_KEY="sk-or-v1-..."
# OR
NVIDIA_API_KEY="nvapi-..."

# Optional overrides
DEFAULT_AI_PROVIDER="openrouter"       # or "nvidia"
DEFAULT_AI_MODEL="openai/gpt-oss-120b"
```

### 3. Set Up the Database

```bash
# Generate the Prisma client
npx prisma generate

# Push the schema to your database
npx prisma db push

# Seed the curriculum
npx tsx prisma/seed.ts
```

> **Re-seeding:** The seed script is safe to re-run — it uses upserts and won't delete user data.
> To reset the curriculum completely, run: `npx tsx prisma/seed.ts --force`

### 4. Start Developing

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app creates a local user automatically on first visit.

### 5. Build for Production

```bash
# Cloud build (PostgreSQL)
npm run build:cloud

# Or: npm build for standard Next.js build
```

---

## Features

- **📖 Structured Curriculum** — 14 modules across 3 phases: Fundamentals → Data Structures → Object-Oriented Programming
- **💻 Live Code Editor** — Monaco-powered editor with instant Python execution via Pyodide (no server required)
- **🧪 Exercises & Test Cases** — 80+ exercises at four difficulty tiers with automated pass/fail checking
- **❓ Quizzes** — Multiple-choice quizzes with XP rewards
- **🏗️ Projects** — Guided capstone projects with requirements and milestones
- **🤖 AI Mentor** — Streaming chat with context-aware tutoring (knows which lesson you're on and what code you're writing). Supports OpenRouter and NVIDIA LLMs
- **🏆 Gamification** — XP, levels, daily streaks, unlockable achievements
- **📊 Progress Dashboard** — Activity charts, topic mastery radar, streak tracking
- **📝 Notes & Bookmarks** — Save personal notes and bookmark lessons/exercises
- **🎨 Dark & Light Mode** — Warm colour palette with full theme support

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) with React 19 |
| **Language** | TypeScript |
| **Database** | PostgreSQL *or* SQLite via [Prisma ORM](https://prisma.io) |
| **UI** | [shadcn/ui](https://ui.shadcn.com) + [Tailwind CSS v4](https://tailwindcss.com) |
| **Animations** | [Framer Motion](https://motion.dev) |
| **Code Editor** | [Monaco Editor](https://microsoft.github.io/monaco-editor/) |
| **Python Runtime** | [Pyodide](https://pyodide.org) (client-side, offline-capable) |
| **AI** | Streaming chat via [OpenRouter](https://openrouter.ai) / [NVIDIA](https://build.nvidia.com) |
| **Charts** | [Recharts](https://recharts.org) |
| **CLI** | Node.js CLI with auto-setup, backup/restore, config management |
| **Deploy** | [Render](https://render.com) (see `render.yaml`) or `npm install -g pymentor` |

---

## Architecture

### Dual Database Support

PyMentor supports two database backends, auto-detected via the `DATABASE_URL` environment variable:

| | PostgreSQL (Cloud) | SQLite (npm CLI) |
|---|---|---|
| **Trigger** | `DATABASE_URL=postgresql://...` | `DATABASE_URL=file:...` |
| **Schema** | `prisma/schema.prisma` | `prisma/schema.sqlite.prisma` |
| **Adapter** | pg Pool + PrismaPg | Plain PrismaClient |
| **Use case** | Multi-user hosted deployment | Single-user local install |

The `src/lib/db/prisma.ts` module auto-detects the provider. The `json-helper.ts` module transparently handles the `Json`→`String` type difference between the two databases.

### Service-Oriented Design

PyMentor follows a **service-oriented architecture** inside Next.js:

- **Server Actions** (`src/app/actions.ts`) handle mutations (complete lesson, submit exercise, save note, etc.)
- **Services** (`src/lib/services/`) encapsulate business logic and database queries
- **Route Handlers** (`src/app/api/`) handle streaming and status endpoints
- **Client Components** use server actions directly via React's `useActionState` / `useTransition`

The **AI Mentor** builds a context-aware system prompt by injecting the current lesson content, exercise description, learner's code, and saved memory (weak topics, preferred explanation styles). This produces grounded, relevant tutoring rather than generic LLM responses.

XP and level calculations are centralised in `xp-calculator.ts` so every part of the app (dashboard, progress page, achievements) shows the same numbers.

---

## Project Structure

```
├── bin/
│   └── cli.js                  # CLI entry point (pymentor command)
│
├── prisma/
│   ├── schema.prisma           # PostgreSQL schema (cloud)
│   ├── schema.sqlite.prisma    # SQLite schema (npm CLI)
│   ├── migrations.sqlite/      # SQLite migration SQL
│   ├── seed.ts                 # Curriculum seeder (dual-db compatible)
│   └── notes/                  # Curriculum content (lessons, exercises)
│       ├── 1.1 Getting Started/
│       ├── 1.2 Variables & Data Types/
│       ├── 1.3 Operators/
│       ├── 1.4 Control Flow/
│       ├── 1.5 Loops/
│       ├── 2.1 Data Structures/
│       ├── 2.2 Functions/
│       ├── 2.3 String Manipulation/
│       ├── 2.4 File Handling/
│       ├── 2.5 Error Handling/
│       ├── 3.1 OOP Fundamentals/
│       └── 3.2 OOP Pillars/
│
├── scripts/
│   ├── build.sh                # Full build pipeline (--cloud flag)
│   ├── prepare-dist.js         # Post-build dist assembly
│   └── download-pyodide.sh     # Download Pyodide for offline use
│
├── src/
│   ├── app/
│   │   ├── (app)/              # Main app routes (dashboard, learn, practice, etc.)
│   │   ├── api/ai-mentor/      # AI streaming endpoint
│   │   └── actions.ts          # Server actions (mutations)
│   │
│   ├── components/
│   │   ├── floating-ai-mentor.tsx   # AI chat widget (graceful offline)
│   │   ├── floating-editor.tsx      # Code playground widget
│   │   ├── layout/                  # Sidebar, top nav, command palette
│   │   └── ui/                      # shadcn/ui primitives
│   │
│   ├── lib/
│   │   ├── ai/                 # LLM client + prompt builder
│   │   ├── db/                 # Prisma client (auto PG/SQLite) + json-helper
│   │   ├── hooks/              # React hooks (usePyodide — local-first loading)
│   │   ├── services/           # Business logic layer
│   │   │   ├── curriculum.service.ts
│   │   │   ├── progress.service.ts
│   │   │   ├── gamification.service.ts
│   │   │   ├── ai-chat.service.ts
│   │   │   └── ...
│   │   ├── rate-limit.ts       # In-memory rate limiter
│   │   └── xp-calculator.ts    # Centralised XP/level math
│   │
│   └── auth.ts                 # Auth stub (NextAuth.js integration point)
│
├── __tests__/                  # Test suite (295 tests)
│   ├── json-helper.test.ts     # JSON parse/stringify helpers
│   ├── db-provider.test.ts     # PG/SQLite auto-detection
│   ├── sqlite-schema.test.ts   # SQLite schema validation
│   ├── schema-sync.test.ts     # PG↔SQLite schema parity
│   ├── build-standalone.test.ts # Build pipeline validation
│   ├── cli.test.ts             # CLI command tests
│   └── offline-support.test.ts # Pyodide + AI offline handling
│
├── public/                     # Static assets, fonts
├── render.yaml                 # Render deploy config
└── NPM_DISTRIBUTION_PLAN.md    # Full distribution plan
```

---

## Building for npm Distribution

```bash
# 1. Build the standalone Next.js server
npm run build:npm

# 2. (Optional) Download Pyodide for full offline support
npm run download-pyodide

# 3. Test the CLI locally
node bin/cli.js start --port 3000

# 4. Publish to npm
npm publish --access public
```

---

## Testing

```bash
# Run all tests
npm test

# Run SQLite-specific tests only
npm run test:sqlite

# Watch mode
npm run test:watch
```

The test suite covers:
- **JSON helpers** — `parseJsonField()` / `stringifyJsonField()` for PG↔SQLite compatibility
- **DB provider detection** — Auto-switching between PostgreSQL and SQLite
- **Schema validation** — SQLite schema structure and migration SQL
- **Schema sync** — Ensuring PG and SQLite schemas stay in parity
- **Build pipeline** — Standalone build output validation
- **CLI** — All CLI commands and argument parsing
- **Offline support** — Pyodide local-first loading, AI mentor graceful degradation

---

## Roadmap

- [x] Structured Python curriculum (14 modules, 80+ exercises)
- [x] Live code editor with Pyodide
- [x] AI mentor with streaming + context grounding
- [x] Gamification (XP, levels, streaks, achievements)
- [x] Progress dashboard with charts
- [x] Notes & bookmarks
- [x] Offline-capable npm CLI (`npm install -g pymentor`)
- [x] SQLite support (dual PG/SQLite database)
- [x] Local-first Pyodide loading (CDN fallback)
- [x] AI Mentor graceful degradation for offline
- [ ] Full NextAuth.js integration (GitHub, Google, credentials)
- [ ] Email notifications (streak reminders)
- [ ] Multi-language curriculum (JavaScript, TypeScript)
- [ ] Admin dashboard
- [ ] Bundle real Pyodide WASM in npm package

---

## Contributing

Contributions are welcome! This is a solo project that would benefit from:

- Additional curriculum content (modules, exercises, projects)
- Tests
- Accessibility improvements
- Documentation
- Pyodide WASM bundling optimization

Please open an issue or PR on GitHub.

---

## License

MIT
