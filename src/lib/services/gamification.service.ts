import { db } from "../db";
import { ProgressService } from "./progress.service";

export const GamificationService = {
  /**
   * Retrieves all achievements and tags them with unlocked status for the given user.
   */
  async getUserAchievements(userId: string) {
    const allAchievements = await db.achievement.findMany();
    const userAchievements = await db.userAchievement.findMany({
      where: { userId }
    });

    const unlockedIds = new Set(userAchievements.map((ua: { achievementId: string }) => ua.achievementId));

    return allAchievements.map((ach: any) => ({
      ...ach,
      isUnlocked: unlockedIds.has(ach.id),
      unlockedAt: userAchievements.find((ua: { achievementId: string }) => ua.achievementId === ach.id)?.unlockedAt || null,
    }));
  },

  /**
   * Evaluates if any locked achievements should be unlocked based on current stats.
   * Returns a list of newly unlocked achievements.
   */
  async checkAchievements(userId: string) {
    const all = await this.getUserAchievements(userId);
    const locked = all.filter((a: { isUnlocked: boolean }) => !a.isUnlocked);
    
    if (locked.length === 0) return [];

    const stats = await ProgressService.getStats(userId);
    
    // Additional queries if needed for specific achievements
    const projectSubmissions = await db.submission.count({
      where: { userId, projectId: { not: null }, status: "passed" }
    });

    const newlyUnlocked = [];

    for (const ach of locked) {
      let meetsCondition = false;
      try {
        const condition = JSON.parse(ach.condition);
        
        if (condition.type === "lessons_completed") {
          meetsCondition = stats.completedLessons >= condition.count;
        } else if (condition.type === "streak") {
          meetsCondition = stats.currentStreak >= condition.days;
        } else if (condition.type === "projects_completed") {
          meetsCondition = projectSubmissions >= condition.count;
        }
        // "quiz_perfect" and "errors_fixed" are skipped in this basic implementation
      } catch (e) {
        console.error("Error parsing condition for achievement", ach.id, e);
      }

      if (meetsCondition) {
        // Unlock it
        await db.userAchievement.create({
          data: {
            userId,
            achievementId: ach.id,
          }
        });
        
        // Note: In a full implementation we'd also award the XP here by creating a dummy progress entry or modifying a totalXP column,
        // but currently XP is calculated implicitly by completed lessons and exercises.
        
        newlyUnlocked.push(ach);
      }
    }

    return newlyUnlocked;
  }
};
