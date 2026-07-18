import { CurriculumService } from "@/lib/services/curriculum.service";
import { UserService } from "@/lib/services/user.service";
import { db } from "@/lib/db/prisma";
import { RoadmapClient, RoadmapData } from "./roadmaps-client";

export default async function RoadmapPage() {
  const user = await UserService.getLocalUser();
  const roadmaps = await CurriculumService.getRoadmaps();
  const progress = await db.progress.findMany({
    where: { userId: user.id, status: "completed" },
    select: { lessonId: true }
  });
  const completedLessonSlugs = new Set(progress.map((p: { lessonId: string }) => p.lessonId));
  const firstRoadmap = roadmaps[0];

  if (!firstRoadmap) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No roadmaps found in the database. Please run the seed script.
      </div>
    );
  }

  // Transform database models into UI models
  let previousCompleted = true;
  
  const roadmapsData: RoadmapData[] = roadmaps.map((r: any) => {
    let totalLessons = 0;
    let completed = 0;

    for (const m of r.modules) {
      for (const t of m.topics) {
        totalLessons += t.lessons.length;
        for (const l of t.lessons) {
          if (completedLessonSlugs.has(l.slug)) {
            completed++;
          }
        }
      }
    }

    let status: "locked" | "in-progress" | "completed" = "locked";
    
    if (totalLessons > 0 && completed === totalLessons) {
      status = "completed";
    } else if (completed > 0 || previousCompleted) {
      status = "in-progress";
    }

    if (status !== "completed") {
      previousCompleted = false;
    }

    return {
      id: r.id,
      title: r.title,
      description: r.description,
      status: status,
      modules: r.modules.map((m: any) => ({
        id: m.id,
        title: m.title,
        description: m.description,
      }))
    };
  });

  return <RoadmapClient roadmaps={roadmapsData} />;
}
