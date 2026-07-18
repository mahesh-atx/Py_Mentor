import { CurriculumService } from "@/lib/services/curriculum.service";
import { UserService } from "@/lib/services/user.service";
import { ProgressService } from "@/lib/services/progress.service";
import { pickContinueIndex } from "@/lib/continue-topic";
import { DashboardClient } from "./dashboard-client";
import { db } from "@/lib/db/prisma";

export default async function DashboardPage() {
  const roadmaps = await CurriculumService.getRoadmapsWithExercises();
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

  // --- Calculate continuePractice ---
  const userSubmissions = await db.submission.findMany({
    where: {
      userId: user.id,
      status: "passed",
      exerciseId: { not: null }
    },
    select: { exerciseId: true }
  });
  const completedExerciseSlugs = new Set(userSubmissions.map(s => s.exerciseId as string));

  let continuePractice: any = null;
  // Iterate through allTopics to find the first uncompleted exercise
  for (const topic of allTopics) {
    if (topic.exercises && topic.exercises.length > 0) {
      for (const exercise of topic.exercises) {
        if (!completedExerciseSlugs.has(exercise.id) && !completedExerciseSlugs.has(exercise.slug)) {
          
          let totalExercises = 0;
          let completedExercisesInModule = 0;
          const moduleTopics = allTopics.filter((t: any) => t.module.id === topic.module.id);
          for (const mt of moduleTopics) {
            if (mt.exercises) {
              for (const ex of mt.exercises) {
                totalExercises++;
                if (completedExerciseSlugs.has(ex.id) || completedExerciseSlugs.has(ex.slug)) {
                  completedExercisesInModule++;
                }
              }
            }
          }

          continuePractice = {
            moduleSlug: topic.module.slug,
            topicName: topic.title, // or exercise.topicName if that exists, but topic.title is standard
            exerciseTitle: exercise.title,
            exerciseSlug: exercise.slug,
            completedCount: completedExercisesInModule,
            totalCount: totalExercises
          };
          break;
        }
      }
    }
    if (continuePractice) break;
  }

  return (
    <DashboardClient 
      continueTopic={continueTopic} 
      continuePractice={continuePractice}
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
