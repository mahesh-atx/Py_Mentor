import { CurriculumService } from "@/lib/services/curriculum.service";
import { SubmissionService } from "@/lib/services/submission.service";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { PracticeClient } from "./practice-client";
import { db } from "@/lib/db/prisma";

export default async function PracticeSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const exercise = await CurriculumService.getExerciseBySlug(slug);

  if (!exercise) {
    notFound();
  }

  const moduleId = exercise.topic?.module?.id;
  const moduleData = moduleId
    ? await db.module.findUnique({
        where: { id: moduleId },
        include: {
          topics: {
            where: { isPublished: true },
            orderBy: { order: "asc" },
            include: {
              exercises: { where: { isPublished: true }, orderBy: { order: "asc" } },
            },
          },
        },
      })
    : null;

  // Flatten all exercises from all topics in the module, with topicName attached
  const moduleExercises = moduleData
    ? moduleData.topics.flatMap((topic: any) =>
        topic.exercises.map((ex: any) => ({
          ...ex,
          topicName: topic.title,
          topicSlug: topic.slug,
        }))
      )
    : [];

  // Fallback to topic-level if no module found
  const allExercises = moduleExercises.length > 0
    ? moduleExercises
    : (exercise.topic?.exercises || []).map((ex: any) => ({
        ...ex,
        topicName: exercise.topic?.title || "",
        topicSlug: exercise.topic?.slug || "",
      }));

  const moduleTitle = moduleData?.title || exercise.topic?.module?.title || "";

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
      moduleTitle={moduleTitle}
    />
  );
}
