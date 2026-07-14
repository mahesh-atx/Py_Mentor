import { CurriculumService } from "@/lib/services/curriculum.service";
import { UserService } from "@/lib/services/user.service";
import { ProgressService } from "@/lib/services/progress.service";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const roadmaps = await CurriculumService.getRoadmaps();
  const firstRoadmap = roadmaps[0];
  
  if (!firstRoadmap) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No roadmaps found in the database. Please run the seed script.
      </div>
    );
  }

  // Flatten topics with module references
  const allTopics = firstRoadmap.modules.flatMap((module: any) => 
    module.topics.map((topic: any) => ({ ...topic, module }))
  );

  // Get user stats
  const user = await UserService.getLocalUser();
  const stats = await ProgressService.getStats(user.id);

  // Default to the first topic as "continue learning"
  // For a real app, we would look up the last uncompleted topic, but we'll stick to basic logic for now.
  const continueTopic = allTopics.length > 0 ? allTopics[0] : null;
  
  // Pick next 2 topics as recommendations
  const recommendedTopics = allTopics.length > 1 ? allTopics.slice(1, 3) : [];
  
  const recentActivity = await ProgressService.getRecentActivity(user.id);

  return (
    <DashboardClient 
      continueTopic={continueTopic} 
      recommendedTopics={recommendedTopics} 
      recentActivity={recentActivity}
      stats={{
        totalXp: stats.totalXp,
        lessonsCompleted: stats.completedLessons,
        exercisesCompleted: stats.totalSubmissions, // Approximating exercises via submissions for now
        level: stats.level,
        currentStreak: stats.currentStreak,
        xpInCurrentLevel: stats.xpInCurrentLevel,
        xpForNextLevel: stats.xpForNextLevel,
      }}
    />
  );
}
