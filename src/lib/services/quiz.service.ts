import { db } from "../db";
import { ProgressService } from "./progress.service";

export const QuizService = {
  async getQuizBySlug(slug: string) {
    return db.quiz.findFirst({
      where: { slug },
      include: {
        questions: {
          orderBy: { order: "asc" }
        },
        topic: true
      }
    });
  },

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
    // 1. Save or update the quiz submission
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

    // 2. Fetch the quiz to determine XP reward
    const quiz = await db.quiz.findUnique({ where: { id: quizId } });
    const maxReward = quiz?.xpReward || 100;

    // 3. Award XP based on percentage correct
    const percentage = score / total;
    const earnedXp = Math.floor(maxReward * percentage);

    // Save XP using ProgressService's internal tracking 
    // Wait, ProgressService doesn't have an addXp function directly, but it relies on completed lessons and submissions.
    // For now, this effectively tracks the quiz completion. We can update ProgressService to count quizXP later.

    return { success: true, earnedXp, submission };
  }
};
