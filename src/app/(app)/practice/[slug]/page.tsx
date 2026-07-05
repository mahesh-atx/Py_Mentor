import { CurriculumService } from "@/lib/services/curriculum.service";
import { SubmissionService } from "@/lib/services/submission.service";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { PracticeClient } from "./practice-client";

export default async function PracticeSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const exercise = await CurriculumService.getExerciseBySlug(slug);
  
  if (!exercise) {
    notFound();
  }

  const session = await auth();
  let isCompleted = false;
  if (session?.user?.id) {
    const history = await SubmissionService.getHistory(session.user.id, exercise.id);
    isCompleted = history.some(sub => sub.status === "passed");
  }

  return <PracticeClient exercise={exercise} initialIsCompleted={isCompleted} />;
}
