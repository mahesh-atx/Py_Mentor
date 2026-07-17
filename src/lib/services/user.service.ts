import { db } from "../db/prisma";
import { computeXpFromRaw } from "./xp-calculator";

import { auth } from "@/auth";

/**
 * UserService
 * Manages the single local user for the single-player experience.
 */
export const UserService = {
  /** Gets the local user, creating one if it doesn't exist */
  async getLocalUser() {
    const session = await auth();
    const userId = session?.user?.id || "clq3p6f4w000008l4f6d4d1d1";

    let user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      user = await db.user.create({
        data: {
          id: userId,
          name: "Local Developer",
          email: `local-${userId}@pymentor.dev`,
          image: "https://ui-avatars.com/api/?name=Local+Developer&background=3B82F6&color=fff&size=128",
        },
      });
    }
    return user;
  },

  /** Aggregates user stats — delegates XP math to the centralised calculator */
  async getUserStats() {
    const user = await this.getLocalUser();

    const [completedProgress, passedSubmissions, quizSubmissions, quizzes, unlockedAchievements] = await Promise.all([
      db.progress.findMany({
        where: { userId: user.id, status: "completed" },
        select: { lessonId: true },
      }),
      db.submission.findMany({
        where: { userId: user.id, status: "passed", exerciseId: { not: null } },
        select: { exerciseId: true, score: true },
      }),
      db.quizSubmission.findMany({
        where: { userId: user.id },
        select: { quizId: true, score: true, total: true },
      }),
      db.quiz.findMany({
        where: { isPublished: true },
        select: { slug: true, xpReward: true },
      }),
      db.userAchievement.findMany({
        where: { userId: user.id },
        include: { achievement: { select: { xpReward: true } } },
      }),
    ]);

    const completedLessonSlugs = completedProgress.map((p: { lessonId: string }) => p.lessonId);

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

    const quizXpMap = new Map<string, number>(
      quizzes.map((q: { slug: string; xpReward: number }) => [q.slug, q.xpReward])
    );
    const achievementXpValues = unlockedAchievements.map(
      (ua: { achievement: { xpReward: number } }) => ua.achievement.xpReward
    );

    const xp = computeXpFromRaw(
      completedLessonSlugs,
      passedSubmissions.map((s: { exerciseId: string | null; score: number | null }) => ({
        exerciseId: s.exerciseId!,
        score: s.score ?? 0,
      })),
      lessonXpMap,
      quizSubmissions,
      quizXpMap,
      achievementXpValues
    );

    // Count unique exercises completed
    const uniqueExerciseIds = new Set(
      passedSubmissions.map((s: { exerciseId: string | null }) => s.exerciseId!).filter(Boolean),
    );

    return {
      totalXp: xp.totalXp,
      lessonsCompleted: completedLessonSlugs.length,
      exercisesCompleted: uniqueExerciseIds.size,
    };
  },
};
