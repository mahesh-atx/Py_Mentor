import { CurriculumService } from "@/lib/services/curriculum.service";
import { RoadmapClient, RoadmapData } from "./roadmaps-client";

export default async function RoadmapPage() {
  const roadmaps = await CurriculumService.getRoadmaps();
  const firstRoadmap = roadmaps[0];

  if (!firstRoadmap) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No roadmaps found in the database. Please run the seed script.
      </div>
    );
  }

  // Transform database models into UI models
  const roadmapsData: RoadmapData[] = roadmaps.map((r: any) => {
    return {
      id: r.id,
      title: r.title,
      description: r.description,
      status: "in-progress", // Mock status
      modules: r.modules.map((m: any) => ({
        id: m.id,
        title: m.title,
        description: m.description,
      }))
    };
  });

  return <RoadmapClient roadmaps={roadmapsData} />;
}
