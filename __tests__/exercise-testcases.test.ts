/**
 * Exercise data-integrity guard.
 *
 * PyMentor grades every exercise against exactly ONE test case (running the
 * whole program once per case is unreliable with stdin-based checks).
 * This test walks all curriculum files (prisma/notes/**​/exercises.ts) and
 * verifies the invariant so it can't regress when content is edited.
 */

import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { pathToFileURL } from "url";

const NOTES_DIR = path.join(__dirname, "..", "prisma", "notes");

function findExerciseFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findExerciseFiles(p));
    else if (entry.name === "exercises.ts") out.push(p);
  }
  return out;
}

describe("Curriculum exercises", () => {
  const files = findExerciseFiles(NOTES_DIR);

  it("finds the curriculum exercise files", () => {
    expect(files.length).toBeGreaterThan(10);
  });

  it("every exercise has at most ONE test case, with a valid shape", async () => {
    const offenders: string[] = [];
    let exerciseCount = 0;

    for (const file of files) {
      const mod = await import(pathToFileURL(file).href);
      const groups = mod.exercises as Record<string, any[]>;
      for (const [lessonSlug, list] of Object.entries(groups)) {
        for (const ex of list) {
          exerciseCount++;
          const tcs = ex.testCases;
          if (!Array.isArray(tcs) || tcs.length > 1) {
            offenders.push(
              `${path.basename(path.dirname(file))}/${lessonSlug}: "${ex.title}" (${Array.isArray(tcs) ? tcs.length : "not an array"} test cases)`
            );
            continue;
          }
          for (const tc of tcs) {
            if (typeof tc.input !== "string" || typeof tc.expectedOutput !== "string") {
              offenders.push(
                `${path.basename(path.dirname(file))}/${lessonSlug}: "${ex.title}" (test case missing input/expectedOutput strings)`
              );
            }
          }
        }
      }
    }

    expect(exerciseCount).toBeGreaterThan(600); // sanity: whole curriculum loaded
    expect(offenders).toEqual([]);
  });
});
