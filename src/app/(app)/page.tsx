import { CurriculumService } from "@/lib/services/curriculum.service";
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
  const allTopics = firstRoadmap.modules.flatMap(module => 
    module.topics.map(topic => ({ ...topic, module }))
  );

  // Default to the first topic as "continue learning"
  const continueTopic = allTopics.length > 0 ? allTopics[0] : null;
  
  // Pick next 2 topics as recommendations
  const recommendedTopics = allTopics.length > 1 ? allTopics.slice(1, 3) : [];

  return (
    <DashboardClient 
      continueTopic={continueTopic} 
      recommendedTopics={recommendedTopics} 
    />
  );
}
