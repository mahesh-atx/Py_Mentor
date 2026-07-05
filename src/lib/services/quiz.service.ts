import { db } from "../db";
import { allQuizzes } from "../curriculum-data";

export const QuizService = {
  async getQuizBySlug(slug: string) {
    const quiz = allQuizzes.find(q => q.slug === slug);
    if (!quiz) return null;
    return quiz;
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

    // 2. Fetch the quiz from static data to determine XP reward
    const quiz = allQuizzes.find(q => q.id === quizId);
    const maxReward = quiz?.xpReward || 100;

    // 3. Award XP based on percentage correct
    const percentage = score / total;
    const earnedXp = Math.floor(maxReward * percentage);

    return { success: true, earnedXp, submission };
  }
};
