/**
 * Centralized XP calculator — the single source of truth for XP/level math.
 *
 * Every service that touches XP (ProgressService, UserService, GamificationService)
 * must go through this module so numbers stay consistent dashboard-wide.
 */

export const XP_PER_LEVEL = 500;

export interface XpBreakdown {
  /** Total XP across all sources */
  totalXp: number;
  /** XP earned from completed lessons (sum of each lesson's xpReward) */
  lessonXp: number;
  /** XP earned from unique passed exercise submissions (sum of their scores) */
  exerciseXp: number;
  /** Derived level: floor(totalXp / XP_PER_LEVEL) + 1 (levels start at 1) */
  level: number;
  /** Progress within the current level (0 … XP_PER_LEVEL-1) */
  xpInCurrentLevel: number;
}

/**
 * Compute the full XP breakdown from raw aggregates.
 *
 * @param lessonXp   Sum of `xpReward` for every completed lesson.
 * @param exerciseXp Sum of `score` for unique passed exercise submissions.
 */
export function computeXp(lessonXp: number, exerciseXp: number): XpBreakdown {
  const totalXp = lessonXp + exerciseXp;
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  const xpInCurrentLevel = totalXp % XP_PER_LEVEL;

  return {
    totalXp,
    lessonXp,
    exerciseXp,
    level,
    xpInCurrentLevel,
  };
}

/**
 * Convenience helper: builds an XpBreakdown from raw Prisma query results.
 *
 * @param completedLessonSlugs  Array of lesson slugs the user completed.
 * @param exerciseScores        Array of { exerciseId, score } for passed
 *                              submissions. Duplicate exerciseId entries are
 *                              de-duplicated (only the first score is counted).
 */
export function computeXpFromRaw(
  completedLessonSlugs: string[],
  exerciseScores: { exerciseId: string; score: number }[],
  lessonXpMap: Map<string, number>, // slug → xpReward
): XpBreakdown {
  // Lesson XP: sum the xpReward for every completed lesson.
  let lessonXp = 0;
  for (const slug of completedLessonSlugs) {
    lessonXp += lessonXpMap.get(slug) ?? 50; // fallback for legacy data
  }

  // Exercise XP: only count each exercise once (first passing submission).
  const seen = new Set<string>();
  let exerciseXp = 0;
  for (const { exerciseId, score } of exerciseScores) {
    if (exerciseId && !seen.has(exerciseId)) {
      seen.add(exerciseId);
      exerciseXp += score;
    }
  }

  return computeXp(lessonXp, exerciseXp);
}
