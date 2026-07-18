/**
 * Exercise verification harness.
 *
 * Imports every prisma/notes/**​/exercises.ts, runs each exercise's
 * solutionCode with python3 (feeding testCases[0].input on stdin) and
 * compares trimmed stdout against trimmed expectedOutput — the same
 * comparison the practice page performs.
 *
 * Usage:  npx tsx scripts/verify-exercises.mts [--quiet]
 *
 * Exit code 1 when any exercise fails (broken solution or stale
 * expectedOutput), 0 otherwise. Exercises requiring third-party packages
 * not installed locally are reported as skipped, not failures.
 */
import { spawnSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { outputsMatch } from "../src/lib/output-match";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const quiet = process.argv.includes("--quiet");
const pythonBin = process.env.PYTHON_BIN || "python3";
const notesRoot = path.resolve(__dirname, "..", "prisma", "notes");

/** Recursively find all exercises.ts files in the notes tree. */
function findExerciseFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findExerciseFiles(p));
    else if (entry.name === "exercises.ts") out.push(p);
  }
  return out;
}

const files = findExerciseFiles(notesRoot);

interface Failure {
  where: string;
  reason: string;
}

let passed = 0;
const failures: Failure[] = [];
const skipped: Failure[] = [];

// Run everything inside a scratch dir so file-handling exercises don't
// litter the repository.
const workdir = fs.mkdtempSync(path.join(os.tmpdir(), "pymentor-verify-"));

for (const file of files) {
  const mod = await import(file);
  const exercises = mod.exercises as Record<string, any[]>;
  const rel = path.relative(process.cwd(), file);

  for (const [lesson, list] of Object.entries(exercises)) {
    if (!Array.isArray(list)) continue;

    for (let i = 0; i < list.length; i++) {
      const e = list[i];
      const where = `${rel} [${lesson} #${i + 1}] "${e.title}"`;
      const tc = Array.isArray(e.testCases) ? e.testCases[0] : null;

      if (!tc) {
        skipped.push({ where, reason: "no test case" });
        continue;
      }
      if (typeof e.solutionCode !== "string" || !e.solutionCode.trim()) {
        skipped.push({ where, reason: "no solution code" });
        continue;
      }

      const res = spawnSync(pythonBin, ["-c", e.solutionCode], {
        input: typeof tc.input === "string" ? tc.input : "",
        encoding: "utf8",
        timeout: 15000,
        cwd: workdir,
      });

      if (res.error || res.status !== 0) {
        const stderr = String(res.stderr || res.error || "").trim();
        if (/ModuleNotFoundError|ImportError/.test(stderr)) {
          skipped.push({ where, reason: `missing package (${stderr.split("\n").pop()?.slice(0, 80)})` });
        } else {
          failures.push({ where, reason: `runtime error: ${stderr.split("\n").pop()?.slice(0, 160)}` });
        }
        continue;
      }

      const actual = String(res.stdout ?? "");
      const expected = String(tc.expectedOutput ?? "");
      if (outputsMatch(actual, expected)) {
        passed++;
      } else {
        failures.push({
          where,
          reason:
            `output mismatch\n    expected: ${JSON.stringify(expected).slice(0, 140)}\n` +
            `    actual:   ${JSON.stringify(actual).slice(0, 140)}`,
        });
      }
    }
  }
}

fs.rmSync(workdir, { recursive: true, force: true });

console.log(`\n✅ passed:  ${passed}`);
console.log(`❌ failed:  ${failures.length}`);
console.log(`⏭️  skipped: ${skipped.length}`);

if (!quiet && failures.length > 0) {
  console.log("\n── Failures ───────────────────────────────────────────");
  for (const f of failures) console.log(`\n✗ ${f.where}\n    ${f.reason}`);
}
if (!quiet && skipped.length > 0) {
  console.log("\n── Skipped ────────────────────────────────────────────");
  for (const s of skipped) console.log(`• ${s.where} — ${s.reason}`);
}

process.exit(failures.length > 0 ? 1 : 0);
