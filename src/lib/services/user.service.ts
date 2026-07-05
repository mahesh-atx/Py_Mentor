import { db } from "../db";
import { allLessons, allExercises } from "../curriculum-data";

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
      where: { userId: user.id, status: "completed" }
    });
    const lessonXp = completedLessons.reduce((sum, p) => {
      const lesson = allLessons.find(l => l.id === p.lessonId);
      return sum + (lesson?.xpReward || 0);
    }, 0);

    // Sum XP from successful submissions
    const successfulSubmissions = await db.submission.findMany({
      where: { userId: user.id, status: "passed", exerciseId: { not: null } }
    });
    
    // To prevent farming XP from the same exercise, only count unique exercises
    const uniqueExercises = new Set<string>();
    let exerciseXp = 0;
    for (const sub of successfulSubmissions) {
      if (sub.exerciseId && !uniqueExercises.has(sub.exerciseId)) {
        uniqueExercises.add(sub.exerciseId);
        const exercise = allExercises.find(e => e.id === sub.exerciseId);
        exerciseXp += (exercise?.xpReward || 0);
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
