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
  /** XP earned from quiz submissions (proportional to score / total) */
  quizXp: number;
  /** XP earned from unlocked achievements (sum of their xpReward) */
  achievementXp: number;
  /** Derived level: floor(totalXp / XP_PER_LEVEL) + 1 (levels start at 1) */
  level: number;
  /** Progress within the current level (0 … XP_PER_LEVEL-1) */
  xpInCurrentLevel: number;
}

/**
 * Compute the full XP breakdown from raw aggregates.
 *
 * @param lessonXp      Sum of `xpReward` for every completed lesson.
 * @param exerciseXp    Sum of `score` for unique passed exercise submissions.
 * @param quizXp        Sum of per-quiz XP (floor of xpReward × score/total).
 * @param achievementXp Sum of `xpReward` for unlocked achievements.
 */
export function computeXp(
  lessonXp: number,
  exerciseXp: number,
  quizXp: number = 0,
  achievementXp: number = 0
): XpBreakdown {
  const totalXp = lessonXp + exerciseXp + quizXp + achievementXp;
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  const xpInCurrentLevel = totalXp % XP_PER_LEVEL;

  return {
    totalXp,
    lessonXp,
    exerciseXp,
    quizXp,
    achievementXp,
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
 *                              de-duplicated (the BEST score is counted —
 *                              rows hold xpReward on the first pass and 0 on
 *                              later passes, and query order isn't guaranteed).
 * @param quizResults           Array of { quizId, score, total } — one row per
 *                              quiz (the table upserts), each counted once.
 * @param quizXpMap             Map of quiz slug → xpReward.
 * @param achievementXpValues   xpReward values of the user's unlocked achievements.
 */
export function computeXpFromRaw(
  completedLessonSlugs: string[],
  exerciseScores: { exerciseId: string; score: number }[],
  lessonXpMap: Map<string, number>, // slug → xpReward
  quizResults: { quizId: string; score: number; total: number }[] = [],
  quizXpMap: Map<string, number> = new Map(), // quiz slug → xpReward
  achievementXpValues: number[] = []
): XpBreakdown {
  // Lesson XP: sum the xpReward for every completed lesson.
  let lessonXp = 0;
  for (const slug of completedLessonSlugs) {
    lessonXp += lessonXpMap.get(slug) ?? 50; // fallback for legacy data
  }

  // Exercise XP: count each exercise once, using its best score. Submission
  // rows store xpReward on the first pass and 0 on re-passes, and findMany()
  // without orderBy doesn't guarantee which row comes first.
  const bestByExercise = new Map<string, number>();
  for (const { exerciseId, score } of exerciseScores) {
    if (exerciseId) {
      bestByExercise.set(
        exerciseId,
        Math.max(bestByExercise.get(exerciseId) ?? 0, score)
      );
    }
  }
  let exerciseXp = 0;
  bestByExercise.forEach((score) => {
    exerciseXp += score;
  });

  // Quiz XP: proportional to the stored score (mirrors saveQuizSubmission).
  let quizXp = 0;
  for (const { quizId, score, total } of quizResults) {
    if (total > 0) {
      const reward = quizXpMap.get(quizId) ?? 100; // fallback matches saveQuizSubmission
      quizXp += Math.floor(reward * (score / total));
    }
  }

  // Achievement XP: sum the xpReward of every unlocked achievement.
  const achievementXp = achievementXpValues.reduce((sum, xp) => sum + xp, 0);

  return computeXp(lessonXp, exerciseXp, quizXp, achievementXp);
}
