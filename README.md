# PyMentor — Learn Python by Building Logic

**PyMentor** is a full-stack, open-source learning platform that teaches Python through interactive lessons, hands-on exercises, quizzes, projects, and an AI mentor that tutors you in real time. It runs entirely in your browser with a live code editor powered by [Pyodide](https://pyodide.org) and [Monaco](https://microsoft.github.io/monaco-editor/).

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
| **Database** | PostgreSQL via [Prisma ORM](https://prisma.io) |
| **UI** | [shadcn/ui](https://ui.shadcn.com) + [Tailwind CSS v4](https://tailwindcss.com) |
| **Animations** | [Framer Motion](https://motion.dev) |
| **Code Editor** | [Monaco Editor](https://microsoft.github.io/monaco-editor/) |
| **Python Runtime** | [Pyodide](https://pyodide.org) (client-side) |
| **AI** | Streaming chat via [OpenRouter](https://openrouter.ai) / [NVIDIA](https://build.nvidia.com) |
| **Charts** | [Recharts](https://recharts.org) |
| **Auth** | NextAuth.js v5 (planned — currently single-user local mode) |
| **Deploy** | [Render](https://render.com) (see `render.yaml`) |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** ≥ 14 (local or cloud)
- An AI provider API key for the mentor (optional — the app works without it):
  - [OpenRouter](https://openrouter.ai/keys) or
  - [NVIDIA](https://build.nvidia.com/explore/discover) (free tier available)

### 1. Clone & Install

```bash
git clone https://github.com/mahesh-atx/Py_Mentor.git
cd Py_Mentor
npm install
```

### 2. Configure Environment

Create a `.env` file in the project root:

```env
# Database (required)
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

---

## Project Structure

```
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Curriculum seeder
│   └── notes/                 # Curriculum content (lessons, exercises)
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
├── src/
│   ├── app/
│   │   ├── (app)/              # Main app routes (dashboard, learn, practice, etc.)
│   │   ├── api/ai-mentor/      # AI streaming endpoint
│   │   └── actions.ts          # Server actions (mutations)
│   │
│   ├── components/
│   │   ├── floating-ai-mentor.tsx   # AI chat widget
│   │   ├── floating-editor.tsx      # Code playground widget
│   │   ├── layout/                  # Sidebar, top nav, command palette
│   │   └── ui/                      # shadcn/ui primitives
│   │
│   ├── lib/
│   │   ├── ai/                 # LLM client + prompt builder
│   │   ├── db/                 # Prisma client
│   │   ├── hooks/              # React hooks (usePyodide, etc.)
│   │   ├── services/           # Business logic layer
│   │   │   ├── curriculum.service.ts
│   │   │   ├── progress.service.ts
│   │   │   ├── gamification.service.ts
│   │   │   ├── ai-chat.service.ts
│   │   │   ├── sandbox.service.ts
│   │   │   └── ...
│   │   ├── rate-limit.ts       # In-memory rate limiter
│   │   └── xp-calculator.ts    # Centralised XP/level math
│   │
│   └── auth.ts                 # Auth stub (NextAuth.js integration point)
│
├── public/                     # Static assets, fonts
├── render.yaml                 # Render deploy config
└── generate_modules.py         # Curriculum scaffold generator
```

---

## Architecture

PyMentor follows a **service-oriented architecture** inside Next.js:

- **Server Actions** (`src/app/actions.ts`) handle mutations (complete lesson, submit exercise, save note, etc.)
- **Services** (`src/lib/services/`) encapsulate business logic and database queries
- **Route Handlers** (`src/app/api/`) handle streaming and status endpoints
- **Client Components** use server actions directly via React's `useActionState` / `useTransition`

The **AI Mentor** builds a context-aware system prompt by injecting the current lesson content, exercise description, learner's code, and saved memory (weak topics, preferred explanation styles). This produces grounded, relevant tutoring rather than generic LLM responses.

XP and level calculations are centralised in `xp-calculator.ts` so every part of the app (dashboard, progress page, achievements) shows the same numbers.

---

## Roadmap

- [x] Structured Python curriculum (14 modules, 80+ exercises)
- [x] Live code editor with Pyodide
- [x] AI mentor with streaming + context grounding
- [x] Gamification (XP, levels, streaks, achievements)
- [x] Progress dashboard with charts
- [x] Notes & bookmarks
- [ ] Full NextAuth.js integration (GitHub, Google, credentials)
- [ ] Self-hosted code execution (remove Piston API dependency)
- [ ] Email notifications (streak reminders)
- [ ] Multi-language curriculum (JavaScript, TypeScript)
- [ ] Admin dashboard
- [ ] Tests (unit + integration)

---

## Contributing

Contributions are welcome! This is a solo project that would benefit from:

- Additional curriculum content (modules, exercises, projects)
- Tests
- Accessibility improvements
- Documentation

Please open an issue or PR on GitHub.

---

## License

MIT
