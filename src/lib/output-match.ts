/**
 * Output comparison for exercise grading.
 *
 * Some exercises legitimately produce non-deterministic output (object ids,
 * random values, current dates, absolute paths, installed package lists…).
 * For those, seed data uses the sentinel line IGNORE_OUTPUT_CHECK, which
 * acts as a wildcard matching ANY actual line.
 *
 * Pure function so it can be unit-tested and shared by the practice page
 * and the offline exercise verifier.
 */

export const IGNORE_OUTPUT_LINE = "IGNORE_OUTPUT_CHECK";

/**
 * Returns true when `actual` matches `expected`:
 *  - Both sides are trimmed of leading/trailing whitespace first.
 *  - An expected line equal to IGNORE_OUTPUT_CHECK matches any actual line.
 *  - When the entire expected output is the sentinel, any output matches
 *    (the exercise only cares that the program ran without error).
 */
export function outputsMatch(actualRaw: string, expectedRaw: string): boolean {
  const actual = (actualRaw ?? "").trim();
  const expected = (expectedRaw ?? "").trim();

  if (expected === IGNORE_OUTPUT_LINE) return true;
  if (actual === expected) return true;

  const aLines = actual.split("\n");
  const eLines = expected.split("\n");
  if (aLines.length !== eLines.length) return false;

  return eLines.every(
    (line, i) => line.trim() === IGNORE_OUTPUT_LINE || line === aLines[i]
  );
}
