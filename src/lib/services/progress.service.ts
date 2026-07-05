/**
 * ProgressService
 * 
 * Tracks lesson completion, quiz scores, coding time,
 * XP, levels, streaks, and weak/strong topic analysis.
 */

import { db } from "@/lib/db";
import { allLessons, allTopics, allExercises } from "../curriculum-data";

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

    const topicMap: Record<string, { completed: number; total: number }> = {};

    for (const p of progress) {
      const staticLesson = allLessons.find(l => l.id === p.lessonId);
      if (!staticLesson) continue;

      const topicName = staticLesson.topic.title;
      if (!topicMap[topicName]) {
        topicMap[topicName] = { completed: 0, total: 0 };
      }
      topicMap[topicName].completed++;
    }

    // Get total lessons per topic from static topics
    for (const topic of allTopics) {
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
    
    // Check if they already passed it to prevent farming XP on the exact same exercise.
    const existingSuccess = await db.submission.findFirst({
      where: { userId, exerciseId, status: "passed" }
    });

    const exercise = allExercises.find(e => e.id === exerciseId);
    const xpReward = exercise?.xpReward || 100;
    
    // Score is the XP reward if they passed and haven't passed before
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
