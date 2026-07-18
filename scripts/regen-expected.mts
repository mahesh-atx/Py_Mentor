/** Regenerate expectedOutput from the solution's actual stdout, in place.
 *  Use when the solution is the ground truth (formatting drift in seed data).
 *  Usage: npx tsx scripts/regen-expected.mts "<dir>" "<lesson>" <index> ["<dir>" "<lesson>" <index> ...]
 */
import { spawnSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pythonBin = process.env.PYTHON_BIN || "python3";
const args = process.argv.slice(2);

for (let a = 0; a < args.length; a += 3) {
  const [dir, lesson, idxStr] = args.slice(a, a + 3);
  const idx = Number(idxStr) - 1;
  const file = path.resolve(__dirname, "..", "prisma", "notes", dir, "exercises.ts");
  const mod = await import(file + "?v=" + Date.now());
  const e = mod.exercises[lesson]?.[idx];
  if (!e) { console.error(`not found: ${dir} ${lesson} #${idxStr}`); process.exit(1); }
  const tc = e.testCases[0];

  const workdir = fs.mkdtempSync(path.join(os.tmpdir(), "pym-regen-"));
  const res = spawnSync(pythonBin, ["-c", e.solutionCode], {
    input: tc.input ?? "", encoding: "utf8", cwd: workdir, timeout: 20000,
  });
  fs.rmSync(workdir, { recursive: true, force: true });
  if (res.status !== 0) {
    console.error(`RUNTIME ERROR in ${lesson} #${idxStr}:\n${res.stderr}`);
    process.exit(1);
  }

  const actual = String(res.stdout ?? "");
  const src = fs.readFileSync(file, "utf8");

  // Replace the idx-th "expectedOutput" literal that appears after the lesson key.
  const keyPos = src.indexOf(`"${lesson}"`);
  if (keyPos < 0) { console.error(`lesson key not found in source: ${lesson}`); process.exit(1); }
  const re = /"expectedOutput": "(?:[^"\\]|\\.)*"/g;
  re.lastIndex = keyPos;
  let m: RegExpExecArray | null = null;
  for (let i = 0; i <= idx; i++) m = re.exec(src);
  if (!m) { console.error(`expectedOutput #${idxStr} not found after ${lesson}`); process.exit(1); }

  const replacement = `"expectedOutput": ${JSON.stringify(actual)}`;
  const out = src.slice(0, m.index) + replacement + src.slice(m.index + m[0].length);
  fs.writeFileSync(file, out);
  console.log(`regenerated: ${dir} [${lesson} #${idxStr}] -> ${JSON.stringify(actual.slice(0, 60))}...`);
}
