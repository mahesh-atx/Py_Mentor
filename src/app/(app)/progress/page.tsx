import { UserService } from "@/lib/services/user.service";
import { ProgressService } from "@/lib/services/progress.service";
import { GamificationService } from "@/lib/services/gamification.service";
import { ProgressClient } from "./progress-client";

export default async function ProgressPage() {
  const user = await UserService.getLocalUser();
  const stats = await ProgressService.getStats(user.id);
  const topicMastery = await ProgressService.getTopicMastery(user.id);
  const achievements = await GamificationService.getUserAchievements(user.id);

  return (
    <ProgressClient 
      stats={{
        totalXp: stats.totalXp,
        lessonsCompleted: stats.completedLessons,
        exercisesCompleted: stats.exercisesCompleted,
        level: stats.level,
        currentStreak: stats.currentStreak,
        xpInCurrentLevel: stats.xpInCurrentLevel,
        xpForNextLevel: stats.xpForNextLevel,
        codingTime: stats.codingTimeFormatted,
        activityData: stats.activityData,
      }}
      topicMastery={topicMastery}
      achievements={achievements}
    />
  );
}
