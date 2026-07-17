/** Byte-level diff between a solution's actual output and expectedOutput.
 *  Usage: npx tsx scripts/diff-exercise.mts "<dir>" "<lesson>" <index>
 */
import { spawnSync } from "node:child_process";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as os from "node:os";
import * as fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [dir, lesson, idx] = process.argv.slice(2);
const file = path.resolve(__dirname, "..", "prisma", "notes", dir, "exercises.ts");
const mod = await import(file);
const e = mod.exercises[lesson]?.[Number(idx) - 1];
const tc = e.testCases[0];
const workdir = fs.mkdtempSync(path.join(os.tmpdir(), "pym-diff-"));
const res = spawnSync("python3", ["-c", e.solutionCode], {
  input: tc.input ?? "", encoding: "utf8", cwd: workdir, timeout: 15000,
});
fs.rmSync(workdir, { recursive: true, force: true });
if (res.status !== 0) {
  console.log("RUNTIME ERROR:", res.stderr);
  process.exit(1);
}
const a = String(res.stdout).trim();
const b = String(tc.expectedOutput).trim();
console.log("ACTUAL  :", JSON.stringify(a));
console.log("EXPECTED:", JSON.stringify(b));
for (let i = 0; i < Math.max(a.length, b.length); i++) {
  if (a[i] !== b[i]) {
    console.log(`first diff @${i}:`, JSON.stringify(a.slice(Math.max(0, i - 25), i + 25)), "VS", JSON.stringify(b.slice(Math.max(0, i - 25), i + 25)));
    break;
  }
}
