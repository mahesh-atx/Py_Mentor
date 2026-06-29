import { CurriculumService } from "@/lib/services/curriculum.service";
import { redirect } from "next/navigation";

export default async function LearnRootRedirect() {
  const roadmaps = await CurriculumService.getRoadmaps();
  
  if (roadmaps.length === 0) {
    redirect("/");
  }

  // Find the first topic in the first module
  const firstModule = roadmaps[0].modules[0];
  if (firstModule && firstModule.topics.length > 0) {
    const firstTopic = firstModule.topics[0];
    redirect(`/learn/${firstTopic.slug}`);
  }

  // Fallback
  redirect("/");
}
