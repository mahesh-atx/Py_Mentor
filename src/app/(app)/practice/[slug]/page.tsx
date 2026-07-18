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

  // All exercises in the same topic
  const allExercises = exercise.topic?.exercises || [];

  const session = await auth();
  let completedSlugs: string[] = [];

  if (session?.user?.id && allExercises.length > 0) {
    const slugs = allExercises.map((e: any) => e.slug);
    const history = await SubmissionService.getHistoryBatch(session.user.id, slugs);
    const passedSet = new Set(
      history
        .filter((sub: { status: string }) => sub.status === "passed")
        .map((sub: { exerciseId: string }) => sub.exerciseId)
    );
    completedSlugs = slugs.filter((s: string) => passedSet.has(s));
  }

  return (
    <PracticeClient
      exercise={exercise}
      allExercises={allExercises}
      initialCompletedSlugs={completedSlugs}
    />
  );
}
