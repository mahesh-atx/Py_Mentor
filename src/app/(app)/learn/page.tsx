import { CurriculumService } from "@/lib/services/curriculum.service";
import { UserService } from "@/lib/services/user.service";
import { ProgressService } from "@/lib/services/progress.service";
import { pickContinueIndex } from "@/lib/continue-topic";
import { redirect } from "next/navigation";

export default async function LearnRootRedirect() {
  const roadmaps = await CurriculumService.getRoadmaps();

  if (roadmaps.length === 0) {
    redirect("/");
  }

  // Flatten topics across ALL roadmaps in curriculum order
  const allTopics = roadmaps.flatMap((roadmap: any) =>
    roadmap.modules.flatMap((module: any) => module.topics)
  );

  if (allTopics.length === 0) {
    redirect("/");
  }

  // Resume at the first topic that still has an incomplete lesson.
  // (New users get index 0 — the very first topic, same as before.)
  const user = await UserService.getLocalUser();
  const completedLessonIds = new Set(
    await ProgressService.getCompletedLessonIds(user.id)
  );
  const continueIndex = pickContinueIndex(allTopics, completedLessonIds);

  if (continueIndex >= 0) {
    redirect(`/learn/${allTopics[continueIndex].slug}`);
  }

  // Everything is complete — send them to the dashboard's "all caught up" state
  redirect("/");
}
