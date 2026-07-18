import { db } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { UserService } from "@/lib/services/user.service";

export default async function DailyChallengePage() {
  const user = await UserService.getLocalUser();

  const userSubmissions = await db.submission.findMany({
    where: {
      userId: user.id,
      status: "passed",
      exerciseId: { not: null }
    }
  });
  
  // Submissions store exercise IDs — compare IDs to IDs (comparing slugs
  // against this set never matches, which made completed exercises
  // eligible for the daily challenge again).
  const passedExerciseIds = new Set(userSubmissions.map((s: { exerciseId: string | null }) => s.exerciseId));
  
  const allExercises = await db.exercise.findMany({
    where: { isPublished: true },
    select: { id: true, slug: true }
  });

  const uncompletedExercises = allExercises.filter((e: { id: string; slug: string }) => !passedExerciseIds.has(e.id));

  if (uncompletedExercises.length === 0) {
    if (allExercises.length === 0) {
      redirect("/");
    }
    const randomIndex = Math.floor(Math.random() * allExercises.length);
    redirect(`/practice/${allExercises[randomIndex].slug}`);
  }

  const randomIndex = Math.floor(Math.random() * uncompletedExercises.length);
  const selectedExercise = uncompletedExercises[randomIndex];

  redirect(`/practice/${selectedExercise.slug}`);
}
