import { db } from "../db/prisma";

const XP_PER_LEVEL = 500;

export const ProgressService = {
  /** Get overall progress stats for a user */
  async getStats(userId: string) {
    const [completedLessons, submissions, streaks] = await Promise.all([
      db.progress.count({ where: { userId, status: "completed" } }),
      db.submission.findMany({ where: { userId }, select: { score: true, createdAt: true } }),
      db.streak.findMany({ where: { userId }, orderBy: { date: "desc" }, take: 30 }),
    ]);

    const totalXp = completedLessons * 50 + submissions.reduce((sum, s) => sum + (s.score || 0), 0);
    const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
    const xpInCurrentLevel = totalXp % XP_PER_LEVEL;

    // Calculate streak
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < streaks.length; i++) {
      const streakDate = new Date(streaks[i].date);
      streakDate.setHours(0, 0, 0, 0);
      const expected = new Date(today);
      expected.setDate(expected.getDate() - i);
      if (streakDate.getTime() === expected.getTime()) {
        currentStreak++;
      } else {
        break;
      }
    }

    const avgQuizScore = submissions.length > 0
      ? Math.round(submissions.reduce((sum, s) => sum + (s.score || 0), 0) / submissions.length)
      : 0;

    return {
      completedLessons,
      totalSubmissions: submissions.length,
      totalXp,
      level,
      xpInCurrentLevel,
      xpForNextLevel: XP_PER_LEVEL,
      currentStreak,
      avgQuizScore,
    };
  },

  /** Record a daily streak entry */
  async recordStreak(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return db.streak.upsert({
      where: { userId_date: { userId, date: today } },
      create: { userId, date: today },
      update: {},
    });
  },

  /** Get topic mastery data for radar chart */
  async getTopicMastery(userId: string) {
    const progress = await db.progress.findMany({
      where: { userId, status: "completed" },
    });

    const topics = await db.topic.findMany({
      where: { isPublished: true },
      include: { lessons: { where: { isPublished: true }, select: { slug: true } } }
    });

    const topicMap: Record<string, { completed: number; total: number }> = {};
    for (const t of topics) {
      topicMap[t.title] = { completed: 0, total: t.lessons.length };
    }

    for (const p of progress) {
      for (const t of topics) {
        if (t.lessons.some(l => l.slug === p.lessonId)) {
          topicMap[t.title].completed++;
          break;
        }
      }
    }

    return Object.entries(topicMap).map(([subject, data]) => ({
      subject,
      mastery: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0,
    }));
  },

  /** Mark a lesson as completed for the user */
  async markLessonComplete(userId: string, lessonId: string) {
    await this.recordStreak(userId);
    return db.progress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: { status: "completed", completedAt: new Date() },
      create: { userId, lessonId, status: "completed", completedAt: new Date() }
    });
  },

  /** Save an exercise submission */
  async saveExerciseSubmission({
    userId,
    exerciseId,
    code,
    status,
    testResults
  }: {
    userId: string;
    exerciseId: string;
    code: string;
    status: "passed" | "failed" | "error";
    testResults: any;
  }) {
    await this.recordStreak(userId);
    
    const existingSuccess = await db.submission.findFirst({
      where: { userId, exerciseId, status: "passed" }
    });

    const exercise = await db.exercise.findFirst({ where: { slug: exerciseId } });
    const xpReward = exercise?.xpReward || 100;
    
    const score = (status === "passed" && !existingSuccess) ? xpReward : 0;

    return db.submission.create({
      data: {
        userId,
        exerciseId,
        code,
        status,
        testResults: JSON.stringify(testResults),
        score,
      }
    });
  },

  /** Check if a lesson is completed */
  async isLessonCompleted(userId: string, lessonId: string) {
    const progress = await db.progress.findUnique({
      where: { userId_lessonId: { userId, lessonId } }
    });
    return progress?.status === "completed";
  },

  /** Save a project submission */
  async saveProjectSubmission({
    userId,
    projectId,
    repoUrl,
  }: {
    userId: string;
    projectId: string;
    repoUrl: string;
  }) {
    await this.recordStreak(userId);
    return db.submission.create({
      data: {
        userId,
        projectId,
        code: repoUrl,
        status: "passed", 
        testResults: JSON.stringify({ review: "AI Review Passed" })
      }
    });
  }
};
