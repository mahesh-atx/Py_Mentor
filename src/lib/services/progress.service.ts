import { db } from "../db/prisma";

const XP_PER_LEVEL = 500;

export const ProgressService = {
  /** Get overall progress stats for a user */
  async getStats(userId: string) {
    const [completedLessons, submissions, streaks, allProgress] = await Promise.all([
      db.progress.count({ where: { userId, status: "completed" } }),
      db.submission.findMany({ where: { userId }, select: { score: true, createdAt: true, timeTaken: true } }),
      db.streak.findMany({ where: { userId }, orderBy: { date: "desc" }, take: 30 }),
      db.progress.findMany({ where: { userId }, select: { timeSpent: true, updatedAt: true } }),
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

    // Calculate coding time and activity
    const activityData = [];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let totalCodingSeconds = 0;

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      activityData.push({
        dateStr: d.toDateString(),
        day: days[d.getDay()],
        seconds: 0
      });
    }

    for (const p of allProgress) {
      totalCodingSeconds += (p.timeSpent || 0);
      const dStr = new Date(p.updatedAt).toDateString();
      const dayData = activityData.find(a => a.dateStr === dStr);
      if (dayData) {
        dayData.seconds += (p.timeSpent || 0);
      }
    }

    for (const s of submissions) {
      totalCodingSeconds += (s.timeTaken || 0);
      const dStr = new Date(s.createdAt).toDateString();
      const dayData = activityData.find(a => a.dateStr === dStr);
      if (dayData) {
        dayData.seconds += (s.timeTaken || 0);
      }
    }

    const activityDataFormatted = activityData.map(a => ({
      day: a.day,
      hours: Number((a.seconds / 3600).toFixed(1))
    }));

    const totalCodingHours = Math.floor(totalCodingSeconds / 3600);
    const totalCodingMinutes = Math.floor((totalCodingSeconds % 3600) / 60);
    const codingTimeFormatted = `${totalCodingHours}h ${totalCodingMinutes}m`;

    return {
      completedLessons,
      totalSubmissions: submissions.length,
      totalXp,
      level,
      xpInCurrentLevel,
      xpForNextLevel: XP_PER_LEVEL,
      currentStreak,
      avgQuizScore,
      codingTimeFormatted,
      activityData: activityDataFormatted
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

    const roadmaps = await db.roadmap.findMany({
      where: { isPublished: true },
      include: {
        modules: {
          include: {
            topics: {
              include: {
                lessons: { select: { slug: true } }
              }
            }
          }
        }
      }
    });

    const masteryMap: Record<string, { completed: number; total: number }> = {};

    for (const r of roadmaps) {
      let title = r.title.split(': ')[1] || r.title;
      if (r.slug.includes("phase-1")) title = "Fundamentals";
      else if (r.slug.includes("phase-2")) title = "Data Structures";
      else if (r.slug.includes("phase-3")) title = "OOP";
      else if (title.includes("Advanced")) title = "Advanced";

      let totalLessons = 0;
      let completedLessons = 0;

      for (const m of r.modules) {
        for (const t of m.topics) {
          totalLessons += t.lessons.length;
          for (const l of t.lessons) {
            if (progress.some((p) => p.lessonId === l.slug)) {
              completedLessons++;
            }
          }
        }
      }

      masteryMap[title] = { completed: completedLessons, total: totalLessons };
    }

    return Object.entries(masteryMap).map(([subject, data]) => ({
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
  },

  /** Get recent activity (completed lessons and submissions) */
  async getRecentActivity(userId: string, limit: number = 5) {
    const [recentProgress, recentSubmissions] = await Promise.all([
      db.progress.findMany({
        where: { userId, status: "completed" },
        orderBy: { completedAt: "desc" },
        take: limit,
      }),
      db.submission.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: limit,
      })
    ]);

    type ActivityItem = {
      id: string;
      type: "lesson" | "exercise" | "project";
      title: string;
      date: Date;
      status: string;
      score?: number;
      targetId: string;
    };

    const activities: ActivityItem[] = [];

    // Map progress (lessons)
    for (const p of recentProgress) {
      // Find the lesson title (since we don't have direct relation in db.progress to static lesson title right away, we query it)
      const lesson = await db.lesson.findFirst({ where: { slug: p.lessonId } });
      activities.push({
        id: p.id,
        type: "lesson",
        title: lesson?.title || p.lessonId,
        date: p.completedAt || p.updatedAt,
        status: p.status,
        targetId: p.lessonId
      });
    }

    // Map submissions (exercises/projects)
    for (const s of recentSubmissions) {
      let title = s.exerciseId || s.projectId || "Code Submission";
      let type: "exercise" | "project" = s.projectId ? "project" : "exercise";
      
      if (type === "exercise" && s.exerciseId) {
        const ex = await db.exercise.findFirst({ where: { slug: s.exerciseId } });
        if (ex) title = ex.title;
      } else if (type === "project" && s.projectId) {
        const proj = await db.project.findFirst({ where: { slug: s.projectId } });
        if (proj) title = proj.title;
      }

      activities.push({
        id: s.id,
        type,
        title,
        date: s.createdAt,
        status: s.status,
        score: s.score || undefined,
        targetId: s.exerciseId || s.projectId || "",
      });
    }

    // Sort combined activities and take limit
    return activities
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
  }
};
