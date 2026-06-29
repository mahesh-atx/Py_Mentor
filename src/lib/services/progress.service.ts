/**
 * ProgressService
 * 
 * Tracks lesson completion, quiz scores, coding time,
 * XP, levels, streaks, and weak/strong topic analysis.
 */

import { db } from "@/lib/db";

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
      include: {
        lesson: {
          include: {
            topic: true,
          },
        },
      },
    });

    const topicMap: Record<string, { completed: number; total: number }> = {};

    for (const p of progress) {
      const topicName = p.lesson.topic.title;
      if (!topicMap[topicName]) {
        topicMap[topicName] = { completed: 0, total: 0 };
      }
      topicMap[topicName].completed++;
    }

    // Get total lessons per topic
    const topics = await db.topic.findMany({
      include: {
        lessons: { where: { isPublished: true } },
      },
    });

    for (const topic of topics) {
      if (!topicMap[topic.title]) {
        topicMap[topic.title] = { completed: 0, total: topic.lessons.length };
      } else {
        topicMap[topic.title].total = topic.lessons.length;
      }
    }

    return Object.entries(topicMap).map(([subject, data]) => ({
      subject,
      mastery: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0,
    }));
  },
};
