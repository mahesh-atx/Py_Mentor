/**
 * Pure helpers for evaluating achievement conditions.
 *
 * Kept free of database access so the logic can be unit-tested
 * and reused by the gamification service.
 */

export interface SubmissionOutcome {
  exerciseId: string | null;
  status: string;
}

/**
 * Counts how many exercises the user has genuinely "debugged":
 * exercises with at least one failing submission ("failed" or "error")
 * AND at least one passing submission.
 *
 * This backs the "errors_fixed" achievement condition (e.g. Bug Hunter):
 * an error only counts as fixed once the same exercise eventually passes.
 */
export function countFixedErrors(submissions: SubmissionOutcome[]): number {
  const failed = new Set<string>();
  const passed = new Set<string>();

  for (const s of submissions) {
    if (!s.exerciseId) continue;
    if (s.status === "passed") {
      passed.add(s.exerciseId);
    } else if (s.status === "failed" || s.status === "error") {
      failed.add(s.exerciseId);
    }
  }

  let count = 0;
  for (const id of failed) {
    if (passed.has(id)) count++;
  }
  return count;
}
