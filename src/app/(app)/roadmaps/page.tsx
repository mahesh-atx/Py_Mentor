import { CurriculumService } from "@/lib/services/curriculum.service";
import { RoadmapClient, RoadmapModuleData } from "./roadmaps-client";

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
  // Since we are mocking progress, we make everything "in-progress" so it's clickable and visible
  const modulesData: RoadmapModuleData[] = firstRoadmap.modules.map((m) => {
    return {
      id: m.id,
      title: m.title,
      description: m.description,
      status: "in-progress", // Mock status
      topics: m.topics.map((t) => ({
        id: t.id,
        title: t.title,
        slug: t.slug,
        type: "lesson", // Assuming they are all lessons for this high-level view
        status: "in-progress" // Mock status
      }))
    };
  });

  return <RoadmapClient modules={modulesData} />;
}
