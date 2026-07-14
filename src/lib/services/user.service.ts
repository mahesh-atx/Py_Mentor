import { db } from "../db/prisma";
import { computeXpFromRaw } from "./xp-calculator";

/**
 * UserService
 * Manages the single local user for the single-player experience.
 */
export const UserService = {
  /** Gets the local user, creating one if it doesn't exist */
  async getLocalUser() {
    let user = await db.user.findFirst();
    if (!user) {
      user = await db.user.create({
        data: {
          name: "Local Developer",
          email: "local@pymentor.dev",
          image: "https://ui-avatars.com/api/?name=Local+Developer&background=3B82F6&color=fff&size=128",
        },
      });
    }
    return user;
  },

  /** Aggregates user stats — delegates XP math to the centralised calculator */
  async getUserStats() {
    const user = await this.getLocalUser();

    const [completedProgress, passedSubmissions] = await Promise.all([
      db.progress.findMany({
        where: { userId: user.id, status: "completed" },
        select: { lessonId: true },
      }),
      db.submission.findMany({
        where: { userId: user.id, status: "passed", exerciseId: { not: null } },
        select: { exerciseId: true, score: true },
      }),
    ]);

    const completedLessonSlugs = completedProgress.map((p) => p.lessonId);

    // Batch-load lesson xpReward map (1 query instead of N)
    const lessonXpMap = new Map<string, number>();
    if (completedLessonSlugs.length > 0) {
      const lessons = await db.lesson.findMany({
        where: { slug: { in: completedLessonSlugs } },
        select: { slug: true, xpReward: true },
      });
      for (const l of lessons) {
        lessonXpMap.set(l.slug, l.xpReward);
      }
    }

    const xp = computeXpFromRaw(
      completedLessonSlugs,
      passedSubmissions.map((s) => ({
        exerciseId: s.exerciseId!,
        score: s.score ?? 0,
      })),
      lessonXpMap,
    );

    // Count unique exercises completed
    const uniqueExerciseIds = new Set(
      passedSubmissions.map((s) => s.exerciseId!).filter(Boolean),
    );

    return {
      totalXp: xp.totalXp,
      lessonsCompleted: completedLessonSlugs.length,
      exercisesCompleted: uniqueExerciseIds.size,
    };
  },
};
