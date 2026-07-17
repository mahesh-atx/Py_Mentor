import { CurriculumService } from "@/lib/services/curriculum.service";
import { UserService } from "@/lib/services/user.service";
import { ProgressService } from "@/lib/services/progress.service";
import { pickContinueIndex } from "@/lib/continue-topic";
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

  // Flatten topics across ALL roadmaps (Phase 1 → Phase 5) in curriculum
  // order — getRoadmaps() returns roadmaps, modules and topics ordered.
  const allTopics = roadmaps.flatMap((roadmap: any) =>
    roadmap.modules.flatMap((module: any) =>
      module.topics.map((topic: any) => ({ ...topic, module }))
    )
  );

  // Get user stats
  const user = await UserService.getLocalUser();
  const stats = await ProgressService.getStats(user.id);

  // Pick the first topic that still has an incomplete lesson as
  // "continue learning". When every lesson is complete, continueTopic is
  // null and the dashboard shows the "all caught up" state instead.
  const completedLessonIds = new Set(
    await ProgressService.getCompletedLessonIds(user.id)
  );
  const continueIndex = pickContinueIndex(allTopics, completedLessonIds);

  // Strip the heavy relations before sending topics to the client —
  // the dashboard only needs the scalar fields + module info.
  const toClientTopic = (topic: any) => {
    if (!topic) return null;
    const { lessons, exercises, quizzes, projects, module, ...rest } = topic;
    const { topics: _moduleTopics, ...mod } = module ?? {};
    return { ...rest, module: mod };
  };

  const continueTopic =
    continueIndex >= 0 ? toClientTopic(allTopics[continueIndex]) : null;

  // Recommend the next 2 topics after the current one (none when finished)
  const recommendedTopics =
    continueIndex >= 0
      ? allTopics.slice(continueIndex + 1, continueIndex + 3).map(toClientTopic)
      : [];
  
  const recentActivity = await ProgressService.getRecentActivity(user.id);

  return (
    <DashboardClient 
      continueTopic={continueTopic} 
      recommendedTopics={recommendedTopics} 
      recentActivity={recentActivity}
      stats={{
        totalXp: stats.totalXp,
        lessonsCompleted: stats.completedLessons,
        exercisesCompleted: stats.exercisesCompleted,
        level: stats.level,
        currentStreak: stats.currentStreak,
        xpInCurrentLevel: stats.xpInCurrentLevel,
        xpForNextLevel: stats.xpForNextLevel,
      }}
    />
  );
}
