import { db } from "../db/prisma";

/**
 * UserService
 * Manages the single local user for the single-player experience.
 */
export const UserService = {
  /** Gets the local user, creating one if it doesn't exist */
  async getLocalUser() {
    let user = await db.user.findFirst();
    if (!user) {
      user = await db.user.create({
        data: {
          name: "Local Developer",
          email: "local@pymentor.dev",
          image: "https://github.com/shadcn.png",
        }
      });
    }
    return user;
  },

  /** Aggregates user stats for the dashboard */
  async getUserStats() {
    const user = await this.getLocalUser();

    const completedLessons = await db.progress.findMany({
      where: { userId: user.id, status: "completed" }
    });
    
    const lessonSlugs = completedLessons.map(p => p.lessonId);
    const lessons = await db.lesson.findMany({
      where: { slug: { in: lessonSlugs } },
      select: { xpReward: true }
    });
    const lessonXp = lessons.reduce((sum, l) => sum + (l.xpReward || 50), 0);

    const successfulSubmissions = await db.submission.findMany({
      where: { userId: user.id, status: "passed", exerciseId: { not: null } }
    });
    
    const uniqueExercises = new Set<string>();
    let exerciseXp = 0;
    for (const sub of successfulSubmissions) {
      if (sub.exerciseId && !uniqueExercises.has(sub.exerciseId)) {
        uniqueExercises.add(sub.exerciseId);
        exerciseXp += sub.score || 0;
      }
    }

    const totalXp = lessonXp + exerciseXp;

    return {
      totalXp,
      lessonsCompleted: completedLessons.length,
      exercisesCompleted: uniqueExercises.size,
    };
  }
};
