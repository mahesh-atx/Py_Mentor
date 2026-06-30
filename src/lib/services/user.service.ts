import { db } from "../db";

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

    // Sum XP from completed lessons
    const completedLessons = await db.progress.findMany({
      where: { userId: user.id, status: "completed" },
      include: { lesson: true }
    });
    const lessonXp = completedLessons.reduce((sum, p) => sum + (p.lesson?.xpReward || 0), 0);

    // Sum XP from successful submissions (first time only usually, but we'll sum max scores per exercise)
    const successfulSubmissions = await db.submission.findMany({
      where: { userId: user.id, status: "passed", exerciseId: { not: null } },
      include: { exercise: true }
    });
    
    // To prevent farming XP from the same exercise, only count unique exercises
    const uniqueExercises = new Set<string>();
    let exerciseXp = 0;
    for (const sub of successfulSubmissions) {
      if (sub.exerciseId && !uniqueExercises.has(sub.exerciseId)) {
        uniqueExercises.add(sub.exerciseId);
        exerciseXp += (sub.exercise?.xpReward || 0);
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
