import { db } from "../db/prisma";

export const SubmissionService = {
  /** Get submission history for a user and exercise */
  async getHistory(userId: string, exerciseSlug: string) {
    return db.submission.findMany({
      where: { userId, exerciseId: exerciseSlug },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  },

  /** Get all passed submissions for a user across multiple exercise slugs */
  async getHistoryBatch(userId: string, exerciseSlugs: string[]) {
    return db.submission.findMany({
      where: {
        userId,
        exerciseId: { in: exerciseSlugs },
        status: "passed",
      },
      select: { exerciseId: true, status: true },
    });
  },
};
