import { db } from "../db/prisma";
import { unstable_cache } from "next/cache";
import { ProgressService } from "./progress.service";

export const QuizService = {
  getQuizBySlug: unstable_cache(
    async (slug: string) => {
      return db.quiz.findFirst({
        where: { slug, isPublished: true },
        include: {
          questions: { orderBy: { order: "asc" } },
          topic: {
            include: { module: { include: { roadmap: true } } }
          }
        }
      });
    },
    ["curriculum-quiz"],
    { revalidate: 3600, tags: ["curriculum"] }
  ),

  async saveQuizSubmission({
    userId,
    quizId,
    score,
    total
  }: {
    userId: string;
    quizId: string;
    score: number;
    total: number;
  }) {
    const submission = await db.quizSubmission.upsert({
      where: {
        userId_quizId: {
          userId,
          quizId
        }
      },
      update: {
        score,
        total,
        completedAt: new Date()
      },
      create: {
        userId,
        quizId,
        score,
        total
      }
    });

    // Quiz activity counts toward the daily streak (same as lessons/exercises/projects)
    await ProgressService.recordStreak(userId);

    const quiz = await db.quiz.findFirst({ where: { slug: quizId } });
    const maxReward = quiz?.xpReward || 100;

    const percentage = score / total;
    const earnedXp = Math.floor(maxReward * percentage);

    return { success: true, earnedXp, submission };
  }
};
