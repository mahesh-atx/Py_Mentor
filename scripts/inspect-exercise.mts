/** Dump a single exercise for inspection.
 *  Usage: npx tsx scripts/inspect-exercise.mts "<dir-name>" "<lesson-key>" <index1-based>
 *  e.g.:  npx tsx scripts/inspect-exercise.mts "2.3 String Manipulation" string-formatting-fstrings 3
 */
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [dir, lesson, idx] = process.argv.slice(2);
const file = path.resolve(__dirname, "..", "prisma", "notes", dir, "exercises.ts");
const mod = await import(file);
const e = mod.exercises[lesson]?.[Number(idx) - 1];
if (!e) {
  console.error("not found");
  process.exit(1);
}
console.log("TITLE:", e.title);
console.log("PROMPT:", e.prompt);
console.log("STARTER:", JSON.stringify(e.starterCode));
console.log("SOLUTION:\n" + e.solutionCode);
console.log("TEST:", JSON.stringify(e.testCases));
console.log("DIFF:", e.difficulty, "XP:", e.xpReward);
