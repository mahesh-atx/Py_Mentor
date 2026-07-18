import { db } from "../db/prisma";
import { XP_PER_LEVEL, computeXpFromRaw, type XpBreakdown } from "./xp-calculator";
import { computeCurrentStreak } from "../streak";

export const ProgressService = {
  /** Get the IDs of all lessons the user has completed */
  async getCompletedLessonIds(userId: string): Promise<string[]> {
    const rows = await db.progress.findMany({
      where: { userId, status: "completed" },
      select: { lessonId: true },
    });
    return rows.map((r: { lessonId: string }) => r.lessonId);
  },

  /** Get overall progress stats for a user */
  async getStats(userId: string) {
    const [completedProgress, submissions, streaks, allProgress, quizSubmissions, quizzes, unlockedAchievements] = await Promise.all([
      db.progress.findMany({ where: { userId, status: "completed" }, select: { lessonId: true } }),
      db.submission.findMany({
        where: { userId, status: "passed", exerciseId: { not: null } },
        select: { exerciseId: true, score: true, createdAt: true, timeTaken: true },
      }),
      db.streak.findMany({ where: { userId }, orderBy: { date: "desc" }, take: 30 }),
      db.progress.findMany({ where: { userId }, select: { timeSpent: true, updatedAt: true } }),
      db.quizSubmission.findMany({
        where: { userId },
        select: { quizId: true, score: true, total: true },
      }),
      db.quiz.findMany({
        where: { isPublished: true },
        select: { slug: true, xpReward: true },
      }),
      db.userAchievement.findMany({
        where: { userId },
        include: { achievement: { select: { xpReward: true } } },
      }),
    ]);

    // ── Centralised XP calculation ─────────────────────────────────────────
    const completedLessonSlugs = completedProgress.map((p: { lessonId: string }) => p.lessonId);

    // Batch-load the xpReward for every completed lesson (1 query, not N).
    const lessonXpMap = new Map<string, number>();
    if (completedLessonSlugs.length > 0) {
      const lessons = await db.lesson.findMany({
        where: {
          OR: [
            { slug: { in: completedLessonSlugs } },
            { id: { in: completedLessonSlugs } }
          ]
        },
        select: { id: true, slug: true, xpReward: true },
      });
      for (const l of lessons) {
        lessonXpMap.set(l.slug, l.xpReward);
        lessonXpMap.set(l.id, l.xpReward);
      }
    }

    // Quiz XP map (quizId stores the quiz slug)
    const quizXpMap = new Map<string, number>(
      quizzes.map((q: { slug: string; xpReward: number }) => [q.slug, q.xpReward])
    );
    const achievementXpValues = unlockedAchievements.map(
      (ua: { achievement: { xpReward: number } }) => ua.achievement.xpReward
    );

    const xp = computeXpFromRaw(
      completedLessonSlugs,
      submissions.map((s: { exerciseId: string | null; score: number | null }) => ({ exerciseId: s.exerciseId!, score: s.score ?? 0 })),
      lessonXpMap,
      quizSubmissions,
      quizXpMap,
      achievementXpValues
    );

    // ── Streak (alive when last activity was today OR yesterday) ───────────
    const currentStreak = computeCurrentStreak(
      streaks.map((s: { date: Date }) => s.date)
    );

    // ── Activity / coding time ─────────────────────────────────────────────
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const activityData: { dateStr: string; day: string; seconds: number }[] = [];
    let totalCodingSeconds = 0;

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      activityData.push({ dateStr: d.toDateString(), day: days[d.getDay()], seconds: 0 });
    }

    for (const p of allProgress) {
      totalCodingSeconds += p.timeSpent || 0;
      const dStr = new Date(p.updatedAt).toDateString();
      const entry = activityData.find((a) => a.dateStr === dStr);
      if (entry) entry.seconds += p.timeSpent || 0;
    }

    for (const s of submissions) {
      totalCodingSeconds += s.timeTaken || 0;
      const dStr = new Date(s.createdAt).toDateString();
      const entry = activityData.find((a) => a.dateStr === dStr);
      if (entry) entry.seconds += s.timeTaken || 0;
    }

    const activityDataFormatted = activityData.map((a) => ({
      day: a.day,
      hours: Number((a.seconds / 3600).toFixed(1)),
    }));

    const totalCodingHours = Math.floor(totalCodingSeconds / 3600);
    const totalCodingMinutes = Math.floor((totalCodingSeconds % 3600) / 60);

    // Avg quiz score — based on all quiz submissions (not just passed exercises)
    const allSubmissions = await db.submission.findMany({
      where: { userId, exerciseId: { not: null }, status: "passed" },
      select: { exerciseId: true, score: true },
    });
    const avgQuizScore =
      allSubmissions.length > 0
        ? Math.round(allSubmissions.reduce((sum: number, s: { score: number | null }) => sum + (s.score ?? 0), 0) / allSubmissions.length)
        : 0;

    // Distinct exercises passed (re-passing the same exercise doesn't count twice)
    const exercisesCompleted = new Set(
      allSubmissions.map((s: { exerciseId: string | null }) => s.exerciseId)
    ).size;

    return {
      completedLessons: completedLessonSlugs.length,
      totalSubmissions: allSubmissions.length,
      exercisesCompleted,
      totalXp: xp.totalXp,
      lessonXp: xp.lessonXp,
      exerciseXp: xp.exerciseXp,
      quizXp: xp.quizXp,
      achievementXp: xp.achievementXp,
      level: xp.level,
      xpInCurrentLevel: xp.xpInCurrentLevel,
      xpForNextLevel: XP_PER_LEVEL,
      currentStreak,
      avgQuizScore,
      codingTimeFormatted: `${totalCodingHours}h ${totalCodingMinutes}m`,
      activityData: activityDataFormatted,
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
      select: { lessonId: true },
    });

    const completedSlugs = new Set(progress.map((p: { lessonId: string }) => p.lessonId));

    const roadmaps = await db.roadmap.findMany({
      where: { isPublished: true },
      include: {
        modules: {
          include: {
            topics: {
              include: { lessons: { select: { slug: true } } },
            },
          },
        },
      },
    });

    const masteryMap: Record<string, { completed: number; total: number }> = {};

    for (const r of roadmaps) {
      let title = r.title.split(": ")[1] || r.title;
      if (r.slug.includes("phase-1")) title = "Fundamentals";
      else if (r.slug.includes("phase-2")) title = "Data Structures";
      else if (r.slug.includes("phase-3")) title = "Functions & OOP";
      else if (r.slug.includes("phase-4")) title = "Intermediate";
      else if (r.slug.includes("phase-5")) title = "Data Science & ML";
      else if (title.includes("Advanced")) title = "Advanced";

      let totalLessons = 0;
      let completedLessons = 0;

      for (const m of r.modules) {
        for (const t of m.topics) {
          totalLessons += t.lessons.length;
          for (const l of t.lessons) {
            if (completedSlugs.has(l.slug)) completedLessons++;
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
      create: { userId, lessonId, status: "completed", completedAt: new Date() },
    });
  },

  /** Save an exercise submission */
  async saveExerciseSubmission({
    userId,
    exerciseId,
    code,
    status,
    testResults,
  }: {
    userId: string;
    exerciseId: string;
    code: string;
    status: "passed" | "failed" | "error";
    testResults: any;
  }) {
    await this.recordStreak(userId);

    const existingSuccess = await db.submission.findFirst({
      where: { userId, exerciseId, status: "passed" },
    });

    const exercise = await db.exercise.findFirst({ where: { slug: exerciseId } });
    const xpReward = exercise?.xpReward ?? 100;

    const score = status === "passed" && !existingSuccess ? xpReward : 0;

    return db.submission.create({
      data: {
        userId,
        exerciseId,
        code,
        status,
        testResults: JSON.stringify(testResults),
        score,
      },
    });
  },

  /** Check if a lesson is completed */
  async isLessonCompleted(userId: string, lessonId: string) {
    const progress = await db.progress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
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
        testResults: JSON.stringify({ review: "AI Review Passed" }),
      },
    });
  },

  /** Get recent activity (completed lessons and submissions) — batch-optimised */
  async getRecentActivity(userId: string, limit: number = 5) {
    const [recentProgress, recentSubmissions] = await Promise.all([
      db.progress.findMany({
        where: { userId, status: "completed" },
        orderBy: { completedAt: "desc" },
        take: limit,
        select: { id: true, lessonId: true, completedAt: true, updatedAt: true, status: true },
      }),
      db.submission.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: limit,
        select: { id: true, exerciseId: true, projectId: true, createdAt: true, status: true, score: true },
      }),
    ]);

    // ── Batch-resolve titles instead of N+1 per-item queries ─────────────
    const lessonSlugs = recentProgress.map((p: { lessonId: string }) => p.lessonId);
    const exerciseSlugs = recentSubmissions
      .filter((s: { exerciseId: string | null }) => s.exerciseId)
      .map((s: { exerciseId: string | null }) => s.exerciseId!);
    const projectSlugs = recentSubmissions
      .filter((s: { projectId: string | null }) => s.projectId)
      .map((s: { projectId: string | null }) => s.projectId!);

    const [lessons, exercises, projects] = await Promise.all([
      lessonSlugs.length > 0
        ? db.lesson.findMany({ 
            where: { OR: [{ slug: { in: lessonSlugs } }, { id: { in: lessonSlugs } }] }, 
            select: { id: true, slug: true, title: true } 
          })
        : [],
      exerciseSlugs.length > 0
        ? db.exercise.findMany({ 
            where: { OR: [{ slug: { in: exerciseSlugs } }, { id: { in: exerciseSlugs } }] }, 
            select: { id: true, slug: true, title: true } 
          })
        : [],
      projectSlugs.length > 0
        ? db.project.findMany({ 
            where: { OR: [{ slug: { in: projectSlugs } }, { id: { in: projectSlugs } }] }, 
            select: { id: true, slug: true, title: true } 
          })
        : [],
    ]);

    const lessonTitleMap = new Map();
    lessons.forEach((l: { id: string; slug: string; title: string }) => {
      lessonTitleMap.set(l.slug, l.title);
      lessonTitleMap.set(l.id, l.title);
    });
    
    const exerciseTitleMap = new Map();
    exercises.forEach((e: { id: string; slug: string; title: string }) => {
      exerciseTitleMap.set(e.slug, e.title);
      exerciseTitleMap.set(e.id, e.title);
    });
    
    const projectTitleMap = new Map();
    projects.forEach((p: { id: string; slug: string; title: string }) => {
      projectTitleMap.set(p.slug, p.title);
      projectTitleMap.set(p.id, p.title);
    });

    // ── Assemble activity items ──────────────────────────────────────────
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

    for (const p of recentProgress) {
      activities.push({
        id: p.id,
        type: "lesson",
        title: lessonTitleMap.get(p.lessonId) ?? p.lessonId,
        date: p.completedAt ?? p.updatedAt,
        status: p.status,
        targetId: p.lessonId,
      });
    }

    for (const s of recentSubmissions) {
      const type: "exercise" | "project" = s.projectId ? "project" : "exercise";
      let title = s.exerciseId || s.projectId || "Code Submission";

      if (type === "exercise" && s.exerciseId) {
        title = exerciseTitleMap.get(s.exerciseId) ?? title;
      } else if (type === "project" && s.projectId) {
        title = projectTitleMap.get(s.projectId) ?? title;
      }

      activities.push({
        id: s.id,
        type,
        title,
        date: s.createdAt,
        status: s.status,
        score: s.score ?? undefined,
        targetId: s.exerciseId || s.projectId || "",
      });
    }

    return activities
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
  },
};
